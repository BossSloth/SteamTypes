export interface CMsgIPAddress {
  v4?: number;

  v6?: Uint8Array;
}

export interface CMsgIPAddressBucket {
  bucket?: string;

  original_ip_address?: CMsgIPAddress;
}

export interface CMsgGCRoutingProtoBufHeader {
  dst_gc_dir_index?: number;

  dst_gcid_queue?: number;
}

export interface CMsgProtoBufHeader {
  admin_request_spoofing_steamid?: string;

  admin_spoofing_user?: boolean;

  auth_account_flags?: number;

  client_sessionid?: number;

  cm_sysid?: number;

  debug_source?: string;

  debug_source_string_index?: number;

  eresult?: number;

  error_message?: string;

  exclude_client_sessionids?: number[];

  forward_to_sysid?: number[];

  ip?: number;

  ip_v6?: Uint8Array;

  is_from_external_source?: boolean;

  is_valveds?: boolean;

  jobid_source?: string;

  jobid_target?: string;

  launcher_type?: number;

  messageid?: number;

  publisher_group_id?: number;

  realm?: number;

  routing_appid?: number;

  routing_gc?: CMsgGCRoutingProtoBufHeader;

  seq_num?: number;

  session_disposition?: SessionDisposition;

  steamid?: string;

  sysid?: number;

  target_job_name?: string;

  timeout_ms?: number;

  token_id?: number;

  token_source?: number;

  trace_tag?: string;

  transport_error?: number;

  webapi_key_id?: number;

  webui_auth_key?: string;

  wg_token?: string;
}

export enum SessionDisposition {
  SessionDispositionNormal = 0,
  SessionDispositionDisconnect = 1,
}

export interface CMsgKubeRPCPacket {
  hdr?: CMsgKubeRPCPacket_Hdr;

  payload?: Uint8Array;
}

export interface CMsgKubeRPCPacket_Hdr {
  eresult?: number;

  error_message?: string;

  jobid_source?: string;

  jobid_target?: string;

  reply_address?: string;

  target_job_name?: string;
}

export interface CMsgMulti {
  message_body?: Uint8Array;

  size_unzipped?: number;
}

export interface CMsgProtobufWrapped {
  message_body?: Uint8Array;
}

export interface CMsgAuthTicket {
  eresult?: number;

  estate?: number;

  gameid?: string;

  h_steam_pipe?: number;

  server_secret?: Uint8Array;

  steamid?: string;

  ticket?: Uint8Array;

  ticket_crc?: number;

  ticket_type?: number;
}

export interface CCDDBAppDetailCommon {
  app_type?: number;

  appid?: number;

  community_visible_stats?: boolean;

  content_descriptorids?: number[];

  content_descriptorids_including_dlc?: number[];

  demo?: boolean;

  friendly_name?: string;

  has_adult_content?: boolean;

  has_adult_content_sex?: boolean;

  has_adult_content_violence?: boolean;

  icon?: string;

  is_visible_in_steam_china?: boolean;

  media?: boolean;

  name?: string;

  propagation?: string;

  tool?: boolean;
}

export interface CMsgAppRights {
  broadcast_live?: boolean;

  download?: boolean;

  economy_support?: boolean;

  economy_support_supervisor?: boolean;

  edit_info?: boolean;

  edit_marketing?: boolean;

  edit_store_display_content?: boolean;

  generate_cdkeys?: boolean;

  manage_cdkeys?: boolean;

  manage_ceg?: boolean;

  manage_pricing?: boolean;

  manage_signing?: boolean;

  publish?: boolean;

  upload_cdkeys?: boolean;

  view_error_data?: boolean;

  view_financials?: boolean;

  view_marketing_traffic?: boolean;
}

export interface CCuratorPreferences {
  adult_content_sex?: boolean;

  adult_content_violence?: boolean;

  discussion_url?: string;

  platform_linux?: boolean;

  platform_mac?: boolean;

  platform_windows?: boolean;

  show_broadcast?: boolean;

  supported_languages?: number;

  tagids_curated?: number[];

  tagids_filtered?: number[];

  timestamp_updated?: number;

  vr_content?: boolean;

  website_title?: string;

  website_url?: string;
}

export interface CLocalizationToken {
  language?: number;

  localized_string?: string;
}

export interface CClanEventUserNewsTuple {
  announcement_gid?: string;

  appid?: number;

  clamp_range_slot?: number;

  clanid?: number;

  event_gid?: string;

  priority_score?: number;

  rtime32_last_modified?: number;

  rtime_end?: number;

  rtime_start?: number;

  type?: number;
}

