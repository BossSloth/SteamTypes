import { TabbedBrowserStore } from 'Global/managers/MainWindowBrowserManager';
import { ObservableMap } from 'mobx';
import { WindowInstance } from './WindowStore';

export interface DesktopOverlay {
  AddBroadcastAvailableToWatchToast(): void;

  /**
   * @param t default: !0
   */
  AddWebPageRequest(e: unknown, t?: boolean): void;

  BringWindowToFront(e: unknown): void;

  BWindowFlipped(e: unknown): unknown;

  BWindowPinned(e: unknown): unknown;

  BWindowVisible(e: unknown): boolean;

  ChangeTimelineExpansion(e: unknown): void;

  ChangeTimelineExpansionState(e: unknown): void;

  /**
   * @native
   */
  CheckDurationControlInit(): unknown;

  ClearRefreshPlaytimeTimer(): void;

  CycleThroughWebPageRequests(): void;

  EnterMinimalMode(): void;

  ExitMinimalMode(): void;

  GetInitialMediaState(): unknown;

  GetPinnedWindowData(e: unknown): unknown;

  GetPinnedWindowOpacity(e: unknown): unknown;

  GetPopupForWindow(e: unknown): unknown;

  GetPopupWindows(): never[];

  GetWebPageRequestsChangedCallbackList(): unknown;

  /**
   * @native
   */
  HandleGamepadGuideButtonEvents(): unknown;

  Init(): void;

  IsInitialized(): boolean;

  Load(): Promise<void>;

  LoadClockSettings(): Promise<void>;

  LoadFlippedWindows(): Promise<void>;

  LoadPinnedWindows(): Promise<void>;

  LoadSortedGameOverviewSections(): Promise<void>;

  LoadVisibleWindows(): Promise<void>;

  /**
   * @param e default: !0
   */
  LoadWebRequestsIfNeeded(e?: boolean): void;

  m_fnChangeTimelineExpansion(e: unknown): unknown;

  MinimizeAllWindows(): void;

  PreloadSavedWebRequests(): Promise<void>;

  QueueStartupToasts(): void;

  RefreshPlaytime(): Promise<void>;

  RemoveAllWebPageRequests(): void;

  RemoveWebPageRequest(e: unknown): void;

  ReorderWebPageRequest(e: unknown, t: unknown): void;

  RestoreMinimizedWindows(): void;

  SaveFlippedWindows(): void;

  SavePinnedWindows(): void;

  SaveVisibleWindows(): void;

  SaveWebRequests(): void;

  SetClockSettings(e: unknown): void;

  SetFnChangeTimelineExpansion(e: unknown): void;

  SetIsOverlayActive(e: unknown): void;

  SetPinnedWindowData(e: unknown, t: unknown): void;

  SetPinnedWindowOpacity(e: unknown, t: unknown): void;

  SetPopupForWindow(e: unknown, t: unknown): void;

  SetPreviewPinnedMode(e: unknown): void;

  SetShowDurationControlInitDialog(e: unknown): void;

  SetSortedGameOverviewSections(e: unknown): void;

  SetWindowFlipped(e: unknown, t: unknown): void;

  SetWindowPinned(e: unknown, t: unknown): void;

  SetWindowVisibility(e: unknown, t: unknown): void;

  ShouldShowDurationControlInitDialog(): unknown;

  ShowMedia(e: unknown): void;

  ShowRemotePlayTogether(): void;

  ShowSettings(e: unknown): void;

  ShowTimedTrialNotificationIfNeeded(): void;

  Shutdown(): void;

  ToggleWindowVisibility(e: unknown): boolean;

  UpdateWebPageRequest(e: unknown, t: unknown, r: unknown): void;

  WatchPlaytime(): () => void;

  active_web_requestid: number;

  appid: number;

  clock_settings: undefined;

  game_overview_sections: string[];

  gameid: string;

  has_minimized_windows: boolean;

  instance: WindowInstance;

  m_bHasLoadedWebRequests: boolean;

  m_bIsOverlayActive: boolean;

  m_bPreviewPinnedMode: boolean;

  m_bShowClipSavedHint: boolean;

  m_bShowDurationControlInit: boolean;

  m_bShowedBroadcastAvailableToast: boolean;

  m_bTimelineExpanded: boolean;

  m_clockSettings: undefined;

  m_cWatchingPlaytime: number;

  m_eState: EState;

  m_hPlaytimeTimeout: number | undefined;

  m_initialMediaState: undefined;

  m_Instance: WindowInstance;

  m_lastTimedTrialToast: undefined;

  m_mapFlippedWindows: ObservableMap<unknown, unknown>;

  m_mapPinnedWindows: ObservableMap<string, MapPinnedWindows>;

  m_mapPopupForWindow: Map<string, (null | Window)>;

  m_mapWindowVisibilityState: ObservableMap<string, number>;

  m_nMinimalModeRequests: number;

  m_playtime: Playtime;

  m_rgAutorunDisposers: unknown[];

  m_rgGameOverViewSections: string[];

  m_savedWebRequests: undefined;

  m_serverBrowser: ServerBrowser;

  m_settingsPage: string;

  m_storage: Storage;

  m_systemKeyEventsCallbackHandle: SystemKeyEventsCallbackHandle;

  m_tabbedBrowserStore: TabbedBrowserStore;

  minimal_mode: boolean;

  overlay_active: boolean;

  playtime_forever: number;

  playtime_last_two_weeks: number;

  preview_pinned_mode: boolean;

  server_browser_state: ServerBrowser;

  settings_page: string;

  time_session_start: number;

  timed_trial_platime: undefined;

  timeline_expanded: boolean;

  web_requests: unknown[];
}

export interface MapPinnedWindows {
  bPinned: boolean;

  extraData: string;

  opacity: number;
}

export interface Playtime {
  nPlaytimeForever: number;

  nPlaytimeLastTwoWeeks: number;

  rtLastTimePlayed: number;
}

export interface ServerBrowser {
  BFixedAppID(): boolean;

  GetFixedAppID(): unknown;

  GetMultiplayerGames(): unknown;

  GetTabState(e: unknown): unknown;

  Modified(): void;

  SetActiveTab(e: unknown): void;

  SetAppIDFromURL(e: unknown): void;

  StopRequests(): void;

  useActiveTabWhenReady(): unknown;

  useMultiplayerGames(): unknown;

  m_activeTab: undefined;

  m_appidFromURL: number;

  m_fixedAppID: number;

  m_multiplayerGames: null;

  m_states: object;

  seq_num: number;
}

export interface Storage {
  GetSavedDataKey(e: unknown): string;

  Load(e: unknown, t: unknown): Promise<unknown>;

  Remove(e: unknown): void;

  Save(e: unknown, t: unknown): void;

  m_appid: number;

  m_storage: object;
}

export interface SystemKeyEventsCallbackHandle {
  /**
   * @native
   */
  unregister(): unknown;
}

/** @generated */
export enum EState {
  None,
  Initialized,
  ShuttingDown,
}
