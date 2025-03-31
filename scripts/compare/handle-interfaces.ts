import { InterfaceDeclaration, MethodSignature, PropertySignature, SyntaxKind, Type, TypeFlags, TypeNode, TypeReferenceNode } from 'ts-morph';
import { currentStartingInterfaces, currentTargetSourceFile, interfaceQueue } from './interface-comparator';
import { isImportedType } from './shared';

const REQUIRED_OVERLAP = 0.65;

/**
 * Handles interface type references by adding them to the processing queue
 */
export function handleInterfaceTypeReferences(targetTypeNode: TypeNode, sourceTypeNode: TypeNode): void {
  // Extract all interface references from both types
  const targetInterfaces = extractInterfaceReferences(targetTypeNode);
  let sourceInterfaces = extractInterfaceReferences(sourceTypeNode);

  // Rename and remove any imported interfaces
  for (let i = 0; i < sourceInterfaces.length; i++) {
    const sourceInterface = sourceInterfaces[i];
    const targetInterface = targetInterfaces[i] as TypeReferenceNode | undefined;

    if (targetInterface === undefined) {
      continue;
    }

    if (isImportedType(currentTargetSourceFile, targetInterface.getType())) {
      const sourceInterfaceDeclaration = getInterfaceDeclaration(sourceInterface);
      if (!sourceInterfaceDeclaration) {
        throw new Error(`Source interface ${sourceInterface.getTypeName().getText()} not found`);
      }

      sourceInterfaceDeclaration.rename(targetInterface.getText());
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
      addMissingInterface(sourceInterface.getType());
    }
  }
}

/**
 * Extracts all interface references from a type, including those in arrays, unions, etc.
 */
function extractInterfaceReferences(type: TypeNode): TypeReferenceNode[] {
  const interfaces = type.getDescendantsOfKind(SyntaxKind.TypeReference);

  if (type.isKind(SyntaxKind.TypeReference)) {
    interfaces.push(type);
  }

  return interfaces.filter(interf => (interf.getType().getSymbol()?.getDeclarations()
    .some(d => d.isKind(SyntaxKind.InterfaceDeclaration)) === true) || isImportedType(currentTargetSourceFile, interf.getType()));
}

/**
 * Finds a similar interface based on property structure
 * Uses a similarity score to determine the best match
 */
function findSimilarInterface(sourceInterface: InterfaceDeclaration): InterfaceDeclaration | undefined {
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

  for (const property of interfaceDeclaration.getMembers() as (PropertySignature | MethodSignature)[]) {
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
export function addMissingInterface(type: Type, currentIteration = 0): void {
  // if (currentIteration > 10) {
  //   return;
  // }

  const interfaceDeclaration = getInterfaceDeclaration(type);
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

  // Recursively process referenced interfaces
  interfaceDeclaration.forEachDescendant((child) => {
    if (child.isKind(SyntaxKind.TypeReference)) {
      addMissingInterface(child.getType(), currentIteration + 1);
    }
  });

  // Add the interface to the target source file
  currentTargetSourceFile.addInterface(interfaceDeclaration.getStructure());
}
