import { GameRecordingType } from './enums';

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
  date_recorded?: number;

  duration_ms?: number;

  game_id?: number;

  phases?: CGameRecordingPhase[];

  recordings?: CGameRecordingTimelineMetadata_Recording[];

  significant_events?: CGameRecordingTimelineEvent[];

  timeline_id?: string;
}

export interface CGameRecordingTimelineMetadata_Recording {
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
