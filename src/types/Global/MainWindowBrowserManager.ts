import { Callbacks } from './shared';

export interface MainWindowBrowserManager {
  /**
   * @native
   */
  ActivateTab(): unknown;

  BIsWaitingForHistoryCallback(): boolean;

  GetLastActiveTab(): unknown;

  GetTabForURL(e: unknown): 'store' | 'me' | 'community' | 'ignore' | 'maintain';

  LoadURL(e: unknown): void;

  /**
   * @native
   */
  OnFinishedRequest(): unknown;

  OnHistoryChanged(e: unknown): void;

  /**
   * @native
   */
  OnNewTab(): unknown;

  /**
   * @native
   */
  OnPageSecurity(): unknown;

  /**
   * @native
   */
  OnSetTitle(): unknown;

  /**
   * @native
   */
  OnStartLoad(): unknown;

  /**
   * @native
   */
  OnStartRequest(): unknown;

  /**
   * @native
   */
  Reload(): unknown;

  /**
   * @native
   */
  ShowURL(): unknown;

  StartWaitingForHistoryCallback(): void;

  SyncWithNewBrowserHistory(e: unknown): void;

  SyncWithNewRouterEvent(e: unknown, t: unknown): void;

  UpdateActiveTab(e: unknown): void;

  DisplayURL: string;

  LoadErrorCode: null;

  LoadErrorDescription: null;

  LoadErrorURL: null;

  Loading: boolean;

  m_bExpectImportantReplace: boolean;

  m_bLoading: boolean;

  m_bRouterChangeTriggeredBySync: boolean;

  m_browser: m_browser;

  m_browserHistory: m_browserHistory;

  m_history: m_history;

  m_lastActiveTab: string;

  m_lastActiveTabURLs: m_lastActiveTabURLs;

  m_lastLocation: m_lastLocation;

  m_loadErrorCode: null;

  m_loadErrorDesc: null;

  m_loadErrorURL: null;

  m_pageSecurity: m_pageSecurity;

  m_rootTabURLs: m_rootTabURLs;

  m_strTitle: string;

  m_tabbedBrowserStore: m_tabbedBrowserStore;

  m_tsWaitingForBrowserChange: undefined;

  m_URL: string;

  m_URLRequested: string;

  PageSecurity: m_pageSecurity;

  TabbedBrowserStore: m_tabbedBrowserStore;

  Title: string;
}

export interface m_browser {
  /**
   * @native
   */
  AddGlass(): unknown;

  /**
   * @native
   */
  CanGoBackward(): unknown;

  /**
   * @native
   */
  CanGoForward(): unknown;

  /**
   * @native
   */
  DialogResponse(): unknown;

  /**
   * @native
   */
  EnableSteamInput(): unknown;

  /**
   * @native
   */
  FindInPage(): unknown;

  /**
   * @native
   */
  GetBounds(): unknown;

  /**
   * @native
   */
  GoBack(): unknown;

  /**
   * @native
   */
  GoForward(): unknown;

  /**
   * @native
   */
  HandleContextMenuCommand(): unknown;

  /**
   * @native
   */
  LoadURL(): unknown;

  /**
   * @native
   */
  NotifyUserActivation(): unknown;

  /**
   * @native
   */
  off(): unknown;

  /**
   * @native
   */
  on(): unknown;

  /**
   * @native
   */
  Paste(): unknown;

  /**
   * @native
   */
  PostMessage(): unknown;

  /**
   * @native
   */
  Reload(): unknown;

  /**
   * @native
   */
  ReplaceURL(): unknown;

  /**
   * @native
   */
  SetBlockedProtocols(): unknown;

  /**
   * @native
   */
  SetBounds(): unknown;

  /**
   * @native
   */
  SetFocus(): unknown;

  /**
   * @native
   */
  SetName(): unknown;

  /**
   * @native
   */
  SetShowContextMenuCallback(): unknown;

  /**
   * @native
   */
  SetSteamURLCallback(): unknown;

  /**
   * @native
   */
  SetTouchGesturesToCancel(): unknown;

  /**
   * @native
   */
  SetVisible(): unknown;

  /**
   * @native
   */
  SetVRKeyboardVisibility(): unknown;

  /**
   * @native
   */
  SetWindowStackingOrder(): unknown;

  /**
   * @native
   */
  StopFindInPage(): unknown;
}

export interface m_browserHistory {
  entries: Entries[];

  index: number;
}

export interface m_history {
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

  entries: m_lastLocation[];

  index: number;

  length: number;

  location: m_lastLocation;
}

export interface m_lastActiveTabURLs {
  store: string;
}

export interface m_lastLocation {
  hash: string;

  key: string;

  pathname: string;

  search: string;

  state: (null | object | State | State2);
}

export interface m_pageSecurity {
  bHasCertError: boolean;

  bIsEVCert: boolean;

  bIsSecure: boolean;

  certExpiry: number;

  certName: string;

  issuerName: string;

  nCertBits: number;
}

export interface m_rootTabURLs {
  community: string;

  me: string;

  store: string;
}

export interface m_tabbedBrowserStore {
  AddWebPageRequest(e: unknown, t: unknown): void;

  GetWebPageRequestsChangedCallbackList(): unknown;

  RemoveAllRequests(): void;

  RemoveWebPageRequest(e: unknown): boolean;

  ReorderWebPageRequest(e: unknown, t: unknown): void;

  Set(e: unknown, t: unknown, r: unknown): void;

  UpdateWebPageRequest(e: unknown, t: unknown, r: unknown): boolean;

  active_web_requestid: number;

  m_cbWebPageRequestsChanged: Callbacks;

  m_nActiveWebpageRequestID: number;

  m_nWebPageRequestID: number;

  m_rgWebPageRequests: m_rgWebPageRequests[];

  web_requests: unknown/* circular reference to m_rgWebPageRequests */;
}

export interface Entries {
  url: string;
}

export interface State {
  bExternal: boolean;

  strURL: string;
}

export interface m_rgWebPageRequests {
  requestid: number;

  strLastURL: string;

  strTitle: string;

  strURL: string;
}

export interface State2 {
  AppDetailsActivitySectionDays_HistoryValue: number;

  strCollectionId: string;
}
