import Long from 'long';
import { ObservableMap } from 'mobx';
import { GameSessions } from '../SteamClient';
import { JsPbMessage } from '../SteamClient/shared';
import { AchievementData } from './AppDetailsStore';
import { ConnectionManager } from './ConnectionManager';

export interface AppActivityStoreOld {
  BAllowDeckCompatibilityFeedback(e: unknown): unknown;

  BShouldPromptForDeckCompatibilityFeedback(e: unknown): boolean;

  ClearDeckCompatibilityFeedbackAskList(): void;

  FetchActivityHistory(e: unknown, t: unknown): Promise<void>;

  FetchLatestActivity(e: unknown, t: unknown): void;

  FetchLatestActivityFromServer(e: unknown, t: unknown): Promise<void>;

  GetAppActivity(e: unknown): unknown;

  GetDeckCompatibilityFeedback(e: unknown): unknown;

  Init(e: ConnectionManager): void;

  /**
   * Is registered to {@link GameSessions.RegisterForAchievementNotification}
   */
  OnAchievementNotification(...args: Parameters<Parameters<GameSessions['RegisterForAchievementNotification']>[0]>): unknown;

  /**
   * Is registered to {@link GameSessions.RegisterForAppLifetimeNotifications}
   */
  OnAppLifetimeNotification(...args: Parameters<Parameters<GameSessions['RegisterForAppLifetimeNotifications']>[0]>): unknown;

  /**
   * Is registered to {@link GameSessions.RegisterForScreenshotNotification}
   */
  OnScreenshotNotification(...args: Parameters<Parameters<GameSessions['RegisterForScreenshotNotification']>[0]>): unknown;

  RequestRestoreActivity(e: unknown): void;

  RestoreActivity(e: unknown): Promise<void>;

  RestoreCachedActivity(): Promise<unknown>;

  SetDeckCompatibilityFeedback(e: unknown, t: unknown): Promise<boolean>;

  writeDeckCompatibilityFeedbackToLocalStorage(): void;

  CMInterface: ConnectionManager;

  m_CMInterface: ConnectionManager;

  m_deckCompatibilityFeedback_EligibleApps: (object | unknown);

  m_localStorage: m_localStorage;

  m_mapAppActivity: ObservableMap<number, m_mapAppActivity>;

  m_rgDeckCompatibilityFeedback_Ask: unknown[];

  m_setAppFetchRequested: Set<unknown>;

  m_setAppsLoading: Set<unknown>;
}

export interface m_localStorage {
  GetObject(e: unknown, t: unknown): Promise<unknown>;

  GetString(e: unknown): Promise<unknown>;

  RemoveObject(e: unknown): Promise<unknown>;

  StoreObject(e: unknown, t: unknown): Promise<unknown>;

  StoreString(e: unknown, t: unknown): Promise<unknown>;
}

export interface m_mapAppActivity {
  AddGameActivityEvent(e: unknown, t: unknown): void;

  AddNewsEvents(e: unknown): Promise<never[]>;

  AddUserNewsEvent(e: unknown): Promise<void>;

  BEventIsTooOldToCache(e: unknown): boolean;

  BHasEvents(): boolean;

  CacheGameActivityEvent(e: unknown): void;

  CacheUserNewsEvent(e: unknown): void;

  DeleteEvent(e: unknown): Promise<void>;

  DeleteLocally(e: unknown): Promise<void>;

  GetAchievementMapCache(): string;

  GetGameActivityCache(): never[];

  GetUserNewsCache(): never[];

  MergeGameActivity(e: unknown, t: unknown): void;

  MergeUserNews(): Promise<unknown>;

  RequestStoreItems(): Promise<void>;

  RestoreAchievementMapFromCache(e: unknown): void;

  SortEvents(): void;

  appActivityByDay: AppActivityByDay[];

  earliest_game_activity_time: number;

  earliest_user_news_time: number;

  lastAddedEventType?: number;

