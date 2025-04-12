import { ObservableMap } from 'mobx';
import { Apps } from '../SteamClient';
import { SteamAppOverview } from '../SteamClient/Apps';
import { EControllerRumbleSetting, EThirdPartyControllerConfiguration } from '../SteamClient/Input';
import { Unregisterable } from '../SteamClient/shared';
import { ConnectionManager } from './ConnectionManager';

export interface AppDetailsStore {
  /**
   * Is registered to {@link Apps.RegisterForAppDetails}
   */
  AppDetailsChanged(...args: Parameters<Parameters<Apps['RegisterForAppDetails']>[1]>): void;

  /**
   * Checks if the achievement is in the {@link Achievements.vecAchievedHidden} array
   * @param appId The ID of the application.
   * @param achievementName The name of the achievement. {@link Achievement.strName}
   */
  BAchievementIsHiddenAndAchieved(appId: number, achievementName: string): boolean;

  /**
   * Checks if the application has a market presence
   *
   * Which indicates whether the application has community market available.
   *
   * @param appDetails The application details.
   * @returns Boolean {@link AppDetails.bCommunityMarketPresence}
   */
  BHasMarketPresence(appDetails: AppDetails): boolean;

  /**
   * @returns true if the appId is in the {@link AppDetailsStore.m_mapRecentlyLaunchedApps} map
   */
  BHasRecentlyLaunched(appId: number): boolean;

  /**
   * Checks if the application has a workshop presence
   *
   * Which indicates whether the application has community workshop available.
   *
   * @param appDetails The application details.
   * @returns Boolean {@link AppDetails.bWorkshopVisible}
   */
  BIsWorkshopVisible(appDetails: AppDetails): boolean;

  /**
   * Clears the saved custom logo position
   *
   * This is the same as clicking Reset logo position in the library
   *
   * @param appOverview Seems to be a {@link SteamAppOverview} object but only the appid and rt_custom_image_mtime are used
   */
  ClearCustomLogoPosition(appOverview: {
    appid: number;

    rt_custom_image_mtime: number;
  }): Promise<void>;

  CMInterface(): ConnectionManager;

  /**
   * Gets the achievements for a specific appId.
   *
   * @param appId The ID of the application.
   */
  GetAchievements(appId: number): Achievements;

  GetAjaxLibraryAppDetails(appId: number): Promise<AjaxLibraryAppDetails>;

  GetAppData(appId: number): AppData;

  /**
   * Gets the details for a specific application.
   *
   * Similar to doing {@link GetAppData()}.details
   *
   * @param appId The ID of the application.
   * @returns The application details or null if not found or not loaded yet.
   */
  GetAppDetails(appId: number): AppDetails | null;

  /**
   * Gets the spotlight details for a specific application.
   *
   * Also calls {@link RequestAppDetailsSpotlight} to load the details if not already loaded but still returns null on first call.
   *
   * @param appId The ID of the application.
   * @returns The spotlight details or null if not found or not loaded yet.
   */
  GetAppDetailsSpotlight(appId: number): SpotlightData | null;

  /**
   * Gets the associations for a specific application.
   *
   * @param appId The ID of the application.
   * @returns The associations or null if not found or not loaded yet.
   */
  GetAssociations(appId: number): AssociationData | null;

  /**
   * Gets the custom logo position for a specific application.
   *
   * @param appId The ID of the application.
   * @returns The custom logo position or null if not loaded yet or undefined if this app has no custom logo.
   */
  GetCustomLogoPosition(appId: number): LogoPosition | null | undefined;

  /**
   * Gets the descriptions for a specific application.
   *
   * @param appId The ID of the application.
   * @returns The descriptions or null if not found or not loaded yet.
   */
  GetDescriptions(appId: number): DescriptionsData | null;

  /**
   * Gets the header images for a specific application.
   *
   * @param appOverview The application overview.
   * @returns An array of paths to header images or an empty array if not found or not loaded yet.
   *
   * The first two are relative paths that can be appended to https://steamloopback.host
   * The last one is an absolute URL to shared.steamstatic.com
   */
  GetHeaderImages(appOverview: SteamAppOverview): ReturnType<AppDetailsStore['GetHeaderImagesForAppId']>;

