import { ConnectionManager } from 'Global/managers/ConnectionManager';
import { ObservableMap, ObservableSet } from 'mobx';
import { SteamID } from 'shared/steamid';
import { ChatStore } from './ChatStore/ChatStore';

export interface FriendStore {
  BShouldCachePlayer(e: unknown): unknown;

  FetchOwnedGames(e: unknown): Promise<unknown>;

  GetCountFriendsInGame(e: unknown): unknown;

  GetCountFriendsPlayingGames(): unknown;

  GetFriendsInGame(e: unknown): unknown;

  GetFriendState(e: unknown): unknown;

  GetMaxCountFriendsInGame(): unknown;

  GetOwnedGames(e: unknown): unknown;

  Init(e: unknown, t: unknown): Promise<void>;

  InitPlayerCache(): Promise<void>;

  IsLibraryAccessDenied(e: unknown): boolean;

  LoadPersonaState(e: unknown): Promise<unknown>;

  OnConnectedToSteam(): void;

  OnPersonaStateChanged(e: unknown): void;

  RefreshOwnedGames(e: unknown): void;

  allFriends: SteamFriend[];

  currentUserSteamID: SteamID;

  favoriteFriends: SteamFriend[];

  k_strPlayerCacheKey: string;

  m_CMInterface: ConnectionManager;

  m_FriendsUIFriendStore: FriendsUIFriendStore;

  m_mapOwnedGamesCacheErrors: ObservableMap<unknown, unknown>;

  m_mapPlayerCache: ObservableMap<unknown, unknown>;

  m_ownedGamesCache: OwnedGamesCache;

  m_Storage: object;
}

export interface SteamFriend {
  BHaveReceivedPersonaUpdateSince(e: unknown): boolean;

  BLoadedEquippedItems(): unknown;

  BMatchesSearchString(e: unknown, t: unknown): boolean;

  BPlayInGameSound(): unknown;

  BPlayMessageSound(): unknown;

  BPlayOnlineSound(): unknown;

  BShowInGameNotification(): unknown;

  BShowMessageNotification(): unknown;

  BShowOnlineNotification(): unknown;

  /**
   * @param t default: 15
   */
  BWasRecentlyPlayingAppID(e: unknown, t?: number): boolean;

  ClearStateOnDisconnect(): void;

  GetBroadcastDescription(): unknown;

  GetCommunityProfileURL(): string;

  GetEquippedProfileItems(): unknown;

  is_appinfo_ready(): unknown;

  LoadAndSetGoldenProfileFrame(): Promise<void>;

  /**
   * @param e default: !1
   */
  LoadEquippedProfileItems(e?: boolean): Promise<void>;

  LoadIfNecessary(): void;

  MatchSearchString(e: unknown): { match: number; iOffset: unknown; bFullMatch: boolean; } | { match: number; iOffset?: undefined; bFullMatch?: undefined; };

  OpenChatDialog(e: unknown): unknown;

  SetLastSeenPlaying(e: unknown): void;

  SetPersonaStateUpdated(): void;

  accountid: number;

  current_game_icon_url: string;

  current_game_name: string;

  current_game_rich_presence: string;

  display_name: string;

  efriendrelationship: number;

  game_name_normalized: string;

  has_nickname: boolean;

  has_secondary_display_name: boolean;

  is_blocked: boolean;

  is_display_name_nickname: boolean;

  is_friend: boolean;

  is_ready: boolean;

  localized_online_status: string;

  m_bLoadedEquippedProfileItems: boolean;

  m_bPersonaNameHistoryLoaded: boolean;

  m_bPersonaStateLoadRequested: boolean;

  m_bRequestedEquippedProfileItems: boolean;

  m_dtLastSeenPlaying?: Date;

  /**
   * This value is an enum
   * @currentValue 3
   * @currentValue 0
   * @currentValue 5
   */
  m_eFriendRelationship: EFriendRelationship;

  m_equippedProfileItems: (EquippedProfileItems | object);

  m_miniProfileDataLoader: MiniProfileData;

  m_nAppIDLastSeenPlaying: number;

  m_NotificationSettings: NotificationSettings;

  m_persona: Persona;

  m_rgPersonaNameHistory: string[];

  m_strGameNameNormalized: string;

  m_strNickname?: string;

  m_strPlayerNameNormalized: string;

  m_strPlayerNicknameNormalized?: string;

  m_tsLastPersonaStateUpdate: number;

