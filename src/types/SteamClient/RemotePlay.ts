import { EControllerType } from './Input';
import { Unregisterable } from './shared';

export interface RemotePlay {
  BCanAcceptInviteForGame: unknown;
  BCanCreateInviteForGame: unknown;

  BCanHostIsolatedGameAudio(): Promise<boolean>;

  BEnabled(): Promise<boolean>;

  BRemotePlayTogetherGuestOnPhoneOrTablet(steam64Id: string, guestId: number): Promise<boolean>;

  BRemotePlayTogetherGuestSupported(): Promise<boolean>;

  CancelInviteAndSession(steam64Id: string): unknown;

  CancelInviteAndSessionWithGuestID(steam64Id: string, guestId: number): unknown;

  CancelRemoteClientPairing(): void;

  CloseGroup(): Promise<number>;

  CreateGroup: unknown;

  CreateInviteAndSession(steam64Id: string, param1: unknown): unknown;

  CreateInviteAndSessionWithGuestID(steam64Id: string, guestId: number, param2: unknown): unknown;

  GetClientID(): Promise<string>;

  GetClientStreamingBitrate(): Promise<number>; //todo: -1 not streaming??
  GetClientStreamingQuality(): Promise<number>; //todo: -1 not streaming??
  GetControllerType(param0: number): Promise<EControllerType>; // todo: param0 with value 0 is host controller type - param0 is likely an index of clients or guestId?
  GetGameSystemVolume(): Promise<number>;

  GetPerUserInputSettings(steam64Id: string): unknown;

  GetPerUserInputSettingsWithGuestID(steam64Id: string, guestId: number): unknown;

  IdentifyController(nControllerIndex: number): unknown;

  InstallAudioDriver: unknown;
  InstallInputDriver: unknown;
  MoveControllerToSlot: unknown;
  RegisterForAdditionalParentalBlocks: Unregisterable;
  RegisterForAudioDriverPrompt: Unregisterable;
  RegisterForBitrateOverride: Unregisterable;
  RegisterForClearControllers(callback: () => void): Unregisterable;
  RegisterForControllerIndexSet: Unregisterable;

  RegisterForDevicesChanges(callback: (devicesChange: RemotePlayDevice[]) => void): Unregisterable;

  RegisterForGroupCreated: Unregisterable;
  RegisterForGroupDisbanded: Unregisterable;
  RegisterForInputDriverPrompt: Unregisterable;
  RegisterForInputDriverRestartNotice: Unregisterable;

  RegisterForInputUsed(callback: (steam64Id: string, type: EClientUsedInputType, guestId: number) => void): Unregisterable; // only fires on host

  RegisterForInviteResult: Unregisterable;

  RegisterForNetworkUtilizationUpdate(
    callback: (steam64Id: string, guestId: number, networkUtilization: number, networkDuration: number) => void,
  ): Unregisterable; // only fires on host

  RegisterForPlaceholderStateChanged(callback: (isShowingPlaceholder: boolean) => void): Unregisterable;

  RegisterForPlayerInputSettingsChanged: Unregisterable;

  RegisterForQualityOverride(callback: (hostStreamingQualityOverride: number) => void): Unregisterable;

  RegisterForRemoteClientLaunchFailed: Unregisterable;

  RegisterForRemoteClientStarted(callback: (steam64Id: string, appId: number) => void): Unregisterable; // only fires on client

  RegisterForRemoteClientStopped(callback: (steam64Id: string, appId: number) => void): Unregisterable; // only fires on client

  RegisterForRemoteDeviceAuthorizationCancelled(callback: () => void): Unregisterable;

  RegisterForRemoteDeviceAuthorizationRequested(callback: (device: string) => void): Unregisterable;

  RegisterForRemoteDevicePairingPINChanged(callback: (device: string, pin: string) => void): Unregisterable;

  RegisterForRestrictedSessionChanges(callback: (restrictedSession: boolean) => void): Unregisterable;

  RegisterForSessionStopped(callback: (steam64Id: unknown, guestId: unknown, avatarHash?: string) => void): Unregisterable;

  RegisterForSessionStarted(callback: (steam64Id: unknown, gameId: unknown, guestId: unknown) => void): Unregisterable;

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

  SetRemoteDeviceAuthorized: unknown;

  SetRemoteDevicePIN(pin: number): void;

  SetRemotePlayEnabled(enabled: boolean): void;

  SetStreamingClientConfig: unknown;
  SetStreamingClientConfigEnabled: unknown;

  SetStreamingDesktopToRemotePlayTogetherEnabled(enabled: boolean): unknown;

  SetStreamingP2PScope: unknown;
  SetStreamingServerConfig: unknown;
  SetStreamingServerConfigEnabled: unknown;

  StopStreamingClient(): void;

  StopStreamingSession: unknown;
  StopStreamingSessionAndSuspendDevice: unknown;

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
  clientName: string;
  status: string; // "Connected", "Paired",
  formFactor: number;
  unStreamingSessionID: number;
  bCanSuspend: boolean;
}

export interface RemotePlaySettings {
  bRemotePlaySupported: boolean;
  bRemotePlayEnabled: boolean;
  eRemotePlayP2PScope: EStreamP2PScope;
  bRemotePlayServerConfigAvailable: boolean;
  bRemotePlayServerConfigEnabled: boolean;
  RemotePlayServerConfig: unknown; // todo: document {}
  bRemotePlayClientConfigEnabled: boolean;
  unStreamingSessionID: number;
  strStreamingClientName: string;
  RemotePlayClientConfig: unknown; // todo: document {}
  nDefaultAudioChannels: number;
  bDefaultEncodeNVIDIA: boolean;
  bDefaultEncodeAMD: boolean;
  bDefaultEncodeIntel: boolean;
  nAutomaticResolutionX: number;
  nAutomaticResolutionY: number;
}

export enum EStreamP2PScope {
  Automatic,
  Disabled,
  OnlyMe,
  Friends,
  Everyone,
}