  lastAddedPartnerEvent: (LastAddedPartnerEvent | null);

  latest_activity_time: number;

  latest_game_activity_time: number;

  latest_user_news_time: number;

  m_AchievementMap: Map<number, Map<string, AchievementData>>;

  m_bNoMoreHistoryAvailable: boolean;

  m_mapActivityByDay: ObservableMap<number, AppActivityByDay>;

  m_rgCachedGameActivityEvents: m_rgCachedGameActivityEvents[];

  m_rgCachedUserNewsEvents: m_rgCachedUserNewsEvents[];

  m_rtEarliestGameActivityTime: number;

  m_rtEarliestUserNewsTime: number;

  m_rtLatestGameActivityTime: number;

  m_rtLatestUserNewsTime: number;

  m_unAppID: number;
}

export interface AppActivityByDay {
  AddAchievementEvent(e: unknown, t: unknown, r: unknown): Promise<undefined>;

  AddActivityEvent(e: unknown, t: unknown, r: unknown, n: unknown): void;

  AddEvent(e: unknown): void;

  AddPartnerEvent(e: unknown, t: unknown): Promise<unknown>;

  AddReceivedGameEvent(e: unknown, t: unknown, r: unknown): Promise<void>;

  AddRecommendedGameEvent(e: unknown, t: unknown, r: unknown): Promise<undefined>;

  AddScreenshotEvent(e: unknown, t: unknown): Promise<undefined>;

  AddSteamTradingCardEvent(e: unknown, t: unknown, r: unknown): void;

  AddUserStatusEvent(e: unknown, t: unknown): Promise<undefined>;

  AddVideoEvent(e: unknown, t: unknown): Promise<undefined>;

  AddWishlistedGameEvent(e: unknown, t: unknown): Promise<void>;

  BHasEvents(): boolean;

  GetEarliestEventTime(): unknown;

  GetLatestEventTime(): unknown;

  RemoveEvent(e: unknown): boolean;

  SortEvents(): void;

  dayBegin?: never;

  events: ((Events2 | LastAddedPartnerEvent)[] | Events2[] | LastAddedPartnerEvent[]);

  isValid: boolean;

  m_mapAchievementsByUser: Map<number, Events2>;

  m_mapReceivedGameByUser: Map<number, Events2>;

  m_mapScreenshotsByUser: never;

  m_mapTradingCardsByUser: Map<number, Events2>;

  m_mapVideosByUser: never;

  m_mapWishlistedGameByUser: Map<number, Events2>;

  m_rgEvents: ((Events2 | LastAddedPartnerEvent)[] | Events2[] | LastAddedPartnerEvent[]);

  m_rtDayBegin?: never;
}

export interface Events2 {
  AddAchievement(e: unknown, t: unknown): void;

  AddAppId(e: unknown): void;

  AddCommentThread(e: unknown, t: unknown): void;

  AddTradingCard(e: unknown): void;

  BIsValid(): boolean;

  BSupportsCommentThreads(): unknown;

  BUserCanDelete(): unknown;

  DeleteOnServer(): void;

  GetActiveCommentThread(): unknown;

  GetAppIds(): unknown;

  GetCommentThreadType(): 0 | 5 | 15 | 16 | 11 | 8;

  GetFilteredAppIds(): unknown[];

  GetHeadline(): '#AppActivity_SteamTradingCards_EarnedTradingCard' | '#AppActivity_SteamTradingCards_EarnedTradingCards';

  GetParentalFeature(): 3 | 2;

  InitFromGameActivity(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): void;

  InitFromUserNewsEvent(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): void;

  SetActiveCommentThread(e: unknown): void;

  achievements?: (Achievements15[] | AchievementData[]);

  activeThread: number;

  appid: number;

  bIsGameActivity: boolean;

  commentThreads: CommentThreads[];

  eEventSubType?: ETradingCardActivity;

  eEventType?: EventType;

  eGameActivityType?: EGameActivityType;

