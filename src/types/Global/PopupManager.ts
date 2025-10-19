import { ObservableMap } from 'mobx';
import { Window as SteamWindow } from '../SteamClient/Window';
import { Callbacks, SteamId } from '../shared';

export interface PopupManager {
  /**
   * Adds a callback to be called when a popup is created.
   * @param callback The callback to add
   */
  AddPopupCreatedCallback(callback: PopupCallback_t): void;

  /**
   * Adds a callback to be called just before a popup is destroyed.
   * @param callback The callback to add
   */
  AddPopupDestroyedCallback(callback: PopupCallback_t): void;

  /**
   * Adds a callback to be called when Steam is shutting down.
   * @param callback The callback to add
   */
  AddShutdownCallback(callback: PopupCallback_t): void;

  /**
   * Adds a popup to be tracked.
   * @param popup The popup to add
   */
  AddTrackedPopup(popup: Popup): void;

  /**
   * @returns `true` if any of the context menus are focused
   */
  BAnyMenuHasFocus(): boolean;

  /**
   * @returns `true` if any of the popups are focused
   */
  BAnyPopupHasFocus(): boolean;

  /**
   * @returns `true` if the Steam is about to shut down
   */
  BShuttingDown(): PopupManager['m_bShuttingDown'];

  /**
   * Clears saved restore details from {@link m_mapRestoreDetails}
   */
  ClearSavedDimensionStore(): void;

  ClosePopupsOwnedByBrowser(browserInfo: BrowserInfo): void;

  /**
   * @native
   */
  DebouncedSaveSavedDimensionStore(): void;

  /**
   * @param name The name of the popup
   * @returns The popup with the given name
   */
  GetExistingPopup(name: string): BasicPopup | undefined;

  GetExistingPopup(name: typeof MAIN_WINDOW_NAME): MainWindowPopup | undefined;

  /**
   * @returns the key used for usage in localStorage. Saved on a per-account basis.
   */
  GetLocalStorageKey(): string;

  /**
   * @param window The window to get the popup for
   * @returns The popup for the given window
   */
  GetPopupForWindow(window: Window): unknown;

  /**
   * literally returns {@link m_mapPopups}.values()
   * @returns All tracked popups as a MapIterator
   */
  GetPopups(): MapIterator<Popup>;

  /**
   * @param windowName The name of the window to get the restore details for
   * @returns The restore details for the given window
   */
  GetRestoreDetails(windowName: string): RestoreDetail['strRestoreDetails'];

  /**
   * Loads saved restore details from localStorage.
   */
  LoadSavedDimensionStore(): void;

  /**
   * @param popup The popup to remove
   */
  RemoveTrackedPopup(popup: Popup): void;

  /**
   * Saves saved restore details to localStorage.
   */
  SaveSavedDimensionStore(): void;

  SetCurrentLoggedInAccountID(accountId: ReturnType<SteamId['GetAccountID']>): void;

  SetRestoreDetails(popupName: string, restoreDetails: RestoreDetail['strRestoreDetails'], expires: RestoreDetail['bExpires']): void;

  DebouncedSaveSavedDimensionStore_DebounceProperties: DebouncedSaveSavedDimensionStore_DebounceProperties;

  m_bSaveRequired: boolean;

  m_bShuttingDown: boolean;

  m_DynamicCSSObserver: MutationObserver;

  m_mapPopups: ObservableMap<typeof MAIN_WINDOW_NAME, MainWindowPopup> & ObservableMap<string, Popup>;

  m_mapRestoreDetails: Map<string, RestoreDetail>;

  m_rgPopupCreatedCallbacks: PopupCallbacks;

  m_rgPopupDestroyedCallbacks: PopupCallbacks;

  m_rgShutdownCallbacks: PopupCallback_t[];

  /**
   * The current logged in account ID same as {@link SteamId.GetAccountID}
   */
  m_unCurrentAccountID: number;
}

// eslint-disable-next-line no-useless-assignment
const MAIN_WINDOW_NAME = 'SP Desktop_uid0';

export interface DebouncedSaveSavedDimensionStore_DebounceProperties {
  hTimer: undefined;

  nPending: number;
}

export type MainWindowPopup = Popup<MainWindowPopupParameters, MainWindowPopupCallback>;
export type BasicPopup = Popup<PopupParameters, PopupCallback>;

export interface Popup<
  paramsType extends (MainWindowPopupParameters | PopupParameters) = (MainWindowPopupParameters | PopupParameters),
  callbacksType extends (MainWindowPopupCallback | PopupCallback) = (MainWindowPopupCallback | PopupCallback),
