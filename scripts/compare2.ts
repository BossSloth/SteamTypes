import { ObservableMap } from 'mobx';
import Long from 'long';

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
  GetHeroBlurImages(e: unknown): unknown[];
  GetHeroBlurImagesForAppId(e: unknown, t: unknown, r: unknown): unknown[];
  GetHeroImages(e: unknown): { rgHeroImages: unknown[]; bHasHeroImage: unknown; appid: unknown; };
  GetHeroImagesForAppId(e: unknown, t: unknown, r: unknown): { rgHeroImages: unknown[]; bHasHeroImage: boolean; };
  GetLogoImages(e: unknown): { rgLogoImages: unknown[]; logoPosition: unknown; };
  GetLogoImagesForAppId(e: unknown, t: unknown, r: unknown): { rgLogoImages: unknown[]; logoPosition: unknown; };
  Init(e: unknown): void;
  MarkAppAsRecentlyLaunched(e: unknown): void;
  RegisterForAppData(e: unknown, t: unknown): { unregister: () => void; };
  RequestAchievements(): unknown /* native code */;
  RequestAppDetails(e: unknown): Promise<unknown>;
  RequestAppDetailsSpotlight(e: unknown): Promise<undefined>;
  RequestAssociationData(): unknown /* native code */;
  RequestCustomImageInfo(e: unknown): Promise<void>;
  RequestDescriptionsData(): unknown /* native code */;
  SaveCustomLogoPosition(e: unknown, t: unknown): Promise<unknown>;
  SetAjaxLibraryAppDetails(): unknown /* native code */;
  UnregisterForAppData(e: unknown, t: unknown): void;
  ValidateCustomImageInfo(e: unknown): boolean;

  m_CMInterface: m_CMInterface;
  m_mapAppData: ObservableMap<number, (m_mapAppData | m_mapAppData2)>;
  m_mapRecentlyLaunchedApps: ObservableMap<unknown, unknown>;
  m_setDetailsInProgress: Set<unknown>;
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
  Connect(): Promise<unknown>;
  DEBUG_LogCMInterfaceActivity(e: unknown, t: unknown, n?: boolean /* default = !0 */): void;
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
  m_callbacksOnConnectOneTime: m_callbacksOnConnectOneTime;
  m_callbacksOnDisconnect: m_callbacksOnDisconnect;
  m_callbacksOnDisconnectOneTime: m_callbacksOnConnectOneTime;
  m_hSharedConnection: number;
  m_messageHandlers: m_messageHandlers;
  m_nPerfClockServerMSOffset: number;
  m_nWallClockDriftMS: number;
  m_onConnect: Promise<unknown>;
  m_rtReconnectThrottleExpiration: number;
  m_rtReconnectThrottleStart: number;
  m_ServiceTransport: m_ServiceTransport;
  m_setConnectedServers: Set<number>;
  m_setEMsgHandlers: Set<number>;
  m_setServiceMethodHandlers: Set<string>;
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

export interface m_mapAppData {
  appDetailsSpotlight: null;
  associationData: null;
  bLoadingAchievments: boolean;
  cRegistered: number;
  customImageInfo: null;
  customImageInfoRtime: number;
  descriptionsData: null;
  details: Details;
  hAppDetails: HAppDetails;
  listeners: unknown[];
}

export interface m_mapAppData2 {
  appDetailsSpotlight: null;
  associationData: null;
  bLoadingAchievments: boolean;
  cRegistered: number;
  customImageInfo: null;
  customImageInfoRtime: number;
  descriptionsData: null;
  details: Details2;
  hAppDetails: HAppDetails;
  listeners: unknown[];
}

export interface ClientServersAvailableHandler {
  invoke(): unknown;
  unregister(): void;
}

export interface m_callbacksOnConnect {
  AddCallback(e: unknown, t: unknown): unknown;
  RunAllCallbacks(e: unknown, ...t: unknown[]): void;
  RunCallbacks(e: unknown, ...t: unknown[]): void;

