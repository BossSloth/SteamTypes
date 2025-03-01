export interface undefined {
  AppDetailsChanged(): void;
  BAchievementIsHiddenAndAchieved(): unknown;
  BHasMarketPresence(): unknown;
  BHasRecentlyLaunched(): unknown;
  BIsWorkshopVisible(): unknown;
  ClearCustomLogoPosition(e: unknown): unknown;
  CMInterface(): unknown;
  GetAchievements(): unknown;
  GetAjaxLibraryAppDetails(): void;
  GetAppData(): unknown;
  GetAppDetails(): unknown;
  GetAppDetailsSpotlight(): unknown;
  GetAssociations(): unknown;
  GetCustomLogoPosition(): unknown;
  GetDescriptions(): unknown;
  GetHeaderImages(): unknown;
  GetHeaderImagesForAppId(): unknown;
  GetHeroBlurImages(): unknown;
  GetHeroBlurImagesForAppId(): unknown;
  GetHeroImages(): unknown;
  GetHeroImagesForAppId(): unknown;
  GetLogoImages(): unknown;
  GetLogoImagesForAppId(): unknown;
  Init(): void;
  MarkAppAsRecentlyLaunched(e: unknown): unknown;
  RegisterForAppData(e: unknown, t: unknown): unknown;
  RequestAchievements(): void;
  RequestAppDetails(e: unknown): unknown;
  RequestAppDetailsSpotlight(): unknown;
  RequestAssociationData(): void;
  RequestCustomImageInfo(): void;
  RequestDescriptionsData(): void;
  SaveCustomLogoPosition(e: unknown, t: unknown): unknown;
  SetAjaxLibraryAppDetails(): void;
  UnregisterForAppData(e: unknown, t: unknown): unknown;
  ValidateCustomImageInfo(): unknown;

  m_CMInterface: m_CMInterface;
  m_mapAppData: m_mapAppData;
  m_mapRecentlyLaunchedApps: m_mapAppData;
  m_setDetailsInProgress: m_setDetailsInProgress;
}

export interface m_mapAppData {
  addValue_(e: unknown, t: unknown): void;
  clear(): void;
  dehanceValue_(e: unknown): unknown;
  delete(e: unknown): unknown;
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
  add(): void;
  clear(): void;
  delete(): void;
  difference(): void;
  entries(): void;
  forEach(): void;
  has(): void;
  intersection(): void;
  isDisjointFrom(): void;
  isSubsetOf(): void;
  isSupersetOf(): void;
  keys(): void;
  symmetricDifference(): void;
  union(): void;
  values(): void;

  size: number;
}

export interface m_CMInterface {
  AddOnDisconnectCallback(e: unknown, t: unknown): unknown;
  AddOnLogonCallback(e: unknown, t: unknown): unknown;
  BConnectedToServer(): unknown;
  BDisconnected(): unknown;
  BInternalShouldDispatchMessage(): unknown;
  BIsConnected(): unknown;
  BPerformedInitialClockAdjustment(): unknown;
  ClearHeartbeatInterval(): void;
  Connect(): unknown;
  DEBUG_LogCMInterfaceActivity(): void;
  DEBUG_LogMessage(): void;
  Disconnect(): void;
  DispatchMessage(e: unknown): unknown;
  ForceDisconnect(): void;
  GetAnonymousServiceTransport(): unknown;
  GetServerRTime32(): unknown;
  GetServerTimeMS(): unknown;
  GetServiceTransport(): unknown;
  InternalAdjustClock(): unknown;
  m_hEMsgRegistrationObserver(): void;
  MakeReady(): unknown;
  OnConnect(): void;
  OnConnectionAttemptThrottled(): void;
  OnDisconnect(): void;
  OnLoggedOn(): void;
  OnLogonInfoChanged(): void;
  OnMsgRecvd(): void;
  OnSharedConnectionClosed(): void;
  OnSharedConnectionEstablished(e: unknown): unknown;
  ResetHeartbeatInterval(): void;
  ResolveAwaitWithTransportError(): void;
  RTime32ToDate(): unknown;
  RunOnDisconnectCallbacks(): void;
  RunWhenLoggedOn(e: unknown, t: unknown): unknown;
  Send(): unknown;
  SendHeartbeat(): void;
  SendInternal(): unknown;
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
  MakeReady(): void;
  SendMsg(e: unknown, t: unknown, n: unknown): unknown;
  SendNotification(e: unknown, t: unknown): unknown;
}

