import { Project, TypeFormatFlags, ts, FunctionExpression, ArrowFunction } from 'ts-morph';
import { FunctionInfo, MappedParam } from './types';

// Type format flags for consistent output
const typeFormatFlags = 
  TypeFormatFlags.UseSingleQuotesForStringLiteralType |
  TypeFormatFlags.UseFullyQualifiedType;

const enableDiagnostics = false;

/**
 * Extracts parameter information from a function
 */
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

/**
 * Extracts return type from a function
 */
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

export function massExtractFunctionInfo(funcs: Map<string, Function>, project: Project): Map<string, FunctionInfo> {
  let sourceCode = '';
  const functionInfos = new Map<string, FunctionInfo>();
  for (const [name, func] of funcs) {
    const code = createSourceCode(name, func);
    if (code) {
      sourceCode += code;
    } else {
      functionInfos.set(name, {
        params: [],
        returnType: 'unknown /* native code */'
      });
    }
  }

  if (sourceCode === '') {
    return functionInfos;
  }

  const sourceFile = project.createSourceFile(Math.random().toString(36).substring(2) + '.ts', sourceCode);
  if (enableDiagnostics) {
    const diagnostics = project.getPreEmitDiagnostics();
    if (diagnostics.length > 0) {
      throw new Error('❌ Error: diagnostics found: ' + project.formatDiagnosticsWithColorAndContext(diagnostics));
    }
  }

  const variableDeclarations = sourceFile.getVariableDeclarations();
  for (const variableDeclaration of variableDeclarations) {
    const initializer = variableDeclaration.getInitializerIfKind(ts.SyntaxKind.FunctionExpression)
      || variableDeclaration.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrowFunction);
    const mappedParams = extractParams(initializer);
    const returnType = extractReturnType(initializer);
    functionInfos.set(variableDeclaration.getName().replace(/^_/, ''), { params: mappedParams, returnType });
  }
  project.removeSourceFile(sourceFile);

  return functionInfos;
}

function createSourceCode(name: string, func: Function): string|null {
  const funcStr = func.toString();

  if (funcStr.includes('[native code]')) {
    return null;
  }

  if (funcStr.startsWith('function') || funcStr.startsWith('(')) {
    return `const _${name} = ${funcStr};`;
  } else if (funcStr.startsWith('async')) {
    if (funcStr.startsWith('async function') || funcStr.startsWith('async (')) {
      return `const _${name} = ${funcStr};`;
    } else {
      return `const _${name} = ${funcStr.replace('async', 'async function')};`;
    }
  } else {
    return `const _${name} = function ${funcStr};`;
  }
}
