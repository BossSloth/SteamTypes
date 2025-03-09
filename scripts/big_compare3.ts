import { ObservableMap } from 'mobx';
import Long from 'long';
import { Message as JsPbMessage } from "google-protobuf";

export interface AllObjects {
  App: App;
  appAchievementProgressCache: AppAchievementProgressCache;
  appActivityStore: AppActivityStore;
  appDetailsCache: AppDetailsCache;
  appDetailsStore: AppDetailsStore;
  appInfoStore: AppInfoStore;
  appReviewStore: AppReviewStore;
  appSpotlightStore: AppSpotlightStore;
  appStore: AppStore;
}

export interface App {
  BFinishedInitStageOne(): unknown;
  BHardwareSurveyPending(): boolean;
  BHasAckOnlyActiveSupportAlerts(): boolean;
  BHasActiveSupportAlerts(): boolean;
  BHasCurrentUser(): boolean;
  BIsFamilyGroupMember(e: unknown): unknown;
  BIsInFamilyGroup(): boolean;
  BIsInOOBE(): boolean;
  BIsOfflineMode(): unknown;
  BMustShowSupportAlertDialog(): boolean;
  BSupportAlertDialogActive(): unknown;
  BWasEverLoggedIn(): unknown;
  CloseSupportAlertsModal(): void;
  GetCloudStorageForLibrary(): unknown;
  GetCurrentUser(): unknown;
  GetFamilyGroupID(): unknown;
  GetFamilyGroupName(): unknown;
  GetServicesInitialized(): boolean;
  Init(e: unknown): Promise<void>;
  InitStage2(): Promise<void>;
  OnCMDisconnect(): unknown /* native code */;
  OnCMLogon(): unknown /* native code */;
  OnCurrentUserChanges(): unknown /* native code */;
  OnLoginStateChange(): unknown /* native code */;
  OptOutOfSurvey(): void;
  SendSurvey(): void;
  ShowSupportAlertsModal(): void;
  WaitForServicesInitialized(): Promise<unknown>;

  cm: Cm;
  LoginState: number;
  m_bFinishedStage1: boolean;
  m_bHaveShownSupportAlertModal: boolean;
  m_bServicesInitialized: boolean;
  m_bStartedStage2: boolean;
  m_bSupportAlertModalActive: boolean;
  m_bWasEverLoggedIn: boolean;
  m_cloudStorage: m_cloudStorage;
  m_cm: Cm;
  m_CurrentUser: m_CurrentUser;
  m_eLoginState: number;
}

export interface AppAchievementProgressCache {
  BGameHasAchievements(e: unknown): boolean;
  GetAchievementProgress(e: unknown): number;
  Init(e: unknown): Promise<void>;
  LoadCacheFile(): Promise<void>;
  OnAchievementNotification(): unknown /* native code */;
  QueueCacheUpdate(e: unknown): void;
  RequestCacheUpdate(): Promise<void>;
  SaveCacheFile(): Promise<void>;

  CMInterface: Cm;
  m_achievementProgress: m_achievementProgress;
  m_cacheUpdateTimer: undefined;
  m_CMInterface: Cm;
  m_mapQueuedCacheMisses: Map<unknown, unknown>;
}

export interface AppActivityStore {
  BAllowDeckCompatibilityFeedback(e: unknown): unknown;
  BShouldPromptForDeckCompatibilityFeedback(e: unknown): boolean;
  ClearDeckCompatibilityFeedbackAskList(): void;
  FetchActivityHistory(e: unknown, t: unknown): Promise<void>;
  FetchLatestActivity(e: unknown, t: unknown): void;
  FetchLatestActivityFromServer(e: unknown, t: unknown): Promise<void>;
  GetAppActivity(e: unknown): unknown;
  GetDeckCompatibilityFeedback(e: unknown): unknown;
  Init(e: unknown): void;
  OnAchievementNotification(): unknown /* native code */;
  OnAppLifetimeNotification(): unknown /* native code */;
  OnScreenshotNotification(): unknown /* native code */;
  RequestRestoreActivity(e: unknown): void;
  RestoreActivity(e: unknown): Promise<void>;
  RestoreCachedActivity(): Promise<unknown>;
  SetDeckCompatibilityFeedback(e: unknown, t: unknown): Promise<boolean>;
  writeDeckCompatibilityFeedbackToLocalStorage(): void;

  CMInterface: Cm;
  m_CMInterface: Cm;
  m_deckCompatibilityFeedback_EligibleApps: (object | unknown);
  m_localStorage: m_localStorage;
  m_mapAppActivity: ObservableMap<number, m_mapAppActivity>;
  m_rgDeckCompatibilityFeedback_Ask: unknown[];
  m_setAppFetchRequested: Set<unknown>;
  m_setAppsLoading: Set<unknown>;
}

export interface AppDetailsCache {
  BHasDataForApp(e: unknown): unknown;
  FetchDataForApp(e: unknown): Promise<void>;
  GetCachedDataForApp(e: unknown, t: unknown, r: unknown): Promise<unknown>;
  LookupCachedDataForApp(e: unknown, t: unknown, r: unknown): unknown;
  SetCachedDataForApp(e: unknown, t: unknown, r: unknown, n: unknown): unknown;

  m_mapAppDetailsCache: ObservableMap<number, (Map<string, (m_mapAppDetailsCache | m_mapAppDetailsCache2)> | Map<string, m_mapAppDetailsCache>)>;
}

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
  GetHeaderImagesForAppId(e: unknown, t: unknown, r: unknown): never[];
  GetHeroBlurImages(e: unknown): unknown[];
  GetHeroBlurImagesForAppId(e: unknown, t: unknown, r: unknown): never[];
  GetHeroImages(e: unknown): { rgHeroImages: unknown[]; bHasHeroImage: unknown; appid: unknown; };
  GetHeroImagesForAppId(e: unknown, t: unknown, r: unknown): { rgHeroImages: unknown[]; bHasHeroImage: boolean; };
  GetLogoImages(e: unknown): { rgLogoImages: unknown[]; logoPosition: unknown; };
  GetLogoImagesForAppId(e: unknown, t: unknown, r: unknown): { rgLogoImages: unknown[]; logoPosition: null; };
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

  m_CMInterface: Cm;
  m_mapAppData: ObservableMap<number, m_mapAppData>;
  m_mapRecentlyLaunchedApps: ObservableMap<unknown, unknown>;
  m_setDetailsInProgress: Set<unknown>;
}

