/* eslint-disable customRules/min-enum-members */
import { EUIMode } from 'Global/managers/PopupManager';
import { ObservableValue } from 'shared';
import { SteamAppOverview } from '../AppStore';
import { GamepadNavigationManager, NavigationSource } from './GamepadNavigationManager';
import { GamepadUIAudioStore } from './GamepadUIAudioStore';
import { TextFilterStore } from './TextFilterStore';
import { WindowInstance, WindowStore } from './WindowStore/WindowStore';

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
