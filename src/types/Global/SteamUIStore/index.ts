/* eslint-disable customRules/min-enum-members */
import { ObservableValue } from '../../shared';
import { EDisplayStatus } from '../AppDetailsStore';
import { EUIMode } from '../PopupManager';
import { GamepadNavigationManager, NavigationSource } from './GamepadNavigationManager';
import { GamepadUIAudioStore } from './GamepadUIAudioStore';
import { TextFilterStore } from './TextFilterStore';
import { WindowInstance, WindowStore } from './WindowStore';

export interface SteamUIStore {
  BCanNavigateToRunningApp(): boolean;

  BControllerIndexValid(e: unknown): boolean;

  BHomeAndQuickAccessButtonsEnabled(): unknown;

  BIsAnyWindowFocused(): boolean;

  BIsOverlayPath(e: unknown): boolean;

  BIsShuttingDown(): boolean;

  BIsStreamingGame(e: unknown): boolean;

  BIsStreamingRemotePlayTogether(): unknown;

  BIsStreamingRemotePlayTogetherGame(e: unknown): unknown;

  BIsTransparentBackgroundPath(e: unknown): unknown;

  BIsVrOnlyGame(e: unknown): unknown;

  BIsVROverlayApp(e: unknown): unknown;

  BRemotePlaySessionLocalClient(e: unknown): boolean;

  BShowControllerConfigInOverlay(e: unknown): unknown;

  CancelRefreshLogin(): void;

  ClearSaleCache(): void;

  /**
   * @native
   */
  ClearShutdownFailure(): unknown;

  CloseSideMenus(): void;

  DisableHomeAndQuickAccessButtons(): void;

  EnableHomeAndQuickAccessButtons(): void;

  ExcludedTitlesForPlatform(): unknown;

  GetFocusedWindowInstance(): unknown;

  GetLastLibraryTab(): unknown;

  GetShowingLockScreen(): unknown;

  GetShutdownState(): unknown;

  GetWindowForRunningAppNavigation(): unknown;

  GetWindowInstanceForPID(e: unknown): unknown;

  InitWithoutUser(): Promise<void>;

  InitWithUser(): Promise<void>;

  IsAnyAppRunning(): boolean;

  IsConsoleEnabled(): unknown;

  IsDeckFactoryImage(): unknown;

  IsDesktopUIWindowActive(e: unknown): unknown;

  IsGamepadUIWindowActive(e: unknown): unknown;

  /**
   * @param t default: false
   * @param r default: false
   */
  Navigate(e: unknown, t?: boolean, r?: boolean): void;

  NavigateToLayoutPreview(e: unknown, t: unknown): void;

  /**
   * @param e default: false
   */
  NavigateToRunningApp(e?: boolean): void;

  OnDismissKeyboardMessage(e: unknown): void;

  OnErrorCondition(e: unknown, t: unknown): void;

  OnGameKeyboardMessage(e: unknown): void;

  OnGameRunStateChanged(): void;

  OnKioskModeReset(): void;

  OnMicroTxnAuth(e: unknown, t: unknown, r: unknown, n: unknown): void;

  OnModalCountChanged(e: unknown): void;

  OnModalKeyboardMessage(e: unknown): void;

  OnNavigationSourceChange(): unknown;

  OnOverlayActivated(e: unknown, t: unknown, r: unknown, n: unknown): void;

  OnPostLibraryMessage(e: unknown, t: unknown, r: unknown): void;

  OnPostSteamUIMessage(e: unknown, t: unknown, r: unknown): void;

  /**
   * @native
   */
  OnShutdownDone(): unknown;

  /**
   * @native
   */
  OnShutdownFailed(): unknown;

  /**
   * @native
   */
  OnShutdownStart(): unknown;

  /**
   * @native
   */
  OnShutdownState(): unknown;

  OnSideMenuChanged(): void;

  /**
   * @native
   */
  OnSteamConsoleSpew(): unknown;

  OnUIModeChanged(e: unknown): void;

  OnUnhandledButtonDownEvent(e: unknown): void;

  OpenPowerMenu(e: unknown, t: unknown): void;

  PreserveNavigation(): void;

  RegisterMainWindow(e: unknown): () => void;

  RemotePlaySessionStarted(e: unknown, t: unknown, r: unknown, n: unknown): void;

  RemotePlaySessionStopped(e: unknown, t: unknown, r: unknown): void;

  RemotePlayTogetherClientStarted(e: unknown): void;

  ReopenPreModalSideMenu(): void;

  ResetErrorCondition(): void;

  RestoreNavigation(): void;

  ScopeRunningApps(): void;

  SetConfiguratorWidth(e: unknown): void;

  SetConsoleEnabled(): void;

  SetLastLibraryTab(e: unknown, t: unknown): void;

