import { BluetoothDeviceType, CPUGovernor, ColorGamutLabelSet, GPUPerformanceLevel, GraphicsPerfOverlayLevel, HDRToneMapOperator, OSBranch, SDCardFormatStage, SplitScalingFilter, SplitScalingScaler, StorageBlockContentType, StorageBlockFileSystemType, StorageDriveMediaType, SystemAudioChannel, SystemAudioDirection, SystemAudioPortDirection, SystemAudioPortType, SystemDisplayCompatibilityMode, SystemFanControlMode, SystemServiceState, UpdaterState, UpdaterType } from './enums';

export interface SteamMessagesClientIClientForcedEnumDependencies {
  a?: BluetoothDeviceType;

  b?: StorageBlockContentType;

  c?: StorageBlockFileSystemType;

  d?: SDCardFormatStage;
}

export interface CMsgNetworkDeviceIP4Address {
  ip?: number;

  netmask?: number;
}

export interface CMsgNetworkDeviceIP4Config {
  addresses?: CMsgNetworkDeviceIP4Address[];

  dns_ip?: number[];

  gateway_ip?: number;

  is_default_route?: boolean;

  is_dhcp_enabled?: boolean;

  is_enabled?: boolean;
}

export interface CMsgNetworkDeviceIP6Address {
  ip?: string;
}

export interface CMsgNetworkDeviceIP6Config {
  addresses?: CMsgNetworkDeviceIP6Address[];

  dns_ip?: string[];

  gateway_ip?: string;

  is_default_route?: boolean;

  is_dhcp_enabled?: boolean;

  is_enabled?: boolean;
}

export interface CMsgNetworkDevicesData {
  devices?: CMsgNetworkDevicesData_Device[];

  is_wifi_enabled?: boolean;

  is_wifi_scanning_enabled?: boolean;
}

export interface CMsgNetworkDevicesData_Device {
  estate?: number;

  etype?: number;

  id?: number;

  ip4?: CMsgNetworkDeviceIP4Config;

  ip6?: CMsgNetworkDeviceIP6Config;

  mac?: string;

  product?: string;

  vendor?: string;

  wired?: CMsgNetworkDevicesData_Device_Wired;

  wireless?: CMsgNetworkDevicesData_Device_Wireless;
}

export interface CMsgNetworkDevicesData_Device_Wired {
  friendly_name?: string;

  is_cable_present?: boolean;

  speed_mbit?: number;
}

export interface CMsgNetworkDevicesData_Device_Wireless {
  aps?: CMsgNetworkDevicesData_Device_Wireless_AP[];

  esecurity_supported?: number;
}

export interface CMsgNetworkDevicesData_Device_Wireless_AP {
  esecurity?: number;

  estrength?: number;

  id?: number;

  is_active?: boolean;

  is_autoconnect?: boolean;

  password?: string;

  ssid?: string;

  strength_raw?: number;

  user_name?: string;
}

export interface CMsgNetworkDeviceConnect {
  ap_custom?: CMsgNetworkDeviceConnect_CustomAP;

  ap_known?: CMsgNetworkDeviceConnect_KnownAP;

  credentials?: CMsgNetworkDeviceConnect_Credentials;

  device_id?: number;

  ip4?: CMsgNetworkDeviceIP4Config;

  ip6?: CMsgNetworkDeviceIP6Config;
}

export interface CMsgNetworkDeviceConnect_KnownAP {
  ap_id?: number;
}

export interface CMsgNetworkDeviceConnect_CustomAP {
  esecurity?: number;

  ssid?: string;
}

export interface CMsgNetworkDeviceConnect_Credentials {
  password?: string;

  username?: string;
}

export interface CMsgStorageDevicesData {
  block_devices?: CMsgStorageDevicesData_BlockDevice[];

  drives?: CMsgStorageDevicesData_Drive[];

  is_trim_running?: boolean;

  is_trim_supported?: boolean;

  is_unmount_supported?: boolean;
}

export interface CMsgStorageDevicesData_Drive {
  id?: number;

  is_ejectable?: boolean;

  media_type?: StorageDriveMediaType;

  model?: string;

  serial?: string;

  size_bytes?: number;

  vendor?: string;
}

