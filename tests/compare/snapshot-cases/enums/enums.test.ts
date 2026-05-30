import dedent from 'dedent';
import { ComparatorTest, createTest } from '../shared';

export const enumCases: Record<string, ComparatorTest> = {
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

  'property with enum value changes': {
    interfaceName: 'StatusConfig',
    target: dedent/* ts */`
      export interface StatusConfig {
        status: ConnectionStatus;
        message: string;
      }

      export enum ConnectionStatus {
        CONNECTED = 1,
        DISCONNECTED = 2,
        PENDING = 3,
      }`,
    source: dedent/* ts */`
      export interface StatusConfig {
        /**
         * @currentValue 5
         */
        status: number;
        message: string;
        errorCode?: number;
      }`,
  },

  'property with enum stays same': {
    interfaceName: 'StatusConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface StatusConfig {
        message: string;

        status: ConnectionStatus;
      }

      export enum ConnectionStatus {
        CONNECTED = 1,
        DISCONNECTED = 2,
        PENDING = 3,
      }`,
    source: dedent/* ts */`
      export interface StatusConfig {
        /**
         * @currentValue 2
         */
        status: number;
        message: string;
      }`,
  },

  'property with enum stays same different name': {
    interfaceName: 'StatusConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface StatusConfig {
        eResult: StatusResultType;

        message: string;
      }

      export enum StatusResultType {
        CONNECTED = 1,
        DISCONNECTED = 2,
        PENDING = 3,
      }`,
    source: dedent/* ts */`
      export interface StatusConfig {
        /**
         * @currentValue 2
         */
        eResult: number;
        message: string;
      }`,
  },

  'interface with implied enum property': {
    interfaceName: 'SteamStatus',
    target: dedent/* ts */`
      export interface SteamStatus {
        m_eResult: number;
        m_bRequireRestart: boolean;
      }`,
    source: dedent/* ts */`
      export interface SteamStatus {
        /**
         * @currentValue 1
         */
        m_eResult: number;
        m_bRequireRestart: boolean;
        /**
         * This value is an enum
         * @currentValue 0
         */
        m_eAppUpdateBytes: number;
      }`,
  },

  'property with shorter enum value changes': {
    interfaceName: 'StatusConfig',
    target: dedent/* ts */`
      export interface StatusConfig {
        eStatus: ConnectionStatus;
        message: string;
      }

      export enum ConnectionStatus {
        CONNECTED = 1,
        DISCONNECTED = 2,
        PENDING = 3,
      }`,
    source: dedent/* ts */`
      export interface StatusConfig {
        /**
         * @currentValue 5
         */
        eStatus: number;
        message: string;
        errorCode?: number;
      }`,
  },

  'shorted implied enum property': {
    interfaceName: 'SteamStatus',
    target: dedent/* ts */`
      export interface SteamStatus {
        eResult: number;
      }`,
    source: dedent/* ts */`
      export interface SteamStatus {
        /**
         * @currentValue 1
         */
        eResult: number;
        /**
         * This value is an enum
         * @currentValue 0
         */
        eAppUpdateBytes: number;
      }`,
  },

  'flags enum': {
    interfaceName: 'StatusConfig',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface StatusConfig {
        eStatusFlags: EStatusFlags;

        message: string;
      }

      export enum EStatusFlags {
        CONNECTED = 1 << 0,
        DISCONNECTED = 1 << 1,
        PENDING = 1 << 2,
      }`,
    source: dedent/* ts */`
      export interface StatusConfig {
        /**
         * @currentValue 7
         */
        eStatusFlags: number;
        message: string;
      }`,
  },

  'flags enum with missing value': {
    interfaceName: 'StatusConfig',
    target: dedent/* ts */`
      export interface StatusConfig {
        eStatusFlags: EStatusFlags;

        message: string;
      }

      export enum EStatusFlags {
        CONNECTED = 1 << 0,
        DISCONNECTED = 1 << 1,
        PENDING = 1 << 2,
      }`,
    source: dedent/* ts */`
      export interface StatusConfig {
        /**
         * @currentValue 12
         */
        eStatusFlags: number;
        message: string;
      }`,
  },
  'target enum keeps type when source is plain number': {
    interfaceName: 'EnumProperty',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export enum Status {
        Ready = 1,
        Working = 2,
      }

      export interface EnumProperty {
        status: Status;
      }`,
    source: dedent/* ts */`
      export interface EnumProperty {
        status: number;
      }`,
  },
  'optional imported enum is preserved when source has @currentValue': {
    interfaceName: 'EnumProperty',
    expectsNoDiff: true,
    target: dedent/* ts */`
      import { StoreAppType } from 'other-file';

      export interface EnumProperty {
        m_eAppType?: StoreAppType;
      }`,
    source: dedent/* ts */`
      export interface EnumProperty {
        /**
         * @currentValue 0
         */
        m_eAppType?: number;
      }`,
  },
  'existing enum is used when source has @currentValue': {
    interfaceName: 'EnumProperty',
    target: dedent/* ts */`
      export interface EnumProperty {
        foo: number;

        /**
         * @currentValue 1
         * @currentValue 2
         */
        m_eStatus: number;

        /**
         * @currentValue 1
         * @currentValue 2
         */
        otherThing: EStatus;
      }

      export enum EStatus {
        EStatus1 = 1,
        EStatus2 = 2,
      }
      `,
    source: dedent/* ts */`
      export interface EnumProperty {
        foo: number;
        /**
         * @currentValue 1
         * @currentValue 2
         */
        m_eStatus: number;
        /**
         * @currentValue 1
         * @currentValue 2
         */
        otherThing: number;
      }`,
  },
};

createTest('Enums', enumCases);
