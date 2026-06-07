import { InterfaceDeclaration, PropertySignature, SyntaxKind, Type, TypeNode, TypeReferenceNode } from 'ts-morph';
import { orderMembers } from './interface-comparator';
import { currentStartingInterfaces, currentTargetSourceFile, CustomJsDocTags, getIdentifierName, getInterfaceMembers, getJsDocTagValues, interfaceQueue, isImportedType } from './shared';

const REQUIRED_OVERLAP = 0.65;

/**
 * Handles interface type references by adding them to the processing queue
 */
export function handleInterfaceTypeReferences(targetTypeNode: TypeNode, sourceTypeNode: TypeNode): void {
  // Extract all interface references from both types
  const targetInterfaces = extractInterfaceReferences(targetTypeNode);
  let sourceInterfaces = extractInterfaceReferences(sourceTypeNode);

  // Check if target has a single interface and source has multiple (manual merge case)
  if (targetInterfaces.length === 1 && sourceInterfaces.length > 1) {
    const targetInterfaceDeclaration = getInterfaceDeclaration(targetInterfaces[0]);
    if (targetInterfaceDeclaration && canMergeIntoTarget(sourceInterfaces, targetInterfaceDeclaration)) {
      mergeSourcesIntoTarget(sourceInterfaces, targetInterfaceDeclaration);

      return;
    }
  }

  // Rename and remove any imported interfaces
  for (let i = 0; i < sourceInterfaces.length; i++) {
    const sourceInterface = sourceInterfaces[i];
    const targetInterface = targetInterfaces[i] as TypeReferenceNode | undefined;

    if (targetInterface === undefined) {
      continue;
    }

    if (isImportedType(currentTargetSourceFile, targetInterface.getType()) && !isImportedType(sourceInterface.getSourceFile(), sourceInterface.getType())) {
      const sourceInterfaceDeclaration = getInterfaceDeclaration(sourceInterface);
      if (!sourceInterfaceDeclaration) {
        // We get here if the interface was for example already renamed and now doesn't exist anymore, so we can ignore this
        continue;
      }

      sourceInterfaceDeclaration.rename(getIdentifierName(targetInterface));
      sourceInterfaceDeclaration.remove();
    }
  }
  sourceInterfaces = extractInterfaceReferences(sourceTypeNode);

  // For each source interface, find a matching target interface and update it
  for (const sourceInterface of sourceInterfaces) {
    const sourceInterfaceDeclaration = getInterfaceDeclaration(sourceInterface);
    if (!sourceInterfaceDeclaration) {
      continue;
    }
    const sourceInterfaceName = sourceInterface.getTypeName().getText();

    // Try to find a matching interface by name first
    const matchingTargetInterface = targetInterfaces.find(i => i.getTypeName().getText() === sourceInterfaceName);
    let targetInterfaceDeclaration: InterfaceDeclaration | undefined;

    // If no exact name match, try to find by structure similarity
    if (!matchingTargetInterface) {
      targetInterfaceDeclaration = findSimilarInterface(sourceInterfaceDeclaration);

      // Never collapse an extra source derived interface into a target base.
      if (targetInterfaceDeclaration && isDerivedToBaseMismatch(sourceInterfaceDeclaration, targetInterfaceDeclaration)) {
        targetInterfaceDeclaration = undefined;
      }
    } else {
      targetInterfaceDeclaration = getInterfaceDeclaration(matchingTargetInterface);
    }

    if (targetInterfaceDeclaration) {
      sourceInterfaceDeclaration.rename(targetInterfaceDeclaration.getName());
      interfaceQueue.push({
        targetInterface: targetInterfaceDeclaration,
        sourceInterface: sourceInterfaceDeclaration,
      });
    } else {
      // If no matching interface found, add the source interface to the target
      addMissingInterface(sourceInterface);
    }
  }
}

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
    const properties = getInterfaceMembers(sourceInterface)
      .filter((prop): prop is PropertySignature => prop.isKind(SyntaxKind.PropertySignature));

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
function canMergeIntoTarget(sourceInterfaces: TypeReferenceNode[], targetInterface: InterfaceDeclaration): boolean {
  const targetPropMap = new Map<string, string>();
  for (const prop of getInterfaceMembers(targetInterface).filter(p => p.isKind(SyntaxKind.PropertySignature))) {
    const typeNode = prop.getTypeNode();
    targetPropMap.set(prop.getName(), typeNode ? typeNode.getText() : 'any');
  }

  const sourceDeclarations = sourceInterfaces
    .map(ref => getInterfaceDeclaration(ref))
    .filter((decl): decl is InterfaceDeclaration => decl !== undefined);
  const allSourceProperties = collectMergedProperties(sourceDeclarations);

  // Overlap gate: too few shared property names means the single target is unlikely to be a
  // merged representation of the source union, so leave it to the normal per-interface handling.
  const sharedNames = [...allSourceProperties.keys()].filter(name => targetPropMap.has(name)).length;
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

    const allSourceTypesMatched = [...info.types].every(sourceType =>
      targetType === sourceType || targetType.includes(sourceType));

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
function mergeSourcesIntoTarget(
  sourceInterfaces: TypeReferenceNode[],
  targetInterface: InterfaceDeclaration,
): void {
  const sourceDeclarations = sourceInterfaces
    .map(ref => getInterfaceDeclaration(ref))
    .filter((decl): decl is InterfaceDeclaration => decl !== undefined);

  /* v8 ignore next -- canMergeIntoTarget already validated there are source declarations @preserve */
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
    /* v8 ignore next -- defensive: declarations are not forgotten before this point @preserve */
    if (declaration.wasForgotten() || declaration.getName() === primaryName) {
      continue;
    }
    declaration.rename(primaryName);
    declaration.remove();
  }

  primary.rename(targetInterface.getName());

  interfaceQueue.push({ targetInterface, sourceInterface: primary });
}

