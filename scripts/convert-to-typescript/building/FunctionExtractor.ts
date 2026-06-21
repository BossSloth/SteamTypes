import { ArrowFunction, FunctionExpression, MethodDeclaration, ParameteredNode, Project, TypeFormatFlags, VariableDeclaration, ts } from 'ts-morph';
import { FunctionInfo, MappedParam } from '../types';

// Type format flags for consistent output
const typeFormatFlags
  = TypeFormatFlags.UseSingleQuotesForStringLiteralType
    | TypeFormatFlags.UseFullyQualifiedType;

const enableDiagnostics = false;

type FunctionInfoCache = Map<Function, FunctionInfo>;

/**
 * Extracts TypeScript function signatures from JavaScript functions using ts-morph.
 * Holds a per-session cache so identical functions are only analysed once.
 */
export class FunctionExtractor {
  private readonly cache: FunctionInfoCache = new Map();

  private readonly project: Project;
  private readonly sourceCodeBuilder = { code: '' };
  private readonly functionInfos = new Map<string, FunctionInfo>();

  constructor(project: Project) {
    this.project = project;
  }

  /**
   * Extracts information from JavaScript functions and converts them to TypeScript function info
   * @param funcs Map of function names to functions
   * @param project TS project for analysis
   * @returns Map of function names to function information
   */
  public extract(funcs: Map<string, Function>): Map<string, FunctionInfo> {
    this.sourceCodeBuilder.code = '';
    this.functionInfos.clear();
    const functionsToProcess = new Map<string, Function>(); // Functions not found in cache
    const nameMap = new Map<string, string>(); // Map sanitized name back to original name/key

    // Process each function
    for (const [name, func] of funcs) {
      // Skip if function is in cache
      const cachedFunction = this.getCachedFunction(func);
      if (cachedFunction !== undefined) {
        this.functionInfos.set(name, cachedFunction);
        continue;
      }

      // Prepare function for analysis
      const sanitizedName = name.replace(/[^a-zA-Z0-9_]/g, '_');
      const code = createSourceCode(sanitizedName, func);

      if (code === null) {
        // Likely a native function that cannot be analyzed
        this.functionInfos.set(sanitizedName, {
          params: [],
          returnType: 'unknown',
          jsDoc: ['@native'],
        });

        continue;
      }

      this.sourceCodeBuilder.code += code;
      functionsToProcess.set(`_${sanitizedName}`, func);
      nameMap.set(`_${sanitizedName}`, name);
    }

    // If no source code was generated, return early
    if (this.sourceCodeBuilder.code === '') {
      return this.functionInfos;
    }

    // Analyze the generated source code
    this.analyzeSourceFile(functionsToProcess, nameMap);

    return this.functionInfos;
  }

  private getCachedFunction(func: Function): FunctionInfo | undefined {
    return this.cache.get(func);
  }

  /**
   * Creates and analyzes a source file from generated code
   */
  private analyzeSourceFile(
    functionsToProcess: Map<string, Function>,
    nameMap: Map<string, string>,
  ): void {
    const sourceFile = this.project.createSourceFile('functionAnalysisSourceFile.ts', this.sourceCodeBuilder.code);

    try {
      // Check for diagnostics if enabled
      /* v8 ignore next -- @preserve */
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (enableDiagnostics) {
        const diagnostics = this.project.getPreEmitDiagnostics();
        if (diagnostics.length > 0) {
          throw new Error(`Error: diagnostics found: ${this.project.formatDiagnosticsWithColorAndContext(diagnostics)}`);
        }
      }

      // Process all variable declarations
      const variableDeclarations = sourceFile.getVariableDeclarations();

      for (const variableDeclaration of variableDeclarations) {
        this.processVariableDeclaration(variableDeclaration, nameMap, functionsToProcess);
      }
    } finally {
      // Clean up
      this.project.removeSourceFile(sourceFile);
    }
  }

  /**
   * Processes a single variable declaration
   */
  private processVariableDeclaration(
    variableDeclaration: VariableDeclaration,
    nameMap: Map<string, string>,
    functionsToProcess: Map<string, Function>,
  ): void {
    const sanitizedName = variableDeclaration.getName(); // This is the temporary name
    const originalFuncName = nameMap.get(sanitizedName);
    const originalFunc = functionsToProcess.get(sanitizedName);

    /* v8 ignore next -- @preserve */
    if (originalFuncName === undefined || originalFunc === undefined) {
      console.warn(`Could not find original mapping for ${sanitizedName}`);

      return;
    }

    this.extractAndStoreFunctionInfo(variableDeclaration, originalFunc);
  }

  /**
   * Extracts and stores function information
   */
  private extractAndStoreFunctionInfo(
    variableDeclaration: VariableDeclaration,
    originalFunc: Function,
  ): void {
    const initializer = variableDeclaration.getInitializerIfKind(ts.SyntaxKind.FunctionExpression)
      ?? variableDeclaration.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrowFunction);

    const mappedParams = extractParams(initializer);
    const returnType = extractReturnType(initializer);
    const jsDoc = generateJsDoc(mappedParams);

    const functionInfo: FunctionInfo = { params: mappedParams, returnType, jsDoc };
    this.functionInfos.set(variableDeclaration.getName().replace(/^_/, ''), functionInfo);
    this.cache.set(originalFunc, functionInfo);
  }
}

/**
 * Extracts parameter information from a function
 */
function extractParams(initializer: ParameteredNode): MappedParam[] {
  const parameters = initializer.getParameters();

  let foundOptional = false;

  return parameters.map((param) => {
    let paramName = param.getName();
    let paramType = param.getType().getText(undefined, typeFormatFlags);
    let isOptional = param.isOptional() || foundOptional;
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

    if (isOptional) {
      foundOptional = true;
    }

    return {
      name: paramName,
      type: paramType,
      optional: isOptional,
      defaultValue,
    };
  });
}

export type Extractable = FunctionExpression | ArrowFunction | MethodDeclaration;

/**
 * Extracts return type from a function
 */
function extractReturnType(initializer: Extractable): string {
  if (initializer.getReturnType().isClass()) {
    return 'unknown';
  }

  let returnType = initializer.getReturnType().getText(undefined, typeFormatFlags);

  // Always add spaces between types
  returnType = returnType.replace(/(?!\s)\|(?!\s)/g, ' | ');

  returnType = returnType
    .replaceAll('any[];', 'unknown[];')
    .replaceAll('<any>', '<unknown>')
    .replaceAll('<any, any>', '<unknown, unknown>')
    .replaceAll(': any', ': unknown')
    .replaceAll('never[];', 'unknown[];')
    .replaceAll('=> any', '=> unknown')
    .replaceAll('Generator<any', 'Generator<unknown');

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
