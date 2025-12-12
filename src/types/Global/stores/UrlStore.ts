import { URL } from 'SteamClient/URL';

export interface UrlStore {
  BIsSteamURL(url: string): boolean;

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
  AllNotifications: SteamUrl;

  allnotifications: SteamUrl;

  AppHoverPublic: SteamUrl;

  apphoverpublic: SteamUrl;

  AppHoverPublicFull: SteamUrl;

  apphoverpublicfull: SteamUrl;

  AppNewsPage: SteamUrl;

  appnewspage: SteamUrl;

  AsyncGames: SteamUrl;

  asyncgames: SteamUrl;

  AvatarBaseURL: SteamUrl;

  avatarbaseurl: SteamUrl;

  BaseURLSharedCDN: SteamUrl;

  baseurlsharedcdn: SteamUrl;

  Chat: SteamUrl;

  chat: SteamUrl;

  ChatRoot: SteamUrl;

  chatroot: SteamUrl;

  ClaimEntitlements: SteamUrl;

  claimentitlements: SteamUrl;

  ClanAssetCDN: SteamUrl;

  clanassetcdn: SteamUrl;

  CommentNotifications: SteamUrl;

  commentnotifications: SteamUrl;

  CommunityAddFriends: SteamUrl;

  communityaddfriends: SteamUrl;

  CommunityCDN: SteamUrl;

  communitycdn: SteamUrl;

  CommunityFilePage: SteamUrl;

  communityfilepage: SteamUrl;

  CommunityFriendsThatPlay: SteamUrl;

  communityfriendsthatplay: SteamUrl;

  CommunityFrontPage: SteamUrl;

  communityfrontpage: SteamUrl;

  CommunityGroupSearch: SteamUrl;

  communitygroupsearch: SteamUrl;

  CommunityHome: SteamUrl;

  communityhome: SteamUrl;

  CommunityImages: SteamUrl;

  communityimages: SteamUrl;

  CommunityInventory: SteamUrl;

  communityinventory: SteamUrl;

  CommunityMarket: SteamUrl;

  communitymarket: SteamUrl;

  CommunityMarketApp: SteamUrl;

  communitymarketapp: SteamUrl;

  CommunityRecommendations: SteamUrl;

  communityrecommendations: SteamUrl;

  CommunityScreenshots: SteamUrl;

  communityscreenshots: SteamUrl;

  CommunitySingleScreenshot: SteamUrl;

  communitysinglescreenshot: SteamUrl;

  CurrentlyPlayedWith: SteamUrl;

  currentlyplayedwith: SteamUrl;

  EventAnnouncementPage: SteamUrl;

  eventannouncementpage: SteamUrl;

  FamilyManagement: SteamUrl;

  familymanagement: SteamUrl;

  FamilySharing: SteamUrl;

  familysharing: SteamUrl;

  GameHub: SteamUrl;

  gamehub: SteamUrl;

  GameHubBroadcasts: SteamUrl;

  gamehubbroadcasts: SteamUrl;

  GameHubDiscussions: SteamUrl;

  gamehubdiscussions: SteamUrl;

  GameHubGuides: SteamUrl;

  gamehubguides: SteamUrl;

  GameHubNews: SteamUrl;

  gamehubnews: SteamUrl;

  GameHubReviews: SteamUrl;

  gamehubreviews: SteamUrl;

  GlobalAchievementStatsPage: SteamUrl;

  globalachievementstatspage: SteamUrl;

  GlobalLeaderboardsPage: SteamUrl;

  globalleaderboardspage: SteamUrl;

  GroupSteamIDPage: SteamUrl;

  groupsteamidpage: SteamUrl;

  HardwareSurvey: SteamUrl;

  hardwaresurvey: SteamUrl;

  HelpAppPage: SteamUrl;

  helpapppage: SteamUrl;

  HelpChangeEmail: SteamUrl;

  helpchangeemail: SteamUrl;

  HelpChangePassword: SteamUrl;

  helpchangepassword: SteamUrl;

  HelpFAQ: SteamUrl;

  helpfaq: SteamUrl;

  HelpFrontPage: SteamUrl;

