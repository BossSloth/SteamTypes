import { convertToTypescript } from './converter';
import { testSuites } from '../test-cases/test-cases';

class TestClass {
  name: string;
  details: { name: string; };
  index: number;

  constructor(name: string, index: number, extra: boolean = false) {
    this.name = name;
    this.index = index;
    this.details = { name: name, other: 5, m_data: undefined };
    if(extra) {
      this.test1 = false;
      this.details.test2 = name;
    }
  }
}

class BigObject {
  constructor(key: string) {
    for (let i = 0; i < 600; i++) {
      this[`key${i}${key}`] = i;
    }
  }
}

/**
 * Test function for the converter
 */
export function testConvert() {
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
    // arrayOfArrays: [
    //   [new TestClass('test', 1)],
    //   [new TestClass('test', 2)],
    //   [new TestClass('test', 3, true)],
    //   [1, 2, 3],
    // ],
    // setMoreSpecificObjectLater: new Set([
    //   { id1: 1, idx3: 5, name: 'Generic' },
    //   { id1: 2, idx3: 9, name: 'Specific', extra: 'property' }
    // ]),
    // mapMoreSpecificObjectLater: new Map([
    //   ['key1', { id2: 1, idx3: 5, name: 'Generic' }],
    //   ['key2', { id2: 2, idx3: 9, name: 'Specific', extra: 'property' }],
    //   ['key3', { extra: 'property' }]
    // ]),
    performanceArray: [],
  };

  for (let i = 0; i < 100; i++) {
    testObj['performanceArray'].push(new BigObject(`other${i}`));
  }

  const startTime = performance.now();
  const tsInterfaces = convertToTypescript(testObj, 'TestObject');
  // console.log(tsInterfaces);
  const endTime = performance.now();
  console.log(`Execution time: ${endTime - startTime} ms`);
}

// Make the test function available globally
globalThis.testConvert = testConvert;

// Run the test if this module is executed directly
if (typeof window === 'undefined' && typeof require !== 'undefined' && require.main === module) {
  testConvert();
}
