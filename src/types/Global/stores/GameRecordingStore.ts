import { ObservableMap } from 'mobx';
import { GameRecordingRequestHandler } from 'Modules/GameRecordingRequestHandler';
import { CGameRecording_ClipSummary, CGameRecording_GetAppsWithBackgroundVideo_Response_App, CGameRecording_RecordingSessionChanged_Notification, CTimelineEntry } from 'Protobufs';
import { CGameRecordingTimelineMetadata, CGameRecordingTimelineMetadata_Recording } from 'Protobufs/steam/webuimessages_gamerecordingfiles';

export interface GameRecordingStore {
  BEnoughDiskSpace(): boolean;

  BLoadingAppsWithBackgroundVideo(): boolean;

  BLoadingClips(): boolean;

  CheckEnoughDiskSpace(): Promise<void>;

  CreateUserTimelineMarkers(gameId: string, clipId: string, entry: CTimelineEntry): Promise<{ eResult: number; entry_id: string; }>;

  DeleteClip(clipId: string): Promise<number>;

  ExportClip(clipId: string, exportMp4Path: string, settings: unknown, useUniqueFilename: boolean): Promise<number>;

  GetAchievementInfo(gameId: string, achievementName: string): { name: string; description: string; iconURL: string; } | null | undefined;

  GetAppsWithBackgroundVideo(): AppWithBackgroundVideo[];

  GetAvailableDiskSpace(): Promise<string>;

  GetBestClipTitle(clipId: string): string;

  GetClipExportProgress(clipId: string): ClipExportProgress | undefined;

  GetClipIDs(gameId?: string): string[];

  GetClipSummaries(clipIds: string[]): (CGameRecording_ClipSummary | undefined)[];

  GetClipSummariesForGame(gameId: string): CGameRecording_ClipSummary[] | null;

  GetClipSummary(clipId: string): CGameRecording_ClipSummary | undefined;

  GetCurrentExportingClip(): string | null;

  GetLastClip(): CGameRecording_ClipSummary | undefined;

  GetRecordingHighlights(gameId: string, createdAfter: number): Promise<TimelineEvent[]>;

  GetRecordingState(): RecordingState | null;

  GetTimelineLoaderForClip(clipId: string): { loader: TimelineLoader; release: () => void; };

  GetTimelineLoaderForGame(gameId: string): { loader: TimelineLoader; release: () => void; };

  GetTimelineLoaderForSharedClip(sharedClip: SharedClip): { loader: TimelineLoader; release: () => void; };

  GetTotalDiskSpaceUsage(folderPath: string, isTemporary: boolean): Promise<number>;

  Init(transport: Transport, fnGetAchievementInfo: (gameId: string, achievementName: string) => { name: string; description: string; iconURL: string; } | null): Promise<void>;

  InternalAddClipSummary(clipSummary: CGameRecording_ClipSummary): void;

  LazyLoadClips(): Promise<void>;

  LoadAppsWithBackgroundVideo(): Promise<undefined>;

  LoadThumbnails(recordingId: string, clipId: string, timelineId: string, startOffsetUs: number[], majorAxis: number, timePrecisionUs: boolean): Promise<unknown>;

  m_fnGetAchievementInfo(gameId: string, achievementName: string): { name: string; description: string; iconURL: string; } | null;

  ManuallyDeleteRecordingForApps(gameIds: string[]): void;