  SetRefreshLogin(): void;

  SetRunningApp(e: unknown): void;

  SetShowingLockScreen(e: unknown): void;

  SetStandaloneConfiguratorURL(e: unknown): void;

  StreamingClientFinished(e: unknown, t: unknown): void;

  StreamingClientStarted(e: unknown): void;

  StreamingLaunchComplete(e: unknown, t: unknown): void;

  ActiveControllerIndex: number;

  ActiveNavigationInfo: ActiveNavigationInfo;

  ActiveNavigationMode: number;

  ActiveNavigationSourceType: number;

  ActiveWindowInstance: WindowInstance;

  BIsInOOBE: boolean;

  ConfiguratorWidth: number;

  ErrorCondition: number;

  ErrorConditionResult: number;

  ForceBetaSectionVisible: boolean;

  GamepadUIAudio: GamepadUIAudioStore;

  m_appDetailsDisplayMode: number;

  m_bConsoleEnabledByUser: boolean;

  m_bHomeAndQuickAccessButtonsEnabled: boolean;

  m_bIsDeckFactoryImage: boolean;

  m_bPreviouslyNavigatedToRunningApp: boolean;

  m_bShowingLockScreen: boolean;

  m_bStreamingRemotePlayTogether: boolean;

  m_ConfiguratorWidth: number;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_eErrorCondition: EErrorCondition;

  /**
   * This value is an enum
   * @currentValue 1
   */
  m_eErrorConditionResult: EErrorConditionResult;

  m_GamepadNavigationManager: GamepadNavigationManager;

  m_GamepadUIAudioStore: GamepadUIAudioStore;

  m_LastLibraryTab: LastLibraryTab;

  m_mainInstanceUIMode: EUIMode;

  m_MainWindowVisible: ObservableValue<boolean>;

  m_navigationSource: NavigationSource;

  m_nResumeStreamingInputTimeoutHandle: null;

  m_runningAppIDs: number[];

  m_setVisibleMainWindows: Set<Window>;

  m_shutdownState: ShutdownState;

  m_streamingAppID: number;

  m_strStandaloneConfiguratorURL: null;

  m_textFilterStore: TextFilterStore;

  m_WindowStore: WindowStore;

  MainInstanceUIMode: EUIMode;

  MainRunningApp?: SteamAppOverview;

  MainRunningAppID?: number;

  MainWindowVisible: ObservableValue<boolean>;

  MostRecentlyActiveController?: never;

  MostRecentlyActiveControllerIndex: number;

  NavigationManager: GamepadNavigationManager;

  RemainInBigPictureModeOnClose: boolean;

  RunningApps: SteamAppOverview[];

  ShouldZoomStandaloneConfigurator: boolean;

  StandaloneConfiguratorURL: null;

  TextFilterStore: TextFilterStore;

  WindowStore: WindowStore;
}

export interface ActiveNavigationInfo {
  /**
   * This value is an enum
   * @currentValue 1
   */
  eMode: EMode;

  /**
   * This value is an enum
   * @currentValue 3
   */
  eSourceType: ESourceType;

  nControllerIndex: number;
}

export interface LastLibraryTab {
  strActiveTab: string;
}

export interface ShutdownState {
  appid: number;

  bAllowForceQuit: boolean;

  bFailed: boolean;

  /**
   * This value is an enum
   * @currentValue 0
   */
  eShutdownState: EShutdownState;
}

export interface SteamAppOverview {
  BAreCategoriesEqual(e: unknown): unknown;

  BAreSetsEqual(e: unknown, t: unknown): unknown;

  BAreStoreTagsEqual(e: unknown): unknown;

  BHasCustomImages(): boolean;

  BHasNonObservableChange(e: unknown): boolean;

  BHasObservableChange(e: unknown): boolean;

  BHasObservables(): boolean;

  BHasStoreCategory(e: unknown): unknown;

  /** @native */
  BHasStoreTag(): unknown;

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

  BIsNonVRGame(): boolean;

  BIsOwned(): unknown;

  BIsOwnedByAnotherUser(): unknown;

  BIsPerClientDataEqual(e: unknown): boolean;

  BIsPerClientDataLocal(e: unknown): unknown;

  BIsSelectedClientLocal(): boolean;

  BIsShortcut(): boolean;

  BIsSortAsEqual(e: unknown): boolean;

  BIsSteamDeckVerified(): boolean;

  BIsSteamOSCompatible(): boolean;

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

  GetPreservedState(): { icon_data: unknown; icon_data_format: unknown; } | undefined;

  GetPrimaryAppID(): unknown;

  GetStoreTags(): unknown;

  InitFromProto(e: unknown): void;

  /** @native */
  LOG_CHANGE(): unknown;

  RestorePreservedState(e: unknown): void;

