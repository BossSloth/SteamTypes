import { isObservableMap, isObservableSet } from 'mobx';
import { ConversionSession } from '../session/ConversionSession';
import { ArrayType, createMapType, createSetType, GenericType, InterfaceType, IterableTypeName, PrimitiveType, Type, UnionType } from '../Type';
import { defaultProtoProps, InterfaceToProcess } from '../types';
import { objectTypeStrategies } from './detection-strategies';

/**
 * Detects the TypeScript type for a runtime value, recursing into objects and
 * iterables, registering imports, and queueing nested interfaces for processing.
 */
export class TypeDetector {
  private readonly session: ConversionSession;

  constructor(session: ConversionSession) {
    this.session = session;
  }

  /**
   * Gets the TypeScript type for a value
   */
  public detect(value: unknown, path: string, storeClassName = false, addImport = true): Type {
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
      case 'object': return this.getObjectType(value as Record<string, unknown>, path, storeClassName, addImport);
    }
  }

  private getObjectType(value: Record<string, unknown>, path: string, storeClassName: boolean, addImport: boolean): Type {
    const circularPath = this.session.circular.get(value);
    if (circularPath !== undefined) {
      return new InterfaceType(circularPath);
    }

    if (isIterable(value)) {
      return this.getIterableType(value, path, addImport);
    }

    const primitiveObjectType = this.detectPrimitiveObject(value, addImport);
    if (primitiveObjectType !== null) return new PrimitiveType(primitiveObjectType);

    const genericObjectType = this.getGenericObjectType(value, path, addImport);
    if (genericObjectType !== null) return genericObjectType;

    if (!path) {
      console.error('❌ Error: path is undefined?', path, value);

      return new PrimitiveType('unknown');
    }

    if (Object.keys(value).filter(key => !defaultProtoProps.has(key)).length === 0) return new PrimitiveType('object');

    const { interfaceName, nameCounter, protobufClassName } = this.session.names.allocateForObject(value, path);

    // Register this object as being processed to detect circular references
    this.session.circular.register(value, interfaceName);

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
    this.session.interfaceRepository.queue.set(interfaceName, interfaceToProcess);

    return new InterfaceType(interfaceName);
  }

  private detectPrimitiveObject(value: Record<string, unknown>, addImport: boolean): string | null {
    const validStrategies = objectTypeStrategies.filter(strategy => strategy.test(value));
    if (validStrategies.length === 0) return null;
    /* v8 ignore next -- @preserve */
    if (validStrategies.length > 1) throw new Error('Multiple object type strategies matched, one expected');

    const strategy = validStrategies[0];

    return strategy.resolve(value, addImport, this.session.imports);
  }

  private getGenericObjectType(obj: Record<string, unknown>, path: string, addImport: boolean): Type | null {
    if (isSteamObservableValue(obj)) {
      const mainType = this.detect(obj.m_currentValue, path, false, addImport);

      if (addImport) {
        this.session.imports.add('shared', 'ObservableValue');
      }

      return new GenericType('ObservableValue', [mainType]);
    }

    return null;
  }

  /**
   * Gets the TypeScript type for iterable values (arrays, sets, maps)
   */
  private getIterableType(value: Iterable<unknown>, path: string, addImport: boolean): ArrayType | GenericType {
    if (Array.isArray(value)) {
      const array = Array.from(value);

      return new ArrayType(this.getArrayTypes(array, path));
    }

    const iterableTypeName = this.getIterableTypeName(value, addImport);
    const isMap = iterableTypeName === 'Map' || iterableTypeName === 'ObservableMap';

    if (isMap) {
      // Handle Map objects
      const map = value as Map<unknown, unknown>;
      const keyType = this.getArrayTypes(Array.from(map.keys()), path);
      const valueType = this.getArrayTypes(Array.from(map.values()), path);

      return createMapType(keyType, valueType, iterableTypeName);
    }

    // Handle Set objects
    const set = value as Set<unknown>;
    const valueType = this.getArrayTypes(Array.from(set.values()), path);

    return createSetType(valueType, iterableTypeName);
  }

  /**
   * Extracts and formats the types from an array of values
   */
  private getArrayTypes(items: unknown[], path: string): Type {
    if (items.length === 0) {
      // Handle empty collections
      return new PrimitiveType('unknown');
    }

    // Get unique types by mapping each item to its type and filtering out undefined
    const uniqueTypes: Type[] = [];
    const typeStrings = new Set<string>();

    for (const item of items) {
      const itemType = this.detect(item, path, true);
      const typeString = itemType.toString();
      if (!typeStrings.has(typeString)) {
        typeStrings.add(typeString);
        uniqueTypes.push(itemType);
      }
    }

    if (uniqueTypes.length === 1) {
      return uniqueTypes[0];
    }

    return new UnionType(uniqueTypes);
  }

  /**
   * Gets the TypeScript type name for an iterable object
   * And also adds the import for the object if it's not already imported
   */
  private getIterableTypeName(value: unknown, addImport: boolean): IterableTypeName {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (true) {
      case isObservableSet(value):
        if (addImport) this.session.imports.add('mobx', 'ObservableSet');

        return 'ObservableSet';
      case value instanceof Set:
        return 'Set';
      case isObservableMap(value):
        if (addImport) this.session.imports.add('mobx', 'ObservableMap');

        return 'ObservableMap';
      case value instanceof Map:
        return 'Map';
        /* v8 ignore next -- @preserve */
      default:
        throw new Error('Invalid iterable type');
    }
  }
}

function isIterable(value: unknown): value is Iterable<unknown> {
  return Array.isArray(value)
    || value instanceof Set
    || isObservableSet(value)
    || value instanceof Map
    || isObservableMap(value);
}

function isSteamObservableValue(obj: object): obj is { m_currentValue: unknown; } {
  return 'Set' in obj
    && 'Subscribe' in obj
    && 'm_currentValue' in obj
    && 'SubscriberCount' in obj
    && 'Value' in obj;
}
