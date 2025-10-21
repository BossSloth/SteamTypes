import { ObservableMap } from 'mobx';
import { GameRecordingRequestHandler } from '../Modules/GameRecordingRequestHandler';
import { CGameRecording_ClipSummary, CGameRecording_GetAppsWithBackgroundVideo_Response_App, CGameRecording_RecordingSessionChanged_Notification, CTimelineEntry } from '../Protobufs';

export interface GameRecordingService {
  BEnoughDiskSpace(): boolean;

  BLoadingAppsWithBackgroundVideo(): boolean;

  BLoadingClips(): boolean;

  CheckEnoughDiskSpace(): Promise<void>;

  CreateUserTimelineMarkers(game_id: string, clip_id: string, entry: CTimelineEntry): Promise<{ eResult: number; entry_id: string; }>;

  DeleteClip(clip_id: string): Promise<number>;

  ExportClip(clip_id: string, export_mp4_path: string, settings: unknown, use_unique_filename: boolean): Promise<number>;

  GetAchievementInfo(game_id: string, achievement_name: string): { name: string; description: string; iconURL: string; } | null | undefined;

  GetAppsWithBackgroundVideo(): AppWithBackgroundVideo[];

  GetAvailableDiskSpace(): Promise<string>;

  GetBestClipTitle(clip_id: string): string;

  GetClipExportProgress(clip_id: string): ClipExportProgress | undefined;

  GetClipIDs(game_id?: string): string[];

  GetClipSummaries(clip_ids: string[]): (CGameRecording_ClipSummary | undefined)[];

  GetClipSummariesForGame(game_id: string): CGameRecording_ClipSummary[] | null;

  GetClipSummary(clip_id: string): CGameRecording_ClipSummary | undefined;

  GetCurrentExportingClip(): string | null;

  GetLastClip(): CGameRecording_ClipSummary | undefined;

  GetRecordingHighlights(game_id: string, created_after: number): Promise<TimelineEvent[]>;

  GetRecordingState(): RecordingState | null;

  GetTimelineLoaderForClip(clip_id: string): { loader: TimelineLoader; release: () => void; };

  GetTimelineLoaderForGame(game_id: string): { loader: TimelineLoader; release: () => void; };

  GetTimelineLoaderForSharedClip(shared_clip: SharedClip): { loader: TimelineLoader; release: () => void; };

  GetTotalDiskSpaceUsage(folder_path: string, is_temporary: boolean): Promise<number>;

  Init(transport: Transport, fnGetAchievementInfo: (game_id: string, achievement_name: string) => { name: string; description: string; iconURL: string; } | null): Promise<void>;

  InternalAddClipSummary(clip_summary: CGameRecording_ClipSummary): void;

  LazyLoadClips(): Promise<void>;

  LoadAppsWithBackgroundVideo(): Promise<undefined>;

  LoadThumbnails(recording_id: string, clip_id: string, timeline_id: string, start_offset_us: number[], major_axis: number, time_precision_us: boolean): Promise<unknown>;

  m_fnGetAchievementInfo(game_id: string, achievement_name: string): { name: string; description: string; iconURL: string; } | null;

  ManuallyDeleteRecordingForApps(game_ids: string[]): void;

