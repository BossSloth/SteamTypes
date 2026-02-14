import { ContentReportReason, ContentReportResolution, ContentReportSubjectType } from './enums';
import { CMsgClientPersonaState_Friend } from './steammessages_clientserver_friends';

export interface CChat_RequestFriendPersonaStates_Request { }

export interface CChat_RequestFriendPersonaStates_Response { }

export interface CChatRoom_CreateChatRoomGroup_Request {
  name?: string;

  steamid_invited?: string;

  steamid_invitees?: string[];

  steamid_partner?: string;

  watching_broadcast_accountid?: number;

  watching_broadcast_channel_id?: number;
}

export interface CChatRole {
  name?: string;

  ordinal?: number;

  role_id?: number;
}

export interface CChatRoleActions {
  can_ban?: boolean;

  can_change_group_roles?: boolean;

  can_change_tagline_avatar_name?: boolean;

  can_change_user_roles?: boolean;

  can_chat?: boolean;

  can_create_rename_delete_channel?: boolean;

  can_invite?: boolean;

  can_kick?: boolean;

  can_mention_all?: boolean;

  can_set_watching_broadcast?: boolean;

  can_view_history?: boolean;

  role_id?: number;
}

export interface CChatPartyBeacon {
  app_id?: number;

  beacon_id?: string;

  game_metadata?: string;

  steamid_owner?: string;
}

export interface CChatRoomGroupHeaderState {
  accountid_owner?: number;

  active_minigame_id?: number;

  appid?: number;

  avatar_sha?: Uint8Array;

  avatar_ugc_url?: string;

  chat_group_id?: number;

  chat_name?: string;

  clanid?: number;

  default_role_id?: number;

  disabled?: boolean;

  party_beacons?: CChatPartyBeacon[];

  role_actions?: CChatRoleActions[];

  roles?: CChatRole[];

  tagline?: string;

  watching_broadcast_accountid?: number;

  watching_broadcast_channel_id?: number;
}

export interface CChatRoomMember {
  accountid?: number;

  rank?: ChatRoomGroupRank;

  role_ids?: number[];

  state?: ChatRoomJoinState;

  time_kick_expire?: number;
}

export interface CChatRoomState {
  accountid_last_message?: number;

  chat_id?: number;

  chat_name?: string;

  last_message?: string;

  members_in_voice?: number[];

  sort_order?: number;

  time_last_message?: number;

  voice_allowed?: boolean;
}

export interface CChatRoomGroupState {
  chat_rooms?: CChatRoomState[];

  default_chat_id?: number;

  header_state?: CChatRoomGroupHeaderState;

  kicked?: CChatRoomMember[];

  members?: CChatRoomMember[];
}

export interface CUserChatRoomState {
  chat_id?: number;

  desktop_notification_level?: ChatRoomNotificationLevel;

  mobile_notification_level?: ChatRoomNotificationLevel;

  time_first_unread?: number;

  time_joined?: number;

  time_last_ack?: number;

  time_last_mention?: number;

  unread_indicator_muted?: boolean;
}

export interface CUserChatRoomGroupState {
  chat_group_id?: number;

  desktop_notification_level?: ChatRoomNotificationLevel;

  direct_messages_allowed?: boolean;

  mobile_notification_level?: ChatRoomNotificationLevel;

  time_joined?: number;

  time_last_group_ack?: number;

  unread_indicator_muted?: boolean;

  user_chat_room_state?: CUserChatRoomState[];
}

export interface CChatRoom_CreateChatRoomGroup_Response {
  chat_group_id?: number;

  state?: CChatRoomGroupState;

  user_chat_state?: CUserChatRoomGroupState;
}

export interface CChatRoom_SaveChatRoomGroup_Request {
  chat_group_id?: number;

  name?: string;
}

export interface CChatRoom_SaveChatRoomGroup_Response { }

export interface CChatRoom_RenameChatRoomGroup_Request {
  chat_group_id?: number;

  name?: string;
}

export interface CChatRoom_RenameChatRoomGroup_Response {
  name?: string;
}

export interface CChatRoom_SetChatRoomGroupTagline_Request {
  chat_group_id?: number;

  tagline?: string;
}

export interface CChatRoom_SetChatRoomGroupTagline_Response { }

