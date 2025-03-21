import { JsPbMessage, Unregisterable } from '../shared';

// CMsgSystemPerfUpdateSettings, CMsgSystemPerfState, CMsgSystemPerfSettings
export interface Perf {
  /**
   * If `data` is deserialized, returns {@link MsgSystemPerfDiagnosticInfo}.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForDiagnosticInfoChanges(callback: (data: ArrayBuffer) => void): Unregisterable;

  /**
   * If `data` is deserialized, returns {@link MsgSystemPerfState}.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForStateChanges(callback: (data: ArrayBuffer) => void): Unregisterable;

  UpdateSettings(base64: string): unknown; // serialize
}

/**
 * CMsgSystemPerfDiagnosticInfo
 */
export interface MsgSystemPerfDiagnosticInfo extends JsPbMessage {
  battery_temp_c(): number | undefined;

  entries(): SystemPerfDiagnosticEntry[] | undefined;

  interfaces(): SystemPerfNetworkInterface[] | undefined;
}

export interface SystemPerfDiagnosticEntry {
  name: string | undefined;
  value: string | undefined;
}

export interface SystemPerfNetworkInterface {
  name: string | undefined;
  rx_bytes_per_sec: number | undefined;
  rx_bytes_total: number | undefined;
  timestamp: number | undefined;
  tx_bytes_per_sec: number | undefined;
  tx_bytes_total: number | undefined;
}

/**
 * CMsgSystemPerfState
 */
export interface MsgSystemPerfState extends JsPbMessage {
  active_profile_game_id(): string | undefined;

  current_game_id(): string | undefined;

  limits(): SystemPerfLimits | undefined;

  settings(): SystemPerfSettings | undefined;
}

export interface SystemPerfLimits {
  cpu_governor_manual_max_mhz: number | undefined;
  cpu_governor_manual_min_mhz: number | undefined;
  disable_refresh_rate_management: boolean | undefined;
  display_external_refresh_manual_hz_max: number | undefined;
  display_external_refresh_manual_hz_min: number | undefined;
  display_refresh_manual_hz_max: number | undefined;
  display_refresh_manual_hz_min: number | undefined;
  display_refresh_manual_hz_oc_max: number | undefined;
  fps_limit_options: number[] | undefined;
  fps_limit_options_external: number[] | undefined;
  fsr_sharpness_max: number | undefined;
  fsr_sharpness_min: number | undefined;
  gpu_performance_levels_available: EGPUPerformanceLevel[];
  gpu_performance_manual_max_mhz: number | undefined;
  gpu_performance_manual_min_mhz: number | undefined;
  is_dynamic_refresh_rate_in_steam_supported: boolean | undefined;
  is_dynamic_vrs_available: boolean | undefined;
  is_hdr_supported: boolean | undefined;
  is_manual_display_refresh_rate_available: boolean | undefined;
  is_nis_supported: boolean | undefined;
  is_split_scaling_and_filtering_supported: boolean | undefined;
  is_tearing_supported: boolean | undefined;
  is_vrr_supported: boolean | undefined;
  nis_sharpness_max: number | undefined;
  nis_sharpness_min: number | undefined;
  perf_overlay_is_standalone: boolean | undefined;
  split_scaling_filters_available: ESplitScalingFilter[];
  split_scaling_scalers_available: ESplitScalingScaler[];
  tdp_limit_max: number | undefined;
  tdp_limit_min: number | undefined;
}

export enum EGPUPerformanceLevel {
  Invalid,
  Auto,
  Manual,
  Low,
  High,
  Profiling,
}

export enum ESplitScalingFilter {
  Invalid,
  Linear,
  Nearest,
  FSR,
  NIS,
}

export enum ESplitScalingScaler {
  Invalid,
  Auto,
  Integer,
  Fit,
  Fill,
  Stretch,
}

export interface SystemPerfSettings {
  global: SystemPerfSettingsGlobal | undefined;
  per_app: SystemPerfSettingsPerApp | undefined;
}

export interface SystemPerfSettingsGlobal {
  allow_experimental_hdr: boolean;
  allow_external_display_refresh_control: boolean;
  debug_force_hdr_support: boolean;
  diagnostic_update_rate: number;
  force_hdr_10pq_output_debug: boolean;
  force_hdr_wide_gammut_for_sdr: boolean;
  graphics_profiling_service_state: ESystemServiceState;
  hdr_on_sdr_tonemap_operator: EHDRToneMapOperator;
  is_advanced_settings_enabled: boolean;
  is_color_management_enabled: boolean;
  is_display_oc_enabled: boolean;
  is_hdr_debug_heatmap_enabled: boolean;
  is_hdr_enabled: boolean;
  is_show_perf_overlay_over_steam_enabled: boolean;
  perf_overlay_level: EGraphicsPerfOverlayLevel;
  perf_overlay_service_state: ESystemServiceState;
  sdr_to_hdr_brightness: number;
  system_trace_service_state: ESystemServiceState;
}

export enum ESystemServiceState {
  Unavailable,
  Disabled,
  Enabled,
}

export enum EGraphicsPerfOverlayLevel {
  Hidden,
  Basic,
  Medium,
  Full,
  Minimal,
}

export enum EHDRToneMapOperator {
  Invalid,
  Uncharted,
  Reinhard,
}

export interface SystemPerfSettingsPerApp {
  cpu_governor: ECPUGovernor | undefined;
  cpu_governor_manual_mhz: number | undefined;
  display_external_refresh_manual_hz: number | undefined;
  display_refresh_manual_hz: number | undefined;
  force_composite: boolean | undefined;
  fps_limit: number | undefined;
  fps_limit_external: number | undefined;
  fsr_sharpness: number | undefined;
  gpu_performance_level: EGPUPerformanceLevel | undefined;
  gpu_performance_manual_mhz: number | undefined;
  is_composite_debug_enabled: boolean | undefined;
  is_dynamic_refresh_rate_enabled: boolean | undefined;
  is_fps_limit_enabled: boolean | undefined;
  is_game_perf_profile_enabled: boolean | undefined;
  is_low_latency_mode_enabled: boolean | undefined;
  is_tdp_limit_enabled: boolean | undefined;
  is_tearing_enabled: boolean | undefined;
  is_variable_resolution_enabled: boolean | undefined;
  is_vrr_enabled: boolean | undefined;
  nis_sharpness: number | undefined;
  scaling_filter: number | undefined;
  split_scaling_filter: ESplitScalingFilter | undefined;
  split_scaling_scaler: ESplitScalingScaler | undefined;
  tdp_limit: number | undefined;
  use_dynamic_refresh_rate_in_steam: boolean | undefined;
}

export enum ECPUGovernor {
  Invalid,
  Perf,
  Powersave,
  Manual,
}
