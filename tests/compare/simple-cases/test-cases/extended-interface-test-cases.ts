import dedent from 'dedent';
import { ComparatorTest } from './index';

export const extendedInterfaceCases: Record<string, ComparatorTest> = {
  'valid extended interface': {
    interfaceName: 'Config',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Config {
        admin: Admin;

        user: User;
      }

      export interface User {
        email: string;

        id: number;

        name: string;
      }

      export interface Admin extends User {
        counter: number;

        permissions: string[];

        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        user: User;
        admin: Admin;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
      }

      export interface Admin {
        id: number;
        name: string;
        email: string;
        role: string;
        permissions: string[];
        counter: number;
      }
      `,
  },

  'extended interface removed property': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        admin: Admin;

        user: User;
      }

      export interface User {
        email: string;

        id: number;

        name: string;
      }

      export interface Admin extends User {
        counter: number;

        permissions: string[];

        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        user: User;
        admin: Admin;
      }

      export interface User {
        id: number;
        name: string;
      }

      export interface Admin {
        id: number;
        name: string;
        email: string;
        role: string;
        permissions: string[];
        counter: number;
      }
      `,
  },

  'extended interface both removed property': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        admin: Admin;

        user: User;
      }

      export interface User {
        email: string;

        id: number;

        name: string;
      }

      export interface Admin extends User {
        counter: number;

        permissions: string[];

        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        user: User;
        admin: Admin;
      }

      export interface User {
        id: number;
        name: string;
      }

      export interface Admin {
        id: number;
        name: string;
        role: string;
        permissions: string[];
        counter: number;
      }
      `,
  },

  'extended interface added property': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        admin: Admin;

        user: User;
      }

      export interface User {
        email: string;

        id: number;

        name: string;
      }

      export interface Admin extends User {
        counter: number;

        permissions: string[];

        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        user: User;
        admin: Admin;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
        suffix: string;
      }

      export interface Admin {
        counter: number;
        email: string;
        id: number;
        name: string;
        permissions: string[];
        role: string;
      }
      `,
  },

  'extended interface both added property': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        admin: Admin;

        user: User;
      }

      export interface User {
        email: string;

        id: number;

        name: string;
      }

      export interface Admin extends User {
        counter: number;

        permissions: string[];

        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        user: User;
        admin: Admin;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
        suffix: string;
      }

      export interface Admin {
        id: number;
        name: string;
        email: string;
        suffix: string;
        role: string;
        permissions: string[];
        counter: number;
      }
      `,
  },

  'extended interface type mismatch': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        admin: Admin;

        user: User;
      }

      export interface User {
        email: string;

        id: number;

        name: string;
      }

      export interface Admin extends User {
        counter: number;

        permissions: string[];

        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        user: User;
        admin: Admin;
      }

      export interface User {
        id: string;
        name: string;
        email: string;
      }

      export interface Admin {
        id: number;
        name: string;
        email: string;
        role: string;
        permissions: string[];
        counter: number;
      }
      `,
  },

  'extended interface with import': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      import { BaseUser } from './types';

      export interface Config {
        admin: Admin;
        user: User;
      }

      export interface User extends BaseUser {
        email: string;
      }

      export interface Admin extends User {
        permissions: string[];
        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        user: User;
        admin: Admin;
      }

      export interface User {
        id: number;
        name: string;
        email: string;
      }

      export interface Admin {
        id: number;
        name: string;
        email: string;
        role: string;
        permissions: string[];
      }
      `,
  },
  'extended interface multiple type mismatch': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];

        otherChats: OtherChat[];
      }

      export interface BaseChat {
        id: number;

        name: string;

        info: undefined;
      }

      export interface ChatRoom extends BaseChat {
        GetInfo(): string;

        SetInfo(info: string): void;

        email: string;
      }

      export interface OtherChat extends BaseChat {
        counter: number;

        permissions: string[];

        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];
        otherChats: OtherChat[];
      }

      export interface ChatRoom {
        GetInfo(): string;
        SetInfo(info: string): void;
        email: string;
        id: number;
        name: string;
        info: string[];
      }

      export interface OtherChat {
        counter: number;
        permissions: string[];
        role: string;
        id: number;
        name: string;
        info: string[];
      }
      `,
  },
  'extended interface multiple interface type mismatch': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];

        otherChats: OtherChat[];
      }

      export interface BaseChat {
        id: number;

        name: string;

        info: undefined;

        messages: never;
      }

      export interface ChatRoom extends BaseChat {
        GetInfo(): string;

        SetInfo(info: string): void;

        email: string;
      }

      export interface OtherChat extends BaseChat {
        counter: number;

        permissions: string[];

        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];
        otherChats: OtherChat[];
      }

      export interface ChatRoom {
        GetInfo(): string;
        SetInfo(info: string): void;
        email: string;
        id: number;
        name: string;
        info: string[];
        messages: Message[];
      }

      export interface OtherChat {
        counter: number;
        permissions: string[];
        role: string;
        id: number;
        name: string;
        info: string[];
        messages: Message[];
      }

      export interface Message {
        id: number;
        content: string;
        friendId: number;
        author: string;
      }
      `,
  },
  'extended interface multiple type partial mismatch': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];

        otherChats: OtherChat[];
      }

      export interface BaseChat {
        id: number;

        name: string;

        info: undefined;
      }

      export interface ChatRoom extends BaseChat {
        GetInfo(): string;

        SetInfo(info: string): void;

        email: string;
      }

      export interface OtherChat extends BaseChat {
        counter: number;

        permissions: string[];

        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];
        otherChats: OtherChat[];
      }

      export interface ChatRoom {
        GetInfo(): string;
        SetInfo(info: string): void;
        email: string;
        id: number;
        name: string;
        info: string[];
      }

      export interface OtherChat {
        counter: number;
        permissions: string[];
        role: string;
        id: number;
        name: string;
        info: undefined;
      }
      `,
  },
  // This should remove GetInfo from BaseChat and add it to ChatRoom
  'extended interface multiple extra function on base': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];

        otherChats: OtherChat[];
      }

      export interface BaseChat {
        GetInfo(): string;

        id: number;

        name: string;

        info: undefined;
      }

      export interface ChatRoom extends BaseChat {
        SetInfo(info: string): void;

        email: string;
      }

      export interface OtherChat extends BaseChat {
        counter: number;

        permissions: string[];

        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];
        otherChats: OtherChat[];
      }

      export interface ChatRoom {
        GetInfo(): string;
        SetInfo(info: string): void;
        email: string;
        id: number;
        name: string;
        info: string[];
      }

      export interface OtherChat {
        counter: number;
        permissions: string[];
        role: string;
        id: number;
        name: string;
        info: string[];
      }
      `,
  },
  // This should add the missing AddMessage function to both interfaces
  'extended interface multiple missing function': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];

        otherChats: OtherChat[];
      }

      export interface BaseChat {
        id: number;

        name: string;

        info: undefined;
      }

      export interface ChatRoom extends BaseChat {
        GetInfo(): string;

        SetInfo(info: string): void;

        email: string;
      }

      export interface OtherChat extends BaseChat {
        counter: number;

        permissions: string[];

        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];
        otherChats: OtherChat[];
      }

      export interface ChatRoom {
        GetInfo(): string;
        SetInfo(info: string): void;
        AddMessage(message: string): void;
        email: string;
        id: number;
        name: string;
        info: string[];
      }

      export interface OtherChat {
        AddMessage(message: string): void;
        counter: number;
        permissions: string[];
        role: string;
        id: number;
        name: string;
        info: string[];
      }
      `,
  },

  'extended interface multiple missing function and extra function': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];

        otherChats: OtherChat[];
      }

      export interface BaseChat {
        GetInfo(): string;

        id: number;

        name: string;

        info: undefined;
      }

      export interface ChatRoom extends BaseChat {
        SetInfo(info: string): void;

        email: string;
      }

      export interface OtherChat extends BaseChat {
        counter: number;

        permissions: string[];

        role: string;
      }
      `,
    source: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];
        otherChats: OtherChat[];
      }

      export interface ChatRoom {
        GetInfo(): string;
        SetInfo(info: string): void;
        AddMessage(message: string): void;
        email: string;
        id: number;
        name: string;
        info: string[];
      }

      export interface OtherChat {
        AddMessage(message: string): void;
        counter: number;
        permissions: string[];
        role: string;
        id: number;
        name: string;
        info: string[];
      }
      `,
  },

  // 'extended array type extra': {
  //   interfaceName: 'Config',
  //   expectsNoDiff: true,
  //   target: dedent/* ts */`
  //     export interface Config {
  //       achievements: (Achievement | ComplexAchievement)[];
  //     }

  //     export interface BaseAchievement {
  //       bAchieved: boolean;
  //       bHidden: boolean;
  //       flAchieved: number;
  //       strID: string;
  //       strImage: string;
  //       strName: string;
  //     }

  //     export interface Achievement extends BaseAchievement {
  //       rtUnlocked: number;
  //       strDescription: string;
  //     }

  //     export interface ComplexAchievement extends BaseAchievement {
  //       foo: string;
  //       bar: boolean;
  //     }
  //     `,
  //   source: dedent/* ts */`
  //     export interface Config {
  //       achievements: Achievement[];
  //     }

  //     export interface Achievement {
  //       bAchieved: boolean;
  //       bHidden: boolean;
  //       flAchieved: number;
  //       strID: string;
  //       strImage: string;
  //       strName: string;
  //       rtUnlocked?: number;
  //       strDescription?: string;
  //       foo?: string;
  //       bar?: boolean;
  //     }
  //     `,
  // },
};
