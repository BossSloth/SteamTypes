import Long from 'long';
import { isObservableMap, isObservableSet } from 'mobx';
import { ArrayType, GenericType, GenericTypeName, InterfaceType, PrimitiveType, Type, UnionType, createMapType, createSetType } from './Type';
import { context, formatInterfaceName } from './utils';

/**
 * Gets the TypeScript type for a value
 */
export function getType(value: unknown, path: string): Type {
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
    case 'object': return getObjectType(value as Record<string, unknown>, path);
    default:
      return new PrimitiveType('unknown');
  }
}

function getObjectType(value: Record<string, unknown>, path: string): Type {
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

  // Add to interfaces map
  context.interfacesToProcess.set(interfaceName, [value, nameCounter]);

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
  let name = formattedName;
  let counter = 1;
  while (context.interfacesToProcess.has(name)) {
    name = `${formattedName}${++counter}`;
  }

  return [name, counter === 1 ? undefined : counter];
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
    const itemType = getType(item, path);
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
function getPrimitiveObjectTypes(obj: unknown): string | null {
  if (Long.isLong(obj)) {
    context.addImport('long', 'Long', true);

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

  return null;
}
