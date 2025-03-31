import { ObservableMap } from 'mobx';
import { Window as SteamWindow } from '../SteamClient/Window';

export interface PopupManager {
  AddPopupCreatedCallback(e: unknown): void;

  AddShutdownCallback(e: unknown): void;

  AddTrackedPopup(e: unknown): void;

  BAnyMenuHasFocus(): boolean;

  BAnyPopupHasFocus(): boolean;

  BShuttingDown(): unknown;

  ClearSavedDimensionStore(): void;

  ClosePopupsOwnedByBrowser(e: unknown): void;

  /**
   * @native
   */
  DebouncedSaveSavedDimensionStore(): unknown;

  GetExistingPopup(e: unknown): unknown;

  GetLocalStorageKey(): string;

  GetPopupForWindow(e: unknown): unknown;

  GetPopups(): unknown;

  GetRestoreDetails(e: unknown): unknown;

  LoadSavedDimensionStore(): void;

  RemoveTrackedPopup(e: unknown): void;

  SaveSavedDimensionStore(): void;

  SetCurrentLoggedInAccountID(e: unknown): void;

  SetRestoreDetails(e: unknown, t: unknown, n: unknown): void;

  DebouncedSaveSavedDimensionStore_DebounceProperties: DebouncedSaveSavedDimensionStore_DebounceProperties;

  m_bSaveRequired: boolean;

  m_bShuttingDown: boolean;

  m_DynamicCSSObserver: DynamicCSSObserver;

  m_mapPopups: ObservableMap<'SP Desktop_uid0', Popup<MainWindowPopupParameters, MainWindowPopupCallback>> & ObservableMap<string, Popup>;

  m_mapRestoreDetails: Map<string, RestoreDetail>;

  m_rgPopupCreatedCallbacks: unknown[];

  m_rgShutdownCallbacks: unknown[];

  m_unCurrentAccountID: number;
}

export interface DebouncedSaveSavedDimensionStore_DebounceProperties {
  hTimer: undefined;

  nPending: number;
}

export interface DynamicCSSObserver {
  /**
   * @native
   */
  disconnect(): unknown;

  /**
   * @native
   */
  observe(): unknown;

  /**
   * @native
   */
  takeRecords(): unknown;
}

export interface Popup<
  paramsType extends PopupParameters | MainWindowPopupParameters = PopupParameters,
  callbacksType extends PopupCallback | MainWindowPopupCallback = PopupCallback,
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

  params: Popup['m_rgParams'];

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
   * This value is an enum
   * @currentValue 7
   */
  m_eUIMode: number;

  m_nBrowserID: number;

  m_unAppID: number;

  m_unPID: number;
}

export type PopupCallbackParams = [popupWindow: Popup['m_popup'], bodyElement: Popup['m_element']];

export interface MainWindowPopupCallback extends PopupCallback {
  onLoad(...args: PopupCallbackParams): void;

  onResize(...args: PopupCallbackParams): void;
}

export interface PopupCallback {
  updateParamsBeforeShow?(params: AllPopupParameters): AllPopupParameters;
}

export interface RenderWhenReady {
  AddLink(e: unknown, t: unknown): void;

  /**
   * @native
   */
  OnLinkLoad(): unknown;

  SetTarget(e: unknown): void;

  m_fnRender?: never;

  m_rgLoadingLinks: never;
}

export type AllPopupParameters = PopupParameters | MainWindowPopupParameters;

export interface MainWindowPopupParameters extends Omit<PopupParameters, 'window_opener_id'> {
  bNoFocusOnShow: boolean;

  browserType: EBrowserType;

  minHeight: number;

  minWidth: number;

  /**
   * Value of `m_popup.document.body.firstElementChild.className`
   */
  popup_class: string;

  strRestoreDetails: string;

  strUserAgent: string;
}

export interface PopupParameters {
  availscreenheight?: number;

  availscreenwidth?: number;

  /**
   * Value of `SteamClient.Window.SetHideOnClose`
   */
  bHideOnClose: boolean;

  /**
   * Value of `m_popup.document.body.className`
   */
  body_class: Popup['m_popup']['document']['body']['className'];

  dimensions: Dimensions;

  eCreationFlags: EPopupCreationFlags;

  /**
   * Value of `m_popup.document.documentElement.className`
   */
  html_class: Popup['m_popup']['document']['documentElement']['className'];

  replace_existing_popup: boolean;

  target_browser: BrowserInfo;

  window_opener_id: number;
}

export interface Dimensions {
  height: number;

  left: number;

  top: number;

  width: number;
}

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
