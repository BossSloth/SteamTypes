/**
 * Represents functions related to Steam Family Sharing.
 */
export interface FamilySharing {
  /**
   * Authorizes library sharing on the local device.
   * @returns A Promise that resolves to a status code.
   * FamilySettings_SteamGuardRequired - 18
   * FamilySettings_LimitExceeded - 25
   * FamilySettings_FailedToAuthorize - any other number
   */
  AuthorizeLocalDevice(): Promise<number>;

  /**
   * Deauthorizes library sharing on the local device.
   * @returns A Promise that resolves to a status code.
   */
  DeauthorizeLocalDevice(): Promise<number>;

  GetAvailableLenders(appId: number): Promise<Lender[]>;

  RegisterForKickedBorrower(): unknown;

  SetPreferredLender(appId: number, param1: number): Promise<number>;

  // param0 - account id?
  // return FamilySettings_TooManyBorrowers - 25, FamilySettings_FailedToUpdateBorrower - any number that's not 1 or previous
  UpdateAuthorizedBorrower(param0: number, param1: boolean): Promise<number>;
}

export interface Lender {
  appid: number;
  bPreferred: boolean;
  numDlc: number;
  /**
   * A Steam64 ID.
   */
  steamid: string;
  vecDLC: unknown[];
}
