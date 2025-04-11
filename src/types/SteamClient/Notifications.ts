import { JsPbMessage, Unregisterable } from './shared';

/**
 * Everything is taken from here:
 * https://github.com/SteamDatabase/SteamTracking/blob/master/Protobufs/steammessages_clientnotificationtypes.proto
 */
export interface Notifications {
  /**
   * If `data` is deserialized, returns one of the following here: {@link Notifications}
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForNotifications(callback: (notificationIndex: number, type: EClientNotificationType, data: ArrayBuffer) => void): Unregisterable;
}

export enum EClientNotificationType {
  Invalid,
  DownloadComplete,
  FriendInvite,
  FriendInGame,
  FriendOnline,
  Achievement,
  LowBattery,
  SystemUpdate,
  FriendMessage,
  GroupChatMessage,
  FriendInviteRollup,
  FamilySharingDeviceAuthorizationChanged,
  FamilySharingStopPlaying,
  FamilySharingLibraryAvailable,
  Screenshot,
  CloudSyncFailure,
  CloudSyncConflict,
  IncomingVoiceChat,
  ClaimSteamDeckRewards,
  GiftReceived,
  ItemAnnouncement,
  HardwareSurvey,
  LowDiskSpace,
  BatteryTemperature,
  DockUnsupportedFirmware,
  PeerContentUpload,
  CannotReadControllerGuideButton,
  Comment,
  Wishlist,
  TradeOffer,
  AsyncGame,
  General,
  HelpRequest,
  OverlaySplashScreen,
  BroadcastAvailableToWatch,
  TimedTrialRemaining,
  LoginRefresh,
  MajorSale,
  TimerExpired,
  ModeratorMsg,
  SteamInputActionSetChanged,
  RemoteClientConnection,
  RemoteClientStartStream,
  StreamingClientConnection,
  FamilyInvite,
  PlaytimeWarning,
  FamilyPurchaseRequest,
  FamilyPurchaseRequestResponse,
  ParentalFeatureRequest,
  ParentalPlaytimeRequest,
  GameRecordingError,
  ParentalFeatureResponse,
  ParentalPlaytimeResponse,
  RequestedGameAdded,
  ClipDownloaded,
  GameRecordingStart,
  GameRecordingStop,
  GameRecordingUserMarkerAdded,
  GameRecordingInstantClip,
}

export enum ESystemUpdateNotificationType {
  Invalid,
  Available,
  NeedsRestart,
}

export enum EGameRecordingErrorType {
  General = 1,
  LowDiskSpace,
}

export interface ClientNotificationGroupChatMessage extends JsPbMessage {
  body(): string;

  chat_group_id(): string;

  chat_id(): string;

  icon(): string;

  notificationid(): number;

  rawbody(): string;

  /** A Steam64 ID. */
  steamid_sender(): string;

  tag(): string;

  title(): string;
}

export interface ClientNotificationFriendMessage extends JsPbMessage {
  body(): string;

  icon(): string;

  notificationid(): number;

  response_steamurl(): string;

  /** A Steam64 ID. */
  steamid(): string;

  tag(): string;

  title(): string;
}

export interface ClientNotificationCloudSyncFailure extends JsPbMessage {
  appid(): number;
}

export interface ClientNotificationCloudSyncConflict extends JsPbMessage {
  appid(): number;
}

export interface ClientNotificationScreenshot extends JsPbMessage {
  description(): string;

  local_url(): string;

  screenshot_handle(): string;
}

export interface ClientNotificationDownloadCompleted extends JsPbMessage {
  appid(): number;

  dlc_appid(): number;
}

export interface ClientNotificationFriendInvite extends JsPbMessage {
  steamid(): number;
}

export interface ClientNotificationFriendInviteRollup extends JsPbMessage {
  new_invite_count(): number;
}

export interface ClientNotificationFriendInGame extends JsPbMessage {
  game_name(): string;

  steamid(): number;
}

export interface ClientNotificationFriendOnline extends JsPbMessage {
  steamid(): number;
}

export interface ClientNotificationAchievement extends JsPbMessage {
  achieved(): boolean;

  achievement_id(): string;

  appid(): number;

  current_progress(): number;

  description(): string;

  global_achieved_pct(): number;

  image_url(): string;

  max_progress(): number;

