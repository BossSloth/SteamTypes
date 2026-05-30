import dedent from 'dedent';
import { ComparatorTest, createTest } from '../shared';

export const collectionCases: Record<string, ComparatorTest> = {
  'observable map': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface Container {
        data: ObservableMap<string, number>;
      }`,
    source: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface Container {
        data: ObservableMap<string, boolean>;
      }`,
  },

  'observable set': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      import { ObservableSet } from 'mobx';

      export interface Container {
        data: ObservableSet<number>;
      }`,
    source: dedent/* ts */`
      import { ObservableSet } from 'mobx';

      export interface Container {
        data: ObservableSet<boolean>;
      }`,
  },

  'set type different': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: Set<number>;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: Set<boolean>;
      }`,
  },

  'map type different': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: Map<string, number>;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: Map<string, boolean>;
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

  'interface with different ObservableMap type in an intersection': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface Container {
        data: number | ObservableMap<string, number>;
      }
      `,
    source: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface Container {
        data: number | ObservableMap<string, boolean>;
      }`,
  },

  'mismatching ObservableMap': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface Container {
        data: ObservableMap<string, number>;
      }`,
    source: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface Container {
        data: ObservableMap<string, boolean>;
      }`,
  },

  'array type to never type': {
    interfaceName: 'DataContainer',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataContainer {
        items: Item[];
      }

      export interface Item {
        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataContainer {
        items: never;
      }`,
  },

  'array type to unknown array': {
    interfaceName: 'DataCollection',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataCollection {
        items: string[];
      }
      `,
    source: dedent/* ts */`
      export interface DataCollection {
        items: unknown[];
      }`,
  },

  'external array type': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      import { Values } from './values';

      export interface Foo {
        values: Values[];
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        values: ((Values | Values2)[] | Values[]);
      }

      export interface Values {
        foo: string;
        bar: string;
        baz: string;
      }

      export interface Values2 {
        foo: string;
        baz: string;
      }
    `,
  },
};

createTest('Collections', collectionCases);
