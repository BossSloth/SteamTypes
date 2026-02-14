export enum PublishedFileQueryType {
  RankedByVote = 0,
  RankedByPublicationDate = 1,
  AcceptedForGameRankedByAcceptanceDate = 2,
  RankedByTrend = 3,
  FavoritedByFriendsRankedByPublicationDate = 4,
  CreatedByFriendsRankedByPublicationDate = 5,
  RankedByNumTimesReported = 6,
  CreatedByFollowedUsersRankedByPublicationDate = 7,
  NotYetRated = 8,
  RankedByTotalUniqueSubscriptions = 9,
  RankedByTotalVotesAsc = 10,
  RankedByVotesUp = 11,
  RankedByTextSearch = 12,
  RankedByPlaytimeTrend = 13,
  RankedByTotalPlaytime = 14,
  RankedByAveragePlaytimeTrend = 15,
  RankedByLifetimeAveragePlaytime = 16,
  RankedByPlaytimeSessionsTrend = 17,
  RankedByLifetimePlaytimeSessions = 18,
  RankedByInappropriateContentRating = 19,
  RankedByBanContentCheck = 20,
  RankedByLastUpdatedDate = 21,
}

export enum PublishedFileInappropriateProvider {
  Invalid = 0,
  Google = 1,
  Amazon = 2,
}

export enum PublishedFileInappropriateResult {
  NotScanned = 0,
  VeryUnlikely = 1,
  Unlikely = 30,
  Possible = 50,
  Likely = 75,
  VeryLikely = 100,
}

export enum PersonaStateFlag {
  HasRichPresence = 1,
  InJoinableGame = 2,
  Golden = 4,
  RemotePlayTogether = 8,
  ClientTypeWeb = 256,
  ClientTypeMobile = 512,
  ClientTypeTenfoot = 1024,
  ClientTypeVR = 2048,
  LaunchTypeGamepad = 4096,
  LaunchTypeCompatTool = 8192,
}

export enum ContentCheckProvider {
  Invalid = 0,
  Google_DEPRECATED = 1,
  Amazon = 2,
  Local = 3,
  GoogleVertexAI = 4,
  GoogleGemini = 5,
  SteamLearn = 6,
}

export enum ProfileCustomizationType {
  Invalid = 0,
  RareAchievementShowcase = 1,
  GameCollector = 2,
  ItemShowcase = 3,
  TradeShowcase = 4,
  Badges = 5,
  FavoriteGame = 6,
  ScreenshotShowcase = 7,
  CustomText = 8,
  FavoriteGroup = 9,
  Recommendation = 10,
  WorkshopItem = 11,
  MyWorkshop = 12,
  ArtworkShowcase = 13,
  VideoShowcase = 14,
  Guides = 15,
  MyGuides = 16,
  Achievements = 17,
  Greenlight = 18,
  MyGreenlight = 19,
  Salien = 20,
  LoyaltyRewardReactions = 21,
  SingleArtworkShowcase = 22,
  AchievementsCompletionist = 23,
  Replay = 24,
}

export enum PublishedFileStorageSystem {
  Invalid = 0,
  LegacyCloud = 1,
  Depot = 2,
  UGCCloud = 3,
}

export enum CloudStoragePersistState {
  Persisted = 0,
  Forgotten = 1,
  Deleted = 2,
}

export enum SDCardFormatStage {
  Invalid = 0,
  Starting = 1,
  Testing = 2,
  Rescuing = 3,
  Formatting = 4,
  Finalizing = 5,
}

export enum StorageFormatStage {
  Invalid = 0,
  NotRunning = 1,
  Starting = 2,
  Testing = 3,
  Rescuing = 4,
  Formatting = 5,
  Finalizing = 6,
}

export enum SystemFanControlMode {
  Invalid = 0,
  Disabled = 1,
  Default = 2,
}

export enum StartupMovieVariant {
  Invalid = 0,
  Generic = 1,
  DeckBlue = 2,
  DeckOrange = 3,
  Machine = 4,
}

export enum ColorGamutLabelSet {
  Default = 0,
  sRGB_Native = 1,
  Native_sRGB_Boosted = 2,
}

export enum WindowStackingOrder {
  Invalid = 0,
  Top = 1,
  Bottom = 2,
}

export enum BluetoothDeviceType {
  Invalid = 0,
  Unknown = 1,
  Phone = 2,
  Computer = 3,
  Headset = 4,
  Headphones = 5,
  Speakers = 6,
  OtherAudio = 7,
  Mouse = 8,
  Joystick = 9,
  Gamepad = 10,
  Keyboard = 11,
}

