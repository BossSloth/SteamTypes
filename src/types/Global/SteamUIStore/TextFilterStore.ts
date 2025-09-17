import type { Message as JsPbMessage } from 'google-protobuf';
import { ObservableMap } from 'mobx';

export interface TextFilterStore {
  BHasFilter(): boolean;

  BRebuildFilter(e: unknown, t: unknown): boolean;

  BShownFilterTip(): unknown;

  CreatePattern(e: unknown): string;

  CreateProfanityReplacement(e: unknown): string;

  DeobfuscateString(e: unknown): unknown;

  FilterText(e: unknown, t: unknown): unknown;

  GetSteamEngineTextFilterDictionary(e: unknown, t: unknown): unknown;

  GetStorageKey(e: unknown): string;

  /**
   * @param e default: 0
   * @param t default: null
   * @param r default: null
   */
  Init(e?: number, t?: null, r?: null): Promise<void>;

  InitFiltersWithRetry(): Promise<void>;

  InitSteamEngineLanguage(e: unknown): void;

  InitSteamEngineLanguages(): void;

  LoadFilter(): Promise<void>;

  LoadLanguage(e: unknown): Promise<void>;

  /**
   * @param e default: 15
   */
  LoadLanguages(e?: number): Promise<void>;

  LoadObfuscatedString(e: unknown): Promise<unknown>;

  LoadTextFilterPreferences(): Promise<void>;

  LoadTextFilterWords(): Promise<void>;

  ObfuscateString(e: unknown): unknown;

  OnFilterDataChanged(): void;

  OnTextFilterDictionaryChanged(e: unknown): 1;

  RequestUpdatedSettings(): Promise<void>;

  SaveFilter(): void;

  SaveObfuscatedString(e: unknown, t: unknown): Promise<void>;

  SaveTextFilterPreferences(): void;

  SaveTextFilterWords(): void;

  SetFilterTipShown(e: unknown): void;

  UpdateCommunityPreferences(e: unknown): void;

  UpdateTextFilterWords(e: unknown): void;

  m_bFilterChangedWhileLoading: boolean;

  m_bInitialized: boolean;

  m_bOngoingLoad: boolean;

  m_bShownFilterTip: boolean;

  m_DataAccess: DataAccess;

  m_mapPlayerCache: ObservableMap<unknown, unknown>;

  m_nLoadLanguagesRetryTimeout: undefined;

  m_regexBannedWords: null;

  m_regexCleanWords: RegExp;

  m_Storage: object;

  m_strBannedPattern: string;

  m_strBannedWords: string;

  m_strCleanPattern: string;

  m_strCleanWords: string;

  m_strProfanityWords: string;

  m_TextFilterPreferences: TextFilterPreferences;

  m_TextFilterWords: TextFilterWords;

  m_Transport: null;

  m_unAccountID: number;

  m_WebUIServiceTransport: WebUIServiceTransport;

  TextFilterPreferences: TextFilterPreferences;
}

export interface DataAccess {
  BIsFriend(e: unknown): unknown;
}

export interface TextFilterPreferences {
  bIgnoreFriends: number;

  eTextFilterSetting: ChatFilterType;
}

export interface TextFilterWords extends JsPbMessage {
  add_text_filter_custom_banned_words(t: unknown, n: unknown): void;

  add_text_filter_custom_clean_words(t: unknown, n: unknown): void;

  set_text_filter_custom_banned_words(n: unknown): unknown;

  set_text_filter_custom_clean_words(n: unknown): unknown;

  set_text_filter_words_revision(n: unknown): unknown;

  text_filter_custom_banned_words(): unknown;

  text_filter_custom_clean_words(): unknown;

  text_filter_words_revision(): unknown;
}

export interface WebUIServiceTransport {
  BIsValid(): unknown;

  ConnectToSite(e: unknown): Promise<unknown>;

  CreateConnection(e: unknown, t: unknown, r: unknown, n: unknown): void;

  DispatchMethodResponse(e: unknown): undefined;

  DispatchNotification(e: unknown): void;

  DispatchTransportStatusUpdate(): void;

  FailAllPendingRequests(): void;

  GetConnectionDetails(e: unknown): unknown;

  GetMaximumMsgSizeBytes(): unknown;

  Init(): Promise<void>;

  /**
   * @native
   */
  m_fnOnReconnectErrorHandler(): unknown;

  /**
   * @native
   */
  m_fnOnStatusEventHandler(): unknown;

  MakeReady(): Promise<{ result: number; message: string; }>;

  OnStartShutdown(e: unknown): number;

  OnWebsocketClose(e: unknown): void;

  OnWebsocketMessage(e: unknown): void;

  OnWebsocketReconnectFinish(e: unknown): undefined;

  OnWebsocketReconnectStart(e: unknown): void;

  ReportError(e: unknown): void;

  SendAuthMessage(e: unknown): Promise<unknown>;

  SendMsg(e: unknown, t: unknown, r: unknown, n: unknown): Promise<unknown>;

  SendNotification(e: unknown, t: unknown, r: unknown): boolean;

  SetReconnectErrorHandler(e: unknown): void;

  SetStatusEventHandler(e: unknown): void;

  TEST_GetExcessivelyLargeBodySize(): number;

  TEST_GetMaximumMsgBodySizeBytes(): number;

  TEST_GetMsgHeaderEstimatedSizeBytes(): number;

  m_bInitialized: boolean;

  m_iMsgSeq: number;

  m_mapConnectionDetails: Map<number, MapConnectionDetails>;

  m_mapPendingMethodRequests: Map<unknown, unknown>;

  m_mapServiceCallErrorCount: Map<unknown, unknown>;

  m_messageHandlers: MessageHandlers;

  m_nMaximumMsgSizeBytes: number;

