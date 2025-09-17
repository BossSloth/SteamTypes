/* eslint-disable customRules/min-enum-members */
import { ObservableMap } from 'mobx';
import { ObservableValue } from 'mobx/dist/internal';
import { SteamUIStore } from '.';
import { EUIMode } from '../PopupManager';
import { Callbacks, ReducedValue } from '../shared';
import { SteamWindowNavigator } from './SteamWindowNavigator';

export interface WindowStore {
  AddTestWindowsOverlayBrowser(e: unknown): void;

  BHasAppWindow(e: unknown): boolean;

  BHasGamepadUIMainWindow(): boolean;

  BHasOverlayWindowForApp(e: unknown): boolean;

  BHasStandaloneConfiguratorWindow(): boolean;

  BHasStandaloneKeyboard(): boolean;

  BHasVRWindow(): boolean;

  CreateDesktopLoginWindow(e: unknown): unknown;

  CreateMainDesktopWindow(e: unknown): unknown;

  CreateMainGamepadUIWindow(e: unknown): unknown;

  CreateSimulatedVRWindow(): unknown;

  CreateStandaloneControllerConfiguratorWindow(e: unknown, t: unknown, r: unknown): unknown;

  CreateStandaloneKeyboardWindow(e: unknown, t: unknown, r: unknown): unknown;

  CreateSteamChinaReviewLauncherWindow(e: unknown): unknown;

  CreateVRWindow(e: unknown, t: unknown): unknown;

  DEBUG_DumpDesiredSteamUIWindows(): Promise<unknown>;

  /**
   * @param e default: !0
   */
  EnsureMainWindowCreated(e?: boolean): void;

  GetAppFocusedWindowID(e: unknown): number;

  GetAppWindowIDs(e: unknown): unknown;

  GetControllerConfiguratorWindowFromAppID(e: unknown): unknown;

  GetInstanceForPID(e: unknown): unknown;

  GetOverlayInstance(e: unknown, t: unknown): unknown;

  GetOverlayInstances(e: unknown): unknown[];

  GetOverlayInstanceWithFallback(e: unknown, t: unknown): unknown;

  GetSimultedVRWindowInstance(): unknown;

  GetSteamUIWindowByType(e: unknown): unknown;

  GetVRWindowInstance(): unknown;

  GetWindowInstanceFromWindow(e: unknown): unknown;

  InitWithoutUser(): Promise<void>;

  OnAppNoLongerRunning(e: unknown): void;

  OnDesiredSteamUIWindowsChanged(): void;

  OnOverlayBrowserClosed(e: unknown): void;

  /**
   * @native
   */
  OnOverlayBrowserCreated(): unknown;

  /**
   * @native
   */
  OnOverlayBrowserUpdated(): unknown;

  /**
   * @native
   */
  OnOverlayNotificationPositionChanged(): unknown;

  RemoveRunningAppWindowIDs(e: unknown): void;

  SetFocusedAppWindowID(e: unknown, t: unknown): undefined;

  SetRunningAppWindowIDs(e: unknown, t: unknown): undefined;

  UpdateDesiredWindows(e: unknown): void;

  GamepadUIMainWindowInstance: undefined;

  GamepadUIVRWindowInstance: undefined;

  m_mapAppOverlayPosition: Map<unknown, unknown>;

  m_mapAppWindows: ObservableMap<unknown, unknown>;

  m_mapDesiredWindowInstances: ObservableMap<number, WindowInstance>;

  m_mapDesiredWindows: Map<number, DesiredSteamWindow>;

  m_mapOverlayPopupByPID: ObservableMap<unknown, unknown>;

  m_Parent: SteamUIStore;

  m_simulatedVRGamepadUIOnDesktopInstance: undefined;

  MainRunningAppWindowIDs: undefined;

  MainWindowInstance: WindowInstance;

  OverlayWindows: unknown[];

  SteamUIWindows: WindowInstance[];
}

