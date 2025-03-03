export interface AppDetailsStore {
  AppDetailsChanged(): unknown /* native code */;
  BAchievementIsHiddenAndAchieved(e: unknown, t: unknown): boolean;
  BHasMarketPresence(e: unknown): unknown;
  BHasRecentlyLaunched(e: unknown): unknown;
  BIsWorkshopVisible(e: unknown): unknown;
  ClearCustomLogoPosition(e: unknown): unknown;
  CMInterface(): unknown;
  GetAchievements(e: unknown): unknown;
  GetAjaxLibraryAppDetails(): unknown /* native code */;
  GetAppData(e: unknown): unknown;
  GetAppDetails(e: unknown): unknown;
  GetAppDetailsSpotlight(e: unknown): unknown;
  GetAssociations(e: unknown): unknown;
  GetCustomLogoPosition(e: unknown): unknown;
  GetDescriptions(e: unknown): unknown;
  GetHeaderImages(e: unknown): unknown[];
  GetHeaderImagesForAppId(e: unknown, t: unknown, r: unknown): unknown[];
  GetHeroBlurImages(e: unknown): unknown;
  GetHeroBlurImagesForAppId(e: unknown, t: unknown, r: unknown): unknown[];
  GetHeroImages(e: unknown): { rgHeroImages: any[]; bHasHeroImage: any; appid: any };
  GetHeroImagesForAppId(e: unknown, t: unknown, r: unknown): { rgHeroImages: any[]; bHasHeroImage: boolean };
  GetLogoImages(e: unknown): { rgLogoImages: any[]; logoPosition: any };
  GetLogoImagesForAppId(e: unknown, t: unknown, r: unknown): { rgLogoImages: any[]; logoPosition: any };
  Init(e: unknown): void;
  MarkAppAsRecentlyLaunched(e: unknown): void;
  RegisterForAppData(e: unknown, t: unknown): { unregister: () => void };
  RequestAchievements(): unknown /* native code */;
  RequestAppDetails(): unknown;
  RequestAppDetailsSpotlight(): unknown;
  RequestAssociationData(): unknown /* native code */;
  RequestCustomImageInfo(): unknown;
  RequestDescriptionsData(): unknown /* native code */;
  SaveCustomLogoPosition(): unknown;
  SetAjaxLibraryAppDetails(): unknown /* native code */;
  UnregisterForAppData(e: unknown, t: unknown): void;
  ValidateCustomImageInfo(e: unknown): boolean;

  m_CMInterface: m_CMInterface;
  m_mapAppData: m_mapAppData;
  m_mapRecentlyLaunchedApps: m_mapAppData;
  m_setDetailsInProgress: m_setDetailsInProgress;
}

export interface m_mapAppData {
  addValue_(e: unknown, t: unknown): void;
  clear(): void;
  dehanceValue_(e: unknown): unknown;
  delete(e: unknown): boolean;
  enhancer_(e: unknown, t: unknown, r: unknown): unknown;
  entries(): unknown;
  forEach(e: unknown, t: unknown): void;
  get(e: unknown): unknown;
  has_(e: unknown): unknown;
  has(e: unknown): unknown;
  intercept_(e: unknown): unknown;
  keys(): unknown;
  merge(e: unknown): unknown;
  observe_(e: unknown, t: unknown): unknown;
  replace(e: unknown): unknown;
  set(e: unknown, t: unknown): unknown;
  toJSON(): unknown;
  updateValue_(e: unknown, t: unknown): void;
  values(): unknown;

  changeListeners_: undefined;
  data_: m_setDetailsInProgress;
  dehancer: undefined;
  hasMap_: m_setDetailsInProgress;
  interceptors_: undefined;
  isMobXObservableMap: boolean;
  keysAtom_: KeysAtom_;
  name_: string;
  size: number;
}

export interface m_setDetailsInProgress {
  add(): unknown /* native code */;
  clear(): unknown /* native code */;
  delete(): unknown /* native code */;
  difference(): unknown /* native code */;
  entries(): unknown /* native code */;
  forEach(): unknown /* native code */;
  has(): unknown /* native code */;
  intersection(): unknown /* native code */;
  isDisjointFrom(): unknown /* native code */;
  isSubsetOf(): unknown /* native code */;
  isSupersetOf(): unknown /* native code */;
  keys(): unknown /* native code */;
  symmetricDifference(): unknown /* native code */;
  union(): unknown /* native code */;
  values(): unknown /* native code */;

  size: number;
}

