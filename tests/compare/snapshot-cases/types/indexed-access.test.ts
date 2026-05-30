import dedent from 'dedent';
import { ComparatorTest, createRenamedTest, createTest } from '../shared';

export const indexedAccessCases: Record<string, ComparatorTest> = {
  'interface with indexed access types': {
    interfaceName: 'UserProfile',
    target: dedent/* ts */`
      export interface UserProfile {
        preferences: User['settings'];
        user: User;
      }

      export interface User {
        id: number;
        name: string;
        settings: Settings;
      }

      export interface Settings {
        notifications: boolean;

        theme: string;
      }
      `,
    source: dedent/* ts */`
      export interface UserProfile {
        user: User;
        preferences: Settings;
        theme: string;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
        settings: Settings;
      }

      export interface Settings {
        theme: string;
        notifications: boolean;
        language: string;
      }
      `,
  },

  'normal indexed access type': {
    interfaceName: 'UserProfile',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface UserProfile {
        preferences: User['email'];

        theme: User['settings']['notifications'];

        user: User;
      }

      export interface User {
        email: string;

        id: number;

        name: string;

        settings: Settings;
      }

      export interface Settings {
        theme: string;

        notifications: boolean;

        language: string;
      }
      `,
    source: dedent/* ts */`
      export interface UserProfile {
        user: User;
        preferences: string;
        theme: boolean;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
        settings: Settings;
      }

      export interface Settings {
        theme: string;
        notifications: boolean;
        language: string;
      }
      `,
  },

  // TODO: maybe make it so the indexed access type is not removed by checking at the end if the type is the same
  'indexed access type mismatch': {
    interfaceName: 'UserProfile',
    target: dedent/* ts */`
      export interface UserProfile {
        preferences: User['email'];

        theme: User['settings']['notifications'];

        user: User;
      }

      export interface User {
        email: number;

        id: number;

        name: string;

        settings: Settings;
      }

      export interface Settings {
        language: string;

        notifications: string;

        theme: string;
      }
      `,
    source: dedent/* ts */`
      export interface UserProfile {
        user: User;
        preferences: string;
        theme: boolean;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
        settings: Settings;
      }

      export interface Settings {
        theme: string;
        notifications: boolean;
        language: string;
      }
      `,
  },

  'indexed access interface type': {
    interfaceName: 'UserProfile',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface UserProfile {
        theme: User['settings'];

        user: User;
      }

      export interface User {
        email: string;

        id: number;

        name: string;

        settings: Settings;
      }

      export interface Settings {
        language: string;

        notifications: string;

        theme: string;
      }
      `,
    source: dedent/* ts */`
      export interface UserProfile {
        user: User;
        theme: Settings;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
        settings: Settings;
      }

      export interface Settings {
        theme: string;
        notifications: string;
        language: string;
      }
      `,
  },

  'indexed access interface type with mismatch': {
    interfaceName: 'UserProfile',
    target: dedent/* ts */`
      export interface UserProfile {
        theme: User['info'];

        user: User;
      }

      export interface User {
        email: string;

        id: number;

        info: Info;

        name: string;

        settings: Settings;

      }

      export interface Settings {
        language: string;

        notifications: string;

        theme: string;
      }

      export interface Info {
        bar: number;

        foo: boolean;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface UserProfile {
        user: User;
        theme: Settings;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
        settings: Settings;
        info: Info;
      }

      export interface Settings {
        theme: string;
        notifications: string;
        language: string;
      }

      export interface Info {
        name: string;
        foo: boolean;
        bar: number;
      }
      `,
  },

  'indexed access on external generic type': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      import { Foo } from './bar';
      import { Callbacks } from './types';

      export interface Foo {
        bar: Callbacks<(arg: string) => void>;

        preferences: Foo['bar'];
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        bar: ElementChanged;

        preferences: ElementChanged;
      }

      export interface ElementChanged {
        ref: unknown;

        foo: boolean;
      }
    `,
  },
};

createTest('Indexed Access', indexedAccessCases);

createRenamedTest('Indexed Access Renames', indexedAccessCases);
