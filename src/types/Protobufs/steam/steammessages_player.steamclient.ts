import { BanContentCheckResult, UserContentDescriptorPreferences } from './steammessages_base';

export interface CPlayer_GetRecentPlaytimeSessionsForChild_Request {
  steamid?: number;
}

export interface CPlayer_GetRecentPlaytimeSessionsForChild_Response {
  sessions?: PlaytimeSession[];
}

export interface PlaytimeSession {
  appid?: number;
  device_type?: number;
  disconnected?: boolean;
  time_end?: number;
  time_start?: number;
}

export interface CPlayer_GetPlayerLinkDetails_Request {
  steamids?: number[];
}

export interface CPlayer_GetPlayerLinkDetails_Response {
  accounts?: PlayerLinkDetails[];
}

export interface PlayerLinkDetails {
  private_data?: AccountPrivateData;
  public_data?: AccountPublicData;
}

export interface AccountPublicData {
  account_flags?: number;
  ban_expires_time?: number;
  content_country_restricted?: boolean;
  persona_name?: string;
  privacy_state?: number;
  profile_state?: number;
  profile_url?: string;
  sha_digest_avatar?: Uint8Array;
  steamid: string;
  visibility_state?: number;
}

export interface AccountPrivateData {
  account_name?: string;
  broadcast_session_id?: string;
  game_device_name?: string;
  game_device_type?: number;
  game_extra_info?: string;
  game_id?: string;
  game_is_private?: boolean;
  game_os_type?: number;
  game_server_ip_address?: number;
  game_server_port?: number;
  game_server_steam_id?: string;
  last_logoff_time?: number;
  last_seen_online?: number;
  lobby_steam_id?: string;
  persona_state?: number;
  persona_state_flags?: number;
  rich_presence_kv?: string;
  time_created?: number;
  watching_broadcast_accountid?: number;
  watching_broadcast_appid?: number;
  watching_broadcast_title?: string;
  watching_broadcast_viewers?: number;
}

export interface CPlayer_GetMutualFriendsForIncomingInvites_Request {
}

export interface CPlayer_IncomingInviteMutualFriendList {
  mutual_friend_account_ids?: number[];
  steamid?: string;
}

export interface CPlayer_GetMutualFriendsForIncomingInvites_Response {
  incoming_invite_mutual_friends_lists?: CPlayer_IncomingInviteMutualFriendList[];
}

export interface CPlayer_GetOwnedGames_Request {
  appids_filter?: number[];
  include_appinfo?: boolean;
  include_extended_appinfo?: boolean;
  include_free_sub?: boolean;
  include_played_free_games?: boolean;
  language?: string;
  skip_unvetted_apps?: boolean;
  steamid?: number;
}

export interface CPlayer_GetOwnedGames_Response {
  game_count?: number;
  games?: Game[];
}

export interface Game {
  appid?: number;
  capsule_filename?: string;
  content_descriptorids?: number[];
  has_community_visible_stats?: boolean;
  has_dlc?: boolean;
  has_leaderboards?: boolean;
  has_market?: boolean;
  has_workshop?: boolean;
  img_icon_url?: string;
  name?: string;
  playtime_2weeks?: number;
  playtime_deck_forever?: number;
  playtime_disconnected?: number;
  playtime_forever?: number;
  playtime_linux_forever?: number;
  playtime_mac_forever?: number;
  playtime_windows_forever?: number;
  rtime_last_played?: number;
  sort_as?: string;
}

export interface CPlayer_GetPlayNext_Request {
  ignore_appids?: number[];
  max_age_seconds?: number;
}

export interface CPlayer_GetPlayNext_Response {
  appids?: number[];
  last_update_time?: number;
}

export interface CPlayer_GetFriendsGameplayInfo_Request {
  appid?: number;
}

export interface CPlayer_GetFriendsGameplayInfo_Response {
  in_game?: FriendsGameplayInfo[];
  in_wishlist?: FriendsGameplayInfo[];
  owns?: FriendsGameplayInfo[];
  played_ever?: FriendsGameplayInfo[];
  played_recently?: FriendsGameplayInfo[];
  your_info?: OwnGameplayInfo;
}

