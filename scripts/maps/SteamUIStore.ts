/* eslint-disable @stylistic/quotes */
import { GMap, InterfaceMap } from '.';

export const SteamUIStoreMaps: InterfaceMap[] = [
  GMap('SteamUIStore/index', 'SteamUIStore', /* ts */`SteamUIStore`),
  GMap('SteamUIStore/TextFilterStore', 'TextFilterStore', /* ts */`SteamUIStore.TextFilterStore`),
  GMap('SteamUIStore/GamepadUIAudioStore', 'GamepadUIAudioStore', /* ts */`SteamUIStore.m_GamepadUIAudioStore`),
  GMap('SteamUIStore/GamepadUIAudioStore', 'SteamAudioPlaybackObj', /* ts */`SteamUIStore.GamepadUIAudio.PlayAudioURL("/sounds/test")`),
  GMap('SteamUIStore/WindowStore', 'WindowStore', /* ts */`SteamUIStore.WindowStore`),
  GMap('SteamUIStore/SteamWindowNavigator', 'SteamWindowNavigator', /* ts */`SteamUIStore.WindowStore.MainWindowInstance.Navigator`),
  GMap('SteamUIStore/GamepadNavigationManager', 'GamepadNavigationManager', /* ts */`SteamUIStore.m_GamepadNavigationManager`),
];
