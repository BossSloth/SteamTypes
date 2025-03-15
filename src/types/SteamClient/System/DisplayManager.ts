import { Unregisterable } from '../shared';

// CMsgSystemDisplayManagerState, CMsgSystemDisplayManagerSetMode
export interface DisplayManager {
  ClearModeOverride(displayId: unknown): unknown;

  GetState: unknown;

  RegisterForStateChanges(callback: () => void): Unregisterable;

  SetCompatibilityMode(displayId: unknown): unknown;

  SetGamescopeInternalResolution(width: number, height: number): unknown;

  SetMode(base64: string): unknown; //
}
