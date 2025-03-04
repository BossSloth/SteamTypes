import { Project } from 'ts-morph';
import { createInterfaceDefinition, generateInterfaceString } from './interface-generation';
import { context, initContext } from './utils';

/**
 * Converts a JavaScript object to TypeScript interfaces using ts-morph
 * @param {Object} obj - The JavaScript object to convert
 * @param {string} mainInterfaceName - The name for the main interface
 * @returns {string} TypeScript interface definitions
 */
export function convertToTypescript(obj: any, mainInterfaceName: string, project: Project = globalThis.tsProject): string {
  // Initialize the conversion context
  initContext(mainInterfaceName);
  
  // Add the main interface
  context.interfacesToProcess.set(mainInterfaceName, obj);
  
  // Process all interfaces
  // We need to iterate in a loop because new interfaces might be added during processing
  let processedCount = 0;
  
  while (processedCount < context.interfacesToProcess.size) {
    const entries = Array.from(context.interfacesToProcess.entries());
    
    for (let i = processedCount; i < entries.length; i++) {
      const [name, objValue] = entries[i];
      createInterfaceDefinition(objValue, name, project);
      processedCount++;
    }
  }
  
  // Generate interface strings
  let result = '';
  for (const interfaceObj of context.interfaceDefinitions.values()) {
    if (result) result += '\n';
    result += generateInterfaceString(interfaceObj);
  }

  // Add imports
  if (context.imports.size > 0) {
    result = Array.from(context.imports).join('\n') + '\n\n' + result;
  }

  return result;
}
