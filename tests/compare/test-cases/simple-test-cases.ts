import dedent from 'dedent';

export const simpleCases = {
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

  'union type with interface': { // TODO: doesn't work
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: string | null;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: DataType | null;
      }

      export interface DataType {
        value: string;
        id: number;
      }`,
  },
};
