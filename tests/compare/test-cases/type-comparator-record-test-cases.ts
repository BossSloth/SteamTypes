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
};
