import dedent from 'dedent';
import { ComparatorTest, createTest } from '../shared';

export const ignoreFormattingCases: Record<string, ComparatorTest> = {
  'reports formatter errors for malformed TypeScript': {
    interfaceName: 'Root',
    expectedException: 'Failed to format target.ts: Unexpected token',
    target: dedent /* ts */ `
      type Broken = string | | number;

      export interface Root {
        value: string;
      }`,
    source: dedent /* ts */ `
      export interface Root {
        value: string;
      }`,
  },
  'preserves @ignoreFormatting nested conditional type indentation': {
    interfaceName: 'Root',
    expectsNoDiff: true,
    target: dedent /* ts */ `
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
    source: dedent /* ts */ `
      export interface Root {
        value: string;
      }`,
  },
  'formats nested conditional types without @ignoreFormatting': {
    interfaceName: 'Root',
    target: dedent /* ts */ `
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
    source: dedent /* ts */ `
      export interface Root {
        value: string;
      }`,
  },
  'preserves explicitly unformatted declarations': {
    interfaceName: 'Root',
    expectsNoDiff: true,
    target: dedent /* ts */ `
      /** @ignoreFormatting */
      export type Stable = {value:string;other:number};

      /** @ignoreFormatting */
      export interface Root {
        value:string;
      }`,
    source: dedent /* ts */ `
      export interface Root {
        value: string;
      }`,
  },
  'keeps structural edits inside @ignoreFormatting interfaces': {
    interfaceName: 'Root',
    target: dedent /* ts */ `
      /** @ignoreFormatting */
      export interface Root {
        value:string;
      }`,
    source: dedent /* ts */ `
      export interface Root {
        value: number;
      }`,
  },
};

createTest('Ignore Formatting', ignoreFormattingCases);
