import { ConnectionManager } from 'Global/managers/ConnectionManager';
import { ObservableMap } from 'mobx';
import { Callbacks } from 'shared/interfaces';
import { SettingsStore } from './SettingsStore';

export interface VoiceChatStore {
  AcceptPartnersOneOnOneChatRequest(e: unknown): boolean;

  AddPlaceholderVideoStream(e: unknown): unknown;

  /**
   * @native
   */
  AddRemoteIceCandidate(): unknown;

  AddStreamToOutput(e: unknown): void;

  BackOffAndRetryInitiateVoiceChat(): void;

  BHasSampleRateTooHighInBrowser(): boolean;

  BInitiatedOneOnOneChat(e: unknown): unknown;

  BIsAccountFullyConnectedToActiveVoiceChat(e: unknown): boolean;

  BNoMicAvailableForSession(): boolean;

  BPartnerHasAcceptedOrInitiatedOneOnOneChat(e: unknown): boolean;

  BPartnerHasRequestedAndIsInOneOnOneChat(e: unknown): boolean;

  BSelfHadPreviouslyJoinedOneOnOneChat(e: unknown): unknown;

  BSelfHasAcceptedOrInitiatedOneOnOneChat(e: unknown): boolean;

  BSupportsDataChannels(): boolean;

  /**
   * @native
   */
  CheckConnection(): unknown;

  CheckVoiceSnoozeTimeout(): void;

  ConfigureVideo(e: unknown, t: unknown): void;

  ConvertGainValueToSliderValue(e: unknown, t: unknown): unknown;

  ConvertSliderToGainValue(e: unknown, t: unknown): number;

  CreatePeerConnection(e: unknown): unknown;

  /**
   * @native
   */
  DebouncedToggleMicMuting(): unknown;

  DeleteOneOnOneCallWaitingJoinOrAccept(e: unknown): void;

  DispatchSetVoiceChatActive(e: unknown): void;

  EndLocalMicTest(): void;

  EndVoiceChatInternal(e: unknown): void;

  FillInChatUsabilityMetrics(e: unknown): void;

  /**
   * @native
   */
  ForceConnectingStatus(): unknown;

  /**
   * @native
   */
  ForceReconnectingStatus(): unknown;

  GenerateVoicePositions(): void;

  get_volume(e: unknown): number;

  GetActiveChatRoomGroupID(): unknown;

  GetActiveOneOnOneVoiceChatAccountID(): unknown;

  GetActiveVoiceChatID(): unknown;

  GetAudioWorkletSupport(): unknown;

  GetCurrentVoiceInputGainTarget(): unknown;

  GetLocalAccountID(): unknown;

  GetLocalHMDPose(): unknown;

  GetNextVoiceChatPositionIndex(): unknown;

  GetNoiseGateOptions(): { attack: number; release: number; threshold: number; bufferSize: number; };

  GetOneOnOneCallsWaitingForJoinOrAccept(): unknown;

  GetOutputMutedRemotely(e: unknown): unknown;

  GetPersonaState(e: unknown): unknown;

  GetPerUserGainLevel(e: unknown): unknown;

  GetPerUserGainLevels(): unknown;

  GetPerUserMuting(e: unknown): unknown;

  GetPerUserVoiceStatus(): unknown;

  GetPushToMuteEnabled(): unknown;

  GetPushToTalkEnabled(): unknown;

  GetPushToTalkHotKeyDisplayString(): unknown;

  GetPushToTalkHotKeyVK(): unknown;

  GetPushToTalkOrMuteSoundsEnabled(): unknown;

  GetPushToTalkVoiceStateEnabled(): unknown;

  GetRemoteHMDPose(e: unknown): unknown;

  GetRemoteHMDPoseMap(): unknown;

  GetSelectedMic(): unknown;

  GetSelectedOutputDevice(): unknown;

  GetUseAutoGainControl(): unknown;

  GetUseEchoCancellation(): unknown;

  GetUseNoiseCancellation(): unknown;

  GetUseNoiseGateLevel(): unknown;

  GetUserDeniedMicAccess(): unknown;

  GetUserHasNoMicForSession(e: unknown): unknown;

  GetUserMutedRemotely(e: unknown): unknown;

