/* eslint-disable @stylistic/quotes */
import { GMap, InterfaceMap } from '.';

export const GlobalMaps: InterfaceMap[] = [
  GMap('App', 'App', /* ts */`window.App`),
  GMap('AppAchievementProgressCache', 'AppAchievementProgressCache', /* ts */`window.appAchievementProgressCache`, { initFunction: 'window.appAchievementProgressCache.RequestCacheUpdate()' }),

  // Managers
  GMap('managers/ConnectionManager', 'ConnectionManager', /* ts */`window.cm`),
  GMap('managers/ConnectionManager', 'ConnectionManager', /* ts */`window.App.cm`),
  GMap('managers/PopupManager', 'PopupManager', /* ts */`window.g_PopupManager`),
  GMap('managers/MainWindowBrowserManager', 'MainWindowBrowserManager', /* ts */`window.MainWindowBrowserManager`),

  // Stores
  GMap('stores/AppDetailsStore', 'AppDetailsStore', /* ts */`window.appDetailsStore`),
  GMap('stores/AppInfoStore', 'AppInfoStore', /* ts */`window.appInfoStore`),
  GMap('stores/AppStore', 'AppStore', /* ts */`window.appStore`),
  GMap('stores/ConsoleStore', 'ConsoleStore', /* ts */`window.consoleStore`, { initFunction: /* ts */`SteamClient.Console.ExecCommand("test")` }),
  GMap('stores/UrlStore', 'UrlStore', /* ts */`window.urlStore`),
  GMap('stores/GameRecordingStore', 'GameRecordingStore', /* ts */`window.g_GRS`),
  GMap('stores/SearchStore', 'SearchStore', /* ts */`window.searchstore`),

  // { file: 'Global/AppActivityStore', object: 'window.appActivityStore', srcName: 'AppActivityStore' },
  // NOTE: have the friend list open after todo is fixed
  // TODO: the friends popup takes a WHILE to convert because if recursive stores use new util function to debug
  GMap('stores/StoreItemCache', 'StoreItemCache', /* ts */`window.StoreItemCache`),
];
