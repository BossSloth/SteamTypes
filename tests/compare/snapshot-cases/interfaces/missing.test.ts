import dedent from 'dedent';
import { ComparatorTest, createTest } from '../shared';

export const missingCases: Record<string, ComparatorTest> = {
  'missing interface multiple times': {
    interfaceName: 'AppData',
    target: dedent/* ts */`
      export interface AppData {
        appInfo: string;
      }
      `,
    source: dedent/* ts */`
      export interface AppData {
        appInfo: string;
        associationData: AssociationData;
      }

      export interface AssociationData {
        rgDevelopers: RgDevelopers[];
        rgFranchises: RgDevelopers[];
        rgPublishers: RgDevelopers[];
      }

      export interface RgDevelopers {
        id: number;
        name: string;
      }
      `,
  },

  'does not delete extended extra JsPbMessage': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Foo {
        bar: string;
      }

      export interface OtherMessage extends JsPbMessage {
        data(): string;
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        bar: string;
      }
    `,
  },

  'does not delete interface that is only extended': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Foo {
        bar: string;

        info: InfoData;
      }

      export interface BaseInfo {
        id: number;
      }

      export interface InfoData extends BaseInfo {
        name: string;
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        bar: string;

        info: InfoData;
      }

      export interface InfoData {
        id: number;
        name: string;
      }
    `,
  },

  'imported renamed enum': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      import { EControllerStatus } from './enums';

      export interface Foo {
        bar: string;

        EControllerPreference: EControllerStatus;
      }
    `,
    source: dedent/* ts */`
      export interface Foo {
        bar: string;

        /** @currentValue 0 */
        EControllerPreference: number;
      }
    `,
  },

  'interface with nullable imported type': {
    interfaceName: 'ImportedContainer',
    expectsNoDiff: true,
    target: dedent/* ts */`
      import { DataType } from './some-module';

      export interface ImportedContainer {
        data: DataType | null;
      }`,
    source: dedent/* ts */`
      export interface ImportedContainer {
        data: LocalType | null;
      }

      export interface LocalType {
        id: string;
        value: number;
      }`,
  },

  'multiple imported interface renamed': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      import { DataType } from './some-module';

      export interface Foo {
        data: DataType;

        otherValue: DataType;
      }`,
    source: dedent/* ts */`
      export interface Foo {
        data: LocalType;

        otherValue: LocalType;
      }

      export interface LocalType {
        id: string;
        value: number;
      }`,
  },

  'target property missing type annotation is filled in from source': {
    interfaceName: 'PartiallyTyped',
    target: dedent/* ts */`
      export interface PartiallyTyped {
        untyped;
        typed: number;
      }`,
    source: dedent/* ts */`
      export interface PartiallyTyped {
        untyped: string;
        typed: number;
      }`,
  },
  'source property missing type annotation does not change target': {
    interfaceName: 'PartiallyTyped',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface PartiallyTyped {
        untyped: number;
      }`,
    source: dedent/* ts */`
      export interface PartiallyTyped {
        untyped;
      }`,
  },
};

createTest('Missing Interfaces', missingCases);
