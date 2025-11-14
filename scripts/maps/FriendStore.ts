/* eslint-disable @stylistic/quotes */
import { GMap, InterfaceMap } from '.';

export const FriendStoreMaps: InterfaceMap[] = [
  GMap('stores/FriendStore/FriendStore', 'FriendStore', /* ts */`window.friendStore`, { ignoredProperties: ['m_ChatStore'] }),

  GMap('stores/FriendStore/ChatStore/ChatStore', 'ChatStore', /* ts */`friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore`, { ignoredProperties: ['FriendStore', 'm_FriendStore', 'm_mapDismissedInvites', 'm_VoiceChat', 'VoiceChat', 'VoiceChatStore', 'm_TextFilterStore', 'TextFilterStore'] }),
  GMap('stores/FriendStore/ChatStore/VoiceChatStore', 'VoiceChatStore', /* ts */`window.friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore.VoiceChat`, { ignoredProperties: ['m_SettingsStore'] }),

  GMap('stores/FriendStore/ChatStore/SettingsStore', 'SettingsStore', /* ts */`window.friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore.ChatRoomGroupDisplayPrefs.m_SettingsStore`),
  GMap('stores/FriendStore/ChatStore/SettingsStore', 'SettingsStore', /* ts */`window.friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore.VoiceChat.m_Settings.m_SettingsStore`),
];