export interface WindowInstance {
  BCanNavigate(): boolean;

  BCanPopVRDashboardForCurrentPath(): unknown;

  BHasMenus(): unknown;

  BIsGamepadApplicationUIInitialized(): unknown;

  BIsOverlayPath(): unknown;

  BRouteMatch(e: unknown): boolean;

  BUseSeparateOverlayWindows(): boolean;

  BUseVRKeyboard(): unknown;

  BViewingPreLoginRoute(): unknown;

  CreateBrowserView(e: unknown, t: unknown): unknown;

  Destroy(): void;

  FocusApplicationRoot(): void;

  GetMainVROverlayKey(): unknown;

  GetShowingGlobalModal(): unknown;

  GetStoreBrowser(): unknown;

  Init(): () => void;

  InitDesktopHistory(e: unknown): () => void;

  InitFocusNavContext(e: unknown): () => void;

  InitGamepadApplicationUI(e: unknown): () => void;

  InitializeDefaultActions(): void;

  InitNavigation(e: unknown, t: unknown): () => void;

  IsControllerConfiguratorWindow(): boolean;

  IsDesktopLoginWindow(): boolean;

  IsDesktopOverlayWindow(): boolean;

  IsDesktopUIWindow(): boolean;

  IsGamepadUIOverlayWindow(): boolean;

  IsGamepadUIWindow(): boolean;

  IsMainDesktopWindow(): boolean;

  IsMainGamepadUIWindow(): boolean;

  IsStandaloneKeyboardWindow(): boolean;

  IsSteamChinaReviewLauncher(): boolean;

  IsVRSimulatedOnDesktopWindow(): boolean;

  IsVRWindow(): boolean;

  IsVRWindowInGamescope(): boolean;

  m_fnFocusApplicationRoot(): void;

  /**
   * @param t default: !1
   * @param r default: !1
   * @param n default: void 0
   */
  Navigate(e: unknown, t?: boolean, r?: boolean, n?: undefined): void;

  NavigateBack(): void;

  NavigateBackToRoute(e: unknown): void;

  NavigateHistory(e: unknown): void;

  /**
   * @param e default: !1
   */
  NavigateToRunningApp(e?: boolean): void;

  /**
   * @param e default: !1
   */
  NavigateToStandaloneAppRunningControls(e?: boolean): void;

  /**
   * Open a URL in the Steam main window browser.
   *
   * @param url The URL to open.
   */
  NavigateToSteamWeb(...args: Parameters<SteamWindowNavigator['SteamWeb']>): void;

  /**
   * @param t default: !1
   * @param r default: !1
   * @param n default: void 0
   */
  NavigateWithoutChangingFocus(e: unknown, t?: boolean, r?: boolean, n?: undefined): void;

  OnApplicationUIInitComplete(): void;

  OnHomeButtonPressed(): undefined;

  OnQuickAccessButtonPressed(): void;

  OnVirtualKeyboardShown(e: unknown): void;

  SetBrowserWindow(e: unknown): void;

  SetNavigator(e: unknown): void;

  /**
   * @native
   */
  SetNotificationPosition(): unknown;

  SetShowingGlobalModal(e: unknown): void;

  SetStoreBrowserGlass(e: unknown): void;

  ActionDescriptionStore: ActionDescriptionStore;

  BrowserWindow: Window;

  CompositionStateStore: CompositionStateStore;

  DesktopOverlay: undefined;

  FocusNavActiveSubscribableValue: unknown;

  FooterStore: FooterStore;

  forcedAppID: undefined;

  HeaderStore: HeaderStore;

  LocationPathName: string;

  m_ActionDescriptionStore: ActionDescriptionStore;

  m_arrBackstack: unknown[];

  m_bIsGamepadApplicationUIInitialized: boolean;

  m_BrowserWindow: Window;

  m_bShowingGlobalModal: boolean;

  m_CompositionStateStore: CompositionStateStore;

  m_currentBackstackLevel: number;

  m_DesktopOverlay: undefined;