export interface FriendsGameplayInfo {
  minutes_played?: number;
  minutes_played_forever?: number;
  steamid?: string;
}

export interface OwnGameplayInfo {
  in_wishlist?: boolean;
  minutes_played?: number;
  minutes_played_forever?: number;
  owned?: boolean;
  steamid?: string;
}

export interface CPlayer_GetGameBadgeLevels_Request {
  appid?: number;
}

export interface CPlayer_GetGameBadgeLevels_Response {
  badges?: Badge[];
  player_level?: number;
}

export interface Badge {
  border_color?: number;
  level?: number;
  series?: number;
}

export interface CPlayer_GetProfileBackground_Request {
  language?: string;
  steamid?: string;
}

export interface ProfileItem {
  appid?: number;
  communityitemid?: number;
  equipped_flags?: number;
  image_large?: string;
  image_small?: string;
  item_class?: number;
  item_description?: string;
  item_title?: string;
  item_type?: number;
  movie_mp4?: string;
  movie_mp4_small?: string;
  movie_webm?: string;
  movie_webm_small?: string;
  name?: string;
  profile_colors?: ProfileColor[];
  tiled?: boolean;
}

export interface ProfileColor {
  color?: string;
  style_name?: string;
}

export interface CPlayer_GetProfileBackground_Response {
  profile_background?: ProfileItem;
}

export interface CPlayer_SetProfileBackground_Request {
  communityitemid?: number;
}

export interface CPlayer_SetProfileBackground_Response {
}

export interface CPlayer_GetMiniProfileBackground_Request {
  language?: string;
  steamid?: string;
}

export interface CPlayer_GetMiniProfileBackground_Response {
  profile_background?: ProfileItem;
}

export interface CPlayer_SetMiniProfileBackground_Request {
  communityitemid?: number;
}

export interface CPlayer_SetMiniProfileBackground_Response {
}

export interface CPlayer_GetAvatarFrame_Request {
  language?: string;
  steamid?: string;
}

export interface CPlayer_GetAvatarFrame_Response {
  avatar_frame?: ProfileItem;
}

export interface CPlayer_SetAvatarFrame_Request {
  communityitemid?: number;
}

export interface CPlayer_SetAvatarFrame_Response {
}

export interface CPlayer_GetAnimatedAvatar_Request {
  language?: string;
  steamid?: string;
}

export interface CPlayer_GetAnimatedAvatar_Response {
  avatar?: ProfileItem;
}

export interface CPlayer_SetAnimatedAvatar_Request {
  communityitemid?: number;
}

export interface CPlayer_SetAnimatedAvatar_Response {
}

export interface CPlayer_GetSteamDeckKeyboardSkin_Request {
  language?: string;
  steamid?: string;
}

export interface CPlayer_GetSteamDeckKeyboardSkin_Response {
  steam_deck_keyboard_skin?: ProfileItem;
}

export interface CPlayer_SetSteamDeckKeyboardSkin_Request {
  communityitemid?: number;
}

export interface CPlayer_SetSteamDeckKeyboardSkin_Response {
}

export interface CPlayer_GetProfileItemsOwned_Request {
  filters?: CommunityItemClass[];
  language?: string;
}

export interface CPlayer_GetProfileItemsOwned_Response {
  animated_avatars?: ProfileItem[];
  avatar_frames?: ProfileItem[];
  mini_profile_backgrounds?: ProfileItem[];
  profile_backgrounds?: ProfileItem[];
  profile_modifiers?: ProfileItem[];
  steam_deck_keyboard_skins?: ProfileItem[];
  steam_deck_startup_movies?: ProfileItem[];
}

export interface CPlayer_GetProfileItemsEquipped_Request {
  language?: string;
  steamid?: string;
}

export interface CPlayer_GetProfileItemsEquipped_Response {
  animated_avatar?: ProfileItem;
  avatar_frame?: ProfileItem;
  mini_profile_background?: ProfileItem;
  profile_background?: ProfileItem;
  profile_modifier?: ProfileItem;
  steam_deck_keyboard_skin?: ProfileItem;
}

