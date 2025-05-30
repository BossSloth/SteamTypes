import { Unregisterable } from './shared';

/**
 * Represents functions related to managing friends in Steam.
 */
export interface Friends {
  /**
   * @returns a list of players you recently played with.
   */
  GetCoplayData(): Promise<CoplayData>;

  // (e.ConvertTo64BitString(), t.steamidTarget)
  InviteUserToCurrentGame(steam64Id: string, param1: unknown): unknown;

  /**
   * Invites a user to a specific game.
   * @param steamId The Steam ID of the user to invite.
   * @param appId The ID of the game to invite the user to.
   * @param connectString Additional parameters for the invitation.
   * @returns A Promise that resolves to true if the user was invited successfully, false otherwise.
   */
  InviteUserToGame(steamId: string, appId: number, connectString: string): Promise<boolean>;

  // (e.ConvertTo64BitString(), t.steamidTarget)
  InviteUserToLobby(steam64Id: string, param1: unknown): unknown;

  // (e.ConvertTo64BitString())
  InviteUserToRemotePlayTogetherCurrentGame(steam64Id: string): unknown;

  RegisterForMultiplayerSessionShareURLChanged(param0: unknown, param1: unknown): Unregisterable;

  RegisterForVoiceChatStatus(callback: (status: VoiceChatStatus) => void): Unregisterable;

  ShowRemotePlayTogetherUI(): void;
}

export interface CoplayData {
  currentUsers: CoplayUser[];

  recentUsers: CoplayUser[];
}

export interface CoplayUser {
  accountid: number;

  appid: number;

  rtTimePlayed: number;
}

export interface VoiceChatStatus {
  bMicMuted: boolean;

  bOutputMuted: boolean;

  bVoiceChatActive: boolean;
}