  GetUserSendsVideo(e: unknown): unknown;

  GetUseSteamAudioSpatialization(): unknown;

  GetVoiceChatPosition(e: unknown): unknown;

  GetVoiceEchoLocalMic(): unknown;

  GetVoiceInputGain(): unknown;

  /**
   * @native
   */
  GetVoiceLogDetails(): unknown;

  /**
   * @native
   */
  GetVoiceLogs(): unknown;

  GetVoiceOutputGain(): unknown;

  HasBeenAttemptingOverTwoSeconds(): unknown;

  Init(e: unknown): void;

  InitiateChatRoomVoice(): void;

  InitiateFriendChat(e: unknown): void;

  InitiateLocalMicTest(): void;

  InitiateOneOnOneVoiceChat(e: unknown): void;

  InitiateRoomChat(e: unknown, t: unknown): void;

  InitiateVoiceChat(e: unknown, t: unknown): undefined;

  IPIntToString(e: unknown): string;

  IsAnyVoiceActive(): boolean;

  IsAttemptingInitialConnection(): unknown;

  IsAttemptingReconnect(): unknown;

  IsLocalMicTestActive(): unknown;

  IsMicMuted(): unknown;

  IsMicTestActive(): boolean;

  IsOutputMuted(): unknown;

  IsVoiceActive(e: unknown, t: unknown): boolean;

  IsVoiceActiveForFriend(e: unknown): unknown;

  IsVoiceActiveForGroup(e: unknown): boolean;

  IsVoiceActiveForRoom(e: unknown, t: unknown): unknown;

  IsVoiceChatActive(): boolean;

  JoinVoiceChatOrAskForOneOnOneChatNow(): void;

  /**
   * @native
   */
  LogMsg(): unknown;

  m_currentUserVoiceLevelAutorunDisposer(): void;

  /**
   * @native
   */
  m_fnCurrentUserVoiceLevelCallback(): unknown;

  /**
   * @native
   */
  m_fnPendingOneOnOneVoiceChatRequestsCallback(): unknown;

  m_pendingOneOnOneVoiceChatRequestsAutorunDisposer(): void;

  /**
   * @native
   */
  ModifyLocalSDPBeforeSetting(): unknown;

  /**
   * @native
   */
  OnAcceptOneOnOneVoiceChat(): unknown;

  /**
   * @native
   */
  OnAddRemoteStream(): unknown;

  OnAddTrack(e: unknown, t: unknown): void;

  /**
   * @native
   */
  OnAudioContextStateChange(): unknown;

  /**
   * @native
   */
  OnCreateAnswerError(): unknown;

  /**
   * @native
   */
  OnCreateAnswerSuccess(): unknown;

  /**
   * @native
   */
  OnCreateOfferError(): unknown;

  /**
   * @native
   */
  OnCreateOfferSuccess(): unknown;

  /**
   * @native
   */
  OnGetUserMediaFailure(): unknown;

  /**
   * @native
   */
  OnGetUserMediaSuccess(): unknown;

  /**
   * @native
   */
  OnIceCandidate(): unknown;

  /**
   * @native
   */
  OnIceConnectionStateChange(): unknown;

  /**
   * @native
   */
  OnIceGatheringStateChange(): unknown;

  OnMicStreamInactive(e: unknown, t: unknown): void;

  /**
   * @native
   */
  OnNoiseGateMessage(): unknown;

  /**
   * @native
   */
  OnPushToTalkReleased(): unknown;

  /**
   * @native
   */
  OnPushToTalkStateChange(): unknown;

  /**
   * @native
   */
  OnRejectOneOnOneVoiceChat(): unknown;

  OnRejectOneOnOneVoiceChatForPartner(e: unknown): boolean;

  /**
   * @native
   */
  OnRemoveRemoteStream(): unknown;

  /**
   * @native
   */
  OnRequestMicrophoneAccess(): unknown;

  /**
   * @native
   */
  OnSetUpdatedLocalDescriptionFailure(): unknown;

  /**
   * @native
   */
  OnSetUpdatedLocalDescriptionSuccess(): unknown;

  /**
   * @native
   */
  OnSignalingStateChange(): unknown;

  /**
   * @native
   */
  OnUpdatedCreateOfferSuccess(): unknown;

