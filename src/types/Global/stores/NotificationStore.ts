import { ObservableMap, ObservableSet } from 'mobx';
import { Callbacks, ObservableValue } from 'shared/interfaces';
import { ProtobufClass, ProtobufInterface } from 'shared/protobuf';
import { ClientNotificationType, NotificationTargets } from './NotificationTargets';

export interface NotificationStore {
  /**
   * @native
   */
  AddAppOverlayNotification(): unknown;

  AddBroadcastAvailableToWatch(e: unknown, t: unknown): void;

  AddOverlaySplashScreen(e: unknown): void;

  AddTimedTrialRemaining(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): void;

  AppOverlayRunning(e: unknown, t: unknown): void;

  BAnyContextRenderingToasts(): boolean;

  BAnyToastDisplayAlone(e: unknown): boolean;

  BCanNotifyAboutLoggedInUser(oe: unknown): unknown;

  BContextRenderingToasts(e: unknown): unknown;

  BIsToastRateLimited(e: unknown, t: unknown, r: unknown): boolean;

  BIsUserInGame(): unknown;

  BNextToastDisplayAlone(e: unknown): unknown;

  BShouldSupressToasts(): unknown;

  BShowToast(e: unknown, t: unknown): unknown;

  BSkipSystemUpdateNotification(e: unknown): boolean;

  ChooseSound(e: unknown, t: unknown): unknown;

  ClearAllToastNotifications(): void;

  ClearRemoveFromTrayTimer(): void;

  ControllerConnectedNotification(e: unknown): void;

  ControllerDisconnectedNotification(e: unknown, t: unknown): void;

  ControllerLowBatteryNotification(e: unknown, t: unknown): void;

  Dev_SendTestNotifications(): void;

  DispatchNextToast(): void;

  DoScreenshotNotification(e: unknown, t: unknown): void;

  ExpireToast(e: unknown): void;

  GetCurrentAppOverlayNotification(e: unknown): unknown;

  GetCurrentToastNotification(): null;

  GetNotificationsInTray(): unknown[];

  GetNotificationTargets(): NotificationTargets;

  HandlePendingErrorCondition(): void;

  HideLoggedInUserToast(): void;

  IncomingVoiceChat(e: unknown, t: unknown): void;

  Init(): void;

  LoadServerToastRequiredData(e: unknown, t: unknown): void;

  MarkNotificationRead(e: unknown): void;

  MaybeNotifyAboutLoggedInUser(): void;

  NotifyClaimSteamDeckRewards(): void;

  NotifyLowDiskSpace(e: unknown): void;

  NotifyRedeemFramePromo(): void;

  NotifyTimerExpired(e: unknown): void;

  OnBatteryLevelChange(e: unknown, t: unknown, r: unknown): void;

  OnBatteryTemperatureChange(e: unknown): void;

  OnNewNotificationReceived(e: unknown): void;

  OnNotification(e: unknown, t: unknown, r: unknown, ue: unknown): void;

  OnNotificationUpdateReceived(e: unknown, t: unknown): void;

  OnScreenshotStarted(): void;

  OnSystemResumedFromSuspend(): number;

  PlayNotificationSound(e: unknown): void;

  PopNextToastNotification(e: unknown): unknown;

  ProcessNotification(e: unknown, t: unknown, r: unknown): void;

  RemoveExpiredTray(): void;

  RemoveFromToastsWhere(e: unknown): void;

  RemoveFromTrayWhere(e: unknown): void;

  RemoveGroupFromTray(e: unknown): void;

  RemoveScreenshotNotification(e: unknown): void;

  RunDebugTestsWhenServicesReady(e: unknown): Promise<void>;

  ScheduleRemoveFromTray(e: unknown): void;

  SendPendingServerToasts(): void;

  SetContextRenderingToast(e: unknown, t: unknown): void;

  /**
   * @param t default: !1
   */
  TestAchievement(e: unknown, t?: boolean): Promise<void>;

  TestAsyncGame(e: unknown): void;

  TestClipDownloaded(): Promise<void>;

  TestCloudSyncConflict(e: unknown): void;

  TestCloudSyncFailure(e: unknown): void;

  TestComment(): Promise<void>;

  TestDownloadComplete(e: unknown): void;

  TestFamilyInvite(e: unknown): void;

  TestFamilyPurchaseRequest(e: unknown): void;

