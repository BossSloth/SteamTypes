export interface TaskInfo {
  name?: string;

  priority?: Priority;

  status?: Status;

  timeline_entry_type?: TimelineEntryType;
}

export interface TaskInfo_Tag {
  name?: string;
}

export enum Status {
  Unknown = 0,
  Active = 1,
  Inactive = 2,
  Pending = 3,
}

export enum Priority {
  PRIORITY_UNSPECIFIED = 0,
  PRIORITY_LOW = 1,
  PRIORITY_MEDIUM = 2,
  PRIORITY_HIGH = 3,
}

export enum TimelineEntryType {
  Invalid = 0,
  GameMode = 1,
  Event = 2,
  StateDescription = 3,
  Achievement = 4,
  UserMarker = 5,
  Screenshot = 6,
  Error = 7,
  Tag = 8,
  GamePhase = 9,
}
