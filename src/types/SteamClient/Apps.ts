// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppAchievementProgressCache } from '../Global/AppAchievementProgressCache';
import { AppDetails, EAppAllowDownloadsWhileRunningBehavior, EAppAutoUpdateBehavior, LogoPosition, PlayerAchievement } from '../Global/stores/AppDetailsStore';
import type { EThirdPartyControllerConfiguration } from './Input';
import { EUCMFilePrivacyState, Screenshot } from './Screenshots';
import type { EResult, JsPbMessage, OperationResponse, Unregisterable } from './shared';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, customRules/no-deep-relative-imports
import { CAppOverview_Change_Protobuf } from '../../Modules/Protobufs';

/**
 * Represents various functions related to Steam applications.
 */
export interface Apps {
  /**
   * Adds a non-Steam application shortcut to the local Steam library.
   * @param appName The name of the non-Steam application.
   * @param executablePath The path to the executable file of the non-Steam application.
   * @param directory The working directory for the non-Steam application.
   * @param launchOptions Options to be passed when launching the non-Steam application.
   * @returns A Promise that resolves to a unique AppID assigned to the added non-Steam application shortcut.
   */
  AddShortcut(appName: string, executablePath: string, directory: string, launchOptions: string): Promise<number>;

  /**
   * Backups an app to the specified path.
   * @param appId The ID of the application to back up.
   * @param backupToPath The path to store the backup.
   * @returns A Promise that resolves to a number. This value may be "20" for backup busy and "0" for success.
   */
  BackupFilesForApp(appId: number, backupToPath: string): Promise<number>;

  /**
   * Opens the screenshot folder for a specific app.
   * @param appId The ID of the app to browse screenshots for.
   * @param handle The screenshot handle to use.
   */
  BrowseScreenshotForApp(appId: string, handle: number): void;

  /**
   * Opens the screenshot folder for a specific app.
   * @param appId The ID of the app to browse screenshots for.
   */
  BrowseScreenshotsForApp(appId: string): void;

  /**
   * Cancels the current backup process.
   */
  CancelBackup(): void;

  /**
   * Cancels a specific game action.
   * @param gameActionId The ID of the game action to cancel.
   */
  CancelGameAction(gameActionId: number): void;

  /**
   * Cancels the launch of an application with the specified ID.
   * @param appId The ID of the application whose launch is to be canceled.
   */
  CancelLaunch(appId: string): void;

  /**
   * Clears the custom artwork for a given application.
   * @param appId The ID of the application to clear custom artwork for.
   * @param assetType The type of artwork to clear.
   */
  ClearCustomArtworkForApp(appId: number, assetType: ELibraryAssetType): Promise<void>;

  /**
   * Clears the custom logo position for a specific application.
   * @param appId The ID of the application.
   * @returns A Promise that resolves once the custom logo position is cleared.
   */
  ClearCustomLogoPositionForApp(appId: number): Promise<void>;

  ClearProton(appId: number): Promise<unknown>;

  /**
   * Continues a specific game action.
   * @param gameActionId The ID of the game action to continue.
   * @param actionType The type of action to perform during continuation.
   * @remarks actionType - "SkipShaders", "skip", "ShowDurationControl" todo:
   */
  ContinueGameAction(gameActionId: number, actionType: string): void;

  /**
   * Creates a Steam application shortcut on the desktop.
   * @param appId The ID of the application for which to create a desktop shortcut.
   */
  CreateDesktopShortcutForApp(appId: number): void;

  /**
   * Download a workshop item.
   * @param appId The ID of the application.
   * @param itemId The ID of the workshop item.
   * @param param1 Additional parameter (exact usage may vary).
   */
  DownloadWorkshopItem(appId: number, itemId: string, param1: boolean): void;

  /**
   * Retrieves achievements within a specified time range for a given app.
   * @param appId The ID of the application.
   * @param start The start of the time range as a Unix timestamp.
   * @param end The end of the time range as a Unix timestamp.
   * @returns A Promise that resolves to an array of {@link PlayerAchievement} objects.
   */
  GetAchievementsInTimeRange(appId: number, start: number, end: number): Promise<PlayerAchievement[]>;

  /**
   * Retrieves a list of active game actions, such as launching an application.
   * @returns A Promise that resolves to an array of active game actions.
   */
  GetActiveGameActions(): Promise<GameAction[]>;

  /**
   * Retrieves a list of available compatibility tools for a specific application.
   * @param appId The ID of the application to retrieve compatibility tools for.
   * @returns A Promise that resolves to an array of CompatibilityToolInfo objects.
   */
  GetAvailableCompatTools(appId: number): Promise<CompatibilityToolInfo[]>;

