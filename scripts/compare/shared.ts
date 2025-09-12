import { Identifier, ImportSpecifier, InterfaceDeclaration, MethodSignature, Node, PropertySignature, SourceFile, Type, TypeLiteralNode } from 'ts-morph';
import { Logger } from '../logger';

/**
 * Interface to represent a task in the processing queue
 */
interface InterfaceProcessingTask {
  targetInterface: InterfaceDeclaration;
  sourceInterface: InterfaceDeclaration;
}

// Global state for interface processing
export let interfaceQueue: InterfaceProcessingTask[] = [];
export let currentTargetSourceFile: SourceFile;
export let currentStartingInterfaces: InterfaceDeclaration[] = [];

export function initGlobalState(
  _currentTargetSourceFile: SourceFile,
  _currentStartingInterfaces: InterfaceDeclaration[],
): void {
  interfaceQueue = [];
  currentTargetSourceFile = _currentTargetSourceFile;
  currentStartingInterfaces = _currentStartingInterfaces;
}

export let logger: Logger;

export function setLogger(newLogger: Logger): void {
  logger = newLogger;
}

/**
 * Extracts a specific tag value from JSDoc comments
 * @param prop The property to extract JSDoc from
 * @param tagName The name of the tag to extract
 * @returns The value of the tag or undefined if not found
 */
export function getJsDocTagValues(prop: PropertySignature, tagName: string): string[] {
  const values: string[] = [];
  for (const doc of prop.getJsDocs()) {
    for (const tag of doc.getTags()) {
      if (tag.getTagName() === tagName) {
        values.push(tag.getCommentText() ?? '');
      }
    }
  }

  return values;
}

/**
 * Checks if a property type is imported
 */
export function isImportedType(sourceFile: SourceFile, type: Node | Type): boolean {
  return sourceFile.getImportDeclarations().some(importDecl =>
    importDecl.getNamedImports().some(importSpec => importSpec.getName() === type.getText()));
}

export function getInterfaceMembers(interfaceDeclaration: InterfaceDeclaration | TypeLiteralNode): (PropertySignature | MethodSignature)[] {
  const members = interfaceDeclaration.getMembers() as (PropertySignature | MethodSignature)[];

  if (interfaceDeclaration instanceof InterfaceDeclaration) {
    interfaceDeclaration.getExtends().forEach((ext) => {
      const extendedInterface = (ext.getExpression() as Identifier).getDefinitionNodes()[0] as InterfaceDeclaration | ImportSpecifier | undefined;
      if (extendedInterface && extendedInterface instanceof InterfaceDeclaration && !isImportedType(interfaceDeclaration.getSourceFile(), extendedInterface)) {
        members.push(...getInterfaceMembers(extendedInterface));
      }
    });
  }

  return members;
}
