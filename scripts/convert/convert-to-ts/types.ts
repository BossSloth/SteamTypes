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
  properties: InterfaceProperty[];
};

/**
 * Represents the context for type conversion
 */
export type ConversionContext = {
  interfacesToProcess: Map<string, any>; // Key: interface name, Value: object interface is based on
  interfaceDefinitions: Map<string, TypeScriptInterface>; // Key: interface name, Value: interface definition
  imports: Set<string>;
  processedObjectPaths: Map<any, string>;
  mainInterfaceName: string;
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