  /**
   * Gets the header images for a specific application.
   *
   * @param appId The ID of the application.
   * @param localCacheVersion The version of the local cache gotten from {@link SteamAppOverview.local_cache_version}. This will be used in the first two relative paths.
   * @param storeAssetTime The time of the store asset gotten from {@link SteamAppOverview.rt_store_asset_mtime}. This will be used in the last absolute URL.
   * @returns An array of paths to header images or an empty array if not found or not loaded yet.
   *
   * The first two are relative paths that can be appended to https://steamloopback.host
   * The last one is an absolute URL to shared.steamstatic.com
   */
  GetHeaderImagesForAppId(appId: number, localCacheVersion?: number, storeAssetTime?: number): [
    /** This is a relative path that can be appended to https://steamloopback.host */
    relativeLibraryHeader: string,
    /** This is a relative path that can be appended to https://steamloopback.host */
    legacyHeader: string,
    /** This is an absolute URL to shared.steamstatic.com */
    libraryHeader: string,
  ];

  GetHeroBlurImages(appOverview: SteamAppOverview): ReturnType<AppDetailsStore['GetHeroBlurImagesForAppId']>;

  /**
   * Gets the hero blur images for a specific application.
   *
   * @param appId The ID of the application.
   * @param localCacheVersion The version of the local cache gotten from {@link SteamAppOverview.local_cache_version}. This will be used in the first two relative paths.
   * @param storeAssetTime The time of the store asset gotten from {@link SteamAppOverview.rt_store_asset_mtime}. This will be used in the last absolute URL.
   * @returns An array of paths to hero blur images or an empty array if not found or not loaded yet.
   *
   * The first two are relative paths that can be appended to https://steamloopback.host
   * The last one is an absolute URL to shared.steamstatic.com
   */
  GetHeroBlurImagesForAppId(appId: number, localCacheVersion?: number, storeAssetTime?: number): [
    /** This is a relative path that can be appended to https://steamloopback.host */
    relativeLibraryHeroBlur: string,
    /** This is a relative path that can be appended to https://steamloopback.host */
    legacyHeroBlur: string,
    /** This is an absolute URL to shared.steamstatic.com */
    libraryHeroBlur: string,
  ];

  /**
   * Gets the hero images for a specific application.
   *
   * @param appOverview The application overview.
   * @returns An object containing the hero images or an empty object if not found or not loaded yet.
   *
   * The first two are relative paths that can be appended to https://steamloopback.host
   * The last one is an absolute URL to shared.steamstatic.com
   */
  GetHeroImages(appOverview: SteamAppOverview): {
    rgHeroImages: [
      /** This is a relative path that can be appended to https://steamloopback.host */
      relativeLibraryHero: string,
      /** This is a relative path that can be appended to https://steamloopback.host */
      legacyHero: string,
      /** This is an absolute URL to shared.steamstatic.com */
      libraryHero: string,
    ];

    bHasHeroImage: boolean;

    appid: number;
  };

  /**
   * Gets the hero images for a specific application.
   *
   * @param appId The ID of the application.
   * @param localCacheVersion The version of the local cache gotten from {@link SteamAppOverview.local_cache_version}. This will be used in the first two relative paths.
   * @param storeAssetTime The time of the store asset gotten from {@link SteamAppOverview.rt_store_asset_mtime}. This will be used in the last absolute URL.
   * @returns An object containing the hero images or an empty object if not found or not loaded yet.
   *
   * The first two are relative paths that can be appended to https://steamloopback.host
   * The last one is an absolute URL to shared.steamstatic.com
   */
  GetHeroImagesForAppId(appId: number, localCacheVersion?: number, storeAssetTime?: number): {
    rgHeroImages: [
      /** This is a relative path that can be appended to https://steamloopback.host */
      relativeLibraryHero: string,
      /** This is a relative path that can be appended to https://steamloopback.host */
      legacyHero: string,
      /** This is an absolute URL to shared.steamstatic.com */
      libraryHero: string,
    ];
    bHasHeroImage: boolean;
  };