  helpfrontpage: SteamUrl;

  HelpVacBans: SteamUrl;

  helpvacbans: SteamUrl;

  HelpWithLogin: SteamUrl;

  helpwithlogin: SteamUrl;

  HelpWithLoginInfo: SteamUrl;

  helpwithlogininfo: SteamUrl;

  HelpWithSteamGuardCode: SteamUrl;

  helpwithsteamguardcode: SteamUrl;

  ItemStoreDetailPage: SteamUrl;

  itemstoredetailpage: SteamUrl;

  ItemStorePage: SteamUrl;

  itemstorepage: SteamUrl;

  JoinTrade: SteamUrl;

  jointrade: SteamUrl;

  LegalInformation: SteamUrl;

  legalinformation: SteamUrl;

  LibraryAppDetails: SteamUrl;

  libraryappdetails: SteamUrl;

  LibraryAppReview: SteamUrl;

  libraryappreview: SteamUrl;

  LibraryFeaturedBroadcasts: SteamUrl;

  libraryfeaturedbroadcasts: SteamUrl;

  ManageGiftsPage: SteamUrl;

  managegiftspage: SteamUrl;

  ManageSteamGuard: SteamUrl;

  managesteamguard: SteamUrl;

  Mobile: SteamUrl;

  mobile: SteamUrl;

  ModeratorMessages: SteamUrl;

  moderatormessages: SteamUrl;

  MyHelpRequests: SteamUrl;

  myhelprequests: SteamUrl;

  NewsHomePage: SteamUrl;

  newshomepage: SteamUrl;

  OfficialGameGroupPage: SteamUrl;

  officialgamegrouppage: SteamUrl;

  ParentalBlocked: SteamUrl;

  parentalblocked: SteamUrl;

  ParentalSetup: SteamUrl;

  parentalsetup: SteamUrl;

  PendingFriends: SteamUrl;

  pendingfriends: SteamUrl;

  PendingGift: SteamUrl;

  pendinggift: SteamUrl;

  PointsShop: SteamUrl;

  pointsshop: SteamUrl;

  PrivacyPolicy: SteamUrl;

  privacypolicy: SteamUrl;

  RecommendGame: SteamUrl;

  recommendgame: SteamUrl;

  RedeemWalletVoucher: SteamUrl;

  redeemwalletvoucher: SteamUrl;

  RegisterKey: SteamUrl;

  registerkey: SteamUrl;

  RegisterKeyNoParams: SteamUrl;

  registerkeynoparams: SteamUrl;

  SSA: SteamUrl;

  ssa: SteamUrl;

  SteamAnnouncements: SteamUrl;

  steamannouncements: SteamUrl;

  SteamClientBetaBugReports: SteamUrl;

  steamclientbetabugreports: SteamUrl;

  SteamClientBetaNewsPage: SteamUrl;

  steamclientbetanewspage: SteamUrl;

  SteamClientBetaNewsPageFancy: SteamUrl;

  steamclientbetanewspagefancy: SteamUrl;

  SteamClientBetaPatchNotes: SteamUrl;

  steamclientbetapatchnotes: SteamUrl;

  SteamClientNewsPage: SteamUrl;

  steamclientnewspage: SteamUrl;

  SteamClientPatchNotes: SteamUrl;

  steamclientpatchnotes: SteamUrl;

  SteamDiscussions: SteamUrl;

  steamdiscussions: SteamUrl;

  SteamIDAchievementsPage: SteamUrl;

  steamidachievementspage: SteamUrl;

  SteamIDAppTradingCardsPage: SteamUrl;

  steamidapptradingcardspage: SteamUrl;

  SteamIDBadgeInfo: SteamUrl;

  steamidbadgeinfo: SteamUrl;

  SteamIDBadgePage: SteamUrl;

  steamidbadgepage: SteamUrl;

  SteamIDBroadcastPage: SteamUrl;

  steamidbroadcastpage: SteamUrl;

  SteamIDEditPage: SteamUrl;

  steamideditpage: SteamUrl;

  SteamIDEditPrivacyPage: SteamUrl;

  steamideditprivacypage: SteamUrl;