  /**
   * Represents a function to retrieve the name of the application in a backup folder.
   * @param appBackupPath The path to the application's backup folder.
   * @returns A Promise that resolves to the name of the application in the backup folder, or undefined if the path is invalid.
   * @remarks This function checks for the "sku.sis" file in that path.
   */
  GetBackupsInFolder(appBackupPath: string): Promise<string | undefined>;

  /**
   * Retrieves cached details for a specific application.
   * @param appId The ID of the application.
   * @returns A Promise that resolves to a stringified object.
   */
  // todo: Parsing nightmare
  GetCachedAppDetails(appId: number): Promise<string>;

  /**
   * @returns a ProtoBuf message. If deserialized, returns {@link CMsgCloudPendingRemoteOperations}.
   */
  GetCloudPendingRemoteOperations(appId: number): Promise<{
    PendingOperations: ArrayBuffer;
  }>;

  GetCompatExperiment(param0: number): Promise<unknown>;

  GetConflictingFileTimestamps(appId: number): Promise<ConflictingFileTimestamp>;

  /**
   * Retrieves details for a specific screenshot upload.
   * @param appId The ID of the application.
   * @param hHandle The handle of the screenshot upload.
   * @returns A Promise that resolves to details about the screenshot upload.
   */
  GetDetailsForScreenshotUpload(appId: string, hHandle: number): Promise<DetailsForScreenshotUpload>;

  /**
   * Retrieves details for multiple screenshot uploads.
   * @param appId The ID of the application.
   * @param hHandles An array of handles of the screenshot uploads.
   * @returns A Promise that resolves to details about the screenshot uploads.
   */
  GetDetailsForScreenshotUploads(appId: string, hHandles: number[]): Promise<DetailsForScreenshotUploads>;

  /**
   * Retrieves a list of downloaded workshop items for a specific application.
   * @param appId The ID of the application to retrieve downloaded workshop items for.
   * @returns A Promise that resolves to an array of downloaded workshop items for the specified application.
   */
  GetDownloadedWorkshopItems(appId: number): Promise<WorkshopItem[]>;

  // TODO: unknown - {"bApplicable": true} - overlay usage?
  GetDurationControlInfo(appId: number): Promise<unknown>;

  /**
   * Retrieves achievement information for a specific application for a given friend.
   * @param appId The ID of the application to retrieve achievement information for.
   * @param friendSteam64Id The Steam64 ID of the friend for whom to retrieve achievement information.
   * @returns A Promise that resolves to an object containing achievement information for the specified friend and application.
   */
  GetFriendAchievementsForApp(appId: string, friendSteam64Id: string): Promise<AppAchievementResponse>;

  /**
   * Retrieves a list of friends who play the specified application.
   * @param appId The ID of the application.
   * @returns A Promise that resolves to an array of Steam64 IDs representing friends who play the application.
   */
  GetFriendsWhoPlay(appId: number): Promise<string[]>;

  /**
   * Retrieves details of a game action.
   * @param appId The ID of the application.
   * @param callback The callback function to handle the retrieved game action details and state.
   * @param callback.gameAction The game action received in the callback.
   * @param callback.state The state manager received in the callback.
   */
  GetGameActionDetails(appId: number, callback: (gameAction: GameAction) => void): void;

  GetGameActionForApp(
    appId: string,
    callback: (
      gameActionId: number,
      /**
       * This parameter is a number only with the value `0`.
       */
      appId: number | string,
      taskName: AppAction,
    ) => void,
  ): void;

  /**
   * Retrieves launch options for a specified application.
   * These options may include different configurations or settings for launching the application, such as DirectX, Vulkan, OpenGL, 32-bit, 64-bit, etc.
   * This function does not retrieve launch/argument options inputted by the user.
   * @param appId The ID of the application.
   * @returns A Promise that resolves to an array of launch options for the specified application.
   */
  GetLaunchOptionsForApp(appId: number): Promise<LaunchOption[]>;

  /**
   * Retrieves achievement information for the authenticated user in a specific Steam application.
   * @param appId The ID of the application to retrieve achievement information for.
   * @returns A Promise that resolves to an AppAchievementResponse object containing the achievement information for the authenticated user in the specified application.
   */
  GetMyAchievementsForApp(appId: string): Promise<AppAchievementResponse>;

  /**
   * Retrieves the playtime information for a specific application.
   * @param appId The ID of the application to get playtime information for.
   * @returns A Promise that resolves to playtime information or undefined if not available.
   */
  GetPlaytime(appId: number): Promise<Playtime | undefined>;

  GetPrePurchasedApps(appIds: number[]): Promise<PrePurchaseInfo>;

  /**
   * Retrieves the resolution override for a specific application.
   * @param appId The ID of the application to retrieve the resolution override for.
   * @returns A Promise that resolves to a string of the resolution override.
   */
  GetResolutionOverrideForApp(appId: number): Promise<string>;

