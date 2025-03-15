import { Unregisterable } from '../shared';

export interface Devkit {
  DeveloperModeChanged(state: boolean): unknown;

  RegisterForPairingPrompt(callback: (param0: unknown) => unknown): Unregisterable;

  RespondToPairingPrompt(param0: unknown, param1: unknown): unknown;

  SetPairing(param0: unknown): unknown;
}