  m_unAccountID: number;

  miniProfileData: MiniProfileData;

  mutable_persona: Persona;

  nickname?: string;

  notification_settings: NotificationSettings;

  persona: Persona;

  persona_name_history: string[];

  persona_name_history_loaded: boolean;

  player_name_normalized: string;

  primary_display_name: string;

  secondary_display_name: string;

  showing_secondary_display_name: boolean;

  steamid: SteamID;

  steamid64: string;
}

export interface FriendsUIFriendStore {
  AddFriend(e: unknown, t: unknown, r: unknown): void;

  AddPersonaStateChangedCallback(e: unknown): unknown;

  AddPlayerGameChangedCallback(e: unknown): unknown;

  /**
   * @param r default: !0
   */
  AddPlayerToCache(e: unknown, t: unknown, r?: boolean): unknown;

  AdjustPersonaStateForIdleTime(e: unknown): unknown;

  BApprovedNonFriendMessages(e: unknown): boolean;

  BIsInvisibleMode(): boolean;

  BIsOfflineMode(): boolean;

  /**
   * @param t default: !1
   */
  BlockPlayer(e: unknown, t?: boolean): unknown;

  EnsureApprovedNonFriendMapReady(): void;

  /**
   * @param e default: !1
   */
  EnsureFriendsListLoaded(e?: boolean): void;

  FillInChatUsabilityMetrics(e: unknown): void;

  FillMessageFromPerFriendNotificationSettings(e: unknown, t: unknown): void;

  FillPerFriendNotificationSettingsFromMessage(e: unknown, t: unknown): void;

  ForceReadyToRender(): void;

  GetClanInviteCount(): unknown;

  GetFriend(e: unknown): unknown;

  GetFriendIfCached(e: unknown): unknown;

  GetFriendInviteCount(): unknown;

  GetFriendsList(): Promise<void>;

  GetOnlineFriendCount(): unknown;

  GetOutgoingFriendRequestCount(): unknown;

  GetPendingInviteCount(): unknown;

  GetPersonaStatePreference(): unknown;

  GetPlayer(e: unknown): unknown;

  GetPlayerIfCached(e: unknown): unknown;

  GetUserDoNotDisturb(): unknown;

  Init(e: unknown): Promise<unknown>;

  InitializeIdleTracking(): void;

  InviteToGame(e: unknown, t: unknown, r: unknown): void;

  InviteToLobby(e: unknown, t: unknown, r: unknown): void;

  InviteToWatch(e: unknown): void;

  OnFriendPersonaStateChanged(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): undefined;

  OnIdle(e: unknown): void;

  OnParentalLockChanged(e: unknown): void;

  OnPersonaStateUpdate(e: unknown): void;

  PlayFriendOnlineSound(): void;

  PlayJoinGameSound(): void;

  QueueFriendPersonaStateLoad(e: unknown): void;

  RemoveFriend(e: unknown): unknown;

  RemoveFriendBySteamID(e: unknown): unknown;

  RequestFriendPersonaStates(): Promise<void>;

  RequestPerFriendPreferences(): void;

  ResetFriendsListLoadedState(): void;

  ResetIdleState(): void;

  SendFriendInvite(e: unknown): Promise<unknown>;

  SendFriendInviteBySteamID(e: unknown): Promise<{ eResult: number; eFriendRelationship: unknown; }>;

  SendPersonaStateToServer(e: unknown, t: unknown): boolean;

  SetApprovedNonFriendMessages(e: unknown): void;

  SetFriendsList(e: unknown): void;

  SetPersonasOffline(e: unknown): void;

  SetPlayerNickname(e: unknown, t: unknown): unknown;

  SetPlayerNotificationSettings(e: unknown, t: unknown): unknown;

  SetPlayerPerFriendPreferences(e: unknown, t: unknown, r: unknown): unknown;

  SetReconnectedSinceLastIdleUpdate(): void;

  SetUserDoNotDisturb(e: unknown): void;

  /**
   * @param t default: !0
   */
  SetUserPersonaState(e: unknown, t?: boolean): void;

  StartWaitForInitialAppInfo(): Promise<void>;

  SubscribeToMissingPersonaStates(): void;

  UpdateReadyToRenderState(): void;

  UpdateUnreadMessagesGlobal(): void;

  UpdateUserPersonaStateInternal(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): void;

  all_friends: SteamFriend[];

