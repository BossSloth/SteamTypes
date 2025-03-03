import { TestFunction } from "../test-cases";

//#region Complex Object Test Functions
export const complexObjectTestFunctions: Record<string, TestFunction> = {
  // Deeply nested objects
  returnDeepNestedObject: {
    func: () => ({
      level1: {
        level2: {
          level3: {
            level4: {
              level5: {
                value: 'deep value'
              }
            }
          }
        }
      }
    }),
    expected: 'returnDeepNestedObject(): { level1: { level2: { level3: { level4: { level5: { value: string; }; }; }; }; }; };',
  },
  
  // Objects with circular references
  returnCircularObject: {
    func: () => {
      const obj: any = { name: 'circular' };
      obj.self = obj;
      return obj;
    },
    expected: 'returnCircularObject(): { name: string; };',
  },
  
  // Objects with mixed property types
  returnMixedPropertyObject: {
    func: () => ({
      string: 'value',
      number: 42,
      boolean: true,
      array: [1, 2, 3],
      object: { nested: true },
      func: () => 'result',
      nullable: null,
      undefined: undefined
    }),
    expected: 'returnMixedPropertyObject(): { string: string; number: number; boolean: boolean; array: number[]; object: { nested: boolean; }; func: () => string; nullable: null; undefined: undefined; };',
  },
  
  // Objects with computed property names
  returnComputedPropertyObject: {
    func: () => {
      const prefix = 'key';
      return {
        [prefix + '1']: 'value1',
        [prefix + '2']: 'value2',
        [`${prefix}3`]: 'value3'
      };
    },
    expected: 'returnComputedPropertyObject(): { key1: string; key2: string; key3: string; };',
  },
  
  // Objects with getters and setters
  returnObjectWithAccessors: {
    func: () => ({
      _value: 0,
      get value() { return this._value; },
      set value(v) { this._value = v; }
    }),
    expected: 'returnObjectWithAccessors(): { _value: number; value: number; };',
  },
  
  // Objects with methods
  returnObjectWithMethods: {
    func: () => ({
      data: [1, 2, 3],
      add(item) { this.data.push(item); },
      remove() { return this.data.pop(); },
      find(item) { return this.data.includes(item); }
    }),
    expected: 'returnObjectWithMethods(): { data: number[]; add(item: unknown): void; remove(): number | undefined; find(item: unknown): unknown; };',
  },
  
  // Objects with Symbol properties
  returnObjectWithSymbols: {
    func: () => {
      const symbolKey = Symbol('key');
      return {
        [symbolKey]: 'symbol value',
        regularKey: 'regular value'
      };
    },
    expected: 'returnObjectWithSymbols(): { [x: symbol]: string; regularKey: string; };',
  },
  
  // Objects with various array types
  returnObjectWithArrays: {
    func: () => ({
      empty: [],
      numbers: [1, 2, 3],
      strings: ['a', 'b', 'c'],
      mixed: [1, 'a', true],
      nested: [[1, 2], [3, 4]],
      objects: [{ id: 1 }, { id: 2 }],
      sparse: [,,,3,,,6]
    }),
    expected: 'returnObjectWithArrays(): { empty: never[]; numbers: number[]; strings: string[]; mixed: (string | number | boolean)[]; nested: number[][]; objects: { id: number; }[]; sparse: (number | undefined)[]; };',
  },
  
  // Object with function properties of various types
  returnObjectWithFunctions: {
    func: () => ({
      regular: function() { return 'regular'; },
      arrow: () => 'arrow',
      async: async () => 'async',
      generator: function*() { yield 'generator'; },
      method() { return 'method'; }
    }),
    expected: 'returnObjectWithFunctions(): { regular: () => string; arrow: () => string; async: () => Promise<string>; generator: () => Generator<string, void, unknown>; method(): string; };',
  },
  
  // Object with complex inheritance structure
  returnInheritedObject: {
    func: () => {
      const base = {
        baseMethod() { return 'base'; }
      };
      
      const derived = Object.create(base);
      derived.derivedMethod = function() { return 'derived'; };
      
      return derived;
    },
    expected: 'returnInheritedObject(): unknown;',
  },
  
  // Object with various date formats
  returnObjectWithDates: {
    func: () => ({
      current: new Date(),
      timestamp: new Date().getTime(),
      iso: new Date().toISOString(),
      utc: new Date().toUTCString()
    }),
    expected: 'returnObjectWithDates(): { current: Date; timestamp: number; iso: string; utc: string; };',
  },
  
  // Object with various regex patterns
  returnObjectWithRegex: {
    func: () => ({
      simple: /abc/,
      global: /abc/g,
      multiline: /abc/m,
      complex: /^a[bc]+d$/gi,
      test(str) { return this.complex.test(str); }
    }),
    expected: 'returnObjectWithRegex(): { simple: RegExp; global: RegExp; multiline: RegExp; complex: RegExp; test(str: unknown): boolean; };',
  },
  
  // Object with various error types
  returnObjectWithErrors: {
    func: () => ({
      error: new Error('General error'),
      typeError: new TypeError('Type error'),
      syntaxError: new SyntaxError('Syntax error'),
      referenceError: new ReferenceError('Reference error')
    }),
    expected: 'returnObjectWithErrors(): { error: Error; typeError: TypeError; syntaxError: SyntaxError; referenceError: ReferenceError; };',
  },
};
//#endregion