  m_bRunOnce: boolean;
  m_ClientConnectionCallbacks: m_ClientConnectionCallbacks;
  m_mapServerTypeCallbacks: Map<unknown, unknown>;
}

export interface m_callbacksOnConnectOneTime {
  AddCallback(e: unknown, t: unknown): unknown;
  RunAllCallbacks(e: unknown, ...t: unknown[]): void;
  RunCallbacks(e: unknown, ...t: unknown[]): void;

  m_bRunOnce: boolean;
  m_ClientConnectionCallbacks: m_ClientConnectionCallbacks2;
  m_mapServerTypeCallbacks: Map<unknown, unknown>;
}

export interface m_callbacksOnDisconnect {
  AddCallback(e: unknown, t: unknown): unknown;
  RunAllCallbacks(e: unknown, ...t: unknown[]): void;
  RunCallbacks(e: unknown, ...t: unknown[]): void;

  m_bRunOnce: boolean;
  m_ClientConnectionCallbacks: m_ClientConnectionCallbacks3;
  m_mapServerTypeCallbacks: Map<unknown, unknown>;
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
  m_rgRegisteredEMsgs: unknown/* circular reference to emsg_list */;
  m_rgRegisteredServiceMethodHandlers: string[];
  servicemethod_list: unknown/* circular reference to m_rgRegisteredServiceMethodHandlers */;
}

export interface m_ServiceTransport {
  MakeReady(): unknown /* native code */;
  SendMsg(e: unknown, t: unknown, n: unknown): unknown;
  SendNotification(e: unknown, t: unknown): unknown;
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

  m_ulSteamID: Long;
}

export interface Details {
  achievements: Achievements;
  bAvailableContentOnStore: boolean;
  bCanMoveInstallFolder: boolean;
  bCloudAvailable: boolean;
  bCloudEnabledForAccount: boolean;
  bCloudEnabledForApp: boolean;
  bCloudSyncOnSuspendAvailable: boolean;
  bCloudSyncOnSuspendEnabled: boolean;
  bCommunityMarketPresence: boolean;
  bControllerSurveyFilledOut: boolean;
  bDisableUserMediaUpload: boolean;
  bEnableAllowDesktopConfiguration: boolean;
  bFreeRemovableLicense: boolean;
  bGamepadRequired: boolean;
  bHasAIGeneratedContent: boolean;
  bHasAllLegacyCDKeys: boolean;
  bHasAnyLocalContent: boolean;
  bHasDifferentCopies: boolean;
  bHasLockedPrivateBetas: boolean;
  bIsExcludedFromSharing: boolean;
  bIsFreeApp: boolean;
  bIsSubscribedTo: boolean;
  bIsThirdPartyUpdater: boolean;
  bOverlayEnabled: boolean;
  bOverrideInternalResolution: boolean;
  bRemotePlayTogether: boolean;
  bRequiresLegacyCDKey: boolean;
  bShowCDKeyInMenus: boolean;
  bShowControllerConfig: boolean;
  bStorePagePublished: boolean;
  bSupportsCDKeyCopyToClipboard: boolean;
  bWorkshopVisible: boolean;
  eAppOwnershipFlags: number;
  eAppUpdateError: number;
  eAutoUpdateValue: number;
  eBackgroundDownloads: number;
  eCloudStatus: number;
  eCloudSync: number;
  eControllerRumblePreference: number;
  eDisplayStatus: number;
  eEnableThirdPartyControllerConfiguration: number;
  eSteamInputControllerMask: number;
  iInstallFolder: number;
  lDiskUsageBytes: number;
  lDlcUsageBytes: number;
  libraryAssets: LibraryAssets;
  nBuildID: number;
  nCompatToolPriority: number;
  nPlaytimeForever: number;
  nScreenshots: number;
  rtLastTimePlayed: number;
  rtLastUpdated: number;
  rtPurchased: number;
  selectedLanguage: SelectedLanguage;
  strCloudBytesAvailable: string;
  strCloudBytesUsed: string;
  strCompatToolDisplayName: string;
  strCompatToolName: string;
  strDeveloperName: string;
  strDisplayName: string;
  strExternalSubscriptionURL: string;
  strFlatpakAppID: string;
  strHomepageURL: string;
  strInstallFolder: string;
  strLaunchOptions: string;
  strLockedBySteamID: string;
  strManualURL: string;
  strOwnerSteamID: string;
  strResolutionOverride: string;
  strSelectedBeta: string;
  strSteamDeckBlogURL: string;
  strStoreHeaderImage: string;
  unAppID: number;
  unEntitledContentApp: number;
  unMemberCopies: number;
  unMembersPlaying: number;
  unTimedTrialSecondsAllowed: number;
  unTimedTrialSecondsPlayed: number;
  vecBetas: VecBetas[];
  vecChildConfigApps: number[];
  vecDeckCompatTestResults: unknown[];
  vecDLC: unknown[];
  vecLanguages: SelectedLanguage[];
  vecLegacyCDKeys: unknown[];
  vecMusicAlbums: unknown[];
  vecPlatforms: string[];
  vecScreenShots: VecScreenShots[];
}

