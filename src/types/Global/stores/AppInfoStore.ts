import { ConnectionManager } from 'Global/managers/ConnectionManager';
import { ObservableMap } from 'mobx';
import { ProtoAppType } from 'Protobufs/steam/enums';
import { Callbacks } from 'shared/interfaces';

export interface AppInfoStore {
  BHavePendingAppInfoRequests(): boolean;

  /** Ensures app info is loaded for the given app IDs, queuing requests if needed */
  EnsureAppInfoForAppIDs(appids: number[]): Promise<void>;

  /** Processes all queued app info requests */
  FlushPendingAppInfo(): Promise<void>;

  /** Gets app info for the given app ID, queuing a request if not already loaded */
  GetAppInfo(appid: number): AppInfo;

  GetCacheKeyForAppID(appid: number): string;

  /** Gets rich presence localization data for the given app ID */
  GetRichPresenceLoc(appid: number): MapRichPresenceLoc;

  /** Gets rich presence localization data asynchronously, waiting for it to load if needed */
  GetRichPresenceLocAsync(appid: number): Promise<MapRichPresenceLoc>;

  Init(cmInterface: ConnectionManager): void;

  IsLoadingAppID(appid: number): boolean;

  /** Loads a batch of app info from Steam servers */
  LoadAppInfoBatch(appids: number[]): Promise<void>;

  /** Attempts to load app info from local cache, returns app IDs that need to be fetched from server */
  LoadAppInfoBatchFromLocalCache(appids: number[]): Promise<number[]>;

  /** Localizes a rich presence token for the given app ID */
  Localize(appid: number, token: string, params?: Record<string, string>): string;

  OnAppOverviewChange(appOverview: unknown[]): void;

  OnGetAppsResponse(response: unknown): void;

  OnRichPresenceLocUpdate(richPresenceLoc: MapRichPresenceLoc, tokenLists: unknown[]): void;

  /** Queues an app info request for the given app ID, batching requests with a 25ms delay */
  QueueAppInfoRequest(appid: number): Promise<void>;

  QueueRichPresenceLocRequest(richPresenceLoc: MapRichPresenceLoc): Promise<MapRichPresenceLoc>;

  /** Registers a callback to be invoked when all pending app info requests complete */
  RegisterCallbackOnLoad(callback: () => void): void;

  SaveAppInfoBatchToLocalCache(appInfos: AppInfo[]): Promise<void>;

  SetCacheStorage(cacheStorage: CacheStorage): void;

  CMInterface: ConnectionManager;

  m_CacheStorage: CacheStorage | null;

  /** Number of app info requests currently in flight */
  m_cAppInfoRequestsInFlight: number;

  m_CMInterface: ConnectionManager;

  m_fnCallbackOnAppInfoLoaded: Callbacks;

  m_mapAppInfo: ObservableMap<number, AppInfo>;

  m_mapRichPresenceLoc: ObservableMap<string, MapRichPresenceLoc>;

  /** Promise that resolves when the current batch of app info requests completes */
  m_PendingAppInfoPromise: Promise<void> | undefined;

  m_PendingAppInfoResolve: (() => void) | undefined;

  /** Set of app IDs waiting to be requested in the next batch */
  m_setPendingAppInfo: Set<number>;
}

export interface AppInfo {
  BIsApplicationOrTool(): boolean;

  BuildAppURL(path: string, params?: Record<string, string>): string;

  DeserializeFromAppOverview(appOverview: unknown): void;

  DeserializeFromCacheObject(cacheObject: CachedAppInfo): void;

  DeserializeFromMessage(message: unknown): void;

  SerializeToCacheObject(): CachedAppInfo | null;

  appid: number;

  apptype?: number;

  icon_url: string;

  icon_url_no_default?: string;

  is_initialized: boolean;

  is_valid: boolean;

  m_bInitialized: boolean;

  m_dtUpdatedFromServer?: Date;

  m_eAppType: ProtoAppType;

  m_strIconURL?: string;

  m_strName?: string;

  m_unAppID: number;

  name?: string;

  time_updated_from_server?: Date;
}

export interface CachedAppInfo {
  eAppType: ProtoAppType;

  strIconURL: string;

  strName: string;

  strUpdatedFromServer: string;
}

export interface MapRichPresenceLoc {
  GetAppID(): number;

  GetTokenList(language: string): Map<string, string> | undefined;

  /** Localizes a token with optional parameter substitution */
  Localize(token: string, params?: Record<string, string>): string;

  SubstituteParams(text: string, params: Record<string, string>): string;

  m_appid: number;

  /** Promise that resolves when rich presence localization data is fetched */
  m_fetching: Promise<MapRichPresenceLoc> | null;

  /** Map of language codes to token name/value maps */
  m_mapLanguages: Map<string, Map<string, string>>;

  /** Timestamp of last update in milliseconds */
  m_nLastUpdated: number;
}

export interface CacheStorage {
  GetObject(key: string): Promise<unknown>;

  StoreObject(key: string, value: unknown): Promise<void>;
}
