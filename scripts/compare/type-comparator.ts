import { ArrayTypeNode, Identifier, IndexedAccessTypeNode, IntersectionTypeNode, LiteralTypeNode, Node, TupleTypeNode, TypeNode, TypeReferenceNode, UnionTypeNode } from 'ts-morph';

export function compareTypes(targetNode: TypeNode, sourceNode: TypeNode): boolean {
  if (getText(targetNode) === getText(sourceNode)) {
    return true;
  }

  if (sourceNode.getType().isUnknown() || sourceNode.getType().isNever()) {
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
  }

  return false;
}

function handleTargetTypeReference(targetTypeReference: TypeReferenceNode, sourceNode: TypeNode): boolean {
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
      return false;
    }
    const matches = compareTypes(constraint, sourceNode);
    if (!matches) {
      constraint.replaceWithText(getText(sourceNode));
    }

    return true;
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

  return false;
}

function handleTargetUnion(targetUnion: UnionTypeNode, sourceNode: TypeNode): boolean {
  const targetMembers = targetUnion.getTypeNodes();

  if (Node.isUnionTypeNode(sourceNode)) {
    // Target=Union, Source=Union
    // Example test case 'union type with interface and different lengths'
    const sourceMembers = sourceNode.getTypeNodes();

    for (const sourceMember of sourceMembers) {
      const hasMatch = targetMembers.some(targetMember => compareTypes(targetMember, sourceMember));

      if (!hasMatch) {
        targetUnion.replaceWithText(getText(sourceNode));
        break;
      }
    }
  } else {
    const isCompatible = targetMembers.every(targetMember => compareTypes(targetMember, sourceNode));

    if (!isCompatible) {
      targetUnion.replaceWithText(getText(sourceNode));
    }
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

  const targetElementType = targetArray.getElementTypeNode().getType();
  const sourceElementType = sourceNode.getElementTypeNode().getType();

  if (sourceElementType.isUnknown()) {
    return true;
  }

  return targetElementType.isAssignableTo(sourceElementType) && sourceElementType.isAssignableTo(targetElementType);
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

  return false;
}

export function getText(typeNode: TypeNode): string {
  let text = typeNode.getText();
  if (Node.isIndexedAccessTypeNode(typeNode)) {
    text = typeNode.getType().getText();
  }

  return text.replace(/import\(".+?\)\./, '');
}
