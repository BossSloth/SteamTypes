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

/**
 * Checks if two objects have the same structure
 * TODO: This is not performant at all, please optimize
 */
export function deepSameStructure(obj1: unknown, obj2: unknown, depth = 0): boolean {
  if (depth > 10) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
  if (!obj1 || !obj2) return obj1 === obj2;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  return keys1.every(key =>
    keys2.includes(key)
    && typeof obj1[key] === typeof obj2[key]
    && (typeof obj1[key] !== 'object' || deepSameStructure(obj1[key], obj2[key], depth + 1)),
  );
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
