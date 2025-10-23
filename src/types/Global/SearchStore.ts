import { ObservableValue } from '../shared';
import { ConnectionManager } from './ConnectionManager';

export interface SearchStore {
  BIsSuggestionVisible(appId: string): boolean;

  ClearSearchText(): void;

  FetchSearchSuggestions(e: unknown, t: unknown): Promise<{ total: number; items: unknown[]; }>;

  GetSearchText(): SearchStore['m_strSearchText'];

  Init(e: unknown): Promise<void>;

  SetSearchText(e: string): void;

  m_cm: ConnectionManager;

  m_strSearchText: ObservableValue<string>;
}
