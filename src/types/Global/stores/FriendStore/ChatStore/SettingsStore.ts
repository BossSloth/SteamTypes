import { ConnectionManager } from 'Global/managers/ConnectionManager';
import { CStore_GetStorePreferences_Response } from 'Protobufs/steam/steammessages_store.steamclient';
import { ProtobufInterface } from 'shared/protobuf';

export interface SettingsStore {
  BackfillSingleWindowMode(e: unknown): void;

  BAlwaysShowChatsInNewWindow(): unknown;

  BClientHasFeatureOrOnWeb(e: unknown): unknown;

  BFlagExistsInLocalStorage(e: unknown): unknown;

  BForceAlphabeticFriendSorting(): unknown;

  BReady(): unknown;

  BSingleWindowModeEnabled(): boolean;

  BUpdateFriendsSettings(e: unknown): boolean;

  CommunityPreferencesToMessage(e: unknown): unknown;

  FillInChatUsabilityMetrics(e: unknown): void;

  GetAccountSpecificLocalStorageKey(e: unknown): string | null;

  GetFlagFromLocalStorage(e: unknown): unknown;

  GetFlagFromLocalStorageWhenReady(e: unknown): Promise<unknown>;

  GetObjectFromLocalStorage(e: unknown, t: unknown): unknown;

  GetObjectFromLocalStorageWhenReady(e: unknown, t: unknown): Promise<unknown>;

  Init(e: unknown): void;

  IsSteamInTournamentMode(): unknown;

  LoadCommunityPreferences(): void;

  OnFriendSettingsChanged(e: unknown): void;

  RunOnReady(e: unknown): void;

  SetCommunityPreferences(e: unknown): void;

  SetFlagInLocalStorage(e: unknown, t: unknown): boolean;

  SetReady(): void;

  SetSingleWindowMode(e: unknown): void;

  StoreObjectInLocalStorage(e: unknown, t: unknown): boolean;

  UpdateCommunityPreferences(e: unknown): void;

  UploadCommunityPreferences(): void;

  WhenReady(): Promise<unknown>;

  CommunityPreferences: CommunityPreferences;

  FriendsSettings: FriendsSettings;

  m_bFriendSettingsReady: boolean;

  m_bReady: boolean;

  m_bSteamIsInTournamentMode: boolean;

  m_cLoadCommunityPrefsFailures: number;

  m_CM: ConnectionManager;

  m_CommunityPreferences: CommunityPreferences;

  m_FriendsSettings: FriendsSettings;

  m_iFriendSettingsStore: IFriendSettingsStore;

  m_rgOnReadyCallbacks: unknown[];

  m_ServerCommunityPreferences: CommunityPreferences;

  m_Storage: object;

  m_StorePreferences: ProtobufInterface<CStore_GetStorePreferences_Response>;

  m_unTimerLoadCommunityPrefs: undefined;

  m_unTimerUploadCommunityPreferences: undefined;

  StorePreferences: ProtobufInterface<CStore_GetStorePreferences_Response>;
}

export interface CommunityPreferences {
  bParenthesizeNicknames: boolean;

  bTextFilterIgnoreFriends: boolean;

  content_descriptor_preferences: Content_descriptor_preferences;

  eTextFilterSetting?: never;
}

export interface FriendsSettings {
  b24HourClock: boolean;

  bAlwaysNewChatWindow: boolean;

  bAnimatedAvatars: boolean;

  bCategorizeInGameFriendsByGame: boolean;

  bCompactFriendsList: boolean;

  bCompactQuickAccess: boolean;

  bDisableEmbedInlining: boolean;

  bDisableRoomEffects: boolean;

  bDisableSpellcheck: boolean;

  bDoNotDisturbMode: boolean;

  bForceAlphabeticFriendSorting: boolean;

  bHideCategorizedFriends: boolean;

  bHideOfflineFriendsInTagGroups: boolean;

  bNotifications_EventsAndAnnouncements: boolean;

  bNotifications_ShowChatRoomNotification: boolean;

  bNotifications_ShowIngame: boolean;

  bNotifications_ShowMessage: boolean;

  bNotifications_ShowOnline: boolean;

  bRememberOpenChats: boolean;

  bSignIntoFriends: boolean;

  bSounds_EventsAndAnnouncements: boolean;

  bSounds_PlayChatRoomNotification: boolean;

  bSounds_PlayIngame: boolean;

  bSounds_PlayMessage: boolean;

  bSounds_PlayOnline: boolean;

  featuresEnabled: FeaturesEnabled;

  nChatFlashMode: number;

  nChatFontSize: number;
}

export interface IFriendSettingsStore {
  BUpdateSettings(e: unknown): boolean;

  InternalInit(): void;

  /**
   * @native
   */
  m_fnFriendSettingsChanged(): unknown;

  OnClientSettingsChange(e: unknown): undefined;

  m_bClientInitComplete: boolean;

  m_SettingsStore: SettingsStore;
}

export interface Content_descriptor_preferences {
  content_descriptors_to_exclude: unknown[];
}

export interface FeaturesEnabled {
  DoNotDisturb: number;

  FriendsFilter: number;

  LoaderWindowSynchronization: number;

  NewVoiceHotKeyState: number;

  NonFriendMessageHandling: number;

  PersonaNotifications: number;

  ServerVirtualizedMemberLists: number;

  SteamworksChatAPI: number;
}
