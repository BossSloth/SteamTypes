import { compare } from 'natural-orderby';
import { InterfaceDeclaration, MethodSignature, NamedNode, Node, SyntaxKind, TypeLiteralNode } from 'ts-morph';
import { CustomJsDocTags, hasJsDocTag } from './shared';

// TODO: This might be very slow sometimes have to check to make sure with validate-types
export function orderMembers(targetInterface: InterfaceDeclaration | TypeLiteralNode): void {
  if (Node.isJSDocable(targetInterface) && hasJsDocTag(targetInterface, CustomJsDocTags.dontSort)) {
    return;
  }

  // Replace all single line comments with jsdoc because ts-morph setOrder doesn't work with single line comments
  const newText = targetInterface
    .getFullText()
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

    // Strip quotes from property names to ensure correct sorting
    const aName = (a as NamedNode)
      .getName()
      .toLowerCase()
      .replace(/^['"`]|['"`]$/g, '');
    const bName = (b as NamedNode)
      .getName()
      .toLowerCase()
      .replace(/^['"`]|['"`]$/g, '');

    // Use natural-orderby package as that is the same as the perfectionist eslint plugin uses
    return compare({ order: 'desc', locale: 'en' })(aName, bName);
  });

  for (let i = members.length - 1; i >= 0; i--) {
    members[i].setOrder(members.length - 1 - i);
  }

  // Replace all moved jsdoc back to single line comments
  const newText2 = targetInterface
    .getFullText()
    .replace(/\/\*\*(?!\n)\s*@moveBack\s*(.*?)\s*\*\//g, '  // $1') // Single line comments
    .replace(/\/\*\*(\s+)@moveBack\s*([\s\S]*\*\/)/g, '/*$1$2'); // Multi line comments
  targetInterface.replaceWithText(newText2.trim());
}
