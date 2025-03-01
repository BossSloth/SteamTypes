export interface ComplexObjectArrays {
  arrayOfArrays: number[][];
  arrayOfMixedArrays: (number[]|string[]|(boolean|null)[])[];
  complexNested: ComplexNested[];
  mixedArray: (MixedArray|MixedArray2|MixedArray3)[];
  mixedEmptiness: (MixedEmptiness|MixedEmptiness2|MixedEmptiness3)[];
  mixedNestedArray: (MixedNestedArray|MixedNestedArray2|MixedNestedArray3)[];
  mixedValueArray: (MixedValueArray|MixedValueArray2|MixedValueArray3)[];
  nestedObjectArray: NestedObjectArray[];
  objectArray: ObjectArray[];
  objectsWithArrays: ObjectsWithArrays[];
  objectsWithFunctions: ObjectsWithFunctions[];
}

export interface ObjectArray {
  foo: number;
}

export interface MixedArray {
  foo: number;
}

export interface MixedArray2 {
  bar: number;
}

export interface MixedArray3 {
  baz: number;
}

export interface MixedValueArray {
  foo: string;
}

export interface MixedValueArray2 {
  foo: number;
}

export interface MixedValueArray3 {
  foo: null;
}

export interface NestedObjectArray {
  nested: Nested;
}

export interface MixedNestedArray {
  nested: Nested;
}

export interface MixedNestedArray2 {
  nested: Nested2;
}

export interface MixedNestedArray3 {
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

export interface MixedEmptiness {
}

export interface MixedEmptiness2 {
  prop: string;
}

export interface MixedEmptiness3 {
  otherProp: number;
}

export interface ComplexNested {
  level1: Level1;
}

export interface Nested {
  prop: number;
}

export interface Nested2 {
  differentProp: number;
}

export interface CompletelyDifferent {
  something: number;
}

export interface Level1 {
  level2: Level2;
}

export interface Level2 {
  array: number[];
  object: Object;
}

export interface Object {
  prop: string;
}