> {
  BIsClosed(): Popup['m_popup']['closed'];

  BIsFocused(): ReturnType<Popup['m_popup']['document']['hasFocus']>;

  BIsValid(): boolean;

  BIsVisible(): boolean;

  Close(): void;

  DoCallback(e: keyof callbacksType): void;

  /**
   * @param forceOs default: {@link EWindowBringToFront.AndForceOS}
   */
  Focus(forceOs?: EWindowBringToFront): void;

  GetName(): Popup['m_strName'];

  /**
   * Calls {@link SteamWindow.GetWindowRestoreDetails} on the popup's window if it is not closed else returns `""`.
   */
  GetWindowRestoreDetails(): ReturnType<SteamWindow['GetWindowRestoreDetails']>;

  /**
   * Calls {@link SteamWindow.IsWindowMaximized} on the popup's window if it is not closed else returns `false`.
   */
  IsMaximized(): ReturnType<SteamWindow['IsWindowMaximized']>;

  /**
   * Calls {@link SteamWindow.IsWindowMinimized} on the popup's window if it is not closed else returns `false`.
   */
  IsMinimized(): ReturnType<SteamWindow['IsWindowMinimized']>;

  m_fnReadyToRender(): unknown;

  OnBeforeUnload(): void;

  /**
   * Calls {@link Popup.OnBeforeUnload}.
   */
  OnBeforeUnloadEvent(): void;

  /**
   * Calls the `onBlur` callback.
   */
  OnBlur(): void;

  /**
   * Calls {@link Popup.OnBlur}.
   *
   * Registered to the `blur` event of the popup's window.
   */
  OnBlurInternal(): void;

  /**
   * Calls the `onClose` callback.
   */
  OnClose(): void;

  /**
   * Calls the `onCreate` callback.
   */
  OnCreate(): void;

  /**
   * Calls {@link Popup.OnCreate}.
   */
  OnCreateInternal(): void;

  /**
   * Registered to the `dragover` event of the popup's window.
   */
  OnDragOver(event: DragEvent): void;

  /**
   * Registered to the `drop` event of the popup's window.
   */
  OnDrop(event: DragEvent): void;

  /**
   * Calls the `onFocus` callback.
   */
  OnFocus(): void;

  /**
   * Calls {@link Popup.OnFocus}.
   *
   * Registered to the `focus` event of the popup's window.
   */
  OnFocusInternal(): unknown;

  /**
   * Calls the `onLoad` callback.
   */
  OnLoad(): void;

  /**
   * Registered to the `message` event of the popup's window.
   */
  OnMessage(): unknown;

  /**
   * Calls the `onResize` callback.
   */
  OnResize(): void;

  /**
   * Registered to the `resize` event of the popup's window.
   */
  OnResizeEvent(): unknown;

  /**
   * Registered to the `unload` event of the popup's window.
   */
  OnUnload(): unknown;

  /**
   * Releases the popup.
   */
  ReleasePopup(): void;

  /**
   * Removes all event listeners from the popup's window.
   */
  RemoveEventListeners(): void;

  /**
   * Calls {@link Popup.m_fnReadyToRender} with param1
   */
  Render(param0: unknown, param1: unknown): void;

  RenderInternal(...args: [...PopupCallbackParams, forceOs: EWindowBringToFront]): unknown;

  /**
   * @param forceOs default: {@link EWindowBringToFront.AndForceOS}
   */
  Show(forceOs?: EWindowBringToFront): void;

  /**
   * Calls {@link PopupCallback.updateParamsBeforeShow} if it exists
   */
  UpdateParamsBeforeShow(params: AllPopupParameters): AllPopupParameters;

  browser_info: Popup['m_rgParams']['target_browser'];

  focused: boolean;

  /**
   * `true` if the popup has been created
   */
  m_bCreated: boolean;

  /**
   * `true` if the popup will not be shown initially
   */
  m_bCreateHidden: boolean;

  /**
   * `true` if the popup has focus
   */
  m_bFocused: boolean;

  m_callbacks: callbacksType;

  /**
   * Value of `m_popup.document.body.firstElementChild`
   */
  m_element: HTMLDivElement;

  m_onCreateRender: null;

  m_popup: Window;

  m_renderWhenReady: RenderWhenReady;

  m_rgParams: paramsType;

  /**
   * The internal popup name
   */
  m_strName: string;

  /**
   * Document title
   */
  m_strTitle: string;

  params: Popup<paramsType, callbacksType>['m_rgParams'];

  /**
   * Value of `m_popup.document.body.firstElementChild`
   */
  root_element: Popup['m_element'];

  title: Popup['m_strTitle'];

  window: Popup['m_popup'];
}

