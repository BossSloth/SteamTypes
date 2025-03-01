export interface TestFunction {
  func: Function;
  expected: string;
}

export interface TestSuite {
  name: string;
  interfaceName: string;
  testObject: Record<string, any>;
  expectedOutput?: string;
}

//#region Test Functions
// Define test functions with expected return types

//#region Basic Return Types
export const testFunctions: Record<string, TestFunction> = {
  emptyFunction: {
    func: () => {},
    expected: 'emptyFunction(): unknown;',
  },
  returnNull: {
    func: () => {
      return null;
    },
    expected: 'returnNull(): null;',
  },
  voidReturn: {
    func: () => {
      return;
    },
    expected: 'voidReturn(): void;',
  },
  emptyReturn: {
    func: () => {},
    expected: 'emptyReturn(): unknown;',
  },
//#endregion

//#region Direct Return Types
  directReturnNull: {
    func: () => null,
    expected: 'directReturnNull(): null;',
  },
  directReturnTrue: {
    func: () => true,
    expected: 'directReturnTrue(): true;',
  },
  directReturnFalse: {
    func: () => false,
    expected: 'directReturnFalse(): false;',
  },
  directReturnNumber: {
    func: () => 42,
    expected: 'directReturnNumber(): number;',
  },
  directReturnString: {
    func: () => 'hello',
    expected: 'directReturnString(): string;',
  },
  directReturnArray: {
    func: () => [1, 2, 3],
    expected: 'directReturnArray(): unknown[];',
  },
  directReturnObject: {
    func: () => ({ a: 1, b: 2 }),
    expected: 'directReturnObject(): object|unknown;',
  },
  directReturnWithParens: {
    func: () => ('hello'),
    expected: 'directReturnWithParens(): string;',
  },
  directReturnTemplate: {
    func: () => `template string`,
    expected: 'directReturnTemplate(): string;',
  },
  directReturnEmptyArray: {
    func: () => [],
    expected: 'directReturnEmptyArray(): unknown[];',
  },
  directReturnEmptyObject: {
    func: () => ({}),
    expected: 'directReturnEmptyObject(): object|unknown;',
  },
  directReturnExpression: {
    func: (x) => x + 1,
    expected: 'directReturnExpression(x: unknown): unknown;',
  },
//#endregion

//#region Regular Return Types
  returnTrue: {
    func: () => {
      return true;
    },
    expected: 'returnTrue(): true;',
  },
  returnFalse: {
    func: () => {
      return false;
    },
    expected: 'returnFalse(): false;',
  },
  returnConditionalBoolean: {
    func: () => {
      if (Math.random() > 0.5) {
        return true;
      }
      return false;
    },
    expected: 'returnConditionalBoolean(): boolean;',
  },
  returnNumber: {
    func: () => {
      return 42;
    },
    expected: 'returnNumber(): number;',
  },
  returnString: {
    func: () => {
      return 'hello';
    },
    expected: 'returnString(): string;',
  },
  returnEmptyArray: {
    func: () => {
      return [];
    },
    expected: 'returnEmptyArray(): unknown[];',
  },
  returnArrayOfNumbers: {
    func: () => {
      return [1, 2, 3];
    },
    expected: 'returnArrayOfNumbers(): unknown[];',
  },
  returnEmptyObject: {
    func: () => {
      return {};
    },
    expected: 'returnEmptyObject(): object|unknown;',
  },
  returnComplexObject: {
    func: () => {
      return { a: 1, b: 'string' };
    },
    expected: 'returnComplexObject(): object|unknown;',
  },
//#endregion

//#region Parameters
  returnParameter: {
    func: (param) => {
      return param;
    },
    expected: 'returnParameter(param: unknown): unknown;',
  },
  multipleParameters: {
    func: (a, b, c) => {
      return a + b + c;
    },
    expected: 'multipleParameters(a: unknown, b: unknown, c: unknown): unknown;',
  },
  paramWithReturn: {
    func: (myParam) => {
      return null;
    },
    expected: 'paramWithReturn(myParam: unknown): null;',
  },
  spreadParameters: {
    func: (first, ...rest) => {
      return [...rest, first];
    },
    expected: 'spreadParameters(first: unknown, ...rest: unknown[]): unknown[];',
  },
  defaultParameters: {
    func: (a, b = 10, c = 'default') => {
      return a + b + c;
    },
    expected: 'defaultParameters(a: unknown, b?: unknown /* default = 10 */, c?: unknown /* default = "default" */): unknown;',
  },
  complexDefaultParameters: {
    func: (a = {}, b = [], c = () => {}) => {
      return typeof c;
    },
    expected: 'complexDefaultParameters(a?: unknown /* default = {} */, b?: unknown /* default = [] */, c?: unknown /* default = ( */): unknown;',
  },
  commaInDefaultParameter: {
    func: (a, b, c = 'def, ault') => {
      return a + b + c;
    },
    expected: 'commaInDefaultParameter(a: unknown, b: unknown, c?: unknown /* default = "def, ault" */): unknown;',
  },
//#endregion

//#region Multiple Return Types
  multipleReturnTypes1: {
    func: (x) => {
      if (x > 0) {
        return 'positive';
      } else if (x < 0) {
        return 'negative';
      } else {
        return 'zero';
      }
    },
    expected: 'multipleReturnTypes1(x: unknown): string;',
  },
  multipleReturnTypes2: {
    func: (flag) => {
      if (flag) {
        return true;
      }
      return false;
    },
    expected: 'multipleReturnTypes2(flag: unknown): boolean;',
  },
  multipleReturnTypes3: {
    func: (flag) => {
      if (flag) {
        return 'string';
      }
      return null;
    },
    expected: 'multipleReturnTypes3(flag: unknown): string|null;',
  },
  multipleReturnTypes4: {
    func: (value) => {
      if (typeof value === 'string') {
        return value;
      } else if (typeof value === 'number') {
        return value * 2;
      } else {
        return null;
      }
    },
    expected: 'multipleReturnTypes4(value: unknown): unknown|null;',
  },
  multipleReturnTypes5: {
    func: (x) => {
      if (x < 0) return null;
      if (x === 0) return 0;
      if (x > 10) return 'large';
      return [x];
    },
    expected: 'multipleReturnTypes5(x: unknown): null|number|string|unknown[];',
  },
  multipleReturnTypesWithObjects: {
    func: (type) => {
      if (type === 'user') {
        return { name: 'User', id: 1 };
      } else if (type === 'admin') {
        return { name: 'Admin', permissions: ['read', 'write'] };
      } else {
        return null;
      }
    },
    expected: 'multipleReturnTypesWithObjects(type: unknown): object|unknown|null;',
  },
//#endregion

//#region Edge Cases
  nestedReturns: {
    func: (x) => {
      const inner = () => {
        if (x > 0) {
          return true;
        }
        return false;
      };
      return inner();
    },
    expected: 'nestedReturns(x: unknown): unknown;',
  },
  earlyReturns: {
    func: (x) => {
      if (!x) return;
      if (x < 0) return null;
      return x;
    },
    expected: 'earlyReturns(x: unknown): undefined|null|unknown;',
  },
  returnInTryCatch: {
    func: (x) => {
      try {
        if (x) {
          return 'success';
        }
      } catch (e) {
        return 'error';
      }
      return 'default';
    },
    expected: 'returnInTryCatch(x: unknown): string;',
  },
//#endregion
};
// #endregion