export enum SystemAudioDirection {
  Invalid = 0,
  Input = 1,
  Output = 2,
}

export enum SystemAudioChannel {
  Invalid = 0,
  Aggregated = 1,
  FrontLeft = 2,
  FrontRight = 3,
  LFE = 4,
  BackLeft = 5,
  BackRight = 6,
  FrontCenter = 7,
  Unknown = 8,
  Mono = 9,
}

export enum SystemAudioPortType {
  Invalid = 0,
  Unknown = 1,
  Audio32f = 2,
  Midi8b = 3,
  Video32RGBA = 4,
}

export enum SystemAudioPortDirection {
  Invalid = 0,
  Input = 1,
  Output = 2,
}

export enum SystemServiceState {
  Unavailable = 0,
  Disabled = 1,
  Enabled = 2,
}

export enum GraphicsPerfOverlayLevel {
  Hidden = 0,
  Basic = 1,
  Medium = 2,
  Full = 3,
  Minimal = 4,
}

export enum GPUPerformanceLevel {
  Invalid = 0,
  Auto = 1,
  Manual = 2,
  Low = 3,
  High = 4,
  Profiling = 5,
}

export enum SplitScalingFilter {
  Invalid = 0,
  Linear = 1,
  Nearest = 2,
  Sharp = 3,
  NIS_Deprecated = 4,
}

export enum SplitScalingScaler {
  Invalid = 0,
  Auto = 1,
  Integer = 2,
  Fit = 3,
  Fill = 4,
  Stretch = 5,
}

export enum GamescopeBlurMode {
  Disabled = 0,
  IfOccluded = 1,
  Always = 2,
}

export enum SLSHelper {
  Invalid = 0,
  Minidump = 1,
  Kdump = 2,
  Journal = 3,
  Gpu = 4,
  SystemInfo = 5,
  Devcoredump = 6,
}

export enum HDRVisualization {
  None = 0,
  Heatmap = 1,
  Analysis = 2,
  HeatmapExtended = 3,
  HeatmapClassic = 4,
}

export enum HDRToneMapOperator {
  Invalid = 0,
  Uncharted = 1,
  Reinhard = 2,
}

export enum CPUGovernor {
  Invalid = 0,
  Perf = 1,
  Powersave = 2,
  Manual = 3,
}

export enum UpdaterType {
  Invalid = 0,
  Client = 1,
  OS = 2,
  BIOS = 3,
  Aggregated = 4,
  Test1 = 5,
  Test2 = 6,
  Dummy = 7,
}

export enum UpdaterState {
  Invalid = 0,
  UpToDate = 2,
  Checking = 3,
  Available = 4,
  Applying = 5,
  ClientRestartPending = 6,
  SystemRestartPending = 7,
  RollBack = 8,
}

export enum StorageBlockContentType {
  Invalid = 0,
  Unknown = 1,
  FileSystem = 2,
  Crypto = 3,
  Raid = 4,
}

export enum StorageBlockFileSystemType {
  Invalid = 0,
  Unknown = 1,
  VFat = 2,
  Ext4 = 3,
}

export enum StorageDriveMediaType {
  Invalid = 0,
  Unknown = 1,
  HDD = 2,
  SSD = 3,
  Removable = 4,
}

export enum SystemDisplayCompatibilityMode {
  Invalid = 0,
  None = 1,
  MinimalBandwith = 2,
}

export enum SteamOSCompatibilityCategory {
  Unknown = 0,
  Unsupported = 1,
  Compatible = 2,
}

export enum SteamOSCompatibilityResultDisplayType {
  Invisible = 0,
  Informational = 1,
  Unsupported = 2,
  Compatible = 3,
}

export enum SteamDeckCompatibilityCategory {
  Unknown = 0,
  Unsupported = 1,
  Playable = 2,
  Verified = 3,
}

export enum SteamDeckCompatibilityResultDisplayType {
  Invisible = 0,
  Informational = 1,
  Unsupported = 2,
  Playable = 3,
  Verified = 4,
}

export enum SteamDeckCompatibilityTestResult {
  Invalid = 0,
  NotApplicable = 1,
  Pass = 2,
  Fail = 3,
  FailMinor = 4,
}

export enum ACState {
  Unknown = 0,
  Disconnected = 1,
  Connected = 2,
  ConnectedSlow = 3,
}

export enum BatteryState {
  Unknown = 0,
  Discharging = 1,
  Charging = 2,
  Full = 3,
}