/**
 * Extracts all interface references from a type, including those in arrays, unions, etc.
 */
function extractInterfaceReferences(type: TypeNode): TypeReferenceNode[] {
  const interfaces: TypeReferenceNode[] = [];

  if (type.isKind(SyntaxKind.TypeReference)) {
    interfaces.push(type);
  }

  interfaces.push(...type.getDescendantsOfKind(SyntaxKind.TypeReference));

  return interfaces.filter(interf => (interf.getType().getSymbol()?.getDeclarations()
    .some(d => d.isKind(SyntaxKind.InterfaceDeclaration)) === true) || isImportedType(currentTargetSourceFile, interf));
}

/**
 * Finds a similar interface based on property structure
 * Uses a similarity score to determine the best match
 */
export function findSimilarInterface(sourceInterface: InterfaceDeclaration): InterfaceDeclaration | undefined {
  const targetInterfaces = currentStartingInterfaces.filter(i => !i.wasForgotten());
  const sourceInterfaceName = sourceInterface.getName();

  // Check for @compareOriginalName match first
  for (const targetInterface of targetInterfaces) {
    const originalNames = getJsDocTagValues(targetInterface, CustomJsDocTags.originalName);
    if (originalNames.includes(sourceInterfaceName)) {
      return targetInterface;
    }
  }

  let bestMatch: InterfaceDeclaration | undefined;
  let highestScore = 0;

  const sourceProperties = getInterfaceProperties(sourceInterface);

  for (const targetInterface of targetInterfaces) {
    const targetProperties = getInterfaceProperties(targetInterface);

    // Calculate similarity score (0-1)
    const score = calculateSimilarityScore(sourceProperties, targetProperties);

    // If score is above threshold (e.g., 0.65 for 65% similarity)
    if (score >= REQUIRED_OVERLAP && score > highestScore) {
      highestScore = score;
      bestMatch = targetInterface;
    }
  }

  return bestMatch;
}

/**
 * Gets all properties of an interface type
 */
function getInterfaceProperties(interfaceDeclaration: InterfaceDeclaration): { name: string; type: string; }[] {
  const properties: { name: string; type: string; }[] = [];

  for (const property of getInterfaceMembers(interfaceDeclaration)) {
    // const propertyType = property.getType();
    // let type = propertyType.getText().replace(/import\(".+?\)\./, '');
    // if (property.getType().getFlags() | TypeFlags.NonPrimitive) {
    //   type = 'Interface';
    // }
    // TODO: This was bugged because the or would always succeed but with a check like propertyType.isObject() a lot of tests fail because generics are not properly handled
    // For now, we'll just mark all properties as 'Interface' to avoid the issue and maybe refactor it in the future
    const type = 'Interface';
    properties.push({
      name: property.getName(),
      type,
    });
  }

  return properties;
}

/**
 * Calculates a similarity score between two sets of properties
 * Returns a value between 0 (no similarity) and 1 (identical)
 */
function calculateSimilarityScore(
  sourceProps: { name: string; type: string; }[],
  targetProps: { name: string; type: string; }[],
): number {
  if (sourceProps.length === 0 && targetProps.length === 0) return 1;
  if (sourceProps.length === 0 || targetProps.length === 0) return 0;

  // Count matching properties
  let matchingProps = 0;

  for (const sourceProp of sourceProps) {
    const matchingTargetProp = targetProps.find(tp =>
      /* v8 ignore next -- @preserve */
      tp.name === sourceProp.name && (tp.type === sourceProp.type || sourceProp.type.includes('unknown')));

    if (matchingTargetProp) {
      matchingProps++;
      matchingTargetProp.type = sourceProp.type;
    }
  }

  // Calculate Jaccard similarity: intersection / union
  const totalUniqueProps = new Set([
    ...sourceProps.map(p => `${p.name}:${p.type}`),
    ...targetProps.map(p => `${p.name}:${p.type}`),
  ]).size;

  return matchingProps / totalUniqueProps;
}

