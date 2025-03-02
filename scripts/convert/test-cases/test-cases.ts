import { testFunctions } from "./function-test-cases";

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
      m_startWithUnderscore: {a: 5},

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

      sameStructureDifferentName: {
        s_x: {k: 10},
        s_y: {k: 15},
      },

      sameStructureSameName: {
        x: {
          id: {value: 'test'}
        },
        y: {
          id: {value: 'test'}
        },
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
