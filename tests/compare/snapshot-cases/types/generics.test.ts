import dedent from 'dedent';
import { ComparatorTest, createRenamedTest, createTest } from '../shared';

export const genericsCases: Record<string, ComparatorTest> = {
  'generic argument referencing type parameter is preserved': {
    interfaceName: 'Wrapper',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Box<U> {
        value: U;
      }

      export interface Wrapper<T> {
        boxed: Box<T>;
      }`,
    source: dedent/* ts */`
      export interface Box<U> {
        value: U;
      }

      export interface Wrapper<T> {
        boxed: Box<string>;
      }`,
  },

  // TODO: generic must be of correct type so it should output `T extends number | string`
  'interface with complex nested generics': {
    interfaceName: 'ApiResponse',
    target: dedent/* ts */`
      export interface ApiResponse<T> {
        data: T[];
        pagination: Pagination;
        success: boolean;
      }

      export interface Pagination {
        page: number;
        limit: number;
        total: number;
      }`,
    source: dedent/* ts */`
      export interface ApiResponse {
        data: number | string[];
        pagination: Pagination;
        success: boolean;
        error: ApiError;
      }

      export interface ApiError {
        code: string;
        message: string;
        details?: Record<string, unknown>;
      }

      export interface Pagination {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
      }`,
  },

  'generic type parameter changes': {
    interfaceName: 'DataStore',
    target: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface DataStore {
        cache: Set<string>;
        items: Map<string, Item>;
        reactive: ObservableMap<string, ReactiveData>;
        users: ObservableSet<UserData>;
      }

      export interface Item {
        id: string;
        name: string;
      }

      export interface UserData {
        id: number;
        name: string;
        email: string;
      }

      export interface ReactiveData {
        id: number;
        name: string;
        tracking: boolean;
      }
      `,
    source: dedent/* ts */`
      import { ObservableMap, ObservableSet } from 'mobx';

      export interface DataStore {
        cache: Set<number>;
        items: Map<string, Item>;
        reactive: ObservableMap<number, ReactiveData>;
        users: ObservableSet<UserData>;
      }

      export interface Item {
        id: string;
        name: string;
        type: 'text' | 'image' | 'file';
        data: string;
      }

      export interface UserData {
        id: number;
        name: string;
        avatarUrl: string;
      }

      export interface ReactiveData {
        id: number;
        name: string;
        tracking: boolean;
      }
      `,
  },

  'generic type parameter changes with union types': {
    interfaceName: 'DataCollection',
    target: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface DataCollection {
        cache: ObservableMap<string, BasicItem | ExtendedItem>;
        items: Set<ReactiveData | ExtendedItem>;
        mappings: Map<string, UserData | ReactiveData>;
      }

      export interface BasicItem {
        id: string;
        name: string;
      }

      export interface ExtendedItem {
        description: string;
        id: string;
        metadata: Record<string, unknown>;
        name: string;
      }

      export interface UserData {
        id: number;
        name: string;
      }

      export interface ReactiveData {
        id: number;
        tracking: boolean;
      }
      `,
    source: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface DataCollection {
        cache: ObservableMap<string, BasicItem | ExtendedItem | SpecialItem>;
        items: Set<ReactiveData | ExtendedItem>;
        mappings: Map<string, UserData | ReactiveData>;
      }

      export interface BasicItem {
        id: string;
        name: string;
        createdAt: Date;
      }

      export interface ExtendedItem {
        id: string;
        name: string;
        description: string;
        metadata: Record<string, unknown>;
        isActive: boolean;
      }

      export interface SpecialItem {
        id: string;
        type: 'special';
        priority: number;
      }

      export interface UserData {
        id: number;
        name: string;
        avatarUrl: string;
      }

      export interface ReactiveData {
        id: number;
        name: string;
        tracking: boolean;
      }
      `,
  },

  'generic type with typeof string': {
    interfaceName: 'Container',
    expectsNoDiff: true,
    target: dedent/* ts */`
      const MAIN_WINDOW_NAME = 'SP Desktop_uid0';

      export interface Container {
        data: Map<typeof MAIN_WINDOW_NAME, string>;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: Map<string, string>;
      }`,
  },

  'generic type with typeof string mismatch': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      const MAIN_WINDOW_NAME = 'SP Desktop_uid0';

      export interface Container {
        data: Map<typeof MAIN_WINDOW_NAME, string>;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: Map<number, string>;
      }`,
  },

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
  'generic property with enum source preserves type parameter': {
    interfaceName: 'Container',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Container {
        items: Item<number>[];
      }

      export interface Item<T extends number> {
        eType: T;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface Container {
        items: Item[];
      }

      export interface Item {
        /**
         * This value is an enum
         * @currentValue 7
         */
        eType: number;
        name: string;
      }
      `,
  },

  'type argument with conditional type referencing type parameter': {
    interfaceName: 'Container',
    expectsNoDiff: true,
    target: dedent/* ts */`
      interface TypeMap {
        a: { value: string; };

        b: { value: number; };
      }

      export interface Container {
        items: Item<'a'>[];
      }

      export interface Item<T extends keyof TypeMap> {
        data: Wrapper<TypeMap[T] extends { value: infer U } ? U : never>;

        name: string;
      }

      export interface Wrapper<T> {
        value: T;
      }
      `,
    source: dedent/* ts */`
      export interface Container {
        items: Item[];
      }

      export interface Item {
        data: Wrapper<string>;
        name: string;
      }

      export interface Wrapper {
        value: string;
      }
      `,
  },

  MappedObservable: {
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

  'indexed access on unconstrained type parameter': {
    interfaceName: 'UserData',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface UserData<T> {
        id: T;

        info: UserData<T>['id'];
      }`,
    source: dedent/* ts */`
      export interface UserData {
        id: number;

        info: number;
      }`,
  },

  'indexed access on type alias falls through': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      type Foo = { bar: string; };

      export interface Container {
        value: Foo['bar'];
      }`,
    source: dedent/* ts */`
      export interface Container {
        value: number;
      }`,
  },

  'indexed access referencing non-existent property': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Foo {
        bar: string;
      }

      export interface Container {
        value: Foo['nonexistent'];
      }`,
    source: dedent/* ts */`
      export interface Foo {
        bar: string;
      }

      export interface Container {
        value: number;
      }`,
  },
};

createTest('Generics', genericsCases);

createRenamedTest('Generic Renames', genericsCases);
