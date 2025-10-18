import {
  CGameRecording_CleanupBackgroundRecordings_Request,
  CGameRecording_CleanupBackgroundRecordings_Response,
  CGameRecording_ClipCreated_Notification,
  CGameRecording_ClipDeleted_Notification,
  CGameRecording_DeleteClip_Request,
  CGameRecording_DeleteClip_Response,
  CGameRecording_DeletePerGameSettings_Request,
  CGameRecording_DeletePerGameSettings_Response,
  CGameRecording_ExportClip_Request,
  CGameRecording_ExportClip_Response,
  CGameRecording_ExportClipPreview_Request,
  CGameRecording_ExportClipPreview_Response,
  CGameRecording_ExportProgress_Notification,
  CGameRecording_GetAndTrimPostGameHighlights_Request,
  CGameRecording_GetAndTrimPostGameHighlights_Response,
  CGameRecording_GetAppsWithBackgroundVideo_Request,
  CGameRecording_GetAppsWithBackgroundVideo_Response,
  CGameRecording_GetAvailableDiskSpace_Request,
  CGameRecording_GetAvailableDiskSpace_Response,
  CGameRecording_GetClips_Request,
  CGameRecording_GetClips_Response,
  CGameRecording_GetEnoughDiskSpace_Request,
  CGameRecording_GetEnoughDiskSpace_Response,
  CGameRecording_GetPerGameSettings_Request,
  CGameRecording_GetPerGameSettings_Response,
  CGameRecording_GetPlatformCapabilities_Request,
  CGameRecording_GetPlatformCapabilities_Response,
  CGameRecording_GetRecordingSize_Request,
  CGameRecording_GetRecordingSize_Response,
  CGameRecording_GetTags_Request,
  CGameRecording_GetTags_Response,
  CGameRecording_GetThumbnails_Request,
  CGameRecording_GetThumbnails_Response,
  CGameRecording_GetTimelinesForApp_Request,
  CGameRecording_GetTimelinesForApp_Response,
  CGameRecording_GetTimelinesForClip_Request,
  CGameRecording_GetTimelinesForClip_Response,
  CGameRecording_GetTotalDiskSpaceUsage_Request,
  CGameRecording_GetTotalDiskSpaceUsage_Response,
  CGameRecording_LowDiskSpace_Notification,
  CGameRecording_ManuallyDeleteRecordingsForApps_Request,
  CGameRecording_ManuallyDeleteRecordingsForApps_Response,
  CGameRecording_OpenOverlayToGamePhase_Notification,
  CGameRecording_OpenOverlayToTimelineEvent_Notification,
  CGameRecording_PhaseListChanged_Notification,
  CGameRecording_PostGameHighlightsChanged_Notification,
  CGameRecording_QueryPhases_Request,
  CGameRecording_QueryPhases_Response,
  CGameRecording_RecordingSessionChanged_Notification,
  CGameRecording_SaveClip_Request,
  CGameRecording_SaveClip_Response,
  CGameRecording_SetPerGameSettings_Request,
  CGameRecording_SetPerGameSettings_Response,
  CGameRecording_StartRecording_Request,
  CGameRecording_StartRecording_Response,
  CGameRecording_StopRecording_Request,
  CGameRecording_StopRecording_Response,
  CGameRecording_SwitchBackgroundRecordingGame_Request,
  CGameRecording_SwitchBackgroundRecordingGame_Response,
  CGameRecording_TakeScreenshot_Request,
  CGameRecording_TakeScreenshot_Response,
  CGameRecording_TimelineChanged_Notification,
  CGameRecording_TimelineEntryChanged_Notification,
  CGameRecording_TimelineEntryRemoved_Notification,
  CGameRecording_UploadClipToSteam_Request,
  CGameRecording_UploadClipToSteam_Response,
  CGameRecording_UploadProgress_Notification,
  CGameRecording_UserAddTimelineEntry_Request,
  CGameRecording_UserAddTimelineEntry_Response,
  CGameRecording_UserRemoveTimelineEntry_Request,
  CGameRecording_UserRemoveTimelineEntry_Response,
  CGameRecording_UserUpdateTimelineEntry_Request,
  CGameRecording_UserUpdateTimelineEntry_Response,
  CGameRecording_ZipClip_Request,
  CGameRecording_ZipClip_Response,
} from '../Protobufs/steam/webuimessages_gamerecording';
import { ProtobufNotification } from '../shared/protobuf';

