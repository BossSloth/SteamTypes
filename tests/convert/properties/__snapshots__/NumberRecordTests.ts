export interface NumberRecordTests {
  achievements: Record<number, Achievement>;

  addresses: Address[];

  differentShapes: DifferentShapes;

  entries: Entry[];

  matches: Match[];

  mixedKeys: MixedKeys;

  mixedValues: MixedValues;

  names: Record<number, string>;

  nestedRecords: Record<number, Record<number, string>>;

  recordOrPrimitive: (Record<number, string> | string)[];

  recordsInArray: Record<number, string>[];

  settings: Settings;
}

export interface DifferentShapes {
  1: DifferentShape;

  2: DifferentShape2;
}

export interface MixedValues {
  1: string;

  2: number;
}

export interface Achievement {
  internal_key: number;

  progress?: number;

  unlocked: boolean;
}

export interface Address {
  street: string;
}

export interface DifferentShape {
  a: number;
}

export interface DifferentShape2 {
  b: string;

  c: number;

  d: boolean;
}

export interface Entry {
  id: number;
}

export interface Match {
  id: number;

  score: number;
}

export interface MixedKeys {
  1: string;

  other: string;
}

export interface Settings {
  a: number;

  label: string;
}
