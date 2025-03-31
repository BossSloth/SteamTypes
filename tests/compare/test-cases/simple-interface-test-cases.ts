import dedent from 'dedent';
import { ComparatorTest } from './index';

export const simpleInterfaceCases: Record<string, ComparatorTest> = {
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

  'observable map': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface Container {
        data: ObservableMap<string, number>;
      }`,
    source: dedent/* ts */`
      import { ObservableMap } from 'mobx';

      export interface Container {
        data: ObservableMap<string, boolean>;
      }`,
  },

  'observable set': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      import { ObservableSet } from 'mobx';

      export interface Container {
        data: ObservableSet<number>;
      }`,
    source: dedent/* ts */`
      import { ObservableSet } from 'mobx';

      export interface Container {
        data: ObservableSet<boolean>;
      }`,
  },

  'set type different': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: Set<number>;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: Set<boolean>;
      }`,
  },

  'map type different': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        data: Map<string, number>;
      }`,
    source: dedent/* ts */`
      export interface Container {
        data: Map<string, boolean>;
      }`,
  },

  'interface with method signatures': {
    interfaceName: 'Service',
    target: dedent/* ts */`
      export interface Service {
        getData(): string;
        setData(value: string): void;
      }`,
    source: dedent/* ts */`
      export interface Service {
        getData(): string;
        setData(value: string): void;
        clearData(): void;
      }`,
  },

  // NOTE: We might need an indexed signature test later but for now we don't support it
  // 'interface with indexed signature': {
  //   interfaceName: 'Dictionary',
  //   target: dedent/* ts */`
  //     export interface Dictionary {
  //       [key: string]: string;
  //     }`,
  //   source: dedent/* ts */`
  //     export interface Dictionary {
  //       [key: string]: string | number;
  //       count: number;
  //     }`,
  // },

  'interface with optional properties': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        name: string;
        version?: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        name?: string;
        version?: string;
        debug?: boolean;
      }`,
  },

  'interface with readonly properties': {
    interfaceName: 'ImmutableData',
    target: dedent/* ts */`
      export interface ImmutableData {
        readonly id: number;
        data: string;
      }`,
    source: dedent/* ts */`
      export interface ImmutableData {
        readonly id: number;
        readonly data: string;
        updatedAt: Date;
      }`,
  },

  'interface with enum property - number': {
    interfaceName: 'StatusHolder',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface StatusHolder {
        status: Status;
      }

      export enum Status {
        Pending,
        Active,
        Inactive,
      }`,
    source: dedent/* ts */`
      export interface StatusHolder {
        /**
         * @currentValue 1
        */
        status: number;
      }`,
  },

  'interface with enum property - string': {
    interfaceName: 'StatusHolder',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface StatusHolder {
        status: GameType;
      }

      export enum GameType {
        Pending,
        Active,
        Inactive,
      }`,
    source: dedent/* ts */`
      export interface StatusHolder {
        /**
         * @currentValue 1
        */
        status: string;
      }`,
  },

  'interface with missing enum property': {
    interfaceName: 'StatusHolder',
    target: dedent/* ts */`
      export interface StatusHolder {
        status: GameType;
      }

      export enum GameType {
        Pending,
        Active,
        Inactive,
      }`,
    source: dedent/* ts */`
      export interface StatusHolder {
        /**
         * @currentValue 3
         */
        status: number;
      }`,
  },

  'new enum property': {
    interfaceName: 'StatusHolder',
    target: dedent/* ts */`
      export interface StatusHolder {
        foo: string;
      }`,
    source: dedent/* ts */`
      export interface StatusHolder {
        foo: string;
        /**
         * this value is an enum
         * @currentValue 7
         */
        status: number;
      }`,
  },

  'implied enum property': {
    interfaceName: 'StatusHolder',
    target: dedent/* ts */`
      export interface StatusHolder {
        m_eStatus: number;
      }`,
    source: dedent/* ts */`
      export interface StatusHolder {
        /**
         * this value is an enum
         * @currentValue 7
         */
        m_eStatus: number;
      }`,
  },

  'implied enum property with multiple currentValues': {
    interfaceName: 'StatusHolder',
    target: dedent/* ts */`
      export interface StatusHolder {
        m_eStatus: number;
      }`,
    source: dedent/* ts */`
      export interface StatusHolder {
        /**
         * this value is an enum
         * @currentValue 7
         * @currentValue 8
         */
        m_eStatus: number;
      }`,
  },

  // NOTE: We currently don't support circular references but we might need to add support later
  // 'interface with circular reference': {
  //   interfaceName: 'Node',
  //   target: dedent/* ts */`
  //     export interface Node {
  //       value: string;
  //     }`,
  //   source: dedent/* ts */`
  //     export interface Node {
  //       value: string;
  //       next: Node | null;
  //     }`,
  // },

  'interface with complex property types': {
    interfaceName: 'ComplexData',
    target: dedent/* ts */`
      export interface ComplexData {
        simpleArray: string[];
        record: Record<string, number>;
      }`,
    source: dedent/* ts */`
      export interface ComplexData {
        simpleArray: string[];
        record: Record<string, number>;
        nestedArray: Array<Array<string>>;
        complexMap: Map<string, Set<number>>;
      }`,
  },

  // TODO: this crashes
  // 'interface with JSDoc comments': {
  //   interfaceName: 'DocumentedInterface',
  //   target: dedent/* ts */`
  //     /**
  //      * A documented interface
  //      */
  //     export interface DocumentedInterface {
  //       /** The ID of the entity */
  //       id: number;
  //     }`,
  //   source: dedent/* ts */`
  //     /**
  //      * A documented interface
  //      * @description This is a more detailed description
  //      */
  //     export interface DocumentedInterface {
  //       /** The ID of the entity */
  //       id: number;
  //       /**
  //        * The name of the entity
  //        * @example "Example Name"
  //        */
  //       name: string;
  //     }`,
  // },

  'interface with tuple type': {
    interfaceName: 'TupleContainer',
    target: dedent/* ts */`
      export interface TupleContainer {
        coordinates: [number, number];
      }`,
    source: dedent/* ts */`
      export interface TupleContainer {
        coordinates: [number, boolean, number];
        labels: [string, string];
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

};