export interface CChatRoom_SetChatRoomGroupAvatar_Request {
  avatar_sha?: Uint8Array;

  chat_group_id?: number;
}

export interface CChatRoom_SetChatRoomGroupAvatar_Response { }

export interface CChatRoom_SetChatRoomGroupWatchingBroadcast_Request {
  chat_group_id?: number;

  watching_broadcast_accountid?: number;

  watching_broadcast_channel_id?: number;
}

export interface CChatRoom_SetChatRoomGroupWatchingBroadcast_Response { }

export interface CChatRoom_JoinMiniGameForChatRoomGroup_Request {
  chat_group_id?: number;

  chat_id?: number;
}

export interface CChatRoom_JoinMiniGameForChatRoomGroup_Response {
  minigame_id?: number;
}

export interface CChatRoom_EndMiniGameForChatRoomGroup_Request {
  chat_group_id?: number;

  chat_id?: number;

  minigame_id?: number;
}

export interface CChatRoom_EndMiniGameForChatRoomGroup_Response { }

export interface CChatRoom_MuteUser_Request {
  chat_group_id?: number;

  expiration?: number;

  steamid?: string;
}

export interface CChatRoom_MuteUser_Response { }

export interface CChatRoom_KickUser_Request {
  chat_group_id?: number;

  expiration?: number;

  steamid?: string;
}

export interface CChatRoom_KickUser_Response { }

export interface CChatRoom_SetUserBanState_Request {
  ban_state?: boolean;

  chat_group_id?: number;

  steamid?: string;
}

export interface CChatRoom_SetUserBanState_Response { }

export interface CChatRoom_RevokeInvite_Request {
  chat_group_id?: number;

  steamid?: string;
}

export interface CChatRoom_RevokeInvite_Response { }

export interface CChatRoom_CreateRole_Request {
  chat_group_id?: number;

  name?: string;
}

export interface CChatRoom_CreateRole_Response {
  actions?: CChatRoleActions;
}

export interface CChatRoom_GetRoles_Request {
  chat_group_id?: number;
}

export interface CChatRoom_GetRoles_Response {
  roles?: CChatRole[];
}

export interface CChatRoom_RenameRole_Request {
  chat_group_id?: number;

  name?: string;

  role_id?: number;
}

export interface CChatRoom_RenameRole_Response { }

export interface CChatRoom_ReorderRole_Request {
  chat_group_id?: number;

  ordinal?: number;

  role_id?: number;
}

export interface CChatRoom_ReorderRole_Response { }

export interface CChatRoom_DeleteRole_Request {
  chat_group_id?: number;

  role_id?: number;
}

export interface CChatRoom_DeleteRole_Response { }

export interface CChatRoom_GetRoleActions_Request {
  chat_group_id?: number;

  role_id?: number;
}

export interface CChatRoom_GetRoleActions_Response {
  actions?: CChatRoleActions[];
}

export interface CChatRoom_ReplaceRoleActions_Request {
  actions?: CChatRoleActions;

  chat_group_id?: number;

  role_id?: number;
}

export interface CChatRoom_ReplaceRoleActions_Response { }

export interface CChatRoom_AddRoleToUser_Request {
  chat_group_id?: number;

  role_id?: number;

  steamid?: string;
}

export interface CChatRoom_AddRoleToUser_Response { }

export interface CChatRoom_GetRolesForUser_Request {
  chat_group_id?: number;

  steamid?: string;
}

export interface CChatRoom_GetRolesForUser_Response {
  role_ids?: number[];
}

export interface CChatRoom_DeleteRoleFromUser_Request {
  chat_group_id?: number;

  role_id?: number;

  steamid?: string;
}

export interface CChatRoom_DeleteRoleFromUser_Response { }

export interface CChatRoom_JoinChatRoomGroup_Request {
  chat_group_id?: number;

  chat_id?: number;

  invite_code?: string;
}

export interface CChatRoom_JoinChatRoomGroup_Response {
  join_chat_id?: number;

  state?: CChatRoomGroupState;

  time_expire?: number;

  user_chat_state?: CUserChatRoomGroupState;
}

export interface CChatRoom_InviteFriendToChatRoomGroup_Request {
  chat_group_id?: number;

  chat_id?: number;

  skip_friendsui_check?: boolean;

