import { Project, ScriptTarget, TypeFormatFlags, ts, FunctionExpression, ArrowFunction, MethodDeclaration } from 'ts-morph';
import { testSuites } from './test-cases';

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
  const processedObjects = new Set<any>();

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
  
  /**
   * Formats a property name for TypeScript
   */
  function formatPropertyName(propName: string): string {
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
   */
  function getType(value: any, path = ''): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    
    const type = typeof value;
    
    switch (type) {
      case 'string': return 'string';
      case 'number': return 'number';
      case 'boolean': return 'boolean';
      case 'function': return 'unknown'; // Placeholder, will be used differently in generateInterface
      case 'object':
        if (Array.isArray(value)) {
          if (value.length === 0) {
            return 'unknown[]';
          }
          
          // Check if all items are the same type
          const types = new Set(value.map(item => getType(item, path)));
          const allSameType = Array.from(types).length === 1;
          
          if (allSameType) {
            return `${Array.from(types)[0]}[]`;
          } else {
            return `(${[...types].join('|')})[]`;
          }
        }
        
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
        let capitalizedName;
        if (lastPathSegment.charAt(1) === '_') {
            capitalizedName = lastPathSegment;
        } else {
            capitalizedName = lastPathSegment.charAt(0).toUpperCase() + lastPathSegment.slice(1);
        }
        const baseName = path ? capitalizedName : `${mainInterfaceName}Nested${interfaces.size}`;

        const sameInterface = [...interfaces].find(([_, i]) => deepSameStructure(i, value));

        if (sameInterface) return sameInterface[0];
        const interfaceName = generateInterfaceName(baseName);

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
   * Extracts parameter information from a function using ts-morph
   */
  function extractFunctionParams(func: Function): Array<{name: string, type: string, optional: boolean, defaultValue?: string}> {
    const funcStr = func.toString();
    
    // Wrap the function in a variable declaration to make it easier to analyze
    let sourceCode: string;
    if (funcStr.startsWith('function')) {
      sourceCode = `const myFunc = ${funcStr}`;
    } else if (funcStr.startsWith('(')) {
      sourceCode = `const myFunc = ${funcStr}`;
    } else {
      sourceCode = `const myFunc = function ${funcStr}`;
    }
    
    try {
      const sourceFile = project.createSourceFile(Math.random().toString(36).substring(2) + '.ts', sourceCode);
      const variableDeclaration = sourceFile.getVariableDeclarationOrThrow('myFunc');
      let initializer: FunctionExpression|ArrowFunction|MethodDeclaration|undefined = 
        variableDeclaration.getInitializerIfKind(ts.SyntaxKind.FunctionExpression)
        || variableDeclaration.getInitializerIfKind(ts.SyntaxKind.ArrowFunction)
      if (!initializer) {
        initializer = variableDeclaration.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrowFunction)
      }
      
      if (!ts.isFunctionExpression(initializer.compilerNode) && 
          !ts.isArrowFunction(initializer.compilerNode)) {
        return [];
      }
      
      const parameters = initializer.getParameters();

      
      const mappedParams =  parameters.map(param => {
        let paramName = param.getName();
        let paramType = param.getType().getText(undefined, TypeFormatFlags.None);
        let isOptional = param.isOptional();
        let defaultValue = param.getInitializer()?.getText();
        // Remove newlines and trim spaces
        defaultValue = defaultValue?.split('\n').map(line => line.trim()).join('')

        if (param.isRestParameter()) {
          paramName = '...'+paramName;
          isOptional = false;
        }

        if (paramType === 'any') {
          paramType = 'unknown';
        }
        if (paramType === 'any[]') {
          paramType = 'unknown[]';
        }
        if (paramType === '{}') {
          paramType = 'unknown';
        }
        if (paramType === '[]' || paramType === 'never[]') {
          paramType = 'unknown[]';
        }

        return {
          name: paramName,
          type: paramType || 'unknown',
          optional: isOptional,
          defaultValue
        };
      });

      project.removeSourceFile(sourceFile);
      return mappedParams;
    } catch (error) {
      // Fallback for cases where ts-morph can't parse the function
      console.error('Error analyzing function parameters:', error);
      return [];
    }
  }
  
  /**
   * Detects the return type of a function using ts-morph
   */
  function detectReturnType(func: Function): string {
    const funcStr = func.toString();
    
    if (funcStr.includes('[native code]')) {
      return 'unknown /* native code */';
    }
    
    // Wrap the function in a variable declaration
    let sourceCode: string;
    if (funcStr.startsWith('function')) {
      sourceCode = `const myFunc = ${funcStr}`;
    } else if (funcStr.startsWith('(')) {
      sourceCode = `const myFunc = ${funcStr}`;
    } else {
      sourceCode = `const myFunc = function ${funcStr}`;
    }
    
    const sourceFile = project.createSourceFile(Math.random().toString(36).substring(2) + '.ts', sourceCode);
    const variableDeclaration = sourceFile.getVariableDeclarationOrThrow('myFunc');
    let initializer: FunctionExpression|ArrowFunction|undefined;
    initializer = variableDeclaration.getInitializerIfKind(
      ts.SyntaxKind.FunctionExpression, 
    );
    if (!initializer) {
      initializer = variableDeclaration.getInitializerIfKindOrThrow(
        ts.SyntaxKind.ArrowFunction
      );
    }

    const returnType = initializer.getReturnType();
    let returnTypeText = returnType.getText(undefined, TypeFormatFlags.None);

    project.removeSourceFile(sourceFile);

    // Always add spaces between types
    returnTypeText = returnTypeText.replace(/(?!\s)\|(?!\s)/g, ' | ');

    if (returnTypeText === 'any') {
      return 'unknown';
    }
    if (returnTypeText === 'any[]') {
      return 'unknown[]';
    }
    if (returnTypeText === '{}') {
      return 'object|unknown';
    }
    
    return returnTypeText;
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
    
    // Process all properties
    for (const key of getProperties(obj)) {
      const value = obj[key];
      const propertyPath = interfaceName + '.' + key;
      
      if (typeof value === 'function') {
        // Get parameter information using ts-morph
        const params = extractFunctionParams(value);
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
        
        // Get return type using ts-morph
        const returnType = detectReturnType(value);
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

class TestClass {
  m_stringProp: string = 'begin';

  randomFunction() {
    return this.m_stringProp;
  }
}

// Test the function
function testConvert() {
  const testObj = {
    // Simple properties
    stringProp: "hello",
    numberProp: 42,
    booleanProp: true,
    nullProp: null,
    
    // Array properties
    emptyArray: [],
    numberArray: [1, 2, 3],
    mixedArray: [1, "hello", true],
    
    // Nested objects
    nestedObj: {
      prop1: "value1",
      prop2: 123
    },
    
    // Functions
    simpleFunc: function() {
      return "hello";
    },
    
    arrowFuncWithParams: (x) => x * 2,
    
    funcWithParams: function(a, b = 10, c = "default") {
      return a + b + c;
    },
    
    arrayFunc: function test() {
      const t = () => {}, e = [];
      return t(), e;
    },
    
    complexFunc: function(a, b = () => {}, c = function() {}) {
      let result = [];
      a();
      b();
      return c(), result;
    },

    directReturn: () => 'string',

    complexTest: S=>S>0?"positive":S<0?"negative":"zero",

    testClass: new TestClass(),

    allReturnTypes: testSuites[1].testObject,
  };

  const startTime = performance.now();
  const tsInterfaces = convertToTypescript(testObj, 'TestObject', globalThis.tsProject);
  // convertToTypescript(testObj, 'TestObject', globalThis.tsProject);
  // convertToTypescript(testObj, 'TestObject', globalThis.tsProject);
  // convertToTypescript(testObj, 'TestObject', globalThis.tsProject);
  // convertToTypescript(testObj, 'TestObject', globalThis.tsProject);
  // convertToTypescript(testObj, 'TestObject', globalThis.tsProject);
  console.log(tsInterfaces);
  const endTime = performance.now();
  console.log(`Execution time: ${endTime - startTime} ms`);
}

globalThis.tsProject = new Project({
  compilerOptions: {
    target: ScriptTarget.Latest,
    emitDeclarationOnly: true,
    lib: ["lib.es5.d.ts"], // We only load in es5 here because it is very performant and has all features we need to get return types
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

// esbuild '.\scripts\ts-morph-converter copy.ts' --bundle --format=iife --platform=browser --outfile=test.js --minify-identifiers --minify-syntax
