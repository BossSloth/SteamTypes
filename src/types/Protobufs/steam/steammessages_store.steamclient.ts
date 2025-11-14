import { CStorePageFilter } from './contenthubs';
import { ProvideDeckFeedbackPreference, SteamDeckCompatibilityFeedback } from './enums';
import { CPackageReservationStatus, UserContentDescriptorPreferences } from './steammessages_base';
import { StoreBrowseContext, StoreBrowseItemDataRequest, StoreItem } from './steammessages_storebrowse.steamclient';

export interface CStore_RegisterCDKey_Request {
  activation_code?: string;

  is_request_from_client?: boolean;

  purchase_platform?: number;
}

export interface CStore_PurchaseReceiptInfo {
  base_price?: number;

  country_code?: string;

  currency_code?: number;

  error_appid?: number;

  error_headline?: string;

  error_link_text?: string;

  error_link_url?: string;

  error_string?: string;

  line_items?: CStore_PurchaseReceiptInfo_LineItem[];

  packageid?: number;

  payment_method?: number;

  purchase_status?: number;

  result_detail?: number;

  shipping?: number;

  tax?: number;

  total_discount?: number;

  transaction_time?: number;

  transactionid?: number;
}

export interface CStore_PurchaseReceiptInfo_LineItem {
  appid?: number;

  line_item_description?: string;

  packageid?: number;
}

export interface CStore_RegisterCDKey_Response {
  purchase_receipt_info?: CStore_PurchaseReceiptInfo;

  purchase_result_details?: number;
}

export interface CStore_GetRecommendedTagsForUser_Request {
  country_code?: string;

  favor_rarer_tags?: boolean;

  language?: string;
}

export interface CStore_GetRecommendedTagsForUser_Response {
  tags?: CStore_GetRecommendedTagsForUser_Response_Tag[];
}

export interface CStore_GetRecommendedTagsForUser_Response_Tag {
  name?: string;

  tagid?: number;

  weight?: number;
}

export interface CStore_GetMostPopularTags_Request {
  language?: string;
}

export interface CStore_GetMostPopularTags_Response {
  tags?: CStore_GetMostPopularTags_Response_Tag[];
}

export interface CStore_GetMostPopularTags_Response_Tag {
  name?: string;

  tagid?: number;
}

export interface CStore_GetLocalizedNameForTags_Request {
  language?: string;

  tagids?: number[];
}

export interface CStore_GetLocalizedNameForTags_Response {
  tags?: CStore_GetLocalizedNameForTags_Response_Tag[];
}

export interface CStore_GetLocalizedNameForTags_Response_Tag {
  english_name?: string;

  name?: string;

  normalized_name?: string;

  tagid?: number;
}

export interface CStore_GetTagList_Request {
  have_version_hash?: string;

  language?: string;
}

export interface CStore_GetTagList_Response {
  tags?: CStore_GetTagList_Response_Tag[];

  version_hash?: string;
}

export interface CStore_GetTagList_Response_Tag {
  name?: string;

  tagid?: number;
}

export interface CStoreDiscoveryQueueSettings {
  exclude_dlc?: boolean;

  exclude_early_access?: boolean;

  exclude_software?: boolean;

  exclude_soundtracks?: boolean;

  exclude_videos?: boolean;

  excluded_tagids?: number[];

  featured_tagids?: number[];

  full_controller_support?: boolean;

  include_coming_soon?: boolean;

  native_steam_controller?: boolean;

  os_linux?: boolean;

  os_mac?: boolean;

  os_win?: boolean;
}

export interface CStore_GetDiscoveryQueue_Request {
  context?: StoreBrowseContext;

  country_code?: string;

  data_request?: StoreBrowseItemDataRequest;

  debug_get_solr_query?: boolean;

  experimental_cohort?: number;

  ignore_user_preferences?: boolean;

  no_experimental_results?: boolean;

  queue_type?: StoreDiscoveryQueueType;

  rebuild_queue?: boolean;

  rebuild_queue_if_stale?: boolean;

  settings?: CStoreDiscoveryQueueSettings;

