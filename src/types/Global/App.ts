import { ConnectionManager } from './ConnectionManager';

export interface App {
  BFinishedInitStageOne(): unknown;

  BHardwareSurveyPending(): boolean;

  BHasAckOnlyActiveSupportAlerts(): boolean;

  BHasActiveSupportAlerts(): boolean;

  BHasCurrentUser(): boolean;

  BIsFamilyGroupMember(e: unknown): boolean;

  BIsInFamilyGroup(): boolean;

  BIsInOOBE(): boolean;

  BIsOfflineMode(): unknown;

  BMustShowSupportAlertDialog(): boolean;

  BSupportAlertDialogActive(): unknown;

  BWasEverLoggedIn(): unknown;

  CloseSupportAlertsModal(): void;

  GetCloudStorageForLibrary(): unknown;

  GetCurrentUser(): unknown;

  GetFamilyGroupID(): unknown;

  GetFamilyGroupName(): unknown;

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

  WaitForServicesInitialized(): Promise<unknown>;

  cm: ConnectionManager;

  LoginState: number;

  m_bFinishedStage1: boolean;

  m_bHaveShownSupportAlertModal: boolean;

  m_bServicesInitialized: boolean;

  m_bStartedStage2: boolean;

  m_bSupportAlertModalActive: boolean;

  m_bWasEverLoggedIn: boolean;

  m_cloudStorage: m_cloudStorage;

  m_cm: ConnectionManager;

  m_CurrentUser: m_CurrentUser;

  m_eLoginState: number;
}

export interface m_cloudStorage {
  Get(e: unknown): unknown;

  GetByPrefix(e: unknown): unknown;

  GetMapForPrefix(e: unknown): unknown;

  GetObject(e: unknown): Promise<unknown>;

  GetString(e: unknown): Promise<unknown>;

  RegisterForChangeNotifications(e: unknown): unknown;

  RemoveObject(e: unknown, t: unknown, r: unknown): Promise<void>;

  StoreObject(e: unknown, t: unknown, r: unknown, n: unknown): Promise<unknown>;

  StoreString(e: unknown, t: unknown, r: unknown, n: unknown): Promise<void>;

  m_eNamespace: number;
}

export interface m_CurrentUser {
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
