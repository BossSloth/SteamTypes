import { EUIMode } from '../Global/PopupManager';
import { DesiredSteamWindow } from '../Global/SteamUIStore/WindowStore';
import { Unregisterable } from './shared';
import { EOSType } from './System';

export interface UI {
  EnsureMainWindowCreated(): void;

  ExitBigPictureMode(): void;

  GetDesiredSteamUIWindows(): Promise<DesiredSteamWindow[]>;

  /**
   * Gets information about whether your OS will be unsupported in the future or not.
   */
  GetOSEndOfLifeInfo(): Promise<OSEndOfLifeInfo>;

  /**
   * Retrieves the current UI mode.
   * @returns A Promise that resolves to the current UI mode.
   */
  GetUIMode(): Promise<EUIMode>;

  NotifyAppInitialized(): void;

  RegisterDesiredSteamUIWindowsChanged(callback: () => void): Unregisterable;

  /**
   * Registers a callback function to be called when a convar's value gets changed.
   *
   * Hard crashes if such a convar does not exist or if you can't set it.
   *
   * @param convar The ConVar to watch.
   * @param callback The callback function to be called.
   */
  RegisterForClientConVar(convar: string, callback: (value: string) => void): Unregisterable;

  RegisterForErrorCondition(callback: (param0: number, param1: number) => void): Unregisterable;

  RegisterForKioskModeResetSignal(callback: () => void): Unregisterable;

  /**
   * @todo This fires multiple times.
   */
  RegisterForStartupFinished(callback: () => void): Unregisterable;

  RegisterForUIModeChanged(callback: (mode: EUIMode) => void): Unregisterable;

  ResetErrorCondition(): void;

  /**
   * Sets the UI mode to the specified value.
   * @param mode The UI mode to set.
   */
  SetUIMode(mode: EUIMode): void;
}

export interface OSEndOfLifeInfo {
  bOSWillBeUnsupported: boolean;

  osType: EOSType;
}