  /**
   * Represents a function to retrieve detailed information about a specific screenshot.
   * @param appId The ID of the application the screenshot belongs to.
   * @param hHandle The handle of the screenshot.
   * @returns A Promise that resolves to detailed information about the specified screenshot.
   */
  GetScreenshotInfo(appId: string, hHandle: number): Promise<Screenshot>;

  /**
   * Represents a function to retrieve screenshots within a specified time range.
   * @param appId The ID of the application.
   * @param start The start of the time range as a Unix timestamp.
   * @param end The end of the time range as a Unix timestamp.
   * @returns A Promise that resolves to an array of screenshots taken within the specified time range.
   */
  GetScreenshotsInTimeRange(appId: number, start: number, end: number): Promise<Screenshot[]>;

  /**
   * Retrieves shortcut data for a given shortcut file path.
   * @param pathToShortcut The path to the shortcut file.
   * @returns A Promise that resolves to the shortcut data.
   */
  GetShortcutDataForPath(pathToShortcut: string): Promise<Shortcut>;

  /**
   * Represents a function to retrieve details about a soundtrack associated with a soundtrack application.
   * The soundtrack has to be installed.
   * @param appId The ID of the soundtrack application.
   * @returns A Promise that resolves to the details of the soundtrack associated with the specified soundtrack application.
   */
  GetSoundtrackDetails(appId: number): Promise<SoundtrackDetails>;

  /**
   * Retrieves a list of subscribed workshop item details for a specific application.
   * @param appId The ID of the application to retrieve subscribed workshop item details for.
   * @param itemIds Workshop item IDs to retrieve details for.
   * @returns A Promise that resolves to an array of subscribed workshop item details for the specified application.
   * @throws Throws if the query failed.
   */
  GetSubscribedWorkshopItemDetails(appId: number, itemIds: string[]): Promise<WorkshopItemDetails[] | OperationResponse>;

  /**
   * Retrieves a list of subscribed workshop items for a specific application.
   * @param appId The ID of the application to retrieve subscribed workshop items for.
   * @returns A Promise that resolves to an array of subscribed workshop items for the specified application.
   */
  GetSubscribedWorkshopItems(appId: number): Promise<WorkshopItem[]>;

  // Returns {"appid":0,"strInstallOutput":""}
  InstallFlatpakAppAndCreateShortcut(appName: string, appCommandLineOptions: string): Promise<unknown>;

  JoinAppContentBeta(appId: number, name: string): unknown;

  // unknown.strName
  JoinAppContentBetaByPassword(appId: number, accessCode: unknown): Promise<unknown>;

  ListFlatpakApps(): Promise<unknown>;

  /**
   * @throws if the user does not own the app or no EULA.
   * @note Doesn't bring up the EULA dialog, just returns the eula data
   */
  LoadEula(appId: number): Promise<EndUserLicenseAgreement[]>;

  MarkEulaAccepted(param0: unknown, param1: unknown, param2: unknown): unknown;

  MarkEulaRejected(appId: number): unknown;

  /**
   * Move specified workshop item load order.
   * @param appId The ID of the application.
   * @param oldOrder The item to move, referenced by its position number.
   * @param newOrder The position number to move the item to.
   * @remarks Orders are zero-indexed.
   */
  MoveWorkshopItemLoadOrder(appId: number, oldOrder: number, newOrder: number): void;

  /**
   * Opens the settings dialog for a specific application.
   * @param appId The ID of the application for which to open the settings dialog.
   * @param section The section (tab) to switch to.
   */
  OpenAppSettingsDialog(appId: number, section: string): void;

  /**
   * Raises the window for a given application.
   * @param appId The ID of the application to raise the window of.
   * @returns A Promise that resolves to a number.
   * @todo Returns a result enum? 1 if ok, 2 if not running - see ResumeGameInProgress
   */
  RaiseWindowForGame(appId: string): Promise<number>;

  /**
   * @example
   * ```js
   * "CMsgAchievementChange"
   *     OnAchievementChange(e) {
   *         var t;
   *         const n = l.on.deserializeBinary(e).toObject(),
   *             o = null !== (t = null == n ? void 0 : n.appid) && void 0 !== t ? t : 0;
   *         0 != o ? (this.m_mapMyAchievements.has(o) || this.m_mapInflightMyAchievementsRequests.has(o)) && this.LoadMyAchievements(o) : console.error("Received invalid appid in OnAchievementChange")
   *     }
   *
   *     message CMsgAchievementChange {
   *         optional uint32 appid = 1;
   *     }
   * ```
   */
  /**
   * Registers a callback function to be called when achievement changes occur.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForAchievementChanges(callback: (data: ArrayBuffer) => void): Unregisterable;

  RegisterForAppBackupStatus(callback: (appBackupStatus: AppBackupStatus) => void): Unregisterable;

  /**
   * Registers a callback function to be called when app details change.
   * @param appId The ID of the application to monitor.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForAppDetails(appId: number, callback: (appDetails: AppDetails) => void): Unregisterable;

  /**
   * @example
   * ```js
   * message CAppOverview_Change {
   *     repeated .CAppOverview app_overview = 1;
   *     repeated uint32 removed_appid = 2;
   *     optional bool full_update = 3;
   *     optional bool update_complete = 4;
   * }
   * ```
   */
  /**
   * data can be deserialized with {@link CAppOverview_Change_Protobuf}.
   * @remarks This is not a mistake, it doesn't return anything.
   */
  RegisterForAppOverviewChanges(callback: (data: ArrayBuffer) => void): void;