  m_flLastHomePressMS: number;

  m_flLastQuickAccessPressMS: number;

  m_FocusNavContext: undefined;

  m_FooterStore: FooterStore;

  m_HeaderStore: HeaderStore;

  m_history: History;

  m_lastControllerConfigURL: undefined;

  m_locationPathname: string;

  m_MenuStore: MenuStore;

  m_ModalManager: undefined;

  m_Navigator: SteamWindowNavigator;

  m_notificationPosition: NotificationPosition;

  m_params: Params;

  m_StoreBrowser: undefined;

  m_VirtualKeyboardManager: VirtualKeyboardManager;

  m_VRPooledPopupStore: undefined;

  MainRunningApp: undefined;

  MainRunningAppID: undefined;

  MenuStore: MenuStore;

  ModalManager: undefined;

  Navigator: SteamWindowNavigator;

  NotificationPosition: NotificationPosition;

  params: Params;

  RunningApps: unknown[];

  VirtualKeyboardManager: VirtualKeyboardManager;

  VRPooledPopupStore: undefined;

  WindowType: number;
}

/**
 * The following might have more correct information:
 * https://github.com/SteamDatabase/SteamTracking/blob/master/Protobufs/webuimessages_sharedjscontext.proto
 */
export interface DesiredSteamWindow {
  appid: number;

  bVRGamepadUIViaGamescope: boolean;

  hwndParent: number;

  nBrowserID: number;

  strAppName: string;

  unID: number;

  unPID: number;

  windowType: EWindowType;

  x: number;

  y: number;
}

export interface ActionDescriptionStore {
  BFromActiveNavTree(e: unknown, t: unknown): unknown;

  ClearActions(): void;

  GetActionDescription(e: unknown): unknown;

  InitContext(e: unknown): unknown;

  IsDefaultAction(e: unknown): boolean;

  NotifyAll(): void;

  NotifyUpdate(e: unknown): void;

  OnFocusNavigationChanged(e: unknown, t: unknown, r: unknown): void;

  SetAction(e: unknown, t: unknown): void;

  SetActionDescriptionsFromMap(e: unknown): void;

  SetActionsFromMap(e: unknown): void;

  SetDefaultAction(e: unknown, t: unknown): void;

  SubscribeToActionFunction(e: unknown, t: unknown): () => void;

  m_actionDescriptionChangedCallbackRegistrations: unknown[];

  m_actionSubscriptions: Map<unknown, unknown>;

  m_boundActions: Map<unknown, unknown>;

  m_defaultActions: Map<unknown, unknown>;
}

export interface CompositionStateStore {
  AddMinimumCompositionStateRequest(e: unknown, t: unknown): void;

  BHasAnyFocusableNonSteamWindows(): boolean;

  BHasAnyFocusableWindowsForAppID(e: unknown): boolean;

  BNumberArraysEqual(e: unknown, t: unknown): boolean;

  ChangeMinimumCompositionStateRequest(e: unknown, t: unknown, r: unknown): void;

  ComputeOverallMinimumRequestedComposition(): null;

  EnsureCorrectComposition(): void;

  EnsureCorrectGameOverlayState(): void;

  GetCompositionState(): unknown;

  GetCurrentlyFocusedAppidSubscribableValue(): unknown;

  GetCurrentlyFocusedWindowIDSubscribableValue(): unknown;

  GetName(): unknown;

  GetOverridingComposition(): unknown;

  Init(): never[];

  IsBehindSystemUI(): boolean;

  /**
   * @native
   */
  OnFocusChangeEvent(): unknown;

  RemoveMinimumCompositionStateRequest(e: unknown, t: unknown): void;

  m_bLatestAppOverlayStateActive: boolean;

  m_currentlyFocusedAppid: ObservableValue<number>;

  m_currentlyFocusedWindowID: ObservableValue<number | undefined>;

  m_eLastPushedToWebHelperCompositionState: ELastPushedToWebHelperCompositionState;

