import { ConnectionManager } from 'Global/managers/ConnectionManager';
import { ObservableMap } from 'mobx';
import { ProtoAppType } from 'Protobufs/steam/enums';
import { Callbacks } from 'shared';

export interface AppInfoStore {
  BHavePendingAppInfoRequests(): boolean;

  EnsureAppInfoForAppIDs(e: unknown): Promise<unknown>;

  FlushPendingAppInfo(): Promise<void>;

  GetAppInfo(e: unknown): unknown;

  GetCacheKeyForAppID(e: unknown): string;

  GetRichPresenceLoc(e: unknown): unknown;

  GetRichPresenceLocAsync(e: unknown): unknown;

  Init(e: unknown): void;

  IsLoadingAppID(e: unknown): unknown;

  LoadAppInfoBatch(e: unknown): Promise<void>;

  LoadAppInfoBatchFromLocalCache(e: unknown): Promise<unknown>;

  Localize(e: unknown, t: unknown, r: unknown): unknown;

  OnAppOverviewChange(e: unknown): void;

  OnGetAppsResponse(e: unknown): void;

  OnRichPresenceLocUpdate(e: unknown, t: unknown): void;

  QueueAppInfoRequest(e: unknown): unknown;

  QueueRichPresenceLocRequest(e: unknown): unknown;

  RegisterCallbackOnLoad(e: unknown): undefined;

  SaveAppInfoBatchToLocalCache(e: unknown): Promise<void>;

  SetCacheStorage(e: unknown): void;

  CMInterface: ConnectionManager;

  m_CacheStorage: null;

  m_cAppInfoRequestsInFlight: number;

  m_CMInterface: ConnectionManager;

  m_fnCallbackOnAppInfoLoaded: Callbacks;

  m_mapAppInfo: ObservableMap<number, AppInfo>;

  m_mapRichPresenceLoc: ObservableMap<string, MapRichPresenceLoc>;

  m_PendingAppInfoPromise: undefined;

  m_PendingAppInfoResolve: undefined;

  m_setPendingAppInfo: Set<unknown>;
}

export interface AppInfo {
  BIsApplicationOrTool(): boolean;

  BuildAppURL(e: unknown, t: unknown): unknown;

  DeserializeFromAppOverview(e: unknown): void;

  DeserializeFromCacheObject(e: unknown): void;

  DeserializeFromMessage(e: unknown): void;

  SerializeToCacheObject(): { strName: unknown; strIconURL: unknown; strUpdatedFromServer: unknown; eAppType: unknown; } | null;

  appid: number;

  apptype: number;

  icon_url: string;

  icon_url_no_default: string;

  is_initialized: boolean;

  is_valid: boolean;

  m_bInitialized: boolean;

  m_dtUpdatedFromServer: Date;

  m_eAppType: ProtoAppType;

  m_strIconURL: string;

  m_strName: string;

  m_unAppID: number;

  name: string;

  time_updated_from_server: Date;
}

export interface MapRichPresenceLoc {
  GetAppID(): unknown;

  GetTokenList(e: unknown): unknown;

  Localize(e: unknown, t: unknown): unknown;

  SubstituteParams(e: unknown, t: unknown): unknown;

  m_appid: number;

  m_fetching: null;

  m_mapLanguages: ObservableMap<string, ObservableMap<string, string>>;

  m_nLastUpdated: number;
}
