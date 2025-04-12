import Long from 'long';
import { isObservableMap, isObservableSet } from 'mobx';
import { ComputedValue } from 'mobx/dist/internal';
import { Root as ReactRoot } from 'react-dom/client';
import { ArrayType, createMapType, createSetType, GenericType, GenericTypeName, InterfaceType, PrimitiveType, Type, UnionType } from './Type';
import { defaultProtoProps, InterfaceToProcess } from './types';
import { context, formatInterfaceName } from './utils';

/**
 * Gets the TypeScript type for a value
 */
export function getType(value: unknown, path: string, storeClassName = false): Type {
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
    case 'object': return getObjectType(value as Record<string, unknown>, path, storeClassName);
    default:
      return new PrimitiveType('unknown');
  }
}

function getObjectType(value: Record<string, unknown>, path: string, storeClassName = false): Type {
  const isValueIterable = isIterable(value);
  const circularReference = getCircularReference(value, isValueIterable);

  if (circularReference) return circularReference;

  if (isValueIterable) {
    return getIterableType(value, path);
  }

  const primitiveObjectType = getPrimitiveObjectTypes(value);
  if (primitiveObjectType !== null) return new PrimitiveType(primitiveObjectType);

  if (!path) {
    console.error('❌ Error: path is undefined?', path, value);

    return new PrimitiveType('unknown');
  }

  if (Object.keys(value).filter(key => !defaultProtoProps.has(key)).length === 0) return new UnionType([new PrimitiveType('object'), new PrimitiveType('unknown')]);

  const lastPathSegment = path.split('.').pop() ?? '';
  let capitalizedName: string;
  if (lastPathSegment.charAt(1) === '_') {
    capitalizedName = lastPathSegment;
  } else {
    capitalizedName = lastPathSegment.charAt(0).toUpperCase() + lastPathSegment.slice(1);
  }

  const [interfaceName, nameCounter] = generateInterfaceName(capitalizedName);

  // Register this object as being processed to detect circular references
  context.processedObjectPaths.set(value, interfaceName);

  const interfaceToProcess: InterfaceToProcess = { obj: value, nameCounter };
  if (storeClassName) {
    const constructorString = value.constructor.toString();
    const isClass = (/^class\s/).test(constructorString);

    if (isClass) {
      interfaceToProcess.constructorString = constructorString;
    }
  }

  // Add to interfaces map
  context.interfacesToProcess.set(interfaceName, interfaceToProcess);

  return new InterfaceType(interfaceName);
}

function getCircularReference(value: Record<string, unknown>, isValueIterable: boolean): Type | null {
  const circularPath = context.processedObjectPaths.get(value);
  if (circularPath !== undefined) {
    // Return the interface name that this circular reference points to

    if (isValueIterable) {
      return new PrimitiveType(`unknown/* circular reference to ${circularPath} */`);
    }

    return new InterfaceType(circularPath);
  }

  return null;
}

// Generate a unique interface name for nested objects
function generateInterfaceName(baseName: string): [string, number | undefined] {
  const formattedName = formatInterfaceName(baseName);
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
function getIterableType(value: Iterable<unknown>, path: string): ArrayType | GenericType {
  // Register this iterable as being processed to detect circular references
  context.processedObjectPaths.set(value, path.split('.').pop() ?? 'Item');

  const array = Array.from(value);

  if (Array.isArray(value)) {
    return new ArrayType(getArrayTypes(array, path));
  }

  const iterableTypeName = getIterableTypeName(value);
  const isMap = iterableTypeName === 'Map' || iterableTypeName === 'ObservableMap';
  const isSet = iterableTypeName === 'Set' || iterableTypeName === 'ObservableSet';

  if (isMap) {
    // Handle Map objects
    const map = value as Map<unknown, unknown>;
    const keyType = getArrayTypes(Array.from(map.keys()), path);
    const valueType = getArrayTypes(Array.from(map.values()), path);

    return createMapType(keyType, valueType, iterableTypeName);
  } else if (isSet) {
    // Handle Set objects
    const set = value as Set<unknown>;
    const valueType = getArrayTypes(Array.from(set.values()), path);

    return createSetType(valueType, iterableTypeName);
  }

  throw new Error('Invalid iterable type');
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
function getIterableTypeName(value: unknown): GenericTypeName {
  if (isObservableSet(value)) {
    context.addImport('mobx', 'ObservableSet');

    return 'ObservableSet';
  } else if (value instanceof Set) {
    return 'Set';
  } else if (isObservableMap(value)) {
    context.addImport('mobx', 'ObservableMap');

    return 'ObservableMap';
  } else if (value instanceof Map) {
    return 'Map';
  }

  throw new Error('Invalid iterable type');
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
function getPrimitiveObjectTypes(obj: unknown, addImport = true): string | null {
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

  return null;
}

function isWindowObject(obj: unknown): obj is Window {
  if (obj === null || typeof obj !== 'object') return false;

  return 'window' in obj && obj.window === obj;
}

const ELEMENT_NODE = 1;

function isHTMLElement(obj: unknown): obj is HTMLElement {
  if (obj === null || typeof obj !== 'object') return false;

  return 'nodeType' in obj && obj.nodeType === ELEMENT_NODE;
}

function isCssStyleSheet(obj: unknown): obj is CSSStyleSheet {
  if (obj === null || typeof obj !== 'object') return false;

  return 'cssRules' in obj && 'type' in obj && obj.type === 'text/css';
}

function isComputedValue(obj: unknown): obj is ComputedValue<unknown> {
  if (obj === null || typeof obj !== 'object') return false;

  return 'isMobXComputedValue' in obj && obj.isMobXComputedValue === true;
}

function getComputedValueType(obj: ComputedValue<unknown>, addImport = true): string {
  if (addImport) context.addImport('mobx/dist/internal', 'ComputedValue');

  return `ComputedValue<${typeof obj.get()}>`;
}

function isMutationObserver(obj: unknown): obj is MutationObserver {
  if (obj === null || typeof obj !== 'object') return false;

  return 'disconnect' in obj && 'observe' in obj;
}

function isReactRoot(obj: unknown): obj is ReactRoot {
  if (obj === null || typeof obj !== 'object') return false;

  return 'render' in obj && 'unmount' in obj && '_internalRoot' in obj;
}
