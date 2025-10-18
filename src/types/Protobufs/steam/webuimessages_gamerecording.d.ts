export interface CGameRecording_GetAppsWithBackgroundVideo_Response {
  apps?: App[];
}

export interface App {
  file_size?: number;
  game_id?: number;
  is_active?: boolean;
  most_recent_start_time?: number;
  recording_type?: GameRecordingType;
  timeline_duration_seconds?: number;
  video_duration_seconds?: number;
}

export interface CGameRecording_GetTimelinesForApp_Request {
  game_id?: number;
}

export interface CGameRecording_GetTimelinesForApp_Response {
  timelines?: CGameRecordingTimelineMetadata[];
}

export interface CGameRecording_GetTimelinesForClip_Request {
  clip_id?: string;
}

export interface CGameRecording_GetTimelinesForClip_Response {
  first_timeline_start_offset_ms?: number;
  game_id?: number;
  timelines?: CGameRecordingTimelineMetadata[];
}

export interface CGameRecording_QueryPhases_Request {
  count?: number;
  filter_gameid?: number;
  filter_phase_id?: string;
  filter_search_string?: string;
  filter_tags?: Tag[];
  page?: number;
}

export interface Tag {
  group?: string;
  name?: string;
}

export interface CGameRecording_QueryPhases_Response {
  phases?: Phase[];
  total_count?: number;
}

export interface Phase {
  active?: boolean;
  attributes?: CPhaseAttribute[];
  background_recording?: BackgroundRecording;
  clip_ids?: string[];
  contained_tags?: CTimelineTag[];
  date_recorded?: number;
  duration_ms?: number;
  game_id?: number;
  phase_id?: string;
  screenshots?: number[];
  significant_events?: CTimelineEntry[];
  start_ms?: number;
  tags?: CTimelineTag[];
  type?: PhaseResultType;
}

export interface BackgroundRecording {
  duration_ms?: number;
  offset?: number;
  timeline_id?: string;
}

export interface CGameRecording_GetTags_Request {
  game_id?: number;
}

export interface CGameRecording_GetTags_Response {
  tags?: CTimelineTag[];
}

export interface CGameRecording_GetEnoughDiskSpace_Response {
  enough_space?: boolean;
}

export interface CGameRecording_GetAvailableDiskSpace_Response {
  size?: number;
}

export interface CGameRecording_TimelineChanged_Notification {
  duration_ms?: number;
  game_id?: number;
  notification_type?: TimelineChangeNotificationType;
  start_time?: number;
  timeline_id?: string;
}

export interface CGameRecording_RecordingSessionChanged_Notification {
  duration_ms?: number;
  game_id?: number;
  notification_type?: RecordingSessionChangeNotificationType;
  recording_type?: GameRecordingType;
  session_id?: string;
  start_offset?: number;
  timeline_id?: string;
}

export interface CTimelineEntry {
  achievement_name?: string;
  attributes?: CPhaseAttribute[];
  entry_id?: number;
  game_mode?: number;
  marker_description?: string;
  marker_icon?: string;
  marker_priority?: number;
  phase_id?: string;
  range_duration?: number;
  range_possible_clip?: number;
  range_title?: string;
  screenshot_handle?: number;
  tag?: CTimelineTag[];
  time?: number;
  timeline_id?: string;
  timestamp_title?: string;
  type?: TimelineEntryType;
}

export interface CGameRecording_TimelineEntryChanged_Notification {
  entry?: CTimelineEntry;
  game_id?: number;
}

export interface CGameRecording_TimelineEntryRemoved_Notification {
  entry_id?: number;
  game_id?: number;
  timeline_id?: string;
}

export interface CGameRecording_PostGameHighlightsChanged_Notification {
  game_id?: number;
}

export interface CGameRecording_OpenOverlayToGamePhase_Notification {
  game_id?: number;
  phase_id?: string;
}

export interface CGameRecording_OpenOverlayToTimelineEvent_Notification {
  entry_id?: number;
  game_id?: number;
}

export interface CGameRecording_ClipSummary {
  clip_id?: string;
  date_clipped?: number;
  date_downloaded?: number;
  date_recorded?: number;
  duration_ms?: number;
  file_size?: number;
  game_id?: number;
  name?: string;
  original_device?: string;
  original_gaming_device_type?: number;
  published_file_id?: number;
  start_offset_ms?: number;
  start_timeline_id?: string;
  temporary?: boolean;
  thumbnail_height?: number;
  thumbnail_url?: string;
  thumbnail_width?: number;
}

export interface CGameRecording_SaveClip_Request {
  end?: Position;
  force_thumbnail?: boolean;
  game_id?: number;
  name?: string;
  src_clip_id?: string;
  start?: Position;
  temporary?: boolean;
}

