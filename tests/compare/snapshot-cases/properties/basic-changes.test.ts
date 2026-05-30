import dedent from 'dedent';
import { ComparatorTest, createRenamedTest, createTest } from '../shared';

export const basicChangeCases: Record<string, ComparatorTest> = {
  'simple add missing property': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
        newProp: number;
      }`,
  },

  'simple remove property': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
        newProp: number;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
  },

  'simple type mismatch': {
    interfaceName: 'SimpleInterface',
    target: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: string;
      }`,
    source: dedent/* ts */`
      export interface SimpleInterface {
        existingProp: number;
      }`,
  },

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
};

createTest('Basic Property Changes', basicChangeCases);

createRenamedTest('Basic Change Renames', basicChangeCases);
