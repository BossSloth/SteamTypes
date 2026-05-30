import dedent from 'dedent';
import { ComparatorTest, createRenamedTest, createTest } from '../shared';

export const intersectionCases: Record<string, ComparatorTest> = {
  'array intersection types': {
    interfaceName: 'Combined',
    target: dedent/* ts */`
      export interface Combined {
        data: A;
      }

      export interface A {
        propA: string;
      }`,
    source: dedent/* ts */`
      export interface Combined {
        data: (A | B)[];
      }

      export interface A {
        propA: string;
        extraA: boolean;
      }

      export interface B {
        propB: number;
        extraB: Date;
      }`,
  },

  'inverse array intersection types': {
    interfaceName: 'Combined',
    target: dedent/* ts */`
      export interface Combined {
        data: (A | B)[];
      }

      export interface A {
        propA: string;
        extraA: boolean;
      }

      export interface B {
        propB: number;
        extraB: Date;
      }`,
    source: dedent/* ts */`
      export interface Combined {
        data: A;
      }

      export interface A {
        propA: string;
      }`,
  },

  'interface with intersection types': {
    interfaceName: 'EnhancedUser',
    target: dedent/* ts */`
      export interface EnhancedUser {
        user: BaseUser & UserPermissions;
      }

      export interface BaseUser {
        id: number;
        name: string;
      }

      export interface UserPermissions {
        canEdit: boolean;
        canDelete: boolean;
      }`,
    source: dedent/* ts */`
      export interface EnhancedUser {
        user: BaseUser & UserPermissions & UserMetadata;
        isAdmin: boolean;
      }

      export interface BaseUser {
        id: number;
        name: string;
        email: string;
      }

      export interface UserPermissions {
        canEdit: boolean;
        canDelete: boolean;
        canCreate: boolean;
      }

      export interface UserMetadata {
        lastLogin: Date;
        loginCount: number;
      }`,
  },

  'map intersection type': {
    interfaceName: 'Config',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Config {
        map: ObservableMap<'Main', Popup<string>> & ObservableMap<string, Popup>;
      }

      export interface Popup<T extends (number | string) = number> {
        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        map: ObservableMap<string, Popup>;
      }

      export interface Popup {
        id: (number | string);
        name: string;
      }`,
  },

  'map intersection type with mismatch': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        map: ObservableMap<15, Popup<string>> & ObservableMap<string, Popup>;
      }

      export interface Popup<T extends (number | string) = number> {
        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        map: ObservableMap<string, Popup>;
      }

      export interface Popup {
        id: (number | string);
        name: string;
      }`,
  },

  'intersection type vs primitive': {
    interfaceName: 'Foo',
    target: dedent/* ts */`
      export interface Foo {
        value: { a: number; } & { b: string; };
      }`,
    source: dedent/* ts */`
      export interface Foo {
        value: number;
      }`,
  },
};

createTest('Intersections', intersectionCases);

createRenamedTest('Intersection Renames', intersectionCases);
