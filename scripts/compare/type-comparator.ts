/* eslint-disable max-lines-per-function */
import { ArrayTypeNode, EnumDeclaration, Identifier, IndexedAccessTypeNode, IntersectionTypeNode, LiteralTypeNode, Node, ts, TupleTypeNode, TypeLiteralNode, TypeNode, TypeQueryNode, TypeReferenceNode, UnionTypeNode } from 'ts-morph';
import { handleInterfaceTypeReferences } from './handle-interfaces';
import { compareAndCorrectMembers, orderMembers } from './interface-comparator';
import { currentTargetSourceFile, isImportedType } from './shared';

/**
 * Compares two types and returns true if they are equal
 * @param targetNode The target type node
 * @param sourceNode The source type node
 * @returns true if the types are equal
 */
export function compareTypes(targetNode: TypeNode, sourceNode: TypeNode): boolean {
  if (getText(targetNode) === getText(sourceNode)) {
    return true;
  }

  if (isUnknownTypeNode(sourceNode)) {
    return true;
  }

  if (Node.isUnionTypeNode(targetNode)) {
    return handleTargetUnion(targetNode, sourceNode);
  } else if (Node.isLiteralTypeNode(targetNode)) {
    return handleTargetLiteral(targetNode, sourceNode);
  } else if (Node.isTypeReference(targetNode)) {
    return handleTargetTypeReference(targetNode, sourceNode);
  } else if (Node.isArrayTypeNode(targetNode)) {
    return handleTargetArray(targetNode, sourceNode);
  } else if (Node.isTupleTypeNode(targetNode)) {
    return handleTargetTuple(targetNode, sourceNode);
  } else if (Node.isIntersectionTypeNode(targetNode)) {
    return handleTargetIntersection(targetNode, sourceNode);
  } else if (Node.isIndexedAccessTypeNode(targetNode)) {
    return handleTargetIndexedAccess(targetNode, sourceNode);
  } else if (Node.isTypeQuery(targetNode)) {
    return handleTargetTypeQuery(targetNode, sourceNode);
  } else if (Node.isTypeLiteral(targetNode)) {
    return handleTargetTypeLiteral(targetNode, sourceNode);
  }

  if (Node.isUnionTypeNode(sourceNode)) {
    return handleSourceUnion(targetNode, sourceNode);
  }

  if (Node.isTypeReference(sourceNode)) {
    handleInterfaceTypeReferences(targetNode, sourceNode);
  }

  return false;
}

function isUnknownTypeNode(typeNode: TypeNode): boolean {
  const type = typeNode.getType();

  if (type.isUnknown() || type.isNever()) {
    return true;
  }

  return false;
}

function handleTargetTypeReference(targetTypeReference: TypeReferenceNode, sourceNode: TypeNode): boolean {
  if (targetTypeReference.getTypeName().getText() === 'ReturnType') {
    return handleIndexedReturnType(targetTypeReference, sourceNode);
  }

  const targetDefinitionNode = (targetTypeReference.getTypeName() as Identifier).getDefinitionNodes()[0];
  if (Node.isTypeAliasDeclaration(targetDefinitionNode)) {
    // If the target is a type alias, check the type node
    // Example test case 'external template literal types'
    const typeNode = targetDefinitionNode.getTypeNode();
    if (!typeNode) {
      return false;
    }

    return compareTypes(typeNode, sourceNode);
  } else if (Node.isTypeParameterDeclaration(targetDefinitionNode)) {
    // If the target is a type parameter, check the constraint
    // Example test case 'simple generic'
    const constraint = targetDefinitionNode.getConstraint();
    if (!constraint) {
      // Constraint is not set, we can assume it is any and matches
      // Example test case 'simple generic with any type'
      return true;
    }
    const matches = compareTypes(constraint, sourceNode);
    if (!matches) {
      constraint.replaceWithText(getText(sourceNode));
    }

    return true;
  } else if (Node.isEnumDeclaration(targetDefinitionNode)) {
    const enumType = getMainEnumType(targetDefinitionNode);

    return enumType === getText(sourceNode);
  }

  if (Node.isTypeReference(sourceNode)) {
    // Target=TypeReference, Source=TypeReference
    // If the target has type arguments and the source does not remove them from the target and compare
    // This to allow comparison of types like `TypeA<string>` and `TypeA`
    // Example test case 'simple generic'
    const targetTypeArguments = targetTypeReference.getTypeArguments();
    const sourceTypeArguments = (sourceNode).getTypeArguments();

    if (sourceTypeArguments.length === 0 && targetTypeArguments.length > 0) {
      const targetTypeArgumentStrings = targetTypeArguments.map(typeArgument => typeArgument.getText());
      for (const typeArgument of targetTypeArguments) {
        targetTypeReference.removeTypeArgument(typeArgument);
      }
      const doMatch = compareTypes(targetTypeReference, sourceNode);

      for (const typeArgument of targetTypeArgumentStrings) {
        targetTypeReference.addTypeArgument(typeArgument);
      }

      return doMatch;
    } else if (targetTypeArguments.length > 0 && targetTypeArguments.length === sourceTypeArguments.length) {
      for (const [i, typeArgument] of targetTypeArguments.entries()) {
        const sourceTypeArgument = sourceTypeArguments[i];
        const matches = compareTypes(typeArgument, sourceTypeArgument);
        if (!matches) {
          typeArgument.replaceWithText(getText(sourceTypeArgument));
        }
      }

      return true;
    }
  }

  if (isImportedType(currentTargetSourceFile, targetTypeReference)) {
    return true;
  }

  return false;
}

