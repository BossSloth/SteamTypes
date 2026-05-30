import dedent from 'dedent';
import { ComparatorTest, createRenamedTest, createTest } from '../shared';

export const unionCases: Record<string, ComparatorTest> = {
  'union type with interface': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: string | null;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: DataType | null;
      }

      export interface DataType {
        value: string;
        id: number;
      }`,
  },

  'inverse union type with interface': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: DataType | null;
      }

      export interface DataType {
        value: string;
        id: number;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: string | null;
      }`,
  },

  'nested interface in union type': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: Base | Extended;
      }

      export interface Base {
        id: number;
        name: string;
      }

      export interface Extended {
        details: string;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: Base | Extended;
      }

      export interface Base {
        id: number;
        name: string;
        created: Date;
      }

      export interface Extended {
        details: string;
        active: boolean;
      }`,
  },

  'union type with different lengths': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: string | number;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: string | number | boolean;
      }`,
  },

  'union type with interface and different lengths': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: A | B;
      }

      export interface A {
        propA: string;
      }

      export interface B {
        propB: number;
        fooB: string;
        otherB: boolean;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: A | B | C;
      }

      export interface A {
        propA: string;
      }

      export interface B {
        propB: number;
        fooB: string;
        otherB: boolean;
        extraB: Date;
      }

      export interface C {
        propC: boolean;
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

  'union with duplicate members': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Foo {
        value: string;
      }`,
    source: dedent/* ts */`
      export interface Foo {
        value: string | string;
      }`,
  },

  'union with non-union type alias member': {
    interfaceName: 'Foo',
    target: dedent/* ts */`
      type Alias = string;

      export interface Foo {
        value: Alias | number;
      }`,
    source: dedent/* ts */`
      export interface Foo {
        value: boolean;
      }`,
  },

  // TODO: This case might be wrong as it should read the namespace
  'qualified name from namespace as property type': {
    interfaceName: 'Container',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export namespace Foo {
        export interface Bar {
          value: string;
        }
      }

      export interface Container {
        data: Foo.Bar;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: number;
      }`,
  },

  'union with qualified name type alias member': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export namespace NS {
        export type Alias = string;
      }

      export interface Container {
        value: NS.Alias | number;
      }`,
    source: dedent/* ts */`
      export interface Container {
        value: boolean;
      }`,
  },

  'union with null to null wrapped': {
    interfaceName: 'Container',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Container {
        data: (string | null);
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: null;
      }`,
  },

  'union with null to null': {
    interfaceName: 'Container',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Container {
        data: string | null;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: null;
      }`,
  },
};

createTest('Unions', unionCases);

createRenamedTest('Union Renames', unionCases);
