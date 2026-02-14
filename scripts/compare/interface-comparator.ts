import chalk from 'chalk';
import { createTwoFilesPatch } from 'diff';
import { InterfaceDeclaration, MethodSignature, PropertySignature, SourceFile, SyntaxKind, TypeElementMemberedNode, TypeLiteralNode } from 'ts-morph';
import { compareAndCorrectMethodTypes } from './compare-methods';
import { compareAndCorrectPropertyTypes } from './compare-properties';
import { addMissingInterface, findSimilarInterface } from './handle-interfaces';
import { getInterfaceMembers, getJsDocTagValues, initGlobalState, interfaceQueue } from './shared';

const processedInterfaces = new Set<string>();

/**
 * Compares two interfaces and corrects differences in the target interface
 * @param targetSourceFile The source file containing the interface to be edited
 * @param sourceSourceFile The source file containing the interface to use as the source of truth
 * @param interfaceName The name of the interface in the target file
 * @returns void - changes are applied directly to the target source file
 */
function compareAndCorrectInterfaces(
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
  interfaceQueue.push({ targetInterface, sourceInterface });

  // Process all interfaces in the queue
  processInterfaceQueue();

  removeUnusedInterfaces(targetSourceFile, targetInterface);
}

/**
 * Processes a queue of interfaces to compare and correct
 */
function processInterfaceQueue(): void {
  while (interfaceQueue.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { targetInterface, sourceInterface } = interfaceQueue.shift()!;

    // Check if interface still exists
    if (targetInterface.wasForgotten() || sourceInterface.wasForgotten()) {
      continue;
    }

    const interfaceId = `${targetInterface.getSourceFile().getFilePath()}:${targetInterface.getName()}`;

    // Skip if already processed
    if (processedInterfaces.has(interfaceId)) {
      continue;
    }

    processedInterfaces.add(interfaceId);

    // Compare and correct properties
    const propertiesChanged = compareAndCorrectMembers(targetInterface, sourceInterface);

    // Compare and correct heritage clauses (extends)
    compareAndCorrectHeritageClause(targetInterface, sourceInterface);

    if (propertiesChanged) {
      // Order members
      orderMembers(targetInterface);
    }
  }
}

/**
 * Compares and corrects properties between two interfaces
 * @param targetInterface The interface to be edited
 * @param sourceInterface The interface to use as the source of truth
 *
 * @returns true if properties were added or removed
 */
export function compareAndCorrectMembers(
  targetInterface: InterfaceDeclaration | TypeLiteralNode,
  sourceInterface: InterfaceDeclaration | TypeLiteralNode,
): boolean {
  const targetMembers = getInterfaceMembers(targetInterface);
  const realTargetMembers = targetInterface.getMembers() as (PropertySignature | MethodSignature)[];
  const sourceMembers = getInterfaceMembers(sourceInterface);

  // Create maps for easier lookup
  const targetMembersMap = new Map<string, PropertySignature | MethodSignature>();
  targetMembers.forEach(member => targetMembersMap.set(member.getName(), member));
  const realTargetMembersMap = new Map<string, PropertySignature | MethodSignature>();
  realTargetMembers.forEach(member => realTargetMembersMap.set(member.getName(), member));

  const sourceMembersMap = new Map<string, PropertySignature | MethodSignature>();
  sourceMembers.forEach(member => sourceMembersMap.set(member.getName(), member));

  let changed = false;

  // Check for missing properties in target and add them
  for (const [propName, sourceProp] of sourceMembersMap) {
    let targetProp = targetMembersMap.get(propName);

    // Check for mismatched kinds
    if (targetProp && targetProp.getKind() !== sourceProp.getKind() && !targetProp.hasQuestionToken()) {
      // Property kind mismatch, remove the property
      targetProp.remove();
      targetProp = undefined;
      changed = true;
    }

    if (!targetProp) {
      addMissingMember(targetInterface, sourceProp, propName);
      changed = true;

      continue;
    }

    // Property exists in both, check for type differences
    if (targetProp instanceof PropertySignature && sourceProp instanceof PropertySignature) {
      const isFromExtendedInterface = !realTargetMembersMap.has(targetProp.getName());
      const needsExtendUpdate = compareAndCorrectPropertyTypes(targetProp, sourceProp, isFromExtendedInterface);
      if (needsExtendUpdate && targetInterface instanceof InterfaceDeclaration) {
        // Property is from an extended interface and doesn't match, remove extends and recompare
        targetInterface.getExtends().forEach(ext => targetInterface.removeExtends(ext));
        changed = compareAndCorrectMembers(targetInterface, sourceInterface);
      }
    } else if (targetProp instanceof MethodSignature && sourceProp instanceof MethodSignature) {
      compareAndCorrectMethodTypes(targetProp, sourceProp);
    }
  }

  // Check for extra properties in target that don't exist in source
  for (const [propName, targetProp] of targetMembersMap) {
    if (!sourceMembersMap.has(propName) && !targetProp.hasQuestionToken()) {
      if (realTargetMembersMap.has(propName)) {
        // Property exists in target but not in source, remove it
        targetProp.remove();
        changed = true;
      } else if (targetInterface instanceof InterfaceDeclaration) {
        // Property is from an extended interface, remove extends and recompare
        targetInterface.getExtends().forEach(ext => targetInterface.removeExtends(ext));
        changed = compareAndCorrectMembers(targetInterface, sourceInterface);
      }
    }
  }

  return changed;
}

