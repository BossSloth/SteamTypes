import { QueryObserver } from '@tanstack/query-core';
import { CloudStorage } from 'Global/App';
import { ConnectionManager } from 'Global/managers/ConnectionManager';
import Long from 'long';
import { ObservableMap, ObservableSet } from 'mobx';
import { ProtoAppType, SteamDeckCompatibilityCategory } from 'Protobufs/steam/enums';
import { CAppOverview_Change, CAppOverview, DisplayStatus, AppControllerSupportLevel } from 'Protobufs/steam/steammessages_appoverview';
import { ProtobufInterface, SerializedArrayBuffer } from 'shared';

export interface AppStore {
  BIsAppPrivate(appid: number): boolean;

  CompareSortAs(app1: SteamAppOverview, app2: SteamAppOverview): number;

  GetAlbumCoverURLForApp(appOverview: SteamAppOverview): string | null;

  GetAppOverviewByAppID(appid: number): SteamAppOverview | null;

  GetAppOverviewByGameID(gameid: string): SteamAppOverview | null;

  GetCachedAlbumCoverURL(appOverview: SteamAppOverview): string | null;

  GetCachedVerticalCapsuleURL(appOverview: SteamAppOverview): [string, string];

  GetCustomHeroImageURLs(appOverview: SteamAppOverview): string[];

  GetCustomImageURLs(appOverview: SteamAppOverview, suffix: string): string[];

  GetCustomLandcapeImageURLs(appOverview: SteamAppOverview): string[];

  GetCustomLogoImageURLs(appOverview: SteamAppOverview): string[];

  GetCustomSortAs(appid: number): string | undefined;

  GetCustomVerticalCapsuleURLs(appOverview: SteamAppOverview): string[];

  GetIconURLForApp(appOverview: SteamAppOverview): string | null;

  GetLocalizationForStoreTag(tagId: number): string | undefined;

  GetPregeneratedVerticalCapsuleForApp(appOverview: SteamAppOverview): string;

  GetStorePageURLForApp(appOverview: SteamAppOverview): string | null;

  GetTopStoreTags(filter?: string): { nTagId: number; nCount: number; }[];

  GetVerticalCapsuleURLForApp(appOverview: SteamAppOverview): string;

  Init(connectionManager: ConnectionManager, cloudStorage: CloudStorage): Promise<void>;

  OnCloudStorageChanged(changeType: number, changedKeys: string[]): Promise<void>;

  OnPrivateAppsChanged(result: { isSuccess: boolean; data: Set<number>; }): void;

  RefreshTagsIfNeeded(): void;

  SetCustomSortAs(appid: number, sortAs?: string): Promise<boolean>;

  /**
   * @native
   */
  UpdateAppOverview(data: SerializedArrayBuffer<CAppOverview_Change>): boolean;

  UpdatePrivateApps(privateApps: Set<number>): void;

  // TODO: figure out how to filter double union type from convert script
  allApps: SteamAppOverview[];

  m_bIsInitialized: boolean;

  m_cloudStorage: CloudStorage;

  m_cm: ConnectionManager;

  m_collator: Intl.Collator;

  m_mapApps: ObservableMap<number, SteamAppOverview>;

  m_mapStoreTagLocalization: Record<number, string>;

  m_msTagMapLoaded: number;

  m_privateAppsObserver: QueryObserver;

  m_setPrivateApps: ObservableSet<number>;

  sharedLibraryAccountIds: number[];

  siteLicenseApps: { strSiteName: string; rgApps: SteamAppOverview[]; } | null;

  storeTagCounts: Map<number, number>;
}

type ProtoAppOverview = ProtobufInterface<CAppOverview>;

export interface SteamAppOverview {
  /**
   * Compares the current store categories with the ones in the proto and returns true if they are equal.
   * @param proto The proto to compare with.
   */
  BAreCategoriesEqual(proto: ProtoAppOverview): boolean;

  /**
   * Compares a set with an array and returns true if they are equal.
   * @param set The set to compare with.
   * @param array The array to compare with.
   */
  BAreSetsEqual(set: Set<number>, array: number[]): boolean;

  /**
   * Compares the current store tags with the ones in the proto and returns true if they are equal.
   * @param proto The proto to compare with.
   */
  BAreStoreTagsEqual(proto: ProtoAppOverview): boolean;

  BHasCustomImages(): boolean;

  BHasNonObservableChange(proto: ProtoAppOverview): boolean;

  BHasObservableChange(proto: ProtoAppOverview): boolean;

  BHasObservables(): boolean;

  /**
   * Returns true if this app has the given store category.
   * @param categoryId The category to check for.
   */
  BHasStoreCategory(categoryId: number): boolean;

  /**
   * Returns true if this app has the given store tag.
   * @param tagId The tag to check for.
   */
  BHasStoreTag(tagId: number): boolean;

  BIsAppBlocked(): boolean;

  BIsAppInBlockList(): boolean;

  BIsApplicationOrTool(): boolean;

  BIsBorrowed(): boolean;

  BIsDemo(): boolean;

  /**
   * Returns true if this app has the same game ID as the proto.
   * @param proto The proto to compare with.
   */
  BIsGameIDEqual(proto: ProtoAppOverview): boolean;

  BIsHardware(): boolean;

  /**
   * Returns true if this app has the same last time played as the proto.
   * @param proto The proto to compare with.
   */
  BIsLastTimePlayedEqual(proto: ProtoAppOverview): boolean;

  BIsModOrShortcut(): boolean;

  BIsMusicAlbum(): boolean;