function getMainEnumType(enumNode: EnumDeclaration): 'number' | 'string'
{
  const members = enumNode.getMembers();
  const firstMember = members[0];

  if (typeof firstMember.getValue() === 'string') {
    return 'string';
  }

  return 'number';
}

function handleIndexedReturnType(targetTypeReference: TypeReferenceNode, sourceNode: TypeNode): boolean {
  const indexAccessedType = targetTypeReference.getTypeArguments()[0].asKindOrThrow(ts.SyntaxKind.IndexedAccessType).getType();
  const referencedMethod = indexAccessedType.getSymbol()?.getDeclarations()[0].asKindOrThrow(ts.SyntaxKind.MethodSignature);

  const returnTypeNode = referencedMethod?.getReturnTypeNode();
  if (!returnTypeNode) {
    return false;
  }
  // Example test case 'indexed access interface type with mismatch'

  return compareTypes(returnTypeNode, sourceNode);
}

function handleTargetUnion(targetUnion: UnionTypeNode, sourceNode: TypeNode): boolean {
  const targetMembers = targetUnion.getTypeNodes();

  if (Node.isUnionTypeNode(sourceNode)) {
    // Target=Union, Source=Union
    // Example test case 'union type with interface and different lengths'
    const sourceMembers = sourceNode.getTypeNodes();

    for (const [index, sourceMember] of sourceMembers.entries()) {
      const targetMember = targetMembers.at(index);
      const hasMatch = targetMember ? compareTypes(targetMember, sourceMember) : false;

      if (!hasMatch) {
        targetUnion.replaceWithText(getText(sourceNode));
        break;
      }
    }
  } else {
    // Consider compatible if ANY member of the target union matches the source type
    // This avoids mutating unions like `string | null` to `null` when `null` is already a member.
    // Example test case 'argument has default null but is also string'
    const hasMatch = targetMembers.some(targetMember => compareTypes(targetMember, sourceNode));

    if (!hasMatch) {
      targetUnion.replaceWithText(getText(sourceNode));
    }
  }

  return true;
}

function handleSourceUnion(targetNode: TypeNode, sourceUnion: UnionTypeNode): boolean {
  const isCompatible = sourceUnion.getTypeNodes().every(sourceMember => compareTypes(targetNode, sourceMember));

  if (!isCompatible) {
    targetNode.replaceWithText(getText(sourceUnion));
  }

  return true;
}

function handleTargetIntersection(targetIntersection: IntersectionTypeNode, sourceNode: TypeNode): boolean {
  const targetMembers = targetIntersection.getTypeNodes();

  if (Node.isIntersectionTypeNode(sourceNode)) {
    // Target=Intersection, Source=Intersection
    // Example test case 'map intersection type'
    const sourceMembers = sourceNode.getTypeNodes();

    for (const sourceMember of sourceMembers) {
      const hasMatch = targetMembers.some(targetMember => compareTypes(targetMember, sourceMember));

      if (!hasMatch) {
        targetIntersection.replaceWithText(getText(sourceNode));
        break;
      }
    }
  } else {
    const isCompatible = targetMembers.every(targetMember => compareTypes(targetMember, sourceNode));

    if (!isCompatible) {
      targetIntersection.replaceWithText(getText(sourceNode));
    }
  }

  return true;
}

