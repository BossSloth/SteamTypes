import { BrowserViewPopup } from './BrowserViewPopup';

export interface BrowserView {
  Create(browser?: BrowserViewInit): BrowserViewPopup;

  CreatePopup(browser?: BrowserViewInit): PopupResult;

  Destroy(browser: BrowserViewInit): void;

  PostMessageToParent(message: string, args: string): void;
}

export interface BrowserViewInit {
  bOnlyAllowTrustedPopups?: boolean;

  parentPopupBrowserID?: number;

  /** Initial URL to go to. */
  strInitialURL?: string;

  strUserAgentIdentifier?: string;

  strUserAgentOverride?: string;

  strVROverlayKey?: string;
}

export interface PopupResult {
  browserView: BrowserViewPopup;

  /**
   * URL for usage with `window.open()`.
  */
  strCreateURL: string;
}