export interface AppInfoStore {
  BHavePendingAppInfoRequests(): boolean;
  EnsureAppInfoForAppIDs(e: unknown): Promise<unknown>;
  FlushPendingAppInfo(): Promise<void>;
  GetAppInfo(e: unknown): unknown;
  GetCacheKeyForAppID(e: unknown): string;
  GetRichPresenceLoc(e: unknown): unknown;
  GetRichPresenceLocAsync(e: unknown): unknown;
  Init(e: unknown): void;
  IsLoadingAppID(e: unknown): unknown;
  LoadAppInfoBatch(e: unknown): Promise<void>;
  LoadAppInfoBatchFromLocalCache(e: unknown): Promise<unknown>;
  Localize(e: unknown, t: unknown, r: unknown): unknown;
  OnAppOverviewChange(e: unknown): void;
  OnGetAppsResponse(e: unknown): void;
  OnRichPresenceLocUpdate(e: unknown, t: unknown): void;
  QueueAppInfoRequest(e: unknown): unknown;
  QueueRichPresenceLocRequest(e: unknown): unknown;
  RegisterCallbackOnLoad(e: unknown): undefined;
  SaveAppInfoBatchToLocalCache(e: unknown): Promise<void>;
  SetCacheStorage(e: unknown): void;

  CMInterface: Cm;
  m_CacheStorage: null;
  m_cAppInfoRequestsInFlight: number;
  m_CMInterface: Cm;
  m_fnCallbackOnAppInfoLoaded: m_fnCallbackOnAppInfoLoaded;
  m_mapAppInfo: ObservableMap<number, m_mapAppInfo>;
  m_mapRichPresenceLoc: ObservableMap<unknown, unknown>;
  m_PendingAppInfoPromise: undefined;
  m_PendingAppInfoResolve: undefined;
  m_setPendingAppInfo: Set<unknown>;
}

export interface AppReviewStore {
  FetchRecommendationDetails(e: unknown, t: unknown): Promise<unknown>;
  GetReview(e: unknown, t: unknown, r: unknown): Promise<null>;
  GetStoredReview(e: unknown, t: unknown): unknown;
  Init(e: unknown): void;

  CMInterface: Cm;
  m_CMInterface: Cm;
  m_mapRecommendationDetailsByApp: ObservableMap<number, (ObservableMap<string, m_mapRecommendationDetailsByApp> | ObservableMap<string, null>)>;
}

export interface AppSpotlightStore {
  BHasAppData(e: unknown): unknown;
  BSimulateSummaryFakeAchievement(e: unknown): boolean;
  EnterAppDetailsPage(e: unknown): void;
  ExitAppDetailsPage(e: unknown): void;
  GetCM(): unknown;
  GetFeaturedNewDLC(e: unknown): unknown;
  GetGamePlaySpotlightTime(e: unknown): unknown;
  GetNewDLCTimeRanges(e: unknown): unknown;
  GetOrCreateAppData(e: unknown): unknown;
  GetPostGameSummary(e: unknown): unknown;
  GetStartOfSessionTimestamp(e: unknown): number;
  Init(e: unknown): Promise<void>;
  LoadPreviousSessionData(e: unknown): Promise<void>;
  OnAchievementNotification(): unknown /* native code */;
  OnClipCreated(): unknown /* native code */;
  OnClipDeleted(): unknown /* native code */;
  OnRecordingHighlightChanged(): unknown /* native code */;
  OnScreenshotNotification(): unknown /* native code */;
  OnTradingCardNotification(): unknown /* native code */;
  SetNewDLCTimeRanges(e: unknown, t: unknown): void;
  SimulateNewDLC(e: unknown): void;
  SimulatePressSummary(): Promise<undefined>;
  SimulateSummaryClear(e: unknown): void;
  SimulateSummaryForceNewDay(e: unknown): void;
  StopShowingGamePlaySpotlight(e: unknown): void;
  StopShowingNewDLC(e: unknown): void;
  UpdateNewDLCToShow(e: unknown, t: unknown): undefined;
  UpdatePostGameSummaryForApp(e: unknown): Promise<void>;
  UpdatePostGameSummaryForApp_Internal(e: unknown): Promise<void>;
  WaitForAchievementsInRange(e: unknown, t: unknown, r: unknown): Promise<never[]>;
  WaitForClips(e: unknown, t: unknown): Promise<unknown>;
  WaitForRecordingHighlights(e: unknown, t: unknown): Promise<unknown>;

  m_CMInterface: Cm;
  m_dlcLocalStore: m_dlcLocalStore;
  m_gamePlayLocalStore: (object | unknown);
  m_localStorage: m_localStorage;
  m_mapAppData: Map<number, m_mapAppData2>;
}

export interface AppStore {
  CompareSortAs(): unknown /* native code */;
  GetAlbumCoverURLForApp(e: unknown): string | null;
  GetAppOverviewByAppID(e: unknown): unknown;
  GetAppOverviewByGameID(e: unknown): unknown;
  GetCachedAlbumCoverURL(e: unknown): unknown;
  GetCachedVerticalCapsuleURL(e: unknown): unknown[];
  GetCustomHeroImageURLs(e: unknown): unknown;
  GetCustomImageURLs(e: unknown, t: unknown): unknown[];
  GetCustomLandcapeImageURLs(e: unknown): unknown;
  GetCustomLogoImageURLs(e: unknown): unknown;
  GetCustomVerticalCapsuleURLs(e: unknown): unknown;
  GetIconURLForApp(e: unknown): unknown;
  GetLocalizationForStoreTag(): unknown /* native code */;
  GetPregeneratedVerticalCapsuleForApp(e: unknown): string;
  GetStorePageURLForApp(e: unknown): string | null;
  GetTopStoreTags(e: unknown): { nTagId: never; nCount: unknown; }[];
  GetVerticalCapsuleURLForApp(e: unknown): unknown;
  Init(e: unknown): Promise<void>;
  RefreshTagsIfNeeded(): void;
  UpdateAppOverview(): unknown /* native code */;

