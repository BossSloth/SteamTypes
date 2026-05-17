import dedent from 'dedent';
import { ComparatorTest } from './index';

export const typeComparatorRecordCases: Record<string, ComparatorTest> = {
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
