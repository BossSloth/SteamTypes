import Long from 'long';
import { ObservableMap, ObservableSet } from 'mobx';
import { ObservableValue } from './shared';

export interface AdvancedPropertyTests {
  datePropertyTests: DatePropertyTests;

  errorPropertyTests: ErrorPropertyTests;

  mapSetPropertyTests: MapSetPropertyTests;

  observableValueTests: ObservableValueTests;

  regexPropertyTests: RegexPropertyTests;

  specialTypePropertyTests: SpecialTypePropertyTests;

  typedArrayPropertyTests: TypedArrayPropertyTests;
}

export interface DatePropertyTests {
  dateObject: Date;

  dateTimestamp: number;

  isoDateString: string;

  utcDateString: string;
}

export interface ErrorPropertyTests {
  basicError: Error;

  referenceError: ReferenceError;

  syntaxError: SyntaxError;

  typeError: TypeError;
}

export interface MapSetPropertyTests {
  maps: Maps;

  sets: Sets;
}

export interface ObservableValueTests {
  booleanValue: ObservableValue<boolean>;

  numberValue: ObservableValue<number>;

  objectValue: ObservableValue<ObjectValue>;

  stringValue: ObservableValue<string>;
}

export interface RegexPropertyTests {
  complexRegex: RegExp;

  regexWithFlags: RegExp;

  simpleRegex: RegExp;
}

export interface SpecialTypePropertyTests {
  arrowFunction(): string;

  asyncFunction(): Promise<string>;

  function(): number;

  generatorFunction(): Generator<1 | 2, void, unknown>;

  advancedClassInstance: AdvancedClassInstance;

  /**
   * This is a class function
   */
  class: unknown;

  classInstance: ClassInstance;

  longInteger: Long;

  promise: Promise<unknown>;
}

export interface TypedArrayPropertyTests {
  arrayBuffer: ArrayBuffer;

  dataView: DataView;

  float32Array: Float32Array;

  float64Array: Float64Array;

  int16Array: Int16Array;

  int32Array: Int32Array;

  int8Array: Int8Array;

  uint16Array: Uint16Array;

  uint32Array: Uint32Array;

  uint8Array: Uint8Array;

  uint8ClampedArray: Uint8ClampedArray;
}

export interface Maps {
  emptyMap: Map<unknown, unknown>;

  mixedKeyMap: Map<(number | string), string>;

  mixedObjectMap: Map<string, (MixedObjectMap | MixedObjectMap2)>;

  nestedMap: Map<string, Map<string, string>>;

  numberKeyMap: Map<number, string>;

  numberObservableMap: ObservableMap<number, string>;

  objectKeyMap: Map<ObjectKeyMap, string>;

  objectMap: Map<string, ObjectMap>;

  observableMap: ObservableMap<string, string>;

  stringKeyMap: Map<string, string>;

  stringKeyNumberValueMap: Map<string, number>;

  weakMap: WeakMap<object, unknown>;
}

export interface Sets {
  emptySet: Set<unknown>;

  mixedObjectSet: Set<(MixedObjectSet | MixedObjectSet2)>;

  mixedSet: Set<(boolean | null | number | string)>;

  nestedSet: Set<Set<number>>;

  numberObservableSet: ObservableSet<number>;

  numberSet: Set<number>;

  objectSet: Set<ObjectKeyMap>;

  observableSet: ObservableSet<string>;

  stringSet: Set<string>;

  weakSet: WeakSet<object>;
}

export interface ObjectValue {
  foo: string;

  otherInfo: number;
}

export interface AdvancedClassInstance {
  asyncMethod(): Promise<number>;

  callsOwnMethod(): unknown;

  method(): number;

  otherMethod(): unknown;

  returnsClass(): unknown;

  property: string;
}

export interface ClassInstance {
  property: string;
}

export interface MixedObjectMap {
  mixedFoo: string;
}

export interface MixedObjectMap2 {
  mixedBar: string;
}

export interface ObjectKeyMap {
  key: string;
}

export interface ObjectMap {
  foo: string;
}

export interface MixedObjectSet {
  mixedSFoo: string;
}

export interface MixedObjectSet2 {
  mixedSBar: string;
}
