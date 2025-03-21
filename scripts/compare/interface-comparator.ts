import chalk from 'chalk';
import * as diff from 'diff';
import { EnumDeclaration, InterfaceDeclaration, MethodSignature, Node, PropertySignature, SourceFile, SyntaxKind, TypeNode } from 'ts-morph';
import { compareAndCorrectMethodTypes } from './compare-methods';
import { getJsDocTagValue, logger } from './shared';

const CustomJsDocTags = {
  originalName: 'compareOriginalName',
  currentValue: 'currentValue',
};

/**
 * Interface to represent a task in the processing queue
 */
interface InterfaceProcessingTask {
  targetInterface: InterfaceDeclaration;
  sourceInterface: InterfaceDeclaration;
}

// Global state for interface processing
let interfaceQueue: InterfaceProcessingTask[] = [];
let processedInterfaces = new Set<string>();
export let currentTargetSourceFile: SourceFile;
let currentSourceSourceFile: SourceFile;

/**
 * Compares two interfaces and corrects differences in the target interface
 * @param targetSourceFile The source file containing the interface to be edited
 * @param sourceSourceFile The source file containing the interface to use as the source of truth
 * @param interfaceName The name of the interface in the target file
 * @returns void - changes are applied directly to the target source file
 */
export function compareAndCorrectInterfaces(
  targetSourceFile: SourceFile,
  sourceSourceFile: SourceFile,
  interfaceName: string,
): void {
  // Get the interfaces from both source files
  const targetInterface = targetSourceFile.getInterface(interfaceName);
  const sourceInterface = sourceSourceFile.getInterface(interfaceName);

  if (!targetInterface || !sourceInterface) {
    throw new Error(`Interface ${interfaceName} not found in one of the source files`);
  }

  // Initialize global state
  interfaceQueue = [{ targetInterface, sourceInterface }];

  // Process all interfaces in the queue
  processInterfaceQueue();
}

/**
 * Processes a queue of interfaces to compare and correct
 */
function processInterfaceQueue(): void {
  while (interfaceQueue.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { targetInterface, sourceInterface } = interfaceQueue.shift()!;
    const interfaceId = `${targetInterface.getSourceFile().getFilePath()}:${targetInterface.getName()}`;

    // Skip if already processed
    if (processedInterfaces.has(interfaceId)) {
      continue;
    }

    logger.debug(chalk.cyan(`Processing interface: ${targetInterface.getName()}`));
    processedInterfaces.add(interfaceId);

    // Compare and correct properties
    compareAndCorrectMembers(targetInterface, sourceInterface);

    // Compare and correct heritage clauses (extends)
    compareAndCorrectHeritageClause(targetInterface, sourceInterface);

    // Order members
    orderMembers(targetInterface);
  }
}

/**
 * Compares and corrects properties between two interfaces
 * @param targetInterface The interface to be edited
 * @param sourceInterface The interface to use as the source of truth
 */
function compareAndCorrectMembers(
  targetInterface: InterfaceDeclaration,
  sourceInterface: InterfaceDeclaration,
): void {
  const targetMembers = targetInterface.getMembers() as (PropertySignature | MethodSignature)[];
  const sourceMembers = sourceInterface.getMembers() as (PropertySignature | MethodSignature)[];

  // Create maps for easier lookup
  const targetMembersMap = new Map<string, PropertySignature | MethodSignature>();
  targetMembers.forEach(member => targetMembersMap.set(member.getName(), member));

  const sourceMembersMap = new Map<string, PropertySignature | MethodSignature>();
  sourceMembers.forEach(member => sourceMembersMap.set(member.getName(), member));

  // Check for missing properties in target and add them
  for (const [propName, sourceProp] of sourceMembersMap) {
    let targetProp = targetMembersMap.get(propName);

    // Check for mismatched kinds
    if (targetProp && targetProp.getKind() !== sourceProp.getKind() && !targetProp.hasQuestionToken()) {
      // Property kind mismatch, remove the property
      targetProp.remove();
      targetProp = undefined;
    }

    if (!targetProp) {
      addMissingMember(targetInterface, sourceProp, propName);

      return;
    }

    // Property exists in both, check for type differences
    if (targetProp instanceof PropertySignature && sourceProp instanceof PropertySignature) {
      compareAndCorrectPropertyTypes(targetProp, sourceProp);
    } else if (targetProp instanceof MethodSignature && sourceProp instanceof MethodSignature) {
      compareAndCorrectMethodTypes(targetProp, sourceProp);
    }
  }

  // Check for extra properties in target that don't exist in source
  for (const [propName, targetProp] of targetMembersMap) {
    if (!sourceMembersMap.has(propName) && !targetProp.hasQuestionToken()) {
      // Property exists in target but not in source, remove it
      targetProp.remove();
    }
  }
}

