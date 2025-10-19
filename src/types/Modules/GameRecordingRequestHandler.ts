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

export interface GameRecordingRequestHandler {
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

  SendMsgCleanupBackgroundRecordings(...args: Parameters<GameRecordingRequestHandler['CleanupBackgroundRecordings']>): ReturnType<GameRecordingRequestHandler['CleanupBackgroundRecordings']>;

  SendMsgDeleteClip(...args: Parameters<GameRecordingRequestHandler['DeleteClip']>): ReturnType<GameRecordingRequestHandler['DeleteClip']>;

  SendMsgDeletePerGameSettings(...args: Parameters<GameRecordingRequestHandler['DeletePerGameSettings']>): ReturnType<GameRecordingRequestHandler['DeletePerGameSettings']>;

  SendMsgExportClip(...args: Parameters<GameRecordingRequestHandler['ExportClip']>): ReturnType<GameRecordingRequestHandler['ExportClip']>;

  SendMsgExportClipPreview(...args: Parameters<GameRecordingRequestHandler['ExportClipPreview']>): ReturnType<GameRecordingRequestHandler['ExportClipPreview']>;

  SendMsgGetAndTrimPostGameHighlights(...args: Parameters<GameRecordingRequestHandler['GetAndTrimPostGameHighlights']>): ReturnType<GameRecordingRequestHandler['GetAndTrimPostGameHighlights']>;

  SendMsgGetAppsWithBackgroundVideo(...args: Parameters<GameRecordingRequestHandler['GetAppsWithBackgroundVideo']>): ReturnType<GameRecordingRequestHandler['GetAppsWithBackgroundVideo']>;

  SendMsgGetAvailableDiskSpace(...args: Parameters<GameRecordingRequestHandler['GetAvailableDiskSpace']>): ReturnType<GameRecordingRequestHandler['GetAvailableDiskSpace']>;

  SendMsgGetBackgroundRecordingFileSize(...args: Parameters<GameRecordingRequestHandler['GetBackgroundRecordingFileSize']>): ReturnType<GameRecordingRequestHandler['GetBackgroundRecordingFileSize']>;

  SendMsgGetClips(...args: Parameters<GameRecordingRequestHandler['GetClips']>): ReturnType<GameRecordingRequestHandler['GetClips']>;

  SendMsgGetEnoughDiskSpace(...args: Parameters<GameRecordingRequestHandler['GetEnoughDiskSpace']>): ReturnType<GameRecordingRequestHandler['GetEnoughDiskSpace']>;

  SendMsgGetPerGameSettings(...args: Parameters<GameRecordingRequestHandler['GetPerGameSettings']>): ReturnType<GameRecordingRequestHandler['GetPerGameSettings']>;

  SendMsgGetPlatformCapabilities(...args: Parameters<GameRecordingRequestHandler['GetPlatformCapabilities']>): ReturnType<GameRecordingRequestHandler['GetPlatformCapabilities']>;

  SendMsgGetTags(...args: Parameters<GameRecordingRequestHandler['GetTags']>): ReturnType<GameRecordingRequestHandler['GetTags']>;

  SendMsgGetThumbnails(...args: Parameters<GameRecordingRequestHandler['GetThumbnails']>): ReturnType<GameRecordingRequestHandler['GetThumbnails']>;

  SendMsgGetTimelinesForApp(...args: Parameters<GameRecordingRequestHandler['GetTimelinesForApp']>): ReturnType<GameRecordingRequestHandler['GetTimelinesForApp']>;

  SendMsgGetTimelinesForClip(...args: Parameters<GameRecordingRequestHandler['GetTimelinesForClip']>): ReturnType<GameRecordingRequestHandler['GetTimelinesForClip']>;

  SendMsgGetTotalDiskSpaceUsage(...args: Parameters<GameRecordingRequestHandler['GetTotalDiskSpaceUsage']>): ReturnType<GameRecordingRequestHandler['GetTotalDiskSpaceUsage']>;

  SendMsgManuallyDeleteRecordingsForApps(...args: Parameters<GameRecordingRequestHandler['ManuallyDeleteRecordingsForApps']>): ReturnType<GameRecordingRequestHandler['ManuallyDeleteRecordingsForApps']>;

  SendMsgNotifyClipCreated(...args: Parameters<GameRecordingRequestHandler['NotifyClipCreated']>): ReturnType<GameRecordingRequestHandler['NotifyClipCreated']>;

  SendMsgNotifyClipDeleted(...args: Parameters<GameRecordingRequestHandler['NotifyClipDeleted']>): ReturnType<GameRecordingRequestHandler['NotifyClipDeleted']>;

  SendMsgNotifyExportProgress(...args: Parameters<GameRecordingRequestHandler['NotifyExportProgress']>): ReturnType<GameRecordingRequestHandler['NotifyExportProgress']>;

