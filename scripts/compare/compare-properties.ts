/* eslint-disable @typescript-eslint/class-methods-use-this */
import { EnumDeclaration, ParenthesizedTypeNode, PropertySignature, SyntaxKind, TypeNode, UnionTypeNode } from 'ts-morph';
import { addMissingInterface, handleInterfaceTypeReferences } from './handle-interfaces';
import { currentTargetSourceFile } from './interface-comparator';
import { getJsDocTagValue, isImportedType } from './shared';

export const CustomJsDocTags = {
  originalName: 'compareOriginalName',
  currentValue: 'currentValue',
};

type VisitorArgs = (targetTypeNode: TypeNode, sourceTypeNode: TypeNode) => void;

/**
 * Interface for type visitors that handle different kinds of TypeNodes
 */
interface TypeVisitor {
  visit(...args: Parameters<VisitorArgs>): void;
  visitTypeReference(...args: Parameters<VisitorArgs>): void;
  visitUnionType(...args: Parameters<VisitorArgs>): void;
  visitParenthesizedType(...args: Parameters<VisitorArgs>): void;
}

/**
 * Visitor implementation for comparing and correcting types
 */
class TypeComparisonVisitor implements TypeVisitor {
  constructor(
    private readonly targetProp: PropertySignature,
    private readonly sourceProp: PropertySignature,
  ) {}

  /**
   * Entry point for visiting a type node
   */
  visit(targetTypeNode: TypeNode, sourceTypeNode: TypeNode): void {
    // sourceTypeNode.forEachDescendant((descendant) => {
    //   this.addMissingInterface(descendant.getType());
    // });

    if (sourceTypeNode.isKind(SyntaxKind.TypeReference)) {
      this.visitTypeReference(targetTypeNode, sourceTypeNode);
    } else if (targetTypeNode.isKind(SyntaxKind.UnionType) && sourceTypeNode.isKind(SyntaxKind.UnionType)) {
      this.visitUnionType(targetTypeNode, sourceTypeNode);
    } else if (targetTypeNode.isKind(SyntaxKind.ParenthesizedType) && sourceTypeNode.isKind(SyntaxKind.ParenthesizedType)) {
      this.visitParenthesizedType(targetTypeNode, sourceTypeNode);
    }
    // Add more type handlers as needed
  }

  /**
   * Handles type references (interfaces, classes, Sets, Maps, etc.)
   */
  visitTypeReference(targetTypeNode: TypeNode, sourceTypeNode: TypeNode): void {
    if (isSet(targetTypeNode) && isSet(sourceTypeNode)) {
      return;
    }

    // addMissingInterface(sourceTypeNode.getType());
    handleInterfaceTypeReferences(targetTypeNode, sourceTypeNode);
  }

  /**
   * Handles union types (A | B)
   */
  visitUnionType(targetTypeNode: UnionTypeNode, sourceTypeNode: UnionTypeNode): void {
    // Process each type in the union
    for (let i = 0; i < sourceTypeNode.getTypeNodes().length; i++) {
      const target = targetTypeNode.getTypeNodes()[i] as TypeNode | undefined;
      const source = sourceTypeNode.getTypeNodes()[i];

      if (target === undefined) {
        addMissingInterface(source.getType());

        return;
      }

      this.visit(target, source);
    }

    // Find and process interface references in union types
    // const interfaces = targetTypeNode.getTypeNodes().filter(type => isInterfaceType(type));
    // for (const interfaceNode of interfaces) {
    //   this.visitTypeReference(interfaceNode, sourceTypeNode);
    // }
  }

  /**
   * Handles parenthesized types ((T))
   */
  visitParenthesizedType(targetTypeNode: ParenthesizedTypeNode, sourceTypeNode: ParenthesizedTypeNode): void {
    // Unwrap and visit the inner type
    this.visit(targetTypeNode.getTypeNode(), sourceTypeNode.getTypeNode());
  }

  /**
   * Compare and process two union types
   */

  // private compareUnionTypes(targetTypeNode: TypeNode, sourceTypeNode: TypeNode): void {
  //   if (!targetTypeNode.isKind(SyntaxKind.UnionType) || !sourceTypeNode.isKind(SyntaxKind.UnionType)) {
  //     return;
  //   }
  //
  //   const targetUnion = targetTypeNode.asKind(SyntaxKind.UnionType);
  //   const sourceUnion = sourceTypeNode.asKind(SyntaxKind.UnionType);
  //   if (!targetUnion || !sourceUnion) return;
  //
  //   const targetInterfaces = targetUnion.getTypeNodes().filter(type => isInterfaceType(type));
  //   const sourceInterfaces = sourceUnion.getTypeNodes().filter(type => isInterfaceType(type));
  //
  //   for (let i = 0; i < Math.min(targetInterfaces.length, sourceInterfaces.length); i++) {
  //     handleInterfaceTypeReferences(targetInterfaces[i].getType(), sourceInterfaces[i].getType());
  //   }
  // }
}