  /**
   * This value is an enum
   * @currentValue 3
   */
  m_eLatestCompositionState: ELatestCompositionState;

  m_Instance: WindowInstance;

  m_mapCompositionStateRequests: Map<number, number>;

  m_mapCompostionRequestsDebugInfo: Map<unknown, unknown>;

  m_mapFocusableApps: ObservableMap<unknown, unknown>;

  m_nLatestAppID: null;
}

export interface FooterStore {
  BShowFooter(): boolean;

  HideFooter(): { unhide: () => void; };

  Init(): never[];

  m_bKeyboardVisible: boolean;

  m_flCurrentFooterHeight: number;

  m_iHideFooterCount: number;

  m_Instance: WindowInstance;
}

export interface HeaderStore {
  ActivateSearchBox(): void;

  BShowHeader(): boolean;

  ClearHeaderAfterResume(): void;

  DecrementHideHeader(): void;

  Destroy(): void;

  GetCurrentBrowserAndBackstack(): { browser: unknown; bExternal: unknown; bCanEditURL: unknown; };

  GetCurrentBrowserAndBackstackI(): unknown;

  GetFlexGrowPriority(): 'FlexGrowUniversalSearch' | 'FlexGrowWebBrowserURLBar';

  GetForceHeaderAfterResume(): unknown;

  IncrementHideHeader(): void;

  Init(): unknown[];

  OnAcceptSearchText(): void;

  OnSideMenuOpen(): void;

  OnSystemResumeFromSuspend(): void;

  SetCurrentBrowserAndBackstack(e: unknown, t: unknown, r: unknown): void;

  SetUniversalSearchFocused(e: unknown): void;

  UpdateHeaderOpacityForCurrentPagedSettings(): void;

  m_AcceptSearchTextCallbackList: Callbacks<() => void>;

  m_ActivateSearchBoxCallbackList: Callbacks<() => void>;

  m_BackgroundForPagedSettingsInput: undefined;

  m_BackgroundInput: undefined;

  m_BackgroundOpacity: ReducedValue<number, number>;

  m_bFocusSearch: boolean;

  m_bForceHeaderAfterResume: boolean;

  m_bSuppressInteraction: ReducedValue<unknown, boolean>;

  m_currentBrowserAndBackstack: null;

  m_currentBrowserCanEditURL: boolean;

  m_currentBrowserIsExternal: boolean;

  m_flCurrentHeaderHeight: number;

  m_hResumeHeaderTimer: undefined;

  m_iHideHeaderCount: number;

  m_Instance: WindowInstance;

  m_nNumTabbedPagesActingAsHeaderBackground: number;

  m_Opacity: ReducedValue<number, number>;

  m_OpacityInput: undefined;

  m_rgHandles: unknown[];

  m_ShowUniversalSearch: ReducedValue<string, string>;

  m_TitleText: ReducedValue<unknown, (null | string)>;
}

export interface History {
  block(e: unknown): unknown;

  canGo(e: unknown): boolean;

  createHref(e: unknown): unknown;

  go(e: unknown): void;

  goBack(): void;

  goForward(): void;

  listen(e: unknown): unknown;

  push(e: unknown, t: unknown): void;

  replace(e: unknown, t: unknown): void;

  action: string;

  entries: Entries[];

  index: number;

  length: number;

  location: Entries;
}

export interface MenuStore {
  ClearLastRequestedSideMenu(): void;

  CloseSideMenus(): void;

  GetLastRequestedSideMenu(): unknown;

  GetOpenSideMenu(): unknown;

  GetQuickAccessTab(): unknown;

  Init(): never[];

  IsSideMenuInteractable(): boolean;

  IsSideMenuVisible(): boolean;

  OnMenuDeactivated(e: unknown): void;

  OnSideMenusChanged(): void;

  OpenMainMenu(): unknown;

  /**
   * @native
   */
  OpenQuickAccessMenu(): unknown;

