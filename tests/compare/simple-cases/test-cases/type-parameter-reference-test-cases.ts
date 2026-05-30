import dedent from 'dedent';
import { ComparatorTest } from './index';

export const typeParameterReferenceCases: Record<string, ComparatorTest> = {
  'generic argument referencing type parameter is preserved': {
    interfaceName: 'Wrapper',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Box<U> {
        value: U;
      }

      export interface Wrapper<T> {
        boxed: Box<T>;
      }`,
    source: dedent/* ts */`
      export interface Box<U> {
        value: U;
      }

      export interface Wrapper<T> {
        boxed: Box<string>;
      }`,
  },
};
