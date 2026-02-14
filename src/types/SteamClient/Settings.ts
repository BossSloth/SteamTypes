import { CMsgClientSettings_Protobuf } from '@Runtime/Protobufs';
import { SerializedArrayBuffer } from 'shared/protobuf';
import { CompatibilityToolInfo } from './Apps';
import { JsPbMessage, OperationResponse, Unregisterable } from './shared';

export interface Settings {
  AddClientBeta(name: string, password: string): void;

  /**
   * Clears HTTP cache located in `<STEAMPATH>/appcache/httpcache`.
   */
  ClearAllHTTPCaches(): void;

  /**
   * Clears download cache and logs you out.
   */
  ClearDownloadCache(): void;

  GetAccountSettings(): Promise<AccountSettings>;

  GetAppUsesP2PVoice(appId: number): Promise<boolean>;

  GetAvailableLanguages(): Promise<Language[]>;

  GetAvailableTimeZones(): Promise<TimeZone[]>;

  // Returns the current language "english"
  GetCurrentLanguage(): Promise<string>;

  GetGlobalCompatTools(): Promise<CompatibilityToolInfo[]>;

  /**
   * @returns A Promise that resolves to a ProtoBuf message. If deserialized, returns {@link MsgMonitorInfo}.
   */
  GetMonitorInfo(): Promise<ArrayBuffer>;

  GetRegisteredSteamDeck(): Promise<RegisteredSteamDeck>;

  // Returns the current timezone
  GetTimeZone(): Promise<string>;

  GetWindowed(): Promise<boolean>;

  IgnoreSteamDeckRewards(): void;

  /**
   * Opens the Windows microphones dialog.
   */
  OpenWindowsMicSettings(): void;

  /**
   * Registers a callback function to be called when applications with auto-update overrides change.
   * @note this also get's called when the downloads settings page is opened
   *
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForAppsWithAutoUpdateOverrides(callback: (updateOverrides: { appid: number; }[][]) => void): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForMicVolumeUpdates(): Unregisterable;

  /**
   * `data` can be deserialized with {@link CMsgClientSettings_Protobuf}
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForSettingsArrayChanges(callback: (data: SerializedArrayBuffer<typeof CMsgClientSettings_Protobuf>) => void): Unregisterable;

  RegisterForSettingsChanges(callback: (steamSettings: SteamSettings) => void): Unregisterable;

  /**
   * Registers a callback function to be called when the timezone is changed.
   *
   * When timezone is changed from settings, callback will return new timezoneId
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForTimeZoneChange(callback: (timezoneId: string) => void): Unregisterable;

  ReinitMicSettings(): void;

  RenderHotkey(event: KeyCaptureEvent): Promise<string>;

  SelectClientBeta(nBetaID: unknown): unknown;

  /**
   * Sets the current language.
   * @param strShortName The short name of the language. — You can get valid short names from GetAvailableLanguages()
   */
  SetCurrentLanguage(strShortName: string): void;

  // Default value is false, this is Valve internal menu
  SetEnableSoftProcessKill(value: boolean): void;

  SetHostname(hostname: string): void;

  /**
   * @params unknown
   */
  SetMicTestMode(): unknown;

  SetPreferredMonitor(monitor: string): void;

  /**
   * @params unknown
   */
  SetRegisteredSteamDeck(): unknown;

  /**
   * Sets the "Don't save account credentials on this computer" option.
   * @param value Whether to save account credentials.
   */
  SetSaveAccountCredentials(value: boolean): void;

  SetSetting(serializedBase64: string): unknown;

  /**
   * Sets the timezone.
   * @param timezoneId The timezone ID — You can get valid timezoneIds from GetAvailableTimeZones()
   */
  SetTimeZone(timezoneId: string): void;

  SetUseNintendoButtonLayout(controllerIndex: number, value: boolean): void;

  SetUseUniversalFaceButtonGlyphs(nControllerIndex: number, value: boolean): void;

