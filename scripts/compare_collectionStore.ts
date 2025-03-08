import { ObservableMap } from 'mobx';
import { ObservableSet } from 'mobx';
import Long from 'long';

export interface CollectionStore {
  AddOrRemoveApp(e: unknown, t: unknown, r: unknown): void;
  AddPartnerCollection(): unknown /* native code */;
  BHasNonGamepadOptions(): unknown;
  BIncludeInFamilyGroupCollection(e: unknown): unknown;
  BIncludeInSharedLibraryCollection(e: unknown): unknown;
  BIsFavorite(): unknown /* native code */;
  BIsFriendInAnyCollection(e: unknown): boolean;
  BIsHidden(): unknown /* native code */;
  BIsPartnerCollectionId(): unknown /* native code */;
  BIsPartnerCollectionName(): unknown /* native code */;
  BIsSystemCollectionId(): unknown /* native code */;
  BIsSystemCollectionName(): unknown /* native code */;
  BIsVisible(): unknown /* native code */;
  BootstrapFromUserTags(): unknown /* native code */;
  DeleteCollection(): unknown /* native code */;
  GetCollection(): unknown /* native code */;
  GetCollectionForAppType(): unknown /* native code */;
  GetCollectionIDByUserTag(): unknown /* native code */;
  GetCollectionListForAppID(): unknown /* native code */;
  GetCurrentGamepadFilter(): unknown /* native code */;
  GetUserCollectionsByName(): unknown /* native code */;
  ImportUserTags(e: unknown, t: unknown, r: unknown): Promise<void>;
  Init(e: unknown): Promise<void>;
  InitPartnerCollectionNameMap(): void;
  InitSystemCollectionNameMap(): void;
  NewUnsavedCollection(): unknown /* native code */;
  OnAppOverviewChange(e: unknown, t: unknown): void;
  OnCloudStorageChanged(): unknown /* native code */;
  OnFriendOwnedAppsChanged(): unknown /* native code */;
  PartnerCollectionIdToName(): unknown /* native code */;
  Register(): Promise<void>;
  SaveCollection(): unknown /* native code */;
  SetAppsAsFavorite(): unknown /* native code */;
  SetAppsAsHidden(): unknown /* native code */;
  SetGamepadCollectionFilter(): unknown /* native code */;
  SystemCollectionIdToName(): unknown /* native code */;
  WriteLocalStorage(): unknown /* native code */;

  allAppsCollection: AllAppsCollection;
  allGamesCollection: AllAppsCollection;
  allRecentAppsCollection: AllAppsCollection;
  appTypeCollectionMap: Map<string, AllAppsCollection>;
  appTypeCollections: AllAppsCollection[];
  collectionsFromStorage: ObservableMap<string, CollectionsFromStorage>;
  deckDesktopApps: null;
  deckGamesCollection: null;
  dtestGamesCollection: null;
  localGamesCollection: AllAppsCollection;
  localPlayedGamesCollection: AllAppsCollection;
  m_cloudStorage: m_cloudStorage;
  m_cloudStorageMap: m_cloudStorageMap;
  m_localStorage: m_localStorage;
  m_mapCollectionsFromStorage: unknown/* circular reference to collectionsFromStorage */;
  m_mapPartnerCollectionIdToName: Map<string, string>;
  m_mapSystemCollectionIdToName: Map<string, string>;
  m_shortcutCollectionInfo: m_shortcutCollectionInfo;
  myGamesCollection: AllAppsCollection;
  ps4ControllerGamesCollection: null;
  ps5ControllerGamesCollection: null;
  recentAppCollectionMap: Map<string, AllAppsCollection>;
  recentAppCollections: AllAppsCollection[];
  recentAppsCollection: AllAppsCollection;
  recentPurchasedGamesCollection: AllAppsCollection;
  remotePlayActiveCollection: AllAppsCollection;
  remotePlayCollection: AllAppsCollection;
  sharedLibrariesCollectionMap: Map<string, AllAppsCollection>;
  sharedLibrariesCollections: AllAppsCollection[];
  siteLicenseCollection: null;
  uncategorizedCollection: AllAppsCollection;
  userCollections: (CollectionsFromStorage | AllAppsCollection)[];
  vrAppsCollection: AllAppsCollection;
  xboxControllerGamesCollection: null;
}

