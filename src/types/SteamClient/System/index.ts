import { JsPbMessage, OperationResponse, Unregisterable } from '../shared';
import { Devkit } from './Devkit';
import { Display } from './Display';
import { Network } from './Network';
import { Report } from './Report';
import { UI } from './UI';

export interface System {
  /**
   * @returns a boolean indicating whether the operation succeeded.
   */
  CopyFile(target: string, destination: string): Promise<boolean>;

  /**
   * Copies specified files to clipboard.
   * Does not throw if not found.
   * @param paths File paths to copy.
   */
  CopyFilesToClipboard(paths: string[]): void;

  /**
   * Creates a temporary folder.
   * @param path The folder to create.
   * @returns The created path.
   * @todo Does this support relative paths ? this has some weird behavior
   */
  CreateTempPath(path: string): Promise<string>;

  ExitFakeCaptivePortal(): unknown;

  FactoryReset(): unknown;

  FormatStorage(force: boolean): unknown;

  GetOSType(): Promise<EOSType>;

  GetSystemInfo(): Promise<SystemInfo>;

  IsDeckFactoryImage(): Promise<boolean>;

  IsSteamInTournamentMode(): Promise<boolean>;

  /**
   * Moves a file.
   * @param target Target file/folder.
   * @param destination Destination path.
   * @remarks Does not throw on error.
   */
  MoveFile(target: string, destination: string): void;

  NotifyGameOverlayStateChanged(latestAppOverlayStateActive: boolean, appId: number): unknown;

  /**
   * Open a dialog for choosing a file.
   * @param prefs Dialog preferences.
   * @returns A Promise that resolves to the selected file name.
   * @throws Throws if no file was selected.
   */
  OpenFileDialog(prefs: FileDialog): Promise<string | OperationResponse>;

  /**
   * Open a URL in the default web browser.
   */
  OpenInSystemBrowser(url: string): void;

  /**
   * Opens a local directory in the system explorer.
   * @param directory The directory to open.
   */
  OpenLocalDirectoryInSystemExplorer(directory: string): void;

  RebootToAlternateSystemPartition(): never;

  RebootToFactoryTestImage(param0: unknown): never;

  RegisterForAirplaneModeChanges(callback: (airplaneModeChange: AirplaneModeChange) => void): Unregisterable;

  RegisterForBatteryStateChanges(callback: (batteryStateChange: BatteryStateChange) => void): Unregisterable;

  // {"flProgress":0,"rtEstimatedCompletionTime":0,"eStage":1}
  RegisterForFormatStorageProgress(callback: () => void): Unregisterable;

  /**
   * @returns A Promise that resolves to a ProtoBuf message. If deserialized, returns {@link MsgSystemManagerSettings}.
   */
  RegisterForSettingsChanges(callback: (data: ArrayBuffer) => void): Unregisterable;

  /**
   * Restarts the system.
   */
  RestartPC(): never;

  SetAirplaneMode(value: boolean): void;

  ShutdownPC(): never;

  SteamRuntimeSystemInfo(): Promise<string>;

  /**
   * Suspends the system.
   */
  SuspendPC(): unknown;

  /**
   * Switches to desktop mode.
   */
  SwitchToDesktop(): unknown;

  UpdateSettings(base64: string): unknown;

  VideoRecordingDriverCheck(): unknown;

  Devkit: Devkit;

  Display: Display;

  Network: Network;

  Report: Report;

  UI: UI;
}

export interface AirplaneModeChange {
  bEnabled: boolean;
}

export interface BatteryStateChange {
  bHasBattery: boolean;

  bShutdownRequested: boolean;

  eACState: EACState;

  eBatteryState: EBatteryState;

  /** Battery Percentage in floating point 0-1 */
  flLevel: number;

  /** Appears to be charge time remaining or time remaining on battery */
  nSecondsRemaining: number;
}

export enum EACState {
  Unknown,
  Disconnected,
  Connected,
  ConnectedSlow,
}

export enum EBatteryState {
  Unknown,
  Discharging,
  Charging,
  Full,
}

export interface FileDialog {
  /** Whether to choose a directory instead. */
  bChooseDirectory?: boolean;

  /**
   * Array of file filters.
   * @example
   * Example from the "Add a Non-Steam Game" dialog:
   * ```
   * [
   *     {
   *         strFileTypeName: LocalizationManager.LocalizeString("#AddNonSteam_Filter_Exe_Linux"),
   *         rFilePatterns: [ "*.application", "*.exe", "*.sh", "*.AppImage" ],
   *         bUseAsDefault: true,
   *     },
   *     {
   *         strFileTypeName: LocalizationManager.LocalizeString("#AddNonSteam_Filter_All"),
   *         rFilePatterns: [ "*" ],
   *     }
   * ]
   * ```
   */
  rgFilters?: FileDialogFilter[];

  /** Initially selected file. */
  strInitialFile?: string;

  /** Window title. */
  strTitle?: string;
}

export interface FileDialogFilter {
  /** Whether to use this filter by default. */
  bUseAsDefault?: boolean;

  /**
   * File patterns.
   * @example [ "*.application", "*.exe", "*.sh", "*.AppImage" ]
   */
  rFilePatterns: string[];

