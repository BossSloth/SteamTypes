import { ConversionContext, defaultProtoProps } from './types';

export const context: ConversionContext = {
  addImport(moduleName: string, type: string, defaultImport = false): void {
    if (!context.imports.has(moduleName)) {
      context.imports.set(moduleName, { types: new Set<string>(), defaultImport });
    }
    context.imports.get(moduleName)?.types.add(type);
  },

  interfacesToProcess: new Map(),
  interfaceDefinitions: new Map(),
  imports: new Map(),
  processedObjectPaths: new Map(),
  mainInterfaceName: '',
  functionsToProcess: new Map(),
};

export function initContext(mainInterfaceName: string): void {
  context.interfacesToProcess = new Map();
  context.interfaceDefinitions = new Map();
  context.imports = new Map();
  context.processedObjectPaths = new Map();
  context.mainInterfaceName = mainInterfaceName;
  context.functionsToProcess = new Map();
}

const specialCharactersRegex = /[\s\-.@*#%^\p{Extended_Pictographic}]|^\d/u;
/**
 * Formats a property name to handle special characters
 */
export function formatPropertyName(propName: string): string {
  if (specialCharactersRegex.test(propName)) {
    // If it has spaces, dashes, or dots or other non-alphanumeric characters, wrap it in quotes
    return `'${propName}'`;
  }

  return propName;
}

export function formatInterfaceName(interfaceName: string): string {
  let trimmed = interfaceName.replaceAll(new RegExp(specialCharactersRegex.source, 'gu'), '');
  // Recursively remove numbers
  while (trimmed.match(/^\d/)) {
    trimmed = trimmed.replace(/^\d/g, '');
  }
  if (trimmed.length === 0) {
    return 'InvalidName';
  }

  return trimmed;
}

/**
 * Recursively collects all own and inherited property names of an object
 * and returns them as an array, excluding default prototype properties.
 * This also includes all functions
 */
export function getProperties(obj: unknown): string[] {
  const properties = new Set<string>();
  let currentObj = obj;

  do {
    Object.getOwnPropertyNames(currentObj).map(item => properties.add(item));
  } while ((currentObj = Object.getPrototypeOf(currentObj)) !== null);

  return [...properties.keys()].filter(item => !defaultProtoProps.includes(item));
}
