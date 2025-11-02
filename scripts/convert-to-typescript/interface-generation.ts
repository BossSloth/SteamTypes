/* eslint-disable max-lines-per-function */
import { ClassDeclaration, Project } from 'ts-morph';
import { massExtractFunctionInfo } from './function-extraction';
import { getType } from './prop-type-detection';
import { InterfaceType, PrimitiveType, Type } from './Type';
import { InterfaceProperty, InterfaceToProcess, TypeScriptInterface } from './types';
import { context, formatPropertyName, getProperties } from './utils';

let order = 0;

/**
 * Creates or updates an interface definition object
 */
export function createInterfaceDefinition(
  interfaceName: string,
  interfaceToProcess: InterfaceToProcess,
  project: Project,
): void {
  let interfaceDefinition = context.interfaceDefinitions.get(interfaceName);

  if (interfaceDefinition) {
    console.error(`❌ Error: duplicate interface name?: ${interfaceName}`, interfaceToProcess.obj);

    return;
  }

  // Create a new interface definition
  interfaceDefinition = {
    name: interfaceName,
    properties: [],
    order: order++,
    nameCounter: interfaceToProcess.nameCounter,
    constructorString: interfaceToProcess.constructorString,
    extendedConstructorString: interfaceToProcess.extendedConstructorString,
  };

  // Get all properties
  let properties = getProperties(interfaceToProcess.obj);

  // Check if object is a protobuf message
  // if (properties.includes('toObject') && properties.includes('serializeBinary') && properties.includes('getClassName')) {
  //   properties = properties.filter(item => !defaultJsProtoBufProps.includes(item));
  //   interfaceDefinition.extends = 'JsPbMessage';
  //   context.addImport('google-protobuf', 'Message as JsPbMessage');
  // }

  properties = properties.sort(propertyStringSorter);

  // Process all properties
  processInterfaceProperties(interfaceToProcess.obj, properties, interfaceName, interfaceDefinition, project);

  // Get parameter information and return type using ts-morph in one big call
  // This is still the biggest performance hit because of ts-morph being slow
  const functions = context.functionsToProcess.get(interfaceName);
  if (functions) {
    const functionInfos = massExtractFunctionInfo(functions, project);
    for (const [name, functionInfo] of functionInfos) {
      const interfaceProperty: InterfaceProperty = {
        name,
        type: new PrimitiveType('function'),
        functionInfo,
      };
      interfaceDefinition.properties.push(interfaceProperty);
    }
  }

  context.interfaceDefinitions.set(interfaceName, interfaceDefinition);
}

function processInterfaceProperties(
  obj: Record<string, unknown>,
  properties: string[],
  interfaceName: string,
  interfaceDefinition: TypeScriptInterface,
  project: Project,
): void {
  for (const key of properties) {
    let value: unknown;
    try {
      value = obj[key];
    }
    catch (e) {
      console.error(`❌ Error: failed to get property ${key} from ${interfaceName}`, e);

      const interfaceProperty: InterfaceProperty = {
        name: key,
        type: new PrimitiveType('unknown'),
      };
      interfaceDefinition.properties.push(interfaceProperty);

      continue;
    }
    const propertyPath = `${interfaceName}.${key}`;
    const formattedName = formatPropertyName(key);

    if (typeof value === 'function') {
      if (isClassFunction(value)) {
        interfaceDefinition.properties.push({
          name: formattedName,
          type: new PrimitiveType('unknown'),
          jsDoc: ['This is a class function'],
        });

        continue;
      }

      if (isBoundFunction(value, obj)) {
        value = handleNativeFunction(obj, value, key, project);
      }

      if (!context.functionsToProcess.has(interfaceName)) {
        context.functionsToProcess.set(interfaceName, new Map());
      }
      context.functionsToProcess.get(interfaceName)?.set(formattedName, value as Function);
    } else {
      if (key === 'CMInterface' || key === 'm_CMInterface') {
        const interfaceProperty: InterfaceProperty = {
          name: formattedName,
          type: new InterfaceType('ConnectionManager'),
        };
        context.addImport('./managers/ConnectionManager', 'ConnectionManager');
        interfaceDefinition.properties.push(interfaceProperty);

        continue;
      }

      const type = getType(value, propertyPath);

      const jsDoc = generatePropertyJsDoc(type, key, value);

      const interfaceProperty: InterfaceProperty = {
        name: formattedName,
        type,
        jsDoc,
      };

      interfaceDefinition.properties.push(interfaceProperty);
    }
  }
}

function generatePropertyJsDoc(type: Type, propertyName: string, value: unknown): string[] | undefined {
  if (
    type instanceof PrimitiveType
    && type.kind === 'number'
    && typeof value === 'number'
    && propertyName.trim().match(/^e[A-Z]|^m_e[A-Z]/) !== null
  ) {
    // If we got here we have a property that is likely an enum value
    return ['This value is an enum', `@currentValue ${value}`];
  }

  return undefined;
}

/**
 * Generates interface definition string from TypeScriptInterface object
 */
export function generateInterfaceString(interfaceDefinition: TypeScriptInterface): string {
  let result: string;
  if (interfaceDefinition.extends !== undefined) {
    result = `export interface ${interfaceDefinition.name} extends ${interfaceDefinition.extends} {\n`;
  } else {
    result = `export interface ${interfaceDefinition.name} {\n`;
  }

  // First collect functions and non-functions separately
  const sortedProperties = interfaceDefinition.properties.sort(propertySorter);
  const [functionProperties, nonFunctionProperties] = processProperties(sortedProperties);

  // Add functions first
  if (functionProperties.length > 0) {
    result += `${functionProperties.join('\n\n')}\n`;

    // Add empty line between functions and properties if both exist
    if (nonFunctionProperties.length > 0) {
      result += '\n';
    }
  }

  // Add non-function properties
  if (nonFunctionProperties.length > 0) {
    result += `${nonFunctionProperties.join('\n\n')}\n`;
  }

  result += '}\n';

  return result;
}

