import dedent from 'dedent';
import { ComparatorTest, createTest } from '../shared';

/**
 * Authored rename fixtures that the programmatic `createRenamedTest` generator cannot reproduce:
 * type-alias renames and deliberate member/structural reshuffles. The broad "rename detection"
 * coverage is generated per-theme via `createRenamedTest` co-located in each theme file.
 */
export const authoredRenameCases: Record<string, ComparatorTest> = {
  'external template literal types': {
    interfaceName: 'RouteConfig',
    expectsNoDiff: true,
    target: dedent /* ts */ `
      export type HttpMethodType = 'GET' | 'POST';
      export type ResourceTypeValue = 4 | 5;

      export interface RouteConfig {
        method: HttpMethodType;

        path: string;

        type: ResourceTypeValue;
      }`,
    source: dedent /* ts */ `
      export interface RouteConfig {
        method: string;

        path: string;

        type: number;
      }`,
  },

  'external template literal types with missing type': {
    interfaceName: 'RouteConfig',
    target: dedent /* ts */ `
      export type HttpMethodType = 'GET' | 'POST';
      export type ResourceTypeValue = 4 | 5;

      export interface RouteConfig {
        method: HttpMethodType;
        path: string;
        type: ResourceTypeValue;
      }`,
    source: dedent /* ts */ `
      export interface RouteConfig {
        method: number;
        path: string;
        type: number;
      }`,
  },

  'interface with complex nested structures': {
    interfaceName: 'AppConfig',
    target: dedent /* ts */ `
      export interface AppConfig {
        api: ApiSettings;
        ui: UiSettings;
      }

      export interface ApiSettings {
        baseUrl: string;
        timeout: number;
        isActive: boolean;
        extraInfo: string;
      }

      export interface UiSettings {
        theme: string;
      }`,
    source: dedent /* ts */ `
      export interface AppConfig {
        api: ApiConfig;
        ui: UiConfig;
        features: Record<string, boolean>;
      }

      export interface ApiConfig {
        baseUrl: string;
        timeout: number;
        headers: Record<string, string>;
        endpoints: Record<string, EndpointConfig>;
        extraInfo: string;
        isActive: boolean;
      }

      export interface EndpointConfig {
        method: string;
        path: string;
        requiresAuth: boolean;
      }

      export interface UiConfig {
        theme: string;
        layout: 'vertical' | 'horizontal';
        animations: boolean;
        components: ComponentsConfig;
      }

      export interface ComponentsConfig {
        button: ButtonConfig;
        input: InputConfig;
      }

      export interface ButtonConfig {
        borderRadius: number;
        fontSize: number;
      }

      export interface InputConfig {
        borderRadius: number;
        padding: number;
      }`,
  },

  'interface with property and member renamed': {
    interfaceName: 'ChatMessage',
    target: dedent /* ts */ `
      export interface ChatMessage {
        content: TextData;
        id: string;
        sender: string;
        timestamp: number;
      }

      export interface TextInformation {
        text: string;
        informationFormat: 'plain' | 'markdown';
      }`,
    source: dedent /* ts */ `
      export interface ChatMessage {
        content: MessageContent;
        id: string;
        read: boolean;
        sender: string;
        timestamp: number;
      }

      export interface MessageContent {
        type: 'text' | 'image' | 'file';
        data: TextData;
      }

      export interface TextData {
        text: string;
        format: 'plain' | 'markdown' | 'html';
      }

      export interface ImageData {
        url: string;
        width: number;
        height: number;
        alt?: string;
      }

      export interface FileData {
        url: string;
        name: string;
        size: number;
        type: string;
      }`,
  },

  'renamed interface below similarity threshold is updated in place': {
    interfaceName: 'AppDetails',
    target: dedent /* ts */ `
      export interface AppDetails {
        selectedLanguage: AppLanguage;
        vecLanguages: AppLanguage[];
      }

      export interface AppLanguage {
        strDisplayName: string;
        strShortName: string;
      }`,
    source: dedent /* ts */ `
      export interface AppDetails {
        selectedLanguage: SelectedLanguage;
        vecLanguages: SelectedLanguage[];
      }

      export interface SelectedLanguage {
        strShortName: string;
      }`,
  },

  'renamed union member below similarity threshold is updated in place': {
    interfaceName: 'AppDetails',
    target: dedent /* ts */ `
      export interface AppDetails {
        libraryAssets?: AppLibraryAssets | LegacyLibraryAssets | ToolLibraryAssets | DedicatedServerLibraryAssets;
      }

      export interface AppLibraryAssets {
        strCapsuleImage: string;
        strHeaderImage: string;
        strHeroImage: string;
        strLogoImage: string;
      }

      export interface LegacyLibraryAssets {
        strCapsuleImage: string;
        strHeaderImage: string;
        strLibraryHero: string;
      }

      export interface ToolLibraryAssets {
        strHeaderImage: string;
        strLogoImage: string;
      }

      /**
       * Dedicated server assets.
       */
      export interface DedicatedServerLibraryAssets {
        strHeaderImage: string;
        strHeroBlurImage: string;
        strHeroImage: string;
        strLogoImage: string;
      }`,
    source: dedent /* ts */ `
      export interface AppDetails {
        libraryAssets?: LibraryAssets | LibraryAssets2 | LibraryAssets3 | LibraryAssets4;
      }

      export interface LibraryAssets {
        strCapsuleImage: string;
        strHeaderImage: string;
        strHeroImage: string;
        strLogoImage: string;
      }

      export interface LibraryAssets2 {
        strCapsuleImage: string;
        strHeaderImage: string;
        strLibraryHero: string;
      }

      export interface LibraryAssets3 {
        strHeaderImage: string;
        strLogoImage: string;
      }

      export interface LibraryAssets4 {
        logoPosition: string;
        strCapsuleImage: string;
        strHeaderImage: string;
        strHeaderImage_2x: string;
      }`,
  },

  'replacement interface with no shared properties is added as new': {
    interfaceName: 'Parent',
    target: dedent /* ts */ `
      export interface Parent {
        child: OldChild;
      }

      export interface OldChild {
        a: string;
      }`,
    source: dedent /* ts */ `
      export interface Parent {
        child: NewChild;
      }

      export interface NewChild {
        b: number;
      }`,
  },

  'source interface with the target name is not paired by position': {
    interfaceName: 'Root',
    target: dedent /* ts */ `
      export interface Root {
        a: Foo;
      }

      export interface Foo {
        x: string;
        y: number;
      }`,
    source: dedent /* ts */ `
      export interface Root {
        a: Bar;
        b: Foo;
      }

      export interface Bar {
        x: string;
      }

      export interface Foo {
        x: string;
        y: number;
      }`,
  },
};

createTest('Authored Renames', authoredRenameCases);
