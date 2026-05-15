import dedent from 'dedent';
import { ComparatorTest } from './index';

export const enumCases: Record<string, ComparatorTest> = {
  'target enum keeps type when source is plain number': {
    interfaceName: 'EnumProperty',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export enum Status {
        Ready = 1,
        Working = 2,
      }

      export interface EnumProperty {
        status: Status;
      }`,
    source: dedent/* ts */`
      export interface EnumProperty {
        status: number;
      }`,
  },
  'optional imported enum is preserved when source has @currentValue': {
    interfaceName: 'EnumProperty',
    expectsNoDiff: true,
    target: dedent/* ts */`
      import { StoreAppType } from 'other-file';

      export interface EnumProperty {
        m_eAppType?: StoreAppType;
      }`,
    source: dedent/* ts */`
      export interface EnumProperty {
        /**
         * @currentValue 0
         */
        m_eAppType?: number;
      }`,
  },
  'existing enum is used when source has @currentValue': {
    interfaceName: 'EnumProperty',
    target: dedent/* ts */`
      export interface EnumProperty {
        foo: number;

        /**
         * @currentValue 1
         * @currentValue 2
         */
        m_eStatus: number;

        /**
         * @currentValue 1
         * @currentValue 2
         */
        otherThing: EStatus;
      }

      export enum EStatus {
        EStatus1 = 1,
        EStatus2 = 2,
      }
      `,
    source: dedent/* ts */`
      export interface EnumProperty {
        foo: number;
        /**
         * @currentValue 1
         * @currentValue 2
         */
        m_eStatus: number;
        /**
         * @currentValue 1
         * @currentValue 2
         */
        otherThing: number;
      }`,
  },
};