/**
 * Processes properties and returns two arrays: one for functions and one for non-functions
 * @param sortedProperties - Array of sorted properties
 * @returns Tuple of two arrays: [functions, nonFunctions]
 */
function processProperties(sortedProperties: InterfaceProperty[]): [string[], string[]] {
  const functions: string[] = [];
  const nonFunctions: string[] = [];

  for (const property of sortedProperties) {
    if (property.functionInfo) {
      const paramsList = property.functionInfo.params.map((param) => {
        let paramStr = param.name;

        // Add optional marker for optional parameters
        if (param.optional) {
          paramStr += '?';
        }

        paramStr += `: ${param.type}`;

        return paramStr;
      }).join(', ');

      const optionalMarker = property.optional ?? false ? '?' : '';

      if (property.functionInfo.jsDoc) {
        functions.push(`  /**
${property.functionInfo.jsDoc.map(jsDoc => `   * ${jsDoc}`).join('\n')}
   */
  ${property.name}${optionalMarker}(${paramsList}): ${property.functionInfo.returnType};`);
      } else {
        functions.push(`  ${property.name}${optionalMarker}(${paramsList}): ${property.functionInfo.returnType};`);
      }
    } else {
      const optionalMarker = property.optional ?? false ? '?' : '';
      if (property.jsDoc) {
        nonFunctions.push(`  /**
${property.jsDoc.map(jsDoc => `   * ${jsDoc}`).join('\n')}
   */
  ${property.name}${optionalMarker}: ${property.type.toString()};`);
      } else {
        nonFunctions.push(`  ${property.name}${optionalMarker}: ${property.type.toString()};`);
      }
    }
  }

  return [functions, nonFunctions];
}

function propertySorter(a: InterfaceProperty, b: InterfaceProperty): number {
  return propertyStringSorter(a.name, b.name);
}

const singleQuote = "'".charCodeAt(0);
const space = ' '.charCodeAt(0);

export function propertyStringSorter(a: string, b: string): number {
  a = a.toLowerCase();
  b = b.toLowerCase();
  let i = 0;
  let j = 0;
  const lenA = a.length;
  const lenB = b.length;

  while (i < lenA && j < lenB) {
    let charA = a.charCodeAt(i);
    let charB = b.charCodeAt(j);

    // Skip single quotes and spaces
    while (charA === singleQuote || charA === space) charA = a.charCodeAt(++i);
    while (charB === singleQuote || charB === space) charB = b.charCodeAt(++j);

    if (charA !== charB) return charA - charB;

    i++;
    j++;
  }

  return (lenA - i) - (lenB - j);
}

const cachedClassDeclarations = new Map<string, ClassDeclaration>();
const cachedFunctionDeclarations = new Map<string, Function>();
const cachedMissingFunctions = new Set<string>();

// TODO: this is unoptimized it is better to just give the function declaration directly to processVariableDeclaration as it should also support function declarations
function handleNativeFunction(classObj: Record<string, unknown>, functionObj: Function, functionName: string, project: Project): Function {
  if (functionName.startsWith('m_fn')) {
    // Common pattern Steam uses on variable functions
    return functionObj;
  }

  const functionCacheKey = `${classObj.constructor.toString()}.${functionName}`;
  const cachedFunction = cachedFunctionDeclarations.get(functionCacheKey);
  if (cachedFunction) {
    return cachedFunction;
  }

  const classString = classObj.constructor.toString();
  let classDeclaration: ClassDeclaration | undefined = cachedClassDeclarations.get(classString);
  if (!classDeclaration) {
    const sourceFile = project.createSourceFile(`${Math.random().toString(36).substring(2)}.ts`, classString);

    classDeclaration = sourceFile.getClasses()[0];
    cachedClassDeclarations.set(classString, classDeclaration);
  }

  const functionDeclaration = classDeclaration.getMethod(functionName);
  if (!functionDeclaration) {
    const missingFunctionKey = `${classDeclaration.getName()}.${functionName}`;
    if (cachedMissingFunctions.has(missingFunctionKey)) {
      return functionObj;
    }
    cachedMissingFunctions.add(missingFunctionKey);
    console.warn(`Function ${functionName} not found in class ${classDeclaration.getName()}`);

    return functionObj;
  }

  // let functionBlock = functionDeclaration.getFirstChildByKindOrThrow(SyntaxKind.Block).getText();
  // functionBlock = functionBlock.trim().slice(1, -1);

  // We need to call eval indirectly because of this https://esbuild.github.io/content-types/#direct-eval
  // eslint-disable-next-line no-eval
  const scopedEval = eval;
  let functionText = functionDeclaration.getText();
  let functionInstance: Function;
  if (functionText.startsWith('async ')) {
    functionText = functionText.slice('async '.length);
    functionInstance = scopedEval(`(async function ${functionText})`) as Function;
  } else {
    functionInstance = scopedEval(`(function ${functionText})`) as Function;
  }

  cachedFunctionDeclarations.set(functionCacheKey, functionInstance);

  return functionInstance;
}

function isBoundFunction(functionObj: Function, classObj: Record<string, unknown>): boolean {
  return functionObj.name.startsWith('bound ') && classObj.constructor.name !== 'Object';
}

function isClassFunction(functionObj: Function): boolean {
  return 'toString' in functionObj && functionObj.toString().trim().startsWith('class ');
}
