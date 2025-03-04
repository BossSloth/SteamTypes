import Long from 'long';
import { isObservableMap, isObservableSet } from 'mobx';
import { context, deepSameStructure } from './utils';

/**
 * Gets the TypeScript type for iterable values (arrays, sets, maps)
 */
export function getIterableType(value: any, path: string): string {
  const isMap = value instanceof Map || isObservableMap(value);

  let genericTypeName: string|null = null;

  if (isObservableSet(value)) {
    genericTypeName = 'ObservableSet';
    context.imports.add("import { ObservableSet } from 'mobx';"); 
  } else if (value instanceof Set) {
    genericTypeName = 'Set';
  } else if (isObservableMap(value)) {
    genericTypeName = 'ObservableMap'; 
    context.imports.add("import { ObservableMap } from 'mobx';"); 
  } else if (value instanceof Map) {
    genericTypeName = 'Map';
  } else genericTypeName = null;
  
  // Check for circular references in arrays/iterables
  if (context.processedObjectPaths.has(value)) {
    const circularPath = context.processedObjectPaths.get(value)!;

    return `unknown/* circular reference to ${circularPath} */`;
  }
  
  // Register this iterable as being processed to detect circular references
  context.processedObjectPaths.set(value, path.split('.').pop() || 'Item');
  
  const array = Array.from(value) as unknown[];

  /**
   * Extracts and formats the types from an array of values
   * @param items Array of items to extract types from
   * @returns A string representing the type or union of types
   */
  const getArrayTypes = (items: unknown[]): string => {
    // Get unique types by mapping each item to its type and filtering out undefined
    const uniqueTypes = new Set<string>();
    
    for (const item of items) {
      const itemType = getType(item, path);
      if (itemType !== undefined) {
        uniqueTypes.add(itemType);
      }
    }

    const types = Array.from(uniqueTypes);

    // If all items are the same type, return that type
    // Otherwise, return a union of all types
    if (types.length === 1) {
      return types[0];
    } else {
      return `(${types.join(' | ')})`;
    }
  };

  let typeString: string;
  
  if (array.length === 0) {
    // Handle empty collections
    typeString = 'unknown';
    if (isMap) typeString = 'unknown, unknown';
  } else if (isMap) {
    // Handle Map objects
    const map = value as Map<unknown, unknown>;
    const keyType = getArrayTypes(Array.from(map.keys()));
    const valueType = getArrayTypes(Array.from(map.values()));
    typeString = `${keyType}, ${valueType}`;
  } else {
    // Handle arrays and Sets
    typeString = getArrayTypes(array);
  }
  
  // Format the final type string based on the collection type
  return genericTypeName ? `${genericTypeName}<${typeString}>` : `${typeString}[]`;
}

/**
 * Gets the TypeScript type for a value
 */
export function getType(value: any, path: string): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  
  const type = typeof value;
  
  switch (type) {
    case 'string': return 'string';
    case 'number': return 'number';
    case 'boolean': return 'boolean';
    case 'bigint': return 'bigint';
    case 'symbol': return 'symbol';
    case 'function': return 'unknown'; // Placeholder, will be used differently in generateInterface
    case 'object':
      if (
        Array.isArray(value)
        || value instanceof Set
        || isObservableSet(value)
        || value instanceof Map
        || isObservableMap(value)
      ) {
        return getIterableType(value, path);
      }

      if (context.processedObjectPaths.has(value)) {
        // Return the interface name that this circular reference points to
        const circularPath = context.processedObjectPaths.get(value)!;

        return circularPath;
      }
      
      const nonGenericType = checkNonGenericObjectTypes(value);
      if (nonGenericType !== null) return nonGenericType;
      
      // Generate a unique interface name for nested objects
      const generateInterfaceName = (baseName: string) => {
          let name = baseName;
          let counter = 1;
          while (context.interfaces.has(name)) {
              // If same name and structure use already generated interface
              if (deepSameStructure(context.interfaces.get(name), value)) return name;
              name = `${baseName}${++counter}`;
          }
          return name;
      };

      if (!path) {
        console.error('❌ Error: path is undefined?', path, value);
        return 'unknown';
      }

      const lastPathSegment = path.split('.').pop() || '';
      let capitalizedName: string;
      if (lastPathSegment.charAt(1) === '_') {
          capitalizedName = lastPathSegment;
      } else {
          capitalizedName = lastPathSegment.charAt(0).toUpperCase() + lastPathSegment.slice(1);
      }
      const baseName = capitalizedName;

      const sameInterface = [...context.interfaces].find(([_, i]) => deepSameStructure(i, value));

      if (sameInterface) return sameInterface[0];
      const interfaceName = generateInterfaceName(baseName);
      
      // Register this object as being processed to detect circular references
      context.processedObjectPaths.set(value, interfaceName);
      
      // Add to interfaces map
      context.interfaces.set(interfaceName, value);
      
      return interfaceName;
    default:
      return 'unknown';
  }
};

/**
 * Checks for non-generic object types and returns their TypeScript type
 */
function checkNonGenericObjectTypes(obj: any): string|null {
  if (Long.isLong(obj)) { context.imports.add("import Long from 'long';"); return 'Long'; };
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