export interface AllAppsCollection {
  AsDeletableCollection(): null;
  AsDragDropCollection(): null;
  AsEditableCollection(): null;
  BIncludesFriend(e: unknown): boolean;
  ClearAppCounts(): void;
  GetAppCountWithToolsFilter(e: unknown): unknown;
  SetApps(e: unknown): void;
  UpdateAllApps(): void;
  UpdateApps(e: unknown, t: unknown): void;
  UpdateFriendOwnedGames(e: unknown): void;

  allApps: (AllApps[] | unknown[]);
  apps: ObservableSet<number>;
  bAllowsDragAndDrop: boolean;
  bFiltersOnGameListAppType: boolean;
  bIsDeletable: boolean;
  bIsDynamic: boolean;
  bIsEditable: boolean;
  displayName?: string;
  id: string;
  m_mapFilterToAppCounts: Map<number, number>;
  m_rgApps: (number[] | unknown[]);
  m_setApps: unknown/* circular reference to apps */;
  m_strId: string;
  m_strName?: string;
  visibleApps: (AllApps[] | unknown[]);
}

export interface CollectionsFromStorage {
  AddApps(): unknown /* native code */;
  AsDeletableCollection(): unknown;
  AsDragDropCollection(): unknown;
  AsEditableCollection(): unknown;
  BIncludesFriend(e: unknown): boolean;
  ClearAppCounts(): void;
  Delete(): Promise<void>;
  FreezeToStatic(): unknown /* native code */;
  GetAppCountWithToolsFilter(e: unknown): unknown;
  MergeFromStorageFormat(): unknown /* native code */;
  RemoveApps(): unknown /* native code */;
  Save(): Promise<void>;
  SetApps(e: unknown): void;
  ToStorageFormat(): unknown /* native code */;
  UpdateAllApps(): void;
  UpdateApps(): unknown /* native code */;
  UpdateFriendOwnedGames(): unknown /* native code */;

  allApps: AllApps[];
  apps: ObservableSet<number>;
  bAllowsDragAndDrop: boolean;
  bFiltersOnGameListAppType: boolean;
  bIsDeletable: boolean;
  bIsDynamic: boolean;
  bIsEditable: boolean;
  displayName: string;
  id: string;
  internalAddedList: ObservableSet<number>;
  internalAppFilter?: InternalAppFilter;
  internalRemovedList: ObservableSet<number>;
  m_filter?: InternalAppFilter;
  m_mapFilterToAppCounts: Map<number, number>;
  m_rgApps: unknown[];
  m_setAddedManually: unknown/* circular reference to internalAddedList */;
  m_setApps: unknown/* circular reference to apps */;
  m_setRemovedManually: unknown/* circular reference to internalRemovedList */;
  m_strId: string;
  m_strName: string;
  visibleApps: AllApps[];
}

