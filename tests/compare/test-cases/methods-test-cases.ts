import dedent from 'dedent';
import { ComparatorTest } from './index';

export const methodsCases: Record<string, ComparatorTest> = {
  'external type accessed arguments': {
    interfaceName: 'EventHandler',
    expectsNoDiff: true,
    target: dedent/* ts */`
    export type EventArgs = [type: string, payload: unknown, timestamp: number];

    export interface EventHandler {
      notify(...args: EventArgs): void;
    }
  `,
    source: dedent/* ts */`
    export interface EventHandler {
      notify(e: unknown, t: unknown, n: number): void;
    }
  `,
  },

};
