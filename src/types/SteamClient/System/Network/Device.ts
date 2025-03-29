export interface Device {
  // Returns some base64 serialized string
  Connect(param0: unknown): unknown;
  Disconnect(deviceId: unknown): Promise<unknown>;

  WirelessNetwork: WirelessNetwork;
}

export interface WirelessNetwork {
  Forget(deviceId: unknown, deviceWapId: unknown): unknown;

  SetAutoconnect(deviceId: unknown, deviceWapId: unknown, autoConnect: boolean): unknown;
}
