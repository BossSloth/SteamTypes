export const unionTypeTests = {
  // Triggers UnionType filtering of fully-unknown generic members.
  fullyUnknownGenericInUnion: [new Set(), { value: 1 }, 'string'],

  // Triggers ArrayType union-optimisation merging non-union element arrays
  // into an existing union array group.
  mixedNumericArrays: [[1, 'a'], [2]],
};
