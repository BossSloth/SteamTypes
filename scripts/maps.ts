export interface InterfaceMap {
  condition?(): boolean;
  /** Path to the file relative to src/types */
  file: string;
  /** The SharedJs object so like `SteamClient.Apps` */
  object: string;
  /** Name of the interface in the source file */
  srcName: string;

  /** The function to call before we start processing the interface */
  initFunction?: string;
}

export const interfaceMaps: InterfaceMap[] = [
  // #region SteamClient
  { file: 'SteamClient/Apps', object: 'SteamClient.Apps', srcName: 'Apps' },
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
  { file: 'SteamClient/Input', object: 'SteamClient.Input', srcName: 'Input' },
  { file: 'SteamClient/InstallFolder', object: 'SteamClient.InstallFolder', srcName: 'InstallFolder' },
  { file: 'SteamClient/Installs', object: 'SteamClient.Installs', srcName: 'Installs' },
  { file: 'SteamClient/Internal', object: 'SteamClient._internal', srcName: 'Internal' },
  { file: 'SteamClient/Messaging', object: 'SteamClient.Messaging', srcName: 'Messaging' },
  { file: 'SteamClient/Music', object: 'SteamClient.Music', srcName: 'Music' },
  { file: 'SteamClient/Notifications', object: 'SteamClient.Notifications', srcName: 'Notifications' },
  { file: 'SteamClient/OpenVR', object: 'SteamClient.OpenVR', srcName: 'OpenVR' },
  { file: 'SteamClient/Overlay', object: 'SteamClient.Overlay', srcName: 'Overlay' },
  { file: 'SteamClient/Parental', object: 'SteamClient.Parental', srcName: 'Parental' },
  { file: 'SteamClient/RemotePlay', object: 'SteamClient.RemotePlay', srcName: 'RemotePlay' },
  { file: 'SteamClient/Screenshots', object: 'SteamClient.Screenshots', srcName: 'Screenshots' },
  { file: 'SteamClient/ServerBrowser', object: 'SteamClient.ServerBrowser', srcName: 'ServerBrowser' },
  { file: 'SteamClient/Settings', object: 'SteamClient.Settings', srcName: 'Settings' },
  { file: 'SteamClient/SharedConnection', object: 'SteamClient.SharedConnection', srcName: 'SharedConnection' },
  { file: 'SteamClient/Stats', object: 'SteamClient.Stats', srcName: 'Stats' },
  { file: 'SteamClient/SteamChina', object: 'SteamClient.SteamChina', srcName: 'SteamChina' },
  { file: 'SteamClient/Storage', object: 'SteamClient.Storage', srcName: 'Storage' },
  { file: 'SteamClient/Streaming', object: 'SteamClient.Streaming', srcName: 'Streaming' },
  { file: 'SteamClient/UI', object: 'SteamClient.UI', srcName: 'UI' },
  { file: 'SteamClient/Updates', object: 'SteamClient.Updates', srcName: 'Updates' },
  { file: 'SteamClient/URL', object: 'SteamClient.URL', srcName: 'URL' },
  { file: 'SteamClient/User', object: 'SteamClient.User', srcName: 'User' },
  { file: 'SteamClient/WebChat', object: 'SteamClient.WebChat', srcName: 'WebChat' },
  { file: 'SteamClient/WebUITransport', object: 'SteamClient.WebUITransport', srcName: 'WebUITransport' },
  { file: 'SteamClient/Window', object: 'SteamClient.Window', srcName: 'Window' },
  { file: 'SteamClient/BrowserView/index', object: 'SteamClient.BrowserView', srcName: 'BrowserView' },
  { file: 'SteamClient/BrowserView/BrowserViewPopup', object: 'SteamClient.BrowserView.Create()', srcName: 'BrowserViewPopup' },
  { file: 'SteamClient/System/index', object: 'SteamClient.System', srcName: 'System' },
  { file: 'SteamClient/System/index', object: 'await SteamClient.System.GetSystemInfo()', srcName: 'SystemInfo' },
  { file: 'SteamClient/System/Devkit', object: 'SteamClient.System.Devkit', srcName: 'Devkit' },
  { file: 'SteamClient/System/Display', object: 'SteamClient.System.Display', srcName: 'Display' },
  { file: 'SteamClient/System/Report', object: 'SteamClient.System.Report', srcName: 'Report' },
  { file: 'SteamClient/System/UI', object: 'SteamClient.System.UI', srcName: 'UI' },
  // #endregion
  // #region Global
  { file: 'Global/App', object: 'window.App', srcName: 'App' },
  { file: 'Global/ConnectionManager', object: 'window.App.cm', srcName: 'ConnectionManager' },
  { file: 'Global/ConnectionManager', object: 'window.appAchievementProgressCache.CMInterface', srcName: 'ConnectionManager' },
  { file: 'Global/Shared', object: 'window.App.cm.m_steamid', srcName: 'SteamId' },
  { file: 'Global/AppDetailsStore', object: 'window.appDetailsStore', srcName: 'AppDetailsStore' },
  { file: 'Global/AppAchievementProgressCache', object: 'window.appAchievementProgressCache', srcName: 'AppAchievementProgressCache', initFunction: 'window.appAchievementProgressCache.RequestCacheUpdate()' },
  // { file: 'Global/AppActivityStore', object: 'window.appActivityStore', srcName: 'AppActivityStore' },
  // NOTE: have the friend list open after todo is fixed
  // TODO: the friends popup takes a WHILE to convert because if recursive stores use new util function to debug
  { file: 'Global/PopupManager', object: 'window.g_PopupManager', srcName: 'PopupManager' },
  // { file: 'Global/StoreItemCache', object: 'window.StoreItemCache', srcName: 'StoreItemCache' },
  // { file: 'Global/SteamUIStore', object: 'window.SteamUIStore', srcName: 'SteamUIStore' },
  // { file: 'Global/MainWindowBrowserManager', object: 'window.MainWindowBrowserManager', srcName: 'MainWindowBrowserManager' },
  // #endregion
];

/** @public */
export const testMaps: InterfaceMap[] = [{ file: 'SteamClient/URL', object: 'SteamClient.URL', srcName: 'URL' }];
