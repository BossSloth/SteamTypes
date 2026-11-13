import { ObservableMap } from 'mobx';

export interface GameInviteStore {
  GetPendingInvite(j: unknown): unknown;

  GetPendingInvites(j: unknown): never[];

  Init(): void;

  RecordDismissTime(e: unknown): void;

  RegisterGameInvite(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown, a: unknown): unknown;

  RegisterGameInvitesInMessage(j: unknown, A: unknown, b: unknown): void;

  WriteToLocalStorage(): void;

  m_bDismissedInvitesLoaded: boolean;

  m_mapDismissedInvites: ObservableMap<number, DeepDismissedInvites>;

  m_mapGameInvites: Map<number, Map<number, GameInvite>>;

  m_mapInviteByCode: Map<unknown, unknown>;

  m_mapLatestInvite: ObservableMap<unknown, unknown>;
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
