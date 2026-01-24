import { ConnectionManager } from 'Global/managers/ConnectionManager';
import { TextFilterStore } from 'Global/stores/SteamUIStore/TextFilterStore';
import { ObservableMap } from 'mobx';
import { CChatRoleActions } from 'Protobufs/steam/steammessages_chat.steamclient';
import { ProtobufInterface } from 'shared/protobuf';
import { SteamID } from 'shared/steamid';
import { FriendDisplayType, FriendsUIFriendStore, SteamFriend } from '../FriendStore';
import { EmbedStore } from './EmbedStore';
import { EmoticonStore } from './EmoticonStore';
import { GameInviteStore } from './GameInviteStore';
import { InviteStore } from './InviteStore';
import { NotificationBBCodeParser } from './NotificationBBCodeParser';
import { SettingsStore } from './SettingsStore';
import { VoiceChatStore } from './VoiceChatStore';

export interface ChatStore {
  AddCreatedChatRoomGroup(e: unknown, t: unknown, r: unknown, n: unknown): void;

  AddJoinedChatRoomGroup(e: unknown, t: unknown): unknown;

  AddKnownChatRoomGroup(e: unknown, t: unknown): void;

  BIsEligibleForVoiceChat(e: unknown, t: unknown): unknown;

  /**
   * @param n default: {}
   */
  CreateChatRoomGroup(e: unknown, t: unknown, r: unknown, n?: unknown): unknown;

  DecRefActiveChatRoomGroup(e: unknown): unknown;

  FillInChatUsabilityMetrics(e: unknown): void;

  FindChatRoom(e: unknown, t: unknown): unknown;

  FindChatRoom_Deprecated(e: unknown): null;

  FindChatRoomGroupsMatchingSearch(e: unknown): unknown;

  FindNamelessChatGroupWithFriends(e: unknown): unknown;

  GetActiveVoiceChannelName(): unknown;

  GetActiveVoiceChat(): unknown;

  GetChatRoomGroup(e: unknown): unknown;

  GetChatsWithUnreadPriorityMessages(): never[];

  GetChatToActivateForOldestUnread(e: unknown): null;

  GetFilteredChats(e: unknown): unknown;

  /**
   * @param t default: !0
   */
  GetFriendChat(e: unknown, t?: boolean): unknown;

  GetRecentChats(): unknown;

  GetRefCountActiveChatRoomGroup(e: unknown): unknown;

  GetTextFilterSettingsURL(): string;

  GetTextFilterStatus(): unknown;

  IncRefActiveChatRoomGroup(e: unknown, t: unknown): unknown;

  Init(e: unknown, t: unknown): Promise<unknown>;

  InternalSendActiveChatRoomGroupsToServer(): Promise<unknown>;

  JoinAndShowChatRoomGroup(...t: unknown[]): void;

  LeaveChatRoomGroup(e: unknown, t: unknown): unknown;

  LoadMyChatRooms(): void;

  OnChatRoomActivated(e: unknown): void;

  OnGroupAdded(e: unknown): void;

  OnRestorePopupsComplete(): void;

  RegisterForGroupAdded(e: unknown): unknown;

  RegisterVirtualizedMemberListView(e: unknown): void;

  RemoveChatRoomGroup(e: unknown): void;

  RestoreStatePostDisconnect(e: unknown): void;

  SendActiveChatRoomGroupsToServer(): Promise<undefined>;

  SetReadyToRender(): void;

  SortAndMergeChats(e: unknown, t: unknown): never[];

  UnregisterVirtualizedMemberListView(e: unknown): void;

  chat_group_list_ready: boolean;

  ChatRoomBBCodeParser: ChatRoomBBCodeParser;

  ChatRoomEffectSettings: ChatRoomEffectSettings;

  ChatRoomGroupDisplayPrefs: ChatRoomGroupDisplayPrefs;

  ClanChatRooms: unknown[];

  CMInterface: ConnectionManager;

  currentChatRoomGroups: ChatGroup[];

  EmbedStore: EmbedStore;

  EmoticonStore: EmoticonStore;

  FriendChatBBCodeParser: ChatRoomBBCodeParser;

  FriendChatStore: FriendChatStore;

  FriendStore: FriendsUIFriendStore;

  GameInviteStore: GameInviteStore;

  InviteStore: InviteStore;

  m_bReadyToRender: boolean;

  m_bReceivedChatGroupList: boolean;

  m_bSendActiveGroupsQueued: boolean;

  m_bSendingActiveGroups: boolean;

  m_ChatRoomBBCodeParser: ChatRoomBBCodeParser;