  min_progress(): number;

  name(): string;

  rtime_unlocked(): number;
}

export interface ClientNotificationLowBattery extends JsPbMessage {
  pct_remaining(): number;
}

export interface ClientNotificationSystemUpdate extends JsPbMessage {
  type(): ESystemUpdateNotificationType;
}

export interface ClientNotificationFriendMessage extends JsPbMessage {
  body(): string;

  icon(): string;

  notificationid(): number;

  response_steamurl(): string;

  steamid(): string;

  tag(): string;

  title(): string;
}

export interface ClientNotificationGroupChatMessage extends JsPbMessage {
  body(): string;

  chat_group_id(): string;

  chat_id(): string;

  icon(): string;

  notificationid(): number;

  rawbody(): string;

  steamid_sender(): string;

  tag(): string;

  title(): string;
}

export interface ClientNotificationFamilySharingDeviceAuthorizationChanged extends JsPbMessage {
  accountid_owner(): number;

  authorized(): boolean;
}

export interface ClientNotificationFamilySharingStopPlaying extends JsPbMessage {
  accountid_owner(): number;

  appid(): number;

  seconds_remaining(): number;
}

export interface ClientNotificationFamilySharingLibraryAvailable extends JsPbMessage {
  accountid_owner(): number;
}

export interface ClientNotificationIncomingVoiceChat extends JsPbMessage {
  steamid(): number;
}

export interface ClientNotificationClaimSteamDeckRewards extends JsPbMessage { }

export interface ClientNotificationGiftReceived extends JsPbMessage {
  sender_name(): string;
}

export interface ClientNotificationItemAnnouncement extends JsPbMessage {
  new_backpack_items(): boolean;

  new_item_count(): number;
}

export interface ClientNotificationHardwareSurveyPending extends JsPbMessage { }

export interface ClientNotificationLowDiskSpace extends JsPbMessage {
  folder_index(): number;
}

export interface ClientNotificationBatteryTemperature extends JsPbMessage {
  notification_type(): string;

  temperature(): number;
}

export interface ClientNotificationDockUnsupportedFirmware extends JsPbMessage { }

export interface ClientNotificationPeerContentUpload extends JsPbMessage {
  appid(): number;

  peer_name(): string;
}

export interface ClientNotificationCannotReadControllerGuideButton extends JsPbMessage {
  controller_index(): number;
}

export interface ClientNotificationOverlaySplashScreen extends JsPbMessage { }

export interface ClientNotificationBroadcastAvailableToWatch extends JsPbMessage {
  broadcast_permission(): number;
}

export interface ClientNotificationTimedTrialRemaining extends JsPbMessage {
  allowed_seconds(): number;

  appid(): number;

  icon(): string;

  offline(): boolean;

  played_seconds(): number;
}

export interface ClientNotificationLoginRefresh extends JsPbMessage { }

export interface ClientNotificationTimerExpired extends JsPbMessage { }

export interface ClientNotificationSteamInputActionSetChanged extends JsPbMessage {
  action_set_name(): string;

  controller_index(): number;
}

export interface ClientNotificationRemoteClientConnection extends JsPbMessage {
  connected(): boolean;

  machine(): string;
}

export interface ClientNotificationRemoteClientStartStream extends JsPbMessage {
  game_name(): string;

  machine(): string;
}

export interface ClientNotificationStreamingClientConnection extends JsPbMessage {
  connected(): boolean;

  hostname(): string;

  machine(): string;
}

export interface ClientNotificationPlaytimeWarning extends JsPbMessage {
  playtime_remaining(): number;

  type(): string;
}

export interface ClientNotificationGameRecordingError extends JsPbMessage {
  error_type(): EGameRecordingErrorType;

  game_id(): number;
}

export interface ClientNotificationGameRecordingStart extends JsPbMessage {
  game_id(): number;
}

export interface ClientNotificationGameRecordingStop extends JsPbMessage {
  clip_id(): string;

  duration_secs(): number;

  game_id(): number;
}

export interface ClientNotificationGameRecordingUserMarkerAdded extends JsPbMessage {
  game_id(): number;
}

export interface CClientNotificationGameRecordingInstantClip extends JsPbMessage {
  clip_id(): string;

  duration_secs(): number;

  game_id(): number;
}