  /**
   * Gets the logo images for a specific application.
   *
   * @param appOverview The application overview.
   * @returns An object containing the logo images or an empty object if not found or not loaded yet.
   *
   * The first two are relative paths that can be appended to https://steamloopback.host
   * The last one is an absolute URL to shared.steamstatic.com
   */
  GetLogoImages(appOverview: SteamAppOverview): {
    rgLogoImages: [
      /** This is a relative path that can be appended to https://steamloopback.host */
      relativeLibraryLogo: string,
      /** This is a relative path that can be appended to https://steamloopback.host */
      legacyLogo: string,
      /** This is an absolute URL to shared.steamstatic.com */
      libraryLogo: string,
    ];
    logoPosition: LogoPosition;
  };

  /**
   * Gets the logo images for a specific application.
   *
   * @param appId The ID of the application.
   * @param localCacheVersion The version of the local cache gotten from {@link SteamAppOverview.local_cache_version}. This will be used in the first two relative paths.
   * @param storeAssetTime The time of the store asset gotten from {@link SteamAppOverview.rt_store_asset_mtime}. This will be used in the last absolute URL.
   * @returns An object containing the logo images or an empty object if not found or not loaded yet.
   *
   * The first two are relative paths that can be appended to https://steamloopback.host
   * The last one is an absolute URL to shared.steamstatic.com
   */
  GetLogoImagesForAppId(appId: number, localCacheVersion?: number, storeAssetTime?: number): {
    rgLogoImages: [
      /** This is a relative path that can be appended to https://steamloopback.host */
      relativeLibraryLogo: string,
      /** This is a relative path that can be appended to https://steamloopback.host */
      legacyLogo: string,
      /** This is an absolute URL to shared.steamstatic.com */
      libraryLogo: string,
    ];
    logoPosition: LogoPosition;
  };

  Init(cm: ConnectionManager): void;

  /**
   * Marks an application as recently launched and adds it to the recently launched apps set.
   *
   * @param appId The ID of the application to mark as recently launched.
   */
  MarkAppAsRecentlyLaunched(appId: number): void;

  /**
   * Registers a callback function to be called when application data changes.
   * @param appId The ID of the application to register the callback for.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForAppData(appId: number, callback: (appData: AppData) => void): Unregisterable;

  RequestAchievements(appId: number): Promise<void>;

  RequestAppDetails(appId: number): Promise<AppDetails>;

  RequestAppDetailsSpotlight(appId: number): Promise<undefined>;

  RequestAssociationData(appId: number): Promise<void>;

  RequestCustomImageInfo(appId: number): Promise<void>;

  RequestDescriptionsData(appId: number): Promise<void>;

  /**
   * Calls SteamClient.{@link Apps.SetCustomLogoPositionForApp}
   * @param appOverview
   * @param logoPosition
   */
  SaveCustomLogoPosition(appOverview: { appid: number; rt_custom_image_mtime?: number; }, logoPosition: LogoPosition): Promise<void>;

  SetAjaxLibraryAppDetails(appId: number, appData: AppData, ajaxLibraryAppDetails: AjaxLibraryAppDetails): void;

  UnregisterForAppData(appData: AppData, callback: (appData: AppData) => void): void;

  /**
   * Validates a custom image info object.
   * @param customImageInfo The custom image info object to validate.
   * @returns True if the custom image info is valid, false otherwise.
   */
  ValidateCustomImageInfo(customImageInfo: CustomImageInfo): boolean;

  m_CMInterface: ConnectionManager;

  m_mapAppData: ObservableMap<number, AppData>;

  m_mapRecentlyLaunchedApps: ObservableMap<number, boolean>;

  m_setDetailsInProgress: Set<number>;
}

export interface AppData {
  appDetailsSpotlight: (AppDetailsSpotlight | null);

  associationData: (AssociationData | null);

  bLoadingAchievments: boolean;

  cRegistered: number;

  customImageInfo?: (CustomImageInfo | null);

  customImageInfoRtime?: number;

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

  /**
   * Indicates whether the application has the community workshop available.
   */
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

export interface AjaxLibraryAppDetails extends Omit<AssociationData, 'rgFranchises'>, DescriptionsData {
  appid: string;

  name: string;

  status: number;
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
