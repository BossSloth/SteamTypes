import { createInterfaceDefinition, generateInterfaceString } from './interface-generation';
import { mergeInterfaces } from './interface-merger';
import { context, initContext } from './utils';

/**
 * Converts a JavaScript object to TypeScript interfaces using ts-morph
 * @param {Record<string, unknown>} obj - The JavaScript object to convert
 * @param {string} mainInterfaceName - The name for the main interface
 * @param {boolean} profiling - Whether to output profiling information
 * @returns {string} TypeScript interface definitions
 */
export function convertToTypescript(obj: Record<string, unknown>, mainInterfaceName: string, profiling = false): string {
  const startTime = performance.now();
  // Initialize the context
  initContext(mainInterfaceName);
  
  // Add the main interface
  context.interfacesToProcess.set(mainInterfaceName, [obj, undefined]);
  
  // Process all interfaces
  // We need to iterate in a loop because new interfaces might be added during processing
  let processedCount = 0;
  
  while (processedCount < context.interfacesToProcess.size) {
    const entries = Array.from(context.interfacesToProcess.entries());
    
    for (let i = processedCount; i < entries.length; i++) {
      const [name, [objValue, nameCounter]] = entries[i];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      createInterfaceDefinition(objValue, name, nameCounter, globalThis.tsProject);
    }
    
    processedCount = entries.length;
  }
  
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
    result = Array.from(context.imports).join('\n') + '\n\n' + result;
  }

  if (profiling) {
    console.log(`Processed ${processedCount} interfaces`);
    const endTime = performance.now();
    console.log(`Execution time: ${endTime - startTime} ms`);
  }

  // Cleanup by reinitializing the context
  initContext(mainInterfaceName);

  return result;
}
