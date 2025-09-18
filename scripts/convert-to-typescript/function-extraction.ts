import { ArrowFunction, FunctionExpression, MethodDeclaration, ParameteredNode, Project, TypeFormatFlags, VariableDeclaration, ts } from 'ts-morph';
import { FunctionInfo, MappedParam } from './types';

// Type format flags for consistent output
const typeFormatFlags
  = TypeFormatFlags.UseSingleQuotesForStringLiteralType
    | TypeFormatFlags.UseFullyQualifiedType;

const enableDiagnostics = false;

const functionInfoCache = new Map<Function, FunctionInfo>();

/**
 * Extracts information from JavaScript functions and converts them to TypeScript function info
 * @param funcs Map of function names to functions
 * @param project TS project for analysis
 * @returns Map of function names to function information
 */
export function massExtractFunctionInfo(funcs: Map<string, Function>, project: Project): Map<string, FunctionInfo> {
  const sourceCodeBuilder = { code: '' };
  const functionInfos = new Map<string, FunctionInfo>();
  const functionsToProcess = new Map<string, Function>(); // Functions not found in cache
  const nameMap = new Map<string, string>(); // Map sanitized name back to original name/key

  // Process each function
  for (const [name, func] of funcs) {
    // Skip if function is in cache
    if (processCachedFunction(name, func, functionInfos)) {
      continue;
    }

    // Prepare function for analysis
    prepareFunction(name, func, sourceCodeBuilder, functionsToProcess, nameMap, functionInfos);
  }

  // If no source code was generated, return early
  if (sourceCodeBuilder.code === '') {
    return functionInfos;
  }

  // Analyze the generated source code
  analyzeSourceFile(sourceCodeBuilder.code, project, functionsToProcess, nameMap, functionInfos);

  return functionInfos;
}

/**
 * Processes cached function information
 * @param name Original function name
 * @param func Function to process
 * @param functionInfos Map to store function information
 * @returns Whether the function was found in cache
 */
function processCachedFunction(
  name: string,
  func: Function,
  functionInfos: Map<string, FunctionInfo>,
): boolean {
  const cachedFunctionInfo = functionInfoCache.get(func);
  if (cachedFunctionInfo) {
    functionInfos.set(name, cachedFunctionInfo);

    return true;
  }

  return false;
}

/**
 * Prepares function for analysis by creating source code
 * @param name Original function name
 * @param func Function to analyze
 * @param sourceCodeBuilder StringBuilder for accumulating source code
 * @param functionsToProcess Map of functions to process
 * @param nameMap Map of sanitized names to original names
 * @param functionInfos Map to store function information
 * @returns Whether the function was prepared successfully
*/
function prepareFunction(
  name: string,
  func: Function,
  sourceCodeBuilder: { code: string; },
  functionsToProcess: Map<string, Function>,
  nameMap: Map<string, string>,
  functionInfos: Map<string, FunctionInfo>,
): boolean {
  // Sanitize name
  const sanitizedName = name.replace(/[^a-zA-Z0-9_]/g, '_');
  const code = createSourceCode(sanitizedName, func);

  if (code === null) {
    processNativeFunction(sanitizedName, functionInfos);

    return false;
  }

  sourceCodeBuilder.code += code;
  functionsToProcess.set(`_${sanitizedName}`, func);
  nameMap.set(`_${sanitizedName}`, name);

  return true;
}

/**
 * Processes native functions that cannot be analyzed
 * @param sanitizedName Sanitized function name
 * @param functionInfos Map to store function information
 */
function processNativeFunction(
  sanitizedName: string,
  functionInfos: Map<string, FunctionInfo>,
): void {
  functionInfos.set(sanitizedName, {
    params: [],
    returnType: 'unknown',
    jsDoc: ['@native'],
  });
}

/**
 * Creates and analyzes a source file from generated code
 * @param sourceCode Combined source code
 * @param project TS project
 * @param functionsToProcess Map of functions to process
 * @param nameMap Map of sanitized names to original names
 * @param functionInfos Map to store function information
 */
function analyzeSourceFile(
  sourceCode: string,
  project: Project,
  functionsToProcess: Map<string, Function>,
  nameMap: Map<string, string>,
  functionInfos: Map<string, FunctionInfo>,
): void {
  const sourceFile = project.createSourceFile(`${Math.random().toString(36).substring(2)}.ts`, sourceCode);

  // Check for diagnostics if enabled
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (enableDiagnostics) {
    const diagnostics = project.getPreEmitDiagnostics();
    if (diagnostics.length > 0) {
      throw new Error(`Error: diagnostics found: ${project.formatDiagnosticsWithColorAndContext(diagnostics)}`);
    }
  }

  // Process all variable declarations
  const variableDeclarations = sourceFile.getVariableDeclarations();

  for (const variableDeclaration of variableDeclarations) {
    processVariableDeclaration(variableDeclaration, nameMap, functionsToProcess, functionInfos);
  }

  // Clean up
  project.removeSourceFile(sourceFile);
}

/**
 * Processes a single variable declaration
 * @param variableDeclaration Variable declaration to process
 * @param nameMap Map of sanitized names to original names
 * @param functionsToProcess Map of functions to process
 * @param functionInfos Map to store function information
 */
