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
};
