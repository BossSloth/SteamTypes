export interface UnionTypeTests {
  fullyUnknownGenericInUnion: (FullyUnknownGenericInUnion | string)[];

  mixedNumericArrays: (number | string)[][];
}

export interface FullyUnknownGenericInUnion {
  value: number;
}
