import { Unregisterable } from '../shared';

export interface Display {
  EnableUnderscan(param0: boolean): unknown;

  RegisterForBrightnessChanges(callback: (brightnessChanges: BrightnessChange) => void): Unregisterable;

  SetBrightness(brightness: number): unknown;

  SetUnderscanLevel(param0: unknown): unknown;
}

export interface BrightnessChange {
  flBrightness: number;
}