/**
 * Adds a missing property to the target interface
 * @param targetInterface The interface to add the property to
 * @param sourceProp The property to add
 * @param propName The name of the property to add
 */
function addMissingMember(
  targetInterface: TypeElementMemberedNode,
  sourceProp: PropertySignature | MethodSignature,
  propName: string,
): void {
  // Property missing in target, add it
  if (sourceProp instanceof MethodSignature) {
    // Filter out @native jsdoc
    const docs = sourceProp.getJsDocs().map(doc => doc.getInnerText());
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
    const typeNode = sourceProp.getTypeNode();
    if (!typeNode) return;

    targetInterface.addProperty({
      name: propName,
      type: typeNode.getText(),
      hasQuestionToken: sourceProp.hasQuestionToken(),
      isReadonly: sourceProp.isReadonly(),
      docs: sourceProp.getJsDocs().map(doc => doc.getStructure()),
    });

    addMissingInterface(typeNode);
  }
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
  const targetExtendsSet = new Set(targetExtends.map(ext => ext.getText()));

  // Process extended interfaces and keep target heritage in sync
  for (const sourceExt of sourceExtends) {
    const rawSourceExtText = sourceExt.getText();
    const sourceExtName = sourceExt.getExpression().getText();

    // Find the extended interface in the source file
    const sourceExtInterface = sourceInterface.getSourceFile().getInterface(sourceExtName);

    // Find the corresponding interface in the target file by name
    let targetExtInterface = targetInterface.getSourceFile().getInterface(sourceExtName);
    let finalTargetExtName = sourceExtName;

    // If the base interface name does not exist in the target, try to find a similar one
    if (!targetExtInterface && sourceExtInterface) {
      const similarTargetInterface = findSimilarInterface(sourceExtInterface);
      if (similarTargetInterface) {
        finalTargetExtName = similarTargetInterface.getName();
        targetExtInterface = similarTargetInterface;

        // Rename the source base interface so future references use the resolved name
        sourceExtInterface.rename(finalTargetExtName);
      }
    }

    // Preserve any generic arguments on the extends clause while updating the base name
    const extendsText = rawSourceExtText.replace(sourceExtName, finalTargetExtName);

    // Add missing extends clauses to target using the resolved name
    if (!targetExtendsSet.has(extendsText)) {
      targetInterface.addExtends(extendsText);
      targetExtendsSet.add(extendsText);
    }

    // If both interfaces exist, add them to the queue for processing
    if (sourceExtInterface && targetExtInterface) {
      interfaceQueue.push({
        targetInterface: targetExtInterface,
        sourceInterface: sourceExtInterface,
      });
    }
  }
}

