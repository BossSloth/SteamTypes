import dedent from 'dedent';
import { ComparatorTest, createRenamedTest, createTest } from '../shared';

export const objectTypesCases: Record<string, ComparatorTest> = {
  'simple object type': {
    interfaceName: 'SimpleInterface',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: {
          prop1: string;

          prop2: number;
        };
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: {
          prop1: string;
          prop2: unknown;
        };
      }`,
  },

  'object type removed member': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: {
          prop1: string;
          prop2: unknown;
        };
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: {
          prop1: string;
        };
      }`,
  },

  'object type added member': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: {
          prop1: string;
        };
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: {
          prop1: string;
          prop2: unknown;
        };
      }`,
  },

  'interface with complex property types': {
    interfaceName: 'ComplexData',
    target: dedent/* ts */`
      export interface ComplexData {
        simpleArray: string[];
        record: Record<string, number>;
      }`,
    source: dedent/* ts */`
      export interface ComplexData {
        simpleArray: string[];
        record: Record<string, number>;
        nestedArray: Array<Array<string>>;
        complexMap: Map<string, Set<number>>;
      }`,
  },

  'interface with complex nested structures': {
    interfaceName: 'AppConfig',
    target: dedent/* ts */`
      export interface AppConfig {
        api: ApiConfig;
        ui: UiConfig;
      }

      export interface ApiConfig {
        baseUrl: string;
        timeout: number;
      }

      export interface UiConfig {
        theme: string;
      }`,
    source: dedent/* ts */`
      export interface AppConfig {
        api: ApiConfig;
        ui: UiConfig;
        features: Record<string, boolean>;
      }

      export interface ApiConfig {
        baseUrl: string;
        timeout: number;
        headers: Record<string, string>;
        endpoints: Record<string, EndpointConfig>;
      }

      export interface EndpointConfig {
        method: string;
        path: string;
        requiresAuth: boolean;
      }

      export interface UiConfig {
        theme: string;
        layout: 'vertical' | 'horizontal';
        animations: boolean;
        components: ComponentsConfig;
      }

      export interface ComponentsConfig {
        button: ButtonConfig;
        input: InputConfig;
      }

      export interface ButtonConfig {
        borderRadius: number;
        fontSize: number;
      }

      export interface InputConfig {
        borderRadius: number;
        padding: number;
      }`,
  },
};

createTest('Object Types', objectTypesCases);

createRenamedTest('Object Type Renames', objectTypesCases);