/**
 * Adds a missing property to the target interface
 * @param targetInterface The interface to add the property to
 * @param sourceProp The property to add
 * @param propName The name of the property to add
 */
function addMissingMember(
  targetInterface: InterfaceDeclaration,
  sourceProp: PropertySignature | MethodSignature,
  propName: string,
): void {
  // Property missing in target, add it
  if (sourceProp instanceof MethodSignature) {
    // Filter out @native jsdoc
    const docs = sourceProp.getJsDocs().map(doc => (doc.getTags()[0]?.getTagName() === 'native' ? '' : doc.getInnerText()));
    const filteredDocs = docs.filter(doc => doc !== '');

    targetInterface.addMethod({
      name: propName,
      parameters: sourceProp.getParameters().map(param => ({
        name: param.getName(),
        type: param.getTypeNode()?.getText(),
        hasQuestionToken: param.hasQuestionToken(),
      })),
      returnType: sourceProp.getReturnTypeNode()?.getText(),
      hasQuestionToken: sourceProp.hasQuestionToken(),
      docs: filteredDocs,
    });
  } else {
    targetInterface.addProperty({
      name: propName,
      type: sourceProp.getTypeNode()?.getText(),
      hasQuestionToken: sourceProp.hasQuestionToken(),
      isReadonly: sourceProp.isReadonly(),
      docs: sourceProp.getJsDocs().map(doc => doc.getText()),
    });
  }
}

/**
 * Compares and corrects property types
 * @param targetProp The property to be edited
 * @param sourceProp The property to compare against
 */