  SetWindowed(value: boolean): void;

  SpecifyGlobalCompatTool(strToolName: string): void;

  ToggleSteamInstall(): Promise<OperationResponse>;
}

export interface AccountSettings {
  bEmailValidated: boolean;

  bHasAnyVACBans: boolean;

  bHasTwoFactor: boolean;

  bSaveAccountCredentials: boolean;

  eSteamGuardState: ESteamGuardState;

  rtSteamGuardEnableTime: number;

  strEmail: string;
}

/**
 * @todo unconfirmed, taken from localization strings
 */
export enum ESteamGuardState {
  EmailUnverified,
  Protected,
  Disabled,
  Offline,
  NotEnabled,
}

export interface KeyCaptureEvent {
  alt_key: boolean;

  ctrl_key: boolean;

  display_name: string;

  meta_key: boolean;

  shift_key: boolean;
}

export interface Language {
  language: ELanguage;

  strShortName: string;
}

export enum ELanguage {
  None = -1,
  English,
  German,
  French,
  Italian,
  Korean,
  Spanish,
  SimplifiedChinese,
  TraditionalChinese,
  Russian,
  Thai,
  Japanese,
  Portuguese,
  Polish,
  Danish,
  Dutch,
  Finnish,
  Norwegian,
  Swedish,
  Hungarian,
  Czech,
  Romanian,
  Turkish,
  Brazilian,
  Bulgarian,
  Greek,
  Arabic,
  Ukrainian,
  LatamSpanish,
  Vietnamese,
  SteamChina_SChinese,
  Max,
}
export interface RegisteredSteamDeck {
  bIgnoreRegistrationPrompt: boolean;

  bRegistered: boolean;

  strSerialNumber: string;

  strSteamID: string;
}

export interface TimeZone {
  regionsLocalizationToken: string;

  timezoneID: string;

  timezoneLocalizationToken: string;

  utcOffset: number;
}

interface Region {
  nRegionID: number;

  strRegionName: string;
}

interface Hour {
  nHour: number;

  strDisplay: string;
}

interface AvailableClientBeta {
  nBetaID: number;

  strName: string;
}

interface SteamSettings {
  bChangeBetaEnabled: boolean;

  bCompatEnabled: boolean;

  bCompatEnabledForOtherTitles: boolean;

  bDisplayIsExternal: boolean;

  bDisplayIsUsingAutoScale: boolean;

  bEnableSoftProcessKill: boolean;

  bIsInClientBeta: boolean;

  bIsInDesktopUIBeta: boolean;

  bIsSteamSideload: boolean;

  bIsValveEmail: boolean;

  bUnderscanEnabled: boolean;

  eClientBetaState: EClientBetaState;

  flAutoDisplayScaleFactor: number;

  flCurrentDisplayScaleFactor: number;

  flCurrentUnderscanLevel: number;

  flMaxDisplayScaleFactor: number;

  flMinDisplayScaleFactor: number;

  nAvailableBetas: number;

  nSelectedBetaID: number;

  strCompatTool: string;

  strDisplayName: string;

  strSelectedBetaName: string;

  vecAvailableClientBetas: AvailableClientBeta[];

  vecNightModeScheduledHours: Hour[];

  vecValidAutoUpdateRestrictHours: Hour[];

  vecValidDownloadRegions: Region[];
}

export enum EClientBetaState {
  None,
  NoneChosen,
  NoneChosenNonAdmin,
  InBeta,
  InBetaNonAdmin,
}

/**
 * CMsgMonitorInfo
 */
export interface MsgMonitorInfo extends JsPbMessage {
  add_monitors(param0: unknown, param1: unknown): unknown;

  monitors(): Monitor[];

  selected_display_name(): string;

  set_monitors(param0: unknown): unknown;

  set_selected_display_name(param0: unknown): unknown;
}

/**
 * @todo Doesn't work on Linux ?
 */
export interface Monitor {
  monitor_device_name: string;

  monitor_display_name: string;
}
