import { CMsgSystemUpdateState_Protobuf } from '@Runtime/Protobufs';
import { SerializedArrayBuffer } from 'shared/protobuf';
import { OperationResponse, Unregisterable } from './shared';

export interface Updates {
  ApplyUpdates(param0: string): Promise<OperationResponse>;

  // Checks for software updates
  CheckForUpdates(): Promise<OperationResponse>;

  GetCurrentOSBranch(): Promise<OSBranch>;

  GetOSBranchList(): Promise<unknown[]>;

  RegisterForUpdateStateChanges(callback: (data: SerializedArrayBuffer<typeof CMsgSystemUpdateState_Protobuf>) => void): Unregisterable;

  // 1 - Stable, 2 - Beta, 3 - Preview
  // Return maybe an enum?
  SelectOSBranch(branch: number): unknown;
}

export interface OSBranch {
  eBranch: EOSBranch;

  sRawName: string;
}

export enum EOSBranch {
  Unknown,
  Release, // 1 - Stable
  ReleaseCandidate,
  Beta,
  BetaCandidate,
  Preview,
  PreviewCandidate,
  Main,
  Staging,
}