export interface m_CMInterface {
  AddOnDisconnectCallback(e: unknown, t: unknown): unknown;
  AddOnLogonCallback(e: unknown, t: unknown): unknown;
  BConnectedToServer(e: unknown): unknown;
  BDisconnected(): unknown;
  BInternalShouldDispatchMessage(e: unknown): boolean;
  BIsConnected(): unknown;
  BPerformedInitialClockAdjustment(): unknown;
  ClearHeartbeatInterval(): void;
  Connect(): unknown;
  DEBUG_LogCMInterfaceActivity(e: unknown, t: unknown, n?: boolean /* default = !0 */): void;
  DEBUG_LogMessage(e: unknown, ...t: unknown[]): void;
  Disconnect(): void;
  DispatchMessage(e: unknown): void;
  ForceDisconnect(): void;
  GetAnonymousServiceTransport(): unknown;
  GetServerRTime32(): number;
  GetServerTimeMS(): unknown;
  GetServiceTransport(): unknown;
  InternalAdjustClock(): unknown;
  m_hEMsgRegistrationObserver(): void;
  MakeReady(): unknown;
  OnConnect(): void;
  OnConnectionAttemptThrottled(): unknown /* native code */;
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
  SendMsgAndAwaitResponse(e: unknown, t: unknown): unknown;
  WaitUntilLoggedOn(): unknown;

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
  m_callbacksOnConnectOneTime: m_callbacksOnConnectOneTime;
  m_callbacksOnDisconnect: m_callbacksOnDisconnect;
  m_callbacksOnDisconnectOneTime: m_callbacksOnConnectOneTime;
  m_hSharedConnection: number;
  m_messageHandlers: m_messageHandlers;
  m_nPerfClockServerMSOffset: number;
  m_nWallClockDriftMS: number;
  m_onConnect: m_setDetailsInProgress;
  m_rtReconnectThrottleExpiration: number;
  m_rtReconnectThrottleStart: number;
  m_ServiceTransport: m_ServiceTransport;
  m_setConnectedServers: m_setDetailsInProgress;
  m_setEMsgHandlers: m_setDetailsInProgress;
  m_setServiceMethodHandlers: m_setDetailsInProgress;
  m_steamid: m_steamid;
  m_strIPCountry: string;
  m_strPersonaName: string;
  m_unAccountFlags: number;
  messageHandlers: m_messageHandlers;
  persona_name: string;
  rtReconnectThrottleExpiration: number;
  rtReconnectThrottleStart: number;
  steamid: m_steamid;
}

export interface KeysAtom_ {
  onBO(): void;
  onBUO(): void;
  reportChanged(): void;
  reportObserved(): unknown;

  diffValue_: number;
  isBeingObserved: boolean;
  isMobXAtom: boolean;
  isPendingUnobservation: boolean;
  lastAccessedBy_: number;
  lowestObserverState_: number;
  name_: string;
  observers_: m_setDetailsInProgress;
  onBOL: undefined;
  onBUOL: undefined;
}

export interface m_ServiceTransport {
  MakeReady(): unknown /* native code */;
  SendMsg(e: unknown, t: unknown, n: unknown): unknown;
  SendNotification(e: unknown, t: unknown): unknown;
}

export interface m_callbacksOnConnectOneTime {
  AddCallback(e: unknown, t: unknown): unknown;
  RunAllCallbacks(e: unknown, ...t: unknown[]): void;
  RunCallbacks(e: unknown, ...t: unknown[]): void;

  m_bRunOnce: boolean;
  m_ClientConnectionCallbacks: m_ClientConnectionCallbacks;
  m_mapServerTypeCallbacks: m_setDetailsInProgress;
}

export interface m_callbacksOnConnect {
  AddCallback(e: unknown, t: unknown): unknown;
  RunAllCallbacks(e: unknown, ...t: unknown[]): void;
  RunCallbacks(e: unknown, ...t: unknown[]): void;

  m_bRunOnce: boolean;
  m_ClientConnectionCallbacks: m_ClientConnectionCallbacks2;
  m_mapServerTypeCallbacks: m_setDetailsInProgress;
}

export interface m_callbacksOnDisconnect {
  AddCallback(e: unknown, t: unknown): unknown;
  RunAllCallbacks(e: unknown, ...t: unknown[]): void;
  RunCallbacks(e: unknown, ...t: unknown[]): void;

  m_bRunOnce: boolean;
  m_ClientConnectionCallbacks: m_ClientConnectionCallbacks3;
  m_mapServerTypeCallbacks: m_setDetailsInProgress;
}

export interface m_messageHandlers {
  AddCallback(e: unknown, t: unknown, n: unknown): { invoke: any; unregister: () => void };
  AddServiceMethodHandler(e: unknown, t: unknown): { invoke: (n: any, r: any) => void; unregister: () => void };
  AddServiceNotificationHandler(e: unknown, t: unknown): { invoke: (n: any, r: any) => void; unregister: () => void };
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
  m_mapCallbacks: m_setDetailsInProgress;
  m_mapServiceMethodHandlers: m_setDetailsInProgress;
  m_rgRegisteredEMsgs: number[];
  m_rgRegisteredServiceMethodHandlers: string[];
  servicemethod_list: string[];
}

export interface ClientServersAvailableHandler {
  invoke(): unknown;
  unregister(): void;
}

