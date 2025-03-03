import Long from 'long';

//#region Date and Time Property Test Cases
export const datePropertyTests = {
  // Date object
  dateObject: new Date(),
  
  // Date timestamp
  dateTimestamp: new Date().getTime(),
  
  // Date string formats
  isoDateString: new Date().toISOString(),
  
  utcDateString: new Date().toUTCString()
};
//#endregion

//#region Regular Expression Property Test Cases
export const regexPropertyTests = {
  // Basic regex
  simpleRegex: /test/,
  
  // Regex with flags
  regexWithFlags: /test/gi,
  
  // Complex regex
  complexRegex: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
};
//#endregion

//#region Error Property Test Cases
export const errorPropertyTests = {
  // Basic Error
  basicError: new Error('Basic error'),
  
  // Type Error
  typeError: new TypeError('Type error'),
  
  // Syntax Error
  syntaxError: new SyntaxError('Syntax error'),
  
  // Reference Error
  referenceError: new ReferenceError('Reference error')
};
//#endregion

const weakMap = new WeakMap();
weakMap.set({ab: 5}, 5);
weakMap.set({cd: 6}, 6);

const weakSet = new WeakSet();
weakSet.add({ab: 5});
weakSet.add({cd: 6});

//#region Map and Set Property Test Cases
export const mapSetPropertyTests = {
  maps: {
    // Empty Map
    emptyMap: new Map(),
    
    // String key Map
    stringKeyMap: new Map([['key1', 'value1'], ['key2', 'value2']]),
  
    // String key number value Map
    stringKeyNumberValueMap: new Map([['key1', 1], ['key2', 2]]),
  
    // @ts-ignore
    mixedKeyMap: new Map([['key1', 'value1'], ['key2', 'value2'], [1, 'one']]),
    
    // Number key Map
    numberKeyMap: new Map([[1, 'one'], [2, 'two']]),
  
    objectKeyMap: new Map([[{ key: 'value' }, 'object']]),
  
    objectMap: new Map([['key1', { foo: 'value' }], ['key2', { foo: 'value' }]]),
  
    mixedObjectMap: new Map([['key1', { mixedFoo: 'value' }], ['key2', { mixedBar: 'value' }]]),
  
    nestedMap: new Map([['key1', new Map([['nestedKey1', 'nestedValue1'], ['nestedKey2', 'nestedValue2']])]]),
  
    weakMap: weakMap,
  },
  sets: {
    // Empty Set
    emptySet: new Set(),
    
    // String Set
    stringSet: new Set(['a', 'b', 'c']),
    
    // Number Set
    numberSet: new Set([1, 2, 3]),
    
    // Mixed Set
    mixedSet: new Set([1, 'two', true, null]),
  
    objectSet: new Set([{ key: 'value' }]),
  
    mixedObjectSet: new Set([{'mixedSFoo': 'value'}, {'mixedSBar': 'value'}]),
  
    nestedSet: new Set([new Set([1, 2, 3])]),
  
    weakSet: weakSet
  }
};
//#endregion

//#region Typed Array Property Test Cases
export const typedArrayPropertyTests = {
  // Int8Array
  int8Array: new Int8Array([1, 2, 3]),
  
  // Uint8Array
  uint8Array: new Uint8Array([1, 2, 3]),
  
  // Uint8ClampedArray
  uint8ClampedArray: new Uint8ClampedArray([1, 2, 3]),
  
  // Int16Array
  int16Array: new Int16Array([1, 2, 3]),
  
  // Uint16Array
  uint16Array: new Uint16Array([1, 2, 3]),
  
  // Int32Array
  int32Array: new Int32Array([1, 2, 3]),
  
  // Uint32Array
  uint32Array: new Uint32Array([1, 2, 3]),
  
  // Float32Array
  float32Array: new Float32Array([1.1, 2.2, 3.3]),
  
  // Float64Array
  float64Array: new Float64Array([1.1, 2.2, 3.3]),
  
  // ArrayBuffer
  arrayBuffer: new ArrayBuffer(8),
  
  // DataView
  dataView: new DataView(new ArrayBuffer(8))
};
//#endregion

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
}

//#region Special Type Property Test Cases
export const specialTypePropertyTests = {
  // Long integer
  longInteger: Long.fromString('9223372036854775807'),
  
  // Promise
  promise: Promise.resolve(42),
  
  // Function
  function: function() { return 42; },
  
  // Arrow function
  arrowFunction: () => 'string',
  
  // Generator function
  generatorFunction: function* generator() { yield 1; yield 2; },
  
  // Async function
  asyncFunction: async function() { return 'async'; },
  
  // Class
  class: class TestClass { method() { return 'test'; } },
  
  // Class instance
  classInstance: new (class { property = 'value'; })(),

  advancedClassInstance: new AdvancedClass() // TODO: make this actually know its class types
};
//#endregion

// Export all advanced property test cases
export const advancedPropertyTests = {
  datePropertyTests,
  regexPropertyTests,
  errorPropertyTests,
  mapSetPropertyTests,
  typedArrayPropertyTests,
  specialTypePropertyTests
};
