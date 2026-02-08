import { Callbacks } from 'shared/interfaces';

export interface LocalizationManager {
  AddTokens(tokens: Record<string, string>, fallbackTokens?: Record<string, string>): void;

  BLooksLikeToken(str: string): boolean;

  /**
   * @param e default: null
   */
  GetELanguageFallbackOrder(e?: null): unknown[];

  GetPreferredLocales(): string[];

  GetTokensChangedCallbackList(): unknown;

  InitDirect(e: unknown, t: unknown): void;

  InitFromObjects(e: unknown, t: unknown, n: unknown, r: unknown, i: unknown, s: unknown): void;

  LocalizeIfToken(str: string, silent?: boolean): string | undefined;

  /**
   * @param token The token to localize. If it is not a token, it will be returned as is.
   * @param silent If true, the function will not log warnings if the token is not found.
   *
   * @returns The localized string, or undefined if not a valid token.
   */
  LocalizeString(token: `#${keyof MapTokens}` | (`#${string}` & {}), silent?: boolean): string | undefined;

  LocalizeStringFromFallback(str: string): string;

  SetPreferredLocales(e: string[]): void;

  m_bReportIndividualMissingTokens: boolean;

  m_cbkTokensChanged: Callbacks<() => void>;

  m_mapFallbackTokens: Map<string, string>;

  m_mapTokens: Map<string, (MapTokens | string)>;

  m_rgLocalesToUse: string[];
}

export interface MapTokens {
  AccountCreation_Title: string;

  Achievements_Achievements: string;

  Achievements_ComparisonLabel_Clear: string;

  Achievements_ComparisonLabel_Comparing: string;

  Achievements_ComparisonLabel_NotComparing: string;

  Achievements_ComparisonToggle_Label: string;

  Achievements_FailedToLoad_Title: string;

  Achievements_Filter_Default: string;

  Achievements_FriendsAchievements: string;

  Achievements_GlobalAchievement_PercentUnlockedLabel: string;

  Achievements_HeaderStats_Earned_Label: string;

  Achievements_HeaderStats_Playtime_Label: string;

  Achievements_HeaderStats_PlaytimeRecent_Label: string;

  Achievements_HiddenAchievementItem_Description: string;

  Achievements_HiddenAchievementItem_Description_Plural: string;

  Achievements_HiddenAchievementItem_Individual_Reveal: string;

  Achievements_HiddenAchievementItem_Individual_Reveal_Desktop: string;

  Achievements_HiddenAchievementItem_Individual_Reveal_Gamepad: string;

  Achievements_HiddenAchievementItem_Individual_Title: string;

  Achievements_HiddenAchievementItem_Title: string;

  Achievements_HiddenAchievementItem_Title_Plural: string;

  Achievements_HiddenList_Title: string;

  Achievements_LeaderboardsDropdown_Global: string;

  Achievements_LeaderboardsDropdown_Label: string;

  Achievements_LeaderboardsDropdown_Personal: string;

  Achievements_ListItem_UnlockDateTime: string;

  Achievements_ListItem_UserUnlockDateTime: string;

  Achievements_LockedList_Title: string;

  Achievements_MyAchievements: string;

  Achievements_NotOwned: string;

  Achievements_Sort_MoveToBottom: string;

  Achievements_Sort_MoveToTop: string;

  Achievements_Tab_FriendAchievements: string;

  Achievements_Tab_GlobalAchievements: string;

  Achievements_Tab_InProgress: string;

  Achievements_Tab_MyAchievements: string;

  Achievements_ViewGlobalAchievements: string;

  Activate_AlreadyPurchased: string;

  Activate_AlreadyPurchased_Headline: string;

  Activate_ContactSupport: string;

  Activate_ContactSupport_Headline: string;

  Activate_InvalidCode: string;

  Activate_InvalidCode_Headline: string;

  Activate_MustLoginPS3: string;

  Activate_MustLoginPS3_Headline: string;

  Activate_MustOwnOtherApp: string;

  Activate_MustOwnOtherApp_Headline: string;

  Activate_RateLimited: string;

  Activate_RateLimited_Headline: string;

  Activate_RestrictedCountry: string;

  Activate_RestrictedCountry_Headline: string;

  Activate_ServiceUnavailable: string;

  Activate_ServiceUnavailable_Headline: string;

  Activate_Subscription_Rejected: string;

  Activate_Subscription_Rejected_Headline: string;

  Activate_SubscriptionSuccess: string;

  Activate_SubscriptionSuccess_ComingSoonOnly: string;

  Activate_SubscriptionSuccess_Headline: string;

  Activate_SubscriptionSuccess_Headline_WithProduct: string;

  AddNonSteam_AddSelected: string;

  AddNonSteam_Browse: string;

  AddNonSteam_Desc: string;

  AddNonSteam_Filter_All: string;

  AddNonSteam_Filter_Exe_Linux: string;

  AddNonSteam_Filter_Exe_MacOS: string;

  AddNonSteam_Filter_Exe_Windows: string;

  AddNonSteam_Filter_Placeholder: string;

  AddNonSteam_Loading: string;

  AddNonSteam_Location: string;

  AddNonSteam_PickAppTitle: string;

  AddNonSteam_Program: string;

  AddNonSteam_Title: string;

  AdvancedSearch_AnyController: string;

  AdvancedSearch_AnyLanguage: string;

  AdvancedSearch_AudioAccessibilitySection: string;

  AdvancedSearch_ControllerSpecificFilterOptions: string;

  AdvancedSearch_FeatureSection: string;

  AdvancedSearch_FriendsPrompt: string;

  AdvancedSearch_FriendsPrompt_Offline: string;

  AdvancedSearch_FriendsSection: string;

  AdvancedSearch_GameplayAccessibilitySection: string;

  AdvancedSearch_GenreSection: string;

  AdvancedSearch_HardwareSection: string;

  AdvancedSearch_Header: string;

  AdvancedSearch_InputAccessibilitySection: string;

  AdvancedSearch_LanguageSection: string;

  AdvancedSearch_PaneTitle: string;

  AdvancedSearch_PlayerSection: string;

  AdvancedSearch_Reset: string;

  AdvancedSearch_ShowAccessibilityFeatures: string;

  AdvancedSearch_StateSection: string;

  AdvancedSearch_SteamDeckOptions: string;

  AdvancedSearch_StoreTagPrompt: string;

  AdvancedSearch_StoreTagSection: string;

  AdvancedSearch_VisualAccessibilitySection: string;

  Agreement_Title: string;

  AIContentReport_Error: string;

  AIContentReport_Text: string;

  AIContentReport_Title: string;

  AllCollectionsView_AddCollection: string;

  AllCollectionsView_DragToAddCollection: string;

  AllCollectionsView_InfoIcon: string;

  AllCollectionsView_InfoIconCollections: string;

  AllCollectionsView_InfoIconDynamicCollections: string;

  AllCollectionsView_InfoIconFav: string;

  AllCollectionsView_InfoIconFavorites: string;

  AllCollectionsView_Title: string;

  AppActivity_Achieved: string;

  AppActivity_Achieved_PlusMore: string;

  AppActivity_Achieved_PlusMore_Label: string;

  AppActivity_Achieved_View_Achievements: string;

  AppActivity_AchievedRollup: string;

  AppActivity_AchievedRollupAlt: string;

  AppActivity_AchievementsHeader: string;

  AppActivity_AddComments: string;

  AppActivity_AddedGameToWishlist: string;

  AppActivity_AddedGameToWishlistCount: string;

  AppActivity_AddedGameToWishlistCount_Plural: string;

  AppActivity_Comment_Reply: string;

  AppActivity_ConfirmDeleteCommentTitle: string;

  AppActivity_ConfirmDeleteCommentTitle_Desc: string;

  AppActivity_ConfirmDeleteTitle: string;

  AppActivity_ConfirmDeleteTitle_Desc: string;

  AppActivity_ContributeComments: string;

  AppActivity_DeleteUserNews: string;

  AppActivity_EndofFeed: string;

  AppActivity_EventType_GameUpdate: string;

  AppActivity_FeaturedDLC: string;

  AppActivity_FeaturedDLC_Available: string;

  AppActivity_FeaturedDLC_Tooltip: string;

  AppActivity_FeaturedDLC_ViewAll: string;

  AppActivity_FeaturedEvent: string;

  AppActivity_FetchMore: string;

  AppActivity_LaunchedSoftwareFirstTime: string;

  AppActivity_MakeCommentsVisible: string;

  AppActivity_NoActivity: string;

  AppActivity_PlayedGameFirstTime: string;

  AppActivity_PostedScreenshot: string;

  AppActivity_PostedScreenshot_Plural: string;

  AppActivity_PostedScreenshot_Rollup: string;

  AppActivity_PostedScreenshot_Rollup_Plural: string;

  AppActivity_PostedVideo: string;

  AppActivity_PostedVideo_Plural: string;

  AppActivity_PostedVideo_Rollup: string;

  AppActivity_PostedVideo_Rollup_Plural: string;

  AppActivity_PostedVideoTitleLabel: string;

  AppActivity_PostStatusUpdate: string;

  AppActivity_RateDown: string;

  AppActivity_RateUp: string;

  AppActivity_RatingDetails: string;

  AppActivity_RatingDetails_1Other: string;

  AppActivity_RatingDetails_2Others: string;

  AppActivity_RatingDetails_PublishedFile: string;

  AppActivity_RatingDetails_User: string;

  AppActivity_RatingDetails_User_1Other: string;

  AppActivity_RatingDetails_User_2Others: string;

  AppActivity_ReceivedNewGame: string;

  AppActivity_ReceivedNewGame_Plural: string;

  AppActivity_ReceivedNewGameList: string;

  AppActivity_RecommendedGame: string;

  AppActivity_RecommendedGame_ReadMore: string;

  AppActivity_Settings: string;

  AppActivity_StatusUpdate: string;

  AppActivity_StatusUpdate_Post: string;

  AppActivity_StatusUpdate_Software_Post: string;

  AppActivity_SteamTradingCards_BadgeCrafted: string;

  AppActivity_SteamTradingCards_EarnedBoosterPack: string;

  AppActivity_SteamTradingCards_EarnedTradingCard: string;

  AppActivity_SteamTradingCards_EarnedTradingCards: string;

  AppActivity_UserStatus: string;

  AppActivity_UserStatus_Time: string;

  AppActivity_ViewComments: string;

  AppActivity_ViewLatestNews: string;

  AppActivity_ViewProfile: string;

  AppActivity_ViewWishlist: string;

  AppActivity_Wishlist: string;

  AppBox_ComingSoon: string;

  AppBox_ComingSoon_Short: string;

  AppBox_NewToLibrary: string;

  AppBox_NewToLibrary_Short: string;

  AppBox_NoPlayTimeYet: string;

  AppBox_NotReleased: string;

  AppBox_NumberOfCopies_AccessibilityLabel: string;

  AppBox_NumberOfCopies_AccessibilityLabel_Plural: string;

  AppBox_PlayNextMostPopular: string;

  AppBox_PlayNextMostPopularSub: string;

  AppBox_PlayTimeHeader: string;

  AppBox_RecentPlayTime_Hours: string;

  AppBox_RecentPlayTime_Minutes: string;

  AppBox_TotalPlayTime_Hours: string;

  AppBox_TotalPlayTime_Minutes: string;

  AppControllerConfiguration_BuiltInSupport: string;

  AppControllerConfiguration_ConfigNeedsGameInstall: string;

  AppControllerConfiguration_ConfigPlaytime: string;

  AppControllerConfiguration_ConfigUpdated: string;

  AppControllerConfiguration_Configuration_Details: string;

  AppControllerConfiguration_Configuration_Details_Author: string;

  AppControllerConfiguration_Configuration_Details_Description: string;

  AppControllerConfiguration_Configuration_Details_ID: string;

  AppControllerConfiguration_Configuration_Details_Link: string;

  AppControllerConfiguration_Configuration_Details_NotFound: string;

  AppControllerConfiguration_Configuration_Details_Title: string;

  AppControllerConfiguration_Configuration_LinkInfo: string;

  AppControllerConfiguration_Configuration_NoLinkInfo: string;

  AppControllerConfiguration_ConfirmNewConfig: string;

  AppControllerConfiguration_ConfirmNewConfig_Desc: string;

  AppControllerConfiguration_ConfirmNewConfig_DescNoChanges: string;

  AppControllerConfiguration_ConfirmRevertConfig: string;

  AppControllerConfiguration_ConfirmRevertConfig_Desc: string;

  AppControllerConfiguration_Controller_Number: string;

  AppControllerConfiguration_ControllerOptedOut1: string;

  AppControllerConfiguration_ControllerOptedOut2: string;

  AppControllerConfiguration_ControllerSupportInfo_Title: string;

  AppControllerConfiguration_ControllerSupportInfo_YourController: string;

  AppControllerConfiguration_CurrentConfiguration: string;

  AppControllerConfiguration_DeleteConfig_Cancel: string;

  AppControllerConfiguration_DeleteConfig_Confirm: string;

  AppControllerConfiguration_DeleteConfig_Desc: string;

  AppControllerConfiguration_DeleteConfig_Title: string;

  AppControllerConfiguration_Download: string;

  AppControllerConfiguration_Downloaded: string;

  AppControllerConfiguration_Downloading: string;

  AppControllerConfiguration_Edit: string;

  AppControllerConfiguration_Export: string;

  AppControllerConfiguration_Export_Description: string;

  AppControllerConfiguration_Export_Title: string;

  AppControllerConfiguration_Export_Type: string;

  AppControllerConfiguration_Export_Type_PersonalCloud: string;

  AppControllerConfiguration_Export_Type_PersonalLocal: string;

  AppControllerConfiguration_Export_Type_Template: string;

  AppControllerConfiguration_FindCommunityConfig_Browse: string;

  AppControllerConfiguration_FindCommunityConfig_BrowseCommunity: string;

  AppControllerConfiguration_FindCommunityConfig_Desc: string;

  AppControllerConfiguration_Import: string;

  AppControllerConfiguration_Link: string;

  AppControllerConfiguration_NoController: string;

  AppControllerConfiguration_NoControllers: string;

  AppControllerConfiguration_NotDownloaded: string;

  AppControllerConfiguration_OfficialConfig: string;

  AppControllerConfiguration_OfficialExport: string;

  AppControllerConfiguration_OverwriteConfig_Desc: string;

  AppControllerConfiguration_OverwriteConfig_New: string;

  AppControllerConfiguration_OverwriteConfig_Overwrite: string;

  AppControllerConfiguration_OverwriteConfig_Title: string;

  AppControllerConfiguration_RecommendedTemplateConfig: string;

  AppControllerConfiguration_RecommendedTemplateConfigUsing: string;

  AppControllerConfiguration_RevertChanges: string;

  AppControllerConfiguration_SearchResult: string;

  AppControllerConfiguration_SeeErrorMsgs: string;

  AppControllerConfiguration_Select: string;

  AppControllerConfiguration_SelectedConfig: string;

  AppControllerConfiguration_SelectedConfigBuiltIn: string;

  AppControllerConfiguration_SelectedConfigBuiltInGamepad: string;

  AppControllerConfiguration_SelectedConfigCustomized: string;

  AppControllerConfiguration_Settings: string;

  AppControllerConfiguration_Share: string;

  AppControllerConfiguration_SteamInput: string;

  AppControllerConfiguration_SteamInputAPI: string;

  AppControllerConfiguration_SteamInputAPI_Desc: string;

  AppControllerConfiguration_SteamInputRemap_Desc: string;

  AppControllerConfiguration_SteamInputToggle: string;

  AppControllerConfiguration_SteamInputToggle_Desc: string;

  AppControllerConfiguration_SteamInputTranslation: string;

  AppControllerConfiguration_SteamInputTranslation_Desc: string;

  AppControllerConfiguration_SteamInputTranslation_Desc2_Full: string;

  AppControllerConfiguration_SteamInputTranslation_Desc2_None: string;

  AppControllerConfiguration_SteamInputTranslation_Desc2_Partial: string;

  AppControllerConfiguration_SteamInputTranslation_Desc2_Shortcut: string;

  AppControllerConfiguration_TemplateConfig: string;

  AppControllerConfiguration_TemplateConfigUsing: string;

  AppControllerConfiguration_Upvotes: string;

  AppControllerConfiguration_Upvotes_Plural: string;

  AppControllerConfiguration_ViewLayout: string;

  AppControllerConfigurator_ChooseConfiguration_CopyURL: string;

  AppDetails_Achievements_Locked: string;

  AppDetails_Achievements_Unlocked: string;

  AppDetails_Achievements_YouUnlocked: string;

  AppDetails_AdditionalContent_GameManual: string;

  AppDetails_Artwork: string;

  AppDetails_BadgeLevel: string;

  AppDetails_BadgeLevelNoXP: string;

  AppDetails_BrowseOtherConfigs: string;

  AppDetails_BrowseWorkshop: string;

  AppDetails_BuiltInControllerSupport_Description: string;

  AppDetails_BuiltInControllerSupport_Title: string;

  AppDetails_BuyCards: string;

  AppDetails_ChangeMyScreenshotKey: string;

  AppDetails_ClaimContent: string;

  AppDetails_CloudStatus_Checking: string;

  AppDetails_CloudStatus_Conflict: string;

  AppDetails_CloudStatus_Disabled: string;

  AppDetails_CloudStatus_Downloading: string;

  AppDetails_CloudStatus_DownloadingPercent: string;

  AppDetails_CloudStatus_OutOfSync: string;

  AppDetails_CloudStatus_PendingElsewhere: string;

  AppDetails_CloudStatus_SyncFailed: string;

  AppDetails_CloudStatus_Synchronized: string;

  AppDetails_CloudStatus_Tooltip_Checking: string;

  AppDetails_CloudStatus_Tooltip_Conflict: string;

  AppDetails_CloudStatus_Tooltip_Disabled: string;

  AppDetails_CloudStatus_Tooltip_Downloading: string;

  AppDetails_CloudStatus_Tooltip_OutOfSync: string;

  AppDetails_CloudStatus_Tooltip_PendingElsewhere: string;

  AppDetails_CloudStatus_Tooltip_SyncFailed: string;

  AppDetails_CloudStatus_Tooltip_Synchronized: string;

  AppDetails_CloudStatus_Tooltip_Unknown: string;

  AppDetails_CloudStatus_Tooltip_Uploading: string;

  AppDetails_CloudStatus_Unknown: string;

  AppDetails_CloudStatus_Uploading: string;

  AppDetails_CloudStatus_UploadingPercent: string;

  AppDetails_Community_Guide: string;

  AppDetails_Community_Tooltip1: string;

  AppDetails_Community_Tooltip2: string;

  AppDetails_CommunityFeed_EditPreferences: string;

  AppDetails_CommunityFeed_Inappropriate: string;

  AppDetails_CommunityFeed_LoadCommunity: string;

  AppDetails_CommunityFeed_OutOfContent: string;

  AppDetails_CommunityFeed_ViewContent: string;

  AppDetails_CommunityItem: string;

  AppDetails_Controller_ControllerRequired: string;

  AppDetails_Controller_VRRequired: string;

  AppDetails_Controller_VRSupported: string;

  AppDetails_ControllerEdit: string;

  AppDetails_Developer: string;

  AppDetails_DLCSpotlight_Summary: string;

  AppDetails_Feature_CoOp: string;

  AppDetails_Feature_FamilySharing: string;

  AppDetails_Feature_FullController: string;

  AppDetails_Feature_HDR: string;

  AppDetails_Feature_MultiPlayer: string;

  AppDetails_Feature_PartialController: string;

  AppDetails_Feature_PS4: string;

  AppDetails_Feature_PS4BT: string;

  AppDetails_Feature_PS5: string;

  AppDetails_Feature_PS5BT: string;

  AppDetails_Feature_RemotePlayTogether: string;

  AppDetails_Feature_SinglePlayer: string;

  AppDetails_Feature_SteamAchievements: string;

  AppDetails_Feature_SteamCloud: string;

  AppDetails_Feature_SteamInputAPI: string;

  AppDetails_Feature_SteamWorkshop: string;

  AppDetails_Feature_VRSupport: string;

  AppDetails_Franchise: string;

  AppDetails_Friends_SendMessage: string;

  AppDetails_Friends_ViewAll: string;

  AppDetails_Friends_ViewProfile: string;

  AppDetails_Friends_ViewWishlist: string;

  AppDetails_FriendsInGameNow: string;

  AppDetails_FriendsInGameNow_Plural: string;

  AppDetails_FriendsInGameNow_Short: string;

  AppDetails_FriendsInGameNow_Short_Plural: string;

  AppDetails_FriendsLess: string;

  AppDetails_FriendsMore: string;

  AppDetails_FriendsPlayed: string;

  AppDetails_FriendsPlayed_Label: string;

  AppDetails_FriendsPlayed_Plural: string;

  AppDetails_FriendsPlayed_Short: string;

  AppDetails_FriendsPlayedExpand: string;

  AppDetails_FriendsPlayedRecently: string;

  AppDetails_FriendsPlayedRecently_Plural: string;

  AppDetails_FriendsPlayedRecentlyExpand: string;

  AppDetails_FriendsSection_Title: string;

  AppDetails_FriendsWishlisted: string;

  AppDetails_FriendsWishlisted_Plural: string;

  AppDetails_FriendsWishlisted_Short: string;

  AppDetails_FriendsWishlistExpand: string;

  AppDetails_GameInfo: string;

  AppDetails_GameInfo_CollectionsHeader: string;

  AppDetails_GlobalCompare: string;

  AppDetails_GoOnline: string;

  AppDetails_GoToMedia: string;

  AppDetails_HowToScreenshot: string;

  AppDetails_HowToScreenshotGamepad: string;

  AppDetails_InOfflineMode: string;

  AppDetails_InSharedLibrary: string;

  AppDetails_LastUpdate: string;

  AppDetails_LibraryInUse: string;

  AppDetails_Link_Discussions: string;

  AppDetails_Link_FindGroups: string;

  AppDetails_Link_GameHub: string;

  AppDetails_Link_Guides: string;

  AppDetails_Link_Market: string;

  AppDetails_Link_Store: string;

  AppDetails_Link_Support: string;

  AppDetails_Link_Workshop: string;

  AppDetails_Links_Community: string;

  AppDetails_Links_DLC: string;

  AppDetails_Links_PointsShop: string;

  AppDetails_Links_Store: string;

  AppDetails_ManageDLC: string;

  AppDetails_ManageMyDLC: string;

  AppDetails_ManageMyMedia: string;

  AppDetails_ManageMyMedia_BPM: string;

  AppDetails_ManageMyMedia_BPM_Plural: string;

  AppDetails_ManageMyMedia_Plural: string;

  AppDetails_ManageMyScreenshots: string;

  AppDetails_ManageMyScreenshots_Plural: string;

  AppDetails_MoreItemsFrom: string;

  AppDetails_NewNote: string;

  AppDetails_NoScreenshots: string;

  AppDetails_OpenScreenshotUploader: string;

  AppDetails_OriginalReleaseDate: string;

  AppDetails_PartnerEventFailedLoad: string;

  AppDetails_PctUnlocked: string;

  AppDetails_PlayerUnlockedPercent: string;

  AppDetails_PlayerUnlockedPercentAll: string;

  AppDetails_PlaytestInvitesSpotlight_InvitesRemaining: string;

  AppDetails_PlaytestInvitesSpotlight_InvitesRemaining_Plural: string;

  AppDetails_PlaytestInvitesSpotlight_Summary: string;

  AppDetails_PlaytestInvitesSpotlight_Summary_LimitedLaunch: string;

  AppDetails_Publisher: string;

  AppDetails_ReleaseDate: string;

  AppDetails_Review_AdditionalPlaytime: string;

  AppDetails_Review_AdditionalPlaytime_Software: string;

  AppDetails_Review_ChangedYourMind: string;

  AppDetails_Review_Comments: string;

  AppDetails_Review_Ignore_Stale_Reviews: string;

  AppDetails_Review_IHaveNotChangedMyMind: string;

  AppDetails_Review_NotRecommended: string;

  AppDetails_Review_PlayedForTime: string;

  AppDetails_Review_PlayedForTime_Software: string;

  AppDetails_Review_PlaytimeAtReview: string;

  AppDetails_Review_PlaytimeAtReview_Software: string;

  AppDetails_Review_Recommended: string;

  AppDetails_Review_RecommendGame: string;

  AppDetails_Review_RecommendGameButton_No: string;

  AppDetails_Review_RecommendGameButton_Yes: string;

  AppDetails_Review_RecommendSoftware: string;

  AppDetails_Review_Unignore_Stale_Reviews: string;

  AppDetails_Review_UpVotes: string;

  AppDetails_Review_ViewAll: string;

  AppDetails_Review_ViewAllByFriend: string;

  AppDetails_Review_ViewOrEdit: string;

  AppDetails_Review_WriteReview: string;

  AppDetails_Review_YourReview: string;

  AppDetails_Screenshot: string;

  AppDetails_Screenshot_Caption: string;

  AppDetails_Screenshot_Date: string;

  AppDetails_Screenshot_Dimensions: string;

  AppDetails_Screenshot_SpoilerAlert: string;

  AppDetails_Screenshot_SpoilerAlert_Gamepad: string;

  AppDetails_Screenshot_Uploaded: string;

  AppDetails_SearchCard: string;

  AppDetails_SectionTitle_Achievements: string;

  AppDetails_SectionTitle_Activity: string;

  AppDetails_SectionTitle_AdditionalContent: string;

  AppDetails_SectionTitle_CloudStatus: string;

  AppDetails_SectionTitle_Community: string;

  AppDetails_SectionTitle_Controller: string;

  AppDetails_SectionTitle_DiskSpaceRequired: string;

  AppDetails_SectionTitle_DLC: string;

  AppDetails_SectionTitle_Friends: string;

  AppDetails_SectionTitle_Friends_Software: string;

  AppDetails_SectionTitle_GameNotes: string;

  AppDetails_SectionTitle_Hardware: string;

  AppDetails_SectionTitle_IncludedWith: string;

  AppDetails_SectionTitle_LastLaunched: string;

  AppDetails_SectionTitle_LastPlayed: string;

  AppDetails_SectionTitle_Links: string;

  AppDetails_SectionTitle_Media: string;

  AppDetails_SectionTitle_Media_BPM: string;

  AppDetails_SectionTitle_OfflineMode: string;

  AppDetails_SectionTitle_OpenFriends: string;

  AppDetails_SectionTitle_PlayTime: string;

  AppDetails_SectionTitle_PlayTimeLeft: string;

  AppDetails_SectionTitle_Screenshots: string;

  AppDetails_SectionTitle_SelectedBeta: string;

  AppDetails_SectionTitle_SelectedBetaTooltip: string;

  AppDetails_SectionTitle_SignIn: string;

  AppDetails_SectionTitle_SignIn_Pre: string;

  AppDetails_SectionTitle_TradingCards: string;

  AppDetails_SectionTitle_Updates: string;

  AppDetails_SectionTitle_UsageTime: string;

  AppDetails_SectionTitle_Workshop: string;

  AppDetails_SellCards: string;

  AppDetails_SharedPreferred: string;

  AppDetails_SharedPreferred_Owned: string;

  AppDetails_Shortcut_Explanation: string;

  AppDetails_ShowFriendsList: string;

  AppDetails_SocialMediaLink: string;

  AppDetails_SocialMediaType_4: string;

  AppDetails_SocialMediaType_5: string;

  AppDetails_SocialMediaType_6: string;

  AppDetails_SocialMediaType_7: string;

  AppDetails_Soundtrack_AddToPlaylist: string;

  AppDetails_Soundtrack_AddToQueue: string;

  AppDetails_Soundtrack_DiscNumber: string;

  AppDetails_Soundtrack_DownloadAlbum: string;

  AppDetails_Soundtrack_ParentAppLink: string;

  AppDetails_Soundtrack_PlayAlbum: string;

  AppDetails_Soundtrack_SeeMore: string;

  AppDetails_Soundtrack_Support: string;

  AppDetails_Soundtrack_TotalLength: string;

  AppDetails_Soundtrack_TotalTracks: string;

  AppDetails_Soundtrack_TrackCount: string;

  AppDetails_Soundtrack_ViewAdditionalArtwork: string;

  AppDetails_Soundtrack_ViewOnDisk: string;

  AppDetails_Soundtrack_ViewStorePage: string;

  AppDetails_Subscribed: string;

  AppDetails_SubscribeToItem: string;

  AppDetails_Tab_Achievements: string;

  AppDetails_Tab_Activity: string;

  AppDetails_Tab_Community: string;

  AppDetails_Tab_Controller: string;

  AppDetails_Tab_DLC: string;

  AppDetails_Tab_Friends: string;

  AppDetails_Tab_GameInfo: string;

  AppDetails_Tab_Information: string;

  AppDetails_Tab_Reviews: string;

  AppDetails_Tab_Screenshots: string;

  AppDetails_Tab_Settings: string;

  AppDetails_Tab_TradingCards: string;

  AppDetails_Tab_WhatsNew: string;

  AppDetails_Tab_Workshop: string;

  AppDetails_Tab_YourStuff: string;

  AppDetails_Takeover_Achievements_Header: string;

  AppDetails_Takeover_Achievements_Header_Plural: string;

  AppDetails_Takeover_DLC_Header: string;

  AppDetails_Takeover_DLC_ViewInStore: string;

  AppDetails_Takeover_TradingCards_Header: string;

  AppDetails_Takeover_TradingCards_Header_Plural: string;

  AppDetails_Takeover_Update_Header: string;

  AppDetails_Takeover_Update_ReadMore: string;

  AppDetails_Takeover_Update_ViewAll: string;

  AppDetails_TitleUpdatedSincePlayed: string;

  AppDetails_TitleUpdatedSincePlayedLink: string;

  AppDetails_TradingCards_Tooltip1: string;

  AppDetails_TradingCards_Tooltip2: string;

  AppDetails_TradingCardsLeft: string;

  AppDetails_TradingCardsLeft_Plural: string;

  AppDetails_TradingCardsLevelUp: string;

  AppDetails_TradingCardsMaxed: string;

  AppDetails_UnearnedBadgeXP: string;

  AppDetails_UnsubscribeFromItem: string;

  AppDetails_Video: string;

  AppDetails_ViewAllAchievements: string;

  AppDetails_ViewAllNotes: string;

  AppDetails_ViewAllUpdates: string;

  AppDetails_ViewBadgePage: string;

  AppDetails_ViewConfiguration: string;

  AppDetails_ViewFriendsWhoPlay: string;

  AppDetails_ViewGlobalAchievements: string;

  AppDetails_ViewInMyInventory: string;

  AppDetails_ViewItemInWorkshop: string;

  AppDetails_ViewMoreInWorkshop: string;

  AppDetails_ViewMyInventory: string;

  AppDetails_ViewStoreDLC: string;

  AppDetails_ViewSubscribedItems: string;

  AppDetails_ViewTradingCards: string;

  AppDetails_ViewUploadedScreenshots: string;

  AppDetails_VisitTradeForum: string;

  AppDetails_WorkshopFeaturedHeader: string;

  AppDetails_WorkshopFeaturedHideItem: string;

  AppDetails_WorkshopFeaturedItem: string;

  AppDetails_WorkshopFeaturedMoreInfo: string;

  AppDetails_WorkshopFileSize: string;

  AppDetails_WorkshopFileSizeBytes: string;

  AppDetails_WorkshopFileSizeGb: string;

  AppDetails_WorkshopFileSizeKb: string;

  AppDetails_WorkshopFileSizeMb: string;

  AppDetails_WorkshopLastUpdated: string;

  AppDetails_WorkshopLearnMore: string;

  AppDetails_WorkshopSubCount: string;

  AppDetails_WorkshopSubCount_None: string;

  AppDetails_WorkshopSubCount_Plural: string;

  AppDetails_WorkshopVisit: string;

  AppDetailsAchievement_Hidden: string;

  AppDetailsAchievement_HiddenDesc: string;

  AppDetailsAchievement_HiddenDesc_Unplayed: string;

  AppDetailsActions_ViewScreenshot: string;

  AppDetailsControllerSection_DevSupported: string;

  AppDetailsControllerSection_NoSupport: string;

  AppDetailsControllerSection_NoSupportForDevice: string;

  AppDetailsControllerSection_SteamInput: string;

  AppDetailsControllerSection_SteamInputTranslation: string;

  AppDetailsControllerSection_Title_Playable: string;

  AppDetailsControllerSection_Title_Supported_Dualsense: string;

  AppDetailsControllerSection_Title_Supported_DualShock: string;

  AppDetailsControllerSection_Title_Supported_Generic: string;

  AppDetailsControllerSection_Title_Supported_Xbox: string;

  AppDetailsControllerSection_Title_Unknown: string;

  AppDetailsControllerSection_Title_Unknown_NoSteamInput: string;

  AppDetailsControllerSection_Title_Unsupported: string;

  AppDetailsControllerSection_Title_Unsupported_NoSteamInput: string;

  AppDetailsControllerSection_Title_VR_Only: string;

  AppDetailsControllerSection_Title_VR_Supported: string;

  AppDetailsControllerSection_Unknown: string;

  AppDetailsControllerSection_UnknownSupportForDevice: string;

  AppDetailsControllerSection_VR_Only: string;

  AppDetailsControllerSection_VR_Supported: string;

  AppLaunch_MustUpdateClient_Description: string;

  AppLaunch_MustUpdateClient_Header: string;

  AppLaunchError_BlockedArguments: string;

  AppLaunchError_CreateProcess: string;

  AppLaunchError_CreateProcess_macOS: string;

  AppLaunchError_GameDependency: string;

  AppLaunchError_KickSessions: string;

  AppLaunchError_NotEnoughDiskQuota: string;

  AppLaunchError_NotEnoughDiskSpace: string;

  AppLaunchError_ParentalControlBlocked: string;

  AppLaunchError_ParentalControlBlocked_Platform: string;

  AppLaunchError_PlaytimeLimitExceeded_Minutes: string;

  AppLaunchError_PlaytimeLimitExceeded_Window: string;

  AppLaunchError_RegionRestricted: string;

  AppLaunchError_Requires64BitOS: string;

  AppLaunchError_RequiresNTFS: string;

  AppLaunchError_SharedLibraryLocked: string;

  AppLaunchError_SiteLicenseLocked: string;

  AppLaunchError_Text: string;

  AppLaunchError_Text_Long: string;

  AppOverlay_Achievements: string;

  AppOverlay_BackToGame: string;

  AppOverlay_Browser: string;

  AppOverlay_Clock_ClockTab: string;

  AppOverlay_Clock_ResizeLabel: string;

  AppOverlay_Clock_TimerTab: string;

  AppOverlay_CloseWindow: string;

  AppOverlay_ConfirmExitGame: string;

  AppOverlay_ControllerSettings: string;

  AppOverlay_ExitGame: string;

  AppOverlay_ExitingGame: string;

  AppOverlay_ForceExitGame: string;

  AppOverlay_ForceExitingGame: string;

  AppOverlay_GameDetails: string;

  AppOverlay_GameNotes_CloudSync_Desc: string;

  AppOverlay_GameNotes_CloudSync_Error_Desc: string;

  AppOverlay_GameNotes_CloudSync_Error_Title: string;

  AppOverlay_GameNotes_CloudSync_Title: string;

  AppOverlay_GameNotes_Quota_NumFiles: string;

  AppOverlay_GameNotes_Quota_NumFiles_Desc: string;

  AppOverlay_GameNotes_Quota_Storage: string;

  AppOverlay_GameNotes_Quota_Storage_Desc: string;

  AppOverlay_GameNotes_Quota_Title: string;

  AppOverlay_GameOverview_FavoriteGuides: string;

  AppOverlay_GameOverview_FriendsInGame: string;

  AppOverlay_GameOverview_FriendsRecentlyPlayed: string;

  AppOverlay_GameOverview_LastTwoWeeksPlaytime_Hours: string;

  AppOverlay_GameOverview_LastTwoWeeksPlaytime_Minute: string;

  AppOverlay_GameOverview_LastTwoWeeksPlaytime_Minutes: string;

  AppOverlay_GameOverview_Players: string;

  AppOverlay_GameOverview_Players_View: string;

  AppOverlay_GameOverview_Playtime: string;

  AppOverlay_GameOverview_RecentNews: string;

  AppOverlay_GameOverview_Title: string;

  AppOverlay_GameOverview_TopGuides: string;

  AppOverlay_GameOverview_TotalPlaytime_Hours: string;

  AppOverlay_GameOverview_TotalPlaytime_Minute: string;

  AppOverlay_GameOverview_TotalPlaytime_Minutes: string;

  AppOverlay_GameOverview_YourAchievements: string;

  AppOverlay_GameOverview_YourScreenshots: string;

  AppOverlay_Guides: string;

  AppOverlay_Guides_Author: string;

  AppOverlay_Guides_Desc: string;

  AppOverlay_Guides_Error: string;

  AppOverlay_Guides_Favorites: string;

  AppOverlay_Guides_Favorites_Add: string;

  AppOverlay_Guides_Favorites_Remove: string;

  AppOverlay_Guides_Loading: string;

  AppOverlay_Guides_None: string;

  AppOverlay_Guides_Popular: string;

  AppOverlay_Guides_TOC: string;

  AppOverlay_Guides_TOC_Overview: string;

  AppOverlay_Guides_TotalRatings: string;

  AppOverlay_Guides_TotalRatings_NotEnough: string;

  AppOverlay_Notes: string;

  AppOverlay_OpenKeyboard: string;

  AppOverlay_Playtime_ThisSession: string;

  AppOverlay_Resume: string;

  AppOverlay_StopStreaming: string;

  AppOverlay_SwitchWindows: string;

  AppOverlay_TimedTrial_Remaining: string;

  AppOverlay_Timer_1Min: string;

  AppOverlay_Timer_1Sec: string;

  AppOverlay_Timer_5Min: string;

  AppOverlay_Timer_5Sec: string;

  AppOverlay_Timer_30Sec: string;

  AppOverlay_Timer_Clear: string;

  AppOverlay_Timer_Label_Hours: string;

  AppOverlay_Timer_Label_Minutes: string;

  AppOverlay_Timer_Label_Seconds: string;

  AppOverlay_Timer_Pause: string;

  AppOverlay_Timer_Repeat: string;

  AppOverlay_Timer_Reset: string;

  AppOverlay_Timer_Start: string;

  AppOverlay_Timer_TimeSeparator: string;

  AppOverlay_TimerExpiredNotificationText: string;

  AppOverlay_Toolbar_Achievements: string;

  AppOverlay_Toolbar_AIContentReport: string;

  AppOverlay_Toolbar_AppSpotlight: string;

  AppOverlay_Toolbar_Browser: string;

  AppOverlay_Toolbar_Controller: string;

  AppOverlay_Toolbar_Discussions: string;

  AppOverlay_Toolbar_DLC: string;

  AppOverlay_Toolbar_Friends: string;

  AppOverlay_Toolbar_GameServerBrowser: string;

  AppOverlay_Toolbar_Guides: string;

  AppOverlay_Toolbar_MinimizeWindows: string;

  AppOverlay_Toolbar_MultiplayerSessionLinkShare: string;

  AppOverlay_Toolbar_Notes: string;

  AppOverlay_Toolbar_RemotePlayTogether: string;

  AppOverlay_Toolbar_RestoreMinimizeWindows: string;

  AppOverlay_Toolbar_Screenshots: string;

  AppOverlay_Toolbar_Settings: string;

  AppOverlay_Toolbar_SoundtrackBrowser: string;

  AppOverlay_Toolbar_SoundtrackPlayer: string;

  AppOverlay_Toolbar_Timer: string;

  AppOverlay_Toolbar_Workshop: string;

  AppOverlay_UnsavedDataWarning: string;

  AppOverlayGameAPIOSK_Cancel: string;

  AppOverlayGameAPIOSK_Submit: string;

  AppOverlayGameAPIOSK_Title: string;

  AppPortraitHover_DaysSinceLastUpdate: string;

  AppPortraitHover_DownloadStatusTitle: string;

  AppPortraitHover_DownloadStatusTitle_Update: string;

  AppPortraitHover_FriendsPlaying: string;

  AppPortraitHover_FriendsPlaying_Plural: string;

  AppProperties_AppID: string;

  AppProperties_AutoUpdateAlways: string;

  AppProperties_AutoUpdateAlways_Description: string;

  AppProperties_AutoUpdateBuild: string;

  AppProperties_AutoUpdateDate: string;

  AppProperties_AutoUpdateHighPriority: string;

  AppProperties_AutoUpdateHighPriority_Description: string;

  AppProperties_AutoUpdateOnLaunch: string;

  AppProperties_AutoUpdateOnLaunch_Description: string;

  AppProperties_AutoUpdateSection: string;

  AppProperties_AutoUpdateUseDefault: string;

  AppProperties_AutoUpdateUseDefault_Combine: string;

  AppProperties_AutoUpdateUseDefault_Description: string;

  AppProperties_BackgroundDownloadAlways: string;

  AppProperties_BackgroundDownloadGlobal_Allow: string;

  AppProperties_BackgroundDownloadGlobal_Description: string;

  AppProperties_BackgroundDownloadGlobal_Pause: string;

  AppProperties_BackgroundDownloadNever: string;

  AppProperties_BackgroundDownloadsDescription: string;

  AppProperties_BackgroundDownloadsSection: string;

  AppProperties_Beta_AccessCode: string;

  AppProperties_Beta_AccessCodeInvalid: string;

  AppProperties_Beta_AccessCodeSuccess: string;

  AppProperties_Beta_CheckCode: string;

  AppProperties_Beta_LastUpdated: string;

  AppProperties_Beta_Name: string;

  AppProperties_Beta_OptInto: string;

  AppProperties_Beta_Private: string;

  AppProperties_Beta_Select_Default: string;

  AppProperties_Beta_Select_Default_Desc: string;

  AppProperties_Beta_Selection: string;

  AppProperties_Beta_SelectionDescription: string;

  AppProperties_Beta_SelectNoBeta: string;

  AppProperties_BetasPage: string;

  AppProperties_BorrowedFromFamily: string;

  AppProperties_BorrowedFromMember: string;

  AppProperties_ChoosePreferredLender: string;

  AppProperties_CompatibilityNoOptions: string;

  AppProperties_CompatibilityPage: string;

  AppProperties_Compatilibity_OverrideArmTranslationOptions: string;

  AppProperties_CompatilibityForceTool: string;

  AppProperties_Controller_Generic: string;

  AppProperties_Controller_NintendoSwitch: string;

  AppProperties_Controller_PlayStation: string;

  AppProperties_Controller_Remote: string;

  AppProperties_Controller_Steam: string;

  AppProperties_Controller_Xbox: string;

  AppProperties_ControllerPage: string;

  AppProperties_Customization: string;

  AppProperties_Customization_ArtworkSection: string;

  AppProperties_Customization_Change: string;

  AppProperties_Customization_MiscSection: string;

  AppProperties_Customization_Reset: string;

  AppProperties_Customization_SortOrder: string;

  AppProperties_Customization_SortOrder_Description: string;

  AppProperties_Dlc_DateAdded: string;

  AppProperties_Dlc_Installed: string;

  AppProperties_Dlc_Name: string;

  AppProperties_Dlc_Search: string;

  AppProperties_Dlc_SizeDisk: string;

  AppProperties_Dlc_State: string;

  AppProperties_Dlc_State_downloading: string;

  AppProperties_Dlc_State_installed: string;

  AppProperties_Dlc_State_notinstalled: string;

  AppProperties_Dlc_State_preloaded: string;

  AppProperties_Dlc_State_preloading: string;

  AppProperties_Dlc_ViewInStore: string;

  AppProperties_DLCPage: string;

  AppProperties_EnableOverlay: string;

  AppProperties_EnableSteamCloud: string;

  AppProperties_EnableSteamCloudSyncOnSuspend: string;

  AppProperties_FeedbackPage: string;

  AppProperties_FeedbackPage_Agree: string;

  AppProperties_FeedbackPage_Disagree: string;

  AppProperties_GameRecording: string;

  AppProperties_GameRecording_Disabled: string;

  AppProperties_GameRecording_Disabled_Description: string;

  AppProperties_GameRecording_Enabled: string;

  AppProperties_GameRecording_Enabled_Description: string;

  AppProperties_GameRecording_Enabled_Label: string;

  AppProperties_GameRecording_GlobalStatus: string;

  AppProperties_GameRecording_GlobalStatus_Background: string;

  AppProperties_GameRecording_GlobalStatus_Button: string;

  AppProperties_GameRecording_GlobalStatus_Manual: string;

  AppProperties_GameRecording_GlobalStatus_ManualHotkeyFallback: string;

  AppProperties_GameRecording_GlobalStatus_Never: string;

  AppProperties_GeneralPage: string;

  AppProperties_IsThirdPartyUpdater: string;

  AppProperties_LaunchOptionsDescription: string;

  AppProperties_LaunchOptionsSection: string;

  AppProperties_LocalFilesBackup_beta: string;

  AppProperties_LocalFilesBackup_demo: string;

  AppProperties_LocalFilesBackup_game: string;

  AppProperties_LocalFilesBackup_music: string;

  AppProperties_LocalFilesBackup_software: string;

  AppProperties_LocalFilesBackup_tool: string;

  AppProperties_LocalFilesBackup_video: string;

  AppProperties_LocalFilesBackupFAQ: string;

  AppProperties_LocalFilesBackupLabel_beta: string;

  AppProperties_LocalFilesBackupLabel_demo: string;

  AppProperties_LocalFilesBackupLabel_game: string;

  AppProperties_LocalFilesBackupLabel_music: string;

  AppProperties_LocalFilesBackupLabel_software: string;

  AppProperties_LocalFilesBackupLabel_tool: string;

  AppProperties_LocalFilesBackupLabel_video: string;

  AppProperties_LocalFilesBrowse: string;

  AppProperties_LocalFilesMove: string;

  AppProperties_LocalFilesMoveLabel_beta: string;

  AppProperties_LocalFilesMoveLabel_demo: string;

  AppProperties_LocalFilesMoveLabel_game: string;

  AppProperties_LocalFilesMoveLabel_music: string;

  AppProperties_LocalFilesMoveLabel_software: string;

  AppProperties_LocalFilesMoveLabel_tool: string;

  AppProperties_LocalFilesMoveLabel_video: string;

  AppProperties_LocalFilesPage: string;

  AppProperties_LocalFilesSize: string;

  AppProperties_LocalFilesSizeOnDrive: string;

  AppProperties_LocalFilesVerify_beta: string;

  AppProperties_LocalFilesVerify_Complete: string;

  AppProperties_LocalFilesVerify_demo: string;

  AppProperties_LocalFilesVerify_Failed: string;

  AppProperties_LocalFilesVerify_game: string;

  AppProperties_LocalFilesVerify_music: string;

  AppProperties_LocalFilesVerify_RunningInstallScript: string;

  AppProperties_LocalFilesVerify_software: string;

  AppProperties_LocalFilesVerify_tool: string;

  AppProperties_LocalFilesVerify_UpdatingAppInfo: string;

  AppProperties_LocalFilesVerify_VerifyingFiles: string;

  AppProperties_LocalFilesVerify_video: string;

  AppProperties_LocalFilesVerifyFAQ: string;

  AppProperties_LocalFilesVerifyLabel_beta: string;

  AppProperties_LocalFilesVerifyLabel_demo: string;

  AppProperties_LocalFilesVerifyLabel_game: string;

  AppProperties_LocalFilesVerifyLabel_music: string;

  AppProperties_LocalFilesVerifyLabel_software: string;

  AppProperties_LocalFilesVerifyLabel_tool: string;

  AppProperties_LocalFilesVerifyLabel_video: string;

  AppProperties_OverlayData: string;

  AppProperties_OverlayData_Delete: string;

  AppProperties_OverlayData_DeleteConfirm: string;

  AppProperties_OverlayData_Desc: string;

  AppProperties_OwnedButOtherAvailable: string;

  AppProperties_Privacy_DialogDescription: string;

  AppProperties_Privacy_DLC_Customized: string;

  AppProperties_Privacy_DLC_MarkedPrivate: string;

  AppProperties_Privacy_DLC_NotMarkedPrivate: string;

  AppProperties_Privacy_MarkAppHidden: string;

  AppProperties_Privacy_MarkAppHidden_Description: string;

  AppProperties_Privacy_MarkAppPrivate: string;

  AppProperties_Privacy_MarkAppPrivate_Description: string;

  AppProperties_Privacy_MarkAppPrivate_Offline: string;

  AppProperties_PrivacyPage: string;

  AppProperties_ResolutionOverride: string;

  AppProperties_ResolutionOverride_Internal: string;

  AppProperties_RunningInstallScript: string;

  AppProperties_SelectLanguage: string;

  AppProperties_SelectLanguage_Description: string;

  AppProperties_SharingNotSupported: string;

  AppProperties_Shortcut_BrowseFiles: string;

  AppProperties_Shortcut_ChooseIconDialogTitle: string;

  AppProperties_Shortcut_ChooseStartDirectoryDialogTitle: string;

  AppProperties_Shortcut_InVR: string;

  AppProperties_Shortcut_StartInFolder: string;

  AppProperties_Shortcut_TargetExecutable: string;

  AppProperties_ShortcutPage: string;

  AppProperties_SteamCloudAvailable: string;

  AppProperties_SteamCloudDescription: string;

  AppProperties_SteamCloudGlobalDisabled: string;

  AppProperties_SteamCloudGlobalSettingsLink: string;

  AppProperties_SteamCloudSection: string;

  AppProperties_SteamCloudStored: string;

  AppProperties_SteamInput: string;

  AppProperties_SteamInput_Connected: string;

  AppProperties_SteamInput_Disabled: string;

  AppProperties_SteamInput_Enabled: string;

  AppProperties_SteamInput_ReasonDeckDefault: string;

  AppProperties_SteamInput_ReasonDeveloperSetting: string;

  AppProperties_SteamInput_ReasonGameOverride: string;

  AppProperties_SteamInput_ReasonGeneralSetting: string;

  AppProperties_SteamInput_ReasonRequired: string;

  AppProperties_SteamInputDefaultSettings: string;

  AppProperties_SteamInputDesktopConfigInLauncher: string;

  AppProperties_SteamInputGeneralSetting: string;

  AppProperties_SteamInputGeneralSetting_Link: string;

  AppProperties_SteamInputOff: string;

  AppProperties_SteamInputOn: string;

  AppProperties_SteamInputOverride: string;

  AppProperties_SteamInputRequiresRestart: string;

  AppProperties_SteamInputStatus: string;

  AppProperties_Title: string;

  AppProperties_UpdatesPage: string;

  AppProperties_UseTheatreWhileVR: string;

  AppProperties_Workshop_Advanced: string;

  AppProperties_Workshop_Advanced_Desc: string;

  AppProperties_Workshop_Advanced_Hide: string;

  AppProperties_Workshop_Advanced_Show: string;

  AppProperties_Workshop_Collection_Presets: string;

  AppProperties_Workshop_Collection_Presets_Desc: string;

  AppProperties_Workshop_Dependencies: string;

  AppProperties_Workshop_DependsOn: string;

  AppProperties_Workshop_DependsOntNotSubscribed: string;

  AppProperties_Workshop_DisableAll: string;

  AppProperties_Workshop_DisableLocally: string;

  AppProperties_Workshop_EnableAll: string;

  AppProperties_Workshop_EnableLocally: string;

  AppProperties_Workshop_FileSize: string;

  AppProperties_Workshop_Filter: string;

  AppProperties_Workshop_Filter_Label: string;

  AppProperties_Workshop_LoadOrder_Desc: string;

  AppProperties_Workshop_LoadOrder_MoveToBottom: string;

  AppProperties_Workshop_LoadOrder_MoveToTop: string;

  AppProperties_Workshop_LoadOrder_Title: string;

  AppProperties_Workshop_ResetLoadOrder: string;

  AppProperties_Workshop_SaveFilteredToCollection: string;

  AppProperties_Workshop_ShowCollectionPresets: string;

  AppProperties_Workshop_Snapshot_Latest: string;

  AppProperties_Workshop_SortBy_Label: string;

  AppProperties_Workshop_Subscription_Sort_Disabled: string;

  AppProperties_Workshop_Subscription_Sort_Enabled: string;

  AppProperties_Workshop_Subscription_Sort_LoadOrder: string;

  AppProperties_Workshop_Subscription_Sort_MissingDependencies: string;

  AppProperties_Workshop_Subscription_Sort_Name: string;

  AppProperties_Workshop_Subscription_Sort_Size: string;

  AppProperties_Workshop_Subscription_Sort_Subscribed: string;

  AppProperties_Workshop_Subscription_Sort_Updated: string;

  AppProperties_Workshop_SubscriptionTime: string;

  AppProperties_Workshop_Tags: string;

  AppProperties_Workshop_ToggleEnabled: string;

  AppProperties_Workshop_ToggleEnabled_Desc: string;

  AppProperties_Workshop_Unsubscribe: string;

  AppProperties_Workshop_UpdatedTime: string;

  AppProperties_Workshop_Visit: string;

  AppProperties_WorkshopPage: string;

  AppSpotlight_PostGameSummary: string;

  AppType_0: string;

  AppType_1: string;

  AppType_2: string;

  AppType_4: string;

  AppType_20: string;

  AppType_800: string;

  AppType_2000: string;

  AppType_Singular_0: string;

  AppType_Singular_1: string;

  AppType_Singular_2: string;

  AppType_Singular_4: string;

  AppType_Singular_20: string;

  AppType_Singular_800: string;

  AppType_Singular_2000: string;

  AppType_Singular_8000: string;

  AppType_Singular_40000000: string;

  AppUpdateOverrideManagement_Description: string;

  AppUpdateOverrideManagement_Done: string;

  AppUpdateOverrideManagement_SearchHint: string;

  AppUpdateOverrideManagement_Setting: string;

  AppUpdateOverrideManagement_Title: string;

  ArtworkModal_CreatedBy: string;

  ArtworkModal_FileSize: string;

  ArtworkModal_Posted: string;

  ArtworkModal_ScrollForDetails: string;

  ArtworkModal_ScrollForMore: string;

  ArtworkModal_Size: string;

  ArtworkModal_ViewAll: string;

  Audio_Channels_5Point1: string;

  Audio_Channels_7Point1: string;

  Audio_Channels_Stereo: string;

  Audio_DeviceAux: string;

  Audio_DeviceDefault: string;

  Audio_DeviceDefaultWithDevice: string;

  Audio_DeviceExternal: string;

  Audio_DeviceMicrophone: string;

  Audio_DeviceSpeakers: string;

  Audio_Header_General: string;

  Audio_Header_Output: string;

  Audio_Header_Voice: string;

  Audio_InputDevice: string;

  Audio_InputVolume: string;

  Audio_No_Input_Devices_Detected: string;

  Audio_No_Output_Devices_Detected: string;

  Audio_OutputDevice: string;

  Audio_OutputVolume: string;

  Audio_Setting_Enable_UI_Sounds: string;

  Audio_SpeakerConfiguration: string;

  Audio_SpeakerTuning: string;

  Audio_Volume: string;

  Audio_VRAudioMirror: string;

  Audio_VRAudioMirror_Mute: string;

  Audio_VRAudioMirror_Unmute: string;

  Audio_VRAudioMirror_Volume: string;

  Audio_VRHeadset_Mute: string;

  Audio_VRHeadset_Unmute: string;

  Audio_VRHeadset_Volume: string;

  Audio_VRMicrophone_Mute: string;

  Audio_VRMicrophone_Unmute: string;

  Audio_VRMicrophone_Volume: string;

  BackupApps_BackingUpFiles: string;

  BackupApps_BackupDirectory: string;

  BackupApps_CannotBackupNoEnoughDiskSpace: string;

  BackupApps_CannotBackupToRootDirectory: string;

  BackupApps_CannotCreateBackupDirectory: string;

  BackupApps_ChangeDirectory: string;

  BackupApps_ChooseBackupDirectory: string;

  BackupApps_Description: string;

  BackupApps_Failed: string;

  BackupApps_Finished: string;

  BackupApps_OpenFolder: string;

  BackupApps_Start: string;

  BackupApps_Title: string;

  BasicGameCarousel_NotInstalled: string;

  BasicGameCarousel_TotalPlayTime_Hours: string;

  BasicGameCarousel_TotalPlayTime_Minutes: string;

  Bbcode_Originally_Posted_By: string;

  Beta_BetaTag: string;

  Beta_Changelist: string;

  Beta_GiveFeedback: string;

  BetaOptIn_Dismiss: string;

  BetaOptIn_SeeChanged: string;

  BetaOptIn_ThankYou: string;

  BetaOptIn_Updated: string;

  BetaOptIn_WeShipped: string;

  BigPictureMode: string;

  BigPictureModeRunningWithCancel: string;

  BootReserve_Dialog_Contents: string;

  BootReserve_Dialog_Title: string;

  BorrowGameDialog_Button_InFamily: string;

  BorrowGameDialog_Button_NoFamily: string;

  BorrowGameDialog_Description_InFamily: string;

  BorrowGameDialog_Description_NoFamily: string;

  BorrowGameDialog_Purchase: string;

  BorrowGameDialog_Title: string;

  BottomBar_ActivateProduct: string;

  BottomBar_AddGame: string;

  BottomBar_AddNonSteam: string;

  BottomBar_BrowseStore: string;

  BottomBar_Downloading: string;

  BottomBar_Downloading_Progress: string;

  BottomBar_DownloadQueue: string;

  BottomBar_DownloadQueue_Plural: string;

  BottomBar_Downloads: string;

  BottomBar_DownloadsPaused: string;

  BottomBar_FriendsAndChat: string;

  BottomBar_Manage: string;

  BottomBar_NoConnection: string;

  BottomBar_Offline: string;

  BottomBar_PausedQueue: string;

  BottomBar_PausedQueue_Plural: string;

  BroadcastChat_Title_Viewers: string;

  BroadcastControl_Button_OpenChat: string;

  BroadcastControl_Button_Settings: string;

  BroadcastControl_Button_StopBroadcast: string;

  BroadcastControl_Button_Watch: string;

  BroadcastControl_Title: string;

  BroadcastControl_Viewers: string;

  BroadcastControl_Viewers_Plural: string;

  BroadcastError_DisabledOverlay: string;

  BroadcastError_DisabledUser: string;

  BroadcastError_ServiceUnavailable: string;

  BroadcastError_ServiceUnavailable_CompatEnabled: string;

  BroadcastFirstTime_Default: string;

  BroadcastFirstTime_FAQ: string;

  BroadcastFirstTime_Requestor: string;

  BroadcastFirstTime_Settings_Header: string;

  BroadcastFirstTime_Title: string;

  BroadcastFirstTime_Welcome: string;

  BroadcastPrivacy_Disabled: string;

  BroadcastPrivacy_FriendsAllowed: string;

  BroadcastPrivacy_FriendsApprove: string;

  BroadcastPrivacy_Public: string;

  BroadcastResolutionOption_360p: string;

  BroadcastResolutionOption_480p: string;

  BroadcastResolutionOption_720p: string;

  BroadcastResolutionOption_1080p: string;

  BroadcastStatus_Broadcasting: string;

  BroadcastStatus_FrameRate: string;

  BroadcastStatus_Live: string;

  BroadcastStatus_NotBroadcasting: string;

  BroadcastStatus_UploadRate: string;

  Browser_AddBookmark: string;

  Browser_CopyOnClick: string;

  Browser_Home: string;

  Browser_InputSupportLevel_None: string;

  Browser_InputSupportLevel_None_Desktop: string;

  Browser_Loading: string;

  Browser_NewTab: string;

  Browser_NotSecure: string;

  Browser_OrganizeBookmarks: string;

  Browser_OrganizeBookmarks_Edit: string;

  Browser_OrganizeBookmarks_EditBookmark: string;

  Browser_OrganizeBookmarks_EditLink: string;

  Browser_OrganizeBookmarks_EditName: string;

  Browser_OrganizeBookmarks_Remove: string;

  Browser_OrganizeBookmarks_Title: string;

  Browser_RemoveBookmark: string;

  Browser_URLCopied: string;

  BrowserContextMenu_Copy: string;

  BrowserContextMenu_CopyLink: string;

  BrowserContextMenu_CopyPageURL: string;

  BrowserContextMenu_GoBack: string;

  BrowserContextMenu_GoForward: string;

  BrowserContextMenu_OpenLinkInNewTab: string;

  BrowserContextMenu_Paste: string;

  BrowserContextMenu_Reload: string;

  BrowserFindInPage_Close: string;

  BrowserFindInPage_Next: string;

  BrowserFindInPage_Previous: string;

  BrowserJSDialog_Header: string;

  Button_AbortGame: string;

  Button_Next: string;

  Button_Prev: string;

  ChangeUser: string;

  ChangeUser_Desc1: string;

  ChangeUser_Desc2: string;

  ChangeUser_Description: string;

  ChangeUser_Description_NoCachedCredentials: string;

  ChangeUser_OKButton: string;

  ChangeUser_Prompt: string;

  ChangeUser_ShouldShowUserChooser: string;

  ChangeUser_Title: string;

  ChatFilterType_AllowProfanity: string;

  ChatFilterType_Disabled: string;

  ChatFilterType_Enabled: string;

  Clear: string;

  ClientUpdate_AlreadyUpToDate: string;

  ClientUpdate_ApplyAndRestart: string;

  ClientUpdate_Applying_GenericError: string;

  ClientUpdate_ApplyUpdate_Button: string;

  ClientUpdate_Available_Prompt: string;

  ClientUpdate_AvailableAndPatchNotes: string;

  ClientUpdate_Checking: string;

  ClientUpdate_Checking_GenericError: string;

  ClientUpdate_Defer: string;

  ClientUpdate_Download: string;

  ClientUpdate_Downloading: string;

  ClientUpdate_ErrorTryAgain: string;

  ClientUpdate_NotEnoughSpace: string;

  ClientUpdate_NowUpToDate: string;

  ClientUpdate_RestartPending_Prompt: string;

  ClippingTour_Share_Content_1: string;

  ClippingTour_Share_Content_2: string;

  ClippingTour_Share_Title: string;

  ClippingTour_Tools_Content_1: string;

  ClippingTour_Tools_Content_2: string;

  ClippingTour_Tools_Title: string;

  CloudConflict_AppLaunch_Description: string;

  CloudConflict_AppLaunch_Footer_Note: string;

  CloudConflict_AppLaunch_Header: string;

  CloudConflict_ControllerConfigs_Description: string;

  CloudConflict_ControllerConfigs_Header: string;

  CloudConflict_ControllerConfigs_KeepLocal: string;

  CloudConflict_ControllerConfigs_KeepRemote: string;

  CloudConflict_Description: string;

  CloudConflict_Footer_Note: string;

  CloudConflict_Header: string;

  CloudConflict_KeepLocal: string;

  CloudConflict_KeepLocal_Description: string;

  CloudConflict_KeepRemote: string;

  CloudConflict_KeepRemote_Description: string;

  CloudConflict_LastModified: string;

  CloudConflict_Newer: string;

  CloudConflict_Older: string;

  CloudConflict_Unknown: string;

  CloudPendingOps_Cancel: string;

  CloudPendingOps_Continue: string;

  CloudPendingOps_Description: string;

  CloudPendingOps_Header: string;

  CloudPendingOps_Operation_AppRunning: string;

  CloudPendingOps_Operation_AppSuspended: string;

  CloudPendingOps_Operation_None: string;

  CloudPendingOps_Operation_Uploading: string;

  CloudPendingOps_Operation_UploadNotStarted: string;

  CloudPendingOps_Warning: string;

  CloudPendingOps_Warning_Mobile: string;

  CloudPendingOps_Warning_PC: string;

  CloudPendingOps_Warning_SteamDeck: string;

  CloudPendingOps_Warning_Tesla: string;

  CloudSettings_CloudEnabled: string;

  CloudSettings_CloudEnabled_Description: string;

  CloudSettings_ShowScreenshotManager: string;

  CloudSettings_ShowScreenshotManager_Description: string;

  CloudSyncFailed_AppLaunch_Cancel: string;

  CloudSyncFailed_AppLaunch_Continue: string;

  CloudSyncFailed_AppLaunch_Description: string;

  CloudSyncFailed_AppLaunch_Header: string;

  CloudSyncFailed_AppLaunch_Warning: string;

  CloudSyncFailed_Cancel: string;

  CloudSyncFailed_Continue: string;

  CloudSyncFailed_Description: string;

  CloudSyncFailed_Header: string;

  CloudSyncFailed_Warning: string;

  CodeHelp_Title: string;

  Collection_DynamicCollection: string;

  Collection_FreezeDynamicCollection_Button: string;

  Collection_FreezeDynamicCollection_Confirmation: string;

  Collection_FreezeDynamicCollection_DialogTitle: string;

  Collection_FreezeDynamicCollection_ToolTip: string;

  CollectionAction_CannotOverwrite: string;

  CollectionAction_Collapse: string;

  CollectionAction_CollapseAll: string;

  CollectionAction_CollapseAllCollections: string;

  CollectionAction_ConfirmDelete: string;

  CollectionAction_Delete: string;

  CollectionAction_DeleteDialog: string;

  CollectionAction_DeleteFailed: string;

  CollectionAction_Edit: string;

  CollectionAction_Expand: string;

  CollectionAction_ExpandAll: string;

  CollectionAction_ExpandAllCollections: string;

  CollectionAction_Manage: string;

  CollectionAction_Rename: string;

  CollectionAction_SaveFailed: string;

  CollectionAction_ViewOnlyThis: string;

  CollectionAction_ViewOnlyThisFavorites: string;

  CollectionAction_ViewOnlyThisUncategorized: string;

  CollectionEdit_CollectionNameField: string;

  CollectionEdit_RenameButton: string;

  CollectionView_EmptyCollection: string;

  CollectionView_EmptyCollection_BecauseFilter: string;

  CollectionView_EmptyCollection_BecauseFilter_Plural: string;

  CollectionView_EmptyDynamicCollection_Line1: string;

  CollectionView_EmptyDynamicCollection_Line2: string;

  CollectionView_EmptyReadOnlyCollection: string;

  CollectionView_GamesExcluded: string;

  CollectionView_GamesExcluded_Desc: string;

  CollectionView_MissingCollection: string;

  CollectionViewHeader_ManuallyRemovedApps_WithCount: string;

  CollectionViewHeader_Tooltip_ManuallyAddedApp: string;

  CollectionViewHeader_Tooltip_ManuallyRemovedApp: string;

  CollectionViewHeader_Tooltip_ManuallyRemovedApps_WithCount: string;

  CollectionViewHeader_UnknownApp: string;

  ColorPicker_Alpha: string;

  ColorPicker_Brightness: string;

  ColorPicker_Hue: string;

  ColorPicker_Saturation: string;

  Common_Advanced_View: string;

  Common_Basic_View: string;

  CommunityItem_Menu_RateDown: string;

  CommunityItem_Menu_RateUp: string;

  CommunityItem_Menu_Report: string;

  ContentManagement_AddDrive: string;

  ContentManagement_AddDriveDropdownOption: string;

  ContentManagement_AddFolder_AvailableSpace: string;

  ContentManagement_AddFolder_Browse: string;

  ContentManagement_AddFolder_OK: string;

  ContentManagement_AddFolder_Text: string;

  ContentManagement_AppBody: string;

  ContentManagement_AppPlayed: string;

  ContentManagement_AppSelected: string;

  ContentManagement_AppSize: string;

  ContentManagement_BrowseFolder: string;

  ContentManagement_Capacity: string;

  ContentManagement_DefaultDrive: string;

  ContentManagement_Description: string;

  ContentManagement_DirectoryPicker_Title: string;

  ContentManagement_DriveSettings: string;

  ContentManagement_Error_DriveAlreadyHasLibrary: string;

  ContentManagement_Error_FailedToAdd: string;

  ContentManagement_Error_NoDriveRoot: string;

  ContentManagement_Error_NotEmptyFolder: string;

  ContentManagement_Error_NotExecutableFolder: string;

  ContentManagement_Error_NotWritableFolder: string;

  ContentManagement_ExternalMicroSD: string;

  ContentManagement_FixedDrive: string;

  ContentManagement_Folder_AdvancedOptions: string;

  ContentManagement_Format: string;

  ContentManagement_Format_Confirm: string;

  ContentManagement_Format_SetLabel: string;

  ContentManagement_Format_Title: string;

  ContentManagement_Format_Validate: string;

  ContentManagement_FormatDrive: string;

  ContentManagement_FormatDrive_HowTo: string;

  ContentManagement_FormatDrive_Message_KnownHardware: string;

  ContentManagement_FormatDrive_Message_UnknownHardware: string;

  ContentManagement_FormatError_Dismiss: string;

  ContentManagement_FormatError_Generic: string;

  ContentManagement_FormatError_Title: string;

  ContentManagement_FormatError_Validate: string;

  ContentManagement_FreeSpace: string;

  ContentManagement_InternalStorage: string;

  ContentManagement_IsDefault: string;

  ContentManagement_Items: string;

  ContentManagement_LastPlayed: string;

  ContentManagement_LowDiskSpaceDialog_Desc_KnownHardware: string;

  ContentManagement_LowDiskSpaceDialog_Desc_UnknownHardware: string;

  ContentManagement_LowDiskSpaceDialog_Title: string;

  ContentManagement_LowDiskSpaceHeader_Tooltip: string;

  ContentManagement_LowDiskSpaceNotification_Body: string;

  ContentManagement_LowDiskSpaceNotification_Title: string;

  ContentManagement_MakeDefault: string;

  ContentManagement_Media: string;

  ContentManagement_MoveApps_Button: string;

  ContentManagement_MoveApps_CantMove: string;

  ContentManagement_MoveApps_Done: string;

  ContentManagement_MoveApps_Drive: string;

  ContentManagement_MoveApps_Failed: string;

  ContentManagement_MoveApps_InvalidPath: string;

  ContentManagement_MoveApps_SharedContent: string;

  ContentManagement_MoveApps_TextMultiple: string;

  ContentManagement_MoveApps_TextSingle: string;

  ContentManagement_MoveApps_Title: string;

  ContentManagement_MoveApps_Working: string;

  ContentManagement_MoveButton: string;

  ContentManagement_OtherToolTip_Description: string;

  ContentManagement_OtherToolTip_Header: string;

  ContentManagement_Path: string;

  ContentManagement_RefreshDrive: string;

  ContentManagement_RemovableDrive: string;

  ContentManagement_RemoveDrive: string;

  ContentManagement_RemoveDrive_ConfirmDesc: string;

  ContentManagement_RemoveDrive_ConfirmTitle: string;

  ContentManagement_RemoveDriveFailed: string;

  ContentManagement_RenameDrive: string;

  ContentManagement_RenameDriveText: string;

  ContentManagement_RepairFolder: string;

  ContentManagement_RepairFolder_Done: string;

  ContentManagement_RepairFolder_Failed: string;

  ContentManagement_RepairFolder_Starting: string;

  ContentManagement_RepairFolder_Text: string;

  ContentManagement_RepairFolder_Working: string;

  ContentManagement_SelectedApps: string;

  ContentManagement_SelectedApps_Plural: string;

  ContentManagement_SpaceFreeOf: string;

  ContentManagement_Title: string;

  ContentManagement_TotalSize: string;

  ContentManagement_UninstallButton: string;

  ContentManagement_Unmount: string;

  ContentManagement_Unmount_Error_Busy: string;

  ContentManagement_Unmount_Error_Dismiss: string;

  ContentManagement_Unmount_Error_Generic: string;

  ContentManagement_Unmount_Error_Title: string;

  ContentManagement_UsedByDLC: string;

  ContentManagement_UsedByGames: string;

  ContentManagement_UsedByOther: string;

  ContentManagement_UsedByShaders: string;

  ContentManagement_UsedByUpdates: string;

  ContentManagement_UsedByWorkshop: string;

  ContextMenu_BrowseScreenshot: string;

  ContextMenu_ManageScreenshots: string;

  ContextMenu_SaveScreenshot: string;

  controller_8bitdo: string;

  controller_android: string;

  controller_apple: string;

  controller_generic: string;

  controller_hori_steam: string;

  controller_legion_go: string;

  controller_legion_go_s: string;

  controller_mobile_touch: string;

  controller_neptune: string;

  controller_none: string;

  controller_ps3: string;

  controller_ps4: string;

  controller_ps5: string;

  controller_ps5_edge: string;

  controller_rog_ally: string;

  controller_steamcontroller_gordon: string;

  controller_steamcontroller_neptune: string;

  controller_steamcontroller_triton: string;

  controller_steamcontroller_unknown: string;

  controller_steamos_handheld: string;

  controller_switch_joycon_left: string;

  controller_switch_joycon_pair: string;

  controller_switch_joycon_right: string;

  controller_switch_pro: string;

  controller_unknown: string;

  controller_unspecified: string;

  controller_wii: string;

  controller_xbox360: string;

  controller_xboxelite: string;

  controller_xboxone: string;

  controller_zotac_zone: string;

  ControllerActionKey_Add_ActionSet_Layer: string;

  ControllerActionKey_BigPicture_Minimize: string;

  ControllerActionKey_BigPicture_Open: string;

  ControllerActionKey_BigPicture_Quit: string;

  ControllerActionKey_BrightnessDown: string;

  ControllerActionKey_BrightnessUp: string;

  ControllerActionKey_Camera_Horizon_Reset: string;

  ControllerActionKey_Camera_TurnToFaceDirection: string;

  ControllerActionKey_Change_Player_Number: string;

  ControllerActionKey_Change_Preset: string;

  ControllerActionKey_Change_TouchscreenMode_Hover: string;

  ControllerActionKey_Change_TouchscreenMode_LeftClick: string;

  ControllerActionKey_Change_TouchscreenMode_MiddleClick: string;

  ControllerActionKey_Change_TouchscreenMode_Native: string;

  ControllerActionKey_Change_TouchscreenMode_None: string;

  ControllerActionKey_Change_TouchscreenMode_RightClick: string;

  ControllerActionKey_Controller_PowerOff: string;

  ControllerActionKey_DotsPer360CalibrationSpin: string;

  ControllerActionKey_Empty_Sub_Command: string;

  ControllerActionKey_Hold_ActionSet_Layer: string;

  ControllerActionKey_Host_PowerOff: string;

  ControllerActionKey_Host_Restart: string;

  ControllerActionKey_Host_Suspend: string;

  ControllerActionKey_Layer_Empty_Binding: string;

  ControllerActionKey_Mouse_Delta: string;

  ControllerActionKey_Mouse_Position: string;

  ControllerActionKey_Quit_Application: string;

  ControllerActionKey_Remove_ActionSet_Layer: string;

  ControllerActionKey_Screen_Brightness_Down: string;

  ControllerActionKey_Screen_Brightness_Up: string;

  ControllerActionKey_ScreenReader_Disable: string;

  ControllerActionKey_ScreenReader_Enable: string;

  ControllerActionKey_ScreenReader_NextHeading: string;

  ControllerActionKey_ScreenReader_NextItem: string;

  ControllerActionKey_ScreenReader_NextLandmark: string;

  ControllerActionKey_ScreenReader_NextWord: string;

  ControllerActionKey_ScreenReader_PrevHeading: string;

  ControllerActionKey_ScreenReader_PrevItem: string;

  ControllerActionKey_ScreenReader_PrevLandmark: string;

  ControllerActionKey_ScreenReader_PrevWord: string;

  ControllerActionKey_ScreenReader_StopTalking: string;

  ControllerActionKey_ScreenReader_ToggleMode: string;

  ControllerActionKey_Screenshot: string;

  ControllerActionKey_Set_LED: string;

  ControllerActionKey_Show_Keyboard: string;

  ControllerActionKey_System_Key_1: string;

  ControllerActionKey_Toggle_Lizard_Mode: string;

  ControllerActionKey_Toggle_Magnifier: string;

  ControllerBinding_2DScrollwheelClick: string;

  ControllerBinding_2DScrollwheelDoubleTap: string;

  ControllerBinding_2DScrollwheelTouch: string;

  ControllerBinding_AbsMouseClick: string;

  ControllerBinding_AbsMouseClick_Description: string;

  ControllerBinding_AbsMouseGyroLeft: string;

  ControllerBinding_AbsMouseGyroLeft_Description: string;

  ControllerBinding_AbsMouseGyroRight: string;

  ControllerBinding_AbsMouseGyroRight_Description: string;

  ControllerBinding_AbsMouseLeanLeft: string;

  ControllerBinding_AbsMouseLeanLeft_Description: string;

  ControllerBinding_AbsMouseLeanRight: string;

  ControllerBinding_AbsMouseLeanRight_Description: string;

  ControllerBinding_AbsMouseMouseSensitivity: string;

  ControllerBinding_AbsMouseMouseSensitivity_Description: string;

  ControllerBinding_AbsMouseTouch: string;

  ControllerBinding_AbsMouseTouch_Description: string;

  ControllerBinding_AbsoluteMouseDoubleTap: string;

  ControllerBinding_AButton: string;

  ControllerBinding_AButton_Description: string;

  ControllerBinding_AButtonGA: string;

  ControllerBinding_AButtonGA_Description: string;

  ControllerBinding_Acceleration: string;

  ControllerBinding_Acceleration_Description: string;

  ControllerBinding_Acceleration_High: string;

  ControllerBinding_Acceleration_High_Description: string;

  ControllerBinding_Acceleration_Low: string;

  ControllerBinding_Acceleration_Low_Description: string;

  ControllerBinding_Acceleration_Medium: string;

  ControllerBinding_Acceleration_Medium_Description: string;

  ControllerBinding_Acceleration_Off: string;

  ControllerBinding_Acceleration_Off_Description: string;

  ControllerBinding_AccelerationGyro: string;

  ControllerBinding_AccelerationGyro_Description: string;

  ControllerBinding_AccelerationGyro_High: string;

  ControllerBinding_AccelerationGyro_High_Description: string;

  ControllerBinding_AccelerationGyro_Low: string;

  ControllerBinding_AccelerationGyro_Low_Description: string;

  ControllerBinding_AccelerationGyro_Medium: string;

  ControllerBinding_AccelerationGyro_Medium_Description: string;

  ControllerBinding_AccelerationGyro_Off: string;

  ControllerBinding_AccelerationGyro_Off_Description: string;

  ControllerBinding_AccelerationGyroMouseJoystick: string;

  ControllerBinding_AccelerationGyroMouseJoystick_Description: string;

  ControllerBinding_AccelerationGyroMouseJoystick_High: string;

  ControllerBinding_AccelerationGyroMouseJoystick_High_Description: string;

  ControllerBinding_AccelerationGyroMouseJoystick_Low: string;

  ControllerBinding_AccelerationGyroMouseJoystick_Low_Description: string;

  ControllerBinding_AccelerationGyroMouseJoystick_Medium: string;

  ControllerBinding_AccelerationGyroMouseJoystick_Medium_Description: string;

  ControllerBinding_AccelerationGyroMouseJoystick_Off: string;

  ControllerBinding_AccelerationGyroMouseJoystick_Off_Description: string;

  ControllerBinding_AccelerationMouseJoystick: string;

  ControllerBinding_AccelerationMouseJoystick_Description: string;

  ControllerBinding_AccelerationMouseJoystick_High: string;

  ControllerBinding_AccelerationMouseJoystick_High_Description: string;

  ControllerBinding_AccelerationMouseJoystick_Low: string;

  ControllerBinding_AccelerationMouseJoystick_Low_Description: string;

  ControllerBinding_AccelerationMouseJoystick_Medium: string;

  ControllerBinding_AccelerationMouseJoystick_Medium_Description: string;

  ControllerBinding_AccelerationMouseJoystick_Off: string;

  ControllerBinding_AccelerationMouseJoystick_Off_Description: string;

  ControllerBinding_AccelerationStyle_JoystickMove: string;

  ControllerBinding_AccelerationStyle_JoystickMove_AxialAcceleration_Description: string;

  ControllerBinding_AccelerationStyle_JoystickMove_CircularAcceleration_Description: string;

  ControllerBinding_AccelerationStyle_JoystickMove_Description: string;

  ControllerBinding_AcitvatorDropDown_SoftPress: string;

  ControllerBinding_AcitvatorDropDown_SoftPress_Description: string;

  ControllerBinding_ActivationButtonTouchMenu: string;

  ControllerBinding_ActivationButtonTouchMenu_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroA: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroA_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroB: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroB_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroBumperLeft: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroBumperLeft_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroBumperRight: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroBumperRight_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroCapture: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroCapture_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroCircle: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroCircle_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroClickLeft: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroClickLeft_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroClickRight: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroClickRight_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroCross: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroCross_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroGripLeft: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroGripLeft_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroGripRight: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroGripRight_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroLeftTrigger: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroLeftTrigger_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroLeftTriggerNoQualifier: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroLeftTriggerNoQualifier_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroLeftTriggerThreshold: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroLeftTriggerThreshold_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroLStick: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroLStick_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroLStickTouch: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroLStickTouch_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroRightTrigger: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroRightTrigger_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroRightTriggerNoQualifier: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroRightTriggerNoQualifier_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroRightTriggerThreshold: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroRightTriggerThreshold_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroRStick: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroRStick_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroRStickRPadTouch: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroRStickRPadTouch_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroRStickTouch: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroRStickTouch_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroSquare: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroSquare_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroTouchCenter: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroTouchCenter_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroTouchLeft: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroTouchLeft_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroTouchRight: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroTouchRight_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroTriangle: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroTriangle_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroX: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroX_Description: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroY: string;

  ControllerBinding_ActivationButtonTouchMenu_GyroY_Description: string;

  ControllerBinding_Activator_Analog: string;

  ControllerBinding_ActivatorDropDown: string;

  ControllerBinding_ActivatorDropDown_Analog: string;

  ControllerBinding_ActivatorDropDown_Analog_Description: string;

  ControllerBinding_ActivatorDropDown_Chord: string;

  ControllerBinding_ActivatorDropDown_Chord_Description: string;

  ControllerBinding_ActivatorDropDown_Description: string;

  ControllerBinding_ActivatorDropDown_DoublePress: string;

  ControllerBinding_ActivatorDropDown_DoublePress_Description: string;

  ControllerBinding_ActivatorDropDown_FullPress: string;

  ControllerBinding_ActivatorDropDown_FullPress_Description: string;

  ControllerBinding_ActivatorDropDown_LongPress: string;

  ControllerBinding_ActivatorDropDown_LongPress_Description: string;

  ControllerBinding_ActivatorDropDown_None: string;

  ControllerBinding_ActivatorDropDown_None_Description: string;

  ControllerBinding_ActivatorDropDown_Release: string;

  ControllerBinding_ActivatorDropDown_Release_Description: string;

  ControllerBinding_ActivatorDropDown_SoftPress: string;

  ControllerBinding_ActivatorDropDown_SoftPress_Description: string;

  ControllerBinding_ActivatorDropDown_StartPress: string;

  ControllerBinding_ActivatorDropDown_StartPress_Description: string;

  ControllerBinding_AdaptiveCentering_joystick_mouse: string;

  ControllerBinding_AdaptiveCentering_joystick_mouse_Description: string;

  ControllerBinding_AdaptiveCentering_joystick_mouse_Off: string;

  ControllerBinding_AdaptiveCentering_joystick_mouse_Off_Description: string;

  ControllerBinding_AdaptiveCentering_joystick_mouse_On: string;

  ControllerBinding_AdaptiveCentering_joystick_mouse_On_Description: string;

  ControllerBinding_AdaptiveCentering_joystick_move: string;

  ControllerBinding_AdaptiveCentering_joystick_move_Description: string;

  ControllerBinding_AdaptiveCentering_joystick_move_Off: string;

  ControllerBinding_AdaptiveCentering_joystick_move_Off_Description: string;

  ControllerBinding_AdaptiveCentering_joystick_move_On: string;

  ControllerBinding_AdaptiveCentering_joystick_move_On_Description: string;

  ControllerBinding_AdaptiveThreshold: string;

  ControllerBinding_AdaptiveThreshold_Description: string;

  ControllerBinding_AdaptiveThreshold_HairTrigger: string;

  ControllerBinding_AdaptiveThreshold_HairTrigger_Description: string;

  ControllerBinding_AdaptiveThreshold_LongPressExclusive: string;

  ControllerBinding_AdaptiveThreshold_LongPressExclusive_Description: string;

  ControllerBinding_AdaptiveThreshold_LongPressLong: string;

  ControllerBinding_AdaptiveThreshold_LongPressLong_Description: string;

  ControllerBinding_AdaptiveThreshold_LongPressMedium: string;

  ControllerBinding_AdaptiveThreshold_LongPressMedium_Description: string;

  ControllerBinding_AdaptiveThreshold_LongPressShort: string;

  ControllerBinding_AdaptiveThreshold_LongPressShort_Description: string;

  ControllerBinding_AdaptiveThreshold_Simple: string;

  ControllerBinding_AdaptiveThreshold_Simple_Description: string;

  ControllerBinding_AdaptiveThreshold_Trigger_HairTrigger_Description: string;

  ControllerBinding_AdaptiveThreshold_Trigger_LongPressExclusive_Description: string;

  ControllerBinding_AdaptiveThreshold_Trigger_LongPressLong_Description: string;

  ControllerBinding_AdaptiveThreshold_Trigger_LongPressMedium_Description: string;

  ControllerBinding_AdaptiveThreshold_Trigger_LongPressShort_Description: string;

  ControllerBinding_AdaptiveThreshold_Trigger_Simple_Description: string;

  ControllerBinding_Advanced: string;

  ControllerBinding_Advanced_Description: string;

  ControllerBinding_AllowFlickOnAwake: string;

  ControllerBinding_AllowFlickOnAwake_Description: string;

  ControllerBinding_Analog_AnalogEnd: string;

  ControllerBinding_Analog_AnalogOutputAxis: string;

  ControllerBinding_Analog_AnalogStart: string;

  ControllerBinding_Analog_HapticIntensity: string;

  ControllerBinding_AnalogEmulationDutyCyclePct: string;

  ControllerBinding_AnalogEmulationDutyCyclePct_Description: string;

  ControllerBinding_AnalogEmulationPeriod: string;

  ControllerBinding_AnalogEmulationPeriod_Description: string;

  ControllerBinding_AntiDeadZone_joystick_mouse: string;

  ControllerBinding_AntiDeadZone_joystick_mouse_Description: string;

  ControllerBinding_AntiDeadZone_joystick_move: string;

  ControllerBinding_AntiDeadZone_joystick_move_Description: string;

  ControllerBinding_AntiDeadZoneAbsMouse: string;

  ControllerBinding_AntiDeadZoneAbsMouse_Description: string;

  ControllerBinding_AntiDeadZoneBuffer_joystick_mouse: string;

  ControllerBinding_AntiDeadZoneBuffer_joystick_mouse_Description: string;

  ControllerBinding_AntiDeadZoneBuffer_joystick_move: string;

  ControllerBinding_AntiDeadZoneBuffer_joystick_move_Description: string;

  ControllerBinding_AntiDeadZoneBufferAbsMouse: string;

  ControllerBinding_AntiDeadZoneBufferAbsMouse_Description: string;

  ControllerBinding_AntiDeadZoneBufferJoystickCamera: string;

  ControllerBinding_AntiDeadZoneBufferJoystickCamera_Description: string;

  ControllerBinding_AntiDeadZoneJoystickCamera: string;

  ControllerBinding_AntiDeadZoneJoystickCamera_Description: string;

  ControllerBinding_Autosave_config: string;

  ControllerBinding_BButton: string;

  ControllerBinding_BButton_Description: string;

  ControllerBinding_BButtonGA: string;

  ControllerBinding_BButtonGA_Description: string;

  ControllerBinding_Binding_FriendlyName: string;

  ControllerBinding_Binding_FriendlyNameMultiple: string;

  ControllerBinding_ButtonDistanceFourButtons: string;

  ControllerBinding_ButtonDistanceFourButtons_Description: string;

  ControllerBinding_ButtonRadiusFourButtons: string;

  ControllerBinding_ButtonRadiusFourButtons_Description: string;

  ControllerBinding_CameraHorizonReset: string;

  ControllerBinding_CameraHorizonReset_DelayMS: string;

  ControllerBinding_CameraHorizonReset_Desc: string;

  ControllerBinding_CameraHorizonReset_Desc2: string;

  ControllerBinding_CameraHorizonReset_ResetAngles: string;

  ControllerBinding_CameraHorizonReset_Title: string;

  ControllerBinding_CameraTurnToFaceDirection: string;

  ControllerBinding_CameraTurnToFaceDirection_Desc: string;

  ControllerBinding_CameraTurnToFaceDirection_SourceOfDirection: string;

  ControllerBinding_CameraTurnToFaceDirection_Title: string;

  ControllerBinding_CameraTurnToFaceDirection_TurnDuration: string;

  ControllerBinding_CameraTurnToFaceDirection_UseLastDirectionIfDeadzoned: string;

  ControllerBinding_Chord_Binding: string;

  ControllerBinding_Chord_Binding_Description: string;

  ControllerBinding_Chord_ChordButton: string;

  ControllerBinding_Chord_ChordButton_A: string;

  ControllerBinding_Chord_ChordButton_A_Description: string;

  ControllerBinding_Chord_ChordButton_B: string;

  ControllerBinding_Chord_ChordButton_B_Description: string;

  ControllerBinding_Chord_ChordButton_Description: string;

  ControllerBinding_Chord_ChordButton_GyroClickLeft: string;

  ControllerBinding_Chord_ChordButton_GyroClickLeft_Description: string;

  ControllerBinding_Chord_ChordButton_GyroClickRight: string;

  ControllerBinding_Chord_ChordButton_GyroClickRight_Description: string;

  ControllerBinding_Chord_ChordButton_GyroTouchLeft: string;

  ControllerBinding_Chord_ChordButton_GyroTouchLeft_Description: string;

  ControllerBinding_Chord_ChordButton_GyroTouchRight: string;

  ControllerBinding_Chord_ChordButton_GyroTouchRight_Description: string;

  ControllerBinding_Chord_ChordButton_JoystickClick: string;

  ControllerBinding_Chord_ChordButton_JoystickClick_Description: string;

  ControllerBinding_Chord_ChordButton_LeftBumper: string;

  ControllerBinding_Chord_ChordButton_LeftBumper_Description: string;

  ControllerBinding_Chord_ChordButton_LeftGrip: string;

  ControllerBinding_Chord_ChordButton_LeftGrip_Description: string;

  ControllerBinding_Chord_ChordButton_LeftTrigger: string;

  ControllerBinding_Chord_ChordButton_LeftTrigger_Description: string;

  ControllerBinding_Chord_ChordButton_LeftTriggerThreshold: string;

  ControllerBinding_Chord_ChordButton_LeftTriggerThreshold_Description: string;

  ControllerBinding_Chord_ChordButton_RightBumper: string;

  ControllerBinding_Chord_ChordButton_RightBumper_Description: string;

  ControllerBinding_Chord_ChordButton_RightGrip: string;

  ControllerBinding_Chord_ChordButton_RightGrip_Description: string;

  ControllerBinding_Chord_ChordButton_RightTrigger: string;

  ControllerBinding_Chord_ChordButton_RightTrigger_Description: string;

  ControllerBinding_Chord_ChordButton_RightTriggerThreshold: string;

  ControllerBinding_Chord_ChordButton_RightTriggerThreshold_Description: string;

  ControllerBinding_Chord_ChordButton_Select: string;

  ControllerBinding_Chord_ChordButton_Select_Description: string;

  ControllerBinding_Chord_ChordButton_Start: string;

  ControllerBinding_Chord_ChordButton_Start_Description: string;

  ControllerBinding_Chord_ChordButton_X: string;

  ControllerBinding_Chord_ChordButton_X_Description: string;

  ControllerBinding_Chord_ChordButton_Y: string;

  ControllerBinding_Chord_ChordButton_Y_Description: string;

  ControllerBinding_Chord_CycleBindings: string;

  ControllerBinding_Chord_CycleBindings_Description: string;

  ControllerBinding_Chord_CycleBindings_Off: string;

  ControllerBinding_Chord_CycleBindings_Off_Description: string;

  ControllerBinding_Chord_CycleBindings_On: string;

  ControllerBinding_Chord_CycleBindings_On_Description: string;

  ControllerBinding_Chord_EndDelay: string;

  ControllerBinding_Chord_EndDelay_Description: string;

  ControllerBinding_Chord_HapticIntensity: string;

  ControllerBinding_Chord_HapticIntensity_Description: string;

  ControllerBinding_Chord_HapticIntensity_High: string;

  ControllerBinding_Chord_HapticIntensity_High_Description: string;

  ControllerBinding_Chord_HapticIntensity_Low: string;

  ControllerBinding_Chord_HapticIntensity_Low_Description: string;

  ControllerBinding_Chord_HapticIntensity_Medium: string;

  ControllerBinding_Chord_HapticIntensity_Medium_Description: string;

  ControllerBinding_Chord_HapticIntensity_Off: string;

  ControllerBinding_Chord_HapticIntensity_Off_Description: string;

  ControllerBinding_Chord_HoldRepeats: string;

  ControllerBinding_Chord_HoldRepeats_Description: string;

  ControllerBinding_Chord_HoldRepeats_Off: string;

  ControllerBinding_Chord_HoldRepeats_Off_Description: string;

  ControllerBinding_Chord_HoldRepeats_On: string;

  ControllerBinding_Chord_HoldRepeats_On_Description: string;

  ControllerBinding_Chord_Interruptable: string;

  ControllerBinding_Chord_Interruptable_Description: string;

  ControllerBinding_Chord_Interruptable_Off: string;

  ControllerBinding_Chord_Interruptable_Off_Description: string;

  ControllerBinding_Chord_Interruptable_On: string;

  ControllerBinding_Chord_Interruptable_On_Description: string;

  ControllerBinding_Chord_RepeatRate: string;

  ControllerBinding_Chord_RepeatRate_Description: string;

  ControllerBinding_Chord_StartDelay: string;

  ControllerBinding_Chord_StartDelay_Description: string;

  ControllerBinding_Chord_Toggle: string;

  ControllerBinding_Chord_Toggle_Description: string;

  ControllerBinding_Chord_Toggle_Off: string;

  ControllerBinding_Chord_Toggle_Off_Description: string;

  ControllerBinding_Chord_Toggle_On: string;

  ControllerBinding_Chord_Toggle_On_Description: string;

  ControllerBinding_Click_joystick_mouse: string;

  ControllerBinding_Click_joystick_mouse_Description: string;

  ControllerBinding_Click_joystick_move: string;

  ControllerBinding_Click_joystick_move_Description: string;

  ControllerBinding_ControllerActionModal_ActionSetDesc: string;

  ControllerBinding_ControllerActionModal_ActionSetDialog_Beep: string;

  ControllerBinding_ControllerActionModal_ActionSetDialog_DisplayName: string;

  ControllerBinding_ControllerActionModal_ActionSetDialog_Layer: string;

  ControllerBinding_ControllerActionModal_ActionSetDialog_Set: string;

  ControllerBinding_ControllerActionModal_ActionSetLayerDesc: string;

  ControllerBinding_ControllerActionModal_ChangePlayerNumber: string;

  ControllerBinding_ControllerActionModal_ChangePlayerNumberDesc: string;

  ControllerBinding_ControllerActions_SetBindings: string;

  ControllerBinding_CurveExponent_joystick_mouse: string;

  ControllerBinding_CurveExponent_joystick_mouse_1: string;

  ControllerBinding_CurveExponent_joystick_mouse_1_Description: string;

  ControllerBinding_CurveExponent_joystick_mouse_2: string;

  ControllerBinding_CurveExponent_joystick_mouse_2_Description: string;

  ControllerBinding_CurveExponent_joystick_mouse_3: string;

  ControllerBinding_CurveExponent_joystick_mouse_3_Description: string;

  ControllerBinding_CurveExponent_joystick_mouse_4: string;

  ControllerBinding_CurveExponent_joystick_mouse_4_Description: string;

  ControllerBinding_CurveExponent_joystick_mouse_Custom: string;

  ControllerBinding_CurveExponent_joystick_mouse_Custom_Description: string;

  ControllerBinding_CurveExponent_joystick_mouse_Description: string;

  ControllerBinding_CurveExponent_joystick_mouse_Linear: string;

  ControllerBinding_CurveExponent_joystick_mouse_Linear_Description: string;

  ControllerBinding_CurveExponent_joystick_move: string;

  ControllerBinding_CurveExponent_joystick_move_Curve_1: string;

  ControllerBinding_CurveExponent_joystick_move_Curve_1_Description: string;

  ControllerBinding_CurveExponent_joystick_move_Curve_2: string;

  ControllerBinding_CurveExponent_joystick_move_Curve_2_Description: string;

  ControllerBinding_CurveExponent_joystick_move_Curve_3: string;

  ControllerBinding_CurveExponent_joystick_move_Curve_3_Description: string;

  ControllerBinding_CurveExponent_joystick_move_Curve_4: string;

  ControllerBinding_CurveExponent_joystick_move_Curve_4_Description: string;

  ControllerBinding_CurveExponent_joystick_move_Curve_Custom: string;

  ControllerBinding_CurveExponent_joystick_move_Curve_Custom_Description: string;

  ControllerBinding_CurveExponent_joystick_move_Description: string;

  ControllerBinding_CurveExponent_joystick_move_Linear: string;

  ControllerBinding_CurveExponent_joystick_move_Linear_Description: string;

  ControllerBinding_CurveExponentCameraMode: string;

  ControllerBinding_CurveExponentCameraMode_1: string;

  ControllerBinding_CurveExponentCameraMode_1_Description: string;

  ControllerBinding_CurveExponentCameraMode_2: string;

  ControllerBinding_CurveExponentCameraMode_2_Description: string;

  ControllerBinding_CurveExponentCameraMode_3: string;

  ControllerBinding_CurveExponentCameraMode_3_Description: string;

  ControllerBinding_CurveExponentCameraMode_4: string;

  ControllerBinding_CurveExponentCameraMode_4_Description: string;

  ControllerBinding_CurveExponentCameraMode_Description: string;

  ControllerBinding_CurveExponentCameraMode_Linear: string;

  ControllerBinding_CurveExponentCameraMode_Linear_Description: string;

  ControllerBinding_CustomCurveExponent_joystick_mouse: string;

  ControllerBinding_CustomCurveExponent_joystick_mouse_Description: string;

  ControllerBinding_CustomCurveExponent_joystick_move: string;

  ControllerBinding_CustomCurveExponent_joystick_move_Description: string;

  ControllerBinding_CustomCurveExponent_mouse_joystick: string;

  ControllerBinding_CustomCurveExponent_mouse_joystick_Description: string;

  ControllerBinding_Deadzone: string;

  ControllerBinding_Deadzone_Description: string;

  ControllerBinding_DeadZoneEnable_Joystick: string;

  ControllerBinding_DeadZoneEnable_Joystick_Deadzone_Calibration_Description: string;

  ControllerBinding_DeadZoneEnable_Joystick_Deadzone_Custom_Description: string;

  ControllerBinding_DeadZoneEnable_Joystick_Deadzone_None_Description: string;

  ControllerBinding_DeadZoneInnerRadius_joystick_mouse: string;

  ControllerBinding_DeadZoneInnerRadius_joystick_mouse_Description: string;

  ControllerBinding_DeadZoneInnerRadius_joystick_move: string;

  ControllerBinding_DeadZoneInnerRadius_joystick_move_Description: string;

  ControllerBinding_DeadZoneOuterRadius_joystick_mouse: string;

  ControllerBinding_DeadZoneOuterRadius_joystick_mouse_Description: string;

  ControllerBinding_DeadZoneOuterRadius_joystick_move: string;

  ControllerBinding_DeadZoneOuterRadius_joystick_move_Description: string;

  ControllerBinding_DeadZonePrecisionJoystickMouse: string;

  ControllerBinding_DeadZonePrecisionJoystickMouse_Description: string;

  ControllerBinding_DeadZoneShape_joystick_mouse: string;

  ControllerBinding_DeadZoneShape_joystick_mouse_Circle: string;

  ControllerBinding_DeadZoneShape_joystick_mouse_Circle_Description: string;

  ControllerBinding_DeadZoneShape_joystick_mouse_Cross: string;

  ControllerBinding_DeadZoneShape_joystick_mouse_Cross_Description: string;

  ControllerBinding_DeadZoneShape_joystick_mouse_Description: string;

  ControllerBinding_DeadZoneShape_joystick_mouse_Square: string;

  ControllerBinding_DeadZoneShape_joystick_mouse_Square_Description: string;

  ControllerBinding_DeadZoneShape_joystick_move: string;

  ControllerBinding_DeadZoneShape_joystick_move_Circle: string;

  ControllerBinding_DeadZoneShape_joystick_move_Circle_Description: string;

  ControllerBinding_DeadZoneShape_joystick_move_Cross: string;

  ControllerBinding_DeadZoneShape_joystick_move_Cross_Description: string;

  ControllerBinding_DeadZoneShape_joystick_move_Description: string;

  ControllerBinding_DeadZoneShape_joystick_move_Square: string;

  ControllerBinding_DeadZoneShape_joystick_move_Square_Description: string;

  ControllerBinding_DeadzoneXJoystickMouse: string;

  ControllerBinding_DeadzoneXJoystickMouse_Description: string;

  ControllerBinding_DeadzoneYJoystickMouse: string;

  ControllerBinding_DeadzoneYJoystickMouse_Description: string;

  ControllerBinding_DotsPer360CalibrationSpin: string;

  ControllerBinding_DotsPer360CalibrationSpin_Desc: string;

  ControllerBinding_DotsPer360CalibrationSpin_Desc2: string;

  ControllerBinding_DotsPer360CalibrationSpin_SpinAngle: string;

  ControllerBinding_DotsPer360CalibrationSpin_SpinDuration: string;

  ControllerBinding_DotsPer360CalibrationSpin_Title: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_Description: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_LeftJoystick: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_LeftJoystick_Description: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_LeftTrackpad: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_LeftTrackpad_Description: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_Off: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_Off_Description: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_RightJoystick: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_RightJoystick_Description: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_RightTrackpad: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_RightTrackpad_Description: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_Trackpad: string;

  ControllerBinding_DoublePress_ActivateStickOrTrackpad_Trackpad_Description: string;

  ControllerBinding_DoublePress_Binding: string;

  ControllerBinding_DoublePress_Binding_Description: string;

  ControllerBinding_DoublePress_CycleBindings: string;

  ControllerBinding_DoublePress_CycleBindings_Description: string;

  ControllerBinding_DoublePress_CycleBindings_Off: string;

  ControllerBinding_DoublePress_CycleBindings_Off_Description: string;

  ControllerBinding_DoublePress_CycleBindings_On: string;

  ControllerBinding_DoublePress_CycleBindings_On_Description: string;

  ControllerBinding_DoublePress_DoubleTapTime: string;

  ControllerBinding_DoublePress_DoubleTapTime_Description: string;

  ControllerBinding_DoublePress_EndDelay: string;

  ControllerBinding_DoublePress_EndDelay_Description: string;

  ControllerBinding_DoublePress_HapticIntensity: string;

  ControllerBinding_DoublePress_HapticIntensity_Description: string;

  ControllerBinding_DoublePress_HapticIntensity_High: string;

  ControllerBinding_DoublePress_HapticIntensity_High_Description: string;

  ControllerBinding_DoublePress_HapticIntensity_Low: string;

  ControllerBinding_DoublePress_HapticIntensity_Low_Description: string;

  ControllerBinding_DoublePress_HapticIntensity_Medium: string;

  ControllerBinding_DoublePress_HapticIntensity_Medium_Description: string;

  ControllerBinding_DoublePress_HapticIntensity_Off: string;

  ControllerBinding_DoublePress_HapticIntensity_Off_Description: string;

  ControllerBinding_DoublePress_HoldRepeats: string;

  ControllerBinding_DoublePress_HoldRepeats_Description: string;

  ControllerBinding_DoublePress_HoldRepeats_Off: string;

  ControllerBinding_DoublePress_HoldRepeats_Off_Description: string;

  ControllerBinding_DoublePress_HoldRepeats_On: string;

  ControllerBinding_DoublePress_HoldRepeats_On_Description: string;

  ControllerBinding_DoublePress_RepeatRate: string;

  ControllerBinding_DoublePress_RepeatRate_Description: string;

  ControllerBinding_DoublePress_StartDelay: string;

  ControllerBinding_DoublePress_StartDelay_Description: string;

  ControllerBinding_DoublePress_Toggle: string;

  ControllerBinding_DoublePress_Toggle_Description: string;

  ControllerBinding_DoublePress_Toggle_Off: string;

  ControllerBinding_DoublePress_Toggle_Off_Description: string;

  ControllerBinding_DoublePress_Toggle_On: string;

  ControllerBinding_DoublePress_Toggle_On_Description: string;

  ControllerBinding_DoubleTap: string;

  ControllerBinding_DoubleTap_Description: string;

  ControllerBinding_DoubleTapBeep: string;

  ControllerBinding_DoubleTapBeep_Description: string;

  ControllerBinding_DoubleTapBeep_Off: string;

  ControllerBinding_DoubleTapBeep_Off_Description: string;

  ControllerBinding_DoubleTapBeep_On: string;

  ControllerBinding_DoubleTapBeep_On_Description: string;

  ControllerBinding_DoubleTapBeepMouseJoystick: string;

  ControllerBinding_DoubleTapBeepMouseJoystick_Description: string;

  ControllerBinding_DoubleTapBeepMouseJoystick_Off: string;

  ControllerBinding_DoubleTapBeepMouseJoystick_Off_Description: string;

  ControllerBinding_DoubleTapBeepMouseJoystick_On: string;

  ControllerBinding_DoubleTapBeepMouseJoystick_On_Description: string;

  ControllerBinding_DoubleTapDuration: string;

  ControllerBinding_DoubleTapDuration_Description: string;

  ControllerBinding_DoubleTapDurationMouseJoystick: string;

  ControllerBinding_DoubleTapDurationMouseJoystick_Description: string;

  ControllerBinding_DoubleTapMouseJoystick: string;

  ControllerBinding_DoubleTapMouseJoystick_Description: string;

  ControllerBinding_DpadClick: string;

  ControllerBinding_DpadClick_Description: string;

  ControllerBinding_DpadDownButton: string;

  ControllerBinding_DpadDownButton_Description: string;

  ControllerBinding_DpadDownButtonGA: string;

  ControllerBinding_DpadDownButtonGA_Description: string;

  ControllerBinding_DPadLayout: string;

  ControllerBinding_DPadLayout_AnalogEmulation: string;

  ControllerBinding_DPadLayout_AnalogEmulation_Description: string;

  ControllerBinding_DPadLayout_CrossGate: string;

  ControllerBinding_DPadLayout_CrossGate_Description: string;

  ControllerBinding_DPadLayout_Description: string;

  ControllerBinding_DPadLayout_RadialNoOverlap: string;

  ControllerBinding_DPadLayout_RadialNoOverlap_Description: string;

  ControllerBinding_DPadLayout_RadialWithOverlap: string;

  ControllerBinding_DPadLayout_RadialWithOverlap_Description: string;

  ControllerBinding_DpadLeftButton: string;

  ControllerBinding_DpadLeftButton_Description: string;

  ControllerBinding_DpadLeftButtonGA: string;

  ControllerBinding_DpadLeftButtonGA_Description: string;

  ControllerBinding_DpadRightButton: string;

  ControllerBinding_DpadRightButton_Description: string;

  ControllerBinding_DpadRightButtonGA: string;

  ControllerBinding_DpadRightButtonGA_Description: string;

  ControllerBinding_DpadTouch: string;

  ControllerBinding_DpadTouch_Description: string;

  ControllerBinding_DpadUpButton: string;

  ControllerBinding_DpadUpButton_Description: string;

  ControllerBinding_DpadUpButtonGA: string;

  ControllerBinding_DpadUpButtonGA_Description: string;

  ControllerBinding_EdgeBinding_joystick_mouse: string;

  ControllerBinding_EdgeBinding_joystick_mouse_Description: string;

  ControllerBinding_EdgeBinding_joystick_move: string;

  ControllerBinding_EdgeBinding_joystick_move_Description: string;

  ControllerBinding_EdgeBindingDpad: string;

  ControllerBinding_EdgeBindingDpad_Description: string;

  ControllerBinding_EdgeBindingInvert_joystick_mouse: string;

  ControllerBinding_EdgeBindingInvert_joystick_mouse_Description: string;

  ControllerBinding_EdgeBindingInvert_joystick_mouse_Off: string;

  ControllerBinding_EdgeBindingInvert_joystick_mouse_Off_Description: string;

  ControllerBinding_EdgeBindingInvert_joystick_mouse_On: string;

  ControllerBinding_EdgeBindingInvert_joystick_mouse_On_Description: string;

  ControllerBinding_EdgeBindingInvert_joystick_move: string;

  ControllerBinding_EdgeBindingInvert_joystick_move_Description: string;

  ControllerBinding_EdgeBindingInvert_joystick_move_Off: string;

  ControllerBinding_EdgeBindingInvert_joystick_move_Off_Description: string;

  ControllerBinding_EdgeBindingInvert_joystick_move_On: string;

  ControllerBinding_EdgeBindingInvert_joystick_move_On_Description: string;

  ControllerBinding_EdgeBindingInvertDpad: string;

  ControllerBinding_EdgeBindingInvertDpad_Description: string;

  ControllerBinding_EdgeBindingInvertDpad_Off: string;

  ControllerBinding_EdgeBindingInvertDpad_Off_Description: string;

  ControllerBinding_EdgeBindingInvertDpad_On: string;

  ControllerBinding_EdgeBindingInvertDpad_On_Description: string;

  ControllerBinding_EdgeBindingInvertMouseRegion: string;

  ControllerBinding_EdgeBindingInvertMouseRegion_Description: string;

  ControllerBinding_EdgeBindingInvertMouseRegion_Off: string;

  ControllerBinding_EdgeBindingInvertMouseRegion_Off_Description: string;

  ControllerBinding_EdgeBindingInvertMouseRegion_On: string;

  ControllerBinding_EdgeBindingInvertMouseRegion_On_Description: string;

  ControllerBinding_EdgeBindingMouseRegion: string;

  ControllerBinding_EdgeBindingMouseRegion_Description: string;

  ControllerBinding_EdgeBindingRadius_joystick_mouse: string;

  ControllerBinding_EdgeBindingRadius_joystick_mouse_Description: string;

  ControllerBinding_EdgeBindingRadius_joystick_move: string;

  ControllerBinding_EdgeBindingRadius_joystick_move_Description: string;

  ControllerBinding_EdgeBindingRadiusDpad: string;

  ControllerBinding_EdgeBindingRadiusDpad_Description: string;

  ControllerBinding_EdgeBindingRadiusFlickStick: string;

  ControllerBinding_EdgeBindingRadiusFlickStick_Description: string;

  ControllerBinding_EdgeBindingRadiusMouseRegion: string;

  ControllerBinding_EdgeBindingRadiusMouseRegion_Description: string;

  ControllerBinding_EdgeSpinRadius: string;

  ControllerBinding_EdgeSpinRadius_Description: string;

  ControllerBinding_EdgeSpinRadiusMouseJoystick: string;

  ControllerBinding_EdgeSpinRadiusMouseJoystick_Description: string;

  ControllerBinding_EdgeSpinScale: string;

  ControllerBinding_EdgeSpinScale_Description: string;

  ControllerBinding_EdgeSpinScaleMouseJoystick: string;

  ControllerBinding_EdgeSpinScaleMouseJoystick_Description: string;

  ControllerBinding_Explanation_community: string;

  ControllerBinding_Explanation_entirelibrary: string;

  ControllerBinding_Explanation_friends: string;

  ControllerBinding_Explanation_personal: string;

  ControllerBinding_Explanation_recommended: string;

  ControllerBinding_Explanation_template: string;

  ControllerBinding_FlickStickClick: string;

  ControllerBinding_FlickStickEdge: string;

  ControllerBinding_FlickStickHapticBumpsPerAngle: string;

  ControllerBinding_FlickStickHapticBumpsPerAngle_Description: string;

  ControllerBinding_FlickStickRotationalHapticBumpsIntensity: string;

  ControllerBinding_FlickStickRotationalHapticBumpsIntensity_Description: string;

  ControllerBinding_FlickStickTouch: string;

  ControllerBinding_ForwardSnapAngleFlickStick: string;

  ControllerBinding_ForwardSnapAngleFlickStick_Description: string;

  ControllerBinding_Friction: string;

  ControllerBinding_Friction2DScroll: string;

  ControllerBinding_Friction_Description: string;

  ControllerBinding_Friction_High: string;

  ControllerBinding_Friction_High_Description: string;

  ControllerBinding_Friction_Low: string;

  ControllerBinding_Friction_Low_Description: string;

  ControllerBinding_Friction_Medium: string;

  ControllerBinding_Friction_Medium_Description: string;

  ControllerBinding_Friction_None: string;

  ControllerBinding_Friction_None_Description: string;

  ControllerBinding_Friction_Off: string;

  ControllerBinding_Friction_Off_Description: string;

  ControllerBinding_FrictionMouseJoystick: string;

  ControllerBinding_FrictionMouseJoystick_Description: string;

  ControllerBinding_FrictionMouseJoystick_High: string;

  ControllerBinding_FrictionMouseJoystick_High_Description: string;

  ControllerBinding_FrictionMouseJoystick_Low: string;

  ControllerBinding_FrictionMouseJoystick_Low_Description: string;

  ControllerBinding_FrictionMouseJoystick_Medium: string;

  ControllerBinding_FrictionMouseJoystick_Medium_Description: string;

  ControllerBinding_FrictionMouseJoystick_None: string;

  ControllerBinding_FrictionMouseJoystick_None_Description: string;

  ControllerBinding_FrictionMouseJoystick_Off: string;

  ControllerBinding_FrictionMouseJoystick_Off_Description: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_Description: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_LeftJoystick: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_LeftJoystick_Description: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_LeftTrackpad: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_LeftTrackpad_Description: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_Off: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_Off_Description: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_RightJoystick: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_RightJoystick_Description: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_RightTrackpad: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_RightTrackpad_Description: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_Trackpad: string;

  ControllerBinding_FullPress_ActivateStickOrTrackpad_Trackpad_Description: string;

  ControllerBinding_FullPress_Binding: string;

  ControllerBinding_FullPress_Binding_Description: string;

  ControllerBinding_FullPress_CycleBindings: string;

  ControllerBinding_FullPress_CycleBindings_Description: string;

  ControllerBinding_FullPress_CycleBindings_Off: string;

  ControllerBinding_FullPress_CycleBindings_Off_Description: string;

  ControllerBinding_FullPress_CycleBindings_On: string;

  ControllerBinding_FullPress_CycleBindings_On_Description: string;

  ControllerBinding_FullPress_EndDelay: string;

  ControllerBinding_FullPress_EndDelay_Description: string;

  ControllerBinding_FullPress_HapticIntensity: string;

  ControllerBinding_FullPress_HapticIntensity_Description: string;

  ControllerBinding_FullPress_HapticIntensity_High: string;

  ControllerBinding_FullPress_HapticIntensity_High_Description: string;

  ControllerBinding_FullPress_HapticIntensity_Low: string;

  ControllerBinding_FullPress_HapticIntensity_Low_Description: string;

  ControllerBinding_FullPress_HapticIntensity_Medium: string;

  ControllerBinding_FullPress_HapticIntensity_Medium_Description: string;

  ControllerBinding_FullPress_HapticIntensity_Off: string;

  ControllerBinding_FullPress_HapticIntensity_Off_Description: string;

  ControllerBinding_FullPress_HoldRepeats: string;

  ControllerBinding_FullPress_HoldRepeats_Description: string;

  ControllerBinding_FullPress_HoldRepeats_Off: string;

  ControllerBinding_FullPress_HoldRepeats_Off_Description: string;

  ControllerBinding_FullPress_HoldRepeats_On: string;

  ControllerBinding_FullPress_HoldRepeats_On_Description: string;

  ControllerBinding_FullPress_Interruptable: string;

  ControllerBinding_FullPress_Interruptable_Description: string;

  ControllerBinding_FullPress_Interruptable_Off: string;

  ControllerBinding_FullPress_Interruptable_Off_Description: string;

  ControllerBinding_FullPress_Interruptable_On: string;

  ControllerBinding_FullPress_Interruptable_On_Description: string;

  ControllerBinding_FullPress_InvertInput: string;

  ControllerBinding_FullPress_InvertInput_Description: string;

  ControllerBinding_FullPress_RepeatRate: string;

  ControllerBinding_FullPress_RepeatRate_Description: string;

  ControllerBinding_FullPress_StartDelay: string;

  ControllerBinding_FullPress_StartDelay_Description: string;

  ControllerBinding_FullPress_Toggle: string;

  ControllerBinding_FullPress_Toggle_Description: string;

  ControllerBinding_FullPress_Toggle_Off: string;

  ControllerBinding_FullPress_Toggle_Off_Description: string;

  ControllerBinding_FullPress_Toggle_On: string;

  ControllerBinding_FullPress_Toggle_On_Description: string;

  ControllerBinding_GyroAnglesToPixels: string;

  ControllerBinding_GyroAnglesToPixels_Description: string;

  ControllerBinding_GyroAxis2DScroll: string;

  ControllerBinding_GyroAxis2DScroll_Description: string;

  ControllerBinding_GyroAxis2DScroll_Roll: string;

  ControllerBinding_GyroAxis2DScroll_Roll_Description: string;

  ControllerBinding_GyroAxis2DScroll_Yaw: string;

  ControllerBinding_GyroAxis2DScroll_Yaw_Description: string;

  ControllerBinding_GyroAxisAbsMouse: string;

  ControllerBinding_GyroAxisAbsMouse_Description: string;

  ControllerBinding_GyroAxisAbsMouse_Roll: string;

  ControllerBinding_GyroAxisAbsMouse_Roll_Description: string;

  ControllerBinding_GyroAxisAbsMouse_Yaw: string;

  ControllerBinding_GyroAxisAbsMouse_Yaw_Description: string;

  ControllerBinding_GyroAxisAbsMouse_YawAndRoll: string;

  ControllerBinding_GyroAxisAbsMouse_YawAndRoll_Description: string;

  ControllerBinding_GyroAxisJoystickCamera: string;

  ControllerBinding_GyroAxisJoystickCamera_Description: string;

  ControllerBinding_GyroAxisJoystickCamera_Roll: string;

  ControllerBinding_GyroAxisJoystickCamera_Roll_Description: string;

  ControllerBinding_GyroAxisJoystickCamera_Yaw: string;

  ControllerBinding_GyroAxisJoystickCamera_Yaw_Description: string;

  ControllerBinding_GyroAxisMouseJoystick: string;

  ControllerBinding_GyroAxisMouseJoystick_Description: string;

  ControllerBinding_GyroAxisMouseJoystick_Roll: string;

  ControllerBinding_GyroAxisMouseJoystick_Roll_Description: string;

  ControllerBinding_GyroAxisMouseJoystick_Yaw: string;

  ControllerBinding_GyroAxisMouseJoystick_Yaw_Description: string;

  ControllerBinding_GyroAxisMouseJoystick_YawAndRoll: string;

  ControllerBinding_GyroAxisMouseJoystick_YawAndRoll_Description: string;

  ControllerBinding_GyroButton2DScroll: string;

  ControllerBinding_GyroButton2DScroll_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroA: string;

  ControllerBinding_GyroButton2DScroll_GyroA_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroB: string;

  ControllerBinding_GyroButton2DScroll_GyroB_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroBumperLeft: string;

  ControllerBinding_GyroButton2DScroll_GyroBumperLeft_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroBumperRight: string;

  ControllerBinding_GyroButton2DScroll_GyroBumperRight_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroCapture: string;

  ControllerBinding_GyroButton2DScroll_GyroCapture_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroCircle: string;

  ControllerBinding_GyroButton2DScroll_GyroCircle_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroClickLeft: string;

  ControllerBinding_GyroButton2DScroll_GyroClickLeft_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroClickRight: string;

  ControllerBinding_GyroButton2DScroll_GyroClickRight_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroCross: string;

  ControllerBinding_GyroButton2DScroll_GyroCross_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroGripLeft: string;

  ControllerBinding_GyroButton2DScroll_GyroGripLeft_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroGripRight: string;

  ControllerBinding_GyroButton2DScroll_GyroGripRight_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroLeftTrigger: string;

  ControllerBinding_GyroButton2DScroll_GyroLeftTrigger_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroLeftTriggerNoQualifier: string;

  ControllerBinding_GyroButton2DScroll_GyroLeftTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroLeftTriggerThreshold: string;

  ControllerBinding_GyroButton2DScroll_GyroLeftTriggerThreshold_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroLStick: string;

  ControllerBinding_GyroButton2DScroll_GyroLStick_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroLStickTouch: string;

  ControllerBinding_GyroButton2DScroll_GyroLStickTouch_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroNone: string;

  ControllerBinding_GyroButton2DScroll_GyroNone_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroRightTrigger: string;

  ControllerBinding_GyroButton2DScroll_GyroRightTrigger_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroRightTriggerNoQualifier: string;

  ControllerBinding_GyroButton2DScroll_GyroRightTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroRightTriggerThreshold: string;

  ControllerBinding_GyroButton2DScroll_GyroRightTriggerThreshold_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroRStick: string;

  ControllerBinding_GyroButton2DScroll_GyroRStick_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroRStickRPadTouch: string;

  ControllerBinding_GyroButton2DScroll_GyroRStickRPadTouch_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroRStickTouch: string;

  ControllerBinding_GyroButton2DScroll_GyroRStickTouch_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroSquare: string;

  ControllerBinding_GyroButton2DScroll_GyroSquare_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroTouchCenter: string;

  ControllerBinding_GyroButton2DScroll_GyroTouchCenter_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroTouchLeft: string;

  ControllerBinding_GyroButton2DScroll_GyroTouchLeft_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroTouchRight: string;

  ControllerBinding_GyroButton2DScroll_GyroTouchRight_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroTriangle: string;

  ControllerBinding_GyroButton2DScroll_GyroTriangle_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroX: string;

  ControllerBinding_GyroButton2DScroll_GyroX_Description: string;

  ControllerBinding_GyroButton2DScroll_GyroY: string;

  ControllerBinding_GyroButton2DScroll_GyroY_Description: string;

  ControllerBinding_GyroButton_joystick_move: string;

  ControllerBinding_GyroButton_joystick_move_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroA: string;

  ControllerBinding_GyroButton_joystick_move_GyroA_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroB: string;

  ControllerBinding_GyroButton_joystick_move_GyroB_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroBumperLeft: string;

  ControllerBinding_GyroButton_joystick_move_GyroBumperLeft_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroBumperRight: string;

  ControllerBinding_GyroButton_joystick_move_GyroBumperRight_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroCapture: string;

  ControllerBinding_GyroButton_joystick_move_GyroCapture_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroCircle: string;

  ControllerBinding_GyroButton_joystick_move_GyroCircle_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroClickLeft: string;

  ControllerBinding_GyroButton_joystick_move_GyroClickLeft_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroClickRight: string;

  ControllerBinding_GyroButton_joystick_move_GyroClickRight_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroCross: string;

  ControllerBinding_GyroButton_joystick_move_GyroCross_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroGripLeft: string;

  ControllerBinding_GyroButton_joystick_move_GyroGripLeft_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroGripRight: string;

  ControllerBinding_GyroButton_joystick_move_GyroGripRight_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroLeftTrigger: string;

  ControllerBinding_GyroButton_joystick_move_GyroLeftTrigger_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroLeftTriggerNoQualifier: string;

  ControllerBinding_GyroButton_joystick_move_GyroLeftTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroLeftTriggerThreshold: string;

  ControllerBinding_GyroButton_joystick_move_GyroLeftTriggerThreshold_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroLStick: string;

  ControllerBinding_GyroButton_joystick_move_GyroLStick_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroLStickTouch: string;

  ControllerBinding_GyroButton_joystick_move_GyroLStickTouch_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroNone: string;

  ControllerBinding_GyroButton_joystick_move_GyroNone_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroRightTrigger: string;

  ControllerBinding_GyroButton_joystick_move_GyroRightTrigger_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroRightTriggerNoQualifier: string;

  ControllerBinding_GyroButton_joystick_move_GyroRightTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroRightTriggerThreshold: string;

  ControllerBinding_GyroButton_joystick_move_GyroRightTriggerThreshold_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroRStick: string;

  ControllerBinding_GyroButton_joystick_move_GyroRStick_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroRStickRPadTouch: string;

  ControllerBinding_GyroButton_joystick_move_GyroRStickRPadTouch_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroRStickTouch: string;

  ControllerBinding_GyroButton_joystick_move_GyroRStickTouch_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroSquare: string;

  ControllerBinding_GyroButton_joystick_move_GyroSquare_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroTouchCenter: string;

  ControllerBinding_GyroButton_joystick_move_GyroTouchCenter_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroTouchLeft: string;

  ControllerBinding_GyroButton_joystick_move_GyroTouchLeft_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroTouchRight: string;

  ControllerBinding_GyroButton_joystick_move_GyroTouchRight_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroTriangle: string;

  ControllerBinding_GyroButton_joystick_move_GyroTriangle_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroX: string;

  ControllerBinding_GyroButton_joystick_move_GyroX_Description: string;

  ControllerBinding_GyroButton_joystick_move_GyroY: string;

  ControllerBinding_GyroButton_joystick_move_GyroY_Description: string;

  ControllerBinding_GyroButtonAbsMouse: string;

  ControllerBinding_GyroButtonAbsMouse_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroA: string;

  ControllerBinding_GyroButtonAbsMouse_GyroA_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroB: string;

  ControllerBinding_GyroButtonAbsMouse_GyroB_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroBumperLeft: string;

  ControllerBinding_GyroButtonAbsMouse_GyroBumperLeft_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroBumperRight: string;

  ControllerBinding_GyroButtonAbsMouse_GyroBumperRight_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroCapture: string;

  ControllerBinding_GyroButtonAbsMouse_GyroCapture_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroCircle: string;

  ControllerBinding_GyroButtonAbsMouse_GyroCircle_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroClickLeft: string;

  ControllerBinding_GyroButtonAbsMouse_GyroClickLeft_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroClickRight: string;

  ControllerBinding_GyroButtonAbsMouse_GyroClickRight_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroCross: string;

  ControllerBinding_GyroButtonAbsMouse_GyroCross_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroGripLeft: string;

  ControllerBinding_GyroButtonAbsMouse_GyroGripLeft_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroGripRight: string;

  ControllerBinding_GyroButtonAbsMouse_GyroGripRight_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroLeftTrigger: string;

  ControllerBinding_GyroButtonAbsMouse_GyroLeftTrigger_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroLeftTriggerNoQualifier: string;

  ControllerBinding_GyroButtonAbsMouse_GyroLeftTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroLeftTriggerThreshold: string;

  ControllerBinding_GyroButtonAbsMouse_GyroLeftTriggerThreshold_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroLStick: string;

  ControllerBinding_GyroButtonAbsMouse_GyroLStick_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroLStickTouch: string;

  ControllerBinding_GyroButtonAbsMouse_GyroLStickTouch_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroNone: string;

  ControllerBinding_GyroButtonAbsMouse_GyroNone_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroRightTrigger: string;

  ControllerBinding_GyroButtonAbsMouse_GyroRightTrigger_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroRightTriggerNoQualifier: string;

  ControllerBinding_GyroButtonAbsMouse_GyroRightTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroRightTriggerThreshold: string;

  ControllerBinding_GyroButtonAbsMouse_GyroRightTriggerThreshold_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroRStick: string;

  ControllerBinding_GyroButtonAbsMouse_GyroRStick_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroRStickRPadTouch: string;

  ControllerBinding_GyroButtonAbsMouse_GyroRStickRPadTouch_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroRStickTouch: string;

  ControllerBinding_GyroButtonAbsMouse_GyroRStickTouch_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroSquare: string;

  ControllerBinding_GyroButtonAbsMouse_GyroSquare_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroTouchCenter: string;

  ControllerBinding_GyroButtonAbsMouse_GyroTouchCenter_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroTouchLeft: string;

  ControllerBinding_GyroButtonAbsMouse_GyroTouchLeft_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroTouchRight: string;

  ControllerBinding_GyroButtonAbsMouse_GyroTouchRight_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroTriangle: string;

  ControllerBinding_GyroButtonAbsMouse_GyroTriangle_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroX: string;

  ControllerBinding_GyroButtonAbsMouse_GyroX_Description: string;

  ControllerBinding_GyroButtonAbsMouse_GyroY: string;

  ControllerBinding_GyroButtonAbsMouse_GyroY_Description: string;

  ControllerBinding_GyroButtonDpad: string;

  ControllerBinding_GyroButtonDpad_Description: string;

  ControllerBinding_GyroButtonDpad_GyroA: string;

  ControllerBinding_GyroButtonDpad_GyroA_Description: string;

  ControllerBinding_GyroButtonDpad_GyroB: string;

  ControllerBinding_GyroButtonDpad_GyroB_Description: string;

  ControllerBinding_GyroButtonDpad_GyroBumperLeft: string;

  ControllerBinding_GyroButtonDpad_GyroBumperLeft_Description: string;

  ControllerBinding_GyroButtonDpad_GyroBumperRight: string;

  ControllerBinding_GyroButtonDpad_GyroBumperRight_Description: string;

  ControllerBinding_GyroButtonDpad_GyroCapture: string;

  ControllerBinding_GyroButtonDpad_GyroCapture_Description: string;

  ControllerBinding_GyroButtonDpad_GyroCircle: string;

  ControllerBinding_GyroButtonDpad_GyroCircle_Description: string;

  ControllerBinding_GyroButtonDpad_GyroClickLeft: string;

  ControllerBinding_GyroButtonDpad_GyroClickLeft_Description: string;

  ControllerBinding_GyroButtonDpad_GyroClickRight: string;

  ControllerBinding_GyroButtonDpad_GyroClickRight_Description: string;

  ControllerBinding_GyroButtonDpad_GyroCross: string;

  ControllerBinding_GyroButtonDpad_GyroCross_Description: string;

  ControllerBinding_GyroButtonDpad_GyroGripLeft: string;

  ControllerBinding_GyroButtonDpad_GyroGripLeft_Description: string;

  ControllerBinding_GyroButtonDpad_GyroGripRight: string;

  ControllerBinding_GyroButtonDpad_GyroGripRight_Description: string;

  ControllerBinding_GyroButtonDpad_GyroLeftTrigger: string;

  ControllerBinding_GyroButtonDpad_GyroLeftTrigger_Description: string;

  ControllerBinding_GyroButtonDpad_GyroLeftTriggerNoQualifier: string;

  ControllerBinding_GyroButtonDpad_GyroLeftTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButtonDpad_GyroLeftTriggerThreshold: string;

  ControllerBinding_GyroButtonDpad_GyroLeftTriggerThreshold_Description: string;

  ControllerBinding_GyroButtonDpad_GyroLStick: string;

  ControllerBinding_GyroButtonDpad_GyroLStick_Description: string;

  ControllerBinding_GyroButtonDpad_GyroLStickTouch: string;

  ControllerBinding_GyroButtonDpad_GyroLStickTouch_Description: string;

  ControllerBinding_GyroButtonDpad_GyroNone: string;

  ControllerBinding_GyroButtonDpad_GyroNone_Description: string;

  ControllerBinding_GyroButtonDpad_GyroRightTrigger: string;

  ControllerBinding_GyroButtonDpad_GyroRightTrigger_Description: string;

  ControllerBinding_GyroButtonDpad_GyroRightTriggerNoQualifier: string;

  ControllerBinding_GyroButtonDpad_GyroRightTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButtonDpad_GyroRightTriggerThreshold: string;

  ControllerBinding_GyroButtonDpad_GyroRightTriggerThreshold_Description: string;

  ControllerBinding_GyroButtonDpad_GyroRStick: string;

  ControllerBinding_GyroButtonDpad_GyroRStick_Description: string;

  ControllerBinding_GyroButtonDpad_GyroRStickRPadTouch: string;

  ControllerBinding_GyroButtonDpad_GyroRStickRPadTouch_Description: string;

  ControllerBinding_GyroButtonDpad_GyroRStickTouch: string;

  ControllerBinding_GyroButtonDpad_GyroRStickTouch_Description: string;

  ControllerBinding_GyroButtonDpad_GyroSquare: string;

  ControllerBinding_GyroButtonDpad_GyroSquare_Description: string;

  ControllerBinding_GyroButtonDpad_GyroTouchCenter: string;

  ControllerBinding_GyroButtonDpad_GyroTouchCenter_Description: string;

  ControllerBinding_GyroButtonDpad_GyroTouchLeft: string;

  ControllerBinding_GyroButtonDpad_GyroTouchLeft_Description: string;

  ControllerBinding_GyroButtonDpad_GyroTouchRight: string;

  ControllerBinding_GyroButtonDpad_GyroTouchRight_Description: string;

  ControllerBinding_GyroButtonDpad_GyroTriangle: string;

  ControllerBinding_GyroButtonDpad_GyroTriangle_Description: string;

  ControllerBinding_GyroButtonDpad_GyroX: string;

  ControllerBinding_GyroButtonDpad_GyroX_Description: string;

  ControllerBinding_GyroButtonDpad_GyroY: string;

  ControllerBinding_GyroButtonDpad_GyroY_Description: string;

  ControllerBinding_GyroButtonHapticEffect: string;

  ControllerBinding_GyroButtonHapticEffect_Description: string;

  ControllerBinding_GyroButtonHapticEffect_Off_Description: string;

  ControllerBinding_GyroButtonHapticEffect_OnDisable_Description: string;

  ControllerBinding_GyroButtonHapticEffect_OnEnable_Description: string;

  ControllerBinding_GyroButtonHapticEffect_OnEnableAndDisable_Description: string;

  ControllerBinding_GyroButtonInvert2DScroll: string;

  ControllerBinding_GyroButtonInvert2DScroll_Description: string;

  ControllerBinding_GyroButtonInvert2DScroll_Off: string;

  ControllerBinding_GyroButtonInvert2DScroll_Off_Description: string;

  ControllerBinding_GyroButtonInvert2DScroll_On: string;

  ControllerBinding_GyroButtonInvert2DScroll_On_Description: string;

  ControllerBinding_GyroButtonInvert2DScroll_Toggle: string;

  ControllerBinding_GyroButtonInvert2DScroll_Toggle_Description: string;

  ControllerBinding_GyroButtonInvert_joystick_mouse: string;

  ControllerBinding_GyroButtonInvert_joystick_mouse_Description: string;

  ControllerBinding_GyroButtonInvert_joystick_mouse_Off: string;

  ControllerBinding_GyroButtonInvert_joystick_mouse_Off_Description: string;

  ControllerBinding_GyroButtonInvert_joystick_mouse_On: string;

  ControllerBinding_GyroButtonInvert_joystick_mouse_On_Description: string;

  ControllerBinding_GyroButtonInvert_joystick_mouse_Toggle: string;

  ControllerBinding_GyroButtonInvert_joystick_mouse_Toggle_Description: string;

  ControllerBinding_GyroButtonInvert_joystick_move: string;

  ControllerBinding_GyroButtonInvert_joystick_move_Description: string;

  ControllerBinding_GyroButtonInvert_joystick_move_Off: string;

  ControllerBinding_GyroButtonInvert_joystick_move_Off_Description: string;

  ControllerBinding_GyroButtonInvert_joystick_move_On: string;

  ControllerBinding_GyroButtonInvert_joystick_move_On_Description: string;

  ControllerBinding_GyroButtonInvert_joystick_move_Toggle: string;

  ControllerBinding_GyroButtonInvert_joystick_move_Toggle_Description: string;

  ControllerBinding_GyroButtonInvertAbsMouse: string;

  ControllerBinding_GyroButtonInvertAbsMouse_Description: string;

  ControllerBinding_GyroButtonInvertAbsMouse_Off: string;

  ControllerBinding_GyroButtonInvertAbsMouse_Off_Description: string;

  ControllerBinding_GyroButtonInvertAbsMouse_On: string;

  ControllerBinding_GyroButtonInvertAbsMouse_On_Description: string;

  ControllerBinding_GyroButtonInvertAbsMouse_Toggle: string;

  ControllerBinding_GyroButtonInvertAbsMouse_Toggle_Description: string;

  ControllerBinding_GyroButtonInvertDpad: string;

  ControllerBinding_GyroButtonInvertDpad_Description: string;

  ControllerBinding_GyroButtonInvertDpad_Off: string;

  ControllerBinding_GyroButtonInvertDpad_Off_Description: string;

  ControllerBinding_GyroButtonInvertDpad_On: string;

  ControllerBinding_GyroButtonInvertDpad_On_Description: string;

  ControllerBinding_GyroButtonInvertDpad_Toggle: string;

  ControllerBinding_GyroButtonInvertDpad_Toggle_Description: string;

  ControllerBinding_GyroButtonInvertJoystickCamera: string;

  ControllerBinding_GyroButtonInvertJoystickCamera_Description: string;

  ControllerBinding_GyroButtonInvertJoystickCamera_Off: string;

  ControllerBinding_GyroButtonInvertJoystickCamera_Off_Description: string;

  ControllerBinding_GyroButtonInvertJoystickCamera_On: string;

  ControllerBinding_GyroButtonInvertJoystickCamera_On_Description: string;

  ControllerBinding_GyroButtonInvertJoystickCamera_Toggle: string;

  ControllerBinding_GyroButtonInvertJoystickCamera_Toggle_Description: string;

  ControllerBinding_GyroButtonInvertMouseJoystick: string;

  ControllerBinding_GyroButtonInvertMouseJoystick_Description: string;

  ControllerBinding_GyroButtonInvertMouseJoystick_Off: string;

  ControllerBinding_GyroButtonInvertMouseJoystick_Off_Description: string;

  ControllerBinding_GyroButtonInvertMouseJoystick_On: string;

  ControllerBinding_GyroButtonInvertMouseJoystick_On_Description: string;

  ControllerBinding_GyroButtonInvertMouseJoystick_Toggle: string;

  ControllerBinding_GyroButtonInvertMouseJoystick_Toggle_Description: string;

  ControllerBinding_GyroButtonJoystickCamera: string;

  ControllerBinding_GyroButtonJoystickCamera_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroA: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroA_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroB: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroB_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroBumperLeft: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroBumperLeft_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroBumperRight: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroBumperRight_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroCapture: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroCapture_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroCircle: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroCircle_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroClickLeft: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroClickLeft_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroClickRight: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroClickRight_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroCross: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroCross_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroGripLeft: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroGripLeft_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroGripRight: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroGripRight_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroLeftTrigger: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroLeftTrigger_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroLeftTriggerNoQualifier: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroLeftTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroLeftTriggerThreshold: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroLeftTriggerThreshold_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroLStick: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroLStick_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroLStickTouch: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroLStickTouch_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroNone: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroNone_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroRightTrigger: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroRightTrigger_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroRightTriggerNoQualifier: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroRightTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroRightTriggerThreshold: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroRightTriggerThreshold_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroRStick: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroRStick_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroRStickRPadTouch: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroRStickRPadTouch_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroRStickTouch: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroRStickTouch_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroSquare: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroSquare_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroTouchCenter: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroTouchCenter_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroTouchLeft: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroTouchLeft_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroTouchRight: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroTouchRight_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroTriangle: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroTriangle_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroX: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroX_Description: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroY: string;

  ControllerBinding_GyroButtonJoystickCamera_GyroY_Description: string;

  ControllerBinding_GyroButtonMouseJoystick: string;

  ControllerBinding_GyroButtonMouseJoystick_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroA: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroA_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroB: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroB_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroBumperLeft: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroBumperLeft_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroBumperRight: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroBumperRight_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroCapture: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroCapture_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroCircle: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroCircle_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroClickLeft: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroClickLeft_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroClickRight: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroClickRight_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroCross: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroCross_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroGripLeft: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroGripLeft_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroGripRight: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroGripRight_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroLeftTrigger: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroLeftTrigger_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroLeftTriggerNoQualifier: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroLeftTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroLeftTriggerThreshold: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroLeftTriggerThreshold_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroLStick: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroLStick_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroLStickTouch: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroLStickTouch_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroNone: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroNone_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroRightTrigger: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroRightTrigger_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroRightTriggerNoQualifier: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroRightTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroRightTriggerThreshold: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroRightTriggerThreshold_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroRStick: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroRStick_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroRStickRPadTouch: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroRStickRPadTouch_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroRStickTouch: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroRStickTouch_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroSquare: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroSquare_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroTouchCenter: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroTouchCenter_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroTouchLeft: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroTouchLeft_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroTouchRight: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroTouchRight_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroTriangle: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroTriangle_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroX: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroX_Description: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroY: string;

  ControllerBinding_GyroButtonMouseJoystick_GyroY_Description: string;

  ControllerBinding_GyroButtonMouseRegion: string;

  ControllerBinding_GyroButtonMouseRegion_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroA: string;

  ControllerBinding_GyroButtonMouseRegion_GyroA_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroB: string;

  ControllerBinding_GyroButtonMouseRegion_GyroB_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroBumperLeft: string;

  ControllerBinding_GyroButtonMouseRegion_GyroBumperLeft_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroBumperRight: string;

  ControllerBinding_GyroButtonMouseRegion_GyroBumperRight_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroCapture: string;

  ControllerBinding_GyroButtonMouseRegion_GyroCapture_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroCircle: string;

  ControllerBinding_GyroButtonMouseRegion_GyroCircle_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroClickLeft: string;

  ControllerBinding_GyroButtonMouseRegion_GyroClickLeft_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroClickRight: string;

  ControllerBinding_GyroButtonMouseRegion_GyroClickRight_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroCross: string;

  ControllerBinding_GyroButtonMouseRegion_GyroCross_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroGripLeft: string;

  ControllerBinding_GyroButtonMouseRegion_GyroGripLeft_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroGripRight: string;

  ControllerBinding_GyroButtonMouseRegion_GyroGripRight_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroLeftTrigger: string;

  ControllerBinding_GyroButtonMouseRegion_GyroLeftTrigger_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroLeftTriggerNoQualifier: string;

  ControllerBinding_GyroButtonMouseRegion_GyroLeftTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroLeftTriggerThreshold: string;

  ControllerBinding_GyroButtonMouseRegion_GyroLeftTriggerThreshold_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroLStick: string;

  ControllerBinding_GyroButtonMouseRegion_GyroLStick_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroNone: string;

  ControllerBinding_GyroButtonMouseRegion_GyroNone_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroRightTrigger: string;

  ControllerBinding_GyroButtonMouseRegion_GyroRightTrigger_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroRightTriggerNoQualifier: string;

  ControllerBinding_GyroButtonMouseRegion_GyroRightTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroRightTriggerThreshold: string;

  ControllerBinding_GyroButtonMouseRegion_GyroRightTriggerThreshold_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroRStick: string;

  ControllerBinding_GyroButtonMouseRegion_GyroRStick_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroSquare: string;

  ControllerBinding_GyroButtonMouseRegion_GyroSquare_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroTouchCenter: string;

  ControllerBinding_GyroButtonMouseRegion_GyroTouchCenter_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroTouchLeft: string;

  ControllerBinding_GyroButtonMouseRegion_GyroTouchLeft_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroTouchRight: string;

  ControllerBinding_GyroButtonMouseRegion_GyroTouchRight_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroTriangle: string;

  ControllerBinding_GyroButtonMouseRegion_GyroTriangle_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroX: string;

  ControllerBinding_GyroButtonMouseRegion_GyroX_Description: string;

  ControllerBinding_GyroButtonMouseRegion_GyroY: string;

  ControllerBinding_GyroButtonMouseRegion_GyroY_Description: string;

  ControllerBinding_GyroButtonOnOffHapticIntensity: string;

  ControllerBinding_GyroButtonOnOffHapticIntensity_Description: string;

  ControllerBinding_GyroButtonTouchMenu: string;

  ControllerBinding_GyroButtonTouchMenu_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroA: string;

  ControllerBinding_GyroButtonTouchMenu_GyroA_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroB: string;

  ControllerBinding_GyroButtonTouchMenu_GyroB_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroBumperLeft: string;

  ControllerBinding_GyroButtonTouchMenu_GyroBumperLeft_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroBumperRight: string;

  ControllerBinding_GyroButtonTouchMenu_GyroBumperRight_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroCapture: string;

  ControllerBinding_GyroButtonTouchMenu_GyroCapture_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroCircle: string;

  ControllerBinding_GyroButtonTouchMenu_GyroCircle_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroClickLeft: string;

  ControllerBinding_GyroButtonTouchMenu_GyroClickLeft_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroClickRight: string;

  ControllerBinding_GyroButtonTouchMenu_GyroClickRight_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroCross: string;

  ControllerBinding_GyroButtonTouchMenu_GyroCross_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroGripLeft: string;

  ControllerBinding_GyroButtonTouchMenu_GyroGripLeft_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroGripRight: string;

  ControllerBinding_GyroButtonTouchMenu_GyroGripRight_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroLeftTrigger: string;

  ControllerBinding_GyroButtonTouchMenu_GyroLeftTrigger_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroLeftTriggerNoQualifier: string;

  ControllerBinding_GyroButtonTouchMenu_GyroLeftTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroLeftTriggerThreshold: string;

  ControllerBinding_GyroButtonTouchMenu_GyroLeftTriggerThreshold_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroLStick: string;

  ControllerBinding_GyroButtonTouchMenu_GyroLStick_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroLStickTouch: string;

  ControllerBinding_GyroButtonTouchMenu_GyroLStickTouch_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroNone: string;

  ControllerBinding_GyroButtonTouchMenu_GyroNone_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroRightTrigger: string;

  ControllerBinding_GyroButtonTouchMenu_GyroRightTrigger_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroRightTriggerNoQualifier: string;

  ControllerBinding_GyroButtonTouchMenu_GyroRightTriggerNoQualifier_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroRightTriggerThreshold: string;

  ControllerBinding_GyroButtonTouchMenu_GyroRightTriggerThreshold_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroRStick: string;

  ControllerBinding_GyroButtonTouchMenu_GyroRStick_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroRStickRPadTouch: string;

  ControllerBinding_GyroButtonTouchMenu_GyroRStickRPadTouch_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroRStickTouch: string;

  ControllerBinding_GyroButtonTouchMenu_GyroRStickTouch_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroSquare: string;

  ControllerBinding_GyroButtonTouchMenu_GyroSquare_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroTouchCenter: string;

  ControllerBinding_GyroButtonTouchMenu_GyroTouchCenter_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroTouchLeft: string;

  ControllerBinding_GyroButtonTouchMenu_GyroTouchLeft_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroTouchRight: string;

  ControllerBinding_GyroButtonTouchMenu_GyroTouchRight_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroTriangle: string;

  ControllerBinding_GyroButtonTouchMenu_GyroTriangle_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroX: string;

  ControllerBinding_GyroButtonTouchMenu_GyroX_Description: string;

  ControllerBinding_GyroButtonTouchMenu_GyroY: string;

  ControllerBinding_GyroButtonTouchMenu_GyroY_Description: string;

  ControllerBinding_GyroComplementaryAxisContribution: string;

  ControllerBinding_GyroComplementaryAxisContribution_Description: string;

  ControllerBinding_GyroConfigurationModeSetting_Off_Description: string;

  ControllerBinding_GyroConfigurationModeSetting_On_Description: string;

  ControllerBinding_GyroConfigurationModeSetting_Toggle_Description: string;

  ControllerBinding_GyroDeflectionAngleMax: string;

  ControllerBinding_GyroDeflectionAngleMax_Description: string;

  ControllerBinding_GyroDeflectionAngleMin: string;

  ControllerBinding_GyroDeflectionAngleMin_Description: string;

  ControllerBinding_GyroDeflectionTiltAngle: string;

  ControllerBinding_GyroDeflectionTiltAngle_Description: string;

  ControllerBinding_GyroDeflectionUseGravity: string;

  ControllerBinding_GyroDeflectionUseGravity_Description: string;

  ControllerBinding_GyroDeflectionUseGravityRoll: string;

  ControllerBinding_GyroDeflectionUseGravityRoll_Description: string;

  ControllerBinding_GyroDragCenterPoint: string;

  ControllerBinding_GyroDragCenterPoint_Description: string;

  ControllerBinding_GyroEnableAngleCatchUp: string;

  ControllerBinding_GyroEnableAngleCatchUp_Description: string;

  ControllerBinding_GyroEnableButton: string;

  ControllerBinding_GyroEnableButton_Description: string;

  ControllerBinding_GyroEnableButtonBehavior: string;

  ControllerBinding_GyroEnableButtonBehavior_Description: string;

  ControllerBinding_GyroEnableButtonBehavior_GyroOff_Description: string;

  ControllerBinding_GyroEnableButtonBehavior_GyroOn_Description: string;

  ControllerBinding_GyroEnableButtonBehavior_GyroToggle_Description: string;

  ControllerBinding_GyroEnableButtonRequireAnyOrAll: string;

  ControllerBinding_GyroEnableButtonRequireAnyOrAll_Description: string;

  ControllerBinding_GyroEnableButtonRequireAnyOrAll_GyroRequireAll_Description: string;

  ControllerBinding_GyroEnableButtonRequireAnyOrAll_GyroRequireAny_Description: string;

  ControllerBinding_GyroHapticBumpsPerAngle: string;

  ControllerBinding_GyroHapticBumpsPerAngle_Description: string;

  ControllerBinding_GyroInvertX: string;

  ControllerBinding_GyroInvertX_Description: string;

  ControllerBinding_GyroInvertY: string;

  ControllerBinding_GyroInvertY_Description: string;

  ControllerBinding_GyroJoystickOutputMax: string;

  ControllerBinding_GyroJoystickOutputMax_Description: string;

  ControllerBinding_GyroJoystickOutputMin: string;

  ControllerBinding_GyroJoystickOutputMin_Description: string;

  ControllerBinding_GyroJoystickPowerCurve: string;

  ControllerBinding_GyroJoystickPowerCurve_Description: string;

  ControllerBinding_GyroLockExtents: string;

  ControllerBinding_GyroLockExtents_Description: string;

  ControllerBinding_GyroLockExtents_joystick_move: string;

  ControllerBinding_GyroLockExtents_joystick_move_description: string;

  ControllerBinding_GyroLockExtents_joystick_move_off: string;

  ControllerBinding_GyroLockExtents_joystick_move_off_description: string;

  ControllerBinding_GyroLockExtents_joystick_move_on: string;

  ControllerBinding_GyroLockExtents_joystick_move_on_description: string;

  ControllerBinding_GyroLockExtentsDpad: string;

  ControllerBinding_GyroLockExtentsDpad_Description: string;

  ControllerBinding_GyroLockExtentsDpad_off: string;

  ControllerBinding_GyroLockExtentsDpad_off_description: string;

  ControllerBinding_GyroLockExtentsDpad_on: string;

  ControllerBinding_GyroLockExtentsDpad_on_description: string;

  ControllerBinding_GyroMomentumEnabled: string;

  ControllerBinding_GyroMomentumEnabled_Description: string;

  ControllerBinding_GyroMomentumFrictionX: string;

  ControllerBinding_GyroMomentumFrictionX_Description: string;

  ControllerBinding_GyroMomentumFrictionY: string;

  ControllerBinding_GyroMomentumFrictionY_Description: string;

  ControllerBinding_GyroMultiselectToggle: string;

  ControllerBinding_GyroMultiselectToggle_Description: string;

  ControllerBinding_GyroNaturalSensitivityAbsoluteMouse: string;

  ControllerBinding_GyroNaturalSensitivityAbsoluteMouse_Description: string;

  ControllerBinding_GyroNaturalSensitivityGyroToMouse: string;

  ControllerBinding_GyroNaturalSensitivityGyroToMouse_Description: string;

  ControllerBinding_GyroNaturalSensitivitySpeedToDeflection: string;

  ControllerBinding_GyroNaturalSensitivitySpeedToDeflection_Description: string;

  ControllerBinding_GyroNeutralAngle2DScroll: string;

  ControllerBinding_GyroNeutralAngle2DScroll_Description: string;

  ControllerBinding_GyroNeutralAngle_joystick_move: string;

  ControllerBinding_GyroNeutralAngle_joystick_move_Description: string;

  ControllerBinding_GyroNeutralAngleDpad: string;

  ControllerBinding_GyroNeutralAngleDpad_Description: string;

  ControllerBinding_GyroNeutralAngleJoystickCamera: string;

  ControllerBinding_GyroNeutralAngleJoystickCamera_Description: string;

  ControllerBinding_GyroPersonalizationOverridesMode: string;

  ControllerBinding_GyroPersonalizationOverridesMode_Description: string;

  ControllerBinding_GyroPrecisionSpeed: string;

  ControllerBinding_GyroPrecisionSpeed_Description: string;

  ControllerBinding_GyroRollContribution: string;

  ControllerBinding_GyroRollContribution_Description: string;

  ControllerBinding_GyroRollScaleAbsMouse: string;

  ControllerBinding_GyroRollScaleAbsMouse_Description: string;

  ControllerBinding_GyroRollScaleMouseJoystick: string;

  ControllerBinding_GyroRollScaleMouseJoystick_Description: string;

  ControllerBinding_GyroRotationalHapticBumpsIntensity: string;

  ControllerBinding_GyroRotationalHapticBumpsIntensity_Description: string;

  ControllerBinding_GyroSampleAngleOffsetX: string;

  ControllerBinding_GyroSampleAngleOffsetX_Description: string;

  ControllerBinding_GyroSensitivityScaleMouseJoystick: string;

  ControllerBinding_GyroSensitivityScaleMouseJoystick_Description: string;

  ControllerBinding_GyroSpeedAnglePerSecondMax: string;

  ControllerBinding_GyroSpeedAnglePerSecondMax_Description: string;

  ControllerBinding_GyroSpeedAnglePerSecondMin: string;

  ControllerBinding_GyroSpeedAnglePerSecondMin_Description: string;

  ControllerBinding_GyroSpeedDeadzone: string;

  ControllerBinding_GyroSpeedDeadzone_Description: string;

  ControllerBinding_GyroTo2DConversionStyle: string;

  ControllerBinding_GyroTo2DConversionStyle_Description: string;

  ControllerBinding_GyroTo2DConversionStyle_LaserPointer_Description: string;

  ControllerBinding_GyroTo2DConversionStyle_LocalSpaceAdvanced_Description: string;

  ControllerBinding_GyroTo2DConversionStyle_LocalSpaceCombineYawAndRoll_Description: string;

  ControllerBinding_GyroTo2DConversionStyle_LocalSpaceRoll_Description: string;

  ControllerBinding_GyroTo2DConversionStyle_LocalSpaceYaw_Description: string;

  ControllerBinding_GyroTo2DConversionStyle_PlayerSpace_Description: string;

  ControllerBinding_GyroTo2DConversionStyle_WorldSpace_Description: string;

  ControllerBinding_GyroToJoystickOutputMode: string;

  ControllerBinding_GyroToJoystickOutputMode_Description: string;

  ControllerBinding_GyroVerticalHorizontalRatio: string;

  ControllerBinding_GyroVerticalHorizontalRatio_Description: string;

  ControllerBinding_GyroYawScaleAbsMouse: string;

  ControllerBinding_GyroYawScaleAbsMouse_Description: string;

  ControllerBinding_GyroYawScaleMouseJoystick: string;

  ControllerBinding_GyroYawScaleMouseJoystick_Description: string;

  ControllerBinding_HapticIntensity_joystick_mouse: string;

  ControllerBinding_HapticIntensity_joystick_mouse_Description: string;

  ControllerBinding_HapticIntensity_joystick_mouse_High: string;

  ControllerBinding_HapticIntensity_joystick_mouse_High_Description: string;

  ControllerBinding_HapticIntensity_joystick_mouse_Low: string;

  ControllerBinding_HapticIntensity_joystick_mouse_Low_Description: string;

  ControllerBinding_HapticIntensity_joystick_mouse_Medium: string;

  ControllerBinding_HapticIntensity_joystick_mouse_Medium_Description: string;

  ControllerBinding_HapticIntensity_joystick_mouse_Off: string;

  ControllerBinding_HapticIntensity_joystick_mouse_Off_Description: string;

  ControllerBinding_HapticIntensity_joystick_move: string;

  ControllerBinding_HapticIntensity_joystick_move_Description: string;

  ControllerBinding_HapticIntensity_joystick_move_High: string;

  ControllerBinding_HapticIntensity_joystick_move_High_Description: string;

  ControllerBinding_HapticIntensity_joystick_move_Low: string;

  ControllerBinding_HapticIntensity_joystick_move_Low_Description: string;

  ControllerBinding_HapticIntensity_joystick_move_Medium: string;

  ControllerBinding_HapticIntensity_joystick_move_Medium_Description: string;

  ControllerBinding_HapticIntensity_joystick_move_Off: string;

  ControllerBinding_HapticIntensity_joystick_move_Off_Description: string;

  ControllerBinding_HapticIntensityAbsMouse: string;

  ControllerBinding_HapticIntensityAbsMouse_Description: string;

  ControllerBinding_HapticIntensityAbsMouse_High: string;

  ControllerBinding_HapticIntensityAbsMouse_High_Description: string;

  ControllerBinding_HapticIntensityAbsMouse_Low: string;

  ControllerBinding_HapticIntensityAbsMouse_Low_Description: string;

  ControllerBinding_HapticIntensityAbsMouse_Medium: string;

  ControllerBinding_HapticIntensityAbsMouse_Medium_Description: string;

  ControllerBinding_HapticIntensityAbsMouse_Off: string;

  ControllerBinding_HapticIntensityAbsMouse_Off_Description: string;

  ControllerBinding_HapticIntensityDpad: string;

  ControllerBinding_HapticIntensityDpad_ActivatorPref: string;

  ControllerBinding_HapticIntensityDpad_ActivatorPref_Description: string;

  ControllerBinding_HapticIntensityDpad_Description: string;

  ControllerBinding_HapticIntensityDpad_High: string;

  ControllerBinding_HapticIntensityDpad_High_Description: string;

  ControllerBinding_HapticIntensityDpad_Low: string;

  ControllerBinding_HapticIntensityDpad_Low_Description: string;

  ControllerBinding_HapticIntensityDpad_Medium: string;

  ControllerBinding_HapticIntensityDpad_Medium_Description: string;

  ControllerBinding_HapticIntensityDpad_Off: string;

  ControllerBinding_HapticIntensityDpad_Off_Description: string;

  ControllerBinding_HapticIntensityDpadGA: string;

  ControllerBinding_HapticIntensityDpadGA_ActivatorPref: string;

  ControllerBinding_HapticIntensityDpadGA_ActivatorPref_Description: string;

  ControllerBinding_HapticIntensityDpadGA_Description: string;

  ControllerBinding_HapticIntensityDpadGA_High: string;

  ControllerBinding_HapticIntensityDpadGA_High_Description: string;

  ControllerBinding_HapticIntensityDpadGA_Low: string;

  ControllerBinding_HapticIntensityDpadGA_Low_Description: string;

  ControllerBinding_HapticIntensityDpadGA_Medium: string;

  ControllerBinding_HapticIntensityDpadGA_Medium_Description: string;

  ControllerBinding_HapticIntensityDpadGA_Off: string;

  ControllerBinding_HapticIntensityDpadGA_Off_Description: string;

  ControllerBinding_HapticIntensityFlickStick: string;

  ControllerBinding_HapticIntensityFlickStick_Description: string;

  ControllerBinding_HapticIntensityFourButtons: string;

  ControllerBinding_HapticIntensityFourButtons_ActivatorPref: string;

  ControllerBinding_HapticIntensityFourButtons_ActivatorPref_Description: string;

  ControllerBinding_HapticIntensityFourButtons_Description: string;

  ControllerBinding_HapticIntensityFourButtons_High: string;

  ControllerBinding_HapticIntensityFourButtons_High_Description: string;

  ControllerBinding_HapticIntensityFourButtons_Low: string;

  ControllerBinding_HapticIntensityFourButtons_Low_Description: string;

  ControllerBinding_HapticIntensityFourButtons_Medium: string;

  ControllerBinding_HapticIntensityFourButtons_Medium_Description: string;

  ControllerBinding_HapticIntensityFourButtons_Off: string;

  ControllerBinding_HapticIntensityFourButtons_Off_Description: string;

  ControllerBinding_HapticIntensityFourButtonsGA: string;

  ControllerBinding_HapticIntensityFourButtonsGA_ActivatorPref: string;

  ControllerBinding_HapticIntensityFourButtonsGA_ActivatorPref_Description: string;

  ControllerBinding_HapticIntensityFourButtonsGA_Description: string;

  ControllerBinding_HapticIntensityFourButtonsGA_High: string;

  ControllerBinding_HapticIntensityFourButtonsGA_High_Description: string;

  ControllerBinding_HapticIntensityFourButtonsGA_Low: string;

  ControllerBinding_HapticIntensityFourButtonsGA_Low_Description: string;

  ControllerBinding_HapticIntensityFourButtonsGA_Medium: string;

  ControllerBinding_HapticIntensityFourButtonsGA_Medium_Description: string;

  ControllerBinding_HapticIntensityFourButtonsGA_Off: string;

  ControllerBinding_HapticIntensityFourButtonsGA_Off_Description: string;

  ControllerBinding_HapticIntensityJoystickCameraMode: string;

  ControllerBinding_HapticIntensityJoystickCameraMode_Description: string;

  ControllerBinding_HapticIntensityJoystickCameraMode_High: string;

  ControllerBinding_HapticIntensityJoystickCameraMode_High_Description: string;

  ControllerBinding_HapticIntensityJoystickCameraMode_Low: string;

  ControllerBinding_HapticIntensityJoystickCameraMode_Low_Description: string;

  ControllerBinding_HapticIntensityJoystickCameraMode_Medium: string;

  ControllerBinding_HapticIntensityJoystickCameraMode_Medium_Description: string;

  ControllerBinding_HapticIntensityJoystickCameraMode_Off: string;

  ControllerBinding_HapticIntensityJoystickCameraMode_Off_Description: string;

  ControllerBinding_HapticIntensityMouseJoystick: string;

  ControllerBinding_HapticIntensityMouseJoystick_Description: string;

  ControllerBinding_HapticIntensityMouseJoystick_High: string;

  ControllerBinding_HapticIntensityMouseJoystick_High_Description: string;

  ControllerBinding_HapticIntensityMouseJoystick_Low: string;

  ControllerBinding_HapticIntensityMouseJoystick_Low_Description: string;

  ControllerBinding_HapticIntensityMouseJoystick_Medium: string;

  ControllerBinding_HapticIntensityMouseJoystick_Medium_Description: string;

  ControllerBinding_HapticIntensityMouseJoystick_Off: string;

  ControllerBinding_HapticIntensityMouseJoystick_Off_Description: string;

  ControllerBinding_HapticIntensityMouseRegion: string;

  ControllerBinding_HapticIntensityMouseRegion_Description: string;

  ControllerBinding_HapticIntensityMouseRegion_High: string;

  ControllerBinding_HapticIntensityMouseRegion_High_Description: string;

  ControllerBinding_HapticIntensityMouseRegion_Low: string;

  ControllerBinding_HapticIntensityMouseRegion_Low_Description: string;

  ControllerBinding_HapticIntensityMouseRegion_Medium: string;

  ControllerBinding_HapticIntensityMouseRegion_Medium_Description: string;

  ControllerBinding_HapticIntensityMouseRegion_Off: string;

  ControllerBinding_HapticIntensityMouseRegion_Off_Description: string;

  ControllerBinding_HapticIntensityRadialMenu: string;

  ControllerBinding_HapticIntensityScrollWheel: string;

  ControllerBinding_HapticIntensityScrollWheel_Description: string;

  ControllerBinding_HapticIntensityScrollWheel_High: string;

  ControllerBinding_HapticIntensityScrollWheel_High_Description: string;

  ControllerBinding_HapticIntensityScrollWheel_Low: string;

  ControllerBinding_HapticIntensityScrollWheel_Low_Description: string;

  ControllerBinding_HapticIntensityScrollWheel_Medium: string;

  ControllerBinding_HapticIntensityScrollWheel_Medium_Description: string;

  ControllerBinding_HapticIntensityScrollWheel_Off: string;

  ControllerBinding_HapticIntensityScrollWheel_Off_Description: string;

  ControllerBinding_HapticIntensityTouchMenu: string;

  ControllerBinding_HapticIntensityTriggerThreshold: string;

  ControllerBinding_HapticIntensityTriggerThreshold_ActivatorPref: string;

  ControllerBinding_HapticIntensityTriggerThreshold_ActivatorPref_Description: string;

  ControllerBinding_HapticIntensityTriggerThreshold_Description: string;

  ControllerBinding_HapticIntensityTriggerThreshold_High: string;

  ControllerBinding_HapticIntensityTriggerThreshold_High_Description: string;

  ControllerBinding_HapticIntensityTriggerThreshold_Low: string;

  ControllerBinding_HapticIntensityTriggerThreshold_Low_Description: string;

  ControllerBinding_HapticIntensityTriggerThreshold_Medium: string;

  ControllerBinding_HapticIntensityTriggerThreshold_Medium_Description: string;

  ControllerBinding_HapticIntensityTriggerThreshold_Off: string;

  ControllerBinding_HapticIntensityTriggerThreshold_Off_Description: string;

  ControllerBinding_HeaderLoad: string;

  ControllerBinding_HeaderSave: string;

  ControllerBinding_HoldRepeatIntervalDpad: string;

  ControllerBinding_HoldRepeatIntervalDpad_Description: string;

  ControllerBinding_HoldRepeatIntervalFourButtons: string;

  ControllerBinding_HoldRepeatIntervalFourButtons_Description: string;

  ControllerBinding_HoldRepeatIntervalTrigger: string;

  ControllerBinding_HoldRepeatIntervalTrigger_Description: string;

  ControllerBinding_HoldRepeatsDpad: string;

  ControllerBinding_HoldRepeatsDpad_Description: string;

  ControllerBinding_HoldRepeatsDpad_Off: string;

  ControllerBinding_HoldRepeatsDpad_Off_Description: string;

  ControllerBinding_HoldRepeatsDpad_On: string;

  ControllerBinding_HoldRepeatsDpad_On_Description: string;

  ControllerBinding_HoldRepeatsFourButtons: string;

  ControllerBinding_HoldRepeatsFourButtons_Description: string;

  ControllerBinding_HoldRepeatsFourButtons_Off: string;

  ControllerBinding_HoldRepeatsFourButtons_Off_Description: string;

  ControllerBinding_HoldRepeatsFourButtons_On: string;

  ControllerBinding_HoldRepeatsFourButtons_On_Description: string;

  ControllerBinding_HoldRepeatsTrigger: string;

  ControllerBinding_HoldRepeatsTrigger_Description: string;

  ControllerBinding_HoldRepeatsTrigger_Off: string;

  ControllerBinding_HoldRepeatsTrigger_Off_Description: string;

  ControllerBinding_HoldRepeatsTrigger_On: string;

  ControllerBinding_HoldRepeatsTrigger_On_Description: string;

  ControllerBinding_HorizontalSensitivity_joystick_mouse: string;

  ControllerBinding_HorizontalSensitivity_joystick_mouse_Description: string;

  ControllerBinding_HorizontalSensitivity_joystick_move: string;

  ControllerBinding_HorizontalSensitivity_joystick_move_Description: string;

  ControllerBinding_HorizontalSensitivityMouseRegion: string;

  ControllerBinding_HorizontalSensitivityMouseRegion_Description: string;

  ControllerBinding_HotbarButtonCount: string;

  ControllerBinding_HotbarButtonCount_Button2: string;

  ControllerBinding_HotbarButtonCount_Button2_Description: string;

  ControllerBinding_HotbarButtonCount_Button4: string;

  ControllerBinding_HotbarButtonCount_Button4_Description: string;

  ControllerBinding_HotbarButtonCount_Button5: string;

  ControllerBinding_HotbarButtonCount_Button5_Description: string;

  ControllerBinding_HotbarButtonCount_Button7: string;

  ControllerBinding_HotbarButtonCount_Button7_Description: string;

  ControllerBinding_HotbarButtonCount_Button9: string;

  ControllerBinding_HotbarButtonCount_Button9_Description: string;

  ControllerBinding_HotbarButtonCount_Button12: string;

  ControllerBinding_HotbarButtonCount_Button12_Description: string;

  ControllerBinding_HotbarButtonCount_Button13: string;

  ControllerBinding_HotbarButtonCount_Button13_Description: string;

  ControllerBinding_HotbarButtonCount_Button16: string;

  ControllerBinding_HotbarButtonCount_Button16_Description: string;

  ControllerBinding_HotbarButtonCount_Description: string;

  ControllerBinding_HotbarClick: string;

  ControllerBinding_HotbarDeadzone: string;

  ControllerBinding_HotbarDismissAfterActivation: string;

  ControllerBinding_HotbarDismissAfterActivation_Description: string;

  ControllerBinding_HotbarDismissAfterActivation_Off: string;

  ControllerBinding_HotbarDismissAfterActivation_Off_Description: string;

  ControllerBinding_HotbarDismissAfterActivation_On: string;

  ControllerBinding_HotbarDismissAfterActivation_On_Description: string;

  ControllerBinding_HotbarEdge: string;

  ControllerBinding_HotbarOpacity: string;

  ControllerBinding_HotbarOpacity_Description: string;

  ControllerBinding_HotbarPosX: string;

  ControllerBinding_HotbarPosX_Description: string;

  ControllerBinding_HotbarPosY: string;

  ControllerBinding_HotbarPosY_Description: string;

  ControllerBinding_HotbarRecenterEachTime: string;

  ControllerBinding_HotbarRecenterEachTime_Description: string;

  ControllerBinding_HotbarRecenterEachTime_Off: string;

  ControllerBinding_HotbarRecenterEachTime_Off_Description: string;

  ControllerBinding_HotbarRecenterEachTime_On: string;

  ControllerBinding_HotbarRecenterEachTime_On_Description: string;

  ControllerBinding_HotbarScale: string;

  ControllerBinding_HotbarScale_Description: string;

  ControllerBinding_HotbarScrollWrap: string;

  ControllerBinding_HotbarScrollWrap_Description: string;

  ControllerBinding_HotbarScrollWrap_Off: string;

  ControllerBinding_HotbarScrollWrap_Off_Description: string;

  ControllerBinding_HotbarScrollWrap_On: string;

  ControllerBinding_HotbarScrollWrap_On_Description: string;

  ControllerBinding_HotbarTouchMenu_Button0: string;

  ControllerBinding_HotbarTouchMenu_Button1: string;

  ControllerBinding_HotbarTouchMenu_Button2: string;

  ControllerBinding_HotbarTouchMenu_Button3: string;

  ControllerBinding_HotbarTouchMenu_Button4: string;

  ControllerBinding_HotbarTouchMenu_Button5: string;

  ControllerBinding_HotbarTouchMenu_Button6: string;

  ControllerBinding_HotbarTouchMenu_Button7: string;

  ControllerBinding_HotbarTouchMenu_Button8: string;

  ControllerBinding_HotbarTouchMenu_Button9: string;

  ControllerBinding_HotbarTouchMenu_Button10: string;

  ControllerBinding_HotbarTouchMenu_Button11: string;

  ControllerBinding_HotbarTouchMenu_Button12: string;

  ControllerBinding_HotbarTouchMenu_Button13: string;

  ControllerBinding_HotbarTouchMenu_Button14: string;

  ControllerBinding_HotbarTouchMenu_Button15: string;

  ControllerBinding_HotbarTouchMenu_Touch: string;

  ControllerBinding_InnerDeadzoneFlickStick: string;

  ControllerBinding_InnerDeadzoneFlickStick_Description: string;

  ControllerBinding_InvertFlickStickOutput: string;

  ControllerBinding_InvertFlickStickOutput_Description: string;

  ControllerBinding_InvertMouseRegionX: string;

  ControllerBinding_InvertMouseRegionX_Description: string;

  ControllerBinding_InvertMouseRegionY: string;

  ControllerBinding_InvertMouseRegionY_Description: string;

  ControllerBinding_InvertMouseY: string;

  ControllerBinding_InvertMouseY_Description: string;

  ControllerBinding_InvertMouseY_Off: string;

  ControllerBinding_InvertMouseY_Off_Description: string;

  ControllerBinding_InvertMouseY_On: string;

  ControllerBinding_InvertMouseY_On_Description: string;

  ControllerBinding_InvertMouseYMouseJoystick: string;

  ControllerBinding_InvertMouseYMouseJoystick_Description: string;

  ControllerBinding_InvertMouseYMouseJoystick_Off: string;

  ControllerBinding_InvertMouseYMouseJoystick_Off_Description: string;

  ControllerBinding_InvertMouseYMouseJoystick_On: string;

  ControllerBinding_InvertMouseYMouseJoystick_On_Description: string;

  ControllerBinding_InvertX_joystick_mouse: string;

  ControllerBinding_InvertX_joystick_mouse_Description: string;

  ControllerBinding_InvertX_joystick_mouse_Off: string;

  ControllerBinding_InvertX_joystick_mouse_Off_Description: string;

  ControllerBinding_InvertX_joystick_mouse_On: string;

  ControllerBinding_InvertX_joystick_mouse_On_Description: string;

  ControllerBinding_InvertX_joystick_move: string;

  ControllerBinding_InvertX_joystick_move_Description: string;

  ControllerBinding_InvertX_joystick_move_Off: string;

  ControllerBinding_InvertX_joystick_move_Off_Description: string;

  ControllerBinding_InvertX_joystick_move_On: string;

  ControllerBinding_InvertX_joystick_move_On_Description: string;

  ControllerBinding_InvertXJoystickCamera: string;

  ControllerBinding_InvertXJoystickCamera_Description: string;

  ControllerBinding_InvertXJoystickCamera_Off: string;

  ControllerBinding_InvertXJoystickCamera_Off_Description: string;

  ControllerBinding_InvertXJoystickCamera_On: string;

  ControllerBinding_InvertXJoystickCamera_On_Description: string;

  ControllerBinding_InvertXMouse: string;

  ControllerBinding_InvertXMouse_Description: string;

  ControllerBinding_InvertXMouse_Off: string;

  ControllerBinding_InvertXMouse_Off_Description: string;

  ControllerBinding_InvertXMouse_On: string;

  ControllerBinding_InvertXMouse_On_Description: string;

  ControllerBinding_InvertXMouseMouseJoystick: string;

  ControllerBinding_InvertXMouseMouseJoystick_Description: string;

  ControllerBinding_InvertXMouseMouseJoystick_Off: string;

  ControllerBinding_InvertXMouseMouseJoystick_Off_Description: string;

  ControllerBinding_InvertXMouseMouseJoystick_On: string;

  ControllerBinding_InvertXMouseMouseJoystick_On_Description: string;

  ControllerBinding_InvertY_joystick_mouse: string;

  ControllerBinding_InvertY_joystick_mouse_Description: string;

  ControllerBinding_InvertY_joystick_mouse_Off: string;

  ControllerBinding_InvertY_joystick_mouse_Off_Description: string;

  ControllerBinding_InvertY_joystick_mouse_On: string;

  ControllerBinding_InvertY_joystick_mouse_On_Description: string;

  ControllerBinding_InvertY_joystick_move: string;

  ControllerBinding_InvertY_joystick_move_Description: string;

  ControllerBinding_InvertY_joystick_move_Off: string;

  ControllerBinding_InvertY_joystick_move_Off_Description: string;

  ControllerBinding_InvertY_joystick_move_On: string;

  ControllerBinding_InvertY_joystick_move_On_Description: string;

  ControllerBinding_InvertYJoystickCamera: string;

  ControllerBinding_InvertYJoystickCamera_Description: string;

  ControllerBinding_InvertYJoystickCamera_Off: string;

  ControllerBinding_InvertYJoystickCamera_Off_Description: string;

  ControllerBinding_InvertYJoystickCamera_On: string;

  ControllerBinding_InvertYJoystickCamera_On_Description: string;

  ControllerBinding_JoystickCameraMouseSensitivity: string;

  ControllerBinding_JoystickCameraMouseSensitivity_Description: string;

  ControllerBinding_JoystickClickCameraMode: string;

  ControllerBinding_JoystickClickCameraMode_Description: string;

  ControllerBinding_JoystickMoveTouch: string;

  ControllerBinding_JoystickSmoothingCameraMode: string;

  ControllerBinding_JoystickSmoothingCameraMode_Description: string;

  ControllerBinding_JoystickSmoothingCameraMode_Off: string;

  ControllerBinding_JoystickSmoothingCameraMode_Off_Description: string;

  ControllerBinding_JoystickSmoothingCameraMode_On: string;

  ControllerBinding_JoystickSmoothingCameraMode_On_Description: string;

  ControllerBinding_JoystickToCameraAngles_AnglesToPixels: string;

  ControllerBinding_JoystickToCameraAngles_AnglesToPixels_Description: string;

  ControllerBinding_JoystickToCameraAngles_MaxDegreesPerSecond: string;

  ControllerBinding_JoystickToCameraAngles_MaxDegreesPerSecond_Description: string;

  ControllerBinding_Layer_Custom: string;

  ControllerBinding_LeanSensitivityAbsMouse: string;

  ControllerBinding_LeanSensitivityAbsMouse_Description: string;

  ControllerBinding_LeanSensitivityMouseJoystick: string;

  ControllerBinding_LeanSensitivityMouseJoystick_Description: string;

  ControllerBinding_LeftAnalogTrigger: string;

  ControllerBinding_LightSetting: string;

  ControllerBinding_LightSetting_CustomSetting: string;

  ControllerBinding_LightSetting_CustomSetting_Brightness: string;

  ControllerBinding_LightSetting_CustomSetting_Brightness_Desc: string;

  ControllerBinding_LightSetting_CustomSetting_Desc: string;

  ControllerBinding_LightSetting_Default: string;

  ControllerBinding_LightSetting_Default_Desc: string;

  ControllerBinding_LightSetting_Desc: string;

  ControllerBinding_LightSetting_XInput: string;

  ControllerBinding_LightSetting_XInput_Desc: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_Description: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_LeftJoystick: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_LeftJoystick_Description: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_LeftTrackpad: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_LeftTrackpad_Description: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_Off: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_Off_Description: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_RightJoystick: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_RightJoystick_Description: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_RightTrackpad: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_RightTrackpad_Description: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_Trackpad: string;

  ControllerBinding_LongPress_ActivateStickOrTrackpad_Trackpad_Description: string;

  ControllerBinding_LongPress_Binding: string;

  ControllerBinding_LongPress_Binding_Description: string;

  ControllerBinding_LongPress_CycleBindings: string;

  ControllerBinding_LongPress_CycleBindings_Description: string;

  ControllerBinding_LongPress_CycleBindings_Off: string;

  ControllerBinding_LongPress_CycleBindings_Off_Description: string;

  ControllerBinding_LongPress_CycleBindings_On: string;

  ControllerBinding_LongPress_CycleBindings_On_Description: string;

  ControllerBinding_LongPress_EndDelay: string;

  ControllerBinding_LongPress_EndDelay_Description: string;

  ControllerBinding_LongPress_HapticIntensity: string;

  ControllerBinding_LongPress_HapticIntensity_Description: string;

  ControllerBinding_LongPress_HapticIntensity_High: string;

  ControllerBinding_LongPress_HapticIntensity_High_Description: string;

  ControllerBinding_LongPress_HapticIntensity_Low: string;

  ControllerBinding_LongPress_HapticIntensity_Low_Description: string;

  ControllerBinding_LongPress_HapticIntensity_Medium: string;

  ControllerBinding_LongPress_HapticIntensity_Medium_Description: string;

  ControllerBinding_LongPress_HapticIntensity_Off: string;

  ControllerBinding_LongPress_HapticIntensity_Off_Description: string;

  ControllerBinding_LongPress_HoldRepeats: string;

  ControllerBinding_LongPress_HoldRepeats_Description: string;

  ControllerBinding_LongPress_HoldRepeats_Off: string;

  ControllerBinding_LongPress_HoldRepeats_Off_Description: string;

  ControllerBinding_LongPress_HoldRepeats_On: string;

  ControllerBinding_LongPress_HoldRepeats_On_Description: string;

  ControllerBinding_LongPress_LongPressTime: string;

  ControllerBinding_LongPress_LongPressTime_Description: string;

  ControllerBinding_LongPress_RepeatRate: string;

  ControllerBinding_LongPress_RepeatRate_Description: string;

  ControllerBinding_LongPress_StartDelay: string;

  ControllerBinding_LongPress_StartDelay_Description: string;

  ControllerBinding_LongPress_Toggle: string;

  ControllerBinding_LongPress_Toggle_Description: string;

  ControllerBinding_LongPress_Toggle_Off: string;

  ControllerBinding_LongPress_Toggle_Off_Description: string;

  ControllerBinding_LongPress_Toggle_On: string;

  ControllerBinding_LongPress_Toggle_On_Description: string;

  ControllerBinding_Missing_community: string;

  ControllerBinding_Missing_friends: string;

  ControllerBinding_Missing_personal: string;

  ControllerBinding_Missing_recommended: string;

  ControllerBinding_Missing_template: string;

  ControllerBinding_ModeDropDown_2DScroll: string;

  ControllerBinding_ModeDropDown_2DScroll_Description: string;

  ControllerBinding_ModeDropDown_2DScrollwheel: string;

  ControllerBinding_ModeDropDown_2DScrollwheel_Description: string;

  ControllerBinding_ModeDropDown_AbsoluteMouse: string;

  ControllerBinding_ModeDropDown_AbsoluteMouse_Description: string;

  ControllerBinding_ModeDropDown_ABXY: string;

  ControllerBinding_ModeDropDown_ABXY_Description: string;

  ControllerBinding_ModeDropDown_Camera: string;

  ControllerBinding_ModeDropDown_Camera_Description: string;

  ControllerBinding_ModeDropDown_Dpad: string;

  ControllerBinding_ModeDropDown_Dpad_Description: string;

  ControllerBinding_ModeDropDown_Hotbar: string;

  ControllerBinding_ModeDropDown_Hotbar_Description: string;

  ControllerBinding_ModeDropDown_Joystick_Mouse: string;

  ControllerBinding_ModeDropDown_Joystick_Mouse_Description: string;

  ControllerBinding_ModeDropDown_Mouse: string;

  ControllerBinding_ModeDropDown_Mouse_Description: string;

  ControllerBinding_ModeDropDown_MouseJoystick: string;

  ControllerBinding_ModeDropDown_MouseJoystick_Description: string;

  ControllerBinding_ModeDropDown_MouseRegion: string;

  ControllerBinding_ModeDropDown_MouseRegion_Description: string;

  ControllerBinding_ModeDropDown_Move: string;

  ControllerBinding_ModeDropDown_Move_Description: string;

  ControllerBinding_ModeDropDown_None: string;

  ControllerBinding_ModeDropDown_None_Description: string;

  ControllerBinding_ModeDropDown_RadialMenu: string;

  ControllerBinding_ModeDropDown_RadialMenu_Description: string;

  ControllerBinding_ModeDropDown_ScrollWheel: string;

  ControllerBinding_ModeDropDown_ScrollWheel_Description: string;

  ControllerBinding_ModeDropDown_SingleButton: string;

  ControllerBinding_ModeDropDown_SingleButton_Description: string;

  ControllerBinding_ModeDropDown_TouchMenu: string;

  ControllerBinding_ModeDropDown_TouchMenu_Description: string;

  ControllerBinding_ModeShift_Create: string;

  ControllerBinding_ModeShift_FriendlyName: string;

  ControllerBinding_ModeShift_SubHeader: string;

  ControllerBinding_ModeShiftButton: string;

  ControllerBinding_ModeShiftButton_Description: string;

  ControllerBinding_ModeShiftDropDown: string;

  ControllerBinding_ModeShiftDropDown_A: string;

  ControllerBinding_ModeShiftDropDown_A_Description: string;

  ControllerBinding_ModeShiftDropDown_B: string;

  ControllerBinding_ModeShiftDropDown_B_Description: string;

  ControllerBinding_ModeShiftDropDown_Description: string;

  ControllerBinding_ModeShiftDropDown_LeftBumper: string;

  ControllerBinding_ModeShiftDropDown_LeftBumper_Description: string;

  ControllerBinding_ModeShiftDropDown_LeftGrip: string;

  ControllerBinding_ModeShiftDropDown_LeftGrip_Description: string;

  ControllerBinding_ModeShiftDropDown_LeftJoystickClick: string;

  ControllerBinding_ModeShiftDropDown_LeftJoystickClick_Description: string;

  ControllerBinding_ModeShiftDropDown_LeftPadClick: string;

  ControllerBinding_ModeShiftDropDown_LeftPadClick_Description: string;

  ControllerBinding_ModeShiftDropDown_LeftTrigger: string;

  ControllerBinding_ModeShiftDropDown_LeftTrigger_Description: string;

  ControllerBinding_ModeShiftDropDown_LeftTriggerThreshold: string;

  ControllerBinding_ModeShiftDropDown_LeftTriggerThreshold_Description: string;

  ControllerBinding_ModeShiftDropDown_RightBumper: string;

  ControllerBinding_ModeShiftDropDown_RightBumper_Description: string;

  ControllerBinding_ModeShiftDropDown_RightGrip: string;

  ControllerBinding_ModeShiftDropDown_RightGrip_Description: string;

  ControllerBinding_ModeShiftDropDown_RightPadClick: string;

  ControllerBinding_ModeShiftDropDown_RightPadClick_Description: string;

  ControllerBinding_ModeShiftDropDown_RightTrigger: string;

  ControllerBinding_ModeShiftDropDown_RightTrigger_Description: string;

  ControllerBinding_ModeShiftDropDown_RightTriggerThreshold: string;

  ControllerBinding_ModeShiftDropDown_RightTriggerThreshold_Description: string;

  ControllerBinding_ModeShiftDropDown_Select: string;

  ControllerBinding_ModeShiftDropDown_Select_Description: string;

  ControllerBinding_ModeShiftDropDown_Start: string;

  ControllerBinding_ModeShiftDropDown_Start_Description: string;

  ControllerBinding_ModeShiftDropDown_X: string;

  ControllerBinding_ModeShiftDropDown_X_Description: string;

  ControllerBinding_ModeShiftDropDown_Y: string;

  ControllerBinding_ModeShiftDropDown_Y_Description: string;

  ControllerBinding_Momentum2DScroll: string;

  ControllerBinding_Momentum2DScroll_Description: string;

  ControllerBinding_Momentum2DScroll_Off: string;

  ControllerBinding_Momentum2DScroll_Off_Description: string;

  ControllerBinding_Momentum2DScroll_On: string;

  ControllerBinding_Momentum2DScroll_On_Description: string;

  ControllerBinding_MouseDelta: string;

  ControllerBinding_MouseDeltaModal_Desc: string;

  ControllerBinding_MouseDeltaModal_Title: string;

  ControllerBinding_MouseJoystickClick: string;

  ControllerBinding_MouseJoystickClick_Description: string;

  ControllerBinding_MouseJoystickGyroLeft: string;

  ControllerBinding_MouseJoystickGyroLeft_Description: string;

  ControllerBinding_MouseJoystickGyroRight: string;

  ControllerBinding_MouseJoystickGyroRight_Description: string;

  ControllerBinding_MouseJoystickLeanLeft: string;

  ControllerBinding_MouseJoystickLeanLeft_Description: string;

  ControllerBinding_MouseJoystickLeanRight: string;

  ControllerBinding_MouseJoystickLeanRight_Description: string;

  ControllerBinding_MouseMoveThreshold: string;

  ControllerBinding_MouseMoveThreshold_Description: string;

  ControllerBinding_MouseMoveThresholdMouseJoystick: string;

  ControllerBinding_MouseMoveThresholdMouseJoystick_Description: string;

  ControllerBinding_MousePosition: string;

  ControllerBinding_MousePositionModal_Desc: string;

  ControllerBinding_MousePositionModal_SelectMousePosition: string;

  ControllerBinding_MousePositionModal_SelectMousePosition_Hint: string;

  ControllerBinding_MousePositionModal_SelectMousePosition_StartButton: string;

  ControllerBinding_MousePositionModal_TeleportSetting: string;

  ControllerBinding_MousePositionModal_Title: string;

  ControllerBinding_MousePositionModal_XPosition: string;

  ControllerBinding_MousePositionModal_YPosition: string;

  ControllerBinding_MouseRegionClick: string;

  ControllerBinding_MouseRegionClick_Description: string;

  ControllerBinding_MouseRegionGyroButtonInvert: string;

  ControllerBinding_MouseRegionGyroButtonInvert_Description: string;

  ControllerBinding_MouseRegionGyroButtonInvert_Off: string;

  ControllerBinding_MouseRegionGyroButtonInvert_Off_Description: string;

  ControllerBinding_MouseRegionGyroButtonInvert_On: string;

  ControllerBinding_MouseRegionGyroButtonInvert_On_Description: string;

  ControllerBinding_MouseRegionGyroButtonInvert_Toggle: string;

  ControllerBinding_MouseRegionGyroButtonInvert_Toggle_Description: string;

  ControllerBinding_MouseRegionTouch: string;

  ControllerBinding_MouseRegionTouch_Description: string;

  ControllerBinding_MouseRegionTriggerClamp: string;

  ControllerBinding_MouseRegionTriggerClamp_Description: string;

  ControllerBinding_MouseRegionTriggerClamp_Off: string;

  ControllerBinding_MouseRegionTriggerClamp_Off_Description: string;

  ControllerBinding_MouseRegionTriggerClamp_On: string;

  ControllerBinding_MouseRegionTriggerClamp_On_Description: string;

  ControllerBinding_MouseRegionTriggerClamp_TriggerDampeningBothAlways: string;

  ControllerBinding_MouseRegionTriggerClamp_TriggerDampeningBothAlways_Description: string;

  ControllerBinding_MouseRegionTriggerClamp_TriggerDampeningBothSoft: string;

  ControllerBinding_MouseRegionTriggerClamp_TriggerDampeningBothSoft_Description: string;

  ControllerBinding_MouseRegionTriggerClamp_TriggerDampeningLeftAlways: string;

  ControllerBinding_MouseRegionTriggerClamp_TriggerDampeningLeftAlways_Description: string;

  ControllerBinding_MouseRegionTriggerClamp_TriggerDampeningLeftSoft: string;

  ControllerBinding_MouseRegionTriggerClamp_TriggerDampeningLeftSoft_Description: string;

  ControllerBinding_MouseRegionTriggerClamp_TriggerDampeningRightAlways: string;

  ControllerBinding_MouseRegionTriggerClamp_TriggerDampeningRightAlways_Description: string;

  ControllerBinding_MouseRegionTriggerClamp_TriggerDampeningRightSoft: string;

  ControllerBinding_MouseRegionTriggerClamp_TriggerDampeningRightSoft_Description: string;

  ControllerBinding_MouseRegionTriggerClampAmount: string;

  ControllerBinding_MouseRegionTriggerClampAmount_Description: string;

  ControllerBinding_MouseSensitivity_joystick_mouse: string;

  ControllerBinding_MouseSensitivity_joystick_mouse_Description: string;

  ControllerBinding_MouseSensitivity_joystick_move: string;

  ControllerBinding_MouseSensitivity_joystick_move_Description: string;

  ControllerBinding_MouseSensitivity_joystick_moveGA: string;

  ControllerBinding_MouseTriggerClamp: string;

  ControllerBinding_MouseTriggerClamp_Description: string;

  ControllerBinding_MouseTriggerClamp_Off: string;

  ControllerBinding_MouseTriggerClamp_Off_Description: string;

  ControllerBinding_MouseTriggerClamp_TriggerDampeningBothAlways: string;

  ControllerBinding_MouseTriggerClamp_TriggerDampeningBothAlways_Description: string;

  ControllerBinding_MouseTriggerClamp_TriggerDampeningBothSoft: string;

  ControllerBinding_MouseTriggerClamp_TriggerDampeningBothSoft_Description: string;

  ControllerBinding_MouseTriggerClamp_TriggerDampeningLeftAlways: string;

  ControllerBinding_MouseTriggerClamp_TriggerDampeningLeftAlways_Description: string;

  ControllerBinding_MouseTriggerClamp_TriggerDampeningLeftSoft: string;

  ControllerBinding_MouseTriggerClamp_TriggerDampeningLeftSoft_Description: string;

  ControllerBinding_MouseTriggerClamp_TriggerDampeningRightAlways: string;

  ControllerBinding_MouseTriggerClamp_TriggerDampeningRightAlways_Description: string;

  ControllerBinding_MouseTriggerClamp_TriggerDampeningRightSoft: string;

  ControllerBinding_MouseTriggerClamp_TriggerDampeningRightSoft_Description: string;

  ControllerBinding_MouseTriggerClampAmount: string;

  ControllerBinding_MouseTriggerClampAmount_Description: string;

  ControllerBinding_MouseTriggerClampAmountMouseJoystick: string;

  ControllerBinding_MouseTriggerClampAmountMouseJoystick_Description: string;

  ControllerBinding_MouseTriggerClampMouseJoystick: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_Description: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_Off: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_Off_Description: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_On: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_On_Description: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_TriggerDampeningBothAlways: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_TriggerDampeningBothAlways_Description: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_TriggerDampeningBothSoft: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_TriggerDampeningBothSoft_Description: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_TriggerDampeningLeftAlways: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_TriggerDampeningLeftAlways_Description: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_TriggerDampeningLeftSoft: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_TriggerDampeningLeftSoft_Description: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_TriggerDampeningRightAlways: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_TriggerDampeningRightAlways_Description: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_TriggerDampeningRightSoft: string;

  ControllerBinding_MouseTriggerClampMouseJoystick_TriggerDampeningRightSoft_Description: string;

  ControllerBinding_NonMigrated_config: string;

  ControllerBinding_Official: string;

  ControllerBinding_OfficialDescription: string;

  ControllerBinding_Offline_Save: string;

  ControllerBinding_OuterDeadzoneFlickStick: string;

  ControllerBinding_OuterDeadzoneFlickStick_Description: string;

  ControllerBinding_OutputAxis_joystick_mouse: string;

  ControllerBinding_OutputAxis_joystick_mouse_AxisBoth: string;

  ControllerBinding_OutputAxis_joystick_mouse_AxisBoth_Description: string;

  ControllerBinding_OutputAxis_joystick_mouse_AxisX: string;

  ControllerBinding_OutputAxis_joystick_mouse_AxisX_Description: string;

  ControllerBinding_OutputAxis_joystick_mouse_AxisY: string;

  ControllerBinding_OutputAxis_joystick_mouse_AxisY_Description: string;

  ControllerBinding_OutputAxis_joystick_mouse_Description: string;

  ControllerBinding_OutputAxis_joystick_move: string;

  ControllerBinding_OutputAxis_joystick_move_AxisBoth: string;

  ControllerBinding_OutputAxis_joystick_move_AxisBoth_Description: string;

  ControllerBinding_OutputAxis_joystick_move_AxisX: string;

  ControllerBinding_OutputAxis_joystick_move_AxisX_Description: string;

  ControllerBinding_OutputAxis_joystick_move_AxisY: string;

  ControllerBinding_OutputAxis_joystick_move_AxisY_Description: string;

  ControllerBinding_OutputAxis_joystick_move_Description: string;

  ControllerBinding_OutputAxisFlickStick: string;

  ControllerBinding_OutputAxisFlickStick_Description: string;

  ControllerBinding_OutputJoystick_joystick_mouse: string;

  ControllerBinding_OutputJoystick_joystick_mouse_AbsoluteMouse: string;

  ControllerBinding_OutputJoystick_joystick_mouse_AbsoluteMouse_Description: string;

  ControllerBinding_OutputJoystick_joystick_mouse_Description: string;

  ControllerBinding_OutputJoystick_joystick_mouse_LeftJoystick: string;

  ControllerBinding_OutputJoystick_joystick_mouse_LeftJoystick_Description: string;

  ControllerBinding_OutputJoystick_joystick_mouse_RelativeMouse: string;

  ControllerBinding_OutputJoystick_joystick_mouse_RelativeMouse_Description: string;

  ControllerBinding_OutputJoystick_joystick_mouse_RightJoystick: string;

  ControllerBinding_OutputJoystick_joystick_mouse_RightJoystick_Description: string;

  ControllerBinding_OutputJoystick_joystick_move: string;

  ControllerBinding_OutputJoystick_joystick_move_AbsoluteMouse: string;

  ControllerBinding_OutputJoystick_joystick_move_AbsoluteMouse_Description: string;

  ControllerBinding_OutputJoystick_joystick_move_Description: string;

  ControllerBinding_OutputJoystick_joystick_move_LeftJoystick: string;

  ControllerBinding_OutputJoystick_joystick_move_LeftJoystick_Description: string;

  ControllerBinding_OutputJoystick_joystick_move_RelativeMouse: string;

  ControllerBinding_OutputJoystick_joystick_move_RelativeMouse_Description: string;

  ControllerBinding_OutputJoystick_joystick_move_RightJoystick: string;

  ControllerBinding_OutputJoystick_joystick_move_RightJoystick_Description: string;

  ControllerBinding_OutputJoystickCameraMode: string;

  ControllerBinding_OutputJoystickCameraMode_AbsoluteMouse: string;

  ControllerBinding_OutputJoystickCameraMode_AbsoluteMouse_Description: string;

  ControllerBinding_OutputJoystickCameraMode_Description: string;

  ControllerBinding_OutputJoystickCameraMode_LeftJoystick: string;

  ControllerBinding_OutputJoystickCameraMode_LeftJoystick_Description: string;

  ControllerBinding_OutputJoystickCameraMode_RelativeMouse: string;

  ControllerBinding_OutputJoystickCameraMode_RelativeMouse_Description: string;

  ControllerBinding_OutputJoystickCameraMode_RightJoystick: string;

  ControllerBinding_OutputJoystickCameraMode_RightJoystick_Description: string;

  ControllerBinding_OutputJoystickMouseJoystick: string;

  ControllerBinding_OutputJoystickMouseJoystick_Description: string;

  ControllerBinding_OutputJoystickMouseJoystick_LeftJoystick: string;

  ControllerBinding_OutputJoystickMouseJoystick_RightJoystick: string;

  ControllerBinding_OutputTrigger: string;

  ControllerBinding_OutputTrigger_Description: string;

  ControllerBinding_OutputTrigger_TriggerLeft: string;

  ControllerBinding_OutputTrigger_TriggerLeft_Description: string;

  ControllerBinding_OutputTrigger_TriggerOff: string;

  ControllerBinding_OutputTrigger_TriggerOff_Description: string;

  ControllerBinding_OutputTrigger_TriggerRight: string;

  ControllerBinding_OutputTrigger_TriggerRight_Description: string;

  ControllerBinding_OverlapRegion: string;

  ControllerBinding_OverlapRegion_Description: string;

  ControllerBinding_PositionXMouse: string;

  ControllerBinding_PositionXMouse_Description: string;

  ControllerBinding_PositionYMouse: string;

  ControllerBinding_PositionYMouse_Description: string;

  ControllerBinding_PresetDropDown_Default: string;

  ControllerBinding_PresetDropDown_Next: string;

  ControllerBinding_PresetDropDown_None: string;

  ControllerBinding_PresetDropDown_Prev: string;

  ControllerBinding_PrivateUploadSuccess: string;

  ControllerBinding_PrivateUploadSuccess_Description: string;

  ControllerBinding_RadialClick: string;

  ControllerBinding_RadialClick_Description: string;

  ControllerBinding_RadialMenuButton0: string;

  ControllerBinding_RadialMenuButton0_Description: string;

  ControllerBinding_RadialMenuButton1: string;

  ControllerBinding_RadialMenuButton1_Description: string;

  ControllerBinding_RadialMenuButton2: string;

  ControllerBinding_RadialMenuButton2_Description: string;

  ControllerBinding_RadialMenuButton3: string;

  ControllerBinding_RadialMenuButton3_Description: string;

  ControllerBinding_RadialMenuButton4: string;

  ControllerBinding_RadialMenuButton4_Description: string;

  ControllerBinding_RadialMenuButton5: string;

  ControllerBinding_RadialMenuButton5_Description: string;

  ControllerBinding_RadialMenuButton6: string;

  ControllerBinding_RadialMenuButton6_Description: string;

  ControllerBinding_RadialMenuButton7: string;

  ControllerBinding_RadialMenuButton7_Description: string;

  ControllerBinding_RadialMenuButton8: string;

  ControllerBinding_RadialMenuButton8_Description: string;

  ControllerBinding_RadialMenuButton9: string;

  ControllerBinding_RadialMenuButton9_Description: string;

  ControllerBinding_RadialMenuButton10: string;

  ControllerBinding_RadialMenuButton10_Description: string;

  ControllerBinding_RadialMenuButton11: string;

  ControllerBinding_RadialMenuButton11_Description: string;

  ControllerBinding_RadialMenuButton12: string;

  ControllerBinding_RadialMenuButton12_Description: string;

  ControllerBinding_RadialMenuButton13: string;

  ControllerBinding_RadialMenuButton13_Description: string;

  ControllerBinding_RadialMenuButton14: string;

  ControllerBinding_RadialMenuButton14_Description: string;

  ControllerBinding_RadialMenuButton15: string;

  ControllerBinding_RadialMenuButton15_Description: string;

  ControllerBinding_RadialMenuButton16: string;

  ControllerBinding_RadialMenuButton16_Description: string;

  ControllerBinding_RadialMenuButton17: string;

  ControllerBinding_RadialMenuButton17_Description: string;

  ControllerBinding_RadialMenuButton18: string;

  ControllerBinding_RadialMenuButton18_Description: string;

  ControllerBinding_RadialMenuButton19: string;

  ControllerBinding_RadialMenuButton19_Description: string;

  ControllerBinding_RadialMenuButton20: string;

  ControllerBinding_RadialMenuButton20_Description: string;

  ControllerBinding_RadialMenuButtonType: string;

  ControllerBinding_RadialMenuButtonType_ButtonClick: string;

  ControllerBinding_RadialMenuButtonType_ButtonClick_Description: string;

  ControllerBinding_RadialMenuButtonType_ButtonRelease: string;

  ControllerBinding_RadialMenuButtonType_ButtonRelease_Description: string;

  ControllerBinding_RadialMenuButtonType_Description: string;

  ControllerBinding_RadialMenuButtonType_TouchAlways: string;

  ControllerBinding_RadialMenuButtonType_TouchAlways_Description: string;

  ControllerBinding_RadialMenuButtonType_TouchMenu_ButtonClick_Description: string;

  ControllerBinding_RadialMenuButtonType_TouchMenu_ButtonRelease_Description: string;

  ControllerBinding_RadialMenuButtonType_TouchMenu_TouchAlways_Description: string;

  ControllerBinding_RadialMenuButtonType_TouchMenu_TouchRelease_Description: string;

  ControllerBinding_RadialMenuButtonType_TouchRelease: string;

  ControllerBinding_RadialMenuButtonType_TouchRelease_Description: string;

  ControllerBinding_RadialMenuClick: string;

  ControllerBinding_RadialMenuOpacity: string;

  ControllerBinding_RadialMenuOpacity_Description: string;

  ControllerBinding_RadialMenuPosX: string;

  ControllerBinding_RadialMenuPosX_Description: string;

  ControllerBinding_RadialMenuPosY: string;

  ControllerBinding_RadialMenuPosY_Description: string;

  ControllerBinding_RadialMenuScale: string;

  ControllerBinding_RadialMenuScale_Description: string;

  ControllerBinding_RadialMenuShowLabels_Off: string;

  ControllerBinding_RadialMenuShowLabels_Off_Description: string;

  ControllerBinding_RadialMenuShowLabels_On: string;

  ControllerBinding_RadialMenuShowLabels_On_Description: string;

  ControllerBinding_RadialMenuTouch: string;

  ControllerBinding_RecommendedTemplate: string;

  ControllerBinding_Release_Binding: string;

  ControllerBinding_Release_Binding_Description: string;

  ControllerBinding_Release_CycleBindings: string;

  ControllerBinding_Release_CycleBindings_Description: string;

  ControllerBinding_Release_CycleBindings_Off: string;

  ControllerBinding_Release_CycleBindings_Off_Description: string;

  ControllerBinding_Release_CycleBindings_On: string;

  ControllerBinding_Release_CycleBindings_On_Description: string;

  ControllerBinding_Release_EndDelay: string;

  ControllerBinding_Release_EndDelay_Description: string;

  ControllerBinding_Release_HapticIntensity: string;

  ControllerBinding_Release_HapticIntensity_Description: string;

  ControllerBinding_Release_HapticIntensity_High: string;

  ControllerBinding_Release_HapticIntensity_High_Description: string;

  ControllerBinding_Release_HapticIntensity_Low: string;

  ControllerBinding_Release_HapticIntensity_Low_Description: string;

  ControllerBinding_Release_HapticIntensity_Medium: string;

  ControllerBinding_Release_HapticIntensity_Medium_Description: string;

  ControllerBinding_Release_HapticIntensity_Off: string;

  ControllerBinding_Release_HapticIntensity_Off_Description: string;

  ControllerBinding_Release_Interruptable: string;

  ControllerBinding_Release_Interruptable_Description: string;

  ControllerBinding_Release_Interruptable_Off: string;

  ControllerBinding_Release_Interruptable_Off_Description: string;

  ControllerBinding_Release_Interruptable_On: string;

  ControllerBinding_Release_Interruptable_On_Description: string;

  ControllerBinding_Release_StartDelay: string;

  ControllerBinding_Release_StartDelay_Description: string;

  ControllerBinding_Release_Toggle: string;

  ControllerBinding_Release_Toggle_Description: string;

  ControllerBinding_Release_Toggle_Off: string;

  ControllerBinding_Release_Toggle_Off_Description: string;

  ControllerBinding_Release_Toggle_On: string;

  ControllerBinding_Release_Toggle_On_Description: string;

  ControllerBinding_ReleaseDampeningFlickStick: string;

  ControllerBinding_ReleaseDampeningFlickStick_Description: string;

  ControllerBinding_RequiresClick: string;

  ControllerBinding_RequiresClick_Description: string;

  ControllerBinding_RequiresClick_Off: string;

  ControllerBinding_RequiresClick_Off_Description: string;

  ControllerBinding_RequiresClick_On: string;

  ControllerBinding_RequiresClick_On_Description: string;

  ControllerBinding_RequiresClickFourButtons: string;

  ControllerBinding_RequiresClickFourButtons_Description: string;

  ControllerBinding_RequiresClickFourButtons_Off: string;

  ControllerBinding_RequiresClickFourButtons_Off_Description: string;

  ControllerBinding_RequiresClickFourButtons_On: string;

  ControllerBinding_RequiresClickFourButtons_On_Description: string;

  ControllerBinding_RequiresClickFourButtonsGA: string;

  ControllerBinding_RequiresClickFourButtonsGA_Description: string;

  ControllerBinding_RequiresClickFourButtonsGA_Off: string;

  ControllerBinding_RequiresClickFourButtonsGA_Off_Description: string;

  ControllerBinding_RequiresClickFourButtonsGA_On: string;

  ControllerBinding_RequiresClickFourButtonsGA_On_Description: string;

  ControllerBinding_RightAnalogTrigger: string;

  ControllerBinding_Rotation2DScroll: string;

  ControllerBinding_Rotation2DScroll_Description: string;

  ControllerBinding_Rotation_joystick_mouse: string;

  ControllerBinding_Rotation_joystick_mouse_Description: string;

  ControllerBinding_Rotation_joystick_move: string;

  ControllerBinding_Rotation_joystick_move_Description: string;

  ControllerBinding_RotationAbsMouse: string;

  ControllerBinding_RotationAbsMouse_Description: string;

  ControllerBinding_RotationFlickStick: string;

  ControllerBinding_RotationFlickStick_Description: string;

  ControllerBinding_RotationGyroOutput: string;

  ControllerBinding_RotationGyroOutput_Description: string;

  ControllerBinding_RotationMouseJoystick: string;

  ControllerBinding_RotationMouseJoystick_Description: string;

  ControllerBinding_RotationMouseRegion: string;

  ControllerBinding_RotationMouseRegion_Description: string;

  ControllerBinding_SavedCopyPasta: string;

  ControllerBinding_SavedCopyPasta_Title: string;

  ControllerBinding_ScaleMouseRegion: string;

  ControllerBinding_ScaleMouseRegion_Description: string;

  ControllerBinding_ScrollWheelClick: string;

  ControllerBinding_ScrollWheelClick_Description: string;

  ControllerBinding_ScrollWheelClockwise: string;

  ControllerBinding_ScrollWheelClockwise_Description: string;

  ControllerBinding_ScrollWheelCounterClockwise: string;

  ControllerBinding_ScrollWheelCounterClockwise_Description: string;

  ControllerBinding_ScrollWheelFriction: string;

  ControllerBinding_ScrollWheelFriction_Description: string;

  ControllerBinding_ScrollWheelFriction_High: string;

  ControllerBinding_ScrollWheelFriction_High_Description: string;

  ControllerBinding_ScrollWheelFriction_Low: string;

  ControllerBinding_ScrollWheelFriction_Low_Description: string;

  ControllerBinding_ScrollWheelFriction_Medium: string;

  ControllerBinding_ScrollWheelFriction_Medium_Description: string;

  ControllerBinding_ScrollWheelFriction_None: string;

  ControllerBinding_ScrollWheelFriction_None_Description: string;

  ControllerBinding_ScrollWheelFriction_Off: string;

  ControllerBinding_ScrollWheelFriction_Off_Description: string;

  ControllerBinding_ScrollWheelInvert: string;

  ControllerBinding_ScrollWheelInvert_Description: string;

  ControllerBinding_ScrollWheelInvert_Off: string;

  ControllerBinding_ScrollWheelInvert_Off_Description: string;

  ControllerBinding_ScrollWheelInvert_On: string;

  ControllerBinding_ScrollWheelInvert_On_Description: string;

  ControllerBinding_ScrollWheelList0: string;

  ControllerBinding_ScrollWheelList0_Description: string;

  ControllerBinding_ScrollWheelList1: string;

  ControllerBinding_ScrollWheelList1_Description: string;

  ControllerBinding_ScrollWheelList2: string;

  ControllerBinding_ScrollWheelList2_Description: string;

  ControllerBinding_ScrollWheelList3: string;

  ControllerBinding_ScrollWheelList3_Description: string;

  ControllerBinding_ScrollWheelList4: string;

  ControllerBinding_ScrollWheelList4_Description: string;

  ControllerBinding_ScrollWheelList5: string;

  ControllerBinding_ScrollWheelList5_Description: string;

  ControllerBinding_ScrollWheelList6: string;

  ControllerBinding_ScrollWheelList6_Description: string;

  ControllerBinding_ScrollWheelList7: string;

  ControllerBinding_ScrollWheelList7_Description: string;

  ControllerBinding_ScrollWheelList8: string;

  ControllerBinding_ScrollWheelList8_Description: string;

  ControllerBinding_ScrollWheelList9: string;

  ControllerBinding_ScrollWheelList9_Description: string;

  ControllerBinding_ScrollWheelListWrap: string;

  ControllerBinding_ScrollWheelListWrap_Description: string;

  ControllerBinding_ScrollWheelListWrap_Off: string;

  ControllerBinding_ScrollWheelListWrap_Off_Description: string;

  ControllerBinding_ScrollWheelListWrap_On: string;

  ControllerBinding_ScrollWheelListWrap_On_Description: string;

  ControllerBinding_ScrollWheelTouch: string;

  ControllerBinding_ScrollWheelTouch_Description: string;

  ControllerBinding_ScrollWheelType: string;

  ControllerBinding_ScrollWheelType_Circle: string;

  ControllerBinding_ScrollWheelType_Circle_Description: string;

  ControllerBinding_ScrollWheelType_Description: string;

  ControllerBinding_ScrollWheelType_Horizontal: string;

  ControllerBinding_ScrollWheelType_Horizontal_Description: string;

  ControllerBinding_ScrollWheelType_Scroll_Wheel_Type_Circle_Description: string;

  ControllerBinding_ScrollWheelType_Vertical: string;

  ControllerBinding_ScrollWheelType_Vertical_Description: string;

  ControllerBinding_Sensitivity: string;

  ControllerBinding_Sensitivity2DScroll: string;

  ControllerBinding_Sensitivity2DScroll_Description: string;

  ControllerBinding_Sensitivity_Description: string;

  ControllerBinding_SensitivityFlickStick: string;

  ControllerBinding_SensitivityFlickStick_Description: string;

  ControllerBinding_SensitivityMouseJoystick: string;

  ControllerBinding_SensitivityMouseJoystick_Description: string;

  ControllerBinding_SensitivityScrollWheel: string;

  ControllerBinding_SensitivityScrollWheel_Description: string;

  ControllerBinding_SensitivitySweepFlickStick: string;

  ControllerBinding_SensitivitySweepFlickStick_Description: string;

  ControllerBinding_SensitivityTouchMenu: string;

  ControllerBinding_SensitivityTouchMenu_Description: string;

  ControllerBinding_SetLED_Brightness: string;

  ControllerBinding_SetLED_Color: string;

  ControllerBinding_ShowAdvancedDeadzoneOptions: string;

  ControllerBinding_SingleButtonClick: string;

  ControllerBinding_SingleButtonClick_Description: string;

  ControllerBinding_SingleButtonTouch: string;

  ControllerBinding_SingleButtonTouch_Description: string;

  ControllerBinding_Smoothing2DScroll: string;

  ControllerBinding_SmoothingAbsMouse: string;

  ControllerBinding_SmoothingAbsMouse_Description: string;

  ControllerBinding_SmoothingFlickStick: string;

  ControllerBinding_SmoothingFlickStick_Description: string;

  ControllerBinding_SmoothingMouseJoystick: string;

  ControllerBinding_SmoothingMouseJoystick_Description: string;

  ControllerBinding_SnapModeFlickStick: string;

  ControllerBinding_SnapModeFlickStick_Description: string;

  ControllerBinding_SnapSmoothingFlickStick: string;

  ControllerBinding_SnapSmoothingFlickStick_Description: string;

  ControllerBinding_SoftPress_CycleBindings: string;

  ControllerBinding_SoftPress_CycleBindings_Description: string;

  ControllerBinding_SoftPress_CycleBindings_Off: string;

  ControllerBinding_SoftPress_CycleBindings_Off_Description: string;

  ControllerBinding_SoftPress_CycleBindings_On: string;

  ControllerBinding_SoftPress_CycleBindings_On_Description: string;

  ControllerBinding_SoftPress_EndDelay: string;

  ControllerBinding_SoftPress_EndDelay_Description: string;

  ControllerBinding_SoftPress_HapticIntensity: string;

  ControllerBinding_SoftPress_HapticIntensity_Description: string;

  ControllerBinding_SoftPress_HapticIntensity_High: string;

  ControllerBinding_SoftPress_HapticIntensity_High_Description: string;

  ControllerBinding_SoftPress_HapticIntensity_Low: string;

  ControllerBinding_SoftPress_HapticIntensity_Low_Description: string;

  ControllerBinding_SoftPress_HapticIntensity_Medium: string;

  ControllerBinding_SoftPress_HapticIntensity_Medium_Description: string;

  ControllerBinding_SoftPress_HapticIntensity_Off: string;

  ControllerBinding_SoftPress_HapticIntensity_Off_Description: string;

  ControllerBinding_SoftPress_HoldRepeats: string;

  ControllerBinding_SoftPress_HoldRepeats_Description: string;

  ControllerBinding_SoftPress_HoldRepeats_Off: string;

  ControllerBinding_SoftPress_HoldRepeats_Off_Description: string;

  ControllerBinding_SoftPress_HoldRepeats_On: string;

  ControllerBinding_SoftPress_HoldRepeats_On_Description: string;

  ControllerBinding_SoftPress_Interruptable: string;

  ControllerBinding_SoftPress_Interruptable_Description: string;

  ControllerBinding_SoftPress_Interruptable_Off: string;

  ControllerBinding_SoftPress_Interruptable_Off_Description: string;

  ControllerBinding_SoftPress_Interruptable_On: string;

  ControllerBinding_SoftPress_Interruptable_On_Description: string;

  ControllerBinding_SoftPress_Invert: string;

  ControllerBinding_SoftPress_Invert_Description: string;

  ControllerBinding_SoftPress_RepeatRate: string;

  ControllerBinding_SoftPress_RepeatRate_Description: string;

  ControllerBinding_SoftPress_SoftPressStyle: string;

  ControllerBinding_SoftPress_SoftPressStyle_HairTrigger: string;

  ControllerBinding_SoftPress_SoftPressStyle_HairTrigger_Description: string;

  ControllerBinding_SoftPress_SoftPressStyle_LongPressExclusive: string;

  ControllerBinding_SoftPress_SoftPressStyle_LongPressExclusive_Description: string;

  ControllerBinding_SoftPress_SoftPressStyle_LongPressLong: string;

  ControllerBinding_SoftPress_SoftPressStyle_LongPressLong_Description: string;

  ControllerBinding_SoftPress_SoftPressStyle_LongPressMedium: string;

  ControllerBinding_SoftPress_SoftPressStyle_LongPressMedium_Description: string;

  ControllerBinding_SoftPress_SoftPressStyle_LongPressShort: string;

  ControllerBinding_SoftPress_SoftPressStyle_LongPressShort_Description: string;

  ControllerBinding_SoftPress_SoftPressStyle_Simple: string;

  ControllerBinding_SoftPress_SoftPressStyle_Simple_Description: string;

  ControllerBinding_SoftPress_StartDelay: string;

  ControllerBinding_SoftPress_StartDelay_Description: string;

  ControllerBinding_SoftPress_Threshold: string;

  ControllerBinding_SoftPress_Threshold_Description: string;

  ControllerBinding_SoftPress_Toggle: string;

  ControllerBinding_SoftPress_Toggle_Description: string;

  ControllerBinding_SoftPress_Toggle_Off: string;

  ControllerBinding_SoftPress_Toggle_Off_Description: string;

  ControllerBinding_SoftPress_Toggle_On: string;

  ControllerBinding_SoftPress_Toggle_On_Description: string;

  ControllerBinding_StandardABXY: string;

  ControllerBinding_StandardDpad: string;

  ControllerBinding_StandardJoystick: string;

  ControllerBinding_StandardTrigger: string;

  ControllerBinding_StartPress_Binding: string;

  ControllerBinding_StartPress_Binding_Description: string;

  ControllerBinding_StartPress_CycleBindings: string;

  ControllerBinding_StartPress_CycleBindings_Description: string;

  ControllerBinding_StartPress_CycleBindings_Off: string;

  ControllerBinding_StartPress_CycleBindings_Off_Description: string;

  ControllerBinding_StartPress_CycleBindings_On: string;

  ControllerBinding_StartPress_CycleBindings_On_Description: string;

  ControllerBinding_StartPress_EndDelay: string;

  ControllerBinding_StartPress_EndDelay_Description: string;

  ControllerBinding_StartPress_HapticIntensity: string;

  ControllerBinding_StartPress_HapticIntensity_Description: string;

  ControllerBinding_StartPress_HapticIntensity_High: string;

  ControllerBinding_StartPress_HapticIntensity_High_Description: string;

  ControllerBinding_StartPress_HapticIntensity_Low: string;

  ControllerBinding_StartPress_HapticIntensity_Low_Description: string;

  ControllerBinding_StartPress_HapticIntensity_Medium: string;

  ControllerBinding_StartPress_HapticIntensity_Medium_Description: string;

  ControllerBinding_StartPress_HapticIntensity_Off: string;

  ControllerBinding_StartPress_HapticIntensity_Off_Description: string;

  ControllerBinding_StartPress_StartDelay: string;

  ControllerBinding_StartPress_StartDelay_Description: string;

  ControllerBinding_StartPress_Toggle: string;

  ControllerBinding_StartPress_Toggle_Description: string;

  ControllerBinding_StartPress_Toggle_Off: string;

  ControllerBinding_StartPress_Toggle_Off_Description: string;

  ControllerBinding_StartPress_Toggle_On: string;

  ControllerBinding_StartPress_Toggle_On_Description: string;

  ControllerBinding_SweepSmoothingFlickStick: string;

  ControllerBinding_SweepSmoothingFlickStick_Description: string;

  ControllerBinding_SwipeDurationCameraMode: string;

  ControllerBinding_SwipeDurationCameraMode_Description: string;

  ControllerBinding_SwipeDurationCameraMode_High: string;

  ControllerBinding_SwipeDurationCameraMode_High_Description: string;

  ControllerBinding_SwipeDurationCameraMode_Low: string;

  ControllerBinding_SwipeDurationCameraMode_Low_Description: string;

  ControllerBinding_SwipeDurationCameraMode_Medium: string;

  ControllerBinding_SwipeDurationCameraMode_Medium_Description: string;

  ControllerBinding_SwipeDurationCameraMode_Off: string;

  ControllerBinding_SwipeDurationCameraMode_Off_Description: string;

  ControllerBinding_SwitchesActionSetAlwaysOn: string;

  ControllerBinding_SwitchesCapture: string;

  ControllerBinding_SwitchesClick: string;

  ControllerBinding_SwitchesEdge: string;

  ControllerBinding_SwitchesLeftGrip: string;

  ControllerBinding_SwitchesRightGrip: string;

  ControllerBinding_SwitchesUpperLeftGrip: string;

  ControllerBinding_SwitchesUpperRightGrip: string;

  ControllerBinding_TeleportStart: string;

  ControllerBinding_TeleportStart_Description: string;

  ControllerBinding_TeleportStart_Off: string;

  ControllerBinding_TeleportStart_Off_Description: string;

  ControllerBinding_TeleportStart_On: string;

  ControllerBinding_TeleportStart_On_Description: string;

  ControllerBinding_TeleportStop: string;

  ControllerBinding_TeleportStop_Description: string;

  ControllerBinding_TeleportStop_Off: string;

  ControllerBinding_TeleportStop_Off_Description: string;

  ControllerBinding_TeleportStop_On: string;

  ControllerBinding_TeleportStop_On_Description: string;

  ControllerBinding_TouchMenu_Touch: string;

  ControllerBinding_TouchMenuButton0: string;

  ControllerBinding_TouchMenuButton0_Description: string;

  ControllerBinding_TouchMenuButton1: string;

  ControllerBinding_TouchMenuButton1_Description: string;

  ControllerBinding_TouchMenuButton2: string;

  ControllerBinding_TouchMenuButton2_Description: string;

  ControllerBinding_TouchMenuButton3: string;

  ControllerBinding_TouchMenuButton3_Description: string;

  ControllerBinding_TouchMenuButton4: string;

  ControllerBinding_TouchMenuButton4_Description: string;

  ControllerBinding_TouchMenuButton5: string;

  ControllerBinding_TouchMenuButton5_Description: string;

  ControllerBinding_TouchMenuButton6: string;

  ControllerBinding_TouchMenuButton6_Description: string;

  ControllerBinding_TouchMenuButton7: string;

  ControllerBinding_TouchMenuButton7_Description: string;

  ControllerBinding_TouchMenuButton8: string;

  ControllerBinding_TouchMenuButton8_Description: string;

  ControllerBinding_TouchMenuButton9: string;

  ControllerBinding_TouchMenuButton9_Description: string;

  ControllerBinding_TouchMenuButton10: string;

  ControllerBinding_TouchMenuButton10_Description: string;

  ControllerBinding_TouchMenuButton11: string;

  ControllerBinding_TouchMenuButton11_Description: string;

  ControllerBinding_TouchMenuButton12: string;

  ControllerBinding_TouchMenuButton12_Description: string;

  ControllerBinding_TouchMenuButton13: string;

  ControllerBinding_TouchMenuButton13_Description: string;

  ControllerBinding_TouchMenuButton14: string;

  ControllerBinding_TouchMenuButton14_Description: string;

  ControllerBinding_TouchMenuButton15: string;

  ControllerBinding_TouchMenuButton15_Description: string;

  ControllerBinding_TouchMenuButtonCount: string;

  ControllerBinding_TouchMenuButtonCount_Button2: string;

  ControllerBinding_TouchMenuButtonCount_Button2_Description: string;

  ControllerBinding_TouchMenuButtonCount_Button4: string;

  ControllerBinding_TouchMenuButtonCount_Button4_Description: string;

  ControllerBinding_TouchMenuButtonCount_Button5: string;

  ControllerBinding_TouchMenuButtonCount_Button5_Description: string;

  ControllerBinding_TouchMenuButtonCount_Button7: string;

  ControllerBinding_TouchMenuButtonCount_Button7_Description: string;

  ControllerBinding_TouchMenuButtonCount_Button9: string;

  ControllerBinding_TouchMenuButtonCount_Button9_Description: string;

  ControllerBinding_TouchMenuButtonCount_Button12: string;

  ControllerBinding_TouchMenuButtonCount_Button12_Description: string;

  ControllerBinding_TouchMenuButtonCount_Button13: string;

  ControllerBinding_TouchMenuButtonCount_Button13_Description: string;

  ControllerBinding_TouchMenuButtonCount_Button16: string;

  ControllerBinding_TouchMenuButtonCount_Button16_Description: string;

  ControllerBinding_TouchMenuButtonCount_Description: string;

  ControllerBinding_TouchMenuButtonType: string;

  ControllerBinding_TouchMenuButtonType_ButtonClick: string;

  ControllerBinding_TouchMenuButtonType_ButtonRelease: string;

  ControllerBinding_TouchMenuButtonType_Description: string;

  ControllerBinding_TouchMenuButtonType_TouchAlways: string;

  ControllerBinding_TouchMenuButtonType_TouchMenu_ButtonClick_Description: string;

  ControllerBinding_TouchMenuButtonType_TouchMenu_ButtonRelease_Description: string;

  ControllerBinding_TouchMenuButtonType_TouchMenu_TouchAlways_Description: string;

  ControllerBinding_TouchMenuButtonType_TouchMenu_TouchRelease_Description: string;

  ControllerBinding_TouchMenuButtonType_TouchRelease: string;

  ControllerBinding_TouchMenuClick: string;

  ControllerBinding_TouchMenuDeadzoneInner: string;

  ControllerBinding_TouchMenuDeadzoneOuter: string;

  ControllerBinding_TouchMenuDoubleTap: string;

  ControllerBinding_TouchMenuOpacity: string;

  ControllerBinding_TouchMenuOpacity_Description: string;

  ControllerBinding_TouchMenuPosX: string;

  ControllerBinding_TouchMenuPosX_Description: string;

  ControllerBinding_TouchMenuPosY: string;

  ControllerBinding_TouchMenuPosY_Description: string;

  ControllerBinding_TouchMenuScale: string;

  ControllerBinding_TouchMenuScale_Description: string;

  ControllerBinding_TouchMenuShowLabels: string;

  ControllerBinding_TouchMenuShowLabels_Description: string;

  ControllerBinding_TouchMenuTouch: string;

  ControllerBinding_Trackball: string;

  ControllerBinding_Trackball_Description: string;

  ControllerBinding_Trackball_Off: string;

  ControllerBinding_Trackball_Off_Description: string;

  ControllerBinding_Trackball_On: string;

  ControllerBinding_Trackball_On_Description: string;

  ControllerBinding_TrackballMouseJoystick: string;

  ControllerBinding_TrackballMouseJoystick_Description: string;

  ControllerBinding_TrackballMouseJoystick_Off: string;

  ControllerBinding_TrackballMouseJoystick_Off_Description: string;

  ControllerBinding_TrackballMouseJoystick_On: string;

  ControllerBinding_TrackballMouseJoystick_On_Description: string;

  ControllerBinding_TrackPadToCameraAngles_AnglesPerTrackPadSwipe: string;

  ControllerBinding_TrackPadToCameraAngles_AnglesPerTrackPadSwipe_Description: string;

  ControllerBinding_TrackPadToCameraAngles_AnglesToPixels: string;

  ControllerBinding_TrackPadToCameraAngles_AnglesToPixels_Description: string;

  ControllerBinding_TriggerAnalogThresholdBinding: string;

  ControllerBinding_TriggerAnalogThresholdBinding_Description: string;

  ControllerBinding_TriggerClick: string;

  ControllerBinding_TriggerClick_Description: string;

  ControllerBinding_TriggerCurveExponent: string;

  ControllerBinding_TriggerCurveExponent_1: string;

  ControllerBinding_TriggerCurveExponent_1_Description: string;

  ControllerBinding_TriggerCurveExponent_2: string;

  ControllerBinding_TriggerCurveExponent_2_Description: string;

  ControllerBinding_TriggerCurveExponent_3: string;

  ControllerBinding_TriggerCurveExponent_3_Description: string;

  ControllerBinding_TriggerCurveExponent_4: string;

  ControllerBinding_TriggerCurveExponent_4_Description: string;

  ControllerBinding_TriggerCurveExponent_Custom: string;

  ControllerBinding_TriggerCurveExponent_Custom_Description: string;

  ControllerBinding_TriggerCurveExponent_Description: string;

  ControllerBinding_TriggerCurveExponent_Linear: string;

  ControllerBinding_TriggerCurveExponent_Linear_Description: string;

  ControllerBinding_TriggerCustomCurveExponent: string;

  ControllerBinding_TriggerCustomCurveExponent_Description: string;

  ControllerBinding_TriggerDeadZoneEnd: string;

  ControllerBinding_TriggerDeadZoneEnd_Description: string;

  ControllerBinding_TriggerDeadZoneStart: string;

  ControllerBinding_TriggerDeadZoneStart_Description: string;

  ControllerBinding_TriggerThreshold: string;

  ControllerBinding_TriggerThreshold_Description: string;

  ControllerBinding_VerticalFriction: string;

  ControllerBinding_VerticalFriction_Description: string;

  ControllerBinding_VerticalFrictionMouseJoystick: string;

  ControllerBinding_VerticalFrictionMouseJoystick_Description: string;

  ControllerBinding_VerticalSensitivity: string;

  ControllerBinding_VerticalSensitivity_Description: string;

  ControllerBinding_VerticalSensitivity_joystick_mouse: string;

  ControllerBinding_VerticalSensitivity_joystick_mouse_Description: string;

  ControllerBinding_VerticalSensitivity_joystick_move: string;

  ControllerBinding_VerticalSensitivity_joystick_move_Description: string;

  ControllerBinding_VerticalSensitivityJoystickCamera: string;

  ControllerBinding_VerticalSensitivityJoystickCamera_Description: string;

  ControllerBinding_VerticalSensitivityMouseJoystick: string;

  ControllerBinding_VerticalSensitivityMouseJoystick_Description: string;

  ControllerBinding_VerticalSensitivityMouseRegion: string;

  ControllerBinding_VerticalSensitivityMouseRegion_Description: string;

  ControllerBinding_XButton: string;

  ControllerBinding_XButton_Description: string;

  ControllerBinding_XButtonGA: string;

  ControllerBinding_XButtonGA_Description: string;

  ControllerBinding_YButton: string;

  ControllerBinding_YButton_Description: string;

  ControllerBinding_YButtonGA: string;

  ControllerBinding_YButtonGA_Description: string;

  ControllerChord_GuideButtonShortcuts: string;

  ControllerCloudConflict_Description: string;

  ControllerCloudConflict_Header: string;

  ControllerConfigurationQuickSettings_EnableBackButtons: string;

  ControllerConfigurationQuickSettings_EnableGrips: string;

  ControllerConfigurationQuickSettings_FlickStickSweepSensitivity: string;

  ControllerConfigurationQuickSettings_FlickStickSweepSensitivity_Left: string;

  ControllerConfigurationQuickSettings_GyroInvert: string;

  ControllerConfigurationQuickSettings_GyroNaturalSensitivity: string;

  ControllerConfigurationQuickSettings_GyroSensitivity: string;

  ControllerConfigurationQuickSettings_NoQuickSettings_ForActionSet: string;

  ControllerConfigurationQuickSettings_NoQuickSettings_ForLayer: string;

  ControllerConfigurationQuickSettings_PixelsPerRevolution: string;

  ControllerConfigurationQuickSettings_RPadInvert: string;

  ControllerConfigurationQuickSettings_RPadSensitivity: string;

  ControllerConfigurationQuickSettings_RStickInvert: string;

  ControllerConfigurationQuickSettings_RStickSensitivity: string;

  ControllerConfigurationQuickSettings_SectionTitle: string;

  ControllerConfigurationQuickSettings_SectionTitle_MultipleActionSets: string;

  ControllerConfigurator_ActionButtonLabel_ApplyLayout: string;

  ControllerConfigurator_ActionButtonLabel_ChangeOrder: string;

  ControllerConfigurator_ActionButtonLabel_Preview: string;

  ControllerConfigurator_ActionButtonLabel_ResetToDefault: string;

  ControllerConfigurator_ActionButtonLabel_Settings: string;

  ControllerConfigurator_ActionSet: string;

  ControllerConfigurator_ActionSets_AddBaseSetButton_CopyFrom: string;

  ControllerConfigurator_ActionSets_AddBaseSetButton_Title: string;

  ControllerConfigurator_ActionSets_AddBaseSetDialog_Description: string;

  ControllerConfigurator_ActionSets_AddBaseSetDialog_InitialText: string;

  ControllerConfigurator_ActionSets_AddBaseSetDialog_Title: string;

  ControllerConfigurator_ActionSets_AddLayerSetDialog_Description_1: string;

  ControllerConfigurator_ActionSets_AddLayerSetDialog_InitialText_1: string;

  ControllerConfigurator_ActionSets_AddLayerSetDialog_Title_1: string;

  ControllerConfigurator_ActionSets_BaseSetContextMenu_AddAlwaysOnCommandMenuItem_Title: string;

  ControllerConfigurator_ActionSets_BaseSetContextMenu_AddLayerSetMenuItem_Title: string;

  ControllerConfigurator_ActionSets_BaseSetContextMenu_RemoveMenuItem_Title: string;

  ControllerConfigurator_ActionSets_BaseSetContextMenu_RenameMenuItem_Title: string;

  ControllerConfigurator_ActionSets_BaseSetContextMenu_Title_1: string;

  ControllerConfigurator_ActionSets_DuplicateVirtualMenuDialog_Title_1: string;

  ControllerConfigurator_ActionSets_Global_CursorHidden: string;

  ControllerConfigurator_ActionSets_Global_CursorShown: string;

  ControllerConfigurator_ActionSets_LayerSetContextMenu_RemoveMenuItem_Title: string;

  ControllerConfigurator_ActionSets_LayerSetContextMenu_RenameMenuItem_Title: string;

  ControllerConfigurator_ActionSets_LayerSetContextMenu_Title_1: string;

  ControllerConfigurator_ActionSets_RemoveLayerDialog_Description_1: string;

  ControllerConfigurator_ActionSets_RemoveLayerDialog_Title_1: string;

  ControllerConfigurator_ActionSets_RemoveSetDialog_Description_1: string;

  ControllerConfigurator_ActionSets_RemoveSetDialog_Title_1: string;

  ControllerConfigurator_ActionSets_RenameBaseSetDialog_Description_1: string;

  ControllerConfigurator_ActionSets_RenameBaseSetDialog_InitialText_1: string;

  ControllerConfigurator_ActionSets_RenameBaseSetDialog_Title_1: string;

  ControllerConfigurator_ActionSets_RenameLayerSetDialog_Description_1: string;

  ControllerConfigurator_ActionSets_RenameLayerSetDialog_InitialText_1: string;

  ControllerConfigurator_ActionSets_RenameLayerSetDialog_Title_1: string;

  ControllerConfigurator_ActionSets_RenameVirtualMenuDialog_Description_1: string;

  ControllerConfigurator_ActionSets_RenameVirtualMenuDialog_Title_1: string;

  ControllerConfigurator_ActionSets_SetOptions_Desc: string;

  ControllerConfigurator_ActionSets_SetOptions_Title: string;

  ControllerConfigurator_ActionSets_UnnamedSet_Title: string;

  ControllerConfigurator_Activator_Command_Cycles_Desc: string;

  ControllerConfigurator_Activator_Command_Desc: string;

  ControllerConfigurator_Activator_ContextMenu_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_Activaton_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_ActivatorSettings_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_AddActivator_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_AddCommand_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_AddExtraBinding_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_RemoveActivator_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_RemoveAllActivators_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_RemoveCommand_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_RemoveExtraBinding_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_Rename_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_RenameGrouped_Activators_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_ResetActivator_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_ResetToEmpty_Title: string;

  ControllerConfigurator_Activator_ContextMenuItem_ResetToParentSet_Title: string;

  ControllerConfigurator_Activator_PickIcon: string;

  ControllerConfigurator_Activator_SubCommand_Desc: string;

  ControllerConfigurator_Activators_Desc: string;

  ControllerConfigurator_ChooseBinding_ActionSet: string;

  ControllerConfigurator_ChooseBinding_CameraAngleAction: string;

  ControllerConfigurator_ChooseBinding_CameraAngleAction_Desc: string;

  ControllerConfigurator_ChooseBinding_ControllerAction: string;

  ControllerConfigurator_ChooseBinding_GameActions: string;

  ControllerConfigurator_ChooseBinding_Gamepad: string;

  ControllerConfigurator_ChooseBinding_Gamepad_Unsupported: string;

  ControllerConfigurator_ChooseBinding_Keyboard: string;

  ControllerConfigurator_ChooseBinding_Listener: string;

  ControllerConfigurator_ChooseBinding_Mouse: string;

  ControllerConfigurator_ChooseBinding_Numpad: string;

  ControllerConfigurator_ChooseBinding_Prompt: string;

  ControllerConfigurator_ChooseBinding_Prompt_ActionSet: string;

  ControllerConfigurator_ChooseBinding_Prompt_CameraAngleAction: string;

  ControllerConfigurator_ChooseBinding_Prompt_GameAction: string;

  ControllerConfigurator_ChooseBinding_Prompt_Gamepad: string;

  ControllerConfigurator_ChooseBinding_Prompt_Keyboard: string;

  ControllerConfigurator_ChooseBinding_Prompt_Mouse: string;

  ControllerConfigurator_ChooseBinding_Prompt_System: string;

  ControllerConfigurator_ChooseConfiguration_Community: string;

  ControllerConfigurator_ChooseConfiguration_Delete: string;

  ControllerConfigurator_ChooseConfiguration_DownVote: string;

  ControllerConfigurator_ChooseConfiguration_EmptyDescription: string;

  ControllerConfigurator_ChooseConfiguration_Official: string;

  ControllerConfigurator_ChooseConfiguration_Official_Description: string;

  ControllerConfigurator_ChooseConfiguration_Recommended: string;

  ControllerConfigurator_ChooseConfiguration_Recommended_Description: string;

  ControllerConfigurator_ChooseConfiguration_RecommendedSection: string;

  ControllerConfigurator_ChooseConfiguration_Search: string;

  ControllerConfigurator_ChooseConfiguration_SearchResults: string;

  ControllerConfigurator_ChooseConfiguration_ShowAllConfigs: string;

  ControllerConfigurator_ChooseConfiguration_ShowCompatibleConfigs: string;

  ControllerConfigurator_ChooseConfiguration_Template: string;

  ControllerConfigurator_ChooseConfiguration_Template_Description: string;

  ControllerConfigurator_ChooseConfiguration_Title: string;

  ControllerConfigurator_ChooseConfiguration_UpVote: string;

  ControllerConfigurator_ChooseConfiguration_User: string;

  ControllerConfigurator_ChooseConfiguration_UserTemplate: string;

  ControllerConfigurator_ChooseConfiguration_UserTemplate_Description: string;

  ControllerConfigurator_ConfigInfo_ActionBlockSource: string;

  ControllerConfigurator_ConfigInfo_ActionBlockSource_None: string;

  ControllerConfigurator_ConfigInfo_ErrorMsgs: string;

  ControllerConfigurator_ConfigInfo_Title: string;

  ControllerConfigurator_CreateVirtualMenuDialog_Description_1: string;

  ControllerConfigurator_CreateVirtualMenuDialog_Title_1: string;

  ControllerConfigurator_EControllerPresetType_NextSet: string;

  ControllerConfigurator_EControllerPresetType_None: string;

  ControllerConfigurator_EControllerPresetType_PreviousSet: string;

  ControllerConfigurator_ErrorMsg_Title: string;

  ControllerConfigurator_Header_Title: string;

  ControllerConfigurator_Header_TitleWithApp: string;

  ControllerConfigurator_IconCategory_Actions: string;

  ControllerConfigurator_IconCategory_Ammo: string;

  ControllerConfigurator_IconCategory_AppIcons: string;

  ControllerConfigurator_IconCategory_Input: string;

  ControllerConfigurator_IconCategory_Inventory: string;

  ControllerConfigurator_IconCategory_Magic: string;

  ControllerConfigurator_IconCategory_Media: string;

  ControllerConfigurator_IconCategory_Menu: string;

  ControllerConfigurator_IconCategory_Movement: string;

  ControllerConfigurator_IconCategory_Other: string;

  ControllerConfigurator_IconCategory_Social: string;

  ControllerConfigurator_IconCategory_Targets: string;

  ControllerConfigurator_IconCategory_User: string;

  ControllerConfigurator_IconCategory_Utility: string;

  ControllerConfigurator_IconCategory_Vehicle: string;

  ControllerConfigurator_IconCategory_Weapons: string;

  ControllerConfigurator_IconPicker_BackgroundColor: string;

  ControllerConfigurator_IconPicker_ForegroundColor: string;

  ControllerConfigurator_IconPicker_Next: string;

  ControllerConfigurator_IconPicker_PickColor_Title: string;

  ControllerConfigurator_IconPicker_RemoveIcon: string;

  ControllerConfigurator_IconPicker_ResetToSystemTheme: string;

  ControllerConfigurator_IconPicker_Title: string;

  ControllerConfigurator_Input_Settings: string;

  ControllerConfigurator_Interstitial_AppHasSmallText_DescA1: string;

  ControllerConfigurator_Interstitial_AppHasSmallText_DescA1NonDeck: string;

  ControllerConfigurator_Interstitial_AppHasSmallText_DescA2: string;

  ControllerConfigurator_Interstitial_AppHasSmallText_DescA3: string;

  ControllerConfigurator_Interstitial_AppHasSmallText_Title: string;

  ControllerConfigurator_Interstitial_AppLauncherInteractionIssues_DescA1: string;

  ControllerConfigurator_Interstitial_AppLauncherInteractionIssues_DescA1_NonDeck: string;

  ControllerConfigurator_Interstitial_AppLauncherInteractionIssues_DescA2: string;

  ControllerConfigurator_Interstitial_AppLauncherInteractionIssues_DescA3: string;

  ControllerConfigurator_Interstitial_AppLauncherInteractionIssues_DescA4: string;

  ControllerConfigurator_Interstitial_AppLauncherInteractionIssues_DescA5: string;

  ControllerConfigurator_Interstitial_AppLauncherInteractionIssues_Title: string;

  ControllerConfigurator_Interstitial_AppRequiresOSK_DescA1: string;

  ControllerConfigurator_Interstitial_AppRequiresOSK_DescA2: string;

  ControllerConfigurator_Interstitial_AppRequiresOSK_Title: string;

  ControllerConfigurator_Interstitial_BackGripControls: string;

  ControllerConfigurator_Interstitial_Command1: string;

  ControllerConfigurator_Interstitial_Command2: string;

  ControllerConfigurator_Interstitial_Command3: string;

  ControllerConfigurator_Interstitial_Commands: string;

  ControllerConfigurator_Interstitial_ControllerConfiguration: string;

  ControllerConfigurator_Interstitial_ControllerRecommended_Desc: string;

  ControllerConfigurator_Interstitial_ControllerRecommended_Title: string;

  ControllerConfigurator_Interstitial_ControllerRequired_DescA1: string;

  ControllerConfigurator_Interstitial_ControllerRequired_DescA2: string;

  ControllerConfigurator_Interstitial_ControllerRequired_DescA2_NoController: string;

  ControllerConfigurator_Interstitial_ControllerRequired_Title: string;

  ControllerConfigurator_Interstitial_DontShowAgain: string;

  ControllerConfigurator_Interstitial_ExternalControllersAndSIAPI_DescA1: string;

  ControllerConfigurator_Interstitial_ExternalControllersAndSIAPI_DescA2: string;

  ControllerConfigurator_Interstitial_Gyro_DescA1: string;

  ControllerConfigurator_Interstitial_Gyro_DescA1_NonDeck: string;

  ControllerConfigurator_Interstitial_Gyro_DescA2: string;

  ControllerConfigurator_Interstitial_Gyro_DescA2_NonDeck: string;

  ControllerConfigurator_Interstitial_Gyro_DescA2_SteamController: string;

  ControllerConfigurator_Interstitial_Gyro_Title: string;

  ControllerConfigurator_Interstitial_GyroControls: string;

  ControllerConfigurator_Interstitial_HDRRequiresUserAction_Directions1: string;

  ControllerConfigurator_Interstitial_HDRRequriesUserAction_Directions2: string;

  ControllerConfigurator_Interstitial_Intro_DescA1: string;

  ControllerConfigurator_Interstitial_Intro_DescA1_NonDeck: string;

  ControllerConfigurator_Interstitial_Intro_DescA2: string;

  ControllerConfigurator_Interstitial_Intro_DescB1: string;

  ControllerConfigurator_Interstitial_Intro_DescB2: string;

  ControllerConfigurator_Interstitial_Intro_DescC1: string;

  ControllerConfigurator_Interstitial_Intro_DescC2: string;

  ControllerConfigurator_Interstitial_Intro_DescC2_NonDeck: string;

  ControllerConfigurator_Interstitial_Intro_Title: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_Demo1_Action: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_Demo1_Label: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_Demo2_Action: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_Demo2_Label: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_Demo3_Action: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_Demo3_Label: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_DescA1: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_DescA2: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_DescB1: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_DescB2: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_DescC1: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_DescC2: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_DescD1: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_DescD2: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_Layers_Activator1: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_Layers_Activator2: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_Layers_Command1: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_Layers_Command2: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_Layers_Label1: string;

  ControllerConfigurator_Interstitial_IntroToActionSets_Layers_Label2: string;

  ControllerConfigurator_Interstitial_IntroToSteamInputGames_Command1: string;

  ControllerConfigurator_Interstitial_IntroToSteamInputGames_Command2: string;

  ControllerConfigurator_Interstitial_IntroToSteamInputGames_DescA1: string;

  ControllerConfigurator_Interstitial_IntroToSteamInputGames_DescB1: string;

  ControllerConfigurator_Interstitial_IntroToSteamInputGames_DescB2: string;

  ControllerConfigurator_Interstitial_IntroToSteamInputGames_Label1: string;

  ControllerConfigurator_Interstitial_IntroToSteamInputGames_Label2: string;

  ControllerConfigurator_Interstitial_IntroToVRTheater_Directions: string;

  ControllerConfigurator_Interstitial_IntroToVRTheater_ListItem1: string;

  ControllerConfigurator_Interstitial_IntroToVRTheater_ListItem2: string;

  ControllerConfigurator_Interstitial_IntroToVRTheater_ListItem3: string;

  ControllerConfigurator_Interstitial_NextPage: string;

  ControllerConfigurator_Interstitial_NonVerified_CaptionB1: string;

  ControllerConfigurator_Interstitial_NonVerified_CaptionB2: string;

  ControllerConfigurator_Interstitial_NonVerified_CaptionB3: string;

  ControllerConfigurator_Interstitial_NonVerified_Command1: string;

  ControllerConfigurator_Interstitial_NonVerified_Command2: string;

  ControllerConfigurator_Interstitial_NonVerified_Config_Creator: string;

  ControllerConfigurator_Interstitial_NonVerified_Config_Description: string;

  ControllerConfigurator_Interstitial_NonVerified_Config_Title: string;

  ControllerConfigurator_Interstitial_NonVerified_DescA1: string;

  ControllerConfigurator_Interstitial_NonVerified_DescA2: string;

  ControllerConfigurator_Interstitial_NonVerified_DescB1: string;

  ControllerConfigurator_Interstitial_NonVerified_DescB2: string;

  ControllerConfigurator_Interstitial_NonVerified_DescB2_NonDeck: string;

  ControllerConfigurator_Interstitial_NonVerified_DescB3: string;

  ControllerConfigurator_Interstitial_NonVerified_DescB3_NonDeck: string;

  ControllerConfigurator_Interstitial_NonVerified_DescC1: string;

  ControllerConfigurator_Interstitial_NonVerified_DescC2: string;

  ControllerConfigurator_Interstitial_NonVerified_DescC3: string;

  ControllerConfigurator_Interstitial_NonVerified_Title: string;

  ControllerConfigurator_Interstitial_PhysicalInputs: string;

  ControllerConfigurator_Interstitial_PlugInPS4: string;

  ControllerConfigurator_Interstitial_PlugInPS5: string;

  ControllerConfigurator_Interstitial_PrevPage: string;

  ControllerConfigurator_Interstitial_RemotePlayConfirm_DescA1: string;

  ControllerConfigurator_Interstitial_RemotePlayConfirm_DescA2: string;

  ControllerConfigurator_Interstitial_RemotePlayConfirm_Title: string;

  ControllerConfigurator_Interstitial_SteamInputOptInPS4: string;

  ControllerConfigurator_Interstitial_SteamInputOptInPS4_GameSupported: string;

  ControllerConfigurator_Interstitial_SteamInputOptInPS4_GameSupportedUSB: string;

  ControllerConfigurator_Interstitial_SteamInputOptInPS5: string;

  ControllerConfigurator_Interstitial_SteamInputOptInPS5_GameSupported: string;

  ControllerConfigurator_Interstitial_SteamInputOptInPS5_GameSupportedUSB: string;

  ControllerConfigurator_Interstitial_Toggle: string;

  ControllerConfigurator_Interstitial_VROnly: string;

  ControllerConfigurator_Layer: string;

  ControllerConfigurator_Listen: string;

  ControllerConfigurator_Main_ContextMenu_Title: string;

  ControllerConfigurator_Options: string;

  ControllerConfigurator_Section_ActionSets: string;

  ControllerConfigurator_Section_Buttons: string;

  ControllerConfigurator_Section_DPad: string;

  ControllerConfigurator_Section_ExternalControllersAndSIAPI: string;

  ControllerConfigurator_Section_Gyros: string;

  ControllerConfigurator_Section_HDRRequiresUserAction: string;

  ControllerConfigurator_Section_IntroToActionSets: string;

  ControllerConfigurator_Section_IntroToSteamInputGames: string;

  ControllerConfigurator_Section_IntroToVRTheater: string;

  ControllerConfigurator_Section_Mapping: string;

  ControllerConfigurator_Section_PlugInController: string;

  ControllerConfigurator_Section_SteamInputOptIn: string;

  ControllerConfigurator_Section_Sticks: string;

  ControllerConfigurator_Section_Touchpads: string;

  ControllerConfigurator_Section_Triggers: string;

  ControllerConfigurator_Section_VirtualMenus: string;

  ControllerConfigurator_Section_VROnly: string;

  ControllerConfigurator_Setting_Section_ActionSetActivation: string;

  ControllerConfigurator_Setting_Section_AnalogTrigger: string;

  ControllerConfigurator_Setting_Section_AngleCalibration: string;

  ControllerConfigurator_Setting_Section_Commands: string;

  ControllerConfigurator_Setting_Section_Deadzone: string;

  ControllerConfigurator_Setting_Section_Display: string;

  ControllerConfigurator_Setting_Section_EdgeBinding: string;

  ControllerConfigurator_Setting_Section_FlickStickSensitivity: string;

  ControllerConfigurator_Setting_Section_General: string;

  ControllerConfigurator_Setting_Section_Gyro: string;

  ControllerConfigurator_Setting_Section_GyroEnableButton: string;

  ControllerConfigurator_Setting_Section_GyroSensitivity: string;

  ControllerConfigurator_Setting_Section_Haptic: string;

  ControllerConfigurator_Setting_Section_JoystickOutput: string;

  ControllerConfigurator_Setting_Section_Momentum: string;

  ControllerConfigurator_Setting_Section_MouseOutput: string;

  ControllerConfigurator_Setting_Section_Orientation: string;

  ControllerConfigurator_Setting_Section_Output: string;

  ControllerConfigurator_Setting_Section_Sensitivity: string;

  ControllerConfigurator_Setting_Section_Smoothing: string;

  ControllerConfigurator_Setting_Section_Snapping: string;

  ControllerConfigurator_Setting_Section_Trackpad: string;

  ControllerConfigurator_Setting_Section_TriggerDampening: string;

  ControllerConfigurator_Source_ABXY_Title: string;

  ControllerConfigurator_Source_AdditionalCommands_Subheader_Title: string;

  ControllerConfigurator_Source_Aux_Subheader_Title: string;

  ControllerConfigurator_Source_Bumpers_Subheader_Title: string;

  ControllerConfigurator_Source_CapJoystickLeft: string;

  ControllerConfigurator_Source_CapJoystickRight: string;

  ControllerConfigurator_Source_CenterTrackpad_Title: string;

  ControllerConfigurator_Source_DPad_Title: string;

  ControllerConfigurator_Source_Grips_Subheader_Title: string;

  ControllerConfigurator_Source_Gyro_Title: string;

  ControllerConfigurator_Source_Joystick_Title: string;

  ControllerConfigurator_Source_Key_Title: string;

  ControllerConfigurator_Source_LeftBumper_Title: string;

  ControllerConfigurator_Source_LeftGyro_Title: string;

  ControllerConfigurator_Source_LeftTrackpad_Title: string;

  ControllerConfigurator_Source_LeftTrigger_Title: string;

  ControllerConfigurator_Source_Menu_Subheader_Title: string;

  ControllerConfigurator_Source_Mouse_Title: string;

  ControllerConfigurator_Source_None_Title: string;

  ControllerConfigurator_Source_RightBumper_Title: string;

  ControllerConfigurator_Source_RightJoystick_Title: string;

  ControllerConfigurator_Source_RightTrackpad_Title: string;

  ControllerConfigurator_Source_RightTrigger_Title: string;

  ControllerConfigurator_Source_Switches_Title: string;

  ControllerConfigurator_SourceMode_2DScrollwheel_Title: string;

  ControllerConfigurator_SourceMode_AbsoluteMouse_Explanation_on_Gyro: string;

  ControllerConfigurator_SourceMode_AbsoluteMouse_Explanation_on_RightTrackpad: string;

  ControllerConfigurator_SourceMode_AbsoluteMouse_Title: string;

  ControllerConfigurator_SourceMode_Buttons_Title: string;

  ControllerConfigurator_SourceMode_Disabled_Title: string;

  ControllerConfigurator_SourceMode_Dpad_Title: string;

  ControllerConfigurator_SourceMode_FlickStick_Action_Title_1: string;

  ControllerConfigurator_SourceMode_FlickStick_Title: string;

  ControllerConfigurator_SourceMode_FlickStickToCameraAngles_Title: string;

  ControllerConfigurator_SourceMode_FourButtons_Title: string;

  ControllerConfigurator_SourceMode_Group_Behavior: string;

  ControllerConfigurator_SourceMode_Group_ConvertToEditable: string;

  ControllerConfigurator_SourceMode_Group_RevertToInherited: string;

  ControllerConfigurator_SourceMode_Group_Settings: string;

  ControllerConfigurator_SourceMode_Gyro_To_JoystickCamera_Title: string;

  ControllerConfigurator_SourceMode_Gyro_To_JoystickDeflection_Title: string;

  ControllerConfigurator_SourceMode_Gyro_To_Mouse_Title: string;

  ControllerConfigurator_SourceMode_GyroToCameraAngles_Title: string;

  ControllerConfigurator_SourceMode_GyroToMouse_Action_Title_1: string;

  ControllerConfigurator_SourceMode_Hotbar_Explanation: string;

  ControllerConfigurator_SourceMode_Hotbar_Summary_Title: string;

  ControllerConfigurator_SourceMode_Hotbar_Title: string;

  ControllerConfigurator_SourceMode_JoystickCamera_Title: string;

  ControllerConfigurator_SourceMode_JoystickMouse_Title: string;

  ControllerConfigurator_SourceMode_JoystickMove_Title: string;

  ControllerConfigurator_SourceMode_JoystickToCameraAngles_Title: string;

  ControllerConfigurator_SourceMode_Layer_Title: string;

  ControllerConfigurator_SourceMode_LayerInherit_Title: string;

  ControllerConfigurator_SourceMode_MouseJoystick_Action_Title_1: string;

  ControllerConfigurator_SourceMode_MouseJoystick_Explanation_on_Gyro: string;

  ControllerConfigurator_SourceMode_MouseJoystick_Explanation_on_RightTrackpad: string;

  ControllerConfigurator_SourceMode_MouseJoystick_Title: string;

  ControllerConfigurator_SourceMode_MouseRegion_Title: string;

  ControllerConfigurator_SourceMode_None_Title: string;

  ControllerConfigurator_SourceMode_OtherAction_Title: string;

  ControllerConfigurator_SourceMode_RadialMenu_Explanation: string;

  ControllerConfigurator_SourceMode_RadialMenu_Summary_Title: string;

  ControllerConfigurator_SourceMode_RadialMenu_Title: string;

  ControllerConfigurator_SourceMode_RelativeMouse_Title: string;

  ControllerConfigurator_SourceMode_ScrollWheel_Title: string;

  ControllerConfigurator_SourceMode_SingleButton_Title: string;

  ControllerConfigurator_SourceMode_Swap_Left_With_Right: string;

  ControllerConfigurator_SourceMode_Switches_CaptureButton: string;

  ControllerConfigurator_SourceMode_Switches_Macro0: string;

  ControllerConfigurator_SourceMode_Switches_Macro1: string;

  ControllerConfigurator_SourceMode_Switches_Macro1Finger: string;

  ControllerConfigurator_SourceMode_Switches_Macro2: string;

  ControllerConfigurator_SourceMode_Switches_Macro2Finger: string;

  ControllerConfigurator_SourceMode_Switches_Macro3: string;

  ControllerConfigurator_SourceMode_Switches_Macro4: string;

  ControllerConfigurator_SourceMode_Switches_Macro5: string;

  ControllerConfigurator_SourceMode_Switches_Macro6: string;

  ControllerConfigurator_SourceMode_Switches_Macro7: string;

  ControllerConfigurator_SourceMode_Switches_Title: string;

  ControllerConfigurator_SourceMode_TouchMenu_Explanation: string;

  ControllerConfigurator_SourceMode_TouchMenu_Summary_Title: string;

  ControllerConfigurator_SourceMode_TouchMenu_Title: string;

  ControllerConfigurator_SourceMode_TrackPadToCameraAngles_Title: string;

  ControllerConfigurator_SourceMode_Trigger_Title: string;

  ControllerConfigurator_SourceMode_UnnamedVirtualMenu_Title: string;

  ControllerConfigurator_VirtualMenu_AddBindingSlot: string;

  ControllerConfigurator_VirtualMenu_Confirm_Delete: string;

  ControllerConfigurator_VirtualMenu_Confirm_Delete_Desc: string;

  ControllerConfigurator_VirtualMenu_ContextMenu_Delete: string;

  ControllerConfigurator_VirtualMenu_ContextMenu_Duplicate: string;

  ControllerConfigurator_VirtualMenu_ContextMenu_Rename: string;

  ControllerConfigurator_VirtualMenu_ContextMenu_Title: string;

  ControllerConfigurator_VirtualMenu_CreateNew: string;

  ControllerConfigurator_VirtualMenu_Edit: string;

  ControllerConfigurator_VirtualMenu_MenuType: string;

  ControllerConfigurator_VirtualMenu_ReorderSlots: string;

  ControllerMode_ReorderInputs_Reorder: string;

  ControllerMode_ReorderInputs_StopReorder: string;

  ControllerMode_ReorderInputs_Title: string;

  ControllerSetting_GyroButtonOn: string;

  ControllerSettings_PSSupport: string;

  ControllerSettings_PSSupport_Disabled: string;

  ControllerSettings_PSSupport_Enabled: string;

  ControllerSettings_PSSupport_WhenNeeded: string;

  ControllerSettings_TurnOffTimeout: string;

  ControllerSettings_TurnOffTimeout_5: string;

  ControllerSettings_TurnOffTimeout_10: string;

  ControllerSettings_TurnOffTimeout_15: string;

  ControllerSettings_TurnOffTimeout_30: string;

  ControllerSettings_TurnOffTimeout_60: string;

  ControllerSettings_TurnOffTimeout_120: string;

  ControllerSettings_TurnOffTimeout_Never: string;

  ControllerSettingSlider_Coarse: string;

  ControllerSettingSlider_Fine: string;

  'ControllerSettingValue_--': string;

  ControllerSettingValue_AbsoluteMouse: string;

  ControllerSettingValue_ActivatorPref: string;

  ControllerSettingValue_AnalogEmulation: string;

  ControllerSettingValue_ApplicationPreference: string;

  ControllerSettingValue_AxialAcceleration: string;

  ControllerSettingValue_AxisBoth: string;

  ControllerSettingValue_AxisX: string;

  ControllerSettingValue_AxisY: string;

  ControllerSettingValue_CenterTrackpad: string;

  ControllerSettingValue_Circle: string;

  ControllerSettingValue_CircularAcceleration: string;

  ControllerSettingValue_Cross: string;

  ControllerSettingValue_CrossGate: string;

  ControllerSettingValue_Curve_1: string;

  ControllerSettingValue_Curve_2: string;

  ControllerSettingValue_Curve_3: string;

  ControllerSettingValue_Curve_4: string;

  ControllerSettingValue_Curve_Custom: string;

  ControllerSettingValue_Deadzone_Calibration: string;

  ControllerSettingValue_Deadzone_Custom: string;

  ControllerSettingValue_Deadzone_None: string;

  ControllerSettingValue_FlickStick_SnapMode_Eighths: string;

  ControllerSettingValue_FlickStick_SnapMode_ForwardOnly: string;

  ControllerSettingValue_FlickStick_SnapMode_Half: string;

  ControllerSettingValue_FlickStick_SnapMode_NoSnap: string;

  ControllerSettingValue_FlickStick_SnapMode_Quarter: string;

  ControllerSettingValue_FlickStick_SnapMode_Sixths: string;

  ControllerSettingValue_Gyro_Camera: string;

  ControllerSettingValue_Gyro_Pointer: string;

  ControllerSettingValue_Gyro_Roll: string;

  ControllerSettingValue_Gyro_Yaw: string;

  ControllerSettingValue_Gyro_YawAndRoll: string;

  ControllerSettingValue_GyroA: string;

  ControllerSettingValue_GyroAllSelected: string;

  ControllerSettingValue_GyroAny: string;

  ControllerSettingValue_GyroB: string;

  ControllerSettingValue_GyroBumperLeft: string;

  ControllerSettingValue_GyroBumperRight: string;

  ControllerSettingValue_GyroButtonNotFound: string;

  ControllerSettingValue_GyroC: string;

  ControllerSettingValue_GyroCapture: string;

  ControllerSettingValue_GyroCircle: string;

  ControllerSettingValue_GyroClickCenter: string;

  ControllerSettingValue_GyroClickLeft: string;

  ControllerSettingValue_GyroClickRight: string;

  ControllerSettingValue_GyroCross: string;

  ControllerSettingValue_GyroDpadDown: string;

  ControllerSettingValue_GyroDpadLeft: string;

  ControllerSettingValue_GyroDpadRight: string;

  ControllerSettingValue_GyroDpadUp: string;

  ControllerSettingValue_GyroFL: string;

  ControllerSettingValue_GyroFR: string;

  ControllerSettingValue_GyroGripLeft: string;

  ControllerSettingValue_GyroGripRight: string;

  ControllerSettingValue_GyroJoyconLeftR: string;

  ControllerSettingValue_GyroJoyconLeftZR: string;

  ControllerSettingValue_GyroJoyconPairLeftSL: string;

  ControllerSettingValue_GyroJoyconPairLeftSR: string;

  ControllerSettingValue_GyroJoyconPairRightSL: string;

  ControllerSettingValue_GyroJoyconPairRightSR: string;

  ControllerSettingValue_GyroJoyconRightR: string;

  ControllerSettingValue_GyroJoyconRightZR: string;

  ControllerSettingValue_GyroL3: string;

  ControllerSettingValue_GyroL4: string;

  ControllerSettingValue_GyroL5: string;

  ControllerSettingValue_GyroLeftStickDeflect: string;

  ControllerSettingValue_GyroLeftStickDeflectOrTouchLeft: string;

  ControllerSettingValue_GyroLeftStickDeflectOrTouchLeftOrLPadTouch: string;

  ControllerSettingValue_GyroLeftTrigger: string;

  ControllerSettingValue_GyroLeftTriggerNoQualifier: string;

  ControllerSettingValue_GyroLeftTriggerThreshold: string;

  ControllerSettingValue_GyroLeftTriggerUnqualified: string;

  ControllerSettingValue_GyroLFn: string;

  ControllerSettingValue_GyroLPaddle: string;

  ControllerSettingValue_GyroLStick: string;

  ControllerSettingValue_GyroLStickOrPadTouch: string;

  ControllerSettingValue_GyroLStickTouch: string;

  ControllerSettingValue_GyroM1: string;

  ControllerSettingValue_GyroM2: string;

  ControllerSettingValue_GyroM3: string;

  ControllerSettingValue_GyroM4: string;

  ControllerSettingValue_GyroMaskButtons_NoneSelected: string;

  ControllerSettingValue_GyroMenu: string;

  ControllerSettingValue_GyroMinus: string;

  ControllerSettingValue_GyroMute: string;

  ControllerSettingValue_GyroNone: string;

  ControllerSettingValue_GyroOff: string;

  ControllerSettingValue_GyroOn: string;

  ControllerSettingValue_GyroOptions: string;

  ControllerSettingValue_GyroOverrideModeSettingsOff: string;

  ControllerSettingValue_GyroOverrideModeSettingsOn: string;

  ControllerSettingValue_GyroPlus: string;

  ControllerSettingValue_GyroR3: string;

  ControllerSettingValue_GyroR4: string;

  ControllerSettingValue_GyroR5: string;

  ControllerSettingValue_GyroRequireAll: string;

  ControllerSettingValue_GyroRequireAny: string;

  ControllerSettingValue_GyroRFn: string;

  ControllerSettingValue_GyroRightStickDeflect: string;

  ControllerSettingValue_GyroRightStickDeflectOrTouchRight: string;

  ControllerSettingValue_GyroRightStickDeflectOrTouchRightOrRPadTouch: string;

  ControllerSettingValue_GyroRightTrigger: string;

  ControllerSettingValue_GyroRightTriggerNoQualifier: string;

  ControllerSettingValue_GyroRightTriggerThreshold: string;

  ControllerSettingValue_GyroRightTriggerUnqualified: string;

  ControllerSettingValue_GyroRPaddle: string;

  ControllerSettingValue_GyroRStick: string;

  ControllerSettingValue_GyroRStickOrPadTouch: string;

  ControllerSettingValue_GyroRStickRPadTouch: string;

  ControllerSettingValue_GyroRStickTouch: string;

  ControllerSettingValue_GyroSelectAll: string;

  ControllerSettingValue_GyroSelectNone: string;

  ControllerSettingValue_GyroShare: string;

  ControllerSettingValue_GyroSquare: string;

  ControllerSettingValue_GyroToggle: string;

  ControllerSettingValue_GyroToJoystickOutputMode_CameraStyle: string;

  ControllerSettingValue_GyroToJoystickOutputMode_TiltStyle: string;

  ControllerSettingValue_GyroTouchCenter: string;

  ControllerSettingValue_GyroTouchLeft: string;

  ControllerSettingValue_GyroTouchLeftAux: string;

  ControllerSettingValue_GyroTouchRight: string;

  ControllerSettingValue_GyroTouchRightAux: string;

  ControllerSettingValue_GyroTriangle: string;

  ControllerSettingValue_GyroView: string;

  ControllerSettingValue_GyroX: string;

  ControllerSettingValue_GyroY: string;

  ControllerSettingValue_GyroY1: string;

  ControllerSettingValue_GyroY2: string;

  ControllerSettingValue_GyroZ: string;

  ControllerSettingValue_High: string;

  ControllerSettingValue_LaserPointer: string;

  ControllerSettingValue_Left: string;

  ControllerSettingValue_LeftJoystick: string;

  ControllerSettingValue_LeftStickDown: string;

  ControllerSettingValue_LeftStickLeft: string;

  ControllerSettingValue_LeftStickRight: string;

  ControllerSettingValue_LeftStickUp: string;

  ControllerSettingValue_LeftTrackpad: string;

  ControllerSettingValue_Linear: string;

  ControllerSettingValue_LocalSpaceAdvanced: string;

  ControllerSettingValue_LocalSpaceCombineYawAndRoll: string;

  ControllerSettingValue_LocalSpaceRoll: string;

  ControllerSettingValue_LocalSpaceYaw: string;

  ControllerSettingValue_Low: string;

  ControllerSettingValue_Macro0: string;

  ControllerSettingValue_Macro1: string;

  ControllerSettingValue_Macro2: string;

  ControllerSettingValue_Macro3: string;

  ControllerSettingValue_Macro4: string;

  ControllerSettingValue_Macro5: string;

  ControllerSettingValue_Macro6: string;

  ControllerSettingValue_Macro7: string;

  ControllerSettingValue_Medium: string;

  ControllerSettingValue_ModeShift_Chord_A: string;

  ControllerSettingValue_ModeShift_Chord_B: string;

  ControllerSettingValue_ModeShift_Chord_LeftBumper: string;

  ControllerSettingValue_ModeShift_Chord_LeftGrip: string;

  ControllerSettingValue_ModeShift_Chord_LeftJoystickClick: string;

  ControllerSettingValue_ModeShift_Chord_LeftTrigger: string;

  ControllerSettingValue_ModeShift_Chord_LeftTriggerThreshold: string;

  ControllerSettingValue_ModeShift_Chord_LPaddle: string;

  ControllerSettingValue_ModeShift_Chord_RightBumper: string;

  ControllerSettingValue_ModeShift_Chord_RightGrip: string;

  ControllerSettingValue_ModeShift_Chord_RightJoystickClick: string;

  ControllerSettingValue_ModeShift_Chord_RightTrigger: string;

  ControllerSettingValue_ModeShift_Chord_RightTriggerThreshold: string;

  ControllerSettingValue_ModeShift_Chord_RPaddle: string;

  ControllerSettingValue_ModeShift_Chord_Select: string;

  ControllerSettingValue_ModeShift_Chord_Start: string;

  ControllerSettingValue_ModeShift_Chord_X: string;

  ControllerSettingValue_ModeShift_Chord_Y: string;

  ControllerSettingValue_ModeShiftButtons_NoneSelected: string;

  ControllerSettingValue_None: string;

  ControllerSettingValue_Off: string;

  ControllerSettingValue_On: string;

  ControllerSettingValue_OnDisable: string;

  ControllerSettingValue_OnEnable: string;

  ControllerSettingValue_OnEnableAndDisable: string;

  ControllerSettingValue_PadBoth: string;

  ControllerSettingValue_PadLeft: string;

  ControllerSettingValue_PadRight: string;

  ControllerSettingValue_PlayerSpace: string;

  ControllerSettingValue_Pressure: string;

  ControllerSettingValue_RadialNoOverlap: string;

  ControllerSettingValue_RadialWithOverlap: string;

  ControllerSettingValue_RelativeMouse: string;

  ControllerSettingValue_Right: string;

  ControllerSettingValue_RightJoystick: string;

  ControllerSettingValue_RightStickDown: string;

  ControllerSettingValue_RightStickLeft: string;

  ControllerSettingValue_RightStickRight: string;

  ControllerSettingValue_RightStickUp: string;

  ControllerSettingValue_RightTrackpad: string;

  ControllerSettingValue_Scroll_Wheel_Type_Circle: string;

  ControllerSettingValue_Scroll_Wheel_Type_Horizontal: string;

  ControllerSettingValue_Scroll_Wheel_Type_Vertical: string;

  ControllerSettingValue_Square: string;

  ControllerSettingValue_Toggle: string;

  ControllerSettingValue_TouchMenu_Button2: string;

  ControllerSettingValue_TouchMenu_Button4: string;

  ControllerSettingValue_TouchMenu_Button5: string;

  ControllerSettingValue_TouchMenu_Button7: string;

  ControllerSettingValue_TouchMenu_Button9: string;

  ControllerSettingValue_TouchMenu_Button12: string;

  ControllerSettingValue_TouchMenu_Button13: string;

  ControllerSettingValue_TouchMenu_Button14: string;

  ControllerSettingValue_TouchMenu_Button16: string;

  ControllerSettingValue_TouchMenu_ButtonBindings: string;

  ControllerSettingValue_TouchMenu_ButtonClick: string;

  ControllerSettingValue_TouchMenu_ButtonRelease: string;

  ControllerSettingValue_TouchMenu_TouchAlways: string;

  ControllerSettingValue_TouchMenu_TouchRelease: string;

  ControllerSettingValue_TouchMenuButtons_NoneSelected: string;

  ControllerSettingValue_Trackpad: string;

  ControllerSettingValue_Trigger_HairTrigger: string;

  ControllerSettingValue_Trigger_LongPressExclusive: string;

  ControllerSettingValue_Trigger_LongPressLong: string;

  ControllerSettingValue_Trigger_LongPressMedium: string;

  ControllerSettingValue_Trigger_LongPressShort: string;

  ControllerSettingValue_Trigger_Simple: string;

  ControllerSettingValue_TriggerDampeningBothAlways: string;

  ControllerSettingValue_TriggerDampeningBothSoft: string;

  ControllerSettingValue_TriggerDampeningLeftAlways: string;

  ControllerSettingValue_TriggerDampeningLeftSoft: string;

  ControllerSettingValue_TriggerDampeningRightAlways: string;

  ControllerSettingValue_TriggerDampeningRightSoft: string;

  ControllerSettingValue_TriggerLeft: string;

  ControllerSettingValue_TriggerOff: string;

  ControllerSettingValue_TriggerRight: string;

  ControllerSettingValue_WorldSpace: string;

  ControllerSource_ModeShift_Header: string;

  ControllerSource_ModeShift_Subheader: string;

  ControllerSource_ModeShift_Subheader_Plural: string;

  ControllerVisualization_Joystick_Deadzone_LiveUpdate_Start: string;

  ControllerVisualization_Joystick_Deadzone_LiveUpdate_Stop: string;

  ControllerVisualization_Joystick_Deadzone_Output: string;

  ControllerVisualization_Joystick_Deadzone_Value: string;

  ControllerVisualization_Joystick_Deadzone_Value_AntiDeadZone: string;

  ControllerVisualization_Joystick_Deadzone_Value_AntiDeadZoneBuffer: string;

  ControllerVisualization_Joystick_Deadzone_Value_DeadZoneInner: string;

  ControllerVisualization_Joystick_Deadzone_Value_DeadZoneOuter: string;

  ControllerVisualization_Joystick_Deadzone_Value_OuterEdge: string;

  ControllerVisualization_Joystick_LiveUpdate_Description: string;

  ControlSoundtrack: string;

  Corner_BottomCenter: string;

  Corner_BottomLeft: string;

  Corner_BottomRight: string;

  Corner_Off: string;

  Corner_TopCenter: string;

  Corner_TopLeft: string;

  Corner_TopRight: string;

  CurveEditor_BisectEdge: string;

  CurveEditor_Cancel: string;

  CurveEditor_Confirm: string;

  CurveEditor_Delete: string;

  CurveEditor_EdgeCurveStyle: string;

  CurveEditor_EditCurvature: string;

  CurveEditor_SelectKey: string;

  CurveEditor_TangentOrEdgeStyle_Bezier: string;

  CurveEditor_TangentOrEdgeStyle_Flatten: string;

  CurveEditor_TangentOrEdgeStyle_Straighten: string;

  CurveEditor_TangentStyle: string;

  CustomArt_BadFileType: string;

  CustomArt_ClearCustomBackground: string;

  CustomArt_ClearCustomLogo: string;

  CustomArt_DoneEditingLogo: string;

  CustomArt_EditLogoPosition: string;

  CustomArt_ErrorTitle: string;

  CustomArt_ResetLogoPosition: string;

  CustomArt_SetCustomBackground: string;

  CustomArt_SetCustomLogo: string;

  CustomArt_UnknownError: string;

  Deck_OOBESupport_Subtitle: string;

  Deck_OOBESupport_Title: string;

  DeckVerified_CategoryLabel_Playable: string;

  DeckVerified_CategoryLabel_Unknown: string;

  DeckVerified_CategoryLabel_Unsupported: string;

  DeckVerified_CategoryLabel_Verified: string;

  DeckVerified_CompatibilitySection_Details: string;

  DeckVerified_CompatibilitySection_Title: string;

  DeckVerified_FilterDescription_AllGames: string;

  DeckVerified_FilterDescription_Verified: string;

  DeckVerified_FilterDescription_Verified_NotOnDeck: string;

  DeckVerified_FilterDescription_Verified_Playable: string;

  DeckVerified_FilterDescription_Verified_Playable_Unknown: string;

  DeckVerified_FilterLabel_AllGames: string;

  DeckVerified_FilterLabel_Verified: string;

  DeckVerified_FilterLabel_Verified_Playable: string;

  DeckVerified_FilterLabel_Verified_Playable_Unknown: string;

  DeleteScreenshot_Failed: string;

  DeleteScreenshot_Single: string;

  DeleteScreenshot_Title: string;

  Demo_Banner: string;

  Demo_SpotlightIntro: string;

  Demo_VisitStorePage: string;

  DeskJobPromo_SubTitle: string;

  DeskJobPromo_Title: string;

  Developer_SLS_Devcoredump_Enabled: string;

  Developer_SLS_Devcoredump_Enabled_Explainer: string;

  Developer_SLS_Enabled: string;

  Developer_SLS_Enabled_Description: string;

  Developer_SLS_Enabled_Explainer: string;

  Developer_SLS_GPU_Enabled: string;

  Developer_SLS_GPU_Enabled_Explainer: string;

  Developer_SLS_Journal_Enabled: string;

  Developer_SLS_Journal_Enabled_Explainer: string;

  Developer_SLS_Kdump_Enabled: string;

  Developer_SLS_Kdump_Enabled_Explainer: string;

  Developer_SLS_Minidump_Enabled: string;

  Developer_SLS_Minidump_Enabled_Explainer: string;

  Developer_SLS_Section: string;

  Developer_SLS_SystemInfo_Enabled: string;

  Developer_SLS_SystemInfo_Enabled_Explainer: string;

  Devkit_Unsupported_Footer: string;

  Devkit_Unsupported_Settings_Message: string;

  Devkit_Unsupported_Settings_Title: string;

  DiscoveryQueue_Banner: string;

  DiscoveryQueue_Title: string;

  DisplayStatus_AvailForFree: string;

  DisplayStatus_AvailGuestPass: string;

  DisplayStatus_AvailToBorrow: string;

  DisplayStatus_BorrowerLocked: string;

  DisplayStatus_Compact_AvailForFree: string;

  DisplayStatus_Compact_AvailGuestPass: string;

  DisplayStatus_Compact_AvailToBorrow: string;

  DisplayStatus_Compact_BorrowerLocked: string;

  DisplayStatus_Compact_CloudError: string;

  DisplayStatus_Compact_CloudOutOfDate: string;

  DisplayStatus_Compact_DownloadDisabled: string;

  DisplayStatus_Compact_DownloadFailed: string;

  DisplayStatus_Compact_Downloading: string;

  DisplayStatus_Compact_DownloadPaused: string;

  DisplayStatus_Compact_DownloadQueued: string;

  DisplayStatus_Compact_DownloadRequired: string;

  DisplayStatus_Compact_Installing: string;

  DisplayStatus_Compact_InvalidPlatform: string;

  DisplayStatus_Compact_Launching: string;

  DisplayStatus_Compact_LicenseExpired: string;

  DisplayStatus_Compact_LicensePending: string;

  DisplayStatus_Compact_NotLaunchable: string;

  DisplayStatus_Compact_OwnerLocked: string;

  DisplayStatus_Compact_ParentalBlocked: string;

  DisplayStatus_Compact_PreloadComplete: string;

  DisplayStatus_Compact_PresaleOnly: string;

  DisplayStatus_Compact_Purchase: string;

  DisplayStatus_Compact_ReadyToInstall: string;

  DisplayStatus_Compact_ReadyToLaunch: string;

  DisplayStatus_Compact_ReadyToPreload: string;

  DisplayStatus_Compact_RegionRestricted: string;

  DisplayStatus_Compact_Running: string;

  DisplayStatus_Compact_Synchronizing: string;

  DisplayStatus_Compact_Terminating: string;

  DisplayStatus_Compact_Unavailable: string;

  DisplayStatus_Compact_Uninstalling: string;

  DisplayStatus_Compact_UpdateDisabled: string;

  DisplayStatus_Compact_UpdateFailed: string;

  DisplayStatus_Compact_UpdatePaused: string;

  DisplayStatus_Compact_UpdateQueued: string;

  DisplayStatus_Compact_UpdateRequired: string;

  DisplayStatus_Compact_Updating: string;

  DisplayStatus_Compact_Validating: string;

  DisplayStatus_CustomReleaseDate: string;

  DisplayStatus_DownloadDisabled: string;

  DisplayStatus_DownloadFailed: string;

  DisplayStatus_Downloading: string;

  DisplayStatus_DownloadPaused: string;

  DisplayStatus_DownloadQueued: string;

  DisplayStatus_DownloadRequired: string;

  DisplayStatus_Installing: string;

  DisplayStatus_InvalidPlatform: string;

  DisplayStatus_Launching: string;

  DisplayStatus_LicenseExpired: string;

  DisplayStatus_LicensePending: string;

  DisplayStatus_NotLaunchable: string;

  DisplayStatus_OwnerLocked: string;

  DisplayStatus_Percent: string;

  DisplayStatus_Percent_Complete: string;

  DisplayStatus_Percent_Fmt: string;

  DisplayStatus_PreloadComplete: string;

  DisplayStatus_PresaleOnly: string;

  DisplayStatus_Purchase: string;

  DisplayStatus_ReadyToInstall: string;

  DisplayStatus_ReadyToLaunch: string;

  DisplayStatus_ReadyToPreload: string;

  DisplayStatus_RegionRestricted: string;

  DisplayStatus_ReleaseDate: string;

  DisplayStatus_Running: string;

  DisplayStatus_Synchronizing: string;

  DisplayStatus_Terminating: string;

  DisplayStatus_Unavailable: string;

  DisplayStatus_Uninstalling: string;

  DisplayStatus_UpdateAvailableButDisabledByApp: string;

  DisplayStatus_UpdateDisabled: string;

  DisplayStatus_UpdateFailed: string;

  DisplayStatus_UpdatePaused: string;

  DisplayStatus_UpdateQueued: string;

  DisplayStatus_UpdateRequired: string;

  DisplayStatus_Updating: string;

  DisplayStatus_Validating: string;

  DLC_DateAdded: string;

  DLCStatus_downloading: string;

  DLCStatus_installed: string;

  DLCStatus_notinstalled: string;

  Downloads_AddToQueue_Tooltip: string;

  Downloads_AutoUpdate_DoNotUpdate: string;

  Downloads_AutoUpdate_HighPriority: string;

  Downloads_AutoUpdates_Enabled: string;

  Downloads_ContentType_AppContent: string;

  Downloads_ContentType_Content: string;

  Downloads_ContentType_ContentTooltip: string;

  Downloads_ContentType_Shader: string;

  Downloads_ContentType_ShaderTooltip: string;

  Downloads_ContentType_Title: string;

  Downloads_ContentType_Workshop: string;

  Downloads_ContentType_WorkshopTooltip: string;

  Downloads_DetailedState_Downloading: string;

  Downloads_DetailedState_Downloading_Complete: string;

  Downloads_DetailedState_Finalizing: string;

  Downloads_DetailedState_Hosting: string;

  Downloads_DetailedState_Installing: string;

  Downloads_DetailedState_None: string;

  Downloads_DetailedState_Patching: string;

  Downloads_DetailedState_Preallocating: string;

  Downloads_DetailedState_Preloading: string;

  Downloads_DetailedState_Preloading_Complete: string;

  Downloads_DetailedState_Starting: string;

  Downloads_DetailedState_Stopping: string;

  Downloads_DetailedState_Transferring: string;

  Downloads_DetailedState_Transferring_Complete: string;

  Downloads_DetailedState_Unpacking: string;

  Downloads_DetailedState_Updating: string;

  Downloads_DetailedState_Validating: string;

  Downloads_DetailedState_Verifying: string;

  Downloads_Disk_Tooltip: string;

  Downloads_DownloadedBytesInProgress: string;

  Downloads_DownloadedBytesInProgress_Short: string;

  Downloads_DownloadFinished: string;

  Downloads_DownloadStarted: string;

  Downloads_DownloadTimeRemaining: string;

  Downloads_GoToGame_Tooltip: string;

  Downloads_LaunchWhenComplete: string;

  Downloads_Legend_Disk: string;

  Downloads_Legend_Network: string;

  Downloads_LocalNetworkTransfer_Download: string;

  Downloads_LocalNetworkTransfer_Stop: string;

  Downloads_LocalNetworkTransfer_Stop_ttip: string;

  Downloads_LocalNetworkTransfer_Upload: string;

  Downloads_MoveToTop_Tooltip: string;

  Downloads_Network_Tooltip: string;

  Downloads_NoTransfers: string;

  Downloads_OpenSettings_Tooltip: string;

  Downloads_OverrideDownloadThrottle: string;

  Downloads_PatchNotes: string;

  Downloads_Pause: string;

  Downloads_Pause_Tooltip: string;

  Downloads_PauseAll: string;

  Downloads_RemoveAll: string;

  Downloads_RemoveFromList_Tooltip: string;

  Downloads_RemoveFromQueue_Tooltip: string;

  Downloads_Resume: string;

  Downloads_Resume_Tooltip: string;

  Downloads_Retry_Tooltip: string;

  Downloads_ScheduledFor: string;

  Downloads_ScheduledFor_Verbose: string;

  Downloads_ScheduledUpdateTimes: string;

  Downloads_ScheduleUpdatesFor: string;

  Downloads_Section_Active: string;

  Downloads_Section_Completed: string;

  Downloads_Section_Current: string;

  Downloads_Section_NotQueued: string;

  Downloads_Section_Scheduled: string;

  Downloads_State_Calculating: string;

  Downloads_State_Downloading: string;

  Downloads_State_Finalizing: string;

  Downloads_State_Hosting: string;

  Downloads_State_Installing: string;

  Downloads_State_MinutesRemaining: string;

  Downloads_State_None: string;

  Downloads_State_NotQueued: string;

  Downloads_State_Patching: string;

  Downloads_State_Paused: string;

  Downloads_State_PercentComplete: string;

  Downloads_State_Preallocating: string;

  Downloads_State_Preloading: string;

  Downloads_State_Queued: string;

  Downloads_State_Running: string;

  Downloads_State_SecondsRemaining: string;

  Downloads_State_Starting: string;

  Downloads_State_Stopping: string;

  Downloads_State_Transferring: string;

  Downloads_State_Unpacking: string;

  Downloads_State_UpdatesDiabled: string;

  Downloads_State_UpdatesDiabledByApp: string;

  Downloads_State_Updating: string;

  Downloads_State_UpNext: string;

  Downloads_State_Validating: string;

  Downloads_State_Verifying: string;

  Downloads_State_WaitingForPrevious: string;

  Downloads_Stats_CurrentRate: string;

  Downloads_Stats_DiskRate: string;

  Downloads_Stats_PeakRate: string;

  Downloads_Stats_TotalBytes: string;

  Downloads_Throttle: string;

  Downloads_ThrottleSuspended: string;

  Downloads_Time_Remaining: string;

  Downloads_Time_Remaining_Unknown: string;

  Downloads_TimeRemaining: string;

  Downloads_TotalBytes: string;

  Downloads_View: string;

  Downloads_ViewPatchNotes: string;

  Downloads_ViewSubscriptions: string;

  DownloadSettings_AllowDownloadDuringGameplay: string;

  DownloadSettings_AllowDownloadDuringGameplay_Description_KnownHardware: string;

  DownloadSettings_AllowDownloadDuringGameplay_Description_UnknownHardware: string;

  DownloadSettings_BandwidthLimit: string;

  DownloadSettings_BandwidthLimit_Desc_Kilobits: string;

  DownloadSettings_BandwidthLimit_Desc_Kilobytes: string;

  DownloadSettings_BandwidthLimit_Placeholder: string;

  DownloadSettings_ClearDownloadCache: string;

  DownloadSettings_ClearDownloadCacheButton: string;

  DownloadSettings_ClearDownloadCacheConfirm: string;

  DownloadSettings_ClearDownloadCacheDesc: string;

  DownloadSettings_ClearDownloadCacheServiceRepair: string;

  DownloadSettings_ClearDownloadCacheWarning: string;

  DownloadSettings_DefaultAppUpdateBehavior: string;

  DownloadSettings_DefaultAppUpdateBehavior_Description: string;

  DownloadSettings_DefaultAppUpdateBehavior_Exceptions: string;

  DownloadSettings_DefaultAppUpdateBehavior_Exceptions_NoGame: string;

  DownloadSettings_DefaultAppUpdateBehavior_KeepUpToDate: string;

  DownloadSettings_DefaultAppUpdateBehavior_KeepUpToDate_Description: string;

  DownloadSettings_DefaultAppUpdateBehavior_UpdateOnLaunch: string;

  DownloadSettings_DisplayInBitsPerSecond: string;

  DownloadSettings_ManageAppUpdateOverrides: string;

  DownloadSettings_ManageAppUpdateOverrides_Plural: string;

  DownloadSettings_PeerContent: string;

  DownloadSettings_PeerContentAnyUser: string;

  DownloadSettings_PeerContentDescription: string;

  DownloadSettings_PeerContentFriends: string;

  DownloadSettings_PeerContentOff: string;

  DownloadSettings_PeerContentSameUser: string;

  DownloadSettings_PeerContentServerMode: string;

  DownloadSettings_PreShaderBackgroundProcessing: string;

  DownloadSettings_PreShaderDesc: string;

  DownloadSettings_PreShaderEnable: string;

  DownloadSettings_PreShaderHeader: string;

  DownloadSettings_RestrictUpdates_EndLabel: string;

  DownloadSettings_RestrictUpdates_StartLabel: string;

  DownloadSettings_RestrictUpdatesFrom: string;

  DownloadSettings_RestrictUpdatesTo: string;

  DownloadSettings_ScheduleAutoUpdates: string;

  DownloadSettings_SelectRegion: string;

  DownloadSettings_ThrottleDuringStreaming: string;

  DownloadSettings_ThrottleDuringStreaming_Description: string;

  DurationControl_PlaytimeExceeded_Body_Maintenance: string;

  DurationControl_PlaytimeExceeded_Body_Night: string;

  DurationControl_PlaytimeExceeded_Body_WaitingVerification: string;

  DurationControl_PlaytimeExceeded_Title: string;

  EAAccessCollection_LinkToLandingPage: string;

  EAAccessCollection_NewCollection_Button: string;

  EGPUPerformanceLevel_Auto: string;

  EGPUPerformanceLevel_High: string;

  EGPUPerformanceLevel_Invalid: string;

  EGPUPerformanceLevel_Low: string;

  EGPUPerformanceLevel_Manual: string;

  EGPUPerformanceLevel_Profiling: string;

  EGraphicsPerfOverlayLevel_Basic: string;

  EGraphicsPerfOverlayLevel_Full: string;

  EGraphicsPerfOverlayLevel_Hidden: string;

  EGraphicsPerfOverlayLevel_Medium: string;

  EGraphicsPerfOverlayLevel_Minimal: string;

  Emoji_Activity: string;

  Emoji_Animals: string;

  Emoji_ChatFX: string;

  Emoji_Emoticons: string;

  Emoji_Flags: string;

  Emoji_Food: string;

  Emoji_Objects: string;

  Emoji_People: string;

  Emoji_Recent: string;

  Emoji_RecentSteamItems: string;

  Emoji_Stickers: string;

  Emoji_Symbols: string;

  Emoji_Travel: string;

  EmojiTab_Activity: string;

  EmojiTab_Animals: string;

  EmojiTab_Food: string;

  EmojiTab_Objects: string;

  EmojiTab_People: string;

  EmojiTab_Recent: string;

  EmojiTab_Symbols: string;

  EmojiTab_Travel: string;

  EncodingOption_Performance: string;

  EncodingOption_Quality: string;

  EnterGamepadUI: string;

  EnterLowPowerDownloadsModal_ContinueDownloading: string;

  EnterLowPowerDownloadsModal_Description: string;

  EnterLowPowerDownloadsModal_Sleep: string;

  EnterLowPowerDownloadsModal_Title: string;

  EnterVR: string;

  EulaDialog_Header: string;

  EulaDialog_Language: string;

  ExitGamepadUI: string;

  ExitSteam: string;

  ExitVR: string;

  FactoryReset_ErrorModal_Dismiss: string;

  FactoryReset_ErrorModal_GenericError: string;

  FactoryReset_ErrorModal_NoInternet: string;

  FactoryReset_ErrorModal_Title: string;

  FactoryReset_RequestModal_Description: string;

  FactoryReset_RequestModal_ResetOS: string;

  FactoryReset_RequestModal_ResetUserData: string;

  FactoryReset_RequestModal_Title: string;

  FamilyGroup_ChoosePreferredLender_AppRunning: string;

  FamilyGroup_ChoosePreferredLender_CommonOnly: string;

  FamilyGroup_ChoosePreferredLender_DLCAdditional: string;

  FamilyGroup_ChoosePreferredLender_DLCInCommon: string;

  FamilyGroup_ChoosePreferredLender_Error: string;

  FamilyGroup_ChoosePreferredLender_NoDLC: string;

  FamilyGroup_ChoosePreferredLender_Text: string;

  FamilyGroup_ChoosePreferredLender_Title: string;

  FamilyGroup_GameAvailable: string;

  FamilyGroup_GameAvailable_Plural: string;

  FamilyGroup_GameBorrowerLocked: string;

  FamilyGroup_GameExcluded: string;

  FamilyGroup_GameOwnerLocked: string;

  FamilyGroup_ManageFamily: string;

  FamilyGroup_Offline: string;

  FamilyGroup_OldSharingWarning: string;

  FamilyGroup_PreferredCopy: string;

  FamilyGroup_QueryFailed: string;

  FamilyGroup_TrySteamFamilies: string;

  FamilyGroup_TrySteamFamilies_Button: string;

  FamilySettings_AuthorizeLocalDevice: string;

  FamilySettings_Description: string;

  FamilySettings_FailedToAuthorize: string;

  FamilySettings_FailedToDeauthorize: string;

  FamilySettings_FailedToUpdateBorrower: string;

  FamilySettings_FamilyView_Desc: string;

  FamilySettings_FamilyView_Header: string;

  FamilySettings_FamilyView_Link: string;

  FamilySettings_Header: string;

  FamilySettings_LimitExceeded: string;

  FamilySettings_Manage_ButtonText: string;

  FamilySettings_ManageDevices: string;

  FamilySettings_ManageFamilySharing: string;

  FamilySettings_Offline: string;

  FamilySettings_ShowNotifications: string;

  FamilySettings_SteamGuardRequired: string;

  FamilySettings_TooManyBorrowers: string;

  FamilySettings_UserList_LeftColumn: string;

  FamilySettings_UserList_NoAccounts: string;

  FamilySettings_UserList_RightColumn: string;

  FamilySettings_UserListDescription: string;

  FamilyView_Dialog_Title: string;

  FamilyView_Disabled: string;

  FamilyView_Enabled: string;

  FamilyView_Lock: string;

  FamilyView_LockDialog_Description: string;

  FamilyView_LockDialog_SiteLicense: string;

  FamilyView_RequestFeatureAccess: string;

  FamilyView_RequestFeatureAccess_AlwaysBlocked: string;

  FamilyView_RequestFeatureAccess_GenericError: string;

  FamilyView_RequestFeatureAccess_Offline: string;

  FamilyView_RequestFeatureAccess_Request: string;

  FamilyView_RequestPlaytime_Description: string;

  FamilyView_RequestPlaytime_Description_Offline: string;

  FamilyView_RequestPlaytime_GenericError: string;

  FamilyView_RequestPlaytime_LimitUpcoming: string;

  FamilyView_RequestPlaytime_Request: string;

  FamilyView_RequestPlaytime_Title: string;

  FamilyView_TemporaryFeaturesDuration: string;

  FamilyView_Unlock: string;

  FamilyView_UnlockDialog_Description: string;

  FamilyView_UnlockDialog_LimitExceeded: string;

  FamilyView_UnlockDialog_WrongPIN: string;

  FilterCategory_1: string;

  FilterCategory_3: string;

  FilterCategory_4: string;

  FilterCategory_Features: string;

  FilterCategory_Genre: string;

  FilterCategory_PlayState: string;

  FilterCategory_Type: string;

  FilterEdit_AcceptGameListViewChange: string;

  FilterEdit_AdvancedTooltip: string;

  FilterEdit_ClearSearch: string;

  FilterEdit_CollectionModeHeader: string;

  FilterEdit_CollectionsHiddenPrompt: string;

  FilterEdit_CollectionsHiddenPromptTitle: string;

  FilterEdit_Customize: string;

  FilterEdit_FirstColumnHeader: string;

  FilterEdit_RejectGameListViewChange: string;

  FilterEdit_RequiredField: string;

  FilterEdit_SaveCollection: string;

  FilterEdit_SaveCollectionNameInputPrompt: string;

  FilterEdit_SaveCollectionVerbose: string;

  FilterEdit_SavedFilters: string;

  FilterEdit_SaveDynamicCollectionButtonDesc: string;

  FilterEdit_SaveDynamicCollectionNoIcon: string;

  FilterEdit_SaveDynamicCollectionWithIcon: string;

  FilterEdit_SaveOverwrite: string;

  FilterEdit_SaveStandardCollectionButtonDesc: string;

  FilterEdit_SearchModeHeader: string;

  FilterEdit_SearchPrompt: string;

  FilterEdit_SearchResults: string;

  FilterEdit_SelectCollectionType: string;

  FilterEdit_SelectCollectionTypeButtonCreate: string;

  FilterEdit_SelectCollectionTypeButtonCreateDynamic: string;

  FilterEdit_SelectedFilters: string;

  FilterElement_Achievements: string;

  FilterElement_CoOp: string;

  FilterElement_EAAccess: string;

  FilterElement_FamilySharing: string;

  FilterElement_FullControllerSupport: string;

  FilterElement_GamepadPreferred: string;

  FilterElement_GenreAction: string;

  FilterElement_GenreAdventure: string;

  FilterElement_GenreCasual: string;

  FilterElement_GenreIndie: string;

  FilterElement_GenreMMO: string;

  FilterElement_GenreRacing: string;

  FilterElement_GenreRPG: string;

  FilterElement_GenreSimulation: string;

  FilterElement_GenreSports: string;

  FilterElement_GenreStrategy: string;

  FilterElement_HDR: string;

  FilterElement_Installed: string;

  FilterElement_LocalMultiplayer: string;

  FilterElement_MultiPlayer: string;

  FilterElement_None: string;

  FilterElement_NonVRGames: string;

  FilterElement_PartialControllerSupport: string;

  FilterElement_PlayedPreviously: string;

  FilterElement_Private: string;

  FilterElement_PS4ControllerSupport: string;

  FilterElement_PS5ControllerSupport: string;

  FilterElement_ReadyToPlay: string;

  FilterElement_RemotePlayTogether: string;

  FilterElement_SinglePlayer: string;

  FilterElement_SteamCloud: string;

  FilterElement_SteamDeckPlayable: string;

  FilterElement_SteamDeckUnknown: string;

  FilterElement_SteamDeckVerified: string;

  FilterElement_SteamInputAPI: string;

  FilterElement_SteamOSCompatible: string;

  FilterElement_SteamOSUnknown: string;

  FilterElement_Tooltip_Achievements: string;

  FilterElement_Tooltip_CoOp: string;

  FilterElement_Tooltip_EAAccess: string;

  FilterElement_Tooltip_FamilySharing: string;

  FilterElement_Tooltip_FriendLibrary: string;

  FilterElement_Tooltip_FriendLibrary_AccessDenied: string;

  FilterElement_Tooltip_FriendLibrary_Offline: string;

  FilterElement_Tooltip_FullControllerSupport: string;

  FilterElement_Tooltip_GamepadPreferred: string;

  FilterElement_Tooltip_GenreAction: string;

  FilterElement_Tooltip_GenreAdventure: string;

  FilterElement_Tooltip_GenreCasual: string;

  FilterElement_Tooltip_GenreIndie: string;

  FilterElement_Tooltip_GenreMMO: string;

  FilterElement_Tooltip_GenreRacing: string;

  FilterElement_Tooltip_GenreRPG: string;

  FilterElement_Tooltip_GenreSimulation: string;

  FilterElement_Tooltip_GenreSports: string;

  FilterElement_Tooltip_GenreStrategy: string;

  FilterElement_Tooltip_HDR: string;

  FilterElement_Tooltip_Installed: string;

  FilterElement_Tooltip_LocalMultiplayer: string;

  FilterElement_Tooltip_MultiPlayer: string;

  FilterElement_Tooltip_NonVRGames: string;

  FilterElement_Tooltip_PartialControllerSupport: string;

  FilterElement_Tooltip_PlayedPreviously: string;

  FilterElement_Tooltip_Private: string;

  FilterElement_Tooltip_PS4ControllerSupport: string;

  FilterElement_Tooltip_PS5ControllerSupport: string;

  FilterElement_Tooltip_ReadyToPlay: string;

  FilterElement_Tooltip_RemotePlayTogether: string;

  FilterElement_Tooltip_SinglePlayer: string;

  FilterElement_Tooltip_SteamCloud: string;

  FilterElement_Tooltip_SteamDeckPlayable: string;

  FilterElement_Tooltip_SteamDeckUnknown: string;

  FilterElement_Tooltip_SteamDeckVerified: string;

  FilterElement_Tooltip_SteamInputAPI: string;

  FilterElement_Tooltip_SteamOSCompatible: string;

  FilterElement_Tooltip_SteamOSUnknown: string;

  FilterElement_Tooltip_StoreTag: string;

  FilterElement_Tooltip_TradingCards: string;

  FilterElement_Tooltip_undefined: string;

  FilterElement_Tooltip_Unplayed: string;

  FilterElement_Tooltip_VR: string;

  FilterElement_Tooltip_VRSupported: string;

  FilterElement_Tooltip_Workshop: string;

  FilterElement_TradingCards: string;

  FilterElement_undefined: string;

  FilterElement_Unplayed: string;

  FilterElement_ValidPlatform_Linux: string;

  FilterElement_ValidPlatform_MacOS: string;

  FilterElement_VR: string;

  FilterElement_VRSupported: string;

  FilterElement_Workshop: string;

  FilterToolTip_SearchText: string;

  FriendContextMenu_OpenFriends: string;

  FriendContextMenu_ViewProfile: string;

  Friends_Favorites: string;

  Friends_GoToFriends: string;

  Friends_PlayingNow: string;

  Friends_PlayingNow_Plural: string;

  FriendSetting_ChatFontDefault: string;

  FriendSetting_ChatFontLarge: string;

  FriendSetting_ChatFontSmall: string;

  FriendSettings_AlwaysNewChatWindow: string;

  FriendSettings_AlwaysUse24HourClock: string;

  FriendSettings_AnimatedAvatars: string;

  FriendSettings_CategorizeInGameFriendsByGame: string;

  FriendSettings_ChatFontSize: string;

  FriendSettings_CompactFriendsList: string;

  FriendSettings_CompactQuickAccess_Client: string;

  FriendSettings_DisableEmbedInlining: string;

  FriendSettings_DisableRoomEffects: string;

  FriendSettings_DisableSpellcheck: string;

  FriendSettings_DockChats: string;

  FriendSettings_ExampleFriend: string;

  FriendSettings_ExampleNickname: string;

  FriendSettings_Flash_Always: string;

  FriendSettings_Flash_Header: string;

  FriendSettings_Flash_Minimized: string;

  FriendSettings_Flash_Never: string;

  FriendSettings_Heading_Chat: string;

  FriendSettings_Heading_FriendsList: string;

  FriendSettings_HideCategorizedFriends: string;

  FriendSettings_HideOfflineFriendsInCategories: string;

  FriendSettings_ParenthesizeNicknames: string;

  FriendSettings_RememberOpenChats: string;

  FriendSettings_RememberOpenChats_Desc: string;

  FriendSettings_RememberOpenChats_DescClient: string;

  FriendSettings_SignInToFriends: string;

  FriendSettings_SignInToFriends_SteamOS_KnownHardware: string;

  FriendSettings_SignInToFriends_SteamOS_UnknownHardware: string;

  FriendSettings_SortFriendsByStatus: string;

  FriendsList_OfflineMode: string;

  FriendsList_OfflineMode_Detail: string;

  FriendsList_SignedOut: string;

  FriendsList_SignedOut_Detail: string;

  FriendsList_StatusChange_Hint: string;

  FriendsList_VersionMismatch: string;

  FriendsList_VersionMismatch_Detail: string;

  Game_Start_Problem_Text: string;

  Game_Start_Problem_Title: string;

  GameAction_AddToCollection: string;

  GameAction_AddToCollectionOption_NewCollection: string;

  GameAction_AddToFamilyGames: string;

  GameAction_AddToFavorites: string;

  GameAction_AddToHidden: string;

  GameAction_AllowForChild: string;

  GameAction_BackUpFiles: string;

  GameAction_BorrowApp: string;

  GameAction_BrowseLocalFiles: string;

  GameAction_Cancel: string;

  GameAction_ClearCustomArtwork: string;

  GameAction_ClearSelectedControllerConfig: string;

  GameAction_ConfigureController: string;

  GameAction_ConfirmExitGameTitle: string;

  GameAction_ConfirmForceExitGameTitle: string;

  GameAction_ConfirmForceExitGameTitle_Desc: string;

  GameAction_ConfirmStopStreamingTitle: string;

  GameAction_Connect: string;

  GameAction_ControllerConfiguration: string;

  GameAction_CreateDesktopShortcut: string;

  GameAction_CreateLauncherShortcut: string;

  GameAction_DeleteProtonFiles: string;

  GameAction_DenyForChild: string;

  GameAction_DevMenu: string;

  GameAction_DismissPlayNext: string;

  GameAction_Download: string;

  GameAction_FamilyMenu: string;

  GameAction_Favorite: string;

  GameAction_GameProperties: string;

  GameAction_Install: string;

  GameAction_Launch: string;

  GameAction_Launch_Multiple_Cancel: string;

  GameAction_Launch_Multiple_CloseAndLaunch: string;

  GameAction_Launch_Multiple_CloseAndLaunch_Confirm: string;

  GameAction_Launch_Multiple_CloseAndLaunch_Multiple: string;

  GameAction_Launch_Multiple_Description: string;

  GameAction_Launch_Multiple_Description_Multiple: string;

  GameAction_Launch_Multiple_KillAndLaunch_Continue: string;

  GameAction_Launch_Multiple_KillAndLaunch_Desc: string;

  GameAction_Launch_Multiple_LaunchSimultaneous: string;

  GameAction_Launch_Multiple_Title: string;

  GameAction_Launch_Multiple_Warning: string;

  GameAction_Launching: string;

  GameAction_LaunchingDialog_OpenSteam: string;

  GameAction_LaunchingDialog_Starting: string;

  GameAction_LaunchingDialog_Title: string;

  GameAction_Manage: string;

  GameAction_Manage_LaunchOptionCallout: string;

  GameAction_MarkAsPrivate: string;

  GameAction_MarkAsPrivate_NoShortcuts: string;

  GameAction_NavigateToAllCollectionsWithDrag: string;

  GameAction_NewCollectionDialogTitle: string;

  GameAction_Pause: string;

  GameAction_Play: string;

  GameAction_PlayFrom: string;

  GameAction_PlayMusic: string;

  GameAction_PreLoad: string;

  GameAction_PurchaseApp: string;

  GameAction_RemoveAppFromCollection: string;

  GameAction_RemoveAppFromMultipleCollections: string;

  GameAction_RemoveFromCollection: string;

  GameAction_RemoveFromFamilyGames: string;

  GameAction_RemoveFromFavorites: string;

  GameAction_RemoveFromHidden: string;

  GameAction_RemoveGameLicense: string;

  GameAction_RemoveMultipleAppsFromCollection: string;

  GameAction_RemoveMultipleAppsFromMultipleCollections: string;

  GameAction_RemoveShortcut: string;

  GameAction_ResetSelectedControllerConfig: string;

  GameAction_Resume: string;

  GameAction_ResumeGameInProgress: string;

  GameAction_SetCustomArtwork: string;

  GameAction_ShowCDKeys: string;

  GameAction_ShowCDKeys_Copied: string;

  GameAction_ShowCDKeys_Desc: string;

  GameAction_ShowCDKeys_Desc_NoCopy: string;

  GameAction_ShowCDKeys_DontShowAgain: string;

  GameAction_Stop: string;

  GameAction_Stream: string;

  GameAction_Terminating: string;

  GameAction_ThisAppIsPrivate: string;

  GameAction_UnFavorite: string;

  GameAction_Uninstall: string;

  GameAction_UnmarkAsPrivate: string;

  GameAction_Update: string;

  GameAction_ViewCDKeys: string;

  GameAction_ViewDetails: string;

  GameAction_ViewDetails_Collapse: string;

  GameAction_ViewDetails_ScrollUp: string;

  GameActionPlural_AddToCollection: string;

  GameActionPlural_AddToFamilyGames: string;

  GameActionPlural_AddToFavorites: string;

  GameActionPlural_AddToHidden: string;

  GameActionPlural_BackUpFiles: string;

  GameActionPlural_CreateDesktopShortcut: string;

  GameActionPlural_CreateLauncherShortcut: string;

  GameActionPlural_Download: string;

  GameActionPlural_Install: string;

  GameActionPlural_MarkAsPrivate: string;

  GameActionPlural_PreLoad: string;

  GameActionPlural_RemoveFromCollection: string;

  GameActionPlural_RemoveFromFamilyGames: string;

  GameActionPlural_RemoveFromFavorites: string;

  GameActionPlural_RemoveFromHidden: string;

  GameActionPlural_RemoveShortcut: string;

  GameActionPlural_Resume: string;

  GameActionPlural_ResumeGameInProgress: string;

  GameActionPlural_Uninstall: string;

  GameActionPlural_UnmarkAsPrivate: string;

  GameActionPlural_Update: string;

  GameCapsule_FreeToPlay: string;

  GameCapsule_InLibrary: string;

  GameDetails_CollectionContext_GoTo: string;

  GameDetails_CollectionContext_Remove: string;

  GameInfoDialog_AutoRetry: string;

  GameInfoDialog_AutoRetry_Alert: string;

  GameInfoDialog_AutoRetry_Alert_Desc: string;

  GameInfoDialog_AutoRetry_AutoJoin: string;

  GameInfoDialog_AutoRetry_AutoJoin_Desc: string;

  GameInfoDialog_AutoRetry_None: string;

  GameInfoDialog_BotPlayers: string;

  GameInfoDialog_Close: string;

  GameInfoDialog_GameInfo: string;

  GameInfoDialog_GameName: string;

  GameInfoDialog_JoinError_AppNotFound: string;

  GameInfoDialog_JoinError_ModNotInstalled: string;

  GameInfoDialog_JoinError_NotInitialized: string;

  GameInfoDialog_JoinError_ServerFull: string;

  GameInfoDialog_JoinError_VACBanned: string;

  GameInfoDialog_JoinGame: string;

  GameInfoDialog_Latency: string;

  GameInfoDialog_Latency_Failed: string;

  GameInfoDialog_Map: string;

  GameInfoDialog_Password: string;

  GameInfoDialog_PlayerName: string;

  GameInfoDialog_Players: string;

  GameInfoDialog_PlayerScore: string;

  GameInfoDialog_PlayerTime: string;

  GameInfoDialog_Refresh: string;

  GameInfoDialog_ServerIPText: string;

  GameInfoDialog_ServerName: string;

  GameInfoDialog_Status: string;

  GameInfoDialog_ValveAntiCheat: string;

  GameInfoDialog_ValveAntiCheat_NotSecure: string;

  GameInfoDialog_ValveAntiCheat_Secure: string;

  GameLauncher_AccountDoesNotOwnGame: string;

  GameLauncher_Title: string;

  GameLauncher_UnknownAppID: string;

  GameList_Category_EAAccess_Trademark: string;

  GameList_Category_Favorites: string;

  GameList_Category_Hidden: string;

  GameList_Category_Hidden_Tooltip: string;

  GameList_Category_RemotePlay: string;

  GameList_Category_SharedLibraries: string;

  GameList_Category_Uncategorized: string;

  GameList_Category_YourCollections: string;

  GameList_Entry_Invalid_OSType: string;

  GameList_Entry_Invalid_OSType2: string;

  GameList_Entry_Invalid_OSType3: string;

  GameList_Entry_ReadyToPlay_ToolTip: string;

  GameList_Home: string;

  GameList_Search: string;

  GameList_Search_GamesCheckbox_Link: string;

  GameList_Search_NoResults_Link: string;

  GameList_Search_NoResults_Title: string;

  GameList_SectionHeader_AddedManually: string;

  GameList_SectionHeader_AppCountToolTip: string;

  GameList_SectionHeader_AppCountToolTipAllHidden: string;

  GameList_SectionHeader_NoRecentActivity: string;

  GameList_SectionHeader_RemovedManually: string;

  GameList_SectionHeader_SearchResults: string;

  GameList_ToolIdentifierTooltip_Body: string;

  GameList_ToolIdentifierTooltip_Title: string;

  GameList_ToolsEnabled_1: string;

  GameList_ToolsEnabled_2: string;

  GameList_ToolsEnabled_Title: string;

  GameList_View_All: string;

  GameList_View_Collections: string;

  GameList_View_DeviceGames: string;

  GameList_View_ExitSearch: string;

  GameList_View_FamilyGroup: string;

  GameList_View_GamesProvidedByNamedCafe: string;

  GameList_View_GamesSharedByOther: string;

  GameList_View_GroupByCollections: string;

  GameList_View_GroupingDisabled_ToolTip: string;

  GameList_View_GroupSharedLibraries: string;

  GameList_View_LocalGames: string;

  GameList_View_MyOwnGames: string;

  GameList_View_NonSteamGames: string;

  GameList_View_NothingSelected: string;

  GameList_View_NothingSelected_HelpText: string;

  GameList_View_OneCollection: string;

  GameList_View_Platform_Apple: string;

  GameList_View_Platform_Linux: string;

  GameList_View_PS4Games: string;

  GameList_View_PS5Games: string;

  GameList_View_ReadyToPlay_ToolTip_Installed: string;

  GameList_View_ReadyToPlay_ToolTip_Setting: string;

  GameList_View_ReadyToPlay_ToolTip_Streaming: string;

  GameList_View_Recent: string;

  GameList_View_SearchResults: string;

  GameList_View_ShowAllCollections: string;

  GameList_View_ShowingOnlyReadyToPlay: string;

  GameList_View_ShowingReadyToPlay: string;

  GameList_View_ShowOnlyNonVR: string;

  GameList_View_ShowOnlyReadyToPlay: string;

  GameList_View_ShowOnlyVR: string;

  GameList_View_SortByRecent: string;

  GameList_View_SteamOSCompatGames: string;

  GameList_View_ThisCollection: string;

  GameList_View_XboxGames: string;

  GameNotes_NoteForGame: string;

  GamepadHome_GoToLibrary: string;

  GamepadHome_GoToStore: string;

  GamepadHome_PlayNext: string;

  GamepadHome_PlayNextSubHead: string;

  GamepadKey_A: string;

  GamepadKey_B: string;

  GamepadKey_DPad_Down: string;

  GamepadKey_DPad_Left: string;

  GamepadKey_DPad_Right: string;

  GamepadKey_DPad_Up: string;

  GamepadKey_LED_Brightness: string;

  GamepadKey_LED_Color: string;

  GamepadKey_LeftBumper: string;

  GamepadKey_LeftStick_Click: string;

  GamepadKey_LeftStick_Down: string;

  GamepadKey_LeftStick_Left: string;

  GamepadKey_LeftStick_Right: string;

  GamepadKey_LeftStick_Up: string;

  GamepadKey_LeftTrigger: string;

  GamepadKey_RightBumper: string;

  GamepadKey_RightStick_Click: string;

  GamepadKey_RightStick_Down: string;

  GamepadKey_RightStick_Left: string;

  GamepadKey_RightStick_Right: string;

  GamepadKey_RightStick_Up: string;

  GamepadKey_RightTrigger: string;

  GamepadKey_Select: string;

  GamepadKey_Start: string;

  GamepadKey_X: string;

  GamepadKey_Y: string;

  GameRecording_Settings_LearnMore: string;

  GameRecording_Settings_SendFeedback: string;

  Generic_Close: string;

  Generic_Delete: string;

  Generic_GotIt: string;

  Generic_GotItCalm: string;

  Generic_Open: string;

  Generic_ScrollToTop: string;

  Generic_Share: string;

  Generic_Upload: string;

  Generic_ViewGameDetails: string;

  Generic_ViewGameInStore: string;

  Generic_ViewInLibrary: string;

  Generic_ViewInStore: string;

  GoOffline: string;

  GoOnline: string;

  GridSection_EverythingElse: string;

  GridSection_EverythingElseMetacritic: string;

  GridSection_Favorites: string;

  GridSection_GreaterThan20GB: string;

  GridSection_GreaterThan50GB: string;

  GridSection_GreaterThan100GB: string;

  GridSection_LessThan1Hour: string;

  GridSection_LessThan20GB: string;

  GridSection_MoreThan10YearsAgo: string;

  GridSection_Never: string;

  GridSection_NoPlaytime: string;

  GridSection_NoSizeOnDisk: string;

  GridSection_NotInstalled: string;

  GridSection_Over1Hour: string;

  GridSection_Over10Hours: string;

  GridSection_Over20Hours: string;

  GridSection_Over40Hours: string;

  GridSection_Over50Metacritic: string;

  GridSection_Over60Hours: string;

  GridSection_Over70Metacritic: string;

  GridSection_Over80Metacritic: string;

  GridSection_Over90Metacritic: string;

  GridSection_Over100Hours: string;

  GridSection_UnknownReleaseDate: string;

  GuidedTour_BPM_QuickAccessButton_Description: string;

  GuidedTour_BPM_QuickAccessButton_Description_Keyboard: string;

  GuidedTour_BPM_QuickAccessButton_Title: string;

  GuidedTour_BPM_SendOff_Description: string;

  GuidedTour_BPM_SendOff_Title: string;

  GuidedTour_BPM_SteamButton_Description: string;

  GuidedTour_BPM_SteamButton_Description_Keyboard: string;

  GuidedTour_BPM_SteamButton_Title: string;

  GuidedTour_BPM_Welcome_Description: string;

  GuidedTour_BPM_Welcome_Title: string;

  GuidedTour_ContinueMessage_ActionPress: string;

  GuidedTour_ContinueMessage_ActionTap: string;

  GuidedTour_ContinueMessage_Template: string;

  GuidedTour_ContinueMessage_Template_NonDeck: string;

  GuidedTour_ParentalControls_Description_LGS: string;

  GuidedTour_ParentalControls_PressAnyOther: string;

  GuidedTour_ParentalControls_PressAnyOther_NonDeck: string;

  GuidedTour_ParentalControls_PressSpacebar: string;

  GuidedTour_ParentalControls_PressX: string;

  GuidedTour_ParentalControls_Title_LGS: string;

  GuidedTour_ParentalControlsSetup_Description: string;

  GuidedTour_ParentalControlsSetup_Footer: string;

  GuidedTour_ParentalControlsSetup_Step1: string;

  GuidedTour_ParentalControlsSetup_Step2: string;

  GuidedTour_ParentalControlsSetup_Step3: string;

  GuidedTour_ParentalControlsSetup_Steps: string;

  GuidedTour_ParentalControlsSetup_Title: string;

  GuidedTour_PowerButton_Description: string;

  GuidedTour_PowerButton_Description_LGS: string;

  GuidedTour_PowerButton_Title: string;

  GuidedTour_PowerButton_Title_LGS: string;

  GuidedTour_QuickAccessButton_Description: string;

  GuidedTour_QuickAccessButton_Description_LGS: string;

  GuidedTour_QuickAccessButton_Title: string;

  GuidedTour_QuickAccessButton_Title_LGS: string;

  GuidedTour_SDCard_Description: string;

  GuidedTour_SDCard_Description_LGS: string;

  GuidedTour_SDCard_Title: string;

  GuidedTour_SDCard_Title_LGS: string;

  GuidedTour_SendOff_Description: string;

  GuidedTour_SendOff_Description_LGS: string;

  GuidedTour_SendOff_Title: string;

  GuidedTour_SendOff_Title_LGS: string;

  GuidedTour_SteamButton_Description: string;

  GuidedTour_SteamButton_Description_LGS: string;

  GuidedTour_SteamButton_Title: string;

  GuidedTour_SteamButton_Title_LGS: string;

  GuidedTour_SteamOS_SendOff_Description: string;

  GuidedTour_SteamOS_Welcome_Title: string;

  GuidedTour_VolumeButtons_Description: string;

  GuidedTour_VolumeButtons_Description_LGS: string;

  GuidedTour_VolumeButtons_Title: string;

  GuidedTour_VolumeButtons_Title_LGS: string;

  GuidedTour_Welcome_Description: string;

  GuidedTour_Welcome_Description_LGS: string;

  GuidedTour_Welcome_Title: string;

  GuidedTour_Welcome_Title_LGS: string;

  HardwareDeviceName_Generic: string;

  HardwareDeviceName_Ibex: string;

  HardwareDeviceName_Nereid: string;

  HardwareDeviceName_Proteus: string;

  HardwareDeviceName_SteamController: string;

  HardwareUpdateField_Button: string;

  HardwareUpdateField_Button_Test: string;

  HardwareUpdateField_Label: string;

  HardwareUpdateNotification_Body: string;

  HardwareUpdateNotification_Title: string;

  HardwareUpdaterWizard_Dongle_Description: string;

  HardwareUpdaterWizard_Dongle_Title: string;

  HardwareUpdaterWizard_Error_Description: string;

  HardwareUpdaterWizard_Error_Title: string;

  HardwareUpdaterWizard_Nereid_Description: string;

  HardwareUpdaterWizard_Nereid_Title: string;

  HardwareUpdaterWizard_Success_Button: string;

  HardwareUpdaterWizard_Success_Description: string;

  HardwareUpdaterWizard_Success_Title: string;

  HardwareUpdaterWizard_USB_Description: string;

  HardwareUpdaterWizard_USB_Title: string;

  HardwareUpdaterWizard_Wireless_Description: string;

  HardwareUpdaterWizard_Wireless_Title: string;

  HardwareUpdaterWizard_Wireless_Warning: string;

  HardwareUpdaterWizard_Wireless_Warning_ValveOnly: string;

  HardwareUpdateTestField_Label: string;

  HardwareUpdateWizard_Body: string;

  HardwareUpdateWizard_Header: string;

  HardwareUpdateWizard_PlugIn: string;

  HardwareVariant_LegionGoS: string;

  HardwareVariant_SteamDeck: string;

  HardwareVariant_SteamMachine: string;

  Header_BatteryFull: string;

  Header_BatteryPercentage: string;

  Header_DeviceName_BatteryFull: string;

  Header_DeviceName_BatteryPercentage: string;

  Header_DeviceName_LowBattery_BatteryPercentage: string;

  HeaderActions_AccountPage: string;

  HeaderActions_Downloads: string;

  HeaderActions_Network: string;

  HeaderActions_PowerSettings: string;

  HeaderActions_StorageSettings: string;

  HeaderActions_UnformattedSDCard: string;

  HeaderActions_UnreadChatMessages: string;

  HeaderActions_Update: string;

  HeaderActions_VoiceChatActive: string;

  Help: string;

  Hibernate: string;

  HomeSettings_HiddenGameCount: string;

  HomeSettings_HiddenGameCount_Description: string;

  HomeSettings_HiddenGameCount_Plural: string;

  HomeSettings_ManageHiddenGames: string;

  HomeSettings_Remove: string;

  HomeSettings_ShowingLess: string;

  HomeSettings_ShowingMore: string;

  HomeSettings_ShowStoreContent: string;

  HomeSettings_ShowStoreContent_Description: string;

  HomeSettings_WhatsNew_Instructions: string;

  HomeSettings_WhatsNewUpdatesOnly: string;

  HomeTab_Friends: string;

  HomeTab_Recommended: string;

  HomeTab_WhatsNew: string;

  Hotkey_Modal_Header: string;

  Hotkey_Modal_Subhead: string;

  Hotkey_Modal_Unbind: string;

  IdleStatus_GameName: string;

  IdleStatus_PressMultipleTimes: string;

  IdleStatus_RemainingCount: string;

  IdleStatus_RemainingCount_Plural: string;

  IdleStatus_RemainingTime: string;

  IdleStatus_Title: string;

  IdleStatus_WakeDevice: string;

  IFrame_GamepadInputSupport_Basic: string;

  IFrame_GamepadInputSupport_None: string;

  IFrame_Loading: string;

  Installer_ApplicationShortcut: string;

  Installer_BytesProcessed: string;

  Installer_Cancelling: string;

  Installer_CancellingApp: string;

  Installer_ChangeMedia: string;

  Installer_ChooseDestinationFolder: string;

  Installer_DesktopShortcut: string;

  Installer_Error_AppName_ErrorDescription: string;

  Installer_Eula: string;

  Installer_EulaAccept: string;

  Installer_EulaError: string;

  Installer_EulaViewLinks: string;

  Installer_FolderSpaceFree: string;

  Installer_Install: string;

  Installer_Installing: string;

  Installer_InstallingApp: string;

  Installer_ManageStorage: string;

  Installer_NoticeCantChooseFolder: string;

  Installer_NoticeNotEnoughSpace: string;

  Installer_NoticePeerServerOffline: string;

  Installer_NoticePeerServerUnavailable: string;

  Installer_NoticeUnmountedFolder: string;

  Installer_PreallocatingDiskSpace: string;

  Installer_ReadingBackup: string;

  Installer_ReadingFromMedia: string;

  Installer_SystemShortcut: string;

  Installer_UnknownError: string;

  Installer_UnknownError_AppName: string;

  Internet_Network_State_Connected: string;

  Internet_Network_State_Connecting: string;

  Internet_Network_State_Disconnected: string;

  Internet_Network_State_Disconnecting: string;

  Internet_Network_State_Failed: string;

  Internet_Network_State_NotFound: string;

  Internet_Network_State_Retrying: string;

  Internet_Network_Type_Other: string;

  Internet_Network_Type_Unknown: string;

  Internet_Network_Type_Virtual: string;

  Internet_Network_Type_Wired: string;

  Internet_Network_Type_Wireless: string;

  Join_New: string;

  Join_ScanCode: string;

  Join_SiteLink: string;

  Join_SiteLink_VR: string;

  Key_Alt: string;

  Key_AltGr: string;

  Key_Backspace: string;

  Key_Caps: string;

  Key_Capslock: string;

  Key_Close: string;

  Key_Control: string;

  Key_Delete: string;

  Key_Done: string;

  Key_Down: string;

  Key_Emojis: string;

  Key_End: string;

  Key_Enter: string;

  Key_Escape: string;

  Key_Home: string;

  Key_Insert: string;

  Key_Layouts: string;

  Key_Left: string;

  Key_Move: string;

  Key_Next: string;

  Key_Numlock: string;

  Key_Paste: string;

  Key_PgDn: string;

  Key_PgUp: string;

  Key_Play: string;

  Key_Prev: string;

  Key_Right: string;

  Key_Shift: string;

  Key_Space: string;

  Key_Stop: string;

  Key_Tab: string;

  Key_Up: string;

  Key_Win: string;

  Keyboard_IME_Not_available: string;

  Keyboard_SteamItems_Loading: string;

  Keyboard_SteamItems_None: string;

  Keyboard_SteamItems_NotLoggedIn: string;

  Keyboard_Title: string;

  KeyboardKey_0: string;

  KeyboardKey_1: string;

  KeyboardKey_2: string;

  KeyboardKey_3: string;

  KeyboardKey_4: string;

  KeyboardKey_5: string;

  KeyboardKey_6: string;

  KeyboardKey_7: string;

  KeyboardKey_8: string;

  KeyboardKey_9: string;

  KeyboardKey_A: string;

  KeyboardKey_B: string;

  KeyboardKey_Back_Tick: string;

  KeyboardKey_Backslash: string;

  KeyboardKey_Backspace: string;

  KeyboardKey_Break: string;

  KeyboardKey_C: string;

  KeyboardKey_CapsLock: string;

  KeyboardKey_Comma: string;

  KeyboardKey_D: string;

  KeyboardKey_Dash: string;

  KeyboardKey_Delete: string;

  KeyboardKey_Down_Arrow: string;

  KeyboardKey_E: string;

  KeyboardKey_End: string;

  KeyboardKey_Equals: string;

  KeyboardKey_Escape: string;

  KeyboardKey_F: string;

  KeyboardKey_F1: string;

  KeyboardKey_F2: string;

  KeyboardKey_F3: string;

  KeyboardKey_F4: string;

  KeyboardKey_F5: string;

  KeyboardKey_F6: string;

  KeyboardKey_F7: string;

  KeyboardKey_F8: string;

  KeyboardKey_F9: string;

  KeyboardKey_F10: string;

  KeyboardKey_F11: string;

  KeyboardKey_F12: string;

  KeyboardKey_Forward_Slash: string;

  KeyboardKey_G: string;

  KeyboardKey_H: string;

  KeyboardKey_Home: string;

  KeyboardKey_I: string;

  KeyboardKey_Insert: string;

  KeyboardKey_J: string;

  KeyboardKey_K: string;

  KeyboardKey_KeyboardKey_Num_Lock: string;

  KeyboardKey_Keypad_0: string;

  KeyboardKey_Keypad_1: string;

  KeyboardKey_Keypad_2: string;

  KeyboardKey_Keypad_3: string;

  KeyboardKey_Keypad_4: string;

  KeyboardKey_Keypad_5: string;

  KeyboardKey_Keypad_6: string;

  KeyboardKey_Keypad_7: string;

  KeyboardKey_Keypad_8: string;

  KeyboardKey_Keypad_9: string;

  KeyboardKey_Keypad_Asterisk: string;

  KeyboardKey_Keypad_Dash: string;

  KeyboardKey_Keypad_Enter: string;

  KeyboardKey_Keypad_Forward_Slash: string;

  KeyboardKey_Keypad_Period: string;

  KeyboardKey_Keypad_Plus: string;

  KeyboardKey_L: string;

  KeyboardKey_LAlt: string;

  KeyboardKey_LControl: string;

  KeyboardKey_Left_Arrow: string;

  KeyboardKey_Left_Bracket: string;

  KeyboardKey_LShift: string;

  KeyboardKey_LWin: string;

  KeyboardKey_M: string;

  KeyboardKey_Mute: string;

  KeyboardKey_N: string;

  KeyboardKey_Next: string;

  KeyboardKey_O: string;

  KeyboardKey_P: string;

  KeyboardKey_Page_Down: string;

  KeyboardKey_Page_Up: string;

  KeyboardKey_Period: string;

  KeyboardKey_Play: string;

  KeyboardKey_Prev: string;

  KeyboardKey_Print_Screen: string;

  KeyboardKey_Q: string;

  KeyboardKey_R: string;

  KeyboardKey_RAlt: string;

  KeyboardKey_RControl: string;

  KeyboardKey_Return: string;

  KeyboardKey_Right_Arrow: string;

  KeyboardKey_Right_Bracket: string;

  KeyboardKey_RShift: string;

  KeyboardKey_RWin: string;

  KeyboardKey_S: string;

  KeyboardKey_Scroll_Lock: string;

  KeyboardKey_Semicolon: string;

  KeyboardKey_Single_Quote: string;

  KeyboardKey_Space: string;

  KeyboardKey_Stop: string;

  KeyboardKey_T: string;

  KeyboardKey_Tab: string;

  KeyboardKey_U: string;

  KeyboardKey_Up_Arrow: string;

  KeyboardKey_V: string;

  KeyboardKey_VolDown: string;

  KeyboardKey_VolUp: string;

  KeyboardKey_W: string;

  KeyboardKey_X: string;

  KeyboardKey_Y: string;

  KeyboardKey_Z: string;

  KeyboardLayout_Bulgarian: string;

  KeyboardLayout_Bulgarian_Phonetic: string;

  KeyboardLayout_Bulgarian_Phonetic_Traditional: string;

  KeyboardLayout_Chinese_Simplified: string;

  KeyboardLayout_Chinese_Traditional: string;

  KeyboardLayout_Chinese_Traditional_Bopomofo: string;

  KeyboardLayout_Chinese_Traditional_Cangjie: string;

  KeyboardLayout_Chinese_Traditional_Quick: string;

  KeyboardLayout_Colemak: string;

  KeyboardLayout_Czech: string;

  KeyboardLayout_Danish: string;

  KeyboardLayout_Dvorak: string;

  KeyboardLayout_Finnish: string;

  KeyboardLayout_French: string;

  KeyboardLayout_German: string;

  KeyboardLayout_Greek: string;

  KeyboardLayout_Hungarian: string;

  KeyboardLayout_Indonesian: string;

  KeyboardLayout_Italian: string;

  KeyboardLayout_Japanese: string;

  KeyboardLayout_Japanese_Kana: string;

  KeyboardLayout_Korean: string;

  KeyboardLayout_Norwegian: string;

  KeyboardLayout_Polish: string;

  KeyboardLayout_Portuguese: string;

  KeyboardLayout_QWERTY: string;

  KeyboardLayout_QWERTY_International: string;

  KeyboardLayout_Romanian: string;

  KeyboardLayout_Russian: string;

  KeyboardLayout_Select: string;

  KeyboardLayout_Spanish: string;

  KeyboardLayout_Swedish: string;

  KeyboardLayout_Thai: string;

  KeyboardLayout_Turkish_F: string;

  KeyboardLayout_Turkish_Q: string;

  KeyboardLayout_Ukrainian: string;

  KeyboardLayout_Vietnamese: string;

  LaunchApp_Action_ConnectingToSteam: string;

  LaunchApp_Action_CreatingProcess: string;

  LaunchApp_Action_DelayLaunch: string;

  LaunchApp_Action_DownloadingDepots: string;

  LaunchApp_Action_DownloadingWorkshop: string;

  LaunchApp_Action_GettingLegacyKey: string;

  LaunchApp_Action_ProcessingShaderCache: string;

  LaunchApp_Action_RunningInstallScript: string;

  LaunchApp_Action_RunningInstallScript_NoParens: string;

  LaunchApp_Action_ShowEula: string;

  LaunchApp_Action_SkipProcessingShaderCache: string;

  LaunchApp_Action_SkipStepHeader: string;

  LaunchApp_Action_Starting: string;

  LaunchApp_Action_SynchronizingCloud: string;

  LaunchApp_Action_UpdatingAppInfo: string;

  LaunchApp_Action_UpdatingDRM: string;

  LaunchApp_Action_VerifyingFiles: string;

  LaunchApp_Action_WaitingGameWindow: string;

  LaunchApp_ContineLaunch: string;

  LaunchApp_ControlsConfiguration_Loading: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse_BuiltInGamepadSupport: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse_CommunityLayout: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse_CommunityLayout_Modified: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse_Modified: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse_OfficialLayout: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse_OfficialLayout_Modified: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse_PersonalLayout: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse_PersonalLayout_Modified: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse_TemplateLayout: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse_TemplateLayout_Modified: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse_TemplateLayout_Recommended: string;

  LaunchApp_ControlsConfiguration_ThisGameWillUse_TemplateLayout_Recommended_Modified: string;

  LaunchApp_InstallScript_Failed_Continue: string;

  LaunchApp_InstallScript_Failed_Text: string;

  LaunchApp_InstallScript_Failed_Title: string;

  LaunchApp_OtherSessionPlaying_Text: string;

  LaunchApp_OtherSessionPlaying_Title: string;

  LaunchApp_ShowGameArgs_Text: string;

  LaunchApp_ShowGameArgs_Title: string;

  LaunchOptionsDialog_Ask: string;

  LaunchOptionsDialog_Forever: string;

  LaunchOptionsDialog_JustOnce: string;

  LaunchOptionsDialog_MakeSelection: string;

  LaunchOptionsDialog_MenuHeaderMain: string;

  LaunchOptionsDialog_PropertiesLabel: string;

  LaunchOptionsDialog_Remember: string;

  LaunchOptionsDialog_SeeProperties: string;

  LaunchOptionsDialog_SelectHeader: string;

  LED_Effect_Breathe: string;

  LED_Effect_Chroma: string;

  LED_Effect_Normal: string;

  LED_Effect_Patrol: string;

  LED_Effect_Rainbow: string;

  LED_Effect_Solid: string;

  LED_FrontBar: string;

  LED_JoystickRing: string;

  Library_ActionSetLayerDropdown_CodeLabel: string;

  Library_ControllerSaveDefaultDescription: string;

  Library_ControllerSaveDefaultTitle: string;

  Library_DesktopApps_AddChrome: string;

  Library_DesktopApps_DialogBody1: string;

  Library_DesktopApps_DialogBody2: string;

  Library_DesktopApps_DialogHeader: string;

  Library_DesktopApps_InstallingChrome: string;

  Library_DesktopApps_LearnMore: string;

  Library_DesktopApps_LearnMoreBody: string;

  Library_DesktopApps_NotNow: string;

  Library_Details_ModeShift_Title_A: string;

  Library_Details_ModeShift_Title_B: string;

  Library_Details_ModeShift_Title_DpadDown: string;

  Library_Details_ModeShift_Title_DpadLeft: string;

  Library_Details_ModeShift_Title_DpadRight: string;

  Library_Details_ModeShift_Title_DpadUp: string;

  Library_Details_ModeShift_Title_LeftBumper: string;

  Library_Details_ModeShift_Title_LeftGrip: string;

  Library_Details_ModeShift_Title_LeftGripUpper: string;

  Library_Details_ModeShift_Title_LeftJoystickClick: string;

  Library_Details_ModeShift_Title_LeftPadClick: string;

  Library_Details_ModeShift_Title_LeftPadTouch: string;

  Library_Details_ModeShift_Title_LeftTrigger: string;

  Library_Details_ModeShift_Title_LeftTriggerThreshold: string;

  Library_Details_ModeShift_Title_None: string;

  Library_Details_ModeShift_Title_RightBumper: string;

  Library_Details_ModeShift_Title_RightGrip: string;

  Library_Details_ModeShift_Title_RightGripUpper: string;

  Library_Details_ModeShift_Title_RightJoystickClick: string;

  Library_Details_ModeShift_Title_RightPadClick: string;

  Library_Details_ModeShift_Title_RightPadTouch: string;

  Library_Details_ModeShift_Title_RightTrigger: string;

  Library_Details_ModeShift_Title_RightTriggerThreshold: string;

  Library_Details_ModeShift_Title_Select: string;

  Library_Details_ModeShift_Title_Start: string;

  Library_Details_ModeShift_Title_X: string;

  Library_Details_ModeShift_Title_Y: string;

  Library_FilterCollection_Advanced: string;

  Library_FilterCollection_UseSteamDeck: string;

  Library_FilterCollection_UseSteamDeck_Desc: string;

  Library_FilterCollection_VRSubtabs_All: string;

  Library_FilterCollection_VRSubtabs_NonVR: string;

  Library_FilterCollection_VRSubtabs_VR: string;

  Library_FilterCollectionDescription: string;

  Library_FilterCollectionDescription_CompatNotOnDeck: string;

  Library_FilterCollectionTitle: string;

  Library_FilteredBy: string;

  Library_FilteredBy_Advanced: string;

  Library_FilteredBy_None: string;

  Library_FilteredByHeader: string;

  Library_FilteredByHeader_Singular: string;

  Library_FriendsActivity_BeingDiscussedHeading: string;

  Library_FriendsActivity_BeingDiscussedHover: string;

  Library_FriendsActivity_DontForgetHeading: string;

  Library_FriendsActivity_DontForgetHover: string;

  Library_FriendsActivity_HotRightNowHeading: string;

  Library_FriendsActivity_HotRightNowHover: string;

  Library_FriendsActivity_NewToGroupHeading: string;

  Library_FriendsActivity_NewToGroupHover: string;

  Library_FriendsActivity_PopularHeading: string;

  Library_FriendsActivity_PopularHover: string;

  Library_FriendsActivity_RecentlyPurchasedHeading: string;

  Library_FriendsActivity_RecentlyPurchasedHover: string;

  Library_FriendsActivity_ReturnedToGroupHeading: string;

  Library_FriendsActivity_ReturnedToGroupHover: string;

  Library_FriendsActivity_TrendingHeading: string;

  Library_FriendsActivity_TrendingHover: string;

  Library_FriendsActivity_UnownedBanner: string;

  Library_FriendsActivity_UnownedHeading: string;

  Library_FriendsActivity_UnownedHover: string;

  Library_FriendsActivity_UnownedMenu_Discussions: string;

  Library_FriendsActivity_UnownedMenu_Hub: string;

  Library_FriendsActivity_UnownedMenu_Reviews: string;

  Library_FriendsActivity_UnownedMenu_Store: string;

  Library_InstalledOnlyCheck: string;

  Library_Recent_NoRecentGames_ActivateProduct: string;

  Library_Recent_NoRecentGames_FreeToPlay: string;

  Library_Recent_NoRecentGames_GamesOnSale: string;

  Library_Recent_NoRecentGames_GamesOwned: string;

  Library_Recent_NoRecentGames_NewReleases: string;

  Library_Recent_NoRecentGames_NoGames: string;

  Library_Recent_NoRecentGames_RedeemCode: string;

  Library_Recent_NoRecentGames_SteamStore: string;

  Library_Recent_NoRecentGames_StoreLink: string;

  Library_SortByAddedToLibrary: string;

  Library_SortByAlphabetical: string;

  Library_SortByFavoritesFirst: string;

  Library_SortByFriendsPlaying: string;

  Library_SortByHoursPlayed: string;

  Library_SortByLastPlayed: string;

  Library_SortByLastUpdated: string;

  Library_SortByMetacriticScore: string;

  Library_SortByPctAchievementsComplete: string;

  Library_SortByPctAchievementsComplete_Tag: string;

  Library_SortByPctAchievementsNoAchievements_Tag: string;

  Library_SortByReleaseDate: string;

  Library_SortBySizeOnDisk: string;

  Library_SortBySteamReview: string;

  Library_SortCollectionBy: string;

  LibraryAssetImage_UnknownName: string;

  LibraryAssetType_AlbumCover: string;

  LibraryAssetType_AlbumCover_Description: string;

  LibraryAssetType_Capsule: string;

  LibraryAssetType_Capsule_Description: string;

  LibraryAssetType_Header: string;

  LibraryAssetType_Header_Description: string;

  LibraryAssetType_Hero: string;

  LibraryAssetType_Hero_Description: string;

  LibraryAssetType_Logo: string;

  LibraryAssetType_Logo_Description: string;

  LibraryHome_FriendsActivity: string;

  LibraryHome_GameCarousel_ContextMenu: string;

  LibraryHome_GameCarousel_ContextMenu_AddWishlist: string;

  LibraryHome_GameCarousel_ContextMenu_Ignore: string;

  LibraryHome_GameCarousel_ContextMenu_RemoveWishlist: string;

  LibraryHome_GameCarousel_ContextMenu_StorePage: string;

  LibraryHome_GameCarousel_ContextMenu_UnIgnore: string;

  LibraryHome_InGameFriends_Additional: string;

  LibraryHome_Loading: string;

  LibraryHome_MarketingMessages: string;

  LibraryHome_MarketingMessages_DLCOverride: string;

  LibraryHome_NewUpdates: string;

  LibraryHome_NewUpdates_LoweredPriority: string;

  LibraryHome_NewUpdates_RaisedPriority: string;

  LibraryHome_NewUpdates_Undo: string;

  LibraryHome_OnlineFriends_Additional: string;

  LibraryHome_PageableCollection: string;

  LibraryHome_Play_Beta: string;

  LibraryHome_PlayNext: string;

  LibraryHome_PlayNextNoResults: string;

  LibraryHome_PlayNextSubHead: string;

  LibraryHome_PrioritizeVR: string;

  LibraryHome_RecentFriendsActivity: string;

  LibraryHome_RecentFriendsActivity_Empty: string;

  LibraryHome_RecentGames: string;

  LibraryHome_RecentlyCompleted: string;

  LibraryHome_RecentlyCompleted_DownloadDate: string;

  LibraryHome_sale_now: string;

  LibraryHome_Spotlight_Daily: string;

  LibraryHome_Spotlight_DLC_Available: string;

  LibraryHome_Spotlight_Free_Weekend: string;

  LibraryHome_Spotlight_Midweek: string;

  LibraryHome_Spotlight_PlayNow: string;

  LibraryHome_Spotlight_PreloadNow: string;

  LibraryHome_Spotlight_PrePurchase: string;

  LibraryHome_Spotlight_Weekend: string;

  LibraryHome_WhatsNew_Empty: string;

  LibraryHome_YourCollection: string;

  LibraryTab_AllGames: string;

  LibraryTab_Collections: string;

  LibraryTab_DeckGames: string;

  LibraryTab_Favorites: string;

  LibraryTab_FrameVerified: string;

  LibraryTab_Installed: string;

  LibraryTab_NonSteam: string;

  LibraryTab_PS4ControllerGames: string;

  LibraryTab_PS5ControllerGames: string;

  LibraryTab_RecentlyPlayed: string;

  LibraryTab_RemotePlay: string;

  LibraryTab_Soundtracks: string;

  LibraryTab_SteamOSCompatibleGames: string;

  LibraryTab_VR: string;

  LibraryTab_XboxControllerGames: string;

  LockScreen_Directions: string;

  LockScreen_ForgotPIN: string;

  LockScreen_IncorrectPIN: string;

  LockScreen_NewPINPrompt: string;

  LockScreen_NewPINPrompt2: string;

  LockScreen_PINPrompt: string;

  LockScreen_PINSetMismatch_Body: string;

  LockScreen_PINSetMismatch_Title: string;

  LockScreen_Reset: string;

  LockScreen_ResetDescription: string;

  LockScreen_ResetWarning: string;

  LockScreenReset_Body_KnownHardware: string;

  LockScreenReset_Body_UnknownHardware: string;

  LockScreenReset_Question: string;

  LockScreenReset_Settings: string;

  LockScreenReset_Title: string;

  Login_AddAccount: string;

  Login_CachedCredentialInvalid: string;

  Login_CachedUsers: string;

  Login_Continue: string;

  Login_EnterCodeForAccount: string;

  Login_EnterCodeForEmail: string;

  Login_EnterCredentials: string;

  Login_EnterSteamguardCode: string;

  Login_EnterTwoFactorCode: string;

  Login_GoOnline: string;

  Login_HidePassword: string;

  Login_Join: string;

  Login_LastError: string;

  Login_LoadingLibrary: string;

  Login_LoggedInElsewhere: string;

  Login_Login: string;

  Login_LoginOffline: string;

  Login_LoginRestrictionFailed: string;

  Login_NewLogin: string;

  Login_NoConnection: string;

  Login_NoNetworksFound: string;

  Login_OfflineAppCacheInvalid: string;

  Login_Password_Placeholder: string;

  Login_PasswordMismatch: string;

  Login_PickUser: string;

  Login_PinPrompt_Back: string;

  Login_PinPrompt_Description: string;

  Login_PinPrompt_IncorrectPin: string;

  Login_PinPrompt_LoginWithPassword: string;

  Login_RateLimitExceeded: string;

  Login_Remember: string;

  Login_Remove_Desc1: string;

  Login_Remove_Desc2: string;

  Login_Remove_Remove: string;

  Login_Remove_Title: string;

  Login_RemoveUser: string;

  Login_RemoveUser_Menu: string;

  Login_RemoveUser_MenuOption: string;

  Login_ResetPIN: string;

  Login_ResetPINText: string;

  Login_ServiceUnavailable: string;

  Login_ShowPassword: string;

  Login_ShuttingDown: string;

  Login_StartingOffline: string;

  Login_StartingOffline_Account: string;

  Login_StayOffline: string;

  Login_SteamGuardExpired: string;

  Login_SteamGuardMismatch: string;

  Login_TwoFactorMismatch: string;

  Login_UserChooser_AccountName: string;

  Login_Username_Placeholder: string;

  Login_WaitingForNetwork: string;

  Login_WaitingForServer: string;

  Login_Welcome_ChooseYourNetwork: string;

  Login_Welcome_Connected: string;

  Login_Welcome_Continue: string;

  Login_WelcomeDevelopers_Title: string;

  Login_ZoomForVR: string;

  MainMenu_Title: string;

  MainTabsAbout: string;

  MainTabsChat: string;

  MainTabsCollections: string;

  MainTabsDownload: string;

  MainTabsHome: string;

  MainTabsLibrary: string;

  MainTabsLogin: string;

  MainTabsMedia: string;

  MainTabsOOBE: string;

  MainTabsSearch: string;

  MainTabsSettings: string;

  MainTabsSteamSettings: string;

  MainTabsStore: string;

  MainTabsVRSettings: string;

  MainTabsWorkshop: string;

  MajorUpdate_Context_RemoveThisUpdate: string;

  MajorUpdate_Context_ResetHiddenUpdates: string;

  MajorUpdate_Context_ShowMeFewerForApp: string;

  MajorUpdate_Context_ShowMeMoreForApp: string;

  MajorUpdate_Context_WhyAmISeeingThis: string;

  MajorUpdate_Context_WhyAmISeeingThis_Close: string;

  MajorUpdate_Context_WhyAmISeeingThis_Text: string;

  MajorUpdate_GoToSettings: string;

  MajorUpdate_NextUpdate: string;

  MajorUpdate_PostTime: string;

  MajorUpdate_PostTimeToday: string;

  MajorUpdate_Type0: string;

  MajorUpdate_Type1: string;

  MajorUpdate_Type14: string;

  MajorUpdate_ViewDetails: string;

  MajorUpdate_WatchNow: string;

  ManageDLC_Column_DateAdded: string;

  ManageDLC_Column_Enabled: string;

  ManageDLC_Column_Installed: string;

  ManageDLC_Column_Name: string;

  ManageDLC_Installed: string;

  ManageDLC_NoResults: string;

  ManageDLC_Search: string;

  ManageDLC_Title: string;

  ManageDLC_ViewMore: string;

  MandatoryUpdate_ButtonInstalling: string;

  MandatoryUpdate_ButtonText: string;

  MandatoryUpdate_Text: string;

  MandatoryUpdate_Title: string;

  Media_CapturedOn: string;

  Media_NoRecent: string;

  MediaManager_GridView_Tooltip: string;

  MediaManager_ListView_Tooltip: string;

  MediaManager_MultiSelect_CopyToClipboard: string;

  MediaManager_MultiSelect_Save: string;

  MediaManager_MultiSelect_Save_Mixture: string;

  MediaManager_MultiSelect_Save_Screenshots: string;

  MediaManager_RecordingShareNotSupported: string;

  MediaManager_SaveDialogTitle: string;

  MediaManager_ShareOnSteam: string;

  MediaManager_ShareTooltip: string;

  MediaManager_UploadScreenshot_Failure: string;

  MediaPage_Delete_Confirm: string;

  MediaPage_Delete_Notification_Failure: string;

  MediaPage_Delete_Notification_Success: string;

  MediaPage_Filter: string;

  MediaPage_Filter_None: string;

  MediaPage_ScreenshotContext_AddSpoiler: string;

  MediaPage_ScreenshotContext_ChangeVisibility: string;

  MediaPage_ScreenshotContext_ChangeVisibility_MakeFriendsOnly: string;

  MediaPage_ScreenshotContext_ChangeVisibility_MakePrivate: string;

  MediaPage_ScreenshotContext_ChangeVisibility_MakePublic: string;

  MediaPage_ScreenshotContext_ChangeVisibility_MakeUnlisted: string;

  MediaPage_ScreenshotContext_ConfirmUpload_Details: string;

  MediaPage_ScreenshotContext_ConfirmUpload_Title: string;

  MediaPage_ScreenshotContext_ConfirmVisibilityChange: string;

  MediaPage_ScreenshotContext_ConfirmVisibilityChange_FriendsOnly: string;

  MediaPage_ScreenshotContext_ConfirmVisibilityChange_Private: string;

  MediaPage_ScreenshotContext_ConfirmVisibilityChange_Public: string;

  MediaPage_ScreenshotContext_ConfirmVisibilityChange_Unlisted: string;

  MediaPage_ScreenshotContext_ConfirmVisibilityUpload_FriendsOnly: string;

  MediaPage_ScreenshotContext_ConfirmVisibilityUpload_Private: string;

  MediaPage_ScreenshotContext_ConfirmVisibilityUpload_Public: string;

  MediaPage_ScreenshotContext_ConfirmVisibilityUpload_Unlisted: string;

  MediaPage_ScreenshotContext_Delete: string;

  MediaPage_ScreenshotContext_EditCaption: string;

  MediaPage_ScreenshotContext_FriendShare: string;

  MediaPage_ScreenshotContext_QRCodeShare: string;

  MediaPage_ScreenshotContext_RemoveSpoiler: string;

  MediaPage_ScreenshotContext_SetFavorite: string;

  MediaPage_ScreenshotContext_Share: string;

  MediaPage_ScreenshotContext_Share_QRCode: string;

  MediaPage_ScreenshotContext_Share_SendToFriend: string;

  MediaPage_ScreenshotContext_Share_SteamActivity: string;

  MediaPage_ScreenshotContext_UnsetFavorite: string;

  MediaPage_ScreenshotContext_Upload: string;

  MediaPage_Share_ActivityFeed: string;

  MediaPage_Share_ActivityFeed_Notification: string;

  MediaPage_Share_ActivityFeed_Prompt: string;

  MediaPage_Sort_NewestFirst: string;

  MediaPage_Sort_OldestFirst: string;

  MediaPage_Spoiler: string;

  MediaPage_Spoiler_Reveal: string;

  MediaPage_TakeScreenshot: string;

  MediaPage_Upload_Notification_Failure: string;

  MediaPage_Upload_Notification_Success: string;

  MediaTab_All: string;

  MediaTab_FriendsOnly: string;

  MediaTab_Private: string;

  MediaTab_Public: string;

  MediaTab_Recent: string;

  MediaTab_Unlisted: string;

  Menu_About: string;

  Menu_Account: string;

  Menu_ActivateRetail: string;

  Menu_Activity: string;

  Menu_AddFriend: string;

  Menu_AddNonSteam: string;

  Menu_BackupRestore: string;

  Menu_Badges: string;

  Menu_BigPictureMode: string;

  Menu_Broadcasts: string;

  Menu_ChangeAccount: string;

  Menu_CheckForSteamUpdates: string;

  Menu_Collections: string;

  Menu_Community: string;

  Menu_Console: string;

  Menu_Content: string;

  Menu_DiscoveryQueue: string;

  Menu_Discussions: string;

  Menu_Downloads: string;

  Menu_EditProfile: string;

  Menu_Exit: string;

  Menu_ExitVR: string;

  Menu_Featured: string;

  Menu_Friends: string;

  Menu_FriendsChat: string;

  Menu_Games: string;

  Menu_GoOffline: string;

  Menu_GoOnline: string;

  Menu_Groups: string;

  Menu_Help: string;

  Menu_HiddenGames: string;

  Menu_Home: string;

  Menu_Inventory: string;

  Menu_LargeMode: string;

  Menu_LegalInfo: string;

  Menu_Library: string;

  Menu_Logout: string;

  Menu_ManageGifts: string;

  Menu_Market: string;

  Menu_MusicPlayer: string;

  Menu_NewForYou: string;

  Menu_News: string;

  Menu_OldPlayers: string;

  Menu_OldSettings: string;

  Menu_Players: string;

  Menu_PointsShop: string;

  Menu_PrivacyPolicy: string;

  Menu_Profile: string;

  Menu_Profile_Root: string;

  Menu_RedeemWallet: string;

  Menu_Screenshots: string;

  Menu_Screenshots_New: string;

  Menu_Servers: string;

  Menu_Settings: string;

  Menu_SignOut: string;

  Menu_SmallMode: string;

  Menu_Soundtracks: string;

  Menu_SRSI_Diagnostics: string;

  Menu_SSA: string;

  Menu_SSA_China: string;

  Menu_StartVR: string;

  Menu_Stats: string;

  Menu_Status_Away: string;

  Menu_Status_Invisible: string;

  Menu_Status_Offline: string;

  Menu_Status_Online: string;

  Menu_Steam: string;

  Menu_Store: string;

  Menu_StorePreferences: string;

  Menu_Support: string;

  Menu_SystemInfo: string;

  Menu_SystemReport: string;

  Menu_View: string;

  Menu_ViewFriendsList: string;

  Menu_ViewLibrary: string;

  Menu_ViewMyAccount: string;

  Menu_ViewMyProfile: string;

  Menu_ViewMyWallet: string;

  Menu_Window: string;

  Menu_Wishlist: string;

  Menu_Workshop: string;

  Menu_YearInReview: string;

  MinimizeSteam: string;

  Modal_ConfirmSteamRestart_RestartLater: string;

  Modal_ConfirmSteamRestart_RestartNow: string;

  Modal_ConfirmSteamRestart_Title: string;

  Modal_ExternalDisplayControlConfirm_Cancel: string;

  Modal_ExternalDisplayControlConfirm_Description: string;

  Modal_ExternalDisplayControlConfirm_Proceed: string;

  Modal_ExternalDisplayControlConfirm_Title: string;

  MouseKey_Button_Back: string;

  MouseKey_Button_Forward: string;

  MouseKey_Button_Left: string;

  MouseKey_Button_Middle: string;

  MouseKey_Button_Right: string;

  MouseKey_Scroll_Down: string;

  MouseKey_Scroll_Up: string;

  MultiplayerSessionLinkShare_CopyLink: string;

  MultiplayerSessionLinkShare_Instructions1: string;

  MultiplayerSessionLinkShare_Instructions2: string;

  MultiplayerSessionLinkShare_Title: string;

  MusicError_PlaybackUnsupported: string;

  MusicError_PlaybackUnsupported_Description_KnownHardware: string;

  MusicError_PlaybackUnsupported_Description_UnknownHardware: string;

  NavigateBack: string;

  NetworkConnectionRequiredToLoad: string;

  NetworkSettings: string;

  NewItemBug: string;

  None_Title: string;

  Notification_Achievement_Title: string;

  Notification_BatteryLow: string;

  Notification_BatteryTemperature_High_Desc: string;

  Notification_BatteryTemperature_High_KnownHardware: string;

  Notification_BatteryTemperature_High_UnknownHardware: string;

  Notification_BatteryTemperature_Low_Desc: string;

  Notification_BatteryTemperature_Low_KnownHardware: string;

  Notification_BatteryTemperature_Low_UnknownHardware: string;

  Notification_BatteryTemperature_Normal: string;

  Notification_BatteryTemperature_Normal_Desc: string;

  Notification_BroadcastAvailableToWatch_Title: string;

  Notification_CannotReadControllerGuideButton_Body: string;

  Notification_CannotReadControllerGuideButton_Title: string;

  Notification_ClipDownloaded_Body: string;

  Notification_ClipDownloaded_Title: string;

  Notification_CloudSyncConflict_Title: string;

  Notification_CloudSyncFailure_Title: string;

  Notification_DockUnsupportedFirmware_Body: string;

  Notification_DockUnsupportedFirmware_Title: string;

  Notification_DownloadComplete_Description: string;

  Notification_DownloadComplete_Title: string;

  Notification_FamilyGroup_PlaytimeWarning_Body: string;

  Notification_FamilyGroup_PlaytimeWarning_Body_Plural: string;

  Notification_FamilyGroup_PlaytimeWarning_Title: string;

  Notification_FamilySharing_StoppedSharedGame: string;

  Notification_FamilySharing_StopPlaying: string;

  Notification_FamilySharing_Title: string;

  Notification_FamilySharingAuthorization_Authorized: string;

  Notification_FamilySharingAuthorization_Deuthorized: string;

  Notification_FamilySharingAuthorization_LibraryAvailable: string;

  Notification_FamilySharingAuthorization_StopPlaying: string;

  Notification_FriendInGame_Body: string;

  Notification_FriendInGame_Body_Short: string;

  Notification_FriendInGame_Body_ShortToast: string;

  Notification_FriendInviteRollup_Body: string;

  Notification_FriendInviteRollup_Title: string;

  Notification_FriendMessage_Title: string;

  Notification_FriendOnline_Body: string;

  Notification_FriendOnline_Body_DesktopToast: string;

  Notification_FriendOnline_Body_Short: string;

  Notification_FriendOnline_Online_Body_DesktopToast: string;

  Notification_FriendStatus_Title: string;

  Notification_GiftReceived_Body: string;

  Notification_GiftReceived_Description: string;

  Notification_GiftReceived_Title: string;

  Notification_GRE_Body: string;

  Notification_GRE_Body_DiskSpace: string;

  Notification_GRE_Body_Short: string;

  Notification_GRE_Title: string;

  Notification_GroupMessage_Title: string;

  Notification_GRUM_Body: string;

  Notification_GRUM_Title: string;

  Notification_HardwareSurveyPending_Body: string;

  Notification_HardwareSurveyPending_Title: string;

  Notification_IncomingVoiceChat: string;

  Notification_InstantClip_Body: string;

  Notification_InstantClip_Title: string;

  Notification_NewOfflineMessagesPinned_Body: string;

  Notification_NewOfflineMessagesPinned_Body_Plural: string;

  Notification_Overlay_ShiftTab: string;

  Notification_OverlayGeneric: string;

  Notification_OverlaySplashScreen_Friends: string;

  Notification_OverlaySplashScreen_Public: string;

  Notification_RecordingStarted_Body: string;

  Notification_RecordingStarted_Title: string;

  Notification_RecordingStopped_Body: string;

  Notification_RecordingStopped_Title: string;

  Notification_RemoteClientConnected: string;

  Notification_RemoteClientDisconnected: string;

  Notification_RemoteClientStartStream: string;

  Notification_RemotePlay_Title: string;

  Notification_SteamDeckRewards_Body: string;

  Notification_SteamDeckRewards_Title: string;

  Notification_StreamingClientConnected: string;

  Notification_StreamingClientDisconnected: string;

  Notification_SystemUpdateAvailable_Body: string;

  Notification_SystemUpdateAvailable_Body_Short: string;

  Notification_SystemUpdateAvailable_Title: string;

  Notification_SystemUpdateRestart_Body: string;

  Notification_SystemUpdateRestart_Body_Short: string;

  Notification_SystemUpdateRestart_Title: string;

  Notification_TimedTrial_CloseNow: string;

  Notification_TimedTrial_CloseSoon: string;

  Notification_TimedTrial_CloseSoon_Plural: string;

  Notification_TimedTrial_EndsSoon: string;

  Notification_TimedTrial_Enjoy: string;

  Notification_TimedTrial_Offline: string;

  Notification_TimedTrial_Over: string;

  NotificationsSettings_Column_Notification: string;

  NotificationsSettings_Column_Sound: string;

  NotificationsSettings_Description: string;

  NotificationsSettings_Description_Always: string;

  NotificationsSettings_DisableAll: string;

  NotificationsSettings_Heading_Friends: string;

  NotificationsSettings_Heading_FriendsDescription: string;

  NotificationsSettings_Heading_FriendsDescription_InGame: string;

  NotificationsSettings_Heading_Notifications: string;

  NotificationsSettings_Heading_PlatformNotif: string;

  NotificationsSettings_Heading_PlatformNotifDesc: string;

  NotificationsSettings_HideInGame: string;

  NotificationsSettings_Notification_ChatMessage: string;

  NotificationsSettings_Notification_ChatRoomNotification: string;

  NotificationsSettings_Notification_FriendJoins: string;

  NotificationsSettings_Notification_FriendOnline: string;

  NotificationsSettings_Notification_GroupEvent: string;

  NotificationsSettings_PlaySoundOnToast: string;

  NotificationsSettings_ShowAlways: string;

  NotificationsSettings_ShowNever: string;

  NotificationsSettings_ShowNotifications: string;

  NotificationsSettings_ShowWhenNotInGame: string;

  OOBE_KeepScreenReaderOn_Header: string;

  OOBE_KeepScreenReaderOn_No: string;

  OOBE_KeepScreenReaderOn_Yes: string;

  OOBE_PairIbex_PairToMachine_Success1: string;

  OOBE_PairIbex_PairToMachine_Success2: string;

  OOBE_PairIbex_PairToPuck_Success1: string;

  OOBE_PairIbex_SuccessFooter: string;

  OOBE_PairIbex_Wired_Failure1: string;

  OOBE_PairIbex_Wired_Failure2: string;

  OOBE_PairIbex_WiredPairToMachine_Action1: string;

  OOBE_PairIbex_WiredPairToMachine_Action2: string;

  OOBE_PairIbex_WiredPairToPuck_Action1: string;

  OOBE_Plug_In_Controller_Alt_Text: string;

  OOBE_Updates_TimeRemaining: string;

  OOBE_Updates_TimeRemaining_Unknown: string;

  OptionsMenuVR: string;

  OverflowBox_Action_Collapse: string;

  OverflowBox_Action_Expand: string;

  OverflowBox_More: string;

  Overlay_AsyncNotificationsRequestedDialog_Allow: string;

  Overlay_AsyncNotificationsRequestedDialog_Desc: string;

  Overlay_AsyncNotificationsRequestedDialog_Disallow: string;

  Overlay_AsyncNotificationsRequestedDialog_Title: string;

  Overlay_Browser_ReturnToGame: string;

  Overlay_ClipHint_1: string;

  Overlay_ClipHint_2: string;

  Overlay_ClipHint_2_Link: string;

  Overlay_ClipHint_Title: string;

  Overlay_ClipHint_View: string;

  Overlay_FriendAcceptRequest_Body: string;

  Overlay_FriendAcceptRequest_Title: string;

  Overlay_FriendAdd_Body: string;

  Overlay_FriendAdd_Title: string;

  Overlay_FriendIgnoreRequest_Body: string;

  Overlay_FriendIgnoreRequest_Title: string;

  Overlay_FriendInviteToCurrentGame_Body: string;

  Overlay_FriendInviteToCurrentGame_Title: string;

  Overlay_FriendInviteToGame_Accept: string;

  Overlay_FriendInviteToGame_Body: string;

  Overlay_FriendInviteToGame_Decline: string;

  Overlay_FriendInviteToGame_Favorites: string;

  Overlay_FriendInviteToGame_Filter: string;

  Overlay_FriendInviteToGame_Invite: string;

  Overlay_FriendInviteToGame_Invited: string;

  Overlay_FriendInviteToGame_OnlineFriends: string;

  Overlay_FriendInviteToGame_ReturnToGame: string;

  Overlay_FriendInviteToGame_Title: string;

  Overlay_FriendInviteToGame_VoiceChat: string;

  Overlay_FriendInviteToRemotePlayTogetherCurrentGame_Body: string;

  Overlay_FriendInviteToRemotePlayTogetherCurrentGame_Title: string;

  Overlay_FriendRemove_Body: string;

  Overlay_FriendRemove_Title: string;

  Overlay_MicroTxnAuth_Body: string;

  Overlay_MicroTxnAuth_Title: string;

  Overlay_MicroTxnCancelDlgCancel: string;

  Overlay_MicroTxnCancelDlgOK: string;

  Overlay_MicroTxnCancelDlgText: string;

  Overlay_MicroTxnCancelDlgTitle: string;

  OverlayNetworkStatus_ConnectedToGameserverIn: string;

  OverlayNetworkStatus_IPShared_Friends: string;

  OverlayNetworkStatus_IPShared_LearnMoreTooltip: string;

  OverlayNetworkStatus_IPShared_No: string;

  OverlayNetworkStatus_IPShared_NoLearnMoreTooltip: string;

  OverlayNetworkStatus_IPShared_Yes: string;

  OverlayNetworkStatus_LossTooltip: string;

  OverlayNetworkStatus_NoActiveConnections: string;

  OverlayNetworkStatus_NumActiveConnections: string;

  OverlayNetworkStatus_Ping: string;

  OverlayNetworkStatus_PingImproved: string;

  OverlayNetworkStatus_PingImprovedTooltip: string;

  OverlayNetworkStatus_PingTooltip: string;

  OverlayNetworkStatus_ServerProtectedBySDR: string;

  OverlayNetworkStatus_ViaRelay: string;

  PairControllerScreen_ControllerTypeExplainer: string;

  PairControllerScreen_Generic_Text1: string;

  PairControllerScreen_GenericExplainer: string;

  PairControllerScreen_Ibex_Text1: string;

  PairControllerScreen_Ibex_Text2: string;

  PairControllerScreen_Pair: string;

  PairControllerScreen_Skip: string;

  PairControllerScreen_Success: string;

  Parental_PlaytimeRemaining: string;

  ParentalBlockedSettings_ChildAccount: string;

  ParentalBlockedSettings_ChildAccount_Always: string;

  ParentalBlockedSettings_PIN: string;

  PendingGifts_Title: string;

  PhaseList_AllContentFilteredOut: string;

  PhaseList_FilterOverflowTooltip: string;

  PhaseList_NoResults: string;

  PhaseList_NowPlaying: string;

  PhaseList_PhaseGroupAndName: string;

  PhaseList_Recording_SaveAsClip: string;

  PhaseList_SearchPlaceholder: string;

  PhaseList_SessionFilterTag: string;

  PhaseList_ShowAllLabel: string;

  PhaseList_ShowAllN: string;

  PhaseList_ShowEmptyLabel: string;

  PlatformPerformanceProfile_Label: string;

  PlayersDialog_AddFriend: string;

  PlayersDialog_Description: string;

  PlayersDialog_Empty: string;

  PlayersDialog_Game: string;

  PlayersDialog_LastPlayed: string;

  PlayersDialog_Now: string;

  PlayersDialog_Profile: string;

  PlayersDialog_Status_Blocked: string;

  PlayersDialog_Status_Friends: string;

  PlayersDialog_Status_Invited: string;

  PlayersDialog_Title: string;

  PlayNext_ClearIgnoredApps: string;

  PlayNext_UnhideSuggestion: string;

  Playtime_Hours: string;

  Playtime_Minutes: string;

  Playtime_Recently: string;

  Playtime_Total: string;

  Playtime_Total_Hours: string;

  Playtime_Total_Minutes: string;

  Playtime_TwoWeeks_Hours: string;

  Playtime_TwoWeeks_Minutes: string;

  PlusNMore: string;

  Power: string;

  PowerChordMenu_ChordScreen: string;

  PowerChordMenu_Shutdown: string;

  PowerChordMenu_Suspend: string;

  PowerChordMenu_Title: string;

  PowerChordMenu_TurnOffController: string;

  PrePurchase_Install_Desc: string;

  PrePurchase_Install_Title: string;

  PrePurchase_PlayNow_Desc: string;

  PrePurchase_PlayNow_Title: string;

  PrePurchase_Preload_Desc: string;

  PrePurchase_Preload_Title: string;

  PrePurchase_PreloadComplete_Desc: string;

  PrePurchase_PreloadComplete_Title: string;

  Privacy_FriendsOnly: string;

  Privacy_Private: string;

  Privacy_Public: string;

  Privacy_Unlisted: string;

  ProgressBar_ValueUnknown: string;

  QuickAccess_ReorderControllers_Button: string;

  QuickAccess_ReorderControllers_ControllerOrder: string;

  QuickAccess_ReorderControllers_Identify: string;

  QuickAccess_ReorderControllers_OptedOut: string;

  QuickAccess_ReorderControllers_Reorder: string;

  QuickAccess_ReorderControllers_StopReorder: string;

  QuickAccess_Tab_Bluetooth_AddDevice: string;

  QuickAccess_Tab_Bluetooth_Available_To_Pair: string;

  QuickAccess_Tab_Bluetooth_CancelPair: string;

  QuickAccess_Tab_Bluetooth_ComingSoon1: string;

  QuickAccess_Tab_Bluetooth_ComingSoon2: string;

  QuickAccess_Tab_Bluetooth_Connect: string;

  QuickAccess_Tab_Bluetooth_ConnectLabel: string;

  QuickAccess_Tab_Bluetooth_Disconnect: string;

  QuickAccess_Tab_Bluetooth_DisconnectLabel: string;

  QuickAccess_Tab_Bluetooth_Forget: string;

  QuickAccess_Tab_Bluetooth_Info: string;

  QuickAccess_Tab_Bluetooth_No_Devices_Found: string;

  QuickAccess_Tab_Bluetooth_Not_Connected: string;

  QuickAccess_Tab_Bluetooth_Options: string;

  QuickAccess_Tab_Bluetooth_Pair: string;

  QuickAccess_Tab_Bluetooth_Paired: string;

  QuickAccess_Tab_Bluetooth_Searching: string;

  QuickAccess_Tab_Bluetooth_Section_Devices_NonePaired: string;

  QuickAccess_Tab_Bluetooth_ShowAllDevices: string;

  QuickAccess_Tab_Bluetooth_SomeDisabled: string;

  QuickAccess_Tab_Bluetooth_Title: string;

  QuickAccess_Tab_Bluetooth_ToggleLabel: string;

  QuickAccess_Tab_Bluetooth_Unpair: string;

  QuickAccess_Tab_ControllerSettings_Section_CombinedJoycon: string;

  QuickAccess_Tab_ControllerSettings_Section_Controller_Personalized_Name: string;

  QuickAccess_Tab_ControllerSettings_Section_Device_Grips: string;

  QuickAccess_Tab_ControllerSettings_Section_Device_Haptics: string;

  QuickAccess_Tab_ControllerSettings_Section_Device_Rumble: string;

  QuickAccess_Tab_ControllerSettings_Section_Device_Trackpad: string;

  QuickAccess_Tab_ControllerSettings_Section_Feedback_Title: string;

  QuickAccess_Tab_ControllerSettings_Section_Inputs_Title: string;

  QuickAccess_Tab_Friends_Section_Favorites_Title: string;

  QuickAccess_Tab_Friends_Section_OtherGames_Title: string;

  QuickAccess_Tab_Friends_Title: string;

  QuickAccess_Tab_Groups_Title: string;

  QuickAccess_Tab_Help_HelpSite: string;

  QuickAccess_Tab_Help_ReplayTour: string;

  QuickAccess_Tab_Help_ReportABug: string;

  QuickAccess_Tab_Help_Title: string;

  QuickAccess_Tab_Help_ViewManual: string;

  QuickAccess_Tab_Notifications_BatteryLow: string;

  QuickAccess_Tab_Notifications_LowDiskSpace: string;

  QuickAccess_Tab_Notifications_None: string;

  QuickAccess_Tab_Notifications_Title: string;

  QuickAccess_Tab_Perf_AllowExternalDisplayRefresh: string;

  QuickAccess_Tab_Perf_AppRefreshRate: string;

  QuickAccess_Tab_Perf_AppRefreshRate_Explainer: string;

  QuickAccess_Tab_Perf_AppRefreshRate_FPS: string;

  QuickAccess_Tab_Perf_AppRefreshRate_Hz: string;

  QuickAccess_Tab_Perf_AppRefreshRate_Restricted_Body: string;

  QuickAccess_Tab_Perf_AppRefreshRate_Restricted_Title: string;

  QuickAccess_Tab_Perf_AppRefreshRateEnable: string;

  QuickAccess_Tab_Perf_BatteryCharging: string;

  QuickAccess_Tab_Perf_BatteryConnected: string;

  QuickAccess_Tab_Perf_BatteryFull: string;

  QuickAccess_Tab_Perf_BatteryFullDetails_KnownHardware: string;

  QuickAccess_Tab_Perf_BatteryFullDetails_UnknownHardware: string;

  QuickAccess_Tab_Perf_BatteryFullDetailsTitle: string;

  QuickAccess_Tab_Perf_BatteryTimeRemaining: string;

  QuickAccess_Tab_Perf_CalculatingBatteryLife: string;

  QuickAccess_Tab_Perf_CalculatingChargingTime: string;

  QuickAccess_Tab_Perf_ConnectedSlowDetails_KnownHardware: string;

  QuickAccess_Tab_Perf_ConnectedSlowDetails_UnknownHardware: string;

  QuickAccess_Tab_Perf_ConnectedSlowDetailsTitle: string;

  QuickAccess_Tab_Perf_DefaultProfile: string;

  QuickAccess_Tab_Perf_DefaultSettings: string;

  QuickAccess_Tab_Perf_DisableColorManagement: string;

  QuickAccess_Tab_Perf_DisableFrameLimit: string;

  QuickAccess_Tab_Perf_DisableFrameLimit_Explainer: string;

  QuickAccess_Tab_Perf_DynamicRefreshInSteam: string;

  QuickAccess_Tab_Perf_DynamicRefreshRate: string;

  QuickAccess_Tab_Perf_DynamicRefreshRateDescription: string;

  QuickAccess_Tab_Perf_EnableCompositeDebug: string;

  QuickAccess_Tab_Perf_EnableTearing: string;

  QuickAccess_Tab_Perf_EnableTearing_Explainer: string;

  QuickAccess_Tab_Perf_EnableVRR: string;

  QuickAccess_Tab_Perf_ForceComposite: string;

  QuickAccess_Tab_Perf_FPS_Contrast: string;

  QuickAccess_Tab_Perf_FPS_Corner: string;

  QuickAccess_Tab_Perf_FPS_Corner_BottomLeft: string;

  QuickAccess_Tab_Perf_FPS_Corner_BottomRight: string;

  QuickAccess_Tab_Perf_FPS_Corner_None: string;

  QuickAccess_Tab_Perf_FPS_Corner_TopLeft: string;

  QuickAccess_Tab_Perf_FPS_Corner_TopRight: string;

  QuickAccess_Tab_Perf_FrameLimit: string;

  QuickAccess_Tab_Perf_FrameLimit_Explainer: string;

  QuickAccess_Tab_Perf_FSR: string;

  QuickAccess_Tab_Perf_FSRDescription: string;

  QuickAccess_Tab_Perf_GameProfileExplainer_Description: string;

  QuickAccess_Tab_Perf_GameProfileExplainer_Dismiss: string;

  QuickAccess_Tab_Perf_GameProfileExplainer_Title: string;

  QuickAccess_Tab_Perf_GameProfileInfoBasic: string;

  QuickAccess_Tab_Perf_GamescopeRefreshRate: string;

  QuickAccess_Tab_Perf_GamescopeRefreshRate_Explainer: string;

  QuickAccess_Tab_Perf_GamescopeRefreshRate_Hz: string;

  QuickAccess_Tab_Perf_GameSpecificProfile: string;

  QuickAccess_Tab_Perf_GameSpecificSettings: string;

  QuickAccess_Tab_Perf_GPU_Performance_Level: string;

  QuickAccess_Tab_Perf_GPU_Performance_Manual_Clock: string;

  QuickAccess_Tab_Perf_GPUClockControl: string;

  QuickAccess_Tab_Perf_GPUClockControlDescription: string;

  QuickAccess_Tab_Perf_GPUClockManual: string;

  QuickAccess_Tab_Perf_GPUClockManual_Explainer: string;

  QuickAccess_Tab_Perf_GPUClockManualDescription: string;

  QuickAccess_Tab_Perf_GPUClockUnits: string;

  QuickAccess_Tab_Perf_LimitFrameRate: string;

  QuickAccess_Tab_Perf_LimitFrameRate_Explainer: string;

  QuickAccess_Tab_Perf_LimitFrameRate_Off: string;

  QuickAccess_Tab_Perf_LimitFrameRate_Warning_WIP: string;

  QuickAccess_Tab_Perf_LimitFrameRateEnabled: string;

  QuickAccess_Tab_Perf_LimitFrameRateEnabled_30: string;

  QuickAccess_Tab_Perf_LimitRefreshRate: string;

  QuickAccess_Tab_Perf_LimitRefreshRateDescription: string;

  QuickAccess_Tab_Perf_LowLatency: string;

  QuickAccess_Tab_Perf_Overlay: string;

  QuickAccess_Tab_Perf_Overlay_Explainer: string;

  QuickAccess_Tab_Perf_Overlay_Level: string;

  QuickAccess_Tab_Perf_Overlay_Level_OFF: string;

  QuickAccess_Tab_Perf_PerformanceSettings: string;

  QuickAccess_Tab_Perf_PerfOverlayOverSteam: string;

  QuickAccess_Tab_Perf_PerfOverlayOverVR: string;

  QuickAccess_Tab_Perf_ProjectedBatteryLife: string;

  QuickAccess_Tab_Perf_ProjectedChargingTime: string;

  QuickAccess_Tab_Perf_RefreshRate: string;

  QuickAccess_Tab_Perf_RefreshRate_Explainer: string;

  QuickAccess_Tab_Perf_ResetToDefault: string;

  QuickAccess_Tab_Perf_SaveGameProfile: string;

  QuickAccess_Tab_Perf_ScalingFilter: string;

  QuickAccess_Tab_Perf_ScalingFilter_Explainer_Intro: string;

  QuickAccess_Tab_Perf_ScalingFilter_Integer: string;

  QuickAccess_Tab_Perf_ScalingFilter_Linear: string;

  QuickAccess_Tab_Perf_ScalingFilter_Linear_Explainer: string;

  QuickAccess_Tab_Perf_ScalingFilter_Nearest: string;

  QuickAccess_Tab_Perf_ScalingFilter_Nearest_Explainer: string;

  QuickAccess_Tab_Perf_ScalingFilter_Sharp: string;

  QuickAccess_Tab_Perf_ScalingFilter_Sharp_Explainer: string;

  QuickAccess_Tab_Perf_ScalingFilter_Sharpness_Explainer: string;

  QuickAccess_Tab_Perf_ScalingScaler: string;

  QuickAccess_Tab_Perf_ScalingScaler_Auto: string;

  QuickAccess_Tab_Perf_ScalingScaler_Auto_Explainer: string;

  QuickAccess_Tab_Perf_ScalingScaler_Explainer_Intro: string;

  QuickAccess_Tab_Perf_ScalingScaler_Fill: string;

  QuickAccess_Tab_Perf_ScalingScaler_Fill_Explainer: string;

  QuickAccess_Tab_Perf_ScalingScaler_Fit: string;

  QuickAccess_Tab_Perf_ScalingScaler_Fit_Explainer: string;

  QuickAccess_Tab_Perf_ScalingScaler_Integer: string;

  QuickAccess_Tab_Perf_ScalingScaler_Integer_Explainer: string;

  QuickAccess_Tab_Perf_ScalingScaler_Stretch: string;

  QuickAccess_Tab_Perf_ScalingScaler_Stretch_Explainer: string;

  QuickAccess_Tab_Perf_Section_Diagnostics_Title: string;

  QuickAccess_Tab_Perf_Section_Settings_Title: string;

  QuickAccess_Tab_Perf_Sharpness: string;

  QuickAccess_Tab_Perf_TDPLimit: string;

  QuickAccess_Tab_Perf_TDPLimit_Explainer_KnownHardware: string;

  QuickAccess_Tab_Perf_TDPLimit_Explainer_UnknownHardware: string;

  QuickAccess_Tab_Perf_TDPLimitEnabled: string;

  QuickAccess_Tab_Perf_TDPLimitEnabledDescription: string;

  QuickAccess_Tab_Perf_TDPLimitUnits: string;

  QuickAccess_Tab_Perf_Title: string;

  QuickAccess_Tab_Perf_ToggleGameProfile: string;

  QuickAccess_Tab_Perf_ToggleGameSettings: string;

  QuickAccess_Tab_Perf_VariableResolution: string;

  QuickAccess_Tab_Perf_VariableResolution_Explainer: string;

  QuickAccess_Tab_Perf_VariableResolutionDescription: string;

  QuickAccess_Tab_Perf_VRR_Capable: string;

  QuickAccess_Tab_Perf_VRR_Disabled: string;

  QuickAccess_Tab_Perf_VRR_Enabled: string;

  QuickAccess_Tab_Perf_VRR_NotCapable: string;

  QuickAccess_Tab_Settings_Section_Audio_Title: string;

  QuickAccess_Tab_Settings_Section_Brightness_Title: string;

  QuickAccess_Tab_Settings_Section_Controller_Title: string;

  QuickAccess_Tab_Settings_Section_Display_Title: string;

  QuickAccess_Tab_Settings_Section_Other_Title: string;

  QuickAccess_Tab_Settings_Section_Shortcuts_AirplaneMode: string;

  QuickAccess_Tab_Settings_Section_Shortcuts_GLComposer: string;

  QuickAccess_Tab_Settings_Section_Shortcuts_NightMode: string;

  QuickAccess_Tab_Settings_Section_Shortcuts_Wifi: string;

  QuickAccess_Tab_Settings_Section_VoiceChatAudio_Title: string;

  QuickAccess_Tab_Settings_Title: string;

  QuickAccess_Tab_Soundtrack_Title: string;

  Quit_Restart: string;

  Quit_Shutdown: string;

  Quit_Sleep: string;

  Recommended_NewAndTrending_Title: string;

  Recommended_NewReleases_Title: string;

  Recommended_TopSellers_Title: string;

  RecordingIntro_Abilities: string;

  RecordingIntro_Action_GetStarted: string;

  RecordingIntro_Action_LearnMore: string;

  RecordingIntro_AutoRecordHint: string;

  RecordingIntro_FeatureName: string;

  RecordingIntro_GetStartedQuestion: string;

  RecordingIntro_Later: string;

  RecordingIntro_Short_Clip: string;

  RecordingIntro_Short_Clip_Slug: string;

  RecordingIntro_Short_FeatureName: string;

  RecordingIntro_Short_Plus: string;

  RecordingIntro_Short_Plus_Slug: string;

  RecordingIntro_Short_Record: string;

  RecordingIntro_Short_Record_Slug: string;

  RecordingIntro_Short_Replay: string;

  RecordingIntro_Short_Replay_Slug: string;

  RecordingIntro_Short_Share: string;

  RecordingIntro_Short_Share_Slug: string;

  RecordingIntro_Short_Tagline: string;

  RecordingOverlayHint_Desc: string;

  RecordingOverlayHint_GetStarted: string;

  RecordingOverlayHint_New: string;

  RecordingTour_Clipping_Content_1: string;

  RecordingTour_Clipping_Content_2: string;

  RecordingTour_Clipping_Title: string;

  RecordingTour_Timeline_Content_1: string;

  RecordingTour_Timeline_Content_2: string;

  RecordingTour_Timeline_Title: string;

  RemoteDeviceAuthorization_Invalid: string;

  RemoteDeviceAuthorization_Text: string;

  RemoteDeviceAuthorization_TextRemotePlayAnywhere: string;

  RemoteDeviceAuthorization_Title: string;

  RemoteDevicePairingPIN_Text: string;

  RemoteDevicePairingPIN_Title: string;

  RemoteDevicePIN_Error: string;

  RemoteDevicePIN_Text: string;

  RemoteDevicePIN_Title: string;

  RemoteDeviceUnpair_Text: string;

  RemoteDeviceUnpair_Title: string;

  RemotePlay_Explainer_Description: string;

  RemotePlay_Explainer_Description_Phone: string;

  RemotePlay_Explainer_Description_Tablet: string;

  RemotePlay_Explainer_Description_Three: string;

  RemotePlay_Explainer_Description_TV: string;

  RemotePlay_Explainer_Description_Two: string;

  RemotePlay_Explainer_GetApp: string;

  RemotePlay_Explainer_GetApp_Desc: string;

  RemotePlay_Explainer_HowWorks_1: string;

  RemotePlay_Explainer_HowWorks_2: string;

  RemotePlay_Explainer_HowWorks_3: string;

  RemotePlay_Explainer_HowWorks_Title: string;

  RemotePlay_Explainer_Title: string;

  RemotePlay_InstallAudioCaptureDriver_Text: string;

  RemotePlay_InstallAudioCaptureDriver_Title: string;

  RemotePlay_InstallGamepadInputDriver_RestartNotice: string;

  RemotePlay_InstallGamepadInputDriver_Text: string;

  RemotePlay_InstallGamepadInputDriver_Title: string;

  RemotePlay_LearnMore_Button: string;

  RemotePlay_PairWifiAPResult_Canceled: string;

  RemotePlay_PairWifiAPResult_Fail: string;

  RemotePlay_PairWifiAPResult_NetworkError: string;

  RemotePlay_PairWifiAPResult_NoDonglePresent: string;

  RemotePlay_PairWifiAPResult_OK: string;

  RemotePlay_PairWifiAPResult_Timeout: string;

  RemotePlay_PairWifiAPResult_Title: string;

  RemotePlay_PairWifiAPResult_Unauthorized: string;

  RemotePlay_Tip_Callout: string;

  RemotePlay_Tip_Text: string;

  RemotePlay_Tip_Title: string;

  RemoveFreeApp_Description: string;

  RemoveFreeApp_Description_MasterSub: string;

  RemoveFreeApp_Error: string;

  RemoveFreeApp_Question: string;

  RemoveFreeApp_Remove: string;

  RemoveFreeApp_Removing: string;

  RemoveFreeApp_Title: string;

  RemoveProtonFilesModal_Description: string;

  RemoveProtonFilesModal_Title: string;

  ReportItem_Description: string;

  ReportItem_Description_Line2: string;

  ReportItem_DMCA: string;

  ReportItem_DMCA_LinkText: string;

  ReportItem_Error: string;

  ReportItem_SubmitReport: string;

  ReportItem_Title: string;

  Restart: string;

  RestartDevice: string;

  Restarting: string;

  RestartingSteam: string;

  RestartSteam: string;

  RestartSteamVR: string;

  RestoreBackup_ChooseDirectory: string;

  RestoreBackup_GameFound: string;

  RestoreBackup_Info: string;

  RestoreBackup_PickedDirectory: string;

  RestoreBackup_Start: string;

  RestoreBackup_Title: string;

  Resuming: string;

  ScreenshotManager_UnknownApp: string;

  ScreenshotUploader_Action_Upload: string;

  ScreenshotUploader_Action_ViewOnline: string;

  ScreenshotUploader_Action_ViewOnProfile: string;

  ScreenshotUploader_CaptionField_Placeholder: string;

  ScreenshotUploader_CloudStorageImpact: string;

  ScreenshotUploader_ConfirmDelete_Description: string;

  ScreenshotUploader_ConfirmDelete_Description_Plural: string;

  ScreenshotUploader_ConfirmDelete_Title: string;

  ScreenshotUploader_ConfirmDelete_Title_Plural: string;

  ScreenshotUploader_CopyURL: string;

  ScreenshotUploader_DateTaken: string;

  ScreenshotUploader_DateUploaded: string;

  ScreenshotUploader_DeleteAllData: string;

  ScreenshotUploader_DeleteLocalData: string;

  ScreenshotUploader_DeleteLocalData_Plural: string;

  ScreenshotUploader_DeleteLocalOnlyData: string;

  ScreenshotUploader_DeleteLocalOnlyData_Plural: string;

  ScreenshotUploader_DeleteRemoteDataNote: string;

  ScreenshotUploader_DeletingMultiple: string;

  ScreenshotUploader_DeletingOne: string;

  ScreenshotUploader_DeselectAll: string;

  ScreenshotUploader_Explainer_AccessAnywhere: string;

  ScreenshotUploader_Explainer_Header: string;

  ScreenshotUploader_Explainer_HowToTake: string;

  ScreenshotUploader_Explainer_Modifications: string;

  ScreenshotUploader_Explainer_ViewOnline: string;

  ScreenshotUploader_FailedToLoadScreenshot: string;

  ScreenshotUploader_Heading: string;

  ScreenshotUploader_Multiselect_Count_Plural: string;

  ScreenshotUploader_Multiselect_SkippingAll: string;

  ScreenshotUploader_Multiselect_SkippingAlreadyUploaded: string;

  ScreenshotUploader_Multiselect_SkippingAlreadyUploaded_Plural: string;

  ScreenshotUploader_RemoteOnly_Description: string;

  ScreenshotUploader_RemoteOnly_Description_Plural: string;

  ScreenshotUploader_RemoteOnly_Message: string;

  ScreenshotUploader_RemoteOnly_Message_Plural: string;

  ScreenshotUploader_SaveImage: string;

  ScreenshotUploader_Screenshots: string;

  ScreenshotUploader_Search_NoMatches: string;

  ScreenshotUploader_SelectAll: string;

  ScreenshotUploader_Selection_MostRecent: string;

  ScreenshotUploader_Selection_Shortcut: string;

  ScreenshotUploader_Settings: string;

  ScreenshotUploader_ShowOnDisk: string;

  ScreenshotUploader_SpoilerFieldLabel: string;

  ScreenshotUploader_UploadingMultiple: string;

  ScreenshotUploader_UploadingOne: string;

  ScreenshotUploader_View_Grid: string;

  ScreenshotUploader_View_List: string;

  ScreenshotUploader_Visibility_FriendsOnly: string;

  ScreenshotUploader_Visibility_FriendsOnly_Explanation: string;

  ScreenshotUploader_Visibility_Private: string;

  ScreenshotUploader_Visibility_Private_Explanation: string;

  ScreenshotUploader_Visibility_Public: string;

  ScreenshotUploader_Visibility_Public_Explanation: string;

  ScreenshotUploader_Visibility_Unlisted: string;

  ScreenshotUploader_Visibility_Unlisted_Explanation: string;

  ScreenshotUploader_VisibilityFieldLabel: string;

  SDCard_Format_State_Finalizing: string;

  SDCard_Format_State_Formatting: string;

  SDCard_Format_State_Invalid: string;

  SDCard_Format_State_Rescuing: string;

  SDCard_Format_State_Starting: string;

  SDCard_Format_State_Testing: string;

  Search_NoResults: string;

  Search_Results_Header_All_With_Count: string;

  Search_Results_Header_Friends_With_Count: string;

  Search_Results_Header_OwnApps_With_Count: string;

  Search_Results_Header_StoreApps_With_Count: string;

  Search_Results_Header_Tools_With_Count: string;

  SearchEnterKeyLabel: string;

  SearchPlaceholder: string;

  SearchResultType_OwnApp: string;

  SearchResultType_StoreApp: string;

  SearchTab_All: string;

  SearchTab_Friends: string;

  SearchTab_Hidden: string;

  SearchTab_Library: string;

  SearchTab_Store: string;

  SearchTab_Tools: string;

  ServerPing_250: string;

  ServerPing_500: string;

  ServerPing_1000: string;

  ServerPing_1500: string;

  ServerPing_3000: string;

  ServerPing_5000: string;

  ServerPing_Auto: string;

  SettingController_HapticSound_0: string;

  SettingController_HapticSound_1: string;

  SettingController_HapticSound_2: string;

  SettingController_HapticSound_3: string;

  SettingController_HapticSound_4: string;

  SettingController_HapticSound_5: string;

  SettingController_HapticSound_6: string;

  SettingController_HapticSound_7: string;

  SettingController_HapticSound_8: string;

  SettingController_HapticSound_9: string;

  SettingController_HapticSound_10: string;

  SettingController_HapticSound_11: string;

  SettingController_HapticSound_12: string;

  SettingController_HapticSound_13: string;

  SettingController_HapticSound_Default: string;

  Settings_Account_AccountName: string;

  Settings_Account_AccountSecurity: string;

  Settings_Account_BackupCodes: string;

  Settings_Account_BackupCodes_Button: string;

  Settings_Account_BackupCodes_Desc: string;

  Settings_Account_ChangeEmailAddress: string;

  Settings_Account_ChangePassword: string;

  Settings_Account_ChangePin: string;

  Settings_Account_ChangePin_Description: string;

  Settings_Account_ClientBeta: string;

  Settings_Account_ClientBeta_Desc: string;

  Settings_Account_ClientBeta_ReportBug: string;

  Settings_Account_Deauthorize: string;

  Settings_Account_Deauthorize_Button: string;

  Settings_Account_Deauthorize_Desc: string;

  Settings_Account_DontSaveCredentials: string;

  Settings_Account_DontSaveCredentials_Desc: string;

  Settings_Account_EmailAddress: string;

  Settings_Account_FriendCode: string;

  Settings_Account_ManagePhoneNumber: string;

  Settings_Account_ManageSteamGuard: string;

  Settings_Account_NewPin: string;

  Settings_Account_PersonaName: string;

  Settings_Account_PhoneNumber: string;

  Settings_Account_RequirePinForSavedCredentials: string;

  Settings_Account_Security_Status_State_0: string;

  Settings_Account_Security_Status_State_1: string;

  Settings_Account_Security_Status_State_1_WithTime: string;

  Settings_Account_Security_Status_State_2: string;

  Settings_Account_Security_Status_State_3: string;

  Settings_Account_Security_Status_State_4: string;

  Settings_Account_Security_Status_TwoFactor: string;

  Settings_Account_Security_Status_TwoFactor_WithTime: string;

  Settings_Account_SetPinButton: string;

  Settings_Account_SteamGuard: string;

  Settings_Account_SteamGuard_LearnMore: string;

  Settings_Account_SteamGuard_Status: string;

  Settings_Account_VAC_HasBans: string;

  Settings_Account_VAC_LearnMore: string;

  Settings_Account_VAC_NoBans: string;

  Settings_Account_VAC_Status: string;

  Settings_Account_ViewProfile: string;

  Settings_Battery_ChargeLimitDevMode: string;

  Settings_Battery_ChargeLimitEnable: string;

  Settings_Battery_ChargeLimitValue: string;

  Settings_Battery_Percentage: string;

  Settings_Battery_Percentage_Desc: string;

  Settings_Beta_NeedsRestart: string;

  Settings_Beta_None: string;

  Settings_Beta_OSUpdateChannel: string;

  Settings_Beta_Participation: string;

  Settings_Beta_Restart: string;

  Settings_Beta_SteamUpdateChannel: string;

  Settings_BetaReset: string;

  Settings_BetaReset_Button: string;

  Settings_BetaReset_Description: string;

  Settings_BetaReset_Restart: string;

  Settings_Bluetooth_AllowWake_KnownHardware: string;

  Settings_Bluetooth_AllowWake_UnknownHardware: string;

  Settings_Bluetooth_Connect: string;

  Settings_Bluetooth_Connected: string;

  Settings_Bluetooth_Devices: string;

  Settings_Bluetooth_Enable: string;

  Settings_Bluetooth_EnableDiscovery: string;

  Settings_Bluetooth_NoDevicesFound: string;

  Settings_Bluetooth_NotConnected: string;

  Settings_Bluetooth_NotPaired: string;

  Settings_Bluetooth_Paired: string;

  Settings_Bluetooth_PairedStatus: string;

  Settings_Bluetooth_SettingsAction: string;

  Settings_Bluetooth_Trusted: string;

  Settings_Bluetooth_XboxIssue_Desc: string;

  Settings_Bluetooth_XboxIssue_Title: string;

  Settings_Broadcast_AlwaysShowLive: string;

  Settings_Broadcast_Help: string;

  Settings_Broadcast_HelpLink: string;

  Settings_Broadcast_Manage: string;

  Settings_Broadcast_MaxBitRate: string;

  Settings_Broadcast_OptimizeEncoding: string;

  Settings_Broadcast_Privacy: string;

  Settings_Broadcast_RecordAllAudio: string;

  Settings_Broadcast_RecordAllVideo: string;

  Settings_Broadcast_RecordMicrophone: string;

  Settings_Broadcast_ShowChat: string;

  Settings_Broadcast_ShowUploadStats: string;

  Settings_Broadcast_Status: string;

  Settings_Broadcast_StatusViewers: string;

  Settings_Broadcast_StatusViewers_Plural: string;

  Settings_Broadcast_VideoDimensions: string;

  Settings_CEC_Enabled: string;

  Settings_CEC_Header: string;

  Settings_CEC_WakeOnResume: string;

  Settings_CEFDisableGPUBlocklist: string;

  Settings_CEFDisableGPUBlocklist_Description: string;

  Settings_Color_Header: string;

  Settings_ColorFilter: string;

  Settings_ColorFilter_ColorBlindness_Deut: string;

  Settings_ColorFilter_ColorBlindness_Deut_Explainer: string;

  Settings_ColorFilter_ColorBlindness_Prot: string;

  Settings_ColorFilter_ColorBlindness_Prot_Explainer: string;

  Settings_ColorFilter_ColorBlindness_Trit: string;

  Settings_ColorFilter_ColorBlindness_Trit_Explainer: string;

  Settings_ColorFilter_Default: string;

  Settings_ColorFilter_Description: string;

  Settings_ColorFilter_Explainer_Intro: string;

  Settings_ColorFilter_Grayscale: string;

  Settings_ColorFilter_Grayscale_Explainer: string;

  Settings_ColorFilter_InvertBrightness: string;

  Settings_ColorFilter_InvertBrightness_Explainer: string;

  Settings_ColorFilter_InvertColors: string;

  Settings_ColorFilter_InvertColors_Explainer: string;

  Settings_Connect_VRDongle_Direct: string;

  Settings_Connect_VRDongle_NoHosts: string;

  Settings_Controller_BaseConfigurations: string;

  Settings_Controller_BindInput: string;

  Settings_Controller_BindInput_Click: string;

  Settings_Controller_Calibration: string;

  Settings_Controller_Calibration_Click: string;

  Settings_Controller_Calibration_DefaultClick: string;

  Settings_Controller_Calibration_HapticsWarning: string;

  Settings_Controller_Calibration_HapticTest: string;

  Settings_Controller_Calibration_LEDBrightness: string;

  Settings_Controller_Calibration_LEDColor: string;

  Settings_Controller_Calibration_LEDSaturation: string;

  Settings_Controller_Calibration_LeftStickTouchDisablesLeftTrackPad: string;

  Settings_Controller_Calibration_LHapticStrength: string;

  Settings_Controller_Calibration_LPadPressure: string;

  Settings_Controller_Calibration_LStickDeadzone: string;

  Settings_Controller_Calibration_PressureInput: string;

  Settings_Controller_Calibration_PressureOutput: string;

  Settings_Controller_Calibration_RHapticStrength: string;

  Settings_Controller_Calibration_RightStickTouchDisablesRightTrackPad: string;

  Settings_Controller_Calibration_RPadPressure: string;

  Settings_Controller_Calibration_RStickDeadzone: string;

  Settings_Controller_CancelBindInput: string;

  Settings_Controller_ChordConfig: string;

  Settings_Controller_ChordConfigEnable: string;

  Settings_Controller_CombinedJoycon: string;

  Settings_Controller_Config_Edit: string;

  Settings_Controller_Config_Edit_Name: string;

  Settings_Controller_CopyToClipboard: string;

  Settings_Controller_DesktopConfig: string;

  Settings_Controller_GenericGamepadSupport: string;

  Settings_Controller_GuideButtonFocus: string;

  Settings_Controller_NoControllers: string;

  Settings_Controller_PasteFromClipboard: string;

  Settings_Controller_PS4Support: string;

  Settings_Controller_ResetInput: string;

  Settings_Controller_SCPairing: string;

  Settings_Controller_SCPairing_Accept: string;

  Settings_Controller_SCPairing_Enabled: string;

  Settings_Controller_SCPairing_Fail: string;

  Settings_Controller_SCPairing_Ibex: string;

  Settings_Controller_SCPairing_NoController: string;

  Settings_Controller_SCPairing_Ok: string;

  Settings_Controller_SCPairing_Pair: string;

  Settings_Controller_SCPairing_Success: string;

  Settings_Controller_SCPairing_Title: string;

  Settings_Controller_Settings: string;

  Settings_Controller_SwitchLayout: string;

  Settings_Controller_SwitchLayoutDesc: string;

  Settings_Controller_SwitchSupport: string;

  Settings_Controller_TestInput: string;

  Settings_Controller_TestInput_Click: string;

  Settings_Controller_TestRumble: string;

  Settings_Controller_TurnOffOnExit: string;

  Settings_Controller_UniversalGlyphs: string;

  Settings_Controller_UniversalGlyphsDesc: string;

  Settings_Controller_XboxSupport: string;

  Settings_ControllerCalibration_Auto_Calibration_Progress: string;

  Settings_ControllerCalibration_Calibrate: string;

  Settings_ControllerCalibration_Calibrate_Label: string;

  Settings_ControllerCalibration_CalibrateGyro_Calibrating: string;

  Settings_ControllerCalibration_CalibrateGyro_Desc: string;

  Settings_ControllerCalibration_CalibrateGyro_Done: string;

  Settings_ControllerCalibration_CalibrateGyro_Failed: string;

  Settings_ControllerCalibration_CalibrateGyro_Header: string;

  Settings_ControllerCalibration_CalibrateGyro_Header_Calibrating: string;

  Settings_ControllerCalibration_CalibrateGyro_Header_Done: string;

  Settings_ControllerCalibration_CalibrateGyroWizard_AutoCalibrationDescription: string;

  Settings_ControllerCalibration_CalibrateGyroWizard_Complete_Desc: string;

  Settings_ControllerCalibration_CalibrateGyroWizard_Complete_Title: string;

  Settings_ControllerCalibration_CalibrateGyroWizard_Failed_Desc: string;

  Settings_ControllerCalibration_CalibrateGyroWizard_Failed_Title: string;

  Settings_ControllerCalibration_CalibrateGyroWizard_Page1_Desc1: string;

  Settings_ControllerCalibration_CalibrateGyroWizard_Page1_Desc2: string;

  Settings_ControllerCalibration_CalibrateGyroWizard_Page2_CountDown: string;

  Settings_ControllerCalibration_CalibrateGyroWizard_Page2_CountDown_End: string;

  Settings_ControllerCalibration_CalibrateGyroWizard_Page3_Desc: string;

  Settings_ControllerCalibration_CalibrateGyroWizard_Title: string;

  Settings_ControllerCalibration_CalibrateIMU: string;

  Settings_ControllerCalibration_CalibrateJoystick: string;

  Settings_ControllerCalibration_CalibrateTrackpad: string;

  Settings_ControllerCalibration_Calibrating_Drift: string;

  Settings_ControllerCalibration_Calibrating_StationaryTolerances: string;

  Settings_ControllerCalibration_CommitChanges: string;

  Settings_ControllerCalibration_DiscardChanges: string;

  Settings_ControllerCalibration_General: string;

  Settings_ControllerCalibration_Grip_Hysteresis: string;

  Settings_ControllerCalibration_Grip_Hysteresis_Desc: string;

  Settings_ControllerCalibration_Grip_Sensitivity: string;

  Settings_ControllerCalibration_Grip_Sensitivity_Desc: string;

  Settings_ControllerCalibration_Grip_Sensor: string;

  Settings_ControllerCalibration_Grip_Sensor_Desc: string;

  Settings_ControllerCalibration_Grip_Sensor_Title: string;

  Settings_ControllerCalibration_Gyro: string;

  Settings_ControllerCalibration_GyroAndAccelerometerNoise_Desc: string;

  Settings_ControllerCalibration_GyroModePreferences_GyroNaturalSensitivity: string;

  Settings_ControllerCalibration_GyroRotation_Desc: string;

  Settings_ControllerCalibration_HapticsEnable: string;

  Settings_ControllerCalibration_Joystick: string;

  Settings_ControllerCalibration_LEDs: string;

  Settings_ControllerCalibration_LeftGyro: string;

  Settings_ControllerCalibration_LeftJoystick: string;

  Settings_ControllerCalibration_LockOutNavigation: string;

  Settings_ControllerCalibration_OneEuroFilter: string;

  Settings_ControllerCalibration_Outputs: string;

  Settings_ControllerCalibration_OutputsNonDeck: string;

  Settings_ControllerCalibration_PlayerLED: string;

  Settings_ControllerCalibration_PlayerLED_MultipleController: string;

  Settings_ControllerCalibration_PlayerLED_Off: string;

  Settings_ControllerCalibration_PlayerLED_On: string;

  Settings_ControllerCalibration_RightJoystick: string;

  Settings_ControllerCalibration_RumbleEnable: string;

  Settings_ControllerCalibration_Sensors: string;

  Settings_ControllerCalibration_Start: string;

  Settings_ControllerCalibration_StartTestPrompt: string;

  Settings_ControllerCalibration_StartTestPromptTrackpad: string;

  Settings_ControllerCalibration_StopTestPromptTrackpad: string;

  Settings_ControllerCalibration_SWGyroCal: string;

  Settings_ControllerCalibration_Trackpads: string;

  Settings_ControllerCalibration_TrackpadsVsSticks: string;

  Settings_ControllerCalibration_TrackpadsVsSticks_Description: string;

  Settings_ControllerCalibration_TurnOffSound: string;

  Settings_ControllerCalibration_TurnOnSound: string;

  Settings_ControllerCalibration_UnLockOutNavigation: string;

  Settings_ControllerDeviceSupport_AnalogInputs: string;

  Settings_ControllerDeviceSupport_BackButtonInputs: string;

  Settings_ControllerDeviceSupport_FL: string;

  Settings_ControllerDeviceSupport_FR: string;

  Settings_ControllerDeviceSupport_HoldBToExit: string;

  Settings_ControllerDeviceSupport_L4: string;

  Settings_ControllerDeviceSupport_L5: string;

  Settings_ControllerDeviceSupport_LeftBumper: string;

  Settings_ControllerDeviceSupport_LeftJoystick: string;

  Settings_ControllerDeviceSupport_LeftTrackpad: string;

  Settings_ControllerDeviceSupport_LeftTrackpad_Pressure: string;

  Settings_ControllerDeviceSupport_LeftTrigger: string;

  Settings_ControllerDeviceSupport_R4: string;

  Settings_ControllerDeviceSupport_R5: string;

  Settings_ControllerDeviceSupport_RightBumper: string;

  Settings_ControllerDeviceSupport_RightJoystick: string;

  Settings_ControllerDeviceSupport_RightTrackpad: string;

  Settings_ControllerDeviceSupport_RightTrackpad_Pressure: string;

  Settings_ControllerDeviceSupport_RightTrigger: string;

  Settings_ControllerDeviceSupport_TestingBindAButton: string;

  Settings_ControllerDeviceSupport_TestingBindAButton_PS: string;

  Settings_ControllerDeviceSupport_TestingBindBButton: string;

  Settings_ControllerDeviceSupport_TestingBindBButton_PS: string;

  Settings_ControllerDeviceSupport_TestingBindDPadDown: string;

  Settings_ControllerDeviceSupport_TestingBindDPadDown_PS: string;

  Settings_ControllerDeviceSupport_TestingBindDPadLeft: string;

  Settings_ControllerDeviceSupport_TestingBindDPadLeft_PS: string;

  Settings_ControllerDeviceSupport_TestingBindDPadRight: string;

  Settings_ControllerDeviceSupport_TestingBindDPadRight_PS: string;

  Settings_ControllerDeviceSupport_TestingBindDPadUp: string;

  Settings_ControllerDeviceSupport_TestingBindDPadUp_PS: string;

  Settings_ControllerDeviceSupport_TestingBindGuide: string;

  Settings_ControllerDeviceSupport_TestingBindGuide_PS: string;

  Settings_ControllerDeviceSupport_TestingBindingComplete: string;

  Settings_ControllerDeviceSupport_TestingBindLeftShoulder: string;

  Settings_ControllerDeviceSupport_TestingBindLeftShoulder_PS: string;

  Settings_ControllerDeviceSupport_TestingBindLeftStickButton: string;

  Settings_ControllerDeviceSupport_TestingBindLeftStickButton_PS: string;

  Settings_ControllerDeviceSupport_TestingBindLeftStickDown: string;

  Settings_ControllerDeviceSupport_TestingBindLeftStickDown_PS: string;

  Settings_ControllerDeviceSupport_TestingBindLeftStickLeft: string;

  Settings_ControllerDeviceSupport_TestingBindLeftStickLeft_PS: string;

  Settings_ControllerDeviceSupport_TestingBindLeftStickRight: string;

  Settings_ControllerDeviceSupport_TestingBindLeftStickRight_PS: string;

  Settings_ControllerDeviceSupport_TestingBindLeftStickUp: string;

  Settings_ControllerDeviceSupport_TestingBindLeftStickUp_PS: string;

  Settings_ControllerDeviceSupport_TestingBindLeftTrigger: string;

  Settings_ControllerDeviceSupport_TestingBindLeftTrigger_PS: string;

  Settings_ControllerDeviceSupport_TestingBindRightShoulder: string;

  Settings_ControllerDeviceSupport_TestingBindRightShoulder_PS: string;

  Settings_ControllerDeviceSupport_TestingBindRightStickButton: string;

  Settings_ControllerDeviceSupport_TestingBindRightStickButton_PS: string;

  Settings_ControllerDeviceSupport_TestingBindRightStickDown: string;

  Settings_ControllerDeviceSupport_TestingBindRightStickDown_PS: string;

  Settings_ControllerDeviceSupport_TestingBindRightStickLeft: string;

  Settings_ControllerDeviceSupport_TestingBindRightStickLeft_PS: string;

  Settings_ControllerDeviceSupport_TestingBindRightStickRight: string;

  Settings_ControllerDeviceSupport_TestingBindRightStickRight_PS: string;

  Settings_ControllerDeviceSupport_TestingBindRightStickUp: string;

  Settings_ControllerDeviceSupport_TestingBindRightStickUp_PS: string;

  Settings_ControllerDeviceSupport_TestingBindRightTrigger: string;

  Settings_ControllerDeviceSupport_TestingBindRightTrigger_PS: string;

  Settings_ControllerDeviceSupport_TestingBindSelect: string;

  Settings_ControllerDeviceSupport_TestingBindSelect_PS: string;

  Settings_ControllerDeviceSupport_TestingBindShare: string;

  Settings_ControllerDeviceSupport_TestingBindShare_PS: string;

  Settings_ControllerDeviceSupport_TestingBindStart: string;

  Settings_ControllerDeviceSupport_TestingBindStart_PS: string;

  Settings_ControllerDeviceSupport_TestingBindTouchpad: string;

  Settings_ControllerDeviceSupport_TestingBindTouchpad_PS: string;

  Settings_ControllerDeviceSupport_TestingBindXButton: string;

  Settings_ControllerDeviceSupport_TestingBindXButton_PS: string;

  Settings_ControllerDeviceSupport_TestingBindYButton: string;

  Settings_ControllerDeviceSupport_TestingBindYButton_PS: string;

  Settings_ControllerDeviceSupport_TestingButtons: string;

  Settings_ControllerDeviceSupport_TestingComplete: string;

  Settings_ControllerDeviceSupport_TestingFreeMode: string;

  Settings_ControllerDeviceSupport_TestingLeftHaptics: string;

  Settings_ControllerDeviceSupport_TestingLeftJoystick: string;

  Settings_ControllerDeviceSupport_TestingLeftTrackpad: string;

  Settings_ControllerDeviceSupport_TestingLeftTrackpadPressure: string;

  Settings_ControllerDeviceSupport_TestingLeftTrigger: string;

  Settings_ControllerDeviceSupport_TestingRightHaptics: string;

  Settings_ControllerDeviceSupport_TestingRightJoystick: string;

  Settings_ControllerDeviceSupport_TestingRightTrackpad: string;

  Settings_ControllerDeviceSupport_TestingRightTrackpadPressure: string;

  Settings_ControllerDeviceSupport_TestingRightTrigger: string;

  Settings_ControllerDeviceSupport_TestingStarted: string;

  Settings_ControllerDeviceSupport_Title: string;

  Settings_ControllerDeviceSupport_Y1: string;

  Settings_ControllerDeviceSupport_Y2: string;

  Settings_Customization_Advanced: string;

  Settings_Customization_StartupVideo: string;

  Settings_Customization_StartupVideo_Default: string;

  Settings_Customization_StartupVideo_Default_Desc: string;

  Settings_Customization_StartupVideo_Desc: string;

  Settings_Customization_StartupVideo_Download: string;

  Settings_Customization_StartupVideo_NotDownloaded: string;

  Settings_Customization_StartupVideo_PointsShop: string;

  Settings_Customization_StartupVideo_PointsShop_Desc: string;

  Settings_Customization_StartupVideo_PointsShop_Visit: string;

  Settings_Customization_StartupVideo_Preview: string;

  Settings_Customization_StartupVideo_RemoveFromDisk: string;

  Settings_Customization_StartupVideo_Resume: string;

  Settings_Customization_StartupVideo_Resume_Desc: string;

  Settings_Customization_StartupVideo_Shuffle: string;

  Settings_Customization_StartupVideo_Shuffle_Desc: string;

  Settings_Customization_StartupVideo_Type_Local: string;

  Settings_Customization_StartupVideo_Type_PointsShop: string;

  Settings_DeckRewards_ClaimButton: string;

  Settings_DeckRewards_Claimed_Desc: string;

  Settings_DeckRewards_ClaimedByOther_Desc: string;

  Settings_DeckRewards_ClaimError: string;

  Settings_DeckRewards_ClaimError_AccessDenied: string;

  Settings_DeckRewards_ClaimError_AlreadyRedeemed: string;

  Settings_DeckRewards_ClaimError_Duplicate: string;

  Settings_DeckRewards_ClaimError_InsufficientPrivilege: string;

  Settings_DeckRewards_ClaimError_InvalidParam: string;

  Settings_DeckRewards_ClaimForMeButton: string;

  Settings_DeckRewards_Claiming: string;

  Settings_DeckRewards_ClaimSuccess: string;

  Settings_DeckRewards_Desc: string;

  Settings_DeckRewards_Disclaimer: string;

  Settings_DeckRewards_EquipProfile: string;

  Settings_DeckRewards_GoToKeyboardSettings: string;

  Settings_DeckRewards_IgnoreButton: string;

  Settings_DeckRewards_IgnoreDesc: string;

  Settings_DeckRewards_Title: string;

  Settings_Deferred_ToolTip: string;

  Settings_Developer_CefRemoteDebugging: string;

  Settings_Developer_CefRemoteDebugging_Desc: string;

  Settings_Developer_ClearGameLaunchInterstitialsSeen: string;

  Settings_Developer_ClearGameLaunchInterstitialsSeenButton: string;

  Settings_Developer_Controller_Configurator_Advanced: string;

  Settings_Developer_Controller_Configurator_Simple: string;

  Settings_Developer_Controller_Configurator_Type: string;

  Settings_Developer_EnableGamescopeComposer: string;

  Settings_Developer_EnableGamescopeVRComposer: string;

  Settings_Developer_ForceSystemComposer: string;

  Settings_Developer_HDRCompatTesting: string;

  Settings_Developer_HDRCompatTesting_Desc: string;

  Settings_Developer_MuraReArm: string;

  Settings_Developer_MuraReArm_ButtonText: string;

  Settings_Developer_MuraReArm_Error: string;

  Settings_Developer_OpenSteamConsoleTab: string;

  Settings_Developer_OpenSteamConsoleTab_Button: string;

  Settings_Developer_ShowAdvancedOSBranches: string;

  Settings_Developer_ShowTimestampsInConsole: string;

  Settings_Developer_SpeakerTest: string;

  Settings_Developer_SpeakerTest_Start: string;

  Settings_Developer_SteamInputConfigAuthor: string;

  Settings_Developer_SteamInputConfigAuthor_Desc: string;

  Settings_Developer_SteamInputDev: string;

  Settings_Developer_SteamInputDev_Desc: string;

  Settings_Developer_SteamInputError: string;

  Settings_Developer_SteamInputError_Desc: string;

  Settings_Developer_UseGameRefreshRateInSteam: string;

  Settings_Developer_WiFi_Title: string;

  Settings_Developer_WifiPowersave: string;

  Settings_Developer_WifiPowersave_Desc: string;

  Settings_Display_AdaptiveBrightness: string;

  Settings_Display_AdjustDisplayColors: string;

  Settings_Display_Advanced_Header: string;

  Settings_Display_AllowInternalScaling: string;

  Settings_Display_AutoEnableBetween: string;

  Settings_Display_AutoEnableBetween_And: string;

  Settings_Display_AutoEnableNightMode_End: string;

  Settings_Display_AutoEnableNightMode_Start: string;

  Settings_Display_BPM: string;

  Settings_Display_BPM_Windowed: string;

  Settings_Display_BPM_Windowed_Desc: string;

  Settings_Display_Brightness: string;

  Settings_Display_Color: string;

  Settings_Display_ColorTemperature: string;

  Settings_Display_ColorTemperature_Kelvin: string;

  Settings_Display_ColorVibrance: string;

  Settings_Display_ColorVibrance_Boosted: string;

  Settings_Display_ColorVibrance_Desc: string;

  Settings_Display_ColorVibrance_Max: string;

  Settings_Display_ColorVibrance_Min: string;

  Settings_Display_ColorVibrance_Native: string;

  Settings_Display_ColorVibrance_sRGB: string;

  Settings_Display_CompatibilityMode_Description: string;

  Settings_Display_CompatibilityMode_Label: string;

  Settings_Display_DisplayScaling_Automatically_Scale: string;

  Settings_Display_DisplayScaling_Automatically_Scale_UI_Concise: string;

  Settings_Display_DisplayScaling_Automatically_Scale_UI_Verbose: string;

  Settings_Display_DisplayScaling_ChooseScaling: string;

  Settings_Display_DisplayScaling_ChooseScalingForTVName: string;

  Settings_Display_DisplayScaling_LargerText: string;

  Settings_Display_DisplayScaling_MoreContent: string;

  Settings_Display_DisplayScaling_Scaling: string;

  Settings_Display_DisplayScaling_ScalingForTVName: string;

  Settings_Display_DisplayScaling_Slider_Label: string;

  Settings_Display_DisplayScaling_SmallerText: string;

  Settings_Display_DisplayScaling_YouCanChangeThisIn_Section: string;

  Settings_Display_ExternalDisplay: string;

  Settings_Display_ExternalDisplay_DefaultName: string;

  Settings_Display_GameResolution: string;

  Settings_Display_GameResolution_Default: string;

  Settings_Display_GameResolution_Explainer: string;

  Settings_Display_GameResolution_Native: string;

  Settings_Display_InternalDisplayName_KnownHardware: string;

  Settings_Display_InternalDisplayName_UnknownHardware: string;

  Settings_Display_LEDSection: string;

  Settings_Display_Mangifier_Scale: string;

  Settings_Display_MuraCorrectionDisabled_Label: string;

  Settings_Display_NativeColorTemp: string;

  Settings_Display_NightMode: string;

  Settings_Display_NightMode_Desc: string;

  Settings_Display_NightModeColor: string;

  Settings_Display_NightModeColor_Cool: string;

  Settings_Display_NightModeColor_Warm: string;

  Settings_Display_NightModeDominantHue: string;

  Settings_Display_NightModePeakSaturation: string;

  Settings_Display_NightModeReset: string;

  Settings_Display_NightModeSection: string;

  Settings_Display_NightModeShadowSaturation: string;

  Settings_Display_PreferredMonitor: string;

  Settings_Display_PreferredMonitor_Desc: string;

  Settings_Display_PreferredMonitor_None: string;

  Settings_Display_Resolution: string;

  Settings_Display_Resolution_Auto_Resolution: string;

  Settings_Display_Resolution_ConfirmChange_Accept: string;

  Settings_Display_Resolution_ConfirmChange_Body: string;

  Settings_Display_Resolution_ConfirmChange_Revert: string;

  Settings_Display_Resolution_ConfirmChange_Title: string;

  Settings_Display_ScheduleNightMode: string;

  Settings_Display_ShowAdvancedOptions: string;

  Settings_Display_StatusLEDBrightness: string;

  Settings_Display_Underscan: string;

  Settings_Display_Underscan_Auto: string;

  Settings_Display_Underscan_Notch_Larger: string;

  Settings_Display_Underscan_Notch_Smaller: string;

  Settings_DockUpdate_Error_Generic_KnownHardware: string;

  Settings_DockUpdate_Error_Generic_UnknownHardware: string;

  Settings_DockUpdate_Error_Title: string;

  Settings_DockUpdate_Label: string;

  Settings_DockUpdate_UnplugWarning_KnownHardware: string;

  Settings_DockUpdate_UnplugWarning_UnknownHardware: string;

  Settings_ExternalController_Settings: string;

  Settings_ForceOOBE: string;

  Settings_ForceOOBE_Description: string;

  Settings_GameRecording_Cleanup_Desc: string;

  Settings_GameRecording_Cleanup_Heading: string;

  Settings_GameRecording_Cleanup_Usage: string;

  Settings_HDR_Debug_Force10PQ: string;

  Settings_HDR_Debug_ForceSupport: string;

  Settings_HDR_Debug_Header: string;

  Settings_HDR_Debug_Heatmap: string;

  Settings_HDR_Debug_HeatmapEnable: string;

  Settings_HDR_Disabled: string;

  Settings_HDR_Enable: string;

  Settings_HDR_Enabled: string;

  Settings_HDR_Enabled_Badge: string;

  Settings_HDR_EnableExperimentalSupport: string;

  Settings_HDR_Header: string;

  Settings_HDR_NotCapable: string;

  Settings_HDR_SDRContentBrightness: string;

  Settings_HDR_TonemapOperator: string;

  Settings_HDR_TonemapOperator_Invalid: string;

  Settings_HDR_TonemapOperator_Reinhard: string;

  Settings_HDR_TonemapOperator_Uncharted: string;

  Settings_HDRVisualization_Analysis: string;

  Settings_HDRVisualization_Heatmap: string;

  Settings_HDRVisualization_HeatmapClassic: string;

  Settings_HDRVisualization_HeatmapExtended: string;

  Settings_HDRVisualization_Label: string;

  Settings_HDRVisualization_None: string;

  Settings_HighContrastMode: string;

  Settings_HighContrastMode_Description: string;

  Settings_Hotkey_TogglePerfMonitor: string;

  Settings_InGame_ChangeFolder: string;

  Settings_InGame_ChatFiltering: string;

  Settings_InGame_EnableDesktopGameTheater: string;

  Settings_InGame_EnableOverlay: string;

  Settings_InGame_FPSFAQHere: string;

  Settings_InGame_FPSPerfOverlay_desc: string;

  Settings_InGame_Hotkey_MainMenu: string;

  Settings_InGame_Hotkey_QuickAccess: string;

  Settings_InGame_Hotkeys: string;

  Settings_InGame_Misc: string;

  Settings_InGame_Overlay: string;

  Settings_InGame_Overlay_PerformanceMonitor: string;

  Settings_InGame_Overlay_Restore_Browser_Tabs: string;

  Settings_InGame_Overlay_ToolBar_ListView: string;

  Settings_InGame_OverlayShortcut: string;

  Settings_InGame_PerformanceMonitor: string;

  Settings_InGame_PerfOverlay_BGOpacity: string;

  Settings_InGame_PerfOverlay_ClassicFPSOnly: string;

  Settings_InGame_PerfOverlay_FPSCPUGPURAMDetails: string;

  Settings_InGame_PerfOverlay_FPSCPUGPUSummary: string;

  Settings_InGame_PerfOverlay_FPSDetailsAndGraph: string;

  Settings_InGame_PerfOverlay_Saturation: string;

  Settings_InGame_PerfOverlay_TextSize: string;

  Settings_InGame_PerfOverlayAllowKMDriver: string;

  Settings_InGame_PerfOverlayDetailLevel: string;

  Settings_InGame_PerfOverlayShortcut: string;

  Settings_InGame_PerfOverlayShowCPUGraph: string;

  Settings_InGame_PerfOverlayShowFPSGraph: string;

  Settings_InGame_ScaleInterface: string;

  Settings_InGame_ScreenshotFolder: string;

  Settings_InGame_ScreenshotFolderPicker_Title: string;

  Settings_InGame_ScreenshotNotify: string;

  Settings_InGame_Screenshots: string;

  Settings_InGame_ScreenshotShortcut: string;

  Settings_InGame_ScreenshotShowSteamUI: string;

  Settings_InGame_ScreenshotSound: string;

  Settings_InGame_ScreenshotUncompressed: string;

  Settings_InGame_ScreenshotUncompressedAVIF: string;

  Settings_InGame_ServerBrowserPings: string;

  Settings_InGame_ServerBrowserPings_Description: string;

  Settings_InGame_SteamNetworking: string;

  Settings_InGame_SteamNetworking_Description: string;

  Settings_InGame_ToolbarPreferences: string;

  Settings_InGame_UseGamepadOverlay: string;

  Settings_InGame_Voice: string;

  Settings_InGame_Voice_Done: string;

  Settings_InGame_Voice_Manage: string;

  Settings_InGame_Voice_MicDeviceName: string;

  Settings_InGame_WebBrowserAutoLoginDesc: string;

  Settings_InGame_WebBrowserAutoLoginHeader: string;

  Settings_InGame_WebBrowserDelete: string;

  Settings_InGame_WebBrowserDeleteBrowserCache: string;

  Settings_InGame_WebBrowserDeleteData: string;

  Settings_InGame_WebBrowserHome: string;

  Settings_Interface_EnableContextMenuBlurDelay: string;

  Settings_Interface_EnableDirectWrite: string;

  Settings_Interface_EnableGPURendering: string;

  Settings_Interface_EnableHardwareDecoding: string;

  Settings_Interface_EnableHardwareDecoding_Disabled: string;

  Settings_Interface_EnableSmoothScrolling: string;

  Settings_Interface_OpenFriends: string;

  Settings_Interface_RunAtStartup: string;

  Settings_Interface_ScaleText: string;

  Settings_Interface_SetTaskbarPreferences: string;

  Settings_Interface_ShowMarketingMessages: string;

  Settings_Interface_StartInBigPicture: string;

  Settings_Interface_StartPage: string;

  Settings_Interface_StartPage_Description: string;

  Settings_Interface_TaskbarPreferences: string;

  Settings_Internet_Active_Networks: string;

  Settings_Internet_Advanced_Info: string;

  Settings_Internet_Advanced_Settings: string;

  Settings_Internet_AP_Security_Unsupported: string;

  Settings_Internet_Autoconnect_Toggle: string;

  Settings_Internet_AutomaticProxy: string;

  Settings_Internet_Captive_Portal_Detected: string;

  Settings_Internet_Captive_Portal_Header_Title: string;

  Settings_Internet_Captive_Portal_Login_Button: string;

  Settings_Internet_ConfigureProxy: string;

  Settings_Internet_Connect: string;

  Settings_Internet_Connect_Advanced_Enable: string;

  Settings_Internet_Connected_To_Internet_But_Not_Steam: string;

  Settings_Internet_Connected_To_Internet_But_Not_Steam_KnownHardware: string;

  Settings_Internet_Connected_To_Internet_But_Not_Steam_Throttled: string;

  Settings_Internet_Connected_To_Internet_But_Not_Steam_Throttled_KnownHardware: string;

  Settings_Internet_Connected_To_Internet_But_Not_Steam_Throttled_UnknownHardware: string;

  Settings_Internet_Connected_To_Internet_But_Not_Steam_UnknownHardware: string;

  Settings_Internet_Connected_To_Network_But_Not_Internet: string;

  Settings_Internet_Connected_To_Network_But_Not_Internet_KnownHardware: string;

  Settings_Internet_Connected_To_Network_But_Not_Internet_UnknownHardware: string;

  Settings_Internet_Connecting_To_Internet: string;

  Settings_Internet_Connecting_To_Network: string;

  Settings_Internet_Connection_Successful: string;

  Settings_Internet_Custom_Network_Button: string;

  Settings_Internet_Disconnect: string;

  Settings_Internet_Enable_HTTPProxy: string;

  Settings_Internet_Enter_Network_Credentials: string;

  Settings_Internet_Enter_NetworkName: string;

  Settings_Internet_Enter_Password: string;

  Settings_Internet_Enter_The_Password_For_Network: string;

  Settings_Internet_Enter_UserName: string;

  Settings_Internet_Failed_To_Connect: string;

  Settings_Internet_Failed_To_Connect_To_Internet: string;

  Settings_Internet_Failed_To_Connect_To_Network: string;

  Settings_Internet_Forget: string;

  Settings_Internet_Gateway: string;

  Settings_Internet_Go_Offline: string;

  Settings_Internet_Hidden_Network: string;

  Settings_Internet_HTTPProxy: string;

  Settings_Internet_In_Offline_Mode: string;

  Settings_Internet_In_Offline_Mode_KnownHardware: string;

  Settings_Internet_In_Offline_Mode_SteamDeck: string;

  Settings_Internet_In_Offline_Mode_UnknownHardware: string;

  Settings_Internet_Info: string;

  Settings_Internet_InvalidProxy: string;

  Settings_Internet_IP: string;

  Settings_Internet_IP_Address: string;

  Settings_Internet_IP_Address_Assignment: string;

  Settings_Internet_IP_Address_Assignment_Automatic: string;

  Settings_Internet_IP_Address_Assignment_Manual: string;

  Settings_Internet_IPv4_Address: string;

  Settings_Internet_IPv6_Address: string;

  Settings_Internet_Known_Networks: string;

  Settings_Internet_Limit_Connection_Lower_Bands: string;

  Settings_Internet_MAC_Address: string;

  Settings_Internet_ManualProxy: string;

  Settings_Internet_ManualProxyAddress: string;

  Settings_Internet_ManualProxyExcludeLoopback: string;

  Settings_Internet_Netmask: string;

  Settings_Internet_Network_Not_Found: string;

  Settings_Internet_Networks_Found: string;

  Settings_Internet_No_Other_Networks_Found: string;

  Settings_Internet_NoProxy: string;

  Settings_Internet_Not_Connected_To_Network: string;

  Settings_Internet_Offline_Mode_Disabled: string;

  Settings_Internet_Port: string;

  Settings_Internet_Primary_DNS: string;

  Settings_Internet_Proxy_Settings: string;

  Settings_Internet_Reenter_Network_Credentials: string;

  Settings_Internet_Reenter_The_Password_For_Network: string;

  Settings_Internet_Refresh: string;

  Settings_Internet_Restart: string;

  Settings_Internet_RestartBody: string;

  Settings_Internet_RestartLater: string;

  Settings_Internet_Secondary_DNS: string;

  Settings_Internet_Security_Type: string;

  Settings_Internet_Status: string;

  Settings_Internet_Subnet_Mask: string;

  Settings_Internet_Try_Another_Network: string;

  Settings_Internet_Use_Network_Anyway: string;

  Settings_Internet_WebBrowserDataDelete: string;

  Settings_Internet_WebBrowserDataDelete_Desc: string;

  Settings_Internet_WebBrowserDataDeleteButton: string;

  Settings_Internet_Wifi_Enabled: string;

  Settings_Internet_Wired_Network: string;

  Settings_Keyboard_ActiveKeyboards: string;

  Settings_Keyboard_ActiveKeyboards_Edit: string;

  Settings_Keyboard_CannotSetTheme_ClaimThemes: string;

  Settings_Keyboard_CannotSetTheme_NoNetworkConnection: string;

  Settings_Keyboard_CannotSetTheme_NoThemes: string;

  Settings_Keyboard_CannotSetTheme_Offline: string;

  Settings_Keyboard_CurrentLayout: string;

  Settings_Keyboard_DefaultTheme: string;

  Settings_Keyboard_Haptics: string;

  Settings_Keyboard_Haptics_High: string;

  Settings_Keyboard_Haptics_Low: string;

  Settings_Keyboard_Haptics_Medium: string;

  Settings_Keyboard_Haptics_Off: string;

  Settings_Keyboard_Location_Center_Bottom: string;

  Settings_Keyboard_Location_Center_Top: string;

  Settings_Keyboard_Location_Desktop: string;

  Settings_Keyboard_Location_Lower_Left: string;

  Settings_Keyboard_Location_Lower_Right: string;

  Settings_Keyboard_Location_Overlay: string;

  Settings_Keyboard_Location_Upper_Left: string;

  Settings_Keyboard_Location_Upper_Right: string;

  Settings_Keyboard_PointsShop: string;

  Settings_Keyboard_PointsShop_Desc: string;

  Settings_Keyboard_PointsShop_Visit: string;

  Settings_Keyboard_Preview: string;

  Settings_Keyboard_SetThemeError_Body: string;

  Settings_Keyboard_SwitchHint: string;

  Settings_Keyboard_Theme: string;

  Settings_Keyboard_TrackpadingTyping_InputScale: string;

  Settings_Keyboard_TrackpadingTyping_InputScale_Desc: string;

  Settings_Keyboard_TrackpadingTyping_Section: string;

  Settings_Keyboard_TrackpadingTyping_TriggerAsClick: string;

  Settings_Keyboard_TrackpadingTyping_TriggerAsClick_Desc: string;

  Settings_Language_NeedsRestart: string;

  Settings_Language_Restart: string;

  Settings_Language_Select: string;

  Settings_Language_Select_Description: string;

  Settings_Language_Select_Desktop: string;

  Settings_LED_Brightness: string;

  Settings_LED_Color: string;

  Settings_LED_Effect: string;

  Settings_LED_Enable: string;

  Settings_LED_SeparateColors: string;

  Settings_LED_Speed: string;

  Settings_Library_Activate: string;

  Settings_Library_Add_To_Library: string;

  Settings_Library_AddNonSteam: string;

  Settings_Library_BrowseStore: string;

  Settings_Library_DisableCommunityContent: string;

  Settings_Library_DisableCommunityContent_Description: string;

  Settings_Library_DisplaySize: string;

  Settings_Library_DisplaySize_Automatic: string;

  Settings_Library_DisplaySize_Large: string;

  Settings_Library_DisplaySize_Medium: string;

  Settings_Library_DisplaySize_Small: string;

  Settings_Library_LowBandwidthMode: string;

  Settings_Library_LowBandwidthMode_Description: string;

  Settings_Library_LowPerfMode: string;

  Settings_Library_LowPerfMode_Description: string;

  Settings_Library_ProdKey_Activate: string;

  Settings_Library_ProdKey_AddGame: string;

  Settings_Library_ProdKey_EnterProductCode: string;

  Settings_Library_ProdKey_Info_Details: string;

  Settings_Library_ProdKey_Info_Example_1: string;

  Settings_Library_ProdKey_Info_Example_2: string;

  Settings_Library_ProdKey_Info_Example_3: string;

  Settings_Library_ProdKey_Info_Examples: string;

  Settings_Library_ProdKey_Info_Title: string;

  Settings_Library_ProdKey_MoreInfo: string;

  Settings_Library_ProdKey_SSA_ProductActivation: string;

  Settings_Library_ProdKey_UseCode: string;

  Settings_Library_ReadyToPlayIncludesStreaming: string;

  Settings_Library_ReadyToPlayIncludesStreaming_Description: string;

  Settings_Library_Show_Copy_Count: string;

  Settings_Library_Show_SteamDeck_Info: string;

  Settings_Library_ShowGameIcons: string;

  Settings_Library_SSA_Agree: string;

  Settings_Library_SSA_Agree_Confirm: string;

  Settings_LowPowerDownloads_AllowBattery: string;

  Settings_LowPowerDownloads_AllowBatteryDetails: string;

  Settings_LowPowerDownloads_Details: string;

  Settings_LowPowerDownloads_Enable: string;

  Settings_Miscellaneous_Title: string;

  Settings_Music_DisplayNotification: string;

  Settings_Music_DownloadHighQuality: string;

  Settings_Music_PauseMusic_StartApp: string;

  Settings_Music_PauseMusic_VoiceChat: string;

  Settings_Music_Volume: string;

  Settings_OSBranch_Beta: string;

  Settings_OSBranch_BetaCandidate: string;

  Settings_OSBranch_Main: string;

  Settings_OSBranch_Preview: string;

  Settings_OSBranch_PreviewCandidate: string;

  Settings_OSBranch_Release: string;

  Settings_OSBranch_ReleaseCandidate: string;

  Settings_Page_Accessibility: string;

  Settings_Page_Account: string;

  Settings_Page_Audio: string;

  Settings_Page_Bluetooth: string;

  Settings_Page_Broadcast: string;

  Settings_Page_Cloud: string;

  Settings_Page_Compatibility: string;

  Settings_Page_Controller: string;

  Settings_Page_Customization: string;

  Settings_Page_Developer: string;

  Settings_Page_Display: string;

  Settings_Page_Downloads: string;

  Settings_Page_Family: string;

  Settings_Page_Friends: string;

  Settings_Page_General: string;

  Settings_Page_Home: string;

  Settings_Page_InGame: string;

  Settings_Page_InGameVoice: string;

  Settings_Page_Interface: string;

  Settings_Page_Internal: string;

  Settings_Page_Internet: string;

  Settings_Page_Keyboard: string;

  Settings_Page_Library: string;

  Settings_Page_Music: string;

  Settings_Page_Notifications: string;

  Settings_Page_Power: string;

  Settings_Page_RemotePlay: string;

  Settings_Page_Security: string;

  Settings_Page_Storage: string;

  Settings_Page_Store: string;

  Settings_Page_System: string;

  Settings_Page_Voice: string;

  Settings_Page_WebBrowser: string;

  Settings_Power_Battery_Title: string;

  Settings_Profiling: string;

  Settings_Profiling_Description: string;

  Settings_Profiling_Title: string;

  Settings_RecoveryActions: string;

  Settings_ReduceMotion: string;

  Settings_ReduceMotion_Description: string;

  Settings_RemotePlay_AdvancedConfig: string;

  Settings_RemotePlay_Audio: string;

  Settings_RemotePlay_AudioChannels_2: string;

  Settings_RemotePlay_AudioChannels_4: string;

  Settings_RemotePlay_AudioChannels_6: string;

  Settings_RemotePlay_AudioChannels_AutoDetect0: string;

  Settings_RemotePlay_AudioChannels_AutoDetect2: string;

  Settings_RemotePlay_AudioChannels_AutoDetect4: string;

  Settings_RemotePlay_AudioChannels_AutoDetect6: string;

  Settings_RemotePlay_AV1: string;

  Settings_RemotePlay_Bandwidth: string;

  Settings_RemotePlay_Bandwidth_Auto: string;

  Settings_RemotePlay_Bandwidth_Unlimited: string;

  Settings_RemotePlay_ChangeDesktopResolution: string;

  Settings_RemotePlay_ChangePIN: string;

  Settings_RemotePlay_ClearPIN: string;

  Settings_RemotePlay_ClientConfigDescription: string;

  Settings_RemotePlay_ConnectionManagement: string;

  Settings_RemotePlay_ConnectionManagement_Custom: string;

  Settings_RemotePlay_ConnectionManagement_Custom_Description: string;

  Settings_RemotePlay_ConnectionManagement_Steam: string;

  Settings_RemotePlay_ConnectionOptions: string;

  Settings_RemotePlay_ConnectionPIN: string;

  Settings_RemotePlay_ControllerOverlayHotkey: string;

  Settings_RemotePlay_ControllerOverlayHotkeyAuto: string;

  Settings_RemotePlay_ControllerOverlayHotkeyBack: string;

  Settings_RemotePlay_ControllerOverlayHotkeyDescription: string;

  Settings_RemotePlay_ControllerOverlayHotkeyGuide: string;

  Settings_RemotePlay_ControllerOverlayHotkeyMenu: string;

  Settings_RemotePlay_ControllerOverlayHotkeyNone: string;

  Settings_RemotePlay_ControllerOverlayHotkeyStart: string;

  Settings_RemotePlay_ControllerOverlayHotkeySteam: string;

  Settings_RemotePlay_ControllerOverlayHotkeyView: string;

  Settings_RemotePlay_ControllerOverlayHotkeyY: string;

  Settings_RemotePlay_Description: string;

  Settings_RemotePlay_Description_DisabledBySystemPolicy: string;

  Settings_RemotePlay_Description_KnownHardware: string;

  Settings_RemotePlay_Description_UnknownHardware: string;

  Settings_RemotePlay_DeviceName: string;

  Settings_RemotePlay_DevicesEmpty: string;

  Settings_RemotePlay_EnableCaptureNVFBC: string;

  Settings_RemotePlay_EnableClientConfig: string;

  Settings_RemotePlay_Enabled: string;

  Settings_RemotePlay_EnableHardwareEncoding: string;

  Settings_RemotePlay_EnableServerConfig: string;

  Settings_RemotePlay_EnableTrafficPriority: string;

  Settings_RemotePlay_EnableTrafficPriority_Description: string;

  Settings_RemotePlay_EnableWifiAP: string;

  Settings_RemotePlay_FAQLearnMore: string;

  Settings_RemotePlay_FAQViewFAQ: string;

  Settings_RemotePlay_Framerate: string;

  Settings_RemotePlay_Framerate_0: string;

  Settings_RemotePlay_Framerate_3000: string;

  Settings_RemotePlay_Framerate_4975: string;

  Settings_RemotePlay_Framerate_5000: string;

  Settings_RemotePlay_Framerate_5975: string;

  Settings_RemotePlay_Framerate_6000: string;

  Settings_RemotePlay_Framerate_9000: string;

  Settings_RemotePlay_Framerate_12000: string;

  Settings_RemotePlay_Framerate_14400: string;

  Settings_RemotePlay_Framerate_24000: string;

  Settings_RemotePlay_HardwareDecoding: string;

  Settings_RemotePlay_HEVC: string;

  Settings_RemotePlay_HostPlayAudioAlways: string;

  Settings_RemotePlay_LowLatencyNetworking: string;

  Settings_RemotePlay_P2PScope_Description: string;

  Settings_RemotePlay_P2PScopeAutomatic: string;

  Settings_RemotePlay_P2PScopeDisabled: string;

  Settings_RemotePlay_P2PScopeEveryone: string;

  Settings_RemotePlay_P2PScopeOnlyMe: string;

  Settings_RemotePlay_Pair: string;

  Settings_RemotePlay_PerformanceOverlay: string;

  Settings_RemotePlay_PerformanceOverlay_Details: string;

  Settings_RemotePlay_PerformanceOverlay_Disabled: string;

  Settings_RemotePlay_PerformanceOverlay_Icons: string;

  Settings_RemotePlay_RemoteClientConfig: string;

  Settings_RemotePlay_RemoteClientConfigDescription: string;

  Settings_RemotePlay_Resolution: string;

  Settings_RemotePlay_Resolution8K: string;

  Settings_RemotePlay_Resolution480p: string;

  Settings_RemotePlay_Resolution720p: string;

  Settings_RemotePlay_Resolution900p: string;

  Settings_RemotePlay_Resolution1080p: string;

  Settings_RemotePlay_Resolution1440p: string;

  Settings_RemotePlay_Resolution2160p: string;

  Settings_RemotePlay_ResolutionAutomatic: string;

  Settings_RemotePlay_ResolutionDesktop: string;

  Settings_RemotePlay_ServerConfigDescription: string;

  Settings_RemotePlay_SetPIN: string;

  Settings_RemotePlay_SoftwareEncodingThreads_Auto: string;

  Settings_RemotePlay_SoftwareEncodingThreads_Description: string;

  Settings_RemotePlay_Status_Connected: string;

  Settings_RemotePlay_Status_DifferentVersion: string;

  Settings_RemotePlay_Status_Disabled: string;

  Settings_RemotePlay_Status_NotConnected: string;

  Settings_RemotePlay_Status_Paired: string;

  Settings_RemotePlay_Status_Streaming: string;

  Settings_RemotePlay_Status_Unsupported: string;

  Settings_RemotePlay_Unpair: string;

  Settings_RemotePlay_UnpairDevice: string;

  Settings_RemotePlay_UnsupportedPlatform: string;

  Settings_RemotePlay_UsePresetDefault: string;

  Settings_RemotePlay_UsePresetEnhanced4K: string;

  Settings_RemotePlay_UsePresetEnhanced1080p: string;

  Settings_RemotePlay_Video: string;

  Settings_RemotePlay_VideoQualityBalanced: string;

  Settings_RemotePlay_VideoQualityBeautiful: string;

  Settings_RemotePlay_VideoQualityFast: string;

  Settings_RemotePlay_WifiAP_Pair: string;

  Settings_RemotePlay_WifiAP_Status_Connected: string;

  Settings_RemotePlay_WifiAP_Unpair: string;

  Settings_RemotePlay_WifiAP_Unpair_Label: string;

  Settings_RemotePlay_WifiAPChannel5: string;

  Settings_RemotePlay_WifiAPChannel6: string;

  Settings_RemotePlay_WifiAPChannel_Auto: string;

  Settings_RemotePlay_WifiAPChannelWidth: string;

  Settings_RemotePlay_WifiAPChannelWidth_80: string;

  Settings_RemotePlay_WifiAPChannelWidth_160: string;

  Settings_RemotePlay_WifiAPChannelWidth_Auto: string;

  Settings_RemotePlay_WifiAPHotspotPassword: string;

  Settings_RemotePlay_WifiAPHotspotRouting: string;

  Settings_RemotePlay_WifiAPHotspotRouting_NAT: string;

  Settings_RemotePlay_WifiAPHotspotRouting_None: string;

  Settings_RemotePlay_WifiAPHotspotSSID: string;

  Settings_RemotePlay_WifiAPSection: string;

  Settings_RemotePlay_WifiAPShowAdvanced: string;

  Settings_RemotePlay_WifiAPStatus_Band: string;

  Settings_RemotePlay_WifiAPStatus_Channel: string;

  Settings_RemotePlay_WifiAPStatus_Status: string;

  Settings_RestartLater_ButtonText: string;

  Settings_RestartNow_ButtonText: string;

  Settings_RestartRequired_Description: string;

  Settings_RestartRequired_Title: string;

  Settings_ScreenReader_Enabled: string;

  Settings_ScreenReader_Locale: string;

  Settings_ScreenReader_Locale_ar: string;

  Settings_ScreenReader_Locale_auto: string;

  Settings_ScreenReader_Locale_bg: string;

  Settings_ScreenReader_Locale_cmn: string;

  'Settings_ScreenReader_Locale_cmn-LATN-PINYIN': string;

  Settings_ScreenReader_Locale_cs: string;

  Settings_ScreenReader_Locale_da: string;

  Settings_ScreenReader_Locale_de: string;

  Settings_ScreenReader_Locale_el: string;

  'Settings_ScreenReader_Locale_en-US': string;

  Settings_ScreenReader_Locale_es: string;

  'Settings_ScreenReader_Locale_es-419': string;

  Settings_ScreenReader_Locale_fi: string;

  'Settings_ScreenReader_Locale_fr-FR': string;

  Settings_ScreenReader_Locale_hu: string;

  Settings_ScreenReader_Locale_id: string;

  Settings_ScreenReader_Locale_it: string;

  Settings_ScreenReader_Locale_ja: string;

  Settings_ScreenReader_Locale_ko: string;

  Settings_ScreenReader_Locale_nb: string;

  Settings_ScreenReader_Locale_nl: string;

  Settings_ScreenReader_Locale_pl: string;

  Settings_ScreenReader_Locale_pt: string;

  'Settings_ScreenReader_Locale_pt-BR': string;

  Settings_ScreenReader_Locale_ro: string;

  Settings_ScreenReader_Locale_ru: string;

  Settings_ScreenReader_Locale_sv: string;

  Settings_ScreenReader_Locale_th: string;

  Settings_ScreenReader_Locale_tr: string;

  Settings_ScreenReader_Locale_uk: string;

  Settings_ScreenReader_Locale_vi: string;

  Settings_ScreenReader_Locale_yue: string;

  Settings_ScreenReader_Pitch: string;

  Settings_ScreenReader_Rate: string;

  Settings_ScreenReader_Section: string;

  Settings_ScreenReader_Volume: string;

  Settings_Security_EnableLockScreen: string;

  Settings_Security_LockOnDesktopMode: string;

  Settings_Security_LockOnLogin: string;

  Settings_Security_LockOnWake: string;

  Settings_Security_LockScreen_Desc_KnownHardware: string;

  Settings_Security_LockScreen_Desc_UnknownHardware: string;

  Settings_Security_LockScreenSection: string;

  Settings_Security_ResetPIN: string;

  Settings_Security_SetPIN: string;

  Settings_SRSI_Run: string;

  Settings_SteamOS_ForceWPASupplicant: string;

  Settings_SteamOS_ForceWPASupplicant_Desc: string;

  Settings_SteamOS_ReloadWifiDriverOnSleep: string;

  Settings_SteamOS_WifiDebug: string;

  Settings_SteamPlay_ChooseTool: string;

  Settings_SteamPlay_DefaultTool: string;

  Settings_SteamPlay_Enable: string;

  Settings_SteamPlay_Enable_Desc: string;

  Settings_SteamPlay_EnableForOtherTitles: string;

  Settings_SteamPlay_EnableForOtherTitles_Desc: string;

  Settings_SteamPlay_IsEnabled: string;

  Settings_SteamPlay_IsWildcardEnabled: string;

  Settings_SteamPlay_NeedsRestart: string;

  Settings_SteamPlay_Restart: string;

  Settings_SteamPlay_RestartLater: string;

  Settings_SteamPlay_RunOtherTitlesWith: string;

  Settings_SteamPlay_SteamPlay: string;

  Settings_SteamRuntimeSystemInformation: string;

  Settings_SteamRuntimeSystemInformation_Close: string;

  Settings_SteamRuntimeSystemInformation_Copy: string;

  Settings_SteamRuntimeSystemInformation_Desc: string;

  Settings_SteamRuntimeSystemInformation_PleaseWait: string;

  Settings_System_About: string;

  Settings_System_Advanced_BIOS_Update: string;

  Settings_System_Advanced_Header: string;

  Settings_System_BacklightDimTime_Label: string;

  Settings_System_BacklightDimTimeNotPlugged_Label: string;

  Settings_System_BacklightDimTimePlugged_Label: string;

  Settings_System_BIOSVersion: string;

  Settings_System_Change_Hostname_Body: string;

  Settings_System_Change_Hostname_Header: string;

  Settings_System_Change_Hostname_Set: string;

  Settings_System_Change_User_Password_Change: string;

  Settings_System_Change_User_Password_Failed: string;

  Settings_System_Change_User_Password_Header: string;

  Settings_System_Change_User_Password_Set: string;

  Settings_System_Change_User_Password_Success: string;

  Settings_System_Changing_User_Password_Header: string;

  Settings_System_Components: string;

  Settings_System_CPUFrequency: string;

  Settings_System_CPULogicalCores: string;

  Settings_System_CPUName: string;

  Settings_System_CPUPhysicalCores: string;

  Settings_System_CPUVendor: string;

  Settings_System_DeckChipID: string;

  Settings_System_DeckControllerVersion: string;

  Settings_System_DeckSerialNumber: string;

  Settings_System_Devkit: string;

  Settings_System_Devkit_DoPairing: string;

  Settings_System_Devkit_Enable: string;

  Settings_System_Devkit_Pairing: string;

  Settings_System_Devkit_Pairing_Confirmation: string;

  Settings_System_Devkit_PairingLabel: string;

  Settings_System_DockFWVersion: string;

  Settings_System_EnableDeveloperMode: string;

  Settings_System_Factory_Reset: string;

  Settings_System_Factory_Reset_Are_You_Sure: string;

  Settings_System_Factory_Reset_Explainer_KnownHardware: string;

  Settings_System_Factory_Reset_Explainer_UnknownHardware: string;

  Settings_System_Factory_Reset_Label: string;

  Settings_System_Factory_Reset_Preparing: string;

  Settings_System_FanControlToggle: string;

  Settings_System_ForceFormatSD_Label: string;

  Settings_System_FormatSD_Btn_Format: string;

  Settings_System_FormatSD_Btn_Formatting: string;

  Settings_System_FormatSD_Confirm_Desc: string;

  Settings_System_FormatSD_Confirm_Title: string;

  Settings_System_FormatSD_Error_BadCard: string;

  Settings_System_FormatSD_Error_Generic: string;

  Settings_System_FormatSD_Error_NotFound: string;

  Settings_System_FormatSD_Error_NotMounted: string;

  Settings_System_FormatSD_Error_OK: string;

  Settings_System_FormatSD_Error_RestartLater: string;

  Settings_System_FormatSD_Error_RestartNow: string;

  Settings_System_FormatSD_Error_Title: string;

  Settings_System_FormatSD_Label: string;

  Settings_System_Hardware: string;

  Settings_System_Header: string;

  Settings_System_Hostname: string;

  Settings_System_Hostname_Change: string;

  Settings_System_Idle_AC_Section: string;

  Settings_System_Idle_Battery_Section: string;

  Settings_System_Idle_Dim: string;

  Settings_System_IdleCustom: string;

  Settings_System_IdleCustom_EnterDuration: string;

  Settings_System_IdleCustom_Seconds: string;

  Settings_System_IdleDisabled: string;

  Settings_System_KernalVersion: string;

  Settings_System_OSBuildId: string;

  Settings_System_OSCodename: string;

  Settings_System_OSName: string;

  Settings_System_OSVariantId: string;

  Settings_System_OSVersionId: string;

  Settings_System_RAMSize: string;

  Settings_System_SDCard: string;

  Settings_System_Steam: string;

  Settings_System_SteamAPIVersion: string;

  Settings_System_SteamBeta: string;

  Settings_System_SteamBeta_None: string;

  Settings_System_SteamBuildDate: string;

  Settings_System_SteamInput: string;

  Settings_System_SteamLocalBuild: string;

  Settings_System_SteamVersion: string;

  Settings_System_SteamVR: string;

  Settings_System_SteamVRHmdTrackingInfo: string;

  Settings_System_SteamVRVersion: string;

  Settings_System_SteamVRWebBuildDate: string;

  Settings_System_SteamWebBuildDate: string;

  Settings_System_SuspendTime_Label: string;

  Settings_System_SuspendTimeNotPlugged_Label: string;

  Settings_System_SuspendTimePlugged_Label: string;

  Settings_System_TrimAll_Description: string;

  Settings_System_TrimAll_Label: string;

  Settings_System_TrimAll_Run: string;

  Settings_System_TrimAll_Running: string;

  Settings_System_Update_Available: string;

  Settings_System_User_Current_Password: string;

  Settings_System_User_New_Password: string;

  Settings_System_User_Password: string;

  Settings_System_Variant: string;

  Settings_System_Variant_Combine: string;

  Settings_System_Variant_Name_KnownHardware: string;

  Settings_System_Variant_Name_UnknownHardware: string;

  Settings_System_VideoCard: string;

  Settings_System_VideoDriver: string;

  Settings_System_VRAMSize: string;

  Settings_SystemReport_Close: string;

  Settings_SystemReport_Copy: string;

  Settings_SystemReport_Desc: string;

  Settings_SystemReport_PleaseWait: string;

  Settings_SystemReport_Save: string;

  Settings_SystemReport_SaveFail_Desc: string;

  Settings_SystemReport_SaveFail_Title: string;

  Settings_SystemReport_SaveOK_Cancel: string;

  Settings_SystemReport_SaveOK_Desc: string;

  Settings_SystemReport_SaveOK_OK: string;

  Settings_SystemReport_SaveOK_Title: string;

  Settings_SystemReport_Start: string;

  Settings_SystemReport_Submit: string;

  Settings_SystemReport_SubmitFail_Desc: string;

  Settings_SystemReport_SubmitFail_Title: string;

  Settings_SystemReport_SubmitOK_Cancel: string;

  Settings_SystemReport_SubmitOK_Desc: string;

  Settings_SystemReport_SubmitOK_OK: string;

  Settings_SystemReport_SubmitOK_Title: string;

  Settings_SystemReport_SubmitRequest_Cancel: string;

  Settings_SystemReport_SubmitRequest_Desc: string;

  Settings_SystemReport_SubmitRequest_OK: string;

  Settings_SystemReport_SubmitRequest_Title: string;

  Settings_SystemReport_Title: string;

  Settings_SystemReport_Uploading: string;

  Settings_TimeAndDate_24HourClock: string;

  Settings_TimeAndDate_24HourClock_Description: string;

  Settings_TimeAndDate_ChooseTimezone_OOBE: string;

  Settings_TimeAndDate_Timezone: string;

  Settings_Title: string;

  Settings_Tracing: string;

  Settings_Tracing_Description: string;

  Settings_UpdateChannel_Beta: string;

  Settings_UpdateChannel_Beta_Channel: string;

  Settings_UpdateChannel_Beta_Description: string;

  Settings_UpdateChannel_Preview: string;

  Settings_UpdateChannel_Preview_Channel: string;

  Settings_UpdateChannel_Preview_Description: string;

  Settings_UpdateChannel_Restart_KnownHardware: string;

  Settings_UpdateChannel_Restart_UnknownHardware: string;

  Settings_UpdateChannel_Stable: string;

  Settings_UpdateChannel_Stable_Channel: string;

  Settings_UpdateChannel_Stable_Description: string;

  Settings_UpdateChannelSelection: string;

  Settings_Updates_ApplyBIOSUpdate: string;

  Settings_Updates_ApplyClientUpdate: string;

  Settings_Updates_ApplyOSUpdate: string;

  Settings_Updates_BIOSUpdaterName: string;

  Settings_Updates_BlankScreenWarning_Cancel: string;

  Settings_Updates_BlankScreenWarning_OK: string;

  Settings_Updates_BlankScreenWarning_Text_KnownHardware: string;

  Settings_Updates_BlankScreenWarning_Text_UnknownHardware: string;

  Settings_Updates_BlankScreenWarning_Title: string;

  Settings_Updates_CheckForUpdates: string;

  Settings_Updates_Checking: string;

  Settings_Updates_CheckingProgressUnknown: string;

  Settings_Updates_ClientUpdaterName: string;

  Settings_Updates_Error_Battery: string;

  Settings_Updates_Error_Desc: string;

  Settings_Updates_Error_DiskFull: string;

  Settings_Updates_Error_FailedToDownload: string;

  Settings_Updates_Error_Title: string;

  Settings_Updates_Header: string;

  Settings_Updates_InstallBIOSVersion: string;

  Settings_Updates_InstallOSBuild: string;

  Settings_Updates_InsufficientBattery: string;

  Settings_Updates_Invalid: string;

  Settings_Updates_LowBattery_Line1: string;

  Settings_Updates_LowBattery_Line2: string;

  Settings_Updates_NoUpdatesAvailable: string;

  Settings_Updates_OSUpdaterName: string;

  Settings_Updates_PatchNotes: string;

  Settings_Updates_RestartClient: string;

  Settings_Updates_RestartClientNow: string;

  Settings_Updates_Restarting: string;

  Settings_Updates_RestartSystem: string;

  Settings_Updates_RestartSystemNow: string;

  Settings_Updates_ScaryBIOSWarningCancel: string;

  Settings_Updates_ScaryBIOSWarningLine1: string;

  Settings_Updates_ScaryBIOSWarningLine2: string;

  Settings_Updates_ScaryBIOSWarningOK: string;

  Settings_Updates_ScaryBIOSWarningTitle: string;

  Settings_Updates_Success: string;

  Settings_Updates_SystemUpdaterName: string;

  Settings_Updates_TestUpdaterName: string;

  Settings_Updates_TimeRemaining_HourAbbr: string;

  Settings_Updates_TimeRemaining_HourAbbrPlural: string;

  Settings_Updates_TimeRemaining_LessThanAMinute: string;

  Settings_Updates_TimeRemaining_MinuteAbbr: string;

  Settings_Updates_TimeRemaining_MinuteAbbrPlural: string;

  Settings_Updates_TimeRemaining_Unknown: string;

  Settings_Updates_Title: string;

  Settings_Updates_Title_Individual: string;

  Settings_Updates_UnknownUpdaterName: string;

  Settings_Updates_UpdateApply: string;

  Settings_Updates_UpdateApplying: string;

  Settings_Updates_UpdateApplying_Progress: string;

  Settings_Updates_UpdateApplying_ProgressUnknown: string;

  Settings_Updates_UpdateApplyingOOBE: string;

  Settings_Updates_UpdateDownload: string;

  Settings_Updates_UpdateDownloading: string;

  Settings_Updates_UpdateDownloading_Progress: string;

  Settings_Updates_UpdateDownloading_ProgressUnknown: string;

  Settings_Updates_UpdateDownloadingOOBE: string;

  Settings_Updates_UpdateError_ChargerRequired: string;

  Settings_Updates_UpdateError_Generic: string;

  Settings_Updates_UpdateError_InsufficientBattery: string;

  Settings_Updates_UpdateErrorOK: string;

  Settings_Updates_UpdateErrorTitle: string;

  Settings_Updates_UpdateInstall: string;

  Settings_Updates_UpdatePending: string;

  Settings_Updates_UpdateReadyToApply: string;

  Settings_Updates_UpdateStartingDownloadOOBE_KnownHardware: string;

  Settings_Updates_UpdateStartingDownloadOOBE_UnknownHardware: string;

  Settings_Updates_UpToDate: string;

  Settings_VRBattery_Percentage_Desc: string;

  SettingsController_AutosaveDescription: string;

  SettingsController_AutosaveName: string;

  SettingsController_XBoxDriver: string;

  SettingsController_XBoxDriverInstall: string;

  SettingsController_XboxDriverInstall_ErrorPendingReboot: string;

  SettingsController_XboxDriverInstall_Failure: string;

  SettingsController_XboxDriverInstall_ServiceFailure: string;

  SettingsController_XboxDriverInstall_Success: string;

  SettingsController_XboxDriverInstall_Title: string;

  SettingsController_XBoxDriverRebootPending: string;

  SettingsController_XboxDriverRestart_Later: string;

  SettingsController_XboxDriverRestart_Now: string;

  SettingsController_XBoxDriverUninstall: string;

  SettingsController_XboxDriverUninstall_Failure: string;

  SettingsController_XboxDriverUninstall_ServiceFailure: string;

  SettingsController_XboxDriverUninstall_Success: string;

  SettingsController_XboxDriverUninstall_Title: string;

  SettingsController_XBoxDriverUpdate: string;

  ShareDialog_Title: string;

  ShareMultipleToChatNotSupported: string;

  ShareSheet_ClipUploadNotAllowed: string;

  ShareSheet_LimitedClipNotAllowed: string;

  ShareSheet_LimitedScreenshotNotAllowed: string;

  ShareSheet_ScreenUploadNotAllowed: string;

  ShareSheet_ShareOnSteam: string;

  ShareSheet_ShareOnSteam_AllUploaded: string;

  ShareSheet_ShareOnSteam_PartialUploaded: string;

  ShareSheet_ShareOnSteam_PartialUploaded_Plural: string;

  ShareSheet_ShareOnSteam_UploadProgress: string;

  ShareSheet_ShareOnSteam_UploadProgress_Failures: string;

  ShareSheet_ShareOnSteam_UploadProgress_Failures_Plural: string;

  ShareUploadScreenshot_AddCaption: string;

  ShareUploadScreenshot_CaptionHeader: string;

  ShareUploadScreenshot_CloudUsage: string;

  ShareUploadScreenshot_Description: string;

  ShareUploadScreenshot_PermissionDenied: string;

  ShareUploadScreenshot_TagSpoiler: string;

  ShareUploadScreenshot_UnexpectedError: string;

  ShareUploadScreenshot_Uploading: string;

  Shelf_SectionHeader_ExpandTooltip: string;

  Shelf_SectionHeader_ExpandTooltipFilter: string;

  Showcase_AddNewShowcase: string;

  Showcase_AllCollections: string;

  Showcase_AllYourGames: string;

  Showcase_AllYourSoundtracks: string;

  Showcase_CurrentGame: string;

  Showcase_DeleteShowcase: string;

  Showcase_DoneReordering: string;

  Showcase_EmptyShowcaseHint: string;

  Showcase_GoToAllCollections: string;

  Showcase_GoToCollection: string;

  Showcase_PlayNext: string;

  Showcase_RecentGames: string;

  Showcase_SelectCategory: string;

  Shutdown: string;

  ShuttingDown: string;

  SignIn_Title: string;

  SignInHelp_Title: string;

  SignOut_Description: string;

  SignOut_Title: string;

  Sleep: string;

  SoundtrackControls_Browse: string;

  SoundtrackControls_OverlayLibrary_Back: string;

  SoundtrackControls_OverlayLibrary_Installed: string;

  SoundtrackControls_OverlayLibrary_Title: string;

  SP_WindowTitle_BigPicture: string;

  SP_WindowTitle_Configurator: string;

  SP_WindowTitle_Keyboard: string;

  SSA_Accept: string;

  SSA_ExitSteam: string;

  SSA_Explanation: string;

  SSA_OpenInBrowser: string;

  SSA_Title: string;

  SSA_TOC: string;

  StartPage_Community: string;

  StartPage_FriendActivity: string;

  StartPage_Friends: string;

  StartPage_Library: string;

  StartPage_News: string;

  StartPage_Servers: string;

  StartPage_Store: string;

  StartStreamingFrom: string;

  StartStreamingVRFrom: string;

  Steam_AppMustBeClosedToQuit_Info: string;

  Steam_AppUpdateError_0: string;

  Steam_AppUpdateError_1: string;

  Steam_AppUpdateError_2: string;

  Steam_AppUpdateError_3: string;

  Steam_AppUpdateError_4: string;

  Steam_AppUpdateError_5: string;

  Steam_AppUpdateError_6: string;

  Steam_AppUpdateError_7: string;

  Steam_AppUpdateError_8: string;

  Steam_AppUpdateError_9: string;

  Steam_AppUpdateError_10: string;

  Steam_AppUpdateError_11: string;

  Steam_AppUpdateError_12: string;

  Steam_AppUpdateError_13: string;

  Steam_AppUpdateError_14: string;

  Steam_AppUpdateError_15: string;

  Steam_AppUpdateError_16: string;

  Steam_AppUpdateError_17: string;

  Steam_AppUpdateError_18: string;

  Steam_AppUpdateError_19: string;

  Steam_AppUpdateError_20: string;

  Steam_AppUpdateError_21: string;

  Steam_AppUpdateError_22: string;

  Steam_AppUpdateError_23: string;

  Steam_AppUpdateError_24: string;

  Steam_AppUpdateError_25: string;

  Steam_AppUpdateError_26: string;

  Steam_AppUpdateError_27: string;

  Steam_AppUpdateError_28: string;

  Steam_AppUpdateError_29: string;

  Steam_AppUpdateError_30: string;

  Steam_AppUpdateError_31: string;

  Steam_AppUpdateError_32: string;

  Steam_AppUpdateError_33: string;

  Steam_AppUpdateError_34: string;

  Steam_AppUpdateError_35: string;

  Steam_AppUpdateError_36: string;

  Steam_AppUpdateError_37: string;

  Steam_AppUpdateError_38: string;

  Steam_AppUpdateError_39: string;

  Steam_AppUpdateError_40: string;

  Steam_AppUpdateError_41: string;

  Steam_AppUpdateError_42: string;

  Steam_AppUpdateError_43: string;

  Steam_AppUpdateError_44: string;

  Steam_AppUpdateError_45: string;

  Steam_AppUpdateError_46: string;

  Steam_AppUpdateError_47: string;

  Steam_AppUpdateError_48: string;

  Steam_AppUpdateError_49: string;

  Steam_AppUpdateError_50: string;

  Steam_AppUpdateError_51: string;

  Steam_AppUpdateError_52: string;

  Steam_AppUpdateError_53: string;

  Steam_AppUpdateError_54: string;

  Steam_AppUpdateError_55: string;

  Steam_AppUpdateError_56: string;

  Steam_AppUpdateError_57: string;

  Steam_DualSense_FirmwareUpdate_Ignore: string;

  Steam_DualSense_FirmwareUpdate_Remind: string;

  Steam_DualSense_FirmwareUpdate_Text: string;

  Steam_DualSense_FirmwareUpdate_Title: string;

  Steam_DualSense_FirmwareUpdate_Update: string;

  Steam_EOLAlert: string;

  Steam_EOLAlert_Plural: string;

  Steam_ErrorCondition_AccountDisabled: string;

  Steam_ErrorCondition_LoggedInElsewhere: string;

  Steam_ErrorCondition_Offline: string;

  Steam_ErrorCondition_OK: string;

  Steam_ErrorCondition_RefreshLogin: string;

  Steam_ErrorCondition_SteamGuard: string;

  Steam_ErrorCondition_Title: string;

  Steam_ErrorCondition_UnhandledMailTo: string;

  Steam_IncorrectVRSDKWarning_Desc: string;

  Steam_Language_Selection_Label: string;

  Steam_LaunchOption_Application: string;

  Steam_LaunchOption_Benchmark: string;

  Steam_LaunchOption_Config: string;

  Steam_LaunchOption_Editor: string;

  Steam_LaunchOption_Game: string;

  Steam_LaunchOption_Manual: string;

  Steam_LaunchOption_Multiplayer: string;

  Steam_LaunchOption_openvroverlay: string;

  Steam_LaunchOption_openxr: string;

  Steam_LaunchOption_osvr: string;

  Steam_LaunchOption_othervr: string;

  Steam_LaunchOption_SafeMode: string;

  Steam_LaunchOption_Server: string;

  Steam_LaunchOption_VR: string;

  Steam_OculusOnlyGameWarning_Desc: string;

  Steam_OculusOnlyGameWarning_Title: string;

  Steam_OSVersionUnsupported: string;

  Steam_RefreshLogin_AccountAlreadyLoggedInContinue: string;

  Steam_RefreshLogin_AccountAlreadyLoggedInNeedPassword: string;

  Steam_RefreshLogin_AccountAlreadyLoggedInNeedPasswordToast: string;

  Steam_RefreshLogin_AccountAlreadyLoggedInNeedShutdown: string;

  Steam_RefreshLogin_AccountAlreadyLoggedInNoPassword: string;

  Steam_RefreshLogin_AccountAlreadyLoggedReAuth: string;

  Steam_RefreshLogin_InfoTicketExpired: string;

  Steam_RefreshLogin_InvalidPassword: string;

  Steam_RefreshLogin_InvalidTwoFactorCode: string;

  Steam_Reloading_Title: string;

  Steam_Shutdown_Dialog_Title: string;

  Steam_Shutdown_Finishing_Download: string;

  Steam_Shutdown_ForceQuit: string;

  Steam_Shutdown_Generic: string;

  Steam_Shutdown_Out_Of_Battery: string;

  Steam_Shutdown_Waiting_For_Cloud: string;

  Steam_Shutdown_Waiting_For_Download: string;

  Steam_Shutdown_Waiting_For_Download_Anonymous: string;

  Steam_Shutdown_Waiting_For_Game: string;

  Steam_Shutdown_Waiting_For_Logoff: string;

  Steam_Welcome: string;

  SteamChina_DurationControl_Init_1: string;

  SteamChina_DurationControl_Init_2: string;

  SteamChina_DurationControl_Init_3: string;

  SteamChina_DurationControl_Init_4: string;

  SteamChina_DurationControl_Init_5: string;

  SteamChina_Overlay_DurationControl_Init: string;

  SteamDeckName: string;

  SteamDock_UnsupportedFirmwareAreYouSureModal_Cancel: string;

  SteamDock_UnsupportedFirmwareAreYouSureModal_Description: string;

  SteamDock_UnsupportedFirmwareAreYouSureModal_OK: string;

  SteamDock_UnsupportedFirmwareAreYouSureModal_Title: string;

  SteamDock_UnsupportedFirmwareModal_Cancel: string;

  SteamDock_UnsupportedFirmwareModal_Description: string;

  SteamDock_UnsupportedFirmwareModal_OK: string;

  SteamDock_UnsupportedFirmwareModal_Title: string;

  SteamFrameWirelessAdapterDialog_Description: string;

  SteamFrameWirelessAdapterDialog_DontShowAgain: string;

  SteamFrameWirelessAdapterDialog_Header: string;

  SteamFrameWirelessAdapterDialog_Pair: string;

  SteamInput_ChangeActionSet_Toast: string;

  SteamInputAPI_LogoText: string;

  SteamNetSockets_AppClose_Normal: string;

  SteamNetSockets_AppClose_Unusual: string;

  SteamNetSockets_Connected: string;

  SteamNetSockets_Connecting: string;

  SteamNetSockets_Disconnect_ConnectionTimedout: string;

  SteamNetSockets_Disconnect_InternalError: string;

  SteamNetSockets_Disconnect_LocalProblem_HostedServerPrimaryRelay: string;

  SteamNetSockets_Disconnect_LocalProblem_ManyRelays: string;

  SteamNetSockets_Disconnect_LocalProblem_NetworkConfig: string;

  SteamNetSockets_Disconnect_LocalProblem_Other: string;

  SteamNetSockets_Disconnect_P2P_Rendezvous: string;

  SteamNetSockets_Disconnect_RemoteProblem_BadCert: string;

  SteamNetSockets_Disconnect_RemoteProblem_BadCrypt: string;

  SteamNetSockets_Disconnect_RemoteProblem_Timeout: string;

  SteamNetSockets_Disconnect_RemoteProblem_TimeoutConnecting: string;

  SteamNetSockets_Disconnect_SteamConnectivity: string;

  SteamNetSockets_Disconnect_TimedOut: string;

  SteamNetSockets_Disconnect_Unusual: string;

  SteamNetSockets_FindingRoute: string;

  SteamNetSockets_PeerClose_App_Normal: string;

  SteamNetSockets_PeerClose_App_Unusual: string;

  SteamNetSockets_PeerClose_LocalProblem: string;

  SteamNetSockets_PeerClose_RemoteProblem_BadCert: string;

  SteamNetSockets_PeerClose_RemoteProblem_BadCrypt: string;

  SteamNetSockets_PeerClose_Ununusual: string;

  SteamNetworkingOption_Always: string;

  SteamNetworkingOption_Default: string;

  SteamNetworkingOption_Friends: string;

  SteamNetworkingOption_Never: string;

  SteamOS_CategoryLabel_Compatible: string;

  SteamOS_CategoryLabel_Unknown: string;

  SteamOS_CategoryLabel_Unsupported: string;

  SteamOS_CompatibilitySection_Details: string;

  SteamOS_CompatibilitySection_Title: string;

  SteamOS_FilterDescription_AllGames: string;

  SteamOS_FilterDescription_Compatible: string;

  SteamOS_FilterDescription_Compatible_Unknown: string;

  SteamOS_FilterLabel_AllGames: string;

  SteamOS_FilterLabel_Compatible: string;

  SteamOS_FilterLabel_Compatible_Unknown: string;

  SteamOS_OOBESupport_Subtitle: string;

  SteamOS_OOBESupport_Title: string;

  SteamReviewScore_0: string;

  SteamReviewScore_1: string;

  SteamReviewScore_2: string;

  SteamReviewScore_3: string;

  SteamReviewScore_4: string;

  SteamReviewScore_5: string;

  SteamReviewScore_6: string;

  SteamReviewScore_7: string;

  SteamReviewScore_8: string;

  SteamReviewScore_9: string;

  SteamUI_Dialog_HelpChangeEmail_Title: string;

  SteamUI_Dialog_HelpChangePassword_Title: string;

  SteamUI_Dialog_SupportMessage_Title: string;

  SteamUI_Dialog_SystemInfo_Close: string;

  SteamUI_Dialog_SystemInfo_Copy: string;

  SteamUI_Dialog_SystemInfo_Desc: string;

  SteamUI_Dialog_SystemInfo_ViewSurvey: string;

  SteamUI_Dialog_SystemInfo_ViewSystemRuntimeInfo: string;

  steamui_dummy: string;

  SteamUI_Selection_Arabic: string;

  SteamUI_Selection_Brazilian: string;

  SteamUI_Selection_Bulgarian: string;

  SteamUI_Selection_Czech: string;

  SteamUI_Selection_Danish: string;

  SteamUI_Selection_Dutch: string;

  SteamUI_Selection_English: string;

  SteamUI_Selection_Finnish: string;

  SteamUI_Selection_French: string;

  SteamUI_Selection_German: string;

  SteamUI_Selection_Greek: string;

  SteamUI_Selection_Hungarian: string;

  SteamUI_Selection_Indonesian: string;

  SteamUI_Selection_Italian: string;

  SteamUI_Selection_Japanese: string;

  SteamUI_Selection_Korean: string;

  SteamUI_Selection_Latam_Spanish: string;

  SteamUI_Selection_Norwegian: string;

  SteamUI_Selection_Polish: string;

  SteamUI_Selection_Portuguese: string;

  SteamUI_Selection_Romanian: string;

  SteamUI_Selection_Russian: string;

  SteamUI_Selection_Simplified_Chinese: string;

  SteamUI_Selection_Spanish: string;

  SteamUI_Selection_Swedish: string;

  SteamUI_Selection_Thai: string;

  SteamUI_Selection_Traditional_Chinese: string;

  SteamUI_Selection_Turkish: string;

  SteamUI_Selection_Ukrainian: string;

  SteamUI_Selection_Vietnamese: string;

  SteamUI_ValveSurvey_FinishButton: string;

  SteamUI_ValveSurvey_Prompt_No: string;

  SteamUI_ValveSurvey_Prompt_Yes: string;

  SteamUI_ValveSurvey_PromptLabel: string;

  SteamUI_ValveSurvey_PromptLabel2: string;

  SteamUI_ValveSurvey_ResultsButton: string;

  SteamUI_ValveSurvey_ResultsLabel: string;

  SteamUI_ValveSurvey_SendSurvey: string;

  SteamUI_ValveSurvey_Summary_3DNOW: string;

  SteamUI_ValveSurvey_Summary_AES: string;

  SteamUI_ValveSurvey_Summary_AGP: string;

  SteamUI_ValveSurvey_Summary_AGPGART: string;

  SteamUI_ValveSurvey_Summary_AGPGART_Unknown: string;

  SteamUI_ValveSurvey_Summary_Audio: string;

  SteamUI_ValveSurvey_Summary_AVX: string;

  SteamUI_ValveSurvey_Summary_AVX2: string;

  SteamUI_ValveSurvey_Summary_AVX512CD: string;

  SteamUI_ValveSurvey_Summary_AVX512ER: string;

  SteamUI_ValveSurvey_Summary_AVX512F: string;

  SteamUI_ValveSurvey_Summary_AVX512PF: string;

  SteamUI_ValveSurvey_Summary_AVX512VNNI: string;

  SteamUI_ValveSurvey_Summary_BasestationDevice: string;

  SteamUI_ValveSurvey_Summary_BMI1: string;

  SteamUI_ValveSurvey_Summary_BMI2: string;

  SteamUI_ValveSurvey_Summary_BootProtect_Disabled: string;

  SteamUI_ValveSurvey_Summary_BootProtect_Enabled: string;

  SteamUI_ValveSurvey_Summary_BootProtect_FailedDetect: string;

  SteamUI_ValveSurvey_Summary_BootProtect_UnknownVersion: string;

  SteamUI_ValveSurvey_Summary_BrowserCanvas2D: string;

  SteamUI_ValveSurvey_Summary_BrowserCanvasOOPRasterization: string;

  SteamUI_ValveSurvey_Summary_BrowserDirectRenderingDisplayCompositor: string;

  SteamUI_ValveSurvey_Summary_BrowserFeautureStatus_Disabled: string;

  SteamUI_ValveSurvey_Summary_BrowserFeautureStatus_Enabled: string;

  SteamUI_ValveSurvey_Summary_BrowserFeautureStatus_EnabledReadback: string;

  SteamUI_ValveSurvey_Summary_BrowserFeautureStatus_Forced: string;

  SteamUI_ValveSurvey_Summary_BrowserFeautureStatus_Invalid: string;

  SteamUI_ValveSurvey_Summary_BrowserFeautureStatus_Unavailable: string;

  SteamUI_ValveSurvey_Summary_BrowserFeautureStatus_Unknown: string;

  SteamUI_ValveSurvey_Summary_BrowserGpuCompositing: string;

  SteamUI_ValveSurvey_Summary_BrowserGPUStatu_Disabled: string;

  SteamUI_ValveSurvey_Summary_BrowserGPUStatu_Enabled: string;

  SteamUI_ValveSurvey_Summary_BrowserGPUStatu_Invalid: string;

  SteamUI_ValveSurvey_Summary_BrowserGpuStatus: string;

  SteamUI_ValveSurvey_Summary_BrowserMultipleRasterThreads: string;

  SteamUI_ValveSurvey_Summary_BrowserOpenGL: string;

  SteamUI_ValveSurvey_Summary_BrowserRasterization: string;

  SteamUI_ValveSurvey_Summary_BrowserRawDraw: string;

  SteamUI_ValveSurvey_Summary_BrowserSkiaGraphite: string;

  SteamUI_ValveSurvey_Summary_BrowserVideoDecode: string;

  SteamUI_ValveSurvey_Summary_BrowserVideoEncode: string;

  SteamUI_ValveSurvey_Summary_BrowserVulkan: string;

  SteamUI_ValveSurvey_Summary_BrowserWebGL: string;

  SteamUI_ValveSurvey_Summary_BrowserWebGL2: string;

  SteamUI_ValveSurvey_Summary_BrowserWebGPU: string;

  SteamUI_ValveSurvey_Summary_BrowserWebNN: string;

  SteamUI_ValveSurvey_Summary_Bus: string;

  SteamUI_ValveSurvey_Summary_Bus_Unknown: string;

  SteamUI_ValveSurvey_Summary_CDROM: string;

  SteamUI_ValveSurvey_Summary_Client: string;

  SteamUI_ValveSurvey_Summary_ClientVersion: string;

  SteamUI_ValveSurvey_Summary_CMOV: string;

  SteamUI_ValveSurvey_Summary_CMPXCHG16B: string;

  SteamUI_ValveSurvey_Summary_ColorDepth: string;

  SteamUI_ValveSurvey_Summary_ColorDepth_Unknown: string;

  SteamUI_ValveSurvey_Summary_Computer: string;

  SteamUI_ValveSurvey_Summary_ComputerManufacturer: string;

  SteamUI_ValveSurvey_Summary_ComputerModel: string;

  SteamUI_ValveSurvey_Summary_ControllerDevice: string;

  SteamUI_ValveSurvey_Summary_CPUBrand: string;

  SteamUI_ValveSurvey_Summary_CPUFamily: string;

  SteamUI_ValveSurvey_Summary_CPUModel: string;

  SteamUI_ValveSurvey_Summary_CPUProcessorType: string;

  SteamUI_ValveSurvey_Summary_CPUSpeed: string;

  SteamUI_ValveSurvey_Summary_CPUStepping: string;

  SteamUI_ValveSurvey_Summary_CPUVendor: string;

  SteamUI_ValveSurvey_Summary_CrossfireEnabled: string;

  SteamUI_ValveSurvey_Summary_DesktopResolution: string;

  SteamUI_ValveSurvey_Summary_DesktopResolution_Unknown: string;

  SteamUI_ValveSurvey_Summary_DesktopSystem: string;

  SteamUI_ValveSurvey_Summary_DirectXCard: string;

  SteamUI_ValveSurvey_Summary_DirectXCard_Unknown: string;

  SteamUI_ValveSurvey_Summary_DirectXDriverName: string;

  SteamUI_ValveSurvey_Summary_DirectXDriverName_Unknown: string;

  SteamUI_ValveSurvey_Summary_DirectXDriverVersion: string;

  SteamUI_ValveSurvey_Summary_DirectXDriverVersion_Unknown: string;

  SteamUI_ValveSurvey_Summary_DiskSerialHash: string;

  SteamUI_ValveSurvey_Summary_DisplayDevice: string;

  SteamUI_ValveSurvey_Summary_DisplayType: string;

  SteamUI_ValveSurvey_Summary_DisplayType_Unknown: string;

  SteamUI_ValveSurvey_Summary_DriverDate: string;

  SteamUI_ValveSurvey_Summary_DriverDate_Unknown: string;

  SteamUI_ValveSurvey_Summary_DVD: string;

  SteamUI_ValveSurvey_Summary_Eyefinity: string;

  SteamUI_ValveSurvey_Summary_F16C: string;

  SteamUI_ValveSurvey_Summary_FCMOV: string;

  SteamUI_ValveSurvey_Summary_FMA: string;

  SteamUI_ValveSurvey_Summary_FreeHDBlock: string;

  SteamUI_ValveSurvey_Summary_Game_Display_Settings: string;

  SteamUI_ValveSurvey_Summary_GameController: string;

  SteamUI_ValveSurvey_Summary_GameController_None: string;

  SteamUI_ValveSurvey_Summary_HardwareModel: string;

  SteamUI_ValveSurvey_Summary_HDAvail: string;

  SteamUI_ValveSurvey_Summary_HDDCount: string;

  SteamUI_ValveSurvey_Summary_HDDSizes: string;

  SteamUI_ValveSurvey_Summary_HmdDevice: string;

  SteamUI_ValveSurvey_Summary_HyperThreading: string;

  SteamUI_ValveSurvey_Summary_InstallDate: string;

  SteamUI_ValveSurvey_Summary_IP: string;

  SteamUI_ValveSurvey_Summary_IPAddress: string;

  SteamUI_ValveSurvey_Summary_KernelName: string;

  SteamUI_ValveSurvey_Summary_KernelVersion: string;

  SteamUI_ValveSurvey_Summary_LAHFSAHF: string;

  SteamUI_ValveSurvey_Summary_LANG: string;

  SteamUI_ValveSurvey_Summary_LanguageId: string;

  SteamUI_ValveSurvey_Summary_LaptopSystem: string;

  SteamUI_ValveSurvey_Summary_LogicalPlural: string;

  SteamUI_ValveSurvey_Summary_LogicalSingular: string;

  SteamUI_ValveSurvey_Summary_MACAddressHash: string;

  SteamUI_ValveSurvey_Summary_Media: string;

  SteamUI_ValveSurvey_Summary_Memory: string;

  SteamUI_ValveSurvey_Summary_Misc: string;

  SteamUI_ValveSurvey_Summary_MonitorModel: string;

  SteamUI_ValveSurvey_Summary_MonitorModel_Unknown: string;

  SteamUI_ValveSurvey_Summary_MonitorVendor: string;

  SteamUI_ValveSurvey_Summary_MonitorVendor_Unknown: string;

  SteamUI_ValveSurvey_Summary_Month_1: string;

  SteamUI_ValveSurvey_Summary_Month_2: string;

  SteamUI_ValveSurvey_Summary_Month_3: string;

  SteamUI_ValveSurvey_Summary_Month_4: string;

  SteamUI_ValveSurvey_Summary_Month_5: string;

  SteamUI_ValveSurvey_Summary_Month_6: string;

  SteamUI_ValveSurvey_Summary_Month_7: string;

  SteamUI_ValveSurvey_Summary_Month_8: string;

  SteamUI_ValveSurvey_Summary_Month_9: string;

  SteamUI_ValveSurvey_Summary_Month_10: string;

  SteamUI_ValveSurvey_Summary_Month_11: string;

  SteamUI_ValveSurvey_Summary_Month_12: string;

  SteamUI_ValveSurvey_Summary_MSAAModes: string;

  SteamUI_ValveSurvey_Summary_MSAAModes_Unknown: string;

  SteamUI_ValveSurvey_Summary_NetworkSpeed: string;

  SteamUI_ValveSurvey_Summary_NoIP: string;

  SteamUI_ValveSurvey_Summary_NoTouchInputDevices: string;

  SteamUI_ValveSurvey_Summary_NTFS: string;

  SteamUI_ValveSurvey_Summary_NumberOfDisplayAdapters: string;

  SteamUI_ValveSurvey_Summary_NumberOfDisplayAdapters_Unknown: string;

  SteamUI_ValveSurvey_Summary_NumberOfMonitors: string;

  SteamUI_ValveSurvey_Summary_NumberOfMonitors_Unknown: string;

  SteamUI_ValveSurvey_Summary_OpenGL_Version: string;

  SteamUI_ValveSurvey_Summary_OSVersion: string;

  SteamUI_ValveSurvey_Summary_OSVersionString: string;

  SteamUI_ValveSurvey_Summary_OSWineString: string;

  SteamUI_ValveSurvey_Summary_PCIBusSpeed: string;

  SteamUI_ValveSurvey_Summary_PhysicalPlural: string;

  SteamUI_ValveSurvey_Summary_PhysicalSingular: string;

  SteamUI_ValveSurvey_Summary_PrefetchW: string;

  SteamUI_ValveSurvey_Summary_PrimaryMonitorPhysicalSize: string;

  SteamUI_ValveSurvey_Summary_PrimaryMonitorPhysicalSize_Unknown: string;

  SteamUI_ValveSurvey_Summary_PrimaryMonitorResolution: string;

  SteamUI_ValveSurvey_Summary_PrimaryMonitorResolution_Unknown: string;

  SteamUI_ValveSurvey_Summary_Processor: string;

  SteamUI_ValveSurvey_Summary_RAM: string;

  SteamUI_ValveSurvey_Summary_RDTSC: string;

  SteamUI_ValveSurvey_Summary_RefreshRate: string;

  SteamUI_ValveSurvey_Summary_RefreshRate_Unknown: string;

  SteamUI_ValveSurvey_Summary_RemovableDriveCount: string;

  SteamUI_ValveSurvey_Summary_RemovableDriveSizes: string;

  SteamUI_ValveSurvey_Summary_RenderModeD3D: string;

  SteamUI_ValveSurvey_Summary_RenderModeGL: string;

  SteamUI_ValveSurvey_Summary_RenderModeSoftware: string;

  SteamUI_ValveSurvey_Summary_RenderModeUnk: string;

  SteamUI_ValveSurvey_Summary_SecureBoot: string;

  SteamUI_ValveSurvey_Summary_SHA: string;

  SteamUI_ValveSurvey_Summary_SignatureSupport: string;

  SteamUI_ValveSurvey_Summary_SLICrossfireNotDetected: string;

  SteamUI_ValveSurvey_Summary_SLIEnabled: string;

  SteamUI_ValveSurvey_Summary_SoundCard: string;

  SteamUI_ValveSurvey_Summary_SSDCount: string;

  SteamUI_ValveSurvey_Summary_SSDSizes: string;

  SteamUI_ValveSurvey_Summary_SSE: string;

  SteamUI_ValveSurvey_Summary_SSE2: string;

  SteamUI_ValveSurvey_Summary_SSE3: string;

  SteamUI_ValveSurvey_Summary_SSE4a: string;

  SteamUI_ValveSurvey_Summary_SSE41: string;

  SteamUI_ValveSurvey_Summary_SSE42: string;

  SteamUI_ValveSurvey_Summary_SSSE3: string;

  SteamUI_ValveSurvey_Summary_SteamRuntimeVersion: string;

  SteamUI_ValveSurvey_Summary_Storage: string;

  SteamUI_ValveSurvey_Summary_Supported: string;

  SteamUI_ValveSurvey_Summary_TouchInputDevices: string;

  SteamUI_ValveSurvey_Summary_TPM: string;

  SteamUI_ValveSurvey_Summary_TrackerDevice: string;

  SteamUI_ValveSurvey_Summary_UnknownMedia: string;

  SteamUI_ValveSurvey_Summary_Unsupported: string;

  SteamUI_ValveSurvey_Summary_UploadFailed: string;

  SteamUI_ValveSurvey_Summary_VideoCard: string;

  SteamUI_ValveSurvey_Summary_VideoDeviceID: string;

  SteamUI_ValveSurvey_Summary_VideoDeviceID_Unknown: string;

  SteamUI_ValveSurvey_Summary_VideoDriverName: string;

  SteamUI_ValveSurvey_Summary_VideoDriverName_Unknown: string;

  SteamUI_ValveSurvey_Summary_VideoDriverVersion: string;

  SteamUI_ValveSurvey_Summary_VideoDriverVersion_Unknown: string;

  SteamUI_ValveSurvey_Summary_VideoRevision: string;

  SteamUI_ValveSurvey_Summary_VideoRevision_Unknown: string;

  SteamUI_ValveSurvey_Summary_VideoVendorID: string;

  SteamUI_ValveSurvey_Summary_VideoVendorID_Unknown: string;

  SteamUI_ValveSurvey_Summary_VRAMSize: string;

  SteamUI_ValveSurvey_Summary_VRAMSize_Unknown: string;

  SteamUI_ValveSurvey_Summary_VRDevice: string;

  SteamUI_ValveSurvey_Summary_VRHardware: string;

  SteamUI_ValveSurvey_Summary_VRHeadset: string;

  SteamUI_ValveSurvey_Summary_VRHeadset_None: string;

  SteamUI_ValveSurvey_Summary_VRMostTrackersCount: string;

  SteamUI_ValveSurvey_Summary_VRTracker_Config: string;

  SteamUI_ValveSurvey_Summary_VRTracker_Config_None: string;

  SteamUI_ValveSurvey_Summary_XServerVendorName: string;

  SteamUI_ValveSurvey_Summary_XServerVendorRelease: string;

  SteamUI_ValveSurvey_Summary_XWindowManagerName: string;

  SteamUI_ValveSurvey_SummaryLabel: string;

  SteamUI_ValveSurvey_Title: string;

  SteamVRInstall_Description: string;

  SteamVRInstall_DontShowAgain: string;

  SteamVRInstall_Header: string;

  SteamVRInstall_Help: string;

  SteamVRInstall_InstallSteamVR: string;

  SteamVRInstall_LaunchSteamVR: string;

  SteamVRInstall_OculusHelp: string;

  StopStreaming: string;

  StopStreamingAndSuspendDevice: string;

  StopStreamingFrom: string;

  StopStreamingTo: string;

  Store_Loading: string;

  StoreSettings_DiscoveryQueue_Button: string;

  StoreSettings_DiscoveryQueue_Description: string;

  StoreSettings_DiscoveryQueue_Label: string;

  StoreSettings_Exclusions_Button: string;

  StoreSettings_Exclusions_Description: string;

  StoreSettings_Exclusions_Label: string;

  StoreSettings_LiveBroadcasts_Button: string;

  StoreSettings_LiveBroadcasts_Description: string;

  StoreSettings_LiveBroadcasts_Label: string;

  StoreSettings_MatureContent_Button: string;

  StoreSettings_MatureContent_Description: string;

  StoreSettings_MatureContent_Label: string;

  StoreSettings_NewOnSteamQueue_Button: string;

  StoreSettings_NewOnSteamQueue_Description: string;

  StoreSettings_NewOnSteamQueue_Label: string;

  StoreSettings_Platforms_Button: string;

  StoreSettings_Platforms_Description: string;

  StoreSettings_Platforms_Label: string;

  StoreSettings_SteamDeckFeedback_Button: string;

  StoreSettings_SteamDeckFeedback_Description: string;

  StoreSettings_SteamDeckFeedback_Label: string;

  StreamingClient_AnotherDevice: string;

  StreamingClient_LinkDesc_Generic: string;

  StreamingClient_LinkDesc_Specific_Mobile: string;

  StreamingClient_LinkDesc_Specific_Phone: string;

  StreamingClient_LinkDesc_Specific_Tablet: string;

  StreamingClient_LinkDesc_Specific_TV: string;

  StreamingClient_Menu_KnownHardware: string;

  StreamingClient_Menu_UnknownHardware: string;

  StreamingClient_MobileDevice: string;

  StreamingClient_Phone: string;

  StreamingClient_Select_RemotePlayMobile: string;

  StreamingClient_Select_RemotePlayPhone: string;

  StreamingClient_Select_RemotePlayTablet: string;

  StreamingClient_Select_RemotePlayTV: string;

  StreamingClient_Select_RemotePlayTVMobile: string;

  StreamingClient_Select_RemotePlayTVPhone: string;

  StreamingClient_Select_RemotePlayTVTablet: string;

  StreamingClient_Select_ThisDevice: string;

  StreamingClient_Select_ThisMachine: string;

  StreamingClient_Select_ThisSteamDeck: string;

  StreamingClient_StreamFrom: string;

  StreamingClient_TabletDevice: string;

  StreamingClient_ThisComputer: string;

  StreamingClient_ThisDeck: string;

  StreamingClient_ThisDevice: string;

  StreamingClient_TV: string;

  Suspending: string;

  SuspendResumeLoggingIn: string;

  SuspendResumeSyncingCloud: string;

  SuspendResumeWaitingForApp: string;

  SwitchingToDesktop: string;

  SwitchToDesktop: string;

  TaskbarOption_AlwaysExit: string;

  TaskbarOption_Away: string;

  TaskbarOption_BigPicture: string;

  TaskbarOption_CloseBigPicture: string;

  TaskbarOption_Community: string;

  TaskbarOption_Console: string;

  TaskbarOption_Exit: string;

  TaskbarOption_FriendActivity: string;

  TaskbarOption_Friends: string;

  TaskbarOption_Invisible: string;

  TaskbarOption_MyGames: string;

  TaskbarOption_Offline: string;

  TaskbarOption_Online: string;

  TaskbarOption_Screenshots: string;

  TaskbarOption_Servers: string;

  TaskbarOption_Settings: string;

  TaskbarOption_StopStreaming: string;

  TaskbarOption_Store: string;

  TaskbarOption_VR: string;

  TaskbarOptions_Destinations: string;

  TaskbarOptions_Online: string;

  ThirdPartyLicenses_Header: string;

  ThirdPartyLicenses_Hide_License: string;

  ThirdPartyLicenses_Link: string;

  ThirdPartyLicenses_Show_License: string;

  ThirdPartyLicenses_SourceCode_Header: string;

  ThirdPartyLicenses_SourceCode_OpenLink: string;

  ThirdPartyLicenses_SourceCode_SteamOS: string;

  TimedTrial_ContinuePlaying: string;

  TimedTrial_SpotlightExp_Desc: string;

  TimedTrial_SpotlightExp_DescMasterSub: string;

  TimelineDialog_ClipPhase: string;

  TimeZoneCities_Afghanistan: string;

  TimeZoneCities_Alaska: string;

  TimeZoneCities_Arabia: string;

  TimeZoneCities_Arabian: string;

  TimeZoneCities_Atlantic: string;

  TimeZoneCities_Azores: string;

  TimeZoneCities_Brazil: string;

  TimeZoneCities_CapeVerde: string;

  TimeZoneCities_Caucasus: string;

  TimeZoneCities_Central: string;

  TimeZoneCities_CentralAfrica: string;

  TimeZoneCities_CentralAmerica: string;

  TimeZoneCities_CentralAsia: string;

  TimeZoneCities_CentralAustraliaA: string;

  TimeZoneCities_CentralAustraliaD: string;

  TimeZoneCities_CentralEurope: string;

  TimeZoneCities_CentralPacific: string;

  TimeZoneCities_Chile: string;

  TimeZoneCities_China: string;

  TimeZoneCities_EastAfrica: string;

  TimeZoneCities_EastCanada: string;

  TimeZoneCities_Eastern: string;

  TimeZoneCities_EasternAustralia: string;

  TimeZoneCities_EasternAustraliaB: string;

  TimeZoneCities_EasternEurope: string;

  TimeZoneCities_Fiji: string;

  TimeZoneCities_GMT: string;

  TimeZoneCities_Greenland: string;

  TimeZoneCities_Hawaii: string;

  TimeZoneCities_India: string;

  TimeZoneCities_Indiana: string;

  TimeZoneCities_Iran: string;

  TimeZoneCities_Israel: string;

  TimeZoneCities_Japan: string;

  TimeZoneCities_Korea: string;

  TimeZoneCities_Moscow: string;

  TimeZoneCities_Mountain: string;

  TimeZoneCities_MountainArizona: string;

  TimeZoneCities_MountainMexico: string;

  TimeZoneCities_Myanmar: string;

  TimeZoneCities_Nepal: string;

  TimeZoneCities_NewZealand: string;

  TimeZoneCities_NorthAsia: string;

  TimeZoneCities_NorthAsiaEast: string;

  TimeZoneCities_NorthCentralAsia: string;

  TimeZoneCities_Pacific: string;

  TimeZoneCities_SAmericaEast: string;

  TimeZoneCities_SAmericaPacific: string;

  TimeZoneCities_SAmericaWestern: string;

  TimeZoneCities_Samoa: string;

  TimeZoneCities_Saskatchewan: string;

  TimeZoneCities_Singapore: string;

  TimeZoneCities_SoutheastAsia: string;

  TimeZoneCities_Taipei: string;

  TimeZoneCities_Tonga: string;

  TimeZoneCities_Vladivostok: string;

  TimeZoneCities_WestAfrica: string;

  TimeZoneCities_WestAsia: string;

  TimeZoneCities_WestAustralia: string;

  TimeZoneCities_WestPacific: string;

  TimeZoneCities_Yakutsk: string;

  TimeZoneCities_Yekaterinburg: string;

  TimeZoneOffset: string;

  TimeZoneRegion_Afghanistan: string;

  TimeZoneRegion_Alaska: string;

  TimeZoneRegion_Arabia: string;

  TimeZoneRegion_Arabian: string;

  TimeZoneRegion_Atlantic: string;

  TimeZoneRegion_Azores: string;

  TimeZoneRegion_Brazil: string;

  TimeZoneRegion_CapeVerde: string;

  TimeZoneRegion_Caucasus: string;

  TimeZoneRegion_Central: string;

  TimeZoneRegion_CentralAfrica: string;

  TimeZoneRegion_CentralAmerica: string;

  TimeZoneRegion_CentralAsia: string;

  TimeZoneRegion_CentralAustraliaA: string;

  TimeZoneRegion_CentralAustraliaD: string;

  TimeZoneRegion_CentralEurope: string;

  TimeZoneRegion_CentralPacific: string;

  TimeZoneRegion_Chile: string;

  TimeZoneRegion_China: string;

  TimeZoneRegion_EastAfrica: string;

  TimeZoneRegion_EastCanada: string;

  TimeZoneRegion_Eastern: string;

  TimeZoneRegion_EasternAustralia: string;

  TimeZoneRegion_EasternAustraliaB: string;

  TimeZoneRegion_EasternEurope: string;

  TimeZoneRegion_Fiji: string;

  TimeZoneRegion_GMT: string;

  TimeZoneRegion_Greenland: string;

  TimeZoneRegion_Hawaii: string;

  TimeZoneRegion_India: string;

  TimeZoneRegion_Indiana: string;

  TimeZoneRegion_Iran: string;

  TimeZoneRegion_Israel: string;

  TimeZoneRegion_Japan: string;

  TimeZoneRegion_Korea: string;

  TimeZoneRegion_Moscow: string;

  TimeZoneRegion_Mountain: string;

  TimeZoneRegion_MountainArizona: string;

  TimeZoneRegion_MountainMexico: string;

  TimeZoneRegion_Myanmar: string;

  TimeZoneRegion_Nepal: string;

  TimeZoneRegion_NewZealand: string;

  TimeZoneRegion_NorthAsia: string;

  TimeZoneRegion_NorthAsiaEast: string;

  TimeZoneRegion_NorthCentralAsia: string;

  TimeZoneRegion_Pacific: string;

  TimeZoneRegion_SAmericaEast: string;

  TimeZoneRegion_SAmericaPacific: string;

  TimeZoneRegion_SAmericaWestern: string;

  TimeZoneRegion_Samoa: string;

  TimeZoneRegion_Singapore: string;

  TimeZoneRegion_SoutheastAsia: string;

  TimeZoneRegion_Taipei: string;

  TimeZoneRegion_Tonga: string;

  TimeZoneRegion_Vladivostok: string;

  TimeZoneRegion_WestAfrica: string;

  TimeZoneRegion_WestAsia: string;

  TimeZoneRegion_WestAustralia: string;

  TimeZoneRegion_WestPacific: string;

  TimeZoneRegion_Yakutsk: string;

  TimeZoneRegion_Yekaterinburg: string;

  TouchMenuIcon_Actions: string;

  TouchMenuIcon_Ammo: string;

  TouchMenuIcon_Game: string;

  TouchMenuIcon_Input: string;

  TouchMenuIcon_Inventory: string;

  TouchMenuIcon_Magic: string;

  TouchMenuIcon_Media: string;

  TouchMenuIcon_Menu: string;

  TouchMenuIcon_Movement: string;

  TouchMenuIcon_Other: string;

  TouchMenuIcon_Social: string;

  TouchMenuIcon_Targets: string;

  TouchMenuIcon_User: string;

  TouchMenuIcon_Utility: string;

  TouchMenuIcon_Vehice: string;

  TouchMenuIcon_Weapons: string;

  TrendingWithFriends_Title: string;

  TritonDockedPairingPrompt_Description: string;

  TritonDockedPairingPrompt_Description_Failed: string;

  TritonDockedPairingPrompt_Description_InProgress: string;

  TritonDockedPairingPrompt_Description_Success: string;

  TritonDockedPairingPrompt_Pair: string;

  TritonDockedPairingPrompt_Title: string;

  TritonUSBPairingPrompt_Description: string;

  TritonUSBPairingPrompt_Description_Failed: string;

  TritonUSBPairingPrompt_Description_InProgress: string;

  TritonUSBPairingPrompt_Description_Machine: string;

  TritonUSBPairingPrompt_Description_Puck: string;

  TritonUSBPairingPrompt_Description_Success: string;

  TritonUSBPairingPrompt_PairExternal: string;

  TritonUSBPairingPrompt_PairInternal: string;

  TritonUSBPairingPrompt_Title: string;

  TryAgain: string;

  UGC_Spoilers_Field: string;

  UGC_Spoilers_Field_None: string;

  UGC_Spoilers_Field_Yes: string;

  UGC_Visibility_Field: string;

  UninstallDialog_AppUpdateError: string;

  UninstallDialog_Busy: string;

  UninstallDialog_Confirmation_Demo: string;

  UninstallDialog_Confirmation_Multiple: string;

  UninstallDialog_Confirmation_Single: string;

  UninstallDialog_ErrorMessage: string;

  UninstallDialog_SecuROM: string;

  UninstallDialog_Title: string;

  UninstallDialog_Uninstall: string;

  UninstallDialog_UnknownError: string;

  UninstallingDialog_Uninstalling: string;

  UninstallingDialog_UninstallingApp: string;

  UninstallingDialog_WaitingForPassword: string;

  Unit_Degree_Symbol: string;

  Unit_DegreePerSecond_Symbol: string;

  Unit_Milliseconds: string;

  Unit_Multiplier: string;

  Unit_Percent: string;

  Unit_Pixels: string;

  Unit_UnitsPerSecond: string;

  UserManagement_AccountDetails: string;

  UserManagement_AccountDetails_Description: string;

  UserManagement_ActiveSupportAlert: string;

  UserManagement_AddFriends: string;

  UserManagement_AddFunds: string;

  UserManagement_CurrentAccount: string;

  UserManagement_EditProfileName_Change: string;

  UserManagement_EditProfileName_Description: string;

  UserManagement_EditProfileName_Error_Empty: string;

  UserManagement_EditProfileName_Error_Generic: string;

  UserManagement_EditProfileName_Error_Server: string;

  UserManagement_EditProfileName_Placeholder: string;

  UserManagement_FriendCode: string;

  UserManagement_FriendsStatus: string;

  UserManagement_FriendsStatus_Change: string;

  UserManagement_FriendsStatus_Description: string;

  UserManagement_GoOnline_Desc: string;

  UserManagement_GoOnline_NoNetwork: string;

  UserManagement_OfflineMode_Desc: string;

  UserManagement_OfflineMode_MustCloseGames: string;

  UserManagement_OfflineMode_NoNetwork: string;

  UserManagement_Privacy: string;

  UserManagement_Privacy_Description: string;

  UserManagement_SigningIn: string;

  UserManagement_SteamClient_Status: string;

  UserManagement_SteamClient_Status_Disconnected: string;

  UserManagement_SteamClient_Status_Offline: string;

  UserManagement_SteamClient_Status_Online: string;

  UserManagement_ViewProfile: string;

  UserManagement_ViewSupportAlert: string;

  UserManagement_WalletBalance: string;

  UserManagement_WalletBalanceWithPending: string;

  VideoError_PlaybackUnsupported: string;

  VideoError_PlaybackUnsupported_Description_KnownHardware: string;

  VideoError_PlaybackUnsupported_Description_UnknownHardware: string;

  ViewAccountDropdown: string;

  ViewAnnouncements: string;

  ViewNotifications: string;

  Voice_Button_Show: string;

  Voice_DefaultCommunicationsDefault: string;

  Voice_DefaultDevice: string;

  Voice_ShowAdvanced: string;

  VR_Error_ComponentBusy: string;

  VR_Error_ComponentNotInstalled: string;

  VR_Error_CrashProtection: string;

  VR_Error_Query_Cancel: string;

  VR_Error_Query_IgnoreSkip: string;

  VR_Error_Query_InstallSteamVR: string;

  VR_Error_Query_Yes: string;

  VR_Error_Title: string;

  VR_Error_UnknownError: string;

  VR_Error_VRSkipParam: string;

  VR_Notice_PathChanged_Message: string;

  VR_Notice_PathChanged_Title: string;

  VRDashboard_AddDesktopWindow: string;

  VRDashboard_LaunchNonSteamApp: string;

  VRDashboardBar_AmbidextrousController: string;

  VRDashboardBar_AmethystBodyTracker: string;

  VRDashboardBar_BatteryPopup_Devices: string;

  VRDashboardBar_BatteryStatus: string;

  VRDashboardBar_DisplaySettings_DisplayBrightness: string;

  VRDashboardBar_HaritoraXTracker: string;

  VRDashboardBar_Headset: string;

  VRDashboardBar_LeftController: string;

  VRDashboardBar_QuickSettings_Header: string;

  VRDashboardBar_QuickSettings_ViewAllSettings: string;

  VRDashboardBar_RebocapTracker: string;

  VRDashboardBar_RightController: string;

  VRDashboardBar_SlimeVRVirtualTracker: string;

  VRDashboardBar_swift: string;

  VRDashboardBar_TundraTracker: string;

  VRDashboardBar_UnknownDevice: string;

  'VRDashboardBar_VIVETracker3.0MV': string;

  VRDashboardBar_VIVETrackerProMV: string;

  VRDashboardBar_VIVEUltimateTracker1: string;

  VRDashboardBar_VIVEUltimateTracker2: string;

  VRDashboardBar_VIVEUltimateTracker3: string;

  VRDashboardBar_WifiPopup_ConnectingToWifi: string;

  VRDashboardBar_WifiPopup_NoConnection: string;

  VRDashboardBar_WifiPopup_OfflineMode: string;

  VRDashboardBar_WifiPopup_WiredNetwork: string;

  VRDashboardBar_WifiPopup_WirelessDisabled: string;

  WalletPendingBalance: string;

  WebUITransport_ErrorButton_ModalMessage_Dev: string;

  WebUITransport_ErrorButton_ModalMessage_Public: string;

  WebUITransport_ErrorButton_ModalTitle: string;

  WebUITransport_ErrorButton_Tooltip: string;

  WhatsNew: string;

  WhatsNew_EAAccessCollection_AddCollection_Button: string;

  WhatsNew_EAAccessCollection_AddShelf_Button: string;

  WhatsNew_EAAccessCollection_Cancel_Button: string;

  WhatsNew_EAAccessCollection_Description_1: string;

  WhatsNew_EAAccessCollection_Description_2: string;

  WhatsNew_EAAccessCollection_Description_3: string;

  WhatsNew_EAAccessCollection_Description_Declined: string;

  WhatsNew_EAAccessCollection_Title: string;

  WhatsNew_PlayNext_Description: string;

  WhatsNew_PlayNext_Title: string;

  WhatsNew_ReadMore: string;

  WhatsNew_Title: string;

  WhatsNewFeatureExplainer: string;

  WhatsNewFeatureExplainer2: string;

  WhatsNewPriorityExplainer: string;

  WhatsNewPrioritySettings: string;

  WhatsNewSettings: string;

  WhatsNewSettings_ShowOnlyForRecentlyPlayed: string;

  WhatsNewSettings_ShowOnlyForRecentlyPlayed_Explainer: string;

  WhatsNewSettings_ShowOnlyGameUpdates: string;

  WhatsNewSettings_ShowOnlyGameUpdates_Explainer: string;

  WhatsNewVisibilitySettings: string;

  WhatsNewYouHaveAskedToShowLessFor: string;

  WhatsNewYouHaveAskedToShowMoreFor: string;

  WhatsNewYouHaveNItemsHidden: string;

  WhatsNewYouHaveNItemsHidden_Plural: string;

  WhatsNewYouHaveNothingShowingLess: string;

  WhatsNewYouHaveNothingShowingMore: string;

  WindowName_SteamBrowser: string;

  WindowName_SteamDesktop: string;

  WindowName_SteamDesktopMini: string;

  Wireless_Security_Type_Dynamic_WEP: string;

  Wireless_Security_Type_None: string;

  Wireless_Security_Type_Static_WEP: string;

  Wireless_Security_Type_Unknown: string;

  Wireless_Security_Type_Unsupported: string;

  Wireless_Security_Type_WPA: string;

  Wireless_Security_Type_WPA2: string;

  Wireless_Security_Type_WPA2_Enterprise: string;

  Wireless_Security_Type_WPA3: string;

  Wireless_Security_Type_WPA_Enterprise: string;

  WishlistOnSale_Title: string;

  WishlistOnSale_Title_Plural: string;

  Workshop_Subscriptions_ApplyCollection: string;

  Workshop_Subscriptions_ApplyCollection_AddBtn: string;

  Workshop_Subscriptions_ApplyCollection_CopyLink: string;

  Workshop_Subscriptions_ApplyCollection_Desc: string;

  Workshop_Subscriptions_ApplyCollection_OverwriteBtn: string;

  Workshop_Subscriptions_ApplyCollection_ViewBtn: string;

  Workshop_Subscriptions_SaveToCollection: string;

  Workshop_Subscriptions_SaveToCollection_Error: string;

  Workshop_Subscriptions_SaveToCollection_Existing: string;

  Workshop_Subscriptions_SaveToCollection_New: string;

  Workshop_Subscriptions_SaveToCollection_NewCollectionName: string;

  Workshop_Subscriptions_SaveToCollection_OverwriteCollection: string;

  Workshop_Subscriptions_SaveToCollection_OverwriteCollection_Desc: string;

  Workshop_Subscriptions_SaveToCollection_Prompt: string;
}
