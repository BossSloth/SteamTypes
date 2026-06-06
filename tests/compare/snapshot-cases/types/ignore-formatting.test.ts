import dedent from 'dedent';
import { ComparatorTest, createTest } from '../shared';

export const ignoreFormattingCases: Record<string, ComparatorTest> = {
  'preserves @ignoreFormatting nested conditional type indentation': {
    interfaceName: 'Root',
    expectsNoDiff: true,
    target: dedent/* ts */`
      /** @ignoreFormatting */
      export type Mapped<T> = {
        [K in keyof T]: T[K] extends boolean
          ? 1
          : T[K] extends object
            ? Mapped<T[K]>
            : T[K];
      };

      /** @ignoreFormatting */
      export type Stable = string | number;

      export interface Root {
        value: string;
      }`,
    source: dedent/* ts */`
      export interface Root {
        value: string;
      }`,
  },
  'does not preserves nested conditional type indentation without jsdoc': {
    interfaceName: 'Root',
    target: dedent/* ts */`
      export type Mapped<T> = {
        [K in keyof T]: T[K] extends boolean
          ? 1
          : T[K] extends object
            ? Mapped<T[K]>
            : T[K];
      };

      export type Stable = string | number;

      export interface Root {
        value: string;
      }`,
    source: dedent/* ts */`
      export interface Root {
        value: string;
      }`,
  },
};

createTest('Ignore Formatting', ignoreFormattingCases);
