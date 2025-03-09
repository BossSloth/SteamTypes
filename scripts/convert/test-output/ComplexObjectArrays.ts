export interface ComplexObjectArrays {
  arrayOfArrays: number[][];
  arrayOfMixedArrays: ((boolean | null)[] | number[] | string[])[];
  complexNested: ComplexNested[];
  mixedArray: (MixedArray | MixedArray2 | MixedArray3)[];
  mixedEmptiness: (MixedEmptiness | MixedEmptiness2 | MixedEmptiness3)[];
  mixedNestedArray: (MixedNestedArray | MixedNestedArray2)[];
  mixedValueArray: MixedArray[];
  nestedObjectArray: MixedNestedArray[];
  objectArray: MixedArray[];
  objectsWithArrays: ObjectsWithArrays[];
  objectsWithFunctions: ObjectsWithFunctions[];
}

export interface ComplexNested {
  level1: Level1;
}

export interface MixedArray {
  foo: (null | number | string);
}

export interface MixedArray2 {
  bar: number;
}

export interface MixedArray3 {
  baz: number;
}

export interface MixedEmptiness {
}

export interface MixedEmptiness2 {
  proper: string;
}

export interface MixedEmptiness3 {
  otherProp: number;
}

export interface MixedNestedArray {
  nested: (Nested | Nested2);
}

export interface MixedNestedArray2 {
  completelyDifferent: CompletelyDifferent;
}

export interface ObjectsWithArrays {
  name: string;
  values: number[];
}

export interface ObjectsWithFunctions {
  process(): string;

  id: number;
}

export interface Level1 {
  level2: Level2;
}

export interface Nested {
  prop: (number | string);
}

export interface Nested2 {
  differentProp: number;
}

export interface CompletelyDifferent {
  something: number;
}

export interface Level2 {
  array: number[];
  object: Nested;
}
