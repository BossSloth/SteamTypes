import { InterfaceDeclaration, PropertySignature, SyntaxKind, TypeReferenceNode } from 'ts-morph';
import type { ComparisonSession } from '../session/ComparisonSession';
import { getInterfaceDeclaration, getInterfaceMembers } from '../shared';
import { REQUIRED_OVERLAP } from './InterfaceMatcher';

/** Aggregated information about a property across all source union members. */
interface MergedPropertyInfo {
  /** A representative declaration used to copy structure (docs, modifiers) when adding. */
  representative: PropertySignature;
  /** Distinct type texts seen across the source members. */
  types: Set<string>;
  /** How many source members declare this property. */
  presentCount: number;
  /** How many source members declare this property as optional. */
  optionalCount: number;
}

/**
 * Collects every property across all source union members, aggregating their distinct
 * types, how often they appear, and how often they are optional.
 */
function collectMergedProperties(sourceInterfaces: InterfaceDeclaration[]): Map<string, MergedPropertyInfo> {
  const merged = new Map<string, MergedPropertyInfo>();

  for (const sourceInterface of sourceInterfaces) {
    const properties = getInterfaceMembers(sourceInterface).filter((prop): prop is PropertySignature =>
      prop.isKind(SyntaxKind.PropertySignature),
    );

    for (const prop of properties) {
      const propName = prop.getName();
      let info = merged.get(propName);
      if (info === undefined) {
        info = { representative: prop, types: new Set(), presentCount: 0, optionalCount: 0 };
        merged.set(propName, info);
      }

      info.presentCount++;
      if (prop.hasQuestionToken()) {
        info.optionalCount++;
      }
      const typeNode = prop.getTypeNode();
      if (typeNode) {
        info.types.add(typeNode.getText());
      }
    }
  }

  return merged;
}

/**
 * Checks whether the source union members represent a manual merge into the single target
 * interface. This is the case when the target overlaps enough with the union of all source
 * properties and the types of the properties they share are compatible. Missing properties
 * and optionality mismatches are intentionally allowed here - they are corrected during the
 * merge (missing properties are added as optional, required properties only present in some
 * members are made optional).
 */
export function canMergeIntoTarget(sourceInterfaces: TypeReferenceNode[], targetInterface: InterfaceDeclaration): boolean {
  const targetPropMap = new Map<string, string>();
  for (const prop of getInterfaceMembers(targetInterface).filter((p) => p.isKind(SyntaxKind.PropertySignature))) {
    const typeNode = prop.getTypeNode();
    targetPropMap.set(prop.getName(), typeNode ? typeNode.getText() : 'any');
  }

  const sourceDeclarations = sourceInterfaces
    .map((ref) => getInterfaceDeclaration(ref))
    .filter((decl): decl is InterfaceDeclaration => decl !== undefined);
  const allSourceProperties = collectMergedProperties(sourceDeclarations);

  // Overlap gate: too few shared property names means the single target is unlikely to be a
  // merged representation of the source union, so leave it to the normal per-interface handling.
  const sharedNames = [...allSourceProperties.keys()].filter((name) => targetPropMap.has(name)).length;
  const totalNames = new Set([...allSourceProperties.keys(), ...targetPropMap.keys()]).size;
  const overlap = totalNames === 0 ? 1 : sharedNames / totalNames;
  if (overlap < REQUIRED_OVERLAP) {
    return false;
  }

  // Type compatibility gate: only properties present in both must have compatible types.
  for (const [propName, info] of allSourceProperties) {
    const targetType = targetPropMap.get(propName);
    if (targetType === undefined) {
      // Missing in target - it will be added as an optional property during the merge.
      continue;
    }

    const allSourceTypesMatched = [...info.types].every(
      (sourceType) => targetType === sourceType || targetType.includes(sourceType),
    );

    if (!allSourceTypesMatched) {
      return false;
    }
  }

  return true;
}

/**
 * Merges all source union members into the single target interface. The first source member
 * becomes the merged interface: shared properties keep their type (unioned when members
 * disagree) and become optional when they are not present-and-required in every member;
 * properties missing from the first member are added as optional. The redundant source members
 * are folded into the first one (their references are renamed to the merged interface so unions
 * like `(A | B)[]` collapse to `(A | A)[]`) and the merged interface is queued for comparison.
 */
export function mergeSourcesIntoTarget(
  sourceInterfaces: TypeReferenceNode[],
  targetInterface: InterfaceDeclaration,
  session: ComparisonSession,
): void {
  const sourceDeclarations = sourceInterfaces
    .map((ref) => getInterfaceDeclaration(ref))
    .filter((decl): decl is InterfaceDeclaration => decl !== undefined);

  if (sourceDeclarations.length === 0) {
    return;
  }

  const totalSources = sourceDeclarations.length;
  const mergedProperties = collectMergedProperties(sourceDeclarations);
  const primary = sourceDeclarations[0];

  for (const [propName, info] of mergedProperties) {
    const shouldBeOptional = info.presentCount < totalSources || info.optionalCount > 0;
    const mergedType = [...info.types].join(' | ');
    const existing = primary.getProperty(propName);

    if (existing) {
      // Union distinct types when the members disagree on this property's type.
      if (info.types.size > 1 && existing.getTypeNode()?.getText() !== mergedType) {
        existing.setType(mergedType);
      }
      if (shouldBeOptional && !existing.hasQuestionToken()) {
        existing.setHasQuestionToken(true);
      }
    } else {
      primary.addProperty({
        ...info.representative.getStructure(),
        type: mergedType,
        hasQuestionToken: shouldBeOptional,
      });
    }
  }

  // Fold the redundant members into the primary: renaming their references to the primary's
  // name collapses the source unions (e.g. `(A | B)[]` -> `(A | A)[]`) everywhere they are used,
  // including in other properties, before dropping their now-unused declarations.
  const primaryName = primary.getName();
  for (const declaration of sourceDeclarations.slice(1)) {
    if (declaration.wasForgotten() || declaration.getName() === primaryName) {
      continue;
    }
    declaration.rename(primaryName);
    declaration.remove();
  }

  primary.rename(targetInterface.getName());

  session.enqueue(targetInterface, primary);
}
