import { ObservableMap } from 'mobx';
import { Apps } from '../SteamClient';
import { EControllerRumbleSetting, EThirdPartyControllerConfiguration } from '../SteamClient/Input';
import { Unregisterable } from '../SteamClient/shared';
import { ConnectionManager } from './ConnectionManager';

export interface AppDetailsStore {
  /**
   * Is registered to {@link Apps.RegisterForAppDetails}
   */
  AppDetailsChanged(...args: Parameters<Parameters<Apps['RegisterForAppDetails']>[1]>): void;

  BAchievementIsHiddenAndAchieved(e: unknown, t: unknown): boolean;

  BHasMarketPresence(e: unknown): unknown;

  BHasRecentlyLaunched(e: unknown): unknown;

  BIsWorkshopVisible(e: unknown): unknown;

  ClearCustomLogoPosition(e: unknown): unknown;

  CMInterface(): ConnectionManager;

  GetAchievements(e: unknown): unknown;

  /**
   * @native
   */
  GetAjaxLibraryAppDetails(): unknown;

  GetAppData(appId: number): AppData;

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

  Init(cm: ConnectionManager): void;

  MarkAppAsRecentlyLaunched(e: unknown): void;

  RegisterForAppData(appId: number, callback: (appData: AppData) => void): Unregisterable;

  /**
   * @native
   */
  RequestAchievements(): unknown;

  RequestAppDetails(e: unknown): Promise<unknown>;

  RequestAppDetailsSpotlight(e: unknown): Promise<undefined>;

  /**
   * @native
   */
  RequestAssociationData(): unknown;

  RequestCustomImageInfo(e: unknown): Promise<void>;

  /**
   * @native
   */
  RequestDescriptionsData(): unknown;

  SaveCustomLogoPosition(e: unknown, t: unknown): Promise<unknown>;

  /**
   * @native
   */
  SetAjaxLibraryAppDetails(): unknown;

  UnregisterForAppData(appData: AppData, callback: (appData: AppData) => void): void;

  ValidateCustomImageInfo(e: unknown): boolean;

  m_CMInterface: ConnectionManager;

  m_mapAppData: ObservableMap<number, AppData>;

  // TODO: doesn't seem to get filled with any data
  m_mapRecentlyLaunchedApps: ObservableMap<unknown, unknown>;

  m_setDetailsInProgress: Set<unknown>;
}

export interface AppData {
  appDetailsSpotlight: null;

  associationData: null;

  bLoadingAchievments: boolean;

  cRegistered: number;

  customImageInfo?: null;

  customImageInfoRtime: number;

  descriptionsData: null;

  details: (AppDetails | null);

  hAppDetails: (Unregisterable | null);

  listeners: never;
}

export interface AppDetails {
  achievements: Achievements;

  /** Indicates whether the application is available on the store. */
  bAvailableContentOnStore: boolean;

  bCanMoveInstallFolder: boolean;

  bCloudAvailable: boolean;

  bCloudEnabledForAccount: boolean;

  bCloudEnabledForApp: boolean;

  bCloudSyncOnSuspendAvailable: boolean;

  bCloudSyncOnSuspendEnabled: boolean;

  /** Indicates whether the application has community market available. */
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

  deckDerivedProperties?: AppDeckDerivedProperties;

  /**
   * @see {@link EAppOwnershipFlags}
   */
  eAppOwnershipFlags: EAppOwnershipFlags;

  /**
   * @todo enum
   */
  eAppUpdateError: number;

  eAutoUpdateValue: EAppAutoUpdateBehavior;

  eBackgroundDownloads: EAppAllowDownloadsWhileRunningBehavior;

  eCloudStatus: EAppCloudStatus;

  /**
   * @todo enum
   */
  eCloudSync: number;

  eControllerRumblePreference: EControllerRumbleSetting;

  eDisplayStatus: EDisplayStatus;

  eEnableThirdPartyControllerConfiguration: EThirdPartyControllerConfiguration;

  /**
   * @see {@link ESteamInputController}
   */
  eSteamInputControllerMask: number;

  /**
   * Index of the install folder. -1 if not installed.
   */
  iInstallFolder: number;

  /** Application disk space usage, in bytes. */
  lDiskUsageBytes: number;

  /** DLC disk space usage, in bytes. */
  lDlcUsageBytes: number;

  libraryAssets: AppLibraryAssets;

  nBuildID: number;

  nCompatToolPriority: number;

  /** Total play time, in minutes. */
  nPlaytimeForever: number;

  /** Screenshot count. */
  nScreenshots: number;

  rtLastTimePlayed: number;

  rtLastUpdated: number;

  rtPurchased: number;

  selectedLanguage: AppLanguage;

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

  /** Steam64 ID. */
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

  vecBetas: AppBeta[];

  vecChildConfigApps: number[];

  vecDeckCompatTestResults: DeckCompatTestResult[];

  vecDLC: AppDLC[];

  vecLanguages: AppLanguage[];

  vecLegacyCDKeys: unknown[];

  vecMusicAlbums: AppSoundtrack[];

  /** windows | osx | linux */
  vecPlatforms: string[];

  vecScreenShots: Screenshot[];
}

export interface Achievements {
  nAchieved: number;

  nTotal: number;

  vecAchievedHidden: VecAchievedHidden[];

  vecHighlight: VecHighlight[];

  vecUnachieved: VecHighlight[];
}

export interface AppDeckDerivedProperties {
  gamescope_frame_limiter_not_supported?: boolean;

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

export interface AppLibraryAssets {
  logoPosition?: LogoPosition;

  strCapsuleImage: string;

