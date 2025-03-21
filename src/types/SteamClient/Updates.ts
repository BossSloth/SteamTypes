import { EResult, JsPbMessage, OperationResponse, Unregisterable } from './shared';

export interface Updates {
  ApplyUpdates(param0: string): Promise<OperationResponse>;

  // Checks for software updates
  CheckForUpdates(): Promise<OperationResponse>;

  GetCurrentOSBranch(): Promise<OSBranch>;

  GetOSBranchList(): Promise<unknown[]>;

  /**
   * If `data` is deserialized, returns {@link MsgSystemUpdateState}.
   * @returns A Promise that resolves to a ProtoBuf message.
   */
  RegisterForUpdateStateChanges(callback: (data: ArrayBuffer) => void): Unregisterable;

  // 1 - Stable, 2 - Beta, 3 - Preview
  SelectOSBranch(branch: number): unknown; // enum?
}

export interface OSBranch {
  eBranch: EOSBranch; // 1 - Stable
  sRawName: string;
}

export enum EOSBranch {
  Unknown,
  Release,
  ReleaseCandidate,
  Beta,
  BetaCandidate,
  Preview,
  PreviewCandidate,
  Main,
  Staging,
}

/**
 * CMsgSystemUpdateState
 */
export interface MsgSystemUpdateState extends JsPbMessage {
  progress(): UpdateProgress | undefined;

  state(): EUpdaterState | undefined;

  supports_os_updates(): boolean | undefined;

  update_apply_results(): UpdateApplyResult[];

  update_check_results(): UpdateCheckResult[];
}

export interface UpdateApplyResult {
  eresult: EResult;
  requires_client_restart: boolean;
  requires_system_restart: boolean;
  type: EUpdaterType;
}

export interface UpdateCheckResult {
  available: boolean;
  eresult: EResult;
  rtime_checked: number;
  type: EUpdaterType;
}

export interface UpdateProgress {
  rtime_estimated_completion: number | undefined;
  stage_progress: number | undefined;
  stage_size_bytes: number | undefined;
}

export enum EUpdaterState {
  Invalid,
  // ty valve
  UpToDate = 2,
  Checking,
  Available,
  Applying,
  ClientRestartPending,
  SystemRestartPending,
  RollBack,
}

export enum EUpdaterType {
  Invalid,
  Client,
  OS,
  BIOS,
  Aggregated,
  Test1,
  Test2,
  Dummy,
}