  m_ChatRoomEffectSettings: ChatRoomEffectSettings;

  m_ChatRoomGroupDisplayPrefs: ChatRoomGroupDisplayPrefs;

  m_CMInterface: ConnectionManager;

  m_EmbedStore: EmbedStore;

  m_EmoticonStore: EmoticonStore;

  m_fnOnReadyToRender: undefined;

  m_FriendChatBBCodeParser: ChatRoomBBCodeParser;

  m_FriendChatStore: FriendChatStore;

  m_FriendStore: FriendsUIFriendStore;

  m_GameInviteStore: GameInviteStore;

  m_GroupAddedCallbacks: GroupAddedCallbacks;

  m_HiddenRecentChatSettings: HiddenRecentChatSettings;

  m_InviteStore: InviteStore;

  m_mapActiveChatGroupsToRefCount: ObservableMap<unknown, unknown>;

  m_mapChatGroups: ObservableMap<string, ChatGroup>;

  m_mapClanChatsByClanID: Map<unknown, unknown>;

  m_mapVirtualizedMemberListViews: Map<unknown, unknown>;

  m_NotificationBBCodeParser: NotificationBBCodeParser;

  m_TextFilterStore: TextFilterStore;

  m_VoiceChat: VoiceChatStore;

  NotificationBBCodeParser: NotificationBBCodeParser;

  TextFilterStore: TextFilterStore;

  VoiceChat: VoiceChatStore;
}

export interface ChatRoomBBCodeParser {
  dictComponents(): unknown;

  Parse_BuildReactComponents(e: unknown, t: unknown): unknown;

  ParseBBCode(e: unknown, t: unknown): unknown;

  /**
   * This is a class function
   */
  m_accumulatorType: unknown;

  m_dictComponents: DictComponents;
}

export interface ChatRoomEffectSettings {
  balloons: ChatRoomEffect;

  confetti: ChatRoomEffect;

  firework: ChatRoomEffect;

  goldfetti: ChatRoomEffect;

  lny2020_confetti: ChatRoomEffect;

  lny2020_firework: ChatRoomEffect;

  lny2020_lanterns: ChatRoomEffect;

  snow: ChatRoomEffect;

  snowball: ChatRoomEffect;
}

export interface ChatRoomGroupDisplayPrefs {
  FillInChatUsabilityMetrics(e: unknown): void;

  GetChatRoomDisplayPref(e: unknown, t: unknown): unknown;

  Init(e: unknown): void;

  SetChatRoomDisplayPref(e: unknown, t: unknown, r: unknown): void;

  ToggleChatRoomDisplayPref(e: unknown, t: unknown): void;

  WritePrefs(): void;

  m_mapDisplayPrefs: ObservableMap<unknown, unknown>;

  m_SettingsStore: SettingsStore;
}

export interface ChatGroup {
  AddCreatedRoom(e: unknown, t: unknown): unknown;

  AddMetaMentionsToResults(e: unknown, t: unknown): void;

  BCanAdminChannel(): unknown;

  BCanAdminGroup(): unknown;

  BCanBan(): unknown;

  BCanBanMember(e: unknown): unknown;

  BCanChat(): unknown;

  BCanDeleteMemberMessages(e: unknown): unknown;

  BCanEditRoles(): unknown;

  BCanIAssignRole(e: unknown): boolean;

  BCanIAssignRoles(): unknown;

  BCanIAssociateBroadcast(): unknown;

  BCanICreateRoles(): unknown;

  BCanIMentionAll(): unknown;

  BCanIModifyRole(e: unknown): boolean;

  BCanInvite(): unknown;

  BCanIPerformAction(e: unknown): boolean;

  /**
   * @param r default: !1
   */
  BCanIPerformActionOnUser(e: unknown, t: unknown, r?: boolean): unknown;

  BCanKick(): unknown;

  BCanKickMember(e: unknown): unknown;

  BDirectMessagesAllowed(): boolean;

  BDoesRoleAllowAction(e: unknown, t: unknown): boolean;

  BHasEverBeenAcked(): boolean;

  BHasMember(e: unknown): boolean;

  BIsAccountIDOwner(e: unknown): boolean;

  BIsClanChatRoom(): boolean;

  BIsCurrentUserAMember(): boolean;

  BIsMemberListVirtualized(): unknown;

  BIsTempVoiceChannel(e: unknown): unknown;

  BIsUnreadIndicatorMuted(): unknown;

  BIsUserGroupMember(e: unknown): boolean;

  BIsValid(): boolean;

