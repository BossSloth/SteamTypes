export interface EdgeCases {
  complexFunc(): number;

  circularReference: CircularReference;
  emptyArray: unknown[];
  emptyObject: object|unknown;
  m_startWithUnderscore: m_startWithUnderscore;
  nestedEmpty: NestedEmpty;
  'property with spaces': string;
  'property-with-dash': string;
  'property.with.dots': string;
  sameStructureDifferentName: SameStructureDifferentName;
  sameStructureSameName: SameStructureSameName;
}

export interface m_startWithUnderscore {
  a: number;
}

export interface NestedEmpty {
  emptyArr: unknown[];
  emptyObj: object|unknown;
}

export interface SameStructureDifferentName {
  s_x: s_x;
  s_y: s_x;
}

export interface SameStructureSameName {
  x: X;
  y: X;
}

export interface CircularReference {
  self: CircularReference;
}

export interface s_x {
  k: number;
}

export interface X {
  id: Id;
}

export interface Id {
  value: string;
}
