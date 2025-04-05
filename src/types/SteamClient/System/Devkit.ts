import { Unregisterable } from '../shared';

export interface Devkit {
  RegisterForPairingPrompt(callback: (param0: unknown) => unknown): Unregisterable;

  RespondToPairingPrompt(param0: unknown, param1: unknown): unknown;

  SetPairing(param0: unknown): unknown;
}
