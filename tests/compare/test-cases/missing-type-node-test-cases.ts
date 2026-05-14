import dedent from 'dedent';
import { ComparatorTest } from './index';

export const missingTypeNodeCases: Record<string, ComparatorTest> = {
  'target property missing type annotation is filled in from source': {
    interfaceName: 'PartiallyTyped',
    target: dedent/* ts */`
      export interface PartiallyTyped {
        untyped;
        typed: number;
      }`,
    source: dedent/* ts */`
      export interface PartiallyTyped {
        untyped: string;
        typed: number;
      }`,
  },
};
