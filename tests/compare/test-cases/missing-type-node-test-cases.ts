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
  'source property missing type annotation does not change target': {
    interfaceName: 'PartiallyTyped',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface PartiallyTyped {
        untyped: number;
      }`,
    source: dedent/* ts */`
      export interface PartiallyTyped {
        untyped;
      }`,
  },
};
