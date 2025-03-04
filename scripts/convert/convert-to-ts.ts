import { Project, ScriptTarget, TypeFormatFlags, ts, FunctionExpression, ArrowFunction } from 'ts-morph';
import { testSuites } from './test-cases/test-cases';
import Long from 'long';
import { isObservableMap, isObservableSet } from 'mobx';

/**
 * Converts a JavaScript object to TypeScript interfaces using ts-morph
 * @param {Object} obj - The JavaScript object to convert
 * @param {string} mainInterfaceName - The name for the main interface
 * @returns {string} TypeScript interface definitions
 */
function convertToTypescript(obj: any, mainInterfaceName: string, project: Project = globalThis.tsProject): string {
  const exportKeyword = true;
  const exportPrefix = exportKeyword ? 'export ' : '';
  const interfaces = new Map<string, any>();
  const imports = new Set<string>();
  
  // Track objects being processed to detect circular references
  // Map object reference to its path for better circular reference handling
  const processedObjectPaths = new Map<any, string>();

  const typeFormatFlags = 
    TypeFormatFlags.UseSingleQuotesForStringLiteralType |
    TypeFormatFlags.UseFullyQualifiedType;

  /**
   * Checks if two objects have the same structure
   */
  function deepSameStructure(obj1: any, obj2: any, depth = 0): boolean {
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

  function formatPropertyName(propName: string): string {
    if (/[\s\-\.@*#%^\p{Extended_Pictographic}]|^\d/u.test(propName)) {
      // If it has spaces, dashes, or dots or other non-alphanumeric characters, wrap it in quotes
      return `'${propName}'`;
    }
    
    return propName;
  }

  function checkNonGenericObjectTypes(obj: any): string|null {
    if (Long.isLong(obj)) { imports.add("import Long from 'long';"); return 'Long'; };
    if (obj instanceof Date) return 'Date';
    if (obj instanceof RegExp) return 'RegExp';
    if (obj instanceof Error) return obj.constructor.name;
    if (obj instanceof Promise) return 'Promise<unknown>';
    if (obj instanceof ArrayBuffer) return 'ArrayBuffer';
    if (obj instanceof DataView) return 'DataView';
    if (obj instanceof WeakMap) return 'WeakMap<object, unknown>';
    if (obj instanceof WeakSet) return 'WeakSet<object>';
    if (obj instanceof Int8Array) return 'Int8Array';
    if (obj instanceof Uint8Array) return 'Uint8Array';
    if (obj instanceof Uint8ClampedArray) return 'Uint8ClampedArray';
    if (obj instanceof Int16Array) return 'Int16Array';
    if (obj instanceof Uint16Array) return 'Uint16Array';
    if (obj instanceof Int32Array) return 'Int32Array';
    if (obj instanceof Uint32Array) return 'Uint32Array';
    if (obj instanceof Float32Array) return 'Float32Array';
    if (obj instanceof Float64Array) return 'Float64Array';

    return null;
  }

  //#region Iterable Types
  function getIterableType(value: any, path: string): string {
    const isMap = value instanceof Map || isObservableMap(value);

    let genericTypeName: string|null = null;

    if (isObservableSet(value)) {
      genericTypeName = 'ObservableSet';
      imports.add("import { ObservableSet } from 'mobx';"); 
    } else if (value instanceof Set) {
      genericTypeName = 'Set';
    } else if (isObservableMap(value)) {
      genericTypeName = 'ObservableMap'; 
      imports.add("import { ObservableMap } from 'mobx';"); 
    } else if (value instanceof Map) {
      genericTypeName = 'Map';
    } else genericTypeName = null;
    
    // Check for circular references in arrays/iterables
    if (processedObjectPaths.has(value)) {
      // Return the interface name that this circular reference points to
      const circularPath = processedObjectPaths.get(value)!;

      return `unknown/* circular reference to ${circularPath} */`;
    }
    
    // Register this iterable as being processed to detect circular references
    processedObjectPaths.set(value, path.split('.').pop() || 'Item');
    
    const array = Array.from(value) as unknown[];

    /**
     * Extracts and formats the types from an array of values
     * @param items Array of items to extract types from
     * @returns A string representing the type or union of types
     */
    const getArrayTypes = (items: unknown[]): string => {
      // Get unique types by mapping each item to its type and filtering out undefined
      const uniqueTypes = new Set<string>();
      
      for (const item of items) {
        const itemType = getType(item, path);
        if (itemType !== undefined) {
          uniqueTypes.add(itemType);
        }
      }

      const types = Array.from(uniqueTypes);

      // If all items are the same type, return that type
      // Otherwise, return a union of all types
      if (types.length === 1) {
        return types[0];
      } else {
        return `(${types.join(' | ')})`;
      }
    };

    let typeString: string;
    
    if (array.length === 0) {
      // Handle empty collections
      typeString = 'unknown';
      if (isMap) typeString = 'unknown, unknown';
    } else if (isMap) {
      // Handle Map objects
      const map = value as Map<unknown, unknown>;
      const keyType = getArrayTypes(Array.from(map.keys()));
      const valueType = getArrayTypes(Array.from(map.values()));
      typeString = `${keyType}, ${valueType}`;
    } else {
      // Handle arrays and Sets
      typeString = getArrayTypes(array);
    }
    
    // Format the final type string based on the collection type
    return genericTypeName ? `${genericTypeName}<${typeString}>` : `${typeString}[]`;
  }
  //#endregion

  /**
   * Gets the TypeScript type for a value
   */
  //#region Ext. Value Type
  function getType(value: any, path = ''): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    
    const type = typeof value;
    
    switch (type) {
      case 'string': return 'string';
      case 'number': return 'number';
      case 'boolean': return 'boolean';
      case 'bigint': return 'bigint';
      case 'symbol': return 'symbol';
      case 'function': return 'unknown'; // Placeholder, will be used differently in generateInterface
      case 'object':
        if (
          Array.isArray(value)
          || value instanceof Set
          || isObservableSet(value)
          || value instanceof Map
          || isObservableMap(value)
        ) {
          return getIterableType(value, path);
        }

        if (processedObjectPaths.has(value)) {
          // Return the interface name that this circular reference points to
          const circularPath = processedObjectPaths.get(value)!;

          return circularPath;
        }
        
        const genericType = checkNonGenericObjectTypes(value);
        if (genericType !== null) return genericType;
        
        // Generate a unique interface name for nested objects
        const generateInterfaceName = (baseName: string) => {
            let name = baseName;
            let counter = 1;
            while (interfaces.has(name)) {
                // If same name and structure use already generated interface
                if (deepSameStructure(interfaces.get(name), value)) return name;
                name = `${baseName}${++counter}`;
            }
            return name;
        };

        const lastPathSegment = path.split('.').pop() || '';
        let capitalizedName: string;
        if (lastPathSegment.charAt(1) === '_') {
            capitalizedName = lastPathSegment;
        } else {
            capitalizedName = lastPathSegment.charAt(0).toUpperCase() + lastPathSegment.slice(1);
        }
        const baseName = path ? capitalizedName : `${mainInterfaceName}Nested${interfaces.size}`;

        const sameInterface = [...interfaces].find(([_, i]) => deepSameStructure(i, value));

        if (sameInterface) return sameInterface[0];
        const interfaceName = generateInterfaceName(baseName);
        
        // Register this object as being processed to detect circular references
        processedObjectPaths.set(value, interfaceName);
        
        // Add to interfaces map
        interfaces.set(interfaceName, value);
        
        return interfaceName;
      default:
        return 'unknown';
    }
  }
  //#endregion Ext. Value Type

  //#region Extract Function
  /**
   * Extracts both parameter information and return type from a function using ts-morph
   */
  function extractFunctionInfo(func: Function): { 
    params: MappedParam[],
    returnType: string 
  } {
    const funcStr = func.toString();
    
    if (funcStr.includes('[native code]')) {
      return {
        params: [],
        returnType: 'unknown /* native code */'
      };
    }
    
    // Wrap the function in a variable declaration to make it easier to analyze
    let sourceCode: string;
    if (funcStr.startsWith('function') || funcStr.startsWith('(')) {
      sourceCode = `const myFunc = ${funcStr}`;
    } else if (funcStr.startsWith('async')) {
      if (funcStr.startsWith('async function') || funcStr.startsWith('async (')) {
        sourceCode = `const myFunc = ${funcStr}`;
      } else {
        sourceCode = `const myFunc = ${funcStr.replace('async', 'async function')}`;
      }
    } else {
      sourceCode = `const myFunc = function ${funcStr}`;
    }
    
    const sourceFile = project.createSourceFile(Math.random().toString(36).substring(2) + '.ts', sourceCode);
    const variableDeclaration = sourceFile.getVariableDeclarationOrThrow('myFunc');
    let initializer: FunctionExpression|ArrowFunction = 
      variableDeclaration.getInitializerIfKind(ts.SyntaxKind.FunctionExpression)
      || variableDeclaration.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrowFunction);
    
    const mappedParams = extractParams(initializer);
    const returnType = extractReturnType(initializer);

    project.removeSourceFile(sourceFile);
    
    return {
      params: mappedParams,
      returnType: returnType
    };
  }

  type MappedParam = {
    name: string;
    type: string;
    optional: boolean;
    defaultValue?: string;
  }

  //#region Ext. Params
  function extractParams(initializer: FunctionExpression|ArrowFunction): MappedParam[] {
    const parameters = initializer.getParameters();

    return parameters.map(param => {
      let paramName = param.getName();
      let paramType = param.getType().getText(undefined, typeFormatFlags);
      let isOptional = param.isOptional();
      let defaultValue = param.getInitializer()?.getText();
      // Remove newlines and trim spaces
      defaultValue = defaultValue?.split('\n').map(line => line.trim()).join('');

      if (param.isRestParameter()) {
        paramName = '...'+paramName;
        isOptional = false;
      }

      paramType.replaceAll('any[];', 'unknown[];');

      switch (paramType) {
        case '{}':
        case 'any': paramType = 'unknown'; break;
        case 'any[]':
        case '[]':
        case 'never[]': paramType = 'unknown[]'; break;
      }

      return {
        name: paramName,
        type: paramType || 'unknown',
        optional: isOptional,
        defaultValue
      };
    });
  }
  //#endregion Extract Params

  //#region Ext. Return Type
  function extractReturnType(initializer: FunctionExpression|ArrowFunction): string {
    let returnType = initializer.getReturnType().getText(undefined, typeFormatFlags);
    
    // Always add spaces between types
    returnType = returnType.replace(/(?!\s)\|(?!\s)/g, ' | ');

    returnType = returnType
    .replaceAll('any[];', 'unknown[];')
    .replaceAll('<any>', '<unknown>')
    .replaceAll('<any, any>', '<unknown, unknown>')
    .replaceAll(': any', ': unknown')
    ;

    switch (returnType) {
      case 'any': returnType = 'unknown'; break;
      case 'any[]': returnType = 'unknown[]'; break;
      case '{}': returnType = 'object|unknown'; break;
    }

    return returnType;
  }
  //#endregion Extract Return Type
  //#endregion Extract Function
  
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
   */
  function getProperties(obj: any): string[] {
    let properties = new Set<string>();
    let currentObj = obj;
    
    do {
      Object.getOwnPropertyNames(currentObj).map(item => properties.add(item));
    } while ((currentObj = Object.getPrototypeOf(currentObj)));
    
    return [...properties.keys()].filter(item => !defaultProtoProps.includes(item));
  }

  /**
   * Generates interface definition for an object
   */
  function generateInterface(obj: any, interfaceName: string): string {
    let result = `${exportPrefix}interface ${interfaceName} {\n`;
    
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
        const { params, returnType } = extractFunctionInfo(value);
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
  
  // Add the main interface
  interfaces.set(mainInterfaceName, obj);
  
  // Process all interfaces
  let result = '';
  for (const [name, objValue] of interfaces.entries()) {
    if (result) result += '\n';
    result += generateInterface(objValue, name);
  }

  // Add imports
  if (imports.size > 0) {
    result = Array.from(imports).join('\n') + '\n\n' + result;
  }

  return result;
}

// Test the function
function testConvert() {
  const testObj = {
    arrayExtraTypeLater: [
      { id: 1, idx: 5, name: 'Generic', appDetails: undefined },
      { id: 2, idx: 9, name: 'Specific', appDetails: {foo: 2, bar: 3} },
    ],
    // arrayMoreSpecificObjectLater: [
    //   { id: 1, idx: 5, name: 'Generic' },
    //   { id: 2, idx: 9, name: 'Specific', extra: 'property' },
    //   // { id: 2, idx: 9, name: 'Specific', extra: 'property', other: 3, foo: 2 } //TODO: problem adding this one makes extra no longer optional why?
    // ],
    // optionalDissapears: [
    //   { id: 1, idx1: 5, name: 'Generic' },
    //   { id: 2, idx1: 9, name: 'Specific', extra: 'property' },
    //   { id: 2, idx1: 9, name: 'Specific', extra: 'property', other: 3, foo: 2 }
    // ],
    // arrayNestedMoreSpecificObjectLater: [
    //   { id: 1, idx: 5, name: 'Generic', extra: {foo: 2, bar: 3, baz: 5, other: 'other'}},
    //   { id: 2, idx: 9, name: 'Specific', extra: {foo: 2, bar: 3, baz: 5, other: 'other', test5: 'property'} }, //TODO: problem extra.test5 goes lost here
    //   // { id: 2, idx: 9, name: 'Specific', extra: 'property', other: 3, foo: 2 }
    // ],
    // brokenMultiArray: [ //TODO: this array just fully get's the wrong type
    //   { id: 1, idx: 5, name: 'Generic'},
    //   { id: 2, idx: 9, name: 'Specific', extra: {foo: 2, bar: 3, baz: 5, other: 'other', test5: 'property'} },
    //   // { id: 2, idx: 9, name: 'Specific', extra: 'property', other: 3, foo: 2 }
    // ],
    // setMoreSpecificObjectLater: new Set([
    //   { id1: 1, idx3: 5, name: 'Generic' },
    //   { id1: 2, idx3: 9, name: 'Specific', extra: 'property' }
    // ]),
  }

  const startTime = performance.now();
  const tsInterfaces = convertToTypescript(testObj, 'TestObject', globalThis.tsProject);
  console.log(tsInterfaces);
  const endTime = performance.now();
  console.log(`Execution time: ${endTime - startTime} ms`);
}

globalThis.tsProject = new Project({
  compilerOptions: {
    target: ScriptTarget.Latest,
    emitDeclarationOnly: true,
    lib: ["lib.es5.d.ts", "lib.es2015.d.ts"], // We only load in es2015 here because it is more performant than newer versions and has all features we need to get return types
    strict: true,
  },
  useInMemoryFileSystem: true,
});

if (typeof window === 'undefined' && typeof require !== 'undefined' && require.main === module) {;
  // Run the test
  testConvert();
}

globalThis.testConvert = testConvert;

globalThis.convertToTypescript = convertToTypescript;

// Export the function for use in other modules
export {convertToTypescript}
