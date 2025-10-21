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

  published_file_id?: string;

  size_in_bytes?: number;

  tags?: CGameRecordingTag[];

  temporary?: boolean;

  thumbnail_height?: number;

  thumbnail_width?: number;

  timelines?: CGameRecordingTimelineMetadata[];
}

export interface CGameRecordingTimelineMetadata {
  /** Unix timestamp when this timeline was recorded */
  date_recorded?: number;

  /** Duration in milliseconds (as string) */
  duration_ms?: number;

  /** Steam game ID */
  game_id?: number;

  /** Optional phase information */
  phases?: CGameRecordingPhase[];

  /** Array of recordings within this timeline */
  recordings?: CGameRecordingTimelineMetadata_Recording[];

  /** Optional significant events within this timeline */
  significant_events?: CGameRecordingTimelineEvent[];

  /** Unique identifier for this timeline */
  timeline_id?: string;
}

export interface CGameRecordingTimelineMetadata_Recording {
  cdn_manifest_url?: string;

  delete_on_cleanup?: boolean;

  /** Duration of this recording in milliseconds (as string) */
  duration_ms?: number;

  /** Optional file size of the recording */
  file_size?: number;

  /** Unique identifier for this recording */
  recording_id?: string;

  recording_type?: GameRecordingType;

  /** Offset in MS where recording zero aligns with timeline */
  recording_zero_timeline_offset_ms?: number;

  /** Start offset of this recording within the timeline in milliseconds (as string) */
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

  references?: CGameRecordingTag_Timeline[];

  tag?: CTimelineTag;
}

export interface CGameRecordingTag_Timeline {
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

  contained_tags?: CGameRecordingPhase_Tag[];

  duration_ms?: number;

  phase_id?: string;

  tags?: CGameRecordingPhase_Tag[];
}

export interface CGameRecordingPhase_Tag {
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

export interface WebUINoResponse {
}

export enum GameRecordingType {
  Unknown = 0,
  NotRecording = 1,
  ManualRecording = 2,
  BackgroundRecording = 3,
  Clip = 4,
}
