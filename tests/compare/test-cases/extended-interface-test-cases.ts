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
        id: number;
        name: string;
        email: string;
        role: string;
        permissions: string[];
        counter: number;
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
};
