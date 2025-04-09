import { Type } from './Type';

/**
 * Represents a mapped function parameter
 */
export interface MappedParam {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
}

/**
 * Represents the extracted function information
 */
export interface FunctionInfo {
  params: MappedParam[];
  returnType: string;
  jsDoc?: string[];
}

/**
 * Represents a property in an interface
 */
export interface InterfaceProperty {
  name: string;
  type: Type;
  functionInfo?: FunctionInfo;
  optional?: boolean;
  jsDoc?: string[];
}

/**
 * Represents a TypeScript interface
 */
export interface TypeScriptInterface {
  name: string;
  nameCounter?: number;
  properties: InterfaceProperty[];
  order: number;
  extends?: string;
}

/**
 * Represents the context for type conversion
 */
export interface ConversionContext {
  addImport(moduleName: string, type: string, defaultImport?: boolean): void;

  interfacesToProcess: Map<string, [Record<string, unknown>, number | undefined]>; // Key: interface name, Value: object interface is based on
  interfaceNameCounter: Map<string, number>;
  interfaceDefinitions: Map<string, TypeScriptInterface>; // Key: interface name, Value: interface definition
  imports: Map<string, { types: Set<string>; defaultImport?: boolean; }>; // Key: module name, Value: Set of imported types
  processedObjectPaths: Map<unknown, string>;
  mainInterfaceName: string;
  functionsToProcess: Map<string, Map<string, Function>>; // Key: interface name, Value: Map of function name to function
}

/**
 * Default prototype properties to exclude
 */
export const defaultProtoProps = new Set([
  'constructor',
  '__defineGetter__',
  '__defineSetter__',
  'hasOwnProperty',
  '__lookupGetter__',
  '__lookupSetter__',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toString',
  'valueOf',
  '__proto__',
  'toLocaleString',
]);

export const defaultJsProtoBufProps = [
  'clone',
  'cloneMessage',
  'getClassName',
  'getExtension',
  'setExtension',
  'getJsPbMessageId',
  'serializeBase64String',
  'serializeBinary',
  'syncMapFields_',
  'toObject',
  'toArray',
  'array',
  'arrayIndexOffset_',
  'convertedPrimitiveFields_',
  'messageId_',
  'pivot_',
  'wrappers_',
];