export enum OSBranch {
  Unknown = 0,
  Release = 1,
  ReleaseCandidate = 2,
  Beta = 3,
  BetaCandidate = 4,
  Preview = 5,
  PreviewCandidate = 6,
  Main = 7,
  Staging = 8,
}

export enum BrowserGPUStatus {
  Invalid = 0,
  Enabled = 1,
  DisabledUnknown = 2,
  DisabledCrashCount = 4,
  DisabledBlocklist = 5,
  DisabledJSRequest = 6,
  DisabledCommandLine = 7,
  DisabledRuntimeDetect = 8,
  DisabledChildCommandLine = 9,
  DisabledCompositingCommandLine = 10,
}

export enum BrowserFeatureStatus {
  Invalid = 0,
  NotFound = 1,
  Unknown = 2,
  DisabledSoftware = 3,
  DisabledOff = 4,
  DisabledOffOk = 5,
  UnavailableSoftware = 6,
  UnavailableOff = 7,
  UnavailableOffOk = 8,
  EnabledReadback = 9,
  EnabledForce = 10,
  Enabled = 11,
  EnabledOn = 12,
  EnabledForceOn = 13,
}

export enum GpuDriverId {
  Invalid = 0,
  Unknown = 1,
  AmdProprietary = 2,
  AmdOpenSource = 3,
  MesaRadv = 4,
  NvidiaProprietary = 5,
  IntelPropietary = 6,
  MesaIntel = 7,
  QualcommProprietary = 8,
  ArmProprietary = 9,
  GoogleSwiftshader = 10,
  BroadcomProprietary = 11,
  MesaLLVMPipe = 12,
  MoltenVK = 13,
  MesaTurnip = 14,
  MesaPanVK = 15,
  MesaVenus = 16,
  MesaDozen = 17,
  MesaNVK = 18,
  MesaHoneyKrisp = 19,
}

export enum CommunityItemClass {
  Invalid = 0,
  Badge = 1,
  GameCard = 2,
  ProfileBackground = 3,
  Emoticon = 4,
  BoosterPack = 5,
  Consumable = 6,
  GameGoo = 7,
  ProfileModifier = 8,
  Scene = 9,
  SalienItem = 10,
  Sticker = 11,
  ChatEffect = 12,
  MiniProfileBackground = 13,
  AvatarFrame = 14,
  AnimatedAvatar = 15,
  SteamDeckKeyboardSkin = 16,
  SteamDeckStartupMovie = 17,
}

export enum SteamDeckCompatibilityFeedback {
  Unset = 0,
  Agree = 1,
  Disagree = 2,
  Ignore = 3,
}

export enum ProvideDeckFeedbackPreference {
  Unset = 0,
  Yes = 1,
  No = 2,
}

export enum HardwareCompatibilityFeedbackDetails {
  Unset = 0,
  Performance = 1,
  Stability = 2,
  Legibility = 4,
  Input = 8,
  Other = 16,
}

export enum GameFrameRateReportingPreference {
  Unset = 0,
  No = 1,
  Yes_Anonymous = 2,
  Yes_NonAnonymous = 3,
}

export enum TouchGesture {
  None = 0,
  Touch = 1,
  Tap = 2,
  DoubleTap = 3,
  ShortPress = 4,
  LongPress = 5,
  LongTap = 6,
  TwoFingerTap = 7,
  TapCancelled = 8,
  PinchBegin = 9,
  PinchUpdate = 10,
  PinchEnd = 11,
  FlingStart = 12,
  FlingCancelled = 13,
}

export enum SessionPersistence {
  Invalid = -1,
  Ephemeral = 0,
  Persistent = 1,
}

export enum NewSteamAnnouncementState {
  Invalid = 0,
  AllRead = 1,
  NewAnnouncement = 2,
  FeaturedAnnouncement = 3,
}

export enum ForumType {
  Invalid = 0,
  General = 1,
  ReportedPosts = 2,
  Workshop = 3,
  PublishedFile = 4,
  Trading = 5,
  PlayTest = 6,
  Event = 7,
  Max = 8,
}

export enum CommentThreadType {
  Invalid = 0,
  Screenshot_Deprecated = 1,
  WorkshopAccount_Developer = 2,
  WorkshopAccount_Public = 3,
  PublishedFile_Developer = 4,
  PublishedFile_Public = 5,
  Test = 6,
  ForumTopic = 7,
  Recommendation = 8,
  Video_Deprecated = 9,
  Profile = 10,
  NewsPost = 11,
  Clan = 12,
  ClanAnnouncement = 13,
  ClanEvent = 14,
  UserStatusPublished = 15,
  UserReceivedNewGame = 16,
  PublishedFile_Announcement = 17,
  ModeratorMessage = 18,
  ClanCuratedApp = 19,
  QAndASession = 20,
  Max = 21,
}

