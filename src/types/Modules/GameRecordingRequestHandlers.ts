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

export interface GameRecordingRequestHandlers {
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

  SendMsgCleanupBackgroundRecordings(...args: Parameters<GameRecordingRequestHandlers['CleanupBackgroundRecordings']>): ReturnType<GameRecordingRequestHandlers['CleanupBackgroundRecordings']>;

  SendMsgDeleteClip(...args: Parameters<GameRecordingRequestHandlers['DeleteClip']>): ReturnType<GameRecordingRequestHandlers['DeleteClip']>;

  SendMsgDeletePerGameSettings(...args: Parameters<GameRecordingRequestHandlers['DeletePerGameSettings']>): ReturnType<GameRecordingRequestHandlers['DeletePerGameSettings']>;

  SendMsgExportClip(...args: Parameters<GameRecordingRequestHandlers['ExportClip']>): ReturnType<GameRecordingRequestHandlers['ExportClip']>;

  SendMsgExportClipPreview(...args: Parameters<GameRecordingRequestHandlers['ExportClipPreview']>): ReturnType<GameRecordingRequestHandlers['ExportClipPreview']>;

  SendMsgGetAndTrimPostGameHighlights(...args: Parameters<GameRecordingRequestHandlers['GetAndTrimPostGameHighlights']>): ReturnType<GameRecordingRequestHandlers['GetAndTrimPostGameHighlights']>;

  SendMsgGetAppsWithBackgroundVideo(...args: Parameters<GameRecordingRequestHandlers['GetAppsWithBackgroundVideo']>): ReturnType<GameRecordingRequestHandlers['GetAppsWithBackgroundVideo']>;

  SendMsgGetAvailableDiskSpace(...args: Parameters<GameRecordingRequestHandlers['GetAvailableDiskSpace']>): ReturnType<GameRecordingRequestHandlers['GetAvailableDiskSpace']>;

  SendMsgGetBackgroundRecordingFileSize(...args: Parameters<GameRecordingRequestHandlers['GetBackgroundRecordingFileSize']>): ReturnType<GameRecordingRequestHandlers['GetBackgroundRecordingFileSize']>;

  SendMsgGetClips(...args: Parameters<GameRecordingRequestHandlers['GetClips']>): ReturnType<GameRecordingRequestHandlers['GetClips']>;

  SendMsgGetEnoughDiskSpace(...args: Parameters<GameRecordingRequestHandlers['GetEnoughDiskSpace']>): ReturnType<GameRecordingRequestHandlers['GetEnoughDiskSpace']>;

  SendMsgGetPerGameSettings(...args: Parameters<GameRecordingRequestHandlers['GetPerGameSettings']>): ReturnType<GameRecordingRequestHandlers['GetPerGameSettings']>;

  SendMsgGetPlatformCapabilities(...args: Parameters<GameRecordingRequestHandlers['GetPlatformCapabilities']>): ReturnType<GameRecordingRequestHandlers['GetPlatformCapabilities']>;

  SendMsgGetTags(...args: Parameters<GameRecordingRequestHandlers['GetTags']>): ReturnType<GameRecordingRequestHandlers['GetTags']>;

  SendMsgGetThumbnails(...args: Parameters<GameRecordingRequestHandlers['GetThumbnails']>): ReturnType<GameRecordingRequestHandlers['GetThumbnails']>;

  SendMsgGetTimelinesForApp(...args: Parameters<GameRecordingRequestHandlers['GetTimelinesForApp']>): ReturnType<GameRecordingRequestHandlers['GetTimelinesForApp']>;

  SendMsgGetTimelinesForClip(...args: Parameters<GameRecordingRequestHandlers['GetTimelinesForClip']>): ReturnType<GameRecordingRequestHandlers['GetTimelinesForClip']>;

  SendMsgGetTotalDiskSpaceUsage(...args: Parameters<GameRecordingRequestHandlers['GetTotalDiskSpaceUsage']>): ReturnType<GameRecordingRequestHandlers['GetTotalDiskSpaceUsage']>;

  SendMsgManuallyDeleteRecordingsForApps(...args: Parameters<GameRecordingRequestHandlers['ManuallyDeleteRecordingsForApps']>): ReturnType<GameRecordingRequestHandlers['ManuallyDeleteRecordingsForApps']>;

  SendMsgNotifyClipCreated(...args: Parameters<GameRecordingRequestHandlers['NotifyClipCreated']>): ReturnType<GameRecordingRequestHandlers['NotifyClipCreated']>;

  SendMsgNotifyClipDeleted(...args: Parameters<GameRecordingRequestHandlers['NotifyClipDeleted']>): ReturnType<GameRecordingRequestHandlers['NotifyClipDeleted']>;

  SendMsgNotifyExportProgress(...args: Parameters<GameRecordingRequestHandlers['NotifyExportProgress']>): ReturnType<GameRecordingRequestHandlers['NotifyExportProgress']>;

