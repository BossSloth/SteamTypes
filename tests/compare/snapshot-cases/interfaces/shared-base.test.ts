import dedent from 'dedent';
import { ComparatorTest, createTest } from '../shared';

export const sharedBaseCases: Record<string, ComparatorTest> = {
  // Both target and source share the same (non-synthetic) base hierarchy and a
  // property declared on a deeply extended base differs. This exercises the
  // recursive base member lookup and the non-synthetic base reconciliation.
  'shared deep base property type mismatch': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface Base {
        id: number;
      }

      export interface Mid extends Base {
        mid: string;
      }

      export interface Admin extends Mid {
        role: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface Base {
        id: string;
      }

      export interface Mid extends Base {
        mid: string;
      }

      export interface Admin extends Mid {
        role: string;
      }`,
  },

  // Synthetic base (base only exists in the target). The shared base property
  // matches by type across the source derived interfaces but differs in its
  // optional modifier, so the sources do not agree and the base member is removed.
  'synthetic base property optional mismatch across sources': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];

        otherChats: OtherChat[];
      }

      export interface BaseChat {
        info: undefined;
      }

      export interface ChatRoom extends BaseChat {
        email: string;
      }

      export interface OtherChat extends BaseChat {
        role: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];
        otherChats: OtherChat[];
      }

      export interface ChatRoom {
        email: string;
        info: string[];
      }

      export interface OtherChat {
        role: string;
        info?: string[];
      }`,
  },

  // Target extends an imported (non-interface) base before the real shared base.
  // The recursive member lookup must skip the imported base when locating the
  // declaring member.
  'shared base behind imported base property mismatch': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      import { ImportedBase } from './imported';

      export interface Config {
        admin: Admin;
      }

      export interface RealBase {
        id: number;
      }

      export interface Admin extends ImportedBase, RealBase {
        role: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface RealBase {
        id: string;
      }

      export interface Admin extends RealBase {
        role: string;
      }`,
  },

  // Synthetic base with an extra derived interface that has no counterpart in the
  // source. When the base member is removed, the re-comparison of derived
  // interfaces must skip the derived interface missing from the source.
  'synthetic base removed with derived missing from source': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];

        otherChats: OtherChat[];
      }

      export interface BaseChat {
        info: undefined;
      }

      export interface ChatRoom extends BaseChat {
        email: string;
      }

      export interface OtherChat extends BaseChat {
        role: string;
      }

      export interface ThirdChat extends BaseChat {
        third: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];
        otherChats: OtherChat[];
      }

      export interface ChatRoom {
        email: string;
        info: string[];
      }

      export interface OtherChat {
        role: string;
        info?: string[];
      }`,
  },

  // Synthetic base where the first source derived interface declares the shared
  // member without a type annotation. The reconciliation cannot agree on a type
  // so the base member is removed.
  'synthetic base property missing type in one source': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        otherChats: OtherChat[];

        chats: ChatRoom[];
      }

      export interface BaseChat {
        info: undefined;
      }

      export interface ChatRoom extends BaseChat {
        email: string;
      }

      export interface OtherChat extends BaseChat {
        role: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        otherChats: OtherChat[];
        chats: ChatRoom[];
      }

      export interface ChatRoom {
        email: string;
        info;
      }

      export interface OtherChat {
        role: string;
        info: string[];
      }`,
  },

  // Target derives from two bases; the first base's subtree does not declare the
  // mismatched member, so the recursive lookup must skip it before finding the
  // member on the second base.
  'shared base member found on second of two bases': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface EmptyBase {
        unrelated: string;
      }

      export interface RealBase {
        id: number;
      }

      export interface Admin extends EmptyBase, RealBase {
        role: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface EmptyBase {
        unrelated: string;
      }

      export interface RealBase {
        id: string;
      }

      export interface Admin extends EmptyBase, RealBase {
        role: string;
      }`,
  },

  // Both target and source share the same (non-synthetic) base hierarchy and a
  // method declared on a deeply extended base differs in its return type. This
  // exercises the method branch of the non-synthetic base reconciliation.
  'shared deep base method return type mismatch': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface Base {
        getId(): number;
      }

      export interface Mid extends Base {
        mid: string;
      }

      export interface Admin extends Mid {
        role: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface Base {
        getId(): string;
      }

      export interface Mid extends Base {
        mid: string;
      }

      export interface Admin extends Mid {
        role: string;
      }`,
  },

  // Shared non-synthetic base method whose parameter type differs, exercising the
  // parameter type comparison on an inherited method.
  'shared base method parameter type mismatch': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface Base {
        setId(id: number): void;
      }

      export interface Admin extends Base {
        role: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface Base {
        setId(id: string): void;
      }

      export interface Admin extends Base {
        role: string;
      }`,
  },

  // Shared non-synthetic base method that gains a parameter from the source,
  // exercising the missing-parameter detection on an inherited method.
  'shared base method parameter added': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface Base {
        setId(): void;
      }

      export interface Admin extends Base {
        role: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface Base {
        setId(id: string): void;
      }

      export interface Admin extends Base {
        role: string;
      }`,
  },

  // Shared non-synthetic base method that loses a parameter relative to the
  // source, exercising the extra-parameter detection on an inherited method.
  'shared base method parameter removed': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface Base {
        setId(id: string, extra: number): void;
      }

      export interface Admin extends Base {
        role: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        admin: Admin;
      }

      export interface Base {
        setId(id: string): void;
      }

      export interface Admin extends Base {
        role: string;
      }`,
  },

  // Synthetic base (base only exists in the target) holding a method. The source
  // derived interfaces agree on the method signature, so the base method is
  // corrected in place to match the agreeing sources.
  'synthetic base method updated from agreeing sources': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];

        otherChats: OtherChat[];
      }

      export interface BaseChat {
        getInfo(): number;
      }

      export interface ChatRoom extends BaseChat {
        email: string;
      }

      export interface OtherChat extends BaseChat {
        role: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];
        otherChats: OtherChat[];
      }

      export interface ChatRoom {
        email: string;
        getInfo(): string;
      }

      export interface OtherChat {
        role: string;
        getInfo(): string;
      }`,
  },

  // Synthetic base holding a method where the source derived interfaces disagree
  // on the signature, so the base method is removed and the derived interfaces
  // are re-compared (inlining the differing methods).
  'synthetic base method removed when sources disagree': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];

        otherChats: OtherChat[];
      }

      export interface BaseChat {
        getInfo(): number;
      }

      export interface ChatRoom extends BaseChat {
        email: string;
      }

      export interface OtherChat extends BaseChat {
        role: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        chats: ChatRoom[];
        otherChats: OtherChat[];
      }

      export interface ChatRoom {
        email: string;
        getInfo(): string;
      }

      export interface OtherChat {
        role: string;
        getInfo(): boolean;
      }`,
  },

  // The source extends a base interface that has no equivalent (or similar)
  // interface in the target, so no rename happens and the base is not queued.
  // The derived interface is large enough that the base stays below the
  // similarity threshold even after its members are inlined.
  'source extends base with no matching target interface': {
    interfaceName: 'Root',
    target: dedent/* ts */`
      export interface Root {
        derived: Derived;
      }

      export interface Derived {
        x: number;
        p1: string;
        p2: string;
        p3: string;
        p4: string;
        p5: string;
      }`,
    source: dedent/* ts */`
      export interface Root {
        derived: Derived;
      }

      export interface Derived extends Mystery {
        x: number;
        p1: string;
        p2: string;
        p3: string;
        p4: string;
        p5: string;
      }

      export interface Mystery {
        alpha: string;
        beta: string;
        gamma: string;
      }`,
  },
};

createTest('Shared Base Interfaces', sharedBaseCases);