  SteamIDFriendsList: SteamUrl;

  steamidfriendslist: SteamUrl;

  SteamIDFriendsPage: SteamUrl;

  steamidfriendspage: SteamUrl;

  SteamIDGroupsPage: SteamUrl;

  steamidgroupspage: SteamUrl;

  SteamIDMyProfile: SteamUrl;

  steamidmyprofile: SteamUrl;

  SteamIDPage: SteamUrl;

  steamidpage: SteamUrl;

  SteamLanguage: SteamUrl;

  steamlanguage: SteamUrl;

  SteamPreferences: SteamUrl;

  steampreferences: SteamUrl;

  SteamVRHMDHelp: SteamUrl;

  steamvrhmdhelp: SteamUrl;

  SteamWorkshop: SteamUrl;

  steamworkshop: SteamUrl;

  SteamWorkshopPage: SteamUrl;

  steamworkshoppage: SteamUrl;

  SteamWorkshopSubscriptions: SteamUrl;

  steamworkshopsubscriptions: SteamUrl;

  SteamWorkshopUpdatedSubscriptions: SteamUrl;

  steamworkshopupdatedsubscriptions: SteamUrl;

  StoreAccount: SteamUrl;

  storeaccount: SteamUrl;

  StoreAccountGatedAccessApp: SteamUrl;

  storeaccountgatedaccessapp: SteamUrl;

  StoreAddFundsPage: SteamUrl;

  storeaddfundspage: SteamUrl;

  StoreAppHover: SteamUrl;

  storeapphover: SteamUrl;

  StoreAppImages: SteamUrl;

  storeappimages: SteamUrl;

  StoreAppPage: SteamUrl;

  storeapppage: SteamUrl;

  StoreAppPageAddToCart: SteamUrl;

  storeapppageaddtocart: SteamUrl;

  StoreCart: SteamUrl;

  storecart: SteamUrl;

  StoreCDN: SteamUrl;

  storecdn: SteamUrl;

  StoreDlcPage: SteamUrl;

  storedlcpage: SteamUrl;

  StoreExplore: SteamUrl;

  storeexplore: SteamUrl;

  StoreExploreNew: SteamUrl;

  storeexplorenew: SteamUrl;

  StoreFreeToPlay: SteamUrl;

  storefreetoplay: SteamUrl;

  StoreFrontPage: SteamUrl;

  storefrontpage: SteamUrl;

  StoreGameSearchPage: SteamUrl;

  storegamesearchpage: SteamUrl;

  StoreGreatOnDeck: SteamUrl;

  storegreatondeck: SteamUrl;

  StorePublisherPage: SteamUrl;

  storepublisherpage: SteamUrl;

  StoreSpecials: SteamUrl;

  storespecials: SteamUrl;

  StoreStats: SteamUrl;

  storestats: SteamUrl;

  StoreVR: SteamUrl;

  storevr: SteamUrl;

  StoreWebMicroTxnPage: SteamUrl;

  storewebmicrotxnpage: SteamUrl;

  SupportMessages: SteamUrl;

  supportmessages: SteamUrl;

  TextFilterSettings: SteamUrl;

  textfiltersettings: SteamUrl;

  TodayPage: SteamUrl;

  todaypage: SteamUrl;

  TradeOffers: SteamUrl;

  tradeoffers: SteamUrl;

  UserAchievementsPage: SteamUrl;

  userachievementspage: SteamUrl;

  UserLeaderboardsPage: SteamUrl;

  userleaderboardspage: SteamUrl;

  UserStatsPage: SteamUrl;

  userstatspage: SteamUrl;

  UserWishlist: SteamUrl;

  userwishlist: SteamUrl;

  VideoCDN: SteamUrl;

  videocdn: SteamUrl;

  WatchVideo: SteamUrl;

  watchvideo: SteamUrl;

  WebAPI: SteamUrl;

  webapi: SteamUrl;

  WorkshopEula: SteamUrl;

  workshopeula: SteamUrl;

  YearInReview: SteamUrl;

  yearinreview: SteamUrl;
}

export interface SteamUrl {
  bDuplicate?: boolean;

  feature: URLFeature;

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
