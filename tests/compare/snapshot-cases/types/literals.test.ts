import dedent from 'dedent';
import { ComparatorTest, createTest } from '../shared';

export const literalCases: Record<string, ComparatorTest> = {
  'string literal': {
    interfaceName: 'SimpleInterface',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: 'a';
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
  },

  'number literal': {
    interfaceName: 'SimpleInterface',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: 1;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },

  'mismatching literal string, number': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: 'a';
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },

  'mismatching literal number, string': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: 5;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
  },

  'typeof literal string': {
    interfaceName: 'SimpleInterface',
    expectsNoDiff: true,
    target: dedent/* ts */`
      const text = 'a';

      export interface SimpleInterface {
        existingProp: typeof text;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
  },

  'mismatching typeof literal string': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      const text = 'a';

      export interface SimpleInterface {
        existingProp: typeof text;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },

  'typeof literal number': {
    interfaceName: 'SimpleInterface',
    expectsNoDiff: true,
    target: dedent/* ts */`
      const num = 5;

      export interface SimpleInterface {
        existingProp: typeof num;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },

  'mismatching typeof literal number': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      const num = 'a';

      export interface SimpleInterface {
        existingProp: typeof num;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },

  'external template literal types': {
    interfaceName: 'RouteConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export type HttpMethod = 'GET' | 'POST';
      export type ResourceType = 4 | 5;

      export interface RouteConfig {
        method: HttpMethod;

        path: string;

        type: ResourceType;
      }`,
    source: dedent/* ts */`
      export interface RouteConfig {
        method: string;

        path: string;

        type: number;
      }`,
  },

  'template literal types': {
    interfaceName: 'RouteConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface RouteConfig {
        method: 'GET' | 'POST';

        path: string;

        type: 4 | 5;
      }`,
    source: dedent/* ts */`
      export interface RouteConfig {
        method: string;
        path: string;
        type: number;
      }`,
  },

  'external template literal types with missing type': {
    interfaceName: 'RouteConfig',
    target: dedent/* ts */`
      export type HttpMethod = 'GET' | 'POST';
      export type ResourceType = 4 | 5;

      export interface RouteConfig {
        method: HttpMethod;
        path: string;
        type: ResourceType;
      }`,
    source: dedent/* ts */`
      export interface RouteConfig {
        method: number;
        path: string;
        type: number;
      }`,
  },

  'template literal types with missing type': {
    interfaceName: 'RouteConfig',
    target: dedent/* ts */`
      export interface RouteConfig {
        method: 'GET' | 'POST';
        path: string;
        type: 4 | 5;
      }`,
    source: dedent/* ts */`
      export interface RouteConfig {
        method: number;
        path: string;
        type: number;
      }`,
  },
};

createTest('Literals', literalCases);
