/**
 * Converts a JavaScript object to TypeScript interfaces
 * @param {Object} obj - The JavaScript object to convert
 * @param {string} mainInterfaceName - The name for the main interface
 * @param {Object} options - Optional configuration
 * @param {boolean} options.exportKeyword - Whether to include 'export' keyword (default: true)
 * @returns {string} TypeScript interface definitions
 */
function convertToTypescript(obj, mainInterfaceName, options = {exportKeyword: true}) {
  if (typeof obj !== 'object') {
    switch (typeof obj) {
      case 'string': return 'string';
      case 'number': return 'number';
      case 'boolean': return 'boolean';
      case 'undefined': return 'undefined';
      case 'symbol': return 'symbol';
      case 'function': return 'unknown'; // This will be used differently in generateInterface
      default: return 'any';
    }
  }

  const { exportKeyword } = options;
  const exportPrefix = exportKeyword ? 'export ' : '';
  const interfaces = new Map();
  const processedObjects = new Set();

  /**
   * Checks if two objects have the same structure
   * @param {Object} obj1 - First object to compare
   * @param {Object} obj2 - Second object to compare
   * @returns {boolean} - Whether the objects have the same structure
   */
  function deepSameStructure(obj1, obj2) {
    if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;
    if (!obj1 || !obj2) return obj1 === obj2;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    return keys1.every(key => 
        keys2.includes(key) && 
        typeof obj1[key] === typeof obj2[key] && 
        (typeof obj1[key] !== "object" || deepSameStructure(obj1[key], obj2[key]))
    );
}
  
  /**
   * Formats a property name for TypeScript
   * @param {string} propName - The property name to format
   * @returns {string} - Formatted property name
   */
  function formatPropertyName(propName) {
    // Check if the property name contains special characters
    if (/[\s\-\.]/.test(propName)) {
      // If it has spaces, dashes, or dots, wrap it in quotes
      return `'${propName}'`;
    }
    
    // Otherwise return as is
    return propName;
  }
  
  /**
   * Gets the TypeScript type for a value
   * @param {any} value - The value to get the type for
   * @param {string} path - Current property path for nested objects
   * @returns {string} TypeScript type
   */
  function getType(value, path = '') {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    
    const type = typeof value;
    
    switch (type) {
      case 'string': return 'string';
      case 'number': return 'number';
      case 'boolean': return 'boolean';
      case 'function': return 'unknown'; // This will be used differently in generateInterface
      case 'object':
        if (Array.isArray(value)) {
          if (value.length === 0) {
            return 'unknown[]';
          }
          
          // Check if all items are the same type
          const itemType = getType(value[0], path);
          const allSameType = value.every(item => getType(item, path) === itemType);
          
          if (allSameType) {
            return `${itemType}[]`;
          } else {
            const types = new Set(value.map(item => getType(item, path)));
            return `(${[...types].join('|')})[]`;
          }
        }
        
        // Create interface for nested objects
        const valueName = path.split('.').slice(-1)[0];   
        let interfaceName = path ? 
          valueName.charAt(0).toUpperCase() + valueName.slice(1) :
          `${mainInterfaceName}Nested${interfaces.size}`;
        
        // If the interface already exists add a number to it
        let i = 2;
        while (interfaces.has(interfaceName)) {
          if (deepSameStructure(interfaces.get(interfaceName), value)) return interfaceName;
          interfaceName = valueName.charAt(0).toUpperCase() + valueName.slice(1) + i;
          i++;
        }

        // Avoid circular references
        if (processedObjects.has(value)) {
          return path.split('.').slice(-2)[0];
        }
        
        processedObjects.add(value);
        interfaces.set(interfaceName, value);
        
        return interfaceName;
      default:
        return 'any';
    }
  }
  
  /**
   * Extracts parameter names from a function
   * @param {Function} func - The function to extract parameters from
   * @returns {Array<{name: string, defaultValue: string|null}>} Array of parameter objects with name and default value
   */
  function extractFunctionParams(func) {
    const funcStr = func.toString();
    
    // Try to extract parameters from the function string
    let paramsMatch;
    
    // Arrow function: (a, b) => {}
    if (funcStr.includes('=>')) {
      const arrowIndex = funcStr.indexOf('=>');
      const beforeArrow = funcStr.substring(0, arrowIndex).trim();
      
      if (beforeArrow.startsWith('(') && beforeArrow.endsWith(')')) {
        // Multi-parameter arrow function: (a, b) => {}
        paramsMatch = beforeArrow.slice(1, -1);
      } else if (!beforeArrow.includes('(') && !beforeArrow.includes(')')) {
        // Single parameter arrow function without parentheses: a => {}
        paramsMatch = beforeArrow;
      } else {
        // Complex arrow function, try to extract from parentheses
        const openParenIndex = beforeArrow.indexOf('(');
        const closeParenIndex = beforeArrow.lastIndexOf(')');
        if (openParenIndex !== -1 && closeParenIndex !== -1) {
          paramsMatch = beforeArrow.substring(openParenIndex + 1, closeParenIndex);
        }
      }
    } else {
      // Regular function: function(a, b) {}
      const funcRegex = /function.*?\(([^)]*)\)/;
      const match = funcRegex.exec(funcStr);
      if (match) {
        paramsMatch = match[1];
      }
    }
    
    if (paramsMatch) {
      // Split by commas, but handle cases where there might be commas in default values
      let params = [];
      let currentParam = '';
      let parenDepth = 0;
      let bracketDepth = 0;
      let braceDepth = 0;
      let inString = false;
      let stringChar = '';
      
      for (let i = 0; i < paramsMatch.length; i++) {
        const char = paramsMatch[i];
        const prevChar = i > 0 ? paramsMatch[i - 1] : '';
        
        // Handle string boundaries
        if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
          if (!inString) {
            inString = true;
            stringChar = char;
          } else if (char === stringChar) {
            inString = false;
          }
        }
        
        // Only count brackets if not in a string
        if (!inString) {
          if (char === '(') parenDepth++;
          else if (char === ')') parenDepth--;
          else if (char === '[') bracketDepth++;
          else if (char === ']') bracketDepth--;
          else if (char === '{') braceDepth++;
          else if (char === '}') braceDepth--;
        }
        
        // Only split on commas that are not inside strings, parentheses, brackets, or braces
        if (char === ',' && !inString && parenDepth === 0 && bracketDepth === 0 && braceDepth === 0) {
          params.push(currentParam.trim());
          currentParam = '';
        } else {
          currentParam += char;
        }
      }
      
      if (currentParam.trim()) {
        params.push(currentParam.trim());
      }
      
      // Process parameters to extract names and default values
      return params.map(param => {
        let name, defaultValue = null;
        
        // Handle spread parameters
        if (param.startsWith('...')) {
          return { name: param, defaultValue: null };
        }
        
        // Handle default parameters
        if (param.includes('=')) {
          const equalIndex = param.indexOf('=');
          name = param.substring(0, equalIndex).trim();
          defaultValue = param.substring(equalIndex + 1).trim();
        } else {
          name = param.trim();
        }
        
        return { name, defaultValue };
      });
    }
    
    return [];
  }
  
  /**
   * Tries to determine the return type of a function
   * @param {Function} func - The function to analyze
   * @returns {string} TypeScript return type
   */
  function detectReturnType(func) {
    const funcStr = func.toString();
    const returnTypes = new Set();

    // If there are no return statements and no arrow functions, return 'void'
    if (!funcStr.includes('return') && !funcStr.includes('=>')) {
      return 'void';
    }

    // Check if there are nested functions or arrow functions
    // If so, return 'unknown' as we can't reliably determine the return type
    if ((funcStr.includes('function') && funcStr.indexOf('function') !== funcStr.lastIndexOf('function')) ||
        (funcStr.includes('=>') && funcStr.indexOf('=>') !== funcStr.lastIndexOf('=>'))) {
      return 'unknown';
    }

    // Check for direct return arrow functions (e.g., () => 'string' or () => null)
    if (funcStr.includes('=>')) {
      const arrowIndex = funcStr.indexOf('=>');
      const afterArrow = funcStr.substring(arrowIndex + 2).trim();
      
      // Direct return of a value without braces
      if (!afterArrow.startsWith('{')) {
        // Remove parentheses if the entire expression is wrapped in them
        let cleanedValue = afterArrow;
        if (cleanedValue.startsWith('(') && cleanedValue.endsWith(')')) {
          cleanedValue = cleanedValue.substring(1, cleanedValue.length - 1).trim();
        }
        
        // Check for various direct return types
        if (cleanedValue === 'null') {
          return 'null';
        } else if (cleanedValue === 'undefined') {
          return 'undefined';
        } else if (cleanedValue === 'true' || cleanedValue === '!0') {
          return 'true';
        } else if (cleanedValue === 'false' || cleanedValue === '!1') {
          return 'false';
        } else if (/^-?\d+(\.\d+)?$/.test(cleanedValue)) {
          return 'number';
        } else if (/^(['"`]).*\1$/.test(cleanedValue.trim())) {
          return 'string';
        } else if (cleanedValue.startsWith('[') && cleanedValue.endsWith(']')) {
          return 'unknown[]';
        } else if (cleanedValue.startsWith('{') && cleanedValue.endsWith('}')) {
          return 'object|unknown';
        }
      }
    }

    // Extract all return statements
    const returnRegex = /return\s*(.*);/g;
    let match;
    let hasReturnStatements = false;
    
    while ((match = returnRegex.exec(funcStr)) !== null) {
      hasReturnStatements = true;
      const returnValue = match[1].trim();
      
      if (returnValue === '') {
        returnTypes.add('undefined');
      } else if (returnValue === 'null') {
        returnTypes.add('null');
      } else if (returnValue === 'undefined') {
        returnTypes.add('undefined');
      } else if (returnValue === 'true' || returnValue === '!0') {
        returnTypes.add('true');
      } else if (returnValue === 'false' || returnValue === '!1') {
        returnTypes.add('false');
      } else if (/^\d+(\.\d+)?$/.test(returnValue)) {
        returnTypes.add('number');
      } else if (/^['"`]/.test(returnValue)) {
        returnTypes.add('string');
      } else if (returnValue.startsWith('[')) {
        returnTypes.add('unknown[]');
      } else if (returnValue.startsWith('{')) {
        returnTypes.add('object|unknown');
      } else {
        returnTypes.add('unknown');
      }
    }
    
    // If we have return statements but couldn't determine specific types
    if (hasReturnStatements && returnTypes.size === 0) {
      return 'unknown';
    }
    
    // If we have multiple return types, create a union type
    if (returnTypes.size > 1) {
      // Special case: if we have both 'true' and 'false', just return 'boolean'
      if (returnTypes.has('true') && returnTypes.has('false') && returnTypes.size === 2) {
        return 'boolean';
      }
      
      return Array.from(returnTypes).join('|');
    } else if (returnTypes.size === 1) {
      if (returnTypes.has('undefined')) {
        return 'void';
      }

      return Array.from(returnTypes)[0];
    }
    
    // Default if we couldn't determine the return type
    return 'unknown';
  }

  const defaultProtoProps = [
    "constructor",
    "__defineGetter__",
    "__defineSetter__",
    "hasOwnProperty",
    "__lookupGetter__",
    "__lookupSetter__",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toString",
    "valueOf",
    "__proto__",
    "toLocaleString"
  ];

  /**
   * Recursively collects all own and inherited property names of an object
   * and returns them as an array, excluding default prototype properties.
   * This also includes all functions
   * 
   * @param {Object} obj - The object to collect property names from
   * @returns {string[]} An array of property names
   */
  function getProperties(obj) {
    let properties = new Set();
    let currentObj = obj;
    
    do {
      Object.getOwnPropertyNames(currentObj).map(item => properties.add(item));
    } while ((currentObj = Object.getPrototypeOf(currentObj)));
    
    return [...properties.keys()].filter(item => !defaultProtoProps.includes(item));
  }

  /**
   * Generates interface definition for an object
   * @param {Object} obj - The object to generate interface for
   * @param {string} interfaceName - Name of the interface
   */
  function generateInterface(obj, interfaceName) {
    let result = `${exportPrefix}interface ${interfaceName} {\n`;
    
    // First collect functions and non-functions separately
    const functions = [];
    const nonFunctions = [];
    
    // Process all properties
    
    for (const key of getProperties(obj)) {
      // if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const propertyPath = interfaceName + '.' + key;
      const type = getType(value, propertyPath);
      
      if (typeof value === 'function') {
        const params = extractFunctionParams(value);
        const paramsList = params.map(param => {
          // Handle spread parameters
          if (param.name.startsWith('...')) {
            return `${param.name}: unknown[]`;
          }

          // Format parameter with optional marker and default value comment if present
          let paramStr = param.name;
          
          // Add optional marker for parameters with default values
          if (param.defaultValue !== null) {
            paramStr += '?';
          }
          
          paramStr += ': unknown';
          
          // Add default value as a comment if present
          if (param.defaultValue !== null) {
            paramStr += ` /* default = ${param.defaultValue} */`;
          }
          
          return paramStr;
        }).join(', ');
        const returnType = detectReturnType(value);
        functions.push(`  ${formatPropertyName(key)}(${paramsList}): ${returnType};`);
      } else {
        nonFunctions.push(`  ${formatPropertyName(key)}: ${type};`);
      }
      // }
    }
    
    // Add functions first
    functions.sort((a, b) => a.replace("'", '').trim().localeCompare(b.replace("'", '').trim()));
    if (functions.length > 0) {
      result += functions.join('\n') + '\n';
      
      // Add empty line between functions and properties if both exist
      if (nonFunctions.length > 0) {
        result += '\n';
      }
    }
    
    nonFunctions.sort((a, b) => a.replace("'", '').trim().localeCompare(b.replace("'", '').trim()));
    // Add non-function properties
    if (nonFunctions.length > 0) {
      result += nonFunctions.join('\n') + '\n';
    }
    
    result += '}\n';
    return result;
  }
  
  // Add the main interface
  interfaces.set(mainInterfaceName, obj);
  
  // Process all interfaces
  let result = '';
  for (const [name, objValue] of interfaces.entries()) {
    if (result) result += '\n';
    result += generateInterface(objValue, name);
  }
  
  return result;
}

function testConvert() {
  const testObj = {
    //TODO: Things like this are broken now, FIX IT. Test it on appDetailsStore
    regularFunc: function test(u, e, v, SteamClient) {
      return u.O.SetCachedDataForApp(e.appid, v, 1, void 0),
      SteamClient.Apps.ClearCustomLogoPositionForApp(e.appid).then((()=>{
          let t = this.GetAppData(e.appid);
          t.customImageInfo = void 0,
          t.customImageInfoRtime = e.rt_custom_image_mtime
      }
      ))
  },
  };
  
  const tsInterfaces = convertToTypescript(testObj, 'TestObject');
  console.log(tsInterfaces);
}

// If running as a standalone script
if (typeof require !== 'undefined' && require.main === module) {
  testConvert();
}

// Export the function for use in other modules
if (typeof module !== 'undefined' && module?.exports) {
  module.exports = { convertToTypescript };
}