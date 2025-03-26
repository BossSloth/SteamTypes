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
      export interface ConnectionParams {
        /**
         * Timeout in milliseconds
         */
        timeout: number;
        retries: number;
      }

      export interface NetworkConfig {
        baseUrl: string;
        connection: ConnectionParams;
      }`,
    source: dedent/* ts */`
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

      export interface NetworkConfig {
        baseUrl: string;
        connection: ConnectionParams;
        endpoints: Record<string, string>;
      }`,
  },

  'interface with property changing from optional to required': {
    interfaceName: 'UserAccount',
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
        verified: boolean;
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
        format: 'plain' | 'markdown';
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
};
