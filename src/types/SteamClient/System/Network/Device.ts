export interface Device {
  Connect(param0: unknown): unknown; // some base64 serialized string
  Disconnect(deviceId: unknown): Promise<unknown>;

  WirelessNetwork: WirelessNetwork;
}

export interface WirelessNetwork {
  Forget(deviceId: unknown, deviceWapId: unknown): unknown;

  SetAutoconnect(deviceId: unknown, deviceWapId: unknown, autoConnect: boolean): unknown;
}