  BIsVoiceChannel(e: unknown): unknown;

  BMemberHasRole(e: unknown, t: unknown): unknown;

  BNameMatchesSearch(e: unknown): boolean;

  BRoomContainsJustTheseFriendsAndSelf(e: unknown): boolean;

  ChangeMemberRank(e: unknown, t: unknown): void;

  ChangeMemberRoles(e: unknown, t: unknown): void;

  CreateAndJoinTempVoiceRoom(): void;

  CreateChatRoom(e: unknown, t: unknown): unknown;

  CreateRole(e: unknown): unknown;

  DefaultRoleID(): unknown;

  DeleteChatRoom(e: unknown): void;

  DeleteInviteLink(e: unknown, t: unknown): unknown;

  DeleteRole(e: unknown): unknown;

  GetAvatarOrAppIconURL(e: unknown): unknown;

  GetBanList(): unknown;

  GetChatRoom(e: unknown): unknown;

  GetChatRoomsWithUnreadPriorityMessages(e: unknown): void;

  GetClanID(): unknown;

  GetDefaultChatID(): unknown;

  GetDefaultChatRoom(): unknown;

  /**
   * @param e default: !1
   */
  GetDesktopNotificationLevel(e?: boolean): unknown;

  GetGroupID(): unknown;

  GetHighestRankRoleIDForPermission(e: unknown, t: unknown): unknown;

  GetInvitedUsersForGroup(): unknown;

  GetInviteLinksForGroup(): unknown;

  GetMember(e: unknown): unknown;

  GetMemberPartyBeacon(e: unknown): unknown;

  GetMemberRank(e: unknown): unknown;

  GetMemberRankIfPresent(e: unknown): unknown;

  GetMemberRankString(e: unknown): unknown;

  GetMemberRankStringUnlocalized(e: unknown): unknown;

  GetMemberRoleIDs(e: unknown): unknown;

  GetMobileNotificationLevel(): unknown;

  GetMyRank(): unknown;

  GetOwnerAccountID(): unknown;

  GetOwnerAppID(): unknown;

  GetRoleActions(e: unknown): unknown;

  GetRoleName(e: unknown): unknown;

  GetRoleOrdinal(e: unknown): unknown;

  GetRoles(): unknown;

  GetRoomWithLastMessageForUser(): unknown;

  InternalGetMembersToHighlight(e: unknown, t: unknown): { members: unknown[]; remaining_count: number; };

  InviteFriend(e: unknown, t: unknown): void;

  IsInRoom(e: unknown): unknown;

  IsNamedGroupChat(): unknown;

  KickUser(e: unknown, t: unknown): unknown;

  LeaveChatRoomGroup(e: unknown): void;

  /**
   * @native
   */
  LOG(): unknown;

  MuteUser(e: unknown, t: unknown): unknown;

  OnActivate(): void;

  OnConnectionRestored(e: unknown): void;

  OnRoomStateChange(e: unknown): void;

  OnUserStateChange(e: unknown, t: unknown): void;

  RemoveRoom(e: unknown): void;

  RenameChatRoomGroup(e: unknown): unknown;

  RenameRole(e: unknown, t: unknown): unknown;

  RenameRoom(e: unknown, t: unknown): void;

  ReorderRole(e: unknown, t: unknown): unknown;

  ReorderRoom(e: unknown, t: unknown): void;

  RevokeInvite(e: unknown): unknown;

  SaveChatRoomGroup(e: unknown): unknown;

  /**
   * @param t default: 5
   * @param r default: !1
   */
  SearchMembers(e: unknown, t?: number, r?: boolean): never[];

  SetChatRoomGroupAvatar(e: unknown): unknown;

  SetChatRoomGroupTagline(e: unknown): unknown;

  SetChatRoomGroupWatchingBroadcast(e: unknown, t: unknown): Promise<void>;

  SetDirectMessagesAllowed(value: boolean): unknown;

  SetInitialGroupState(e: unknown): void;

  SetMemberListVirtualized(e: unknown): void;

  SetMemberRoleState(e: unknown, t: unknown, r: unknown): unknown;

  SetNameCheckingForAppLocalization(e: unknown): void;

  SetNotificationPreferences(e: unknown, t: unknown, r: unknown): unknown;

  SetOwnerAppID(e: unknown): void;

  SetRoleAction(e: unknown, t: unknown, r: unknown): unknown;

  SetUserBanState(e: unknown, t: unknown): unknown;

  ToggleMemberRoleState(e: unknown, t: unknown): unknown;

  UnloadActiveGroupState(): void;

  UnloadAndResetGroupState(): void;

