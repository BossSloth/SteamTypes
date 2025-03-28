import { LaunchOption } from './Apps';
import { EResult, Unregisterable } from './shared';

export interface Streaming {
  AcceptStreamingEULA(param0: unknown, param1: unknown, param2: unknown): unknown;

  // existing stream
  CancelStreamGame(): void;

  /**
   * Registers a callback function to be called when the streaming client finishes.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForStreamingClientFinished(callback: (code: EResult, result: string) => void): Unregisterable;

  /**
   * Registers a callback function to be called when there is progress in the launch of the streaming client.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForStreamingClientLaunchProgress(callback: (actionType: string, taskDetails: string, done: number, total: number) => void): Unregisterable;

  /**
   * Registers a callback function to be called when the streaming client is started (e.g., when clicking the stream button).
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForStreamingClientStarted(callback: (appId: number) => void): Unregisterable;

  /**
   * Registers a callback function to be called when the streaming launch is complete.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForStreamingLaunchComplete(callback: (code: EResult, result: string) => void): Unregisterable;

  RegisterForStreamingShowEula(callback: (appId: number) => void): Unregisterable;

  RegisterForStreamingShowIntro(callback: (appId: number, param: string) => void): Unregisterable;

  /**
   * Registers a callback function to be called when the streaming client receives launch options from the host.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForStreamingShowLaunchOptions(callback: (appId: number, launchOptions: LaunchOption[]) => void): Unregisterable;

  // existing game running on another streaming capable device
  StreamingContinueStreamGame(): void;

  /**
   * Chooses the launch option for the streamed app by its index
   * and restarts the stream.
   */
  StreamingSetLaunchOption(index: number): void;
}