export interface CMsgStorageDevicesData_BlockDevice {
  content_type?: StorageBlockContentType;

  drive_id?: number;

  filesystem_type?: StorageBlockFileSystemType;

  friendly_path?: string;

  id?: number;

  is_formattable?: boolean;

  is_read_only?: boolean;

  is_root_device?: boolean;

  label?: string;

  mount_path?: string;

  path?: string;

  size_bytes?: number;
}

export interface CCloud_PendingRemoteOperation {
  client_id?: number;

  device_type?: number;

  machine_name?: string;

  operation?: CloudPendingRemoteOperation;

  os_type?: number;

  time_last_updated?: number;
}

export interface CMsgCloudPendingRemoteOperations {
  operations?: CCloud_PendingRemoteOperation[];
}

export interface CMsgBluetoothDevicesData {
  adapters?: CMsgBluetoothDevicesData_Adapter[];

  devices?: CMsgBluetoothDevicesData_Device[];

  manager?: CMsgBluetoothDevicesData_Manager;
}

export interface CMsgBluetoothDevicesData_Adapter {
  id?: number;

  is_discovering?: boolean;

  is_enabled?: boolean;

  mac?: string;

  name?: string;
}

export interface CMsgBluetoothDevicesData_Device {
  adapter_id?: number;

  battery_percent?: number;

  etype?: BluetoothDeviceType;

  id?: number;

  is_connected?: boolean;

  is_paired?: boolean;

  mac?: string;

  name?: string;

  strength_raw?: number;

  wake_allowed?: boolean;

  wake_allowed_supported?: boolean;
}

export interface CMsgBluetoothDevicesData_Manager {
  is_bluetooth_enabled?: boolean;
}

export interface CMsgSystemPerfDiagnosticEntry {
  name?: string;

  value?: string;
}

export interface CMsgSystemPerfNetworkInterface {
  name?: string;

  rx_bytes_per_sec?: number;

  rx_bytes_total?: number;

  timestamp?: number;

  tx_bytes_per_sec?: number;

  tx_bytes_total?: number;
}

export interface CMsgSystemPerfDiagnosticInfo {
  battery_temp_c?: number;

  entries?: CMsgSystemPerfDiagnosticEntry[];

  interfaces?: CMsgSystemPerfNetworkInterface[];
}

export interface CMsgSystemPerfLimits {
  cpu_governor_manual_max_mhz?: number;

  cpu_governor_manual_min_mhz?: number;

  disable_refresh_rate_management?: boolean;

  display_external_refresh_manual_hz_max?: number;

  display_external_refresh_manual_hz_min?: number;

  display_refresh_manual_hz_max?: number;

  display_refresh_manual_hz_min?: number;

  fps_limit_options?: number[];

  fps_limit_options_external?: number[];

  fsr_sharpness_max?: number;

  fsr_sharpness_min?: number;

  gpu_performance_levels_available?: GPUPerformanceLevel[];

  gpu_performance_manual_max_mhz?: number;

  gpu_performance_manual_min_mhz?: number;

  is_dynamic_refresh_rate_in_steam_supported?: boolean;

  is_manual_display_refresh_rate_available?: boolean;

  is_vrr_supported?: boolean;

  perf_overlay_is_standalone?: boolean;

  split_scaling_filters_available?: SplitScalingFilter[];

  split_scaling_scalers_available?: SplitScalingScaler[];

  tdp_limit_max?: number;

  tdp_limit_min?: number;
}

export interface CMsgSystemPerfSettingsGlobal {
  allow_external_display_refresh_control?: boolean;

  diagnostic_update_rate?: number;

  force_hdr_wide_gammut_for_sdr?: boolean;

  graphics_profiling_service_state?: SystemServiceState;

  hdr_on_sdr_tonemap_operator?: HDRToneMapOperator;

  is_advanced_settings_enabled?: boolean;

  is_color_management_enabled?: boolean;

  is_hdr_debug_heatmap_enabled?: boolean;

  is_show_perf_overlay_over_steam_enabled?: boolean;

  perf_overlay_level?: GraphicsPerfOverlayLevel;

  perf_overlay_service_state?: SystemServiceState;

  sdr_to_hdr_brightness?: number;
}

