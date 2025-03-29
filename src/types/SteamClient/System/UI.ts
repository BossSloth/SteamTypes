import { Unregisterable } from '../shared';

export interface UI {
  CloseGameWindow(appId: number, windowId: number): void;

  GetGameWindowsInfo(appId: number, windowIds: number[]): Promise<GameWindowInfo>;

  RegisterForFocusChangeEvents(callback: (event: FocusChangeEvent) => void): Unregisterable;

  // appId is 0 if unknown app is focused
  RegisterForOverlayGameWindowFocusChanged(callback: (appId: number, param1: number) => void): Unregisterable;

  // event.eKey, event.nControllerIndex
  RegisterForSystemKeyEvents(callback: (event: unknown) => void): Unregisterable;
}

export interface FocusChangeEvent {
  focusedApp: FocusedApp;
  rgFocusable: FocusedApp[];
}

export interface FocusedApp {
  appid: number;
  pid: number;
  strExeName: string;
  windowid: number;
}

export interface GameWindowInfo {
  bCanClose: boolean;
  strTitle: string;
  windowid: number;
}