export interface HAppDetails {
  unregister(): unknown /* native code */;
}

export interface Details2 {
  achievements: Achievements;
  bAvailableContentOnStore: boolean;
  bCanMoveInstallFolder: boolean;
  bCloudAvailable: boolean;
  bCloudEnabledForAccount: boolean;
  bCloudEnabledForApp: boolean;
  bCloudSyncOnSuspendAvailable: boolean;
  bCloudSyncOnSuspendEnabled: boolean;
  bCommunityMarketPresence: boolean;
  bControllerSurveyFilledOut: boolean;
  bDisableUserMediaUpload: boolean;
  bEnableAllowDesktopConfiguration: boolean;
  bFreeRemovableLicense: boolean;
  bGamepadRequired: boolean;
  bHasAIGeneratedContent: boolean;
  bHasAllLegacyCDKeys: boolean;
  bHasAnyLocalContent: boolean;
  bHasDifferentCopies: boolean;
  bHasLockedPrivateBetas: boolean;
  bIsExcludedFromSharing: boolean;
  bIsFreeApp: boolean;
  bIsSubscribedTo: boolean;
  bIsThirdPartyUpdater: boolean;
  bOverlayEnabled: boolean;
  bOverrideInternalResolution: boolean;
  bRemotePlayTogether: boolean;
  bRequiresLegacyCDKey: boolean;
  bShowCDKeyInMenus: boolean;
  bShowControllerConfig: boolean;
  bStorePagePublished: boolean;
  bSupportsCDKeyCopyToClipboard: boolean;
  bWorkshopVisible: boolean;
  deckDerivedProperties: DeckDerivedProperties;
  eAppOwnershipFlags: number;
  eAppUpdateError: number;
  eAutoUpdateValue: number;
  eBackgroundDownloads: number;
  eCloudStatus: number;
  eCloudSync: number;
  eControllerRumblePreference: number;
  eDisplayStatus: number;
  eEnableThirdPartyControllerConfiguration: number;
  eSteamInputControllerMask: number;
  iInstallFolder: number;
  lDiskUsageBytes: number;
  lDlcUsageBytes: number;
  libraryAssets: LibraryAssets;
  nBuildID: number;
  nCompatToolPriority: number;
  nPlaytimeForever: number;
  nScreenshots: number;
  rtLastTimePlayed: number;
  rtLastUpdated: number;
  rtPurchased: number;
  selectedLanguage: SelectedLanguage;
  strCloudBytesAvailable: string;
  strCloudBytesUsed: string;
  strCompatToolDisplayName: string;
  strCompatToolName: string;
  strDeveloperName: string;
  strDisplayName: string;
  strExternalSubscriptionURL: string;
  strFlatpakAppID: string;
  strHomepageURL: string;
  strInstallFolder: string;
  strLaunchOptions: string;
  strLockedBySteamID: string;
  strManualURL: string;
  strOwnerSteamID: string;
  strResolutionOverride: string;
  strSelectedBeta: string;
  strSteamDeckBlogURL: string;
  strStoreHeaderImage: string;
  unAppID: number;
  unEntitledContentApp: number;
  unMemberCopies: number;
  unMembersPlaying: number;
  unTimedTrialSecondsAllowed: number;
  unTimedTrialSecondsPlayed: number;
  vecBetas: VecBetas[];
  vecChildConfigApps: number[];
  vecDeckCompatTestResults: VecDeckCompatTestResults[];
  vecDLC: unknown[];
  vecLanguages: SelectedLanguage[];
  vecLegacyCDKeys: unknown[];
  vecMusicAlbums: unknown[];
  vecPlatforms: string[];
  vecScreenShots: VecScreenShots[];
}

