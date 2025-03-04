import { Project } from 'ts-morph';
import { generateInterface } from './interface-generation';
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
  context.interfaces.set(mainInterfaceName, obj);
  
  // Process all interfaces
  let result = '';
  for (const [name, objValue] of context.interfaces.entries()) {
    if (result) result += '\n';
    result += generateInterface(objValue, name, project);
  }

  // Add imports
  if (context.imports.size > 0) {
    result = Array.from(context.imports).join('\n') + '\n\n' + result;
  }

  return result;
}
