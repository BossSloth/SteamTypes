import { ESteamRealm, Unregisterable } from './shared';

/**
 * `hSharedConnection` is the number from {@link AllocateSharedConnection}.
 */
export interface SharedConnection {
  AllocateSharedConnection(): Promise<number>;

  // if no such number, sends this warning:
  // src\clientdll\clientsharedconnection.cpp (154) : m_mapSharedConnections.HasElement( hSharedConnection )
  Close(hSharedConnection: number): void;

  RegisterOnBinaryMessageReceived(hSharedConnection: number, callback: (data: ArrayBuffer) => void): Unregisterable;

  RegisterOnLogonInfoChanged(hSharedConnection: number, callback: (info: LogonInfo) => void): Unregisterable;

  RegisterOnMessageReceived(hSharedConnection: number, callback: (param0: unknown) => void): Unregisterable;

  /**
   * @params unknown
   */
  SendMsg(): unknown;

  /**
   * @params unknown
   */
  SendMsgAndAwaitBinaryResponse(): unknown;

  SendMsgAndAwaitResponse(hSharedConnection: number, msg: string): Promise<unknown>;

  SubscribeToClientServiceMethod(hSharedConnection: number, param1: unknown): unknown;

  SubscribeToEMsg(hSharedConnection: number, param1: unknown): unknown;
}

export interface LogonInfo {
  /** `true` if logged on, `false` otherwise. */
  bLoggedOn: boolean;

  eUniverse: ESteamRealm;

  /** Account username. Empty if not logged on. */
  strAccountName: string;

  /** URL for community content. */
  strCommunityImagesURL: string;

  /** Account nickname. Empty if not logged on. */
  strPersonaName: string;

  /** Steam64 ID. */
  strSteamid: string;

  /** Country code. */
  strUserCountry: string;
}
