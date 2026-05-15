import Long from 'long';
import { isObservableMap, isObservableSet } from 'mobx';
import { ComputedValue } from 'mobx/dist/internal';
import { ArrayType, createMapType, createSetType, GenericType, InterfaceType, IterableTypeName, PrimitiveType, Type, UnionType } from './Type';
import { defaultProtoProps, InterfaceToProcess } from './types';
import { context, formatInterfaceName } from './utils';

/**
 * Gets the TypeScript type for a value
 */
export function getType(value: unknown, path: string, storeClassName = false, addImport = true): Type {
  if (value === null) return new PrimitiveType('null');

  const type = typeof value;

  switch (type) {
    case 'undefined': return new PrimitiveType('undefined');
    case 'string': return new PrimitiveType('string');
    case 'number': return new PrimitiveType('number');
    case 'boolean': return new PrimitiveType('boolean');
    case 'bigint': return new PrimitiveType('bigint');
    case 'symbol': return new PrimitiveType('symbol');
    case 'function': return new PrimitiveType('unknown'); // Placeholder, will be used differently in generateInterface
    case 'object': return getObjectType(value as Record<string, unknown>, path, storeClassName, addImport);
  }
}

function getObjectType(value: Record<string, unknown>, path: string, storeClassName = false, addImport = true): Type {
  const isValueIterable = isIterable(value);
  const circularReference = getCircularReference(value, isValueIterable);

  if (circularReference) return circularReference;

  if (isValueIterable) {
    return getIterableType(value, path, addImport);
  }

  const primitiveObjectType = getPrimitiveObjectTypes(value, addImport);
  if (primitiveObjectType !== null) return new PrimitiveType(primitiveObjectType);

  const genericObjectType = getGenericObjectTypes(value, path, addImport);
  if (genericObjectType !== null) return genericObjectType;

  if (!path) {
    console.error('❌ Error: path is undefined?', path, value);

    return new PrimitiveType('unknown');
  }

  if (Object.keys(value).filter(key => !defaultProtoProps.has(key)).length === 0) return new PrimitiveType('object');

  // split will always have one segment so pop() is safe
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const lastPathSegment = path.split('.').pop()!;

  let interfaceName: string;
  let nameCounter: number | undefined;
  let protobufClassName: string | undefined;

  // When the key would produce InvalidName (e.g. numeric keys), try deriving name from protobuf class
  const candidateName = lastPathSegment.charAt(1) === '_'
    ? lastPathSegment
    : lastPathSegment.charAt(0).toUpperCase() + lastPathSegment.slice(1);
  const wouldBeInvalid = formatInterfaceName(candidateName) === 'InvalidName';

  if (wouldBeInvalid) {
    const protoInfo = findProtobufClassInObject(value);
    if (protoInfo) {
      const parentName = path.split('.').at(-2) ?? '';
      const singularParent = parentName.endsWith('s') ? parentName.slice(0, -1) : parentName;
      const derivedName = `${protoInfo.className}${singularParent}`;
      protobufClassName = protoInfo.className;

      // Handle name counter for the derived name
      let counter = context.interfaceNameCounter.get(derivedName) ?? 0;
      counter++;
      context.interfaceNameCounter.set(derivedName, counter);
      if (counter === 1) {
        interfaceName = derivedName;
        nameCounter = undefined;
      } else {
        interfaceName = `${derivedName}${counter}`;
        nameCounter = counter;
      }
    } else {
      [interfaceName, nameCounter] = generateInterfaceName(lastPathSegment);
    }
  } else {
    [interfaceName, nameCounter] = generateInterfaceName(lastPathSegment);
  }

  // Register this object as being processed to detect circular references
  context.processedObjectPaths.set(value, interfaceName);

  const interfaceToProcess: InterfaceToProcess = { obj: value, nameCounter, protobufClassName };
  if (storeClassName) {
    const constructorString = value.constructor.toString();
    const isClass = (/^class\s/).test(constructorString);
    const hasExtends = (/class \w+ extends/).test(constructorString);

    if (isClass) {
      interfaceToProcess.constructorString = constructorString;
      if (hasExtends) {
        interfaceToProcess.extendedConstructorString = (Object.getPrototypeOf(value.constructor) as Function).toString();
      }
    }
  }

  // Add to interfaces map
  context.interfacesToProcess.set(interfaceName, interfaceToProcess);

  return new InterfaceType(interfaceName);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCircularReference(value: Record<string, unknown>, _isValueIterable: boolean): Type | null {
  const circularPath = context.processedObjectPaths.get(value);
  if (circularPath !== undefined) {
    // Return the interface name that this circular reference points to

    // if (isValueIterable) {
    //   return new PrimitiveType(`unknown/* circular reference to ${circularPath} */`);
    // }

    return new InterfaceType(circularPath);
  }

  return null;
}

// Generate a unique interface name for nested objects
function generateInterfaceName(pathSegment: string): [string, number | undefined] {
  if (pathSegment.startsWith('m_')) {
    pathSegment = pathSegment.slice(2);
  }

  let capitalizedName: string;
  if (pathSegment.charAt(1) === '_') {
    capitalizedName = pathSegment;
  } else {
    capitalizedName = pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);
  }

  const formattedName = formatInterfaceName(capitalizedName);
  let counter = context.interfaceNameCounter.get(formattedName) ?? 0;

  counter++;
  context.interfaceNameCounter.set(formattedName, counter);
  if (counter === 1) {
    return [formattedName, undefined];
  }
  const name = `${formattedName}${counter}`;

  return [name, counter];
}