export interface CPlayer_SetEquippedProfileItemFlags_Request {
  communityitemid?: number;
  flags?: number;
}

export interface CPlayer_SetEquippedProfileItemFlags_Response {
}

export interface CPlayer_GetEmoticonList_Request {
}

export interface CPlayer_GetEmoticonList_Response {
  emoticons?: Emoticon[];
}

export interface Emoticon {
  appid?: number;
  count?: number;
  name?: string;
  time_last_used?: number;
  time_received?: number;
  use_count?: number;
}

export interface CPlayer_GetCommunityBadgeProgress_Request {
  badgeid?: number;
  steamid?: number;
}

export interface CPlayer_GetCommunityBadgeProgress_Response {
  quests?: Quest[];
}

export interface Quest {
  completed?: boolean;
  questid?: number;
}

export interface CPlayer_GetTopAchievementsForGames_Request {
  appids?: number[];
  language?: string;
  max_achievements?: number;
  steamid?: number;
}

export interface CPlayer_GetTopAchievementsForGames_Response {
  games?: Game[];
}

export interface Achievement {
  bit?: number;
  desc?: string;
  hidden?: boolean;
  icon?: string;
  icon_gray?: string;
  name?: string;
  player_percent_unlocked?: string;
  statid?: number;
}

export interface Game {
  achievements?: Achievement[];
  appid?: number;
  total_achievements?: number;
}

export interface CPlayer_GetAchievementsProgress_Request {
  appids?: number[];
  include_unvetted_apps?: boolean;
  language?: string;
  steamid?: number;
}

export interface CPlayer_GetAchievementsProgress_Response {
  achievement_progress?: AchievementProgress[];
}

export interface AchievementProgress {
  all_unlocked?: boolean;
  appid?: number;
  cache_time?: number;
  percentage?: number;
  total?: number;
  unlocked?: number;
  vetted?: boolean;
}

export interface CPlayer_GetGameAchievements_Request {
  appid?: number;
  language?: string;
}

export interface CPlayer_GetGameAchievements_Response {
  achievements?: Achievement[];
}

export interface Achievement {
  hidden?: boolean;
  icon?: string;
  icon_gray?: string;
  internal_name?: string;
  localized_desc?: string;
  localized_name?: string;
  player_percent_unlocked?: string;
}

export interface CPlayer_GetFavoriteBadge_Request {
  steamid?: number;
}

export interface CPlayer_GetFavoriteBadge_Response {
  appid?: number;
  badgeid?: number;
  border_color?: number;
  communityitemid?: number;
  has_favorite_badge?: boolean;
  item_type?: number;
  level?: number;
}

export interface CPlayer_SetFavoriteBadge_Request {
  badgeid?: number;
  communityitemid?: number;
}

export interface CPlayer_SetFavoriteBadge_Response {
}

export interface CPlayer_GetProfileCustomization_Request {
  include_inactive_customizations?: boolean;
  include_purchased_customizations?: boolean;
  steamid?: string;
}

export interface ProfileCustomizationSlot {
  accountid?: number;
  appid?: number;
  badgeid?: number;
  ban_check_result?: BanContentCheckResult;
  border_color?: number;
  item_assetid?: number;
  item_classid?: number;
  item_contextid?: number;
  item_instanceid?: number;
  notes?: string;
  publishedfileid?: number;
  replay_year?: number;
  slot?: number;
  title?: string;
}

export interface ProfileCustomization {
  active?: boolean;
  customization_style?: ProfileCustomizationStyle;
  customization_type?: ProfileCustomizationType;
  large?: boolean;
  level?: number;
  purchaseid?: number;
  slots?: ProfileCustomizationSlot[];
}

export interface ProfileTheme {
  theme_id?: string;
  title?: string;
}

export interface ProfilePreferences {
  hide_profile_awards?: boolean;
}

export interface CPlayer_GetProfileCustomization_Response {
  customizations?: ProfileCustomization[];
  profile_preferences?: ProfilePreferences;
  profile_theme?: ProfileTheme;
  purchased_customizations?: PurchasedCustomization[];
  slots_available?: number;
}

