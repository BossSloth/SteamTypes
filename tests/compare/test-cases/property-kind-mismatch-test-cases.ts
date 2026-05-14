import dedent from 'dedent';
import { ComparatorTest } from './index';

export const propertyKindMismatchCases: Record<string, ComparatorTest> = {
  'method becomes property when source switches kind': {
    interfaceName: 'KindMismatch',
    target: dedent/* ts */`
      export interface KindMismatch {
        item(): string;
      }`,
    source: dedent/* ts */`
      export interface KindMismatch {
        item: string;
      }`,
  },

  'property becomes method when source switches kind': {
    interfaceName: 'KindMismatch',
    target: dedent/* ts */`
      export interface KindMismatch {
        item: string;
      }`,
    source: dedent/* ts */`
      export interface KindMismatch {
        item(): string;
      }`,
  },
};