  all_friends_accountids: ObservableSet<number>;

  ClanStore: ClanStore;

  FavoritesStore: FavoritesStore;

  FriendGroupStore: FriendGroupStore;

  friends_list_ready: boolean;

  m_bAwayCallbackFired: boolean;

  m_bInitialAppInfoLoaded: boolean;

  m_bInitialPersonaStatesLoaded: boolean;

  m_bIsClientIdle: boolean;

  m_bMadeGetFriendsListRequest: boolean;

  m_bNextActivityCallbackRegistered: boolean;

  m_bParentalLocked: undefined;

  m_bPerFriendPreferencesLoaded: boolean;

  m_bReadyToRender: boolean;

  m_bReceivedFriendsList: boolean;

  m_bReconnectedSinceLastIdleUpdate: boolean;

  m_bSnoozeCallbackFired: boolean;

  m_bUserSetPersonaState: boolean;

  m_cFriendPersonaStatesInitialized: number;

  m_ClanStore: ClanStore;

  m_cLastUnreadPriorityMessageCountPosted: number;

  m_CMInterface: ConnectionManager;

  /**
   * This value is an enum
   * @currentValue 1
   */
  m_eUserPersonaState: EUserPersonaState;

  /**
   * This value is an enum
   * @currentValue 1
   */
  m_eUserPersonaStateParental: EUserPersonaStateParental;

  m_FavoritesStore: FavoritesStore;

  m_fnOnReadyToRender: undefined;

  m_FriendGroupStore: FriendGroupStore;

  m_FriendInGameNotificationStore: FriendInGameNotificationStore;

  m_FriendStorePrefs: FriendStorePrefs;

  m_iIntervalDelayLoadFriendsList: undefined;

  m_iIntervalSubscribeToPersonaStateUpdates: number;

  m_InitialAppInfoPromises: Promise<unknown>[];

  m_mapApprovedNonFriendMessages: undefined;

  m_mapPlayerCache: Map<number, SteamFriend>;

  m_nMissingPersonaStateMaxRetries: number;

  m_nMissingPersonaStateRetryCount: number;

  m_rgPersonaStateChangeCallbacks: RgPersonaStateChangeCallbacks;

  m_rgPlayerGameChangedCallbacks: RgPersonaStateChangeCallbacks;

  m_self: SteamFriend;

  m_setFriendAccountIDs: ObservableSet<number>;

  m_setFriendsNeedingPersonaStateLoad: Set<unknown>;

  m_setIncomingInviteAccountIDs: Set<unknown>;

  m_TokenBucketChangeStatus: TokenBucketChangeStatus;

  m_TokenFailureAssertCount: number;

  m_tsLastConnect: number;

  m_vecLastTenChangeStatusReasons: string[];

  not_ready_to_render_reason: string;

  online_friends: SteamFriend[];

  self: SteamFriend;
}

export interface OwnedGamesCache {
  AddCacheItem(e: unknown): unknown;

  Get(e: unknown): unknown;

  GetOrAddCacheEntry(e: unknown): unknown;

  GetStorage(): unknown;

  GetStorageKey(): unknown;

  GetStorageVersion(): unknown;

  Init(): Promise<void>;

  LoadTableOfContents(): unknown;

  /**
   * @native
   */
  m_fetch(): unknown;

  m_onUpdate(e: unknown, t: unknown): void;

  OnUpdate(e: unknown, t: unknown): void;

  RefreshItem(e: unknown): void;

  SaveTableOfContents(): unknown;

  ScheduleSave(): void;

  m_dataMap: ObservableMap<number, DataMap>;

  m_nMinRefreshTime: number;

  m_params: Params;

  m_timeoutTocSave: number;
}

export interface MiniProfileData {
  EnsureCommunityDataLoaded(): void;

  Reload(): void;

  community_data?: CommunityData;

  community_data_ready: boolean;

  m_accountid: number;

  m_bLoadingData: boolean;

  m_communityData?: CommunityData;

  m_rtLastLoad: number;

  player_badge?: Player_badge;

  player_level?: number;

  player_level_class?: string;

  profile_background?: Profile_background;
}

export interface NotificationSettings {
  Notifications_SendMobile: number;

  Notifications_ShowInGame: number;

  Notifications_ShowMessage: number;

  Notifications_ShowOnline: number;

  Sounds_PlayInGame: number;

  Sounds_PlayMessage: number;

  Sounds_PlayOnline: number;
}

