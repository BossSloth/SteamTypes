import { 
  testFunctions,
  dataStructureTestFunctions,
  advancedTestFunctions,
  complexObjectTestFunctions
} from "./functions";
import { 
  basicPropertyTests, 
  advancedPropertyTests, 
  edgeCasePropertyTests 
} from "./properties";

export interface TestFunction {
  func: Function;
  expected: string;
}

export interface TestSuite {
  name: string;
  interfaceName: string;
  testObject: Record<string, any>;
  testFunctions?: Record<string, TestFunction>;
}

function mapFunctionsToTestSuite(testFunctions: Record<string, TestFunction>) {
  return Object.fromEntries(Object.entries(testFunctions).map(([key, { func }]) => [key, func]));
}

// #region Test Suites
// Create test suites
export const testSuites: TestSuite[] = [
  {
    name: 'Function Return Types',
    interfaceName: 'FunctionTypes',
    testObject: mapFunctionsToTestSuite(testFunctions),
    testFunctions: testFunctions,
  },
  {
    name: 'Data Structure Return Types',
    interfaceName: 'DataStructureTypes',
    testObject: mapFunctionsToTestSuite(dataStructureTestFunctions),
    testFunctions: dataStructureTestFunctions,
  },
  {
    name: 'Advanced Return Types',
    interfaceName: 'AdvancedTypes',
    testObject: mapFunctionsToTestSuite(advancedTestFunctions),
    testFunctions: advancedTestFunctions,
  },
  {
    name: 'Complex Object Return Types',
    interfaceName: 'ComplexObjectTypes',
    testObject: mapFunctionsToTestSuite(complexObjectTestFunctions),
    testFunctions: complexObjectTestFunctions,  
  },
  {
    name: 'Basic Property Tests',
    interfaceName: 'BasicPropertyTypes',
    testObject: basicPropertyTests,
  },
  {
    name: 'Advanced Property Tests',
    interfaceName: 'AdvancedPropertyTypes',
    testObject: advancedPropertyTests,
  },
  {
    name: 'Edge Case Property Tests',
    interfaceName: 'EdgeCasePropertyTypes',
    testObject: edgeCasePropertyTests,
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
];

// Add circular reference to EdgeCases test object
const edgeCasesTestSuite = testSuites.find((suite) => suite.name === 'Edge Cases');
if (edgeCasesTestSuite) {
  const circularObj: any = {};
  circularObj.self = circularObj;
  edgeCasesTestSuite.testObject.circularReference = circularObj;
}
