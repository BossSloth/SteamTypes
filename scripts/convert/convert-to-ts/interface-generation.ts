import { Project } from 'ts-morph';
import { massExtractFunctionInfo } from './function-extraction';
import { getType } from './prop-type-detection';
import { PrimitiveType, Type, UnionType } from './Type';
import { defaultJsProtoBufProps, InterfaceProperty, TypeScriptInterface } from './types';
import { context, formatPropertyName, getProperties } from './utils';

let order = 0;

/**
 * Creates or updates an interface definition object
 */
export function createInterfaceDefinition(
  obj: Record<string, unknown>,
  interfaceName: string,
  nameCounter: number | undefined,
  project: Project,
): TypeScriptInterface {
  let interfaceDefinition = context.interfaceDefinitions.get(interfaceName);

  if (interfaceDefinition) {
    console.error(`❌ Error: duplicate interface name?: ${interfaceName}`, obj);

    return interfaceDefinition;
  }

  // Create a new interface definition
  interfaceDefinition = {
    name: interfaceName,
    properties: [],
    order: order++,
    nameCounter,
  };

  // Get all properties
  let properties = getProperties(obj);

  // Check if object is a protobuf message
  if (properties.includes('toObject') && properties.includes('serializeBinary') && properties.includes('getClassName')) {
    properties = properties.filter(item => !defaultJsProtoBufProps.includes(item));
    interfaceDefinition.extends = 'JsPbMessage';
    context.addImport('google-protobuf', 'Message as JsPbMessage');
  }

  properties = properties.sort(propertyStringSorter);

  // Process all properties
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
      let type: Type;
      if (typeof value === 'object' && value !== null && getProperties(value).length === 0) {
        type = new UnionType([new PrimitiveType('object'), new PrimitiveType('unknown')]);
      } else {
        type = getType(value, propertyPath);
      }

      const interfaceProperty = {
        name: formattedName,
        type,
      };
      interfaceDefinition.properties.push(interfaceProperty);
    }
  }

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

  return interfaceDefinition;
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
  const functions: string[] = [];
  const nonFunctions: string[] = [];

  const sortedProperties = interfaceDefinition.properties.sort(propertySorter);
  // Process all properties
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

      if (property.functionInfo.jsDoc) {
        functions.push(`  /**
${property.functionInfo.jsDoc.map(jsDoc => `   * ${jsDoc}`).join('\n')}
   */
  ${property.name}(${paramsList}): ${property.functionInfo.returnType};`);
      } else {
        functions.push(`  ${property.name}(${paramsList}): ${property.functionInfo.returnType};`);
      }
    } else {
      const optionalMarker = property.optional ?? false ? '?' : '';
      nonFunctions.push(`  ${property.name}${optionalMarker}: ${property.type.toString()};`);
    }
  }

  // Add functions first
  if (functions.length > 0) {
    result += `${functions.join('\n\n')}\n`;

    // Add empty line between functions and properties if both exist
    if (nonFunctions.length > 0) {
      result += '\n';
    }
  }

  // Add non-function properties
  if (nonFunctions.length > 0) {
    result += `${nonFunctions.join('\n\n')}\n`;
  }

  result += '}\n';

  return result;
}

function propertySorter(a: InterfaceProperty, b: InterfaceProperty): number {
  return propertyStringSorter(a.name, b.name);
}

const singleQuote = "'".charCodeAt(0);
const space = ' '.charCodeAt(0);

function propertyStringSorter(a: string, b: string): number {
  a = a.toLowerCase();
  b = b.toLowerCase();
  let i = 0, j = 0;
  const lenA = a.length, lenB = b.length;

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
