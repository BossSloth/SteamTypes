export interface ArrayTypes {
  emptyArray: unknown[];
  functionArray: unknown[];
  mixedArray: (number|string|boolean|null)[];
  numberArray: number[];
  objectArray: (ObjectArray|ObjectArray2)[];
  stringArray: string[];
}

export interface ObjectArray {
  a: number;
}

export interface ObjectArray2 {
  b: number;
}
