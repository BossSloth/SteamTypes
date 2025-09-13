import dedent from 'dedent';
import { ComparatorTest } from './index';

export const methodsCases: Record<string, ComparatorTest> = {
  'external type accessed parameters': {
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
  'parameter added to existing method': {
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
  'parameter removed from existing method': {
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
  'parameter is typed array': {
    interfaceName: 'PopupManager',
    expectsNoDiff: true,
    target: dedent/* ts */`
    export interface PopupManager {
      GetOptions(options: string[]): string
    }
  `,
    source: dedent/* ts */`
    export interface PopupManager {
      GetOptions(e: unknown[]): string
    }
  `,
  },
  'parameter becomes optional': {
    interfaceName: 'PopupManager',
    target: dedent/* ts */`
    export interface PopupManager {
      GetOptions(options: string): string
    }
  `,
    source: dedent/* ts */`
    export interface PopupManager {
      GetOptions(e?: unknown): string
    }
  `,
  },
  'parameter has default null but is also string': {
    interfaceName: 'PopupManager',
    expectsNoDiff: true,
    target: dedent/* ts */`
    export interface PopupManager {
      GetOptions(options?: string | null): string
    }
  `,
    source: dedent/* ts */`
    export interface PopupManager {
      GetOptions(e?: null): string
    }
  `,
  },
  'parameter typed as enum number': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
    export interface Foo {
      GetOptions(options: EOptions): string
    }

    export enum EOptions {
      Option1,
      Option2,
    }
  `,
    source: dedent/* ts */`
    export interface Foo {
      GetOptions(e: number): string
    }
  `,
  },
  'parameter typed as enum string': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
    export interface Foo {
      GetOptions(options: EOptions): string
    }

    export enum EOptions {
      Option1 = 'Option1',
      Option2 = 'Option2',
    }
  `,
    source: dedent/* ts */`
    export interface Foo {
      GetOptions(e: string): string
    }
  `,
  },
  'parameter mismatch typed as enum': {
    interfaceName: 'Foo',
    target: dedent/* ts */`
    export interface Foo {
      GetOptions(options: EOptions): string
    }

    export enum EOptions {
      Option1,
      Option2,
    }
  `,
    source: dedent/* ts */`
    export interface Foo {
      GetOptions(e: string): string
    }
  `,
  },

  'parameter is generated spread in source, but target is just array': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
    export interface Foo {
      GetOptions(options: string[]): string
    }
  `,
    source: dedent/* ts */`
    export interface Foo {
      GetOptions(...e: unknown[]): string
    }
  `,
  },

  'parameter is generated spread in source, but target is just a type': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
    export interface Foo {
      GetOptions(options: string): string
    }
  `,
    source: dedent/* ts */`
    export interface Foo {
      GetOptions(...e: unknown[]): string
    }
  `,
  },

  'parameter is generated spread in source, but target has multiple parameters': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
    export interface Foo {
      GetOptions(options: number, otherInfo: string): string
    }
  `,
    source: dedent/* ts */`
    export interface Foo {
      GetOptions(...e: unknown[]): string
    }
  `,
  },
};