export interface RestoreDetail {
  bExpires: boolean;

  last_used: number;

  strRestoreDetails: string;
}

export interface BrowserInfo {
  /**
   * The UI mode in use.
   */
  m_eUIMode: EUIMode;

  m_nBrowserID: number;

  /**
   * Game's app ID.
   */
  m_unAppID: number;

  /**
   * If overlay, game's PID.
   */
  m_unPID: number;
}

export type PopupCallbackParams = [popupWindow: Popup['m_popup'], bodyElement: Popup['m_element']];

export interface MainWindowPopupCallback extends PopupCallback {
  onLoad(...args: PopupCallbackParams): void;

  onResize(...args: PopupCallbackParams): void;
}

export interface PopupCallback {
  updateParamsBeforeShow(t: unknown): AllPopupParameters;
}

export interface RenderWhenReady {
  AddLink(e: unknown, t: unknown): void;

  /**
   * @native
   */
  OnLinkLoad(e: unknown): void;

  SetTarget(e: unknown): void;

  m_fnRender?: never;

  m_rgLoadingLinks: never;
}

export type AllPopupParameters = PopupParameters | MainWindowPopupParameters;

export interface MainWindowPopupParameters extends BasePopupParameters {
  bNoFocusOnShow: boolean;

  body_role: undefined;

  browserType: EBrowserType;

  minHeight: number;

  minWidth: number;

  popup_class: string;

  strRestoreDetails: string;

  strUserAgent: string;
}

export interface PopupParameters extends BasePopupParameters {
  availscreenheight?: number;

  availscreenwidth?: number;

  window_opener_id: number;
}

export interface BasePopupParameters {
  /**
   * Value of `SteamClient.Window.SetHideOnClose`
   */
  bHideOnClose: boolean;

  /**
   * Value of `m_popup.document.body.className`
   */
  body_class: string;

  dimensions: Dimensions;

  eCreationFlags: EPopupCreationFlags;

  /**
   * Value of `m_popup.document.documentElement.className`
   */
  html_class: string;

  /**
   * Value of `m_popup.document.body.firstElementChild.className`
   */
  popup_class?: string;

  replace_existing_popup: boolean;

  target_browser: BrowserInfo;
}

export interface Dimensions {
  height: number;

  left: number;

  top: number;

  width: number;
}

export type PopupCallbacks = Callbacks<PopupCallback_t>;

export type PopupCallback_t = (popup?: Popup) => void;

export enum EBrowserType {
  /**
   * No window is created (like SharedJSContext).
   */
  OffScreen,
  OpenVROverlay,
  OpenVROverlay_Dashboard,
  /**
   * A normal window.
   */
  DirectHWND,
  /**
   * A borderless window.
   */
  DirectHWND_Borderless,
  /**
   * An initially hidden window.
   * May be shown with {@link SteamClient.Window.ShowWindow}.
   */
  DirectHWND_Hidden,
  ChildHWNDNative,
  Offscreen_SteamUI = 12,
  OpenVROverlay_Subview,
}

export enum EPopupCreationFlags {
  None,
  Minimized = 1 << 0,
  Hidden = 1 << 1,
  TooltipHint = 1 << 2,
  NoTaskbarIcon = 1 << 3,
  Resizable = 1 << 4,
  ScalePosition = 1 << 5,
  ScaleSize = 1 << 6,
  Maximized = 1 << 7,
  Composited = 1 << 8,
  NotFocusable = 1 << 9,
  FullScreen = 1 << 10,
  Fullscreen_Exclusive = 1 << 11,
  ApplyBrowserScaleToDimensions = 1 << 12,
  AlwaysOnTop = 1 << 13,
  NoWindowShadow = 1 << 14,
  NoMinimize = 1 << 15,
  PopUpMenuHint = 1 << 16,
  IgnoreSavedSize = 1 << 17,
  NoRoundedCorners = 1 << 18,
  ForceRoundedCorners = 1 << 19,
  OverrideRedirect = 1 << 20,
  IgnoreSteamDisplayScale = 1 << 21,
  TransparentParentWindow = 1 << 22,
}

export enum EWindowBringToFront {
  Invalid,
  AndForceOS,
  WithoutForcingOS,
}

export enum EUIMode {
  Unknown = -1,
  GamePad = 4,
  Desktop = 7,
}