function isSet(typeNode: TypeNode): boolean {
  return isOfInterfaceType('Set', typeNode);
}

function isOfInterfaceType(name: string, typeNode: TypeNode): boolean {
  return typeNode.isKind(SyntaxKind.TypeReference) && typeNode.getFirstChildByKind(SyntaxKind.Identifier)?.getText() === name;
}

/**
 * Compares and corrects property types
 * @param targetProp The property to be edited
 * @param sourceProp The property to compare against
 */
export function compareAndCorrectPropertyTypes(
  targetProp: PropertySignature,
  sourceProp: PropertySignature,
): void {
  const targetTypeNode = targetProp.getTypeNode();
  const sourceTypeNode = sourceProp.getTypeNode();

  // Handle case where one of the types is missing
  if (!targetTypeNode || !sourceTypeNode) {
    if (sourceTypeNode && !targetTypeNode) {
      targetProp.setType(sourceTypeNode.getText());
    }

    return;
  }

  // Check if the target type is imported
  if (isImportedType(currentTargetSourceFile, targetProp.getType())) {
    return;
  }

  // Handle enums first
  if (compareEnums(targetProp, sourceProp)) {
    return;
  }

  // TODO: visitor might not be needed make sure to check the steam types with validate types
  // // Create and use the visitor for type comparison
  // const visitor = new TypeComparisonVisitor(targetProp, sourceProp);
  //
  // // Process source type to find and add missing interfaces
  // visitor.visit(targetTypeNode, sourceTypeNode);

  // Special case for direct interface references
  // if (isInterfaceType(targetTypeNode) && isInterfaceType(sourceTypeNode)) {
  handleInterfaceTypeReferences(targetTypeNode, sourceTypeNode);

  // return;
  // }

  // Special case for union types
  // if (targetTypeNode.isKind(SyntaxKind.UnionType) && sourceTypeNode.isKind(SyntaxKind.UnionType)) {
  //   visitor.compareUnionTypes(targetTypeNode, sourceTypeNode);
  // }

  // Update the type if different
  updatePropertyTypeIfDifferent(targetProp, sourceProp);
}

/**
 * Compares two enum properties and updates the target property if different
 *
 * @returns true if the rest of the comparison should be skipped
 */
function compareEnums(targetProp: PropertySignature, sourceProp: PropertySignature): boolean {
  // Check if the source property has a @currentValue JSDoc tag (indicating it's an enum)
  const currentStrValue = getJsDocTagValue(sourceProp, CustomJsDocTags.currentValue);
  const enumCurrentValue = currentStrValue !== undefined ? parseInt(currentStrValue) : undefined;

  // If it's an enum in the source, preserve the type and copy the JSDoc
  if (enumCurrentValue !== undefined) {
    if (!targetProp.getType().isEnum()) {
      const enumName = sourceProp.getName().replace(/^m_e/, 'E');
      // Check if the enum already exists in the target file
      const existingEnum = currentTargetSourceFile.getEnum(enumName);
      if (!existingEnum) {
        // Add new enum to target
        currentTargetSourceFile.addEnum({
          name: enumName,
          members: [
            {
              name: enumName,
              value: enumCurrentValue,
            },
          ],
          isExported: true,
          docs: ['@generated'],
        });
      }

      // Update target property to use the new enum
      targetProp.setType(enumName);

      return true;
    }

    const targetSymbol = targetProp.getType().getSymbol();
    if (!targetSymbol) {
      throw new Error(`Failed to get symbol for property ${targetProp.getName()}`);
    }
    const enumDeclaration = targetSymbol.getDeclarations()[0] as EnumDeclaration;

    const enumMembers = enumDeclaration.getMembers();

    // Check if current value is in the enum
    if (!enumMembers.some(member => member.getValue() === enumCurrentValue)) {
      // Add new enum member
      enumDeclaration.addMember({
        name: 'TODO: change me',
        value: enumCurrentValue,
      });
    }

    return true;
  }

  if (targetProp.getType().isEnum() && sourceProp.getType().isNumber()) {
    return true;
  }

  return false;
}

/**
 * Updates a property's type if it's different from the source
 */