export interface AllApps {
  BAreCategoriesEqual(e: unknown): unknown;
  BAreSetsEqual(e: unknown, t: unknown): unknown;
  BAreStoreTagsEqual(e: unknown): unknown;
  BHasCustomImages(): boolean;
  BHasNonObservableChange(e: unknown): boolean;
  BHasObservableChange(e: unknown): boolean;
  BHasObservables(): boolean;
  BHasStoreCategory(e: unknown): unknown;
  BHasStoreTag(): unknown /* native code */;
  BIsAppBlocked(): unknown;
  BIsAppInBlockList(): unknown;
  BIsApplicationOrTool(): boolean;
  BIsBorrowed(): unknown;
  BIsDemo(): boolean;
  BIsGameIDEqual(e: unknown): boolean;
  BIsHardware(): boolean;
  BIsLastTimePlayedEqual(e: unknown): boolean;
  BIsModOrShortcut(): unknown;
  BIsMusicAlbum(): boolean;
  BIsNewToLibrary(): unknown;
  BIsOwned(): unknown;
  BIsOwnedByAnotherUser(): unknown;
  BIsPerClientDataEqual(e: unknown): boolean;
  BIsPerClientDataLocal(e: unknown): unknown;
  BIsSelectedClientLocal(): boolean;
  BIsShortcut(): boolean;
  BIsSortAsEqual(e: unknown): boolean;
  BIsSteamDeckVerified(): boolean;
  BIsSteamVR(): unknown;
  BIsUnreleased(): boolean;
  BIsVisibleInMRUList(): boolean;
  BSupportsVR(): unknown;
  ComputeLastPlayedSectionName(e: unknown): unknown;
  GetCanonicalReleaseDate(): unknown;
  GetCanonicalReleaseYear(): unknown;
  GetGameID(): unknown;
  GetLastPlayedSectionName(): unknown;
  GetLastTimePlayed(): unknown;
  GetPerClientData(e: unknown): unknown;
  GetPrimaryAppID(): unknown;
  GetStoreTags(): unknown;
  InitFromProto(e: unknown): void;
  LOG_CHANGE(): unknown /* native code */;
  SetGameID(e: unknown): void;
  SetLastTimePlayed(e: unknown): void;
  SetPerClientData(e: unknown): void;
  SetSortAs(e: unknown): void;
  SetStoreCategories(e: unknown): void;
  SetStoreTags(e: unknown): void;

  __cachedLastPlayedSection?: never;
  __cachedLastPlayedTime?: never;
  __cachedReleaseYearString?: never;
  active_beta?: string;
  album_cover_hash?: string;
  app_type: number;
  appid: number;
  canonicalAppType: number;
  display_name: string;
  display_status: number;
  gameid: string;
  gamepad_preferred: boolean;
  header_filename?: string;
  icon_data?: string;
  icon_data_format?: string;
  icon_hash?: string;
  installed?: boolean;
  is_available_on_current_platform?: boolean;
  is_invalid_os_type?: never;
  library_capsule_filename?: string;
  library_id?: string;
  local_cache_version?: number;
  local_per_client_data: Local_per_client_data;
  m_gameid?: string;
  m_setStoreCategories: Set<number>;
  m_setStoreTags: Set<number>;
  m_ulGameId?: Long;
  mastersub_appid?: never;
  mastersub_includedwith_logo?: never;
  metacritic_score?: number;
  minutes_playtime_forever: number;
  minutes_playtime_last_two_weeks: number;
  most_available_clientid: string;
  most_available_per_client_data: Local_per_client_data;
  mru_index?: number;
  number_of_copies: number;
  optional_parent_app_id?: number;
  owner_account_id?: number;
  per_client_data: Local_per_client_data[];
  ps4_controller_support: number;
  ps5_controller_support: number;
  review_percentage: number;
  review_percentage_with_bombs: number;
  review_percentage_without_bombs: number;
  review_score: number;
  review_score_with_bombs: number;
  review_score_without_bombs: number;
  rt_custom_image_mtime?: number;
  rt_last_time_locally_played?: number;
  rt_last_time_played: number;
  rt_last_time_played_or_installed: number;
  rt_original_release_date: number;
  rt_purchased_time?: number;
  rt_recent_activity_time: number;
  rt_steam_release_date: number;
  rt_store_asset_mtime?: number;
  selected_clientid: string;
  selected_per_client_data: Local_per_client_data;
  shortcut_override_appid?: never;
  site_license_site_name?: never;
  size_on_disk?: string;
  sort_as: string;
  status_percentage: number;
  steam_deck_compat_category: number;
  steam_hw_compat_category_packed: number;
  store_category: (unknown[] | number[]);
  store_tag: (unknown[] | number[]);
  subscribed_to?: boolean;
  third_party_mod?: boolean;
  visible_in_game_list: boolean;
  vr_only?: boolean;
  vr_supported?: boolean;
  xbox_controller_support?: number;
}