export enum BroadcastPermission {
  Disabled = 0,
  FriendsApprove = 1,
  FriendsAllowed = 2,
  Public = 3,
  Subscribers = 4,
}

export enum BroadcastEncoderSetting {
  EBroadcastEncoderBestQuality = 0,
  EBroadcastEncoderBestPerformance = 1,
}

export enum CloudGamingPlatform {
  None = 0,
  Valve = 1,
  NVIDIA = 2,
}

export enum CompromiseDetectionType {
  None = 0,
  TradeEvent = 1,
  ApiCallRate = 2,
  Manual = 3,
  TicketAction = 4,
  MaliciousRefund = 5,
  Move2FA = 6,
  DeviceType = 7,
}

export enum AsyncGameSessionUserState {
  Unknown = -1,
  WaitingForOthers = 0,
  ReadyForAction = 1,
  Done = 2,
}

export enum AsyncGameSessionUserVisibility {
  EnvelopeAndSessionList = 0,
  SessionListOnly = 1,
  Dismissed = 2,
}

export enum GameRecordingType {
  Unknown = 0,
  NotRecording = 1,
  ManualRecording = 2,
  BackgroundRecording = 3,
  Clip = 4,
}

export enum GRMode {
  Never = 0,
  Always = 1,
  Manual = 2,
}

export enum ExportCodec {
  Default = 0,
  H264 = 1,
  H265 = 2,
}

export enum ProtoAppType {
  EAppTypeInvalid = 0,
  EAppTypeGame = 1,
  EAppTypeApplication = 2,
  EAppTypeTool = 4,
  EAppTypeDemo = 8,
  EAppTypeDeprected = 16,
  EAppTypeDLC = 32,
  EAppTypeGuide = 64,
  EAppTypeDriver = 128,
  EAppTypeConfig = 256,
  EAppTypeHardware = 512,
  EAppTypeFranchise = 1024,
  EAppTypeVideo = 2048,
  EAppTypePlugin = 4096,
  EAppTypeMusicAlbum = 8192,
  EAppTypeSeries = 16384,
  EAppTypeComic = 32768,
  EAppTypeBeta = 65536,
  EAppTypeShortcut = 1073741824,
  EAppTypeDepotOnly = -2147483648,
}

export enum ChildProcessQueryCommand {
  Invalid = 0,
  GpuTopology = 1,
  Max = 2,
}

export enum ChildProcessQueryExitCode {
  Success = 0,
  ErrorCommandline = -1,
  ErrorOther = -2,
  ErrorUnimplemented = -3,
  ErrorFileSave = -4,
  ErrorNotSupportedByPlatform = -5,
}

export enum WindowsUpdateInstallationImpact {
  Unknown = -1,
  Normal = 0,
  Minor = 1,
  ExclusiveHandling = 2,
}

export enum WindowsUpdateRebootBehavior {
  Unknown = -1,
  NeverNeedsReboot = 0,
  AlwaysNeedsReboot = 1,
  MightNeedReboot = 2,
}

export enum ExternalSaleEventType {
  Unknown = 0,
  Publisher = 1,
  Showcase = 2,
  Region = 3,
  Theme = 4,
  Franchise = 5,
}

export enum EnhancedMarketAppearanceStatus {
  None = 0,
  Pending = 1,
  InProgress = 2,
  Completed = 3,
}

export enum ContentReportSubjectType {
  Invalid = 0,
  ForumPost = 1,
  Unused = 2,
  UGCFile = 3,
  FriendChatMsg = 4,
  ChatRoomMsg = 5,
  ChatGroup = 6,
  MAX = 7,
}

export enum ControlledLegalCategoryStatus {
  None = 0,
  Accused = 1,
  Convicted = 2,
  Acquitted = 3,
}

export enum ContentModeratorLevel {
  Any = 0,
  Supervisor = 1,
  Valve = 10,
  MAX = 11,
}

export enum ContentReportResolution {
  Unresolved = 0,
  Acquitted = 1,
  Removed = 2,
  Relabelled = 3,
  Suspicious = 4,
  HarassmentStrike = 5,
  Purged = 6,
  DisconnectedFromApp = 7,
  SuspiciousIncludingUpvoters = 8,
  VisibilityChanged = 9,
  CountryRestrictionsChanged = 10,
  RemoveAndWarn = 11,
  RemoveAndBan = 12,
  RemoveAndKick = 13,
  Sanctioned = 14,
  Sustained = 15,
  MAX = 16,
}

