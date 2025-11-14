import { createInterfaceDefinition, generateInterfaceString } from './interface-generation';
import { mergeInterfaces } from './interface-merger';
import { context, initContext } from './utils';

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
  // Initialize the context
  initContext(mainInterfaceName, ignoredProperties);

  // Add the main interface
  context.interfacesToProcess.set(mainInterfaceName, { obj, nameCounter: undefined });

  const processedCount = processInterfaces();

  // Merge similar interfaces
  const mergedInterfaces = mergeInterfaces(context.interfaceDefinitions);

  // Generate interface strings
  let result = '';
  const processedNames = new Set<string>();

  const sortedInterfaces = Array.from(mergedInterfaces.entries()).sort((a, b) => a[1].order - b[1].order);

  // Then add all other interfaces
  for (const [name, interfaceObj] of sortedInterfaces) {
    // Skip already processed interfaces and the main interface
    if (processedNames.has(name)) {
      continue;
    }

    // Skip duplicate interfaces (those that were merged)
    if (processedNames.has(interfaceObj.name)) {
      continue;
    }

    if (result) result += '\n';
    result += generateInterfaceString(interfaceObj);
    processedNames.add(interfaceObj.name);
  }

  // Add imports
  if (context.imports.size > 0) {
    result = `\n${result}`;
    const sortedImports = Array.from(context.imports.entries()).sort((a, b) => b[0].localeCompare(a[0]));
    for (const [moduleName, { types, defaultImport }] of sortedImports) {
      if (defaultImport ?? false) {
        if (types.size > 1) {
          throw new Error('Cannot import multiple types with default import');
        }
        result = `import ${Array.from(types)[0]} from '${moduleName}';\n${result}`;
      } else {
        result = `import { ${Array.from(types).sort().join(', ')} } from '${moduleName}';\n${result}`;
      }
    }
  }

  if (profiling) {
    console.log(`Processed ${processedCount} interfaces`);
    const endTime = performance.now();
    console.log(`Execution time: ${endTime - startTime} ms`);
  }

  // Cleanup by reinitializing the context
  initContext(mainInterfaceName, ignoredProperties);

  return result;
}

function processInterfaces(): number {
  // Process all interfaces
  // We need to iterate in a loop because new interfaces might be added during processing
  let processedCount = 0;

  while (processedCount < context.interfacesToProcess.size) {
    const entries = Array.from(context.interfacesToProcess.entries());

    for (let i = processedCount; i < entries.length; i++) {
      const [name, interfaceToProcess] = entries[i];
      createInterfaceDefinition(
        name,
        interfaceToProcess,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        globalThis.tsProject,
      );
    }

    processedCount = entries.length;
  }

  return processedCount;
}
