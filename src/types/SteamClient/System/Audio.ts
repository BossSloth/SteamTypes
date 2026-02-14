export interface Audio {
  /**
   * Clear the default device override for a direction
   */
  ClearDefaultDeviceOverride(direction: EAudioDirection): void;

  /**
   * Get all audio applications/processes
   */
  GetApps(): Promise<GetAppsResponse | undefined>;

  /**
   * Get all audio devices and their states
   */
  GetDevices(): Promise<GetDevicesResponse | undefined>;

  /**
   * Register callback for when an audio app is added
   */
  RegisterForAppAdded(callback: (app: AudioAppInfo) => void): void;

  /**
   * Register callback for when an audio app is removed
   */
  RegisterForAppRemoved(callback: (appId: number) => void): void;

  /**
   * Register callback for app volume changes
   * @param callback - Callback function receiving app ID and new volume (0.0 - 1.0)
   */
  RegisterForAppVolumeChanged(callback: (appId: number, volume: number) => void): void;

  /**
   * Register callback for when a device is added
   */
  RegisterForDeviceAdded(callback: (device: AudioDeviceInfo) => void): void;

  /**
   * Register callback for when a device is removed
   */
  RegisterForDeviceRemoved(callback: (deviceId: number) => void): void;

  /**
   * Register callback for device volume changes
   * @param callback - Callback function receiving device ID, channel, and new volume (0.0 - 1.0)
   */
  RegisterForDeviceVolumeChanged(callback: (deviceId: number, channel: EAudioChannel, volume: number) => void): void;

  /**
   * Register callback for service connection state changes
   */
  RegisterForServiceConnectionStateChanges(callback: (connected: boolean) => void): void;

  /**
   * Register callback for volume button presses (e.g., hardware volume buttons)
   * @param callback - Callback function receiving button press event data
   * @todo doesn't seem to work?
   */
  RegisterForVolumeButtonPressed(callback: (event: VolumeButtonPressEvent) => void): void;

  /**
   * Set volume for a specific application
   * @param appId - Application ID
   * @param volume - Volume level (0.0 - 1.0)
   */
  SetAppVolume(appId: number, volume: number): Promise<void> | undefined;

  /**
   * Set a device as the default for a specific direction
   */
  SetDefaultDeviceOverride(deviceId: number, direction: EAudioDirection): void;

  /**
   * Set number of output channels for a device
   * @param channels - Number of channels
   */
  SetDeviceChannels(deviceId: number, channels: number): Promise<void> | undefined;

  /**
   * Set volume for a specific device and channels
   * @param channel - Audio channel (EAudioChannel)
   * @param volume - Volume level (0.0 - 1.0)
   */
  SetDeviceVolume(
    deviceId: number,
    channel: EAudioChannel,
    volume: number
  ): Promise<void> | undefined;
}

interface GetAppsResponse {
  /** Array of audio applications */
  rgApps: AudioAppInfo[];
}

interface AudioAppInfo {
  /** Volume level (0.0 - 1.0) */
  flVolume: number;

  /** Unique app identifier */
  id: number;

  /** Application name */
  strName: string;

  /** Process ID */
  unPID: number;
}

interface GetDevicesResponse {
  /** Currently active input device ID */
  activeInputDeviceId: number;

  /** Currently active output device ID */
  activeOutputDeviceId: number;

  /** User-overridden input device ID (or INVALID_DEVICE_ID if none) */
  overrideInputDeviceId: number;

  /** User-overridden output device ID (or INVALID_DEVICE_ID if none) */
  overrideOutputDeviceId: number;

  /** Array of all available audio devices */
  vecDevices: AudioDeviceInfo[];
}

interface AudioDeviceInfo {
  /** Whether device has input capability */
  bHasInput: boolean;

  /** Whether device has output capability */
  bHasOutput: boolean;

  /** Type of audio connector */
  eConnectorType: EAudioConnectorType;

  /** Input volume (0.0 - 1.0) */
  flInputVolume: number;

  /** Number of output channels */
  flOutChannels: number;

  /** Output volume (0.0 - 1.0) */
  flOutputVolume: number;

  /** Unique device identifier */
  id: number;

  /** Device name */
  sName: string;
}

interface VolumeButtonPressEvent {
  /** Type of button press (e.g., volume up/down) */
  type?: number;

  /** Additional event data */
  [key: string]: unknown;
}

enum EAudioConnectorType {
  Unknown = 0,
  Aux = 1,
  Speaker = 2,
  Headphones = 3,
  Line = 4,
  Mic = 5,
  Headset = 6,
  Handset = 7,
  Earpiece = 8,
  Spdif = 9,
  Hdmi = 10,
  Tv = 11,
  Radio = 12,
  Video = 13,
  Usb = 14,
  Bluetooth = 15,
  Portable = 16,
  Handsfree = 17,
  Car = 18,
  Hifi = 19,
  Phone = 20,
  Network = 21,
  Analog = 22,
}

enum EAudioChannel {
  Input = 0,
  AllOutput = 1,
  Left = 2,
  Right = 3,
  Sub = 4,
  BackLeft = 5,
  BackRight = 6,
}

enum EAudioDirection {
  Input = 0,
  Output = 1,
}
