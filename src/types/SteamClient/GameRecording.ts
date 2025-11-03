import { CGameRecording_AudioSessionsChanged_Notification_Protobuf } from '@Runtime/Protobufs';
import { SerializedArrayBuffer } from 'shared/protobuf';
import { Unregisterable } from './shared';

export interface GameRecording {
  /**
   * `data` can be deserialized with {@link CGameRecording_AudioSessionsChanged_Notification_Protobuf}
   */
  RegisterForAudioSessionsChanged(callback: (data: SerializedArrayBuffer<typeof CGameRecording_AudioSessionsChanged_Notification_Protobuf>) => void): Unregisterable;

  SetAudioSessionCaptureState(id: string, name: string, state: boolean): void;
}