export interface PurchasedCustomization {
  customization_type?: ProfileCustomizationType;
  level?: number;
  purchaseid?: number;
}

export interface CPlayer_GetPurchasedProfileCustomizations_Request {
  steamid?: string;
}

export interface CPlayer_GetPurchasedProfileCustomizations_Response {
  purchased_customizations?: PurchasedCustomization[];
}

export interface PurchasedCustomization {
  customization_type?: ProfileCustomizationType;
  purchaseid?: number;
}

export interface CPlayer_GetPurchasedAndUpgradedProfileCustomizations_Request {
  steamid?: string;
}

export interface CPlayer_GetPurchasedAndUpgradedProfileCustomizations_Response {
  purchased_customizations?: PurchasedCustomization[];
  upgraded_customizations?: UpgradedCustomization[];
}

export interface PurchasedCustomization {
  count?: number;
  customization_type?: ProfileCustomizationType;
}

export interface UpgradedCustomization {
  customization_type?: ProfileCustomizationType;
  level?: number;
}

export interface CPlayer_GetProfileThemesAvailable_Request {
}

export interface CPlayer_GetProfileThemesAvailable_Response {
  profile_themes?: ProfileTheme[];
}

export interface CPlayer_SetProfileTheme_Request {
  theme_id?: string;
}

export interface CPlayer_SetProfileTheme_Response {
}

export interface CPlayer_SetProfilePreferences_Request {
  profile_preferences?: ProfilePreferences;
}

export interface CPlayer_SetProfilePreferences_Response {
}

export interface CPlayer_PostStatusToFriends_Request {
  appid?: number;
  status_text?: string;
}

export interface CPlayer_PostStatusToFriends_Response {
}

export interface CPlayer_GetPostedStatus_Request {
  postid?: number;
  steamid?: number;
}

export interface CPlayer_GetPostedStatus_Response {
  accountid?: number;
  appid?: number;
  deleted?: boolean;
  postid?: number;
  status_text?: string;
}

export interface CPlayer_DeletePostedStatus_Request {
  postid?: number;
}

export interface CPlayer_DeletePostedStatus_Response {
}

export interface CPlayer_GetLastPlayedTimes_Request {
  min_last_played?: number;
}

export interface CPlayer_GetLastPlayedTimes_Response {
  games?: Game[];
}

export interface Game {
  appid?: number;
  first_deck_playtime?: number;
  first_linux_playtime?: number;
  first_mac_playtime?: number;
  first_playtime?: number;
  first_windows_playtime?: number;
  last_deck_playtime?: number;
  last_linux_playtime?: number;
  last_mac_playtime?: number;
  last_playtime?: number;
  last_windows_playtime?: number;
  playtime_2weeks?: number;
  playtime_deck_forever?: number;
  playtime_disconnected?: number;
  playtime_forever?: number;
  playtime_linux_forever?: number;
  playtime_mac_forever?: number;
  playtime_windows_forever?: number;
}

export interface CPlayer_GetTimeSSAAccepted_Request {
}

export interface CPlayer_GetTimeSSAAccepted_Response {
  time_chinassa_accepted?: number;
  time_ssa_accepted?: number;
  time_ssa_updated?: number;
}

export interface CPlayer_AcceptSSA_Request {
  agreement_type?: AgreementType;
  time_signed_utc?: number;
}

export interface CPlayer_AcceptSSA_Response {
}

export interface CPlayer_GetNicknameList_Request {
}

export interface CPlayer_GetNicknameList_Response {
  nicknames?: PlayerNickname[];
}

export interface PlayerNickname {
  accountid?: number;
  nickname?: string;
}

export interface CPlayer_GetPerFriendPreferences_Request {
}

export interface PerFriendPreferences {
  accountid?: number;
  nickname?: string;
  notifications_sendmobile?: NotificationSetting;
  notifications_showingame?: NotificationSetting;
  notifications_showmessages?: NotificationSetting;
  notifications_showonline?: NotificationSetting;
  sounds_showingame?: NotificationSetting;
  sounds_showmessages?: NotificationSetting;
  sounds_showonline?: NotificationSetting;
}