  messageHandlers: MessageHandlers;
}

export interface MapConnectionDetails {
  connection: Connection;

  /**
   * This value is an enum
   * @currentValue 1
   * @currentValue 2
   */
  eClientExecutionSite: EClientExecutionSite;

  sAuthKey: string;

  sUrl: string;
}

export interface MessageHandlers {
  AddCallback(e: unknown, t: unknown, n: unknown): { invoke: unknown; unregister: () => void; };

  AddServiceMethodHandler(e: unknown, t: unknown): { invoke: (n: unknown, r: unknown) => void; unregister: () => void; };

  AddServiceNotificationHandler(e: unknown, t: unknown): { invoke: (n: unknown, r: unknown) => void; unregister: () => void; };

  DEBUG_LogMessageDispatch(e: unknown, t: unknown): void;

  DispatchMsgToHandlers(e: unknown, t: unknown): boolean;

  InstallErrorReportingStore(e: unknown): void;

  RegisterBaseEMessageHandler(e: unknown, t: unknown): unknown;

  RegisterEMessageAction(e: unknown, t: unknown, n: unknown): unknown;

  RegisterEMessageHandler(e: unknown, t: unknown, n: unknown): unknown;

  RegisterServiceMethodHandler(e: unknown, t: unknown): unknown;

  RegisterServiceMethodHandlerAction(e: unknown, t: unknown): unknown;

  RegisterServiceNotificationHandler(e: unknown, t: unknown): unknown;

  RegisterServiceNotificationHandlerAction(e: unknown, t: unknown): unknown;

  emsg_list: unknown[];

  m_ErrorReportingStore: ErrorReportingStore;

  m_mapCallbacks: Map<unknown, unknown>;

  m_mapServiceMethodHandlers: Map<string, MapServiceMethodHandlers[]>;

  m_rgRegisteredEMsgs: unknown[];

  m_rgRegisteredServiceMethodHandlers: string[];

  servicemethod_list: string[];
}

export interface Connection {
  BCanSendMessages(): boolean;

  BShouldReconnect(): boolean;

  Connect(e: unknown): Promise<unknown>;

  ConnectToSocket(e: unknown, t: unknown): Promise<{ result: number; message: string; }>;

  ConnectWithRetry(e: unknown, t: unknown, r: unknown): Promise<unknown>;

  Disconnect(): void;

  GetInterAttemptBackoffMs(e: unknown): number;

  /**
   * @native
   */
  m_fnOnCloseHandler(): unknown;

  /**
   * @native
   */
  m_fnOnMessageHandler(): unknown;

  /**
   * @native
   */
  m_fnOnReconnectFinishHandler(): unknown;

  /**
   * @native
   */
  m_fnOnReconnectStartHandler(): unknown;

  OnSocketClose(e: unknown): undefined;

  OnSocketError(e: unknown): void;

  OnSocketMessage(e: unknown): Promise<void>;

  OnSocketOpen(e: unknown): void;

  PrepareForShutdown(): void;

  Reconnect(): Promise<unknown>;

  SendSerializedMessage(e: unknown): 2 | 1;

  StartReconnect(): Promise<undefined>;

  WaitForSocketOpen(e: unknown, t: unknown): Promise<boolean>;

  Log: Log;

  m_bConnecting: boolean;

  m_bDisconnectRequested: boolean;

  m_bReconnectOnFailure: boolean;

  m_nConnectAttemptsMax: number;

  m_nConnectAttemptTimeoutMs: number;

  m_nReconnectAttemptsMax: number;

  m_nReconnectAttemptTimeoutMs: number;

  m_sName: string;

  m_socket: object;

  m_sURL: string;

  name: string;
}

export interface ErrorReportingStore {
  BIsBlacklisted(e: unknown): boolean;

  /**
   * @param n default: {}
   */
  Init(e: unknown, t: unknown, r: unknown, n?: unknown): void;

  m_fnGetReportingInterval(): number;

  PauseReporting(): void;

  PauseReportingForDuration(e: unknown): void;

  QueueReport(e: unknown): void;

  ReportError(e: unknown, t: unknown): Promise<{ identifier: unknown; identifierHash: unknown; message: unknown; } | null>;

  ResumeReporting(): void;

  ScheduleSend(): void;

  SendErrorReport(e: unknown): void;

  SendErrorReports(e: unknown): void;

  m_bEnabled: boolean;

  m_bInitialized: boolean;

  m_bReportingPaused: boolean;

  m_pauseTimer: number;

  m_rgErrorQueue: RgErrorQueue[];

  m_sendTimer: number | null;

  m_strProduct: string;

  m_strVersion: string;

  m_transport: Transport;

  product: string;

  reporting_enabled: boolean;

  version: string;
}

export interface MapServiceMethodHandlers {
  invoke(n: unknown, r: unknown): void;

  msgClass(): unknown;
}

export interface Log {
  Assert(e: unknown, ...t: unknown[]): void;

  Debug(): void;

  Error(): void;

  Info(): void;

  IsDebugEnabled(): unknown;

  Log(e: unknown, ...t: unknown[]): void;

  m_fnIdGenerator(): unknown;

  Warning(): void;

  m_sName: string;
}

export interface RgErrorQueue {
  identifier: string;

  identifierHash: string;

  message: ((number | string)[] | string)[];
}

export interface Transport {
  /**
   * @native
   */
  MakeReady(): unknown;

  SendMsg(e: unknown, t: unknown, n: unknown): unknown;

  SendNotification(e: unknown, t: unknown): unknown;
}

export enum ChatFilterType {
  Enabled = 1,
  AllowProfanity = 2,
  Disabled = 3,
}

/** @generated */
export enum EClientExecutionSite {
  EClientExecutionSite1 = 1,
  EClientExecutionSite2 = 2,
}
