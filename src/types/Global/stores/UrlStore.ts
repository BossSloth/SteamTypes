import { URL } from 'SteamClient/URL';

export interface UrlStore {
  BIsSteamWebsiteURL(url: string): boolean;

  /**
   * https://store.steampowered.com/points/shop/app/{appId}
   */
  BuildAppPointsShopURL(appId: number): string;

  BuildCachedLibraryAssetURL(folder: string, file: string, cacheBust?: number): string;

  BuildCachedStoreAssetURL(folder: string, file: string, cacheBust?: number): string;

  BuildCustomAssetURL(appId: string, imageName: string, extension: string, version: string): string;

  BuildLegacyCachedLibraryAssetURL(folder: string, file: string, cacheBust?: number): string;

  BuildLibraryAssetURL(folder: string, file: string, timestamp?: number): string;

  BuildSteamURL(baseUrl: string, ...params: string[]): string;

  BuildStoreAppDlcURL(appId: number, context?: string | null): string;

  /**
   * https://store.steampowered.com/app/{appId}/{query}
   */
  BuildStoreAppURL(appId: number, context?: string | null): string;

  /**
   * https://shared.steamstatic.com/store_item_assets/steam/apps/{baseUrl}/{path}
   */
  BuildStoreAssetURL(folder: string, file: string, _unused?: string): string;

  /**
   * ResolveURL("AvatarBaseURL")
   */
  GetAvatarBaseURL(): string;

  /**
   * ResolveURL("BaseURLSharedCDN")
   */
  GetBaseURLSharedCDN(): string;

  /**
   * ResolveURL("ClanAssetCDN"
   */
  GetClanCDNAssetURL(): string;

  /**
   * ResolveURL("CommunityImages") + "assets/"
   */
  GetCommunityCDNAssetURL(): string;

  /**
   * ResolveURL("CommunityCDN")
   */
  GetCommunityCDNURL(): string;

  /**
   * ResolveURL("CommunityImages")
   */
  GetCommunityImageURL(): string;

  /**
   * ResolveURL("CommunityFrontPage")
   */
  GetCommunityURL(): string;

  /**
   * ResolveURL("HelpFrontPage")
   */
  GetHelpURL(): string;

  /**
   * Get all {@link SteamUrl}s that match the given URL.
   */
  GetMatchingUrls(url: string): SteamUrl[];

  GetMediaCDNUrl(): 'https://cdn.steamstatic.com/';

  GetParentalFeature(steamUrl: SteamWebURL): URLFeature;

  GetParentalFeatureForFullUrl(url: string): URLFeature;

  /**
   * ResolveURL("StoreAppImage")
   */
  GetStoreAppImageURL(): string;

  /**
   * ResolveURL("StoreCDN")
   */
  GetStoreCDNURL(): string;

  /**
   * ResolveURL("StoreGreatOnDeck")
   */
  GetStoreGreatOnDeckURL(): string;

  GetStoreGreatOnFrameURL(): unknown;

  /**
   * GetBaseURLSharedCDN() + "store_item_assets/steam/apps/"
   */
  GetStoreIconBaseURL(): string;

  /**
   * ResolveURL("StoreFrontPage")
   */
  GetStoreURL(): string;

  /**
   * ResolveURL("StoreVR")
   */
  GetStoreVRURL(): string;

  /**
   * ResolveURL("VideoCDN")
   */
  GetVideoCDNAssetURL(): string;

  /**
   * ResolveURL("WebAPI")
   */
  GetWebApiURL(): string;

  /**
   * Initializes all listeners on this object.
   * This shouldn't be called manually unless you know what you're doing.
   */
  Init(): Promise<void>;

  NavigateToSteamURLInOwningWindow(options: unknown, urlKey: string, ...urlParams: string[]): void;

  /**
   * Is registered to {@link URL.RegisterForSteamURLChanges}
   */
  onURLChanges(...args: Parameters<Parameters<URL['RegisterForSteamURLChanges']>[0]>): void;

  ResolveURL(steamUrl: SteamWebURL, ...params: unknown[]): SteamUrl['url'] | undefined;

  generation: number;

  m_nGeneration: number;

  m_steamUrls: m_steamUrls;
}

