import chalk from 'chalk';
import { createTwoFilesPatch } from 'diff';
import { InterfaceDeclaration, SourceFile, TypeAliasDeclaration } from 'ts-morph';
import { CustomJsDocTags, hasJsDocTag } from '../shared';

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

  // oxfmt-ignore
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
  return diffResult
    .split('\n')
    .map((line) => {
      if (line.startsWith('+')) {
        return chalk.green(line);
      } else if (line.startsWith('-')) {
        return chalk.red(line);
      } else if (line.startsWith('@')) {
        return chalk.cyan(line);
      }

      return chalk.gray(line);
    })
    .join('\n');
}

function removeDuplicateUnionTypes(sourceText: string): string {
  const regex = /\b(\w+(?:\[\])*)(\s+\|\s+\1(?!\w))+/g;
  const regexWithBrackets = new RegExp(`\\(${regex.source}\\)`, 'g');

  return sourceText.replace(regexWithBrackets, '$1').replace(regex, '$1');
}

const ignoreFormattingTextOptions = { includeJsDocComments: true };

/**
 * Collects every type alias and interface tagged with `@ignoreFormatting`.
 * The set is identical before and after `formatText` since formatting never
 * adds or removes declarations.
 */
function getIgnoreFormattingNodes(sourceFile: SourceFile): (InterfaceDeclaration | TypeAliasDeclaration)[] {
  const nodes = [...sourceFile.getTypeAliases(), ...sourceFile.getInterfaces()];

  return nodes.filter((node) => hasJsDocTag(node, CustomJsDocTags.ignoreFormatting));
}

/**
 * Captures the exact text (including JSDoc) of every `@ignoreFormatting` declaration.
 * Taken after the comparator's structural edits but before `formatText`, so legitimate
 * changes are kept while `formatText`'s reformatting can later be reverted.
 */
function snapshotIgnoreFormatting(sourceFile: SourceFile): Map<string, string> {
  const snapshot = new Map<string, string>();
  for (const node of getIgnoreFormattingNodes(sourceFile)) {
    snapshot.set(node.getName(), node.getText(ignoreFormattingTextOptions));
  }

  return snapshot;
}

/**
 * Restores the pre-`formatText` text of every `@ignoreFormatting` declaration that
 * `formatText` modified, undoing reformatting that would otherwise break lint rules
 * such as `@stylistic/indent` on nested conditional types.
 */
function restoreIgnoreFormatting(sourceFile: SourceFile, snapshot: Map<string, string>): void {
  for (const node of getIgnoreFormattingNodes(sourceFile)) {
    // The snapshot is built from the same tagged-node set, so the entry always exists
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const originalText = snapshot.get(node.getName())!;
    if (node.getText(ignoreFormattingTextOptions) !== originalText) {
      node.replaceWithText(originalText);
    }
  }
}

export function renderDiff(targetFile: SourceFile, originalText: string, filePath: string): string | null {
  // Snapshot `@ignoreFormatting` declarations after structural edits but before formatting
  const ignoreFormattingSnapshot = snapshotIgnoreFormatting(targetFile);

  // Get the updated text of the entire source file
  targetFile.formatText({
    indentSize: 2,
    ensureNewLineAtEndOfFile: true,
  });

  // Revert formatText's reformatting of `@ignoreFormatting` declarations
  restoreIgnoreFormatting(targetFile, ignoreFormattingSnapshot);

  const newSourceText = targetFile.getFullText();

  let formattedSourceText = newSourceText.replace(/^(?!import).+[^\s]:.+;(?!\n\n)(?!\n\s*})$/gm, '$&\n');
  formattedSourceText = removeDuplicateUnionTypes(formattedSourceText);

  // Generate a diff of the entire source file
  return generateDiff(originalText, formattedSourceText, filePath);
}
