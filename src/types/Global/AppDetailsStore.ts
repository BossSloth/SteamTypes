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
  appDetailsSpotlight: (AppDetailsSpotlight | null);

  associationData: (AssociationData | null);

  bLoadingAchievments: boolean;

  cRegistered: number;

  customImageInfo?: (CustomImageInfo | null);

  customImageInfoRtime: number;

  descriptionsData: (DescriptionsData | null);

  details: AppDetails;

  hAppDetails: Unregisterable;

  listeners: never;
}

export interface AppDetailsSpotlight {
  data: SpotlightData;

  dtLoaded: Date;
}

export interface SpotlightData {
  events: SpotlightEvent[];
}

export interface SpotlightEvent {
  appid: number;

  clan_announcementid: string;

  clan_id: string;

  event_time: number;

  event_type: number;

  rtime32_last_modified: number;
}

export interface AssociationData {
  rgDevelopers: Association[];

  rgFranchises: Association[];

  rgPublishers: Association[];
}

export interface Association {
  strName: string;

  strURL: (null | string);
}

export interface CustomImageInfo {
  logoPosition: LogoPosition;

  nVersion: number;
}

export interface DescriptionsData {
  strFullDescription: string;

  strSnippet: string;
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

  bShortcutIsVR?: boolean;

  bShowCDKeyInMenus: boolean;

  bShowControllerConfig: boolean;

  bStorePagePublished: boolean;

  bSupportsCDKeyCopyToClipboard: boolean;

  bWorkshopVisible: boolean;

  deckDerivedProperties?: AppDeckDerivedProperties;

  /**
   * A bitmask of {@link EAppOwnershipFlags} that indicates the ownership flags for this app.
   */
  eAppOwnershipFlags: EAppOwnershipFlags;

  eAppUpdateError: EAppUpdateError;

  eAutoUpdateValue: EAppAutoUpdateBehavior;

  eBackgroundDownloads: EAppAllowDownloadsWhileRunningBehavior;

  eCloudStatus: EAppCloudStatus;

  eCloudSync: ECloudSync;

  eControllerRumblePreference: EControllerRumbleSetting;

  eDisplayStatus: EDisplayStatus;

  eEnableThirdPartyControllerConfiguration: EThirdPartyControllerConfiguration;

  /**
   * A bitmask of {@link ESteamInputControllerMask} that indicates which controllers are supported by this app.
   */
  eSteamInputControllerMask: ESteamInputControllerMask;

  /**
   * Index of the install folder. -1 if not installed.
   */
  iInstallFolder: number;

  lDiskSpaceRequiredBytes?: number;

  /** Application disk space usage, in bytes. */
  lDiskUsageBytes: number;

  /** DLC disk space usage, in bytes. */
  lDlcUsageBytes: number;

  libraryAssets?: (AppLibraryAssets | LegacyLibraryAssets | ToolLibraryAssets);

  nBuildID: number;

  nCompatToolPriority: number;

  /** Total play time, in minutes. */
  nPlaytimeForever: number;

  /** Screenshot count. */
  nScreenshots: number;

  rtLastTimePlayed: number;

  rtLastUpdated?: number;

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

  strShortcutExe?: string;

  strShortcutLaunchOptions?: string;

  strShortcutStartDir?: string;

  strSteamDeckBlogURL: string;

  strStoreHeaderImage?: string;

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

  vecLegacyCDKeys: (LegacyCDKey[] | NamelessLegacyCDKeys[]);

  vecMusicAlbums: AppSoundtrack[];

  /** windows | osx | linux */
  vecPlatforms: string[];

  vecScreenShots: Screenshot[];
}

export interface Achievements {
  nAchieved: number;

  nTotal: number;

  vecAchievedHidden: Achievement[];

  vecHighlight: Achievement[];

  vecUnachieved: Achievement[];
}

export interface AppDeckDerivedProperties {
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

export interface AppLibraryAssets {
  logoPosition?: LogoPosition;

  strCapsuleImage?: string;

  strHeaderImage?: string;

  strHeroBlurImage?: string;

  strHeroImage: string;

  strLogoImage?: string;

  strTimeLineMarker?: string;
}

export interface LogoPosition {
  nHeightPct: number;

  nWidthPct: number;

  pinnedPosition: LogoPinPositions;
}

export type LogoPinPositions = 'BottomLeft' | 'UpperLeft' | 'CenterCenter' | 'UpperCenter' | 'BottomCenter';

/**
 * This one is used on a lot of old games and are recognizable in the library by not having a custom logo
 */
export interface LegacyLibraryAssets {
  strCapsuleImage?: string;

  strHeaderImage: string;

  strHeroImage: string;
}

export interface ToolLibraryAssets {
  strHeaderImage: string;
}

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

  /** State (installed/not installed). */
  strState: string;

  /** App ID. */
  unAppID: number;
}

export interface Achievement {
  bAchieved: boolean;

  bHidden?: boolean;

  /** How many players have this achievement, in percentage. */
  flAchieved: number;

  flCurrentProgress?: number;

  flMaxProgress?: number;

  flMinProgress?: number;

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

  rtStoreAssetModifyTime: number;

  /** Display name. */
  strName: string;

  /** State (installed/not installed). */
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

export interface LegacyCDKey {
  eResult: ELegacyCDKeyResult;

  strKey: string;

  strName: string;
}

export interface NamelessLegacyCDKeys {
  eResult: ELegacyCDKeyResult;
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

/**
 * Is called Automatic Updates in Properties > Updates
 */
export enum EAppAutoUpdateBehavior {
  /** Uses the global steam setting in Settings > Downloads */
  UseGlobalSetting,
  /** Only update this game when I launch it - Wait until I launch the game */
  Launch,
  /** High priority - Immediately download updates */
  HighPriority,
  /**
   * Always update this game - Let Steam decide when to update
   * @note This also seems to be the value on uninstalled games
   */
  Always,
}

/**
 * Is called Background Downloads in Properties > Updates
 */
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
// TODO: values are almost definitely wrong, find out the correct values
export enum ESteamInputControllerMask {
  Unsupported = 0,
  PlayStation = 1 << 0,
  Xbox = 1 << 1,
  Generic = 1 << 2,
  NintendoSwitch = 1 << 3,
  Unknown1 = 65532,
  Unknown2 = 65533,
  Unknown3 = 65535,
}

export enum ESteamDeckCompatibilityTestResult {
  Invalid,
  NotApplicable,
  Pass,
  Fail,
  FailMinor,
}

// TODO: fill enum
export enum EAppUpdateError {
  Unknown,
  UnknownError,
}

// TODO: fill enum
/** Cloud sync status, seems similar to {@link EAppCloudStatus} but with some differences */
export enum ECloudSync {
  Unavailable = 0,
  Valid = 2,
  /** @note This doesn't mean this app has cloud sync enabled, just that it is revalidating */
  PendingRevalidation = 3,
  OutOfSync = 4,
  OutOfSync2 = 5,
  NotLocallyAvailable = 8,
}

export enum ELegacyCDKeyResult {
  Unknown,
  Success,
}