export interface m_steamUrls {
  allnotifications: SteamUrl;

  AllNotifications: SteamUrl;

  apphoverpublic: SteamUrl;

  AppHoverPublic: SteamUrl;

  apphoverpublicfull: SteamUrl;

  AppHoverPublicFull: SteamUrl;

  appnewspage: SteamUrl;

  AppNewsPage: SteamUrl;

  asyncgames: SteamUrl;

  AsyncGames: SteamUrl;

  avatarbaseurl: SteamUrl;

  AvatarBaseURL: SteamUrl;

  baseurlsharedcdn: SteamUrl;

  BaseURLSharedCDN: SteamUrl;

  chatroot: SteamUrl;

  ChatRoot: SteamUrl;

  claimentitlements: SteamUrl;

  ClaimEntitlements: SteamUrl;

  clanassetcdn: SteamUrl;

  ClanAssetCDN: SteamUrl;

  commentnotifications: SteamUrl;

  CommentNotifications: SteamUrl;

  communityaddfriends: SteamUrl;

  CommunityAddFriends: SteamUrl;

  communitycdn: SteamUrl;

  CommunityCDN: SteamUrl;

  communityfilepage: SteamUrl;

  CommunityFilePage: SteamUrl;

  communityfriendsthatplay: SteamUrl;

  CommunityFriendsThatPlay: SteamUrl;

  communityfrontpage: SteamUrl;

  CommunityFrontPage: SteamUrl;

  communitygroupsearch: SteamUrl;

  CommunityGroupSearch: SteamUrl;

  communityhome: SteamUrl;

  CommunityHome: SteamUrl;

  communityimages: SteamUrl;

  CommunityImages: SteamUrl;

  communityinventory: SteamUrl;

  CommunityInventory: SteamUrl;

  communitymarket: SteamUrl;

  CommunityMarket: SteamUrl;

  communitymarketapp: SteamUrl;

  CommunityMarketApp: SteamUrl;

  communityrecommendations: SteamUrl;

  CommunityRecommendations: SteamUrl;

  communityscreenshots: SteamUrl;

  CommunityScreenshots: SteamUrl;

  communitysinglescreenshot: SteamUrl;

  CommunitySingleScreenshot: SteamUrl;

  currentlyplayedwith: SteamUrl;

  CurrentlyPlayedWith: SteamUrl;

  eventannouncementpage: SteamUrl;

  EventAnnouncementPage: SteamUrl;

  familymanagement: SteamUrl;

  FamilyManagement: SteamUrl;

  familysharing: SteamUrl;

  FamilySharing: SteamUrl;

  gamehub: SteamUrl;

  GameHub: SteamUrl;

  gamehubbroadcasts: SteamUrl;

  GameHubBroadcasts: SteamUrl;

  gamehubdiscussions: SteamUrl;

  GameHubDiscussions: SteamUrl;

  gamehubguides: SteamUrl;

  GameHubGuides: SteamUrl;

  gamehubnews: SteamUrl;

  GameHubNews: SteamUrl;

  gamehubreviews: SteamUrl;

  GameHubReviews: SteamUrl;

  globalachievementstatspage: SteamUrl;

  GlobalAchievementStatsPage: SteamUrl;

  globalleaderboardspage: SteamUrl;

  GlobalLeaderboardsPage: SteamUrl;

  groupsteamidpage: SteamUrl;

  GroupSteamIDPage: SteamUrl;

  hardwaresurvey: SteamUrl;

  HardwareSurvey: SteamUrl;

  helpapppage: SteamUrl;

  HelpAppPage: SteamUrl;

  helpchangeemail: SteamUrl;

  HelpChangeEmail: SteamUrl;

  helpchangepassword: SteamUrl;

  HelpChangePassword: SteamUrl;

  helpfaq: SteamUrl;

  HelpFAQ: SteamUrl;

  helpfrontpage: SteamUrl;

  HelpFrontPage: SteamUrl;

  helpvacbans: SteamUrl;

  HelpVacBans: SteamUrl;

  helpwithlogin: SteamUrl;

  HelpWithLogin: SteamUrl;

  helpwithlogininfo: SteamUrl;

  HelpWithLoginInfo: SteamUrl;

