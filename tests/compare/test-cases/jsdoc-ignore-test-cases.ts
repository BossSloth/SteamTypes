import dedent from 'dedent';
import { ComparatorTest } from './index';

export const jsDocIgnoreCases: Record<string, ComparatorTest> = {
  'ignored property keeps original type': {
    interfaceName: 'WithIgnoredProperty',
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