  RegisterForDRMFailureResponse(callback: (appid: number, eResult: number, errorCode: number) => void): Unregisterable;

  /**
   * Registers a callback function to be called when a game action ends.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForGameActionEnd(callback: (gameActionIdentifier: number) => void): Unregisterable;

  // "error" is a localization token
  RegisterForGameActionShowError(
    callback: (gameActionId: number, appId: string, actionName: string, error: string, param4: string) => void,
  ): Unregisterable;

  /**
   * Registers a callback function to be called when a game action UI is shown.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  // TODO: no idea what this callback is from
  RegisterForGameActionShowUI(callback: () => void): Unregisterable;

  /**
   * Registers a callback function to be called when a game action starts.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForGameActionStart(callback: (gameActionIdentifier: number, appId: string, action: string, param3: ELaunchSource) => void): Unregisterable;

  /**
   * Registers a callback function to be called when a game action task changes.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForGameActionTaskChange(
    callback: (gameActionIdentifier: number, appId: string, action: string, requestedAction: string, param4: string) => void,
  ): Unregisterable;

  /**
   * Registers a callback function to be called when a user requests a game action.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForGameActionUserRequest(
    callback: (gameActionIdentifier: number, appId: string, action: string, requestedAction: string, appId2: string) => void,
  ): Unregisterable;

  /**
   * Registers a callback function to be called when a pre-purchased app changes.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   * @todo Unknown, did have it show up a few times, but not callback parameters
   */
  RegisterForPrePurchasedAppChanges(callback: () => void): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForShowMarketingMessageDialog(): Unregisterable;

  /**
   * Registers a callback function to be notified when workshop items are added or removed from a Steam application.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForWorkshopChanges(callback: (appId: number) => void): Unregisterable;

  RegisterForWorkshopItemDownloads(appId: number, callback: (appId: number, publishedFileId: string, param2: number) => void): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForWorkshopItemInstalled(): unknown;

  /**
   * Removes a non-Steam application shortcut from the Steam library.
   * @param appId The ID of the application for which to remove the shortcut.
   */
  RemoveShortcut(appId: number): void;

  ReportLibraryAssetCacheMiss(appId: number, assetType: ELibraryAssetType): void;

  ReportMarketingMessageDialogShown(): void;

  RequestIconDataForApp(appId: number): unknown;

  RequestLegacyCDKeysForApp(appId: number): unknown;

  /**
   * Runs a game with specified parameters. Focuses the game if already launched.
   * @param appId The ID of the application to run.
   * @param launchOptions Additional launch options for the application.
   * @param param2 Additional parameter (exact usage may vary).
   * @param launchSource
   * @remarks `launchOptions` is appended before the ones specified in the application's settings.
   */
  RunGame(appId: string, launchOptions: string, param2: number, launchSource: ELaunchSource): void;

  /**
   * @example
   * ```js
   * function u(e, t) {
   *   return t instanceof Map || t instanceof Set ? Array.from(t) : t;
   * }
   * SteamClient.Apps.SaveAchievementProgressCache(
   *   JSON.stringify(this.m_achievementProgress, u)
   * );
   * ```
   * @param progress The achievement progress to save. Which is a stringified JSON object of {@link AppAchievementProgressCache.m_achievementProgress}
   */
  SaveAchievementProgressCache(progress: string): unknown;

  /**
   * Scans the system for installed non-Steam applications.
   * @returns A Promise that resolves to an array of NonSteamApp objects representing installed non-Steam applications.
   * @remarks This function scans the user's system for installed applications that are not part of the Steam library. It does not scan for shortcuts added to the Steam library.
   *
   * On Linux, it scans inside /usr/share/applications and $XDG_DATA_HOME/applications.
   */
  ScanForInstalledNonSteamApps(): Promise<NonSteamApp[]>;

  /**
   * Sets the automatic update behavior for a Steam application.
   * @param appId The ID of the application to set the update behavior for.
   * @param mode The update behavior mode to set.
   * @remarks This function only works with installed Steam applications.
   */
  SetAppAutoUpdateBehavior(appId: number, mode: EAppAutoUpdateBehavior): void;