  gameid?: string;

  m_cardAssetIDs?: string[];

  m_rgAchievements?: unknown;

  m_rgAppIds?: number[];

  m_rgTradingCards?: number[];

  m_rtOldestAchievement?: number;

  rtEventTime: number;

  steamIDActor: SteamIDActor;

  steamIDTarget?: never;

  tradingCards?: unknown;

  unUniqueID: number;
}

export interface Achievements15 {
  bAchieved: boolean;

  bHidden?: boolean;

  flAchieved: number;

  rtUnlocked: number;

  strDescription: string;

  strID: string;

  strImage: string;

  strName: string;
}

export interface CommentThreads {
  commentThread?: CommentThread;

  eCommentThreadType: ECommentThreadType;

  gidFeature: string;

  gidFeature2: string;
}

export interface CommentThread {
  BLocalUserOwnsThread(): boolean;

  DeleteComment(e: unknown): Promise<void>;

  FetchPastComments(e: unknown): Promise<void>;

  FetchRecentComments(): Promise<void>;

  GetSecondsSinceLoaded(): number;

  GetUpVoters(): unknown[];

  PostCommentToThread(e: unknown): Promise<void>;

  /** @native */
  RateCommentOrThread(): unknown;

  RefreshIfNeeded(): void;

  id: string;

  m_bUpdating: boolean;

  m_eThreadType: EThreadType;

  m_gidfeature: string;

  m_gidfeature2: string;

  m_msLastUpdated: number;

  m_rgComments: unknown[];

  m_steamIDActor: SteamIDActor;

  m_threadInfo: m_threadInfo;
}

export interface SteamIDActor {
  BIsClanAccount(): boolean;

  BIsIndividualAccount(): boolean;

  BIsValid(): boolean;

  ConvertTo64BitString(): unknown;

  GetAccountID(): unknown;

  GetAccountType(): number;

  GetInstance(): number;

  GetUniverse(): number;

  Render(): string;

  SetAccountID(e: unknown): void;

  SetAccountType(e: unknown): void;

  SetFromComponents(e: unknown, t: unknown, n: unknown, i: unknown): void;

  SetInstance(e: unknown): void;

  SetUniverse(e: unknown): void;

  m_ulSteamID: Long;
}

export interface m_threadInfo {
  answer_actor: number;

  answer_actor_rank: number;

  answer_commentid: string;

  can_post: boolean;

  comment_thread_type: number;

  comments: unknown[];

  commentthreadid: string;

  count: number;

  deleted_comments: unknown[];

  gidfeature: string;

  gidfeature2: string;

  start: number;

  steamid: string;

  total_count: number;

  upvoters: unknown[];

  upvotes: number;

  user_subscribed: boolean;

  user_upvoted: boolean;
}

export interface LastAddedPartnerEvent {
  AddCommentThread(e: unknown, t: unknown): void;

  BIsValid(): boolean;

  BSupportsCommentThreads(): unknown;

  BUserCanDelete(): unknown;

  DeleteOnServer(): void;

  GetActiveCommentThread(): unknown;

  GetAppIds(): unknown[];

  GetCommentThreadType(): 0 | 5 | 15 | 16 | 11 | 8;

  GetEvent(): Promise<unknown>;

  GetParentalFeature(): unknown;

  InitFromGameActivity(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): void;

  InitFromUserNewsEvent(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): void;

  IsEventLoaded(): boolean;

  ReloadEvent(e: unknown): Promise<unknown>;

  SetActiveCommentThread(e: unknown): void;

  activeThread: number;

  announcementGID?: string;

  appid: number;

  bIsGameActivity: boolean;

  comment_count?: number;

  commentThreads: CommentThreads[];

  downvotes?: number;

  eEventSubType?: never;

  eEventType: EventType;

  eGameActivityType?: never;

  eventModel?: EventModel;

  forumTopicGID?: string;

  gameid: string;

  m_gidAnnouncement?: string;