  helpwithsteamguardcode: SteamUrl;

  HelpWithSteamGuardCode: SteamUrl;

  itemstoredetailpage: SteamUrl;

  ItemStoreDetailPage: SteamUrl;

  itemstorepage: SteamUrl;

  ItemStorePage: SteamUrl;

  jointrade: SteamUrl;

  JoinTrade: SteamUrl;

  legalinformation: SteamUrl;

  LegalInformation: SteamUrl;

  libraryappdetails: SteamUrl;

  LibraryAppDetails: SteamUrl;

  libraryappreview: SteamUrl;

  LibraryAppReview: SteamUrl;

  libraryfeaturedbroadcasts: SteamUrl;

  LibraryFeaturedBroadcasts: SteamUrl;

  managegiftspage: SteamUrl;

  ManageGiftsPage: SteamUrl;

  managesteamguard: SteamUrl;

  ManageSteamGuard: SteamUrl;

  mobile: SteamUrl;

  Mobile: SteamUrl;

  moderatormessages: SteamUrl;

  ModeratorMessages: SteamUrl;

  myhelprequests: SteamUrl;

  MyHelpRequests: SteamUrl;

  newshomepage: SteamUrl;

  NewsHomePage: SteamUrl;

  officialgamegrouppage: SteamUrl;

  OfficialGameGroupPage: SteamUrl;

  parentalblocked: SteamUrl;

  ParentalBlocked: SteamUrl;

  parentalsetup: SteamUrl;

  ParentalSetup: SteamUrl;

  pendingfriends: SteamUrl;

  PendingFriends: SteamUrl;

  pendinggift: SteamUrl;

  PendingGift: SteamUrl;

  pointsshop: SteamUrl;

  PointsShop: SteamUrl;

  privacypolicy: SteamUrl;

  PrivacyPolicy: SteamUrl;

  recommendgame: SteamUrl;

  RecommendGame: SteamUrl;

  redeemwalletvoucher: SteamUrl;

  RedeemWalletVoucher: SteamUrl;

  registerkey: SteamUrl;

  RegisterKey: SteamUrl;

  registerkeynoparams: SteamUrl;

  RegisterKeyNoParams: SteamUrl;

  ssa: SteamUrl;

  SSA: SteamUrl;

  steamannouncements: SteamUrl;

  SteamAnnouncements: SteamUrl;

  steamclientbetabugreports: SteamUrl;

  SteamClientBetaBugReports: SteamUrl;

  steamclientbetanewspage: SteamUrl;

  SteamClientBetaNewsPage: SteamUrl;

  steamclientbetanewspagefancy: SteamUrl;

  SteamClientBetaNewsPageFancy: SteamUrl;

  steamclientnewspage: SteamUrl;

  SteamClientNewsPage: SteamUrl;

  steamclientpatchnotes: SteamUrl;

  SteamClientPatchNotes: SteamUrl;

  steamdiscussions: SteamUrl;

  SteamDiscussions: SteamUrl;

  steamidachievementspage: SteamUrl;

  SteamIDAchievementsPage: SteamUrl;

  steamidapptradingcardspage: SteamUrl;

  SteamIDAppTradingCardsPage: SteamUrl;

  steamidbadgeinfo: SteamUrl;

  SteamIDBadgeInfo: SteamUrl;

  steamidbadgepage: SteamUrl;

  SteamIDBadgePage: SteamUrl;

  steamidbroadcastpage: SteamUrl;

  SteamIDBroadcastPage: SteamUrl;

  steamideditpage: SteamUrl;

  SteamIDEditPage: SteamUrl;

  steamideditprivacypage: SteamUrl;

  SteamIDEditPrivacyPage: SteamUrl;

  steamidfriendslist: SteamUrl;

  SteamIDFriendsList: SteamUrl;

  steamidfriendspage: SteamUrl;

  SteamIDFriendsPage: SteamUrl;

  steamidgroupspage: SteamUrl;

  SteamIDGroupsPage: SteamUrl;

  steamidmyprofile: SteamUrl;

  SteamIDMyProfile: SteamUrl;

  steamidpage: SteamUrl;

  SteamIDPage: SteamUrl;

  steamlanguage: SteamUrl;