  UnloadGroupState(): void;

  UpdateChatRoomHeaderState(e: unknown): void;

  UpdateChatRoomState(e: unknown, t: unknown): void;

  UpdateGroupState(e: unknown): void;

  UpdateGroupStateFromSummary(e: unknown): void;

  UpdateLastAckTimeFromServer(e: unknown): void;

  UpdateUserState(e: unknown): void;

  avatar_url_full: string;

  avatar_url_medium: string;

  avatar_url_small: string;

  avatarSHA: string;

  avatarUGCURL: string;

  chatRoomList: ChatRoomList[];

  ChatStore: ChatStore;

  hasAvatarSHA: boolean;

  hasIcon: boolean;

  hasUnreadChatMessage: boolean;

  HasUnreadMention: boolean;

  hasVoiceRoom: boolean;

  m_bDirectMessagesAllowed: boolean;

  m_bFullStateLoaded: boolean;

  m_bMemberListVirtualized: boolean;

  m_bUnreadIndicatorMuted: boolean;

  m_chatStore: ChatStore;

  m_cMemberSummaryCount: number;

  m_defaultRoleID: string;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_eUserDesktopNotificationLevel: EUserDesktopNotificationLevel;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_eUserMobileNotificationLevel: EUserMobileNotificationLevel;

  m_groupMembers: GroupMembers;

  m_mapRooms: ObservableMap<string, ChatRoomList>;

  m_rgGroupMembersSummary: number[];

  m_rgPartyBeacons: never;

  m_roleActions: RoleActions[];

  m_roles: Roles[];

  m_rtLastAck: number;

  m_rtTimeJoined: number;

  m_strAvatarSHA: string;

  m_strAvatarUGCURL: string;

  m_strName: string;

  m_strTagLine: string;

  m_strWatchingBroadcastChannelID: string;

  m_ulDefaultChatID: string;

  m_ulGroupID: string;

  m_unAppID: number;

  m_unClanID?: never;

  m_unOwnerAccountID: number;

  m_unWatchingBroadcastAccountID: number;

  memberCountInGame: number;

  memberCountOnline: number;

  memberCountTotal: number;

  memberList: GroupMembers;

  members_to_highlight: Members_to_highlight;

  members_to_highlight_name: Members_to_highlight;

  name: string;

  readyToRender: boolean;

  room_with_last_message?: never;

  tagline: string;

  textRoomList: ChatRoomList[];

  time_last_activity: number;

  timeJoined: number;

  unique_id: string;

  voiceRoomList: never;

  watching_broadcast_channel_id: string;

  watching_broadcast_steamid: (null | SteamID);
}

export interface FriendChatStore {
  AddFriendPushNotificationData(e: unknown, t: unknown): void;

  BIsFriendChatRecent(e: unknown): boolean;

  ClearRecentChatsForFriend(e: unknown): void;

  GetAllChats(): unknown;

  /**
   * @param t default: !0
   */
  GetFriendChat(e: unknown, t?: boolean): unknown;

  GetFriendChatsByLastChatTime(): never[];

  GetFriendChatsWithRecentMessages(): unknown;

  GetFriendLastChatTime(e: unknown): unknown;

  GetFriendsWithUnreadMessages(e: unknown): never[];

  GetServiceTransport(): unknown;

  GetUnfilteredFriendsWithUnreadMessages(): never[];

  GetUnreadFriendMessageCount(e: unknown): number;

  Init(): void;

  LoadFriendMessageSessions(): void;

  OnLogon(): void;

  RestoreStatePostDisconnect(e: unknown): void;

  WriteRecentChatsPrefs(): void;

  GetRecentlyChattingFriends: unknown[];

  LastMessageCache: object;

  m_bReceivedFriendChats: boolean;

  m_ChatStore: ChatStore;

  m_LastMessageCache: object;

  m_mapLastChatTimeByFriend: ObservableMap<number, number>;

  m_mapRecentIgnoreTimeBeforeByFriend: ObservableMap<unknown, unknown>;

  m_rgFriendChats: RgFriendChats[];

  m_rtLastSessionUpdate: number;

  RecentChatCutoffDuration: number;
}

export interface GroupAddedCallbacks {
  ClearAllCallbacks(): void;

  CountRegistered(): unknown;

  Dispatch(...e: unknown[]): void;

  Register(e: unknown): { Unregister: () => void; };

  m_vecCallbacks: never;
}

export interface HiddenRecentChatSettings {
  BHasEverHiddenFriend(): unknown;

  BHasEverHiddenGroup(): unknown;

