export interface SharedMessage {
  count?: number;

  id?: string;
}

export interface OtherShared {
  note?: string;
}

export enum SharedKind {
  Unknown = 0,
  Primary = 1,
  Secondary = 2,
}
