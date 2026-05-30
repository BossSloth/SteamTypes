import dedent from 'dedent';
import { ComparatorTest, createTest } from '../shared';

export const mergedInterfaceCases: Record<string, ComparatorTest> = {
  'manual merge skips unresolved source interface reference': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      import { Imported } from 'somewhere';

      export interface Container {
        items: Item[];
      }

      export interface Item {
        id: number;
        name: string;
      }
      `,
    source: dedent/* ts */`
      import { Imported } from 'somewhere';

      export interface Container {
        items: (Item | Imported)[];
      }

      export interface Item {
        id: number;
        name: string;
      }
      `,
  },

  'adds new interface even when structurally similar to an existing one if source has both': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        existing: Existing;
      }

      export interface Existing {
        a: number;

        b: number;

        c: number;

        d: number;
      }
      `,
    source: dedent/* ts */`
      export interface Container {
        existing: Existing;
        added: NewSimilar;
      }

      export interface Existing {
        a: number;
        b: number;
        c: number;
        d: number;
      }

      export interface NewSimilar {
        a: number;
        b: number;
        c: number;
        d: number;
        e: number;
      }
      `,
  },

  'manual merge falls back when source property type mismatches target': {
    interfaceName: 'Container',
    target: dedent/* ts */`
      export interface Container {
        items: Item[];
      }

      export interface Item {
        id: number;
        name: string;
      }
      `,
    source: dedent/* ts */`
      export interface Container {
        items: (Item | Item2)[];
      }

      export interface Item {
        id: number;
        name: string;
      }

      export interface Item2 {
        id: string;
        name: string;
      }
      `,
  },
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
  'merge multiple array into one': {
    interfaceName: 'Data',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface Data {
        clientData: ClientData[];
      }

      export interface ClientData {
        active_beta?: string;

        client_name: string;

        clientid: string;

        display_status: number;

        installed?: boolean;

        is_available_on_current_platform?: boolean;

        status_percentage?: number;
      }
    `,
    source: dedent/* ts */`
      export interface Data {
        clientData: (ClientData[] | ClientData2[]);
      }

      export interface ClientData {
        client_name: string;

        clientid: string;

        display_status: number;

        installed?: boolean;

        is_available_on_current_platform?: boolean;

        status_percentage?: number;
      }

      export interface ClientData2 {
        client_name: string;

        clientid: string;

        display_status: number;

        installed: boolean;

        status_percentage: number;
      }
    `,
  },
};

createTest('Interface Merging', mergedInterfaceCases);