function removeUnusedInterfaces(targetSourceFile: SourceFile, rootInterface: InterfaceDeclaration): void {
  const targetInterfaces = targetSourceFile.getInterfaces().slice(1);
  const typeReferences = targetSourceFile.getDescendantsOfKind(SyntaxKind.TypeReference);
  const expressionWithTypeArguments = targetSourceFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments);
  const typeAliases = targetSourceFile.getDescendantsOfKind(SyntaxKind.TypeAliasDeclaration);

  for (const targetInterface of targetInterfaces) {
    if (targetInterface === rootInterface) {
      continue;
    }

    const hasTypeAliasWithName = typeAliases.some(dec => !dec.wasForgotten() && dec.getName() === targetInterface.getName());

    const doesNotHaveJsDocExportTag = getJsDocTagValues(targetInterface, 'exported').length === 0;
    const hasTypeReferenceWithName = typeReferences.some(dec => !dec.wasForgotten() && dec.getTypeName().getText() === targetInterface.getName());
    const hasExpressionWithTypeArgumentsWithName = expressionWithTypeArguments.some(dec => !dec.wasForgotten() && dec.getExpression().getText() === targetInterface.getName());
    const hasJsDocLink = targetSourceFile.getText().includes(`@link ${targetInterface.getName()}`);
    const extendsJsPbMessage = targetInterface.getExtends().some(ext => ext.getExpression().getText() === 'JsPbMessage');

    if (
      hasTypeAliasWithName
      || (
        doesNotHaveJsDocExportTag
        && !hasTypeReferenceWithName
        && !hasExpressionWithTypeArgumentsWithName
        && !hasJsDocLink
        && !extendsJsPbMessage
      )) {
      targetInterface.remove();
    }
  }
}

// TODO: This might be very slow sometimes have to check to make sure with validate-types
export function orderMembers(targetInterface: InterfaceDeclaration | TypeLiteralNode): void {
  // Replace all single line comments with jsdoc because ts-morph setOrder doesn't work with single line comments
  const newText = targetInterface.getFullText()
    .replace(/ {2}\/\/\s*(.*)/g, '/** @moveBack $1 */') // Single line comments
    .replace(/\/\*(\s*\n\s+)([\s\S]*\*\/)/g, '/**$1@moveBack $2'); // Multi line comments
  targetInterface.replaceWithText(newText.trim());

  const members = targetInterface.getMembers();
  members.sort((a, b) => {
    // Method signatures should come before property signatures
    if (a.getKind() !== b.getKind()) {
      return a.getKind() === SyntaxKind.MethodSignature ? 1 : -1;
    }

    // Put method implementations above overloads
    if (a instanceof MethodSignature && b instanceof MethodSignature && a.getName() === b.getName()) {
      return -1;
    }

    // Use propertyStringSorter for consistent and efficient string comparison
    return (b as PropertySignature | MethodSignature).getName().toLowerCase().localeCompare((a as PropertySignature | MethodSignature).getName().toLowerCase());
  });

  for (let i = members.length - 1; i >= 0; i--) {
    members[i].setOrder(members.length - 1 - i);
  }

  // Replace all moved jsdoc back to single line comments
  const newText2 = targetInterface.getFullText()
    .replace(/\/\*\*(?!\n)\s*@moveBack\s*(.*?)\s*\*\//g, '  // $1') // Single line comments
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

  const diffResult = createTwoFilesPatch(
    `a/${filePath}`,
    `b/${filePath}`,
    originalText,
    newText,
    undefined,
    undefined,
    { context: 5, stripTrailingCr: true },
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

function removeDuplicateUnionTypes(sourceText: string): string {
  const regex = /\b(\w+)(\s+\|\s+\1\b)+/g;
  const regexWithBrackets = new RegExp(`\\(${regex.source}\\)`, 'g');

  return sourceText.replace(regexWithBrackets, '$1').replace(regex, '$1');
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
  initGlobalState(targetSourceFile, targetSourceFile.getInterfaces());
  processedInterfaces.clear();

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

  let formattedSourceText = newSourceText.replace(/^(?!import).+[^\s]:.+;(?!\n\n)(?!\n\s*})$/gm, '$&\n');
  formattedSourceText = removeDuplicateUnionTypes(formattedSourceText);

  // Generate a diff of the entire source file
  return generateDiff(originalSourceText, formattedSourceText, filePath);
}
