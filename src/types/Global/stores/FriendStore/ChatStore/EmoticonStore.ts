import { ConnectionManager } from 'Global/managers/ConnectionManager';

export interface EmoticonStore {
  BAwaitInitialized(): Promise<unknown>;

  BHasEmoticon(e: unknown): unknown;

  BTransportReady(): boolean;

  BuildRecentEmoticonList(): void;

  BuildRecentList(e: unknown): unknown;

  BuildRecentStickerList(): void;

  GetEffectList(): unknown;

  GetFlairListByGroupID(e: unknown): unknown;

  GetServerTime(): unknown;

  GetStickerList(): unknown;

  GetTimeReceivedForStickerOrEffect(): unknown;

  GetTimeReceivedNewestEmoticon(): unknown;

  Init(e: unknown): void;

  /**
   * @native
   */
  m_emoticonTrackerCallback(): unknown;

  /**
   * @native
   */
  m_stickerTrackerCallback(): unknown;

  OnEmoticonListReceived(e: unknown): void;

  RequestEmoticonList(): void;

  RequestEmoticonListInternal(): void;

  /**
   * @param t default: 25
   * @param r default: !0
   */
  SearchEmoticons(e: unknown, t?: number, r?: boolean): never[];

  SetEmoticonTrackerCallback(e: unknown): void;

  SetStickerTrackerCallback(e: unknown): void;

  TrackEmoticonUsage(e: unknown, t: unknown): void;

  TrackStickerUsage(e: unknown, t: unknown): void;

  UpdateEmoticonList(): void;

  emoticon_list: (Emoticon_list | Emoticon_list2 | Emoticon_list3 | Emoticon_list4)[];

  flair_list: unknown[];

  is_initialized: boolean;

  m_bEmoticonListRequested: boolean;

  m_bInitialized: boolean;

  m_CMInterface: ConnectionManager;

  m_rgEffects: RgEffects[];

  m_rgEmoticons: (Emoticon_list | Emoticon_list2 | Emoticon_list3 | Emoticon_list4)[];

  m_rgFlairs: unknown[];

  m_rgRecentEmoticons: (Emoticon_list2 | Emoticon_list3)[];

  m_rgRecentStickers: unknown[];

  m_rgStickers: (RgEffects | RgStickers11)[];

  m_rtLastStickerOrEffect: number;

  m_rtMostRecentEmoticon: number;

  m_setEmoticonOwned: Set<string>;

  recent_emoticons: (Emoticon_list2 | RgEffects)[];

  recent_stickers: unknown[];
}

export interface Emoticon_list {
  appid: number;

  name: string;

  name_normalized?: string;
}

export interface Emoticon_list2 {
  appid: number;

  last_used: number;

  name: string;

  name_normalized?: string;

  use_count: number;
}

export interface Emoticon_list3 {
  appid: number;

  count?: number;

  name: string;

  time_received: number;
}

export interface Emoticon_list4 {
  last_used: number;

  name: string;

  use_count: number;
}

export interface RgEffects {
  appid: number;

  count: number;

  infinite_use?: boolean;

  name: string;

  time_received: number;
}

export interface RgStickers11 {
  appid: number;

  count: number;

  name: string;

  time_last_used: number;

  time_received: number;

  use_count: number;
}