  OpenSideMenu(e: unknown): void;

  RequestExtendSideMenuVisibility(): () => number;

  SetSuppressMenus(): () => number;

  ToggleSideMenu(e: unknown, t: unknown): void;

  m_cSideMenuExtendedVisibilityRequests: number;

  m_cSuppressRequests: number;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_eLastRequestedSideMenu: ELastRequestedSideMenu;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_eOpenSideMenu: EOpenSideMenu;

  /**
   * This value is an enum
   * @currentValue 4
   */
  m_eQuickAccessTab: EQuickAccessTab;

  m_Instance: WindowInstance;

  m_MainMenuStore: MainMenuStore;

  MainMenuStore: MainMenuStore;
}

export interface NotificationPosition {
  horizontalInset: number;

  position: number;

  verticalInset: number;
}

export interface Params {
  browserInfo: BrowserInfo;

  eWindowType: EWindowType;

  strUserAgentIdentifier: string;
}

export interface VirtualKeyboardManager {
  AddVirtualKeyboardOwner(e: unknown): void;

  BIsVRKeyboard(): unknown;

  ClearCurrentVirtualKeyboardRef(): void;

  CreateVirtualKeyboardRef(e: unknown): object | unknown;

  DispatchKeypress(e: unknown): void;

  GetDeadKeyPending(): unknown;

  GetEnterKeyLabel(): unknown;

  HandleDeadKeyDown(e: unknown, t: unknown, r: unknown): undefined;

  HandleNavOut(e: unknown): boolean | undefined;

  HandleVirtualKeyDown(e: unknown, t: unknown): undefined;

  Init(e: unknown, t: unknown): void;

  InitKeyboardLocation(e: unknown, t: unknown, r: unknown): void;

  RemoveVirtualKeyboardOwner(e: unknown): void;

  ResetDeadKeyState(): void;

  RestoreVirtualKeyboardForLastActiveElement(): void;

  /**
   * @param r default: -1
   */
  RotateKeyboardLocation(e: unknown, t: unknown, r?: number): void;

  SelectBestModalPosition(e: unknown): undefined;

  SendClientPasteCommand(): void;

  SetActiveVirtualKeyboardTarget(e: unknown, t: unknown): void;

  SetDismissOnEnterKey(e: unknown): void;

  SetTextFieldLocation(e: unknown, t: unknown, r: unknown, n: unknown): void;

  SetVirtualKeyboardActiveRef(e: unknown): void;

  SetVirtualKeyboardDone(): void;

  SetVirtualKeyboardHidden(): void;

  SetVirtualKeyboardShownInternal(e: unknown): void;

  SetVirtualKeyboardVisible(): void;

  ShowVirtualKeyboard(e: unknown, t: unknown, r: unknown): void;

  IsShowingVirtualKeyboard: VirtualKeyboardManager['m_bIsInlineVirtualKeyboardOpen'];

  IsVirtualKeyboardModal: VirtualKeyboardManager['m_bIsVirtualKeyboardModal'];

  k_nKeyboardWindowOffset: number;

  k_rgKeyboardLocations: string[];

  KeyboardLocation: string;

  m_ActiveElementProps: ActiveElementProps | undefined;

  m_bDismissOnEnter: boolean;

  m_bIsInlineVirtualKeyboardOpen: ObservableValue<boolean>;

  m_bIsVirtualKeyboardModal: ObservableValue<boolean>;

  m_bUseVRKeyboard: boolean;

  m_currentVirtualKeyboardRef: CurrentVirtualKeyboardRef | null;

  m_iKeyboardLocation: number;

  m_KeyboardOwners: Set<unknown>;

  m_lastActiveVirtualKeyboardRef: null;

  m_OnActiveElementChanged: Callbacks<(ref: unknown) => void>;

  m_OnActiveElementClicked: Callbacks<(ref: unknown) => void>;

  m_OnTextEntered: Callbacks<(event: unknown) => void>;

  m_ownerWindow: undefined;