  settings_changed?: boolean;

  store_page_filter?: CStorePageFilter;
}

export interface CStore_GetDiscoveryQueue_Response {
  appids?: number[];

  country_code?: string;

  debug_solr_query?: string;

  exhausted?: boolean;

  experimental_cohort?: number;

  settings?: CStoreDiscoveryQueueSettings;

  skipped?: number;

  store_items?: StoreItem[];
}

export interface CStore_GetDiscoveryQueueSettings_Request {
  queue_type?: StoreDiscoveryQueueType;

  store_page_filter?: CStorePageFilter;
}

export interface CStore_GetDiscoveryQueueSettings_Response {
  country_code?: string;

  settings?: CStoreDiscoveryQueueSettings;
}

export interface CStore_SkipDiscoveryQueueItem_Request {
  appid?: number;

  queue_type?: StoreDiscoveryQueueType;

  store_page_filter?: CStorePageFilter;
}

export interface CStore_SkipDiscoveryQueueItem_Response { }

export interface CStore_GetUserGameInterestState_Request {
  appid?: number;

  beta_appid?: number;

  store_appid?: number;
}

export interface CStore_GetUserGameInterestState_Response {
  beta_status?: PlaytestStatus;

  following?: boolean;

  ignored?: boolean;

  ignored_reason?: number;

  in_queues?: StoreDiscoveryQueueType[];

  owned?: boolean;

  queue_items_next_appid?: number[];

  queue_items_remaining?: number[];

  queues?: CStore_GetUserGameInterestState_Response_InQueue[];

  queues_with_skip?: StoreDiscoveryQueueType[];

  temporarily_owned?: boolean;

  wishlist?: boolean;
}

export interface CStore_GetUserGameInterestState_Response_InQueue {
  experimental_cohort?: number;

  items_remaining?: number;

  next_appid?: number;

  skipped?: boolean;

  type?: StoreDiscoveryQueueType;
}

export interface CStore_GetDiscoveryQueueSkippedApps_Request {
  queue_type?: StoreDiscoveryQueueType;

  steamid?: string;

  store_page_filter?: CStorePageFilter;
}

export interface CStore_GetDiscoveryQueueSkippedApps_Response {
  appids?: number[];
}

export interface CStore_ReportApp_Request {
  appid?: number;

  report?: string;

  report_type?: AppReportType;
}

export interface CStore_ReportApp_Response { }

export interface CStore_GetStorePreferences_Request {
  country_code?: string;
}

export interface CStore_UserPreferences {
  additional_languages?: string;

  hide_store_broadcast?: boolean;

  platform_linux?: boolean;

  platform_mac?: boolean;

  platform_windows?: boolean;

  primary_language?: number;

  provide_deck_feedback?: ProvideDeckFeedbackPreference;

  review_score_preference?: UserReviewScorePreference;

  secondary_languages?: number;

  timestamp_content_descriptor_preferences_updated?: number;

  timestamp_updated?: number;
}

export interface CStore_UserTagPreferences {
  tags_to_exclude?: CStore_UserTagPreferences_Tag[];
}

export interface CStore_UserTagPreferences_Tag {
  name?: string;

  tagid?: number;

  timestamp_added?: number;
}

export interface CStore_GetStorePreferences_Response {
  content_descriptor_preferences?: UserContentDescriptorPreferences;

  preferences?: CStore_UserPreferences;

  tag_preferences?: CStore_UserTagPreferences;
}

export interface CStore_GetTrendingAppsAmongFriends_Request {
  num_apps?: number;

  num_top_friends?: number;
}

export interface CStore_GetTrendingAppsAmongFriends_Response {
  trending_apps?: CStore_GetTrendingAppsAmongFriends_Response_TrendingAppData[];
}

export interface CStore_GetTrendingAppsAmongFriends_Response_TrendingAppData {
  appid?: number;

  steamids_top_friends?: number[];

  total_friends?: number;
}

export interface CStore_MigratePartnerLinkTracking_Notification {
  accountid?: number;

  backfill_source?: PartnerLinkTrackingBackfillSource;

