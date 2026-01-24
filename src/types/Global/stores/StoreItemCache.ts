import { ServiceTransport } from 'Global/managers/ConnectionManager';
import { StoreAppType, StoreBrowseFilterFailure, StoreBrowseItemDataRequest, StoreItem_BasicInfo, StoreItem_Categories, StoreItem_Link, StoreItem_Platforms, StoreItem_PurchaseOption, StoreItem_RelatedItems, StoreItem_ReleaseInfo, StoreItem_Reviews, StoreItem_SupportedLanguage, StoreItem_Tag, StoreItemType, TrailerCategory } from 'Protobufs/steam/steammessages_storebrowse.steamclient';

export interface StoreItemCache {
  BHasApp(e: unknown, t: unknown): unknown;

  BHasBundle(e: unknown, t: unknown): unknown;

  BHasCreator(e: unknown, t: unknown): unknown;

  BHasHubCategory(e: unknown, t: unknown): unknown;

  BHasPackage(e: unknown, t: unknown): unknown;

  BHasStoreItem(e: unknown, t: unknown, r: unknown): boolean;

  BHasTag(e: unknown, t: unknown): unknown;

  BIsAppMissing(e: unknown): unknown;

  BIsAppUnavailableDueToCountryRestriction(e: unknown): unknown;

  BIsBundleMissing(e: unknown): unknown;

  BIsBundleUnavailableDueToCountryRestriction(e: unknown): unknown;

  BIsCreatorMissing(e: unknown): unknown;

  BIsHubCategoryMissing(e: unknown): unknown;

  BIsPackageMissing(e: unknown): unknown;

  BIsPackageUnavailableDueToCountryRestriction(e: unknown): unknown;

  BIsStoreItemMissing(e: unknown, t: unknown): unknown;

  BIsStoreItemUnavailableDueToCountryRestriction(e: unknown, t: unknown): unknown;

  BIsTagMissing(e: unknown): unknown;

  FlushPendingInfo(): Promise<void>;

  GetApp(appId: number): StoreApp | undefined;

  GetBundle(e: unknown): unknown;

  GetCreator(e: unknown): unknown;

  GetHubCategory(e: unknown): unknown;

  GetMapForType(e: unknown): unknown;

  GetPackage(e: unknown): unknown;

  GetPreviousSupersetLoadPromise(e: unknown, t: unknown, r: unknown): unknown;

  GetReturnUnavailableItems(): unknown;

  GetServiceTransport(): unknown;

  GetStoreItem(e: unknown, t: unknown): unknown;

  GetStoreItemDataRequest(e: unknown, t: unknown): unknown;

  GetStoreItemWithLegacyVisibilityCheck(e: unknown, t: unknown): unknown;

  GetTag(e: unknown): unknown;

  HintLoadStoreApps(e: unknown, t: unknown): Promise<unknown>;

  HintLoadStoreBundles(e: unknown, t: unknown): Promise<unknown>;

  HintLoadStoreItems(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown, a: unknown, s: unknown): Promise<number>;

  HintLoadStorePackages(e: unknown, t: unknown): Promise<unknown>;

  InternalHandleLoadStoreItems(e: unknown, t: unknown): Promise<number>;

  MarkStoreItemIDUnavailable(e: unknown): void;

  QueueAppRequest(appId: number, dataRequest: StoreBrowseItemDataRequest): Promise<number>;

  QueueBundleRequest(e: unknown, t: unknown): Promise<unknown>;

  QueueCreatorRequest(e: unknown, t: unknown): Promise<unknown>;

  QueueHubCategoryRequest(e: unknown, t: unknown): Promise<unknown>;

  QueueMultipleAppRequests(e: unknown, t: unknown): Promise<unknown>;

  QueueMultipleBundleRequests(e: unknown, t: unknown): Promise<unknown>;

  QueueMultipleCreatorRequests(e: unknown, t: unknown): Promise<unknown>;

  QueueMultipleHubCategoryRequests(e: unknown, t: unknown): Promise<unknown>;

  QueueMultiplePackageRequests(e: unknown, t: unknown): Promise<unknown>;

  QueueMultipleStoreItemRequests(e: unknown, t: unknown, r: unknown): Promise<unknown>;

  QueueMultipleTagRequests(e: unknown, t: unknown): Promise<unknown>;