  /**
   * Sets the background downloads behavior for a specific Steam application.
   * @param appId The ID of the application to set the background downloads behavior for.
   * @param mode The background downloads mode to set.
   * @remarks This function only works with installed Steam applications.
   */
  SetAppBackgroundDownloadsBehavior(appId: number, mode: EAppAllowDownloadsWhileRunningBehavior): void;

  /**
   * Sets the current language for a specific Steam application.
   * @param appId The ID of the application to set the current language for.
   * @param language The language to set, represented as a language (e.g., "english", "spanish", "tchinese", "schinese").
   */
  SetAppCurrentLanguage(appId: number, language: string): void;

  /**
   * Sets launch options for a Steam application.
   * @param appId The ID of the application to set launch options for.
   * @param launchOptions The launch options to be set for the application.
   */
  SetAppLaunchOptions(appId: number, launchOptions: string): void;

  /**
   * Sets a resolution override for a Steam application.
   * @param appId The ID of the application to set the resolution override for.
   * @param resolution The resolution to be set for the application. It can be "Default", "Native", or other compatible resolutions for the user's monitor.
   */
  SetAppResolutionOverride(appId: number, resolution: string): unknown;

  /**
   * Sets cached details for a specific application.
   * @param appId The ID of the application.
   * @param details The details to be cached, a stringified object.
   * @returns A Promise that resolves when the details are successfully cached.
   */
  SetCachedAppDetails(appId: number, details: string): Promise<void>;

  // param1 - enum for preference
  SetControllerRumblePreference(appId: number, param1: number): unknown;

  /**
   * Sets the custom artwork for a given application.
   * @param appId The ID of the application to set custom artwork for.
   * @param base64Image Base64 encoded image.
   * @param imageType The type of image (jpg or png).
   * @param assetType The type of artwork to set.
   * @returns A Promise that resolves after the custom artwork is set.
   */
  SetCustomArtworkForApp(appId: number, base64Image: string, imageType: 'jpg' | 'png', assetType: ELibraryAssetType): Promise<unknown>;

  /**
   * Sets a custom logo position for a specific app.
   * @param appId The ID of the application.
   * @param details The details of the custom logo position, expected to be a JSON stringified {@link LogoPositionForApp} object.
   * @returns A Promise that resolves when the custom logo position is successfully set.
   */
  SetCustomLogoPositionForApp(appId: number, details: string): Promise<void>;

  /**
   * Sets the enabled state for downloadable content (DLC) of a specific app.
   * @param appId The ID of the parent application.
   * @param appDLCId The ID of the DLC to set the state for.
   * @param value The value to set (true for enabled, false for disabled).
   */
  SetDLCEnabled(appId: number, appDLCId: number, value: boolean): void;

  /**
   * Set a local screenshot's caption.
   * @param appId The application ID the screenshot belongs to.
   * @param hHandle The handle of the screenshot.
   * @param caption
   */
  SetLocalScreenshotCaption(appId: string, hHandle: unknown, caption: string): void;

  /**
   * Set a local screenshot's privacy state.
   * @param appId The application ID the screenshot belongs to.
   * @param hHandle The handle of the screenshot.
   * @param privacy Screenshot privacy state.
   */
  SetLocalScreenshotPrivacy(appId: string, hHandle: unknown, privacy: EUCMFilePrivacyState): void;

  /**
   * Set a local screenshot's spoiler state.
   * @param appId The application ID the screenshot belongs to.
   * @param hHandle The handle of the screenshot.
   * @param spoilered Is the screenshot spoilered?
   */
  SetLocalScreenshotSpoiler(appId: string, hHandle: unknown, spoilered: boolean): void;

  /**
   * Sets the executable path for a non-Steam application shortcut.
   * @param appId The ID of the application to set the shortcut executable for.
   * @param exePath The path to the executable.
   */
  SetShortcutExe(appId: number, exePath: string): void;

  /**
   * Sets the icon for a non-Steam application shortcut.
   * @param appId The ID of the application to set the shortcut icon for.
   * @param iconPath The path to the icon image (can be png or tga format).
   */
  SetShortcutIcon(appId: number, iconPath: string): void;

  /**
   * Sets whether a non-Steam application shortcut should be included in the VR library.
   * @param appId The ID of the application to set the VR status for.
   * @param value A boolean indicating whether the application should be included in the VR library.
   */
  SetShortcutIsVR(appId: number, value: boolean): void;

  /**
   * Sets launch options for a non-Steam application shortcut.
   * @param appId The ID of the application to set the launch options for.
   * @param launchOptions The launch options to be used when starting the application.
   */
  SetShortcutLaunchOptions(appId: number, launchOptions: string): void;

  /**
   * Sets the name for a non-Steam application shortcut.
   * @param appId The ID of the application to set the shortcut name for.
   * @param shortcutName The name to be displayed for the application shortcut.
   */
  SetShortcutName(appId: number, shortcutName: string): void;

