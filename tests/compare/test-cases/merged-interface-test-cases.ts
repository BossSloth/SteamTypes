import dedent from 'dedent';
import { ComparatorTest } from './index';

export const mergedInterfaceCases: Record<string, ComparatorTest> = {
  'basic merge': {
    interfaceName: 'Info',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Info {
        developers: Developers[];
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
  'merge with union': {
    interfaceName: 'Friend',
    target: dedent/* ts */`
      export interface Friend {
        info: Community_data
        extra_info?: (Community_data | Foo)
      }

      export interface Community_data {
        avatar_frame: string;

        avatar_url: string;

        favorite_badge: Player_badge;

        level: number;

        level_class: string;

        persona_name: string;

        profile_background?: Profile_background2;
      }

      export interface Foo {
        bar: string;
      }
      `,
    source: dedent/* ts */`
      export interface Friend {
        info: (Community_data | Community_data2)
        extra_info?: (Community_data | Community_data2 | Foo)
      }

      export interface Community_data {
        animated_avatar?: string;

        avatar_frame?: string;

        avatar_url: string;

        favorite_badge?: Player_badge;

        level: number;

        level_class: string;

        persona_name: string;

        profile_background?: Profile_background;
      }

      export interface Community_data2 {
        avatar_url: string;

        favorite_badge: Player_badge;

        level: number;

        level_class: string;

        persona_name: string;
      }

      export interface Foo {
        bar: string;
      }
      `,
  },
};
