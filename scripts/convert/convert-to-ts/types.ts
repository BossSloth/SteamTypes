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
 * Represents the context for type conversion
 */
export type ConversionContext = {
  interfaces: Map<string, any>;
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
