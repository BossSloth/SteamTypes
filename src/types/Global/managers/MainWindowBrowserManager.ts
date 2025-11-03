import { Action, History, Location } from 'history';
import { Callbacks } from 'shared/interfaces';
import { BrowserViewEventMap, BrowserViewPopup } from 'SteamClient/BrowserView/BrowserViewPopup';

export interface MainWindowBrowserManager {
  /**
   * Activates a specific tab in the main window browser
   * @param tabName - The tab name to activate
   */
  ActivateTab(tabName: SteamBrowserTabType): void;

  /**
   * Checks if the manager is currently waiting for a history callback
   * @returns True if waiting for a history change within the timeout window
   */
  BIsWaitingForHistoryCallback(): boolean;

  /**
   * Gets the last active tab name
   * @returns The name of the last active tab
   */
  GetLastActiveTab(): string;

  /**
   * Determines which tab a URL belongs to
   * @param url A Steam store/community URL
   * @returns a browser tab responsible for provided URL or `ignore` or `maintain`.
   */
  GetTabForURL(url: string): SteamBrowserTabType | 'ignore' | 'maintain';

  /**
   * Loads a URL in the browser
   * @param url - The URL to load
   */
  LoadURL(url: string): void;

  /**
   * Called when a request finishes loading
   * Is registered to {@link BrowserViewPopup.on}('finished-request')
   */
  OnFinishedRequest(...args: Parameters<BrowserViewEventMap['finished-request']>): void;

  /**
   * Called when browser history changes
   * Is registered to {@link BrowserViewPopup.on}('history-changed')
   */
  OnHistoryChanged(...args: Parameters<BrowserViewEventMap['history-changed']>): void;

  /**
   * Called when a new tab is requested
   * Is registered to {@link BrowserViewPopup.on}('new-tab')
   */
  OnNewTab(...args: Parameters<BrowserViewEventMap['new-tab']>): void;

  /**
   * Called when page security information is updated
   * Is registered to {@link BrowserViewPopup.on}('page-security')
   */
  OnPageSecurity(...args: Parameters<BrowserViewEventMap['page-security']>): void;

  /**
   * Called when the page title is set
   * Is registered to {@link BrowserViewPopup.on}('set-title')
   */
  OnSetTitle(...args: Parameters<BrowserViewEventMap['set-title']>): void;

  /**
   * Called when a page starts loading
   * Is registered to {@link BrowserViewPopup.on}('start-loading')
   */
  OnStartLoad(...args: Parameters<BrowserViewEventMap['start-loading']>): void;

  /**
   * Called when a request starts
   * Is registered to {@link BrowserViewPopup.on}('start-request')
   */
  OnStartRequest(...args: Parameters<BrowserViewEventMap['start-request']>): void;

  /**
   * Reloads the current page in the browser
   */
  Reload(): void;

  /**
   * Opens a URL in the main window browser
   * @param url - The URL to show
   * @param navigationParams - Optional navigation parameters
   */
  ShowURL(url: string, navigationParams?: unknown): void;

  /**
   * Starts waiting for a history callback (sets timeout timestamp)
   */
  StartWaitingForHistoryCallback(): void;

  /**
   * Synchronizes the router with new browser history state
   * @param history - The new browser history
   */
  SyncWithNewBrowserHistory(history: BrowserViewHistory): void;

  /**
   * Synchronizes the browser with new router event
   * @param location - The location object
   * @param action - The navigation action type
   */
  SyncWithNewRouterEvent(location: Location, action: Action): void;

  /**
   * Updates the active tab based on URL
   * @param url - The URL to determine the active tab from
   */
  UpdateActiveTab(url: string): void;

  /**
   * The URL to display (either requested URL while loading or current URL)
   */
  DisplayURL: string;

  /**
   * The error code from the last load error, if any
   */
  LoadErrorCode: number | null | undefined;

  /**
   * The description of the last load error, if any
   */
  LoadErrorDescription: string | null;

