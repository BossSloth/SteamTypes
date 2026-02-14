import { CGameNetworkingUI_AppSummary_Protobuf, CGameNetworkingUI_ConnectionState_Protobuf, CMsgNetworkDevicesData_Protobuf } from '@Runtime/Protobufs';
import { SerializedArrayBuffer } from 'shared/protobuf';
import { OperationResponse, Unregisterable } from 'SteamClient/shared';
import { Device } from './Device';

export interface Network {
  ForceRefresh(): Promise<OperationResponse>;

  ForceTestConnectivity(): void;

  GetProxyInfo(): Promise<ProxyInfo>;

  RegisterForAppSummaryUpdate(callback: (data: AppSummaryUpdate) => void): Unregisterable;

  RegisterForConnectionStateUpdate(callback: (state: SerializedArrayBuffer<typeof CGameNetworkingUI_ConnectionState_Protobuf>) => void): Unregisterable;

  RegisterForConnectivityTestChanges(callback: (connectivityTestChange: ConnectivityTestChange) => void): Unregisterable;

  RegisterForDeviceChanges(callback: (data: SerializedArrayBuffer<typeof CMsgNetworkDevicesData_Protobuf>) => void): Unregisterable;

  SetFakeLocalSystemState(state: ENetFakeLocalSystemState): void;

  SetProxyInfo(mode: number, address: string, port: number, excludeLocal: boolean): void;

  SetWifiEnabled(value: boolean): Promise<OperationResponse>;

  StartScanningForNetworks(): Promise<OperationResponse>;

  StopScanningForNetworks(): Promise<OperationResponse>;

  Device: Device;
}

export interface ConnectivityTestChange {
  bChecking: boolean;

  eConnectivityTestResult: EConnectivityTestResult;

  eFakeState: ENetFakeLocalSystemState;
}

export enum EConnectivityTestResult {
  Unknown,
  Connected,
  CaptivePortal,
  TimedOut,
  Failed,
  WifiDisabled,
  NoLAN,
}

export interface ProxyInfo {
  address: string;

  exclude_local: boolean;

  port: number;

  proxy_mode: number;
}

export enum ENetFakeLocalSystemState {
  Normal,
  NoLAN,
  CaptivePortal_Redirected,
  CaptivePortal_InPlace,
  NoInternet,
  NoSteam,
}

export interface AppSummaryUpdate {
  nAppID: number;

  serializedMsg: SerializedArrayBuffer<typeof CGameNetworkingUI_AppSummary_Protobuf>;
}
