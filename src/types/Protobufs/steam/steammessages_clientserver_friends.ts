export interface CMsgClientFriendMsg {
  chat_entry_type?: number;

  echo_to_sender?: boolean;

  message?: Uint8Array;

  rtime32_server_timestamp?: number;

  steamid?: string;
}

export interface CMsgClientFriendMsgIncoming {
  chat_entry_type?: number;

  from_limited_account?: boolean;

  message?: Uint8Array;

  rtime32_server_timestamp?: number;

  steamid_from?: string;
}

export interface CMsgClientAddFriend {
  accountname_or_email_to_add?: string;

  steamid_to_add?: string;
}

export interface CMsgClientAddFriendResponse {
  eresult?: number;

  persona_name_added?: string;

  steam_id_added?: string;
}

export interface CMsgClientRemoveFriend {
  friendid?: string;
}

export interface CMsgClientHideFriend {
  friendid?: string;

  hide?: boolean;
}

export interface CMsgClientFriendsList {
  active_friend_count?: number;

  bincremental?: boolean;

  friends?: CMsgClientFriendsList_Friend[];

  friends_limit_hit?: boolean;

  max_friend_count?: number;
}

export interface CMsgClientFriendsList_Friend {
  efriendrelationship?: number;

  ulfriendid?: string;
}

export interface CMsgClientFriendsGroupsList {
  bincremental?: boolean;

  bremoval?: boolean;

  friendGroups?: CMsgClientFriendsGroupsList_FriendGroup[];

  memberships?: CMsgClientFriendsGroupsList_FriendGroupsMembership[];
}

export interface CMsgClientFriendsGroupsList_FriendGroup {
  nGroupID?: number;

  strGroupName?: string;
}

export interface CMsgClientFriendsGroupsList_FriendGroupsMembership {
  nGroupID?: number;

  ulSteamID?: string;
}

export interface CMsgClientPlayerNicknameList {
  incremental?: boolean;

  nicknames?: CMsgClientPlayerNicknameList_PlayerNickname[];

  removal?: boolean;
}

export interface CMsgClientPlayerNicknameList_PlayerNickname {
  nickname?: string;

  steamid?: string;
}

export interface CMsgClientSetPlayerNickname {
  nickname?: string;

  steamid?: string;
}

export interface CMsgClientSetPlayerNicknameResponse {
  eresult?: number;
}

export interface CMsgClientRequestFriendData {
  friends?: string[];

  persona_state_requested?: number;
}

export interface CMsgClientChangeStatus {
  high_priority?: boolean;

  is_auto_generated_name?: boolean;

  is_client_idle?: boolean;

  need_persona_response?: boolean;

  persona_set_by_user?: boolean;

  persona_state?: number;

  persona_state_flags?: number;

  player_name?: string;
}

export interface CMsgPersonaChangeResponse {
  player_name?: string;

  result?: number;
}

export interface CMsgClientPersonaState {
  friends?: CMsgClientPersonaState_Friend[];

  status_flags?: number;
}

export interface CMsgClientPersonaState_Friend {
  avatar_hash?: Uint8Array;

  avatar_pending_review?: boolean;

  broadcast_id?: string;

  clan_data?: CMsgClientPersonaState_Friend_ClanData;

  clan_rank?: number;

  clan_tag?: string;

  friendid?: string;

  game_data_blob?: Uint8Array;

  game_lobby_id?: string;

  game_name?: string;

  game_played_app_id?: number;

  game_server_ip?: number;

  game_server_port?: number;

  gameid?: string;

  gaming_device_type?: number;

  is_community_banned?: boolean;

  last_logoff?: number;

  last_logon?: number;

  last_seen_online?: number;

  on_steam_deck?: boolean;

  online_session_instances?: number;

  other_game_data?: CMsgClientPersonaState_Friend_OtherGameData[];

  persona_set_by_user?: boolean;

  persona_state?: number;

  persona_state_flags?: number;

  player_name?: string;

  player_name_pending_review?: boolean;

  query_port?: number;

  rich_presence?: CMsgClientPersonaState_Friend_KV[];

  steamid_source?: string;

  watching_broadcast_accountid?: number;

  watching_broadcast_appid?: number;

  watching_broadcast_title?: string;

  watching_broadcast_viewers?: number;
}

export interface CMsgClientPersonaState_Friend_ClanData {
  chat_group_id?: number;

  ogg_app_id?: number;
}

export interface CMsgClientPersonaState_Friend_KV {
  key?: string;

  value?: string;
}

export interface CMsgClientPersonaState_Friend_OtherGameData {
  gameid?: number;

  rich_presence?: CMsgClientPersonaState_Friend_KV[];
}

export interface CMsgClientFriendProfileInfo {
  steamid_friend?: string;
}

export interface CMsgClientFriendProfileInfoResponse {
  city_name?: string;

  country_name?: string;

  eresult?: number;

  headline?: string;

  real_name?: string;

  state_name?: string;

  steamid_friend?: string;

  summary?: string;

  time_created?: number;
}

export interface CMsgClientCreateFriendsGroup {
  groupname?: string;

  steamid?: string;

  steamid_friends?: string[];
}

export interface CMsgClientCreateFriendsGroupResponse {
  eresult?: number;

  groupid?: number;
}

export interface CMsgClientDeleteFriendsGroup {
  groupid?: number;

  steamid?: string;
}

export interface CMsgClientDeleteFriendsGroupResponse {
  eresult?: number;
}

export interface CMsgClientManageFriendsGroup {
  groupid?: number;

  groupname?: string;

  steamid_friends_added?: string[];

  steamid_friends_removed?: string[];
}

export interface CMsgClientManageFriendsGroupResponse {
  eresult?: number;
}

export interface CMsgClientAddFriendToGroup {
  groupid?: number;

  steamiduser?: string;
}

export interface CMsgClientAddFriendToGroupResponse {
  eresult?: number;
}

export interface CMsgClientRemoveFriendFromGroup {
  groupid?: number;

  steamiduser?: string;
}

export interface CMsgClientRemoveFriendFromGroupResponse {
  eresult?: number;
}

export interface CMsgClientGetEmoticonList { }

export interface CMsgClientEmoticonList {
  effects?: CMsgClientEmoticonList_Effect[];

  emoticons?: CMsgClientEmoticonList_Emoticon[];

  stickers?: CMsgClientEmoticonList_Sticker[];
}

export interface CMsgClientEmoticonList_Emoticon {
  appid?: number;

  count?: number;

  name?: string;

  time_last_used?: number;

  time_received?: number;

  use_count?: number;
}

export interface CMsgClientEmoticonList_Sticker {
  appid?: number;

  count?: number;

  name?: string;

  time_last_used?: number;

  time_received?: number;

  use_count?: number;
}

export interface CMsgClientEmoticonList_Effect {
  appid?: number;

  count?: number;

  infinite_use?: boolean;

  name?: string;

  time_received?: number;
}