  allApps: AllApps[];
  m_bIsInitialized: boolean;
  m_cm: Cm;
  m_collator: m_collator;
  m_mapApps: ObservableMap<number, AllApps>;
  m_mapStoreTagLocalization: Map<number, m_mapStoreTagLocalization>;
  m_msTagMapLoaded: number;
  sharedLibraryAccountIds: number[];
  siteLicenseApps: null;
  storeTagCounts: Map<number, number>;
}

export interface Cm {
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
  m_callbacksOnConnectOneTime: m_callbacksOnConnect;
  m_callbacksOnDisconnect: m_callbacksOnConnect;
  m_callbacksOnDisconnectOneTime: m_callbacksOnConnect;
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

export interface m_cloudStorage {
  Get(e: unknown): unknown;
  GetByPrefix(e: unknown): unknown;
  GetMapForPrefix(e: unknown): unknown;
  GetObject(e: unknown): Promise<unknown>;
  GetString(e: unknown): Promise<unknown>;
  RegisterForChangeNotifications(e: unknown): unknown;
  RemoveObject(e: unknown, t: unknown, r: unknown): Promise<void>;
  StoreObject(e: unknown, t: unknown, r: unknown, n: unknown): Promise<unknown>;
  StoreString(e: unknown, t: unknown, r: unknown, n: unknown): Promise<void>;

  m_eNamespace: number;
}

export interface m_CurrentUser {
  bHWSurveyPending: boolean;
  bIsLimited: boolean;
  bIsOfflineMode: boolean;
  bPromptToChangePassword: boolean;
  bSupportAckOnlyMessages: boolean;
  bSupportAlertActive: boolean;
  bSupportPopupMessage: boolean;
  NotificationCounts: NotificationCounts;
  strAccountBalance: string;
  strAccountBalancePending: string;
  strAccountName: string;
  strClientInstanceID: string;
  strFamilyGroupID: string;
  strSteamID: string;
}

export interface m_achievementProgress {
  mapCache: ObservableMap<number, MapCache>;
  nVersion: number;
}

export interface m_localStorage {
  GetObject(e: unknown, t: unknown): Promise<unknown>;
  GetString(e: unknown): Promise<unknown>;
  RemoveObject(e: unknown): Promise<unknown>;
  StoreObject(e: unknown, t: unknown): Promise<unknown>;
  StoreString(e: unknown, t: unknown): Promise<unknown>;
}

export interface m_mapAppActivity {
  AddGameActivityEvent(e: unknown, t: unknown): void;
  AddNewsEvents(e: unknown): Promise<never[]>;
  AddUserNewsEvent(e: unknown): Promise<void>;
  BEventIsTooOldToCache(e: unknown): boolean;
  BHasEvents(): boolean;
  CacheGameActivityEvent(e: unknown): void;
  CacheUserNewsEvent(e: unknown): void;
  DeleteEvent(e: unknown): Promise<void>;
  DeleteLocally(e: unknown): Promise<void>;
  GetAchievementMapCache(): string;
  GetGameActivityCache(): never[];
  GetUserNewsCache(): never[];
  MergeGameActivity(e: unknown, t: unknown): void;
  MergeUserNews(): Promise<unknown>;
  RequestStoreItems(): Promise<void>;
  RestoreAchievementMapFromCache(e: unknown): void;
  SortEvents(): void;

  appActivityByDay: AppActivityByDay[];
  earliest_game_activity_time: number;
  earliest_user_news_time: number;
  lastAddedEventType: number;
  lastAddedPartnerEvent: (LastAddedPartnerEvent | null);
  latest_activity_time: number;
  latest_game_activity_time: number;
  latest_user_news_time: number;
  m_AchievementMap: Map<number, Map<string, m_AchievementMap>>;
  m_bNoMoreHistoryAvailable: boolean;
  m_mapActivityByDay: ObservableMap<number, AppActivityByDay>;
  m_rgCachedGameActivityEvents: m_rgCachedGameActivityEvents[];
  m_rgCachedUserNewsEvents: m_rgCachedUserNewsEvents[];
  m_rtEarliestGameActivityTime: number;
  m_rtEarliestUserNewsTime: number;
  m_rtLatestGameActivityTime: number;
  m_rtLatestUserNewsTime: number;
  m_unAppID: number;
}

export interface m_mapAppDetailsCache {
  data?: (Data | Data2 | Data3 | Data4 | Data5[] | string | string[]);
  version: number;
}

export interface m_mapAppDetailsCache2 {
  version: number;
}

export interface m_mapAppData {
  appDetailsSpotlight: null;
  associationData: (Data2 | null);
  bLoadingAchievments: boolean;
  cRegistered: number;
  customImageInfo?: null;
  customImageInfoRtime: number;
  descriptionsData: (Data3 | null);
  details: (Details | null);
  hAppDetails: HAppDetails;
  listeners: never;
}

export interface m_fnCallbackOnAppInfoLoaded {
  ClearAllCallbacks(): void;
  CountRegistered(): unknown;
  Dispatch(...e: unknown[]): void;
  Register(e: unknown): { Unregister: () => void; };

  m_vecCallbacks: unknown[];
}

export interface m_mapAppInfo {
  BIsApplicationOrTool(): boolean;
  BuildAppURL(e: unknown, t: unknown): unknown;
  DeserializeFromAppOverview(e: unknown): void;
  DeserializeFromCacheObject(e: unknown): void;
  DeserializeFromMessage(e: unknown): void;
  SerializeToCacheObject(): { strName: unknown; strIconURL: unknown; strUpdatedFromServer: unknown; eAppType: unknown; } | null;

