import type { SourceFile } from 'ts-morph';
import { renderDiff } from './output/diff-output';
import { ComparisonPipeline, removeUnusedInterfaces } from './pipeline/ComparisonPipeline';
import { ComparisonSession } from './session/ComparisonSession';

export interface InterfaceComparison {
  /** The generated source file containing the interface to use as the source of truth */
  sourceFile: SourceFile;
  /** The name of the root interface to compare */
  interfaceName: string;
}

/**
 * Main function to compare and correct interfaces between two source files.
 * Runs each comparison in order against the same target file with a fresh session, then removes
 * interfaces that became unreferenced (keeping every comparison root) and renders one combined diff.
 * @param targetSourceFile The source file containing interfaces to be edited
 * @param comparisons The comparisons to run, in order
 * @param filePath The file path for labeling the diff
 * @returns A diff of all changes made to the entire source file
 */
export async function compareAndCorrectAllInterfaces(
  targetSourceFile: SourceFile,
  comparisons: readonly InterfaceComparison[],
  filePath: string,
): Promise<string | null> {
  // Store the original text of the entire source file for diff generation
  const originalSourceText = targetSourceFile.getFullText();

  for (const comparison of comparisons) {
    new ComparisonPipeline(new ComparisonSession(targetSourceFile), comparison.sourceFile, comparison.interfaceName).run();
  }

  removeUnusedInterfaces(targetSourceFile, new Set(comparisons.map((comparison) => comparison.interfaceName)));

  return renderDiff(targetSourceFile, originalSourceText, filePath);
}