export interface Persona {
  BHasAvatarSet(): boolean;

  BIsAppInfoReady(): unknown;

  ClearStateOnDisconnect(): void;

  GetAccountID(): unknown;

  GetCommunityProfileURL(): string;

  GetCurrentGameIconURL(): unknown;

  GetCurrentGameName(): unknown;

  GetCurrentGameRichPresence(): unknown;

  GetCurrentGameStatus(): unknown;

  GetLocalizedOnlineStatus(): unknown;

  GetOfflineStatusTime(): unknown;

  GetOfflineStatusUpdateRate(): number;

  HasCurrentGameRichPresence(): unknown;

  HasRichPresenceForViewGameInfo(): boolean;

  HasStateFlag(e: unknown): boolean;

  Reset(): void;

  UpdateFromMessage(e: unknown, t: unknown): void;

  avatar_url: string;

  avatar_url_full: string;

  avatar_url_medium: string;

  connect_string?: never;

  has_joinable_game_flag: boolean;

  has_public_party_beacon: boolean;

  has_server_ip: boolean;

  is_awayOrSnooze: boolean;

  is_golden: boolean;

  is_in_joinable_game: boolean;

  is_in_nonsteam_game: boolean;

  is_in_valid_lobby: boolean;

  is_ingame: boolean;

  is_online: boolean;

  is_watchingbroadcast: boolean;

  last_seen_online: number;

  m_bAvatarPending: boolean;

  m_bCommunityBanned?: boolean;

  m_bInitialized: boolean;

  m_bNameInitialized: boolean;

  m_bPlayerNamePending: boolean;

  m_broadcastAccountId?: number;

  m_broadcastAppId?: number;

  m_broadcastId?: string;

  m_broadcastViewerCount?: number;

  m_bStatusInitialized: boolean;

  /**
   * This value is an enum
   * @currentValue 0
   * @currentValue 1
   */
  m_eGamingDeviceType: EGamingDeviceType;

  /**
   * This value is an enum
   * @currentValue 0
   * @currentValue 1
   */
  m_ePersonaState: EPersonaState;

  m_game_lobby_id: string;

  m_gameid: string;

  m_mapRichPresence: ObservableMap<string, string>;

  m_rtLastSeenOnline: number;

  m_steamid: SteamID;

  m_strAccountName: string;

  m_strAvatarHash: string;

  m_strBroadcastTitle?: string;

  m_strGameExtraInfo: string;

  m_strPlayerName: string;

  m_strProfileURL?: never;

  m_unGamePlayedAppID: number;

  m_unGameServerIP: number;

  m_unGameServerPort: number;

  m_unPersonaStateFlags: number;

  online_state: string;

  player_group: string;

  player_group_size: number;
}

export interface ClanStore {
  ClearClanMembershipData(): void;

  EnsureInitialStateForClanInvites(): void;

  GetClan(e: unknown): unknown;

  GetOrCreateClan(e: unknown, t: unknown): unknown;

  Init(e: unknown): void;

  JoinClanChatRoom(e: unknown, t: unknown): void;

  LoadClanPersonaIfNeeded(e: unknown): void;

  LoadMissingClanPersonas(): void;

  OnClanPersonaStateUpdate(e: unknown, t: unknown): void;

  OnClanRelationshipChanged(e: unknown, t: unknown): void;

  OnLogOn(): void;

  RespondToClanInvite(e: unknown, t: unknown): unknown;

  ScheduleLoadMissingClanPersonas(): void;

  SetClanChatGroupID(e: unknown, t: unknown): void;

  clan_invite_count: number;

  clan_invites: unknown[];

  m_CMInterface: ConnectionManager;

  m_FriendStore: FriendsUIFriendStore;

  m_iIntervalLoadClanData: undefined;

  m_mapClans: ObservableMap<number, MapClans>;
}

export interface FavoritesStore {
  AddToFavorites(e: unknown, t: unknown): unknown;

  BIsFavorited(e: unknown): boolean;

  FillInChatUsabilityMetrics(e: unknown): void;

  Init(e: unknown): void;

  OnFriendRemoved(e: unknown): void;

  ReadFavorites(e: unknown): void;

  RecvFavoritesList(e: unknown): void;

  RemoveFromFavorites(e: unknown): unknown;

  SaveFavorites(): unknown;

  favorites: Favorites[];

  m_ChatStore: ChatStore;