  OnClipCreated(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyClipCreated']>[0] extends (notification: infer N) => void ? N : never): number;

  OnExportProgress(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyExportProgress']>[0] extends (notification: infer N) => void ? N : never): number;

  OnLowDiskSpace(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyLowDiskSpace']>[0] extends (notification: infer N) => void ? N : never): number;

  OnRecordingSessionChanged(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyRecordingSessionChanged']>[0] extends (notification: infer N) => void ? N : never): number;

  OnTimelineChanged(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyTimelineChanged']>[0] extends (notification: infer N) => void ? N : never): number;

  OnTimelineEntryChanged(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyTimelineEntryChanged']>[0] extends (notification: infer N) => void ? N : never): number;

  OnTimelineEntryRemoved(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyTimelineEntryRemoved']>[0] extends (notification: infer N) => void ? N : never): number;

  RegisterManualRecordingCallback(game_id: string, callback: (notification: RecordingSessionChangedNotification) => void): () => void;

  ReloadAppsWithBackgroundVideoIfNecessary(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyTimelineChanged']>[0] extends (notification: infer N) => void ? N : never): void;

  RemoveUserTimelineMarker(game_id: string, clip_id: string, timeline_id: string, entry_id: string): Promise<number>;

  ReportClipRange(game_id: GameID, original_range_method: number, seconds: number, start: RangeEndpoint, end: RangeEndpoint): void;

  ReportClipShare(game_id: GameID, share_method: number, seconds: number, bytes: number, eresult: number): void;

  SaveClip(game_id: string, src_clip_id: string, name: string, start: number, end: number, temporary: boolean, force_thumbnail: boolean): Promise<{ clipSummary: CGameRecording_ClipSummary; result: number; } | { result: number; clipSummary?: undefined; }>;

  StartRecording(game_id: string): Promise<ReturnType<GameRecordingRequestHandler['StartRecording']>>;

  StopRecording(game_id: string): Promise<void>;

  SwitchRecordedGame(game_id: string): Promise<ReturnType<GameRecordingRequestHandler['SwitchBackgroundRecordingGame']>>;

  TakeScreenshot(game_id: string, timeline_id: string, timeline_offset_ms: number): Promise<{ handle: number; result: number; } | { result: number; handle?: undefined; }>;

  UpdateClipExportPath(clip_id: string, export_path: string): void;

  UpdateUserTimelineMarkers(game_id: string, clip_id: string, entry: CTimelineEntry): Promise<number>;

  UploadClip(clip_id: string, title: string, desc: string, visibility: number): Promise<{ eResult: number; strURL: string | undefined; }>;

  m_bClipLoadingTriggered: boolean;

  m_bEnoughDiskSpace: boolean;

  m_bLoadingAppsWithBackgroundVideo: boolean;

  m_bLoadingClips: boolean;

  m_clipExportProgress: Map<string, ClipExportProgress>;

  m_clips: ObservableMap<string, CGameRecording_ClipSummary>;

  m_clipsGroupByGame: ObservableMap<string, CGameRecording_ClipSummary[]>;

  m_currentlyExportingClip: string | null;

  m_mapActiveTimelines: Map<string, TimelineLoaderWithRefCount>;

  m_mapClipLoaders: Map<string, TimelineLoaderWithRefCount>;

  m_mapManualRecordingCallbacks: Map<string, (notification: RecordingSessionChangedNotification) => void>;

  m_mapSharedClipLoaders: Map<string, TimelineLoaderWithRefCount>;

  m_mapTimelineLoaders: Map<string, TimelineLoaderWithRefCount>;

  m_recordingState: RecordingState | null;

  m_rgAppsWithBackgroundVideo: AppWithBackgroundVideo[];

  m_strLastClipID: string | undefined;

  m_transport: Transport;
}

export type AppWithBackgroundVideo = CGameRecording_GetAppsWithBackgroundVideo_Response_App;

export interface Transport {
  /**
   * @native
   */
  MakeReady(): unknown;

  SendMsg(e: unknown, t: unknown, n: unknown): unknown;

  SendNotification(e: unknown, t: unknown): unknown;
}

export interface TimelineLoader {
  AddEventToTimeline(timeline_id: string, time: number, marker_icon: string, entry_id: string, marker_priority: number, range_title: string, marker_description: string, range_duration: number): void;

  AddRunningTimeline(timeline_id: string, game_id: string, start_time: number): void;

  AddRunningTimelineEntry(entry: CTimelineEntry): void;

  BIsTimelineRunning(timeline_id: string): boolean;

  LoadTimelinesForBackgroundVideo(game_id: string): void;

  LoadTimelinesForClip(clip_id: string): void;

  LoadTimelinesForSharedClip(shared_clip: SharedClip): void;

  RecordingSessionChanged(notification: RecordingSessionChangedNotification): void;

  RemoveTimelineEvent(timeline_id: string, entry_id: string): void;

  RunningTimelineStopped(timeline_id: string, duration_ms: number): void;

  TimelineDeleted(timeline_id: string): void;
}

export interface TimelineLoaderWithRefCount {
  loader: TimelineLoader;

  nRefCount: number;
}

export interface ClipExportProgress {
  exportPath: string;

  progress: number;

  resultStatus: number;
}

export interface RecordingState {
  m_gameID: string;
}

export type TimelineEvent = Record<string, unknown>;

export interface SharedClip extends Record<string, unknown> {
  clip_id: string;
}

export type RecordingSessionChangedNotification = CGameRecording_RecordingSessionChanged_Notification;

export interface GameID {
  ConvertTo64BitString(): string;
}

export interface RangeEndpoint {
  latestRangeMethod: number;

  originalRangeMethod: number;

  relativeMS: number;
}
