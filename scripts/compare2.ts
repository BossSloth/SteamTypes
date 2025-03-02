export interface AppDetailsStore {
  AppDetailsChanged(): unknown;
  BAchievementIsHiddenAndAchieved(e: unknown, t: unknown): unknown;
  BHasMarketPresence(e: unknown): unknown;
  BHasRecentlyLaunched(e: unknown): unknown;
  BIsWorkshopVisible(e: unknown): unknown;
  ClearCustomLogoPosition(e: unknown): unknown;
  CMInterface(): unknown;
  GetAchievements(e: unknown): unknown;
  GetAjaxLibraryAppDetails(): unknown;
  GetAppData(e: unknown): unknown;
  GetAppDetails(e: unknown): unknown;
  GetAppDetailsSpotlight(e: unknown): unknown;
  GetAssociations(e: unknown): unknown;
  GetCustomLogoPosition(e: unknown): unknown;
  GetDescriptions(e: unknown): unknown;
  GetHeaderImages(e: unknown): unknown[];
  GetHeaderImagesForAppId(e: unknown, t: unknown, r: unknown): unknown;
  GetHeroBlurImages(e: unknown): unknown;
  GetHeroBlurImagesForAppId(e: unknown, t: unknown, r: unknown): unknown;
  GetHeroImages(e: unknown): object | unknown;
  GetHeroImagesForAppId(e: unknown, t: unknown, r: unknown): object | unknown;
  GetLogoImages(e: unknown): object | unknown;
  GetLogoImagesForAppId(e: unknown, t: unknown, r: unknown): object | unknown;
  Init(e: unknown): unknown;
  MarkAppAsRecentlyLaunched(e: unknown): void;
  RegisterForAppData(e: unknown, t: unknown): object | unknown;
  RequestAchievements(): unknown;
  RequestAppDetails(): unknown;
  RequestAppDetailsSpotlight(): unknown;
  RequestAssociationData(): unknown;
  RequestCustomImageInfo(): unknown;
  RequestDescriptionsData(): unknown;
  SaveCustomLogoPosition(): unknown;
  SetAjaxLibraryAppDetails(): unknown;
  UnregisterForAppData(e: unknown, t: unknown): unknown;
  ValidateCustomImageInfo(e: unknown): unknown;

  m_CMInterface: m_CMInterface;
  m_mapAppData: m_mapAppData;
  m_mapRecentlyLaunchedApps: m_mapAppData;
  m_setDetailsInProgress: m_setDetailsInProgress;
}

export interface m_mapAppData {
  addValue_(e: unknown, t: unknown): unknown;
  clear(): unknown;
  dehanceValue_(e: unknown): unknown;
  delete(e: unknown): unknown;
  enhancer_(e: unknown, t: unknown, r: unknown): unknown;
  entries(): unknown | object | unknown;
  forEach(e: unknown, t: unknown): unknown;
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
  updateValue_(e: unknown, t: unknown): unknown;
  values(): unknown | object | unknown;

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
  add(): unknown;
  clear(): unknown;
  delete(): unknown;
  difference(): unknown;
  entries(): unknown;
  forEach(): unknown;
  has(): unknown;
  intersection(): unknown;
  isDisjointFrom(): unknown;
  isSubsetOf(): unknown;
  isSupersetOf(): unknown;
  keys(): unknown;
  symmetricDifference(): unknown;
  union(): unknown;
  values(): unknown;

  size: number;
}