  browserid?: number;
}

export interface CStore_UpdatePackageReservations_Request {
  country_code?: string;

  packages_to_reserve?: number[];

  packages_to_unreserve?: number[];
}

export interface CStore_UpdatePackageReservations_Response {
  reservation_status?: CPackageReservationStatus[];
}

export interface CStore_GetWishlistDemoEmailStatus_Request {
  allow_late_firing?: boolean;

  appid?: number;

  demo_appid?: number;
}

export interface CStore_GetWishlistDemoEmailStatus_Response {
  can_fire?: boolean;

  demo_release_date?: number;

  time_staged?: number;
}

export interface CStore_QueueWishlistDemoEmailToFire_Request {
  allow_late_firing?: boolean;

  appid?: number;

  demo_appid?: number;
}

export interface CStore_QueueWishlistDemoEmailToFire_Response { }

export interface CReservationPositionMessage {
  accountid?: number;

  edistributor?: number;

  localization_token?: string;

  product_identifier?: string;

  rtime_created?: number;

  rtime_estimated_notification?: number;

  start_queue_position?: number;
}

export interface CStore_SetReservationPositionMessage_Request {
  settings?: CReservationPositionMessage[];
}

export interface CStore_SetReservationPositionMessage_Response { }

export interface CStore_DeleteReservationPositionMessage_Request {
  edistributor?: number;

  product_identifier?: string;

  start_queue_position?: number;
}

export interface CStore_DeleteReservationPositionMessage_Response { }

export interface CStore_GetAllReservationPositionMessages_Request { }

export interface CStore_GetAllReservationPositionMessages_Response {
  settings?: CReservationPositionMessage[];
}

export interface CStore_ReloadAllReservationPositionMessages_Notification { }

export interface CSteamDeckCompatibility_SetFeedback_Request {
  appid?: number;

  feedback?: SteamDeckCompatibilityFeedback;
}

export interface CSteamDeckCompatibility_SetFeedback_Response { }

export interface CSteamDeckCompatibility_ShouldPrompt_Request {
  appid?: number;
}

export interface CSteamDeckCompatibility_ShouldPrompt_Response {
  existing_feedback?: SteamDeckCompatibilityFeedback;

  feedback_eligible?: boolean;

  prompt?: boolean;
}

export interface CStore_StorePreferencesChanged_Notification {
  content_descriptor_preferences?: UserContentDescriptorPreferences;

  preferences?: CStore_UserPreferences;

  tag_preferences?: CStore_UserTagPreferences;
}

export enum StoreDiscoveryQueueType {
  New = 0,
  ComingSoon = 1,
  Recommended = 2,
  EveryNewRelease = 3,
  MLRecommender = 5,
  WishlistOnSale = 6,
  DLC = 7,
  DLCOnSale = 8,
  RecommendedComingSoon = 9,
  RecommendedFree = 10,
  RecommendedOnSale = 11,
  RecommendedDemos = 12,
  DLCNewReleases = 13,
  DLCTopSellers = 14,
  DLCUpcoming = 15,
  MAX = 16,
}

export enum PlaytestStatus {
  ETesterStatusNone = 0,
  ETesterStatusPending = 1,
  ETesterStatusInvited = 2,
  ETesterStatusGranted = 3,
  ETesterStatusExpired = 4,
}

export enum AppReportType {
  Invalid = 0,
  Scam = 1,
  Malware = 2,
  HateSpeech = 3,
  Pornography = 4,
  NonLabeledAdultContent = 5,
  Libelous = 6,
  Offensive = 7,
  ExploitsChildren = 8,
  MtxWithNonSteamWalletPaymentMethods = 9,
  CopyrightViolation = 10,
  ViolatesLaws = 11,
  Other = 12,
  Broken = 13,
  AIContentReport = 14,
}

export enum UserReviewScorePreference {
  Unset = 0,
  IncludeAll = 1,
  ExcludeBombs = 2,
}

export enum PartnerLinkTrackingBackfillSource {
  None = 0,
  Web = 1,
  Mobile = 2,
  Desktop = 3,
}