  /** A localization string for the file type. */
  strFileTypeName: string;
}

export enum EOSType {
  Web = -700,
  Ios = -600,
  Android = -500,
  Android6 = -499,
  Android7 = -498,
  Android8 = -497,
  Android9 = -496,
  Ps3os = -300,
  Linux = -203,
  Linux22 = -202,
  Linux24 = -201,
  Linux26 = -200,
  Linux32 = -199,
  Linux35 = -198,
  Linux36 = -197,
  Linux310 = -196,
  Linux316 = -195,
  Linux318 = -194,
  Linux3x = -193,
  Linux4x = -192,
  Linux41 = -191,
  Linux44 = -190,
  Linux49 = -189,
  Linux414 = -188,
  Linux419 = -187,
  Linux5x = -186,
  Linux54 = -185,
  Linux6x = -184,
  Linux7x = -183,
  Linux510 = -182,
  Macos = -102,
  Macos104 = -101,
  Macos105 = -100,
  Macos1058 = -99,
  Macos106_unused1 = -98,
  Macos106_unused2 = -97,
  Macos106_unused3 = -96,
  Macos106 = -95,
  Macos1063 = -94,
  Macos1064_slgu = -93,
  Macos1067 = -92,
  Macos1067_unused = -91,
  Macos107 = -90,
  Macos108 = -89,
  Macos109 = -88,
  Macos1010 = -87,
  Macos1011 = -86,
  Macos1012 = -85,
  Macos1013 = -84,
  Macos1014 = -83,
  Macos1015 = -82,
  Macos1016 = -81,
  Macos11 = -80,
  Macos111 = -79,
  Macos1017 = -78,
  Macos12 = -77,
  Macos1018 = -76,
  Macos13 = -75,
  Macos1019 = -74,
  Macos14 = -73,
  Macos1020 = -72,
  Macos15 = -71,
  Unknown = -1,
  Windows = 0,
  Win311 = 1,
  Win95 = 2,
  Win98 = 3,
  WinME = 4,
  WinNT = 5,
  Win200 = 6,
  WinXP = 7,
  Win2003 = 8,
  WinVista = 9,
  Win7 = 10,
  Win2008 = 11,
  Win2012 = 12,
  Win8 = 13,
  Win81 = 14,
  Win2012R2 = 15,
  Win10 = 16,
  Win2016 = 17,
  Win2019 = 18,
  Win2022 = 19,
  Win11 = 20,
}

export interface SystemInfo {
  bIsUnsupportedPrototypeHardware: boolean;

  /**
   * This is usually set to the {@link GamingDeviceType.StandardPC} enum value.
   */
  eGamingDeviceType: GamingDeviceType;

  /** @deprecated Use {@link eGamingDeviceType} instead. */
  eHardwareVariant_DoNotUse: GamingDeviceType;

  nCPUHz: number;

  nCPULogicalCores: number;

  nCPUPhysicalCores: number;

  nSteamVersion: number;

  nSystemRAMSizeMB: number;

  nVideoRAMSizeMB: number;

  sBIOSVersion: string;

  sCPUName: string;

  sCPUVendor: string;

  sHostname: string;

  sKernelVersion: string;

  sOSBuildId: string;

  sOSCodename: string;

  sOSName: string;

  sOSVariantId: string;

  sOSVersionId: string;

  sSteamAPI: string;

  sSteamBuildDate: string;

  sVideoCardName: string;

  sVideoDriverVersion: string;
}

/**
 * CMsgSystemManagerSettings
 */
export interface MsgSystemManagerSettings extends JsPbMessage {
  display_adaptive_brightness_enabled(): boolean;

  display_colorgamut(): number;

  display_colorgamut_labelset(): number;

  display_colortemp(): number;

  display_colortemp_default(): number;

  display_colortemp_enabled(): boolean;

  display_diagnostics_enabled(): boolean;

  display_nightmode_blend(): number;

  display_nightmode_enabled(): boolean;

  display_nightmode_maxhue(): number;

  display_nightmode_maxsat(): number;

  display_nightmode_schedule_enabled(): boolean;

  display_nightmode_schedule_endtime(): number;

  display_nightmode_schedule_starttime(): number;

  display_nightmode_tintstrength(): number;

  display_nightmode_uiexp(): number;

  fan_control_mode(): number;

  idle_backlight_dim_ac_seconds(): number;

  idle_backlight_dim_battery_seconds(): number;

  idle_suspend_ac_seconds(): number;

  idle_suspend_battery_seconds(): number;

  idle_suspend_supressed(): boolean;

  is_adaptive_brightness_available(): boolean;

  is_display_brightness_available(): boolean;

  is_display_colormanagement_available(): boolean;

  is_display_colortemp_available(): boolean;

  is_fan_control_available(): boolean;

  is_wifi_powersave_enabled(): boolean;
}

export enum GamingDeviceType {
  Unknown,
  StandardPC,
  Console = 256,
  PS3 = 272,
  Steambox = 288,
  Tesla = 320,
  Handheld = 512,
  Phone = 528,
  SteamDeck = 544,
}