  BIsFriendHidden(e: unknown, t: unknown): unknown;

  BIsGroupHidden(e: unknown, t: unknown): unknown;

  Init(e: unknown): void;

  InitFromStorage(): Promise<undefined>;

  ParseStoredObject(e: unknown): boolean;

  Save(): unknown;

  SetHiddenTimeForFriend(e: unknown, t: unknown): unknown;

  SetHiddenTimeForGroup(e: unknown, t: unknown): unknown;

  bReady: boolean;

  m_bReady: boolean;

  m_settings: Settings;

  m_storage: object;
}

export interface DictComponents {
  /**
   * This is a class function
   */
  broadcast: unknown;

  /**
   * This is a class function
   */
  broadcastinvite?: unknown;

  /**
   * This is a class function
   */
  broadcastviewrequest?: unknown;

  /**
   * This is a class function
   */
  code: unknown;

  /**
   * This is a class function
   */
  econitem: unknown;

  /**
   * This is a class function
   */
  emoticon: unknown;

  /**
   * This is a class function
   */
  filteredurl: unknown;

  /**
   * This is a class function
   */
  flip: unknown;

  /**
   * This is a class function
   */
  gameinvite?: unknown;

  /**
   * This is a class function
   */
  img: unknown;

  /**
   * This is a class function
   */
  invite?: unknown;

  /**
   * This is a class function
   */
  inviteurl: unknown;

  /**
   * This is a class function
   */
  lobbyinvite?: unknown;

  /**
   * This is a class function
   */
  mention?: unknown;

  /**
   * This is a class function
   */
  oembed: unknown;

  /**
   * This is a class function
   */
  og: unknown;

  /**
   * This is a class function
   */
  plusone: unknown;

  /**
   * This is a class function
   */
  pre: unknown;

  /**
   * This is a class function
   */
  publishedfile: unknown;

  /**
   * This is a class function
   */
  quote: unknown;

  /**
   * This is a class function
   */
  random: unknown;

  /**
   * This is a class function
   */
  roomeffect: unknown;

  /**
   * This is a class function
   */
  spoiler: unknown;

  /**
   * This is a class function
   */
  steamstore: unknown;

  /**
   * This is a class function
   */
  sticker: unknown;

  /**
   * This is a class function
   */
  tradeoffer?: unknown;

  /**
   * This is a class function
   */
  tradeofferlink: unknown;

  /**
   * This is a class function
   */
  tweet: unknown;

  /**
   * This is a class function
   */
  url: unknown;

  /**
   * This is a class function
   */
  video: unknown;

  /**
   * This is a class function
   */
  youtube: unknown;
}

export interface ChatRoomEffect {
  render(e: unknown): unknown;

  renderButton(): unknown;

  renderEffectIcon(): unknown;

  buttonToken: string;

  locToken: string;

  timeout: number;
}

export interface ChatRoomListBase {
  AckChatMsg(e: unknown): void;

  AckChatMsgOnServer(e: unknown): void;

  AddChatView(e: unknown): void;

  AddLocalMsg(e: unknown, t: unknown, r: unknown): void;

  AddMessagesToHistory(e: unknown, t: unknown): void;

  AddNewChatMsgAndNotify(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown, a: unknown): void;

  AddNewServerMsg(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown, s: unknown, o: unknown): void;

  AddRoomEffectIfNeeded(e: unknown): void;

  AddSessionNotice(e: unknown): void;

  AddVoiceChannelInviteMsg(e: unknown, t: unknown, r: unknown): void;

  AppendChatMsg(e: unknown, t: unknown, r: unknown, n: unknown): unknown;

  AppendLocalEchoChatMsg(e: unknown): unknown;

  /**
   * @native
   */
  BASELOG(): unknown;

  BHasSessionNotice(e: unknown): unknown;

  BIsVoiceAllowed(): boolean;

  BShouldSilentlyAddMessage(e: unknown): boolean;

  BShouldTrackUnreadMessages(): boolean;

  BVoiceActive(): unknown;

  CheckShouldNotify(e: unknown, t: unknown, r: unknown): void;

  DecorateNotification(e: unknown, t: unknown, r: unknown, n: unknown): unknown;

  GetBBCodeParser(): unknown;

  GetBeginFileUploadURL(): string;

  GetCommitFileUploadURL(): string;

  GetLastMessage(): unknown;

  GetMaxFileSizeMB(): number;

  GetMember(e: unknown): unknown;

  GetMessageReactionReactors(e: unknown, t: unknown, r: unknown): never[];

  GetMessagesFromResponse(e: unknown): never[];

