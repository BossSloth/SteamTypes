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

  'interface with array intersection types': {
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
    }`,
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
        extraB: Date;
      }

      export interface C {
        propC: boolean;
      }`,
  },
};
