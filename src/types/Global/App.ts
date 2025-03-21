import { ConnectionManager } from './ConnectionManager';

export interface App {
  BFinishedInitStageOne(): boolean;

  BHardwareSurveyPending(): CurrentUser['bHWSurveyPending'];

  BHasAckOnlyActiveSupportAlerts(): CurrentUser['bSupportAckOnlyMessages'];

  BHasActiveSupportAlerts(): CurrentUser['bSupportAlertActive'];

  BHasCurrentUser(): boolean;

  BIsFamilyGroupMember(e: unknown): boolean;

  BIsInFamilyGroup(): boolean;

  BIsInOOBE(): boolean;

  BIsOfflineMode(): CurrentUser['bIsOfflineMode'];

  BMustShowSupportAlertDialog(): CurrentUser['bSupportPopupMessage'];

  BSupportAlertDialogActive(): App['m_bSupportAlertModalActive'];

  BWasEverLoggedIn(): boolean;

  CloseSupportAlertsModal(): void;

  GetCloudStorageForLibrary(): CloudStorage;

  GetCurrentUser(): CurrentUser;

  GetFamilyGroupID(): CurrentUser['strFamilyGroupID'];

  GetFamilyGroupName(): CurrentUser['strFamilyGroupName'];

  GetServicesInitialized(): boolean;

  Init(e: unknown): Promise<void>;

  InitStage2(): Promise<void>;

  /**
   * @native
   */
  OnCMDisconnect(): unknown;

  /**
   * @native
   */
  OnCMLogon(): unknown;

  /**
   * @native
   */
  OnCurrentUserChanges(): unknown;

  /**
   * @native
   */
  OnLoginStateChange(): unknown;

  OptOutOfSurvey(): void;

  PrefetchParentalSettingsForChildren(e: unknown): void;

  SendSurvey(): void;

  ShowSupportAlertsModal(): void;

  WaitForServicesInitialized(): Promise<boolean>;

  cm: ConnectionManager;

  LoginState: ELoginState;

  m_bFinishedStage1: boolean;

  m_bHaveShownSupportAlertModal: boolean;

  m_bServicesInitialized: boolean;

  m_bStartedStage2: boolean;

  m_bSupportAlertModalActive: boolean;

  m_bWasEverLoggedIn: boolean;

  m_cloudStorage: CloudStorage;

  m_cm: ConnectionManager;

  m_CurrentUser: CurrentUser;

  m_eLoginState: ELoginState;
}

export interface CloudStorage {
  Get(e: unknown): unknown;

  GetByPrefix(e: unknown): unknown;

  GetMapForPrefix(e: unknown): unknown;

  GetObject(e: unknown): Promise<unknown>;

  GetString(e: unknown): Promise<unknown>;

  RegisterForChangeNotifications(e: unknown): unknown;

  RemoveObject(e: unknown, t: unknown, r: unknown): Promise<void>;

  StoreObject(e: unknown, t: unknown, r: unknown, n: unknown): Promise<unknown>;

  StoreString(e: unknown, t: unknown, r: unknown, n: unknown): Promise<void>;

  m_eNamespace: ENamespace;
}

export interface CurrentUser {
  bHWSurveyPending: boolean;

  bIsLimited: boolean;

  bIsOfflineMode: boolean;

  bPromptToChangePassword: boolean;

  bSupportAckOnlyMessages: boolean;

  bSupportAlertActive: boolean;

  bSupportPopupMessage: boolean;

  NotificationCounts: NotificationCounts;

  strAccountBalance: string;

  strAccountBalancePending: string;

  strAccountName: string;

  strClientInstanceID: string;

  strFamilyGroupID: string;

  strFamilyGroupName?: string;

  strSteamID: string;
}

export interface NotificationCounts {
  async_game_updates: number;

  comments: number;

  gifts: number;

  help_request_replies: number;

  inventory_items: number;

  invites: number;

  moderator_messages: number;

  offline_messages: number;

  trade_offers: number;
}

export enum ELoginState {
  None,
  WelcomeDialog,
  WaitingForCreateUser,
  WaitingForCredentials,
  WaitingForNetwork,
  WaitingForServerResponse,
  WaitingForLibraryReady,
  Success,
  Quit,
}

export enum ENamespace {
  Invalid,
  Library,
}
