/* eslint-disable perfectionist/sort-interfaces */
import * as NotificationTypes from 'Protobufs/steam/steammessages_clientnotificationtypes';
import { ProtobufClass } from 'shared/protobuf';

type ClientNotificationTypeMap = {
  [K in keyof typeof ClientNotificationType]: object;
};

export interface NotificationTargets extends ClientNotificationTypeMap {
  [ClientNotificationType.DownloadCompleted]: CClientNotificationDownloadCompletedNotificationTarget;

  [ClientNotificationType.FriendInvite]: NotificationTarget;

  [ClientNotificationType.FriendInGame]: CClientNotificationFriendInGameNotificationTarget;

  [ClientNotificationType.FriendOnline]: CClientNotificationFriendOnlineNotificationTarget;

  [ClientNotificationType.Achievement]: CClientNotificationAchievementNotificationTarget;

  [ClientNotificationType.LowBattery]: CClientNotificationLowBatteryNotificationTarget;

  [ClientNotificationType.SystemUpdate]: CClientNotificationSystemUpdateNotificationTarget;

  [ClientNotificationType.FriendMessage]: CClientNotificationFriendMessageNotificationTarget;

  [ClientNotificationType.GroupChatMessage]: CClientNotificationGroupChatMessageNotificationTarget;

  [ClientNotificationType.FriendInviteRollup]: CClientNotificationFriendInviteRollupNotificationTarget;

  [ClientNotificationType.FamilySharingStopPlaying]: CClientNotificationFamilySharingStopPlayingNotificationTarget;

  [ClientNotificationType.Screenshot]: CClientNotificationScreenshotNotificationTarget;

  [ClientNotificationType.CloudSyncFailure]: CClientNotificationCloudSyncFailureNotificationTarget;

  [ClientNotificationType.CloudSyncConflict]: CClientNotificationCloudSyncConflictNotificationTarget;

  [ClientNotificationType.IncomingVoiceChat]: CClientNotificationIncomingVoiceChatNotificationTarget;

  [ClientNotificationType.ClaimSteamDeckRewards]: CClientNotificationClaimSteamDeckRewardsNotificationTarget;

  [ClientNotificationType.GiftReceived]: NotificationTarget;

  [ClientNotificationType.ItemAnnouncement]: NotificationTarget;

  [ClientNotificationType.HardwareSurvey]: CClientNotificationHardwareSurveyPendingNotificationTarget;

  [ClientNotificationType.LowDiskSpace]: CClientNotificationLowDiskSpaceNotificationTarget;

  [ClientNotificationType.BatteryTemperature]: CClientNotificationBatteryTemperatureNotificationTarget;

  [ClientNotificationType.DockUnsupportedFirmware]: CClientNotificationDockUnsupportedFirmwareNotificationTarget;

  [ClientNotificationType.CannotReadControllerGuideButton]: CClientNotificationCannotReadControllerGuideButtonNotificationTarget;

  [ClientNotificationType.Comment]: NotificationTarget;

  [ClientNotificationType.Wishlist]: NotificationTarget;

  [ClientNotificationType.TradeOffer]: NotificationTarget;

  [ClientNotificationType.AsyncGame]: NotificationTarget;

  [ClientNotificationType.General]: NotificationTarget;

  [ClientNotificationType.HelpRequest]: NotificationTarget;

  [ClientNotificationType.OverlaySplashScreen]: CClientNotificationOverlaySplashScreenNotificationTarget;

  [ClientNotificationType.BroadcastAvailableToWatch]: CClientNotificationBroadcastAvailableToWatchNotificationTarget;

  [ClientNotificationType.TimedTrialRemaining]: CClientNotificationTimedTrialRemainingNotificationTarget;

  [ClientNotificationType.LoginRefresh]: CClientNotificationLoginRefreshNotificationTarget;

  [ClientNotificationType.MajorSale]: NotificationTarget;

  [ClientNotificationType.TimerExpired]: CClientNotificationTimerExpiredNotificationTarget;

  [ClientNotificationType.ModeratorMsg]: NotificationTarget;

  [ClientNotificationType.SteamInputActionSetChanged]: CClientNotificationSteamInputActionSetChangedNotificationTarget;

  [ClientNotificationType.RemoteClientConnection]: CClientNotificationRemoteClientConnectionNotificationTarget;

  [ClientNotificationType.RemoteClientStartStream]: CClientNotificationRemoteClientStartStreamNotificationTarget;

  [ClientNotificationType.StreamingClientConnection]: CClientNotificationStreamingClientConnectionNotificationTarget;

  [ClientNotificationType.FamilyInvite]: NotificationTarget;

