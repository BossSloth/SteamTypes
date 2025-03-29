import { EnumDeclaration, PropertySignature, SyntaxKind, TypeNode, UnionTypeNode } from 'ts-morph';
import { handleInterfaceTypeReferences } from './handle-interfaces';
import { currentTargetSourceFile } from './interface-comparator';
import { getJsDocTagValue, isImportedType } from './shared';

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
  if (isImportedType(currentTargetSourceFile, targetProp.getType())) {
    return;
  }

  // Handle enums first
  if (compareEnums(targetProp, sourceProp)) {
    return;
  }

  handleInterfaceTypeReferences(targetTypeNode, sourceTypeNode);

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
function updatePropertyTypeIfDifferent(targetProp: PropertySignature, sourceProp: PropertySignature): void {
  const targetTypeNode = targetProp.getTypeNode();
  const sourceTypeNode = sourceProp.getTypeNode();

  if (!targetTypeNode || !sourceTypeNode) return;

  if (shouldSkipTypeUpdate(targetProp, sourceProp, targetTypeNode, sourceTypeNode)) {
    return;
  }

  updateTypeIfNeeded(targetProp, targetTypeNode, sourceTypeNode);
  updatePropertyModifiers(targetProp, sourceProp);
}

function shouldSkipTypeUpdate(
  targetProp: PropertySignature,
  sourceProp: PropertySignature,
  targetTypeNode: TypeNode,
  sourceTypeNode: TypeNode,
): boolean {
  // Skip undefined or never types
  if ((sourceTypeNode.getType().isUndefined() && targetProp.hasQuestionToken()) || sourceTypeNode.getType().isNever()) {
    return true;
  }

  // Skip if union type already has assignable type
  if (targetTypeNode.getType().isUnion() && !sourceProp.getType().isUnion()) {
    const aliasTypes = targetTypeNode.getType().getUnionTypes();
    const hasAssignableType = aliasTypes.some(type => type.isAssignableTo(sourceTypeNode.getType()));
    if (hasAssignableType) {
      return true;
    }
  }

  // Skip if tuple and array types are compatible
  if (targetTypeNode.isKind(SyntaxKind.TupleType) && sourceTypeNode.isKind(SyntaxKind.ArrayType)) {
    return isTupleCompatibleWithArray(targetTypeNode, sourceTypeNode);
  }

  // Skip if source is an unknown array and target is an array
  if (sourceTypeNode.isKind(SyntaxKind.ArrayType) && targetTypeNode.isKind(SyntaxKind.ArrayType)) {
    const sourceElementType = sourceTypeNode.getElementTypeNode().getType();
    if (sourceElementType.isUnknown()) {
      return true;
    }
  }

  // Skip if string or number literal
  if (targetTypeNode.isKind(SyntaxKind.LiteralType) && (sourceTypeNode.isKind(SyntaxKind.StringKeyword) || sourceTypeNode.isKind(SyntaxKind.NumberKeyword))) {
    // Check if the literal value is the same
    const targetLiteralValue = targetTypeNode.getType().getBaseTypeOfLiteralType().getText();
    const sourceLiteralValue = sourceTypeNode.getType().getBaseTypeOfLiteralType().getText();
    if (targetLiteralValue === sourceLiteralValue) {
      return true;
    }
  }

  return false;
}

function isTupleCompatibleWithArray(targetTypeNode: TypeNode, sourceTypeNode: TypeNode): boolean {
  const targetTypes = targetTypeNode.getType().getTupleElements();
  const sourceTypes = sourceTypeNode.getChildAtIndex(0).getType().getUnionTypes();

  if (sourceTypes.length > 0) {
    for (const sourceType of sourceTypes) {
      if (!targetTypes.some(type => sourceType.isAssignableTo(type))) {
        return false;
      }
    }

    return true;
  }

  return targetTypes.every(type => type.isAssignableTo(sourceTypeNode.getType()));
}

function updateTypeIfNeeded(
  targetProp: PropertySignature,
  targetTypeNode: TypeNode,
  sourceTypeNode: TypeNode,
): void {
  let targetTypeText = targetTypeNode.getText();
  const sourceTypeText = sourceTypeNode.getText();

  // Handle indexed access type
  if (targetTypeNode.isKind(SyntaxKind.IndexedAccessType)) {
    targetTypeText = targetTypeNode.getType().getText();
  }

  if (targetTypeNode.isKind(SyntaxKind.UnionType)) {
    updateUnionType(targetProp, targetTypeNode, sourceTypeText);
  } else if (targetTypeText !== sourceTypeText) {
    targetProp.setType(sourceTypeText.replace(/import\(".+?\)\./, ''));
  }
}

function updateUnionType(targetProp: PropertySignature, targetTypeNode: TypeNode, sourceTypeText: string): void {
  const targetTypes = (targetTypeNode as UnionTypeNode).getTypeNodes();

  // Check if source type appears in target types
  if (!targetTypes.some(type => type.getText() === sourceTypeText)) {
    targetProp.setType(sourceTypeText);
  }
}

function updatePropertyModifiers(targetProp: PropertySignature, sourceProp: PropertySignature): void {
  // Update optional status if different
  if (!targetProp.hasQuestionToken() && sourceProp.hasQuestionToken()) {
    targetProp.setHasQuestionToken(sourceProp.hasQuestionToken());
  }

  // Update readonly status if different
  if (targetProp.isReadonly() !== sourceProp.isReadonly()) {
    targetProp.setIsReadonly(sourceProp.isReadonly());
  }
}
