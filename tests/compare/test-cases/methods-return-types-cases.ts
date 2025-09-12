import dedent from 'dedent';
import { ComparatorTest } from './index';

export const returnTypesCases: Record<string, ComparatorTest> = {
  'return type string literal': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
    export interface Foo {
      bar(): 'my string';
    }
  `,
    source: dedent/* ts */`
    export interface Foo {
      bar(): string;
    }
  `,
  },

  'method with interface return type': {
    interfaceName: 'UserService',
    target: dedent/* ts */`
      export interface UserService {
        getUserById(id: number): unknown;
      }`,
    source: dedent/* ts */`
      export interface UserService {
        getUserById(id: number): User | null;
        createUser(email: string, name: string): User;
      }

      export interface User {
        id: UserIdentifier;
        email: string;
        name: string;
      }`,
  },
  'return type imported type': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      import { Unregisterable } from './types';

      export interface Foo {
        bar(): Unregisterable;
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        bar(): { unregister: () => void };
      }
    `,
  },
  'return type mismatch source array': {
    interfaceName: 'Foo',
    target: dedent/* ts */`
      export interface Foo {
        bar(): unknown;
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        bar(): unknown[];
      }
    `,
  },
  'return type with ReturnType, source has unknown': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Foo {
        bar(): ReturnType<Foo['bar2']>;

        bar2(): string[];
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        bar(): unknown[];

        bar2(): unknown[];
      }
    `,
  },
  'return type with ReturnType, source is known': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Foo {
        bar(): ReturnType<Foo['bar2']>;

        bar2(): string[];
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        bar(): string[];

        bar2(): string[];
      }
    `,
  },
  'return type with wrong ReturnType, source is known': {
    interfaceName: 'Foo',
    target: dedent/* ts */`
      export interface Foo {
        bar(): ReturnType<Foo['bar2']>;

        bar2(): number[];
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        bar(): string[];

        bar2(): number[];
      }
    `,
  },
  'typeof return type': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      const MAIN_NAME = 'bar2';

      export interface Foo {
        bar(): typeof MAIN_NAME;
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        bar(): string;
      }
    `,
  },
};