  m_unTimeLastMod?: number;

  rtEventTime: number;

  rtPartnerEventSortDate?: number;

  steamIDActor: SteamIDActor;

  steamIDTarget?: never;

  unUniqueID: number;

  upvotes?: number;
}

export interface EventModel {
  BAllowedSteamStoreSpotlight(): boolean;

  BContentHubDiscountedOnly(): unknown;

  BEventCanShowBroadcastWidget(e: unknown): unknown;

  BHasAnnouncementGID(): boolean;

  BHasBroadcastEnabled(): unknown;

  BHasBroadcastForceBanner(): unknown;

  BHasEmailEnabled(): unknown;

  BHasEventEnded(): boolean;

  BHasForumTopicGID(): boolean;

  BHasImage(e: unknown, t: unknown): unknown;

  BHasLibaryHomeSpotlight(): boolean;

  BHasSaleEnabled(): unknown;

  BHasSaleProductBanners(): unknown;

  BHasSaleVanity(): unknown;

  BHasScheduleEnabled(): unknown;

  BHasSomeImage(e: unknown): unknown;

  BHasSubTitle(e: unknown): boolean;

  BHasSummary(e: unknown): boolean;

  BHasTag(e: unknown): boolean;

  BHasTagStartingWith(e: unknown): unknown;

  BImageNeedScreenshotFallback(e: unknown, t: unknown): boolean;

  BInRealmChina(): unknown;

  BInRealmGlobal(): boolean;

  BIsBackgroundImageGroupingEnabled(): unknown;

  BIsBroadcastAccountIDWhiteListed(e: unknown): unknown;

  BIsEventActionEnabled(): boolean;

  BIsEventInFuture(): boolean;

  BIsImageSafeForAllAges(e: unknown, t: unknown): unknown;

  BIsLanguageValidForRealms(e: unknown): boolean;

  BIsLockedToGameOwners(): boolean;

  BIsLockedToPartnerAppRights(): boolean;

  BIsNextFest(): unknown;

  BIsOGGEvent(): boolean;

  BIsPartnerEvent(): boolean;

  BIsStagedEvent(): boolean;

  BIsUnlistedEvent(): boolean;

  BIsValidForRealm(e: unknown): unknown;

  BIsVisibleEvent(): boolean;

  BMatchesAllTags(e: unknown): boolean;

  BSaleShowBroadcastAtTopOfPage(): boolean;

  BSaleShowCuratorRecommendationAtBottomOfPage(): boolean;

  BShowLibrarySpotlight(): boolean;

  BShowLibrarySpotlightText(): boolean;

  BUsesContentHubForItemSource(): boolean;

  BUseSubscriptionLayout(): boolean;

  /** @param e default: !1 */
  clone(e?: boolean): unknown;

  GenerateDynamicSaleSections(e: unknown, t: unknown, r: unknown, n: unknown): never[];

  GetAllSalePageGroups(): unknown;

  GetAllTags(): unknown;

  GetAnnouncementGID(): unknown;

  GetBroadcastChatVisibility(): unknown;

  GetBroadcastTitle(e: unknown): unknown;

  GetBroadcastWhitelist(): unknown;

  GetBroadcastWhitelistAsSteamIDs(): unknown;

  GetCategoryAsString(): unknown;

  GetContentHub(): unknown;

  GetContentHubCategory(): unknown;

  GetContentHubTag(): unknown;

  GetContentHubType(): unknown;

  GetDayIndexFromEventStart(): number;

  GetDescriptionWithFallback(e: unknown): unknown;

  GetEndTimeAndDateUnixSeconds(): unknown;

  GetEventType(): unknown;

  GetEventTypeAsString(): unknown;

  GetFallbackArtworkScreenshot(): unknown;

  GetForumTopicURL(): string;

  GetGameTitle(e: unknown): unknown;

  GetImageForSizeAsArrayWithFallback(e: unknown, t: unknown, r: unknown, n: unknown): unknown[];

