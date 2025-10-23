/* eslint-disable @stylistic/quotes */
import { GMap, InterfaceMap } from '.';

export const GlobalMaps: InterfaceMap[] = [
  GMap('App', 'App', /* ts */`window.App`),
  GMap('AppAchievementProgressCache', 'AppAchievementProgressCache', /* ts */`window.appAchievementProgressCache`, 'window.appAchievementProgressCache.RequestCacheUpdate()'),

  // Managers
  GMap('managers/ConnectionManager', 'ConnectionManager', /* ts */`window.cm`),
  GMap('managers/ConnectionManager', 'ConnectionManager', /* ts */`window.App.cm`),
  GMap('managers/PopupManager', 'PopupManager', /* ts */`window.g_PopupManager`),

  // Stores
  GMap('stores/ConsoleStore', 'ConsoleStore', /* ts */`window.consoleStore`, /* ts */`SteamClient.Console.ExecCommand("test")`),
  GMap('stores/AppDetailsStore', 'AppDetailsStore', /* ts */`window.appDetailsStore`),
  GMap('stores/UrlStore', 'UrlStore', /* ts */`window.urlStore`),
  GMap('stores/GameRecordingStore', 'GameRecordingStore', /* ts */`window.g_GRS`),
  GMap('stores/SearchStore', 'SearchStore', /* ts */`window.searchstore`),

  // { file: 'Global/AppActivityStore', object: 'window.appActivityStore', srcName: 'AppActivityStore' },
  // NOTE: have the friend list open after todo is fixed
  // TODO: the friends popup takes a WHILE to convert because if recursive stores use new util function to debug
  // PopupManager
  // { file: 'Global/StoreItemCache', object: 'window.StoreItemCache', srcName: 'StoreItemCache' },
  // { file: 'Global/MainWindowBrowserManager', object: 'window.MainWindowBrowserManager', srcName: 'MainWindowBrowserManager' },
];
