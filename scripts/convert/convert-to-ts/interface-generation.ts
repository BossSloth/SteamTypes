import { Project } from 'ts-morph';
import { massExtractFunctionInfo } from './function-extraction';
import { formatPropertyName, getProperties } from './utils';
import { getType } from './prop-type-detection';
import { InterfaceProperty, TypeScriptInterface } from './types';
import { context } from './utils';
import { PrimitiveType, UnionType, Type } from './Type';

let order = 0;

/**
 * Creates or updates an interface definition object
 */
export function createInterfaceDefinition(
  obj: any, 
  interfaceName: string, 
  project: Project,
): TypeScriptInterface {
  let interfaceDefinition = context.interfaceDefinitions.get(interfaceName);

  if (interfaceDefinition) {
    console.error('❌ Error: duplicate interface name?: ' + interfaceName, obj);
    return interfaceDefinition;
  }
  
  // Create a new interface definition
  interfaceDefinition = {
    name: interfaceName,
    properties: [],
    order: order++
  };
  
  // Get all properties
  let properties = getProperties(obj);
  properties = properties.sort(propertyStringSorter);

  // Process all properties
  for (const key of properties) {
    const value = obj[key];
    const propertyPath = interfaceName + '.' + key;
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
  if (context.functionsToProcess.has(interfaceName)) {
    const functionInfos = massExtractFunctionInfo(context.functionsToProcess.get(interfaceName)!, project);
    for (const [name, functionInfo] of functionInfos) {
      const interfaceProperty: InterfaceProperty = {
        name,
        type: new PrimitiveType('function'),
        functionInfo
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
  let result = `export interface ${interfaceDefinition.name} {\n`;
  
  // First collect functions and non-functions separately
  const functions: string[] = [];
  const nonFunctions: string[] = [];
  
  const sortedProperties = interfaceDefinition.properties.sort(propertySorter);
  // Process all properties
  for (const property of sortedProperties) {
    if (property.functionInfo) {
      const paramsList = property.functionInfo.params.map(param => {
        let paramStr = param.name;
        
        // Add optional marker for optional parameters
        if (param.optional) {
          paramStr += '?';
        }
        
        paramStr += `: ${param.type}`;

        if (param.defaultValue) {
          paramStr += ` /* default = ${param.defaultValue} */`
        }
        
        return paramStr;
      }).join(', ');
      
      functions.push(`  ${property.name}(${paramsList}): ${property.functionInfo.returnType};`);
    } else {
      const optionalMarker = property.optional ? '?' : '';
      nonFunctions.push(`  ${property.name}${optionalMarker}: ${property.type};`);
    }
  }
  
  // Add functions first
  if (functions.length > 0) {
    result += functions.join('\n') + '\n';
    
    // Add empty line between functions and properties if both exist
    if (nonFunctions.length > 0) {
      result += '\n';
    }
  }
  
  // Add non-function properties
  if (nonFunctions.length > 0) {
    result += nonFunctions.join('\n') + '\n';
  }
  
  result += '}\n';
  return result;
}

function propertySorter(a: InterfaceProperty, b: InterfaceProperty): number {
  return propertyStringSorter(a.name, b.name);
}

const singleQuote = "'".charCodeAt(0);
const space = " ".charCodeAt(0);

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
    i++; j++;
  }

  return (lenA - i) - (lenB - j);
}
