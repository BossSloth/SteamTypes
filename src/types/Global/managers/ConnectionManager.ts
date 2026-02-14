import { Callbacks } from 'shared/interfaces';
import { SteamID } from 'shared/steamid';

export interface ConnectionManager {
  AddOnDisconnectCallback(callback: (param0: unknown) => void, serverId?: number): unknown;

  AddOnLogonCallback(callback: () => void, serverId?: number): unknown;

  BConnectedToServer(e: unknown): unknown;

  BDisconnected(): unknown;

  BInternalShouldDispatchMessage(e: unknown): boolean;

  BIsConnected(): unknown;

  BPerformedInitialClockAdjustment(): unknown;

  ClearHeartbeatInterval(): void;

  Connect(): Promise<unknown>;

  /**
   * @param n default: !0
   */
  DEBUG_LogCMInterfaceActivity(e: unknown, t: unknown, n?: boolean): void;

  DEBUG_LogMessage(e: unknown, ...t: unknown[]): void;

  Disconnect(): void;

  DispatchMessage(e: unknown): void;

  ForceDisconnect(): void;

  GetAnonymousServiceTransport(): unknown;

  GetServerRTime32(): number;

  GetServerTimeMS(): unknown;

  GetServiceTransport(): unknown;

  InternalAdjustClock(): Promise<unknown>;

  m_hEMsgRegistrationObserver(): void;

  MakeReady(): unknown;

  OnConnect(): void;

  /**
   * @native
   */
  OnConnectionAttemptThrottled(): unknown;

  OnDisconnect(): void;

  OnLoggedOn(): void;

  OnLogonInfoChanged(e: unknown): void;

  OnMsgRecvd(e: unknown): void;

  OnSharedConnectionClosed(): void;

  OnSharedConnectionEstablished(e: unknown): void;

  ResetHeartbeatInterval(): void;

  ResolveAwaitWithTransportError(e: unknown, t: unknown, n: unknown, r: unknown): void;

  RTime32ToDate(e: unknown): Date;

  RunOnDisconnectCallbacks(e: unknown, t: unknown): void;

  RunWhenLoggedOn(e: unknown, t: unknown): void;

  Send(e: unknown): unknown;

  SendHeartbeat(): void;

  SendInternal(e: unknown): boolean;

  SendMsgAndAwaitResponse(e: unknown, t: unknown): Promise<unknown>;

  WaitUntilLoggedOn(): Promise<unknown>;

  account_flags: number;

  ClientServersAvailableHandler: ClientServersAvailableHandler;

  has_completed_initial_connect: boolean;

  logged_on: boolean;

  m_bCompletedInitialConnect: boolean;

  m_bConnected: boolean;

  m_bConnectionFailed: boolean;

  m_bForceDisconnect: boolean;

  m_bLoggedOn: boolean;

  m_bPerformedInitialClockAdjustment: boolean;

  m_callbacksOnConnect: m_callbacksOnConnect;

  m_callbacksOnConnectOneTime: m_callbacksOnConnect;

  m_callbacksOnDisconnect: m_callbacksOnConnect;

  m_callbacksOnDisconnectOneTime: m_callbacksOnConnect;

  m_hSharedConnection: number;

  m_messageHandlers: m_messageHandlers;

  m_nPerfClockServerMSOffset: number;

  m_nWallClockDriftMS: number;

  m_onConnect?: Promise<unknown> | undefined;

  m_rtReconnectThrottleExpiration: number;

  m_rtReconnectThrottleStart: number;

  m_ServiceTransport: ServiceTransport;

  m_setConnectedServers: Set<number>;

  m_setEMsgHandlers: Set<number>;

  m_setServiceMethodHandlers: Set<string>;

  m_steamid: SteamID;

  m_strIPCountry: string;

  m_strPersonaName: string;

  m_unAccountFlags: number;

  messageHandlers: m_messageHandlers;

  persona_name: string;

  rtReconnectThrottleExpiration: number;

  rtReconnectThrottleStart: number;

  steamid: SteamID;
}

export interface ClientServersAvailableHandler {
  invoke(e: unknown): void;

  unregister(): void;
}

export interface m_callbacksOnConnect {
  AddCallback(e: unknown, t: unknown): unknown;

  RunAllCallbacks(e: unknown, ...t: unknown[]): void;

  RunCallbacks(e: unknown, ...t: unknown[]): void;

  m_bRunOnce: boolean;

  m_ClientConnectionCallbacks: Callbacks;

  m_mapServerTypeCallbacks: never;
}

export interface m_messageHandlers {
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

  emsg_list: number[];

  m_ErrorReportingStore: m_ErrorReportingStore;

  m_mapCallbacks: Map<number, m_mapCallbacks[]>;

  m_mapServiceMethodHandlers: Map<string, m_mapCallbacks[]>;

  m_rgRegisteredEMsgs: number[];

  m_rgRegisteredServiceMethodHandlers: string[];

  servicemethod_list: string[];
}

export interface ServiceTransport {
  /**
   * @native
   */
  MakeReady(): unknown;

  SendMsg(e: unknown, t: unknown, n: unknown): unknown;

  SendNotification(e: unknown, t: unknown): unknown;
}

export interface m_ErrorReportingStore {
  BIsBlacklisted(e: unknown): boolean;

  /**
   * @param n default: {}
   */
  Init(e: unknown, t: unknown, r: unknown, n?: unknown): void;

  m_fnGetReportingInterval(): number;

  m_fnGetReportTags(): never[];

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

  m_rgErrorQueue: m_rgErrorQueue[];

  m_sendTimer: null | number;

  m_strProduct: string;

  m_strVersion: string;

  m_transport: ServiceTransport;

  product: string;

  reporting_enabled: boolean;

  version: string;
}

export interface m_mapCallbacks {
  invoke(n: unknown, r: unknown): void;

  /**
   * This is a class function
   */
  msgClass: unknown;
}

export interface m_rgErrorQueue {
  identifier: string;

  identifierHash: string;

  message: ((number | string)[] | string)[];
}