  steamid?: string;
}

export interface CChatRoom_InviteFriendToChatRoomGroup_Response { }

export interface CChatRoom_LeaveChatRoomGroup_Request {
  chat_group_id?: number;
}

export interface CChatRoom_LeaveChatRoomGroup_Response { }

export interface CChatRoom_CreateChatRoom_Request {
  allow_voice?: boolean;

  chat_group_id?: number;

  name?: string;
}

export interface CChatRoom_CreateChatRoom_Response {
  chat_room?: CChatRoomState;
}

export interface CChatRoom_DeleteChatRoom_Request {
  chat_group_id?: number;

  chat_id?: number;
}

export interface CChatRoom_DeleteChatRoom_Response { }

export interface CChatRoom_RenameChatRoom_Request {
  chat_group_id?: number;

  chat_id?: number;

  name?: string;
}

export interface CChatRoom_RenameChatRoom_Response { }

export interface CChatRoom_ReorderChatRoom_Request {
  chat_group_id?: number;

  chat_id?: number;

  move_after_chat_id?: number;
}

export interface CChatRoom_ReorderChatRoom_Response { }

export interface CChatRoom_SendChatMessage_Request {
  chat_group_id?: number;

  chat_id?: number;

  echo_to_sender?: boolean;

  message?: string;
}

export interface CChatRoom_SendChatMessage_Response {
  message_without_bb_code?: string;

  modified_message?: string;

  ordinal?: number;

  server_timestamp?: number;
}

export interface CChatRoom_JoinVoiceChat_Request {
  chat_group_id?: number;

  chat_id?: number;
}

export interface CChatRoom_JoinVoiceChat_Response {
  voice_chatid?: number;
}

export interface CChatRoom_LeaveVoiceChat_Request {
  chat_group_id?: number;

  chat_id?: number;
}

export interface CChatRoom_LeaveVoiceChat_Response { }

export interface CChatRoom_GetMessageHistory_Request {
  chat_group_id?: number;

  chat_id?: number;

  last_ordinal?: number;

  last_time?: number;

  max_count?: number;

  start_ordinal?: number;

  start_time?: number;
}

export interface ServerMessage {
  accountid_param?: number;

  message?: ChatRoomServerMessage;

  string_param?: string;
}

export interface CChatRoom_GetMessageHistory_Response {
  messages?: CChatRoom_GetMessageHistory_Response_ChatMessage[];

  more_available?: boolean;
}

export interface CChatRoom_GetMessageHistory_Response_ChatMessage {
  deleted?: boolean;

  message?: string;

  ordinal?: number;

  reactions?: CChatRoom_GetMessageHistory_Response_ChatMessage_MessageReaction[];

  sender?: number;

  server_message?: ServerMessage;

  server_timestamp?: number;
}

export interface CChatRoom_GetMessageHistory_Response_ChatMessage_MessageReaction {
  has_user_reacted?: boolean;

  num_reactors?: number;

  reaction?: string;

  reaction_type?: ChatRoomMessageReactionType;
}

export interface CChatRoom_GetMyChatRoomGroups_Request { }

export interface CChatRoom_GetChatRoomGroupSummary_Response {
  accountid_owner?: number;

  active_member_count?: number;

  active_minigame_id?: number;

  active_voice_member_count?: number;

  appid?: number;

  avatar_ugc_url?: string;

  chat_group_avatar_sha?: Uint8Array;

  chat_group_id?: number;

  chat_group_name?: string;

  chat_group_tagline?: string;

  chat_rooms?: CChatRoomState[];

  clanid?: number;

  default_chat_id?: number;

  default_role_id?: number;

  disabled?: boolean;

  party_beacons?: CChatPartyBeacon[];

  rank?: ChatRoomGroupRank;

  role_actions?: CChatRoleActions[];

  role_ids?: number[];

  top_members?: number[];

  watching_broadcast_accountid?: number;

  watching_broadcast_channel_id?: number;
}

export interface CChatRoomSummaryPair {
  group_summary?: CChatRoom_GetChatRoomGroupSummary_Response;

  user_chat_group_state?: CUserChatRoomGroupState;
}

export interface CChatRoom_GetMyChatRoomGroups_Response {
  chat_room_groups?: CChatRoomSummaryPair[];
}

