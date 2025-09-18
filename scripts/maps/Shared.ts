/* eslint-disable @stylistic/quotes */
import { GMap, InterfaceMap } from '.';

export const SharedMaps: InterfaceMap[] = [
  GMap('shared/Interfaces', 'Callbacks', /* ts */`window.g_PopupManager.m_rgPopupCreatedCallbacks`),
  GMap('shared/Interfaces', 'Callbacks', /* ts */`window.SteamUIStore.m_GamepadUIAudioStore.m_currentlyFocusedAppid.m_callbacks`),
  GMap('shared/Interfaces', 'MappedObservable', /* ts */`window.SteamUIStore.m_GamepadNavigationManager.NavigationSourceSupportsFocus`),

  GMap('shared/steamid', 'SteamId', /* ts */`window.App.cm.m_steamid`),
];