export interface CPlayer_GetPerFriendPreferences_Response {
  preferences?: PerFriendPreferences[];
}

export interface CPlayer_SetPerFriendPreferences_Request {
  preferences?: PerFriendPreferences;
}

export interface CPlayer_SetPerFriendPreferences_Response {
}

export interface CPlayer_AddFriend_Request {
  steamid?: string;
}

export interface CPlayer_AddFriend_Response {
  friend_relationship?: number;
  invite_sent?: boolean;
  result?: number;
}

export interface CPlayer_RemoveFriend_Request {
  steamid?: string;
}

export interface CPlayer_RemoveFriend_Response {
  friend_relationship?: number;
}

export interface CPlayer_IgnoreFriend_Request {
  steamid?: string;
  unignore?: boolean;
}

export interface CPlayer_IgnoreFriend_Response {
  friend_relationship?: number;
}

export interface CPlayer_GetCommunityPreferences_Request {
}

export interface CPlayer_CommunityPreferences {
  parenthesize_nicknames?: boolean;
  text_filter_ignore_friends?: boolean;
  text_filter_setting?: TextFilterSetting;
  text_filter_words_revision?: number;
  timestamp_updated?: number;
}

export interface CPlayer_GetCommunityPreferences_Response {
  content_descriptor_preferences?: UserContentDescriptorPreferences;
  preferences?: CPlayer_CommunityPreferences;
}

export interface CPlayer_SetCommunityPreferences_Request {
  preferences?: CPlayer_CommunityPreferences;
}

export interface CPlayer_SetCommunityPreferences_Response {
}

export interface CPlayer_GetTextFilterWords_Request {
}

export interface CPlayer_TextFilterWords {
  text_filter_custom_banned_words?: string[];
  text_filter_custom_clean_words?: string[];
  text_filter_words_revision?: number;
}

export interface CPlayer_GetTextFilterWords_Response {
  words?: CPlayer_TextFilterWords;
}

export interface CPlayer_GetNewSteamAnnouncementState_Request {
  language?: number;
}

export interface CPlayer_GetNewSteamAnnouncementState_Response {
  announcement_gid?: number;
  announcement_headline?: string;
  announcement_url?: string;
  state?: NewSteamAnnouncementState;
  time_posted?: number;
}

export interface CPlayer_UpdateSteamAnnouncementLastRead_Request {
  announcement_gid?: number;
  time_posted?: number;
}

export interface CPlayer_UpdateSteamAnnouncementLastRead_Response {
}

export interface CPlayer_GetPrivacySettings_Request {
}

export interface CPrivacySettings {
  privacy_state?: number;
  privacy_state_friendslist?: number;
  privacy_state_gifts?: number;
  privacy_state_inventory?: number;
  privacy_state_ownedgames?: number;
  privacy_state_playtime?: number;
}

export interface CPlayer_GetPrivacySettings_Response {
  privacy_settings?: CPrivacySettings;
}

export interface CPlayer_GetDurationControl_Request {
  appid?: number;
}

export interface CPlayer_GetDurationControl_Response {
  age_verification_pending?: boolean;
  block_minors?: boolean;
  is_age_verified?: boolean;
  is_enabled?: boolean;
  is_steamchina_account?: boolean;
  seconds?: number;
  seconds_allowed_today?: number;
  seconds_today?: number;
}

export interface CPlayer_RecordDisconnectedPlaytime_Request {
  play_sessions?: PlayHistory[];
}

export interface PlayHistory {
  appid?: number;
  offline?: boolean;
  owner?: number;
  seconds?: number;
  session_time_start?: number;
}

export interface CPlayer_RecordDisconnectedPlaytime_Response {
}

export interface CPlayer_LastPlayedTimes_Notification {
  games?: Game[];
}

export interface CPlayer_FriendNicknameChanged_Notification {
  accountid?: number;
  is_echo_to_self?: boolean;
  nickname?: string;
}

export interface CPlayer_FriendEquippedProfileItemsChanged_Notification {
  accountid?: number;
}

