/**
 * Represents functions related to Steam Family Sharing.
 */
export interface FamilySharing {
  GetAvailableLenders(appId: number): Promise<Lender[]>;

  RegisterForKickedBorrower(): unknown;

  SetPreferredLender(appId: number, param1: number): Promise<number>;
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
