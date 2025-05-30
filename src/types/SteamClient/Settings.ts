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

  GetOOBETestMode(): Promise<boolean>;

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
   * If `data` is deserialized, returns {@link MsgClientSettings}.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForSettingsArrayChanges(callback: (data: ArrayBuffer) => void): Unregisterable;

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

  SetOOBETestMode(value: boolean): void;

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

/**
 * CMsgClientSettings
 */
export interface MsgClientSettings extends JsPbMessage {
  always_show_user_chooser(): boolean;

  always_use_gamepadui_overlay(): boolean;

  auto_scale_factor(): number;

  bigpicture_windowed(): boolean;

  broadcast_bitrate(): number;

  broadcast_chat_corner(): number;

  broadcast_encoding_option(): EBroadcastEncoderSetting;

  broadcast_output_height(): number;

  broadcast_output_width(): number;

  broadcast_permissions(): EBroadcastPermission;

  broadcast_record_all_audio(): boolean;

  broadcast_record_all_video(): boolean;

  broadcast_record_microphone(): boolean;

  broadcast_show_live_reminder(): boolean;

  broadcast_show_upload_stats(): boolean;

  cef_remote_debugging_enabled(): boolean;

  cloud_enabled(): boolean;

  controller_combine_nintendo_joycons(): boolean;

  controller_enable_chord(): boolean;

  controller_generic_support(): boolean;

  controller_guide_button_focus_steam(): boolean;

  controller_poll_rate(): boolean;

  controller_power_off_timeout(): number;

  controller_ps_support(): number;

  controller_switch_support(): boolean;

  controller_xbox_driver(): boolean;

  controller_xbox_support(): boolean;

  default_ping_rate(): number;

  disable_all_toasts(): boolean;

  disable_toasts_in_game(): boolean;

  display_name(): string;

  download_peer_content(): number;

  download_rate_bits_per_s(): boolean;

  download_region(): number;

  download_throttle_rate(): number;

  download_throttle_while_streaming(): boolean;

  download_while_app_running(): boolean;

  enable_avif_screenshots(): boolean;

  enable_dpi_scaling(): boolean;

  enable_gpu_accelerated_webviews(): boolean;

  enable_hardware_video_decoding(): boolean;

  enable_marketing_messages(): boolean;

  enable_overlay(): boolean;

  enable_screenshot_notification(): boolean;

  enable_screenshot_sound(): boolean;

  enable_shader_background_processing(): boolean;

  enable_shader_precache(): boolean;

  enable_ui_sounds(): boolean;

  force_deck_perf_tab(): boolean;

  force_fake_mandatory_update(): boolean;

  force_oobe(): boolean;

  g_background_a_m(): number;

  g_background_a_s(): boolean;

  g_background_audio(): EGRAudio;

  g_background_max_keep(): string;

  g_background_mk(): CMsgHotkey;

  g_background_mode(): EGRMode;

  g_background_path(): string;

  g_background_tg(): CMsgHotkey;

  g_background_time_resolution(): number;

  g_max_fps(): number;

  game_notes_enable_spellcheck(): boolean;

  gamerecording_automatic_gain_control(): boolean;

  gamerecording_export_codec(): EExportCodec;

  gamerecording_export_directory(): number;

  gamerecording_export_limit_bitrate(): number;

  gamerecording_export_limit_frame_rate(): number;

  gamerecording_export_limit_height(): number;

  gamerecording_export_limit_size_mb(): number;

  gamerecording_export_limit_type(): EGRExportLimitType;

  gamerecording_export_limit_width(): number;

  gamerecording_force_mic_mono(): boolean;

  gamerecording_hotkey_ic(): CMsgHotkey;

  gamerecording_ic_seconds(): number;

  gamerecording_video_bitrate(): string;

  gamerecording_video_maxheight(): number;

  gamescope_allow_tearing(): boolean;

  gamescope_app_target_framerate(): number;

  gamescope_composite_debug(): boolean;

  gamescope_disable_framelimit(): boolean;

  gamescope_disable_mura_correction(): boolean;

  gamescope_display_refresh_rate(): number;

  gamescope_enable_app_target_framerate(): boolean;

  gamescope_force_composite(): boolean;

  gamescope_hdr_visualization(): EHDRVisualization;

  gamescope_include_steamui_in_screenshots(): boolean;

  gamescope_use_game_refresh_rate_in_steam(): boolean;

  gamestream_enable_video_h265(): boolean;

  gamestream_hardware_video_encode(): boolean;

  hdr_compat_testing(): boolean;

