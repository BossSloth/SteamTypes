// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Screenshot } from '../../SteamClient/Screenshots';

/**
 * This interface allows you to navigate like {@link SteamUIStore.Navigate}, but
 * without hardcoding routes.
 */
export interface SteamWindowNavigator {
  /**
   * Navigate to Library -> Collections
   */
  AllCollections(): void;

  /**
   * Navigate to the app's entry in library.
   *
   * @param appId The game to navigate to.
   */
  App(appId: number): void;

  /**
   * Navigate to app properties.
   *
   * @param appId The game to open app properties for.
   */
  AppProperties(appId: number): void;

  /**
   * Navigate to friends and chat.
   */
  Chat(): void;

  /**
   * Navigate to a provided collection.
   *
   * @param id The collection ID to navigate to. You can get its ID with
   * {@link CCollectionStore.GetUserCollectionsByName}. // TODO: add type
   */
  Collection(id: string): void;

  /**
   * Navigate to the console.
   */
  Console(): void;

  /**
   * Navigate to the downloads manager.
   */
  Downloads(): void;

  /**
   * Open a URL in the system web browser.
   *
   * @param url The URL to open. Must start with `https://`.
   */
  ExternalWeb(url: string): void;

  /**
   * Navigate to friend's achievements for a provided game.
   *
   * @param appId The app ID of the game.
   * @param steamid64 The SteamID 64 of the friend.
   */
  FriendAchievements(appId: number, steamid64: string): void;

  /**
   * Open the server browser dialog.
   */
  GameServers(): void;

  /**
   * Navigate to an app's global achievements. (seems broken and just uses {@link MyAchievements} instead)
   *
   * @param appId The app to open global achievements for.
   */
  GlobalAchievements(appId: number): void;

  /**
   * Navigate to the start up location, as specified in the Settings ->
   * Interface section.
   */
  Home(): void;

  /**
   * Navigate to an app's local achievements.
   *
   * @param appId The app to open local achievements for.
   */
  MyAchievements(appId: number): void;

  /**
   * Open the "Out of Playtime" (from Steam Families) dialog.
   */
  RequestPlaytimeDialog(): void;

  setNavigatingToInitialRoute(value: boolean): void;

  /**
   * Navigate to Steam settings.
   *
   * @param section The section to navigate to.
   */
  Settings(section?: SettingsSection_t): void;

  /**
   * Open a URL in the Steam main window browser.
   *
   * @param url The URL to open.
   */
  SteamWeb(url: string): void;

  /**
   * Open a URL in the Steam web browser dialog.
   *
   * @param url The URL to open.
   */
  SteamWebTab(url: string): void;

  Media: Media;

  type: 'desktop' | 'desktopoverlay' | 'gamepad';
}

export interface Media {
  /**
   * Opens a clip recording.
   *
   * The `id` key is a clip ID, see {@link CGameRecordingStore} methods on how to get one. //TODO: add type
   */
  Clip(
    state: NavigatorRouterState<{
      id: string;
    }>,
  ): void;

  /**
   * Opens the media manager in a grid view.
   */
  Grid(
    state: NavigatorRouterState<{
      filter: MediaManagerFilter;
    }>,
  ): void;

  /**
   * Opens the media manager in a list view.
   */
  List(
    state: NavigatorRouterState<{
      filter: MediaManagerFilter;
    }>,
  ): void;

  /**
   * Opens a game recording.
   */
  Recording(
    state: NavigatorRouterState<{
      gameid: string;

      playbackDefinition?: unknown; // TODO: get type from game recording store
    }>,
  ): void;

  /**
   * Opens a screenshot.
   *
   * The `id` key is {@link Screenshot.ugcHandle} if uploaded or something
   * like `440_21`, i.e. `{gameid}_{@link Screenshot.hHandle} if not.
   */
  Screenshot(
    state: NavigatorRouterState<{
      id: string;
    }>,
  ): void;
}

interface MediaManagerFilter {
  listSource: { type: 'app'; gameid: string; }
  // eslint-disable-next-line @stylistic/indent-binary-ops
  | { type: 'clip' | 'recording' | 'screenshot'; id?: string; summary?: unknown; }
  // eslint-disable-next-line @stylistic/indent-binary-ops
  | { type: 'recents'; };

  mediaType?: 'all' | 'clip' | 'recording' | 'screenshot';

  uploadStatus?: 'all' | 'uploaded' | 'notuploaded';
}

interface NavigatorRouterState<T> {
  state: T;
}

type SettingsSection_t
= | 'Accessibility'
  | 'Account'
  | 'Audio'
  | 'Bluetooth'
  | 'Broadcast'
  | 'Cloud'
  | 'Compatibility'
  | 'Controller'
  | 'Customization'
  | 'DesktopSecurity'
  | 'Developer'
  | 'Display'
  | 'Downloads'
  | 'Family'
  | 'Friends'
  | 'GameRecording'
  | 'General'
  | 'Home'
  | 'InGame'
  | 'InGameVoice'
  | 'Interface'
  | 'Internal'
  | 'Internet'
  | 'Keyboard'
  | 'Library'
  | 'Music'
  | 'Notifications'
  | 'Power'
  | 'RemotePlay'
  | 'Root'
  | 'Security'
  | 'Storage'
  | 'System'
  | 'Voice';
