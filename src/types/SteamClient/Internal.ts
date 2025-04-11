import { Unregisterable } from './shared';

export interface Internal {
  /**
   * @native
   */
  BInGpuFallbackMode(): Promise<boolean>;

  /**
   * @native
   */
  ExecutePromise(): unknown;

  /**
   * @native
   */
  GetDisplayScaleFactors(): Promise<DisplayScaleFactors>;

  /**
   * @native
   */
  RegisterForStyleChanges(callback: (param0: unknown) => void): Unregisterable;

  /**
   * @native
   */
  RequestDisableGpu(): unknown;

  /**
   * @native
   */
  SetDevMode(value: boolean): void;

  /**
   * @native
   */
  SetForceDeviceScaleFactor(value: number): void;
}

export interface DisplayScaleFactors {
  flDeviceScale: number;

  flForceDeviceScale: number;
}
