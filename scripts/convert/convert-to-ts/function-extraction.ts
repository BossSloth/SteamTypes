import { Project, TypeFormatFlags, ts, FunctionExpression, ArrowFunction } from 'ts-morph';
import { FunctionInfo, MappedParam } from './types';

// Type format flags for consistent output
const typeFormatFlags = 
  TypeFormatFlags.UseSingleQuotesForStringLiteralType |
  TypeFormatFlags.UseFullyQualifiedType;

/**
 * Extracts parameter information from a function
 */
export function extractParams(initializer: FunctionExpression|ArrowFunction): MappedParam[] {
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
export function extractReturnType(initializer: FunctionExpression|ArrowFunction): string {
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

/**
 * Extracts both parameter information and return type from a function using ts-morph
 */
export function extractFunctionInfo(func: Function, project: Project): FunctionInfo { 
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
