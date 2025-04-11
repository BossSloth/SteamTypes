import { convertToTypescript } from './converter';
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
  interfaceNameCounter: new Map(),
};

export function initContext(mainInterfaceName: string): void {
  context.interfacesToProcess = new Map();
  context.interfaceDefinitions = new Map();
  context.imports = new Map();
  context.processedObjectPaths = new Map();
  context.mainInterfaceName = mainInterfaceName;
  context.functionsToProcess = new Map();
  context.interfaceNameCounter = new Map();
}

const specialCharactersRegex = /[\s\-.@*#%^\p{Extended_Pictographic}/]|^\d/u;
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
export function getProperties(obj: unknown, depth = 0): string[] {
  if (obj === null || typeof obj !== 'object') return [];
  if (obj[Symbol.toStringTag] !== undefined) return ['values'];

  const properties = new Set<string>();
  let currentObj: object | null = obj;

  // for (let i = 0; i < depth; i++) {
  //   currentObj = Object.getPrototypeOf(currentObj) as object | null;
  // }

  do {
    const ownProps = Object.getOwnPropertyNames(currentObj);
    ownProps.forEach((propName) => {
      if (!defaultProtoProps.has(propName)) {
        properties.add(propName);
      }
    });
  } while ((currentObj = Object.getPrototypeOf(currentObj) as object | null) !== null);

  return [...properties];
}

globalThis.checkConversionTime = function checkConversionTime(obj: Record<string, unknown>): void {
  const properties = getProperties(obj);
  const times: { property: string; time: number; }[] = [];
  for (const property of properties) {
    const start = performance.now();
    convertToTypescript({ [property]: obj[property] }, 'Test');
    const end = performance.now();
    const time = end - start;
    if (time > 1) {
      times.push({ property, time });
    }
  }
  console.log(times.sort((a, b) => b.time - a.time).map(item => `${item.property}: ${item.time}ms`).join('\n'));
  console.log('Total properties:', properties.length);
  console.log('Total time:', times.reduce((acc, curr) => acc + curr.time, 0));
};
