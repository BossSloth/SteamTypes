export const objectArraysTests = {
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
  mixedEmptiness: [{}, { proper: 'value' }, { otherProp: 123 }],

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
};