  GetImageFromBeginningOfDescription(e: unknown, t: unknown): unknown;

  /** @param t default: 0 */
  GetImageHash(e: unknown, t?: number): unknown;

  /** @param t default: 0 */
  GetImageHashAndExt(e: unknown, t?: number): unknown;

  /**
   * @param t default: 0
   * @param r default: m.wI.full
   */
  GetImageURL(e: unknown, t?: number, r?: unknown): unknown;

  /** @param r default: m.wI.full */
  GetImageURLWithFallback(e: unknown, t: unknown, r?: unknown): unknown;

  GetImgArray(e: unknown): never[];

  GetIncludedRealmList(): unknown[];

  GetLastReferencedSaleDay(): unknown;

  GetLastReferencedSaleDayFromCapsules(e: unknown, t: unknown): unknown;

  GetLastUpdaterSteamIDStr(): unknown;

  GetLastUpdateTime(): unknown;

  GetNameWithFallback(e: unknown): unknown;

  GetPostTimeAndDateUnixSeconds(): unknown;

  GetRequiredAppIDs(): unknown;

  GetRequiredPackageIDs(): unknown;

  GetRequiredPartnerAppRights(): unknown;

  GetSaleFeaturedApps(e: unknown): unknown;

  GetSaleFeaturedAppsAndDemos(e: unknown): unknown;

  GetSaleFeaturedAppsAndDemosCount(e: unknown): unknown;

  GetSaleFeaturedAppsCount(e: unknown): unknown;

  GetSaleFeaturedBundles(e: unknown): unknown;

  GetSaleFeaturedBundlesCount(e: unknown): unknown;

  GetSaleFeaturedPackages(e: unknown): unknown;

  GetSaleFeaturedPackagesCount(e: unknown): unknown;

  GetSaleItemCountOfType(e: unknown, t: unknown): unknown;

  GetSaleItemOfType(e: unknown, t: unknown): Set<unknown>;

  GetSalePageBackgroundGroup(e: unknown): unknown;

  GetSalePageBackgroundImageGroupCount(): unknown;

  GetSalePageGroupDefinition(): unknown;

  GetSaleSectionByID(e: unknown): unknown;

  GetSaleSectionCount(): unknown;

  GetSaleSectionFirstMatchByType(e: unknown): unknown;

  GetSaleSectionIncludingFooterSections(): unknown;

  GetSaleSections(): unknown;

  GetSaleSectionsByType(e: unknown): unknown;

  GetSaleURL(): unknown;

  GetSaleVanity(): unknown;

  GetStartTimeAndDateUnixSeconds(): unknown;

  GetSteamAwardCategory(): unknown;

  GetSteamAwardNomineeCategories(): unknown;

  GetSubTitle(e: unknown): unknown;

  GetSubTitleWithLanguageFallback(e: unknown): unknown;

  GetSubTitleWithSummaryFallback(e: unknown): unknown;

  GetSummary(e: unknown): unknown;

  GetSummaryWithFallback(e: unknown, t: unknown): unknown;

  GetTaggedItems(): unknown;

  GetValveAccessLog(): unknown;

  GetVisibilityStartTimeAndDateUnixSeconds(): unknown;

  toJSON(e: unknown): object;

  UpdateVoteCount(e: unknown, t: unknown): void;

  announcementClanSteamID: SteamIDActor;

  AnnouncementGID: string;

  appid: number;

  bLoaded: boolean;

  bOldAnnouncement: boolean;

  broadcaster?: never;

  clanSteamID: SteamIDActor;

  comment_type: string;

  creator_steamid: string;

  deleteInProgress: boolean;

  description: ObservableMap<number, string>;

  endTime: number;

  featured_app_tagid: number;

  forumTopicGID: string;

  GID: string;

  gidfeature: string;

  gidfeature2: string;

  has_live_stream?: never;

  jsondata: Jsondata;

  last_update_steamid: string;