export interface CMsgSystemPerfSettingsPerApp {
  cpu_governor?: CPUGovernor;

  cpu_governor_manual_mhz?: number;

  display_external_refresh_manual_hz?: number;

  display_refresh_manual_hz?: number;

  fps_limit?: number;

  fps_limit_external?: number;

  fsr_sharpness?: number;

  gpu_performance_level?: GPUPerformanceLevel;

  gpu_performance_manual_mhz?: number;

  is_dynamic_refresh_rate_enabled?: boolean;

  is_fps_limit_enabled?: boolean;

  is_game_perf_profile_enabled?: boolean;

  is_low_latency_mode_enabled?: boolean;

  is_tdp_limit_enabled?: boolean;

  is_tearing_enabled?: boolean;

  is_variable_resolution_enabled?: boolean;

  is_vrr_enabled?: boolean;

  scaling_filter?: number;

  split_scaling_filter?: SplitScalingFilter;

  split_scaling_scaler?: SplitScalingScaler;

  tdp_limit?: number;

  use_dynamic_refresh_rate_in_steam?: boolean;
}

export interface CMsgSystemPerfSettings {
  global?: CMsgSystemPerfSettingsGlobal;

  per_app?: CMsgSystemPerfSettingsPerApp;
}

export interface CMsgSystemPerfSettingsV1 {
  cpu_governor?: CPUGovernor;

  cpu_governor_manual_mhz?: number;

  diagnostic_update_rate?: number;

  display_refresh_manual_hz?: number;

  fps_limit?: number;

  fsr_sharpness?: number;

  gpu_performance_level?: GPUPerformanceLevel;

  gpu_performance_manual_mhz?: number;

  graphics_profiling_service_state?: SystemServiceState;

  is_dynamic_refresh_rate_enabled?: boolean;

  is_fps_limit_enabled?: boolean;

  is_game_perf_profile_enabled?: boolean;

  is_low_latency_mode_enabled?: boolean;

  is_show_perf_overlay_over_steam_enabled?: boolean;

  is_tdp_limit_enabled?: boolean;

  is_variable_resolution_enabled?: boolean;

  perf_overlay_level?: GraphicsPerfOverlayLevel;

  perf_overlay_service_state?: SystemServiceState;

  scaling_filter?: number;

  system_trace_service_state?: SystemServiceState;

  tdp_limit?: number;
}

export interface CMsgSystemPerfState {
  active_profile_game_id?: number;

  current_game_id?: number;

  limits?: CMsgSystemPerfLimits;

  settings?: CMsgSystemPerfSettings;
}

export interface CMsgSystemPerfUpdateSettings {
  gameid?: number;

  reset_to_default?: boolean;

  settings_delta?: CMsgSystemPerfSettings;

  skip_storage_update?: boolean;
}

export interface CMsgSystemPerfLegacySettingEntry {
  profile_game_id?: number;

  settings?: CMsgSystemPerfSettingsPerApp;
}

export interface CMsgSystemPerfLegacySettings {
  global?: CMsgSystemPerfSettingsGlobal;

  per_app_settings?: CMsgSystemPerfLegacySettingEntry[];
}

export interface CMsgSystemDockUpdateState {
  old_fw_workaround?: number;

  rtime_estimated_completion?: number;

  rtime_last_checked?: number;

  stage_progress?: number;

  state?: UpdaterState;

  version_available?: string;

  version_current?: string;
}

export interface CMsgSystemDockState {
  update_state?: CMsgSystemDockUpdateState;
}

export interface CMsgSystemDockUpdateFirmware {
  check_only?: boolean;
}

export interface CMsgSystemAudioVolume {
  entries?: CMsgSystemAudioVolume_ChannelEntry[];

  is_muted?: boolean;
}

export interface CMsgSystemAudioVolume_ChannelEntry {
  echannel?: SystemAudioChannel;

  volume?: number;
}

export interface CMsgSystemAudioManagerObject {
  id?: number;

  rtime_last_update?: number;
}

export interface CMsgSystemAudioManagerDevice {
  api?: string;

  base?: CMsgSystemAudioManagerObject;

  description?: string;

  name?: string;

  nick?: string;
}

export interface CMsgSystemAudioManagerNode {
  base?: CMsgSystemAudioManagerObject;

