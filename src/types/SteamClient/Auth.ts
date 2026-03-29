export interface Auth {
  /**
   * @returns a boolean indicating if the operation succeeded.
   */
  ClearCachedSignInPin(): Promise<boolean>;

  CurrentUserHasCachedSignInPin(): Promise<boolean>;

  GetLocalHostname(): Promise<string>;

  /**
   * @returns A Promise that resolves to a part of CAuthentication_DeviceDetails.machine_id
   */
  GetMachineID(): Promise<ArrayBuffer>;

  GetRefreshInfo(): Promise<AuthRefreshInfo>;

  GetSteamGuardData(param0: unknown): unknown;

  IsSecureComputer(): Promise<boolean>;

  SetCachedSignInPin(pin: string): Promise<boolean>;

  SetLoginToken(refreshToken: string, accountName: string): unknown;

  SetSteamGuardData(accountName: string, newGuardData: string): unknown;

  StartSignInFromCache(param0: unknown, login: string): Promise<unknown>;

  UserHasCachedSignInPin(accountName: string): Promise<boolean>;

  ValidateCachedSignInPin(accountName: string, pin: string): Promise<boolean>;
}

export interface AuthRefreshInfo {
  account_name: string;

  login_token_id: string;

  reason: number;
}