  QueuePackageRequest(e: unknown, t: unknown): Promise<unknown>;

  QueueStoreItemRequest(storeItemId: number, storeItemType: StoreItemType, dataRequest: StoreBrowseItemDataRequest): Promise<unknown>;

  QueueTagRequest(e: unknown, t: unknown): Promise<unknown>;

  ReadItem(e: unknown, t: unknown): unknown;

  ReadResults(e: unknown, t: unknown): never[];

  ResetCache(): Promise<void>;

  SetReturnUnavailableItems(e: unknown): void;

  SetServiceTransport(e: unknown): void;

  SetSteamInterface(e: unknown): void;

  SortStoreItems(e: unknown): unknown;

  k_AlreadyResolvedBusy: Promise<unknown>;

  k_AlreadyResolvedInvalid: Promise<unknown>;

  k_AlreadyResolvedOK: Promise<unknown>;

  k_nMaxBatchSize: number;

  k_QueueWaitUntilRequestMS: number;

  m_bActivelyResettingCache: boolean;

  m_bInitialized: boolean;

  m_bReturnUnavailableItems: boolean;

  m_bUsePartnerAPI: boolean;

  m_mapApps: Map<number, StoreApp>;

  m_mapAppsInFlight: Map<unknown, unknown>;

  m_mapBundleInFlight: Map<unknown, unknown>;

  m_mapBundles: Map<number, StoreApp>;

  m_mapCreators: Map<number, StoreApp>;

  m_mapCreatorsInFlight: Map<unknown, unknown>;

  m_mapHubCategories: Map<unknown, unknown>;

  m_mapHubCategoriesInFlight: Map<unknown, unknown>;

  m_mapPackageInFlight: Map<unknown, unknown>;

  m_mapPackages: Map<number, StoreApp>;

  m_mapTags: Map<number, StoreApp>;

  m_mapTagsInFlight: Map<unknown, unknown>;

  m_PendingInfoPromise: undefined;

  m_PendingInfoResolve: undefined;

  m_PendingTimer: undefined;

  m_serviceTransport: ServiceTransport;

  m_setPendingAppInfo: Set<unknown>;

  m_setPendingBundleInfo: Set<unknown>;

  m_setPendingCreatorInfo: Set<unknown>;

  m_setPendingDataRequest: object;

  m_setPendingHubCategoryInfo: Set<unknown>;

  m_setPendingPackageInfo: Set<unknown>;

  m_setPendingTagInfo: Set<unknown>;

  m_setUnavailableApps: Set<number>;

  m_setUnavailableBundles: Set<number>;

  m_setUnavailableCreators: Set<number>;

  m_setUnavailableDueToCountryRestrictionApps: Set<number>;

  m_setUnavailableDueToCountryRestrictionBundles: Set<number>;

  m_setUnavailableDueToCountryRestrictionPackages: Set<number>;

  m_setUnavailableHubCategories: Set<unknown>;

  m_setUnavailablePackages: Set<number>;

  m_setUnavailableTags: Set<number>;
}

export interface StoreApp {
  BCheckDataRequestIncluded(e: unknown): void;

  BContainDataRequest(e: unknown): unknown;

  BHasAgeSafeScreenshots(): boolean;

  BHasDemo(): boolean;

  BHasHighlightTrailers(e: unknown): boolean;

  BHasSomeLanguageSupport(e: unknown): unknown;

  BHasStoreCategory(e: unknown): boolean;

  BHasTags(): boolean;

  BHasTrailers(e: unknown): unknown;

  BIsAgeSafeScreenshot(e: unknown): unknown;

  BIsApplicationOrTool(): boolean;

  BIsComingSoon(): unknown;

  BIsCustomComingSoonDisplay(): unknown;

  BIsEarlyAccess(): unknown;

  BIsFree(): unknown;

  BIsFreeTemporary(): unknown;

  BIsFreeWeekend(): boolean;

  BIsPrePurchase(): unknown;

  BIsReleased(): boolean;

  BIsSalePage(): unknown;

  BIsVisible(): unknown;

  BLimitedLaunchActive(): unknown;

  GetAllCreatorClanIDs(): unknown;

  GetAllDeveloperCreatorClans(): unknown;

  GetAllFranchiseCreatorClans(): unknown;

