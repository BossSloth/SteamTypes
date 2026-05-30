import dedent from 'dedent';
import { ComparatorTest, createRenamedTest, createTest } from '../shared';

export const nestedCases: Record<string, ComparatorTest> = {
  'nested interfaces': {
    interfaceName: 'Parent',
    target: dedent/* ts */`
      export interface Parent {
        child: Child;
      }

      export interface Child {
        name: string;
      }`,
    source: dedent/* ts */`
      export interface Parent {
        child: Child;
        id: number;
      }

      export interface Child {
        name: string;
        age: number;
      }`,
  },

  'deeply nested interfaces': {
    interfaceName: 'GrandParent',
    target: dedent/* ts */`
      export interface GrandParent {
        parent: Parent;
      }

      export interface Parent {
        child: Child;
      }

      export interface Child {
        name: string;
      }`,
    source: dedent/* ts */`
      export interface GrandParent {
        parent: Parent;
        generation: number;
      }

      export interface Parent {
        child: Child;
        id: number;
      }

      export interface Child {
        name: string;
        age: number;
      }`,
  },

  'interface with circular reference': {
    interfaceName: 'Node',
    target: dedent/* ts */`
      export interface Node {
        value: string;
      }`,
    source: dedent/* ts */`
      export interface Node {
        value: string;
        next: Node | null;
      }`,
  },

  'interface with mismatched interface types': {
    interfaceName: 'ServiceConfig',
    target: dedent/* ts */`
    export interface ServiceConfig {
      userService: UserService;
    }

    export interface UserService {
      getUserById(id: number): User;
      createUser(name: string, email: string): User;

      user: User;
    }

    export interface User {
      id: number;
      name: string;
      email: string;
    }`,
    source: dedent/* ts */`
    export interface ServiceConfig {
      userService: UserService;
    }

    export interface UserService {
      name: string;
      email: string;
      role: string;
    }
    `,
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

  'recursive interface': {
    interfaceName: 'Node',
    target: dedent/* ts */`
      export interface Node {
        value: string;
        children: Node[];
      }
      `,
    source: dedent/* ts */`
      export interface Node {
        value: string;
        children: Node[];
        parent: Node | null;
      }`,
  },

  '2 level recursive interface': {
    interfaceName: 'TreeNode',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface TreeNode {
        children: Node[];

        value: string;
      }

      export interface Node {
        children: Node[];

        parent: TreeNode;

        value: string;
      }
      `,
    source: dedent/* ts */`
      export interface TreeNode {
        value: string;
        children: Node[];
      }

      export interface Node {
        value: string;
        children: Node[];
        parent: TreeNode;
      }
      `,
  },

  '2 level recursive interface missing interface': {
    interfaceName: 'TreeNode',
    target: dedent/* ts */`
      export interface TreeNode {
        value: id;
        foo: string;
      }
      `,
    source: dedent/* ts */`
      export interface TreeNode {
        value: string;
        children: Node[];
        foo: string;
      }

      export interface Node {
        value: string;
        children: Node[];
        parent: TreeNode;
      }
      `,
  },
};

createTest('Nested Interfaces', nestedCases);

createRenamedTest('Nested Renames', nestedCases);