  OnClipCreated(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyClipCreated']>[0] extends (notification: infer N) => void ? N : never): number;

  OnExportProgress(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyExportProgress']>[0] extends (notification: infer N) => void ? N : never): number;

  OnLowDiskSpace(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyLowDiskSpace']>[0] extends (notification: infer N) => void ? N : never): number;

  OnRecordingSessionChanged(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyRecordingSessionChanged']>[0] extends (notification: infer N) => void ? N : never): number;

  OnTimelineChanged(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyTimelineChanged']>[0] extends (notification: infer N) => void ? N : never): number;

  OnTimelineEntryChanged(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyTimelineEntryChanged']>[0] extends (notification: infer N) => void ? N : never): number;

  OnTimelineEntryRemoved(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyTimelineEntryRemoved']>[0] extends (notification: infer N) => void ? N : never): number;

  RegisterManualRecordingCallback(gameId: string, callback: (notification: RecordingSessionChangedNotification) => void): () => void;

  ReloadAppsWithBackgroundVideoIfNecessary(notification: Parameters<GameRecordingRequestHandler['RegisterForNotifyTimelineChanged']>[0] extends (notification: infer N) => void ? N : never): void;

  RemoveUserTimelineMarker(gameId: string, clipId: string, timelineId: string, entryId: string): Promise<number>;

  ReportClipRange(gameId: GameID, originalRangeMethod: number, seconds: number, start: RangeEndpoint, end: RangeEndpoint): void;

  ReportClipShare(gameId: GameID, shareMethod: number, seconds: number, bytes: number, eresult: number): void;

  SaveClip(gameId: string, srcClipId: string, name: string, start: number, end: number, temporary: boolean, forceThumbnail: boolean): Promise<{ clipSummary: CGameRecording_ClipSummary; result: number; } | { result: number; clipSummary?: undefined; }>;

  StartRecording(gameId: string): Promise<ReturnType<GameRecordingRequestHandler['StartRecording']>>;

  StopRecording(gameId: string): Promise<void>;

  SwitchRecordedGame(gameId: string): Promise<ReturnType<GameRecordingRequestHandler['SwitchBackgroundRecordingGame']>>;

  TakeScreenshot(gameId: string, timelineId: string, timelineOffsetMs: number): Promise<{ handle: number; result: number; } | { result: number; handle?: undefined; }>;

  UpdateClipExportPath(clipId: string, exportPath: string): void;

  UpdateUserTimelineMarkers(gameId: string, clipId: string, entry: CTimelineEntry): Promise<number>;

  UploadClip(clipId: string, title: string, desc: string, visibility: number): Promise<{ eResult: number; strURL: string | undefined; }>;

  m_bClipLoadingTriggered: boolean;

  m_bEnoughDiskSpace: boolean;

  m_bLoadingAppsWithBackgroundVideo: boolean;

  m_bLoadingClips: boolean;

  m_clipExportProgress: Map<string, ClipExportProgress>;

  m_clips: ObservableMap<string, CGameRecording_ClipSummary>;

  m_clipsGroupByGame: ObservableMap<string, CGameRecording_ClipSummary[]>;

  m_currentlyExportingClip: string | null;

  m_mapActiveTimelines: Map<string, TimelineLoaderWithReleaseFunction>;

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

export interface TimelineLoaderWithRefCount {
  loader: ActiveTimelineLoader | TimelineLoader;

  nRefCount: number;
}

export interface TimelineLoader {
  AddEventToTimeline(timelineId: string, time: number, markerIcon: string, entryId: string, markerPriority: number, rangeTitle: string, markerDescription: string, rangeDuration: number): boolean;

  AddRunningTimeline(timelineId: string, gameId: string, startTime: number): void;

  AddRunningTimelineEntry(entry: CTimelineEntry): void;

  BIsTimelineRunning(timelineId: string): boolean;

  LoadTimelinesForBackgroundVideo(gameId: string): Promise<void>;

  LoadTimelinesForClip(clipId: string): Promise<void>;

  LoadTimelinesForSharedClip(sharedClip: SharedClip): void;

  RecordingSessionChanged(notification: RecordingSessionChangedNotification): undefined;

  RemoveTimelineEvent(timelineId: string, entryId: string): boolean;

  RunningTimelineStopped(timelineId: string, durationMs: number): void;

  TimelineDeleted(timelineId: string): void;
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

export interface TimelineLoaderWithReleaseFunction {
  release(): void;

  loader: ActiveTimelineLoader;
}

/**
 * Timeline loader for game recordings.
 * Manages timeline metadata, recordings, and playback coordination.
 */
export interface ActiveTimelineLoader extends TimelineLoader {
  /** Adds an event listener and returns a function to remove it */
  AddEventListener(e: unknown): () => unknown;

  AddUserMarker(e: unknown, t: unknown, r: unknown, n: unknown): boolean;

  AdvanceEntriesIndex(e: unknown): void;

  AdvanceGameModeIndex(e: unknown): void;

  AdvanceIterator(e: unknown, t: unknown): undefined;

  /** Returns whether the timeline loader has been initialized */
  BInitialized(): boolean;

  BRecordingHasZeroOffset(e: unknown): boolean;

  /** Clamps a global time range to fit within a specific timeline's bounds */
  ClampGlobalRangeToTimeline(timelineId: string, startMS: number, endMS: number): [number, number];

  /** Converts a global offset to a specific recording ID and relative offset within that recording */
  ConvertGlobaOffsetToRecordingAndRelativeOffset(globalOffsetMS: number): { strRecordingID: string; nRecordingOffsetMS: number; nStartOffsetMS: number; } | null;

  /** Converts a recording offset to a global timeline offset */
  ConvertRecordingOffsetToGlobalOffset(recordingId: string, offsetMS: number, rounding: number): { nGlobalOffsetMS: number; nRoundedDurationMS: number; strTimelineID: string; nTimelineOffsetMS: number; } | null;

  ConvertRecordingTimeMStoPreTrimTimeMS(e: unknown, t: unknown): unknown;

  CreateGlobalRangeForTimeline(e: unknown, t: unknown, r: unknown, n: unknown): unknown;

  CreateTimelineIterator(e: unknown, t: unknown): { m_timeline: unknown; m_data: unknown; m_nTimelineOffsetMS: number; m_iGameModeChanges: number; m_iEntries: number; };

  FindRangeEventsAtGlobalMS(e: unknown): never[];

  FindRecordingAndOffsetForEntry(e: unknown): Promise<{ strRecordingID: unknown; nRecordingOffsetMS: number; nStartOffsetMS: number; } | undefined>;

  /** Finds the timeline at a specific global offset */
  FindTimelineAtOffset(globalOffsetMS: number, rounding: number): { timeline: TimelineMetadata; nTimelineOffsetMS: number; ulGlobalToTimelineOffset: number; } | null;

  FireEvent(e: unknown, ...t: unknown[]): void;

  GenerateClipNameFromTimeline(e: unknown, t: unknown, r: unknown, n: unknown): Promise<string>;

  GenerateNamePartsFromTimeline(e: unknown, t: unknown, r: unknown, n: unknown): Promise<{ strTimelinePart: unknown; strAppNamePart: unknown; rtStart: unknown; rtEnd: unknown; }>;

  /** Returns the clip ID if this loader is for a clip */
  GetClipID(): ActiveTimelineLoader['m_clipID'];

  GetClosestNextEntryInGlobalTimeline(e: unknown): { timelineID: unknown; timelineState: unknown; entry: unknown; globalMS: unknown; };

  GetClosestNextEntryInTimeline(e: unknown, t: unknown): { entry: null; timelineState: unknown; };

  /** Gets the next recording after the specified global offset */
  GetClosestNextRecordingInGlobalTimeline(globalOffsetMS: GlobalOffsetMS): RunningRecording | null;

  GetClosestPreviousEntryInGlobalTimeline(e: unknown): { timelineID: unknown; timelineState: unknown; entry: unknown; globalMS: unknown; };

  GetClosestPreviousEntryInTimeline(e: unknown, t: unknown): { entry: null; timelineState: unknown; };

  /** Gets the previous recording before the specified global offset */
  GetClosestPreviousRecordingInGlobalTimeline(globalOffsetMS: GlobalOffsetMS): RunningRecording | null;

  GetEndOfRecordingsMS(): unknown;

  GetFirstRecording(): unknown;

  GetFirstRecordingOfLastTimelineSession(): unknown;

  /** Returns the game ID associated with these timelines */
  GetGameID(): string;

  /** Gets the global offset data for a specific timeline */
  GetGlobalOffsetDataForTimeline(timelineId: string, rounding: number): { nGlobalOffsetMS: number; nRoundedDurationMS: number; } | null;

  GetGlobalTimelineEndMS(): unknown;

  GetIteratorEntriesWithin(e: unknown, t: unknown): Generator<unknown, void, unknown>;

  GetIteratorGameMode(e: unknown): unknown;

  GetIteratorGameModesWithin(e: unknown, t: unknown): Generator<unknown, void, unknown>;

  GetIteratorTimelineState(e: unknown): unknown;

  GetNextRecording(e: unknown): unknown;

  /** Gets the duration of a running (active) timeline in milliseconds */
  GetRunningTimelineDurationMS(timelineId: string): number;

  /** Gets the running timeline data for a specific recording */
  GetRunningTimelineForRecording(timelineId: string, recordingId: string): RunningTimeline | null;

  GetStateDescriptionAtGlobalMS(e: unknown): unknown;

  /** Gets the timeline data (entries, game modes, phases) for a specific timeline */
  GetTimelineData(timelineId: string): TimelineData | undefined;

  /** Gets timeline data or starts loading it if not already loaded */
  GetTimelineDataOrStartLoad(timelineId: string): TimelineData | undefined;

  GetTimelineDateMS(globalOffsetMS: number, rounding: number): unknown;

  /** Gets metadata for a specific timeline by ID */
  GetTimelineMetadata(timelineId: string): TimelineMetadata | undefined;

  /** Gets the index of a timeline in the metadata array */
  GetTimelineMetadataIndex(timelineId: string): number;

  /** Converts a global offset to a timeline-specific offset */
  GetTimelineOffsetFromGlobal(globalOffsetMS: number, rounding: number): { strTimelineID: string | undefined; nTimelineOffsetMS: GlobalOffsetMS; };

  /** Returns all timeline metadata */
  GetTimelines(): TimelineMetadata[];

  GetTimelineStartBeforeGlobalZeroMS(e: unknown): unknown;

  GetTotalRecordingDuration(): number;

  HasIteratorReachedEnd(e: unknown): boolean;

  InsertEntryIntoTimelineSorted(e: unknown, t: unknown): void;

  /** Checks if a recording is currently active (running) */
  IsActiveRecording(recordingId: string): boolean;

  /** Checks if a timeline is currently active (running) */
  IsActiveTimeline(timelineId: string): boolean;

  /** Loads timeline data from the URL builder, fetching entries and metadata */
  LoadTimelineData(timelineId: string): Promise<void>;

  LoadTimelinesForTestClip(e: unknown, t: unknown, r: unknown, n: unknown): void;

  LoadTimelinesForTestGame(e: unknown, t: unknown): void;

  /** Function that builds URLs for loading timeline data */
  m_fnTimelineURLBuilder?(timelineId: string): string;

  /** If timeline is active, converts absolute offset to relative-to-end offset */
  MakeRelativeToTimelineEndIfActive(timelineId: string, offsetMS: number): number;

  /** Processes raw timeline entries, sorting them by type and time */
  ProcessTimelineEntries(rawData: { entries?: unknown[]; }): TimelineData;

  RemoveUserMarker(e: unknown, t: unknown): boolean;

  SetPreloadedTimelines(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): void;

  SetTimelineData(e: unknown, t: unknown): void;

  UpdateRunningTimelines(): void;

  /** Updates the timeline metadata array, sorting by date recorded */
  UpdateTimelineMetadata(timelines: Metadata[]): void;

  UpdateUserMarker(e: unknown, t: unknown, r: unknown): boolean;

  /** Whether the loader has been initialized */
  m_bInitialized: boolean;

  /** Clip ID if this loader is for a specific clip */
  m_clipID: string | undefined;

  /** Game ID for the recordings */
  m_gameID: string;

  /** Map of currently running timelines by timeline ID */
  m_mapRunningTimelines: Map<string, RunningTimeline>;

  /** Map of loaded timeline data by timeline ID */
  m_mapTimelineData: Map<string, TimelineData>;

  /** Array of event listeners for timeline events */
  m_rgListeners: (RgListeners | RgListeners2)[];

  /** Array of timeline metadata sorted by date recorded */
  m_rgTimelineMetadata: TimelineMetadata[];

  /** Scheduler for updating running timelines */
  m_schUpdateRunning: SchUpdateRunning;

  /** Offset in MS of the first timeline's start time */
  m_ulFirstTimelineOffsetMS: number;
}

/** Runtime data for an actively running timeline */
export interface RunningTimeline {
  /** Global start time in milliseconds */
  m_globalStartMS: number;

  /** Timeline metadata */
  m_metadata: Metadata;

  /** Performance counter offset in milliseconds */
  m_nPerfCounterOffsetMS: number;

  /** Performance counter start time */
  m_perfCounterStart: number;

  /** Currently running recording */
  m_runningRecording: RunningRecording;
}

/** Timeline metadata from the server */
export type Metadata = CGameRecordingTimelineMetadata;

/** Individual recording data within a timeline */
export type RunningRecording = CGameRecordingTimelineMetadata_Recording;

/** Loaded timeline data containing events, game modes, and phases */
export interface TimelineData {
  /** Timeline entries (achievements, events, screenshots, user markers) */
  m_rgEntries: RgEntries[];

  /** Game mode changes within this timeline */
  m_rgGameModeChanges: GameModeChangeEvent[];

  /** Phase information */
  m_rgPhases: unknown[];

  /** State descriptions */
  m_rgStateDescriptions: unknown[];

  /** Load state: 'loading', 'loaded', or 'error' */
  m_strState: string;
}

export interface RgEntries {
  description: string;

  duration: string;

  icon: string;

  id: string;

  possible_clip: number;

  priority: number;

  time: string;

  title: string;

  type: string;
}

/** Game mode change event within a timeline */
export interface GameModeChangeEvent {
  /** Unique ID for this game mode change */
  id: string;

  /** Game mode identifier */
  mode: number;

  /** Time offset in milliseconds (as string) */
  time: string;

  /** Type identifier (typically 'gamemode') */
  type: string;
}

/** Timeline metadata with global offset information */
export interface TimelineMetadata {
  /** Timeline metadata from server */
  metadata: Metadata;

  /** Global offset in milliseconds for this timeline */
  nGlobalOffsetMS: GlobalOffsetMS;
}

/** Wrapper for global offset values in milliseconds */
export interface GlobalOffsetMS {
  /** Type identifier */
  type: string;

  /** Value in milliseconds */
  valMS: number;
}

/** Scheduler for periodic updates of running timelines */
export interface SchUpdateRunning {
  /** Cancels the scheduled update */
  Cancel(): void;

  /** Returns whether an update is currently scheduled */
  IsScheduled(): boolean;

  /** @native */
  m_fnCallback?(): unknown;

  /** Schedules an update with specified parameters */
  Schedule(e: unknown, t: unknown): void;

  /** Internal scheduled callback */
  ScheduledInternal(): void;

  /** Timer handle or undefined */
  m_schTimer: number | undefined;
}

export interface RgListeners {
  AddEventListener(e: unknown): () => unknown;

  AddUserMarkerAtGlobalMS(e: unknown, t: unknown, r: unknown): Promise<void>;

  BInitialized(): unknown;

  BIsVideoElementPaused(): unknown;

  BPlayerInitialized(): unknown;

  CalculateNextHighlightEntry(e: unknown, t: unknown): void;

  CalculatePreviousHighlightEntry(e: unknown, t: unknown): void;

  CanModeAddMarker(): boolean;

  /** @param t default: 0 */
  ChangePlaybackRecording(e: unknown, t?: number, r?: unknown): undefined;

  ClearPlaybackStop(): void;

  ClearRelativeTimeDisplay(): void;

  ConvertGlobalOffsetToTimelineRelativeOffset(e: unknown): unknown;

  ConvertGlobaOffsetToRecordingAndRelativeOffset(e: unknown): unknown;

  dispose(): void;

  FireEvent(e: unknown, ...t: unknown[]): void;

  FocusGlobalMS(e: unknown): void;

  GenerateClipNameFromTimeline(e: unknown, t: unknown, r: unknown, n: unknown): unknown;

  GetClipID(): unknown;

  GetClipOffsets(): unknown;

  GetClipsAtGlobalMS(e: unknown): unknown;

  GetClosestNextRecordingForGlobalMS(e: unknown): unknown;

  GetClosestPreviousRecordingForGlobalMS(e: unknown): unknown;

  GetControlsVisible(): unknown;

  /** @param e default: 0 */
  GetCurrentPlaybackGlobalMS(e?: number): unknown;

  GetDisplayHighlightEntry(): unknown;

  GetGameID(): unknown;

  GetGamepadMode(): unknown;

  GetGameRecordingVideo(): unknown;

  GetGlobalMSPlaytime(): unknown;

  GetGlobalPlaytimeSec(): unknown;

  GetHidePlayer(): unknown;

  GetIsActiveTimeline(e: unknown): unknown;

  GetIsLiveEdge(): unknown;

  GetLiveEdgeBufferWindowStartMS(): unknown;

  GetLiveEdgeMS(): unknown;

  GetLoader(): unknown;

  GetManifestFromRecordingID(e: unknown): unknown;

  GetNextHighlightEntry(): unknown;

  GetPhasePreview(): unknown;

  GetPlaybackStats(): { nMean: number; nStdDev: number; nMax: number; nMin: number; nLength: unknown; nLastVal: unknown; } | null;

  GetPreviousHighlightEntry(): unknown;

  GetRecordingID(): unknown;

  GetRecordingMode(): unknown;

  GetRecordingSetting(): unknown;

  GetRecordingState(): unknown;

  GetRelativeTimeForDisplay(): unknown;

  GetRenderGlyph(): unknown;

  /** @param e default: 0 */
  GetTimelineAndOffsetRelativeToCurrentPlayback(e?: number): unknown;

  GetTimelineDuration(e: unknown): number | null;

  GetTimelineFirstRecordingOffset(e: unknown): number | null;

  GetTotalMS(): unknown;

  GetTotalSeconds(): number;

  HandleSeekToNextRecording(e: unknown, t: unknown, r: unknown): void;

  HandleSeekToPreviousRecording(e: unknown, t: unknown, r: unknown): void;

  m_fnGetManifest(e: unknown): string;

  m_fnUnregisterLoader(): unknown;

  MakeRelativeToTimelineEndIfActive(e: unknown, t: unknown): unknown;

  OnInvalidate(e: unknown): void;

  OnInvalidateRecording(e: unknown, t: unknown): void;

  OnLoaderInitialized(): void;

  OnTimelineLoaded(e: unknown): void;

  PlayNextTimelineRecording(e: unknown): undefined;

  RemoveUserMarker(e: unknown, t: unknown): Promise<boolean>;

  SeekDeltaMS(e: unknown): undefined;

  SetClipOffsets(e: unknown): void;

  SetControlsVisible(e: unknown): void;

  SetDisplayHighlightEntry(e: unknown, t: unknown): void;

  SetEntriesForLiveEdge(): void;

  SetGamepadMode(e: unknown): void;

  SetGetManifest(e: unknown): void;

  SetHidePlayer(e: unknown): void;

  SetLoader(e: unknown): void;

  SetPhasePreview(e: unknown): void;

  SetPlaybackStop(e: unknown): void;

  SetPlaytimeFromGlobalMS(e: unknown, t: unknown, r: unknown, n: unknown): void;

  SetPlaytimeFromRecordingOffset(e: unknown, t: unknown, r: unknown, n: unknown): void;

  SetRecordingSetting(e: unknown): void;

  SetRecordingState(e: unknown): void;

  SetRenderGlyph(e: unknown): void;

  SetVideoElement(e: unknown): void;

  ShouldModeShowClipControls(): boolean;

  StartPlaybackForRange(): Promise<void>;

  StopPlayback(): void;

  TogglePlayPause(): void;

  TryPlayInitialTimelineVideo(): void;

  UpdateGlobalPlayTime(e: unknown): void;

  UpdateUserMarker(e: unknown, t: unknown, r: unknown, n: unknown): Promise<boolean>;

  m_bControlsVisible: boolean;

  m_bGamepadMode: undefined;

  m_bHidePlayer: boolean;

  m_bWasLiveEdge: boolean;

  m_displayHighlightEntry: null;

  m_durationMS: GlobalOffsetMS;

  m_eGameRecordingMode: string;

  m_eRecordingSetting: string;

  m_eRecordingState: string;

  m_fnRenderGlyph: undefined;

  m_fnUnregisterAutorun: unknown[];

  m_gameRecordingVideo: GameRecordingVideo;

  m_lastRecordingGlobalMS: GlobalOffsetMS;

  m_nextHighlightEntry: null;

  m_nGlobalTimelinePlaybackMS: null;

  m_nGlobalTimelinePlaybackSec: null;

  m_nPendingSeekSec: number;

  m_nRelativeTimeForDisplay: undefined;

  m_pendingStop: null;

  m_phasePreview: undefined;

  m_playbackDefinition: undefined;

  m_previousHighlightEntry: PreviousHighlightEntry;

  m_rgClipOffsets: unknown[];

  m_rgListeners: RgListeners3[];

  m_rgSeekPerf: unknown[];

  m_strRecordingID: null;

  m_timelineLoader: ActiveTimelineLoader;

  m_videoRef: undefined;
}

export interface GameRecordingVideo {
  BSeekReadyToPlay(): unknown;

  BVideoElementPlaying(): unknown;

  BVideoElementWaiting(): unknown;

  GetLoadedMetadata(): unknown;

  GetMediaTypeError(): unknown;

  GetMPDURL(): unknown;

  GetMuted(): unknown;

  GetPlaybackError(): unknown;

  GetPlaybackSpeed(): unknown;

  GetPlaybackTime(): unknown;

  GetTimelineDuration(): unknown;

  GetUserInputNeeded(): unknown;

  GetVideoElementCurrentTime(): unknown;

  GetVideoHeight(): unknown;

  GetVideoWidth(): unknown;

  GetVolume(): unknown;

  IsAtEnd(): unknown;

  IsInitialized(): unknown;

  IsPaused(): unknown;

  OnCanPlay(): void;

  OnDownloadFailed(e: unknown): Promise<undefined>;

  OnLoadedMetadata(): void;

  OnPlaybackError(): void;

  OnSeeking(): void;

  OnUserInputNeeded(): void;

  OnUserPauseChange(): void;

  OnVideoEnd(): void;

  OnVideoPause(): void;

  OnVideoPlaying(): void;

  OnVideoTimeUpdate(): void;

  OnVideoWaiting(): void;

  OnVolumeChange(): void;

  Pause(): void;

  Play(): void;

  Seek(e: unknown): void;

  SetMute(e: unknown, t: unknown): void;

  SetPlaybackSpeed(e: unknown): void;

  SetVolume(e: unknown): void;

  /** @param n default: s.lU.Absolute */
  Start(e: unknown, t: unknown, r: unknown, n?: unknown): void;

  Stop(): void;

  TogglePlayPause(): void;

  UpdateMPD(): Promise<void>;

  UserInputReceived(): void;

  m_bAtEnd: boolean;

  m_bAutoPlay: boolean;

  m_bInitailized: boolean;

  m_bIsWaiting: boolean;

  m_bLoadedMetadata: boolean;

  m_bMuted: boolean;

  m_bPaused: boolean;

  m_bSeekReadyToPlay: boolean;

  m_bUserInputNeeded: boolean;

  m_bVideoElementPlaying: boolean;

  m_elVideo: null;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_ePlayerError: EPlayerError;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_eSeekType: ESeekType;

  m_listeners: Listeners;

  m_nDownloadFailureCount: number;

  m_nPlaybackSpeed: number;

  m_nPlaybackTime: number;

  m_nVideoDuration: number;

  m_nVideoStartTime: number;

  m_nVolume: number;

  m_player: null;

  m_strMediaTypeError: null;
}

export interface Listeners {
  AddEventListener(e: unknown, t: unknown, n: unknown): void;

  Unregister(): void;

  m_rgListeners: unknown[];
}

export interface PreviousHighlightEntry {
  entry: null;

  globalMS: null;

  timelineID: string;

  timelineState: string;
}

export interface RgListeners3 {
  BEmpty(): unknown;

  BInitialized(): unknown;

  BPositionInGap(e: unknown): boolean;

  BReachedMaxScroll(): boolean;

  BReachedMinScroll(): boolean;

  ClearAutoScrollPauseTimeout(): void;

  ClearTempZoomScale(): void;

  Close(): void;

  ComputeDefaultMSVisible(): number;

  ComputeEntriesForTimeline(e: unknown): void;

  ComputeTimelineOffset(e: unknown): { timelineID: unknown; globalOffsetMS: unknown; nDurationMS: number; recordingOffsets: unknown; phaseOffsets: unknown; };

  ConvertDeltaPXToDurationMS(e: unknown): number;

  ConvertDurationMSToDeltaPX(e: unknown): number;

  ConvertGlobalMSToClipOrNone(e: unknown): unknown;

  /** @param t default: -1 */
  ConvertGlobalMSToGlobalPXOffset(e: unknown, t?: number): unknown;

  ConvertGlobalMSToScrollWindowPXOffset(e: unknown): number;

  /** @param t default: !0 */
  ConvertPXOffsetToGlobalMS(e: unknown, t?: boolean): unknown;

  /** @param t default: "start" */
  ConvertPXToTimelineRelativeMS(e: unknown, t?: string): unknown;

  FindClosestTimelineEndForOffsetPX(e: unknown): unknown;

  FindClosestTimelineStartForOffsetPX(e: unknown): unknown;

  FindIndexOfClosestTimelineEndForOffsetPX(e: unknown): unknown;

  FindIndexOfClosestTimelineStartForOffsetPX(e: unknown): unknown;

  FindRangeEventsAtGlobalMS(e: unknown): unknown;

  FindTimelineOffsets(e: unknown): unknown;

  GetAutoScrollPaused(): unknown;

  GetAutoScrollPauseTimeout(): unknown;

  GetClipsForTimeline(e: unknown): unknown;

  GetCurrentZoomScale(): number;

  GetGameID(): unknown;

  GetMaxScrollLeftPX(): number;

  GetOverscanWidth(): number;

  GetPhaseToHighlight(): unknown;

  GetPXForDuration(e: unknown): number;

  GetScrollableWidthPX(): unknown;

  GetScrollWindowOffset(): unknown;

  GetScrollWindowWidth(): unknown;

  GetStateDescriptionAtGlobalMS(e: unknown): unknown;

  GetThumbnailComponent(): unknown;

  GetThumbnailEntry(): unknown;

  GetThumbnailPosition(): unknown;

  GetTimelineGapWidth(): number;

  GetTimelineMarginWidth(): number;

  GetTimelineOffsetMS(e: unknown): unknown;

  GetTimelineParentCtnRef(): unknown;

  GetTimeRecorded(e: unknown): unknown;

  GetVirtualWindowEndPX(): unknown;

  GetVirtualWindowStartPX(): number;

  GetVirtualWindowWidthPX(): unknown;

  GetVisibleClips(): never[];

  GetVisibleRecordings(): never[];

  GetVisibleTimelineGameModes(e: unknown): unknown;

  GetVisibleTimelineHighlights(e: unknown): unknown;

  GetVisibleTimelines(): unknown;

  GetVisibleTimelinesInWindow(): unknown;

  GetVisibleWindowRelativeTimelines(): unknown;

  GetVisualWidth(): number;

  GetVisualWindowStartPX(): unknown;

  InitDefaultsIfReady(): void;

  IsTempZoom(): boolean;

  m_fnUnregisterPlaybackCoordinator(): unknown;

  OnFocusGlobalMS(e: unknown): void;

  OnInvalidate(e: unknown): void;

  OnLoaderInitialized(): void;

  OnTimelineLoaded(e: unknown): void;

  ScrollBy(e: unknown): void;

  ScrollToCenteredGlobalMS(e: unknown): void;

  ScrollToEnd(): void;

  ScrollToOffset(e: unknown): void;

  ScrollToOffsetCentered(e: unknown): void;

  SetAutoScrollPaused(e: unknown): void;

  /** @param e default: 5e3 */
  SetAutoScrollPauseTimeout(e?: number): void;

  SetPhaseToHighlight(e: unknown): void;

  SetScrollWindowOffset(e: unknown): void;

  SetScrollWindowWidth(e: unknown): void;

  SetTempZoomScale(e: unknown, t: unknown): void;

  SetThumbnailComponent(e: unknown): void;

  SetThumbnailEntry(e: unknown): void;

  SetThumbnailPosition(e: unknown): void;

  SetTimelineParentCtnRef(e: unknown): void;

  SetUserIsClipping(e: unknown): void;

  /** @param e default: [] */
  UpdateClipSummaries(e?: unknown[]): void;

  ZoomIn(e: unknown, t: unknown): void;

  ZoomOut(e: unknown, t: unknown): void;

  m_autoScrollPauseTimeout: null;

  m_bAutoScrollPaused: boolean;

  m_bCustomZoom: boolean;

  m_bInitialized: boolean;

  m_bUserClipping: boolean;

  m_durationMS: number;

  m_eThumbnailComponent: null;

  m_mapTimelineClips: ObservableMap<unknown, unknown>;

  m_mapTimelineEntries: ObservableMap<string, MapTimelineEntries>;

  m_msVisible: number;

  m_nGlobalRelativeThumbnailPositionPX: undefined;

  m_phaseToHighlight: undefined;

  m_playbackCoordinator: RgListeners;

  m_prevLeftAndVisible: null;

  m_refTimelineParentCtn: HTMLDivElement;

  m_rgTimelineOffsets: RgTimelineOffsets[];

  m_scrollLeftPX: number;

  m_scrollWindowOffsetPX: number;

  m_scrollWindowWidth: number;

  m_thumbnailHighlightEntry: null;

  m_timelineMask: RgListeners2;
}

export interface MapTimelineEntries {
  rgGameModes: GameModeChangeEvent[];

  rgHighlights: never;
}

export interface RgTimelineOffsets {
  globalOffsetMS: number;

  nDurationMS: number;

  phaseOffsets: unknown[];

  recordingOffsets: RecordingOffsets[];

  timelineID: string;
}

export interface RecordingOffsets {
  bIsActive: boolean;

  nDurationMS: number;

  recordingID: string;

  recordingType: number;

  timelineOffsetMS: number;
}

export interface RgListeners2 {
  BEmpty(): boolean;

  BInitialized(): unknown;

  Close(): void;

  FindRangeEventsAtGlobalMS(e: unknown): unknown;

  GetGameID(): unknown;

  GetGlobalTimelineEndMS(): unknown;

  GetStateDescriptionAtGlobalMS(e: unknown): unknown;

  GetTimelineDataOrStartLoad(e: unknown): unknown;

  GetTimelineOffsetFromGlobal(e: unknown, t: unknown): unknown;

  GetTimelines(): unknown;

  GetTimelineStartBeforeGlobalZeroMS(e: unknown): unknown;

  GetTimelineStartTime(e: unknown): unknown;

  Init(): void;

  IsActiveRecording(e: unknown): unknown;

  IsActiveTimeline(e: unknown): unknown;

  m_fnUnregisterFromLoader(): unknown;

  MakeRelativeToTimelineEndIfActive(e: unknown, t: unknown): unknown;

  OnInvalidate(e: unknown): void;

  OnInvalidateRecording(e: unknown, t: unknown): void;

  OnLoaderInitialized(): void;

  OnTimelineLoaded(e: unknown): void;

  m_eventTarget: RgListeners3;

  m_loader: ActiveTimelineLoader;

  m_maskBounds: number[];
}

export enum EPlayerError {
  None = 0,
  DownloadFailed = 1,
  PlaybackError = 2,
  MediaTypeError = 3,
}

export enum ESeekType {
  Absolute = 0,
  FromAvailableStart = 1,
}