  GetAllLanguagesWithSomeSupport(): unknown;

  GetAllPublisherCreatorClans(): unknown;

  GetAllPurchaseOptions(): unknown;

  GetAllTrailers(): unknown;

  GetAppID(): unknown;

  GetAppIDToRun(): unknown;

  GetAppType(): unknown;

  GetAssets(): unknown;

  GetAssetsWithoutOverrides(): unknown;

  GetBestPurchaseOption(): unknown;

  GetBestPurchaseOriginalPriceFormatted(): unknown;

  GetBestPurchaseOriginalPriceInCents(): unknown;

  GetBestPurchasePriceFormatted(): unknown;

  GetBestPurchasePriceInCents(): number | undefined;

  GetCapsuleHeadline(): unknown;

  GetCommunityDiscussionForumsURL(): string | null;

  GetCommunityPageURL(): string | null;

  GetContentDescriptorIDs(): unknown;

  GetDataRequest(): unknown;

  GetDemoAppIDs(): unknown;

  GetDemoStandaloneStorePageAppIDs(): unknown;

  GetDeveloperNames(): unknown;

  GetFilteredReviewSummary(): unknown;

  GetFilteredReviewSummaryLanguage(): unknown;

  GetFormattedSteamReleaseDate(): unknown;

  GetFranchiseNames(): unknown;

  GetFreeWeekendEnd(): unknown;

  GetFreeWeekendPlayTextOverride(): unknown;

  GetID(): unknown;

  GetIncludedAppIDs(): unknown;

  GetIncludedAppIDsOrSelf(): unknown;

  GetIncludedAppTypes(): unknown;

  GetInternalName(): unknown;

  GetLinks(): unknown;

  GetMicroTrailer(e: unknown): unknown;

  GetName(): unknown;

  GetOriginalReleaseDateRTime(): unknown;

  GetParentAppID(): unknown;

  GetPlatforms(): unknown;

  GetPublisherNames(): unknown;

  /**
   * @param e default: !1
   */
  GetReleaseDateRTime(e?: boolean): unknown;

  GetSalePageVanityURL(): unknown;

  GetScreenshots(e: unknown): unknown;

  GetSelfPurchaseOption(): unknown;

  GetShortDescription(): unknown;

  GetStoreCategories_Controller(): unknown;

  GetStoreCategories_Features(): unknown;

  GetStoreCategories_SupportedPlayers(): unknown;

  GetStoreItemType(): unknown;

  /**
   * @param e default: !1
   */
  GetStorePageURL(e?: boolean): unknown;

  GetStorePageURLOverride(): unknown;

  GetStorePageURLWithOverride(): unknown;

  GetTagIDs(): unknown;

  GetTags(): unknown;

  GetUnfilteredReviewSummary(): unknown;

  GetUniqueID(): string;

  GetUserFilterFailure(): unknown;

  HasContentDescriptorID(e: unknown): unknown;

  HasDemoStandaloneStorePage(): boolean;

  MergeData(e: unknown, t: unknown): void;

  ReplaceBestPurchaseOption(e: unknown): void;

  k_regexSalePage: RegExp;

  m_Assets: Assets;

  m_AssetsWithoutOverrides?: Assets;

  m_BasicInfo?: StoreItem_BasicInfo;

  m_BestPurchaseOption: StoreItem_PurchaseOption;

  m_bIsComingSoon: boolean;

  m_bIsEarlyAccess: boolean;

  m_bIsFree: boolean;

  m_bIsFreeTemporary: boolean;

  m_bVisible: boolean;

  m_ContentDescriptorIDs: number[];

  m_DataRequested: StoreBrowseItemDataRequest;

  m_eAppType?: StoreAppType;

  m_eItemType: StoreItemType;

  m_freeWeekend: object;

  m_Platforms?: StoreItem_Platforms;

  m_RelatedItems: StoreItem_RelatedItems;

  m_ReleaseInfo?: StoreItem_ReleaseInfo;

  m_ReviewInfo?: StoreItem_Reviews;

  m_rgIncludedAppIDs: number[];

  m_rgIncludedAppTypes: number[];

  m_rgLinks?: StoreItem_Link[];

  m_rgPurchaseOptions?: StoreItem_PurchaseOption[];

