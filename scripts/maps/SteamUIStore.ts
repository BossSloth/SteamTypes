/* eslint-disable @stylistic/quotes */
import { GMap, InterfaceMap } from '.';

export const SteamUIStoreMaps: InterfaceMap[] = [
  GMap('stores/SteamUIStore/index', 'SteamUIStore', /* ts */`SteamUIStore`),
  GMap('stores/SteamUIStore/TextFilterStore', 'TextFilterStore', /* ts */`SteamUIStore.TextFilterStore`),
  GMap('stores/SteamUIStore/GamepadUIAudioStore', 'GamepadUIAudioStore', /* ts */`SteamUIStore.m_GamepadUIAudioStore`),
  GMap('stores/SteamUIStore/GamepadUIAudioStore', 'SteamAudioPlaybackObj', /* ts */`SteamUIStore.GamepadUIAudio.PlayAudioURL("/sounds/test")`),
  GMap('stores/SteamUIStore/WindowStore', 'WindowStore', /* ts */`SteamUIStore.WindowStore`),
  GMap('stores/SteamUIStore/SteamWindowNavigator', 'SteamWindowNavigator', /* ts */`SteamUIStore.WindowStore.MainWindowInstance.Navigator`),
  GMap('stores/SteamUIStore/GamepadNavigationManager', 'GamepadNavigationManager', /* ts */`SteamUIStore.m_GamepadNavigationManager`),
];
