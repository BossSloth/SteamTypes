import dedent from 'dedent';
import { ComparatorTest } from './index';

export const interfaceRenamedCases: Record<string, ComparatorTest> = {
  'array intersection types': {
    interfaceName: 'Combined',
    target: dedent/* ts */`
      export interface Combined {
        data: TypeA;
      }

      export interface TypeA {
        propA: string;
        barA: boolean;
        fooA: number;
      }`,
    source: dedent/* ts */`
      export interface Combined {
        data: (A | B)[];
      }

      export interface A {
        propA: string;
        extraA: boolean;
        barA: boolean;
        fooA: number;
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
        data: (TypeA | TypeB)[];
      }

      export interface TypeA {
        extraA: boolean;
        barA: boolean;
        fooA: number;
        propA: string;
      }

      export interface TypeB {
        propB: number;
        extraB: Date;
      }`,
    source: dedent/* ts */`
      export interface Combined {
        data: A;
      }

      export interface A {
        propA: string;
        barA: boolean;
        fooA: number;
      }`,
  },

  'interface with complex nested generics': {
    interfaceName: 'ApiResponse',
    target: dedent/* ts */`
      export interface ApiResponse<T> {
        data: T[];
        pagination: PaginationInfo;
        success: boolean;
      }

      export interface PaginationInfo {
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

  'nested interface in union type': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: BaseItem | ExtendedItem;
      }

      export interface BaseItem {
        id: number;
        name: string;
        foo: boolean;
      }

      export interface ExtendedItem {
        details: string;
        bar: boolean;
        extra: string;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: Base | Extended;
      }

      export interface Base {
        id: number;
        name: string;
        created: Date;
        foo: boolean;
      }

      export interface Extended {
        details: string;
        active: boolean;
        extra: string;
        bar: boolean;
      }`,
  },

  'union type with interface and different lengths': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: TypeA | TypeB;
      }

      export interface TypeA {
        propA: string;
      }

      export interface TypeB {
        fooB: string;
        otherB: boolean;
        propB: number;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: A | B | C;
      }

      export interface A {
        propA: string;
      }

      export interface B {
        fooB: string;
        otherB: boolean;
        extraB: Date;
        propB: number;
      }

      export interface C {
        propC: boolean;
      }`,
  },

  'interface with indexed access types': {
    interfaceName: 'UserProfile',
    target: dedent/* ts */`
      export interface UserProfile {
        preferences: UserInfo['settings'];
        user: UserInfo;
      }

      export interface UserInfo {
        foo: boolean;
        id: number;
        name: string;
        number: number;
        settings: Settings;
      }

      export interface Settings {
        notifications: boolean;

        theme: string;
      }
      `,
    source: dedent/* ts */`
      export interface UserProfile {
        preferences: Settings;
        user: User;
        theme: string;
      }

      export interface User {
        id: number;
        name: string;
        foo: boolean;
        number: number;
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

  'normal indexed access type': {
    interfaceName: 'UserProfile',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface UserProfile {
        preferences: UserInfo['email'];

        theme: UserInfo['settings']['notifications'];

        user: UserInfo;
      }

      export interface UserInfo {
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
        preferences: UserData['email'];

        theme: UserData['settings']['notifications'];

        user: UserData;
      }

      export interface UserData {
        email: number;

        id: number;

        name: string;

        settings: SettingsInfo;
      }

      export interface SettingsInfo {
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

  'indexed access interface type': {
    interfaceName: 'UserProfile',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface UserProfile {
        theme: UserData['settings'];

        user: UserData;
      }

      export interface UserData {
        email: string;

        id: number;

        name: string;

        settings: SettingsInfo;
      }

      export interface SettingsInfo {
        language: string;

        notifications: string;

        theme: string;
      }
      `,
    source: dedent/* ts */`
      export interface UserProfile {
        user: User;
        theme: Settings;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
        settings: Settings;
      }

      export interface Settings {
        theme: string;
        notifications: string;
        language: string;
      }
      `,
  },

  'indexed access interface type with mismatch': {
    interfaceName: 'UserProfile',
    target: dedent/* ts */`
      export interface UserProfile {
        theme: UserData['info'];

        user: UserData;
      }

      export interface UserData {
        email: string;

        id: number;

        info: InfoExtra;

        name: string;

        settings: SettingsInfo;
      }

      export interface SettingsInfo {
        language: string;

        notifications: string;

        theme: string;
      }

      export interface InfoExtra {
        bar: number;

        foo: boolean;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface UserProfile {
        user: User;
        theme: Settings;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
        settings: Settings;
        info: Info;
      }

      export interface Settings {
        theme: string;
        notifications: string;
        language: string;
      }

      export interface Info {
        name: string;
        foo: boolean;
        bar: number;
      }
      `,
  },

  'external template literal types': {
    interfaceName: 'RouteConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export type HttpMethodType = 'GET' | 'POST';
      export type ResourceTypeValue = 4 | 5;

      export interface RouteConfig {
        method: HttpMethodType;

        path: string;

        type: ResourceTypeValue;
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
      export type HttpMethodType = 'GET' | 'POST';
      export type ResourceTypeValue = 4 | 5;

      export interface RouteConfig {
        method: HttpMethodType;
        path: string;
        type: ResourceTypeValue;
      }`,
    source: dedent/* ts */`
      export interface RouteConfig {
        method: number;
        path: string;
        type: number;
      }`,
  },

  'interface with intersection types': {
    interfaceName: 'EnhancedUser',
    target: dedent/* ts */`
      export interface EnhancedUser {
        user: BaseUserInfo & UserPermissionInfo;
      }

      export interface BaseUserInfo {
        email: string;
        foo: boolean;
        id: number;
        name: string;
      }

      export interface UserPermissionInfo {
        canDelete: boolean;
        canEdit: boolean;
        canRead: boolean;
        canUpdate: boolean;
      }`,
    source: dedent/* ts */`
      export interface EnhancedUser {
        user: BaseUser & UserPermissions & UserMetadata;
        isAdmin: boolean;
      }

      export interface BaseUser {
        email: string;
        foo: boolean;
        id: number;
        name: string;
        extraInfo: string;
      }

      export interface UserPermissions {
        canEdit: boolean;
        canDelete: boolean;
        canCreate: boolean;
        canUpdate: boolean;
        canRead: boolean;
      }

      export interface UserMetadata {
        lastLogin: Date;
        loginCount: number;
      }`,
  },

  'interface with complex nested structures': {
    interfaceName: 'AppConfig',
    target: dedent/* ts */`
      export interface AppConfig {
        api: ApiSettings;
        ui: UiSettings;
      }

      export interface ApiSettings {
        baseUrl: string;
        timeout: number;
        isActive: boolean;
        extraInfo: string;
      }

      export interface UiSettings {
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
        extraInfo: string;
        isActive: boolean;
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
};
