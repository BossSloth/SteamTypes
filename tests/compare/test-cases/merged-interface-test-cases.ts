import dedent from 'dedent';
import { ComparatorTest } from './index';

export const mergedInterfaceCases: Record<string, ComparatorTest> = {
  'basic merge': {
    interfaceName: 'Info',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Info {
        developers: (Developers | Developers)[];
      }

      export interface Developers {
        creator_clan_account_id?: number;

        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface Info {
        developers: (Developers | Developers2)[];
      }

      export interface Developers {
        name: string;
      }

      export interface Developers2 {
        creator_clan_account_id: number;
        name: string;
      }
      `,
  },
};
