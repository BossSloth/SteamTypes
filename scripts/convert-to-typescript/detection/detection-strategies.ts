import Long from 'long';
import { ComputedValue } from 'mobx/dist/internal';
import { ImportRegistry } from '../session/ImportRegistry';

/**
 * A single ordered object-type detection rule. The order of the exported list is
 * output-critical: the first matching strategy wins.
 */
export interface ObjectTypeStrategy<T = Record<string, unknown>> {
  test(obj: T): boolean;
  resolve(obj: T, addImport: boolean, imports: ImportRegistry): string;
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

function getComputedValueType(obj: ComputedValue<unknown>, addImport: boolean, imports: ImportRegistry): string {
  if (addImport) imports.add('mobx/dist/internal', 'ComputedValue');

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

function isConnectionManager(obj: object): boolean {
  // @ts-expect-error cm is not defined
  return typeof window !== 'undefined' && typeof window.cm !== 'undefined' && obj === window.cm;
}

function isCallbacks(obj: object): boolean {
  return 'ClearAllCallbacks' in obj
    && 'CountRegistered' in obj
    && 'Dispatch' in obj
    && 'Register' in obj
    && 'm_vecCallbacks' in obj;
}

/**
 * Builds a resolver that conditionally registers an import and returns a fixed type name.
 */
function importing(moduleName: string, type: string, name: string, defaultImport = false): ObjectTypeStrategy['resolve'] {
  return (_obj, addImport, imports) => {
    if (addImport) imports.add(moduleName, type, defaultImport);

    return name;
  };
}

function resolveProtobufMessage(obj: { getClassName(): string; }, addImport: boolean, imports: ImportRegistry): string {
  if (addImport) imports.add('shared/protobuf', 'ProtobufInterface');

  return `ProtobufInterface<${obj.getClassName()}>`;
}

export const objectTypeStrategies: ObjectTypeStrategy[] = [
  { test: obj => Long.isLong(obj), resolve: importing('long', 'Long', 'Long', true) },
  { test: obj => obj instanceof Date, resolve: () => 'Date' },
  { test: obj => obj instanceof RegExp, resolve: () => 'RegExp' },
  { test: obj => obj instanceof Error, resolve: obj => obj.constructor.name },
  { test: obj => obj instanceof Promise, resolve: () => 'Promise<unknown>' },
  { test: obj => obj instanceof ArrayBuffer, resolve: () => 'ArrayBuffer' },
  { test: obj => obj instanceof DataView, resolve: () => 'DataView' },
  { test: obj => obj instanceof WeakMap, resolve: () => 'WeakMap<object, unknown>' },
  { test: obj => obj instanceof WeakSet, resolve: () => 'WeakSet<object>' },
  { test: obj => obj instanceof Int8Array, resolve: () => 'Int8Array' },
  { test: obj => obj instanceof Uint8Array, resolve: () => 'Uint8Array' },
  { test: obj => obj instanceof Uint8ClampedArray, resolve: () => 'Uint8ClampedArray' },
  { test: obj => obj instanceof Int16Array, resolve: () => 'Int16Array' },
  { test: obj => obj instanceof Uint16Array, resolve: () => 'Uint16Array' },
  { test: obj => obj instanceof Int32Array, resolve: () => 'Int32Array' },
  { test: obj => obj instanceof Uint32Array, resolve: () => 'Uint32Array' },
  { test: obj => obj instanceof Float32Array, resolve: () => 'Float32Array' },
  { test: obj => obj instanceof Float64Array, resolve: () => 'Float64Array' },
  { test: obj => isWindowObject(obj), resolve: () => 'Window' },
  { test: obj => isHTMLElement(obj), resolve: obj => obj.constructor.name },
  { test: obj => isCssStyleSheet(obj), resolve: () => 'CSSStyleSheet' },
  { test: obj => isComputedValue(obj), resolve: (obj, addImport, imports) => getComputedValueType(obj as unknown as ComputedValue<unknown>, addImport, imports) },
  { test: obj => isMutationObserver(obj), resolve: () => 'MutationObserver' },
  { test: obj => isReactRoot(obj), resolve: importing('react-dom/client', 'Root as ReactRoot', 'ReactRoot') },
  { test: obj => isConnectionManager(obj), resolve: importing('Global/managers/ConnectionManager', 'ConnectionManager', 'ConnectionManager') },
  { test: obj => isSimpleProtobufMessage(obj), resolve: resolveProtobufMessage },
  { test: obj => isTanStackQueryObserver(obj), resolve: importing('@tanstack/query-core', 'QueryObserver', 'QueryObserver') },
  { test: obj => isSteamID(obj), resolve: importing('shared/steamid', 'SteamID', 'SteamID') },
  { test: obj => isCallbacks(obj), resolve: importing('shared/interfaces', 'Callbacks', 'Callbacks') },
];