  in_client_beta(): boolean;

  is_external_display(): boolean;

  is_steam_sideloaded(): boolean;

  jumplist_flags(): number;

  library_disable_community_content(): boolean;

  library_display_icon_in_game_list(): boolean;

  library_display_size(): number;

  library_low_bandwidth_mode(): boolean;

  library_low_perf_mode(): boolean;

  library_whats_new_show_only_product_updates(): boolean;

  max_scale_factor(): number;

  min_scale_factor(): number;

  music_download_high_quality(): boolean;

  music_pause_on_app_start(): boolean;

  music_pause_on_voice_chat(): boolean;

  music_playlist_notification(): boolean;

  music_volume(): number;

  needs_steam_service_repair(): boolean;

  no_save_personal_info(): boolean;

  oobe_test_mode_enabled(): boolean;

  os_version_unsupported(): boolean;

  overlay_fps_counter_corner(): number;

  overlay_fps_counter_high_contrast(): boolean;

  overlay_key(): CMsgHotkey;

  overlay_restore_browser_tabs(): boolean;

  overlay_scale_interface(): boolean;

  overlay_tabs(): string;

  overlay_toolbar_list_view(): boolean;

  override_browser_composer_mode(): number;

  play_sound_on_toast(): boolean;

  preferred_monitor(): string;

  ready_to_play_includes_streaming(): boolean;

  restrict_auto_updates(): boolean;

  restrict_auto_updates_end(): number;

  restrict_auto_updates_start(): number;

  run_at_startup(): boolean;

  save_uncompressed_screenshots(): boolean;

  screenshot_items_per_row(): number;

  screenshot_key(): CMsgHotkey;

  screenshots_path(): string;

  server_ping_rate(): number;

  setting_validation_bool(): boolean;

  setting_validation_enum(): EHDRVisualization;

  setting_validation_float(): number;

  setting_validation_int32(): number;

  setting_validation_string(): string;

  setting_validation_uint32(): number;

  setting_validation_uint64(): number;

  shader_precached_size(): string;

  show_copy_count_in_library(): boolean;

  show_family_sharing_notifications(): boolean;

  show_screenshot_manager(): boolean;

  show_steam_deck_info(): boolean;

  show_store_content_on_home(): boolean;

  show_timestamps_in_console(): boolean;

  skip_steamvr_install_dialog(): boolean;

  small_mode(): boolean;

  smooth_scroll_webviews(): boolean;

  start_in_big_picture_mode(): boolean;

  start_page(): string;

  startup_movie_id(): string;

  startup_movie_local_path(): string;

  startup_movie_shuffle(): boolean;

  startup_movie_used_for_resume(): boolean;

  steam_cef_gpu_blocklist_disabled(): boolean;

  steam_input_configurator_error_msg_enable(): boolean;

  steam_networking_share_ip(): number;

  steam_os_underscan_enabled(): boolean;

  steam_os_underscan_level(): number;

  steamos_cec_enabled(): boolean;

  steamos_cec_wake_on_resume(): boolean;

  steamos_magnifier_scale(): number;

  steamos_status_led_brightness(): number;

  steamos_tdp_limit(): number;

  steamos_tdp_limit_enabled(): boolean;

  steamos_wifi_debug(): boolean;

  steamos_wifi_force_wpa_supplicant(): boolean;

  system_bluetooth_enabled(): boolean;

  turn_off_controller_on_exit(): boolean;

  voice_mic_device_name(): string;

  voice_mic_input_gain(): number;

  voice_push_to_talk_key(): CMsgHotkey;

  voice_push_to_talk_setting(): number;

  voice_speaker_output_gain(): number;

  web_browser_home(): string;
}

export interface CMsgHotkey extends JsPbMessage {
  alt_key(): boolean;

  ctrl_key(): boolean;

  display_name(): string;

  key_code(): number;

  meta_key(): boolean;

  shift_key(): boolean;
}

export enum EBroadcastEncoderSetting {
  BestQuality,
  BestPerformance,
}

export enum EBroadcastPermission {
  Disabled,
  FriendsApprove,
  FriendsAllowed,
  Public,
  Subscribers,
}

export enum EExportCodec {
  Default,
  H264,
  H265,
}

export enum EGRAudio {
  Game,
  System,
  Select,
}

export enum EGRExportLimitType {
  Native,
  FileSize,
  Advanced,
}

export enum EGRMode {
  Never,
  Always,
  Manual,
}

export enum EHDRVisualization {
  None,
  Heatmap,
  Analysis,
  HeatmapExtended,
  HeatmapClassic,
}
