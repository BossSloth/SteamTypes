import chalk from 'chalk';
import * as diff from 'diff';
import { InterfaceDeclaration, MethodSignature, Node, PropertySignature, SourceFile, SyntaxKind, TypeNode } from 'ts-morph';
import { compareAndCorrectMethodTypes } from './compare-methods';
import { logger } from './shared';

enum CustomJsDocTags {
  originalName = 'compareOriginalName'
}

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
let currentTargetSourceFile: SourceFile;
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
  interfaceName: string
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
  sourceInterface: InterfaceDeclaration
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
    if (targetProp && targetProp.getKind() !== sourceProp.getKind()) {
      // Property kind mismatch, remove the property
      targetProp.remove();
      targetProp = undefined;
    }

    if (!targetProp) {
      // Property missing in target, add it
      if (sourceProp instanceof MethodSignature) {
        // Filter out @native jsdoc
         const docs = sourceProp.getJsDocs().map(doc => doc.getTags()[0]?.getTagName() === 'native' ? '' : doc.getInnerText());
        const filteredDocs = docs.filter(doc => doc !== '');
        
        targetInterface.addMethod({
          name: propName,
          parameters: sourceProp.getParameters().map(param => ({
            name: param.getName(),
            type: param.getTypeNode()?.getText(),
            hasQuestionToken: param.hasQuestionToken()
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
          docs: sourceProp.getJsDocs().map(doc => doc.getText())
        });
      }
    } else {
      // Property exists in both, check for type differences
      if (targetProp instanceof PropertySignature && sourceProp instanceof PropertySignature) {
        compareAndCorrectPropertyTypes(targetProp, sourceProp);
      } else if (targetProp instanceof MethodSignature && sourceProp instanceof MethodSignature) {
        compareAndCorrectMethodTypes(targetProp, sourceProp);
      }
    }
  }

  // Check for extra properties in target that don't exist in source
  for (const [propName, targetProp] of targetMembersMap) {
    if (!sourceMembersMap.has(propName)) {
      // Property exists in target but not in source, remove it
      targetProp.remove();
    }
  }
}

/**
 * Compares and corrects property types
 * @param targetProp The property to be edited
 * @param sourceProp The property to use as the source of truth
 */
function compareAndCorrectPropertyTypes(
  targetProp: PropertySignature,
  sourceProp: PropertySignature
): void {
  const targetTypeNode = targetProp.getTypeNode();
  const sourceTypeNode = sourceProp.getTypeNode();

  // If either type node is missing, we can't compare properly
  if (!targetTypeNode || !sourceTypeNode) {
    // If source has a type node but target doesn't, update target
    if (sourceTypeNode && !targetTypeNode) {
      targetProp.setType(sourceTypeNode.getText());
    }
    return;
  }

  if (targetProp.getType().isAny()) {
    const isImported = currentTargetSourceFile.getImportDeclarations().some(importDecl => 
      importDecl.getNamedImports().some(importSpec => 
        importSpec.getName() === targetProp.getType().getText()
      )
    );
    if (isImported) {
      return;
    }
  }

  // Get the text representation of both types
  const targetTypeText = targetTypeNode.getText();
  let sourceTypeText = sourceTypeNode.getText();

  // Check if the types are interfaces with different names but same structure
  if (isInterfaceType(targetTypeNode) && isInterfaceType(sourceTypeNode)) {
    // add them to the queue for processing
    const targetTypeName = getTypeReferenceName(targetTypeNode);
    const sourceTypeName = getTypeReferenceName(sourceTypeNode);
    
    if (targetTypeName && sourceTypeName) {
      // Try to find the interfaces in their respective source files
      const targetTypeInterface = currentTargetSourceFile.getInterface(targetTypeName);
      const sourceTypeInterface = currentSourceSourceFile.getInterface(sourceTypeName);

      // Check if targetInterface has a original jsdoc
      const originalJsDoc = targetTypeNode.getType().getSymbol()?.getJsDocTags().find(tag => tag.getName() === CustomJsDocTags.originalName);
      if (originalJsDoc && originalJsDoc.getText()[0].text === sourceTypeName) {
        sourceTypeInterface?.rename(targetTypeName);
        sourceTypeText = targetTypeName;
      }
      
      // If both interfaces are found, add them to the queue for processing
      if (targetTypeInterface && sourceTypeInterface) {
        interfaceQueue.push({
          targetInterface: targetTypeInterface,
          sourceInterface: sourceTypeInterface
        });
      }
    }
  } 

  // If sourcefile is missing the interface, add it
  if (isInterfaceType(sourceTypeNode)) {
    const sourceTypeInterface = currentSourceSourceFile.getInterface(sourceTypeText);
    const hasInterface = currentTargetSourceFile.getInterface(sourceTypeText) !== undefined;
    if (sourceTypeInterface && !hasInterface) {
      currentTargetSourceFile.addInterface(sourceTypeInterface.getStructure());
    }
  }

  // If types are identical, no need to do anything
  if (targetTypeText === sourceTypeText) {
    return;
  }

  if (sourceProp.getType().isUnknown()) {
    return;
  }

  // If we get here, types are different and need to be updated
  targetProp.setType(sourceTypeText);

  // Check if the property has a question token (optional property)
  if (sourceProp.hasQuestionToken() !== targetProp.hasQuestionToken()) {
    targetProp.setHasQuestionToken(sourceProp.hasQuestionToken());
  }

  // Check if the property is readonly
  if (sourceProp.isReadonly() !== targetProp.isReadonly()) {
    targetProp.setIsReadonly(sourceProp.isReadonly());
  }
}

/**
 * Gets the name of a type reference
 * @param typeNode The type node to extract the name from
 * @returns The name of the type reference or undefined if not a type reference
 */
function getTypeReferenceName(typeNode: TypeNode): string | undefined {
  if (typeNode.getKind() === SyntaxKind.TypeReference) {
    // Extract the name from the type reference
    return typeNode.getText().split('<')[0].trim();
  }
  return undefined;
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
  sourceInterface: InterfaceDeclaration
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
        sourceInterface: sourceExtInterface
      });
    }
  }
}

function orderMembers(targetInterface: InterfaceDeclaration): void {
  // Replace all single line comments with jsdoc because ts-morph setOrder doesn't work with single line comments
  const newText = targetInterface.getFullText()
    .replace(/\/\/\s*(.*)/g, '/** @moveBack $1 */') // Single line comments
    .replace(/\/\*(\s*\n\s+)([\s\S]*\*\/)/g, '/**$1@moveBack $2') // Multi line comments
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
      text = text.replace(/^\n\n*/, '')
      members[i].replaceWithText('\n' + text);
    }
  }

  // Replace all moved jsdoc back to single line comments
  const newText2 = targetInterface.getFullText()
    .replace(/\/\*\*(?!\n)\s*@moveBack\s*(.*?)\s*\*\//g, '// $1') // Single line comments
    .replace(/\/\*\*(\s+)@moveBack\s*([\s\S]*\*\/)/g, '/*$1$2') // Multi line comments
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
    {context: 5}
  );

  // Format the diff with colors
  const formattedDiff = diffResult.split('\n').map(line => {
    if (line.startsWith('+')) {
      return chalk.green(line);
    } else if (line.startsWith('-')) {
      return chalk.red(line);
    } else if (line.startsWith('@')) {
      return chalk.cyan(line);
    } else {
      return chalk.gray(line);
    }
  }).join('\n');

  return formattedDiff;
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
): string|null {
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
