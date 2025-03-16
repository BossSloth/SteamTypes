import { TestFunction } from "../test-cases";

//#region Test Functions
// Define test functions with expected return types

//#region Basic Return Types
export const returnTypesTestFunctions: Record<string, TestFunction> = {
    emptyFunction: {
      func: () => {},
      expected: 'emptyFunction(): void;',
    },
    returnNull: {
      func: () => {
        return null;
      },
      expected: 'returnNull(): null;',
    },
    voidReturn: {
      func: () => {
        return;
      },
      expected: 'voidReturn(): void;',
    },
    emptyReturn: {
      func: function emptyReturn() {},
      expected: 'emptyReturn(): void;',
    },
  //#endregion

  //#region Direct Return Types
    directReturnNull: {
      func: () => null,
      expected: 'directReturnNull(): null;',
    },
    directReturnTrue: {
      func: () => true,
      expected: 'directReturnTrue(): boolean;',
    },
    directReturnFalse: {
      func: () => false,
      expected: 'directReturnFalse(): boolean;',
    },
    directReturnNumber: {
      func: () => 42,
      expected: 'directReturnNumber(): number;',
    },
    directReturnString: {
      func: () => 'hello',
      expected: 'directReturnString(): string;',
    },
    directReturnArray: {
      func: () => [1, 2, 3],
      expected: 'directReturnArray(): number[];',
    },
    directReturnObject: {
      func: () => ({ a: 1, b: 2 }),
      expected: 'directReturnObject(): { a: number; b: number; };',
    },
    directReturnWithParens: {
      func: () => ('hello'),
      expected: 'directReturnWithParens(): string;',
    },
    directReturnTemplate: {
      func: () => `template string`,
      expected: 'directReturnTemplate(): string;',
    },
    directReturnEmptyArray: {
      func: () => [],
      expected: 'directReturnEmptyArray(): never[];',
    },
    directReturnEmptyObject: {
      func: () => ({}),
      expected: 'directReturnEmptyObject(): object | unknown;',
    },
    directReturnExpression: {
      func: (x) => x + 1,
      expected: 'directReturnExpression(x: unknown): unknown;',
    },
  //#endregion

  //#region Regular Return Types
    returnTrue: {
      func: () => {
        return true;
      },
      expected: 'returnTrue(): boolean;',
    },
    returnFalse: {
      func: () => {
        return false;
      },
      expected: 'returnFalse(): boolean;',
    },
    returnConditionalBoolean: {
      func: () => {
        if (Math.random() > 0.5) {
          return true;
        }
        return false;
      },
      expected: 'returnConditionalBoolean(): boolean;',
    },
    returnNumber: {
      func: () => {
        return 42;
      },
      expected: 'returnNumber(): number;',
    },
    returnString: {
      func: () => {
        return 'hello';
      },
      expected: 'returnString(): string;',
    },
    returnEmptyArray: {
      func: () => {
        return [];
      },
      expected: 'returnEmptyArray(): never[];',
    },
    returnArrayOfNumbers: {
      func: () => {
        return [1, 2, 3];
      },
      expected: 'returnArrayOfNumbers(): number[];',
    },
    returnArrayOfStrings: {
      func: () => {
        return ['a', 'b', 'c'];
      },
      expected: 'returnArrayOfStrings(): string[];',
    },
    returnArrayOfObjects: {
      func: () => {
        return [{ a: 1 }, { a: 2 }];
      },
      expected: 'returnArrayOfObjects(): { a: number; }[];',
    },
    returnEmptyObject: {
      func: () => {
        return {};
      },
      expected: 'returnEmptyObject(): object | unknown;',
    },
    returnComplexObject: {
      func: () => {
        return { a: 1, b: 'string', c: Math.random };
      },
      expected: 'returnComplexObject(): { a: number; b: string; c: () => number; };',
    },
  //#endregion

  //#region Parameters
    returnParameter: {
      func: (param) => {
        return param;
      },
      expected: 'returnParameter(param: unknown): unknown;',
    },
    multipleParameters: {
      func: (a, b, c) => {
        return a + b + c;
      },
      expected: 'multipleParameters(a: unknown, b: unknown, c: unknown): unknown;',
    },
    paramWithReturn: {
      func: (myParam) => {
        return null;
      },
      expected: 'paramWithReturn(myParam: unknown): null;',
    },
    spreadParameters: {
      func: (first, ...rest) => {
        return [...rest, first];
      },
      expected: 'spreadParameters(first: unknown, ...rest: unknown[]): unknown[];',
    },
    defaultParameters: {
      func: (a, b = 10, c = 'default') => {
        return a + b + c;
      },
      expected: `
  /**
   * @param b default: 10
   * @param c default: "default"
   */
defaultParameters(a: unknown, b?: number, c?: string): string;`,
    },
    complexDefaultParameters: {
      func: (a = {}, b = [], c = () => {}) => {
        return typeof c;
      },
      expected: `
  /**
   * @param a default: {}
   * @param b default: []
   * @param c default: () => {}
   */
complexDefaultParameters(a?: unknown, b?: unknown[], c?: () => void): 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';`,
    },
    commaInDefaultParameter: {
      func: (a, b, c = 'def, ault') => {
        return a + b + c;
      },
      expected: `
  /**
   * @param c default: "def, ault"
   */
commaInDefaultParameter(a: unknown, b: unknown, c?: string): string;`,
    },
  //#endregion

  //#region Multiple Return Types
    multipleReturnTypes1: {
      func: (x) => {
        if (x > 0) {
          return 'positive';
        } else if (x < 0) {
          return 'negative';
        } else {
          return 'zero';
        }
      },
      expected: "multipleReturnTypes1(x: unknown): 'positive' | 'negative' | 'zero';",
    },
    multipleReturnTypes2: {
      func: (flag) => {
        if (flag) {
          return true;
        }
        return false;
      },
      expected: 'multipleReturnTypes2(flag: unknown): boolean;',
    },
    multipleReturnTypes3: {
      func: (flag) => {
        if (flag) {
          return 'value';
        }
        return null;
      },
      expected: "multipleReturnTypes3(flag: unknown): 'value' | null;",
    },
    multipleReturnTypes4: {
      func: (value) => {
        if (typeof value === 'string') {
          return value;
        } else if (typeof value === 'number') {
          return value * 2;
        } else {
          return null;
        }
      },
      expected: 'multipleReturnTypes4(value: unknown): string | number | null;',
    },
    multipleReturnTypes5: {
      func: (x) => {
        if (x < 0) return null;
        if (x === 0) return 0;
        if (x > 10) return 'large';
        return [x];
      },
      expected: "multipleReturnTypes5(x: unknown): any[] | 0 | 'large' | null;",
    },
    multipleReturnTypesWithObjects: {
      func: (type) => {
        if (type === 'user') {
          return { name: 'User', id: 1 };
        } else if (type === 'admin') {
          return { name: 'Admin', permissions: ['read', 'write'] };
        } else {
          return null;
        }
      },
      expected: 'multipleReturnTypesWithObjects(type: unknown): { name: string; id: number; permissions?: undefined; } | { name: string; permissions: string[]; id?: undefined; } | null;',
    },
  //#endregion

  //#region Edge Cases
    nestedReturns: {
      func: (x) => {
        const inner = () => {
          if (x > 0) {
            return true;
          }
          return false;
        };
        return inner();
      },
      expected: 'nestedReturns(x: unknown): boolean;',
    },
    nestedReturnsNotCalled: {
      func: (x) => {
        const y = function inner() {
          if (x > 0) {
            return true;
          }
          return false;
        };
        y();
        return 'not called';
      },
      expected: 'nestedReturnsNotCalled(x: unknown): string;',
    },
    arrowFuncInFunction: {
      func: function func(x) {
        const i = () => {};

        i();

        return false;
      },
      expected: 'arrowFuncInFunction(x: unknown): boolean;',
    },
    earlyReturns: {
      func: (x) => {
        if (!x) return;
        if (x < 0) return null;
        return x;
      },
      expected: 'earlyReturns(x: unknown): unknown;',
    },
    returnInTryCatch: {
      func: (x) => {
        try {
          if (x) {
            return 'success';
          }
        } catch (e) {
          return 'error';
        }
        return 'default';
      },
      expected: "returnInTryCatch(x: unknown): 'default' | 'success' | 'error';",
    },
    nativeCode: {
      func: Math.random,
      expected: `
  /**
   * @native
   */
nativeCode(): unknown;`,
    }
  //#endregion
  };
  // #endregion