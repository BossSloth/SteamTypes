import dedent from 'dedent';
import { ComparatorTest } from '.';

export const simpleCases: Record<string, ComparatorTest> = {
  'simple add missing property': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
        newProp: number;
      }`,
  },
  'simple remove property': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
        newProp: number;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
  },
  'simple type mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },
  'simple union type mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number | string;
      }`,
  },
  'simple array type mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string[];
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number[];
      }`,
  },
  'simple set type mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: Set<string>;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: Set<number>;
      }`,
  },
  'simple string, array mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string[];
      }`,
  },
  'simple number, set mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: Set<number>;
      }`,
  },
};