  live_stream_viewer_count?: never;

  loadedAllLanguages: boolean;

  m_nBuildID: number;

  m_overrideCurrentDay?: never;

  m_strBuildBranch: string;

  name: ObservableMap<number, string>;

  nCommentCount: number;

  nVotesDown: number;

  nVotesUp: number;

  postTime: number;

  rtime32_last_local_modification?: never;

  rtime32_last_modified: number;

  rtime32_last_solr_search_col_updated: number;

  rtime32_moderator_reviewed: number;

  startTime: number;

  timestamp_loc_updated: never;

  type: number;

  vecTags: string[];

  video_preview_id?: string;

  video_preview_type?: string;

  visibility_state: number;

  visibilityEndTime: number;

  visibilityStartTime: number;
}

export interface Jsondata {
  action_end_time?: number;

  automatically_push_updated_source?: boolean;

  bBroadcastEnabled: boolean;

  broadcast_whitelist: never;

  broadcastChatSetting: string;

  bSaleEnabled: boolean;

  bScheduleEnabled: boolean;

  clone_from_event_gid?: string;

  clone_from_sale_enabled?: boolean;

  default_broadcast_title: string;

  library_spotlight?: boolean;

  library_spotlight_text?: boolean;

  localized_broadcast_left_image: (null[] | undefined[]);

  localized_broadcast_right_image: (null[] | undefined[]);

  localized_broadcast_title: (null[] | undefined[]);

  localized_capsule_image: ((null | string)[] | undefined[]);

  localized_sale_header: (null[] | undefined[]);

  localized_sale_logo: (null[] | undefined[]);

  localized_sale_overlay: (null[] | undefined[]);

  localized_sale_product_banner: (null[] | undefined[]);

  localized_sale_product_mobile_banner: (null[] | undefined[]);

  localized_spotlight_image?: (null | string)[];

  localized_subtitle: ((null | string)[] | undefined[]);

  localized_summary: ((null | string)[] | undefined[]);

  localized_title_image: ((null | string)[] | undefined[]);

  referenced_appids: never;

  rt_migrated_time?: number;

  sale_background_color: string;

  sale_browsemore_bgcolor: string;

  sale_browsemore_color: string;

  sale_browsemore_text: string;

  sale_browsemore_url: string;

  sale_font: string;

  sale_header_offset: number;

  sale_header_overlay?: boolean;

  sale_sections: never;

  sale_show_creator: boolean;

  sale_title_overlay?: boolean;

  scheduleEntries: never;

  steam_award_category_suggestion?: number;

  store_spotlight?: boolean;

  valve_access_log?: Valve_access_log[];
}

export interface Valve_access_log {
  rtUpdated: number;

  strSteamID: string;
}

export interface m_rgCachedGameActivityEvents extends JsPbMessage {
  data1(): unknown;

  data2(): unknown;

  data3(): unknown;

  data4(): unknown;

  event_sub_type(): ETradingCardActivity;

  event_type(): EventType;

  item_appid(): unknown;

  item_assetid(): unknown;

  item_contextid(): unknown;

  proto_data(): unknown;

  set_data1(n: unknown): unknown;

  set_data2(n: unknown): unknown;

  set_data3(n: unknown): unknown;

  set_data4(n: unknown): unknown;

  set_event_sub_type(n: unknown): unknown;

  set_event_type(n: unknown): unknown;

  set_item_appid(n: unknown): unknown;

  set_item_assetid(n: unknown): unknown;

  set_item_contextid(n: unknown): unknown;

  set_proto_data(n: unknown): unknown;

  set_timestamp(n: unknown): unknown;

  timestamp(): unknown;
}

export interface m_rgCachedUserNewsEvents extends JsPbMessage {
  achievement_names(): unknown;

  add_achievement_names(t: unknown, n: unknown): void;

  add_appids(t: unknown, n: unknown): void;

  appids(): unknown;

  clan_announcementid(): unknown;

