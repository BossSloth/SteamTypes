export interface GameSession {
  end_time?: number;

  player_ids?: string[];

  player_stats?: GameSession_PlayerStats[];

  session_id?: string;

  start_time?: number;

  state?: GameState;
}

export interface GameSession_PlayerStats {
  achievements?: string[];

  player_id?: string;

  score?: number;
}

export interface DataCollection {
  booleans?: boolean[];

  byte_arrays?: Uint8Array[];

  integers?: number[];

  points?: DataCollection_DataPoint[];

  strings?: string[];
}

export interface DataCollection_DataPoint {
  x?: number;

  y?: number;
}

export interface EmptyMessage { }

export enum GameState {
  Invalid = 0,
  Lobby = 1,
  Playing = 2,
  Finished = 3,
}