export interface Position {
  offset_ms?: number;
  timeline_id?: string;
}

export interface CGameRecording_SaveClip_Response {
  summary?: CGameRecording_ClipSummary;
}

export interface CGameRecording_DeleteClip_Request {
  clip_id?: string;
}

export interface CGameRecording_ExportClip_Settings {
  bitrate_kbps?: number;
  codec?: ExportCodec;
  frames_per_second?: number;
  height?: number;
  width?: number;
}

export interface CGameRecording_ExportClip_Request {
  clip_id?: string;
  export_mp4_path?: string;
  settings?: CGameRecording_ExportClip_Settings;
  use_unique_filename?: boolean;
}

export interface CGameRecording_ExportClipPreview_Request {
  clip_id?: string;
  run_policy_checks?: boolean;
  settings?: CGameRecording_ExportClip_Settings;
}

export interface CGameRecording_ExportClipPreview_Response {
  estimated_size?: number;
  settings?: CGameRecording_ExportClip_Settings;
}

export interface CGameRecording_TakeScreenshot_Request {
  game_id?: number;
  timeline_id?: string;
  timeline_offset_ms?: number;
}

export interface CGameRecording_TakeScreenshot_Response {
  screenshot_id?: number;
}

export interface CGameRecording_UploadClipToSteam_Request {
  clip_id?: string;
  desc?: string;
  title?: string;
  visibility?: number;
}

export interface CGameRecording_UploadClipToSteam_Response {
  summary?: CGameRecording_ClipSummary;
}

export interface CGameRecording_ZipClip_Request {
  clip_id?: string;
}

export interface CGameRecording_ZipClip_Response {
  zip_path?: string;
}

export interface CGameRecording_GetClips_Request {
  created_after?: number;
  game_id?: number;
  include_temporary?: boolean;
}

export interface CGameRecording_GetClips_Response {
  clip?: CGameRecording_ClipSummary[];
}

export interface CGameRecording_GetAndTrimPostGameHighlights_Request {
  created_after?: number;
  game_id?: number;
}

export interface CGameRecording_GetAndTrimPostGameHighlights_Response {
  events?: CGameRecordingTimelineEvent[];
}

export interface CGameRecording_UserAddTimelineEntry_Request {
  clip_id?: string;
  entry?: CTimelineEntry;
  game_id?: number;
}

export interface CGameRecording_UserAddTimelineEntry_Response {
  entry_id?: number;
}

export interface CGameRecording_UserUpdateTimelineEntry_Request {
  clip_id?: string;
  entry?: CTimelineEntry;
  game_id?: number;
}

export interface CGameRecording_UserRemoveTimelineEntry_Request {
  clip_id?: string;
  entry_id?: number;
  game_id?: number;
  timeline_id?: string;
}

export interface CGameRecording_ManuallyDeleteRecordingsForApps_Request {
  game_ids?: number[];
}

export interface CGameRecording_GetTotalDiskSpaceUsage_Request {
  folder_path?: string;
  type?: DiskSpaceType;
}

export interface CGameRecording_GetTotalDiskSpaceUsage_Response {
  size?: number;
}

export interface CGameRecording_GetThumbnails_Request {
  clip_id?: string;
  format?: ThumbnailFormat;
  major_axis?: number;
  recording_id?: string;
  start_offset_us?: number[];
  time_precision?: ThumbnailTimePrecision;
  timeline_id?: string;
}

export interface CGameRecording_GetThumbnails_Response {
  thumbnails?: Thumbnail[];
}

export interface Thumbnail {
  height?: number;
  image_data?: Uint8Array;
  width?: number;
}

export interface CGameRecording_StartRecording_Request {
  game_id?: number;
}

export interface CGameRecording_StopRecording_Request {
  game_id?: number;
}

export interface CGameRecording_StopRecording_Response {
  summary?: CGameRecording_ClipSummary;
}

export interface CGameRecording_GetRecordingSize_Request {
  game_id?: number;
}

export interface CGameRecording_GetRecordingSize_Response {
  file_size?: number;
}

export interface CGameRecording_GetPlatformCapabilities_Response {
  per_process_audio_capture?: boolean;
}

export interface CGameRecording_ClipCreated_Notification {
  summary?: CGameRecording_ClipSummary;
}

export interface CGameRecording_ClipDeleted_Notification {
  clip_id?: string;
  game_id?: number;
}

export interface CGameRecording_ExportProgress_Notification {
  clip_id?: string;
  eresult?: number;
  progress?: number;
}

export interface CGameRecording_PerGameSettings {
  bitrate?: string;
  enabled?: boolean;
  gameid?: number;
  infinite?: boolean;
  minutes?: number;
}

