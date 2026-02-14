import { ObservableMap } from 'mobx';

export interface GameInviteStore {
  Init(): void;

  RecordDismissTime(e: unknown): void;

  RegisterGameInvite(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown, a: unknown): unknown;

  WriteToLocalStorage(): void;

  m_mapDismissedInvites: ObservableMap<number, DeepDismissedInvites>;

  m_mapGameInvites: Map<number, Map<number, GameInvite>>;

  m_mapInviteByCode: Map<unknown, unknown>;
}

export type DeepDismissedInvites = number | [DeepDismissedInvites, DeepDismissedInvites];

export interface GameInvite {
  AcceptGameInvite(): void;

  DismissInvite(): void;

  appID: number;

  bAccepted: boolean;

  bDismissed: boolean;

  bOld: boolean;

  connectString: string;

  inviteString: string;

  lobbyID: undefined;

  remoteplayString: undefined;

  rtTimestamp: number;

  unAccountIDInviter: number;
}