export interface CClanMatchEventByRange {
  events?: CClanEventUserNewsTuple[];

  qualified?: number;

  rtime_after?: number;

  rtime_before?: number;
}

export interface CCommunity_ClanAnnouncementInfo {
  ban_check_result?: BanContentCheckResult;

  banned?: boolean;

  body?: string;

  clanid?: number;

  commentcount?: number;

  event_gid?: string;

  forum_topic_id?: string;

  gid?: number;

  headline?: string;

  hidden?: boolean;

  language?: number;

  posterid?: number;

  posttime?: number;

  tags?: string[];

  updatetime?: number;

  votedowncount?: number;

  voteupcount?: number;
}

export interface CClanEventData {
  announcement_body?: CCommunity_ClanAnnouncementInfo;

  appid?: number;

  broadcaster_accountid?: number;

  build_branch?: string;

  build_id?: number;

  clan_steamid?: string;

  comment_count?: number;

  creator_steamid?: string;

  event_name?: string;

  event_notes?: string;

  event_type?: ProtoClanEventType;

  featured_app_tagid?: number;

  follower_count?: number;

  forum_topic_id?: string;

  gid?: string;

  hidden?: boolean;

  ignore_count?: number;

  jsondata?: string;

  last_update_steamid?: string;

  news_post_gid?: string;

  published?: boolean;

  referenced_appids?: number[];

  rtime32_end_time?: number;

  rtime32_last_modified?: number;

  rtime32_start_time?: number;

  rtime32_visibility_end?: number;

  rtime32_visibility_start?: number;

  rtime_mod_reviewed?: number;

  server_address?: string;

  server_password?: string;

  unlisted?: boolean;
}

export interface CBilling_Address {
  address1?: string;

  address2?: string;

  city?: string;

  country_code?: string;

  first_name?: string;

  last_name?: string;

  phone?: string;

  postcode?: string;

  us_state?: string;

  zip_plus4?: number;
}

export interface CPackageReservationStatus {
  expired?: boolean;

  notificaton_token?: string;

  packageid?: number;

  queue_position?: number;

  reservation_country_code?: string;

  reservation_state?: number;

  rtime_estimated_notification?: number;

  time_expires?: number;

  time_reserved?: number;

  total_queue_size?: number;
}

export interface CMsgKeyValuePair {
  name?: string;

  value?: string;
}

export interface CMsgKeyValueSet {
  pairs?: CMsgKeyValuePair[];
}

export interface UserContentDescriptorPreferences {
  content_descriptors_to_exclude?: UserContentDescriptorPreferences_ContentDescriptor[];
}

export interface UserContentDescriptorPreferences_ContentDescriptor {
  content_descriptorid?: number;

  timestamp_added?: number;
}

export enum BanContentCheckResult {
  NotScanned = 0,
  Reset = 1,
  NeedsChecking = 2,
  VeryUnlikely = 5,
  Unlikely = 30,
  Possible = 50,
  Likely = 75,
  VeryLikely = 100,
}

export enum ProtoClanEventType {
  EClanOtherEvent = 1,
  EClanGameEvent = 2,
  EClanPartyEvent = 3,
  EClanMeetingEvent = 4,
  EClanSpecialCauseEvent = 5,
  EClanMusicAndArtsEvent = 6,
  EClanSportsEvent = 7,
  EClanTripEvent = 8,
  EClanChatEvent = 9,
  EClanGameReleaseEvent = 10,
  EClanBroadcastEvent = 11,
  EClanSmallUpdateEvent = 12,
  EClanPreAnnounceMajorUpdateEvent = 13,
  EClanMajorUpdateEvent = 14,
  EClanDLCReleaseEvent = 15,
  EClanFutureReleaseEvent = 16,
  EClanESportTournamentStreamEvent = 17,
  EClanDevStreamEvent = 18,
  EClanFamousStreamEvent = 19,
  EClanGameSalesEvent = 20,
  EClanGameItemSalesEvent = 21,
  EClanInGameBonusXPEvent = 22,
  EClanInGameLootEvent = 23,
  EClanInGamePerksEvent = 24,
  EClanInGameChallengeEvent = 25,
  EClanInGameContestEvent = 26,
  EClanIRLEvent = 27,
  EClanNewsEvent = 28,
  EClanBetaReleaseEvent = 29,
  EClanInGameContentReleaseEvent = 30,
  EClanFreeTrial = 31,
  EClanSeasonRelease = 32,
  EClanSeasonUpdate = 33,
  EClanCrosspostEvent = 34,
  EClanInGameEventGeneral = 35,
  EClanCreatorHome = 36,
}