  m_ClanStore: ClanStore;

  m_CMInterface: ConnectionManager;

  m_FriendStore: FriendsUIFriendStore;

  m_rgFavorites: Favorites[];
}

export interface FriendGroupStore {
  CreateGroup(e: unknown, t: unknown): Promise<unknown>;

  EnsureMutualFriendsForIncomingInvites(): void;

  FillInChatUsabilityMetrics(e: unknown): void;

  GetCountFriendsInGame(e: unknown): unknown;

  GetGameGroup(e: unknown): unknown;

  GetMaxCountFriendsInGame(): unknown;

  HandleGroupRemoval(e: unknown): void;

  Init(e: unknown): void;

  ManageGroup(e: unknown, t: unknown, r: unknown, n: unknown): Promise<unknown>;

  OnFriendAdded(e: unknown): void;

  OnFriendGameChanged(e: unknown, t: unknown, r: unknown): void;

  OnFriendRemoved(e: unknown): void;

  OnFullFriendsListUpdateComplete(): void;

  OnFullFriendsListUpdateStart(): void;

  OnIncomingInviteAdded(e: unknown): void;

  OnIncomingInviteRemoved(e: unknown): void;

  OnOutgoingInviteAdded(e: unknown): void;

  OnOutgoingInviteRemoved(e: unknown): void;

  OnPersonaStateCacheReset(): void;

  RecvCategoriesList(e: unknown): void;

  RemoveGroup(e: unknown): void;

  TransferFriendFromToGroup(e: unknown, t: unknown, r: unknown): Promise<never[]>;

  all_friends: ExpandedChatGroup;

  categorized_friend_set: Set<unknown>;

  default_groups: (ExpandedChatGroup | Default_groups)[];

  friend_groups: (ExpandedChatGroup | Default_groups)[];

  game_groups: unknown[];

  games_with_friends_playing: number[];

  groupDisplayPrefs: GroupDisplayPrefs;

  incoming_invites_group: ExpandedChatGroup;

  ingame_group: ExpandedChatGroup;

  m_CMInterface: ConnectionManager;

  m_FriendGroupDisplayPrefs: GroupDisplayPrefs;

  m_FriendStore: FriendsUIFriendStore;

  m_groupAllFriends: ExpandedChatGroup;

  m_groupIncomingInvites: ExpandedChatGroup;

  m_groupIngameFriends: ExpandedChatGroup;

  m_groupOfflineFriends: Default_groups;

  m_groupOutgoingInvites: ExpandedChatGroup;

  m_mapGameGroups: ObservableMap<number, MapGameGroups>;

  m_mapGroups: ObservableMap<unknown, unknown>;

  m_nonSteamGameGroup: ExpandedChatGroup;

  m_singletonGameGroup: ExpandedChatGroup;

  outgoing_invites_group: ExpandedChatGroup;

  singleton_game_group: ExpandedChatGroup;

  user_groups: unknown[];
}

export interface FriendInGameNotificationStore {
  Init(e: unknown): void;

  /**
   * @native
   */
  NotifyImpressions(): unknown;

  RecordFriendInGameImpression(e: unknown): void;

  m_CMInterface: ConnectionManager;

  m_currentMsg: null;

  m_mapLastSeenApp: Map<unknown, unknown>;
}

export interface FriendStorePrefs {
  /**
   * This value is an enum
   * @currentValue 1
   */
  ePersonaState: EPersonaState;

  strNonFriendsAllowedToMsg: string;
}

export interface RgPersonaStateChangeCallbacks {
  ClearAllCallbacks(): void;

  CountRegistered(): unknown;

  Dispatch(...e: unknown[]): void;

  Register(e: unknown): { Unregister: () => void; };

  m_vecCallbacks: never;
}

export interface TokenBucketChangeStatus {
  AddTokens(): void;

  BRemoveToken(): boolean;

  Reset(): void;

  m_flTokens: number;

  m_numIntervalsPerMillisecond: number;

  m_numStartingTokens: number;

  m_numTokensPerMillisecond: number;

  m_TimeLastChecked: number;
}

export interface DataMap {
  FetchData(): unknown;

  Get(): unknown;

  GetData(): unknown;

  GetFailureRetryIntervalMS(): unknown;

  GetMaxLifetimeMS(): unknown;

  GetStorage(): unknown;

  GetStorageKey(): unknown;

  GetStorageVersion(): unknown;

  Init(): Promise<void>;

