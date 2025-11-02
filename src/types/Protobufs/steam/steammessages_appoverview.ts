import { ProtoAppType } from './enums';

export interface CAppOverview_PerClientData {
  active_beta?: string;

  client_name?: string;

  clientid?: number;

  display_status?: DisplayStatus;

  installed?: boolean;

  is_available_on_current_platform?: boolean;

  is_invalid_os_type?: boolean;

  playtime_left?: number;

  status_percentage?: number;

  streaming_to_local_client?: boolean;

  update_available_but_disabled_by_app?: boolean;
}

export interface CAppOverview {
  album_cover_hash?: string;

  app_type?: ProtoAppType;

  appid?: number;

  display_name?: string;

  display_name_elanguage?: number;

  gameid?: string;

  has_custom_sort_as?: boolean;

  header_filename?: string;

  icon_data?: string;

  icon_data_format?: string;

  icon_hash?: string;

  library_capsule_filename?: string;

  library_id?: string;

  local_cache_version?: number;

  mastersub_appid?: number;

  mastersub_includedwith_logo?: string;

  metacritic_score?: number;

  minutes_playtime_forever?: number;

  minutes_playtime_last_two_weeks?: number;

  most_available_clientid?: number;

  mru_index?: number;

  number_of_copies?: number;

  optional_parent_app_id?: number;

  owner_account_id?: number;

  per_client_data?: CAppOverview_PerClientData[];

  review_percentage_with_bombs?: number;

  review_percentage_without_bombs?: number;

  review_score_with_bombs?: number;

  review_score_without_bombs?: number;

  rt_custom_image_mtime?: number;

  rt_last_time_locally_played?: number;

  rt_last_time_played?: number;

  rt_original_release_date?: number;

  rt_purchased_time?: number;

  rt_recent_activity_time?: number;

  rt_steam_release_date?: number;

  rt_store_asset_mtime?: number;

  selected_clientid?: number;

  shortcut_override_appid?: number;

  site_license_site_name?: string;

  size_on_disk?: number;

  sort_as?: string;

  steam_hw_compat_category_packed?: number;

  store_category?: number[];

  store_tag?: number[];

  subscribed_to?: boolean;

  third_party_mod?: boolean;

  visible_in_game_list?: boolean;

  vr_only?: boolean;

  vr_supported?: boolean;

  xbox_controller_support?: AppControllerSupportLevel;
}

/**
 * Use {@link CAppOverview_Change_Protobuf} to deserialize/serialize data.
 */
export interface CAppOverview_Change {
  app_overview?: CAppOverview[];

  full_update?: boolean;

  removed_appid?: number[];

  update_complete?: boolean;
}

export enum DisplayStatus {
  Invalid = 0,
  Launching = 1,
  Uninstalling = 2,
  Installing = 3,
  Running = 4,
  Validating = 5,
  Updating = 6,
  Downloading = 7,
  Synchronizing = 8,
  ReadyToInstall = 9,
  ReadyToPreload = 10,
  ReadyToLaunch = 11,
  RegionRestricted = 12,
  PresaleOnly = 13,
  InvalidPlatform = 14,
  PreloadComplete = 16,
  BorrowerLocked = 17,
  UpdatePaused = 18,
  UpdateQueued = 19,
  UpdateRequired = 20,
  UpdateDisabled = 21,
  DownloadPaused = 22,
  DownloadQueued = 23,
  DownloadRequired = 24,
  DownloadDisabled = 25,
  LicensePending = 26,
  LicenseExpired = 27,
  AvailForFree = 28,
  AvailToBorrow = 29,
  AvailGuestPass = 30,
  Purchase = 31,
  Unavailable = 32,
  NotLaunchable = 33,
  CloudError = 34,
  CloudOutOfDate = 35,
  Terminating = 36,
  OwnerLocked = 37,
  DownloadFailed = 38,
  UpdateFailed = 39,
}

export enum AppCloudStatus {
  Invalid = 0,
  Disabled = 1,
  Unknown = 2,
  Synchronized = 3,
  Checking = 4,
  OutOfSync = 5,
  Uploading = 6,
  Downloading = 7,
  SyncFailed = 8,
  Conflict = 9,
  PendingElsewhere = 10,
}

export enum AppControllerSupportLevel {
  None = 0,
  Partial = 1,
  Full = 2,
}

export enum AppGamepadGyroTrackpadSupportLevel {
  Unknown = -1,
  NoGamepad = 0,
  Gamepad = 1,
  Simultaneous = 2,
}

export enum AppHDRSupport {
  EHDRSupport_Unknown = 0,
  EHDRSupport_SDR = 1,
  EHDRSupport_HDR = 2,
  EHDRSupport_HDR_Broken = 3,
  EHDRSupport_HDR_RequiresUserAction = 4,
}