export enum ContentModerationSanction {
  Invalid = 0,
  Deleted = 1,
  CommunityBanned = 2,
  HubBanned = 3,
  TradeBanned = 4,
  CommentHistoryDeleted = 5,
  Relabelled = 6,
  MarkAsSuspicious = 7,
  MAX = 8,
}

export enum ContentReportSubjectAction {
  Invalid = 0,
  Unresolved = 1,
  Sanctioned = 2,
  Acquitted = 3,
  Cancelled = 4,
  Updated = 5,
  Escalated = 6,
  Disputed = 7,
  SustainedOnDispute = 8,
  Locked = 9,
  Unlocked = 10,
  Deleted = 11,
  Warned = 12,
  BannedFromHub = 13,
  BannedFromCommunity = 14,
  TradeBanned = 15,
  MarkedAsSuspicious = 16,
  ResetContent = 17,
  EscalatedForCSAM = 18,
  EscalatedForTerrorism = 19,
  Claimed = 20,
  Released = 21,
  PrivateMessaged = 22,
}

export enum ContentReportReason {
  Invalid = 0,
  None = 1,
  Unknown = 2,
  Harassment = 3,
  BullyingAndIntimidation = 4,
  Stalking = 5,
  Doxxing = 6,
  OtherHarassment = 7,
  EncouragingViolence = 8,
  EncouragingSelfHarm = 9,
  EncouragingSuicide = 10,
  OtherViolenceOrSelfHarm = 11,
  PhishingOrAccountTheft = 12,
  AttemptedScamming = 13,
  LinkingToMaliciousContent = 14,
  Impersonation = 15,
  OtherScamsAndTheft = 16,
  EncouragingTerrorism = 17,
  OrganizingTerrorism = 18,
  OtherTerrorism = 19,
  TargetedAbuse = 20,
  NamingAndShaming = 21,
  Discrimination = 22,
  OtherAbuse = 23,
  Trolling = 24,
  Baiting = 25,
  Derailing = 26,
  OtherDisruptive = 27,
  Spam = 28,
  Begging = 29,
  Reposting = 30,
  OtherOffTopic = 31,
  CSAMSexualContent = 32,
  CSAMGroomingOrEnticement = 33,
  CSAMOther = 34,
  NudityOrSexualContent = 35,
  NonConsensualMaterial = 36,
  Advertising = 37,
  ReferralLinks = 38,
  Gambling = 39,
  Raffles = 40,
  OtherCommercialActivity = 41,
  InauthenticReview = 42,
  HiddenAdvertisementOrCommercialCommunication = 43,
  MisleadingInformationAboutGoodsOrServices = 44,
  MisleadingInformationAboutConsumerRights = 45,
  NoncomplianceWithPricingRegulations = 46,
  RightToBeForgottenViolation = 47,
  MissingProcessingGroundForData = 48,
  OtherDataProtectionAndPrivacyViolation = 49,
  GenderedHarassment = 50,
  GenderedBullyingAndIntimidation = 51,
  GenderedStalking = 52,
  GenderedDoxxing = 53,
  GenderedOtherHarassment = 54,
  GenderedEncouragingViolence = 55,
  GenderedTargetedAbuse = 56,
  CSAMFakedSexualContent = 57,
  GenderedNonConsensualMaterial = 58,
  FakedGenderedNonConsensualMaterial = 59,
  FakedNonConsensualMaterial = 60,
  NegativeEffectonDiscourseOrElections = 61,
  QuotesModeratedContent = 62,
  CredibleThreatOfViolence = 63,
  MAX = 64,
}

export enum ResolutionAutomation {
  Manual = 0,
  PartiallyAutomated = 1,
  FullyAutomated = 2,
  MAX = 3,
}

export enum PressOutletAction {
  Invalid = 0,
  Granted = 1,
  Removed = 2,
  Created = 3,
  Updated = 4,
  Deleted = 5,
  Undeleted = 6,
  StagedAdd = 7,
  StagedDelete = 8,
  EnterStaging = 9,
  ExitStaging = 10,
  ReverseStagedAdd = 11,
  ReverseStagedDelete = 12,
  MAX = 13,
}

export enum PressOutletMemberPendingState {
  Member = 0,
  StagedDelete = 1,
  StagedAdd = 2,
  MAX = 3,
}

export enum CommentDeleteReason {
  Invalid = 0,
  User = 1,
  ThreadOwner = 2,
  Moderator = 3,
  Support = 4,
  Spam = 5,
  AccountDeletion = 6,
}
