import Long from 'long';
import { ObservableMap, ObservableSet } from 'mobx';

// #region Date and Time Property Test Cases
export const datePropertyTests = {
  dateObject: new Date(),

  dateTimestamp: new Date().getTime(),

  isoDateString: new Date().toISOString(),

  utcDateString: new Date().toUTCString(),
};
// #endregion

// #region Regular Expression Property Test Cases
export const regexPropertyTests = {
  simpleRegex: /test/,

  regexWithFlags: /test/gi,

  complexRegex: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
};
// #endregion

// #region Error Property Test Cases
export const errorPropertyTests = {
  basicError: new Error('Basic error'),

  typeError: new TypeError('Type error'),

  syntaxError: new SyntaxError('Syntax error'),

  referenceError: new ReferenceError('Reference error'),
};
// #endregion

const weakMap = new WeakMap();
weakMap.set({ ab: 5 }, 5);
weakMap.set({ cd: 6 }, 6);

const weakSet = new WeakSet();
weakSet.add({ ab: 5 });
weakSet.add({ cd: 6 });

// #region Map and Set Property Test Cases
export const mapSetPropertyTests = {
  maps: {
    emptyMap: new Map(),

    stringKeyMap: new Map([['key1', 'value1'], ['key2', 'value2']]),

    stringKeyNumberValueMap: new Map([['key1', 1], ['key2', 2]]),

    // @ts-expect-error mixed map
    mixedKeyMap: new Map([['key1', 'value1'], ['key2', 'value2'], [1, 'one']]),

    numberKeyMap: new Map([[1, 'one'], [2, 'two']]),

    objectKeyMap: new Map([[{ key: 'value' }, 'object']]),

    objectMap: new Map([['key1', { foo: 'value' }], ['key2', { foo: 'value' }]]),

    mixedObjectMap: new Map([['key1', { mixedFoo: 'value' }], ['key2', { mixedBar: 'value' }]]),

    nestedMap: new Map([['key1', new Map([['nestedKey1', 'nestedValue1'], ['nestedKey2', 'nestedValue2']])]]),

    weakMap: weakMap,

    observableMap: new ObservableMap([['key1', 'value1'], ['key2', 'value2']]),

    numberObservableMap: new ObservableMap([[1, 'one'], [2, 'two']]),
  },
  sets: {
    emptySet: new Set(),

    stringSet: new Set(['a', 'b', 'c']),

    numberSet: new Set([1, 2, 3]),

    mixedSet: new Set([1, 'two', true, null]),

    objectSet: new Set([{ key: 'value' }]),

    mixedObjectSet: new Set([{ mixedSFoo: 'value' }, { mixedSBar: 'value' }]),

    nestedSet: new Set([new Set([1, 2, 3])]),

    weakSet: weakSet,

    observableSet: new ObservableSet(['a', 'b', 'c']),

    numberObservableSet: new ObservableSet([1, 2, 3]),
  },
};
// #endregion

// #region Typed Array Property Test Cases
export const typedArrayPropertyTests = {
  int8Array: new Int8Array([1, 2, 3]),

  uint8Array: new Uint8Array([1, 2, 3]),

  uint8ClampedArray: new Uint8ClampedArray([1, 2, 3]),

  int16Array: new Int16Array([1, 2, 3]),

  uint16Array: new Uint16Array([1, 2, 3]),

  int32Array: new Int32Array([1, 2, 3]),

  uint32Array: new Uint32Array([1, 2, 3]),

  float32Array: new Float32Array([1.1, 2.2, 3.3]),

  float64Array: new Float64Array([1.1, 2.2, 3.3]),

  arrayBuffer: new ArrayBuffer(8),

  dataView: new DataView(new ArrayBuffer(8)),
};
// #endregion

class AdvancedClass {
  property = 'value';
  method() {
    return 15;
  }

  otherMethod() {
    return this.property;
  }

  callsOwnMethod() {
    return this.method();
  }

  async asyncMethod() {
    return 15;
  }
}

// #region Special Type Property Test Cases
export const specialTypePropertyTests = {
  longInteger: Long.fromString('9223372036854775807'),

  promise: Promise.resolve(42),

  function: function () { return 42; },

  arrowFunction: () => 'string',

  generatorFunction: function* generator() {
    yield 1;
    yield 2;
  },

  asyncFunction: async function () { return 'async'; },

  class: class TestClass { method() { return 'test'; } },

  classInstance: new (class { property = 'value'; })(),

  advancedClassInstance: new AdvancedClass(), // TODO: make this actually know its class types
};
// #endregion

// Export all advanced property test cases
export const advancedPropertyTests = {
  datePropertyTests,
  regexPropertyTests,
  errorPropertyTests,
  mapSetPropertyTests,
  typedArrayPropertyTests,
  specialTypePropertyTests,
};
