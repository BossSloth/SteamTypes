import { TestFunction } from './shared';

// #region Map Test Functions
const mapTestFunctions: Record<string, TestFunction> = {
  // Basic Map operations
  returnEmptyMap: {
    func: () => new Map(),
    expected: 'returnEmptyMap(): Map<unknown, unknown>;',
  },
  returnStringKeyMap: {
    func: () => new Map([['key1', 'value1'], ['key2', 'value2']]),
    expected: 'returnStringKeyMap(): Map<string, string>;',
  },
  returnNumberKeyMap: {
    func: () => new Map([[1, 'one'], [2, 'two']]),
    expected: 'returnNumberKeyMap(): Map<number, string>;',
  },
  returnNestedMap: {
    func: () => new Map([
      ['outer1', new Map([['inner1', 1], ['inner2', 2]])],
      ['outer2', new Map([['inner3', 3], ['inner4', 4]])],
    ]),
    expected: 'returnNestedMap(): Map<string, Map<string, number>>;',
  },
  returnMapWithObjects: {
    func: () => new Map([
      ['user1', { id: 1, name: 'John' }],
      ['user2', { id: 2, name: 'Jane' }],
    ]),
    expected: 'returnMapWithObjects(): Map<string, { id: number; name: string; }>;',
  },
  mapOperations: {
    func: () => {
      const map = new Map();
      map.set('a', 1);
      map.set('b', 2);

      return map;
    },
    expected: 'mapOperations(): Map<unknown, unknown>;',
  },
};
// #endregion

// #region Set Test Functions
const setTestFunctions: Record<string, TestFunction> = {
  // Basic Set operations
  returnEmptySet: {
    func: () => new Set(),
    expected: 'returnEmptySet(): Set<unknown>;',
  },
  returnStringSet: {
    func: () => new Set(['a', 'b', 'c']),
    expected: 'returnStringSet(): Set<string>;',
  },
  returnNumberSet: {
    func: () => new Set([1, 2, 3]),
    expected: 'returnNumberSet(): Set<number>;',
  },
  returnMixedSet: {
    func: () => new Set([1, 'two', true, null]),
    expected: 'returnMixedSet(): Set<string | number | boolean | null>;',
  },
  returnNestedSet: {
    func: () => new Set([
      new Set([1, 2]),
      new Set([3, 4]),
    ]),
    expected: 'returnNestedSet(): Set<Set<number>>;',
  },
  returnSetOfObjects: {
    func: () => new Set([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]),
    expected: 'returnSetOfObjects(): Set<{ id: number; name: string; }>;',
  },
  setOperations: {
    func: () => {
      const set = new Set();
      set.add('a');
      set.add('b');

      return set;
    },
    expected: 'setOperations(): Set<unknown>;',
  },
};
// #endregion

// #region Iterable Test Functions
const iterableTestFunctions: Record<string, TestFunction> = {
  // Generator functions and other iterables
  simpleGenerator: {
    func: function* simpleGenerator() {
      yield 1;
      yield 2;
      yield 3;
    },
    expected: 'simpleGenerator(): Generator<1 | 2 | 3, void, unknown>;',
  },
  generatorWithReturn: {
    func: function* generatorWithReturn() {
      yield 'a';
      yield 'b';

      return 'final result';
    },
    expected: "generatorWithReturn(): Generator<'a' | 'b', string, unknown>;",
  },
  infiniteGenerator: {
    func: function* infiniteGenerator() {
      let i = 0;
      while (true) {
        yield i++;
      }
    },
    expected: 'infiniteGenerator(): Generator<number, never, unknown>;',
  },
  asyncGenerator: {
    func: async function* asyncGenerator() {
      yield Promise.resolve(1);
      yield Promise.resolve(2);
    },
    expected: 'asyncGenerator(): object | unknown;',
  },
  customIterable: {
    func: () => {
      return {
        [Symbol.iterator]: function* () {
          yield 1;
          yield 2;
        },
      };
    },
    expected: 'customIterable(): { [Symbol.iterator]: () => Generator<1 | 2, void, unknown>; };',
  },
  iterableWithNext: {
    func: () => {
      return {
        next: () => ({ value: Math.random(), done: false }),
      };
    },
    expected: 'iterableWithNext(): { next: () => { value: number; done: boolean; }; };',
  },
};
// #endregion

export const dataStructureTestFunctions = {
  ...mapTestFunctions,
  ...setTestFunctions,
  ...iterableTestFunctions,
};
