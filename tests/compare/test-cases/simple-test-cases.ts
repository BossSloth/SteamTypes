import dedent from 'dedent';
import { ComparatorTest } from '.';

export const simpleCases: Record<string, ComparatorTest> = {
  'simple add missing property': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
        newProp: number;
      }`,
  },
  'simple remove property': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
        newProp: number;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
  },
  'simple type mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },
  'simple union type mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number | string;
      }`,
  },
  'simple array type mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string[];
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number[];
      }`,
  },
  'simple set type mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: Set<string>;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: Set<number>;
      }`,
  },
  'simple string, array mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string[];
      }`,
  },
  'simple number, set mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: Set<number>;
      }`,
  },
  'string literal': {
    interfaceName: 'SimpleInterface',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: 'a';
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
  },
  'number literal': {
    interfaceName: 'SimpleInterface',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: 1;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },
  'mismatching literal string, number': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: 'a';
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },
  'mismatching literal number, string': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: 5;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
  },
  'typeof literal string': {
    interfaceName: 'SimpleInterface',
    expectsNoDiff: true,
    target: dedent/* ts */`
      const text = 'a';

      export interface SimpleInterface {
        existingProp: typeof text;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
  },
  'mismatching typeof literal string': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      const text = 'a';

      export interface SimpleInterface {
        existingProp: typeof text;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },
  'typeof literal number': {
    interfaceName: 'SimpleInterface',
    expectsNoDiff: true,
    target: dedent/* ts */`
      const num = 5;

      export interface SimpleInterface {
        existingProp: typeof num;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },
  'mismatching typeof literal number': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      const num = 'a';

      export interface SimpleInterface {
        existingProp: typeof num;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },
  'simple object type': {
    interfaceName: 'SimpleInterface',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: {
          prop1: string;

          prop2: number;
        };
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: {
          prop1: string;
          prop2: unknown;
        };
      }`,
  },
  'object type removed member': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: {
          prop1: string;
          prop2: unknown;
        };
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: {
          prop1: string;
        };
      }`,
  },
  'object type added member': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: {
          prop1: string;
        };
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: {
          prop1: string;
          prop2: unknown;
        };
      }`,
  },
  'union literal type with unknown': {
    interfaceName: 'FooInterface',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface FooInterface {
        foo: { summary: string, result: number } | { summary?: undefined, result: number };
      }`,
    source: dedent/* ts */`
      export interface FooInterface {
        foo: { summary: unknown, result: number } | { summary?: unknown, result: number };
      }`,
  },
  'union literal type with unknown wrong optional': {
    interfaceName: 'FooInterface',
    target: dedent/* ts */`
      export interface FooInterface {
        foo: { summary: string, result: number } | { summary?: undefined, result: number };
      }`,
    source: dedent/* ts */`
      export interface FooInterface {
        foo: { summary?: unknown, result: number } | { summary?: unknown, result: number };
      }`,
  },
  'union literal type with unknown and extra string': {
    interfaceName: 'FooInterface',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface FooInterface {
        foo: { summary: string, result: number } | { summary?: undefined, result: number } | string;
      }`,
    source: dedent/* ts */`
      export interface FooInterface {
        foo: { summary: unknown, result: number } | { summary?: unknown, result: number } | string;
      }`,
  },
};