  GetMessagesFromTimeRange(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown): unknown;

  GetMostRecentChatMsg(): unknown;

  GetVisibilityState(e: unknown): number;

  GetVoiceNotAllowedReason(): unknown;

  HasChatMessage(e: unknown, t: unknown): boolean;

  HasClientMessageInFlight(e: unknown): unknown;

  InitMessageSessionFromServer(e: unknown, t: unknown, r: unknown): void;

  InitQueuedMessages(): void;

  InternalAppendChatMsg(e: unknown): void;

  /**
   * @param e default: !1
   */
  InternalLoadChatLogs(e?: boolean): unknown;

  IsMoreHistoryAvailable(): unknown;

  LoadChatLogs(): Promise<unknown>;

  LoadMoreHistory(): unknown;

  LogFileUploadMessage(e: unknown): void;

  MergeChatHistoryChunk(e: unknown): void;

  MergeLocalMessages(e: unknown): void;

  MsgLoadedFromHistory(e: unknown): void;

  OnActivate(): void;

  OnConnectionRestored(): void;

  OnDeactivate(): void;

  OnNewChatMsgAdded(e: unknown, t: unknown, r: unknown, n: unknown): void;

  OnReceivedNewMessage(e: unknown, t: unknown, r: unknown, n: unknown): void;

  OnTyping(): void;

  OnUserChatEcho(e: unknown, t: unknown, r: unknown, n: unknown): void;

  PopulateCommitFileUploadFormData(e: unknown, t: unknown, r: unknown): void;

  RemoveChatView(e: unknown): void;

  RemoveMessage(e: unknown): void;

  RemoveSessionNotice(e: unknown): void;

  ResetPrepended(): void;

  RetryFailedMessage(e: unknown): void;

  RoomEffectManager(): unknown;

  SendChatMessage(e: unknown): Promise<void>;

  SendChatMessageInternal(e: unknown): Promise<unknown>;

  SendWithRetries(e: unknown, t: unknown): Promise<unknown>;

  SetupAppCustomServerMsg(e: unknown): Promise<string>;

  ToggleVoiceChat(): boolean;

  TrimLogsIfPossible(): void;

  UnloadActiveChatState(): void;

  UnloadChatState(): void;

  UpdateChatMessageDeletedState(e: unknown, t: unknown): void;

  UpdateLastAckTimeFromServer(e: unknown): void;

  UpdateMessageReaction(e: unknown, t: unknown, r: unknown, n: unknown): Promise<unknown>;

  accountid_last_message?: undefined;

  BIsPrepend: boolean;

  chat_message_blocks: Chat_message_blocks;

  chat_messages: never;

  ChatStore: ChatStore;

  first_unread_msg_time: number;

  has_unread_priority_messages: boolean;

  is_friend_typing: boolean;

  last_voice_participation_time: number;

  m_accountIDLastMessage?: undefined;

  m_bChatLogsLoaded: boolean;

  m_bHasUnreadPriorityChatMessages: boolean;

  m_bMoreAvailable: boolean;

  m_bPrepended: boolean;

  m_bReceivedChatLogs: boolean;

  m_ChatMessageBlockList: Chat_message_blocks;

  m_chatRoomEffects: ChatRoomEffects;

  m_ChatStore: ChatStore;

  m_CMInterface: ConnectionManager;

  m_cUnreadChatMessages: number;

  m_FriendStore: FriendsUIFriendStore;

  m_MessageSendQueue: MessageSendQueue;

  m_msTimeActivated: number;

  m_nLoadingHistoryInProgressCount: number;

  m_oldestMessageOrdinal?: undefined;

  m_oldestMessageTime?: undefined;

  m_rgChatMessages: never;

  m_rgChatViews: never;

  m_rtFirstUnread: number;

  m_rtFirstUnreadChatMsg: number;

  m_rtLastAckedChatMsg: number;

  m_rtLastMessageReceived?: number;

  m_rtLastServerAckedChatMsg: number;

  m_rtLastServerMessageReceived: number;

  m_setInflightClientMessageID: never;

  m_setSessionNotices: never;

  m_strLastMessage?: undefined;

  name: string;

  self: SteamFriend;

  time_last_ack: number;

  time_last_message?: number;

  unique_id: string;

  unread_message_count: number;

  VoiceChatStore: VoiceChatStore;
}

export interface ChatRoomList extends ChatRoomListBase {
  BCanDeleteMemberMessages(e: unknown): unknown;

  BHasAckedChatMsg(): unknown;

  BIsDefaultRoom(): unknown;

