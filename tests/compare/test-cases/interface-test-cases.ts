import dedent from 'dedent';
import { ComparatorTest } from './index';

export const interfaceCases: Record<string, ComparatorTest> = {
  'union type with interface': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: string | null;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: DataType | null;
      }

      export interface DataType {
        value: string;
        id: number;
      }`,
  },

  'inverse union type with interface': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: DataType | null;
      }

      export interface DataType {
        value: string;
        id: number;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: string | null;
      }`,
  },

  'array intersection types': {
    interfaceName: 'Combined',
    target: dedent/* ts */`
      export interface Combined {
        data: A;
      }

      export interface A {
        propA: string;
      }`,
    source: dedent/* ts */`
      export interface Combined {
        data: (A | B)[];
      }

      export interface A {
        propA: string;
        extraA: boolean;
      }

      export interface B {
        propB: number;
        extraB: Date;
      }`,
  },

  'inverse array intersection types': {
    interfaceName: 'Combined',
    target: dedent/* ts */`
      export interface Combined {
        data: (A | B)[];
      }

      export interface A {
        propA: string;
        extraA: boolean;
      }

      export interface B {
        propB: number;
        extraB: Date;
      }`,
    source: dedent/* ts */`
      export interface Combined {
        data: A;
      }

      export interface A {
        propA: string;
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

  'interface with different ObservableMap type in an intersection': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface Container {
        data: number | ObservableMap<string, number>;
      }
      `,
    source: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface Container {
        data: number | ObservableMap<string, boolean>;
      }`,
  },

  'nested interface in union type': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: Base | Extended;
      }

      export interface Base {
        id: number;
        name: string;
      }

      export interface Extended {
        details: string;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: Base | Extended;
      }

      export interface Base {
        id: number;
        name: string;
        created: Date;
      }

      export interface Extended {
        details: string;
        active: boolean;
      }`,
  },

  'union type with different lengths': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: string | number;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: string | number | boolean;
      }`,
  },

  'union type with interface and different lengths': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: A | B;
      }

      export interface A {
        propA: string;
      }

      export interface B {
        propB: number;
        fooB: string;
        otherB: boolean;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: A | B | C;
      }

      export interface A {
        propA: string;
      }

      export interface B {
        propB: number;
        fooB: string;
        otherB: boolean;
        extraB: Date;
      }

      export interface C {
        propC: boolean;
      }`,
  },

  'interface with indexed access types': {
    interfaceName: 'UserProfile',
    target: dedent/* ts */`
      export interface UserProfile {
        preferences: User['settings'];
        user: User;
      }

      export interface User {
        id: number;
        name: string;
        settings: {
          theme: string;
          notifications: boolean;
        };
      }
      `,
    source: dedent/* ts */`
      export interface UserProfile {
        user: User;
        preferences: User['settings'];
        theme: User['settings']['theme'];
      }

      export interface User {
        id: number;
        name: string;
        email: string;
        settings: {
          theme: string;
          notifications: boolean;
          language: string;
        };
      }
      `,
  },

  'normal indexed access type': {
    interfaceName: 'UserProfile',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface UserProfile {
        preferences: User['email'];

        theme: User['settings']['notifications'];

        user: User;
      }

      export interface User {
        email: string;

        id: number;

        name: string;

        settings: {
          theme: string;
          notifications: boolean;
          language: string;
        };
      }`,
    source: dedent/* ts */`
      export interface UserProfile {
        user: User;
        preferences: string;
        theme: boolean;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
        settings: {
          theme: string;
          notifications: boolean;
          language: string;
        };
      }`,
  },

  // TODO: maybe make it so the indexed access type is not removed by checking at the end if the type is the same
  'indexed access type mismatch': {
    interfaceName: 'UserProfile',
    target: dedent/* ts */`
      export interface UserProfile {
        preferences: User['email'];

        theme: User['settings']['notifications'];

        user: User;
      }

      export interface User {
        email: number;

        id: number;

        name: string;

        settings: Settings;
      }

      export interface Settings {
        theme: string;
        notifications: string;
        language: string;
      }
      `,
    source: dedent/* ts */`
      export interface UserProfile {
        user: User;
        preferences: string;
        theme: boolean;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
        settings: Settings;
      }

      export interface Settings {
        theme: string;
        notifications: boolean;
        language: string;
      }
      `,
  },

  'external template literal types': {
    interfaceName: 'RouteConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export type HttpMethod = 'GET' | 'POST';
      export type ResourceType = 4 | 5;

      export interface RouteConfig {
        method: HttpMethod;

        path: string;

        type: ResourceType;
      }`,
    source: dedent/* ts */`
      export interface RouteConfig {
        method: string;

        path: string;

        type: number;
      }`,
  },

  'template literal types': {
    interfaceName: 'RouteConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface RouteConfig {
        method: 'GET' | 'POST';

        path: string;

        type: 4 | 5;
      }`,
    source: dedent/* ts */`
      export interface RouteConfig {
        method: string;
        path: string;
        type: number;
      }`,
  },

  'external template literal types with missing type': {
    interfaceName: 'RouteConfig',
    target: dedent/* ts */`
      export type HttpMethod = 'GET' | 'POST';
      export type ResourceType = 4 | 5;

      export interface RouteConfig {
        method: HttpMethod;
        path: string;
        type: ResourceType;
      }`,
    source: dedent/* ts */`
      export interface RouteConfig {
        method: number;
        path: string;
        type: number;
      }`,
  },

  'template literal types with missing type': {
    interfaceName: 'RouteConfig',
    target: dedent/* ts */`
      export interface RouteConfig {
        method: 'GET' | 'POST';
        path: string;
        type: 4 | 5;
      }`,
    source: dedent/* ts */`
      export interface RouteConfig {
        method: number;
        path: string;
        type: number;
      }`,
  },

  'tuple types': {
    interfaceName: 'CoordinateSystem',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface CoordinateSystem {
        point: [number, number];
      }`,
    source: dedent/* ts */`
      export interface CoordinateSystem {
        point: number[];
      }`,
  },

  'mixed tuple types': {
    interfaceName: 'CoordinateSystem',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface CoordinateSystem {
        point: [number, string];
      }`,
    source: dedent/* ts */`
      export interface CoordinateSystem {
        point: (number | string)[];
      }`,
  },

  'mixed missing tuple types': {
    interfaceName: 'CoordinateSystem',
    target: dedent/* ts */`
      export interface CoordinateSystem {
        point: [number, number];
      }`,
    source: dedent/* ts */`
      export interface CoordinateSystem {
        point: (number | string)[];
      }`,
  },

  'tuple types with optional elements': {
    interfaceName: 'ParameterConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface ParameterConfig {
        options: [number, boolean, string, string];
      }`,
    source: dedent/* ts */`
      export interface ParameterConfig {
        options: (string | number | boolean)[];
      }`,
  },

  'interface with intersection types': {
    interfaceName: 'EnhancedUser',
    target: dedent/* ts */`
      export interface EnhancedUser {
        user: BaseUser & UserPermissions;
      }

      export interface BaseUser {
        id: number;
        name: string;
      }

      export interface UserPermissions {
        canEdit: boolean;
        canDelete: boolean;
      }`,
    source: dedent/* ts */`
      export interface EnhancedUser {
        user: BaseUser & UserPermissions & UserMetadata;
        isAdmin: boolean;
      }

      export interface BaseUser {
        id: number;
        name: string;
        email: string;
      }

      export interface UserPermissions {
        canEdit: boolean;
        canDelete: boolean;
        canCreate: boolean;
      }

      export interface UserMetadata {
        lastLogin: Date;
        loginCount: number;
      }`,
  },

  'method with interface return type': {
    interfaceName: 'UserService',
    target: dedent/* ts */`
      export interface UserService {
        getUserById(id: number): unknown;
      }`,
    source: dedent/* ts */`
      export interface UserService {
        getUserById(id: number): User | null;
        createUser(email: string, name: string): User;
      }

      export interface User {
        id: UserIdentifier;
        email: string;
        name: string;
      }`,
  },

  'interface with complex nested structures': {
    interfaceName: 'AppConfig',
    target: dedent/* ts */`
      export interface AppConfig {
        api: ApiConfig;
        ui: UiConfig;
      }

      export interface ApiConfig {
        baseUrl: string;
        timeout: number;
      }

      export interface UiConfig {
        theme: string;
      }`,
    source: dedent/* ts */`
      export interface AppConfig {
        api: ApiConfig;
        ui: UiConfig;
        features: Record<string, boolean>;
      }

      export interface ApiConfig {
        baseUrl: string;
        timeout: number;
        headers: Record<string, string>;
        endpoints: Record<string, EndpointConfig>;
      }

      export interface EndpointConfig {
        method: string;
        path: string;
        requiresAuth: boolean;
      }

      export interface UiConfig {
        theme: string;
        layout: 'vertical' | 'horizontal';
        animations: boolean;
        components: ComponentsConfig;
      }

      export interface ComponentsConfig {
        button: ButtonConfig;
        input: InputConfig;
      }

      export interface ButtonConfig {
        borderRadius: number;
        fontSize: number;
      }

      export interface InputConfig {
        borderRadius: number;
        padding: number;
      }`,
  },
  'array type to never type': {
    interfaceName: 'DataContainer',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataContainer {
        items: Item[];
      }

      export interface Item {
        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface DataContainer {
        items: never;
      }`,
  },
  'array type to unknown array': {
    interfaceName: 'DataCollection',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface DataCollection {
        items: string[];
      }
      `,
    source: dedent/* ts */`
      export interface DataCollection {
        items: unknown[];
      }`,
  },
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

};
