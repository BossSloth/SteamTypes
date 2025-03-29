import { JsPbMessage, Unregisterable } from '../shared';

export interface AudioDevice {
  /**
   * If `data` is deserialized, returns {@link MsgSystemAudioManagerState}.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForStateChanges(callback: (data: ArrayBuffer) => void): Unregisterable;

  // e.UpdateSomething(t.serializeBase64String())
  UpdateSomething(param0: unknown): unknown;
}

/**
 * CMsgSystemAudioManagerState
 */
export interface MsgSystemAudioManagerState extends JsPbMessage {
  counter(): number | undefined;

  hw(): MsgSystemAudioManagerStateHW | undefined;

  rtime_filter(): number | undefined;
}

export interface MsgSystemAudioManagerStateHW {
  devices: MsgSystemAudioManagerDevice[];
  links: MsgSystemAudioManagerLink[];
  nodes: MsgSystemAudioManagerNode[];
  ports: MsgSystemAudioManagerPort[];
}

export interface MsgSystemAudioManagerDevice {
  api: string | undefined;
  base: MsgSystemAudioManagerObject | undefined;
  description: string | undefined;
  name: string | undefined;
  nick: string | undefined;
}

export interface MsgSystemAudioManagerNode {
  base: MsgSystemAudioManagerObject | undefined;
  description: string | undefined;
  device_id: number | undefined;
  edirection: ESystemAudioDirection | undefined;
  name: string | undefined;
  nick: string | undefined;
  volume: MsgSystemAudioVolume | undefined;
}

export interface MsgSystemAudioManagerPort {
  alias: string | undefined;
  base: MsgSystemAudioManagerObject | undefined;
  edirection: ESystemAudioPortDirection | undefined;
  etype: ESystemAudioPortType | undefined;
  is_control: boolean | undefined;
  is_monitor: boolean | undefined;
  is_physical: boolean | undefined;
  is_terminal: boolean | undefined;
  name: string | undefined;
  node_id: number | undefined;
}

export interface MsgSystemAudioVolume {
  entries: MsgSystemAudioVolumeChannelEntry[] | undefined;
  is_muted: boolean | undefined;
}

export interface MsgSystemAudioVolumeChannelEntry {
  echannel: ESystemAudioChannel | undefined;
  volume: number | undefined;
}

export interface MsgSystemAudioManagerLink {
  base: MsgSystemAudioManagerObject | undefined;
  input_node_id: number | undefined;
  input_port_id: number | undefined;
  output_node_id: number | undefined;
  output_port_id: number | undefined;
}

export interface MsgSystemAudioManagerObject {
  id: number | undefined;
  rtime_last_update: number | undefined;
}

export enum ESystemAudioDirection {
  Invalid,
  Input,
  Output,
}

export enum ESystemAudioPortDirection {
  Invalid,
  Input,
  Output,
}

export enum ESystemAudioPortType {
  Invalid,
  Unknown,
  Audio32f,
  Midi8b,
  Video32RGBA,
}

export enum ESystemAudioChannel {
  Invalid,
  Aggregated,
  FrontLeft,
  FrontRight,
  LFE,
  BackLeft,
  BackRight,
  FrontCenter,
  Unknown,
  Mono,
}
