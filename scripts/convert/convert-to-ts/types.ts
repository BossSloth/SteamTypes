import { Type } from "./Type";

/**
 * Represents a mapped function parameter
 */
export type MappedParam = {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
};

/**
 * Represents the extracted function information
 */
export type FunctionInfo = {
  params: MappedParam[];
  returnType: string;
  jsDoc?: string[];
};

/**
 * Represents a property in an interface
 */
export type InterfaceProperty = {
  name: string;
  type: Type;
  functionInfo?: FunctionInfo;
  optional?: boolean;
};

/**
 * Represents a TypeScript interface
 */
export type TypeScriptInterface = {
  name: string;
  nameCounter?: number;
  properties: InterfaceProperty[];
  order: number;
  extends?: string;
};

/**
 * Represents the context for type conversion
 */
export type ConversionContext = {
  interfacesToProcess: Map<string, [any, number|undefined]>; // Key: interface name, Value: object interface is based on
  interfaceDefinitions: Map<string, TypeScriptInterface>; // Key: interface name, Value: interface definition
  imports: Set<string>;
  processedObjectPaths: Map<any, string>;
  mainInterfaceName: string;
  functionsToProcess: Map<string, Map<string, Function>>; // Key: interface name, Value: Map of function name to function
};

/**
 * Default prototype properties to exclude
 */
export const defaultProtoProps = [
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

export const defaultJsProtoBufProps = [
  "clone",
  "cloneMessage",
  "getClassName",
  "getExtension",
  "setExtension",
  "getJsPbMessageId",
  "serializeBase64String",
  "serializeBinary",
  "syncMapFields_",
  "toObject",
  "toArray",
  "array",
  "arrayIndexOffset_",
  "convertedPrimitiveFields_",
  "messageId_",
  "pivot_",
  "wrappers_"
];