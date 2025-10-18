export interface TaskInfo {
  name?: string;
  priority?: Priority;
  status?: Status;
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
