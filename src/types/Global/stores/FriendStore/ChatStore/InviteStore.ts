export interface InviteStore {
  AcceptInvite(e: unknown, t: unknown): unknown;

  GetDirectInviteInfo(e: unknown, t: unknown, r: unknown): unknown;

  GetInviteFromCode(e: unknown): unknown;

  JoinChatGroup(e: unknown, t: unknown, r: unknown): unknown;

  /**
   * Property ignored by configuration
   */
  m_ChatStore: unknown;

  m_mapInviteByCode: Map<unknown, unknown>;
}