export interface InternalAppFilter {
  BAcceptsUnion(): unknown /* native code */;
  BHasAppFeature(e: unknown): unknown;
  BHasNonGamepadOptions(): boolean;
  BIncludesTools(): boolean;
  BIsSelected(): unknown /* native code */;
  ClearSteamDeckOptions(e: unknown): void;
  GetAllSelectedOptions(): unknown /* native code */;
  GetCurrentControllerSpecificOption(): unknown;
  GetCurrentSteamDeckCompatOption(): number;
  GetSelectedOptions(): unknown /* native code */;
  GetTagsString(): unknown /* native code */;
  GetToolTipText(): never[];
  Matches(): unknown /* native code */;
  MatchesImpl(e: unknown): boolean;
  MatchesScored(): unknown /* native code */;
  MatchesScoredImpl(e: unknown): unknown;
  Reset(): void;
  SelectOption(): unknown /* native code */;
  SetSearchSuggestions(): unknown /* native code */;
  SetSearchText(): unknown /* native code */;
  ToStorageFormat(): unknown /* native code */;
  ToggleAcceptsUnion(): unknown /* native code */;

  bIsEmpty: boolean;
  hash: number;
  m_filterSpec: m_filterSpec;
  searchSuggestions: never;
  searchText: string;
}

export interface FromtagZ_MIJNGAMES {
  added: number[];
  id: string;
  removed: unknown[];
}

export interface Local_per_client_data {
  active_beta?: string;
  bytes_downloaded: string;
  bytes_total: string;
  client_name: string;
  clientid: string;
  display_status: number;
  installed?: boolean;
  is_available_on_current_platform?: boolean;
  status_percentage: number;
}

export interface m_filterSpec {
  filterGroups: FilterGroups[];
  nFormatVersion: number;
  setSuggestions: unknown/* circular reference to searchSuggestions */;
  strSearchText: string;
}

export interface FilterGroups {
  bAcceptUnion: boolean;
  rgOptions: (unknown[] | number[]);
}

export interface m_cloudStorage {
  Get(e: unknown): unknown;
  GetByPrefix(e: unknown): unknown;
  GetMapForPrefix(e: unknown): unknown;
  GetObject(e: unknown): Promise<unknown>;
  GetString(e: unknown): Promise<unknown>;
  RegisterForChangeNotifications(e: unknown): unknown;
  RemoveObject(e: unknown, t: unknown, r: unknown): Promise<void>;
  StoreObject(e: unknown, t: unknown, r: unknown, n: unknown): Promise<unknown>;
  StoreString(e: unknown, t: unknown, r: unknown, n: unknown): Promise<void>;

  m_eNamespace: number;
}

export interface m_cloudStorageMap {
  GetObject(e: unknown): unknown;
  OnChange(e: unknown): void;
  StoreObject(e: unknown, t: unknown, r: unknown, n: unknown): Promise<unknown>;
  StoreString(e: unknown, t: unknown, r: unknown, n: unknown): Promise<unknown>;
  clear(e: unknown, t: unknown): void;
  delete(): unknown;
  entries(): unknown;
  forEach(e: unknown, t: unknown): void;
  get(e: unknown): unknown;
  has(e: unknown): unknown;
  keys(): unknown;
  set(e: unknown, t: unknown, r: unknown, n: unknown): unknown;
  values(): unknown;

  m_cloudStorage: m_cloudStorage;
  m_strKeyPrefix: string;
  mapInternal: Map<string, string>;
  size: number;
}

export interface m_localStorage {
  GetObject(e: unknown, t: unknown): Promise<unknown>;
  GetString(e: unknown): Promise<unknown>;
  RemoveObject(e: unknown): Promise<unknown>;
  StoreObject(e: unknown, t: unknown): Promise<unknown>;
  StoreString(e: unknown, t: unknown): Promise<unknown>;
}

export interface m_shortcutCollectionInfo {
  'from-tag-Z_ MIJN GAMES': FromtagZ_MIJNGAMES;
  'uc-lDGRs4V+ZOwI': FromtagZ_MIJNGAMES;
}
