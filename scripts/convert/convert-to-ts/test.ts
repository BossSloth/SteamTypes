import { convertToTypescript } from './converter';
import { testSuites } from '../test-cases/test-cases';

/**
 * Test function for the converter
 */
export function testConvert() {
  const testObj = {
    arrayExtraTypeLater: [
      { id: 1, idx: 5, name: 'Generic', appDetails: undefined },
      { id: 2, idx: 9, name: 'Specific', appDetails: {foo: 2, bar: 3} },
    ],
    arrayExtraxPropertyLater: [
      { id: 1, idx: 5, name: 'Generic' },
      { id: 2, idx: 9, name: 'Specific', extra: 'property' },
    ],
    doubleExtraPropertyTypes: [
      { id: 1, idx1: 5, name: 'Generic' },
      { id: 2, idx1: 9, name: 'Specific', extra: 'property' },
      { id: 2, idx1: 9, name: 'Specific', extra: 'property', other: 3, foo: 2 }
    ],
    // arrayNestedMoreSpecificObjectLater: [
    //   { id: 1, idx: 5, name: 'Generic', extra: {foo: 2, bar: 3, baz: 5, other: 'other'}},
    //   { id: 2, idx: 9, name: 'Specific', extra: {foo: 2, bar: 3, baz: 5, other: 'other', test5: 'property'} }, //TODO: problem extra.test5 goes lost here
    //   // { id: 2, idx: 9, name: 'Specific', extra: 'property', other: 3, foo: 2 }
    // ],
    // brokenMultiArray: [ //TODO: this array just fully get's the wrong type
    //   { id: 1, idx: 5, name: 'Generic'},
    //   { id: 2, idx: 9, name: 'Specific', extra: {foo: 2, bar: 3, baz: 5, other: 'other', test5: 'property'} },
    //   // { id: 2, idx: 9, name: 'Specific', extra: 'property', other: 3, foo: 2 }
    // ],
    // setMoreSpecificObjectLater: new Set([
    //   { id1: 1, idx3: 5, name: 'Generic' },
    //   { id1: 2, idx3: 9, name: 'Specific', extra: 'property' }
    // ]),
  };

  const startTime = performance.now();
  const tsInterfaces = convertToTypescript(testObj, 'TestObject');
  console.log(tsInterfaces);
  const endTime = performance.now();
  console.log(`Execution time: ${endTime - startTime} ms`);
}

// Make the test function available globally
globalThis.testConvert = testConvert;

// Run the test if this module is executed directly
if (typeof window === 'undefined' && typeof require !== 'undefined' && require.main === module) {
  testConvert();
}
