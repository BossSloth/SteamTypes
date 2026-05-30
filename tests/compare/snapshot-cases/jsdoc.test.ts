import dedent from 'dedent';
import { ComparatorTest, createTest } from './shared';

export const jsDocCases: Record<string, ComparatorTest> = {
  'interface with JSDoc comments': {
    interfaceName: 'DocumentedInterface',
    target: dedent/* ts */`
      /**
       * A documented interface
       */
      export interface DocumentedInterface {
        /** The ID of the entity */
        id: number;
      }`,
    source: dedent/* ts */`
      /**
       * A documented interface
       * @description This is a more detailed description
       */
      export interface DocumentedInterface {
        /** The ID of the entity */
        id: number;
        /**
         * The name of the entity
         * @example "Example Name"
         */
        name: string;
      }`,
  },
  'ignored property keeps original type': {
    interfaceName: 'WithIgnoredProperty',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface WithIgnoredProperty {
        /** @ignore */
        legacyField: string;

        normalField: number;
      }`,
    source: dedent/* ts */`
      export interface WithIgnoredProperty {
        legacyField: number;
        normalField: number;
      }`,
  },

  'ignored method keeps original signature': {
    interfaceName: 'WithIgnoredMethod',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface WithIgnoredMethod {
        /** @ignore */
        legacyMethod(input: string): boolean;

        normalMethod(): void;
      }`,
    source: dedent/* ts */`
      export interface WithIgnoredMethod {
        legacyMethod(other: number): number;
        normalMethod(): void;
      }`,
  },

  'native method keeps original signature': {
    interfaceName: 'WithNativeMethod',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface WithNativeMethod {
        nativeMethod(typed: string): boolean;
      }`,
    source: dedent/* ts */`
      export interface WithNativeMethod {
        /** @native */
        nativeMethod(unknown: number): number;
      }`,
  },

};

createTest('JSDoc', jsDocCases);
