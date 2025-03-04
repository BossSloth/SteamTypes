import { Project } from 'ts-morph';
import { extractFunctionInfo } from './function-extraction';
import { formatPropertyName, getProperties } from './utils';
import { getType } from './prop-type-detection';
import { InterfaceProperty, TypeScriptInterface } from './types';
import { context } from './utils';

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
    properties: []
  };
  context.interfaceDefinitions.set(interfaceName, interfaceDefinition);
  
  // Get all properties
  let properties = getProperties(obj);
  properties = properties.sort(propertyStringSorter);

  // Process all properties
  for (const key of properties) {
    const value = obj[key];
    const propertyPath = interfaceName + '.' + key;
    const formattedName = formatPropertyName(key);
    
    let interfaceProperty: InterfaceProperty;
    
    if (typeof value === 'function') {
      // Get parameter information and return type using ts-morph in a single call
      const functionInfo = extractFunctionInfo(value, project);
      
      interfaceProperty = {
        name: formattedName,
        type: 'function',
        functionInfo
      };
    } else {
      let type;
      if (typeof value === 'object' && value !== null && getProperties(value).length === 0) {
        type = 'object|unknown';
      } else {
        type = getType(value, propertyPath);
      }
      
      interfaceProperty = {
        name: formattedName,
        type,
      };
    }
    
    interfaceDefinition.properties.push(interfaceProperty);
  }
  
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

function propertySorter(a: InterfaceProperty, b: InterfaceProperty) {
  return propertyStringSorter(a.name, b.name);
}

function propertyStringSorter(a: string, b: string) {
  const cleanA = a.replaceAll("'", '').trim();
  const cleanB = b.replaceAll("'", '').trim();
  return cleanA.localeCompare(cleanB);
}
