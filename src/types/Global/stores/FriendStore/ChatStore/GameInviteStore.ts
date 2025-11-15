import { ObservableMap } from 'mobx';

export interface GameInviteStore {
  Init(): void;

  RecordDismissTime(e: unknown): void;

  RegisterGameInvite(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown, a: unknown): unknown;

  WriteToLocalStorage(): void;

  m_mapDismissedInvites: ObservableMap<number, DeepDismissedInvites>;

  m_mapGameInvites: Map<unknown, unknown>;

  m_mapInviteByCode: Map<unknown, unknown>;
}

export type DeepDismissedInvites = number | [DeepDismissedInvites, DeepDismissedInvites];
