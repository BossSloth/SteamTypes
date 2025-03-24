/* eslint-disable max-classes-per-file */
import Long from 'long';
import { TestFunction } from './shared';

// #region Async Function Test Cases
// Basic async functions
const asyncTestFunctions: Record<string, TestFunction> = {
  basicAsyncFunction: {
    func: async () => {
      return 'async result';
    },
    expected: 'basicAsyncFunction(): Promise<string>;',
  },
  asyncFunctionWithParams: {
    func: async (a, b) => {
      return a + b;
    },
    expected: 'asyncFunctionWithParams(a: unknown, b: unknown): Promise<unknown>;',
  },
  asyncVoidFunction: {
    func: async () => {
      console.log('async void');
    },
    expected: 'asyncVoidFunction(): Promise<void>;',
  },
  asyncWithAwait: {
    func: async () => {
      const result = await Promise.resolve(42);

      return result * 2;
    },
    expected: 'asyncWithAwait(): Promise<number>;',
  },
  asyncWithMultipleAwaits: {
    func: async () => {
      const a = await Promise.resolve(10);
      const b = await Promise.resolve(20);

      return a + b;
    },
    expected: 'asyncWithMultipleAwaits(): Promise<number>;',
  },
  asyncWithTryCatch: {
    func: async () => {
      try {
        return await Promise.resolve('success');
      } catch (error) {
        return 'error';
      }
    },
    expected: 'asyncWithTryCatch(): Promise<string>;',
  },
  asyncReturningObject: {
    func: async () => {
      return { status: 'success', data: [1, 2, 3] };
    },
    expected: 'asyncReturningObject(): Promise<{ status: string; data: number[]; }>;',
  },
  asyncReturningPromise: {
    func: async () => {
      return Promise.resolve('direct promise');
    },
    expected: 'asyncReturningPromise(): Promise<string>;',
  },
  asyncReturningNestedPromise: {
    func: async () => {
      return Promise.resolve(Promise.resolve('nested promise'));
    },
    expected: 'asyncReturningNestedPromise(): Promise<string>;',
  },
};
// #endregion

// #region Class Test Cases
class SimpleClass {
  property = 'value';
  method() {
    return this.property;
  }
}

class ComplexClass {
  private _value: number;

  constructor(value: number) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(newValue: number) {
    this._value = newValue;
  }

  static create(value: number) {
    return new ComplexClass(value);
  }

  calculate(multiplier: number) {
    return this._value * multiplier;
  }
}

const classTestFunctions: Record<string, TestFunction> = {
  returnSimpleClass: {
    func: () => SimpleClass,
    expected: 'returnSimpleClass(): unknown;',
  },
  returnSimpleClassInstance: {
    func: () => new SimpleClass(),
    expected: 'returnSimpleClassInstance(): unknown;',
  },
  returnComplexClass: {
    func: () => ComplexClass,
    expected: 'returnComplexClass(): unknown;',
  },
  returnComplexClassInstance: {
    func: () => new ComplexClass(42),
    expected: 'returnComplexClassInstance(): unknown;',
  },
  returnClassWithMethods: {
    func: () => {
      return {
        value: 10,
        increment() {
          this.value++;

          return this.value;
        },
        decrement() {
          this.value--;

          return this.value;
        },
      };
    },
    expected: 'returnClassWithMethods(): { value: number; increment(): number; decrement(): number; };',
  },
  returnClassFactory: {
    func: () => {
      return (name: string) => {
        return {
          name,
          greet() {
            return `Hello, ${name}!`;
          },
        };
      };
    },
    expected: 'returnClassFactory(): (name: unknown) => { name: unknown; greet(): string; };',
  },
};
// #endregion

// #region Enum and Special Types Test Cases
// Enum-like objects
const StringEnum = {
  RED: 'red',
  GREEN: 'green',
  BLUE: 'blue',
} as const;

const NumberEnum = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
} as const;

const MixedEnum = {
  NAME: 'name',
  ID: 1,
  ACTIVE: true,
} as const;

// Enums don't work so these will all return unknown
const enumTestFunctions: Record<string, TestFunction> = {
  returnStringEnum: {
    func: () => StringEnum,
    expected: 'returnStringEnum(): unknown;',
  },
  returnNumberEnum: {
    func: () => NumberEnum,
    expected: 'returnNumberEnum(): unknown;',
  },
  returnMixedEnum: {
    func: () => MixedEnum,
    expected: 'returnMixedEnum(): unknown;',
  },
  returnEnumValue: {
    func: () => StringEnum.RED,
    expected: 'returnEnumValue(): unknown;',
  },
  returnLongInteger: {
    func: () => Long.fromString('9223372036854775807'),
    expected: 'returnLongInteger(): unknown;',
  },
  returnBigInt: {
    func: () => BigInt('9007199254740991'),
    expected: 'returnBigInt(): unknown;',
  },
  returnSymbol: {
    func: () => Symbol('unique'),
    expected: 'returnSymbol(): symbol;',
  },
  returnRegExp: {
    func: () => /pattern/g,
    expected: 'returnRegExp(): RegExp;',
  },
  returnDate: {
    func: () => new Date(),
    expected: 'returnDate(): Date;',
  },
  returnError: {
    func: () => new Error('Something went wrong'),
    expected: 'returnError(): Error;',
  },
  returnTypedArray: {
    func: () => new Uint8Array([1, 2, 3]),
    expected: 'returnTypedArray(): Uint8Array<ArrayBuffer>;',
  },
  returnArrayBuffer: {
    func: () => new ArrayBuffer(8),
    expected: 'returnArrayBuffer(): ArrayBuffer;',
  },
};
// #endregion

export const advancedTestFunctions = {
  ...asyncTestFunctions,
  ...classTestFunctions,
  ...enumTestFunctions,
};
