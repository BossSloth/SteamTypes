import { EAppUpdateError } from './Apps';
import { Unregisterable } from './shared';

/**
 * Represents functions related to managing installs and installation wizards in Steam.
 */
export interface Installs {
  /**
   * Cancels the installation wizard if it is open.
   */
  CancelInstall(): void;

  /**
   * Continues and starts the installation if the wizard is still open.
   */
  ContinueInstall(): void;

  /**
   * Retrieves information from the last opened or currently opened installation wizard.
   * @returns A Promise that resolves to the InstallInfo.
   */
  GetInstallManagerInfo(): Promise<InstallInfo>;

  /**
   * Opens the restore from backup installer wizard for a specific app.
   * @param appBackupPath The backup path of the app.
   */
  OpenInstallBackup(appBackupPath: string): void;

  /**
   * Opens the installation wizard for specified app IDs.
   * @param appIds An array of app IDs to install.
   */
  OpenInstallWizard(appIds: number[]): void;

  /**
   * Opens the uninstall wizard for specified app IDs.
   * @param appIds An array of app IDs to uninstall.
   * @param dontPrompt Whether to *not* prompt the user to uninstall.
   */
  OpenUninstallWizard(appIds: number[], dontPrompt: boolean): void;

  // Broken? doesn't seem to work
  RegisterForShowConfirmUninstall(): Unregisterable;

  /**
   * Registers a callback function to be called when the "Failed Uninstall" dialog is shown.
   * @param callback The callback function to be called when the dialog is shown.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForShowFailedUninstall(callback: (appId: number, reason: EAppUpdateError) => void): Unregisterable;

  /**
   * Registers a callback function to be called when the installation wizard is shown.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForShowInstallWizard(callback: (data: InstallInfo) => void): Unregisterable;

  RegisterForShowRegisterCDKey(): unknown;

  /**
   * Sets a list of app identifiers for downloads in the installation wizard.
   * @param appIds An array of app IDs to set.
   * @remarks The wizard will not reflect this change immediately, but changing another option will.
   */
  SetAppList(appIds: number[]): void;

  /**
   * Sets the options for creating shortcuts in the installation wizard.
   * @param bDesktopShortcut Whether to create a desktop shortcut.
   * @param bSystemMenuShortcut Whether to create a system menu shortcut.
   * @remarks The wizard will not reflect this change immediately, but changing another option will.
   */
  SetCreateShortcuts(bDesktopShortcut: boolean, bSystemMenuShortcut: boolean): void;

  /**
   * Sets the install folder for the installation wizard using an install folder index.
   * @param folderIndex The index of the install folder.
   * @remarks The wizard will not reflect this change immediately, but changing another option will.
   */
  SetInstallFolder(folderIndex: number): void;
}

export interface InstallInfo {
  bCanChangeInstallFolder: boolean;

  bDesktopShortcut: boolean;

  bIsBackupInstall: boolean;

  bPeerContentServerAvailable: boolean;

  bPeerContentServerOnline: boolean;

  bSystemMenuShortcut: boolean;

  currentAppID: number;

  eAppError: EAppUpdateError;

  eInstallState: EInstallMgrState;

  errorDetail: string;

  /**
   * Index of the install folder. -1 if not installed.
   */
  iInstallFolder: number;

  iUnmountedFolder: number;

  nCurrentDisk: number;

  nDiskSpaceAvailable: number;

  nDiskSpaceRequired: number;

  nTotalDisks: number;

  rgAppIDs: InstallInfoApps[];

  strPeerContentServer: string;
}

export interface InstallInfoApps {
  lDiskSpaceRequiredBytes: number;

  nAppID: number;
}

export enum EInstallMgrState {
  None,
  Setup,
  WaitLicense,
  FreeLicense,
  ShowCDKey,
  WaitAppInfo,
  ShowPassword,
  ShowConfig,
  ShowEULAs,
  CreateApps,
  ReadFromMedia,
  ShowChangeMedia,
  WaitLegacyCDKeys,
  ShowSignup,
  Complete,
  Failed,
  Canceled,
}
