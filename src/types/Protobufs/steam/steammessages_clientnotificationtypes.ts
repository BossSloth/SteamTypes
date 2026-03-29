export interface CClientNotificationCloudSyncFailure {
  appid?: number;
}

export interface CClientNotificationCloudSyncConflict {
  appid?: number;
}

export interface CClientNotificationScreenshot {
  description?: string;

  local_url?: string;

  screenshot_handle?: string;
}

export interface CClientNotificationDownloadCompleted {
  appid?: number;

  dlc_appid?: number;
}

export interface CClientNotificationFriendInvite {
  steamid?: string;
}

export interface CClientNotificationFriendInviteRollup {
  new_invite_count?: number;
}

export interface CClientNotificationFriendInGame {
  game_name?: string;

  steamid?: string;
}

export interface CClientNotificationFriendOnline {
  steamid?: string;
}

export interface CClientNotificationAchievement {
  achieved?: boolean;

  achievement_id?: string;

  appid?: number;

  current_progress?: number;

  description?: string;

  global_achieved_pct?: number;

  image_url?: string;

  max_progress?: number;

  min_progress?: number;

  name?: string;

  rtime_unlocked?: number;
}

export interface CClientNotificationLowBattery {
  pct_remaining?: number;
}

export interface CClientNotificationSystemUpdate {
  type?: SystemUpdateNotificationType;
}

export interface CClientNotificationFriendMessage {
  body?: string;

  icon?: string;

  notificationid?: number;

  response_steamurl?: string;

  steamid?: string;

  tag?: string;

  title?: string;
}

export interface CClientNotificationGroupChatMessage {
  body?: string;

  chat_group_id?: string;

  chat_id?: string;

  icon?: string;

  notificationid?: number;

  rawbody?: string;

  steamid_sender?: string;

  tag?: string;

  title?: string;
}

export interface CClientNotificationFamilySharingDeviceAuthorizationChanged {
  accountid_owner?: number;

  authorized?: boolean;
}

export interface CClientNotificationFamilySharingStopPlaying {
  accountid_owner?: number;

  appid?: number;

  seconds_remaining?: number;
}

export interface CClientNotificationFamilySharingLibraryAvailable {
  accountid_owner?: number;
}

export interface CClientNotificationIncomingVoiceChat {
  steamid?: string;
}

export interface CClientNotificationClaimSteamDeckRewards { }

export interface CClientNotificationGiftReceived {
  sender_name?: string;
}

export interface CClientNotificationItemAnnouncement {
  new_backpack_items?: boolean;

  new_item_count?: number;
}

export interface CClientNotificationHardwareSurveyPending { }

export interface CClientNotificationLowDiskSpace {
  folder_index?: number;
}

export interface CClientNotificationBatteryTemperature {
  notification_type?: string;

  temperature?: number;
}

export interface CClientNotificationDockUnsupportedFirmware { }

export interface CClientNotificationPeerContentUpload {
  appid?: number;

  peer_name?: string;
}

export interface CClientNotificationCannotReadControllerGuideButton {
  controller_index?: number;
}

export interface CClientNotificationOverlaySplashScreen { }

export interface CClientNotificationBroadcastAvailableToWatch {
  broadcast_permission?: number;
}

export interface CClientNotificationTimedTrialRemaining {
  allowed_seconds?: number;

  appid?: number;

  icon?: string;

  offline?: boolean;

  played_seconds?: number;
}

export interface CClientNotificationLoginRefresh { }

export interface CClientNotificationTimerExpired { }

export interface CClientNotificationSteamInputActionSetChanged {
  action_set_name?: string;

  controller_index?: number;
}

export interface CClientNotificationRemoteClientConnection {
  connected?: boolean;

  machine?: string;
}

export interface CClientNotificationRemoteClientStartStream {
  game_name?: string;

  machine?: string;
}

export interface CClientNotificationStreamingClientConnection {
  connected?: boolean;

  guest_id?: number;

  hostname?: string;

  machine?: string;
}

export interface CClientNotificationPlaytimeWarning {
  playtime_remaining?: number;

  type?: string;
}

export interface CClientNotificationGameRecordingError {
  error_type?: GameRecordingErrorType;

  game_id?: string;
}

export interface CClientNotificationGameRecordingStart {
  game_id?: string;
}

export interface CClientNotificationGameRecordingStop {
  clip_id?: string;

  duration_secs?: number;

  game_id?: string;
}

export interface CClientNotificationGameRecordingUserMarkerAdded {
  game_id?: string;
}

export interface CClientNotificationGameRecordingInstantClip {
  clip_id?: string;

  duration_secs?: number;

  game_id?: string;
}

export interface CClientNotificationHardwareUpdateAvailable {
  etype?: number[];
}
/**
 * @note make sure to copy these values if updated to NotificationTargets.ts
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

export enum SystemUpdateNotificationType {
  Invalid = 0,
  Available = 1,
  NeedsRestart = 2,
}

export enum GameRecordingErrorType {
  EGameRecordingErrorGeneral = 1,
  EGameRecordingErrorLowDiskSpace = 2,
}
