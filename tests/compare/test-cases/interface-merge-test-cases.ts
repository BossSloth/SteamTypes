import dedent from 'dedent';
import { ComparatorTest } from './index';

export const interfaceMergeCases: Record<string, ComparatorTest> = {
  'manual merge skips unresolved source interface reference': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      import { Imported } from 'somewhere';

      export interface Container {
        items: Item[];
      }

      export interface Item {
        id: number;
        name: string;
      }
      `,
    source: dedent/* ts */`
      import { Imported } from 'somewhere';

      export interface Container {
        items: (Item | Imported)[];
      }

      export interface Item {
        id: number;
        name: string;
      }
      `,
  },

  'adds new interface even when structurally similar to an existing one if source has both': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        existing: Existing;
      }

      export interface Existing {
        a: number;

        b: number;

        c: number;

        d: number;
      }
      `,
    source: dedent/* ts */`
      export interface Container {
        existing: Existing;
        added: NewSimilar;
      }

      export interface Existing {
        a: number;
        b: number;
        c: number;
        d: number;
      }

      export interface NewSimilar {
        a: number;
        b: number;
        c: number;
        d: number;
        e: number;
      }
      `,
  },

  'manual merge falls back when source property type mismatches target': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        items: Item[];
      }

      export interface Item {
        id: number;
        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface Container {
        items: (Item | Item2)[];
      }

      export interface Item {
        id: number;
        name: string;
      }

      export interface Item2 {
        id: string;
        name: string;
      }
      `,
  },
};