export interface GameRecordingService {
  CleanupBackgroundRecordings(request?: CGameRecording_CleanupBackgroundRecordings_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_CleanupBackgroundRecordings_Response>>;

  DeleteClip(request?: CGameRecording_DeleteClip_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_DeleteClip_Response>>;

  DeletePerGameSettings(request?: CGameRecording_DeletePerGameSettings_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_DeletePerGameSettings_Response>>;

  ExportClip(request?: CGameRecording_ExportClip_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_ExportClip_Response>>;

  ExportClipPreview(request?: CGameRecording_ExportClipPreview_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_ExportClipPreview_Response>>;

  GetAndTrimPostGameHighlights(request?: CGameRecording_GetAndTrimPostGameHighlights_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetAndTrimPostGameHighlights_Response>>;

  GetAppsWithBackgroundVideo(request?: CGameRecording_GetAppsWithBackgroundVideo_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetAppsWithBackgroundVideo_Response>>;

  GetAvailableDiskSpace(request?: CGameRecording_GetAvailableDiskSpace_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetAvailableDiskSpace_Response>>;

  GetBackgroundRecordingFileSize(request?: CGameRecording_GetRecordingSize_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetRecordingSize_Response>>;

  GetClips(request?: CGameRecording_GetClips_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetClips_Response>>;

  GetEnoughDiskSpace(request?: CGameRecording_GetEnoughDiskSpace_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetEnoughDiskSpace_Response>>;

  GetPerGameSettings(request?: CGameRecording_GetPerGameSettings_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetPerGameSettings_Response>>;

  GetPlatformCapabilities(request?: CGameRecording_GetPlatformCapabilities_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetPlatformCapabilities_Response>>;

  GetTags(request?: CGameRecording_GetTags_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetTags_Response>>;

  GetThumbnails(request?: CGameRecording_GetThumbnails_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetThumbnails_Response>>;

  GetTimelinesForApp(request?: CGameRecording_GetTimelinesForApp_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetTimelinesForApp_Response>>;

  GetTimelinesForClip(request?: CGameRecording_GetTimelinesForClip_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetTimelinesForClip_Response>>;

  GetTotalDiskSpaceUsage(request?: CGameRecording_GetTotalDiskSpaceUsage_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_GetTotalDiskSpaceUsage_Response>>;

  ManuallyDeleteRecordingsForApps(request?: CGameRecording_ManuallyDeleteRecordingsForApps_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_ManuallyDeleteRecordingsForApps_Response>>;

  NotifyClipCreated(notification: ProtobufNotification<CGameRecording_ClipCreated_Notification>, transport?: unknown): boolean;

  NotifyClipDeleted(notification: ProtobufNotification<CGameRecording_ClipDeleted_Notification>, transport?: unknown): boolean;

  NotifyExportProgress(notification: ProtobufNotification<CGameRecording_ExportProgress_Notification>, transport?: unknown): boolean;

  NotifyLowDiskSpace(notification: ProtobufNotification<CGameRecording_LowDiskSpace_Notification>, transport?: unknown): boolean;

  NotifyOpenOverlayToGamePhase(notification: ProtobufNotification<CGameRecording_OpenOverlayToGamePhase_Notification>, transport?: unknown): boolean;

  NotifyOpenOverlayToTimelineEvent(notification: ProtobufNotification<CGameRecording_OpenOverlayToTimelineEvent_Notification>, transport?: unknown): boolean;

  NotifyPhaseListChanged(notification: ProtobufNotification<CGameRecording_PhaseListChanged_Notification>, transport?: unknown): boolean;

  NotifyPostGameHighlightsChanged(notification: ProtobufNotification<CGameRecording_PostGameHighlightsChanged_Notification>, transport?: unknown): boolean;

  NotifyRecordingSessionChanged(notification: ProtobufNotification<CGameRecording_RecordingSessionChanged_Notification>, transport?: unknown): boolean;

  NotifyTimelineChanged(notification: ProtobufNotification<CGameRecording_TimelineChanged_Notification>, transport?: unknown): boolean;

  NotifyTimelineEntryChanged(notification: ProtobufNotification<CGameRecording_TimelineEntryChanged_Notification>, transport?: unknown): boolean;

  NotifyTimelineEntryRemoved(notification: ProtobufNotification<CGameRecording_TimelineEntryRemoved_Notification>, transport?: unknown): boolean;

  NotifyUploadProgress(notification: ProtobufNotification<CGameRecording_UploadProgress_Notification>, transport?: unknown): boolean;

  QueryPhases(request?: CGameRecording_QueryPhases_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_QueryPhases_Response>>;

  RegisterForNotifyClipCreated(callback: (notification: ProtobufNotification<CGameRecording_ClipCreated_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  RegisterForNotifyClipDeleted(callback: (notification: ProtobufNotification<CGameRecording_ClipDeleted_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  RegisterForNotifyExportProgress(callback: (notification: ProtobufNotification<CGameRecording_ExportProgress_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  RegisterForNotifyLowDiskSpace(callback: (notification: ProtobufNotification<CGameRecording_LowDiskSpace_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  RegisterForNotifyOpenOverlayToGamePhase(callback: (notification: ProtobufNotification<CGameRecording_OpenOverlayToGamePhase_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  RegisterForNotifyOpenOverlayToTimelineEvent(callback: (notification: ProtobufNotification<CGameRecording_OpenOverlayToTimelineEvent_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  RegisterForNotifyPhaseListChanged(callback: (notification: ProtobufNotification<CGameRecording_PhaseListChanged_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  RegisterForNotifyPostGameHighlightsChanged(callback: (notification: ProtobufNotification<CGameRecording_PostGameHighlightsChanged_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  RegisterForNotifyRecordingSessionChanged(callback: (notification: ProtobufNotification<CGameRecording_RecordingSessionChanged_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  RegisterForNotifyTimelineChanged(callback: (notification: ProtobufNotification<CGameRecording_TimelineChanged_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  RegisterForNotifyTimelineEntryChanged(callback: (notification: ProtobufNotification<CGameRecording_TimelineEntryChanged_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  RegisterForNotifyTimelineEntryRemoved(callback: (notification: ProtobufNotification<CGameRecording_TimelineEntryRemoved_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  RegisterForNotifyUploadProgress(callback: (notification: ProtobufNotification<CGameRecording_UploadProgress_Notification>) => void, handlerRegistry?: unknown): Unregisterable;

  SaveClip(request?: CGameRecording_SaveClip_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_SaveClip_Response>>;

  SendMsgCleanupBackgroundRecordings(...args: Parameters<GameRecordingService['CleanupBackgroundRecordings']>): ReturnType<GameRecordingService['CleanupBackgroundRecordings']>;

  SendMsgDeleteClip(...args: Parameters<GameRecordingService['DeleteClip']>): ReturnType<GameRecordingService['DeleteClip']>;

  SendMsgDeletePerGameSettings(...args: Parameters<GameRecordingService['DeletePerGameSettings']>): ReturnType<GameRecordingService['DeletePerGameSettings']>;

  SendMsgExportClip(...args: Parameters<GameRecordingService['ExportClip']>): ReturnType<GameRecordingService['ExportClip']>;

  SendMsgExportClipPreview(...args: Parameters<GameRecordingService['ExportClipPreview']>): ReturnType<GameRecordingService['ExportClipPreview']>;

  SendMsgGetAndTrimPostGameHighlights(...args: Parameters<GameRecordingService['GetAndTrimPostGameHighlights']>): ReturnType<GameRecordingService['GetAndTrimPostGameHighlights']>;

  SendMsgGetAppsWithBackgroundVideo(...args: Parameters<GameRecordingService['GetAppsWithBackgroundVideo']>): ReturnType<GameRecordingService['GetAppsWithBackgroundVideo']>;

  SendMsgGetAvailableDiskSpace(...args: Parameters<GameRecordingService['GetAvailableDiskSpace']>): ReturnType<GameRecordingService['GetAvailableDiskSpace']>;

  SendMsgGetBackgroundRecordingFileSize(...args: Parameters<GameRecordingService['GetBackgroundRecordingFileSize']>): ReturnType<GameRecordingService['GetBackgroundRecordingFileSize']>;

  SendMsgGetClips(...args: Parameters<GameRecordingService['GetClips']>): ReturnType<GameRecordingService['GetClips']>;

  SendMsgGetEnoughDiskSpace(...args: Parameters<GameRecordingService['GetEnoughDiskSpace']>): ReturnType<GameRecordingService['GetEnoughDiskSpace']>;

  SendMsgGetPerGameSettings(...args: Parameters<GameRecordingService['GetPerGameSettings']>): ReturnType<GameRecordingService['GetPerGameSettings']>;

  SendMsgGetPlatformCapabilities(...args: Parameters<GameRecordingService['GetPlatformCapabilities']>): ReturnType<GameRecordingService['GetPlatformCapabilities']>;

  SendMsgGetTags(...args: Parameters<GameRecordingService['GetTags']>): ReturnType<GameRecordingService['GetTags']>;

  SendMsgGetThumbnails(...args: Parameters<GameRecordingService['GetThumbnails']>): ReturnType<GameRecordingService['GetThumbnails']>;

  SendMsgGetTimelinesForApp(...args: Parameters<GameRecordingService['GetTimelinesForApp']>): ReturnType<GameRecordingService['GetTimelinesForApp']>;

  SendMsgGetTimelinesForClip(...args: Parameters<GameRecordingService['GetTimelinesForClip']>): ReturnType<GameRecordingService['GetTimelinesForClip']>;

  SendMsgGetTotalDiskSpaceUsage(...args: Parameters<GameRecordingService['GetTotalDiskSpaceUsage']>): ReturnType<GameRecordingService['GetTotalDiskSpaceUsage']>;

  SendMsgManuallyDeleteRecordingsForApps(...args: Parameters<GameRecordingService['ManuallyDeleteRecordingsForApps']>): ReturnType<GameRecordingService['ManuallyDeleteRecordingsForApps']>;

  SendMsgNotifyClipCreated(...args: Parameters<GameRecordingService['NotifyClipCreated']>): ReturnType<GameRecordingService['NotifyClipCreated']>;

  SendMsgNotifyClipDeleted(...args: Parameters<GameRecordingService['NotifyClipDeleted']>): ReturnType<GameRecordingService['NotifyClipDeleted']>;

  SendMsgNotifyExportProgress(...args: Parameters<GameRecordingService['NotifyExportProgress']>): ReturnType<GameRecordingService['NotifyExportProgress']>;

  SendMsgNotifyLowDiskSpace(...args: Parameters<GameRecordingService['NotifyLowDiskSpace']>): ReturnType<GameRecordingService['NotifyLowDiskSpace']>;

  SendMsgNotifyOpenOverlayToGamePhase(...args: Parameters<GameRecordingService['NotifyOpenOverlayToGamePhase']>): ReturnType<GameRecordingService['NotifyOpenOverlayToGamePhase']>;

  SendMsgNotifyOpenOverlayToTimelineEvent(...args: Parameters<GameRecordingService['NotifyOpenOverlayToTimelineEvent']>): ReturnType<GameRecordingService['NotifyOpenOverlayToTimelineEvent']>;

  SendMsgNotifyPhaseListChanged(...args: Parameters<GameRecordingService['NotifyPhaseListChanged']>): ReturnType<GameRecordingService['NotifyPhaseListChanged']>;

  SendMsgNotifyPostGameHighlightsChanged(...args: Parameters<GameRecordingService['NotifyPostGameHighlightsChanged']>): ReturnType<GameRecordingService['NotifyPostGameHighlightsChanged']>;

  SendMsgNotifyRecordingSessionChanged(...args: Parameters<GameRecordingService['NotifyRecordingSessionChanged']>): ReturnType<GameRecordingService['NotifyRecordingSessionChanged']>;

  SendMsgNotifyTimelineChanged(...args: Parameters<GameRecordingService['NotifyTimelineChanged']>): ReturnType<GameRecordingService['NotifyTimelineChanged']>;

  SendMsgNotifyTimelineEntryChanged(...args: Parameters<GameRecordingService['NotifyTimelineEntryChanged']>): ReturnType<GameRecordingService['NotifyTimelineEntryChanged']>;

  SendMsgNotifyTimelineEntryRemoved(...args: Parameters<GameRecordingService['NotifyTimelineEntryRemoved']>): ReturnType<GameRecordingService['NotifyTimelineEntryRemoved']>;

  SendMsgNotifyUploadProgress(...args: Parameters<GameRecordingService['NotifyUploadProgress']>): ReturnType<GameRecordingService['NotifyUploadProgress']>;

  SendMsgQueryPhases(...args: Parameters<GameRecordingService['QueryPhases']>): ReturnType<GameRecordingService['QueryPhases']>;

  SendMsgSaveClip(...args: Parameters<GameRecordingService['SaveClip']>): ReturnType<GameRecordingService['SaveClip']>;

  SendMsgSetPerGameSettings(...args: Parameters<GameRecordingService['SetPerGameSettings']>): ReturnType<GameRecordingService['SetPerGameSettings']>;

  SendMsgStartRecording(...args: Parameters<GameRecordingService['StartRecording']>): ReturnType<GameRecordingService['StartRecording']>;

  SendMsgStopRecording(...args: Parameters<GameRecordingService['StopRecording']>): ReturnType<GameRecordingService['StopRecording']>;

  SendMsgSwitchBackgroundRecordingGame(...args: Parameters<GameRecordingService['SwitchBackgroundRecordingGame']>): ReturnType<GameRecordingService['SwitchBackgroundRecordingGame']>;

  SendMsgTakeScreenshot(...args: Parameters<GameRecordingService['TakeScreenshot']>): ReturnType<GameRecordingService['TakeScreenshot']>;

  SendMsgUploadClipToSteam(...args: Parameters<GameRecordingService['UploadClipToSteam']>): ReturnType<GameRecordingService['UploadClipToSteam']>;

  SendMsgUserAddTimelineEntry(...args: Parameters<GameRecordingService['UserAddTimelineEntry']>): ReturnType<GameRecordingService['UserAddTimelineEntry']>;

  SendMsgUserRemoveTimelineEntry(...args: Parameters<GameRecordingService['UserRemoveTimelineEntry']>): ReturnType<GameRecordingService['UserRemoveTimelineEntry']>;

  SendMsgUserUpdateTimelineEntry(...args: Parameters<GameRecordingService['UserUpdateTimelineEntry']>): ReturnType<GameRecordingService['UserUpdateTimelineEntry']>;

  SendMsgZipClip(...args: Parameters<GameRecordingService['ZipClip']>): ReturnType<GameRecordingService['ZipClip']>;

  SetPerGameSettings(request?: CGameRecording_SetPerGameSettings_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_SetPerGameSettings_Response>>;

  StartRecording(request?: CGameRecording_StartRecording_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_StartRecording_Response>>;

  StopRecording(request?: CGameRecording_StopRecording_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_StopRecording_Response>>;

  SwitchBackgroundRecordingGame(request?: CGameRecording_SwitchBackgroundRecordingGame_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_SwitchBackgroundRecordingGame_Response>>;

  TakeScreenshot(request?: CGameRecording_TakeScreenshot_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_TakeScreenshot_Response>>;

  UploadClipToSteam(request?: CGameRecording_UploadClipToSteam_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_UploadClipToSteam_Response>>;

  UserAddTimelineEntry(request?: CGameRecording_UserAddTimelineEntry_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_UserAddTimelineEntry_Response>>;

  UserRemoveTimelineEntry(request?: CGameRecording_UserRemoveTimelineEntry_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_UserRemoveTimelineEntry_Response>>;

  UserUpdateTimelineEntry(request?: CGameRecording_UserUpdateTimelineEntry_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_UserUpdateTimelineEntry_Response>>;

  ZipClip(request?: CGameRecording_ZipClip_Request, transport?: unknown): Promise<ProtobufNotification<CGameRecording_ZipClip_Response>>;

  CleanupBackgroundRecordingsHandler: Handler;

  DeleteClipHandler: Handler;

  DeletePerGameSettingsHandler: Handler;

  ExportClipHandler: Handler;

  ExportClipPreviewHandler: Handler;

  GetAndTrimPostGameHighlightsHandler: Handler;

  GetAppsWithBackgroundVideoHandler: Handler;

  GetAvailableDiskSpaceHandler: Handler;

  GetBackgroundRecordingFileSizeHandler: Handler;

  GetClipsHandler: Handler;

  GetEnoughDiskSpaceHandler: Handler;

  GetPerGameSettingsHandler: Handler;

  GetPlatformCapabilitiesHandler: Handler;

  GetTagsHandler: Handler;

  GetThumbnailsHandler: Handler;

  GetTimelinesForAppHandler: Handler;

  GetTimelinesForClipHandler: Handler;

  GetTotalDiskSpaceUsageHandler: Handler;

  ManuallyDeleteRecordingsForAppsHandler: Handler;

  NotifyClipCreatedHandler: Handler;

  NotifyClipDeletedHandler: Handler;

  NotifyExportProgressHandler: Handler;

  NotifyLowDiskSpaceHandler: Handler;

  NotifyOpenOverlayToGamePhaseHandler: Handler;

  NotifyOpenOverlayToTimelineEventHandler: Handler;

  NotifyPhaseListChangedHandler: Handler;

  NotifyPostGameHighlightsChangedHandler: Handler;

  NotifyRecordingSessionChangedHandler: Handler;

  NotifyTimelineChangedHandler: Handler;

  NotifyTimelineEntryChangedHandler: Handler;

  NotifyTimelineEntryRemovedHandler: Handler;

  NotifyUploadProgressHandler: Handler;

  QueryPhasesHandler: Handler;

  SaveClipHandler: Handler;

  SetPerGameSettingsHandler: Handler;

  StartRecordingHandler: Handler;

  StopRecordingHandler: Handler;

  SwitchBackgroundRecordingGameHandler: Handler;

  TakeScreenshotHandler: Handler;

  UploadClipToSteamHandler: Handler;

  UserAddTimelineEntryHandler: Handler;

  UserRemoveTimelineEntryHandler: Handler;

  UserUpdateTimelineEntryHandler: Handler;

  ZipClipHandler: Handler;
}

export interface Handler {
  name: string;

  /**
   * Reference to the protobuf request message class
   */
  request: unknown;

  /**
   * Reference to the protobuf response message class
   */
  response?: unknown;
}

export interface Unregisterable {
  invoke(...args: unknown[]): void;

  unregister(): void;
}
