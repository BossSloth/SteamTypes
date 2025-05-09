import { Project } from 'ts-morph';
import { massExtractFunctionInfo } from './function-extraction';
import { getType } from './prop-type-detection';
import { InterfaceType, PrimitiveType, Type } from './Type';
import { defaultJsProtoBufProps, InterfaceProperty, InterfaceToProcess, TypeScriptInterface } from './types';
import { context, formatPropertyName, getProperties } from './utils';

let order = 0;

/**
 * Creates or updates an interface definition object
 */
export function createInterfaceDefinition(
  interfaceName: string,
  interfaceToProcess: InterfaceToProcess,
  project: Project,
): void {
  let interfaceDefinition = context.interfaceDefinitions.get(interfaceName);

  if (interfaceDefinition) {
    console.error(`❌ Error: duplicate interface name?: ${interfaceName}`, interfaceToProcess.obj);

    return;
  }

  // Create a new interface definition
  interfaceDefinition = {
    name: interfaceName,
    properties: [],
    order: order++,
    nameCounter: interfaceToProcess.nameCounter,
    constructorString: interfaceToProcess.constructorString,
  };

  // Get all properties
  let properties = getProperties(interfaceToProcess.obj);

  // Check if object is a protobuf message
  if (properties.includes('toObject') && properties.includes('serializeBinary') && properties.includes('getClassName')) {
    properties = properties.filter(item => !defaultJsProtoBufProps.includes(item));
    interfaceDefinition.extends = 'JsPbMessage';
    context.addImport('google-protobuf', 'Message as JsPbMessage');
  }

  properties = properties.sort(propertyStringSorter);

  // Process all properties
  processInterfaceProperties(interfaceToProcess.obj, properties, interfaceName, interfaceDefinition);

  // Get parameter information and return type using ts-morph in one big call
  // This is still the biggest performance hit because of ts-morph being slow
  const functions = context.functionsToProcess.get(interfaceName);
  if (functions) {
    const functionInfos = massExtractFunctionInfo(functions, project);
    for (const [name, functionInfo] of functionInfos) {
      const interfaceProperty: InterfaceProperty = {
        name,
        type: new PrimitiveType('function'),
        functionInfo,
      };
      interfaceDefinition.properties.push(interfaceProperty);
    }
  }

  context.interfaceDefinitions.set(interfaceName, interfaceDefinition);
}

function processInterfaceProperties(obj: Record<string, unknown>, properties: string[], interfaceName: string, interfaceDefinition: TypeScriptInterface): void {
  for (const key of properties) {
    const value = obj[key];
    const propertyPath = `${interfaceName}.${key}`;
    const formattedName = formatPropertyName(key);

    if (typeof value === 'function') {
      if (!context.functionsToProcess.has(interfaceName)) {
        context.functionsToProcess.set(interfaceName, new Map());
      }
      context.functionsToProcess.get(interfaceName)?.set(formattedName, value);
    } else {
      if (key === 'CMInterface' || key === 'm_CMInterface') {
        const interfaceProperty: InterfaceProperty = {
          name: formattedName,
          type: new InterfaceType('ConnectionManager'),
        };
        context.addImport('./ConnectionManager', 'ConnectionManager');
        interfaceDefinition.properties.push(interfaceProperty);

        continue;
      }

      const type = getType(value, propertyPath);

      const jsDoc = generatePropertyJsDoc(type, key, value);

      const interfaceProperty: InterfaceProperty = {
        name: formattedName,
        type,
        jsDoc,
      };

      interfaceDefinition.properties.push(interfaceProperty);
    }
  }
}

function generatePropertyJsDoc(type: Type, propertyName: string, value: unknown): string[] | undefined {
  if (
    type instanceof PrimitiveType
    && type.kind === 'number'
    && typeof value === 'number'
    && propertyName.trim().match(/^e[A-Z]|^m_e[A-Z]/) !== null
  ) {
    // If we got here we have a property that is likely an enum value
    return ['This value is an enum', `@currentValue ${value}`];
  }

  return undefined;
}

/**
 * Generates interface definition string from TypeScriptInterface object
 */
export function generateInterfaceString(interfaceDefinition: TypeScriptInterface): string {
  let result: string;
  if (interfaceDefinition.extends !== undefined) {
    result = `export interface ${interfaceDefinition.name} extends ${interfaceDefinition.extends} {\n`;
  } else {
    result = `export interface ${interfaceDefinition.name} {\n`;
  }

  // First collect functions and non-functions separately
  const sortedProperties = interfaceDefinition.properties.sort(propertySorter);
  const [functionProperties, nonFunctionProperties] = processProperties(sortedProperties);

  // Add functions first
  if (functionProperties.length > 0) {
    result += `${functionProperties.join('\n\n')}\n`;

    // Add empty line between functions and properties if both exist
    if (nonFunctionProperties.length > 0) {
      result += '\n';
    }
  }

  // Add non-function properties
  if (nonFunctionProperties.length > 0) {
    result += `${nonFunctionProperties.join('\n\n')}\n`;
  }

  result += '}\n';

  return result;
}

/**
 * Processes properties and returns two arrays: one for functions and one for non-functions
 * @param sortedProperties - Array of sorted properties
 * @returns Tuple of two arrays: [functions, nonFunctions]
 */
function processProperties(sortedProperties: InterfaceProperty[]): [string[], string[]] {
  const functions: string[] = [];
  const nonFunctions: string[] = [];

  for (const property of sortedProperties) {
    if (property.functionInfo) {
      const paramsList = property.functionInfo.params.map((param) => {
        let paramStr = param.name;

        // Add optional marker for optional parameters
        if (param.optional) {
          paramStr += '?';
        }

        paramStr += `: ${param.type}`;

        return paramStr;
      }).join(', ');

      const optionalMarker = property.optional ?? false ? '?' : '';

      if (property.functionInfo.jsDoc) {
        functions.push(`  /**
${property.functionInfo.jsDoc.map(jsDoc => `   * ${jsDoc}`).join('\n')}
   */
  ${property.name}${optionalMarker}(${paramsList}): ${property.functionInfo.returnType};`);
      } else {
        functions.push(`  ${property.name}${optionalMarker}(${paramsList}): ${property.functionInfo.returnType};`);
      }
    } else {
      const optionalMarker = property.optional ?? false ? '?' : '';
      if (property.jsDoc) {
        nonFunctions.push(`  /**
${property.jsDoc.map(jsDoc => `   * ${jsDoc}`).join('\n')}
   */
  ${property.name}${optionalMarker}: ${property.type.toString()};`);
      } else {
        nonFunctions.push(`  ${property.name}${optionalMarker}: ${property.type.toString()};`);
      }
    }
  }

  return [functions, nonFunctions];
}

function propertySorter(a: InterfaceProperty, b: InterfaceProperty): number {
  return propertyStringSorter(a.name, b.name);
}

const singleQuote = "'".charCodeAt(0);
const space = ' '.charCodeAt(0);

function propertyStringSorter(a: string, b: string): number {
  a = a.toLowerCase();
  b = b.toLowerCase();
  let i = 0;
  let j = 0;
  const lenA = a.length;
  const lenB = b.length;

  while (i < lenA && j < lenB) {
    let charA = a.charCodeAt(i);
    let charB = b.charCodeAt(j);

    // Skip single quotes and spaces
    while (charA === singleQuote || charA === space) charA = a.charCodeAt(++i);
    while (charB === singleQuote || charB === space) charB = b.charCodeAt(++j);

    if (charA !== charB) return charA - charB;

    i++;
    j++;
  }

  return (lenA - i) - (lenB - j);
}