export interface m_callbacksOnConnectOneTime {
  AddCallback(): unknown;
  RunAllCallbacks(e: unknown, ...t: unknown[]): unknown;
  RunCallbacks(): void;

  m_bRunOnce: boolean;
  m_ClientConnectionCallbacks: m_ClientConnectionCallbacks;
  m_mapServerTypeCallbacks: m_setDetailsInProgress;
}

export interface m_callbacksOnConnect {
  AddCallback(): unknown;
  RunAllCallbacks(e: unknown, ...t: unknown[]): unknown;
  RunCallbacks(): void;

  m_bRunOnce: boolean;
  m_ClientConnectionCallbacks: m_ClientConnectionCallbacks2;
  m_mapServerTypeCallbacks: m_setDetailsInProgress;
}

export interface m_callbacksOnDisconnect {
  AddCallback(): unknown;
  RunAllCallbacks(e: unknown, ...t: unknown[]): unknown;
  RunCallbacks(): void;

  m_bRunOnce: boolean;
  m_ClientConnectionCallbacks: m_ClientConnectionCallbacks3;
  m_mapServerTypeCallbacks: m_setDetailsInProgress;
}

export interface m_messageHandlers {
  AddCallback(e: unknown, t: unknown, n: unknown): unknown;
  AddServiceMethodHandler(e: unknown, t: unknown): unknown;
  AddServiceNotificationHandler(e: unknown, t: unknown): unknown;
  DEBUG_LogMessageDispatch(): void;
  DispatchMsgToHandlers(): unknown;
  InstallErrorReportingStore(): void;
  RegisterBaseEMessageHandler(): unknown;
  RegisterEMessageAction(e: unknown, t: unknown, n: unknown): unknown;
  RegisterEMessageHandler(e: unknown, t: unknown, n: unknown): unknown;
  RegisterServiceMethodHandler(): unknown;
  RegisterServiceMethodHandlerAction(e: unknown, t: unknown): unknown;
  RegisterServiceNotificationHandler(): unknown;
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
  Render(): string;
  SetAccountID(): void;
  SetAccountType(): void;
  SetFromComponents(): void;
  SetInstance(): void;
  SetUniverse(): void;

  m_ulSteamID: m_ulSteamID;
}

export interface m_ClientConnectionCallbacks {
  ClearAllCallbacks(): void;
  CountRegistered(): unknown;
  Dispatch(): void;
  Register(e: unknown): unknown;

  m_vecCallbacks: unknown[];
}

export interface m_ClientConnectionCallbacks2 {
  ClearAllCallbacks(): void;
  CountRegistered(): unknown;
  Dispatch(): void;
  Register(e: unknown): unknown;

  m_vecCallbacks: unknown[];
}

export interface m_ClientConnectionCallbacks3 {
  ClearAllCallbacks(): void;
  CountRegistered(): unknown;
  Dispatch(): void;
  Register(e: unknown): unknown;

  m_vecCallbacks: unknown[];
}

export interface m_ErrorReportingStore {
  BIsBlacklisted(): unknown;
  Init(): void;
  m_fnGetReportingInterval(): unknown;
  PauseReporting(): void;
  PauseReportingForDuration(e: unknown): unknown;
  QueueReport(): void;
  ReportError(e: unknown, t: unknown): unknown;
  ResumeReporting(): void;
  ScheduleSend(): unknown;
  SendErrorReport(): void;
  SendErrorReports(e: unknown): unknown;

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
  comp(e: unknown): unknown;
  compare(e: unknown): unknown;
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
  toBytesBE(): unknown;
  toBytesLE(): unknown;
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