  m_strDeadKeyCombined: null;

  m_strDeadKeyNext: null;

  m_strDeadKeyPending: null;

  m_textFieldLocation: null;

  OnActiveElementChanged: VirtualKeyboardManager['m_OnActiveElementChanged'];

  OnActiveElementClicked: VirtualKeyboardManager['m_OnActiveElementClicked'];

  OnTextEntered: VirtualKeyboardManager['m_OnTextEntered'];
}

export interface ELastPushedToWebHelperCompositionState {
  appidCompositionQueue: unknown[];

  eCompositionMode: null;

  windowID: number;
}

export interface Entries {
  hash: string;

  key: string;

  pathname: string;

  search: string;

  state?: (null | object | State | State2);
}

export interface MainMenuStore {
  GetFocusedApp(): unknown;

  GetFocusedColumn(): unknown;

  GetGamingDeviceType(): unknown;

  GetRunningApps(): unknown;

  GetSelectedGuide(e: unknown): unknown;

  GetSelectedNavEntry(): unknown;

  GetStoreURL(e: unknown): unknown;

  Init(): unknown;

  OnRunningAppsChanged(): void;

  SetFocusedApp(e: unknown): void;

  SetFocusedColumn(e: unknown): void;

  SetSelectedGuide(e: unknown, t: unknown): void;

  SetSelectedNavEntry(e: unknown): void;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_eFocusedColumn: EFocusedColumn;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_eGamingDeviceType: EGamingDeviceType;

  /**
   * This value is an enum
   * @currentValue 1
   */
  m_eSelectedNavEntry: ESelectedNavEntry;

  m_focusedApp: null;

  m_mapSelectedGuide: ObservableMap<unknown, unknown>;

  m_WindowInstance: WindowInstance;
}

export interface BrowserInfo {
  /**
   * This value is an enum
   * @currentValue 7
   */
  m_eUIMode: EUIMode;

  m_nBrowserID: number;

  m_unAppID: number;

  m_unPID: number;
}

export interface State {
  bExternal: boolean;

  strURL: string;
}

export interface State2 {
  AppDetailsActivitySectionDays_HistoryValue: number;

  strCollectionId: undefined;
}

export interface ActiveElementProps {
  BIsElementValidForInput(): unknown;

  onEnterKeyPress: undefined;

  onKeyboardFullyVisible: undefined;

  onKeyboardNavOut: undefined;

  onKeyboardShow: undefined;

  strEnterKeyLabel: undefined;
}

export interface CurrentVirtualKeyboardRef {
  BIsActive(): unknown;

  BIsElementValidForInput(): unknown;

  /** @param e default: 100 */
  DelayHideVirtualKeyboard(e?: number): void;

  HideVirtualKeyboard(): unknown;

  SetAsCurrentVirtualKeyboardTarget(): unknown;

  ShowModalKeyboard(): unknown;

  ShowVirtualKeyboard(): unknown;

  bInVR: boolean;
}

/** @generated */
export enum ELatestCompositionState {
  ELatestCompositionState3 = 3,
}

/** @generated */
export enum ELastRequestedSideMenu {
  ELastRequestedSideMenu0 = 0,
}

/** @generated */
export enum EOpenSideMenu {
  EOpenSideMenu0 = 0,
}

/** @generated */
export enum EQuickAccessTab {
  EQuickAccessTab4 = 4,
}

export enum EWindowType {
  MainGamepadUI,
  OverlayGamepadUI,
  Keyboard,
  ControllerConfigurator,
  VR,
  MainDesktopUI,
  DesktopLogin,
  OverlayDesktopUI,
  SteamChinaReviewLauncher,
}

/** @generated */
export enum EFocusedColumn {
  EFocusedColumn0 = 0,
}

/** @generated */
export enum EGamingDeviceType {
  EGamingDeviceType0 = 0,
}

/** @generated */
export enum ESelectedNavEntry {
  ESelectedNavEntry1 = 1,
}