  /**
   * The URL that failed to load, if any
   */
  LoadErrorURL: string | null;

  /**
   * Whether the browser is currently loading
   */
  Loading: boolean;

  /**
   * Flag indicating whether to expect an important replace operation
   */
  m_bExpectImportantReplace: boolean;

  /**
   * Internal loading state
   */
  m_bLoading: boolean;

  /**
   * Flag indicating whether router change was triggered by sync
   */
  m_bRouterChangeTriggeredBySync: boolean;

  m_browser: BrowserViewPopup;

  /**
   * The browser's history state
   */
  m_browserHistory: BrowserViewHistory;

  /**
   * The router history instance
   */
  m_history: History;

  /**
   * The last active tab name
   */
  m_lastActiveTab: string;

  /**
   * URLs for each tab that was last active
   */
  m_lastActiveTabURLs: LastActiveTabURLs | object;

  /**
   * The last location from the router
   */
  m_lastLocation: Location;

  /**
   * Internal error code storage
   */
  m_loadErrorCode: number | null | undefined;

  /**
   * Internal error description storage
   */
  m_loadErrorDesc: string | null;

  /**
   * Internal error URL storage
   */
  m_loadErrorURL: string | null;

  /**
   * Internal page security storage
   */
  m_pageSecurity: BrowserViewPageSecurity | null;

  /**
   * Root URLs for each tab type
   */
  m_rootTabURLs: LastActiveTabURLs;

  /**
   * Internal title storage
   */
  m_strTitle: string;

  /**
   * Internal tabbed browser store instance
   */
  m_tabbedBrowserStore: TabbedBrowserStore;

  /**
   * Timestamp when waiting for browser change started
   */
  m_tsWaitingForBrowserChange: number | undefined;

  /**
   * The current URL
   */
  m_URL: string;

  /**
   * The currently requested URL
   */
  m_URLRequested: string | null;

  /**
   * The current page security information
   */
  PageSecurity: BrowserViewPageSecurity | null;

  /**
   * The tabbed browser store for managing web page requests
   */
  TabbedBrowserStore: TabbedBrowserStore;

  /**
   * The current page title
   */
  Title: string;
}

export type SteamBrowserTabType = 'store' | 'me' | 'community';

export interface BrowserViewHistory {
  entries: BrowserViewHistoryEntry[];

  index: number;
}

export interface BrowserViewHistoryEntry {
  url: string;
}

export interface LastActiveTabURLs {
  community?: string;

  me?: string;

  store?: string;
}

export interface BrowserViewPageSecurity {
  bHasCertError: boolean;

  bIsEVCert: boolean;

  bIsSecure: boolean;

  certExpiry: number;

  certName: string;

  issuerName: string;

  nCertBits: number;
}

export interface TabbedBrowserStore {
  /**
   * @param url Web page's URL. `data:text/html,<body></body>` by default.
   */
  AddWebPageRequest(url: string, shouldActivate: boolean): void;

  CycleThroughWebPageRequests(): boolean;

  GetWebPageRequestsChangedCallbackList(): unknown;

  RemoveAllRequests(): void;

  RemoveWebPageRequest(requestId: unknown): boolean;

  ReorderWebPageRequest(requestId: unknown, newIndex: unknown): void;

  Set(activeWebpageRequestId: number, webPageRequestId: number, webPageRequests: TabbedBrowserWebPageRequest[]): void;

  UpdateWebPageRequest(requestId?: number, url?: string, title?: string): boolean;

  active_web_requestid: number;

  m_cbWebPageRequestsChanged: Callbacks;

  m_nActiveWebpageRequestID: number;

  m_nWebPageRequestID: number;

  m_rgWebPageRequests: TabbedBrowserWebPageRequest[];

  web_requests: unknown[];
}

export interface TabbedBrowserWebPageRequest {
  requestid: number;

  strLastURL: string;

  strTitle: string;

  strURL: string;
}
