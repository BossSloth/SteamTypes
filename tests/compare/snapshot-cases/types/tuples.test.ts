import dedent from 'dedent';
import { ComparatorTest, createTest } from '../shared';

export const tupleCases: Record<string, ComparatorTest> = {
  'tuple types': {
    interfaceName: 'CoordinateSystem',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface CoordinateSystem {
        point: [number, number];
      }`,
    source: dedent/* ts */`
      export interface CoordinateSystem {
        point: number[];
      }`,
  },

  'mixed tuple types': {
    interfaceName: 'CoordinateSystem',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface CoordinateSystem {
        point: [number, string];
      }`,
    source: dedent/* ts */`
      export interface CoordinateSystem {
        point: (number | string)[];
      }`,
  },

  'mixed missing tuple types': {
    interfaceName: 'CoordinateSystem',
    target: dedent/* ts */`
      export interface CoordinateSystem {
        point: [number, number];
      }`,
    source: dedent/* ts */`
      export interface CoordinateSystem {
        point: (number | string)[];
      }`,
  },

  'tuple types with optional elements': {
    interfaceName: 'ParameterConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface ParameterConfig {
        options: [number, boolean, string, string];
      }`,
    source: dedent/* ts */`
      export interface ParameterConfig {
        options: (string | number | boolean)[];
      }`,
  },

  'simple tuple type': {
    interfaceName: 'CoordinateSystem',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface CoordinateSystem {
        point: [number, number];
      }`,
    source: dedent/* ts */`
      export interface CoordinateSystem {
        point: number[];
      }`,
  },

  'interface with tuple type': {
    interfaceName: 'TupleContainer',
    target: dedent/* ts */`
      export interface TupleContainer {
        coordinates: [number, number];
      }`,
    source: dedent/* ts */`
      export interface TupleContainer {
        coordinates: [number, boolean, number];
        labels: [string, string];
      }`,
  },
};

createTest('Tuples', tupleCases);