  BIsUnreadIndicatorMuted(): unknown;

  ChangeNameWhileWaitingForRenameRequest(e: unknown): void;

  CreateInviteLink(e: unknown): void;

  DeleteChatMessages(e: unknown): Promise<unknown>;

  GetChatRoomGroup(): unknown;

  GetDesktopNotificationLevel(): unknown;

  GetDesktopNotificationLevelSetting(): unknown;

  GetGroup(): unknown;

  GetMessageReactionKey(e: unknown, t: unknown): string;

  GetMobileNotificationLevel(): unknown;

  GetMobileNotificationLevelsetting(): unknown;

  GetParentGroupID(): unknown;

  GetPlatformNotificationLevel(): unknown;

  GetRoomID(): unknown;

  GetSortOrder(): unknown;

  GetVoiceAllowed(): unknown;

  IsDefaultRoomForGroup(): unknown;

  IsTempVoiceRoom(): boolean;

  IsUnsavedVoiceChannel(): boolean;

  LoadMessageReactionReactors(e: unknown, t: unknown, r: unknown): Promise<unknown>;

  /**
   * @native
   */
  LOG(): unknown;

  PlayAtMentionSound(): void;

  PlayChatRoomNotificationSound(): void;

  RegisterOnNewChatMsgAdded(e: unknown): unknown;

  SetNotificationPreferences(e: unknown, t: unknown, r: unknown): unknown;

  StartVoiceChat(): void;

  UpdateChatState(e: unknown): void;

  UpdateMessageReactionReactors(e: unknown, t: unknown, r: unknown, n: unknown): void;

  UpdateUserState(e: unknown): void;

  has_any_unread_messages: boolean;

  has_unread_mention: boolean;

  has_unread_messages: boolean;

  lastChatLinkInfo?: (LastChatLinkInfo | null);

  m_bIsDefaultForGroup: boolean;

  m_bUnreadIndicatorMuted: boolean;

  m_bVoiceAllowed: boolean;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_eDesktopNotificationLevel: EDesktopNotificationLevel;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_eMobileNotificationLevel: EMobileNotificationLevel;

  m_group: ChatGroup;

  m_groupVoiceActiveMembers: GroupVoiceActiveMembers;

  m_lastChatLink?: (LastChatLinkInfo | null);

  m_mapMessageReactionReactors: never;

  m_NewChatMsgAddedCallbacks: GroupAddedCallbacks;

  m_rtLastMention: number;

  m_strName: string;

  m_ulChatID: string;

  m_ulGroupID: string;

  m_unSortOrder: number;

  time_last_activity: number;

  time_last_mention: number;

  voice_active_contains_friends: boolean;

  voice_active_contains_only_self: boolean;

  voice_active_contains_self: boolean;

  voice_active_member_list: GroupVoiceActiveMembers;
}

export interface GroupMembers {
  /**
   * @param t default: void 0
   */
  AddMember(e: unknown, t?: undefined): void;

  Clear(): void;

  GetCurrentMemberSet(): Set<unknown>;

  GetExtra(e: unknown): unknown;

  HasMember(e: unknown): unknown;

  RemoveMember(e: unknown): void;

  SetMemberDataVirtualized(e: unknown): void;

  m_bMemberDataVirtualized: boolean;

  m_mapAccountToExtra: ObservableMap<number, MapAccountToExtra>;

  member_counts: Member_counts;

  member_list: SteamFriend[];

  member_list_unsorted: SteamFriend[];

  unfiltered_count: number;
}

export interface RoleActions {
  BCanPerformAction(e: unknown): unknown;

  SetCanPerformAction(e: unknown, t: unknown): void;

  m_roleActions: ProtobufInterface<CChatRoleActions>;

  role_id: string;

  roleActions: ProtobufInterface<CChatRoleActions>;
}

export interface Members_to_highlight {
  members: SteamFriend[];

  remaining_count: number;
}

export interface RgFriendChats extends ChatRoomListBase {
  ClearFriendIsTypingState(): void;

  GetShowNonFriendWarning(): unknown;

  OnFriendTypingNotification(): void;

  PlayFriendMessageSound(): void;

  SetShowNonFriendWarning(e: unknown): void;

  ViewerNeedsApproval(e: unknown): void;

  accountid_partner: number;

  chat_partner: SteamFriend;

  is_blocked_friend: boolean;

  m_bFriendIsTyping: boolean;

  m_bNeedsNonFriendWarning: boolean;

  m_iClearFriendIsTypingInterval?: undefined;

  m_tsLastSentTypingNotification?: undefined;