// #region Test Suites
// Create test suites
export const testSuites: TestSuite[] = [
  {
    name: 'Basic Types',
    interfaceName: 'BasicTypes',
    testObject: {
      stringProp: 'string value',
      numberProp: 42,
      booleanProp: true,
      nullProp: null,
      undefinedProp: undefined,
      arrayProp: [1, 2, 3],
      objectProp: { a: 1, b: 2 },
    },
  },
  {
    name: 'Function Return Types',
    interfaceName: 'FunctionTypes',
    testObject: Object.fromEntries(Object.entries(testFunctions).map(([key, { func }]) => [key, func])),
  },
  {
    name: 'Nested Objects',
    interfaceName: 'NestedTypes',
    testObject: {
      level1: {
        level2: {
          level3: {
            prop: 'deep property',
            func: () => {
              return 'deep function';
            },
          },
        },
        sibling: {
          prop: 'sibling property',
        },
      },
      sibling: { otherProp: 'top level sibling' },
    },
  },
  {
    name: 'Array Types',
    interfaceName: 'ArrayTypes',
    testObject: {
      emptyArray: [],
      numberArray: [1, 2, 3],
      stringArray: ['a', 'b', 'c'],
      mixedArray: [1, 'a', true, null],
      objectArray: [{ a: 1 }, { b: 2 }],
      functionArray: [
        () => {},
        () => {
          return true;
        },
      ],
    },
  },
  {
    name: 'Complex Object Arrays',
    interfaceName: 'ComplexObjectArrays',
    testObject: {
      // Simple cases - objects with same property structure
      objectArray: [{ foo: 1 }, { foo: 5 }, { foo: 10 }],

      // Mixed property names but same types
      mixedArray: [{ foo: 1 }, { bar: 5 }, { baz: 10 }],

      // Same property names but different value types
      mixedValueArray: [{ foo: 'string' }, { foo: 5 }, { foo: null }],

      // Nested object arrays
      nestedObjectArray: [{ nested: { prop: 1 } }, { nested: { prop: 2 } }, { nested: { prop: 3 } }],

      // Mixed nested structures
      mixedNestedArray: [
        { nested: { prop: 1 } },
        { nested: { differentProp: 2 } },
        { completelyDifferent: { something: 3 } },
      ],

      // Arrays of arrays
      arrayOfArrays: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],

      // Arrays of mixed arrays
      arrayOfMixedArrays: [
        [1, 2, 3],
        ['a', 'b', 'c'],
        [true, false, null],
      ],

      // Arrays of objects with arrays
      objectsWithArrays: [
        { name: 'item1', values: [1, 2, 3] },
        { name: 'item2', values: [4, 5, 6] },
      ],

      // Arrays with functions
      objectsWithFunctions: [
        { id: 1, process: () => 'result1' },
        { id: 2, process: () => 'result2' },
      ],

      // Empty and non-empty mixed
      mixedEmptiness: [{}, { prop: 'value' }, { otherProp: 123 }],

      // Complex nested structures
      complexNested: [
        {
          level1: {
            level2: {
              array: [1, 2, 3],
              object: { prop: 'value' },
            },
          },
        },
        {
          level1: {
            level2: {
              array: [4, 5, 6],
              object: { prop: 'another' },
            },
          },
        },
      ],
    },
  },
  {
    name: 'Mixed Types',
    interfaceName: 'MixedTypes',
    testObject: {
      // Basic types
      stringProp: 'string value',
      numberProp: 42,
      booleanProp: true,

      // Functions
      simpleFunc: () => {},
      funcWithParams: (a, b) => a + b,

      // Nested objects
      nested: {
        prop1: 'value1',
        prop2: 123,
        func: () => 'hello',
      },

      // Edge cases
      nullValue: null,
      undefinedValue: undefined,
    },
  },
  {
    name: 'Edge Cases',
    interfaceName: 'EdgeCases',
    testObject: {
      // Empty objects and arrays
      emptyObject: {},
      emptyArray: [],

      // Special characters in property names
      'property-with-dash': 'dash',
      'property.with.dots': 'dots',
      'property with spaces': 'spaces',

      // Nested empty structures
      nestedEmpty: {
        emptyObj: {},
        emptyArr: [],
      },

      // Functions with complex bodies
      complexFunc: function () {
        const x = 1;
        const y = 2;
        if (x > y) {
          return x;
        } else {
          return y;
        }
      },
    },
  },
];

// Add circular reference to EdgeCases test object
const edgeCasesTestSuite = testSuites.find((suite) => suite.name === 'Edge Cases');
if (edgeCasesTestSuite) {
  const circularObj: any = {};
  circularObj.self = circularObj;
  edgeCasesTestSuite.testObject.circularReference = circularObj;
}