  SteamLanguage: SteamUrl;

  steampreferences: SteamUrl;

  SteamPreferences: SteamUrl;

  steamvrhmdhelp: SteamUrl;

  SteamVRHMDHelp: SteamUrl;

  steamworkshop: SteamUrl;

  SteamWorkshop: SteamUrl;

  steamworkshoppage: SteamUrl;

  SteamWorkshopPage: SteamUrl;

  steamworkshopsubscriptions: SteamUrl;

  SteamWorkshopSubscriptions: SteamUrl;

  steamworkshopupdatedsubscriptions: SteamUrl;

  SteamWorkshopUpdatedSubscriptions: SteamUrl;

  storeaccount: SteamUrl;

  StoreAccount: SteamUrl;

  storeaccountgatedaccessapp: SteamUrl;

  StoreAccountGatedAccessApp: SteamUrl;

  storeaddfundspage: SteamUrl;

  StoreAddFundsPage: SteamUrl;

  storeapphover: SteamUrl;

  StoreAppHover: SteamUrl;

  storeappimages: SteamUrl;

  StoreAppImages: SteamUrl;

  storeapppage: SteamUrl;

  StoreAppPage: SteamUrl;

  storeapppageaddtocart: SteamUrl;

  StoreAppPageAddToCart: SteamUrl;

  storecart: SteamUrl;

  StoreCart: SteamUrl;

  storecdn: SteamUrl;

  StoreCDN: SteamUrl;

  storedlcpage: SteamUrl;

  StoreDlcPage: SteamUrl;

  storeexplore: SteamUrl;

  StoreExplore: SteamUrl;

  storeexplorenew: SteamUrl;

  StoreExploreNew: SteamUrl;

  storefreetoplay: SteamUrl;

  StoreFreeToPlay: SteamUrl;

  storefrontpage: SteamUrl;

  StoreFrontPage: SteamUrl;

  storegamesearchpage: SteamUrl;

  StoreGameSearchPage: SteamUrl;

  storegreatondeck: SteamUrl;

  StoreGreatOnDeck: SteamUrl;

  storegreatonframe: SteamUrl;

  StoreGreatOnFrame: SteamUrl;

  storepublisherpage: SteamUrl;

  StorePublisherPage: SteamUrl;

  storespecials: SteamUrl;

  StoreSpecials: SteamUrl;

  storestats: SteamUrl;

  StoreStats: SteamUrl;

  storevr: SteamUrl;

  StoreVR: SteamUrl;

  storewebmicrotxnpage: SteamUrl;

  StoreWebMicroTxnPage: SteamUrl;

  supportmessages: SteamUrl;

  SupportMessages: SteamUrl;

  textfiltersettings: SteamUrl;

  TextFilterSettings: SteamUrl;

  todaypage: SteamUrl;

  TodayPage: SteamUrl;

  tradeoffers: SteamUrl;

  TradeOffers: SteamUrl;

  userachievementspage: SteamUrl;

  UserAchievementsPage: SteamUrl;

  userleaderboardspage: SteamUrl;

  UserLeaderboardsPage: SteamUrl;

  userstatspage: SteamUrl;

  UserStatsPage: SteamUrl;

  userwishlist: SteamUrl;

  UserWishlist: SteamUrl;

  videocdn: SteamUrl;

  VideoCDN: SteamUrl;

  watchvideo: SteamUrl;

  WatchVideo: SteamUrl;

  webapi: SteamUrl;

  WebAPI: SteamUrl;

  workshopeula: SteamUrl;

  WorkshopEula: SteamUrl;

  yearinreview: SteamUrl;

  YearInReview: SteamUrl;
}

/**
 * @todo figure out a better way to type this so it isn't always marked wrong by validate types
 */
export interface SteamUrl {
  bDuplicate?: boolean;

  feature: URLFeature;

  regexMatchURL?: RegExp;

  url: string;
}

export enum URLFeature {
  Unknown = 0,
  Store,
  Community,
  /** Things like inventory, badges, profile, etc. */
  CommunityPersonal,
  Friends,
  News,
  /** Only includes JoinTrade and TradeOffers */
  Trading,
  Parental = 10,
}

export type SteamWebURL = keyof m_steamUrls;