export interface m_CMInterface {
  AddOnDisconnectCallback(e: unknown, t: unknown): unknown;
  AddOnLogonCallback(e: unknown, t: unknown): unknown;
  BConnectedToServer(e: unknown): unknown;
  BDisconnected(): unknown;
  BInternalShouldDispatchMessage(e: unknown): unknown;
  BIsConnected(): unknown;
  BPerformedInitialClockAdjustment(): unknown;
  ClearHeartbeatInterval(): unknown;
  Connect(): unknown;
  DEBUG_LogCMInterfaceActivity(e: unknown, t: unknown, n?: unknown /* default = ... */): unknown;
  DEBUG_LogMessage(e: unknown, ...t: unknown[]): unknown;
  Disconnect(): unknown;
  DispatchMessage(e: unknown): void;
  ForceDisconnect(): unknown;
  GetAnonymousServiceTransport(): unknown;
  GetServerRTime32(): unknown;
  GetServerTimeMS(): unknown;
  GetServiceTransport(): unknown;
  InternalAdjustClock(): unknown;
  m_hEMsgRegistrationObserver(): unknown;
  MakeReady(): unknown;
  OnConnect(): unknown;
  OnConnectionAttemptThrottled(): unknown;
  OnDisconnect(): unknown;
  OnLoggedOn(): unknown;
  OnLogonInfoChanged(e: unknown): unknown;
  OnMsgRecvd(e: unknown): unknown;
  OnSharedConnectionClosed(): unknown;
  OnSharedConnectionEstablished(e: unknown): unknown;
  ResetHeartbeatInterval(): unknown;
  ResolveAwaitWithTransportError(e: unknown, t: unknown, n: unknown, r: unknown): unknown;
  RTime32ToDate(e: unknown): unknown;
  RunOnDisconnectCallbacks(e: unknown, t: unknown): unknown;
  RunWhenLoggedOn(e: unknown, t: unknown): unknown;
  Send(e: unknown): unknown;
  SendHeartbeat(): unknown;
  SendInternal(e: unknown): unknown;
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
  onBO(): unknown;
  onBUO(): unknown;
  reportChanged(): unknown;
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
  MakeReady(): unknown;
  SendMsg(e: unknown, t: unknown, n: unknown): unknown;
  SendNotification(e: unknown, t: unknown): unknown;
}

export interface m_callbacksOnConnectOneTime {
  AddCallback(e: unknown, t: unknown): unknown;
  RunAllCallbacks(e: unknown, ...t: unknown[]): unknown;
  RunCallbacks(e: unknown, ...t: unknown[]): unknown;

  m_bRunOnce: boolean;
  m_ClientConnectionCallbacks: m_ClientConnectionCallbacks;
  m_mapServerTypeCallbacks: m_setDetailsInProgress;
}

export interface m_callbacksOnConnect {
  AddCallback(e: unknown, t: unknown): unknown;
  RunAllCallbacks(e: unknown, ...t: unknown[]): unknown;
  RunCallbacks(e: unknown, ...t: unknown[]): unknown;

  m_bRunOnce: boolean;
  m_ClientConnectionCallbacks: m_ClientConnectionCallbacks2;
  m_mapServerTypeCallbacks: m_setDetailsInProgress;
}

export interface m_callbacksOnDisconnect {
  AddCallback(e: unknown, t: unknown): unknown;
  RunAllCallbacks(e: unknown, ...t: unknown[]): unknown;
  RunCallbacks(e: unknown, ...t: unknown[]): unknown;

  m_bRunOnce: boolean;
  m_ClientConnectionCallbacks: m_ClientConnectionCallbacks3;
  m_mapServerTypeCallbacks: m_setDetailsInProgress;
}

export interface m_messageHandlers {
  AddCallback(e: unknown, t: unknown, n: unknown): object | unknown;
  AddServiceMethodHandler(e: unknown, t: unknown): object | unknown;
  AddServiceNotificationHandler(e: unknown, t: unknown): object | unknown;
  DEBUG_LogMessageDispatch(e: unknown, t: unknown): unknown;
  DispatchMsgToHandlers(e: unknown, t: unknown): unknown;
  InstallErrorReportingStore(e: unknown): unknown;
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
  invoke(e: unknown): unknown;
  unregister(): unknown;
}