  /**
   * Sets the sort_as name for a non-Steam application shortcut.
   * @param appId The ID of the application to set the sort_as name for.
   * @param sortAs The sort_as name to be used for the application shortcut.
   */
  SetShortcutSortAs(appId: number, sortAs: string): void;

  /**
   * Sets the starting directory for a non-Steam application shortcut.
   * @param appId The ID of the application to set the starting directory for.
   * @param directory The directory from which the application should be launched.
   */
  SetShortcutStartDir(appId: number, directory: string): void;

  /**
   * Sets the client ID for streaming for a specific application.
   * @param appId The ID of the application.
   * @param clientId The client ID for streaming.
   */
  SetStreamingClientForApp(appId: number, clientId: string): void;

  SetThirdPartyControllerConfiguration(appId: number, value: EThirdPartyControllerConfiguration): void;

  /**
   * Sets the workshop items disabled state.
   * @param appId The ID of the application.
   * @param itemIds Workshop item IDs to change the state for.
   * @param value `true` to disable, `false` otherwise.
   */
  SetWorkshopItemsDisabledLocally(appId: number, itemIds: string[], value: boolean): void;

  /**
   * Sets the workshop items load order for a specified application.
   * @param appId The ID of the application.
   * @param itemIds Workshop item IDs.
   * @remarks `itemIds` has to be the full list of subscribed items, otherwise the specified items get moved to the last position.
   */
  SetWorkshopItemsLoadOrder(appId: number, itemIds: string[]): void;

  /**
   * Opens the controller configurator for a specific application.
   * @param appId The ID of the application for which to open the controller configurator.
   */
  ShowControllerConfigurator(appId: number): void;

  /**
   * Opens the Steam store page for a specific application.
   * @param appId The ID of the application.
   */
  ShowStore(appId: number): void;

  /**
   * @params unknown
   */
  SpecifyCompatExperiment(): unknown;

  /**
   * Specifies a compatibility tool by its name for a given application. If strToolName is an empty string, the specified application will no longer use a compatibility tool.
   * @param appId The ID of the application to specify compatibility tool for.
   * @param strToolName The name of the compatibility tool to specify.
   */
  SpecifyCompatTool(appId: number, strToolName: string): void;

  StreamGame(appId: number, clientId: string, param2: number): void;

  /**
   * Subscribes or unsubscribes from a workshop item for a specific app.
   * @param appId The ID of the application.
   * @param workshopId The ID of the workshop item.
   * @param subscribed True to subscribe, false to unsubscribe.
   */
  SubscribeWorkshopItem(appId: number, workshopId: string, subscribed: boolean): void;

  /**
   * Terminates a running application.
   * @param appId The ID of the application to terminate.
   * @param param1 Additional parameter. Exact usage may vary.
   */
  TerminateApp(appId: string, param1: boolean): void;

  // "#AppProperties_SteamInputDesktopConfigInLauncher"
  ToggleAllowDesktopConfiguration(appId: number): unknown;

  /**
   * Toggles the Steam Cloud synchronization for game saves for a specific application.
   * @param appId The ID of the application.
   * @remarks This function modifies the "<STEAMPATH>/userdata/<STEAMID3>/7/remote/sharedconfig.vdf" file.
   */
  ToggleAppSteamCloudEnabled(appId: number): void;

  // "#AppProperties_EnableSteamCloudSyncOnSuspend"
  ToggleAppSteamCloudSyncOnSuspendEnabled(appId: number): unknown;

  /**
   * Toggles the Steam Overlay setting for a specific application.
   * @param appId The ID of the application.
   */
  ToggleEnableSteamOverlayForApp(appId: number): void;

  // "#AppProperties_ResolutionOverride_Internal"
  ToggleOverrideResolutionForInternalDisplay(appId: number): unknown;

  UninstallFlatpakApp(app: string): Promise<boolean>;

  /**
   * Verifies the integrity of an app's files.
   * @param appId The ID of the app to verify.
   */
  // TODO: returns {"nGameActionID":9}
  VerifyApp(appId: number): Promise<unknown>;
}

export enum ELibraryAssetType {
  Capsule,
  Hero,
  Logo,
  Header,
  Icon,
  HeroBlur,
}

export type AppAction = 'LaunchApp' | 'VerifyApp';