export interface CGameRecording_GetPerGameSettings_Response {
  settings?: CGameRecording_PerGameSettings[];
}

export interface CGameRecording_SetPerGameSettings_Request {
  game_settings?: CGameRecording_PerGameSettings;
}

export interface CGameRecording_DeletePerGameSettings_Request {
  gameid?: number;
}

export interface CGameRecording_UploadProgress_Notification {
  clip_id?: string;
  eresult?: number;
  progress?: number;
}

export interface CGameRecording_SwitchBackgroundRecordingGame_Request {
  game_id?: number;
}

export interface CGameRecordingFile {
  postgame_events?: CGameRecordingPostGameSummary[];
  tags?: CGameRecordingTag[];
  temporary_clips?: string[];
  timelines?: CGameRecordingTimelineMetadata[];
}

export interface CGameRecordingClipFile {
  date_downloaded?: number;
  date_recorded?: number;
  first_timeline_start_offset_ms?: number;
  game_id?: number;
  name?: string;
  original_device?: string;
  original_gaming_device_type?: number;
  phases?: CGameRecordingPhase[];
  published_file_id?: number;
  size_in_bytes?: number;
  tags?: CGameRecordingTag[];
  temporary?: boolean;
  thumbnail_height?: number;
  thumbnail_width?: number;
  timelines?: CGameRecordingTimelineMetadata[];
}

export interface CGameRecordingTimelineMetadata {
  date_recorded?: number;
  duration_ms?: number;
  game_id?: number;
  phases?: CGameRecordingPhase[];
  recordings?: Recording[];
  significant_events?: CGameRecordingTimelineEvent[];
  timeline_id?: string;
}

export interface Recording {
  cdn_manifest_url?: string;
  delete_on_cleanup?: boolean;
  duration_ms?: number;
  file_size?: number;
  recording_id?: string;
  recording_type?: GameRecordingType;
  recording_zero_timeline_offset_ms?: number;
  start_offset_ms?: number;
  video_manager_clip_id?: number;
  video_manager_video_id?: number;
}

export interface CGameRecordingPostGameSummary {
  events?: CGameRecordingTimelineEvent[];
  game_id?: number;
}

export interface CGameRecordingTimelineEvent {
  duration_ms?: number;
  entry_id?: number;
  game_id?: number;
  marker_icon?: string;
  marker_title?: string;
  possible_clip?: number;
  rt_created?: number;
  timeline_id?: string;
  timeline_offset_ms?: number;
  user_marker?: boolean;
}

export interface CGameRecordingTag {
  game_id?: number;
  references?: Timeline[];
  tag?: CTimelineTag;
}

export interface Timeline {
  clip_id?: string;
  offset_ms?: number;
  timeline_id?: string;
}

export interface CGameRecordingTagInstance {
  duration_ms?: number;
  entry_id?: number;
  timeline_id?: string;
  timeline_offset_ms?: number;
}

export interface CGameRecordingPhase {
  attributes?: CPhaseAttribute[];
  background_timeline_offset?: number;
  contained_tags?: Tag[];
  duration_ms?: number;
  phase_id?: string;
  tags?: Tag[];
}

export interface Tag {
  group?: string;
  name?: string;
}

export interface CTimelineTag {
  group?: string;
  icon?: string;
  name?: string;
  priority?: number;
}

export interface CPhaseAttribute {
  group?: string;
  priority?: number;
  value?: string;
}

export enum TimelineEntryType {
  Invalid = 0,
  GameMode = 1,
  Event = 2,
  StateDescription = 3,
  Achievement = 4,
  UserMarker = 5,
  Screenshot = 6,
  Error = 7,
  Tag = 8,
  GamePhase = 9,
}

export enum PhaseResultType {
  Automatic = 1,
  Blank = 2,
  API = 3,
}

export enum TimelineChangeNotificationType {
  Started = 1,
  Stopped = 2,
  Deleted = 3,
  RecordingStarted = 4,
  RecordingStopped = 5,
  RecordingUpdated = 6,
}

export enum RecordingSessionChangeNotificationType {
  Started = 1,
  Stopped = 2,
  Deleted = 3,
  Updated = 4,
}

export enum DiskSpaceType {
  eDiskSpaceType_Recording = 0,
  eDiskSpaceType_Clip = 1,
}

export enum ThumbnailTimePrecision {
  ePrecise = 0,
  eLoose = 1,
}

export enum ThumbnailFormat {
  eJPEG = 1,
  eRGB = 2,
}

export enum GameRecordingType {
  Unknown = 0,
  NotRecording = 1,
  ManualRecording = 2,
  BackgroundRecording = 3,
  Clip = 4,
}

export enum ExportCodec {
  Default = 0,
  H264 = 1,
  H265 = 2,
}