/**
 * Gets the TypeScript type for iterable values (arrays, sets, maps)
 */
function getIterableType(value: Iterable<unknown>, path: string, addImport: boolean): ArrayType | GenericType {
  // Register this iterable as being processed to detect circular references
  // context.processedObjectPaths.set(value, path.split('.').pop() ?? 'Item');
  // TODO: somehow figure out a better way to detect circular references in nested arrays

  const array = Array.from(value);

  if (Array.isArray(value)) {
    return new ArrayType(getArrayTypes(array, path));
  }

  const iterableTypeName = getIterableTypeName(value, addImport);
  const isMap = iterableTypeName === 'Map' || iterableTypeName === 'ObservableMap';

  if (isMap) {
    // Handle Map objects
    const map = value as Map<unknown, unknown>;
    const keyType = getArrayTypes(Array.from(map.keys()), path);
    const valueType = getArrayTypes(Array.from(map.values()), path);

    return createMapType(keyType, valueType, iterableTypeName);
  }

  // Handle Set objects
  const set = value as Set<unknown>;
  const valueType = getArrayTypes(Array.from(set.values()), path);

  return createSetType(valueType, iterableTypeName);
}

/**
 * Extracts and formats the types from an array of values
 * @param items Array of items to extract types from
 * @param path The path to the array property
 * @returns A string representing the type or union of types
 */
function getArrayTypes(items: unknown[], path: string): Type {
  if (items.length === 0) {
    // Handle empty collections
    return new PrimitiveType('unknown');
  }

  // Get unique types by mapping each item to its type and filtering out undefined
  const uniqueTypes: Type[] = [];
  const typeStrings = new Set<string>();

  for (const item of items) {
    const itemType = getType(item, path, true);
    const typeString = itemType.toString();
    if (!typeStrings.has(typeString)) {
      typeStrings.add(typeString);
      uniqueTypes.push(itemType);
    }
  }

  // If all items are the same type, return that type
  // Otherwise, return a union of all types
  if (uniqueTypes.length === 1) {
    return uniqueTypes[0];
  }

  return new UnionType(uniqueTypes);
}

/**
 * Gets the TypeScript type name for an object
 * And also adds the import for the object if it's not already imported
 */
function getIterableTypeName(value: unknown, addImport: boolean): IterableTypeName {
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (true) {
    case isObservableSet(value):
      if (addImport) context.addImport('mobx', 'ObservableSet');

      return 'ObservableSet';
    case value instanceof Set:
      return 'Set';
    case isObservableMap(value):
      if (addImport) context.addImport('mobx', 'ObservableMap');

      return 'ObservableMap';
    case value instanceof Map:
      return 'Map';
      /* v8 ignore next -- @preserve */
    default:
      throw new Error('Invalid iterable type');
  }
}

function isIterable(value: unknown): value is Iterable<unknown> {
  return Array.isArray(value)
    || value instanceof Set
    || isObservableSet(value)
    || value instanceof Map
    || isObservableMap(value);
}

/**
 * Checks for non-generic object types and returns their TypeScript type
 */
