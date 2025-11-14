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
  'manual merge multiple into one': {
    interfaceName: 'Chat',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Chat {
        emoticons: Emoticon[]
      }

      export interface Emoticon {
        appid?: number;

        last_used?: number;

        name: string;

        name_normalized?: string;

        use_count?: number;
      }
    `,
    source: dedent/* ts */`
      export interface Chat {
        emoticons: (Emoticon_list | Emoticon_list2 | Emoticon_list3 | Emoticon_list4)[]
      }

      export interface Emoticon_list {
        appid: number;

        name: string;

        name_normalized?: string;
      }

      export interface Emoticon_list2 {
        appid: number;

        last_used: number;

        name: string;

        name_normalized?: string;

        use_count: number;
      }

      export interface Emoticon_list3 {
        last_used: number;

        name: string;

        use_count: number;
      }

      export interface Emoticon_list4 {
        name: string;
      }
    `,
  },
  'manual merge multiple into one with extra property': {
    interfaceName: 'Chat',
    target: dedent/* ts */`
      export interface Chat {
        emoticons: Emoticon[]
      }

      export interface Emoticon {
        appid?: number;

        last_used?: number;

        name: string;

        name_normalized?: string;

        use_count?: number;
      }
    `,
    source: dedent/* ts */`
      export interface Chat {
        emoticons: (Emoticon_list | Emoticon_list2 | Emoticon_list3 | Emoticon_list4)[]
      }

      export interface Emoticon_list {
        appid: number;

        name: string;

        name_normalized?: string;
      }

      export interface Emoticon_list2 {
        appid: number;

        last_used: number;

        name: string;

        name_normalized?: string;

        use_count: number;
      }

      export interface Emoticon_list3 {
        last_used: number;

        name: string;

        use_count: number;

        name_extra: string;
      }

      export interface Emoticon_list4 {
        name: string;
      }
    `,
  },
  'manual merge multiple into one with wrong optional': {
    interfaceName: 'Chat',
    target: dedent/* ts */`
      export interface Chat {
        emoticons: Emoticon[]
      }

      export interface Emoticon {
        appid?: number;

        last_used?: number;

        name: string;

        name_normalized: string;

        use_count?: number;
      }
    `,
    source: dedent/* ts */`
      export interface Chat {
        emoticons: (Emoticon_list | Emoticon_list2 | Emoticon_list3 | Emoticon_list4)[]
      }

      export interface Emoticon_list {
        appid: number;

        name: string;

        name_normalized?: string;
      }

      export interface Emoticon_list2 {
        appid: number;

        last_used: number;

        name: string;

        name_normalized?: string;

        use_count: number;
      }

      export interface Emoticon_list3 {
        last_used: number;

        name: string;

        use_count: number;

        name_extra: string;
      }

      export interface Emoticon_list4 {
        name: string;
      }
    `,
  },
  'extends base interface that was renamed': {
    interfaceName: 'Data',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Data {
        multipleData: (OtherData | OtherData2)[];
      }

      export interface OtherDataBase {
        asyncProcess(): Promise<number>;

        loop(): number[];

        process(): number;

        bAchieved: boolean;

        bHidden: boolean;

        email: string;

        flAchieved: number;

        id: number;

        name: string;
      }

      export interface OtherData extends OtherDataBase {
        rtUnlocked: number;

        strDescription: string;
      }

      export interface OtherData2 extends OtherDataBase {
        bar: boolean;

        foo: string;
      }
    `,
    source: dedent/* ts */`
      export interface Data {
        multipleData: (MultipleData | MultipleData2)[];
      }

      export interface MultipleDataBase {
        asyncProcess(): Promise<number>;

        loop(): number[];

        process(): number;

        bAchieved: boolean;

        bHidden: boolean;

        email: string;

        flAchieved: number;

        id: number;

        name: string;
      }

      export interface MultipleData extends MultipleDataBase {
        rtUnlocked: number;

        strDescription: string;
      }

      export interface MultipleData2 extends MultipleDataBase {
        bar: boolean;

        foo: string;
      }
    `,
  },
};