export type LaunchAppTask = 'None'
  | 'Completed'
  | 'Cancelled'
  | 'Failed'
  | 'Starting'
  | 'ConnectingToSteam'
  | 'RequestingLicense'
  | 'UpdatingAppInfo'
  | 'UpdatingAppTicket'
  | 'UnlockingH264'
  | 'WaitingOnWideVineUpdate'
  | 'ShowCheckSystem'
  | 'CheckTimedTrial'
  | 'GetDurationControl'
  | 'ShowDurationControl'
  | 'ShowLaunchOption'
  | 'ShowEula'
  | 'ShowVR2DWarning'
  | 'ShowVROculusOnly'
  | 'ShowVRStreamingLaunch'
  | 'ShowGameArgs'
  | 'ShowCDKey'
  | 'WaitingPrevProcess'
  | 'DownloadingDepots'
  | 'DownloadingWorkshop'
  | 'UpdatingDRM'
  | 'GettingLegacyKey'
  | 'ProcessingInstallScript'
  | 'RunningInstallScript'
  | 'SynchronizingCloud'
  | 'SynchronizingControllerConfig'
  | 'ShowNoControllerConfig'
  | 'ProcessingShaderCache'
  | 'VerifyingFiles'
  | 'KickingOtherSession'
  | 'WaitingOpenVRAppQuit'
  | 'SiteLicenseSeatCheckout'
  | 'DelayLaunch'
  | 'CreatingProcess'
  | 'WaitingGameWindow';

export interface GameAction {
  bWaitingForUI: boolean;

  gameid: string;

  nGameActionID: number;

  nLaunchOption: number;

  /** @note Not a typo, actually valve, nice */
  nSecondsRemaing: number;

  strActionName: AppAction;

  strNumDone: string;

  strNumTotal: string;

  strTaskDetails: string;

  strTaskName: LaunchAppTask;
}

export interface ConflictingFileTimestamp {
  rtLocalTime: number;

  rtRemoteTime: number;
}

/**
 * Represents information about a compatibility tool.
 */
export interface CompatibilityToolInfo {
  /** Display name of the compatibility tool. */
  strDisplayName: string;

  /** Name of the compatibility tool. */
  strToolName: string;
}

/**
 * Represents details about a single screenshot upload.
 */
export interface DetailsForScreenshotUpload {
  /**
   * The amount of cloud storage available.
   */
  strCloudAvailable: string;

  /**
   * The total cloud storage.
   */
  strCloudTotal: string;

  /**
   * The size of the screenshot upload on disk (including thumbnail).
   */
  strSizeOnDisk: string;
}

/**
 * Represents details about multiple screenshot uploads.
 */
export interface DetailsForScreenshotUploads {
  /**
   * The amount of cloud storage available.
   */
  strCloudAvailable: string;

  /**
   * The total cloud storage.
   */
  strCloudTotal: string;

  /**
   * The total size of all screenshot uploads on disk (sum of sizes including thumbnails).
   */
  unSizeOnDisk: number;
}

export interface WorkshopItem {
  ulPublishedFileID: string;

  unAppID: number;
}

export interface AppAchievementData {
  rgAchievements: PlayerAchievement[];
}

export interface AppAchievementResponse {
  data: AppAchievementData;

  result: number;
}

export interface LaunchOption {
  /**
   * @remarks This is an integer, despite the prefix. 0 if false, 1 if true.
   */
  bIsLaunchOptionTypeExemptFromGameTheater: number;

  /**
   * @remarks This is an integer, despite the prefix. 0 if false, 1 if true.
   */
  bIsVRLaunchOption: number;

  eType: EAppLaunchOptionType;

  nIndex: number;

  /**
   * Label localization string.
   */
  strDescription: string;

  strGameName: string;
}

/**
 * Represents playtime information for an application.
 */
export interface Playtime {
  /** Total playtime in minutes. */
  nPlaytimeForever: number;

  /** Total playtime in minutes for the last 2 weeks. */
  nPlaytimeLastTwoWeeks: number;

  /** Last played time in Unix Epoch time format. */
  rtLastTimePlayed: number;
}

export interface PrePurchaseApp {
  eState: EAppReleaseState;

  nAppID: number;
}

export interface PrePurchaseInfo {
  apps: PrePurchaseApp[];

  lastChangeNumber: number;
}

export enum EAppReleaseState {
  Unknown,
  Unavailable,
  Prerelease,
  PreloadOnly,
  Released,
  Disabled,
}

export enum EAppLaunchOptionType {
  None,
  Default,
  SafeMode,
  Multiplayer,
  Config,
  OpenVR,
  Server,
  Editor,
  Manual,
  Benchmark,
  Option1,
  Option2,
  Option3,
  OculusVR,
  OpenVROverlay,
  OSVR,
  OpenXR,
  Dialog = 1e3,
}

export interface Shortcut {
  bIsApplication: boolean;

  strAppName: string;

  strArguments: string;

  strCmdline: string;

  strExePath: string;

  strIconDataBase64: string | undefined;

  strShortcutPath: string | undefined;

  strSortAs: string | undefined;
}

export interface SoundtrackDetails {
  metadata: SoundtrackMetadata;

  strCoverImageAssetURL: string;

  tracks: Track[];

  vecAdditionalImageAssetURLs: string[];
}

export interface Track {
  discNumber: number;

  durationSeconds: number;

  trackDisplayName: string;

  trackNumber: number;
}

