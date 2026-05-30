import dedent from 'dedent';
import { ComparatorTest } from './index';

export const propertyChangeRenamedCases: Record<string, ComparatorTest> = {
  'property type changes from interface to primitive': {
    interfaceName: 'GameState',
    target: dedent/* ts */`
      export interface GameState {
        player: PlayerInfo;
        gameMode: string;
      }

      export interface PlayerInfo {
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
        books: BookItem[];
        magazines: any[];
      }

      export interface BookItem {
        title: string;
        author: string;
        publisher: string;
        publishedDate: Date;
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
        publishedDate: Date;
        publisher: string;
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

  'interface with modified nested interfaces': {
    interfaceName: 'NetworkConfig',
    target: dedent/* ts */`
      export interface NetworkConfig {
        baseUrl: string;
        connection: ConnectionSettings;
      }

      export interface ConnectionSettings {
        extraSettings: Record<string, unknown>;
        foo: string;
        retries: number;
        /**
         * Timeout in milliseconds
         */
        timeout: number;
      }
      `,
    source: dedent/* ts */`
      export interface NetworkConfig {
        baseUrl: string;
        connection: ConnectionParams;
        endpoints: Record<string, string>;
      }

      export interface ConnectionParams {
        foo: string;
        timeout: number;
        retries: number;
        keepAlive: boolean;
        proxy?: ProxySettings;
        extraSettings: Record<string, unknown>;
      }

      export interface ProxySettings {
        host: string;
        port: number;
        auth?: string;
      }
      `,
  },

  'interface with property changing from one interface to another': {
    interfaceName: 'ChatMessage',
    target: dedent/* ts */`
      export interface ChatMessage {
        content: TextData;
        id: string;
        sender: string;
        timestamp: number;
      }

      export interface TextInformation {
        text: string;
        informationFormat: 'plain' | 'markdown';
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
        items: Map<string, ItemData>;
        reactive: ObservableMap<string, ReactiveInfo>;
        users: ObservableSet<UserInfo>;
      }

      export interface ItemData {
        id: string;
        name: string;
        extraInfo: string;
        foo: string;
      }

      export interface UserInfo {
        id: number;
        name: string;
        email: string;
        otherInfo: string;
        fooUser: string;
      }

      export interface ReactiveInfo {
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
        extraInfo: string;
        foo: string;
      }

      export interface UserData {
        id: number;
        name: string;
        avatarUrl: string;
        otherInfo: string;
        fooUser: string;
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
        cache: ObservableMap<string, SimpleItem | DetailedItem>;
        items: Set<ReactiveInfo | DetailedItem>;
        mappings: Map<string, UserInfo | ReactiveInfo>;
      }

      export interface SimpleItem {
        id: string;
        data: string;
        name: string;
      }

      export interface DetailedItem {
        description: string;
        id: string;
        metadata: Record<string, unknown>;
        name: string;
      }

      export interface UserInfo {
        id: number;
        name: string;
      }

      export interface ReactiveInfo {
        id: number;
        trackingFoo: boolean;
        trackingReactive: boolean;
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
        data: string;
      }

      export interface ExtendedItem {
        description: string;
        id: string;
        metadata: Record<string, unknown>;
        name: string;
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
        trackingReactive: boolean;
        trackingFoo: boolean;
      }
      `,
  },

};