  IsOlderThan(e: unknown): boolean;

  LoadFromStorage(): Promise<unknown>;

  m_fetch(): unknown;

  Refresh(): unknown;

  /**
   * @native
   */
  RefreshDataIfNeeded(): unknown;

  SaveToStorage(): Promise<unknown>;

  ScheduleRefresh(e: unknown): void;

  m_currentFetch: null;

  m_data: Data;

  m_nLastFetchTimeMS: number;

  m_nNextFetchTimeMS: number;

  m_params: Params;

  m_timeoutNextFetch: number;
}

export interface Params {
  onUpdate?(t: unknown): void;

  reviver(e: unknown, t: unknown): unknown;

  nFailureRetryIntervalMS: number;

  nMaxLifetimeMS: number;

  nStorageVersion: number;

  storage: object;

  strStorageKey: string;
}

export interface MapClans {
  BIsInvite(): boolean;

  BIsMember(): boolean;

  BIsOGG(): unknown;

  BMatchesSearchString(e: unknown): boolean;

  BNeedsToLoadPersonaStateData(): boolean;

  BPersonaStateDesired(): unknown;

  GetChatGroupIDIfLoaded(): unknown;

  GetChatRoomGroupID(): unknown;

  GetOGGAppID(): unknown;

  /**
   * @param t default: !0
   */
  OpenChatDialog(e: unknown, t?: boolean): unknown;

  ReadPersonaStateUpdate(e: unknown, t: unknown): void;

  ReadStateUpdate(e: unknown): void;

  SetChatGroupID(e: unknown): void;

  SetPersonaStateDesired(): void;

  SetPersonaStateLoadRequested(): void;

  SetRelationship(e: unknown): void;

  avatar_url: string;

  avatar_url_full: string;

  avatar_url_medium: string;

  chat_room_private?: never;

  clanid: number;

  count_chat_room_members: number;

  m_bChatRoomPrivate?: never;

  m_bGotInitialState: boolean;

  m_bInitialized: boolean;

  m_bPersonaStateDesired: boolean;

  m_bPersonaStateLoadRequested: boolean;

  m_cChatRoomMembers: number;

  m_cMemberCount: number;

  m_cUsersInGame: number;

  m_cUsersOnline: number;

  /**
   * This value is an enum
   * @currentValue 3
   * @currentValue 0
   * @currentValue 2
   * @currentValue 18
   */
  m_eClanAccountFlags: EClanAccountFlags;

  /**
   * This value is an enum
   * @currentValue 3
   * @currentValue 6
   * @currentValue 7
   * @currentValue 0
   */
  m_eClanRelationship: EClanRelationship;

  m_steamid: SteamID;

  m_strAvatarHash: string;

  m_strClanName: string;

  m_strClanTag: string;

  m_ulChatRoomGroupID?: never;

  m_unOGGAppID?: never;

  member_count: number;

  name: string;

  steamid: SteamID;

  users_ingame: number;

  users_online: number;
}

export interface Favorites {
  friend: SteamFriend;
}

export interface ExpandedChatGroup extends ChatGroupBase {
  GetMutualFriendsCacheHash?(): unknown;

  PlayerGroupSortComparator?(e: unknown, t: unknown, r: unknown, n: unknown): unknown;

  SetMutualFriends?(e: unknown): void;

  SetMutualFriendsCacheHash?(e: unknown): void;

  is_initialized?: boolean;

  m_mapSteamIDToMutualFriends?: ObservableMap<unknown, unknown>;

  m_OnHeaderClick?: never;

  m_unMutualFriendsCacheHash?: number;

  map_steamid_to_mutual_friends?: ObservableMap<unknown, unknown>;

  onheaderclick?: never;
}

export interface ChatGroupBase {
  AddMember(e: unknown): void;

  Clear(): void;

  GetCurrentMemberSet(): unknown;

  GetMembersMatchingSearch(e: unknown): never[];

  HasMember(e: unknown): unknown;

  RemoveMember(e: unknown): void;

  SetOnHeaderClick(e: unknown): void;

  accepts_group_removals: boolean;

  collapsed: boolean;

  display_type: number;

  GetRawMemberList: SteamFriend[];

  icon_url: string;

  id: number;

  m_bAcceptsGroupRemovals: boolean;

  m_bCollapsed: boolean;

  m_bModifiable: boolean;

  m_eDisplayType: FriendDisplayType;

