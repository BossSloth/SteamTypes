import { ConversionContext, defaultProtoProps } from './types';

export const context: ConversionContext = {
  interfacesToProcess: new Map<string, any>(),
  interfaceDefinitions: new Map<string, any>(),
  imports: new Set<string>(),
  processedObjectPaths: new Map<any, string>(),
  mainInterfaceName: '',
  functionsToProcess: new Map<string, Map<string, Function>>(),
};

export function initContext(mainInterfaceName: string): void {
  context.interfacesToProcess = new Map<string, any>();
  context.interfaceDefinitions = new Map<string, any>();
  context.imports = new Set<string>();
  context.processedObjectPaths = new Map<any, string>();
  context.mainInterfaceName = mainInterfaceName;
  context.functionsToProcess = new Map<string, Map<string, Function>>();
}

/**
 * Checks if two objects have the same structure
 * TODO: This is not performant at all, please optimize
 */
export function deepSameStructure(obj1: any, obj2: any, depth = 0): boolean {
  if (depth > 10) return false;
  if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;
  if (!obj1 || !obj2) return obj1 === obj2;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => 
      keys2.includes(key) && 
      typeof obj1[key] === typeof obj2[key] && 
      (typeof obj1[key] !== "object" || deepSameStructure(obj1[key], obj2[key], depth + 1))
  );
}

const specialCharactersRegex = /[\s\-\.@*#%^\p{Extended_Pictographic}]|^\d/u;
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
  let trimmed = interfaceName.replaceAll(new RegExp(specialCharactersRegex.source, 'gu'), '')
  if (trimmed.length === 0) {
    return 'InvalidName'
  }
  
  return trimmed;
}

/**
 * Recursively collects all own and inherited property names of an object
 * and returns them as an array, excluding default prototype properties.
 * This also includes all functions
 */
export function getProperties(obj: any): string[] {
  let properties = new Set<string>();
  let currentObj = obj;
  
  do {
    Object.getOwnPropertyNames(currentObj).map(item => properties.add(item));
  } while ((currentObj = Object.getPrototypeOf(currentObj)));
  
  return [...properties.keys()].filter(item => !defaultProtoProps.includes(item));
}