  [ClientNotificationType.PlaytimeWarning]: CClientNotificationPlaytimeWarningNotificationTarget;

  [ClientNotificationType.FamilyPurchaseRequest]: NotificationTarget;

  [ClientNotificationType.FamilyPurchaseRequestResponse]: NotificationTarget;

  [ClientNotificationType.ParentalFeatureRequest]: NotificationTarget;

  [ClientNotificationType.ParentalPlaytimeRequest]: NotificationTarget;

  [ClientNotificationType.GameRecordingError]: CClientNotificationGameRecordingErrorNotificationTarget;

  [ClientNotificationType.ParentalFeatureResponse]: NotificationTarget;

  [ClientNotificationType.ParentalPlaytimeResponse]: NotificationTarget;

  [ClientNotificationType.RequestedGameAdded]: NotificationTarget;

  [ClientNotificationType.ClipDownloaded]: NotificationTarget;

  [ClientNotificationType.GameRecordingStart]: CClientNotificationGameRecordingStartNotificationTarget;

  [ClientNotificationType.GameRecordingStop]: CClientNotificationGameRecordingStopNotificationTarget;

  [ClientNotificationType.GameRecordingUserMarkerAdded]: CClientNotificationGameRecordingUserMarkerAddedNotificationTarget;

  [ClientNotificationType.GameRecordingInstantClip]: CClientNotificationGameRecordingInstantClipNotificationTarget;

  [ClientNotificationType.PlaytestInvite]: NotificationTarget;

  [ClientNotificationType.TradeReversal]: NotificationTarget;

  [ClientNotificationType.HardwareUpdateAvailable]: CClientNotificationHardwareUpdateAvailableNotificationTarget;
}

export interface CClientNotificationDownloadCompletedNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  bEnableInReducedUI: boolean;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationDownloadCompleted>;

  showToast: boolean;

  sound: number;

  strTest: string;
}

export interface CClientNotificationFriendInviteRollupNotificationTarget {
  fnTest(): unknown;

  eFeature: Feature;

  fnTray: null;

  proto: ProtobufClass<NotificationTypes.CClientNotificationFriendInviteRollup>;

  showToast: boolean;

  strTest: string;
}

export interface CClientNotificationFamilySharingStopPlayingNotificationTarget {
  bCritical: boolean;

  eFeature: Feature;

  fnTray: null;

  proto: ProtobufClass<NotificationTypes.CClientNotificationFamilySharingStopPlaying>;

  showToast: boolean;

  sound: number;
}

export interface CClientNotificationScreenshotNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  showToast(): unknown;

  bEnableInReducedUI: boolean;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationScreenshot>;

  strTest: string;
}

export interface CClientNotificationCloudSyncFailureNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationCloudSyncFailure>;

  showToast: boolean;

  sound: number;

  strTest: string;
}

export interface CClientNotificationCloudSyncConflictNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationCloudSyncConflict>;

  showToast: boolean;

  sound: number;

  strTest: string;
}

export interface CClientNotificationIncomingVoiceChatNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  eFeature: Feature;

  playSound: boolean;

  proto: ProtobufClass<NotificationTypes.CClientNotificationIncomingVoiceChat>;

  showToast: boolean;

  strTest: string;

  toastDurationMS: number;
}

export interface CClientNotificationClaimSteamDeckRewardsNotificationTarget {

  eFeature: Feature;

  fnTray: null;

  proto: ProtobufClass<NotificationTypes.CClientNotificationClaimSteamDeckRewards>;

  showToast: boolean;

  sound: number;

  toastDurationMS: number;
}

/** @compareOriginalName InvalidName */
export interface NotificationTarget {
  fnTest(): unknown;

  fnTray?(e: unknown, t: unknown): void;

  bEnableInReducedUI?: boolean;

  eFeature: Feature;

  showToast?: boolean;

  sound?: number;

  strTest: string;
}

export interface CClientNotificationHardwareSurveyPendingNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationHardwareSurveyPending>;

  showToast: boolean;

  sound: number;

  strTest: string;
}

export interface CClientNotificationLowDiskSpaceNotificationTarget {
  bCritical: boolean;

  eFeature: Feature;

  fnTray: null;

  proto: ProtobufClass<NotificationTypes.CClientNotificationLowDiskSpace>;

  showToast: boolean;

  sound: number;

  toastDurationMS: number;
}

export interface CClientNotificationBatteryTemperatureNotificationTarget {
  bCritical: boolean;

  eFeature: Feature;

  fnTray: null;

  proto: ProtobufClass<NotificationTypes.CClientNotificationBatteryTemperature>;

