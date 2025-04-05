import dedent from 'dedent';
import { ComparatorTest } from './index';

export const genericsCases: Record<string, ComparatorTest> = {
  'generic interface type in map': {
    interfaceName: 'DataStore',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataStore {
        data: Map<string, UserData<number>>;
      }

      export interface UserData<T extends number> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: Map<string, UserData>;
      }

      export interface UserData {
        id: number;
        name: string;
        email: string;
      }
      `,
  },

  'generic interface type in map mismatch - data': {
    interfaceName: 'DataStore',
    target: dedent/* ts */`
      export interface DataStore {
        data: Map<string, number>;
      }

      export interface UserData<T extends number> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: Map<string, UserData>;
      }

      export interface UserData {
        id: number;
        name: string;
        email: string;
      }
      `,
  },

  'generic interface type in map mismatch - id': {
    interfaceName: 'DataStore',
    target: dedent/* ts */`
      export interface DataStore {
        data: Map<string, UserData<number>>;
      }

      export interface UserData<T extends string> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: Map<string, UserData>;
      }

      export interface UserData {
        id: number;
        name: string;
        email: string;
      }
      `,
  },

  'simple generic': {
    interfaceName: 'DataStore',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataStore {
        data: UserData<number>;
      }

      export interface UserData<T extends number> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: UserData;
      }

      export interface UserData {
        id: number;
        name: string;
        email: string;
      }
      `,
  },

  'simple generic mismatch': {
    interfaceName: 'DataStore',
    target: dedent/* ts */`
      export interface DataStore {
        data: UserData<number>;
      }

      export interface UserData<T extends string> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: UserData;
      }

      export interface UserData {
        id: number;
        name: string;
        email: string;
      }
      `,
  },

  'union constraint': {
    interfaceName: 'DataStore',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataStore {
        data: UserData<number>;
      }

      export interface UserData<T extends string | number> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: UserData;
      }

      export interface UserData {
        id: string | number;
        name: string;
        email: string;
      }
      `,
  },

  'indexed access generic type no default':
  {
    interfaceName: 'DataStore',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataStore {
        data: UserData<number>;
      }

      export interface UserData<T extends string | number> {
        email: string;

        id: T;

        info: UserData<T>['id'];

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: UserData;
      }

      export interface UserData {
        id: string | number;
        info: string | number;
        name: string;
        email: string;
      }
      `,
  },

  // NOTE: if there is a default value on the generic type
  // and you use a indexed access type on the generic type, you need to define the <T>
  'indexed access generic type with default':
  {
    interfaceName: 'DataStore',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataStore {
        data: UserData<number>;
      }

      export interface UserData<T extends string | number = number> {
        email: string;

        id: T;

        info: UserData<T>['id'];

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: UserData;
      }

      export interface UserData {
        id: string | number;
        info: string | number;
        name: string;
        email: string;
      }
      `,
  },
};
