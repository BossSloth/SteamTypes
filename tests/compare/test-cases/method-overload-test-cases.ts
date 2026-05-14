import dedent from 'dedent';
import { ComparatorTest } from './index';

export const methodOverloadCases: Record<string, ComparatorTest> = {
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
};
