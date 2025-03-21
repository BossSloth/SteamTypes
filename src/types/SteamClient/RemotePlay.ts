import { EControllerType } from './Input';
import { Unregisterable } from './shared';

export interface RemotePlay {
  /**
   * @params unknown
   */
  BCanAcceptInviteForGame(): unknown;

  /**
   * @params unknown
   */
  BCanCreateInviteForGame(): unknown;

  BCanHostIsolatedGameAudio(): Promise<boolean>;

  BEnabled(): Promise<boolean>;

  BRemotePlayTogetherGuestOnPhoneOrTablet(steam64Id: string, guestId: number): Promise<boolean>;

  BRemotePlayTogetherGuestSupported(): Promise<boolean>;

  CancelInviteAndSession(steam64Id: string): unknown;

  CancelInviteAndSessionWithGuestID(steam64Id: string, guestId: number): unknown;

  CancelRemoteClientPairing(): void;

  CloseGroup(): Promise<number>;

  /**
   * @params unknown
   */
  CreateGroup(): unknown;

  CreateInviteAndSession(steam64Id: string, param1: unknown): unknown;

  CreateInviteAndSessionWithGuestID(steam64Id: string, guestId: number, param2: unknown): unknown;

  GetClientID(): Promise<string>;

  GetClientStreamingBitrate(): Promise<number>; // todo: -1 not streaming??
  GetClientStreamingQuality(): Promise<number>; // todo: -1 not streaming??
  GetControllerType(param0: number): Promise<EControllerType>; // todo: param0 with value 0 is host controller type - param0 is likely an index of clients or guestId?
  GetGameSystemVolume(): Promise<number>;

  GetPerUserInputSettings(steam64Id: string): unknown;

  GetPerUserInputSettingsWithGuestID(steam64Id: string, guestId: number): unknown;

  IdentifyController(nControllerIndex: number): unknown;

  /**
   * @params unknown
   */
  InstallAudioDriver(): unknown;

  /**
   * @params unknown
   */
  InstallInputDriver(): unknown;

  /**
   * @params unknown
   */
  MoveControllerToSlot(): unknown;

  /**
   * @params unknown
   */
  RegisterForAdditionalParentalBlocks(): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForAudioDriverPrompt(): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForBitrateOverride(): Unregisterable;

  RegisterForClearControllers(callback: () => void): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForControllerIndexSet(): Unregisterable;

  RegisterForDevicesChanges(callback: (devicesChange: RemotePlayDevice[]) => void): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForGroupCreated(): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForGroupDisbanded(): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForInputDriverPrompt(): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForInputDriverRestartNotice(): Unregisterable;

  RegisterForInputUsed(callback: (steam64Id: string, type: EClientUsedInputType, guestId: number) => void): Unregisterable; // only fires on host

  /**
   * @params unknown
   */
  RegisterForInviteResult(): Unregisterable;

  RegisterForNetworkUtilizationUpdate(
    callback: (steam64Id: string, guestId: number, networkUtilization: number, networkDuration: number) => void,
  ): Unregisterable; // only fires on host

  RegisterForPlaceholderStateChanged(callback: (isShowingPlaceholder: boolean) => void): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForPlayerInputSettingsChanged(): Unregisterable;

  RegisterForQualityOverride(callback: (hostStreamingQualityOverride: number) => void): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForRemoteClientLaunchFailed(): Unregisterable;

  RegisterForRemoteClientStarted(callback: (steam64Id: string, appId: number) => void): Unregisterable; // only fires on client

  RegisterForRemoteClientStopped(callback: (steam64Id: string, appId: number) => void): Unregisterable; // only fires on client

  RegisterForRemoteDeviceAuthorizationCancelled(callback: () => void): Unregisterable;

  RegisterForRemoteDeviceAuthorizationRequested(callback: (device: string) => void): Unregisterable;

  RegisterForRemoteDevicePairingPINChanged(callback: (device: string, pin: string) => void): Unregisterable;

  RegisterForRestrictedSessionChanges(callback: (restrictedSession: boolean) => void): Unregisterable;

  RegisterForSessionStarted(callback: (steam64Id: unknown, gameId: unknown, guestId: unknown) => void): Unregisterable;

  RegisterForSessionStopped(callback: (steam64Id: unknown, guestId: unknown, avatarHash?: string) => void): Unregisterable;

  RegisterForSettingsChanges(callback: (remotePlaySettings: RemotePlaySettings) => void): Unregisterable;

  SetClientStreamingBitrate(bitrate: number): void;

  SetClientStreamingQuality(quality: number): void;

  SetGameSystemVolume(volume: number): void;

  SetPerUserControllerInputEnabled(steam64Id: string, enabled: boolean): unknown;

  SetPerUserControllerInputEnabledWithGuestID(steam64Id: string, guestId: number, enabled: boolean): unknown;

  SetPerUserKeyboardInputEnabled(steam64Id: string, enabled: boolean): unknown;

  SetPerUserKeyboardInputEnabledWithGuestID(steam64Id: string, guestId: number, enabled: boolean): unknown;

  SetPerUserMouseInputEnabled(steam64Id: string, enabled: boolean): unknown;

  SetPerUserMouseInputEnabledWithGuestID(steam64Id: string, guestId: number, enabled: boolean): unknown;

  /**
   * @params unknown
   */
  SetRemoteDeviceAuthorized(): unknown;

  SetRemoteDevicePIN(pin: number): void;

  SetRemotePlayEnabled(enabled: boolean): void;

  /**
   * @params unknown
   */
  SetStreamingClientConfig(): unknown;

  /**
   * @params unknown
   */
  SetStreamingClientConfigEnabled(): unknown;

  SetStreamingDesktopToRemotePlayTogetherEnabled(enabled: boolean): unknown;

  /**
   * @params unknown
   */
  SetStreamingP2PScope(): unknown;

  /**
   * @params unknown
   */
  SetStreamingServerConfig(): unknown;

  /**
   * @params unknown
   */
  SetStreamingServerConfigEnabled(): unknown;

  StopStreamingClient(): void;

  /**
   * @params unknown
   */
  StopStreamingSession(): unknown;

  /**
   * @params unknown
   */
  StopStreamingSessionAndSuspendDevice(): unknown;

  UnlockH264(): void;

  UnpairRemoteDevices(): void; // unpairs all devices
}

export enum EClientUsedInputType {
  Keyboard,
  Mouse,
  Controller,
  Max,
}

export interface RemotePlayDevice {
  bCanSuspend: boolean;
  clientName: string;
  formFactor: number;
  status: string; // "Connected", "Paired",
  unStreamingSessionID: number;
}

export interface RemotePlaySettings {
  bDefaultEncodeAMD: boolean;
  bDefaultEncodeIntel: boolean;
  bDefaultEncodeNVIDIA: boolean;
  bRemotePlayClientConfigEnabled: boolean;
  bRemotePlayEnabled: boolean;
  bRemotePlayServerConfigAvailable: boolean;
  bRemotePlayServerConfigEnabled: boolean;
  bRemotePlaySupported: boolean;
  eRemotePlayP2PScope: EStreamP2PScope;
  nAutomaticResolutionX: number;
  nAutomaticResolutionY: number;
  nDefaultAudioChannels: number;
  RemotePlayClientConfig: unknown; // todo: document {}
  RemotePlayServerConfig: unknown; // todo: document {}
  strStreamingClientName: string;
  unStreamingSessionID: number;
}

export enum EStreamP2PScope {
  Automatic,
  Disabled,
  OnlyMe,
  Friends,
  Everyone,
}
