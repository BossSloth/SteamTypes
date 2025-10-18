/* eslint-disable @stylistic/quotes */
import { IMap, InterfaceMap } from '.';

export const SharedMaps: InterfaceMap[] = [
  IMap('shared/Interfaces', 'Callbacks', /* ts */`window.g_PopupManager.m_rgPopupCreatedCallbacks`),
  IMap('shared/Interfaces', 'Callbacks', /* ts */`window.SteamUIStore.m_GamepadUIAudioStore.m_currentlyFocusedAppid.m_callbacks`),
  IMap('shared/Interfaces', 'MappedObservable', /* ts */`window.SteamUIStore.m_GamepadNavigationManager.NavigationSourceSupportsFocus`),

  IMap('shared/steamid', 'SteamId', /* ts */`window.App.cm.m_steamid`),
];