  appid: number;
  apptype: number;
  icon_url: string;
  icon_url_no_default: string;
  is_initialized: boolean;
  is_valid: boolean;
  m_bInitialized: boolean;
  m_dtUpdatedFromServer: Date;
  m_eAppType: number;
  m_strIconURL: string;
  m_strName: string;
  m_unAppID: number;
  name: string;
  time_updated_from_server: Date;
}

export interface m_mapRecommendationDetailsByApp {
  account_score_spend: number;
  appid: number;
  approved_for_china: boolean;
  ban_check_result: number;
  category_ascii_pct: number;
  category_meme_pct: number;
  category_offtopic_pct: number;
  category_uninformative_pct: number;
  category_votefarming_pct: number;
  comment_count: number;
  comments_disabled: boolean;
  deck_playtime_at_review: number;
  developer_flag_cleared: boolean;
  developer_response: string;
  flagged_by_developer: number;
  hidden_in_steam_china: boolean;
  ipaddress: string;
  is_public: boolean;
  language: string;
  last_playtime: number;
  moderation_note: string;
  moderator_hidden: boolean;
  payment_method: number;
  playtime_2weeks: number;
  playtime_at_review: number;
  playtime_forever: number;
  reactions: unknown[];
  received_compensation: boolean;
  recommendationid: string;
  refunded: boolean;
  report_score: number;
  review: string;
  review_qualities: unknown[];
  steam_china_location: string;
  steamid: string;
  steamid_dev_responder: string;
  steamid_developer: string;
  steamid_moderator: string;
  time_created: number;
  time_developer_responded: number;
  time_updated: number;
  unverified_purchase: boolean;
  vote_score: number;
  voted_up: boolean;
  votes_down: number;
  votes_funny: number;
  votes_up: number;
  weighted_vote_score: number;
  written_during_early_access: boolean;
}

export interface m_dlcLocalStore {
  '360430': InvalidName;
  '50130': InvalidName;
}

export interface m_mapAppData2 {
  m_hAppDetailsAutorun(): void;

  m_bLoadedPreviousSessionData: boolean;
  m_bRerunUpdate: boolean;
  m_bUpdateInProgress: boolean;
  m_postGameSummary: (m_session | null);
  m_rgNewDLC: never;
  m_session: m_session;
  m_unAppID: number;
}

export interface AllApps {
  BAreCategoriesEqual(e: unknown): unknown;
  BAreSetsEqual(e: unknown, t: unknown): unknown;
  BAreStoreTagsEqual(e: unknown): unknown;
  BHasCustomImages(): boolean;
  BHasNonObservableChange(e: unknown): boolean;
  BHasObservableChange(e: unknown): boolean;
  BHasObservables(): boolean;
  BHasStoreCategory(e: unknown): unknown;
  BHasStoreTag(): unknown /* native code */;
  BIsAppBlocked(): unknown;
  BIsAppInBlockList(): unknown;
  BIsApplicationOrTool(): boolean;
  BIsBorrowed(): unknown;
  BIsDemo(): boolean;
  BIsGameIDEqual(e: unknown): boolean;
  BIsHardware(): boolean;
  BIsLastTimePlayedEqual(e: unknown): boolean;
  BIsModOrShortcut(): unknown;
  BIsMusicAlbum(): boolean;
  BIsNewToLibrary(): unknown;
  BIsOwned(): unknown;
  BIsOwnedByAnotherUser(): unknown;
  BIsPerClientDataEqual(e: unknown): boolean;
  BIsPerClientDataLocal(e: unknown): unknown;
  BIsSelectedClientLocal(): boolean;
  BIsShortcut(): boolean;
  BIsSortAsEqual(e: unknown): boolean;
  BIsSteamDeckVerified(): boolean;
  BIsSteamVR(): unknown;
  BIsUnreleased(): boolean;
  BIsVisibleInMRUList(): boolean;
  BSupportsVR(): unknown;
  ComputeLastPlayedSectionName(e: unknown): unknown;
  GetCanonicalReleaseDate(): unknown;
  GetCanonicalReleaseYear(): unknown;
  GetGameID(): unknown;
  GetLastPlayedSectionName(): unknown;
  GetLastTimePlayed(): unknown;
  GetPerClientData(e: unknown): unknown;
  GetPrimaryAppID(): unknown;
  GetStoreTags(): unknown;
  InitFromProto(e: unknown): void;
  LOG_CHANGE(): unknown /* native code */;
  SetGameID(e: unknown): void;
  SetLastTimePlayed(e: unknown): void;
  SetPerClientData(e: unknown): void;
  SetSortAs(e: unknown): void;
  SetStoreCategories(e: unknown): void;
  SetStoreTags(e: unknown): void;

