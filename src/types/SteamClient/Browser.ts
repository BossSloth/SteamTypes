import { Unregisterable } from './shared';

export interface Browser {
  AddWordToDictionary(word: string): void;

  ClearAllBrowsingData(): void;

  ClearHistory(): void;

  CloseDevTools(): void;

  GetBrowserID(): number;

  GetSpellingSuggestions(word: string): string[];

  // 16-bit unsigned integer?
  GetSteamBrowserID(): number;

  /**
   * Hides the mouse cursor until input.
   */
  HideCursorUntilMouseEvent(): void;

  /**
   * yup that's right, clientY and clientX are reversed
   */
  InspectElement(clientY: number, clientX: number): void;

  NotifyUserActivation(): void;

  OpenDevTools(): void;

  /**
   * Pastes the clipboard contents.
   */
  Paste(): void;

  /**
   * @todo unconfirmed
   */
  RegisterForGestureEvents(callback: (gesture: TouchGesture) => void): Unregisterable;

  RegisterForOpenNewTab(): Unregisterable;

  ReplaceMisspelling(): unknown;

  /**
   * Restarts the Steam JS context.
   */
  RestartJSContext(): void;

  SetBackgroundThrottlingDisabled(value: boolean): void;

  SetPendingFilePath(path: string): Promise<boolean>;

  SetShouldExitSteamOnBrowserClosed(value: boolean): unknown;

  SetTouchGesturesToCancel(gestures: ETouchGesture[]): void;

  /**
   * Prompts and downloads a file.
   * @param url The URL of the file to download.
   */
  StartDownload(url: string): void;
}

export interface TouchGesture {
  eTouchGesture: ETouchGesture;

  x: number;

  y: number;
}

export enum ETouchGesture {
  None,
  Touch,
  Tap,
  DoubleTap,
  ShortPress,
  LongPress,
  LongTap,
  TwoFingerTap,
  TapCancelled,
  PinchBegin,
  PinchUpdate,
  PinchEnd,
  FlingStart,
  FlingCancelled,
}
