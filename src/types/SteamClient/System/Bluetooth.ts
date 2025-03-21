import { OperationResponse, Unregisterable } from '../shared';

/**
 * Provides functionality for managing Bluetooth devices and interactions.
 */
export interface Bluetooth {
  /**
   * Cancels an ongoing pairing request with a Bluetooth device.
   * @param adapterId The ID of the Bluetooth adapter.
   * @param deviceId The ID of the Bluetooth device to cancel pairing with.
   * @returns A Promise that resolves with the result of the cancellation.
   */
  CancelPairing(adapterId: number, deviceId: number): Promise<OperationResponse>;

  /**
   * Connects to a paired Bluetooth device using the specified adapter.
   * @param adapterId The ID of the Bluetooth adapter.
   * @param deviceId The ID of the paired Bluetooth device to connect to.
   * @returns A Promise that resolves with the result of the connection attempt.
   */
  Connect(adapterId: number, deviceId: number): Promise<OperationResponse>;

  /**
   * Disconnects from a currently connected Bluetooth device using the specified adapter.
   * @param adapterId The ID of the Bluetooth adapter.
   * @param deviceId The ID of the connected Bluetooth device to disconnect from.
   * @returns A Promise that resolves with the result of the disconnection.
   */
  Disconnect(adapterId: number, deviceId: number): Promise<OperationResponse>;

  /**
   * Initiates pairing with a Bluetooth device using the specified adapter.
   * @param adapterId The ID of the Bluetooth adapter.
   * @param deviceId The ID of the Bluetooth device to initiate pairing with.
   * @returns A Promise that resolves with the result of the pairing attempt.
   */
  Pair(adapterId: number, deviceId: number): Promise<OperationResponse>;

  /**
   * Registers a callback function to be called when the Bluetooth state changes.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForStateChanges(callback: (bluetoothStateChange: BluetoothStateChange) => void): Unregisterable;

  /**
   * Sets whether the Bluetooth adapter should be in discovering mode.
   * @param adapterId The ID of the Bluetooth adapter.
   * @param value `true` to enable discovering mode, `false` to disable it.
   * @returns A Promise that resolves with the result of the operation.
   */
  SetAdapterDiscovering(adapterId: number, value: boolean): Promise<OperationResponse>;

  /**
   * Enables or disables Bluetooth functionality.
   * @param bluetooth `true` to enable Bluetooth, `false` to disable it.
   * @returns A Promise that resolves with the result of the operation.
   */
  SetEnabled(bluetooth: boolean): Promise<OperationResponse>;

  /**
   * Unpairs a Bluetooth device from the adapter.
   * @param adapterId The ID of the Bluetooth adapter.
   * @param deviceId The ID of the Bluetooth device to unpair with.
   * @returns A Promise that resolves with the result of the unpairing request.
   */
  UnPair(adapterId: number, deviceId: number): Promise<OperationResponse>;
}

/**
 * Represents a change in the state of Bluetooth adapters and devices.
 */
export interface BluetoothStateChange {
  /**
   * Indicates whether Bluetooth is enabled (`true`) or disabled (`false`).
   */
  bEnabled: boolean;

  /**
   * An array of Bluetooth adapters with their current state.
   */
  vecAdapters: BluetoothAdapter[];

  /**
   * An array of Bluetooth devices with their current state.
   */
  vecDevices: BluetoothDevice[];
}

/**
 * Represents information about a Bluetooth adapter.
 */
export interface BluetoothAdapter {
  /**
   * Indicates whether the Bluetooth adapter is in discovering mode.
   */
  bDiscovering: boolean;

  /**
   * Indicates whether the Bluetooth adapter is enabled.
   */
  bEnabled: boolean;

  /**
   * The unique identifier of the Bluetooth adapter.
   */
  nId: number;

  /**
   * The MAC address of the Bluetooth adapter.
   */
  sMAC: string;

  /**
   * The name of the Bluetooth adapter.
   */
  sName: string;
}

/**
 * Represents information about a Bluetooth device.
 */
export interface BluetoothDevice {
  /**
   * Indicates whether the Bluetooth device is currently connected to the adapter.
   */
  bConnected: boolean;

  /**
   * Indicates whether the Bluetooth device is paired to the adapter.
   */
  bPaired: boolean;

  /**
   * The type of the Bluetooth device (e.g., headphones, mouse, keyboard).
   */
  eType: EBluetoothDeviceType;

  /**
   * The ID of the Bluetooth adapter to which this device is discovered by / connected to.
   */
  nAdapterId: number;

  /**
   * The unique identifier of the Bluetooth device.
   */
  nId: number;

  /**
   * The raw signal strength of the Bluetooth device.
   */
  nStrengthRaw: number;

  /**
   * The MAC address of the Bluetooth device.
   */
  sMAC: string;

  /**
   * The name of the Bluetooth device.
   */
  sName: string;
}

export enum EBluetoothDeviceType {
  Invalid,
  Unknown,
  Phone,
  Computer,
  Headset,
  Headphones,
  Speakers,
  OtherAudio,
  Mouse,
  Joystick,
  Gamepad,
  Keyboard,
}