export interface CChatRoom_GetChatRoomGroupState_Request {
  chat_group_id?: number;
}

export interface CChatRoom_GetChatRoomGroupState_Response {
  state?: CChatRoomGroupState;
}

export interface CChatRoom_SetAppChatRoomGroupForceActive_Request {
  chat_group_id?: number;

  requesting_app_id?: number;
}

export interface CChatRoom_SetAppChatRoomGroupForceActive_Response {
  accounts_in_channel?: number[];

  result?: number;
}

export interface CChatRoom_SetAppChatRoomGroupStopForceActive_Notification {
  chat_group_id?: number;

  requesting_app_id?: number;
}

export interface CChatRoom_AckChatMessage_Notification {
  chat_group_id?: number;

  chat_id?: number;

  timestamp?: number;
}

export interface CChatRoom_CreateInviteLink_Request {
  chat_group_id?: number;

  chat_id?: number;

  seconds_valid?: number;
}

export interface CChatRoom_CreateInviteLink_Response {
  invite_code?: string;

  seconds_valid?: number;
}

export interface CChatRoom_GetInviteLinkInfo_Request {
  invite_code?: string;
}

export interface CChatRoom_GetInviteLinkInfo_Response {
  banned?: boolean;

  chat_id?: number;

  group_summary?: CChatRoom_GetChatRoomGroupSummary_Response;

  steamid_sender?: string;

  time_expires?: number;

  time_kick_expire?: number;

  user_chat_group_state?: CUserChatRoomGroupState;
}

export interface CChatRoom_GetInviteInfo_Request {
  chat_group_id?: number;

  chat_id?: number;

  invite_code?: string;

  steamid_invitee?: string;
}

export interface CChatRoom_GetInviteInfo_Response {
  banned?: boolean;

  group_summary?: CChatRoom_GetChatRoomGroupSummary_Response;

  time_kick_expire?: number;
}

export interface CChatRoom_GetInviteLinksForGroup_Request {
  chat_group_id?: number;
}

export interface CChatRoom_GetInviteLinksForGroup_Response {
  invite_links?: CChatRoom_GetInviteLinksForGroup_Response_LinkInfo[];
}

export interface CChatRoom_GetInviteLinksForGroup_Response_LinkInfo {
  chat_id?: number;

  invite_code?: string;

  steamid_creator?: string;

  time_expires?: number;
}

export interface CChatRoom_GetBanList_Request {
  chat_group_id?: number;
}

export interface CChatRoom_GetBanList_Response {
  bans?: CChatRoom_GetBanList_Response_BanInfo[];
}

export interface CChatRoom_GetBanList_Response_BanInfo {
  accountid?: number;

  accountid_actor?: number;

  ban_reason?: string;

  time_banned?: number;
}

export interface CChatRoom_GetInviteList_Request {
  chat_group_id?: number;
}

export interface CChatRoomGroupInvite {
  accountid?: number;

  accountid_actor?: number;

  time_invited?: number;
}

export interface CChatRoom_GetInviteList_Response {
  invites?: CChatRoomGroupInvite[];
}

export interface CChatRoom_DeleteInviteLink_Request {
  chat_group_id?: number;

  invite_code?: string;
}

export interface CChatRoom_DeleteInviteLink_Response { }

export interface CChatRoom_SetSessionActiveChatRoomGroups_Request {
  chat_group_ids?: number[];

  chat_groups_data_requested?: number[];

  virtualize_members_threshold?: number;
}

export interface CChatRoom_SetSessionActiveChatRoomGroups_Response {
  chat_states?: CChatRoomGroupState[];

  virtualize_members_chat_group_ids?: number[];
}

export interface CChatRoom_SetUserChatGroupPreferences_Request {
  chat_group_id?: number;

  chat_group_preferences?: CChatRoom_SetUserChatGroupPreferences_Request_ChatGroupPreferences;

  chat_room_preferences?: CChatRoom_SetUserChatGroupPreferences_Request_ChatRoomPreferences[];
}

export interface CChatRoom_SetUserChatGroupPreferences_Request_ChatGroupPreferences {
  desktop_notification_level?: ChatRoomNotificationLevel;

  direct_messages_allowed?: boolean;

  mobile_notification_level?: ChatRoomNotificationLevel;

