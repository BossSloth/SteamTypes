import dedent from 'dedent';
import { ComparatorTest, createTest } from '../shared';

export const recordCases: Record<string, ComparatorTest> = {
  'numeric interface same as record': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Foo {
        values: Record<number, string>;
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        values: Values;
      }

      export interface Values {
        12: string;
        240: string;
        5: string;
      }
    `,
  },

  'string interface same as record': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Foo {
        values: Record<string, string>;
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        values: Values;
      }

      export interface Values {
        'value1': string;
        'value2': string;
        'value3': string;
      }
    `,
  },

  'string interface with normal properties same as record': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Foo {
        values: Record<string, string>;
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        values: Values;
      }

      export interface Values {
        'value1': string;
        'value2': string;
        'value3': string;
        value4: string;
        value5: string;
      }
    `,
  },

  'target record vs source primitive falls through': {
    interfaceName: 'WithRecord',
    target: dedent/* ts */`
      export interface WithRecord {
        data: Record<string, number>;
      }`,
    source: dedent/* ts */`
      export interface WithRecord {
        data: number;
      }`,
  },

  'target record vs source different record': {
    interfaceName: 'WithRecord',
    target: dedent/* ts */`
      export interface WithRecord {
        data: Record<string, number>;
      }`,
    source: dedent/* ts */`
      export interface WithRecord {
        data: Record<string, string>;
      }`,
  },

  'target record vs source type alias falls through': {
    interfaceName: 'WithRecord',
    target: dedent/* ts */`
      export interface WithRecord {
        data: Record<string, number>;
      }`,
    source: dedent/* ts */`
      export type DataMap = { [key: string]: number };

      export interface WithRecord {
        data: DataMap;
      }`,
  },
  // TODO: This case might be wrong as it should see that not every property of NumberMap fits the record
  'target record matches source interface with method member': {
    interfaceName: 'Container',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Container {
        data: Record<string, number>;
      }`,
    source: dedent/* ts */`
      export interface NumberMap {
        a: number;

        compute(): void;
      }

      export interface Container {
        data: NumberMap;
      }`,
  },

  'target record with numeric keys matches numeric-keyed interface': {
    interfaceName: 'Container',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Container {
        data: Record<number, string>;
      }`,
    source: dedent/* ts */`
      export interface NumberMap {
        1: string;

        2: string;
      }

      export interface Container {
        data: NumberMap;
      }`,
  },
};

createTest('Record Types', recordCases);