  SetGameID(e: unknown): void;

  SetLastTimePlayed(e: unknown): void;

  SetPerClientData(e: unknown): void;

  SetSortAs(e: unknown): void;

  SetStoreCategories(e: unknown): void;

  SetStoreTags(e: unknown): void;

  __cachedLastPlayedSection: undefined;

  __cachedLastPlayedTime: undefined;

  __cachedReleaseYearString: undefined;

  active_beta: undefined;

  album_cover_hash: undefined;

  app_type: EAppType;

  appid: number;

  canonicalAppType: number;

  custom_sort_as_display: undefined;

  display_name: string;

  display_name_elanguage: number;

  display_status: number;

  gameid: string;

  gamepad_preferred: boolean;

  has_custom_sort_as: undefined;

  header_filename: string | undefined;

  icon_data: undefined;

  icon_data_format: undefined;

  icon_hash: string;

  installed: boolean;

  is_available_on_current_platform: boolean;

  is_invalid_os_type: undefined;

  library_capsule_filename: string;

  library_id: string;

  local_cache_version: number;

  local_per_client_data: SteamAppOverviewClientData;

  m_gameid: undefined;

  m_setStoreCategories: Set<number>;

  m_setStoreTags: Set<number>;

  m_ulGameId: undefined;

  mastersub_appid: undefined;

  mastersub_includedwith_logo: undefined;

  metacritic_score: number | undefined;

  minutes_playtime_forever: number;

  minutes_playtime_last_two_weeks: number;

  most_available_clientid: string;

  most_available_per_client_data: SteamAppOverviewClientData;

  mru_index: number;

  number_of_copies: number;

  optional_parent_app_id: undefined;

  original_sort_as: undefined;

  owner_account_id: undefined;

  per_client_data: SteamAppOverviewClientData[];

  ps4_controller_support: EAppControllerSupportLevel;

  ps5_controller_support: EAppControllerSupportLevel;

  review_percentage: number;

  review_percentage_with_bombs: number;

  review_percentage_without_bombs: number;

  review_score: number;

  review_score_with_bombs: number;

  review_score_without_bombs: number;

  rt_custom_image_mtime: undefined;

  rt_last_time_locally_played: number;

  rt_last_time_played: number;

  rt_last_time_played_or_installed: number;

  rt_original_release_date: number;

  rt_purchased_time: number;

  rt_recent_activity_time: number;

  rt_steam_release_date: number;

  rt_store_asset_mtime: number;

  selected_clientid: string;

  selected_per_client_data: SteamAppOverviewClientData;

  shortcut_override_appid: undefined;

  site_license_site_name: undefined;

  size_on_disk: string;

  sort_as: string;

  status_percentage: number;

  steam_deck_compat_category: ESteamDeckCompatibilityCategory;

  steam_hw_compat_category_packed: number;

  steam_os_compat_category: ESteamDeckCompatibilityCategory;

  store_category: number[];

  store_tag: number[];

  subscribed_to: boolean;

  third_party_mod: undefined;

  visible_in_game_list: boolean;

  vr_only: undefined;

  vr_supported: boolean | undefined;

  xbox_controller_support: EAppControllerSupportLevel | undefined;
}

export interface SteamAppOverviewClientData {
  client_name: string;

  clientid: string;

  display_status: EDisplayStatus;

  installed: boolean;

  is_available_on_current_platform: boolean;

  status_percentage: number;
}

/** @generated */
export enum EErrorCondition {
  EErrorCondition0 = 0,
}

/** @generated */
export enum EErrorConditionResult {
  EErrorConditionResult1 = 1,
}

/** @generated */
export enum EMode {
  EMode1 = 1,
}

/** @generated */
export enum ESourceType {
  ESourceType3 = 3,
}

/** @generated */
export enum EShutdownState {
  EShutdownState0 = 0,
}

export enum EAppType {
  DepotOnly = -2147483648,
  Invalid = 0,
  Game = 1 << 0,
  Application = 1 << 1,
  Tool = 1 << 2,
  Demo = 1 << 3,
  Deprecated = 1 << 4,
  DLC = 1 << 5,
  Guide = 1 << 6,
  Driver = 1 << 7,
  Config = 1 << 8,
  Hardware = 1 << 9,
  Franchise = 1 << 10,
  Video = 1 << 11,
  Plugin = 1 << 12,
  MusicAlbum = 1 << 13,
  Series = 1 << 14,
  Comic = 1 << 15,
  Beta = 1 << 16,
  Shortcut = 1073741824,
}

export enum EAppControllerSupportLevel {
  None,
  Partial,
  Full,
}

export enum ESteamDeckCompatibilityCategory {
  Unknown,
  Unsupported,
  Playable,
  Verified,
}
