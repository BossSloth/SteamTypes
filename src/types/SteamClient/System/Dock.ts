import { JsPbMessage, Unregisterable } from '../shared';
import { EUpdaterState } from '../Updates';

// CMsgSystemDockUpdateFirmware, CMsgSystemDockState
export interface Dock {
  DisarmSafetyNet(): void;

  /**
   * If `data` is deserialized, returns {@link MsgSystemDockState}.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForStateChanges(callback: (data: ArrayBuffer) => void): Unregisterable;

  UpdateFirmware(base64String: string): unknown;
}

/**
 * CMsgSystemDockState
 */
export interface MsgSystemDockState extends JsPbMessage {
  update_state(): SystemDockUpdateState | undefined;
}

export interface SystemDockUpdateState {
  old_fw_workaround: number | undefined;
  rtime_estimated_completion: number | undefined;
  rtime_last_checked: number | undefined;
  stage_progress: number | undefined;
  state: EUpdaterState | undefined;
  version_available: string | undefined;
  version_current: string | undefined;
}
