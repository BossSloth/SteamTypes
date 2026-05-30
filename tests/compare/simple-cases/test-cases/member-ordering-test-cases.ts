import dedent from 'dedent';
import { ComparatorTest } from './index';

export const memberOrderingCases: Record<string, ComparatorTest> = {
  'quoted property names should be ordered correctly': {
    interfaceName: 'TestInterface',
    target: dedent/* ts */`
      export interface TestInterface {
        zebra: string;

        'alpha': number;

        'beta': boolean;

        charlie: string;
      }`,
    source: dedent/* ts */`
      export interface TestInterface {
        zebra: string;
        'alpha': number;
        'beta': boolean;
        charlie: string;
        'delta': number;
      }`,
  },

  'mixed quoted and unquoted properties': {
    interfaceName: 'MixedInterface',
    target: dedent/* ts */`
      export interface MixedInterface {
        'a': number;

        b: boolean;

        c: string;
      }`,
    source: dedent/* ts */`
      export interface MixedInterface {
        'a': number;
        b: boolean;
        c: string;
        'd': string;
      }`,
  },

  'quoted property with hyphen': {
    interfaceName: 'HyphenInterface',
    target: dedent/* ts */`
      export interface HyphenInterface {
        zProp: string;

        'a-prop': number;

        mProp: boolean;
      }`,
    source: dedent/* ts */`
      export interface HyphenInterface {
        zProp: string;
        'a-prop': number;
        mProp: boolean;
        'b-prop': string;
      }`,
  },
  'interface with @dontSort preserves member order': {
    interfaceName: 'UnorderedInterface',
    target: dedent/* ts */`
      /** @dontSort */
      export interface UnorderedInterface {
        zebra: string;

        alpha: number;

        methodB(): void;

        methodA(): boolean;
      }`,
    source: dedent/* ts */`
      /** @dontSort */
      export interface UnorderedInterface {
        zebra: string;

        alpha: number;

        methodB(): void;

        methodA(): boolean;

        foo: string;
      }`,
  },

  'interface without @dontSort reorders members': {
    interfaceName: 'OrderedInterface',
    target: dedent/* ts */`
      export interface OrderedInterface {
        zebra: string;

        alpha: number;

        methodB(): void;

        methodA(): boolean;
      }`,
    source: dedent/* ts */`
      export interface OrderedInterface {
        zebra: string;

        alpha: number;

        methodB(): void;

        methodA(): boolean;

        foo: string;
      }`,
  },

  'method overloads preserve order when members are added': {
    interfaceName: 'OverloadedApi',
    target: dedent/* ts */`
      export interface OverloadedApi {
        Lookup(id: number): string;
        Lookup(id: string): number;
      }`,
    source: dedent/* ts */`
      export interface OverloadedApi {
        Lookup(id: number): string;
        Lookup(id: string): number;
        NewMethod(): void;
      }`,
  },

  'member ordering with numerics': {
    interfaceName: 'Names',
    target: dedent/* ts */`
      export interface Names {
        switch_pro: string;
      }`,
    source: dedent/* ts */`
      export interface Names {
        switch_pro: string;
        switch2_pro: string;
      }`,
  },

  'member ordering with trailing numerics': {
    interfaceName: 'Servers',
    target: dedent/* ts */`
      export interface Servers {
        ping_250: string;

        ping_500: string;

        ping_1000: string;
      }`,
    source: dedent/* ts */`
      export interface Servers {
        ping_250: string;

        ping_500: string;

        ping_750: string;

        ping_1000: string;
      }`,
  },
};