export interface m_ClientConnectionCallbacks {
  ClearAllCallbacks(): void;
  CountRegistered(): unknown;
  Dispatch(...e: unknown[]): void;
  Register(e: unknown): { Unregister: () => void; };

  m_vecCallbacks: unknown[];
}

export interface m_ClientConnectionCallbacks2 {
  ClearAllCallbacks(): void;
  CountRegistered(): unknown;
  Dispatch(...e: unknown[]): void;
  Register(e: unknown): { Unregister: () => void; };

  m_vecCallbacks: unknown[];
}

export interface m_ClientConnectionCallbacks3 {
  ClearAllCallbacks(): void;
  CountRegistered(): unknown;
  Dispatch(...e: unknown[]): void;
  Register(e: unknown): { Unregister: () => void; };

  m_vecCallbacks: unknown[];
}

export interface m_ErrorReportingStore {
  BIsBlacklisted(e: unknown): boolean;
  Init(e: unknown, t: unknown, r: unknown, n?: unknown /* default = {} */): void;
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
  m_rgErrorQueue: unknown[];
  m_sendTimer: null;
  m_strProduct: string;
  m_strVersion: string;
  m_transport: m_ServiceTransport;
  product: string;
  reporting_enabled: boolean;
  version: string;
}

export interface m_mapCallbacks {
  invoke(): unknown;
  msgClass(): unknown;
}

export interface Achievements {
  nAchieved: number;
  nTotal: number;
  vecAchievedHidden: unknown[];
  vecHighlight: unknown[];
  vecUnachieved: unknown[];
}

export interface LibraryAssets {
  logoPosition: LogoPosition;
  strCapsuleImage: string;
  strHeaderImage: string;
  strHeroBlurImage: string;
  strHeroImage: string;
  strLogoImage: string;
}

export interface SelectedLanguage {
  strDisplayName: string;
  strShortName: string;
}

export interface VecBetas {
  strDescription: string;
  strName: string;
}

export interface VecScreenShots {
  bSpoilers: boolean;
  bUploaded: boolean;
  ePrivacy: number;
  hHandle: number;
  nAppID: number;
  nCreated: number;
  nHeight: number;
  nWidth: number;
  publishedFileID: string;
  strCaption: string;
  strGameID: string;
  strUrl: string;
  ugcHandle: string;
}

export interface DeckDerivedProperties {
  hdr_support: number;
  non_deck_display_glyphs: boolean;
  primary_player_is_controller_slot_0: boolean;
  requires_h264: boolean;
  requires_internet_for_setup: boolean;
  requires_internet_for_singleplayer: boolean;
  requires_manual_keyboard_invoke: boolean;
  requires_non_controller_launcher_nav: boolean;
  small_text: boolean;
  supported_input: number;
}

export interface VecDeckCompatTestResults {
  test_loc_token: string;
  test_result: number;
}

export interface LogoPosition {
  nHeightPct: number;
  nWidthPct: number;
  pinnedPosition: string;
}