  __cachedLastPlayedSection?: string;
  __cachedLastPlayedTime?: number;
  __cachedReleaseYearString?: never;
  active_beta?: string;
  album_cover_hash?: string;
  app_type: number;
  appid: number;
  canonicalAppType: number;
  display_name: string;
  display_status: number;
  gameid: string;
  gamepad_preferred: boolean;
  header_filename?: string;
  icon_data?: string;
  icon_data_format?: string;
  icon_hash?: string;
  installed?: boolean;
  is_available_on_current_platform?: boolean;
  is_invalid_os_type?: never;
  library_capsule_filename?: string;
  library_id?: string;
  local_cache_version?: number;
  local_per_client_data: Local_per_client_data;
  m_gameid?: string;
  m_setStoreCategories: Set<number>;
  m_setStoreTags: Set<number>;
  m_ulGameId?: Long;
  mastersub_appid?: never;
  mastersub_includedwith_logo?: never;
  metacritic_score?: number;
  minutes_playtime_forever: number;
  minutes_playtime_last_two_weeks: number;
  most_available_clientid: string;
  most_available_per_client_data: Local_per_client_data;
  mru_index?: number;
  number_of_copies: number;
  optional_parent_app_id?: number;
  owner_account_id?: number;
  per_client_data: Local_per_client_data[];
  ps4_controller_support: number;
  ps5_controller_support: number;
  review_percentage: number;
  review_percentage_with_bombs: number;
  review_percentage_without_bombs: number;
  review_score: number;
  review_score_with_bombs: number;
  review_score_without_bombs: number;
  rt_custom_image_mtime?: number;
  rt_last_time_locally_played?: number;
  rt_last_time_played: number;
  rt_last_time_played_or_installed: number;
  rt_original_release_date: number;
  rt_purchased_time?: number;
  rt_recent_activity_time: number;
  rt_steam_release_date: number;
  rt_store_asset_mtime?: number;
  selected_clientid: string;
  selected_per_client_data: Local_per_client_data;
  shortcut_override_appid?: never;
  site_license_site_name?: never;
  size_on_disk?: string;
  sort_as: string;
  status_percentage: number;
  steam_deck_compat_category: number;
  steam_hw_compat_category_packed: number;
  store_category: number[];
  store_tag: number[];
  subscribed_to?: boolean;
  third_party_mod?: boolean;
  visible_in_game_list?: boolean;
  vr_only?: boolean;
  vr_supported?: boolean;
  xbox_controller_support?: number;
}

export interface m_collator {
  compare(): unknown /* native code */;
  resolvedOptions(): unknown /* native code */;
}

export interface m_mapStoreTagLocalization {
  name: string;
  tagid: number;
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
  m_ClientConnectionCallbacks: m_fnCallbackOnAppInfoLoaded;
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

export interface NotificationCounts {
  async_game_updates: number;
  comments: number;
  gifts: number;
  help_request_replies: number;
  inventory_items: number;
  invites: number;
  moderator_messages: number;
  offline_messages: number;
  trade_offers: number;
}

export interface MapCache {
  all_unlocked: boolean;
  appid: number;
  cache_time: number;
  percentage: number;
  total: number;
  unlocked: number;
  vetted?: boolean;
}

export interface AppActivityByDay {
  AddAchievementEvent(e: unknown, t: unknown, r: unknown): Promise<undefined>;
  AddActivityEvent(e: unknown, t: unknown, r: unknown, n: unknown): void;
  AddEvent(e: unknown): void;
  AddPartnerEvent(e: unknown, t: unknown): Promise<unknown>;
  AddReceivedGameEvent(e: unknown, t: unknown, r: unknown): Promise<void>;
  AddRecommendedGameEvent(e: unknown, t: unknown, r: unknown): Promise<undefined>;
  AddScreenshotEvent(e: unknown, t: unknown): Promise<undefined>;
  AddSteamTradingCardEvent(e: unknown, t: unknown, r: unknown): void;
  AddUserStatusEvent(e: unknown, t: unknown): Promise<undefined>;
  AddVideoEvent(e: unknown, t: unknown): Promise<undefined>;
  AddWishlistedGameEvent(e: unknown, t: unknown): Promise<void>;
  BHasEvents(): boolean;
  GetEarliestEventTime(): unknown;
  GetLatestEventTime(): unknown;
  RemoveEvent(e: unknown): boolean;
  SortEvents(): void;

  dayBegin?: never;
  events: ((Events | LastAddedPartnerEvent)[] | Events[] | LastAddedPartnerEvent[]);
  isValid: boolean;
  m_mapAchievementsByUser: Map<number, Events>;
  m_mapReceivedGameByUser: Map<number, Events>;
  m_mapScreenshotsByUser: never;
  m_mapTradingCardsByUser: Map<number, Events>;
  m_mapVideosByUser: Map<number, Events>;
  m_mapWishlistedGameByUser: Map<number, Events>;
  m_rgEvents: ((Events | LastAddedPartnerEvent)[] | Events[] | LastAddedPartnerEvent[]);
  m_rtDayBegin?: never;
}

export interface LastAddedPartnerEvent {
  AddCommentThread(e: unknown, t: unknown): void;
  BIsValid(): boolean;
  BSupportsCommentThreads(): unknown;
  BUserCanDelete(): unknown;
  DeleteOnServer(): void;
  GetActiveCommentThread(): unknown;
  GetAppIds(): unknown[];
  GetCommentThreadType(): 0 | 5 | 15 | 16 | 11 | 8;
  GetEvent(): Promise<unknown>;
  GetParentalFeature(): unknown;
  InitFromGameActivity(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): void;
  InitFromUserNewsEvent(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): void;
  IsEventLoaded(): boolean;
  ReloadEvent(e: unknown): Promise<unknown>;
  SetActiveCommentThread(e: unknown): void;

