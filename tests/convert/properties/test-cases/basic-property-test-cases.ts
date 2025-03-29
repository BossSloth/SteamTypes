// #region Primitive Property Test Cases
const primitivePropertyTests = {
  // String properties
  emptyString: '',
  simpleString: 'hello world',
  multilineString: `line 1
line 2
line 3`,

  // Number properties
  zero: 0,
  positiveInteger: 42,
  negativeInteger: -42,
  floatingPoint: 3.14159,
  infinity: Infinity,
  negativeInfinity: -Infinity,
  nan: NaN,

  // Boolean properties
  trueValue: true,
  falseValue: false,

  // Null and undefined
  nullValue: null,
  undefinedValue: undefined,

  // Symbol
  symbolValue: Symbol('test'),

  // BigInt
  bigIntValue: BigInt('9007199254740991'),

  // Enum
  m_eEnumValue: 7,

  eDataType: 12,
};
// #endregion

// #region Object Property Test Cases
const objectPropertyTests = {
  // Empty object
  emptyObject: {},

  // Simple objects
  simpleObject: { a: 1, b: 'string', c: true },

  // Nested objects
  nestedObject: { outer: { inner: { other: 42 } } },

  // Object with special property names
  specialPropertyNames: {
    'property-with-dash': 1,
    'property.with.dots': 2,
    'property with spaces': 3,
    '123numericStart': 4,
    _underscore: 5,
    $dollar: 6,
  },

  // Object with methods
  objectWithMethods: {
    data: 42,
    method() { return this.data; },
  },

  // Object with getters/setters
  objectWithAccessors: {
    _value: 0,
    get value() { return this._value; },
    set value(v) { this._value = v; },
  },

  sameStructureDifferentName: {
    s_x: { k: 10 },
    s_y: { k: 15 },
  },

  sameStructureSameName: {
    x: {
      structure: { value: 'test' },
    },
    y: {
      structure: { value: 'test' },
    },
  },

  complexFunc: function () {
    const x = 1;
    const y = 2;
    if (x > y) {
      return x;
    } else {
      return y;
    }
  },

  funcWithDefault: function (x = 1, y = 'string') {
    return x + y;
  },

  nativeCode: Math.random,
};
// #endregion

// #region Array Property Test Cases
const arrayPropertyTests = {
  // Empty array
  emptyArray: [],

  // Homogeneous arrays
  numberArray: [1, 2, 3, 4, 5],
  stringArray: ['a', 'b', 'c'],
  booleanArray: [true, false, true],

  // Heterogeneous arrays
  mixedArray: [1, 'string', true, null],

  // Nested arrays
  nestedArray: [[1, 2], [3, 4], [5, 6]],

  // Array of objects
  objectArray: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }],

  // Array of mixed objects
  mixedObjectArray: [{ id: 1 }, { name: 'Item' }, { active: true }],

  // Sparse array
  sparseArray: [,,,3,,,6],
};
// #endregion

// Export all property test cases
export const basicPropertyTests = {
  ...primitivePropertyTests,
  ...objectPropertyTests,
  ...arrayPropertyTests,
};
