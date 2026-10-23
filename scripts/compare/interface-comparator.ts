import type { SourceFile } from 'ts-morph';
import { ComparisonPipeline } from './pipeline/ComparisonPipeline';
import { ComparisonSession } from './session/ComparisonSession';

/**
 * Main function to compare and correct interfaces between two source files
 * @param targetSourceFile The source file containing interfaces to be edited
 * @param sourceSourceFile The source file containing interfaces to use as the source of truth
 * @param interfaceName The name of the interface
 * @param filePath The file path for labeling the diff
 * @returns A diff of all changes made to the entire source file
 */
export async function compareAndCorrectAllInterfaces(
  targetSourceFile: SourceFile,
  sourceSourceFile: SourceFile,
  interfaceName: string,
  filePath: string,
): Promise<string | null> {
  return new ComparisonPipeline(new ComparisonSession(targetSourceFile), sourceSourceFile, interfaceName, filePath).run();
}