  activeThread: number;
  announcementGID: string;
  appid: number;
  bIsGameActivity: boolean;
  comment_count?: number;
  commentThreads: never;
  downvotes?: number;
  eEventSubType?: never;
  eEventType: number;
  eGameActivityType?: never;
  eventModel?: EventModel;
  forumTopicGID?: string;
  gameid: string;
  m_gidAnnouncement: string;
  m_unTimeLastMod: number;
  rtEventTime: number;
  rtPartnerEventSortDate?: number;
  steamIDActor: m_steamid;
  steamIDTarget?: never;
  unUniqueID: number;
  upvotes?: number;
}

export interface m_rgCachedUserNewsEvents extends JsPbMessage {
  achievement_names(): unknown;
  add_achievement_names(t: unknown, n: unknown): void;
  add_appids(t: unknown, n: unknown): void;
  appids(): unknown;
  clan_announcementid(): unknown;
  clan_eventid(): unknown;
  event_last_mod_time(): unknown;
  event_post_time(): unknown;
  eventtime(): unknown;
  eventtype(): unknown;
  gameid(): unknown;
  packageid(): unknown;
  publishedfileid(): unknown;
  set_achievement_names(n: unknown): unknown;
  set_appids(n: unknown): unknown;
  set_clan_announcementid(n: unknown): unknown;
  set_clan_eventid(n: unknown): unknown;
  set_event_last_mod_time(n: unknown): unknown;
  set_event_post_time(n: unknown): unknown;
  set_eventtime(n: unknown): unknown;
  set_eventtype(n: unknown): unknown;
  set_gameid(n: unknown): unknown;
  set_packageid(n: unknown): unknown;
  set_publishedfileid(n: unknown): unknown;
  set_shortcutid(n: unknown): unknown;
  set_steamid_actor(n: unknown): unknown;
  set_steamid_target(n: unknown): unknown;
  shortcutid(): unknown;
  steamid_actor(): unknown;
  steamid_target(): unknown;
}

export interface m_AchievementMap {
  bAchieved?: boolean;
  bHidden?: boolean;
  flAchieved: number;
  rtUnlocked?: number;
  strDescription: string;
  strID: string;
  strImage: string;
  strName: string;
}

export interface m_rgCachedGameActivityEvents extends JsPbMessage {
  data1(): unknown;
  data2(): unknown;
  data3(): unknown;
  data4(): unknown;
  event_sub_type(): unknown;
  event_type(): unknown;
  item_appid(): unknown;
  item_assetid(): unknown;
  item_contextid(): unknown;
  proto_data(): unknown;
  set_data1(n: unknown): unknown;
  set_data2(n: unknown): unknown;
  set_data3(n: unknown): unknown;
  set_data4(n: unknown): unknown;
  set_event_sub_type(n: unknown): unknown;
  set_event_type(n: unknown): unknown;
  set_item_appid(n: unknown): unknown;
  set_item_assetid(n: unknown): unknown;
  set_item_contextid(n: unknown): unknown;
  set_proto_data(n: unknown): unknown;
  set_timestamp(n: unknown): unknown;
  timestamp(): unknown;
}

export interface Data {
  nAchieved: number;
  nTotal: number;
  vecAchievedHidden: VecAchievedHidden[];
  vecHighlight: VecUnachieved[];
  vecUnachieved: VecUnachieved[];
}

export interface Data2 {
  rgDevelopers: RgDevelopers[];
  rgFranchises: RgDevelopers[];
  rgPublishers: RgDevelopers[];
}

export interface Data3 {
  strFullDescription: string;
  strSnippet: string;
}

export interface Data4 {
  bMaxed: null;
  dtNextRetry: number;
  nLevel: number;
  nMaxLevel: number;
  nNextLevelXP: number;
  nXP: number;
  rgCards: RgCards[];
  strIconURL: string;
  strName: string;
  strNextLevelName: string;
}

export interface Data5 {
  active: boolean;
  appid: number;
  item_class: number;
  item_description: string;
  item_image_composed?: string;
  item_image_composed_foil?: string;
  item_image_large: string;
  item_image_small: string;
  item_internal_name: string;
  item_key_values?: string;
  item_last_changed: number;
  item_movie_mp4: string;
  item_movie_mp4_small: string;
  item_movie_webm: string;
  item_movie_webm_small: string;
  item_name: string;
  item_series: number;
  item_title: string;
  item_type: number;
}

export interface Details {
  achievements: Data;
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
  deckDerivedProperties?: DeckDerivedProperties;
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
  lDiskSpaceRequiredBytes?: number;
  lDiskUsageBytes: number;
  lDlcUsageBytes: number;
  libraryAssets?: LibraryAssets;
  nBuildID: number;
  nCompatToolPriority: number;
  nPlaytimeForever: number;
  nScreenshots: number;
  rtLastTimePlayed: number;
  rtLastUpdated?: number;
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
  vecDLC: VecDLC[];
  vecLanguages: SelectedLanguage[];
  vecLegacyCDKeys: never;
  vecMusicAlbums: VecMusicAlbums[];
  vecPlatforms: string[];
  vecScreenShots: VecScreenShots[];
}

export interface HAppDetails {
  unregister(): unknown /* native code */;
}

export interface InvalidName {
  rtFirstShow: number;
  rtShowStart: number;
}

export interface m_session {
  AddAchievement(e: unknown): void;
  AddClip(e: unknown): void;
  AddTradingCard(e: unknown): void;
  BAddScreenshotNotification(e: unknown): boolean;
  ClearSessionEvents(): unknown;
  GetSessionEvents(): unknown;
  HasSessionEvents(): boolean;
  PushSessionEvent(): unknown /* native code */;
  RemoveClip(e: unknown): void;
  SetRecordingHighlights(e: unknown): void;

  m_rgSessionEvents: m_rgSessionEvents[];
}

export interface Local_per_client_data {
  active_beta?: string;
  bytes_downloaded: string;
  bytes_total: string;
  client_name: string;
  clientid: string;
  display_status: number;
  installed?: boolean;
  is_available_on_current_platform?: boolean;
  status_percentage: number;
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
  invoke(n: unknown, r: unknown): void;
  msgClass(): unknown;
}

export interface Events {
  AddAchievement(e: unknown, t: unknown): void;
  AddAppId(e: unknown): void;
  AddCommentThread(e: unknown, t: unknown): void;
  AddTradingCard(e: unknown): void;
  AddVideo(e: unknown): Promise<void>;
  BIsValid(): boolean;
  BSupportsCommentThreads(): unknown;
  BUserCanDelete(): unknown;
  DeleteOnServer(): void;
  GetActiveCommentThread(): unknown;
  GetAppIds(): unknown[];
  GetCommentThreadType(): 0 | 5 | 15 | 16 | 11 | 8;
  GetCurrentPublishedFileID(): unknown;
  GetFilteredAppIds(): unknown;
  GetHeadline(): '#AppActivity_SteamTradingCards_EarnedTradingCard' | '#AppActivity_SteamTradingCards_EarnedTradingCards';
  GetParentalFeature(): 2 | 3;
  InitFromGameActivity(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): void;
  InitFromUserNewsEvent(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): void;
  SetActiveCommentThread(e: unknown): void;

