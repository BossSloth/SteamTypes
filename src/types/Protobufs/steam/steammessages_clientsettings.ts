import { BroadcastEncoderSetting, BroadcastPermission, ExportCodec, GRMode, HDRVisualization } from './enums';

export interface CMsgHotkey {
  alt_key?: boolean;

  ctrl_key?: boolean;

  display_name?: string;

  key_code?: number;

  meta_key?: boolean;

  shift_key?: boolean;
}

export interface CMsgSettingVariant {
  value_bool?: boolean;

  value_float?: number;

  value_hotkey?: CMsgHotkey;

  value_int32?: number;

  value_string?: string;

  value_uint32?: number;

  value_uint64?: number;
}

export interface CMsgClientSettings {
  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Accessibility/ColorFilterName
   * Default: ""
   */
  accessibility_color_filter_name?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Accessibility/DebugVisualizer
   * Default: false
   */
  accessibility_debug_visualizer?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Accessibility/DesktopUIScale
   * Default: 1
   */
  accessibility_desktop_ui_scale?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Accessibility/HighContrastMode
   * Default: false
   */
  accessibility_high_contrast_mode?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Accessibility/MinimumFontSize
   * Default: 0
   */
  accessibility_minimum_font_size?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Accessibility/MonoAudio
   * Default: false
   */
  accessibility_mono_audio?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Accessibility/ReduceMotion
   * Default: false
   */
  accessibility_reduce_motion?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Accessibility/ScreenReaderEnabled
   * Default: false
   */
  accessibility_screen_reader_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Accessibility/ScreenReaderLocale
   * Default: "auto"
   */
  accessibility_screen_reader_locale?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Accessibility/ScreenReaderRate
   * Default: 0.5
   */
  accessibility_screen_reader_pitch?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Accessibility/ScreenReaderPitch
   * Default: 0.5
   */
  accessibility_screen_reader_rate?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Accessibility/ScreenReaderVolume
   * Default: 1
   */
  accessibility_screen_reader_volume?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\AchievementNotificationSound
   * Default: true
   */
  achievement_notification_sound?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\AchievementNotificationToast
   * Default: true
   */
  achievement_notification_toast?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: WebStorage\Auth\AlwaysShowUserChooser
   */
  always_show_user_chooser?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\EnableSCTenFootOverlayCheckNew
   */
  always_use_gamepadui_overlay?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: UI/Display/Current/AutoScaleFactor
   */
  auto_scale_factor?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: BigPicture/Windowed
   * Setting pre-login: true
   */
  bigpicture_windowed?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Broadcast\MaxKbps
   * Default: 2500
   */
  broadcast_bitrate?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Broadcast\ShowChat
   * Default: 1
   */
  broadcast_chat_corner?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Broadcast\EncoderSetting
   */
  broadcast_encoding_option?: BroadcastEncoderSetting;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Broadcast\OutputHeight
   * Default: 720
   */
  broadcast_output_height?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Broadcast\OutputWidth
   */
  broadcast_output_width?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Broadcast\Permissions
   * Default: 1
   */
  broadcast_permissions?: BroadcastPermission;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Broadcast\RecordSystemAudio
   */
  broadcast_record_all_audio?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Broadcast\IncludeDesktop
   */
  broadcast_record_all_video?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Broadcast\RecordMic
   */
  broadcast_record_microphone?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Broadcast\ShowReminder
   * Default: true
   */
  broadcast_show_live_reminder?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Broadcast\ShowDebugInfo
   */
  broadcast_show_upload_stats?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  cef_remote_debugging_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserRoaming
   * Setting name: Software\Valve\Steam\CloudEnabled
   * Default: true
   */
  cloud_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamInput/ChatRadialMenu/0
   */
  controller_chat_radial_menu_option_0?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamInput/ChatRadialMenu/1
   */
  controller_chat_radial_menu_option_1?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamInput/ChatRadialMenu/2
   */
  controller_chat_radial_menu_option_2?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamInput/ChatRadialMenu/3
   */
  controller_chat_radial_menu_option_3?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamInput/ChatRadialMenu/4
   */
  controller_chat_radial_menu_option_4?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamInput/ChatRadialMenu/5
   */
  controller_chat_radial_menu_option_5?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamInput/ChatRadialMenu/6
   */
  controller_chat_radial_menu_option_6?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamInput/ChatRadialMenu/7
   */
  controller_chat_radial_menu_option_7?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamInput/Configurator/CombinedJoycons
   */
  controller_combine_nintendo_joycons?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamController_Enable_Chord
   * Default: true
   */
  controller_enable_chord?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamController_GenericGamepadSupport
   */
  controller_generic_support?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Controller_CheckGuideButton
   * Default: true
   */
  controller_guide_button_focus_steam?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamController_Poll_Rate
   * Default: 2
   */
  controller_poll_rate?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: CSettingsPanelGameController.Timeout
   * Default: 15
   */
  controller_power_off_timeout?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamController_PSSupport
   * Default: 1
   */
  controller_ps_support?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamInput/Configurator/SIAPIAuhtorMode
   * Default: false
   */
  controller_siapi_config_author_mode?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamController_SwitchSupport
   */
  controller_switch_support?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamController_XBoxDriver
   */
  controller_xbox_driver?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamController_XBoxSupport
   */
  controller_xbox_support?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  default_app_update_behavior?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   * Setting readonly: true
   * Setting description: Computed default (automatic) server ping rate based on network speed
   */
  default_ping_rate?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Developer/DevModeEnabled
   */
  developer_mode_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserRoaming
   * Setting name: DisableAllToasts
   */
  disable_all_toasts?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserRoaming
   * Setting name: DisableToastsInGame
   */
  disable_toasts_in_game?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: UI/Display/Current/Name
   */
  display_name?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  download_peer_content?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  download_rate_bits_per_s?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  download_region?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  download_throttle_rate?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  download_throttle_while_streaming?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  download_while_app_running?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayScreenshotEnableAVIF
   */
  enable_avif_screenshots?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  enable_dpi_scaling?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_Registry
   * Setting name: HKEY_CURRENT_USER\Software\Valve\Steam\EnableGamescopeComposer
   * Default: false
   */
  enable_gamescope_composer?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_Registry
   * Setting name: HKEY_CURRENT_USER\Software\Valve\Steam\EnableGamescopeComposerVR
   * Default: true
   */
  enable_gamescope_composer_vr?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  enable_gpu_accelerated_webviews?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  enable_hardware_video_decoding?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: news\NotifyAvailableGames
   * Default: true
   */
  enable_marketing_messages?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\EnableGameOverlay
   * Default: true
   */
  enable_overlay?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayScreenshotNotification
   * Default: true
   */
  enable_screenshot_notification?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayScreenshotPlaySound
   * Default: true
   */
  enable_screenshot_sound?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  enable_shader_background_processing?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  enable_shader_precache?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\EnableUISounds
   * Default: true
   */
  enable_ui_sounds?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Developer/ForceDeckPerfTab
   */
  force_deck_perf_tab?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Developer/FakeMandatoryUpdate
   */
  force_fake_mandatory_update?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_Registry
   * Setting name: HKEY_CURRENT_USER\Software\Valve\Steam\ForceOOBE
   * Setting pre-login: true
   */
  force_oobe?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_Registry
   * Setting name: HKEY_CURRENT_USER\Software\Valve\Steam\ForceOOBEStage2
   * Setting pre-login: true
   */
  force_stage_2_oobe?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserRoaming
   * Setting name: GameNotesEnableSpellcheck
   * Default: true
   */
  game_notes_enable_spellcheck?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\AutomaticGainControl
   * Default: true
   */
  gamerecording_automatic_gain_control?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\Audio_Mic
   * Default: false
   */
  gamerecording_background_a_m?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\Recording_Audio_Option
   * Default: 0
   */
  gamerecording_background_audio?: GRAudio;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\BackgroundMaxKeep
   * Default: "120min"
   */
  gamerecording_background_max_keep?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\MarkerKey
   * Default: "Ctrl KEY_F12"
   */
  gamerecording_background_mk?: CMsgHotkey;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\BackgroundRecordMode
   * Default: 0
   */
  gamerecording_background_mode?: GRMode;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  gamerecording_background_path?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\ToggleKey
   * Default: "Ctrl KEY_F11"
   */
  gamerecording_background_tg?: CMsgHotkey;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\BackgroundTimeResolution
   * Default: 60000
   */
  gamerecording_background_time_resolution?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\ExportCodec
   */
  gamerecording_export_codec?: ExportCodec;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   * Setting name: GameRecording\ExportDirectory
   */
  gamerecording_export_directory?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\ExportLimitBitrate
   * Default: 1
   */
  gamerecording_export_limit_bitrate?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\ExportLimitFrameRate
   * Default: 60
   */
  gamerecording_export_limit_frame_rate?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\ExportLimitHeight
   * Default: 2160
   */
  gamerecording_export_limit_height?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\ExportLimitSize
   * Default: 100
   */
  gamerecording_export_limit_size_mb?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\ExportLimitType
   */
  gamerecording_export_limit_type?: GRExportLimitType;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\ExportLimitWidth
   * Default: 3840
   */
  gamerecording_export_limit_width?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\ForceMicMono
   * Default: false
   */
  gamerecording_force_mic_mono?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\InstantClipKey
   * Default: "None"
   */
  gamerecording_hotkey_ic?: CMsgHotkey;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\InstantClipDuration
   * Default: 30
   */
  gamerecording_ic_seconds?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\MaxFPS
   * Default: 60
   * Setting clamp min: 24
   * Setting clamp max: 120
   */
  gamerecording_max_fps?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\VideoBitRate
   * Default: "preset_default"
   */
  gamerecording_video_bitrate?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameRecording\VideoMaxHeight
   * Default: 0
   * Setting clamp min: 0
   * Setting clamp max: 2160
   */
  gamerecording_video_maxheight?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Gamescope/AllowTearing
   * Default: false
   * Setting profile mode: k_SettingProfileMode_PerGame
   */
  gamescope_allow_tearing?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Gamescope/AppTargetFrameRate
   * Default: 0
   * Setting profile mode: k_SettingProfileMode_PerGamePerDisplay
   */
  gamescope_app_target_framerate?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Gamescope/CompositeDebug
   * Default: false
   */
  gamescope_composite_debug?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Gamescope/DisableFrameLimit
   * Default: false
   * Setting profile mode: k_SettingProfileMode_PerGamePerDisplay
   */
  gamescope_disable_framelimit?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Gamescope/MuraCorrectionDisabled
   * Default: false
   */
  gamescope_disable_mura_correction?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Gamescope/RefreshRate
   * Default: 0
   * Setting profile mode: k_SettingProfileMode_PerGamePerDisplay
   */
  gamescope_display_refresh_rate?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_Registry
   * Setting name: HKEY_CURRENT_USER\Software\Valve\Steam\GamescopeEnableAppTargetRefreshRate2
   * Default: true
   */
  gamescope_enable_app_target_framerate?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Gamescope/ForceComposite
   * Default: false
   */
  gamescope_force_composite?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Gamescope/GameResolutionGlobal
   * Default: "Default"
   */
  gamescope_game_resolution_global?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Gamescope/GuideKeyboardHotkey
   * Default: "Shift KEY_TAB"
   */
  gamescope_guide_hotkey?: CMsgHotkey;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Gamescope/HDREnabled
   * Default: true
   * Setting profile mode: k_SettingProfileMode_PerDisplay
   */
  gamescope_hdr_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Gamescope/HDRVisualization2
   */
  gamescope_hdr_visualization?: HDRVisualization;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Gamescope/IncludeSteamUIInScreenshots
   * Default: false
   */
  gamescope_include_steamui_in_screenshots?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Gamescope/EnableSteamNativeExternalResolution
   */
  gamescope_native_external_res_in_steam?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Gamescope/QAMKeyboardHotkey
   * Default: "CTRL Shift KEY_TAB"
   */
  gamescope_qam_hotkey?: CMsgHotkey;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Developer/DynamicRefreshRateInSteam
   * Default: true
   */
  gamescope_use_game_refresh_rate_in_steam?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameStream\EnableVideoH265
   * Default: true
   */
  gamestream_enable_video_h265?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: GameStream\HardwareVideoEncode
   * Default: true
   */
  gamestream_hardware_video_encode?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: System/HardwareUpdater/Enabled
   * Default: false
   */
  hardware_updater_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Developer/HDRCompatTesting
   */
  hdr_compat_testing?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   * Setting pre-login: true
   */
  in_client_beta?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: UI/Display/Current/IsExternalDisplay
   */
  is_external_display?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   * Setting pre-login: true
   */
  is_steam_sideloaded?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\JumplistSettings
   * Default: 77680
   */
  jumplist_flags?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: LibraryDisableCommunityContent
   */
  library_disable_community_content?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: LibraryDisplayIconInGameList
   * Default: true
   */
  library_display_icon_in_game_list?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: LibraryDisplaySize
   */
  library_display_size?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: LibraryLowBandwidthMode
   */
  library_low_bandwidth_mode?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: LibraryLowPerfMode
   */
  library_low_perf_mode?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserRoaming
   * Setting name: LibraryWhatsNewShowOnlyProductUpdates
   */
  library_whats_new_show_only_product_updates?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: UI/Display/Current/MaxScaleFactor
   */
  max_scale_factor?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: UI/Display/Current/MinScaleFactor
   */
  min_scale_factor?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Music\DownloadHighQualityAudioSoundtracks
   */
  music_download_high_quality?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Music\PauseOnAppStartedProcess
   */
  music_pause_on_app_start?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Music\PauseOnVoiceChat
   */
  music_pause_on_voice_chat?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  music_volume?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   * Setting readonly: true
   */
  needs_steam_service_repair?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Software\Valve\Steam\NoSavePersonalInfo
   */
  no_save_personal_info?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   * Setting pre-login: true
   * Setting description: True if OOBE stage 1 has completed or we're on a platform where we don't do OOBE
   */
  oobe_completed?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   * Setting pre-login: true
   * Setting description: True if OOBE stage 2 has completed or we're on a platform where we don't do OOBE
   */
  oobe_stage_2_completed?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   * Setting pre-login: true
   * Setting readonly: true
   * Setting description: OOBE test mode is enabled for stage 2 either by passing -testoobe on the command line or setting the force_stage2_oobe client setting
   */
  oobe_stage_2_test_mode_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   * Setting pre-login: true
   * Setting readonly: true
   * Setting description: OOBE test mode is enabled either by passing -testoobe on the command line or setting the force_oobe client setting
   */
  oobe_test_mode_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_Registry
   * Setting name: HKEY_CURRENT_USER\Software\Valve\Steam\OSVersionUnsupported
   */
  os_version_unsupported?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayAllowKMDriveOnWindows
   * Default: true
   */
  overlay_fps_counter_allow_km_driver?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayShowFPSBGOpacity
   * Default: 0.8
   */
  overlay_fps_counter_bgopacity?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayShowFPSCorner
   */
  overlay_fps_counter_corner?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayShowFPSGraphCPU
   * Default: true
   */
  overlay_fps_counter_cpu_graph?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayShowFPSDetailLevel
   * Default: 1
   */
  overlay_fps_counter_detail_level?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayShowFPSGraphFPS
   * Default: true
   */
  overlay_fps_counter_fps_graph?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayShowFPSContrast
   */
  overlay_fps_counter_high_contrast?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayShowFPSHotKey
   * Default: "Default"
   */
  overlay_fps_counter_key?: CMsgHotkey;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayShowFPSSaturation
   * Default: 1
   */
  overlay_fps_counter_saturation_factor?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayShowFPSScaling
   * Default: 0.7
   */
  overlay_fps_counter_scale_factor?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayShortcutKey
   * Default: "Shift KEY_TAB"
   */
  overlay_key?: CMsgHotkey;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayRestoreBrowserTabs
   * Default: true
   */
  overlay_restore_browser_tabs?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_Registry
   * Setting name: HKEY_CURRENT_USER\Software\Valve\Steam\OverlayScaleInterface
   * Default: true
   */
  overlay_scale_interface?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserRoaming
   * Setting name: OverlayTabs
   */
  overlay_tabs?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: OverlayToolBarListView
   */
  overlay_toolbar_list_view?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  override_browser_composer_mode?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserRoaming
   * Setting name: PlaySoundOnToast
   * Default: true
   */
  play_sound_on_toast?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: BigPicture/Monitor
   */
  preferred_monitor?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   * Setting name: ReadyToPlayIncludesStreaming
   */
  ready_to_play_includes_streaming?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: streaming_v2\WifiAPChannel5GHz
   * Default: 0
   */
  remote_play_wifi_ap_channel_5ghz?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: streaming_v2\WifiAPChannel6GHz
   * Default: 0
   */
  remote_play_wifi_ap_channel_6ghz?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: streaming_v2\WifiAPChannelWidth
   * Default: 0
   */
  remote_play_wifi_ap_channel_width?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: streaming_v2\WifiAPEnabled
   * Default: true
   */
  remote_play_wifi_ap_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: streaming_v2\WifiAPHotspotMode
   * Default: false
   */
  remote_play_wifi_ap_hotspot_mode?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: streaming_v2\WifiAPHotspotPassword
   * Default: ""
   */
  remote_play_wifi_ap_hotspot_password?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: streaming_v2\WifiAPHotspotRouting
   * Default: "noroute"
   */
  remote_play_wifi_ap_hotspot_routing?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: streaming_v2\WifiAPHotspotSSID
   * Default: ""
   */
  remote_play_wifi_ap_hotspot_ssid?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: streaming_v2\WifiAPPairedSSID
   * Default: ""
   */
  remote_play_wifi_ap_paired_ssid?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: streaming_v2/WifiAPShowAdvanced
   * Default: false
   */
  remote_play_wifi_ap_show_advanced?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  restrict_auto_updates?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  restrict_auto_updates_end?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  restrict_auto_updates_start?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  run_at_startup?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayScreenshotSaveUncompressed
   */
  save_uncompressed_screenshots?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserRoaming
   * Setting name: ScreenshotViewItemsPerRow
   * Default: 1
   */
  screenshot_items_per_row?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\InGameOverlayScreenshotHotKey
   * Default: "KEY_F12"
   */
  screenshot_key?: CMsgHotkey;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  screenshots_path?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  server_ping_rate?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SettingValidation/DummyBool
   */
  setting_validation_bool?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SettingValidation/DummyEnum
   */
  setting_validation_enum?: HDRVisualization;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SettingValidation/DummyFloat
   */
  setting_validation_float?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SettingValidation/DummyHotkey
   */
  setting_validation_hotkey?: CMsgHotkey;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SettingValidation/DummyInt32
   */
  setting_validation_int32?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SettingValidation/DummyString
   */
  setting_validation_string?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SettingValidation/DummyUInt32
   */
  setting_validation_uint32?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SettingValidation/DummyUInt64
   */
  setting_validation_uint64?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   * Setting readonly: true
   */
  shader_precached_size?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Developer/ShowAdvancedUpdateChannels
   */
  show_advanced_update_channels?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: ShowCopyCountInLibrary
   * Default: true
   */
  show_copy_count_in_library?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  show_family_sharing_notifications?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserRoaming
   * Setting name: Software\Valve\Steam\ShowScreenshotManager
   */
  show_screenshot_manager?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: ShowSteamDeckInfoInLibrary
   */
  show_steam_deck_info?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserRoaming
   * Setting name: ShowStoreContentOnHome
   * Default: true
   */
  show_store_content_on_home?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: system\ShowSwitchToDesktopAtLogin
   * Setting pre-login: true
   */
  show_switch_to_desktop_at_login?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Developer\ShowTimestampsInConsole
   */
  show_timestamps_in_console?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\SteamFrameWirelessAdapterPairingDialog
   */
  skip_steamframe_pairing_dialog?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: system\SteamVRHMDVGUIWarning
   */
  skip_steamvr_install_dialog?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Software\Valve\Steam\SmallMode
   */
  small_mode?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  smooth_scroll_webviews?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  start_in_big_picture_mode?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  start_page?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Customization/StartupMovie/MovieID
   * Setting pre-login: true
   */
  startup_movie_id?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Customization/StartupMovie/LocalPath
   * Setting pre-login: true
   */
  startup_movie_local_path?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Customization/StartupMovie/Shuffle
   * Setting pre-login: true
   */
  startup_movie_shuffle?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: Customization/StartupMovie/UsedForResume
   */
  startup_movie_used_for_resume?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_Registry
   * Setting name: HKEY_CURRENT_USER\Software\Valve\Steam\CEFGPUBlocklistDisabled
   */
  steam_cef_gpu_blocklist_disabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamInput/Configurator/ErrorMsgEnabled
   */
  steam_input_configurator_error_msg_enable?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  steam_networking_share_ip?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOSScreenUnderscanEnabled
   */
  steam_os_underscan_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOSScreenUnderscanLevel
   */
  steam_os_underscan_level?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/CECEnabled
   * Default: true
   */
  steamos_cec_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/WakeOnResume
   * Default: true
   */
  steamos_cec_wake_on_resume?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/ChargeLimit
   * Default: 80
   */
  steamos_charge_limit?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/ChargeLimitDevMode
   * Default: false
   */
  steamos_charge_limit_devmode?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/ChargeLimitEnabled
   * Default: false
   */
  steamos_charge_limit_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamOS/MagnifierScale
   * Default: 150
   */
  steamos_magnifier_scale?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/ManualGPUClockEnabled
   * Default: false
   * Setting profile mode: k_SettingProfileMode_PerGame
   */
  steamos_manual_gpu_clock_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/ManualGPUClockHz
   * Default: 1000
   * Setting profile mode: k_SettingProfileMode_PerGame
   */
  steamos_manual_gpu_clock_hz?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/PerformanceProfile
   * Setting profile mode: k_SettingProfileMode_PerGame
   */
  steamos_platform_performance_profile?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamOS/SeparaeLEDColors
   * Default: false
   */
  steamos_separate_led_colors?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamOS/StatusLEDBrightness
   * Default: 100
   */
  steamos_status_led_brightness?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamOS/SystemTracingEnabled
   * Default: false
   * Setting profile mode: k_SettingProfileMode_PerGame
   */
  steamos_system_tracing_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/TDPLimit
   * Default: 0
   * Setting profile mode: k_SettingProfileMode_PerGame
   */
  steamos_tdp_limit?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/TDPLimitEnabled
   * Default: false
   * Setting profile mode: k_SettingProfileMode_PerGame
   */
  steamos_tdp_limit_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: SteamOS/VRSEnabled
   * Default: false
   * Setting profile mode: k_SettingProfileMode_PerGame
   */
  steamos_vrs_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/WifiDebug
   * Default: false
   */
  steamos_wifi_debug?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/WifiForceWPASupplicant
   * Default: false
   */
  steamos_wifi_force_wpa_supplicant?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: SteamOS/WifiReloadDriverOnSleep
   * Default: false
   */
  steamos_wifi_reload_wifi_driver_on_sleep?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Software\Valve\Steam\System\AllowBatteryLowPowerDownloads
   * Default: false
   */
  system_allow_battery_low_power_downloads?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: System/Bluetooth/Enabled
   * Default: false
   */
  system_bluetooth_enabled?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Software\Valve\Steam\System\EnableLowPowerDownloads
   * Default: true
   */
  system_enable_low_power_downloads?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Software\Valve\Steam\System\IdleSuspendACSeconds
   * Default: 3600
   */
  system_idle_suspend_ac_sec?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_Install
   * Setting name: Software\Valve\Steam\System\IdleSuspendBatterySeconds
   * Default: 900
   */
  system_idle_suspend_battery_sec?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: CSettingsPanelGameController.TurnOff
   */
  turn_off_controller_on_exit?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  voice_mic_device_name?: string;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  voice_mic_input_gain?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  voice_push_to_talk_key?: CMsgHotkey;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  voice_push_to_talk_setting?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  voice_speaker_output_gain?: number;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_ConfigStore_UserLocal
   * Setting name: VR/ShowPerfGraphInHMD
   * Default: false
   */
  vr_show_perf_graph_in_hmd?: boolean;

  /**
   * @Options
   * Setting store: k_ClientSettingStore_CustomFunc
   */
  web_browser_home?: string;
}

export enum ClientSettingStore {
  Invalid = 0,
  ConfigStore_Install = 1,
  ConfigStore_UserRoaming = 2,
  ConfigStore_UserLocal = 3,
  Registry = 4,
  CustomFunc = 5,
}

export enum OverlayToggleBarLocation {
  Bottom = 0,
  Left = 1,
  Right = 2,
  Top = 3,
}

export enum SettingProfileMode {
  None = 0,
  PerGame = 1,
  PerGamePerDisplay = 2,
  PerDisplay = 3,
}

export enum GRAudio {
  Game = 0,
  System = 1,
  Select = 2,
}

export enum GRExportLimitType {
  Native = 0,
  FileSize = 1,
  Advanced = 2,
}

export enum FrameRateReportEnabled {
  Unset = 0,
  Enabled = 1,
  Disabled = 2,
}
