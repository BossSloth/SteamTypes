import { CurrentUser, ELoginState } from '../Global/App';
import { OperationResponse, Unregisterable } from './shared';

export interface User {
  AuthorizeMicrotxn(txnId: unknown): unknown;

  CancelLogin(): unknown;

  CancelMicrotxn(txnId: unknown): unknown;

  /**
   * Tries to cancel Steam shutdown.
   * @remarks Used in the "Shutting down" dialog.
   */
  CancelShutdown(): void;

  /**
   * Opens the "Change Account" dialog.
   */
  ChangeUser(): void;

  Connect(): Promise<OperationResponse>;

  FlipToLogin(): void;

  /**
   * Forces a shutdown while shutting down.
   * @remarks Used in the "Shutting down" dialog.
   */
  ForceShutdown(): void;

  /**
   * Forgets an account's password.
   * @param accountName Login of the account to forget.
   * @returns A Promise that resolves to a boolean indicating whether the operation succeeded or not.
   */
  ForgetPassword(accountName: string): Promise<boolean>;

  /**
   * Gets your country code.
   * @returns A Promise that resolves to a string containing your country code.
   */
  GetIPCountry(): Promise<string>;

  GetLoginProgress(callback: (param0: number, param1: number) => void): Unregisterable;

  GetLoginUsers(): Promise<LoginUser[]>;

  GoOffline(): void;

  GoOnline(): void;

  OptOutOfSurvey(): void;

  PrepareForSystemSuspend(): unknown;

  Reconnect(): void;

  RegisterForConnectionAttemptsThrottled(callback: (data: ConnectionAttempt) => void): Unregisterable;

  RegisterForCurrentUserChanges(callback: (user: CurrentUser) => void): void;

  RegisterForLoginStateChange(
    callback: (accountName: string, loginState: ELoginState, loginResult: number, loginPercentage: number, param4: number) => void,
  ): Unregisterable;

  RegisterForPrepareForSystemSuspendProgress(callback: (data: unknown) => void): Unregisterable;

  RegisterForResumeSuspendedGamesProgress(): Unregisterable;

  RegisterForShowHardwareSurvey(callback: () => void): Unregisterable;

  RegisterForShutdownDone(callback: () => void): Unregisterable;

  RegisterForShutdownFailed(): Unregisterable;

  /**
   * Register a function to be executed when a shutdown start is detected.
   * @param callback The function to be executed on shutdown start.
   */
  RegisterForShutdownStart(callback: () => void): Unregisterable;

  RegisterForShutdownState(): Unregisterable;

  /**
   * Removes an account from remembered users.
   * @param accountName The account to remove.
   */
  RemoveUser(accountName: string): void;

  RequestSupportSystemReport(reportId: string): Promise<{
    bSuccess: boolean;

  }>;

  ResumeSuspendedGames(param0: boolean): unknown;

  // Hardware survey information
  RunSurvey(callback: (surveySections: SurveySection[]) => void): void;

  SendSurvey(): void;

  SetAsyncNotificationEnabled(appId: number, enable: boolean): unknown;

  /**
   * Sets given login credentials, but don't log in to that account.
   * @param accountName Account name.
   * @param password Account password.
   * @param rememberMe Whether to remember that account.
   */
  SetLoginCredentials(accountName: string, password: string, rememberMe: boolean): void;

  SetOOBEComplete(): void;

  ShouldShowUserChooser(): Promise<boolean>;

  /**
   * Signs out and restarts Steam.
   */
  SignOutAndRestart(): void;

  StartLogin(): void;

  // is param0 offline mode?
  StartOffline(param0: boolean): unknown;

  /**
   * Restarts the Steam client.
   */
  StartRestart(param0: boolean): never;

  /**
   * Shuts down the Steam client.
   */
  StartShutdown(param0: boolean): never;
}

export interface ConnectionAttempt {
  rtCooldownExpiration: number;
}

export interface LoginUser {
  accountName: string;

  avatarUrl: string;

  personaName: string;

  rememberPassword: boolean;
}

export interface SurveyEntry {
  strName: string;

  vecArgs: string[];
}

export interface SurveySection {
  strSectionName: string;

  vecEntries: SurveyEntry[];
}