  achievements?: m_AchievementMap[];
  activeThread: number;
  appid: number;
  bIsGameActivity: boolean;
  commentThreads: CommentThreads[];
  eEventSubType?: number;
  eEventType?: number;
  eGameActivityType?: number;
  gameid?: string;
  m_bIsValid?: boolean;
  m_cardAssetIDs?: string[];
  m_rgAchievements?: unknown/* circular reference to achievements */;
  m_rgAppIds?: number[];
  m_rgTradingCards?: number[];
  m_rgVideos?: string[];
  m_rtOldestAchievement?: number;
  publishedfileids?: unknown/* circular reference to m_rgVideos */;
  rtEventTime: number;
  steamIDActor: m_steamid;
  steamIDTarget?: never;
  tradingCards?: unknown/* circular reference to m_rgTradingCards */;
  unUniqueID: number;
}

export interface EventModel {
  BAllowedSteamStoreSpotlight(): boolean;
  BContentHubDiscountedOnly(): unknown;
  BEventCanShowBroadcastWidget(e: unknown): unknown;
  BHasAnnouncementGID(): boolean;
  BHasBroadcastEnabled(): unknown;
  BHasBroadcastForceBanner(): unknown;
  BHasEmailEnabled(): unknown;
  BHasEventEnded(): boolean;
  BHasForumTopicGID(): boolean;
  BHasImage(e: unknown, t: unknown): unknown;
  BHasLibaryHomeSpotlight(): boolean;
  BHasSaleEnabled(): unknown;
  BHasSaleProductBanners(): unknown;
  BHasSaleVanity(): unknown;
  BHasScheduleEnabled(): unknown;
  BHasSomeImage(e: unknown): unknown;
  BHasSubTitle(e: unknown): boolean;
  BHasSummary(e: unknown): boolean;
  BHasTag(e: unknown): boolean;
  BHasTagStartingWith(e: unknown): unknown;
  BImageNeedScreenshotFallback(e: unknown, t: unknown): boolean;
  BInRealmChina(): unknown;
  BInRealmGlobal(): boolean;
  BIsBackgroundImageGroupingEnabled(): unknown;
  BIsBroadcastAccountIDWhiteListed(e: unknown): unknown;
  BIsEventActionEnabled(): boolean;
  BIsEventInFuture(): boolean;
  BIsImageSafeForAllAges(e: unknown, t: unknown): unknown;
  BIsLanguageValidForRealms(e: unknown): boolean;
  BIsLockedToGameOwners(): boolean;
  BIsLockedToPartnerAppRights(): boolean;
  BIsOGGEvent(): boolean;
  BIsPartnerEvent(): boolean;
  BIsStagedEvent(): boolean;
  BIsUnlistedEvent(): boolean;
  BIsValidForRealm(e: unknown): unknown;
  BIsVisibleEvent(): boolean;
  BMatchesAllTags(e: unknown): boolean;
  BSaleShowBroadcastAtTopOfPage(): boolean;
  BSaleShowCuratorRecommendationAtBottomOfPage(): boolean;
  BShowLibrarySpotlight(): boolean;
  BShowLibrarySpotlightText(): boolean;
  BUsesContentHubForItemSource(): boolean;
  BUseSubscriptionLayout(): boolean;
  clone(e?: boolean /* default = !1 */): unknown;
  GenerateDynamicSaleSections(e: unknown, t: unknown, r: unknown, n: unknown): never[];
  GetAllSalePageGroups(): unknown;
  GetAllTags(): unknown;
  GetAnnouncementGID(): unknown;
  GetBroadcastChatVisibility(): unknown;
  GetBroadcastTitle(e: unknown): unknown;
  GetBroadcastWhitelist(): unknown;
  GetBroadcastWhitelistAsSteamIDs(): unknown;
  GetCategoryAsString(): unknown;
  GetContentHub(): unknown;
  GetContentHubCategory(): unknown;
  GetContentHubTag(): unknown;
  GetContentHubType(): unknown;
  GetDayIndexFromEventStart(): number;
  GetDescriptionWithFallback(e: unknown): unknown;
  GetEndTimeAndDateUnixSeconds(): unknown;
  GetEventType(): unknown;
  GetEventTypeAsString(): unknown;
  GetFallbackArtworkScreenshot(): unknown;
  GetForumTopicURL(): string;
  GetGameTitle(e: unknown): unknown;
  GetImageForSizeAsArrayWithFallback(e: unknown, t: unknown, r: unknown, n: unknown): unknown[];
  GetImageFromBeginningOfDescription(e: unknown, t: unknown): unknown;
  GetImageHash(e: unknown, t?: number /* default = 0 */): unknown;
  GetImageHashAndExt(e: unknown, t?: number /* default = 0 */): unknown;
  GetImageURL(e: unknown, t?: number /* default = 0 */, r?: unknown /* default = m.wI.full */): unknown;
  GetImageURLWithFallback(e: unknown, t: unknown, r?: unknown /* default = m.wI.full */): unknown;
  GetImgArray(e: unknown): never[];
  GetIncludedRealmList(): unknown[];
  GetLastReferencedSaleDay(): unknown;
  GetLastReferencedSaleDayFromCapsules(e: unknown, t: unknown): unknown;
  GetNameWithFallback(e: unknown): unknown;
  GetPostTimeAndDateUnixSeconds(): unknown;
  GetRequiredAppIDs(): unknown;
  GetRequiredPackageIDs(): unknown;
  GetRequiredPartnerAppRights(): unknown;
  GetSaleFeaturedApps(e: unknown): unknown;
  GetSaleFeaturedAppsAndDemos(e: unknown): unknown;
  GetSaleFeaturedAppsAndDemosCount(e: unknown): unknown;
  GetSaleFeaturedAppsCount(e: unknown): unknown;
  GetSaleFeaturedBundles(e: unknown): unknown;
  GetSaleFeaturedBundlesCount(e: unknown): unknown;
  GetSaleFeaturedPackages(e: unknown): unknown;
  GetSaleFeaturedPackagesCount(e: unknown): unknown;
  GetSaleItemCountOfType(e: unknown, t: unknown): unknown;
  GetSaleItemOfType(e: unknown, t: unknown): Set<unknown>;
  GetSalePageBackgroundGroup(e: unknown): unknown;
  GetSalePageBackgroundImageGroupCount(): unknown;
  GetSalePageGroupDefinition(): unknown;
  GetSaleSectionByID(e: unknown): unknown;
  GetSaleSectionCount(): unknown;
  GetSaleSectionFirstMatchByType(e: unknown): unknown;
  GetSaleSectionIncludingFooterSections(): unknown;
  GetSaleSections(): unknown;
  GetSaleSectionsByType(e: unknown): unknown;
  GetSaleURL(): unknown;
  GetSaleVanity(): unknown;
  GetStartTimeAndDateUnixSeconds(): unknown;
  GetSteamAwardCategory(): unknown;
  GetSteamAwardNomineeCategories(): unknown;
  GetSubTitle(e: unknown): unknown;
  GetSubTitleWithLanguageFallback(e: unknown): unknown;
  GetSubTitleWithSummaryFallback(e: unknown): unknown;
  GetSummary(e: unknown): unknown;
  GetSummaryWithFallback(e: unknown, t: unknown): unknown;
  GetTaggedItems(): unknown;
  GetValveAccessLog(): unknown;
  GetVisibilityStartTimeAndDateUnixSeconds(): unknown;
  toJSON(e: unknown): Object;
  UpdateVoteCount(e: unknown, t: unknown): void;

