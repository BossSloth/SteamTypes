export interface BasicPropertyTypes {
  complexFunc(): number;

  /**
   * @param x default: 1
   * @param y default: "string"
   */
  funcWithDefault(x?: number, y?: string): number;

  /**
   * native code
   */
  nativeCode(): unknown;

  bigIntValue: bigint;

  booleanArray: boolean[];

  emptyArray: unknown[];

  emptyObject: (object | unknown);

  emptyString: string;

  falseValue: boolean;

  floatingPoint: number;

  infinity: number;

  mixedArray: (boolean | null | number | string)[];

  mixedObjectArray: (MixedObjectArray | MixedObjectArray2 | MixedObjectArray3)[];

  multilineString: string;

  nan: number;

  negativeInfinity: number;

  negativeInteger: number;

  nestedArray: number[][];

  nestedObject: NestedObject;

  nullValue: null;

  numberArray: number[];

  objectArray: ObjectArray[];

  objectWithAccessors: ObjectWithAccessors;

  objectWithMethods: ObjectWithMethods;

  positiveInteger: number;

  sameStructureDifferentName: SameStructureDifferentName;

  sameStructureSameName: SameStructureSameName;

  simpleObject: SimpleObject;

  simpleString: string;

  sparseArray: (number | undefined)[];

  specialPropertyNames: SpecialPropertyNames;

  stringArray: string[];

  symbolValue: symbol;

  trueValue: boolean;

  undefinedValue: undefined;

  zero: number;
}

export interface MixedObjectArray {
  id: number;
}

export interface MixedObjectArray2 {
  name: string;
}

export interface MixedObjectArray3 {
  active: boolean;
}

export interface NestedObject {
  outer: Outer;
}

export interface ObjectArray {
  id: number;

  name: string;
}

export interface ObjectWithAccessors {
  _value: number;

  value: number;
}

export interface ObjectWithMethods {
  method(): unknown;

  data: number;
}

export interface SameStructureDifferentName {
  s_x: s_x;

  s_y: s_x;
}

export interface SameStructureSameName {
  x: X;

  y: X;
}

export interface SimpleObject {
  a: number;

  b: string;

  c: boolean;
}

export interface SpecialPropertyNames {
  $dollar: number;

  '123numericStart': number;

  _underscore: number;

  'property-with-dash': number;

  'property.with.dots': number;

  'property with spaces': number;
}

export interface Outer {
  inner: Inner;
}

export interface s_x {
  k: number;
}

export interface X {
  structure: Structure;
}

export interface Inner {
  other: number;
}

export interface Structure {
  value: string;
}
