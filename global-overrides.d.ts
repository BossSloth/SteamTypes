import type {
  App,
  AppDetailsStore,
  AppStore,
  LocalizationManager,
  NavigationStore,
  SteamClient,
  SteamUIStore,
} from 'steam-types';
// TODO: I don't know if the import from steam-types now fully works or if we should import from dist so i will leave both here for now.
import { NotificationStore } from './dist/types/Global/stores/NotificationStore';

declare global {
  let App: App;
  let appDetailsStore: AppDetailsStore;
  let appStore: AppStore;
  let FocusNavController: unknown;
  let LocalizationManager: LocalizationManager;
  let NavigationStore: NavigationStore;
  let NotificationStore: NotificationStore;
  let securityStore: unknown;
  let settingsStore: unknown;
  let SteamClient: SteamClient;
  let SteamUIStore: SteamUIStore;
}