function processVariableDeclaration(
  variableDeclaration: VariableDeclaration,
  nameMap: Map<string, string>,
  functionsToProcess: Map<string, Function>,
  functionInfos: Map<string, FunctionInfo>,
): void {
  const sanitizedName = variableDeclaration.getName(); // This is the temporary name
  const originalFuncName = nameMap.get(sanitizedName);
  const originalFunc = functionsToProcess.get(sanitizedName);

  if (originalFuncName === undefined || originalFunc === undefined) {
    console.warn(`Could not find original mapping for ${sanitizedName}`);

    return;
  }

  extractAndStoreFunctionInfo(variableDeclaration, originalFunc, functionInfos);
}

export type Extractable = FunctionExpression | ArrowFunction | MethodDeclaration;

/**
 * Extracts and stores function information
 * @param variableDeclaration Variable declaration to extract from
 * @param originalFunc Original function
 * @param functionInfos Map to store function information
 */
function extractAndStoreFunctionInfo(
  variableDeclaration: VariableDeclaration,
  originalFunc: Function,
  functionInfos: Map<string, FunctionInfo>,
): void {
  const initializer = variableDeclaration.getInitializerIfKind(ts.SyntaxKind.FunctionExpression)
    ?? variableDeclaration.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrowFunction);

  const mappedParams = extractParams(initializer);
  const returnType = extractReturnType(initializer);
  const jsDoc = generateJsDoc(mappedParams);

  const functionInfo: FunctionInfo = { params: mappedParams, returnType, jsDoc };
  functionInfos.set(variableDeclaration.getName().replace(/^_/, ''), functionInfo);
  functionInfoCache.set(originalFunc, functionInfo);
}

/**
 * Extracts parameter information from a function
 */
function extractParams(initializer: ParameteredNode): MappedParam[] {
  const parameters = initializer.getParameters();

  return parameters.map((param) => {
    let paramName = param.getName();
    let paramType = param.getType().getText(undefined, typeFormatFlags);
    let isOptional = param.isOptional();
    let defaultValue = param.getInitializer()?.getText();
    // Remove newlines and trim spaces
    defaultValue = defaultValue?.replace(/\s+/g, ' ');

    if (param.isRestParameter()) {
      paramName = `...${paramName}`;
      isOptional = false;
    }

    paramType = paramType.replaceAll('any[];', 'unknown[];');

    switch (paramType) {
      case '{}':
      case 'any':
        paramType = 'unknown';
        break;
      case 'any[]':
      case '[]':
      case 'never[]':
        paramType = 'unknown[]';
        break;
      default:
        break;
    }

    return {
      name: paramName,
      type: paramType || 'unknown',
      optional: isOptional,
      defaultValue,
    };
  });
}

/**
 * Extracts return type from a function
 */
function extractReturnType(initializer: FunctionExpression | ArrowFunction): string {
  let returnType = initializer.getReturnType().getText(undefined, typeFormatFlags);

  // Always add spaces between types
  returnType = returnType.replace(/(?!\s)\|(?!\s)/g, ' | ');

  returnType = returnType
    .replaceAll('any[];', 'unknown[];')
    .replaceAll('<any>', '<unknown>')
    .replaceAll('<any, any>', '<unknown, unknown>')
    .replaceAll(': any', ': unknown')
    .replaceAll('never[];', 'unknown[];');

  switch (returnType) {
    case 'any':
      returnType = 'unknown';
      break;
    case 'any[]':
      returnType = 'unknown[]';
      break;
    case '{}':
      returnType = 'object | unknown';
      break;
    default:
      break;
  }

  return returnType;
}

/**
 * Generates JSDoc for a function
 */
function generateJsDoc(params: MappedParam[]): string[] | undefined {
  const jsDoc: string[] = [];

  // Add parameters
  for (const param of params) {
    if (param.defaultValue !== undefined) {
      jsDoc.push(`@param ${param.name} default: ${param.defaultValue}`);
    }
  }

  if (jsDoc.length === 0) {
    return undefined;
  }

  return jsDoc;
}

/**
 * Creates TypeScript source code for a function to be analyzed
 * @param name The name to assign to the function
 * @param func The function to convert to source code
 * @returns The TypeScript source code or null for native functions
 */
function createSourceCode(name: string, func: Function): string | null {
  // Use prototype call to also support proxies
  let funcStr = func.toString();

  // Make sure "param => param" functions are converted to "(param) => param"
  funcStr = funcStr.replace(/(\w+)\s*=>/g, '($1) =>');

  if (funcStr.includes('[native code]')) {
    return null;
  }

  const prefix = `const _${name} = `;

  // Case 1: Regular function or arrow function
  if (funcStr.startsWith('function') || funcStr.startsWith('(')) {
    return `${prefix}${funcStr};`;
  }

  // Case 2: Async function
  if (funcStr.startsWith('async')) {
    // Handle async function or async arrow function
    if (funcStr.startsWith('async function') || funcStr.startsWith('async (')) {
      return `${prefix}${funcStr};`;
    }

    // Handle async shorthand method
    return `${prefix}${funcStr.replace('async', 'async function')};`;
  }

  // Case 3: Method shorthand or other format
  return `${prefix}function ${funcStr};`;
}