export interface SoundtrackMetadata {
  artist: string;
}

export interface WorkshopItemDetails {
  /**
   * Required items' IDs.
   */
  children: string[];

  eresult: EResult;

  /**
   * Item size, in byts.
   */
  file_size: string;

  /**
   * Workshop file type.
   */
  file_type: EWorkshopFileType;

  /**
   * Item preview image URL.
   */
  preview_url: string;

  /**
   * Item ID.
   */
  publishedfileid: string;

  /**
   * Item description.
   */
  short_description: string;

  /**
   * Item tags.
   */
  tags: string[];

  /**
   * Item title.
   */
  title: string;
}

export enum EWorkshopFileType {
  Invalid = -1,
  Community,
  Microtransaction,
  Collection,
  Art,
  Video,
  Screenshot,
  Game,
  Software,
  Concept,
  WebGuide,
  IntegratedGuide,
  Merch,
  ControllerBinding,
  SteamworksAccessInvite,
  SteamVideo,
  GameManagedItem,
  Max,
}

export interface EndUserLicenseAgreement {
  id: string;

  url: string;

  version: number;
}

export interface AppBackupStatus {
  appid: number;

  eError: EAppUpdateError;

  strBytesProcessed: string;

  strBytesToProcess: string;

  strTotalBytesWritten: string;
}

export enum EAppUpdateError {
  None,
  Unspecified,
  Paused,
  Canceled,
  Suspended,
  NoSubscription,
  NoConnection,
  Timeout,
  MissingKey,
  MissingConfig,
  DiskReadFailure,
  DiskWriteFailure,
  NotEnoughDiskSpace,
  CorruptGameFiles,
  WaitingForNextDisk,
  InvalidInstallPath,
  AppRunning,
  DependencyFailure,
  NotInstalled,
  UpdateRequired,
  Busy,
  NoDownloadSources,
  InvalidAppConfig,
  InvalidDepotConfig,
  MissingManifest,
  NotReleased,
  RegionRestricted,
  CorruptDepotCache,
  MissingExecutable,
  InvalidPlatform,
  InvalidFileSystem,
  CorruptUpdateFiles,
  DownloadDisabled,
  SharedLibraryLocked,
  PendingLicense,
  OtherSessionPlaying,
  CorruptDownload,
  CorruptDisk,
  FilePermissions,
  FileLocked,
  MissingContent,
  Requires64BitOS,
  MissingUpdateFiles,
  NotEnoughDiskQuota,
  LockedSiteLicense,
  ParentalControlBlocked,
  CreateProcessFailure,
  SteamClientOutdated,
  PlaytimeExceeded,
  CorruptFileSignature,
  MissingInstalledFiles,
  CompatibilityToolFailure,
  UnmountedUninstallPath,
  InvalidBackupPath,
  InvalidPasscode,
  ThirdPartyUpdater,
  ParentalPlaytimeExceeded,
  Max,
}

export enum ELaunchSource {
  None,
  _2ftLibraryDetails = 100,
  _2ftLibraryListView,
  _2ftLibraryGrid,
  InstallSubComplete,
  DownloadsPage,
  RemoteClientStartStreaming,
  _2ftMiniModeList,
  _10ft = 200,
  DashAppLaunchCmdLine = 300,
  DashGameIdLaunchCmdLine,
  RunByGameDir,
  SubCmdRunDashGame,
  SteamURL_Launch = 400,
  SteamURL_Run,
  SteamURL_JoinLobby,
  SteamURL_RunGame,
  SteamURL_RunGameIdOrJumplist,
  SteamURL_RunSafe,
  TrayIcon = 500,
  LibraryLeftColumnContextMenu = 600,
  LibraryLeftColumnDoubleClick,
  Dota2Launcher = 700,
  IRunGameEngine = 800,
  DRMFailureResponse,
  DRMDataRequest,
  CloudFilePanel,
  DiscoveredAlreadyRunning,
  GameActionJoinParty = 900,
  AppPortraitContextMenu = 1000,
}

export interface NonSteamApp {
  bIsApplication: boolean;

  strAppName: string;

  strArguments: string;

  strCmdline: string;

  strExePath: string;

  strIconDataBase64: string;
}

export interface LogoPositionForApp {
  logoPosition: LogoPosition;

  /** @note Usually 1 */
  nVersion: number;
}

export enum ECloudPendingRemoteOperation {
  None,
  AppSessionActive,
  UploadInProgress,
  UploadPending,
  AppSessionSuspended,
}

export interface CCloud_PendingRemoteOperation {
  client_id(): number;

  device_type(): number;

  machine_name(): string;

  operation(): ECloudPendingRemoteOperation;

  os_type(): number;

  time_last_updated(): number;
}

export interface CMsgCloudPendingRemoteOperations extends JsPbMessage {
  operations: CCloud_PendingRemoteOperation[];
}