// eslint-disable-next-line complexity
function getPrimitiveObjectTypes(obj: Record<string, unknown>, addImport = true): string | null {
  if (Long.isLong(obj)) {
    if (addImport) context.addImport('long', 'Long', true);

    return 'Long';
  }
  if (obj instanceof Date) return 'Date';
  if (obj instanceof RegExp) return 'RegExp';
  if (obj instanceof Error) return obj.constructor.name;
  if (obj instanceof Promise) return 'Promise<unknown>';
  if (obj instanceof ArrayBuffer) return 'ArrayBuffer';
  if (obj instanceof DataView) return 'DataView';
  if (obj instanceof WeakMap) return 'WeakMap<object, unknown>';
  if (obj instanceof WeakSet) return 'WeakSet<object>';
  if (obj instanceof Int8Array) return 'Int8Array';
  if (obj instanceof Uint8Array) return 'Uint8Array';
  if (obj instanceof Uint8ClampedArray) return 'Uint8ClampedArray';
  if (obj instanceof Int16Array) return 'Int16Array';
  if (obj instanceof Uint16Array) return 'Uint16Array';
  if (obj instanceof Int32Array) return 'Int32Array';
  if (obj instanceof Uint32Array) return 'Uint32Array';
  if (obj instanceof Float32Array) return 'Float32Array';
  if (obj instanceof Float64Array) return 'Float64Array';
  if (isWindowObject(obj)) return 'Window';
  if (isHTMLElement(obj)) return obj.constructor.name;
  if (isCssStyleSheet(obj)) return 'CSSStyleSheet';
  if (isComputedValue(obj)) return getComputedValueType(obj, addImport);
  if (isMutationObserver(obj)) return 'MutationObserver';
  if (isReactRoot(obj)) {
    if (addImport) context.addImport('react-dom/client', 'Root as ReactRoot');

    return 'ReactRoot';
  }
  // @ts-expect-error App is not defined

  if (typeof window !== 'undefined' && typeof window.cm !== 'undefined' && obj === window.cm) {
    // import { ConnectionManager } from './managers/ConnectionManager';
    if (addImport) context.addImport('Global/managers/ConnectionManager', 'ConnectionManager');

    return 'ConnectionManager';
  }
  if (isSimpleProtobufMessage(obj)) {
    if (addImport) context.addImport('shared/protobuf', 'ProtobufInterface');

    return `ProtobufInterface<${obj.getClassName()}>`;
  }
  if (isTanStackQueryObserver(obj)) {
    // import { QueryObserver } from '@tanstack/query-core';
    if (addImport) context.addImport('@tanstack/query-core', 'QueryObserver');

    return 'QueryObserver';
  }

  if (isSteamID(obj)) {
    if (addImport) context.addImport('shared/steamid', 'SteamID');

    return 'SteamID';
  }

  return null;
}

function isWindowObject(obj: object): obj is Window {
  return 'window' in obj && obj.window === obj;
}

const ELEMENT_NODE = 1;

function isHTMLElement(obj: object): obj is HTMLElement {
  return 'nodeType' in obj && obj.nodeType === ELEMENT_NODE;
}

function isCssStyleSheet(obj: object): obj is CSSStyleSheet {
  return 'cssRules' in obj && 'type' in obj && obj.type === 'text/css';
}

function isComputedValue(obj: object): obj is ComputedValue<unknown> {
  return 'isMobXComputedValue' in obj && obj.isMobXComputedValue === true;
}

function getComputedValueType(obj: ComputedValue<unknown>, addImport = true): string {
  if (addImport) context.addImport('mobx/dist/internal', 'ComputedValue');

  return `ComputedValue<${typeof obj.get()}>`;
}

function isMutationObserver(obj: object): obj is MutationObserver {
  return 'disconnect' in obj && 'observe' in obj;
}

function isReactRoot(obj: object): boolean {
  return 'render' in obj && 'unmount' in obj && '_internalRoot' in obj;
}

function isSimpleProtobufMessage(obj: object): obj is { getClassName(): string; } {
  return 'toObject' in obj && 'serializeBinary' in obj && 'serializeBase64String' in obj && 'getClassName' in obj;
}

function getGenericObjectTypes(obj: Record<string, unknown>, path: string, addImport: boolean): Type | null {
  if (isSteamObservableValue(obj)) {
    const mainType = getType(obj.m_currentValue, path, undefined, addImport);

    if (addImport) {
      context.addImport('shared', 'ObservableValue');
    }

    return new GenericType('ObservableValue', [mainType]);
  }

  return null;
}

function isSteamObservableValue(obj: object): obj is { m_currentValue: unknown; } {
  return 'Set' in obj
    && 'Subscribe' in obj
    && 'm_currentValue' in obj
    && 'SubscriberCount' in obj
    && 'Value' in obj;
}

function isTanStackQueryObserver(obj: object): boolean {
  return 'createResult' in obj
    && typeof obj.createResult === 'function'
    && 'getCurrentResult' in obj
    && typeof obj.getCurrentResult === 'function'
    && 'subscribe' in obj
    && typeof obj.subscribe === 'function';
}

function isSteamID(obj: object): boolean {
  return 'm_ulSteamID' in obj && 'ConvertTo64BitString' in obj;
}

export function isProtobufClass(value: unknown): boolean {
  if (typeof value !== 'function') return false;

  if (!('toObject' in value && 'fromObject' in value && 'deserializeBinary' in value)) return false;

  const proto = value.prototype as Record<string, unknown> | null;
  if (proto === null || typeof proto !== 'object') return false;

  return 'getClassName' in proto;
}

export function getProtobufClassName(value: Function): string | null {
  const proto = value.prototype as Record<string, unknown>;
  const func = proto.getClassName as Function | undefined;
  if (typeof func !== 'function') return null;
  const match = func.toString().match(/return\s*["']([^"']+)["']/);

  return match?.[1] ?? null;
}

function findProtobufClassInObject(obj: Record<string, unknown>): { className: string; propertyKey: string; } | null {
  for (const key of Object.keys(obj)) {
    try {
      const value = obj[key];
      if (isProtobufClass(value)) {
        const className = getProtobufClassName(value as Function);
        if (className !== null && className.length > 0) {
          return { className, propertyKey: key };
        }
      }
    } catch {
      continue;
    }
  }

  return null;
}
