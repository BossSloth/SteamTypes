import { EnumDeclaration, Node, PropertySignature, SyntaxKind, TypeNode } from 'ts-morph';
import { currentSourceSourceFile, currentTargetSourceFile, interfaceQueue } from './interface-comparator';
import { getJsDocTagValue } from './shared';

const CustomJsDocTags = {
  originalName: 'compareOriginalName',
  currentValue: 'currentValue',
};

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
  if (isImportedType(targetProp)) {
    return;
  }

  if (compareEnums(targetProp, sourceProp)) {
    return;
  }

  // Handle interface references
  if (isInterfaceType(targetTypeNode) && isInterfaceType(sourceTypeNode)) {
    handleInterfaceTypeReferences(targetTypeNode, sourceTypeNode);

    return;
  }

  // If sourcefile is missing the interface, add it
  if (isInterfaceType(sourceTypeNode)) {
    const sourceTypeName = getTypeReferenceName(sourceTypeNode);
    if (sourceTypeName !== null && sourceTypeName.length > 0) {
      const sourceTypeInterface = currentSourceSourceFile.getInterface(sourceTypeName);
      if (sourceTypeInterface && !currentTargetSourceFile.getInterface(sourceTypeName)) {
        // Add the interface to the target source file
        currentTargetSourceFile.addInterface(sourceTypeInterface.getStructure());
      }
    }
  }

  // Update the type if different
  updatePropertyTypeIfDifferent(targetProp, sourceProp);
}

/**
   * Checks if a property type is imported
   */
function isImportedType(targetProp: PropertySignature): boolean {
  const isImported = currentTargetSourceFile.getImportDeclarations().some(importDecl =>
    importDecl.getNamedImports().some(importSpec => importSpec.getName() === targetProp.getType().getText()));

  return isImported;
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
   * Handles interface type references by adding them to the processing queue
   */
function handleInterfaceTypeReferences(targetTypeNode: TypeNode, sourceTypeNode: TypeNode): void {
  // If both types are interface references, find the interfaces and
  // add them to the queue for processing
  const targetTypeName = getTypeReferenceName(targetTypeNode);
  const sourceTypeName = getTypeReferenceName(sourceTypeNode);

  if (targetTypeName !== null && sourceTypeName !== null) {
    // Try to find the interfaces in their respective source files
    const targetTypeInterface = currentTargetSourceFile.getInterface(targetTypeName);
    const sourceTypeInterface = currentSourceSourceFile.getInterface(sourceTypeName);

    // Check if targetInterface has a original jsdoc
    const originalJsDoc = targetTypeInterface
      ?.getJsDocs()
      .find(doc => doc.getTags()[0]?.getTagName() === CustomJsDocTags.originalName);
    if (originalJsDoc && originalJsDoc.getText() === sourceTypeName) {
      sourceTypeInterface?.rename(targetTypeName);
    }

    // If both interfaces are found, add them to the queue for processing
    if (targetTypeInterface && sourceTypeInterface) {
      interfaceQueue.push({
        targetInterface: targetTypeInterface,
        sourceInterface: sourceTypeInterface,
      });
    }
  }
}

/**
   * Updates a property's type if it's different from the source
   */
function updatePropertyTypeIfDifferent(targetProp: PropertySignature, sourceProp: PropertySignature): void {
  const targetTypeNode = targetProp.getTypeNode();
  const sourceTypeNode = sourceProp.getTypeNode();

  if (!targetTypeNode || !sourceTypeNode) return;

  const targetTypeText = targetTypeNode.getType().getText();
  const sourceTypeText = sourceTypeNode.getType().getText();

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
    targetProp.setType(sourceTypeText);
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

/**
   * Gets the name of a type reference
   * @param typeNode The type node to extract the name from
   * @returns The name of the type reference or null if not a type reference
   */
function getTypeReferenceName(typeNode: TypeNode): string | null {
  if (typeNode.getKind() === SyntaxKind.TypeReference) {
    // Extract the name from the type reference
    return typeNode.getText().split('<')[0].trim();
  }

  return null;
}

/**
   * Checks if a node represents an interface type
   * @param typeNode The type node to check
   * @returns True if the node represents an interface type
   */
function isInterfaceType(typeNode: Node): boolean {
  // Check if the type node is a type reference (like an interface name)
  return typeNode.isKind(SyntaxKind.TypeReference);
}