  unread_indicator_muted?: boolean;
}

export interface CChatRoom_SetUserChatGroupPreferences_Request_ChatRoomPreferences {
  chat_id?: number;

  desktop_notification_level?: ChatRoomNotificationLevel;

  mobile_notification_level?: ChatRoomNotificationLevel;

  unread_indicator_muted?: boolean;
}

export interface CChatRoom_SetUserChatGroupPreferences_Response { }

export interface CChatRoom_DeleteChatMessages_Request {
  chat_group_id?: number;

  chat_id?: number;

  messages?: CChatRoom_DeleteChatMessages_Request_Message[];
}

export interface CChatRoom_DeleteChatMessages_Request_Message {
  ordinal?: number;

  server_timestamp?: number;
}

export interface CChatRoom_DeleteChatMessages_Response { }

export interface CChatRoom_UpdateMemberListView_Notification {
  chat_group_id?: number;

  client_changenumber?: number;

  delete_view?: boolean;

  end?: number;

  persona_subscribe_accountids?: number[];

  persona_unsubscribe_accountids?: number[];

  start?: number;

  view_id?: number;
}

export interface CChatRoom_SearchMembers_Request {
  chat_group_id?: number;

  max_results?: number;

  search_id?: number;

  search_text?: string;
}

export interface CChatRoom_SearchMembers_Response {
  matching_members?: CChatRoom_SearchMembers_Response_MemberMatch[];

  status_flags?: number;
}

export interface CChatRoom_SearchMembers_Response_MemberMatch {
  accountid?: number;

  persona?: CMsgClientPersonaState_Friend;
}

export interface CChatRoom_UpdateMessageReaction_Request {
  chat_group_id?: number;

  chat_id?: number;

  is_add?: boolean;

  ordinal?: number;

  reaction?: string;

  reaction_type?: ChatRoomMessageReactionType;

  server_timestamp?: number;
}

export interface CChatRoom_UpdateMessageReaction_Response {
  num_reactors?: number;
}

export interface CChatRoom_GetMessageReactionReactors_Request {
  chat_group_id?: number;

  chat_id?: number;

  limit?: number;

  ordinal?: number;

  reaction?: string;

  reaction_type?: ChatRoomMessageReactionType;

  server_timestamp?: number;
}

export interface CChatRoom_GetMessageReactionReactors_Response {
  reactors?: number[];
}

export interface CChatRoom_ReportMessage_Request {
  chat_group_id?: number;

  chat_id?: number;

  language?: string;

  ordinal?: number;

  report_reason?: ContentReportReason;

  report_text?: string;

  steamid_from?: string;

  subject_type?: ContentReportSubjectType;

  timestamp?: number;
}

export interface CChatRoom_ReportMessage_Response { }

export interface CChatRoom_ResolveReport_Request {
  chat_group_id?: number;

  kick_expiration_time?: number;

  reason?: ContentReportReason;

  resolution?: ContentReportResolution;

  skip_lock?: boolean;

  subject_group_id?: number;

  subject_id?: number;

  subject_type?: ContentReportSubjectType;
}

export interface CChatRoom_ResolveReport_Response { }

export interface CClanChatRooms_GetClanChatRoomInfo_Request {
  autocreate?: boolean;

  steamid?: string;
}

export interface CClanChatRooms_GetClanChatRoomInfo_Response {
  chat_group_summary?: CChatRoom_GetChatRoomGroupSummary_Response;
}

export interface CClanChatRooms_SetClanChatRoomPrivate_Request {
  chat_room_private?: boolean;

  steamid?: string;
}

export interface CClanChatRooms_SetClanChatRoomPrivate_Response {
  chat_room_private?: boolean;
}

export interface CChatMentions {
  mention_accountids?: number[];

  mention_all?: boolean;

  mention_here?: boolean;
}

export interface CChatRoom_IncomingChatMessage_Notification {
  chat_group_id?: number;

  chat_id?: number;

  chat_name?: string;

  mentions?: CChatMentions;

  message?: string;

  message_no_bbcode?: string;

  notification_key?: string;

  ordinal?: number;

  server_message?: ServerMessage;

  steamid_sender?: string;

  timestamp?: number;
}

export interface CChatRoom_ChatMessageModified_Notification {
  chat_group_id?: number;

