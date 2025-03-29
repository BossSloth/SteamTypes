import { PropertySignature, SourceFile, Type } from 'ts-morph';
import { Logger } from '../logger';

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
export function isImportedType(sourceFile: SourceFile, type: Type): boolean {
  return sourceFile.getImportDeclarations().some(importDecl =>
    importDecl.getNamedImports().some(importSpec => importSpec.getName() === type.getText()));
}