  m_rgStoreTagIDs: number[];

  m_rgStoreTags: StoreItem_Tag[];

  m_rgSupportedLanguages?: StoreItem_SupportedLanguage[];

  m_Screenshots?: Screenshots;

  m_SelfPurchaseOption?: StoreItem_PurchaseOption;

  m_StoreCategories: StoreItem_Categories;

  m_strInternalName?: never;

  m_strName: string;

  m_strStoreURLPath: string;

  m_strStoreURLPathOverride?: string;

  m_Trailers?: Trailers;

  m_unAppID?: number;

  m_unID: number;

  m_userFilterFailure?: StoreBrowseFilterFailure;
}

export interface Assets {
  ConstructAssetURL(e: unknown, t: unknown): string;

  GetCommunityIconURL(): unknown;

  GetCommunityIconURL_Full(): unknown;

  GetHeaderURL(): unknown;

  GetHeroCapsuleURL(): unknown;

  GetHeroCapsuleURL_2x(): unknown;

  GetLibraryCapsuleURL(): unknown;

  GetLibraryCapsuleURL_2x(): unknown;

  GetLibraryHeroURL(): unknown;

  GetLibraryHeroURL_2x(): unknown;

  GetMainCapsuleURL(): unknown;

  GetPackageHeaderURL(): unknown;

  GetPageBackgroundURL(): unknown;

  GetRawPageBackgroundURL(): unknown;

  GetSmallCapsuleURL(): unknown;

  m_strCommunityIcon?: string;

  m_strCommunityIcon_Full?: string;

  m_strHeaderURL?: string;

  m_strHeroCapsuleURL?: string;

  m_strHeroCapsuleURL_2x?: string;

  m_strLibraryCapsuleURL?: string;

  m_strLibraryCapsuleURL_2x?: string;

  m_strLibraryHeroURL?: string;

  m_strLibraryHeroURL_2x?: string;

  m_strMainCapsuleURL?: string;

  m_strPackageHeaderURL?: string;

  m_strPageBackgroundURL?: string;

  m_strRawPageBackgroundURL?: string;

  m_strSmallCapsuleURL?: string;
}

export interface Screenshots {
  GetAllAgesAndMatureScreenshots(): unknown;

  GetOnlyAllAgesScreenshots(): unknown;

  m_rgAllScreenshots: string[];

  m_rgOnlyAllAgesScreenshots: string[];
}

export interface Trailers {
  BHasTrailers(e: unknown): boolean;

  GetAllTrailers(e: unknown): unknown[];

  GetHighlightTrailers(e: unknown): unknown;

  GetOtherTrailers(e: unknown): unknown;

  GetTrailerByID(e: unknown): unknown;

  m_highlightTrailers: HighlightTrailers[];

  m_highlightTrailersAllAges: HighlightTrailers[];

  m_mapTrailer: Map<number, HighlightTrailers>;

  m_otherTrailers: HighlightTrailers[];

  m_otherTrailersAllAges: HighlightTrailers[];
}

export interface HighlightTrailers {
  BIsAllAges(): unknown;

  ConstructAssetURL(e: unknown, t: unknown): string;

  ConstructScreenshotURL(e: unknown, t: unknown): string;

  ExtractAdaptiveTrailers(e: unknown, t: unknown): unknown;

  ExtractTrailerFormats(e: unknown, t: unknown): object | unknown;

  GetMicroTrailer(): unknown;

  GetName(): unknown;

  GetScreenshot(): unknown;

  GetTrailer480p(): unknown;

  GetTrailerCategory(): unknown;

  GetTrailerHls(): unknown;

  GetTrailerID(): unknown;

  GetTrailerMax(): unknown;

  GetTrailersDash(): unknown;

  m_bIsAllAges: boolean;

  m_eTrailerCategory: TrailerCategory;

  m_MicroTrailer: MicroTrailer;

  m_nBaseID: number;

  m_rgDashTrailers: string[];

  m_rgHlsTrailer?: string;

  m_strScreenshotFull?: string;

  m_strScreenshotMedium?: string;

  m_strTrailerName: string;

  m_Trailer480p: (MicroTrailer | object);

  m_TrailerMax: (MicroTrailer | object);
}

export interface MicroTrailer {
  strMP4URL: string;

  strWebMURL: string;
}