// eslint-disable-next-line max-lines-per-function
function updatePropertyTypeIfDifferent(targetProp: PropertySignature, sourceProp: PropertySignature): void {
  const targetTypeNode = targetProp.getTypeNode();
  const sourceTypeNode = sourceProp.getTypeNode();

  if (!targetTypeNode || !sourceTypeNode) return;

  if (sourceTypeNode.getType().isUndefined() && targetProp.hasQuestionToken()) {
    return;
  }
  // If this is an alias type and the source is not skip if type matches
  if (targetTypeNode.getType().isUnion() && !sourceProp.getType().isUnion()) {
    const aliasTypes = targetTypeNode.getType().getUnionTypes();
    const hasAssignableType = aliasTypes.some(type => type.isAssignableTo(sourceTypeNode.getType()));
    if (hasAssignableType) {
      return;
    }
  }

  // If this is an tuple type and the source is an array type check if the types are assignable
  if (targetTypeNode.isKind(SyntaxKind.TupleType) && sourceTypeNode.isKind(SyntaxKind.ArrayType)) {
    const targetTypes = targetTypeNode.getType().getTupleElements();
    const sourceTypes = sourceTypeNode.getChildAtIndex(0).getType().getUnionTypes();
    let hasAssignableType = true;
    if (sourceTypes.length > 0) {
      for (const sourceType of sourceTypes) {
        if (!targetTypes.some(type => sourceType.isAssignableTo(type))) {
          hasAssignableType = false;
        }
      }
    } else {
      hasAssignableType = targetTypes.every(type => type.isAssignableTo(sourceTypeNode.getType()));
    }
    if (hasAssignableType) {
      return;
    }
  }

  let targetTypeText = targetTypeNode.getText();
  const sourceTypeText = sourceTypeNode.getText();

  // If target is indexed access type, update the text
  if (targetTypeNode.isKind(SyntaxKind.IndexedAccessType)) {
    targetTypeText = targetTypeNode.getType().getText();
  }

  if (targetTypeNode.isKind(SyntaxKind.UnionType)) {
    const targetTypes = targetTypeNode.getTypeNodes();

    // Check if source type appears in target types
    if (!targetTypes.some(type => type.getText() === sourceTypeText)) {
      // logger.debug(chalk.yellow(`Updating property type: ${targetProp.getName()} from ${targetTypeText} to ${sourceTypeText}`));
      targetProp.setType(sourceTypeText);
    }
  } else if (targetTypeText !== sourceTypeText) {
    // Update the type if it's different
    // logger.debug(chalk.yellow(`Updating property type: ${targetProp.getName()} from ${targetTypeText} to ${sourceTypeText}`));
    targetProp.setType(sourceTypeText.replace(/import\(".+?\)\./, ''));
  }

  // Update optional status if different
  if (targetProp.hasQuestionToken() !== sourceProp.hasQuestionToken()) {
    targetProp.setHasQuestionToken(sourceProp.hasQuestionToken());
  }

  // Update readonly status if different
  if (targetProp.isReadonly() !== sourceProp.isReadonly()) {
    targetProp.setIsReadonly(sourceProp.isReadonly());
  }
}

// NOTE: we don't really want to remove interfaces as they might still be used in another file
// function checkForAddedOrRemovedInterfaces(targetTypeNode: TypeNode, sourceTypeNode: TypeNode): void {
//   const targetTypes = targetTypeNode.getDescendantsOfKind(SyntaxKind.TypeReference);
//   const sourceTypes = sourceTypeNode.getDescendantsOfKind(SyntaxKind.TypeReference);

//   if (targetTypeNode.isKind(SyntaxKind.TypeReference)) {
//     targetTypes.push(targetTypeNode);
//   }

//   if (sourceTypeNode.isKind(SyntaxKind.TypeReference)) {
//     sourceTypes.push(sourceTypeNode);
//   }

//   const addedTypes = sourceTypes.filter(type => !targetTypes.some(targetType => targetType.getText() === type.getText()));
//   const removedTypes = targetTypes.filter(type => !sourceTypes.some(sourceType => sourceType.getText() === type.getText()));

//   // TODO: this might not be needed anymore
//   for (const addedType of addedTypes) {
//     addMissingInterface(addedType.getType());
//   }

//   for (const removedType of removedTypes) {
//     const interfaceDeclaration = getInterfaceDeclaration(removedType);
//     if (interfaceDeclaration?.isKind(SyntaxKind.InterfaceDeclaration) === true) {
//       interfaceDeclaration.remove();
//     }
//   }
// }

// const validInterfaceNames = [
//   'Set',
//   'ObservableSet',
//   'Map',
//   'ObservableMap',
// ];

// /**
//  * Checks if a node represents an interface type
//  * @param typeNode The type node to check
//  * @returns True if the node represents an interface type
//  */
// function isInterfaceType(typeNode: Node): boolean {
//   // Check if the type node is a type reference (like an interface name)
//   return typeNode.isKind(SyntaxKind.TypeReference) && !validInterfaceNames.some(name => isOfInterfaceType(name, typeNode));
// }