  BIsNewToLibrary(): boolean;

  BIsNonVRGame(): boolean;

  BIsOwned(): boolean;

  BIsOwnedByAnotherUser(): boolean;

  /**
   * Returns true if this app has the same per client data as the proto.
   * @param proto The proto to compare with.
   */
  BIsPerClientDataEqual(proto: ProtoAppOverview): boolean;

  BIsPerClientDataLocal(clientData: SteamAppOverviewClientData): boolean;

  BIsSelectedClientLocal(): boolean;

  BIsShortcut(): boolean;

  /**
   * Returns true if this app has the same `sort_as` as the proto.
   * @param proto The proto to compare with.
   */
  BIsSortAsEqual(proto: ProtoAppOverview): boolean;

  BIsSteamDeckVerified(): boolean;

  BIsSteamOSCompatible(): boolean;

  BIsSteamVR(): boolean;

  BIsUnreleased(): boolean;

  BIsVisibleInMRUList(): boolean;

  BSupportsVR(): boolean;

  ComputeLastPlayedSectionName(lastTimePlayed: number): string;

  GetCanonicalReleaseDate(): number;

  GetCanonicalReleaseYear(): string;

  GetGameID(): string;

  GetLastPlayedSectionName(): string;

  GetLastTimePlayed(): number;

  GetPerClientData(type: 'local' | 'mostavailable' | 'selected'): SteamAppOverviewClientData;

  GetPreservedState(): { icon_data: string; icon_data_format: string; } | undefined;

  GetPrimaryAppID(): number;

  GetStoreTags(): Set<number>;

  InitFromProto(proto: ProtoAppOverview): void;

  /**
   * @native
   */
  LOG_CHANGE(...args: unknown[]): void;

  RestorePreservedState(state: { icon_data: string; icon_data_format: string; }): void;

  /**
   * Sets the game ID from the proto.
   * @param proto The proto to set the game ID from.
   */
  SetGameID(proto: ProtoAppOverview): void;

  /**
   * Sets the last time played from the proto.
   * @param proto The proto to set the last time played from.
   */
  SetLastTimePlayed(proto: ProtoAppOverview): void;

  /**
   * Sets the per client data from the proto.
   * @param proto The proto to set the per client data from.
   */
  SetPerClientData(proto: ProtoAppOverview): void;

  /**
   * Sets the sort as from the proto.
   * @param proto The proto to set the sort as from.
   */
  SetSortAs(proto: ProtoAppOverview): void;

  /**
   * Sets the store categories from the proto.
   * @param proto The proto to set the store categories from.
   */
  SetStoreCategories(proto: ProtoAppOverview): void;

  /**
   * Sets the store tags from the proto.
   * @param proto The proto to set the store tags from.
   */
  SetStoreTags(proto: ProtoAppOverview): void;

  __cachedLastPlayedSection?: string;

  __cachedLastPlayedTime?: number;

  __cachedReleaseYearString?: string;

  active_beta?: string;

  album_cover_hash?: string;

  app_type: ProtoAppType;

  appid: number;

  canonicalAppType: number;

  custom_sort_as_display?: string;

  display_name: string;

  display_name_elanguage: number;

  display_status: DisplayStatus;

  gameid: string;

  gamepad_preferred: boolean;

  has_custom_sort_as?: boolean;

  header_filename?: string;

  icon_data?: string;

  icon_data_format?: string;

  icon_hash?: string;

  installed?: boolean;

  is_available_on_current_platform?: boolean;

  is_invalid_os_type?: boolean;

  library_capsule_filename?: string;

  library_id?: string;

  local_cache_version?: number;

  local_per_client_data: SteamAppOverviewClientData;

  m_gameid?: string;

  m_setStoreCategories: Set<number>;

  m_setStoreTags: Set<number>;

  m_ulGameId?: Long;

  mastersub_appid?: number;

  mastersub_includedwith_logo?: boolean;

  metacritic_score?: number;

  minutes_playtime_forever: number;

  minutes_playtime_last_two_weeks: number;

  most_available_clientid: string;

  most_available_per_client_data: SteamAppOverviewClientData;

  mru_index?: number;

  number_of_copies: number;

  optional_parent_app_id?: number;

  original_sort_as?: string;

  owner_account_id?: number;

  per_client_data: SteamAppOverviewClientData[];

  ps4_controller_support: AppControllerSupportLevel;

  ps5_controller_support: AppControllerSupportLevel;

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

  rt_original_release_date?: number;

  rt_purchased_time?: number;

  rt_recent_activity_time?: number;

  rt_steam_release_date?: number;

  rt_store_asset_mtime?: number;

  selected_clientid: string;

  selected_per_client_data: SteamAppOverviewClientData;

  shortcut_override_appid?: number;

  site_license_site_name?: string;

  size_on_disk?: string;

  sort_as: string;

  status_percentage?: number;

  steam_deck_compat_category: SteamDeckCompatibilityCategory;

  steam_hw_compat_category_packed: number;

  steam_os_compat_category: SteamDeckCompatibilityCategory;

  store_category: number[];

  store_tag: number[];

  subscribed_to?: boolean;

  third_party_mod?: boolean;

  visible_in_game_list?: boolean;

  vr_only?: boolean;

  vr_supported?: boolean;

  xbox_controller_support?: AppControllerSupportLevel;
}

export interface SteamAppOverviewClientData {
  active_beta?: string;

  client_name: string;

  clientid: string;

  display_status: DisplayStatus;

  installed?: boolean;

  is_available_on_current_platform?: boolean;

  status_percentage?: number;
}