export interface m_steamid {
  BIsClanAccount(): boolean;
  BIsIndividualAccount(): boolean;
  BIsValid(): boolean;
  ConvertTo64BitString(): unknown;
  GetAccountID(): unknown;
  GetAccountType(): number;
  GetInstance(): number;
  GetUniverse(): number;
  Render(): string;
  SetAccountID(e: unknown): void;
  SetAccountType(e: unknown): void;
  SetFromComponents(e: unknown, t: unknown, n: unknown, i: unknown): void;
  SetInstance(e: unknown): void;
  SetUniverse(e: unknown): void;

  m_ulSteamID: m_ulSteamID;
}

export interface m_ClientConnectionCallbacks {
  ClearAllCallbacks(): void;
  CountRegistered(): unknown;
  Dispatch(...e: unknown[]): void;
  Register(e: unknown): { Unregister: () => void };

  m_vecCallbacks: unknown[];
}

export interface m_ClientConnectionCallbacks2 {
  ClearAllCallbacks(): void;
  CountRegistered(): unknown;
  Dispatch(...e: unknown[]): void;
  Register(e: unknown): { Unregister: () => void };

  m_vecCallbacks: unknown[];
}

export interface m_ClientConnectionCallbacks3 {
  ClearAllCallbacks(): void;
  CountRegistered(): unknown;
  Dispatch(...e: unknown[]): void;
  Register(e: unknown): { Unregister: () => void };

  m_vecCallbacks: unknown[];
}

export interface m_ErrorReportingStore {
  BIsBlacklisted(e: unknown): boolean;
  Init(e: unknown, t: unknown, r: unknown, n?: unknown /* default = {} */): void;
  m_fnGetReportingInterval(): number;
  PauseReporting(): void;
  PauseReportingForDuration(e: unknown): void;
  QueueReport(e: unknown): void;
  ReportError(): unknown;
  ResumeReporting(): void;
  ScheduleSend(): void;
  SendErrorReport(e: unknown): void;
  SendErrorReports(e: unknown): void;

  m_bEnabled: boolean;
  m_bInitialized: boolean;
  m_bReportingPaused: boolean;
  m_pauseTimer: number;
  m_rgErrorQueue: unknown[];
  m_sendTimer: number;
  m_strProduct: string;
  m_strVersion: string;
  m_transport: m_ServiceTransport;
  product: string;
  reporting_enabled: boolean;
  version: string;
}

export interface m_ulSteamID {
  add(e: unknown): unknown;
  and(e: unknown): unknown;
  clz(): unknown;
  comp(e: unknown): 0 | 1 | -1;
  compare(e: unknown): 0 | 1 | -1;
  countLeadingZeros(): unknown;
  countTrailingZeros(): unknown;
  ctz(): unknown;
  div(e: unknown): unknown;
  divide(e: unknown): unknown;
  eq(e: unknown): boolean;
  equals(e: unknown): boolean;
  eqz(): boolean;
  ge(e: unknown): boolean;
  getHighBits(): unknown;
  getHighBitsUnsigned(): number;
  getLowBits(): unknown;
  getLowBitsUnsigned(): number;
  getNumBitsAbs(): unknown;
  greaterThan(e: unknown): boolean;
  greaterThanOrEqual(e: unknown): boolean;
  gt(e: unknown): boolean;
  gte(e: unknown): boolean;
  isEven(): boolean;
  isNegative(): boolean;
  isOdd(): boolean;
  isPositive(): unknown;
  isZero(): boolean;
  le(e: unknown): boolean;
  lessThan(e: unknown): boolean;
  lessThanOrEqual(e: unknown): boolean;
  lt(e: unknown): boolean;
  lte(e: unknown): boolean;
  mod(e: unknown): unknown;
  modulo(e: unknown): unknown;
  mul(e: unknown): unknown;
  multiply(e: unknown): unknown;
  ne(e: unknown): boolean;
  neg(): unknown;
  negate(): unknown;
  neq(e: unknown): boolean;
  not(): unknown;
  notEquals(e: unknown): boolean;
  or(e: unknown): unknown;
  rem(e: unknown): unknown;
  rotateLeft(e: unknown): unknown;
  rotateRight(e: unknown): unknown;
  rotl(e: unknown): unknown;
  rotr(e: unknown): unknown;
  shiftLeft(e: unknown): unknown;
  shiftRight(e: unknown): unknown;
  shiftRightUnsigned(e: unknown): unknown;
  shl(e: unknown): unknown;
  shr_u(e: unknown): unknown;
  shr(e: unknown): unknown;
  shru(e: unknown): unknown;
  sub(e: unknown): unknown;
  subtract(e: unknown): unknown;
  toBytes(e: unknown): unknown;
  toBytesBE(): number[];
  toBytesLE(): number[];
  toInt(): unknown;
  toNumber(): number;
  toSigned(): unknown;
  toUnsigned(): unknown;
  xor(e: unknown): unknown;

  __isLong__: boolean;
  high: number;
  low: number;
  unsigned: boolean;
}