/**
 * A derived source interface (one that extends something) shares all of its base's
 * members, so structure similarity will wrongly match it to a target base interface.
 * Returns true when the matched target is itself a base (extended by other target
 * interfaces), meaning the match should be rejected so the source interface is added
 * on its own instead of being collapsed into the shared base.
 */
function isDerivedToBaseMismatch(sourceInterface: InterfaceDeclaration, matchedTarget: InterfaceDeclaration): boolean {
  if (sourceInterface.getExtends().length === 0) {
    return false;
  }

  return currentTargetSourceFile.getInterfaces().some(other =>
    other !== matchedTarget
    && other.getExtends().some(ext => getInterfaceDeclaration(ext.getExpression().getType()) === matchedTarget));
}

function getInterfaceDeclaration(type: TypeNode | Type): InterfaceDeclaration | undefined {
  /* v8 ignore next -- @preserve */
  if (type instanceof TypeNode) {
    type = type.getType();
  }

  const symbol = type.getSymbol();
  if (!symbol) return undefined;

  return symbol.getDeclarations().find(d => d.isKind(SyntaxKind.InterfaceDeclaration));
}

/**
 * Repoints a freshly added interface's `extends` clauses at the matching target base.
 * The structure is copied verbatim from the source, so a renamed base (e.g. matched via
 * `@compareOriginalName`) would otherwise leave a dangling reference to the source's name.
 */
function remapNewInterfaceExtends(newInterface: InterfaceDeclaration, sourceInterface: InterfaceDeclaration): void {
  const sourceExtends = sourceInterface.getExtends();
  newInterface.getExtends().forEach(ext => newInterface.removeExtends(ext));

  for (const sourceExt of sourceExtends) {
    const sourceExtName = sourceExt.getExpression().getText();
    let targetExtName = sourceExtName;

    // Only remap when the source's base name is missing from the target.
    if (!currentTargetSourceFile.getInterface(sourceExtName)) {
      const sourceExtInterface = sourceInterface.getSourceFile().getInterface(sourceExtName);
      /* v8 ignore next -- a generated source base is always a declared interface @preserve */
      const similarTarget = sourceExtInterface ? findSimilarInterface(sourceExtInterface) : undefined;
      if (similarTarget) {
        targetExtName = similarTarget.getName();
      }
    }

    newInterface.addExtends(sourceExt.getText().replace(sourceExtName, targetExtName));
  }
}

/**
 * Adds a missing interface to the target file
 */
export function addMissingInterface(type: TypeNode, currentIteration = 0): void {
  // if (currentIteration > 10) {
  //   return;
  // }

  const typeReferences = type.getDescendantsOfKind(SyntaxKind.TypeReference);
  if (type.isKind(SyntaxKind.TypeReference)) {
    typeReferences.push(type);
  }

  for (const typeReference of typeReferences) {
    const interfaceDeclaration = getInterfaceDeclaration(typeReference);
    if (!interfaceDeclaration) return;

    const interfaceName = interfaceDeclaration.getName();
    const existingInterface = currentTargetSourceFile.getInterface(interfaceName);
    if (existingInterface) {
      return;
    }

    const similarInterface = findSimilarInterface(interfaceDeclaration);
    // A derived interface always matches its own base via structure similarity, so ignore
    // such matches here and add the interface instead of treating it as a base rename.
    if (similarInterface && !isDerivedToBaseMismatch(interfaceDeclaration, similarInterface)) {
      // If the source file also contains an interface with the similar's name,
      // both coexist in source -> this is a genuinely new interface, not a rename. Add it.
      const sourceHasSimilarByName = interfaceDeclaration.getSourceFile().getInterface(similarInterface.getName()) !== undefined;
      if (!sourceHasSimilarByName) {
        return;
      }
    }

    // Add the interface to the target source file
    const newInterface = currentTargetSourceFile.addInterface(interfaceDeclaration.getStructure());
    remapNewInterfaceExtends(newInterface, interfaceDeclaration);
    orderMembers(newInterface);

    // Recursively process referenced interfaces
    interfaceDeclaration.forEachDescendant((child) => {
      if (child.isKind(SyntaxKind.TypeReference)) {
        addMissingInterface(child, currentIteration + 1);
      }
    });
  }
}
