/* eslint-disable @stylistic/quotes */
import { GMap, InterfaceMap } from '.';

export const SteamUIStoreMaps: InterfaceMap[] = [
  GMap('stores/SteamUIStore/index', 'SteamUIStore', /* ts */`SteamUIStore`),
  GMap('stores/SteamUIStore/TextFilterStore', 'TextFilterStore', /* ts */`SteamUIStore.TextFilterStore`),
  GMap('stores/SteamUIStore/GamepadUIAudioStore', 'GamepadUIAudioStore', /* ts */`SteamUIStore.m_GamepadUIAudioStore`),
  GMap('stores/SteamUIStore/GamepadUIAudioStore', 'SteamAudioPlaybackObj', /* ts */`SteamUIStore.GamepadUIAudio.PlayAudioURL("/sounds/test")`),
  GMap('stores/SteamUIStore/GamepadNavigationManager', 'GamepadNavigationManager', /* ts */`SteamUIStore.m_GamepadNavigationManager`),

  // WindowStore
  GMap('stores/SteamUIStore/WindowStore/WindowStore', 'WindowStore', /* ts */`SteamUIStore.WindowStore`),
  GMap('stores/SteamUIStore/WindowStore/SteamWindowNavigator', 'SteamWindowNavigator', /* ts */`SteamUIStore.WindowStore.MainWindowInstance.Navigator`),
  GMap('stores/SteamUIStore/WindowStore/MenuStore', 'MenuStore', /* ts */`SteamUIStore.WindowStore.MainWindowInstance.MenuStore`),
  GMap('stores/SteamUIStore/WindowStore/DesktopOverlay', 'DesktopOverlay', /* ts */`SteamUIStore.WindowStore.OverlayWindows[0]?.DesktopOverlay`),
];