  showToast: boolean;

  sound: number;

  toastDurationMS: number;
}

export interface CClientNotificationDockUnsupportedFirmwareNotificationTarget {
  fnShowModal(): void;

  fnTray(e: unknown, t: unknown): void;

  bCritical: boolean;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationDockUnsupportedFirmware>;

  showToast: boolean;

  sound: number;
}

export interface CClientNotificationCannotReadControllerGuideButtonNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  bCritical: boolean;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationCannotReadControllerGuideButton>;

  showToast: boolean;

  sound: number;

  strTest: string;

  toastDurationMS: number;
}

export interface CClientNotificationFriendInGameNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  playSound(): unknown;

  showToast(e: unknown): boolean;

  eFeature: Feature;

  nRemoveFromTraySec: number;

  proto: ProtobufClass<NotificationTypes.CClientNotificationFriendInGame>;

  sound: number;

  strTest: string;
}

export interface CClientNotificationOverlaySplashScreenNotificationTarget {
  displayToastAlone: boolean;

  eFeature: Feature;

  fnTray: null;

  proto: ProtobufClass<NotificationTypes.CClientNotificationOverlaySplashScreen>;

  showToast: boolean;
}

export interface CClientNotificationBroadcastAvailableToWatchNotificationTarget {
  displayToastAlone: boolean;

  eFeature: Feature;

  fnTray: null;

  proto: ProtobufClass<NotificationTypes.CClientNotificationBroadcastAvailableToWatch>;

  showToast: boolean;
}

export interface CClientNotificationTimedTrialRemainingNotificationTarget {
  displayToastAlone: boolean;

  eFeature: Feature;

  fnTray: null;

  proto: ProtobufClass<NotificationTypes.CClientNotificationTimedTrialRemaining>;

  showToast: boolean;

  sound: number;
}

export interface CClientNotificationLoginRefreshNotificationTarget {
  bEnableInReducedUI: boolean;

  eFeature: Feature;

  fnTray: null;

  proto: ProtobufClass<NotificationTypes.CClientNotificationLoginRefresh>;

  showToast: boolean;

  sound: number;
}

export interface CClientNotificationTimerExpiredNotificationTarget {
  bEnableInReducedUI: boolean;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationTimerExpired>;

  showToast: boolean;

  sound: number;

  strTest: string;
}

export interface CClientNotificationFriendOnlineNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  playSound(): unknown;

  showToast(e: unknown): boolean;

  eFeature: Feature;

  nRemoveFromTraySec: number;

  proto: ProtobufClass<NotificationTypes.CClientNotificationFriendOnline>;

  sound: number;

  strTest: string;
}

export interface CClientNotificationSteamInputActionSetChangedNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  eFeature: Feature;

  playSound: boolean;

  proto: ProtobufClass<NotificationTypes.CClientNotificationSteamInputActionSetChanged>;

  showToast: boolean;

  strTest: string;
}

export interface CClientNotificationRemoteClientConnectionNotificationTarget {
  fnTest(): unknown;

  eFeature: Feature;

  playSound: boolean;

  proto: ProtobufClass<NotificationTypes.CClientNotificationRemoteClientConnection>;

  showToast: boolean;

  strTest: string;
}

export interface CClientNotificationRemoteClientStartStreamNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationRemoteClientStartStream>;

  showToast: boolean;

  sound: number;

  strTest: string;
}

export interface CClientNotificationStreamingClientConnectionNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  eFeature: Feature;

  playSound: boolean;

  proto: ProtobufClass<NotificationTypes.CClientNotificationStreamingClientConnection>;

  showToast: boolean;

  strTest: string;
}

export interface CClientNotificationPlaytimeWarningNotificationTarget {
  fnTest(): unknown;

  bCritical: boolean;

  eFeature: Feature;

  fnTray: null;

  proto: ProtobufClass<NotificationTypes.CClientNotificationPlaytimeWarning>;

  showToast: boolean;

  sound: number;

  toastDurationMS: number;
}

export interface CClientNotificationAchievementNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  playSound(e: unknown, t: unknown): unknown;

  showToast(): unknown;

  bEnableInReducedUI: boolean;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationAchievement>;

  sound: number;

  strTest: string;
}

export interface CClientNotificationGameRecordingErrorNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  bEnableInReducedUI: boolean;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationGameRecordingError>;

  showToast: boolean;

  sound: number;

  strTest: string;
}

export interface CClientNotificationGameRecordingStartNotificationTarget {
  fnTest(): unknown;

  bEnableInReducedUI: boolean;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationGameRecordingStart>;