function handleTargetLiteral(targetLiteral: LiteralTypeNode, sourceNode: TypeNode): boolean {
  if (!(Node.isStringKeyword(sourceNode) || Node.isNumberKeyword(sourceNode))) {
    return false;
  }

  const targetValue = targetLiteral.getType().getBaseTypeOfLiteralType().getText();
  const sourceValue = sourceNode.getType().getBaseTypeOfLiteralType().getText();

  return targetValue === sourceValue;
}

function handleTargetArray(targetArray: ArrayTypeNode, sourceNode: TypeNode): boolean {
  if (!Node.isArrayTypeNode(sourceNode)) {
    return false;
  }

  const targetElementType = targetArray.getElementTypeNode();
  const sourceElementType = sourceNode.getElementTypeNode();

  return compareTypes(targetElementType, sourceElementType);
}

function handleTargetTuple(targetTuple: TupleTypeNode, sourceNode: TypeNode): boolean {
  const targetElements = targetTuple.getElements();
  if (Node.isArrayTypeNode(sourceNode)) {
    const sourceElements = sourceNode.getElementTypeNode().getType().getUnionTypes();

    if (sourceElements.length > 0) {
      for (const sourceElement of sourceElements) {
        if (!targetElements.some(targetElement => sourceElement.isAssignableTo(targetElement.getType()))) {
          return false;
        }
      }
    }

    return targetElements.every(targetElement => targetElement.getType().isAssignableTo(sourceNode.getType()));
  }

  return false;
}

function handleTargetIndexedAccess(targetIndexedAccess: IndexedAccessTypeNode, sourceNode: TypeNode): boolean {
  const targetType = targetIndexedAccess.getType();
  if (targetType.isTypeParameter()) {
    const typeParameterDeclaration = targetType.getSymbol()?.getDeclarations()[0];
    if (Node.isTypeParameterDeclaration(typeParameterDeclaration)) {
      const constraint = typeParameterDeclaration.getConstraint();
      if (constraint) {
        return compareTypes(constraint, sourceNode);
      }
    }
  }

  const targetNode = targetIndexedAccess.getObjectTypeNode().getType().getSymbol()
    ?.getDeclarations()[0];
  if (Node.isInterfaceDeclaration(targetNode)) {
    const referencedProperty = targetNode.getMembers().find(member => Node.isPropertySignature(member) && member.getName() === targetIndexedAccess.getIndexTypeNode().getType().getLiteralValue());
    if (Node.isPropertySignature(referencedProperty)) {
      return compareTypes(referencedProperty.getTypeNodeOrThrow(), sourceNode);
    }
  }

  return false;
}

function handleTargetTypeLiteral(targetLiteral: TypeLiteralNode, sourceNode: TypeNode): boolean {
  if (!Node.isTypeLiteral(sourceNode)) {
    return false;
  }

  const propertiesChanged = compareAndCorrectMembers(targetLiteral, sourceNode);
  if (propertiesChanged) {
    orderMembers(targetLiteral);
  }

  return true;
}

function handleTargetTypeQuery(targetTypeQuery: TypeQueryNode, sourceNode: TypeNode): boolean {
  const targetDeclaration = targetTypeQuery.getExprName().getSymbol()?.getDeclarations()[0];
  if (Node.isVariableDeclaration(targetDeclaration)) {
    const targetInitializer = targetDeclaration.getInitializer();
    // Example test case 'typeof literal string'
    if (Node.isLiteralExpression(targetInitializer)) {
      const baseType = targetInitializer.getType().getBaseTypeOfLiteralType();

      return baseType.getText() === getText(sourceNode);
    }
  }

  return false;
}

export function getText(typeNode: TypeNode): string {
  let text = typeNode.getText();
  if (Node.isIndexedAccessTypeNode(typeNode)) {
    text = typeNode.getType().getText();
  }

  return text.replace(/import\(".+?\)\./, '');
}