  SendMsgNotifyLowDiskSpace(...args: Parameters<GameRecordingRequestHandlers['NotifyLowDiskSpace']>): ReturnType<GameRecordingRequestHandlers['NotifyLowDiskSpace']>;

  SendMsgNotifyOpenOverlayToGamePhase(...args: Parameters<GameRecordingRequestHandlers['NotifyOpenOverlayToGamePhase']>): ReturnType<GameRecordingRequestHandlers['NotifyOpenOverlayToGamePhase']>;

  SendMsgNotifyOpenOverlayToTimelineEvent(...args: Parameters<GameRecordingRequestHandlers['NotifyOpenOverlayToTimelineEvent']>): ReturnType<GameRecordingRequestHandlers['NotifyOpenOverlayToTimelineEvent']>;

  SendMsgNotifyPhaseListChanged(...args: Parameters<GameRecordingRequestHandlers['NotifyPhaseListChanged']>): ReturnType<GameRecordingRequestHandlers['NotifyPhaseListChanged']>;

  SendMsgNotifyPostGameHighlightsChanged(...args: Parameters<GameRecordingRequestHandlers['NotifyPostGameHighlightsChanged']>): ReturnType<GameRecordingRequestHandlers['NotifyPostGameHighlightsChanged']>;

  SendMsgNotifyRecordingSessionChanged(...args: Parameters<GameRecordingRequestHandlers['NotifyRecordingSessionChanged']>): ReturnType<GameRecordingRequestHandlers['NotifyRecordingSessionChanged']>;

  SendMsgNotifyTimelineChanged(...args: Parameters<GameRecordingRequestHandlers['NotifyTimelineChanged']>): ReturnType<GameRecordingRequestHandlers['NotifyTimelineChanged']>;

  SendMsgNotifyTimelineEntryChanged(...args: Parameters<GameRecordingRequestHandlers['NotifyTimelineEntryChanged']>): ReturnType<GameRecordingRequestHandlers['NotifyTimelineEntryChanged']>;

  SendMsgNotifyTimelineEntryRemoved(...args: Parameters<GameRecordingRequestHandlers['NotifyTimelineEntryRemoved']>): ReturnType<GameRecordingRequestHandlers['NotifyTimelineEntryRemoved']>;

  SendMsgNotifyUploadProgress(...args: Parameters<GameRecordingRequestHandlers['NotifyUploadProgress']>): ReturnType<GameRecordingRequestHandlers['NotifyUploadProgress']>;

  SendMsgQueryPhases(...args: Parameters<GameRecordingRequestHandlers['QueryPhases']>): ReturnType<GameRecordingRequestHandlers['QueryPhases']>;

  SendMsgSaveClip(...args: Parameters<GameRecordingRequestHandlers['SaveClip']>): ReturnType<GameRecordingRequestHandlers['SaveClip']>;

  SendMsgSetPerGameSettings(...args: Parameters<GameRecordingRequestHandlers['SetPerGameSettings']>): ReturnType<GameRecordingRequestHandlers['SetPerGameSettings']>;

  SendMsgStartRecording(...args: Parameters<GameRecordingRequestHandlers['StartRecording']>): ReturnType<GameRecordingRequestHandlers['StartRecording']>;

  SendMsgStopRecording(...args: Parameters<GameRecordingRequestHandlers['StopRecording']>): ReturnType<GameRecordingRequestHandlers['StopRecording']>;

  SendMsgSwitchBackgroundRecordingGame(...args: Parameters<GameRecordingRequestHandlers['SwitchBackgroundRecordingGame']>): ReturnType<GameRecordingRequestHandlers['SwitchBackgroundRecordingGame']>;

  SendMsgTakeScreenshot(...args: Parameters<GameRecordingRequestHandlers['TakeScreenshot']>): ReturnType<GameRecordingRequestHandlers['TakeScreenshot']>;

  SendMsgUploadClipToSteam(...args: Parameters<GameRecordingRequestHandlers['UploadClipToSteam']>): ReturnType<GameRecordingRequestHandlers['UploadClipToSteam']>;

  SendMsgUserAddTimelineEntry(...args: Parameters<GameRecordingRequestHandlers['UserAddTimelineEntry']>): ReturnType<GameRecordingRequestHandlers['UserAddTimelineEntry']>;

  SendMsgUserRemoveTimelineEntry(...args: Parameters<GameRecordingRequestHandlers['UserRemoveTimelineEntry']>): ReturnType<GameRecordingRequestHandlers['UserRemoveTimelineEntry']>;

  SendMsgUserUpdateTimelineEntry(...args: Parameters<GameRecordingRequestHandlers['UserUpdateTimelineEntry']>): ReturnType<GameRecordingRequestHandlers['UserUpdateTimelineEntry']>;

  SendMsgZipClip(...args: Parameters<GameRecordingRequestHandlers['ZipClip']>): ReturnType<GameRecordingRequestHandlers['ZipClip']>;

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