  chat_id?: number;

  messages?: CChatRoom_ChatMessageModified_Notification_ChatMessage[];
}

export interface CChatRoom_ChatMessageModified_Notification_ChatMessage {
  deleted?: boolean;

  ordinal?: number;

  server_timestamp?: number;
}

export interface CChatRoom_MemberStateChange_Notification {
  change?: ChatRoomMemberStateChange;

  chat_group_id?: number;

  member?: CChatRoomMember;
}

export interface CChatRoom_ChatRoomHeaderState_Notification {
  header_state?: CChatRoomGroupHeaderState;
}

export interface CChatRoom_ChatRoomGroupRoomsChange_Notification {
  chat_group_id?: number;

  chat_rooms?: CChatRoomState[];

  default_chat_id?: number;
}

export interface CChatRoom_NotifyShouldRejoinChatRoomVoiceChat_Notification {
  chat_group_id?: number;

  chat_id?: number;
}

export interface ChatRoomClient_NotifyChatGroupUserStateChanged_Notification {
  chat_group_id?: number;

  group_summary?: CChatRoom_GetChatRoomGroupSummary_Response;

  user_action?: ChatRoomMemberStateChange;

  user_chat_group_state?: CUserChatRoomGroupState;
}

export interface ChatRoomClient_NotifyChatRoomDisconnect_Notification {
  chat_group_ids?: number[];
}

export interface CChatRoomMemberListView {
  client_changenumber?: number;

  end?: number;

  server_changenumber?: number;

  start?: number;

  total_count?: number;
}

export interface CChatRoomMemberSummaryCounts {
  ingame?: number;

  offline?: number;

  online?: number;
}

export interface CChatRoomClient_MemberListViewUpdated_Notification {
  chat_group_id?: number;

  member_summary?: CChatRoomMemberSummaryCounts;

  members?: CChatRoomClient_MemberListViewUpdated_Notification_MemberListViewEntry[];

  status_flags?: number;

  subscribed_personas?: CMsgClientPersonaState_Friend[];

  view?: CChatRoomMemberListView;

  view_id?: number;
}

export interface CChatRoomClient_MemberListViewUpdated_Notification_MemberListViewEntry {
  accountid?: number;

  persona?: CMsgClientPersonaState_Friend;

  rank?: number;
}

export interface CChatRoom_MessageReaction_Notification {
  chat_group_id?: number;

  chat_id?: number;

  is_add?: boolean;

  ordinal?: number;

  reaction?: string;

  reaction_type?: ChatRoomMessageReactionType;

  reactor?: string;

  server_timestamp?: number;
}

export interface CChatUsability_ClientUsabilityMetrics_Notification {
  client_build?: number;

  in_web?: boolean;

  metrics?: CChatUsability_ClientUsabilityMetrics_Notification_Metrics;

  metrics_run_id?: number;

  metrics_version?: number;

  settings?: CChatUsability_ClientUsabilityMetrics_Notification_Settings;

  ui_state?: CChatUsability_ClientUsabilityMetrics_Notification_UIState;

  voice_settings?: CChatUsability_ClientUsabilityMetrics_Notification_VoiceSettings;
}

export interface CChatUsability_ClientUsabilityMetrics_Notification_Settings {
  always_new_chat_window?: boolean;

  animated_avatars?: boolean;

  categorize_in_game_friends_by_game?: boolean;

  chat_flash_mode?: number;

  chat_font_size?: number;

  compact_friends_list?: boolean;

  compact_quick_access?: boolean;

  disable_embed_inlining?: boolean;

  do_not_disturb_mode?: boolean;

  force_alphabetic_friend_sorting?: boolean;

  hide_categorized_friends?: boolean;

  hide_offline_friends_in_tag_groups?: boolean;

  notifications_events_and_announcements?: boolean;

  notifications_show_chat_room_notification?: boolean;

  notifications_show_ingame?: boolean;

  notifications_show_message?: boolean;

  notifications_show_online?: boolean;

  remember_open_chats?: boolean;

  sign_into_friends?: boolean;

  sounds_events_and_announcements?: boolean;

  sounds_play_chat_room_notification?: boolean;

  sounds_play_ingame?: boolean;

  sounds_play_message?: boolean;

