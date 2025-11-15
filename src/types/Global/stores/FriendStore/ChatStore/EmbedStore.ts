import { ObservableMap } from 'mobx';

export interface EmbedStore {
  EvictOldestIfNecessary(): void;

  GetCollapsedState(e: unknown, t: unknown): boolean;

  GetKey(e: unknown, t: unknown): string;

  GetOrCreateEmbedData(e: unknown, t: unknown): unknown;

  GetWidths(e: unknown, t: unknown): { nDesiredWidth: unknown; nDefaultWidth: unknown; } | undefined;

  Init(): void;

  SaveEmbedData(e: unknown, t: unknown, r: unknown): void;

  SetCollapsedState(e: unknown, t: unknown, r: unknown): void;

  SetWidths(e: unknown, t: unknown, r: unknown, n: unknown): void;

  WriteToLocalStorage(): void;

  m_mapEmbed: ObservableMap<string, MapEmbed>;
}

export interface MapEmbed {
  IsEmpty(): boolean;

  bCollapsed: boolean;

  nDefaultWidth: number;

  nDesiredWidth: number;
}
