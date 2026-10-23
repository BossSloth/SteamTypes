import { EnumDeclaration, EnumMember, PropertySignature, TypeNode } from 'ts-morph';
import type { InterfaceReferenceResolver } from '../matching/InterfaceReferenceResolver';
import type { ComparisonSession } from '../session/ComparisonSession';
import type { TypeReconciler } from './TypeReconciler';
import { CustomJsDocTags, getJsDocTagValues, getTypeText, hasJsDocTag, isImportedType, updatePropertyModifiers } from '../shared';

/**
 * Reconciles property types and modifiers. Mutates the target property, the target file (adds enums, enum members)
 * and, through the references resolver and type reconciler, interfaces and source type nodes.
 */
export class PropertyReconciler {
  private readonly session: ComparisonSession;
  private readonly references: InterfaceReferenceResolver;
  private readonly types: TypeReconciler;

  public constructor(session: ComparisonSession, references: InterfaceReferenceResolver, types: TypeReconciler) {
    this.session = session;
    this.references = references;
    this.types = types;
  }

  /**
   * Compares and corrects property types
   * @param targetProp The property to be edited
   * @param sourceProp The property to compare against
   * @param isFromExtendedInterface Whether the property is from an extended interface
   *
   * @returns true if the property is from an extended interface and needs to be changed
   */
  public reconcile(targetProp: PropertySignature, sourceProp: PropertySignature, isFromExtendedInterface: boolean): boolean {
    const targetTypeNode = targetProp.getTypeNode();
    const sourceTypeNode = sourceProp.getTypeNode();

    if (hasJsDocTag(targetProp, CustomJsDocTags.ignore)) {
      return false;
    }

    // Handle case where one of the types is missing
    if (!targetTypeNode || !sourceTypeNode) {
      if (sourceTypeNode && !targetTypeNode) {
        targetProp.setType(sourceTypeNode.getText());
      }

      return false;
    }

    // Handle enums first
    if (this.compareEnums(targetProp, sourceProp)) {
      return false;
    }

    this.references.resolveTypeReferences(targetTypeNode, sourceTypeNode);

    // Update the type if different
    return this.updatePropertyTypeIfDifferent(targetProp, sourceProp, isFromExtendedInterface);
  }

  /**
   * Compares two enum properties and updates the target property if different
   *
   * @returns true if the rest of the comparison should be skipped
   */
  private compareEnums(targetProp: PropertySignature, sourceProp: PropertySignature): boolean {
    // Check if the source property has a @currentValue JSDoc tag (indicating it's an enum)
    const currentStrValues = getJsDocTagValues(sourceProp, CustomJsDocTags.currentValue);
    const enumCurrentValues = currentStrValues.length > 0 ? currentStrValues.map((value) => parseInt(value)) : undefined;

    // If it's an enum in the source, preserve the type and copy the JSDoc
    if (enumCurrentValues !== undefined) {
      const targetTypeNode = targetProp.getTypeNode();
      if (targetTypeNode && isImportedType(this.session.targetFile, targetTypeNode)) {
        return true;
      }

      if (targetProp.getType().isTypeParameter()) {
        return true;
      }

      if (!targetProp.getType().isEnum()) {
        const enumName = sourceProp.getName().replace(/^m_e|^e(?=[A-Z])/, 'E');
        const enumNameWithoutPrefix = enumName.replace(/^E/, '');
        // Check if the enum already exists in the target file
        const existingEnum = this.session.targetFile.getEnum(enumName) ?? this.session.targetFile.getEnum(enumNameWithoutPrefix);
        if (!existingEnum) {
          // Add new enum to target
          this.session.targetFile.addEnum({
            name: enumName,
            members: enumCurrentValues.map((value) => ({
              name: `${enumName}${value}`,
              value,
            })),
            isExported: true,
            docs: ['@generated'],
          });
        }

        // Update target property to use the new enum
        targetProp.setType(existingEnum?.getName() ?? enumName);

        return true;
      }

      const targetSymbol = targetProp.getType().getSymbol();
      /* v8 ignore next -- enum types always resolve to a symbol @preserve */
      if (!targetSymbol) {
        throw new Error(`Failed to get symbol for property ${targetProp.getName()}`);
      }
      const enumDeclaration = targetSymbol.getDeclarations()[0] as EnumDeclaration;

      const enumMembers = enumDeclaration.getMembers();

      const validMaskNames = ['mask', 'flags'];

      // Do special checks if enum is a bitfield/mask/flags
      for (const enumCurrentValue of enumCurrentValues) {
        if (validMaskNames.some((name) => enumDeclaration.getName().toLowerCase().includes(name))) {
          checkBitfield(enumDeclaration, enumCurrentValue, enumMembers);
        } else if (!enumMembers.some((member) => member.getValue() === enumCurrentValue)) {
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

  /**
   * Updates a property's type if it's different from the source
   */
  private updatePropertyTypeIfDifferent(
    targetProp: PropertySignature,
    sourceProp: PropertySignature,
    isFromExtendedInterface: boolean,
  ): boolean {
    const targetTypeNode = targetProp.getTypeNodeOrThrow();
    const sourceTypeNode = sourceProp.getTypeNodeOrThrow();

    const needsExtendUpdate = this.updateTypeIfNeeded(targetProp, targetTypeNode, sourceTypeNode, isFromExtendedInterface);
    updatePropertyModifiers(targetProp, sourceProp);

    return needsExtendUpdate;
  }

  private updateTypeIfNeeded(
    targetProp: PropertySignature,
    targetTypeNode: TypeNode,
    sourceTypeNode: TypeNode,
    isFromExtendedInterface: boolean,
  ): boolean {
    const typesAreEqual = this.types.reconcile(targetTypeNode, sourceTypeNode);
    if (!typesAreEqual) {
      if (isFromExtendedInterface) {
        return true;
      }
      targetProp.setType(getTypeText(sourceTypeNode));
    }

    return false;
  }
}

function checkBitfield(enumDeclaration: EnumDeclaration, enumCurrentValue: number, enumMembers: EnumMember[]): void {
  // For bitfields/masks/flags, check if the value is a power of 2 or a combination of existing values
  const existingValues = enumMembers.map((member) => member.getValue() as number);
  const allFlags = existingValues.reduce((acc, flag) => acc | flag, 0);
  const isValueCovered =
    existingValues.includes(enumCurrentValue) || (enumCurrentValue > 0 && (enumCurrentValue & allFlags) === enumCurrentValue);

  if (!isValueCovered) {
    // Add new flag enum member
    enumDeclaration.addMember({
      name: `Flag_${enumCurrentValue}`,
      value: enumCurrentValue,
      docs: ['@generated bitfield value'],
    });
  }
}
