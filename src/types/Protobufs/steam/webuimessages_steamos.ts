import { SLSHelper } from './enums';

export interface CMsgFactoryResetState {
  is_restart_pending?: boolean;

  is_running?: boolean;

  progress?: number;

  rtime_estimated_completion?: number;
}

export interface CSteamOSManagerState {
  charge_limit_default?: number;

  charge_limit_max?: number;

  charge_limit_min?: number;

  desktop_session_default?: string;

  desktop_sessions_available?: string[];

  factory_reset_state?: CMsgFactoryResetState;

  is_cec_available?: boolean;

  is_charge_limit_available?: boolean;

  is_mandatory_update_available?: boolean;

  is_manual_gpu_clock_available?: boolean;

  is_password_change_supported?: boolean;

  is_screen_reader_supported?: boolean;

  is_service_available?: boolean;

  is_session_management_supported?: boolean;

  is_status_led_control_available?: boolean;

  is_system_tracing_available?: boolean;

  is_tdp_limit_available?: boolean;

  is_vrs_available?: boolean;

  is_wifi_debug_force_disabled?: boolean;

  is_wifi_debug_supported?: boolean;

  is_wifi_driver_reload_available?: boolean;

  is_wifi_force_wpa_supplicant_supported?: boolean;

  manual_gpu_clock_max?: number;

  manual_gpu_clock_min?: number;

  os_version?: string;

  platform_performance_profile_default?: string;

  platform_performance_profiles_available?: string[];

  screen_reader_locale_default?: string;

  screen_reader_locales_available?: string[];

  tdp_limit_max?: number;

  tdp_limit_min?: number;
}

export interface CSteamOSManager_GetState_Request { }

export interface CSteamOSManager_GetState_Response {
  state?: CSteamOSManagerState;
}

export interface CSteamOSManager_StateChanged_Notification { }

export interface CSteamOSManager_IsTelemetryHelperAvailable_Request {
  etype?: SLSHelper;
}

export interface CSteamOSManager_IsTelemetryHelperAvailable_Response {
  available?: boolean;
}

export interface CSteamOSManager_OptOutOfSideloadedClient_Request { }

export interface CSteamOSManager_OptOutOfSideloadedClient_Response { }

export interface CSteamOSManager_ApplyMandatoryUpdate_Request { }

export interface CSteamOSManager_ApplyMandatoryUpdate_Response { }

export interface CSteamOSManager_FactoryReset_Request {
  reset_os?: boolean;

  reset_user_data?: boolean;
}

export interface CSteamOSManager_FactoryReset_Response { }

export interface CSteamOSManager_RefreshScreenReaderAutoLocale_Request { }

export interface CSteamOSManager_RefreshScreenReaderAutoLocale_Response { }

export interface CSteamOS_SetUserPassword_Request {
  current_password?: string;

  new_password?: string;
}

export interface CSteamOS_SetUserPassword_Response { }

export interface CSteamOS_GetUserHasPassword_Request { }

export interface CSteamOS_GetUserHasPassword_Response {
  has_password?: boolean;
}

export interface CSteamOSManager_PrepareFactoryImageTest_Request {
  factory_reset?: boolean;
}

export interface CSteamOSManager_PrepareFactoryImageTest_Response { }

export interface CSteamOSManager_SwitchToDesktop_Request { }

export interface CSteamOSManager_SwitchToDesktop_Response { }

export interface CSteamOSManager_SetDefaultDesktopSession_Request {
  session_name?: string;
}

export interface CSteamOSManager_SetDefaultDesktopSession_Response { }

export interface CSteamOSSLSPlugin {
  etype?: SLSHelper;

  is_available?: boolean;

  is_enabled?: boolean;
}

export interface CSteamOSSLSState {
  is_available?: boolean;

  is_enabled?: boolean;

  plugins?: CSteamOSSLSPlugin[];
}

export interface CSteamOSSLS_GetState_Request { }

export interface CSteamOSSLS_GetState_Response {
  state?: CSteamOSSLSState;
}

export interface CSteamOSSLS_StateChanged_Notification { }

export interface CSteamOSSLS_SetEnabled_Request {
  enabled?: boolean;
}

export interface CSteamOSSLS_SetEnabled_Response { }

export interface CSteamOSSLS_SetPluginEnabled_Request {
  enabled?: boolean;

  etype?: SLSHelper;
}

export interface CSteamOSSLS_SetPluginEnabled_Response { }