  TestFamilyPurchaseRequestResponse(e: unknown): void;

  TestFamilySharing(): void;

  TestFriendIngame(e: unknown, t: unknown): void;

  TestFriendInvite(e: unknown): void;

  TestFriendInviteRollup(e: unknown): void;

  TestFriendMessage(e: unknown, t: unknown): void;

  TestFriendOnline(e: unknown): void;

  TestGameRecordingInstantClip(): void;

  TestGameRecordingStart(): void;

  TestGameRecordingStop(): void;

  TestGeneralAnnouncement(): void;

  TestGift(e: unknown): void;

  TestGRE(): void;

  TestGroupChatMention(e: unknown, t: unknown): void;

  TestGroupChatMessage(e: unknown, t: unknown): void;

  TestGRUM(): void;

  TestHardwareSurvey(): void;

  TestHardwareUpdateNotification(): void;

  TestHelpRequest(): void;

  TestIncomingVoiceChat(): void;

  TestItemAnnouncement(e: unknown): Promise<void>;

  TestLowBatteryNotification(e: unknown): void;

  TestMajorSale(): void;

  TestModeratorMessage(): void;

  TestParentalFeatureRequest(e: unknown): void;

  TestParentalFeatureResponse(e: unknown): void;

  TestParentalPlaytimeRequest(e: unknown): void;

  TestParentalPlaytimeResponse(e: unknown): void;

  TestPlaytestInvite(): void;

  TestPlaytimeWarning(): void;

  TestReadControllerGuide(): void;

  TestRemoteClientConnection(): void;

  TestRemoteClientStartStream(): void;

  TestRequestedGameAdded(e: unknown): void;

  TestScreenshot(): void;

  TestSteamInputActionSetChanged(): void;

  TestStreamingClientConnection(): void;

  TestSystemUpdate(e: unknown): void;

  TestTradeOffer(): void;

  TestTradeReversal(): void;

  TestUnsupportedDock(): void;

  TestWishlist(e: unknown): void;

  Viewed(): void;

  CurrentToastSubscribableValue: ObservableValue<null>;

  LoggedInUserToastShowing: boolean;

  m_bCheckBatteryAfterResume: boolean;

  m_bLoggedInUserToastShowing: boolean;

  m_bShowClientItemAnnouncementToasts: boolean;

  m_bShowedHighBatteryTempNotification: boolean;

  m_bShowedLowBatteryTempNotification: boolean;

  m_bTestNotifications: boolean;

  m_cbkNotificationTray: Callbacks;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_eErrorConditionNotificationShowing: EErrorConditionNotificationShowing;

  m_hPendingToastTimer: undefined;

  m_hTrayRemoveTimer: undefined;

  m_iLastBatteryLevelNotification: number;

  m_LastSystemUpdateNotification: LastSystemUpdateNotification | null;

  m_mapAppOverlayToasts: ObservableMap<unknown, unknown>;

  m_mapToastLastShown: Map<unknown, unknown>;

  m_nNextTestNotificationID: number;

  m_nUnviewedNotifications: number;

  m_rgNotificationToasts: unknown[];

  m_rgNotificationTray: RgNotificationTray[];

  m_rgPendingToasts: unknown[];

  m_rtNextTrayRemove: number;

  m_setContextsRenderingToasts: ObservableSet<unknown>;

  m_valueCurrentToast: ObservableValue<null>;

  ToastCount: number;
}

export interface LastSystemUpdateNotification {
  eType: ClientNotificationType;

  rtDisplayed: number;
}

export interface RgNotificationTray<T extends ClientNotificationType = ClientNotificationType> {
  eType: T;

  notifications: Notification<T>[];
}
/**
 * @compareOriginalName Notifications
 */
export interface Notification<T extends ClientNotificationType> {
  bNewIndicator: boolean;

  data: ProtobufInterface<NotificationTargets[T] extends { proto: ProtobufClass<infer U> } ? U : never>;

  eSource: ESource;

  eType: T;

  notificationID: string;

  nToastDurationMS: number;

  rtCreated: number;
}

/** @generated */
export enum ESource {
  Unknwon = 0,
  ESource1 = 1,
  ESource2 = 2,
}

/** @generated */
export enum EErrorConditionNotificationShowing {
  Unknown = -1,
  EErrorConditionNotificationShowing0 = 0,
}