  m_unAccountIDFriend: number;
}

export interface Settings {
  friends: object;

  groups: object;
}

export interface Chat_message_blocks {
  AppendMessage(e: unknown): void;

  AppendNewMessage(e: unknown): void;

  BuildMessageBlocks(e: unknown): void;

  Clear(): void;

  RemoveLocalMessage(e: unknown): boolean;

  RemoveOldestMessages(e: unknown): null;

  m_iIndexLastTimePassesGap?: never;

  m_rgMessageBlocks: RgMessageBlocks[];

  message_blocks: RgMessageBlocks[];

  time_passes_index?: never;
}

export interface ChatRoomEffects {
  ActivateRoomEffect(e: unknown): void;

  AddRoomEffect(e: unknown): void;

  BIsQueueFull(e: unknown): boolean;

  QueueRoomEffect(e: unknown): void;

  UpdateRunningRoomEffects(): void;

  m_effectSettings: ChatRoomEffectSettings;

  m_mapRoomEffectQueue: MapRoomEffectQueue;

  m_rgRunningEffects: never;
}

export interface GroupVoiceActiveMembers {
  AddMember(e: unknown): void;

  Clear(): void;

  GetCurrentMemberSet(): unknown;

  HasMember(e: unknown): unknown;

  /**
   * @native
   */
  m_OnHeaderClick(): unknown;

  /**
   * @native
   */
  onheaderclick(): unknown;

  RemoveMember(e: unknown): void;

  SetOnHeaderClick(e: unknown): void;

  collapsed: boolean;

  display_type: number;

  GetRawMemberList: never;

  icon_url: string;

  m_bCollapsed: boolean;

  m_eDisplayType: FriendDisplayType;

  m_rgAccountIDMembers: never;

  m_setMembers: never;

  m_strName: string;

  member_accountid_list: never;

  member_count: number;

  member_counts: Member_counts;

  member_list: never;

  member_list_unsorted: never;

  name: string;

  unfiltered_count: number;
}

export interface MessageSendQueue {
  Add(e: unknown): unknown;

  GetItemID(e: unknown): string;

  GetItemIndex(e: unknown): unknown;

  InitFromStorage(): Promise<void>;

  RemoveItem(e: unknown): void;

  SetItemFailed(e: unknown, t: unknown): void;

  UpdateStoredQueue(): void;

  m_id: string;

  m_queue: never;

  queued_messages: never;
}

export interface MapAccountToExtra {
  BHasRole(e: unknown): boolean;

  m_rank: number;

  m_role_ids: unknown[];
}

export interface Member_counts {
  ingame: number;

  online: number;
}

export interface RgMessageBlocks {
  AppendMessage(e: unknown): void;

  BCanAccumulateMessage(e: unknown): boolean;

  BIsInvite(): unknown;

  BIsLocalMsg(): boolean;

  BIsServerMsg(): unknown;

  /**
   * @ignore
   */
  CreateVirtualSplitOnTimestamp(e: unknown): unknown[];

  GetRTimeFirstMessage(): unknown;

  GetRTimeLastMessage(): unknown;

  GetRTimeMidnightBeforeBlock(): unknown;

  GetRTimeMidnightBeforeNextBlock(): unknown;

  RemoveLocalMessage(e: unknown): boolean;

  SetNextBlock(e: unknown): void;

  UniqueKey(): unknown;

  is_last_block: boolean;

  m_bMessageBlockIsOnlyEmotes: boolean;

  m_nextBlock?: never;

  m_rgMessages: never;

  m_rtMidnightBeforeBlock?: never;

  messages: never;
}

export interface MapRoomEffectQueue {
  confetti_snow: never;

  default: never;

  festive: never;

  snowball: never;
}

/** @generated */
export enum EUserDesktopNotificationLevel {
  EUserDesktopNotificationLevel0 = 0,
  EUserDesktopNotificationLevel1 = 1,
}

/** @generated */
export enum EUserMobileNotificationLevel {
  EUserMobileNotificationLevel0 = 0,
  EUserMobileNotificationLevel1 = 1,
}

/** @generated */
export enum EDesktopNotificationLevel {
  EDesktopNotificationLevel0 = 0,
  EDesktopNotificationLevel1 = 1,
}

/** @generated */
export enum EMobileNotificationLevel {
  EMobileNotificationLevel0 = 0,
  EMobileNotificationLevel1 = 1,
}

export interface Roles {
  name: string;

  ordinal: number;

  role_id: string;
}

export interface LastChatLinkInfo {
  rtExpires: number;

  strInviteURL: string;
}
