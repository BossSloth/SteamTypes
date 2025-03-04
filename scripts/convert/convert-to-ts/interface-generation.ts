import { Project } from 'ts-morph';
import { extractFunctionInfo } from './function-extraction';
import { formatPropertyName, getProperties } from './utils';
import { getType } from './prop-type-detection';

/**
 * Generates interface definition for an object
 */
export function generateInterface(
  obj: any, 
  interfaceName: string, 
  project: Project,
): string {
  let result = `export interface ${interfaceName} {\n`;
  
  // First collect functions and non-functions separately
  const functions: string[] = [];
  const nonFunctions: string[] = [];
  
  let properties = getProperties(obj);
  properties = properties.sort((a: string, b: string) => {
    const cleanA = a.replaceAll("'", '').trim();
    const cleanB = b.replaceAll("'", '').trim();
    return cleanA.localeCompare(cleanB);
  });

  // Process all properties
  for (const key of properties) {
    const value = obj[key];
    const propertyPath = interfaceName + '.' + key;
    
    if (typeof value === 'function') {
      // Get parameter information and return type using ts-morph in a single call
      const { params, returnType } = extractFunctionInfo(value, project);
      const paramsList = params.map(param => {
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
      
      functions.push(`  ${formatPropertyName(key)}(${paramsList}): ${returnType};`);
    } else {
      let type;
      if (typeof value === 'object' && value !== null && getProperties(value).length === 0) {
        type = 'object|unknown';
      } else {
        type = getType(value, propertyPath);
      }
      nonFunctions.push(`  ${formatPropertyName(key)}: ${type};`);
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
