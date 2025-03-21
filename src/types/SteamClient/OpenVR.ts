import { Unregisterable } from './shared';

export interface OpenVR {
  ExtendActivityTimeout(): unknown;

  /**
   * @throws OperationResponse if mutual capabilities haven't been loaded.
   */
  GetMutualCapabilities(): Promise<unknown>;

  GetWebSecret(): Promise<string>;

  InstallVR(): unknown;

  QuitAllVR(): unknown;

  RegisterForButtonPress(): Unregisterable;

  RegisterForHMDActivityLevelChanged(callback: (m_eHMDActivityLevel: EHMDActivityLevel) => void): Unregisterable;

  RegisterForInstallDialog(): Unregisterable;

  RegisterForStartupErrors(callback: (clientError: unknown, initError: unknown, initErrorString: string) => void): Unregisterable;

  RegisterForVRHardwareDetected(callback: (m_bHMDPresent: unknown, m_bHMDHardwareDetected: unknown, m_strHMDName: unknown) => void): Unregisterable;

  RegisterForVRModeChange(callback: (m_bIsVRRunning: boolean) => void): Unregisterable;

  RegisterForVRSceneAppChange(callback: (param0: number) => void): Unregisterable;

  SetOverlayInteractionAffordance(): unknown;

  StartVR(): unknown;

  TriggerOverlayHapticEffect(): unknown;

  Device: VRDevice;

  DeviceProperties: DeviceProperties;

  Keyboard: Keyboard;

  PathProperties: PathProperties;

  VRNotifications: VRNotifications;

  VROverlay: VROverlay;
}

export interface VRDevice {
  BIsConnected(): unknown;

  RegisterForDeviceConnectivityChange(): Unregisterable;

  RegisterForVRDeviceSeenRecently(callback: (m_bVRDeviceSeenRecently: unknown) => void): Unregisterable;
}

export interface DeviceProperties {
  GetBoolDeviceProperty(): unknown;

  GetDoubleDeviceProperty(): unknown;

  GetFloatDeviceProperty(): unknown;

  GetInt32DeviceProperty(): unknown;

  GetStringDeviceProperty(): unknown;

  RegisterForDevicePropertyChange(): Unregisterable;
}

export interface Keyboard {
  Hide(): unknown;

  /**
   * {@link EKeyboardFlags} could be useful here
   */
  RegisterForStatus(callback: (m_bIsKeyboardOpen: boolean, m_eKeyboardFlags: number, m_sInitialKeyboardText: string) => void): Unregisterable;

  SendDone(): unknown;

  // ???
  SendText(key: string): unknown;

  Show(): unknown;
}

export interface PathProperties {
  GetBoolPathProperty(): unknown;

  GetDoublePathProperty(): unknown;

  GetFloatPathProperty(): unknown;

  GetInt32PathProperty(): unknown;

  GetStringPathProperty(): unknown;

  RegisterForPathPropertyChange(): unknown;

  SetBoolPathProperty(): unknown;

  SetDoublePathProperty(): unknown;

  SetFloatPathProperty(): unknown;

  SetInt32PathProperty(): unknown;

  SetStringPathProperty(): unknown;
}

export interface VRNotifications {
  HideCustomNotification: unknown;
  RegisterForNotificationEvent: Unregisterable;
  ShowCustomNotification: unknown;
}

export interface VROverlay {
  IsDashboardVisible(): Promise<boolean>;

  SwitchToDashboardOverlay(param0: string): void;

  HideDashboard: unknown;

  RegisterForButtonPress: Unregisterable;

  RegisterForCursorMovement: Unregisterable;

  RegisterForThumbnailChanged: Unregisterable;

  RegisterForVisibilityChanged: Unregisterable;

  ShowDashboard: unknown;
}

export enum EHMDActivityLevel {
  Unknown = -1,
  Idle,
  UserInteraction,
  UserInteraction_Timeout,
  Standby,
  Idle_Timeout,
}

export enum EKeyboardFlags {
  Minimal = 1 << 0,
  Modal = 1 << 1,
  ShowArrowKeys = 1 << 2,
  HideDoneKey = 1 << 3,
}
