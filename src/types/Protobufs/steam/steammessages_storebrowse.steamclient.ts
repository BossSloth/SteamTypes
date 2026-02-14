import { CStorePageFilter } from './contenthubs';
import { SteamDeckCompatibilityCategory, SteamOSCompatibilityCategory } from './enums';
import { ContentDescriptorID } from './enums_productinfo';

export interface StoreItemID {
  appid?: number;

  bundleid?: number;

  creatorid?: number;

  hubcategoryid?: number;

  packageid?: number;

  tagid?: number;
}

export interface StoreBrowseContext {
  country_code?: string;

  elanguage?: number;

  language?: string;
}

export interface StoreBrowseItemDataRequest {
  apply_user_filters?: boolean;

  include_all_purchase_options?: boolean;

  include_assets?: boolean;

  include_assets_without_overrides?: boolean;

  include_basic_info?: boolean;

  include_full_description?: boolean;

  include_included_items?: boolean;

  include_links?: boolean;

  include_platforms?: boolean;

  include_ratings?: boolean;

  include_release?: boolean;

  include_reviews?: boolean;

  include_screenshots?: boolean;

  include_supported_languages?: boolean;

  include_tag_count?: number;

  include_trailers?: boolean;

  included_item_data_request?: StoreBrowseItemDataRequest;
}

export interface CStoreBrowse_GetItems_Request {
  context?: StoreBrowseContext;

  data_request?: StoreBrowseItemDataRequest;

  ids?: StoreItemID[];
}

export interface StoreItem {
  accessories?: StoreItem_PurchaseOption[];

  appid?: number;

  assets?: StoreItem_Assets;

  assets_without_overrides?: StoreItem_Assets;

  basic_info?: StoreItem_BasicInfo;

  best_purchase_option?: StoreItem_PurchaseOption;

  categories?: StoreItem_Categories;

  content_descriptorids?: ContentDescriptorID[];

  free_weekend?: StoreItem_FreeWeekend;

  full_description?: string;

  game_count?: number;

  game_rating?: StoreGameRating;

  id?: number;

  included_appids?: number[];

  included_items?: StoreItem_IncludedItems;

  included_types?: StoreAppType[];

  internal_name?: string;

  invalid_purchase_options?: StoreItem_PurchaseOption[];

  is_coming_soon?: boolean;

  is_early_access?: boolean;

  is_free?: boolean;

  is_free_temporarily?: boolean;

  item_type?: StoreItemType;

  links?: StoreItem_Link[];

  name?: string;

  platforms?: StoreItem_Platforms;

  purchase_options?: StoreItem_PurchaseOption[];

  related_items?: StoreItem_RelatedItems;

  release?: StoreItem_ReleaseInfo;

  reviews?: StoreItem_Reviews;

  screenshots?: StoreItem_Screenshots;

  self_purchase_option?: StoreItem_PurchaseOption;

  store_url_path?: string;

  store_url_path_override?: string;

  success?: number;

  supported_languages?: StoreItem_SupportedLanguage[];

  tagids?: number[];

  tags?: StoreItem_Tag[];

  trailers?: StoreItem_Trailers;

  type?: StoreAppType;

  unlisted?: boolean;

  unvailable_for_country_restriction?: boolean;

  user_filter_failure?: StoreBrowseFilterFailure;

  visible?: boolean;
}

export interface StoreItem_RelatedItems {
  demo_appid?: number[];

  parent_appid?: number;

  standalone_demo_appid?: number[];
}

export interface StoreItem_IncludedItems {
  included_apps?: StoreItem[];

  included_packages?: StoreItem[];
}

export interface StoreItem_Categories {
  controller_categoryids?: number[];

  feature_categoryids?: number[];

  supported_player_categoryids?: number[];
}

export interface StoreItem_Reviews {
  summary_filtered?: StoreItem_Reviews_StoreReviewSummary;

  summary_language_specific?: StoreItem_Reviews_StoreReviewSummary;

  summary_unfiltered?: StoreItem_Reviews_StoreReviewSummary;
}

export interface StoreItem_Reviews_StoreReviewSummary {
  percent_positive?: number;