function compareAndCorrectPropertyTypes(
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

  // Update the type if it's different
  if (targetTypeText !== sourceTypeText) {
    logger.debug(chalk.yellow(`Updating property type: ${targetProp.getName()} from ${targetTypeText} to ${sourceTypeText}`));
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

/**
 * Compares and corrects heritage clauses (extends) between two interfaces
 * @param targetInterface The interface to be edited
 * @param sourceInterface The interface to use as the source of truth
 */
function compareAndCorrectHeritageClause(
  targetInterface: InterfaceDeclaration,
  sourceInterface: InterfaceDeclaration,
): void {
  const targetExtends = targetInterface.getExtends();
  const sourceExtends = sourceInterface.getExtends();

  // Create sets of extends clauses for easier comparison
  const targetExtendsSet = new Set(targetExtends.map(ext => ext.getText()));
  const sourceExtendsSet = new Set(sourceExtends.map(ext => ext.getText()));

  // Add missing extends clauses to target
  for (const sourceExt of sourceExtendsSet) {
    if (!targetExtendsSet.has(sourceExt)) {
      targetInterface.addExtends(sourceExt);
    }
  }

  // Process extended interfaces
  for (const sourceExt of sourceExtends) {
    const sourceExtName = sourceExt.getText();

    // Find the extended interface in the source file
    const sourceExtInterface = sourceInterface.getSourceFile().getInterface(sourceExtName);

    // Find the corresponding interface in the target file
    const targetExtInterface = targetInterface.getSourceFile().getInterface(sourceExtName);

    // If both interfaces exist, add them to the queue for processing
    if (sourceExtInterface && targetExtInterface) {
      interfaceQueue.push({
        targetInterface: targetExtInterface,
        sourceInterface: sourceExtInterface,
      });
    }
  }
}

function orderMembers(targetInterface: InterfaceDeclaration): void {
  // Replace all single line comments with jsdoc because ts-morph setOrder doesn't work with single line comments
  const newText = targetInterface.getFullText()
    .replace(/\/\/\s*(.*)/g, '/** @moveBack $1 */') // Single line comments
    .replace(/\/\*(\s*\n\s+)([\s\S]*\*\/)/g, '/**$1@moveBack $2'); // Multi line comments
  targetInterface.replaceWithText(newText.trim());

  const members = targetInterface.getMembers();
  members.sort((a, b) => {
    // Method signatures should come before property signatures
    if (a instanceof MethodSignature && b instanceof PropertySignature) return 1;
    if (a instanceof PropertySignature && b instanceof MethodSignature) return -1;

    return (b as PropertySignature | MethodSignature).getName().toLowerCase().localeCompare((a as PropertySignature | MethodSignature).getName().toLowerCase());
  });

  for (let i = members.length - 1; i >= 0; i--) {
    members[i].setOrder(members.length - 1 - i);
    let text = members[i].getFullText();
    // Make sure there is a newline between members
    if (i !== members.length - 1 && !text.startsWith('\n\n')) {
      text = text.replace(/^\n\n*/, '');
      members[i].replaceWithText(`\n${text}`);
    }
  }

  // Replace all moved jsdoc back to single line comments
  const newText2 = targetInterface.getFullText()
    .replace(/\/\*\*(?!\n)\s*@moveBack\s*(.*?)\s*\*\//g, '// $1') // Single line comments
    .replace(/\/\*\*(\s+)@moveBack\s*([\s\S]*\*\/)/g, '/*$1$2'); // Multi line comments
  targetInterface.replaceWithText(newText2.trim());

  // targetInterface.getProperties().forEach(prop => {
  //   if (prop.getFullText().endsWith('\n')) {
  //     return;
  //   }
  //   prop.replaceWithText(prop.getFullText().replaceAll('\n', '') + '\n');
  // });
}

/**
 * Generates a colored diff between original and new text
 * @param originalText The original text
 * @param newText The new text
 * @param filePath The file path for labeling the diff
 * @returns A formatted diff string
 */
function generateDiff(originalText: string, newText: string, filePath: string): string | null {
  if (originalText === newText) {
    return null;
  }

  const diffResult = diff.createTwoFilesPatch(
    `a/${filePath}`,
    `b/${filePath}`,
    originalText,
    newText,
    '',
    '',
    { context: 5 },
  );

  // Format the diff with colors
  return diffResult.split('\n').map((line) => {
    if (line.startsWith('+')) {
      return chalk.green(line);
    } else if (line.startsWith('-')) {
      return chalk.red(line);
    } else if (line.startsWith('@')) {
      return chalk.cyan(line);
    }

    return chalk.gray(line);
  }).join('\n');
}

/**
 * Main function to compare and correct interfaces between two source files
 * @param targetSourceFile The source file containing interfaces to be edited
 * @param sourceSourceFile The source file containing interfaces to use as the source of truth
 * @param interfaceName The name of the interface
 * @param filePath The file path for labeling the diff
 * @returns A diff of all changes made to the entire source file
 */
export function compareAndCorrectAllInterfaces(
  targetSourceFile: SourceFile,
  sourceSourceFile: SourceFile,
  interfaceName: string,
  filePath: string,
): string | null {
  // Reset global state
  interfaceQueue = [];
  processedInterfaces = new Set<string>();
  currentTargetSourceFile = targetSourceFile;
  currentSourceSourceFile = sourceSourceFile;

  // Store the original text of the entire source file for diff generation
  const originalSourceText = targetSourceFile.getFullText();

  // Compare and correct the interfaces
  compareAndCorrectInterfaces(targetSourceFile, sourceSourceFile, interfaceName);

  // Get the updated text of the entire source file
  targetSourceFile.formatText({
    indentSize: 2,
    ensureNewLineAtEndOfFile: true,
  });

  const newSourceText = targetSourceFile.getFullText();

  // Generate a diff of the entire source file
  return generateDiff(originalSourceText, newSourceText, filePath);
}
