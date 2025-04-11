import { EAppUpdateError } from './Apps';
import { Unregisterable } from './shared';

/**
 * Represents functions related to Steam Install Folders.
 */
export interface InstallFolder {
  /**
   * Adds a Steam Library folder to the Steam client.
   * @param steamLibraryPath The path of the Steam Library folder to be added.
   * @returns A Promise that resolves to the index of the added folder.
   */
  AddInstallFolder(steamLibraryPath: string): Promise<number>;

  /**
   * Opens the file explorer to browse files in a specific Steam Library folder.
   * @param folderIndex The index of the folder to be opened.
   */
  BrowseFilesInFolder(folderIndex: number): void;

  /**
   * Cancels the current move operation for moving game content.
   */
  CancelMove(): void;

  /**
   * Retrieves a list of installed Steam Library folders.
   * @returns A Promise that resolves to an array of SteamInstallFolder objects.
   */
  GetInstallFolders(): Promise<SteamInstallFolder[]>;

  /**
   * Retrieves a list of potential Steam Library folders that can be added.
   * @returns A Promise that resolves to an array of PotentialInstallFolder objects.
   */
  GetPotentialFolders(): Promise<PotentialInstallFolder[]>;

  /**
   * Moves the installation folder for a specific app to another Steam Library folder.
   * @param appId The ID of the application to be moved.
   * @param folderIndex The index of the target Steam Library folder.
   */
  MoveInstallFolderForApp(appId: number, folderIndex: number): void;

  /**
   * Refreshes the list of installed Steam Library folders.
   * @returns A Promise or response indicating the refresh operation.
   */
  RefreshFolders(): void;

  /**
   * Registers a callback function to be called when changes occur in Steam Install Folders.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForInstallFolderChanges(callback: (folderChange: FolderChange) => void): Unregisterable;

  /**
   * Registers a callback function to be called when moving game content progresses.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForMoveContentProgress(callback: (moveContentProgress: MoveContentProgress) => void): Unregisterable;

  /**
   * Registers a callback function to be called when repairing an install folder is finished.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForRepairFolderFinished(callback: (folderChange: FolderChange) => void): Unregisterable;

  /**
   * Removes a Steam Library folder from the Steam client.
   * @param folderIndex The index of the folder to be removed.
   */
  RemoveInstallFolder(folderIndex: number): void;

  /**
   * Repairs an installed Steam Library folder.
   * @param folderIndex The index of the folder to be repaired.
   */
  RepairInstallFolder(folderIndex: number): void;

  /**
   * Sets a specific Steam Library folder as the default install folder.
   * @param folderIndex The index of the folder to be set as default.
   */
  SetDefaultInstallFolder(folderIndex: number): void;

  /**
   * Sets a user-defined label for a specific Steam Library folder.
   * @param folderIndex The index of the folder to be labeled.
   * @param userLabel The label to be assigned to the folder.
   */
  SetFolderLabel(folderIndex: number, userLabel: string): void;
}

/**
 * Represents information about an installation folder.
 */
export interface SteamInstallFolder extends PotentialInstallFolder {
  /** Indicates if the folder is set as the default installation folder. */
  bIsDefaultFolder: boolean;

  /** Indicates if the folder is currently mounted. */
  bIsMounted: boolean;

  /** Index of the folder. */
  nFolderIndex: number;

  /** Size of DLC storage used in the folder. */
  strDLCSize: string;

  /** Size of staged storage used in the folder. */
  strStagedSize: string;

  /** Used space in the folder. */
  strUsedSize: string;

  /** Size of workshop storage used in the folder. */
  strWorkshopSize: string;

  /** List of applications installed in the folder. */
  vecApps: AppInfo[];
}

export interface PotentialInstallFolder {
  /** Indicates if the folder is on a fixed drive. */
  bIsFixed: boolean;

  /** Total capacity of the folder. */
  strCapacity: string;

  /** Name of the drive where the folder is located. */
  strDriveName: string;

  /** Path of the folder. */
  strFolderPath: string;

  /** Available free space in the folder. */
  strFreeSpace: string;

  /** User label for the folder. */
  strUserLabel: string;
}

/**
 * Represents information about an installed application.
 */
export interface AppInfo {
  /** ID of the application. */
  nAppID: number;

  /** Last played time in Unix Epoch time format. */
  rtLastPlayed: number;

  /** Name of the application. */
  strAppName: string;

  /** Size of DLC storage used by the application. */
  strDLCSize: string;

  /** Sorting information for the application. */
  strSortAs: string;

  /** Size of staged storage used by the application. */
  strStagedSize: string;

  /** Size of used storage by the application. */
  strUsedSize: string;

  /** Size of workshop storage used by the application. */
  strWorkshopSize: string;
}

export interface FolderChange {
  folderIndex: number;
}

export interface MoveContentProgress {
  appid: number;

  eError: EAppUpdateError;

  flProgress: number;

  nFilesMoved: number;

  strBytesMoved: string;

  strTotalBytesToMove: string;
}
