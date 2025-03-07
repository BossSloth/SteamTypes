export interface EdgeCasePropertyTypes {
  circularReferenceTests: CircularReferenceTests;
  mixedComplexEdgeCases: MixedComplexEdgeCases;
  propertyNameEdgeCases: PropertyNameEdgeCases;
  prototypeInheritanceTests: PrototypeInheritanceTests;
  specialValueTests: SpecialValueTests;
}

export interface CircularReferenceTests {
  circularArray: (number | unknown/* circular reference to circularArray */)[];
  nestedCircularArray: (number | NestedCircularArray)[];
  nestedCircularReference: NestedCircularReference;
  simpleCircularReference: SimpleCircularReference;
}

export interface MixedComplexEdgeCases {
  complexMixedObject: ComplexMixedObject;
  deeplyNestedMixedObject: DeeplyNestedMixedObject;
  objectWithUndefined: ObjectWithUndefined;
}

export interface PropertyNameEdgeCases {
  emojiPropertyNames: EmojiPropertyNames;
  m_startWithUnderscore: m_startWithUnderscore;
  numericPropertyNames: NumericPropertyNames;
  reservedKeywords: ReservedKeywords;
  specialCharacterPropertyNames: SpecialCharacterPropertyNames;
}

export interface PrototypeInheritanceTests {
  multiLevelInheritance: MultiLevelInheritance;
  simpleInheritance: SimpleInheritance;
}

export interface SpecialValueTests {
  emptyString: string;
  epsilonNumber: number;
  maxNumber: number;
  minNumber: number;
  objectWithOnlyToString: (object | unknown);
  objectWithOnlyValueOf: (object | unknown);
  objectWithToStringAndOther: ObjectWithToStringAndOther;
  whitespaceString: string;
}

export interface NestedCircularArray {
  nestedArray: unknown/* circular reference to nestedCircularArray */;
}

export interface NestedCircularReference {
  level5: Level5;
}

export interface SimpleCircularReference {
  name: string;
  self: SimpleCircularReference;
}

export interface ComplexMixedObject {
  calculate(x: unknown): number;
  process(): unknown;

  active: boolean;
  id: number;
  metadata: Metadata;
  name: string;
  tags: string[];
}

export interface DeeplyNestedMixedObject {
  level1: Level1;
}

export interface ObjectWithUndefined {
  a: number;
  b: undefined;
  c: number;
}

export interface EmojiPropertyNames {
  '👍': string;
  '🙂': string;
  '🚀': string;
}

export interface m_startWithUnderscore {
  a: number;
}

export interface NumericPropertyNames {
  '0': string;
  '1': string;
  '2': string;
}

export interface ReservedKeywords {
  class: string;
  function: string;
  if: string;
  return: string;
  var: string;
}

export interface SpecialCharacterPropertyNames {
  '#hashtag': string;
  '%percent': string;
  '*asterisk': string;
  '@special': string;
  '^caret': string;
}

export interface MultiLevelInheritance {
  baseMethod(): string;
  leafMethod(): string;
  middleMethod(): string;
}

export interface SimpleInheritance {
  inheritedMethod(): string;

  ownProperty: string;
}

export interface ObjectWithToStringAndOther {
  fooOther: string;
}

export interface Level5 {
  level6: Level6;
}

export interface Metadata {
  created: Date;
  version: string;
}

export interface Level1 {
  array: number[];
  level2: Level2;
  primitive: string;
}

export interface Level6 {
  level7: Level7;
}

export interface Level2 {
  date: Date;
  level3: Level3;
  regex: RegExp;
}

export interface Level7 {
  back: NestedCircularReference;
}

export interface Level3 {
  function(): string;

  map: Map<string, string>;
  set: Set<number>;
}