  strHeaderImage: string;

  strHeroBlurImage: string;

  strHeroImage: string;

  strLogoImage: string;
}

export interface LogoPosition {
  nHeightPct: number;

  nWidthPct: number;

  pinnedPosition: LogoPinPositions;
}

export type LogoPinPositions = 'BottomLeft' | 'UpperLeft' | 'CenterCenter' | 'UpperCenter' | 'BottomCenter';

export interface AppLanguage {
  strDisplayName: string;

  /** A localization string for the language. */
  strShortName: string;
}

export interface DeckCompatTestResult {
  /** A localization string. */
  test_loc_token: string;

  test_result: ESteamDeckCompatibilityTestResult;
}

export interface AppDLC {
  /** Is the DLC available on the store? */
  bAvailableOnStore: boolean;

  bEnabled: boolean;

  /** Disk usage, in bytes. */
  lDiskUsageBytes: number;

  /** Purchase date. */
  rtPurchaseDate: number;

  rtStoreAssetModifyTime: number;

  /** Store header image filename. */
  strHeaderFilename: string;

  /** Display name. */
  strName: string;

  /** State (installed/notinstalled). */
  strState: string;

  /** App ID. */
  unAppID: number;
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

export interface VecHighlight {
  bAchieved: boolean;

  bHidden?: boolean;

  /** How many players have this achievement, in percentage. */
  flAchieved: number;

  flCurrentProgress: number;

  flMaxProgress: number;

  flMinProgress: number;

  /** When this achievement was unlocked. */
  rtUnlocked: number;

  /** Achievement description. */
  strDescription: string;

  /** Achievement ID. */
  strID: string;

  /** Current achievement icon based on unlocked state. */
  strImage: string;

  /** Achievement name. */
  strName: string;
}

export interface AppBeta {
  /** Beta description. */
  strDescription: string;

  /** Beta name. */
  strName: string;
}

export interface AppSoundtrack {
  /** Purchase date. */
  rtPurchaseDate: number;
  rtStoreAssetModifyType: number;
  /** Display name. */
  strName: string;
  /** State (installed/notinstalled). */
  strState: string;
  /** App ID. */
  unAppID: number;
}

export interface Screenshot {
  bSpoilers: boolean;

  bUploaded: boolean;

  ePrivacy: EUCMFilePrivacyState;

  hHandle: number;

  nAppID: number;

  /** Timestamp */
  nCreated: number;

  nHeight: number;

  nWidth: number;

  publishedFileID: string;

  strCaption: '';

  strGameID: string;

  strUrl: string;

  ugcHandle: string;
}

export enum EUCMFilePrivacyState {
  Invalid = -1,
  Private = 1 << 1,
  FriendsOnly = 1 << 2,
  Public = 1 << 3,
  Unlisted = 1 << 4,
}

export enum EAppOwnershipFlags {
  None,
  Subscribed = 1 << 0,
  Free = 1 << 1,
  RegionRestricted = 1 << 2,
  LowViolence = 1 << 3,
  InvalidPlatform = 1 << 4,
  Borrowed = 1 << 5,
  FreeWeekend = 1 << 6,
  Retail = 1 << 7,
  Locked = 1 << 8,
  Pending = 1 << 9,
  Expired = 1 << 10,
  Permanent = 1 << 11,
  Recurring = 1 << 12,
  Canceled = 1 << 13,
  AutoGrant = 1 << 14,
  PendingGift = 1 << 15,
  RentalNotActivated = 1 << 16,
  Rental = 1 << 17,
  SiteLicense = 1 << 18,
  LegacyFreeSub = 1 << 19,
  InvalidOSType = 1 << 20,
  TimedTrial = 1 << 21,
}

export enum EAppAutoUpdateBehavior {
  Always, // (Always keep this game updated)
  Launch, // (Only update this game when I launch it)
  HighPriority, // (High priority)
}

export enum EAppAllowDownloadsWhileRunningBehavior {
  UseGlobal,
  AlwaysAllow,
  NeverAllow,
}

export enum EAppCloudStatus {
  Invalid,
  Disabled,
  Unknown,
  Synchronized,
  Checking,
  OutOfSync,
  Uploading,
  Downloading,
  SyncFailed,
  Conflict,
  PendingElsewhere,
}

export enum EDisplayStatus {
  Invalid,
  Launching,
  Uninstalling,
  Installing,
  Running,
  Validating,
  Updating,
  Downloading,
  Synchronizing,
  ReadyToInstall,
  ReadyToPreload,
  ReadyToLaunch,
  RegionRestricted,
  PresaleOnly,
  InvalidPlatform,
  // ty valve
  PreloadComplete = 16,
  BorrowerLocked,
  UpdatePaused,
  UpdateQueued,
  UpdateRequired,
  UpdateDisabled,
  DownloadPaused,
  DownloadQueued,
  DownloadRequired,
  DownloadDisabled,
  LicensePending,
  LicenseExpired,
  AvailForFree,
  AvailToBorrow,
  AvailGuestPass,
  Purchase,
  Unavailable,
  NotLaunchable,
  CloudError,
  CloudOutOfDate,
  Terminating,
  OwnerLocked,
  DownloadFailed,
  UpdateFailed,
}

// TODO: not the actual name
export enum ESteamInputController {
  PlayStation = 1 << 0,
  Xbox = 1 << 1,
  Generic = 1 << 2,
  NintendoSwitch = 1 << 3,
}

export enum ESteamDeckCompatibilityTestResult {
  Invalid,
  NotApplicable,
  Pass,
  Fail,
  FailMinor,
}
