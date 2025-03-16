import { ArrowFunction, FunctionExpression, Project, TypeFormatFlags, ts } from 'ts-morph';
import { FunctionInfo, MappedParam } from './types';

// Type format flags for consistent output
const typeFormatFlags
    = TypeFormatFlags.UseSingleQuotesForStringLiteralType
      | TypeFormatFlags.UseFullyQualifiedType;

const enableDiagnostics = false;

/**
 * Extracts parameter information from a function
 */
function extractParams(initializer: FunctionExpression | ArrowFunction): MappedParam[] {
  const parameters = initializer.getParameters();

  return parameters.map((param) => {
    let paramName = param.getName();
    let paramType = param.getType().getText(undefined, typeFormatFlags);
    let isOptional = param.isOptional();
    let defaultValue = param.getInitializer()?.getText();
    // Remove newlines and trim spaces
    defaultValue = defaultValue?.split('\n').map(line => line.trim()).join('');

    if (param.isRestParameter()) {
      paramName = `...${paramName}`;
      isOptional = false;
    }

    paramType.replaceAll('any[];', 'unknown[];');

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
      default: break;
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
    .replaceAll('never[];', 'unknown[];')
  ;

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
    default: break;
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

export function massExtractFunctionInfo(funcs: Map<string, Function>, project: Project): Map<string, FunctionInfo> {
  let sourceCode = '';
  const functionInfos = new Map<string, FunctionInfo>();
  for (const [name, func] of funcs) {
    const code = createSourceCode(name, func);
    if (code !== null) {
      sourceCode += code;
    } else {
      functionInfos.set(name, {
        params: [],
        returnType: 'unknown',
        jsDoc: ['@native'],
      });
    }
  }

  if (sourceCode === '') {
    return functionInfos;
  }

  const sourceFile = project.createSourceFile(`${Math.random().toString(36).substring(2)}.ts`, sourceCode);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (enableDiagnostics) {
    const diagnostics = project.getPreEmitDiagnostics();
    if (diagnostics.length > 0) {
      throw new Error(`❌ Error: diagnostics found: ${project.formatDiagnosticsWithColorAndContext(diagnostics)}`);
    }
  }

  const variableDeclarations = sourceFile.getVariableDeclarations();
  for (const variableDeclaration of variableDeclarations) {
    const initializer = variableDeclaration.getInitializerIfKind(ts.SyntaxKind.FunctionExpression)
      ?? variableDeclaration.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrowFunction);

    const mappedParams = extractParams(initializer);
    const returnType = extractReturnType(initializer);
    const jsDoc = generateJsDoc(mappedParams);

    functionInfos.set(variableDeclaration.getName().replace(/^_/, ''), { params: mappedParams, returnType, jsDoc });
  }
  project.removeSourceFile(sourceFile);

  return functionInfos;
}

/**
 * Creates TypeScript source code for a function to be analyzed
 * @param name The name to assign to the function
 * @param func The function to convert to source code
 * @returns The TypeScript source code or null for native functions
 */
function createSourceCode(name: string, func: Function): string | null {
  const funcStr = func.toString();

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
