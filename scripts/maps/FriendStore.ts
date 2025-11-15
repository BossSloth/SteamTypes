/* eslint-disable @stylistic/quotes */
import { GMap, InterfaceMap } from '.';

export const FriendStoreMaps: InterfaceMap[] = [
  GMap('stores/FriendStore/FriendStore', 'FriendStore', /* ts */`window.friendStore`, { ignoredProperties: ['m_ChatStore'] }),

  GMap('stores/FriendStore/ChatStore/ChatStore', 'ChatStore', /* ts */`friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore`, { ignoredProperties: ['FriendStore', 'm_FriendStore', 'm_mapDismissedInvites', 'm_VoiceChat', 'VoiceChat', 'VoiceChatStore', 'm_TextFilterStore', 'TextFilterStore'] }),
  GMap('stores/FriendStore/ChatStore/VoiceChatStore', 'VoiceChatStore', /* ts */`window.friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore.VoiceChat`, { ignoredProperties: ['m_SettingsStore'] }),
  GMap('stores/FriendStore/ChatStore/EmoticonStore', 'EmoticonStore', /* ts */`window.friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore.EmoticonStore`),
  GMap('stores/FriendStore/ChatStore/EmbedStore', 'EmbedStore', /* ts */`window.friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore.EmbedStore`),
  GMap('stores/FriendStore/ChatStore/GameInviteStore', 'GameInviteStore', /* ts */`window.friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore.GameInviteStore`, { ignoredProperties: ['m_mapDismissedInvites'] }),
  GMap('stores/FriendStore/ChatStore/InviteStore', 'InviteStore', /* ts */`window.friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore.InviteStore`, { ignoredProperties: ['m_ChatStore'] }),
  GMap('stores/FriendStore/ChatStore/NotificationBBCodeParser', 'NotificationBBCodeParser', /* ts */`window.friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore.NotificationBBCodeParser`),

  GMap('stores/FriendStore/ChatStore/SettingsStore', 'SettingsStore', /* ts */`window.friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore.ChatRoomGroupDisplayPrefs.m_SettingsStore`),
  GMap('stores/FriendStore/ChatStore/SettingsStore', 'SettingsStore', /* ts */`window.friendStore.m_FriendsUIFriendStore.FavoritesStore.m_ChatStore.VoiceChat.m_Settings.m_SettingsStore`),
];
