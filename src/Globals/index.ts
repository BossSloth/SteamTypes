import type { SteamClient } from '../types';
import { App } from '../types/Global/App';
import { AppDetailsStore } from '../types/Global/AppDetailsStore';

declare global {
  let App: App;
  let appAchievementProgressCache: unknown;
  let appActivityStore: unknown;
  let appDetailsCache: unknown;
  let appDetailsStore: AppDetailsStore;
  let appInfoStore: unknown;
  let appReviewStore: unknown;
  let appSpotlightStore: unknown;
  let appStore: unknown;
  let badgeStore: unknown;
  let ClearBackgroundInterval: unknown;
  let ClearBackgroundTimeout: unknown;
  let ClientConnectionAPI: unknown;
  let cloudStorage: unknown;
  let cloudStorageInternalState: unknown;
  let CLSTAMP: unknown;
  let cm: unknown;
  let collectionStore: unknown;
  let communityStore: unknown;
  let consoleStore: unknown;
  let CURRENT_IPC_CALL_COUNT: unknown;
  let DebugLogDisable: unknown;
  let DebugLogDisableAll: unknown;
  let DebugLogDisableBacktrace: unknown;
  let DebugLogEnable: unknown;
  let DebugLogEnableAll: unknown;
  let DebugLogEnableBacktrace: unknown;
  let DebugLogNames: unknown;
  let downloadsStore: unknown;
  let dragStore: unknown;
  let EnableSteamConsole: unknown;
  let FocusedAppWindowStore: unknown;
  let FocusNavController: unknown;
  let friendStore: unknown;
  let g_ClanStore: unknown;
  let g_CreatorHomeStore: unknown;
  let g_EventCalendarDevFeatures: unknown;
  let g_EventCalendarMap: unknown;
  let g_EventCalendarTrackingStore: unknown;
  let g_FriendsUIApp: unknown;
  let g_GRS: unknown;
  let g_PartnerEventStore: unknown;
  let g_PopupManager: unknown;
  let gameReleaseStore: unknown;
  let installFolderStore: unknown;
  let lastScrollTime: unknown;
  let libraryEventStore: unknown;
  let libraryScrollListener: unknown;
  let LocalizationManager: unknown;
  let loginStore: unknown;
  let MainWindowBrowserManager: unknown;
  let multiSelectStore: unknown;
  let NotificationStore: unknown;
  let openDatabase: unknown;
  let overlayStore: unknown;
  let partnerEventStore: unknown;
  let playNextStore: unknown;
  let RemotePlayStore_SteamUI: unknown;
  let ResetNewContentRollup: unknown;
  let screenshotStore: unknown;
  let searchstore: unknown;
  let securitystore: unknown;
  let serverBrowserStore: unknown;
  let SetBackgroundInterval: unknown;
  let SetBackgroundTimeout: unknown;
  let SetHoverPresentation: unknown;
  let settingsStore: unknown;
  let settingsZooStore: unknown;
  let SetVoiceAutoShowVideoStream: unknown;
  let SetVoiceEchoLocalMic: unknown;
  let SetVoiceForceConnectingStatus: unknown;
  let SetVoiceForceReconnectingStatus: unknown;
  let SetVoiceLogDetails: unknown;
  let showcaseStore: unknown;
  let steam_client_components: unknown;
  let steamAjaxRequest: unknown;
  let SteamClient: SteamClient;
  let SteamUIStore: unknown;
  let StoreItemCache: unknown;
  let subscriberAgreementStore: unknown;
  let SuspendResumeStore: unknown;
  let SystemDisplayManagerStore: unknown;
  let SystemNetworkStore: unknown;
  let SystemReportStore: unknown;
  let trendingStore: unknown;
  let uiBroadcastWatchStore: unknown;
  let uiStore: unknown;
  let UpdateStore: unknown;
  let urlStore: unknown;
  let userProfileStore: unknown;
  let vrAudioSettingsStore: unknown;
  let webpackChunksteamui: unknown;
  let workshopStore: unknown;
  let __FriendsUIBrowserContext: unknown;
  let __mobxGlobals: unknown;
  let __mobxInstanceCount: unknown;
  let __THREE__: unknown;
}