  SendMsgNotifyLowDiskSpace(...args: Parameters<GameRecordingRequestHandler['NotifyLowDiskSpace']>): ReturnType<GameRecordingRequestHandler['NotifyLowDiskSpace']>;

  SendMsgNotifyOpenOverlayToGamePhase(...args: Parameters<GameRecordingRequestHandler['NotifyOpenOverlayToGamePhase']>): ReturnType<GameRecordingRequestHandler['NotifyOpenOverlayToGamePhase']>;

  SendMsgNotifyOpenOverlayToTimelineEvent(...args: Parameters<GameRecordingRequestHandler['NotifyOpenOverlayToTimelineEvent']>): ReturnType<GameRecordingRequestHandler['NotifyOpenOverlayToTimelineEvent']>;

  SendMsgNotifyPhaseListChanged(...args: Parameters<GameRecordingRequestHandler['NotifyPhaseListChanged']>): ReturnType<GameRecordingRequestHandler['NotifyPhaseListChanged']>;

  SendMsgNotifyPostGameHighlightsChanged(...args: Parameters<GameRecordingRequestHandler['NotifyPostGameHighlightsChanged']>): ReturnType<GameRecordingRequestHandler['NotifyPostGameHighlightsChanged']>;

  SendMsgNotifyRecordingSessionChanged(...args: Parameters<GameRecordingRequestHandler['NotifyRecordingSessionChanged']>): ReturnType<GameRecordingRequestHandler['NotifyRecordingSessionChanged']>;

  SendMsgNotifyTimelineChanged(...args: Parameters<GameRecordingRequestHandler['NotifyTimelineChanged']>): ReturnType<GameRecordingRequestHandler['NotifyTimelineChanged']>;

  SendMsgNotifyTimelineEntryChanged(...args: Parameters<GameRecordingRequestHandler['NotifyTimelineEntryChanged']>): ReturnType<GameRecordingRequestHandler['NotifyTimelineEntryChanged']>;

  SendMsgNotifyTimelineEntryRemoved(...args: Parameters<GameRecordingRequestHandler['NotifyTimelineEntryRemoved']>): ReturnType<GameRecordingRequestHandler['NotifyTimelineEntryRemoved']>;

  SendMsgNotifyUploadProgress(...args: Parameters<GameRecordingRequestHandler['NotifyUploadProgress']>): ReturnType<GameRecordingRequestHandler['NotifyUploadProgress']>;

  SendMsgQueryPhases(...args: Parameters<GameRecordingRequestHandler['QueryPhases']>): ReturnType<GameRecordingRequestHandler['QueryPhases']>;

  SendMsgSaveClip(...args: Parameters<GameRecordingRequestHandler['SaveClip']>): ReturnType<GameRecordingRequestHandler['SaveClip']>;

  SendMsgSetPerGameSettings(...args: Parameters<GameRecordingRequestHandler['SetPerGameSettings']>): ReturnType<GameRecordingRequestHandler['SetPerGameSettings']>;

  SendMsgStartRecording(...args: Parameters<GameRecordingRequestHandler['StartRecording']>): ReturnType<GameRecordingRequestHandler['StartRecording']>;

  SendMsgStopRecording(...args: Parameters<GameRecordingRequestHandler['StopRecording']>): ReturnType<GameRecordingRequestHandler['StopRecording']>;

  SendMsgSwitchBackgroundRecordingGame(...args: Parameters<GameRecordingRequestHandler['SwitchBackgroundRecordingGame']>): ReturnType<GameRecordingRequestHandler['SwitchBackgroundRecordingGame']>;

  SendMsgTakeScreenshot(...args: Parameters<GameRecordingRequestHandler['TakeScreenshot']>): ReturnType<GameRecordingRequestHandler['TakeScreenshot']>;

  SendMsgUploadClipToSteam(...args: Parameters<GameRecordingRequestHandler['UploadClipToSteam']>): ReturnType<GameRecordingRequestHandler['UploadClipToSteam']>;

  SendMsgUserAddTimelineEntry(...args: Parameters<GameRecordingRequestHandler['UserAddTimelineEntry']>): ReturnType<GameRecordingRequestHandler['UserAddTimelineEntry']>;

  SendMsgUserRemoveTimelineEntry(...args: Parameters<GameRecordingRequestHandler['UserRemoveTimelineEntry']>): ReturnType<GameRecordingRequestHandler['UserRemoveTimelineEntry']>;

  SendMsgUserUpdateTimelineEntry(...args: Parameters<GameRecordingRequestHandler['UserUpdateTimelineEntry']>): ReturnType<GameRecordingRequestHandler['UserUpdateTimelineEntry']>;

  SendMsgZipClip(...args: Parameters<GameRecordingRequestHandler['ZipClip']>): ReturnType<GameRecordingRequestHandler['ZipClip']>;

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
