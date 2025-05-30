import { URL } from '../SteamClient';

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

  BuildStoreAppDlcURL(appId: number, context: string): string;

  /**
   * https://store.steampowered.com/app/{appId}/{query}
   */
  BuildStoreAppURL(appId: number, context: string): string;

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

  allnotifications: SteamUrlDuplicate;

  AppHoverPublic: SteamUrl;

  apphoverpublic: SteamUrlDuplicate;

  AppHoverPublicFull: SteamUrl;

  apphoverpublicfull: SteamUrlDuplicate;

  AppNewsPage: SteamUrl;

  appnewspage: SteamUrlDuplicate;

  AsyncGames: SteamUrl;

  asyncgames: SteamUrlDuplicate;

  AvatarBaseURL: SteamUrl;

  avatarbaseurl: SteamUrlDuplicate;

  BaseURLSharedCDN: SteamUrl;

  baseurlsharedcdn: SteamUrlDuplicate;

  Chat: SteamUrl;

  chat: SteamUrlDuplicate;

  ChatRoot: SteamUrl;

  chatroot: SteamUrlDuplicate;

  ClaimEntitlements: SteamUrl;

  claimentitlements: SteamUrlDuplicate;

  ClanAssetCDN: SteamUrl;

  clanassetcdn: SteamUrlDuplicate;

  CommentNotifications: SteamUrl;

  commentnotifications: SteamUrlDuplicate;

  CommunityAddFriends: SteamUrl;

  communityaddfriends: SteamUrlDuplicate;

  CommunityCDN: SteamUrl;

  communitycdn: SteamUrlDuplicate;

  CommunityFilePage: SteamUrl;

  communityfilepage: SteamUrlDuplicate;

  CommunityFriendsThatPlay: SteamUrl;

  communityfriendsthatplay: SteamUrlDuplicate;

  CommunityFrontPage: SteamUrl;

  communityfrontpage: SteamUrlDuplicate;

  CommunityGroupSearch: SteamUrl;

  communitygroupsearch: SteamUrlDuplicate;

  CommunityHome: SteamUrl;

  communityhome: SteamUrlDuplicate;

  CommunityImages: SteamUrl;

  communityimages: SteamUrlDuplicate;

  CommunityInventory: SteamUrl;

  communityinventory: SteamUrlDuplicate;

  CommunityMarket: SteamUrl;

  communitymarket: SteamUrlDuplicate;

  CommunityMarketApp: SteamUrl;

  communitymarketapp: SteamUrlDuplicate;

  CommunityRecommendations: SteamUrl;

  communityrecommendations: SteamUrlDuplicate;

  CommunityScreenshots: SteamUrl;

  communityscreenshots: SteamUrlDuplicate;

  CommunitySingleScreenshot: SteamUrl;

  communitysinglescreenshot: SteamUrlDuplicate;

  CurrentlyPlayedWith: SteamUrl;

  currentlyplayedwith: SteamUrlDuplicate;

  EventAnnouncementPage: SteamUrl;

  eventannouncementpage: SteamUrlDuplicate;

  FamilyManagement: SteamUrl;

  familymanagement: SteamUrlDuplicate;

  FamilySharing: SteamUrl;

  familysharing: SteamUrlDuplicate;

  GameHub: SteamUrl;

  gamehub: SteamUrlDuplicate;

  GameHubBroadcasts: SteamUrl;

  gamehubbroadcasts: SteamUrlDuplicate;

  GameHubDiscussions: SteamUrl;

  gamehubdiscussions: SteamUrlDuplicate;

  GameHubGuides: SteamUrl;

  gamehubguides: SteamUrlDuplicate;

  GameHubNews: SteamUrl;

  gamehubnews: SteamUrlDuplicate;

  GameHubReviews: SteamUrl;

  gamehubreviews: SteamUrlDuplicate;

  GlobalAchievementStatsPage: SteamUrl;

  globalachievementstatspage: SteamUrlDuplicate;

  GlobalLeaderboardsPage: SteamUrl;

  globalleaderboardspage: SteamUrlDuplicate;

  GroupSteamIDPage: SteamUrl;

  groupsteamidpage: SteamUrlDuplicate;

  HardwareSurvey: SteamUrl;

  hardwaresurvey: SteamUrlDuplicate;

  HelpAppPage: SteamUrl;

  helpapppage: SteamUrlDuplicate;

  HelpChangeEmail: SteamUrl;

  helpchangeemail: SteamUrlDuplicate;

  HelpChangePassword: SteamUrl;

  helpchangepassword: SteamUrlDuplicate;

  HelpFAQ: SteamUrl;

  helpfaq: SteamUrlDuplicate;

  HelpFrontPage: SteamUrl;

  helpfrontpage: SteamUrlDuplicate;

  HelpVacBans: SteamUrl;

  helpvacbans: SteamUrlDuplicate;

  HelpWithLogin: SteamUrl;

  helpwithlogin: SteamUrlDuplicate;

  HelpWithLoginInfo: SteamUrl;

  helpwithlogininfo: SteamUrlDuplicate;

  HelpWithSteamGuardCode: SteamUrl;

  helpwithsteamguardcode: SteamUrlDuplicate;

  ItemStoreDetailPage: SteamUrl;

  itemstoredetailpage: SteamUrlDuplicate;

  ItemStorePage: SteamUrl;

  itemstorepage: SteamUrlDuplicate;

  JoinTrade: SteamUrl;

  jointrade: SteamUrlDuplicate;

  LegalInformation: SteamUrl;

  legalinformation: SteamUrlDuplicate;

  LibraryAppDetails: SteamUrl;

  libraryappdetails: SteamUrlDuplicate;

  LibraryAppReview: SteamUrl;

  libraryappreview: SteamUrlDuplicate;

  LibraryFeaturedBroadcasts: SteamUrl;

  libraryfeaturedbroadcasts: SteamUrlDuplicate;

  ManageGiftsPage: SteamUrl;

  managegiftspage: SteamUrlDuplicate;

  ManageSteamGuard: SteamUrl;

  managesteamguard: SteamUrlDuplicate;

  Mobile: SteamUrl;

  mobile: SteamUrlDuplicate;

  ModeratorMessages: SteamUrl;

  moderatormessages: SteamUrlDuplicate;

  MyHelpRequests: SteamUrl;

  myhelprequests: SteamUrlDuplicate;

  NewsHomePage: SteamUrl;

  newshomepage: SteamUrlDuplicate;

  OfficialGameGroupPage: SteamUrl;

  officialgamegrouppage: SteamUrlDuplicate;

  ParentalBlocked: SteamUrl;

  parentalblocked: SteamUrlDuplicate;

  ParentalSetup: SteamUrl;

  parentalsetup: SteamUrlDuplicate;

  PendingFriends: SteamUrl;

  pendingfriends: SteamUrlDuplicate;

  PendingGift: SteamUrl;

  pendinggift: SteamUrlDuplicate;

  PointsShop: SteamUrl;

  pointsshop: SteamUrlDuplicate;

  PrivacyPolicy: SteamUrl;

  privacypolicy: SteamUrlDuplicate;

  RecommendGame: SteamUrl;

  recommendgame: SteamUrlDuplicate;

  RedeemWalletVoucher: SteamUrl;

  redeemwalletvoucher: SteamUrlDuplicate;

  RegisterKey: SteamUrl;

  registerkey: SteamUrlDuplicate;

  RegisterKeyNoParams: SteamUrl;

  registerkeynoparams: SteamUrlDuplicate;

  SSA: SteamUrl;

  ssa: SteamUrlDuplicate;

  SteamAnnouncements: SteamUrl;

  steamannouncements: SteamUrlDuplicate;

  SteamClientBetaBugReports: SteamUrl;

  steamclientbetabugreports: SteamUrlDuplicate;

  SteamClientBetaNewsPage: SteamUrl;

  steamclientbetanewspage: SteamUrlDuplicate;

  SteamClientBetaNewsPageFancy: SteamUrl;

  steamclientbetanewspagefancy: SteamUrlDuplicate;

  SteamClientBetaPatchNotes: SteamUrl;

  steamclientbetapatchnotes: SteamUrlDuplicate;

  SteamClientNewsPage: SteamUrl;

  steamclientnewspage: SteamUrlDuplicate;

  SteamClientPatchNotes: SteamUrl;

  steamclientpatchnotes: SteamUrlDuplicate;

  SteamDiscussions: SteamUrl;

  steamdiscussions: SteamUrlDuplicate;

  SteamIDAchievementsPage: SteamUrl;

  steamidachievementspage: SteamUrlDuplicate;

  SteamIDAppTradingCardsPage: SteamUrl;

  steamidapptradingcardspage: SteamUrlDuplicate;

  SteamIDBadgeInfo: SteamUrl;

  steamidbadgeinfo: SteamUrlDuplicate;

  SteamIDBadgePage: SteamUrl;

  steamidbadgepage: SteamUrlDuplicate;

  SteamIDBroadcastPage: SteamUrl;

  steamidbroadcastpage: SteamUrlDuplicate;

  SteamIDEditPage: SteamUrl;

  steamideditpage: SteamUrlDuplicate;

  SteamIDEditPrivacyPage: SteamUrl;

  steamideditprivacypage: SteamUrlDuplicate;

  SteamIDFriendsList: SteamUrl;

  steamidfriendslist: SteamUrlDuplicate;

  SteamIDFriendsPage: SteamUrl;

  steamidfriendspage: SteamUrlDuplicate;

  SteamIDGroupsPage: SteamUrl;

  steamidgroupspage: SteamUrlDuplicate;

  SteamIDMyProfile: SteamUrl;

  steamidmyprofile: SteamUrlDuplicate;

  SteamIDPage: SteamUrl;

  steamidpage: SteamUrlDuplicate;

  SteamLanguage: SteamUrl;

  steamlanguage: SteamUrlDuplicate;

  SteamPreferences: SteamUrl;

  steampreferences: SteamUrlDuplicate;

  SteamVRHMDHelp: SteamUrl;

  steamvrhmdhelp: SteamUrlDuplicate;

  SteamWorkshop: SteamUrl;

  steamworkshop: SteamUrlDuplicate;

  SteamWorkshopPage: SteamUrl;

  steamworkshoppage: SteamUrlDuplicate;

  SteamWorkshopSubscriptions: SteamUrl;

  steamworkshopsubscriptions: SteamUrlDuplicate;

  SteamWorkshopUpdatedSubscriptions: SteamUrl;

  steamworkshopupdatedsubscriptions: SteamUrlDuplicate;

  StoreAccount: SteamUrl;

  storeaccount: SteamUrlDuplicate;

  StoreAccountGatedAccessApp: SteamUrl;

  storeaccountgatedaccessapp: SteamUrlDuplicate;

  StoreAddFundsPage: SteamUrl;

  storeaddfundspage: SteamUrlDuplicate;

  StoreAppHover: SteamUrl;

  storeapphover: SteamUrlDuplicate;

  StoreAppImages: SteamUrl;

  storeappimages: SteamUrlDuplicate;

  StoreAppPage: SteamUrl;

  storeapppage: SteamUrlDuplicate;

  StoreAppPageAddToCart: SteamUrl;

  storeapppageaddtocart: SteamUrlDuplicate;

  StoreCart: SteamUrl;

  storecart: SteamUrlDuplicate;

  StoreCDN: SteamUrl;

  storecdn: SteamUrlDuplicate;

  StoreDlcPage: SteamUrl;

  storedlcpage: SteamUrlDuplicate;

  StoreExplore: SteamUrl;

  storeexplore: SteamUrlDuplicate;

  StoreExploreNew: SteamUrl;

  storeexplorenew: SteamUrlDuplicate;

  StoreFreeToPlay: SteamUrl;

  storefreetoplay: SteamUrlDuplicate;

  StoreFrontPage: SteamUrl;

  storefrontpage: SteamUrlDuplicate;

  StoreGameSearchPage: SteamUrl;

  storegamesearchpage: SteamUrlDuplicate;

  StoreGreatOnDeck: SteamUrl;

  storegreatondeck: SteamUrlDuplicate;

  StorePublisherPage: SteamUrl;

  storepublisherpage: SteamUrlDuplicate;

  StoreSpecials: SteamUrl;

  storespecials: SteamUrlDuplicate;

  StoreStats: SteamUrl;

  storestats: SteamUrlDuplicate;

  StoreVR: SteamUrl;

  storevr: SteamUrlDuplicate;

  StoreWebMicroTxnPage: SteamUrl;

  storewebmicrotxnpage: SteamUrlDuplicate;

  SupportMessages: SteamUrl;

  supportmessages: SteamUrlDuplicate;

  TextFilterSettings: SteamUrl;

  textfiltersettings: SteamUrlDuplicate;

  TodayPage: SteamUrl;

  todaypage: SteamUrlDuplicate;

  TradeOffers: SteamUrl;

  tradeoffers: SteamUrlDuplicate;

  UserAchievementsPage: SteamUrl;

  userachievementspage: SteamUrlDuplicate;

  UserLeaderboardsPage: SteamUrl;

  userleaderboardspage: SteamUrlDuplicate;

  UserStatsPage: SteamUrl;

  userstatspage: SteamUrlDuplicate;

  UserWishlist: SteamUrl;

  userwishlist: SteamUrlDuplicate;

  VideoCDN: SteamUrl;

  videocdn: SteamUrlDuplicate;

  WatchVideo: SteamUrl;

  watchvideo: SteamUrlDuplicate;

  WebAPI: SteamUrl;

  webapi: SteamUrlDuplicate;

  WorkshopEula: SteamUrl;

  workshopeula: SteamUrlDuplicate;

  YearInReview: SteamUrl;

  yearinreview: SteamUrlDuplicate;
}

export interface SteamUrl {
  feature: URLFeature;

  regexMatchURL: RegExp;

  url: string;
}

export interface SteamUrlDuplicate {
  bDuplicate: boolean;

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
