export interface NotificationBBCodeParser {
  dictComponents(): unknown;

  Parse_NotificationHandlers(e: unknown, t: unknown): unknown;

  ParseBBCode(e: unknown, t: unknown): unknown;

  m_dictComponents: DictComponents;
}

export interface DictComponents {
  gameinvite(e: unknown): { title: string; body: unknown; state: unknown; } | null;

  img(t: unknown): { body: unknown; };

  invite(e: unknown): { title: string; body: unknown; } | null;

  lobbyinvite(e: unknown): { title: string; body: unknown; state: string; } | null;

  roomeffect(e: unknown): { body: unknown; } | null;

  spoiler(e: unknown): { body: unknown; };

  sticker(t: unknown): { body: unknown; };

  tradeoffer(e: unknown): { title: unknown; body: unknown; } | null;

  video(t: unknown): { body: unknown; };
}
