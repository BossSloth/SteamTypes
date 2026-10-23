import { compare } from 'natural-orderby';
import { InterfaceDeclaration, MethodSignature, NamedNode, Node, SyntaxKind, TypeLiteralNode } from 'ts-morph';
import { CustomJsDocTags, hasJsDocTag } from './shared';

export function orderMembers(targetInterface: InterfaceDeclaration | TypeLiteralNode): void {
  if (Node.isJSDocable(targetInterface) && hasJsDocTag(targetInterface, CustomJsDocTags.dontSort)) {
    return;
  }

  const originalMembers = targetInterface.getMembers();
  const members = [...originalMembers];
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

  const newOrder = members.reverse();
  if (newOrder.every((member, i) => member === originalMembers[i])) {
    return;
  }

  // Each member owns the text up to its end, plus any same-line trailing comment. Leading comments and blank lines
  // stay with the member that follows them. Slots keep their original leading whitespace and take the new members.
  const sourceText = targetInterface.getSourceFile().getFullText();
  const openBraceEnd = targetInterface.getFirstChildByKindOrThrow(SyntaxKind.OpenBraceToken).getEnd();
  const whitespaces: string[] = [];
  const chunks = new Map<Node, { content: string; whitespace: string }>();

  let chunkStart = openBraceEnd;
  for (const member of originalMembers) {
    const trailingComments = member.getTrailingCommentRanges();
    const chunkEnd = trailingComments.length > 0 ? trailingComments[trailingComments.length - 1].getEnd() : member.getEnd();
    const memberEnd = member.getEnd();
    const separator = /[;,]$/.test(member.getText()) ? '' : ';';
    const chunk = sourceText.slice(chunkStart, memberEnd) + separator + sourceText.slice(memberEnd, chunkEnd);
    const content = chunk.trimStart();
    const whitespace = chunk.slice(0, chunk.length - content.length);
    whitespaces.push(whitespace);
    chunks.set(member, { content, whitespace });
    chunkStart = chunkEnd;
  }

  const memberIndent = whitespaces[0].slice(whitespaces[0].lastIndexOf('\n') + 1);
  const body = newOrder
    .map((member, j) => {
      const { content, whitespace } = chunks.get(member) as { content: string; whitespace: string };
      const slot = whitespaces[j];
      let separator = slot.replace(/[ \t]*$/, memberIndent);
      if (j > 0 && slot.includes('\n')) {
        separator = `${hasBlankLine(slot) || hasBlankLine(whitespace) ? '\n\n' : '\n'}${memberIndent}`;
      } else if (j > 0) {
        separator = slot;
      }
      const indent = whitespace.slice(whitespace.lastIndexOf('\n') + 1);
      const reindented = whitespace.includes('\n')
        ? content.replace(new RegExp(`\n${indent}`, 'g'), `\n${memberIndent}`)
        : content;

      return separator + reindented;
    })
    .join('');
  const head = sourceText.slice(targetInterface.getStart(true), openBraceEnd);
  const tail = sourceText.slice(chunkStart, targetInterface.getEnd());
  targetInterface.replaceWithText(head + body + tail);
}

function hasBlankLine(text: string): boolean {
  return /\n[ \t]*\n/.test(text);
}