  review_count?: number;

  review_score?: UserReviewScore;

  review_score_label?: string;
}

export interface StoreItem_BasicInfo {
  capsule_headline?: string;

  developers?: StoreItem_BasicInfo_CreatorHomeLink[];

  franchises?: StoreItem_BasicInfo_CreatorHomeLink[];

  publishers?: StoreItem_BasicInfo_CreatorHomeLink[];

  short_description?: string;
}

export interface StoreItem_BasicInfo_CreatorHomeLink {
  creator_clan_account_id?: number;

  name?: string;
}

export interface StoreItem_Tag {
  tagid?: number;

  weight?: number;
}

export interface StoreItem_Assets {
  asset_url_format?: string;

  clan_avatar?: string;

  community_icon?: string;

  header?: string;

  hero_capsule?: string;

  hero_capsule_2x?: string;

  library_capsule?: string;

  library_capsule_2x?: string;

  library_hero?: string;

  library_hero_2x?: string;

  main_capsule?: string;

  package_header?: string;

  page_background?: string;

  page_background_path?: string;

  raw_page_background?: string;

  small_capsule?: string;
}

export interface StoreItem_ReleaseInfo {
  coming_soon_display?: string;

  custom_release_date_message?: string;

  is_abridged_release_date?: boolean;

  is_coming_soon?: boolean;

  is_early_access?: boolean;

  is_preload?: boolean;

  limited_launch_active?: boolean;

  linux_release_date?: number;

  mac_release_date?: number;

  original_release_date?: number;

  original_steam_release_date?: number;

  release_from_early_access_date?: number;

  release_from_early_access_style?: number;

  steam_release_date?: number;
}

export interface StoreItem_Platforms {
  mac?: boolean;

  steam_deck_compat_category?: SteamDeckCompatibilityCategory;

  steam_os_compat_category?: SteamOSCompatibilityCategory;

  steamos_linux?: boolean;

  vr_support?: StoreItem_Platforms_VRSupport;

  windows?: boolean;
}

export interface StoreItem_Platforms_VRSupport {
  htc_vive?: boolean;

  oculus_rift?: boolean;

  valve_index?: boolean;

  vrhmd?: boolean;

  vrhmd_only?: boolean;

  windows_mr?: boolean;
}

export interface StoreItem_PurchaseOption {
  active_discounts?: StoreItem_PurchaseOption_Discount[];

  bundle_discount_pct?: number;

  bundleid?: number;

  discount_pct?: number;

  final_price_in_cents?: number;

  formatted_final_price?: string;

  formatted_original_price?: string;

  formatted_price_before_bundle_discount?: string;

  free_to_keep_ends?: number;

  hide_discount_pct_for_compliance?: boolean;

  included_game_count?: number;

  is_commercial_license?: boolean;

  is_free_to_keep?: boolean;

  lowest_recent_price_in_cents?: number;

  must_purchase_as_set?: boolean;

  original_price_in_cents?: number;

  packageid?: number;

  price_before_bundle_discount?: number;

  purchase_option_name?: string;

  recurrence_info?: StoreItem_PurchaseOption_RecurrenceInfo;

  requires_shipping?: boolean;

  should_suppress_discount_pct?: boolean;

  user_can_purchase_as_gift?: boolean;
}

export interface StoreItem_PurchaseOption_Discount {
  discount_amount?: number;

  discount_description?: string;

  discount_end_date?: number;
}

export interface StoreItem_PurchaseOption_RecurrenceInfo {
  billing_agreement_type?: number;

  formatted_renewal_price?: string;

  packageid?: number;

  renewal_price_in_cents?: number;

  renewal_time_period?: number;

  renewal_time_unit?: number;
}

export interface StoreItem_Screenshots {
  all_ages_screenshots?: StoreItem_Screenshots_Screenshot[];

  mature_content_screenshots?: StoreItem_Screenshots_Screenshot[];
}

export interface StoreItem_Screenshots_Screenshot {
  filename?: string;

  ordinal?: number;
}

export interface StoreItem_Trailers {
  highlights?: StoreItem_Trailers_Trailer[];

