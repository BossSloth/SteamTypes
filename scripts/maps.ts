interface Map {
  /** Path to the file relative to src/types */
  file: string;
  /** The SharedJs object so like `SteamClient.Apps` */
  object: string;
  /** Name of the interface in the source file */
  srcName: string;
}

export const interfaceMaps: Map[] = [
  // { object: 'SteamClient.Apps', file: 'SteamClient/Apps', srcName: 'Apps' }, //TODO: Apps doesn't work it crashes on some comment lines
  { file: 'SteamClient/Auth', object: 'SteamClient.Auth', srcName: 'Auth' },
  { file: 'SteamClient/Auth', object: 'await SteamClient.Auth.GetRefreshInfo()', srcName: 'AuthRefreshInfo' },
  { file: 'SteamClient/Broadcast', object: 'SteamClient.Broadcast', srcName: 'Broadcast' },
  { file: 'SteamClient/Browser', object: 'SteamClient.Browser', srcName: 'Browser' },
  { file: 'SteamClient/ClientNotifications', object: 'SteamClient.ClientNotifications', srcName: 'ClientNotifications' },
  { file: 'SteamClient/Cloud', object: 'SteamClient.Cloud', srcName: 'Cloud' },
  { file: 'SteamClient/CommunityItems', object: 'SteamClient.CommunityItems', srcName: 'CommunityItems' },
  { file: 'SteamClient/Console', object: 'SteamClient.Console', srcName: 'Console' },
  { file: 'SteamClient/Customization', object: 'SteamClient.Customization', srcName: 'Customization' },
  { file: 'SteamClient/Downloads', object: 'SteamClient.Downloads', srcName: 'Downloads' },
  { file: 'SteamClient/FamilySharing', object: 'SteamClient.FamilySharing', srcName: 'FamilySharing' },
  { file: 'SteamClient/Friends', object: 'SteamClient.Friends', srcName: 'Friends' },
  { file: 'SteamClient/FriendSettings', object: 'SteamClient.FriendSettings', srcName: 'FriendSettings' },
  { file: 'SteamClient/GameNotes', object: 'SteamClient.GameNotes', srcName: 'GameNotes' },
  { file: 'SteamClient/GameRecording', object: 'SteamClient.GameRecording', srcName: 'GameRecording' },
  { file: 'SteamClient/GameSessions', object: 'SteamClient.GameSessions', srcName: 'GameSessions' },
  { file: 'SteamClient/index', object: 'SteamClient', srcName: 'SteamClient' },
  // { file: 'SteamClient/Input', object: 'SteamClient.Input', srcName: 'Input' }, // TODO: problem
  { file: 'SteamClient/InstallFolder', object: 'SteamClient.InstallFolder', srcName: 'InstallFolder' },
  { file: 'SteamClient/Installs', object: 'SteamClient.Installs', srcName: 'Installs' },
  { file: 'SteamClient/Internal', object: 'SteamClient._internal', srcName: 'Internal' },
  { file: 'SteamClient/Messaging', object: 'SteamClient.Messaging', srcName: 'Messaging' },
  { file: 'SteamClient/Music', object: 'SteamClient.Music', srcName: 'Music' },
  // { file: 'SteamClient/Notifications', object: 'SteamClient.Notifications', srcName: 'Notifications' }, // TODO: problem
  { file: 'SteamClient/OpenVR', object: 'SteamClient.OpenVR', srcName: 'OpenVR' },
  // { file: 'SteamClient/Overlay', object: 'SteamClient.Overlay', srcName: 'Overlay' },
  // { file: 'SteamClient/Parental', object: 'SteamClient.Parental', srcName: 'Parental' },
  // { file: 'SteamClient/RemotePlay', object: 'SteamClient.RemotePlay', srcName: 'RemotePlay' },
  // { file: 'SteamClient/Screenshots', object: 'SteamClient.Screenshots', srcName: 'Screenshots' },
  // { file: 'SteamClient/ServerBrowser', object: 'SteamClient.ServerBrowser', srcName: 'ServerBrowser' },
  // { file: 'SteamClient/Settings', object: 'SteamClient.Settings', srcName: 'Settings' },
  // { file: 'SteamClient/SharedConnection', object: 'SteamClient.SharedConnection', srcName: 'SharedConnection' },
  // { file: 'SteamClient/Stats', object: 'SteamClient.Stats', srcName: 'Stats' },
  // { file: 'SteamClient/SteamChina', object: 'SteamClient.SteamChina', srcName: 'SteamChina' },
  // { file: 'SteamClient/Storage', object: 'SteamClient.Storage', srcName: 'Storage' },
  // { file: 'SteamClient/Streaming', object: 'SteamClient.Streaming', srcName: 'Streaming' },
  // { file: 'SteamClient/UI', object: 'SteamClient.UI', srcName: 'UI' },
  // { file: 'SteamClient/Updates', object: 'SteamClient.Updates', srcName: 'Updates' },
  // { file: 'SteamClient/URL', object: 'SteamClient.URL', srcName: 'URL' },
  { file: 'SteamClient/User', object: 'SteamClient.User', srcName: 'User' },
  { file: 'SteamClient/WebChat', object: 'SteamClient.WebChat', srcName: 'WebChat' },
  { file: 'SteamClient/WebUITransport', object: 'SteamClient.WebUITransport', srcName: 'WebUITransport' },
  { file: 'SteamClient/Window', object: 'SteamClient.Window', srcName: 'Window' },
  { file: 'Global/App', object: 'window.App', srcName: 'App' },
  { file: 'Global/ConnectionManager', object: 'window.App.cm', srcName: 'ConnectionManager' },
  { file: 'Global/ConnectionManager', object: 'window.appAchievementProgressCache.CMInterface', srcName: 'ConnectionManager' },
];
