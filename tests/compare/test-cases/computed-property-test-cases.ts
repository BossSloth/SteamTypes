import dedent from 'dedent';
import { ComparatorTest } from './index';

export const computedPropertyCases: Record<string, ComparatorTest> = {
  'computed property name preserved when enum resolves to same key': {
    interfaceName: 'NotificationTargets',
    expectsNoDiff: true,
    target: dedent/* ts */`
      enum SomeEnum {
        Value = 1,
      }

      export interface NotificationTargets {
        [SomeEnum.Value]: ChildA;

        2: ChildB;
      }

      export interface ChildA {
        name: string;
      }

      export interface ChildB {
        id: number;
      }`,
    source: dedent/* ts */`
      export interface NotificationTargets {
        1: ChildA;

        2: ChildB;
      }

      export interface ChildA {
        name: string;
      }

      export interface ChildB {
        id: number;
      }`,
  },

  'computed property that changed type': {
    interfaceName: 'NotificationTargets',
    target: dedent/* ts */`
      enum SomeEnum {
        Value = 1,
      }

      export interface NotificationTargets {
        [SomeEnum.Value]: string;

        2: ChildB;
      }

      export interface ChildB {
        id: number;
      }`,
    source: dedent/* ts */`
      export interface NotificationTargets {
        1: ChildA;

        2: ChildB;
      }

      export interface ChildA {
        name: string;
      }

      export interface ChildB {
        id: number;
      }`,
  },

  'computed property name preserved with type correction': {
    interfaceName: 'NotificationTargets',
    target: dedent/* ts */`
      enum SomeEnum {
        Value = 1,
      }

      export interface NotificationTargets {
        [SomeEnum.Value]: ChildA;

        2: ChildB;
      }

      export interface ChildA {
        name: string;
      }

      export interface ChildB {
        id: number;
      }`,
    source: dedent/* ts */`
      export interface NotificationTargets {
        1: ChildA;

        2: ChildB;
      }

      export interface ChildA {
        name: string;
        age: number;
      }

      export interface ChildB {
        id: number;
      }`,
  },

  'multiple computed property names preserved': {
    interfaceName: 'Config',
    expectsNoDiff: true,
    target: dedent/* ts */`
      enum EnumA {
        First = 1,
      }

      enum EnumB {
        Second = 2,
      }

      export interface Config {
        [EnumA.First]: TypeA;

        [EnumB.Second]: TypeB;

        3: TypeC;
      }

      export interface TypeA {
        foo: string;
      }

      export interface TypeB {
        bar: number;
      }

      export interface TypeC {
        baz: boolean;
      }`,
    source: dedent/* ts */`
      export interface Config {
        1: TypeA;

        2: TypeB;

        3: TypeC;
      }

      export interface TypeA {
        foo: string;
      }

      export interface TypeB {
        bar: number;
      }

      export interface TypeC {
        baz: boolean;
      }`,
  },

  'computed property with additional property': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      enum EnumA {
        First = 1,
      }

      enum EnumB {
        Second = 2,
      }

      export interface Config {
        [EnumA.First]: TypeA;

        [EnumB.Second]: TypeB;

        3: TypeC;
      }

      export interface TypeA {
        foo: string;
      }

      export interface TypeB {
        bar: number;
      }

      export interface TypeC {
        baz: boolean;
      }`,
    source: dedent/* ts */`
      export interface Config {
        1: TypeA;

        2: TypeB;

        3: TypeC;

        4: TypeD;
      }

      export interface TypeA {
        foo: string;
      }

      export interface TypeB {
        bar: number;
      }

      export interface TypeC {
        baz: boolean;
      }

      export interface TypeD {
        qux: string;
      }`,
  },

  'compareOriginalName matches interface by tag': {
    interfaceName: 'Parent',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Parent {
        1: ProtoChild;

        2: GenericChild;
      }

      export interface ProtoChild {
        proto: SomeType;

        eFeature: number;

        sound: number;
      }

      /** @compareOriginalName InvalidName */
      export interface GenericChild {
        eFeature: number;

        sound: number;
      }`,
    source: dedent/* ts */`
      export interface Parent {
        1: ProtoChild;

        2: InvalidName;
      }

      export interface ProtoChild {
        proto: SomeType;

        eFeature: number;

        sound: number;
      }

      export interface InvalidName {
        eFeature: number;

        sound: number;
      }`,
  },

  'compareOriginalName preferred over similarity matching': {
    interfaceName: 'Parent',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Parent {
        1: HighSimilarity;

        2: LowSimilarity;
      }

      export interface HighSimilarity {
        proto: SomeType;

        eFeature: number;

        sound: number;

        strTest: string;

        showToast: boolean;
      }

      /** @compareOriginalName InvalidName */
      export interface LowSimilarity {
        eFeature: number;

        showToast?: boolean;

        sound?: number;

        strTest: string;
      }`,
    source: dedent/* ts */`
      export interface Parent {
        1: HighSimilarity;

        2: InvalidName;
      }

      export interface HighSimilarity {
        proto: SomeType;

        eFeature: number;

        sound: number;

        strTest: string;

        showToast: boolean;
      }

      export interface InvalidName {
        eFeature: number;

        sound: number;

        strTest: string;

        showToast: boolean;
      }`,
  },

  'compareOriginalName with property changes': {
    interfaceName: 'Parent',
    target: dedent/* ts */`
      export interface Parent {
        1: Child;
      }

      /** @compareOriginalName InvalidName */
      export interface Child {
        name: string;
      }`,
    source: dedent/* ts */`
      export interface Parent {
        1: InvalidName;
      }

      export interface InvalidName {
        name: string;
        age: number;
      }`,
  },
};