export interface m_steamid {
  BIsClanAccount(): unknown;
  BIsIndividualAccount(): unknown;
  BIsValid(): unknown;
  ConvertTo64BitString(): unknown;
  GetAccountID(): unknown;
  GetAccountType(): unknown;
  GetInstance(): unknown;
  GetUniverse(): unknown;
  Render(): unknown;
  SetAccountID(e: unknown): unknown;
  SetAccountType(e: unknown): unknown;
  SetFromComponents(e: unknown, t: unknown, n: unknown, i: unknown): unknown;
  SetInstance(e: unknown): unknown;
  SetUniverse(e: unknown): unknown;

  m_ulSteamID: m_ulSteamID;
}

export interface m_ClientConnectionCallbacks {
  ClearAllCallbacks(): unknown;
  CountRegistered(): unknown;
  Dispatch(...e: unknown[]): unknown;
  Register(e: unknown): object | unknown;

  m_vecCallbacks: unknown[];
}

export interface m_ClientConnectionCallbacks2 {
  ClearAllCallbacks(): unknown;
  CountRegistered(): unknown;
  Dispatch(...e: unknown[]): unknown;
  Register(e: unknown): object | unknown;

  m_vecCallbacks: unknown[];
}

export interface m_ClientConnectionCallbacks3 {
  ClearAllCallbacks(): unknown;
  CountRegistered(): unknown;
  Dispatch(...e: unknown[]): unknown;
  Register(e: unknown): object | unknown;

  m_vecCallbacks: unknown[];
}

export interface m_ErrorReportingStore {
  BIsBlacklisted(e: unknown): unknown;
  Init(e: unknown, t: unknown, r: unknown, n?: unknown /* default = {} */): unknown;
  m_fnGetReportingInterval(): unknown;
  PauseReporting(): unknown;
  PauseReportingForDuration(e: unknown): unknown;
  QueueReport(e: unknown): unknown;
  ReportError(): unknown;
  ResumeReporting(): unknown;
  ScheduleSend(): unknown;
  SendErrorReport(e: unknown): unknown;
  SendErrorReports(e: unknown): void | unknown;

  m_bEnabled: boolean;
  m_bInitialized: boolean;
  m_bReportingPaused: boolean;
  m_pauseTimer: number;
  m_rgErrorQueue: unknown[];
  m_sendTimer: null;
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
  comp(e: unknown): number | unknown;
  compare(e: unknown): number | unknown;
  countLeadingZeros(): unknown;
  countTrailingZeros(): unknown;
  ctz(): unknown;
  div(e: unknown): unknown;
  divide(e: unknown): unknown;
  eq(e: unknown): unknown;
  equals(e: unknown): unknown;
  eqz(): unknown;
  ge(e: unknown): unknown;
  getHighBits(): unknown;
  getHighBitsUnsigned(): unknown;
  getLowBits(): unknown;
  getLowBitsUnsigned(): unknown;
  getNumBitsAbs(): unknown;
  greaterThan(e: unknown): unknown;
  greaterThanOrEqual(e: unknown): unknown;
  gt(e: unknown): unknown;
  gte(e: unknown): unknown;
  isEven(): unknown;
  isNegative(): unknown;
  isOdd(): unknown;
  isPositive(): unknown;
  isZero(): unknown;
  le(e: unknown): unknown;
  lessThan(e: unknown): unknown;
  lessThanOrEqual(e: unknown): unknown;
  lt(e: unknown): unknown;
  lte(e: unknown): unknown;
  mod(e: unknown): unknown;
  modulo(e: unknown): unknown;
  mul(e: unknown): unknown;
  multiply(e: unknown): unknown;
  ne(e: unknown): unknown;
  neg(): unknown;
  negate(): unknown;
  neq(e: unknown): unknown;
  not(): unknown;
  notEquals(e: unknown): unknown;
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
  toBytesBE(): unknown[];
  toBytesLE(): unknown[];
  toInt(): unknown;
  toNumber(): unknown;
  toSigned(): unknown;
  toUnsigned(): unknown;
  xor(e: unknown): unknown;

  __isLong__: boolean;
  high: number;
  low: number;
  unsigned: boolean;
}
