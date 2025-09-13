import dedent from 'dedent';
import { ComparatorTest } from './index';

export const genericsCases: Record<string, ComparatorTest> = {
  'generic interface type in map': {
    interfaceName: 'DataStore',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataStore {
        data: Map<string, UserData<number>>;
      }

      export interface UserData<T extends number> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: Map<string, UserData>;
      }

      export interface UserData {
        id: number;
        name: string;
        email: string;
      }
      `,
  },

  'generic interface type in map mismatch - data': {
    interfaceName: 'DataStore',
    target: dedent/* ts */`
      export interface DataStore {
        data: Map<string, number>;
      }

      export interface UserData<T extends number> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: Map<string, UserData>;
      }

      export interface UserData {
        id: number;
        name: string;
        email: string;
      }
      `,
  },

  'generic interface type in map mismatch - id': {
    interfaceName: 'DataStore',
    target: dedent/* ts */`
      export interface DataStore {
        data: Map<string, UserData<number>>;
      }

      export interface UserData<T extends string> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: Map<string, UserData>;
      }

      export interface UserData {
        id: number;
        name: string;
        email: string;
      }
      `,
  },

  'simple generic': {
    interfaceName: 'DataStore',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataStore {
        data: UserData<number>;
      }

      export interface UserData<T extends number> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: UserData;
      }

      export interface UserData {
        id: number;
        name: string;
        email: string;
      }
      `,
  },

  'simple generic with any type': {
    interfaceName: 'UserData',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface UserData<T> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface UserData {
        id: number | string | boolean;
        name: string;
        email: string;
      }
      `,
  },

  'simple generic mismatch': {
    interfaceName: 'DataStore',
    target: dedent/* ts */`
      export interface DataStore {
        data: UserData<number>;
      }

      export interface UserData<T extends string> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: UserData;
      }

      export interface UserData {
        id: number;
        name: string;
        email: string;
      }
      `,
  },

  'union constraint': {
    interfaceName: 'DataStore',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataStore {
        data: UserData<number>;
      }

      export interface UserData<T extends string | number> {
        email: string;

        id: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: UserData;
      }

      export interface UserData {
        id: string | number;
        name: string;
        email: string;
      }
      `,
  },

  'indexed access generic type no default':
  {
    interfaceName: 'DataStore',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataStore {
        data: UserData<number>;
      }

      export interface UserData<T extends string | number> {
        email: string;

        id: T;

        info: UserData<T>['id'];

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: UserData;
      }

      export interface UserData {
        id: string | number;
        info: string | number;
        name: string;
        email: string;
      }
      `,
  },

  // NOTE: if there is a default value on the generic type
  // and you use a indexed access type on the generic type, you need to define the <T>
  'indexed access generic type with default':
  {
    interfaceName: 'DataStore',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataStore {
        data: UserData<number>;
      }

      export interface UserData<T extends string | number = number> {
        email: string;

        id: T;

        info: UserData<T>['id'];

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataStore {
        data: UserData;
      }

      export interface UserData {
        id: string | number;
        info: string | number;
        name: string;
        email: string;
      }
      `,
  },
  'imported generic type': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      import { Callbacks } from './types';

      export interface Foo {
        bar: Callbacks<(arg: string) => void>;
      }
      `,
    source: dedent/* ts */`
      export interface Foo {
        bar: Callbacks;
      }

      export interface Callbacks {
        Clear(): void
        Add(): void
      }
      `,
  },
  'MappedObservable': {
    interfaceName: 'MappedObservable',
    expectsNoDiff: true,
    target: dedent/* ts */`
      /**
       * @exported
       */
      export interface MappedObservable<TSource, TMapped> {
        m_fnMap(value: TSource): TMapped;

        Subscribe(callback: (value: TMapped) => void): { Unsubscribe: () => void; };

        UpdateMappedValue(): void;

        m_bMappedValueStale: boolean;

        m_mappedSubscribableValue: ObservableValue<TMapped>;

        m_originalSubscribableValue: ObservableValue<TSource>;

        Value: TMapped;
      }

      export interface ObservableValue<T> {
        m_fnEquals?(value1: T, value2: T): boolean;

        Set(value: T): void;

        Subscribe(callback: (value: T) => void): { Unsubscribe: () => void; };

        m_callbacks: Callbacks<(value: T) => void>;

        m_currentValue: T;

        SubscriberCount: number;

        Value: T;
      }

      export interface Callbacks<T extends (...args: any) => unknown = () => void> {
        ClearAllCallbacks(): void;

        CountRegistered(): number;

        Dispatch(...args: Parameters<T>): void;

        Register(callback: T): { Unregister: () => void; };

        m_vecCallbacks: T[];
      }
      `,
    source: dedent/* ts */`
      export interface MappedObservable {
        m_fnMap(e: unknown): boolean;

        Subscribe(e: unknown): unknown;

        UpdateMappedValue(): void;

        m_bMappedValueStale: boolean;

        m_mappedSubscribableValue: MappedSubscribableValue;

        m_originalSubscribableValue: MappedSubscribableValue;

        Value: boolean;
      }

      export interface MappedSubscribableValue {
        m_fnEquals?(e: unknown, t: unknown): boolean;

        Set(e: unknown): void;

        Subscribe(e: unknown): { Unsubscribe: unknown; };

        m_callbacks: Callbacks;

        m_currentValue: (boolean | CurrentValue);

        SubscriberCount: number;

        Value: (boolean | CurrentValue);
      }

      export interface Callbacks {
        ClearAllCallbacks(): void;

        CountRegistered(): unknown;

        Dispatch(...e: unknown[]): void;

        Register(e: unknown): { Unregister: () => void; };

        m_vecCallbacks: never;
      }

      export interface CurrentValue {
        /**
         * This value is an enum
         * @currentValue 3
         */
        eActivationSourceType: number;

        nActiveGamepadIndex: number;

        nLastActiveGamepadIndex: number;
      }
    `,
  },
};
