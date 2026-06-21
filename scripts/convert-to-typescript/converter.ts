import type { Project } from 'ts-morph';
import { ConversionPipeline } from './pipeline/ConversionPipeline';
import { ConversionSession } from './session/ConversionSession';

/**
 * Options for the convertToTypescript function
 */
export interface ConvertToTypescriptOptions {
  /** Array of property names to ignore and convert to unknown */
  ignoredProperties?: string[];
  /** Whether to output profiling information */
  profiling?: boolean;
}

/**
 * Converts a JavaScript object to TypeScript interfaces using ts-morph
 * @param {Record<string, unknown>} obj - The JavaScript object to convert
 * @param {string} mainInterfaceName - The name for the main interface
 * @param {ConvertToTypescriptOptions} options - Options for conversion
 * @returns {string} TypeScript interface definitions
 */
export function convertToTypescript(
  obj: Record<string, unknown>,
  mainInterfaceName: string,
  { profiling = false, ignoredProperties = [] }: ConvertToTypescriptOptions = {},
): string {
  const startTime = performance.now();

  // A fresh session per call provides full isolation between conversions.

  const session = new ConversionSession(ignoredProperties, globalThis.tsProject as Project);

  // Add the main interface
  session.interfaceRepository.queue.set(mainInterfaceName, { obj, nameCounter: undefined });

  const { result, processedCount } = new ConversionPipeline(session).run();

  if (profiling) {
    console.log(`Processed ${processedCount} interfaces`);
    const endTime = performance.now();
    console.log(`Execution time: ${endTime - startTime} ms`);
  }

  return result;
}