  clan_eventid(): unknown;

  event_last_mod_time(): unknown;

  event_post_time(): unknown;

  eventtime(): unknown;

  eventtype(): unknown;

  gameid(): unknown;

  packageid(): unknown;

  publishedfileid(): unknown;

  set_achievement_names(n: unknown): unknown;

  set_appids(n: unknown): unknown;

  set_clan_announcementid(n: unknown): unknown;

  set_clan_eventid(n: unknown): unknown;

  set_event_last_mod_time(n: unknown): unknown;

  set_event_post_time(n: unknown): unknown;

  set_eventtime(n: unknown): unknown;

  set_eventtype(n: unknown): unknown;

  set_gameid(n: unknown): unknown;

  set_packageid(n: unknown): unknown;

  set_publishedfileid(n: unknown): unknown;

  set_shortcutid(n: unknown): unknown;

  set_steamid_actor(n: unknown): unknown;

  set_steamid_target(n: unknown): unknown;

  shortcutid(): unknown;

  steamid_actor(): unknown;

  steamid_target(): unknown;
}

export enum EventType {
  Invalid,
  FriendAdded,
  AchievementUnlocked,
  ReceivedNewGame,
  JoinedGroup,
  CommentByMe,
  FriendRemoved,
  GroupCreated,
  CommentOnMe,
  AddedGameToWishlist,
  RecommendedGame,
  ScreenshotPublished_Deprecated,
  VideoPublished_Deprecated,
  FilePublished_Screenshot,
  FilePublished_Video,
  FilePublished_WorkshopItem,
  UserStatus,
  FilePublished_Collection,
  FilePublished_GreenlightGame,
  FilePublished_WorkshopAnnouncement,
  FilePublished_WebGuide,
  FilePublished_Screenshot_Tagged,
  FilePublished_Art,
  FileFavorited,
  PlayedGameFirstTime = 30,
  ClanAchievement = 1001,
  PostedAnnouncement,
  ScheduledEvent,
  SelectedNewPOTW,
  PromotedNewAdmin,
  MessageOnClanPage,
  CuratorRecommendedGame,
}

export enum ETradingCardActivity {
  Invalid,
  CardDrop,
  BoosterDrop,
  BadgeCraft,
}

// TODO: Figure out this enum, seems to only allow value 1 or 2
export enum EGameActivityType {
  GameActivityType1 = 1,
  GameActivityType2,
}

/**
 * @example
 * ```js
 * GetCommentThreadType() {
 *   if (this.bIsGameActivity) return 0;
 *   switch (this.eEventType) {
 *     case a._Q.FilePublished_Screenshot:
 *     case a._Q.FilePublished_Video:
 *       return 5;
 *     case a._Q.UserStatus:
 *       return 15;
 *     case a._Q.ReceivedNewGame:
 *     case a._Q.PlayedGameFirstTime:
 *     case a._Q.AddedGameToWishlist:
 *     case a._Q.AchievementUnlocked:
 *       return 16;
 *     case a._Q.PostedAnnouncement:
 *       return 11;
 *     case a._Q.RecommendedGame:
 *       return 8;
 *     default:
 *       return 0;
 *   }
 * }
 * ```
 */
export enum ECommentThreadType {
  Invalid = 0,
  Media = 5,
  RecommendedGame = 8,
  Announcement = 11,
  UserStatus = 15,
  GameEvent = 16,
}

export enum EThreadType {
  Invalid,
  Screenshot,
  WorkshopAccount_Developer,
  WorkshopAccount_Public,
  PublishedFile_Developer,
  PublishedFile_Public,
  Test,
  ForumTopic,
  Recommendation,
  Video,
  Profile,
  NewsPost,
  Clan,
  ClanAnnouncement,
  ClanEvent,
  UserStatusPublished,
  UserReceivedNewGame,
  PublishedFile_Announcement,
  ModeratorMessage,
  ClanCuratedApp,
}