  other_trailers?: StoreItem_Trailers_Trailer[];
}

export interface StoreItem_Trailers_VideoSource {
  filename?: string;

  type?: string;
}

export interface StoreItem_Trailers_AdaptiveTrailer {
  cdn_path?: string;

  encoding?: string;
}

export interface StoreItem_Trailers_Trailer {
  adaptive_trailers?: StoreItem_Trailers_AdaptiveTrailer[];

  all_ages?: boolean;

  microtrailer?: StoreItem_Trailers_VideoSource[];

  screenshot_full?: string;

  screenshot_medium?: string;

  trailer_base_id?: number;

  trailer_category?: TrailerCategory;

  trailer_name?: string;

  trailer_url_format?: string;
}

export interface StoreItem_SupportedLanguage {
  eadditionallanguage?: number;

  elanguage?: number;

  full_audio?: boolean;

  subtitles?: boolean;

  supported?: boolean;
}

export interface StoreItem_FreeWeekend {
  end_time?: number;

  start_time?: number;

  text?: string;
}

export interface StoreItem_Link {
  link_type?: StoreLinkType;

  text?: string;

  url?: string;
}

export interface StoreGameRating {
  descriptors?: string[];

  image_target?: string;

  image_url?: string;

  interactive_elements?: string;

  rating?: string;

  required_age?: number;

  type?: string;

  use_age_gate?: boolean;
}

export interface StoreBrowseFilterFailure {
  already_owned?: boolean;

  demo_for_owned_game?: boolean;

  dlc_for_unowned_game?: boolean;

  excluded_content_descriptorids?: ContentDescriptorID[];

  excluded_tagids?: number[];

  filter_failure?: EStoreBrowseFilterFailure;

  ignored?: boolean;

  nonpreferred_product_type?: boolean;

  not_in_users_language?: boolean;

  not_on_users_platform?: boolean;

  on_wishlist?: boolean;
}

export interface CStoreBrowse_GetItems_Response {
  store_items?: StoreItem[];
}

export interface CStoreBrowse_GetStoreCategories_Request {
  elanguage?: number;

  language?: string;
}

export interface CStoreBrowse_GetStoreCategories_Response {
  categories?: CStoreBrowse_GetStoreCategories_Response_Category[];
}

export interface CStoreBrowse_GetStoreCategories_Response_Category {
  categoryid?: number;

  computed?: boolean;

  display_name?: string;

  edit_sort_order?: number;

  edit_url?: string;

  image_url?: string;

  internal_name?: string;

  show_in_search?: boolean;

  type?: StoreCategoryType;
}

export interface CStoreBrowse_GetContentHubConfig_Request {
  context?: StoreBrowseContext;

  excluded_content_descriptorids?: ContentDescriptorID[];
}

export interface CStoreBrowse_GetContentHubConfig_Response {
  hubconfigs?: CStoreBrowse_GetContentHubConfig_Response_ContentHubConfig[];
}

export interface CStoreBrowse_GetContentHubConfig_Response_ContentHubConfig {
  any_one_of_tags?: number[];

  display_name?: string;

  handle?: string;

  hub_description?: string;

  hubcategoryid?: number;

  must_have_tags?: number[];

  must_not_have_tags?: number[];

  replaces_tags?: number[];

  type?: string;

  url_path?: string;
}

export interface CStoreBrowse_GetPriceStops_Request {
  country_code?: string;

  currency_code?: string;
}

export interface CStoreBrowse_GetPriceStops_Response {
  currency_code?: string;

  price_stops?: CStoreBrowse_GetPriceStops_Response_PriceStop[];
}

export interface CStoreBrowse_GetPriceStops_Response_PriceStop {
  amount_in_cents?: number;

  formatted_amount?: string;
}

export interface CStoreBrowse_GetDLCForApps_Request {
  appids?: StoreItemID[];

  context?: StoreBrowseContext;

  steamid?: number;

  store_page_filter?: CStorePageFilter;
}

export interface CStoreBrowse_GetDLCForApps_Response {
  dlc_data?: CStoreBrowse_GetDLCForApps_Response_DLCData[];

  playtime?: CStoreBrowse_GetDLCForApps_Response_PlaytimeForApp[];
}

