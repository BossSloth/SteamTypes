/**
 * Represents friend settings and configuration.
 */
export interface FriendSettings {
  /**
   * Retrieves a list of enabled friend settings features.
   * @returns A Promise that resolves to an array of enabled friend settings features.
   */
  GetEnabledFeatures(): Promise<FriendSettingsFeatureObject[]>;

  /**
   * Registers a callback function to be notified of friend settings changes.
   * @param callback The callback function to be called when friend settings change.
   * @remarks The callback receives a JSON object string which may be parsed into {@link FriendSettingsChange}.
   */
  RegisterForSettingsChanges(callback: (settings: string) => void): void;

  /**
   * @param details String received from {@link FriendSettings.RegisterForSettingsChanges}.
   */
  SetFriendSettings(details: string): void;
}

/** 0 - false, 1 - true */
type VDFBoolean = 0 | 1;

export enum EChatFlashMode {
  Always,
  Minimized,
  Never,
}

export interface FriendSettingsFeatureObject {
  bEnabled: boolean;
  feature: FriendSettingsFeature;
}

export type FriendSettingsFeature =
  | 'DoNotDisturb'
  | 'FriendsFilter'
  | 'LoaderWindowSynchronization'
  | 'NewVoiceHotKeyState'
  | 'NonFriendMessageHandling'
  | 'PersonaNotifications'
  | 'ServerVirtualizedMemberLists'
  | 'SteamworksChatAPI';

export type FriendSettingsEnabledFeatures<T> = Record<FriendSettingsFeature, T>;

export interface FriendSettingsChange {
  b24HourClock: VDFBoolean;
  bAlwaysNewChatWindow: VDFBoolean;
  bAnimatedAvatars: VDFBoolean;
  bCategorizeInGameFriendsByGame: VDFBoolean;
  bCompactFriendsList: VDFBoolean;
  bCompactQuickAccess: VDFBoolean;
  bDisableEmbedInlining: VDFBoolean;
  bDisableRoomEffects: VDFBoolean;
  bDisableSpellcheck: VDFBoolean;
  bDoNotDisturbMode: VDFBoolean;
  bForceAlphabeticFriendSorting: VDFBoolean;
  bHideCategorizedFriends: VDFBoolean;
  bHideOfflineFriendsInTagGroups: VDFBoolean;
  bNotifications_EventsAndAnnouncements: VDFBoolean;
  bNotifications_ShowChatRoomNotification: VDFBoolean;
  bNotifications_ShowIngame: VDFBoolean;
  bNotifications_ShowMessage: VDFBoolean;
  bNotifications_ShowOnline: VDFBoolean;
  bRememberOpenChats: VDFBoolean;
  bSignIntoFriends: VDFBoolean;
  bSounds_EventsAndAnnouncements: VDFBoolean;
  bSounds_PlayChatRoomNotification: VDFBoolean;
  bSounds_PlayIngame: VDFBoolean;
  bSounds_PlayMessage: VDFBoolean;
  bSounds_PlayOnline: VDFBoolean;
  featuresEnabled: FriendSettingsEnabledFeatures<VDFBoolean>;
  nChatFlashMode: EChatFlashMode;
  nChatFontSize: number;
}