  announcementClanSteamID: m_steamid;
  AnnouncementGID: string;
  appid: number;
  bLoaded: boolean;
  bOldAnnouncement: boolean;
  broadcaster: undefined;
  clanSteamID: m_steamid;
  comment_type: string;
  creator_steamid: string;
  deleteInProgress: boolean;
  description: ObservableMap<number, string>;
  endTime: number;
  featured_app_tagid: number;
  forumTopicGID: string;
  GID: string;
  gidfeature: string;
  gidfeature2: string;
  has_live_stream: undefined;
  jsondata: Jsondata;
  last_update_steamid: string;
  live_stream_viewer_count: undefined;
  loadedAllLanguages: boolean;
  m_nBuildID: number;
  m_overrideCurrentDay: undefined;
  m_strBuildBranch: string;
  name: ObservableMap<number, string>;
  nCommentCount: number;
  nVotesDown: number;
  nVotesUp: number;
  postTime: number;
  rtime32_last_local_modification: undefined;
  rtime32_last_modified: number;
  rtime32_last_solr_search_col_updated: number;
  rtime32_moderator_reviewed: number;
  startTime: number;
  timestamp_loc_updated: ObservableMap<unknown, unknown>;
  type: number;
  vecTags: string[];
  video_preview_id: undefined;
  video_preview_type: undefined;
  visibility_state: number;
  visibilityEndTime: number;
  visibilityStartTime: number;
}

export interface VecUnachieved {
  bAchieved: boolean;
  bHidden?: boolean;
  flAchieved: number;
  flCurrentProgress: number;
  flMaxProgress: number;
  flMinProgress: number;
  rtUnlocked: number;
  strDescription: string;
  strID: string;
  strImage: string;
  strName: string;
}

export interface RgDevelopers {
  strName: string;
  strURL: (null | string);
}

export interface RgCards {
  nOwned: number;
  strArtworkURL: string;
  strImgURL: string;
  strMarketHash: string;
  strName: string;
  strTitle: string;
}

export interface VecAchievedHidden {
  bAchieved: boolean;
  flAchieved: number;
  rtUnlocked: number;
  strDescription: string;
  strID: string;
  strImage: string;
  strName: string;
}

export interface DeckDerivedProperties {
  gamescope_frame_limiter_not_supported?: boolean;
  hdr_support: number;
  non_deck_display_glyphs: boolean;
  primary_player_is_controller_slot_0: boolean;
  requires_h264?: boolean;
  requires_internet_for_setup: boolean;
  requires_internet_for_singleplayer: boolean;
  requires_manual_keyboard_invoke: boolean;
  requires_non_controller_launcher_nav: boolean;
  small_text: boolean;
  supported_input: number;
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

export interface VecDeckCompatTestResults {
  test_loc_token: string;
  test_result: number;
}

export interface VecDLC {
  bAvailableOnStore: boolean;
  bEnabled: boolean;
  lDiskUsageBytes: number;
  rtPurchaseDate: number;
  rtStoreAssetModifyTime: number;
  strHeaderFilename: string;
  strName: string;
  strState: string;
  unAppID: number;
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

export interface VecBetas {
  strDescription: string;
  strName: string;
}

export interface VecMusicAlbums {
  rtPurchaseDate: number;
  rtStoreAssetModifyTime: number;
  strName: string;
  strState: string;
  unAppID: number;
}

export interface m_rgSessionEvents {
  m_recordingHighlights: m_recordingHighlights[];
}

export interface Jsondata {
  automatically_push_updated_source: boolean;
  bBroadcastEnabled: boolean;
  broadcast_whitelist: unknown[];
  broadcastChatSetting: string;
  bSaleEnabled: boolean;
  bScheduleEnabled: boolean;
  default_broadcast_title: string;
  localized_broadcast_left_image: null[];
  localized_broadcast_right_image: null[];
  localized_broadcast_title: null[];
  localized_capsule_image: (null | string)[];
  localized_sale_header: null[];
  localized_sale_logo: null[];
  localized_sale_overlay: null[];
  localized_sale_product_banner: null[];
  localized_sale_product_mobile_banner: null[];
  localized_subtitle: (null | string)[];
  localized_summary: (null | string)[];
  localized_title_image: null[];
  referenced_appids: unknown[];
  sale_background_color: string;
  sale_browsemore_bgcolor: string;
  sale_browsemore_color: string;
  sale_browsemore_text: string;
  sale_browsemore_url: string;
  sale_font: string;
  sale_header_offset: number;
  sale_sections: unknown[];
  sale_show_creator: boolean;
  scheduleEntries: unknown[];
}

export interface CommentThreads {
  commentThread?: CommentThread;
  eCommentThreadType: number;
  gidFeature: string;
  gidFeature2?: string;
}

export interface LogoPosition {
  nHeightPct: number;
  nWidthPct: number;
  pinnedPosition: string;
}

export interface m_recordingHighlights {
  duration_ms: string;
  entry_id: string;
  game_id: string;
  marker_icon: string;
  marker_title: string;
  possible_clip: number;
  rt_created: number;
  timeline_id: string;
  timeline_offset_ms: string;
  user_marker: boolean;
}

export interface CommentThread {
  BLocalUserOwnsThread(): boolean;
  DeleteComment(e: unknown): Promise<void>;
  FetchPastComments(e: unknown): Promise<void>;
  FetchRecentComments(): Promise<void>;
  GetSecondsSinceLoaded(): number;
  GetUpVoters(): unknown[];
  PostCommentToThread(e: unknown): Promise<void>;
  RateCommentOrThread(): unknown /* native code */;
  RefreshIfNeeded(): void;

  id: string;
  m_bUpdating: boolean;
  m_eThreadType: number;
  m_gidfeature: string;
  m_gidfeature2?: string;
  m_msLastUpdated: number;
  m_rgComments: never;
  m_steamIDActor: m_steamid;
  m_threadInfo: m_threadInfo;
}

export interface m_threadInfo {
  answer_actor: number;
  answer_actor_rank: number;
  answer_commentid: string;
  can_post: boolean;
  comment_thread_type: number;
  comments: unknown[];
  commentthreadid: string;
  count: number;
  deleted_comments: unknown[];
  gidfeature: string;
  gidfeature2: string;
  start: number;
  steamid: string;
  total_count: number;
  upvoters: unknown[];
  upvotes: number;
  user_subscribed: boolean;
  user_upvoted: boolean;
}
