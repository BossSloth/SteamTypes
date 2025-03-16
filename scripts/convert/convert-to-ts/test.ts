import { testSuites } from '../test-cases';
import { convertToTypescript } from './index';

// class BigObject {
//   constructor(key: string) {
//     for (let i = 0; i < 100; i++) {
//       this[`key${i}${key}`] = (x, y) => x / (y + 1);
//     }
//   }
// }

/**
 * Test function for the converter
 */
export function testConvert(): void {
  const testObj = {
    // arrayExtraTypeLater: [
    //   { id: 1, idx: 5, name: 'Generic', appDetails: undefined },
    //   { id: 2, idx: 9, name: 'Specific', appDetails: {foo: 2, bar: 3} },
    // ],
    // arrayExtraxPropertyLater: [
    //   { id: 1, idx: 5, name: 'Generic' },
    //   { id: 2, idx: 9, name: 'Specific', extra: 'property' },
    // ],
    // doubleExtraPropertyTypes: [
    //   { id: 1, idx1: 5, name: 'Generic' },
    //   { id: 2, idx1: 9, name: 'Specific', extra: 'property' },
    //   { id: 2, idx1: 9, name: 'Specific', extra: 'property', other: 3, foo: 2 }
    // ],
    // arrayNestedMoreSpecificObjectLater: [
    //   { id: 1, idx3: 5, name2: 'Generic', extra: {foo: 2, bar: 3, baz: 5, other: 'other'}},
    //   { id: 2, idx3: 9, name2: 'Specific', extra: {foo: 2, bar: 3, baz: 5, other: 'other', test5: 'property'} }, //TODO: problem extra.test5 goes lost here
    //   // { id: 2, idx: 9, name: 'Specific', extra: 'property', other: 3, foo: 2 }
    // ],
    // brokenMultiArray: [ //TODO: this array just fully get's the wrong type
    //   { id: 1, idx3: 5, name: 'Generic'},
    //   { id: 2, idx3: 9, name: 'Specific', extra: {foo: 2, bar: 3, baz: 5, other: 'other', test5: 'property'} },
    //   // { id: 2, idx: 9, name: 'Specific', extra: 'property', other: 3, foo: 2 }
    // ],
    // arrayWithDifferentItemTypes: [
    //   { id: 1, name: 'Array 1', type: 'tags', status: 'active', createdAt: new Date(), tags: ['tag1', 'tag2'] },
    //   { id: 2, name: 'Array 2', type: 'tags', status: 'active', createdAt: new Date(), tags: [1, 2, 3] }
    // ],
    
    // // Test case for arrays with objects that have array properties
    // // with different lengths
    // arrayWithDifferentLengths: [
    //   { id: 1, name: 'Length 1', type: 'array', status: 'active', createdAt: new Date(), values: [1] },
    //   { id: 2, name: 'Length 2', type: 'array', status: 'active', createdAt: new Date(), values: [1, 2, 3, 4, 5] }
    // ],
    
    // // Test case for arrays with objects that have nested arrays
    // arrayWithNestedArrays: [
    //   { id: 1, name: 'Nested 1', type: 'matrix', status: 'active', createdAt: new Date(), matrix: [[1, 2], [3, 4]] },
    //   { id: 2, name: 'Nested 2', type: 'matrix', status: 'active', createdAt: new Date(), matrix: [[5, 6], [7, 8]], vector: [9, 10] }
    // ],
    // arrayOfArrays: [
    //   [new TestClass('test', 1)],
    //   [new TestClass('test', 2)],
    //   [new TestClass('test', 3, true)],
    //   [1, 2, 3],
    // ],
    // setMoreSpecificObjectLater: new Set([
    //   { id1: 1, idx3: 5, name: 'Generic', extra: undefined },
    //   { id1: 2, idx3: 9, name: 'Specific', extra: 'property' }
    // ]),
    // mapMoreSpecificObjectLater: new Map([
    //   ['key1', { id2: 1, idx3: 5, name: 'Generic' }],
    //   ['key2', { id2: 2, idx3: 9, name: 'Specific', extra: 'property' }],
    //   ['key3', { extra: 'property' }]
    // ]),
    // performanceArray: [],
    // appActivity: [
    //   {events: [obj1, obj2]},
    //   {events: [obj1]},
    //   {events: [obj2]},
    // ],
    suites: testSuites[0].testObject,
    internal: Math.random,
  };

  // for (let i = 0; i < 100; i++) {
  //   testObj['performanceArray'].push(new BigObject(`other${i}`));
  // }
  const startTime = performance.now();
  // const extendedApps = Array(100).fill(allApps.apps).flat();
  // allApps.apps = extendedApps;
  
  const tsInterfaces = convertToTypescript(testObj, 'TestObject');
  const endTime = performance.now();
  console.log(tsInterfaces);
  console.log(`Execution time: ${endTime - startTime} ms`);
}

// Make the test function available globally
globalThis.testConvert = testConvert;

// Run the test if this module is executed directly
if (typeof window === 'undefined' && typeof require !== 'undefined' && require.main === module) {
  testConvert();
}
