/* eslint-disable @stylistic/quotes */
import { GMap, InterfaceMap } from '.';

export const GlobalMaps: InterfaceMap[] = [
  GMap('App', 'App', /* ts */`window.App`),
  GMap('ConnectionManager', 'ConnectionManager', /* ts */`window.cm`),
  GMap('ConnectionManager', 'ConnectionManager', /* ts */`window.App.cm`),
  GMap('ConsoleStore', 'ConsoleStore', /* ts */`window.consoleStore`, /* ts */`SteamClient.Console.ExecCommand("test")`),
  GMap('AppDetailsStore', 'AppDetailsStore', /* ts */`window.appDetailsStore`),
  GMap('AppAchievementProgressCache', 'AppAchievementProgressCache', /* ts */`window.appAchievementProgressCache`, 'window.appAchievementProgressCache.RequestCacheUpdate()'),
  GMap('PopupManager', 'PopupManager', /* ts */`window.g_PopupManager`),
  GMap('UrlStore', 'UrlStore', /* ts */`window.urlStore`),
  GMap('GameRecordingStore', 'GameRecordingStore', /* ts */`window.g_GRS`),
  GMap('SearchStore', 'SearchStore', /* ts */`window.searchstore`),

  // { file: 'Global/AppActivityStore', object: 'window.appActivityStore', srcName: 'AppActivityStore' },
  // NOTE: have the friend list open after todo is fixed
  // TODO: the friends popup takes a WHILE to convert because if recursive stores use new util function to debug
  // PopupManager
  // { file: 'Global/StoreItemCache', object: 'window.StoreItemCache', srcName: 'StoreItemCache' },
  // { file: 'Global/MainWindowBrowserManager', object: 'window.MainWindowBrowserManager', srcName: 'MainWindowBrowserManager' },
];
