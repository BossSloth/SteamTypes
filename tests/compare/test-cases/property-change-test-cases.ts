import dedent from 'dedent';
import { ComparatorTest } from './index';

export const propertyChangeCases: Record<string, ComparatorTest> = {
  'property type changes from primitive to interface': {
    interfaceName: 'UserSettings',
    target: dedent/* ts */`
      export interface UserSettings {
        profile: string;
        preferences: Record<string, boolean>;
      }`,
    source: dedent/* ts */`
      export interface UserSettings {
        profile: UserProfile;
        preferences: Record<string, boolean>;
      }

      export interface UserProfile {
        displayName: string;
        avatar: string;
        bio: string;
      }`,
  },

  'property type changes from interface to primitive': {
    interfaceName: 'GameState',
    target: dedent/* ts */`
      export interface GameState {
        player: PlayerStats;
        gameMode: string;
      }

      export interface PlayerStats {
        score: number;
        level: number;
        achievements: string[];
      }`,
    source: dedent/* ts */`
      export interface GameState {
        player: string;
        gameMode: string;
      }`,
  },

  'property changes from array to specific interface': {
    interfaceName: 'LibraryContent',
    target: dedent/* ts */`
      export interface LibraryContent {
        books: Book[];
        magazines: any[];
      }

      export interface Book {
        title: string;
        author: string;
      }`,
    source: dedent/* ts */`
      export interface LibraryContent {
        books: BookCollection;
        magazines: MagazineCollection;
      }

      export interface Book {
        title: string;
        author: string;
        isbn: string;
      }

      export interface Magazine {
        title: string;
        issue: number;
        publisher: string;
      }

      export interface BookCollection {
        items: Book[];
        count: number;
        lastUpdated: Date;
      }

      export interface MagazineCollection {
        items: Magazine[];
        count: number;
        lastUpdated: Date;
      }`,
  },

  'property with enum value changes': {
    interfaceName: 'StatusConfig',
    target: dedent/* ts */`
      export interface StatusConfig {
        status: ConnectionStatus;
        message: string;
      }

      export enum ConnectionStatus {
        CONNECTED = 1,
        DISCONNECTED = 2,
        PENDING = 3,
      }`,
    source: dedent/* ts */`
      export interface StatusConfig {
        /**
         * @currentValue 5
         */
        status: number;
        message: string;
        errorCode?: number;
      }`,
  },

  'property with enum stays same': {
    interfaceName: 'StatusConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface StatusConfig {
        message: string;

        status: ConnectionStatus;
      }

      export enum ConnectionStatus {
        CONNECTED = 1,
        DISCONNECTED = 2,
        PENDING = 3,
      }`,
    source: dedent/* ts */`
      export interface StatusConfig {
        /**
         * @currentValue 2
         */
        status: number;
        message: string;
      }`,
  },

  'property with enum stays same different name': {
    interfaceName: 'StatusConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface StatusConfig {
        eResult: StatusResultType;

        message: string;
      }

      export enum StatusResultType {
        CONNECTED = 1,
        DISCONNECTED = 2,
        PENDING = 3,
      }`,
    source: dedent/* ts */`
      export interface StatusConfig {
        /**
         * @currentValue 2
         */
        eResult: number;
        message: string;
      }`,
  },

  'interface with implied enum property': {
    interfaceName: 'SteamStatus',
    target: dedent/* ts */`
      export interface SteamStatus {
        m_eResult: number;
        m_bRequireRestart: boolean;
      }`,
    source: dedent/* ts */`
      export interface SteamStatus {
        /**
         * @currentValue 1
         */
        m_eResult: number;
        m_bRequireRestart: boolean;
        /**
         * This value is an enum
         * @currentValue 0
         */
        m_eAppUpdateBytes: number;
      }`,
  },

  'property with shorter enum value changes': {
    interfaceName: 'StatusConfig',
    target: dedent/* ts */`
      export interface StatusConfig {
        eStatus: ConnectionStatus;
        message: string;
      }

      export enum ConnectionStatus {
        CONNECTED = 1,
        DISCONNECTED = 2,
        PENDING = 3,
      }`,
    source: dedent/* ts */`
      export interface StatusConfig {
        /**
         * @currentValue 5
         */
        eStatus: number;
        message: string;
        errorCode?: number;
      }`,
  },

  'shorted implied enum property': {
    interfaceName: 'SteamStatus',
    target: dedent/* ts */`
      export interface SteamStatus {
        eResult: number;
      }`,
    source: dedent/* ts */`
      export interface SteamStatus {
        /**
         * @currentValue 1
         */
        eResult: number;
        /**
         * This value is an enum
         * @currentValue 0
         */
        eAppUpdateBytes: number;
      }`,
  },

  'flags enum': {
    interfaceName: 'StatusConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface StatusConfig {
        eStatusFlags: EStatusFlags;

        message: string;
      }

      export enum EStatusFlags {
        CONNECTED = 1 << 0,
        DISCONNECTED = 1 << 1,
        PENDING = 1 << 2,
      }`,
    source: dedent/* ts */`
      export interface StatusConfig {
        /**
         * @currentValue 7
         */
        eStatusFlags: number;
        message: string;
      }`,
  },

  'flags enum with missing value': {
    interfaceName: 'StatusConfig',
    target: dedent/* ts */`
      export interface StatusConfig {
        eStatusFlags: EStatusFlags;

        message: string;
      }

      export enum EStatusFlags {
        CONNECTED = 1 << 0,
        DISCONNECTED = 1 << 1,
        PENDING = 1 << 2,
      }`,
    source: dedent/* ts */`
      export interface StatusConfig {
        /**
         * @currentValue 12
         */
        eStatusFlags: number;
        message: string;
      }`,
  },

  'interface with added nested interfaces': {
    interfaceName: 'AppConfiguration',
    target: dedent/* ts */`
      export interface AppConfiguration {
        version: string;
        settings: {
          theme: string;
          language: string;
        };
      }`,
    source: dedent/* ts */`
      export interface AppConfiguration {
        version: string;
        settings: AppSettings;
        features: FeatureFlags;
      }

      export interface AppSettings {
        theme: string;
        language: string;
        notifications: NotificationSettings;
      }

      export interface NotificationSettings {
        enabled: boolean;
        sound: boolean;
        desktop: boolean;
      }

      export interface FeatureFlags {
        darkMode: boolean;
        betaFeatures: boolean;
        experimentalApi: boolean;
      }`,
  },

  'interface with modified nested interfaces': {
    interfaceName: 'NetworkConfig',
    target: dedent/* ts */`
      export interface NetworkConfig {
        baseUrl: string;
        connection: ConnectionParams;
      }

      export interface ConnectionParams {
        /**
         * Timeout in milliseconds
         */
        timeout: number;
        retries: number;
      }
      `,
    source: dedent/* ts */`
      export interface NetworkConfig {
        baseUrl: string;
        connection: ConnectionParams;
        endpoints: Record<string, string>;
      }

      export interface ConnectionParams {
        timeout: number;
        retries: number;
        keepAlive: boolean;
        proxy?: ProxySettings;
      }

      export interface ProxySettings {
        host: string;
        port: number;
        auth?: string;
      }
      `,
  },

  'interface with property changing from optional to required': {
    interfaceName: 'UserAccount',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface UserAccount {
        email?: string;

        id: string;

        name: string;

        phone?: string;
      }`,
    source: dedent/* ts */`
      export interface UserAccount {
        email: string;
        id: string;
        name: string;
        phone?: string;
      }`,
  },

  'interface with property changing from required to optional': {
    interfaceName: 'ProductDetails',
    target: dedent/* ts */`
      export interface ProductDetails {
        description: string;
        id: string;
        name: string;
        price: number;
      }`,
    source: dedent/* ts */`
      export interface ProductDetails {
        description?: string;
        discount?: number;
        id: string;
        name: string;
        price: number;
        inStock: boolean;
      }`,
  },

  'interface with property changing from one interface to another': {
    interfaceName: 'ChatMessage',
    target: dedent/* ts */`
      export interface ChatMessage {
        content: TextContent;
        id: string;
        sender: string;
        timestamp: number;
      }

      export interface TextContent {
        text: string;
        contentFormat: 'plain' | 'markdown';
      }`,
    source: dedent/* ts */`
      export interface ChatMessage {
        content: MessageContent;
        id: string;
        read: boolean;
        sender: string;
        timestamp: number;
      }

      export interface MessageContent {
        type: 'text' | 'image' | 'file';
        data: TextData;
      }

      export interface TextData {
        text: string;
        format: 'plain' | 'markdown' | 'html';
      }

      export interface ImageData {
        url: string;
        width: number;
        height: number;
        alt?: string;
      }

      export interface FileData {
        url: string;
        name: string;
        size: number;
        type: string;
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
  'interface with nullable imported type': {
    interfaceName: 'ImportedContainer',
    expectsNoDiff: true,
    target: dedent/* ts */`
      import { DataType } from './some-module';

      export interface ImportedContainer {
        data: DataType | null;
      }`,
    source: dedent/* ts */`
      export interface ImportedContainer {
        data: LocalType | null;
      }

      export interface LocalType {
        id: string;
        value: number;
      }`,
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
  'multiple imported interface renamed': {
    interfaceName: 'Foo',
    expectsNoDiff: true,
    target: dedent/* ts */`
      import { DataType } from './some-module';

      export interface Foo {
        data: DataType;

        otherValue: DataType;
      }`,
    source: dedent/* ts */`
      export interface Foo {
        data: LocalType;

        otherValue: LocalType;
      }

      export interface LocalType {
        id: string;
        value: number;
      }`,
  },
};
