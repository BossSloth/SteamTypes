# PowerShell script to run the Apps interface check
# This script saves the provided interface to a temporary file and runs the comparison

$interfaceDefinition = @'
export interface Apps {
	AddShortcut: any;
	BackupFilesForApp: any;
	BrowseScreenshotForApp: any;
	BrowseScreenshotsForApp: any;
	CancelBackup: any;
	CancelGameAction: any;
	CancelLaunch: any;
	ClearCustomArtworkForApp: any;
	ClearCustomLogoPositionForApp: any;
	ClearProton: any;
	ContinueGameAction: any;
	CreateDesktopShortcutForApp: any;
	DownloadWorkshopItem: any;
	GetAchievementsInTimeRange: any;
	GetActiveGameActions: any;
	GetAvailableCompatTools: any;
	GetBackupsInFolder: any;
	GetCachedAppDetails: any;
	GetCloudPendingRemoteOperations: any;
	GetCompatExperiment: any;
	GetConflictingFileTimestamps: any;
	GetDetailsForScreenshotUpload: any;
	GetDetailsForScreenshotUploads: any;
	GetDownloadedWorkshopItems: any;
	GetDurationControlInfo: any;
	GetFriendAchievementsForApp: any;
	GetFriendsWhoPlay: any;
	GetGameActionDetails: any;
	GetGameActionForApp: any;
	GetLaunchOptionsForApp: any;
	GetLibraryBootstrapData: any;
	GetMyAchievementsForApp: any;
	GetPlaytime: any;
	GetPrePurchasedApps: any;
	GetResolutionOverrideForApp: any;
	GetScreenshotInfo: any;
	GetScreenshotsInTimeRange: any;
	GetShortcutDataForPath: any;
	GetSoundtrackDetails: any;
	GetSubscribedWorkshopItemDetails: any;
	GetSubscribedWorkshopItems: any;
	InstallFlatpakAppAndCreateShortcut: any;
	JoinAppContentBeta: any;
	JoinAppContentBetaByPassword: any;
	ListFlatpakApps: any;
	LoadEula: any;
	MarkEulaAccepted: any;
	MarkEulaRejected: any;
	MoveWorkshopItemLoadOrder: any;
	OpenAppSettingsDialog: any;
	RaiseWindowForGame: any;
	RegisterForAchievementChanges: any;
	RegisterForAppBackupStatus: any;
	RegisterForAppDetails: any;
	RegisterForAppOverviewChanges: any;
	RegisterForDRMFailureResponse: any;
	RegisterForGameActionEnd: any;
	RegisterForGameActionShowError: any;
	RegisterForGameActionShowUI: any;
	RegisterForGameActionStart: any;
	RegisterForGameActionTaskChange: any;
	RegisterForGameActionUserRequest: any;
	RegisterForPrePurchasedAppChanges: any;
	RegisterForShowMarketingMessageDialog: any;
	RegisterForWorkshopChanges: any;
	RegisterForWorkshopItemDownloads: any;
	RegisterForWorkshopItemInstalled: any;
	RemoveShortcut: any;
	ReportLibraryAssetCacheMiss: any;
	ReportMarketingMessageDialogShown: any;
	RequestIconDataForApp: any;
	RequestLegacyCDKeysForApp: any;
	RunGame: any;
	SaveAchievementProgressCache: any;
	ScanForInstalledNonSteamApps: any;
	SetAppAutoUpdateBehavior: any;
	SetAppBackgroundDownloadsBehavior: any;
	SetAppCurrentLanguage: any;
	SetAppLaunchOptions: any;
	SetAppResolutionOverride: any;
	SetCachedAppDetails: any;
	SetControllerRumblePreference: any;
	SetCustomArtworkForApp: any;
	SetCustomLogoPositionForApp: any;
	SetDLCEnabled: any;
	SetLocalScreenshotCaption: any;
	SetLocalScreenshotPrivacy: any;
	SetLocalScreenshotSpoiler: any;
	SetShortcutExe: any;
	SetShortcutIcon: any;
	SetShortcutIsVR: any;
	SetShortcutLaunchOptions: any;
	SetShortcutName: any;
	SetShortcutStartDir: any;
	SetStreamingClientForApp: any;
	SetThirdPartyControllerConfiguration: any;
	SetWorkshopItemsDisabledLocally: any;
	SetWorkshopItemsLoadOrder: any;
	ShowControllerConfigurator: any;
	ShowStore: any;
	SpecifyCompatExperiment: any;
	SpecifyCompatTool: any;
	StreamGame: any;
	SubscribeWorkshopItem: any;
	TerminateApp: any;
	ToggleAllowDesktopConfiguration: any;
	ToggleAppSteamCloudEnabled: any;
	ToggleAppSteamCloudSyncOnSuspendEnabled: any;
	ToggleEnableSteamOverlayForApp: any;
	ToggleOverrideResolutionForInternalDisplay: any;
	UninstallFlatpakApp: any;
	VerifyApp: any;
}
'@

# Create a temporary file for the interface definition
$tempFile = [System.IO.Path]::GetTempFileName() + ".ts"
$interfaceDefinition | Out-File -FilePath $tempFile -Encoding utf8

Write-Host "Saved interface definition to temporary file: $tempFile"
Write-Host "Running interface comparison..."

# Change to the scripts directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# Run the comparison script
bun check-apps-interface.ts $tempFile

# Clean up the temporary file
Remove-Item $tempFile -Force