  description?: string;

  device_id?: number;

  edirection?: SystemAudioDirection;

  name?: string;

  nick?: string;

  volume?: CMsgSystemAudioVolume;
}

export interface CMsgSystemAudioManagerPort {
  alias?: string;

  base?: CMsgSystemAudioManagerObject;

  edirection?: SystemAudioPortDirection;

  etype?: SystemAudioPortType;

  is_control?: boolean;

  is_monitor?: boolean;

  is_physical?: boolean;

  is_terminal?: boolean;

  name?: string;

  node_id?: number;
}

export interface CMsgSystemAudioManagerLink {
  base?: CMsgSystemAudioManagerObject;

  input_node_id?: number;

  input_port_id?: number;

  output_node_id?: number;

  output_port_id?: number;
}

export interface CMsgSystemAudioManagerStateHW {
  devices?: CMsgSystemAudioManagerDevice[];

  links?: CMsgSystemAudioManagerLink[];

  nodes?: CMsgSystemAudioManagerNode[];

  ports?: CMsgSystemAudioManagerPort[];
}

export interface CMsgSystemAudioManagerState {
  counter?: number;

  hw?: CMsgSystemAudioManagerStateHW;

  rtime_filter?: number;
}

export interface CMsgSystemAudioManagerUpdateSomething {
  counter?: number;
}

export interface CMsgSystemDisplayMode {
  height?: number;

  id?: number;

  refresh_hz?: number;

  width?: number;
}

export interface CMsgSystemDisplay {
  current_mode_id?: number;

  description?: string;

  has_mode_override?: boolean;

  height_mm?: number;

  id?: number;

  is_enabled?: boolean;

  is_hdr_capable?: boolean;

  is_hdr_output_active?: boolean;

  is_internal?: boolean;

  is_primary?: boolean;

  is_vrr_capable?: boolean;

  is_vrr_output_active?: boolean;

  modes?: CMsgSystemDisplayMode[];

  name?: string;

  refresh_rate_max?: number;

  refresh_rate_min?: number;

  supported_refresh_rates?: number[];

  width_mm?: number;
}

export interface CMsgSystemDisplayManagerState {
  compatibility_mode?: SystemDisplayCompatibilityMode;

  displays?: CMsgSystemDisplay[];

  is_mode_switching_supported?: boolean;
}

export interface CMsgSystemDisplayManagerSetMode {
  display_id?: number;

  mode_id?: number;
}

export interface CMsgSystemManagerSettings {
  als_lux_alternate?: number;

  als_lux_median?: number;

  als_lux_primary?: number;

  display_adaptive_brightness_enabled?: boolean;

  display_backlight_raw?: number;

  display_brightness_adaptivemax?: number;

  display_brightness_adaptivemin?: number;

  display_brightness_overdrive_hdr_split?: number;

  display_colorgamut?: number;

  display_colorgamut_labelset?: ColorGamutLabelSet;

  display_colortemp?: number;

  display_colortemp_default?: number;

  display_colortemp_enabled?: boolean;

  display_diagnostics_enabled?: boolean;

  display_nightmode_blend?: number;

  display_nightmode_enabled?: boolean;

  display_nightmode_maxhue?: number;

  display_nightmode_maxsat?: number;

  display_nightmode_reset?: boolean;

  display_nightmode_schedule_enabled?: boolean;

  display_nightmode_schedule_endtime?: number;

  display_nightmode_schedule_starttime?: number;

  display_nightmode_tintstrength?: number;

  display_nightmode_uiexp?: number;

  fan_control_mode?: SystemFanControlMode;

  idle_backlight_dim_ac_seconds?: number;

  idle_backlight_dim_battery_seconds?: number;

  idle_suspend_ac_seconds?: number;

  idle_suspend_battery_seconds?: number;

  idle_suspend_supressed?: boolean;

  is_adaptive_brightness_available?: boolean;

  is_display_brightness_available?: boolean;

  is_display_colormanagement_available?: boolean;

  is_display_colortemp_available?: boolean;

  is_fan_control_available?: boolean;

  is_wifi_powersave_enabled?: boolean;
}

export interface CMsgSelectOSBranchParams {
  branch?: OSBranch;