  sounds_play_online?: boolean;

  use24hour_clock?: boolean;
}

export interface CChatUsability_ClientUsabilityMetrics_Notification_VoiceSettings {
  noise_gate_level?: number;

  play_ptt_sounds?: boolean;

  push_to_mute_enabled?: boolean;

  push_to_talk_enabled?: boolean;

  selected_non_default_mic?: boolean;

  selected_non_default_output?: boolean;

  voice_input_gain?: number;

  voice_output_gain?: number;

  voice_use_auto_gain_control?: boolean;

  voice_use_echo_cancellation?: boolean;

  voice_use_noise_cancellation?: boolean;
}

export interface CChatUsability_ClientUsabilityMetrics_Notification_UIState {
  category_collapse?: CChatUsability_ClientUsabilityMetrics_Notification_UIState_CategoryCollapseState;

  chat_popups_opened?: number;

  chat_window_height?: number;

  chat_window_width?: number;

  friend_chat_tabs_opened?: number;

  friends_list_collapsed?: boolean;

  friends_list_docked?: boolean;

  friends_list_group_chats_height?: number;

  friends_list_height?: number;

  friends_list_visible?: boolean;

  friends_list_width?: number;

  group_chat_left_col_collapsed?: number;

  group_chat_right_col_collapsed?: number;

  group_chat_tabs_opened?: number;

  in_group_voice_chat?: boolean;

  in_one_on_one_voice_chat?: boolean;
}

export interface CChatUsability_ClientUsabilityMetrics_Notification_UIState_CategoryCollapseState {
  categories_collapsed?: number;

  game_groups_collapsed?: number;

  in_game_collapsed?: boolean;

  offline_collapsed?: boolean;

  online_collapsed?: boolean;
}

export interface CChatUsability_ClientUsabilityMetrics_Notification_Metrics {
  friends_categorized_count?: number;

  friends_category_count?: number;

  friends_count?: number;

  friends_favorite_count?: number;

  friends_in_game_count?: number;

  friends_in_game_singleton_count?: number;

  friends_online_count?: number;

  game_group_count?: number;

  group_chat_count?: number;

  group_chat_favorite_count?: number;
}

export interface CChatUsability_RequestClientUsabilityMetrics_Notification {
  metrics_run_id?: number;
}

export enum ChatRoomJoinState {
  Default = 0,
  None = 1,
  Joined = 2,
  TestInvalid = 99,
}

export enum ChatRoomGroupRank {
  Default = 0,
  Viewer = 10,
  Guest = 15,
  Member = 20,
  Moderator = 30,
  Officer = 40,
  Owner = 50,
  TestInvalid = 99,
}

export enum ChatRoomNotificationLevel {
  EChatroomNotificationLevel_Invalid = 0,
  EChatroomNotificationLevel_None = 1,
  EChatroomNotificationLevel_MentionMe = 2,
  EChatroomNotificationLevel_MentionAll = 3,
  EChatroomNotificationLevel_AllMessages = 4,
}

export enum ChatRoomServerMessage {
  EChatRoomServerMsg_Invalid = 0,
  EChatRoomServerMsg_RenameChatRoom = 1,
  EChatRoomServerMsg_Joined = 2,
  EChatRoomServerMsg_Parted = 3,
  EChatRoomServerMsg_Kicked = 4,
  EChatRoomServerMsg_Invited = 5,
  EChatRoomServerMsg_InviteDismissed = 8,
  EChatRoomServerMsg_ChatRoomTaglineChanged = 9,
  EChatRoomServerMsg_ChatRoomAvatarChanged = 10,
  EChatRoomServerMsg_AppCustom = 11,
  EChatRoomServerMsg_JoinedMany = 12,
  EChatRoomServerMsg_PartedMany = 13,
  EChatRoomServerMsg_InvitedMany = 14,
}

export enum ChatRoomMessageReactionType {
  Invalid = 0,
  Emoticon = 1,
  Sticker = 2,
}

export enum ChatRoomMemberStateChange {
  Invalid = 0,
  Joined = 1,
  Parted = 2,
  Kicked = 3,
  Invited = 4,
  RankChanged = 7,
  InviteDismissed = 8,
  Muted = 9,
  Banned = 10,
  RolesChanged = 12,
}
