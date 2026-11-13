export const numberRecordTests = {
  // Object with only numeric keys becomes Record<number, ValueType> when all values resolve to the same type
  achievements: {
    1027: { internal_key: 1, unlocked: true },
    1032: { internal_key: 2, unlocked: false, progress: 3 },
    2561: { internal_key: 3, unlocked: true, progress: 4 },
  },

  // Number record with primitive values
  names: { 0: 'a', 6: 'b' },

  // Number record with values of different types falls back to a numeric-keyed interface
  mixedValues: { 1: 'a', 2: 5 },

  // Number record with object values that don't merge falls back to a numeric-keyed interface
  differentShapes: {
    1: { a: 1 },
    2: { b: 'x', c: 2, d: true },
  },

  // Nested number records
  nestedRecords: {
    1: { 10: 'a', 11: 'b' },
    2: { 12: 'c' },
  },

  // Number records nested in other containers
  recordsInArray: [{ 1: 'a', 2: 'b' }],
  recordOrPrimitive: [{ 1: 'a' }, 'x'],

  // Collection item interfaces get singularized names
  entries: [{ id: 1 }, { id: 2 }],
  matches: [
    { id: 1, score: 5 },
    { id: 2, score: 3 },
  ],
  addresses: [{ street: 'a' }, { street: 'b' }],

  // Plain object properties keep their names
  settings: { a: 1, label: 'x' },

  // Mixed numeric and string keys stays an interface
  mixedKeys: { 1: 'a', other: 'b' },
};
