export enum PublishedFileQueryType {
  PublishedFileQueryType_RankedByVote = 0,
  PublishedFileQueryType_RankedByPublicationDate = 1,
  PublishedFileQueryType_AcceptedForGameRankedByAcceptanceDate = 2,
  PublishedFileQueryType_RankedByTrend = 3,
  PublishedFileQueryType_FavoritedByFriendsRankedByPublicationDate = 4,
  PublishedFileQueryType_CreatedByFriendsRankedByPublicationDate = 5,
  PublishedFileQueryType_RankedByNumTimesReported = 6,
  PublishedFileQueryType_CreatedByFollowedUsersRankedByPublicationDate = 7,
  PublishedFileQueryType_NotYetRated = 8,
  PublishedFileQueryType_RankedByTotalUniqueSubscriptions = 9,
  PublishedFileQueryType_RankedByTotalVotesAsc = 10,
  PublishedFileQueryType_RankedByVotesUp = 11,
  PublishedFileQueryType_RankedByTextSearch = 12,
  PublishedFileQueryType_RankedByPlaytimeTrend = 13,
  PublishedFileQueryType_RankedByTotalPlaytime = 14,
  PublishedFileQueryType_RankedByAveragePlaytimeTrend = 15,
  PublishedFileQueryType_RankedByLifetimeAveragePlaytime = 16,
  PublishedFileQueryType_RankedByPlaytimeSessionsTrend = 17,
  PublishedFileQueryType_RankedByLifetimePlaytimeSessions = 18,
  PublishedFileQueryType_RankedByInappropriateContentRating = 19,
  PublishedFileQueryType_RankedByBanContentCheck = 20,
  PublishedFileQueryType_RankedByLastUpdatedDate = 21,
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
  ProfileCustomizationTypeInvalid = 0,
  ProfileCustomizationTypeRareAchievementShowcase = 1,
  ProfileCustomizationTypeGameCollector = 2,
  ProfileCustomizationTypeItemShowcase = 3,
  ProfileCustomizationTypeTradeShowcase = 4,
  ProfileCustomizationTypeBadges = 5,
  ProfileCustomizationTypeFavoriteGame = 6,
  ProfileCustomizationTypeScreenshotShowcase = 7,
  ProfileCustomizationTypeCustomText = 8,
  ProfileCustomizationTypeFavoriteGroup = 9,
  ProfileCustomizationTypeRecommendation = 10,
  ProfileCustomizationTypeWorkshopItem = 11,
  ProfileCustomizationTypeMyWorkshop = 12,
  ProfileCustomizationTypeArtworkShowcase = 13,
  ProfileCustomizationTypeVideoShowcase = 14,
  ProfileCustomizationTypeGuides = 15,
  ProfileCustomizationTypeMyGuides = 16,
  ProfileCustomizationTypeAchievements = 17,
  ProfileCustomizationTypeGreenlight = 18,
  ProfileCustomizationTypeMyGreenlight = 19,
  ProfileCustomizationTypeSalien = 20,
  ProfileCustomizationTypeLoyaltyRewardReactions = 21,
  ProfileCustomizationTypeSingleArtworkShowcase = 22,
  ProfileCustomizationTypeAchievementsCompletionist = 23,
  ProfileCustomizationTypeReplay = 24,
}

export enum PublishedFileStorageSystem {
  PublishedFileStorageSystemInvalid = 0,
  PublishedFileStorageSystemLegacyCloud = 1,
  PublishedFileStorageSystemDepot = 2,
  PublishedFileStorageSystemUGCCloud = 3,
}

export enum CloudStoragePersistState {
  CloudStoragePersistStatePersisted = 0,
  CloudStoragePersistStateForgotten = 1,
  CloudStoragePersistStateDeleted = 2,
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
  SystemFanControlMode_Invalid = 0,
  SystemFanControlMode_Disabled = 1,
  SystemFanControlMode_Default = 2,
}

export enum StartupMovieVariant {
  Invalid = 0,
  Generic = 1,
  DeckBlue = 2,
  DeckOrange = 3,
}

export enum ColorGamutLabelSet {
  ColorGamutLabelSet_Default = 0,
  ColorGamutLabelSet_sRGB_Native = 1,
  ColorGamutLabelSet_Native_sRGB_Boosted = 2,
}

export enum WindowStackingOrder {
  Invalid = 0,
  Top = 1,
  Bottom = 2,
}

export enum BluetoothDeviceType {
  BluetoothDeviceType_Invalid = 0,
  BluetoothDeviceType_Unknown = 1,
  BluetoothDeviceType_Phone = 2,
  BluetoothDeviceType_Computer = 3,
  BluetoothDeviceType_Headset = 4,
  BluetoothDeviceType_Headphones = 5,
  BluetoothDeviceType_Speakers = 6,
  BluetoothDeviceType_OtherAudio = 7,
  BluetoothDeviceType_Mouse = 8,
  BluetoothDeviceType_Joystick = 9,
  BluetoothDeviceType_Gamepad = 10,
  BluetoothDeviceType_Keyboard = 11,
}

