import { JsPbMessage } from './shared';
import { EOSType } from './System';

export interface Auth {
  /**
   * @returns a boolean indicating if the operation succeeded.
   */
  ClearCachedSignInPin(): Promise<boolean>;

  CurrentUserHasCachedSignInPin(): Promise<boolean>;

  GetLocalHostname(): Promise<string>;

  /**
   * @returns A Promise that resolves to a ProtoBuf message. If deserialized, returns {@link Authentication_DeviceDetails}.
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

/**
 * CAuthentication_DeviceDetails
 *
 * `deserializeBinary` argument:
 * ```
 * [
 *     await SteamClient.System.GetOSType(),
 *     await SteamClient.Auth.GetLocalHostname(),
 *     await SteamClient.Auth.GetMachineID(),
 * ];
 * ```
 */
export interface Authentication_DeviceDetails extends JsPbMessage {
  client_count(): number | undefined;

  device_friendly_name(): string | undefined;

  gaming_device_type(): EGamingDeviceType | undefined;

  machine_id(): Uint8Array | string;

  os_type(): EOSType | undefined;

  platform_type(): EAuthTokenPlatformType | undefined;

  set_client_count(): unknown;

  set_device_friendly_name(): unknown;

  set_gaming_device_type(): unknown;

  set_machine_id(): unknown;

  set_os_type(): unknown;

  set_platform_type(): unknown;
}

export enum EAuthTokenPlatformType {
  Unknown,
  SteamClient,
  WebBrowser,
  MobileApp,
}

export enum EGamingDeviceType {
  Unknown,
  StandardPC,
  Console = 256,
  PS3 = 272,
  Steambox = 288,
  Tesla = 320,
  Handheld = 512,
  Phone = 528,
  SteamDeck = 544,
}