  custom_branch?: string;
}

export interface CMsgSystemUpdateProgress {
  rtime_estimated_completion?: number;

  stage_progress?: number;

  stage_size_bytes?: number;
}

export interface CMsgSystemUpdateCheckResult {
  auto_message?: string;

  available?: boolean;

  eresult?: number;

  rtime_checked?: number;

  system_restart_pending?: boolean;

  type?: UpdaterType;

  version?: string;
}

export interface CMsgSystemUpdateApplyParams {
  apply_types?: UpdaterType[];
}

export interface CMsgSystemUpdateApplyResult {
  eresult?: number;

  requires_client_restart?: boolean;

  requires_system_restart?: boolean;

  type?: UpdaterType;
}

export interface CMsgSystemUpdateState {
  progress?: CMsgSystemUpdateProgress;

  state?: UpdaterState;

  supports_os_updates?: boolean;

  update_apply_results?: CMsgSystemUpdateApplyResult[];

  update_check_results?: CMsgSystemUpdateCheckResult[];
}

export interface CMsgAchievementChange {
  appid?: number;
}

export interface CMsgCellList {
  cells?: CMsgCellList_Cell[];
}

export interface CMsgCellList_Cell {
  cell_id?: number;

  loc_name?: string;
}

export interface CMsgShortcutInfo {
  allow_desktop_config?: boolean;

  allow_overlay?: boolean;

  app_name?: string;

  appid?: number;

  args?: string;

  devkit_gameid?: string;

  exe?: string;

  flatpak_appid?: string;

  icon?: string;

  is_devkit_shortcut?: boolean;

  is_hidden?: boolean;

  is_openvr?: boolean;

  is_temporary?: boolean;

  override_appid?: number;

  path?: string;

  remote_client_id?: number;

  remote_launch_available?: boolean;

  rt_last_played_time?: number;

  sortas?: string;

  start_dir?: string;

  tags?: string[];
}

export interface CMsgShortcutInfos {
  shorcuts?: CMsgShortcutInfo[];
}

export interface CMsgShortcutAppIds {
  appids?: number[];
}

export interface CMsgMonitorInfo {
  monitors?: CMsgMonitorInfo_MonitorInfo[];

  selected_display_name: string;
}

export interface CMsgMonitorInfo_MonitorInfo {
  monitor_device_name: string;

  monitor_display_name: string;
}

export interface CMsgGenerateSystemReportReply {
  report_id?: string;
}

export interface CMsgWebUITransportInfo {
  auth_key?: string;

  port?: number;
}

export interface CMsgWebUITransportFailure {
  connect_count?: number;
}

export interface CMsgClientShaderHitCacheEntry {
  code_sha?: Uint8Array;

  key_sha?: Uint8Array;

  time_last_reported?: number;
}

export interface CMsgClientShaderHitCache {
  entries?: CMsgClientShaderHitCacheEntry[];
}

export enum CloudPendingRemoteOperation {
  None = 0,
  AppSessionActive = 1,
  UploadInProgress = 2,
  UploadPending = 3,
  AppSessionSuspended = 4,
}

export enum SteamDeckKeyboardLayout {
  QWERTY = 0,
  Bulgarian = 1,
  Chinese_Simplified = 2,
  Chinese_Traditional = 3,
  Czech = 4,
  Danish = 5,
  Finnish = 6,
  French = 7,
  German = 8,
  Greek = 9,
  Hungarian = 10,
  Italian = 11,
  Japanese = 12,
  Korean = 13,
  Norwegian = 14,
  Polish = 15,
  Portuguese = 16,
  Romanian = 17,
  Russian = 18,
  Spanish = 19,
  Swedish = 20,
  Thai = 21,
  Turkish_F = 22,
  Turkish_Q = 23,
  Ukrainian = 24,
  Vietnamese = 25,
  QWERTY_International = 26,
  Dvorak = 27,
  Colemak = 28,
  Bulgarian_Phonetic_Traditional = 29,
  Bulgarian_Phonetic = 30,
  Chinese_Traditional_Bopomofo = 31,
  Chinese_Traditional_Cangjie = 32,
  Japanese_Kana = 33,
  Chinese_Traditional_Quick = 34,
  Indonesian = 35,
}
