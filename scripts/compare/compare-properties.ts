import { EnumDeclaration, EnumMember, PropertySignature, TypeNode } from 'ts-morph';
import { handleInterfaceTypeReferences } from './handle-interfaces';
import { currentTargetSourceFile, getJsDocTagValues, isImportedType } from './shared';
import * as TypeComparator from './type-comparator';

const CustomJsDocTags = {
  originalName: 'compareOriginalName',
  currentValue: 'currentValue',
};

/**
 * Compares and corrects property types
 * @param targetProp The property to be edited
 * @param sourceProp The property to compare against
 * @param isFromExtendedInterface Whether the property is from an extended interface
 *
 * @returns true if the property is from an extended interface and needs to be changed
 */
export function compareAndCorrectPropertyTypes(
  targetProp: PropertySignature,
  sourceProp: PropertySignature,
  isFromExtendedInterface: boolean,
): boolean {
  const targetTypeNode = targetProp.getTypeNode();
  const sourceTypeNode = sourceProp.getTypeNode();

  // Handle case where one of the types is missing
  if (!targetTypeNode || !sourceTypeNode) {
    if (sourceTypeNode && !targetTypeNode) {
      targetProp.setType(sourceTypeNode.getText());
    }

    return false;
  }

  // Check if the target type is imported
  if (isImportedType(currentTargetSourceFile, targetProp.getType())) {
    return false;
  }

  // Handle enums first
  if (compareEnums(targetProp, sourceProp)) {
    return false;
  }

  handleInterfaceTypeReferences(targetTypeNode, sourceTypeNode);

  // Update the type if different
  return updatePropertyTypeIfDifferent(targetProp, sourceProp, isFromExtendedInterface);
}

/**
 * Compares two enum properties and updates the target property if different
 *
 * @returns true if the rest of the comparison should be skipped
 */
function compareEnums(targetProp: PropertySignature, sourceProp: PropertySignature): boolean {
  // Check if the source property has a @currentValue JSDoc tag (indicating it's an enum)
  const currentStrValues = getJsDocTagValues(sourceProp, CustomJsDocTags.currentValue);
  const enumCurrentValues = currentStrValues.length > 0 ? currentStrValues.map(value => parseInt(value)) : undefined;

  // If it's an enum in the source, preserve the type and copy the JSDoc
  if (enumCurrentValues !== undefined) {
    if (!targetProp.getType().isEnum()) {
      const enumName = sourceProp.getName().replace(/^m_e|^e(?=[A-Z])/, 'E');
      // Check if the enum already exists in the target file
      const existingEnum = currentTargetSourceFile.getEnum(enumName);
      if (!existingEnum) {
        // Add new enum to target
        currentTargetSourceFile.addEnum({
          name: enumName,
          members: enumCurrentValues.map(value => ({
            name: `${enumName}${value}`,
            value,
          })),
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

    const validMaskNames = ['mask', 'flags'];

    // Do special checks if enum is a bitfield/mask/flags
    for (const enumCurrentValue of enumCurrentValues) {
      if (validMaskNames.some(name => enumDeclaration.getName().toLowerCase().includes(name))) {
        checkBitfield(enumDeclaration, enumCurrentValue, enumMembers);
      } else if (!enumMembers.some(member => member.getValue() === enumCurrentValue)) {
      // Add new enum member
        enumDeclaration.addMember({
          name: `TODO: change me ${enumCurrentValue}`,
          value: enumCurrentValue,
        });
      }
    }

    return true;
  }

  if (targetProp.getType().isEnum() && sourceProp.getType().isNumber()) {
    return true;
  }

  return false;
}

function checkBitfield(enumDeclaration: EnumDeclaration, enumCurrentValue: number, enumMembers: EnumMember[]): void {
  // For bitfields/masks/flags, check if the value is a power of 2 or a combination of existing values
  const existingValues = enumMembers.map(member => member.getValue() as number);
  const allFlags = existingValues.reduce((acc, flag) => acc | flag, 0);
  const isValueCovered = existingValues.includes(enumCurrentValue)
    || (enumCurrentValue > 0 && (enumCurrentValue & allFlags) === enumCurrentValue);

  if (!isValueCovered) {
    // Add new flag enum member
    enumDeclaration.addMember({
      name: `Flag_${enumCurrentValue}`,
      value: enumCurrentValue,
      docs: ['@generated bitfield value'],
    });
  }
}

/**
 * Updates a property's type if it's different from the source
 */
function updatePropertyTypeIfDifferent(targetProp: PropertySignature, sourceProp: PropertySignature, isFromExtendedInterface: boolean): boolean {
  const targetTypeNode = targetProp.getTypeNode();
  const sourceTypeNode = sourceProp.getTypeNode();

  if (!targetTypeNode || !sourceTypeNode) return false;

  const needsExtendUpdate = updateTypeIfNeeded(targetProp, targetTypeNode, sourceTypeNode, isFromExtendedInterface);
  updatePropertyModifiers(targetProp, sourceProp);

  return needsExtendUpdate;
}

function updateTypeIfNeeded(
  targetProp: PropertySignature,
  targetTypeNode: TypeNode,
  sourceTypeNode: TypeNode,
  isFromExtendedInterface: boolean,
): boolean {
  const typesAreEqual = TypeComparator.compareTypes(targetTypeNode, sourceTypeNode);
  if (!typesAreEqual) {
    if (isFromExtendedInterface) {
      return true;
    }
    targetProp.setType(TypeComparator.getText(sourceTypeNode));
  }

  return false;
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
