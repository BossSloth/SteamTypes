import dedent from 'dedent';
import { ComparatorTest } from './index';

export const heritageClauseCases: Record<string, ComparatorTest> = {
  'extends clause added to target when source extends a known base': {
    interfaceName: 'Admin',
    target: dedent/* ts */`
      export interface User {
        id: number;
        name: string;
      }

      export interface Admin {
        permissions: string[];
      }`,
    source: dedent/* ts */`
      export interface User {
        id: number;
        name: string;
      }

      export interface Admin extends User {
        permissions: string[];
      }`,
  },

  'matching extends clause with generics is not re-added': {
    interfaceName: 'Admin',
    target: dedent/* ts */`
      export interface User<T> {
        id: T;
        name: string;
      }

      export interface Admin extends User<number> {
        permissions: string[];
      }`,
    source: dedent/* ts */`
      export interface User<T> {
        id: T;
        name: string;
      }

      export interface Admin extends User<number> {
        permissions: string[];
      }`,
  },
};
