import { OperationResponse, Unregisterable } from '../shared';

/**
 * Represents various functions related to Steam system audio.
 */
export interface Audio {
  /**
   * Clears the default device override for a specified audio type.
   * @param audioType The audio type (0 for input, 1 for output).
   * @returns A Promise indicating the result of the operation.
   */
  ClearDefaultDeviceOverride(audioType: number): Promise<OperationResponse>;

  /**
   * Retrieves information about audio applications.
   * @returns A Promise that resolves to information about audio applications.
   */
  GetApps(): Promise<ApplicationsAudio>;

  /**
   * Retrieves information about audio devices.
   * @returns A Promise that resolves to information about audio devices.
   */
  GetDevices(): Promise<AudioDeviceInfo>;

  /**
   * Registers a callback to be called when a new audio application is added.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForAppAdded(callback: (appAudioAdded: ApplicationAudio) => void): Unregisterable;

  /**
   * Registers a callback to be called when an audio application is removed.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForAppRemoved(callback: (appAudioId: number) => void): Unregisterable;

  /**
   * Registers a callback to be called when the volume of an audio application changes.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForAppVolumeChanged(callback: (appAudioId: number, volume: number) => void): Unregisterable;

  /**
   * Registers a callback to be called when a new audio device is added.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForDeviceAdded(callback: (audioDevice: Device) => void): Unregisterable;

  /**
   * Registers a callback to be called when an audio device is removed.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForDeviceRemoved(callback: (audioDeviceId: number) => void): Unregisterable;

  /**
   * Registers a callback to be called when the volume of an audio device changes.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForDeviceVolumeChanged(callback: (audioDeviceId: number, audioType: number, volume: number) => void): Unregisterable;

  RegisterForServiceConnectionStateChanges(callback: (param0: unknown) => void): Unregisterable;

  /**
   * Registers a callback to be called when volume buttons are pressed.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForVolumeButtonPressed(callback: (volumeUpPressed: boolean) => void): Unregisterable;

  /**
   * Sets the volume of an audio application.
   * @param appAudioId The ID of the audio application.
   * @param volume The volume level (floating point value between 0 and 1).
   * @returns A Promise indicating the result of the operation.
   */
  SetAppVolume(appAudioId: number, volume: number): Promise<OperationResponse>;

  /**
   * Sets the default device override for a specified audio type.
   * @param audioDeviceId The ID of the audio device.
   * @param audioType The audio type (0 for input, 1 for output).
   * @returns A Promise indicating the result of the operation.
   */
  SetDefaultDeviceOverride(audioDeviceId: number, audioType: number): Promise<OperationResponse>;

  /**
   * Sets the volume of an audio device.
   * @param audioDeviceId The ID of the audio device.
   * @param audioType The audio type (0 for input, 1 for output).
   * @param volume The volume level (floating point value between 0 and 1).
   * @returns A Promise indicating the result of the operation.
   */
  SetDeviceVolume(audioDeviceId: number, audioType: number, volume: number): Promise<OperationResponse>;
}

/**
 * Represents details about an array of application audio sessions.
 */
export interface ApplicationsAudio {
  /**
   * An array of application audio sessions.
   */
  apps: ApplicationAudio[];
}

/**
 * Represents details about an application audio session.
 */
export interface ApplicationAudio {
  /**
   * The volume level of the application (floating point value between 0 and 1).
   */
  flVolume: number;

  /**
   * The ID of the application audio.
   */
  id: number;

  /**
   * The name of the application (e.g., Spotify, YouTube from a browser, etc.).
   */
  strName: string;
}

/**
 * Represents details about audio devices and information about the active audio device.
 */
export interface AudioDeviceInfo {
  /**
   * The ID of the active input audio device.
   */
  activeInputDeviceId: number;

  /**
   * The ID of the active output audio device.
   */
  activeOutputDeviceId: number;

  /**
   * The ID of the overridden input audio device (-1 if not overridden).
   */
  overrideInputDeviceId: number;

  /**
   * The ID of the overridden output audio device (-1 if not overridden).
   */
  overrideOutputDeviceId: number;

  /**
   * An array of audio devices.
   */
  vecDevices: Device[];
}

/**
 * Represents details about an audio device.
 */
export interface Device {
  /**
   * Indicates if the device has audio input.
   */
  bHasInput: boolean;

  /**
   * Indicates if the device has audio output.
   */
  bHasOutput: boolean;

  /**
   * Indicates if the device is the default input device.
   */
  bIsDefaultInputDevice: boolean;

  /**
   * Indicates if the device is the default output device.
   */
  bIsDefaultOutputDevice: boolean;

  /**
   * The volume level of the audio input device (floating point value between 0 and 1).
   */
  flInputVolume: number;

  /**
   * The volume level of the audio output device (floating point value between 0 and 1).
   */
  flOutputVolume: number;

  /**
   * The identifier of the audio device.
   */
  id: number;

  /**
   * The name of the audio device.
   */
  sName: string;
}