export enum SystemAudioDirection {
  SystemAudioDirection_Invalid = 0,
  SystemAudioDirection_Input = 1,
  SystemAudioDirection_Output = 2,
}

export enum SystemAudioChannel {
  SystemAudioChannel_Invalid = 0,
  SystemAudioChannel_Aggregated = 1,
  SystemAudioChannel_FrontLeft = 2,
  SystemAudioChannel_FrontRight = 3,
  SystemAudioChannel_LFE = 4,
  SystemAudioChannel_BackLeft = 5,
  SystemAudioChannel_BackRight = 6,
  SystemAudioChannel_FrontCenter = 7,
  SystemAudioChannel_Unknown = 8,
  SystemAudioChannel_Mono = 9,
}

export enum SystemAudioPortType {
  SystemAudioPortType_Invalid = 0,
  SystemAudioPortType_Unknown = 1,
  SystemAudioPortType_Audio32f = 2,
  SystemAudioPortType_Midi8b = 3,
  SystemAudioPortType_Video32RGBA = 4,
}

export enum SystemAudioPortDirection {
  SystemAudioPortDirection_Invalid = 0,
  SystemAudioPortDirection_Input = 1,
  SystemAudioPortDirection_Output = 2,
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

export enum TouchGesture {
  TouchGestureNone = 0,
  TouchGestureTouch = 1,
  TouchGestureTap = 2,
  TouchGestureDoubleTap = 3,
  TouchGestureShortPress = 4,
  TouchGestureLongPress = 5,
  TouchGestureLongTap = 6,
  TouchGestureTwoFingerTap = 7,
  TouchGestureTapCancelled = 8,
  TouchGesturePinchBegin = 9,
  TouchGesturePinchUpdate = 10,
  TouchGesturePinchEnd = 11,
  TouchGestureFlingStart = 12,
  TouchGestureFlingCancelled = 13,
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
  CommentThreadTypeInvalid = 0,
  CommentThreadTypeScreenshot_Deprecated = 1,
  CommentThreadTypeWorkshopAccount_Developer = 2,
  CommentThreadTypeWorkshopAccount_Public = 3,
  CommentThreadTypePublishedFile_Developer = 4,
  CommentThreadTypePublishedFile_Public = 5,
  CommentThreadTypeTest = 6,
  CommentThreadTypeForumTopic = 7,
  CommentThreadTypeRecommendation = 8,
  CommentThreadTypeVideo_Deprecated = 9,
  CommentThreadTypeProfile = 10,
  CommentThreadTypeNewsPost = 11,
  CommentThreadTypeClan = 12,
  CommentThreadTypeClanAnnouncement = 13,
  CommentThreadTypeClanEvent = 14,
  CommentThreadTypeUserStatusPublished = 15,
  CommentThreadTypeUserReceivedNewGame = 16,
  CommentThreadTypePublishedFile_Announcement = 17,
  CommentThreadTypeModeratorMessage = 18,
  CommentThreadTypeClanCuratedApp = 19,
  CommentThreadTypeQAndASession = 20,
  CommentThreadTypeMax = 21,
}

export enum BroadcastPermission {
  BroadcastPermissionDisabled = 0,
  BroadcastPermissionFriendsApprove = 1,
  BroadcastPermissionFriendsAllowed = 2,
  BroadcastPermissionPublic = 3,
  BroadcastPermissionSubscribers = 4,
}

export enum BroadcastEncoderSetting {
  EBroadcastEncoderBestQuality = 0,
  EBroadcastEncoderBestPerformance = 1,
}

export enum CloudGamingPlatform {
  CloudGamingPlatformNone = 0,
  CloudGamingPlatformValve = 1,
  CloudGamingPlatformNVIDIA = 2,
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
  AsyncGameSessionUserStateUnknown = -1,
  AsyncGameSessionUserStateWaitingForOthers = 0,
  AsyncGameSessionUserStateReadyForAction = 1,
  AsyncGameSessionUserStateDone = 2,
}

export enum AsyncGameSessionUserVisibility {
  AsyncGameSessionUserVisibilityEnvelopeAndSessionList = 0,
  AsyncGameSessionUserVisibilitySessionListOnly = 1,
  AsyncGameSessionUserVisibilityDismissed = 2,
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
  EnhancedMarketAppearanceStatus_None = 0,
  EnhancedMarketAppearanceStatus_Pending = 1,
  EnhancedMarketAppearanceStatus_InProgress = 2,
  EnhancedMarketAppearanceStatus_Completed = 3,
}

export enum ContentReportSubjectType {
  Invalid = 0,
  ForumPost = 1,
  Unused = 2,
  UGCFile = 3,
  FriendChatMsg = 4,
  ChatRoomMsg = 5,
  MAX = 6,
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
  MAX = 11,
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
  MAX = 62,
}

export enum ResolutionAutomation {
  Manual = 0,
  PartiallyAutomated = 1,
  FullyAutomated = 2,
  MAX = 3,
}