  m_iGroupID: number;

  m_OnHeaderClick?: undefined;

  m_rgAccountIDMembers: number[];

  m_setMembers: Set<number>;

  m_strName: string;

  member_accountid_list: number[];

  member_count: number;

  member_counts: Member_counts;

  member_list: SteamFriend[];

  member_list_unsorted: SteamFriend[];

  modifiable: boolean;

  name: string;

  onheaderclick?: undefined;

  should_filter_categorized_friends: boolean;

  unfiltered_count: number;

  unique_id: string;
}

// TODO: If we rename this to anything else we get a `Maximum call stack size exceeded` error. I need to fix this.
export interface Default_groups extends ChatGroupBase {
}

export interface GroupDisplayPrefs {
  GetUserGroupCollapsed(e: unknown): boolean;

  Init(): void;

  SetUserGroupCollapsed(e: unknown, t: unknown): void;

  ToggleUserGroupCollapsed(e: unknown): void;

  WritePrefs(): void;

  m_mapCollapsePrefs: ObservableMap<string, boolean>;
}

export interface MapGameGroups extends ChatGroupBase {
  PlayerGroupSortComparator(e: unknown, t: unknown, r: unknown, n: unknown): unknown;

  is_initialized: boolean;
}

export interface Data {
  setApps: Set<number>;
}

export interface Member_counts {
  ingame: number;

  online: number;
}

export interface EquippedProfileItems {
  animated_avatar: (ColorProfileAvatar | ProfileAvatar);

  avatar_frame: (ColorProfileAvatar | ProfileAvatar);

  mini_profile_background: (ColorProfileAvatar | ProfileAvatar);

  profile_background: (ColorProfileAvatar | ProfileAvatar);

  profile_modifier: ColorProfileAvatar;

  steam_deck_keyboard_skin: (ColorProfileAvatar | ProfileAvatar);
}

export interface ColorProfileAvatar {
  profile_colors: never;
}

export interface ProfileAvatar {
  appid: number;

  communityitemid: string;

  image_large: string;

  image_small?: string;

  item_class: number;

  item_description: string;

  item_title: string;

  item_type: number;

  movie_mp4?: string;

  movie_mp4_small?: string;

  movie_webm?: string;

  movie_webm_small?: string;

  name: string;

  profile_colors: never;
}

export interface CommunityData {
  animated_avatar?: string;

  avatar_frame?: string;

  avatar_url: string;

  favorite_badge?: Player_badge;

  in_game?: In_game;

  level: number;

  level_class: string;

  persona_name: string;

  profile_background?: Profile_background;
}

export interface Player_badge {
  description: string;

  icon: string;

  level: number;

  name: string;

  xp: string;
}

export interface In_game {
  is_non_steam: boolean;

  logo: string;

  name: string;

  rich_presence: string;
}

export interface Profile_background {
  'video/mp4': string;

  'video/webm': string;
}

/** @generated */
export enum EFriendRelationship {
  EFriendRelationship3 = 3,
  EFriendRelationship0 = 0,
  EFriendRelationship5 = 5,
}

/** @generated */
export enum EUserPersonaState {
  EUserPersonaState0 = 0,
  EUserPersonaState1 = 1,
  EUserPersonaState4 = 4,
}

/** @generated */
export enum EUserPersonaStateParental {
  EUserPersonaStateParental0 = 0,
  EUserPersonaStateParental1 = 1,
}

/** @generated */
export enum EGamingDeviceType {
  EGamingDeviceType0 = 0,
  EGamingDeviceType1 = 1,
}

/** @generated */
export enum EPersonaState {
  EPersonaState0 = 0,
  EPersonaState1 = 1,
  EPersonaState3 = 3,
  EPersonaState4 = 4,
}

/** @generated */
export enum EClanAccountFlags {
  EClanAccountFlags3 = 3,
  EClanAccountFlags2 = 2,
  EClanAccountFlags0 = 0,
  EClanAccountFlags18 = 18,
}

/** @generated */
export enum EClanRelationship {
  EClanRelationship3 = 3,
  EClanRelationship6 = 6,
  EClanRelationship7 = 7,
  EClanRelationship0 = 0,
}

export enum FriendDisplayType {
  OnlineOnly = 0,
  OnlineOnlyNotInGame = 1,
  OfflineOnly = 2,
  IncomingInvites = 3,
  OutgoingInvites = 4,
  All = 5,
}