export interface CStoreBrowse_GetDLCForApps_Response_DLCData {
  appid?: number;

  coming_soon?: boolean;

  discount?: number;

  free?: boolean;

  parentappid?: number;

  price?: number;

  release_date?: number;
}

export interface CStoreBrowse_GetDLCForApps_Response_PlaytimeForApp {
  appid?: number;

  last_played?: number;

  playtime?: number;
}

export interface CStoreBrowse_GetDLCForAppsSolr_Request {
  appids?: number[];

  context?: StoreBrowseContext;

  count?: number;

  flavor?: string;

  store_page_filter?: CStorePageFilter;
}

export interface CStoreBrowse_GetDLCForAppsSolr_Response {
  dlc_lists?: CStoreBrowse_GetDLCForAppsSolr_Response_DLCList[];
}

export interface CStoreBrowse_GetDLCForAppsSolr_Response_DLCList {
  dlc_appids?: number[];

  parent_appid?: number;
}

export interface CStoreBrowse_GetHardwareItems_Request {
  context?: StoreBrowseContext;

  packageid?: number[];
}

export interface CHardwarePackageDetails {
  account_restricted_from_purchasing?: boolean;

  allow_purchase_in_country?: boolean;

  allow_quantity_purchase?: boolean;

  estimated_delivery_latest_business_days?: number;

  estimated_delivery_soonest_business_days?: number;

  expired?: boolean;

  high_pending_orders?: boolean;

  inventory_available?: boolean;

  max_quantity_per_purchase?: number;

  notificaton_token?: string;

  packageid?: number;

  requires_reservation?: boolean;

  reservation_state?: number;

  rtime_estimated_notification?: number;

  time_expires?: number;

  time_reserved?: number;
}

export interface CStoreBrowse_GetHardwareItems_Response {
  details?: CHardwarePackageDetails[];
}

export enum StoreItemType {
  Invalid = -1,
  App = 0,
  Package = 1,
  Bundle = 2,
  Mtx = 3,
  Tag = 4,
  Creator = 5,
  HubCategory = 6,
}

export enum StoreAppType {
  Game = 0,
  Demo = 1,
  Mod = 2,
  Movie = 3,
  DLC = 4,
  Guide = 5,
  Software = 6,
  Video = 7,
  Series = 8,
  Episode = 9,
  Hardware = 10,
  Music = 11,
  Beta = 12,
  Tool = 13,
  Advertising = 14,
}

export enum UserReviewScore {
  None = 0,
  OverwhelminglyNegative = 1,
  VeryNegative = 2,
  Negative = 3,
  MostlyNegative = 4,
  Mixed = 5,
  MostlyPositive = 6,
  Positive = 7,
  VeryPositive = 8,
  OverwhelminglyPositive = 9,
}

export enum TrailerCategory {
  Invalid = 0,
  Gameplay = 1,
  Teaser = 2,
  Cinematic = 3,
  Update = 4,
  Accolades = 5,
  Interview = 6,
}

export enum EStoreBrowseFilterFailure {
  None = 0,
  Redundant = 10,
  NotPreferred = 20,
  NotInterested = 30,
  UnwantedContent = 40,
  Unavailable = 50,
}

export enum StoreLinkType {
  None = 0,
  YouTube = 1,
  Facebook = 2,
  Twitter = 3,
  Twitch = 4,
  Discord = 5,
  QQ = 6,
  VK = 7,
  Bilibili = 8,
  Weibo = 9,
  Reddit = 10,
  Instagram = 11,
  Tumblr = 12,
  Tieba = 13,
  Tiktok = 14,
  Telegram = 15,
  LinkedIn = 16,
  WeChat = 17,
  QQLink = 18,
  Douyin = 19,
  Bluesky = 20,
  Mastodon = 21,
  Threads = 22,
  QQChannel = 23,
  RedNote = 24,
  MAX = 25,
}

export enum StoreCategoryType {
  Category = 0,
  SupportedPlayers = 1,
  Feature = 2,
  ControllerSupport = 3,
  CloudGaming = 4,
  MAX = 5,
}