export interface CPlayer_NewSteamAnnouncementState_Notification {
  announcement_gid?: number;
  announcement_headline?: string;
  announcement_url?: string;
  state?: NewSteamAnnouncementState;
  time_posted?: number;
}

export interface CPlayer_CommunityPreferencesChanged_Notification {
  content_descriptor_preferences?: UserContentDescriptorPreferences;
  preferences?: CPlayer_CommunityPreferences;
}

export interface CPlayer_TextFilterWordsChanged_Notification {
  words?: CPlayer_TextFilterWords;
}

export interface CPlayer_PerFriendPreferencesChanged_Notification {
  accountid?: number;
  preferences?: PerFriendPreferences;
}

export interface CPlayer_PrivacySettingsChanged_Notification {
  privacy_settings?: CPrivacySettings;
}

export interface NoResponse {
}

export enum ProfileCustomizationStyle {
  ProfileCustomizationStyleDefault = 0,
  ProfileCustomizationStyleSelected = 1,
  ProfileCustomizationStyleRarest = 2,
  ProfileCustomizationStyleMostRecent = 3,
  ProfileCustomizationStyleRandom = 4,
  ProfileCustomizationStyleHighestRated = 5,
}

export enum AgreementType {
  Invalid = -1,
  GlobalSSA = 0,
  ChinaSSA = 1,
}

export enum NotificationSetting {
  NotificationSettingNotifyUseDefault = 0,
  NotificationSettingAlways = 1,
  NotificationSettingNever = 2,
}

export enum TextFilterSetting {
  TextFilterSettingSteamLabOptedOut = 0,
  TextFilterSettingEnabled = 1,
  TextFilterSettingEnabledAllowProfanity = 2,
  TextFilterSettingDisabled = 3,
}

export enum ProfileCustomizationType {
  ProfileCustomizationTypeInvalid = 0,
  ProfileCustomizationTypeRareAchievementShowcase = 1,
  ProfileCustomizationTypeGameCollector = 2,
  ProfileCustomizationTypeItemShowcase = 3,
  ProfileCustomizationTypeTradeShowcase = 4,
  ProfileCustomizationTypeBadges = 5,
  ProfileCustomizationTypeFavoriteGame = 6,
  ProfileCustomizationTypeScreenshotShowcase = 7,
  ProfileCustomizationTypeCustomText = 8,
  ProfileCustomizationTypeFavoriteGroup = 9,
  ProfileCustomizationTypeRecommendation = 10,
  ProfileCustomizationTypeWorkshopItem = 11,
  ProfileCustomizationTypeMyWorkshop = 12,
  ProfileCustomizationTypeArtworkShowcase = 13,
  ProfileCustomizationTypeVideoShowcase = 14,
  ProfileCustomizationTypeGuides = 15,
  ProfileCustomizationTypeMyGuides = 16,
  ProfileCustomizationTypeAchievements = 17,
  ProfileCustomizationTypeGreenlight = 18,
  ProfileCustomizationTypeMyGreenlight = 19,
  ProfileCustomizationTypeSalien = 20,
  ProfileCustomizationTypeLoyaltyRewardReactions = 21,
  ProfileCustomizationTypeSingleArtworkShowcase = 22,
  ProfileCustomizationTypeAchievementsCompletionist = 23,
  ProfileCustomizationTypeReplay = 24,
}

export enum CommunityItemClass {
  Invalid = 0,
  Badge = 1,
  GameCard = 2,
  ProfileBackground = 3,
  Emoticon = 4,
  BoosterPack = 5,
  Consumable = 6,
  GameGoo = 7,
  ProfileModifier = 8,
  Scene = 9,
  SalienItem = 10,
  Sticker = 11,
  ChatEffect = 12,
  MiniProfileBackground = 13,
  AvatarFrame = 14,
  AnimatedAvatar = 15,
  SteamDeckKeyboardSkin = 16,
  SteamDeckStartupMovie = 17,
}

export enum NewSteamAnnouncementState {
  Invalid = 0,
  AllRead = 1,
  NewAnnouncement = 2,
  FeaturedAnnouncement = 3,
}