  showToast: boolean;

  strTest: string;
}

export interface CClientNotificationGameRecordingStopNotificationTarget {
  fnTest(): unknown;

  bEnableInReducedUI: boolean;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationGameRecordingStop>;

  showToast: boolean;

  strTest: string;
}

export interface CClientNotificationGameRecordingUserMarkerAddedNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  bEnableInReducedUI: boolean;

  eFeature: Feature;

  playSound: boolean;

  proto: ProtobufClass<NotificationTypes.CClientNotificationGameRecordingUserMarkerAdded>;

  showToast: boolean;

  strTest: string;
}

export interface CClientNotificationGameRecordingInstantClipNotificationTarget {
  fnTest(): unknown;

  bEnableInReducedUI: boolean;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationGameRecordingInstantClip>;

  showToast: boolean;

  strTest: string;
}

export interface CClientNotificationLowBatteryNotificationTarget {
  bCritical: boolean;

  eFeature: Feature;

  fnTray: null;

  proto: ProtobufClass<NotificationTypes.CClientNotificationLowBattery>;

  showToast: boolean;

  sound: number;

  toastDurationMS: number;
}

export interface CClientNotificationHardwareUpdateAvailableNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationHardwareUpdateAvailable>;

  showToast: boolean;

  sound: number;

  strTest: string;
}

export interface CClientNotificationSystemUpdateNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationSystemUpdate>;

  showToast: boolean;

  sound: number;

  strTest: string;
}

export interface CClientNotificationFriendMessageNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  playSound(): unknown;

  showToast(): unknown;

  bEnableInReducedUI: boolean;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationFriendMessage>;

  sound: number;

  strTest: string;
}

export interface CClientNotificationGroupChatMessageNotificationTarget {
  fnTest(): unknown;

  fnTray(e: unknown, t: unknown): void;

  playSound(): unknown;

  showToast(): unknown;

  sound(e: unknown, t: unknown): unknown;

  eFeature: Feature;

  proto: ProtobufClass<NotificationTypes.CClientNotificationGroupChatMessage>;

  strTest: string;
}

export enum Feature {
  NotPresent,
  Failed,
  Disconnected,
  Disconnecting,
  Connecting,
  Connected,
  Retrying,
  Unknown,
}

/**
 * @note copied from steammessages_clientnotificationtypes.ts for easy use in tsmorph
 */
export enum ClientNotificationType {
  Invalid = 0,
  DownloadCompleted = 1,
  FriendInvite = 2,
  FriendInGame = 3,
  FriendOnline = 4,
  Achievement = 5,
  LowBattery = 6,
  SystemUpdate = 7,
  FriendMessage = 8,
  GroupChatMessage = 9,
  FriendInviteRollup = 10,
  FamilySharingStopPlaying = 12,
  Screenshot = 14,
  CloudSyncFailure = 15,
  CloudSyncConflict = 16,
  IncomingVoiceChat = 17,
  ClaimSteamDeckRewards = 18,
  GiftReceived = 19,
  ItemAnnouncement = 20,
  HardwareSurvey = 21,
  LowDiskSpace = 22,
  BatteryTemperature = 23,
  DockUnsupportedFirmware = 24,
  PeerContentUpload = 25,
  CannotReadControllerGuideButton = 26,
  Comment = 27,
  Wishlist = 28,
  TradeOffer = 29,
  AsyncGame = 30,
  General = 31,
  HelpRequest = 32,
  OverlaySplashScreen = 33,
  BroadcastAvailableToWatch = 34,
  TimedTrialRemaining = 35,
  LoginRefresh = 36,
  MajorSale = 37,
  TimerExpired = 38,
  ModeratorMsg = 39,
  SteamInputActionSetChanged = 40,
  RemoteClientConnection = 41,
  RemoteClientStartStream = 42,
  StreamingClientConnection = 43,
  FamilyInvite = 44,
  PlaytimeWarning = 45,
  FamilyPurchaseRequest = 46,
  FamilyPurchaseRequestResponse = 47,
  ParentalFeatureRequest = 48,
  ParentalPlaytimeRequest = 49,
  GameRecordingError = 50,
  ParentalFeatureResponse = 51,
  ParentalPlaytimeResponse = 52,
  RequestedGameAdded = 53,
  ClipDownloaded = 54,
  GameRecordingStart = 55,
  GameRecordingStop = 56,
  GameRecordingUserMarkerAdded = 57,
  GameRecordingInstantClip = 58,
  PlaytestInvite = 59,
  TradeReversal = 60,
  HardwareUpdateAvailable = 61,
}
