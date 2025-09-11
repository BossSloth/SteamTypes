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
  'argument added to existing method': {
    interfaceName: 'PopupManager',
    target: dedent/* ts */`
    export interface PopupManager {
       GetHeaderImages(appOverview: { appid: number }): string
    }
  `,
    source: dedent/* ts */`
    export interface PopupManager {
       GetHeaderImages(e: unknown, t: unknown): string
    }
  `,
  },
  'argument removed from existing method': {
    interfaceName: 'PopupManager',
    target: dedent/* ts */`
    export interface PopupManager {
       GetHeaderImages(appOverview: { appid: number }, otherInfo: string): string
    }
  `,
    source: dedent/* ts */`
    export interface PopupManager {
       GetHeaderImages(e: unknown): string
    }
  `,
  },

};
