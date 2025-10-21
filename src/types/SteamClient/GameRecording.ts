import { CGameRecording_AudioSessionsChanged_Notification } from '../Protobufs/steam/steammessages_gamerecording_objects';
import { ProtobufInterface } from '../shared';
import type { Unregisterable } from './shared';

export interface GameRecording {
  /**
   * If `data` is deserialized, returns {@link AudioSessionsChanged_Notification}.
   */
  RegisterForAudioSessionsChanged(callback: (data: ArrayBuffer) => void): Unregisterable;

  SetAudioSessionCaptureState(id: string, name: string, state: boolean): void;
}

export type AudioSessionsChanged_Notification = ProtobufInterface<CGameRecording_AudioSessionsChanged_Notification>;
