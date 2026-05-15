import { Callbacks } from 'shared/interfaces';
import { ProtobufClass, ProtobufInterface, ProtobufNotification, RequestHandler } from 'shared/protobuf';
import { SteamID } from 'shared/steamid';
import { EResult } from 'SteamClient/shared';

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

  m_messageHandlers: MessageHandlers;

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

  messageHandlers: MessageHandlers;

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

export interface MessageRegistration<TInvoke extends (...args: never[]) => unknown> {
  unregister(): void;

  invoke: TInvoke;
}

export type EMsgCallback<T> = (msg: ProtobufNotification<T>) => void;

export type EMsgDeserializedCallback<T> = (msg: ProtobufInterface<T>) => void;

export type ServiceMethodCallback<TReq, TResp> = (
  req: ProtobufInterface<TReq>,
  resp: ProtobufInterface<TResp>,
) => EResult | Promise<EResult>;

export type ServiceNotificationCallback<TReq> = (req: ProtobufInterface<TReq>) => void;

export interface MessageHandlers {
  AddCallback<T>(
    eMsg: number,
    msgClass: ProtobufClass<T> | undefined,
    callback: EMsgCallback<T>,
  ): MessageRegistration<EMsgCallback<T>>;

  AddServiceMethodHandler<TReq, TResp>(
    method: RequestHandler<TReq, TResp>,
    handler: ServiceMethodCallback<TReq, TResp>,
  ): MessageRegistration<(msg: ProtobufNotification<TReq>, sendResponse: (resp: ProtobufInterface<TResp>) => void) => void>;

  AddServiceNotificationHandler<TReq>(
    method: RequestHandler<TReq>,
    handler: ServiceNotificationCallback<TReq>,
  ): MessageRegistration<(msg: ProtobufNotification<TReq>) => void>;

  DEBUG_LogMessageDispatch(msg: ProtobufNotification<unknown>, handler: MessageCallback): void;

  DispatchMsgToHandlers(
    msg: ProtobufNotification<unknown>,
    sendResponse: (resp: ProtobufInterface<unknown>) => void,
  ): boolean;

  InstallErrorReportingStore(store: ErrorReportingStore): void;

  RegisterBaseEMessageHandler<T>(
    eMsg: number,
    callback: EMsgCallback<T>,
  ): MessageRegistration<EMsgCallback<T>>;

  RegisterEMessageAction<T>(
    eMsg: number,
    msgClass: ProtobufClass<T>,
    callback: EMsgDeserializedCallback<T>,
  ): MessageRegistration<EMsgCallback<T>>;

  RegisterEMessageHandler<T>(
    eMsg: number,
    msgClass: ProtobufClass<T>,
    callback: EMsgDeserializedCallback<T>,
  ): MessageRegistration<EMsgCallback<T>>;

  RegisterServiceMethodHandler<TReq, TResp>(
    method: RequestHandler<TReq, TResp>,
    handler: ServiceMethodCallback<TReq, TResp>,
  ): MessageRegistration<(msg: ProtobufNotification<TReq>, sendResponse: (resp: ProtobufInterface<TResp>) => void) => void>;

  RegisterServiceMethodHandlerAction<TReq, TResp>(
    method: RequestHandler<TReq, TResp>,
    handler: ServiceMethodCallback<TReq, TResp>,
  ): MessageRegistration<(msg: ProtobufNotification<TReq>, sendResponse: (resp: ProtobufInterface<TResp>) => void) => void>;

  RegisterServiceNotificationHandler<TReq>(
    method: RequestHandler<TReq>,
    handler: ServiceNotificationCallback<TReq>,
  ): MessageRegistration<(msg: ProtobufNotification<TReq>) => void>;

  RegisterServiceNotificationHandlerAction<TReq>(
    method: RequestHandler<TReq>,
    handler: ServiceNotificationCallback<TReq>,
  ): MessageRegistration<(msg: ProtobufNotification<TReq>) => void>;

  emsg_list: number[];

  m_ErrorReportingStore: ErrorReportingStore;

  m_mapCallbacks: Map<number, MessageCallback[]>;

  m_mapServiceMethodHandlers: Map<string, MessageCallback[]>;

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

export interface ErrorReportingStore {
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

  m_rgErrorQueue: RgErrorQueue[];

  m_sendTimer: null | number;

  m_strProduct: string;

  m_strVersion: string;

  m_transport: ServiceTransport;

  product: string;

  reporting_enabled: boolean;

  version: string;
}

export interface MessageCallback<T = unknown> {
  invoke(msg: ProtobufNotification<T>, sendResponse?: (resp: ProtobufInterface<unknown>) => void): void;

  /**
   * This is the protobuf class for the message
   */
  msgClass: ProtobufClass<T> | undefined;
}

export interface RgErrorQueue {
  identifier: string;

  identifierHash: string;

  message: ((number | string)[] | string)[];
}