  OnUserEndVoiceChat(): void;

  OnUserLeaveOneOnOneVoiceChat(): void;

  OnUserLeftChatRoomVoiceChat(e: unknown, t: unknown, r: unknown, n: unknown): void;

  OnVoiceChatAccepted(e: unknown): void;

  OnWebRTCConnectedAndVoiceChatConnected(): void;

  /**
   * @param r default: void 0
   */
  PadOutput(e: unknown, t: unknown, r?: undefined): unknown;

  /**
   * @native
   */
  PlayRingSound(): unknown;

  /**
   * @native
   */
  ProcessReceiverStatsReport(): unknown;

  /**
   * @native
   */
  ProcessStatsReport(): unknown;

  ProcessUpdatedRemoteDescription(e: unknown): number;

  RefreshPushToTalkKeySettings(): void;

  RegisterForCurrentUserVoiceLevel(e: unknown): void;

  RegisterForPendingOneOnOneVoiceChatRequests(e: unknown): void;

  RegisterForVoiceChatActiveStateChange(e: unknown): unknown;

  RemoveStreamToOutput(e: unknown): undefined;

  RenegotiateSDP(): void;

  RestartVoiceChatIfConnected(): void;

  ScheduleClientVoiceLogsUpload(e: unknown): void;

  /**
   * @native
   */
  ScheduledAcceptOneOnOne(): unknown;

  /**
   * @native
   */
  ScheduledInitiate(): unknown;

  SendVoiceStatusUpdate(): void;

  /**
   * @native
   */
  SetAutoShowVideoStream(): unknown;

  SetLocalHMDPose(e: unknown): void;

  SetPerUserGainLevel(e: unknown, t: unknown): void;

  SetPerUserMuting(e: unknown, t: unknown): void;

  SetPushToMuteEnabled(e: unknown): void;

  SetPushToTalkEnabled(e: unknown): void;

  SetPushToTalkOrMuteSoundsEnabled(e: unknown): void;

  SetReceivingVideo(e: unknown, t: unknown): void;

  SetRemoteHMDPose(e: unknown, t: unknown): void;

  /**
   * @native
   */
  SetSelectedMic(): unknown;

  /**
   * @native
   */
  SetSelectedOutput(): unknown;

  SetupAudioStreamElementAndCreateSourceNode(e: unknown, t: unknown): void;

  /**
   * @native
   */
  SetupNoiseGateOnMic(): unknown;

  /**
   * @native
   */
  SetUseAutoGainControl(): unknown;

  /**
   * @native
   */
  SetUseEchoCancellation(): unknown;

  /**
   * @native
   */
  SetUseNoiseCancellation(): unknown;

  /**
   * @native
   */
  SetUseNoiseGateLevel(): unknown;

  /**
   * @native
   */
  SetUseSteamAudioSpatialization(): unknown;

  /**
   * @native
   */
  SetVoiceEchoLocalMic(): unknown;

  /**
   * @native
   */
  SetVoiceInputGain(): unknown;

  /**
   * @native
   */
  SetVoiceLogDetails(): unknown;

  /**
   * @native
   */
  SetVoiceOutputGain(): unknown;

  ToggleMicMuting(): void;

  ToggleOutputMuting(): void;

  /**
   * @native
   */
  UpdateNoiseGateOnActiveMic(): unknown;

  UpdateStreamsForPerUseGainChange(e: unknown): void;

  UpdateUserVideoStatus(e: unknown, t: unknown): undefined;

  UpdateUserVoiceStatus(e: unknown): void;

  /**
   * @native
   */
  UploadClientSideVoiceLogs(): unknown;

  audio_streams: unknown[];

  m_AudioContext: undefined;

  m_bAutoShowVideoStream: boolean;

  m_bClientSideLogsUploadInProgress: boolean;

  m_bForceConnectingStatus: boolean;

  m_bForceReconnectingStatus: boolean;

  m_bLocalMicEchoStateBeforeMicTest: boolean;

  m_bLocalMicTestActive: boolean;

  m_bOutputMuted: boolean;

  m_bPushToMuteEnabled: boolean;

  m_bPushToTalkEnabled: boolean;

