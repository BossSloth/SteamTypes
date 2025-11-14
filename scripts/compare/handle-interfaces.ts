import { InterfaceDeclaration, SyntaxKind, Type, TypeFlags, TypeNode, TypeReferenceNode } from 'ts-morph';
import { orderMembers } from './interface-comparator';
import { currentStartingInterfaces, currentTargetSourceFile, getIdentifierName, getInterfaceMembers, interfaceQueue, isImportedType } from './shared';

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
      // Rename all source interfaces to match the target and queue them for comparison
      for (const sourceInterface of sourceInterfaces) {
        const sourceInterfaceDeclaration = getInterfaceDeclaration(sourceInterface);
        if (sourceInterfaceDeclaration) {
          sourceInterfaceDeclaration.rename(targetInterfaceDeclaration.getName());
          interfaceQueue.push({
            targetInterface: targetInterfaceDeclaration,
            sourceInterface: sourceInterfaceDeclaration,
          });
        }
      }

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

/**
 * Checks if all source interfaces can be merged into the target interface
 * This is true when the target has all properties from all source interfaces,
 * with appropriate optional markers
 */
function canMergeIntoTarget(sourceInterfaces: TypeReferenceNode[], targetInterface: InterfaceDeclaration): boolean {
  const targetProperties = getInterfaceMembers(targetInterface).filter(prop => prop.isKind(SyntaxKind.PropertySignature));
  const targetPropMap = new Map<string, { optional: boolean; type: string; }>();

  // Build a map of target properties
  for (const prop of targetProperties) {
    const typeNode = prop.getTypeNode();
    targetPropMap.set(prop.getName(), {
      optional: prop.hasQuestionToken(),
      type: typeNode ? typeNode.getText() : 'any',
    });
  }

  // Collect all properties from all source interfaces
  // Map: propName -> { types: Set<string>, interfaceCount: number }
  const allSourceProperties = new Map<string, { types: Set<string>; interfaceCount: number; }>();
  let totalSourceInterfaces = 0;

  for (const sourceInterfaceRef of sourceInterfaces) {
    const sourceInterface = getInterfaceDeclaration(sourceInterfaceRef);
    if (!sourceInterface) {
      continue;
    }

    totalSourceInterfaces++;
    const sourceProperties = getInterfaceMembers(sourceInterface).filter(prop => prop.isKind(SyntaxKind.PropertySignature));

    for (const sourceProp of sourceProperties) {
      const propName = sourceProp.getName();
      if (!allSourceProperties.has(propName)) {
        allSourceProperties.set(propName, { types: new Set(), interfaceCount: 0 });
      }
      const propData = allSourceProperties.get(propName);
      if (propData) {
        propData.interfaceCount++;
        const typeNode = sourceProp.getTypeNode();
        if (typeNode) {
          propData.types.add(typeNode.getText());
        }
      }
    }
  }

  // Check if target can represent all source properties
  for (const [propName, propData] of allSourceProperties) {
    const targetProp = targetPropMap.get(propName);
    if (!targetProp) {
      // Target is missing a property that exists in source
      return false;
    }

    // Property exists in all source interfaces -> can be required or optional in target
    // Property exists in some source interfaces -> must be optional in target
    const existsInAllSources = propData.interfaceCount === totalSourceInterfaces;

    if (!existsInAllSources && !targetProp.optional) {
      // Property is optional in some sources but required in target - not a valid merge
      return false;
    }

    // Check if types are compatible (allow type unions in target)
    const targetType = targetProp.type;
    const allSourceTypesMatched = Array.from(propData.types).every(sourceType =>
      targetType === sourceType || targetType.includes(sourceType));

    if (!allSourceTypesMatched) {
      // Types don't match - not a valid merge
      return false;
    }
  }

  return true;
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
    const propertyType = property.getType();
    let type = propertyType.getText().replace(/import\(".+?\)\./, '');
    if (property.getType().getFlags() | TypeFlags.NonPrimitive) {
      type = 'Interface';
    }
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

function getInterfaceDeclaration(type: TypeNode | Type): InterfaceDeclaration | undefined {
  if (type instanceof TypeNode) {
    type = type.getType();
  }

  const symbol = type.getSymbol();
  if (!symbol) return undefined;

  return symbol.getDeclarations().find(d => d.isKind(SyntaxKind.InterfaceDeclaration));
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
    if (similarInterface) {
      return;
    }

    // Add the interface to the target source file
    const newInterface = currentTargetSourceFile.addInterface(interfaceDeclaration.getStructure());
    orderMembers(newInterface);

    // Recursively process referenced interfaces
    interfaceDeclaration.forEachDescendant((child) => {
      if (child.isKind(SyntaxKind.TypeReference)) {
        addMissingInterface(child, currentIteration + 1);
      }
    });
  }
}