  m_bReceiveVideo: boolean;

  m_bSendVideo: boolean;

  m_bUserHasDeniedMicPermissions: boolean;

  m_bVoicePTTStateEnabled: boolean;

  m_CMInterface: ConnectionManager;

  m_ConnectionCheck: number;

  m_hPushToTalkReleaseTimeout: number;

  m_hRegisterForPushToTalkStateChange: HRegisterForPushToTalkStateChange;

  m_localPose: undefined;

  m_LogVoiceChatDetails: boolean;

  m_mapAccountIDToAudioStats: Map<unknown, unknown>;

  m_mapAccountIDToVideoStats: Map<unknown, unknown>;

  m_mapOneOnOneCallsWaitingJoinOrAccept: ObservableMap<unknown, unknown>;

  m_mapPerUserOutputGain: ObservableMap<unknown, unknown>;

  m_mapRemotePoseForAccountID: ObservableMap<unknown, unknown>;

  m_mapSSRCToAccountID: Map<unknown, unknown>;

  m_mapUserVoiceStatus: ObservableMap<unknown, unknown>;

  m_MicInputGainNode: undefined;

  m_MicNoiseGate: undefined;

  m_MicVolumeMeter: undefined;

  m_nLastLogLineUploaded: number;

  m_PeerConnection: undefined;

  m_rgAudioStreams: unknown[];

  m_rgFreePositionIndices: number[];

  m_rgLogLines: string[];

  m_rgPositions: RgPositions[];

  m_rgVideoStreams: unknown[];

  m_ScheduledInitiate: number;

  m_ScheduledVoiceLogsUpload: number;

  m_Settings: Settings;

  m_StatsTimeout: number;

  m_strPushToTalkDisplayString: string;

  m_VKPushToTalkHotKey: number;

  m_VoiceCallState: VoiceCallState;

  m_VoiceChatActiveStateChangeCallbacks: Callbacks;

  m_VoiceEchoLocalMic: boolean;

  mic_volume: undefined;

  video_streams: unknown[];
}

export interface HRegisterForPushToTalkStateChange {
  /**
   * @native
   */
  unregister(): unknown;
}

export interface RgPositions {
  x: number;

  y: number;

  z: number;
}

export interface Settings {
  LoadFromLocalStorage(e: unknown): void;

  SaveToLocalStorage(): void;

  m_bHasResetOpenMicHotkey: boolean;

  m_bPlayPTTSounds: boolean;

  m_bSettingsLoaded: boolean;

  m_bUseSteamAudioSpatialization: boolean;

  m_NoiseGateLevel: number;

  m_SelectedMicID: string;

  m_SelectedOutputID: string;

  m_SettingsStore: SettingsStore;

  m_VoiceInputGain: number;

  m_VoiceOutputGain: number;

  m_VoiceUseAutoGainControl: boolean;

  m_VoiceUseEchoCancellation: boolean;

  m_VoiceUseNoiseCancellation: boolean;
}

export interface VoiceCallState {
  BCallActiveForGroup(e: unknown): unknown;

  BMatchingCall(e: unknown, t: unknown): boolean;

  m_bInitiatedOneOnOneCall: boolean;

  m_bIsConnectionAttemptOverTwoSeconds: boolean;

  m_bOfferUpdateInProgress: boolean;

  m_bPostedOneOnOneEndedMsg: boolean;

  m_bWaitingOnOneOnOneRejoin: boolean;

  m_chatRoom: undefined;

  /**
   * This value is an enum
   * @currentValue 0
   */
  m_eState: EState;

  m_msgPendingRemoteDescriptionUpdate: undefined;

  m_nFailuresThisInitiate: number;

  m_nMostRecentRemoteDescriptionVersion: string;

  m_targetAccountID: number;

  m_timeEndedVoiceChat: undefined;

  m_timeFinishedConnecting: undefined;

  m_timeStartedConnecting: undefined;

  m_voiceChatID: string;

  m_webRTCClientIP: number;

  m_webRTCClientPort: number;

  m_webRTCConnectedNotification: undefined;

  m_webRTCServerIP: number;

  m_webRTCServerPort: number;
}

/** @generated */
export enum EState {
  EState0 = 0,
  EState1 = 1,
}
