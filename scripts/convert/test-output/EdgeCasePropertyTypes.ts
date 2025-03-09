export interface EdgeCasePropertyTypes {
  circularReferenceTests: CircularReferenceTests;
  mixedComplexEdgeCases: MixedComplexEdgeCases;
  propertyNameEdgeCases: PropertyNameEdgeCases;
  prototypeInheritanceTests: PrototypeInheritanceTests;
  specialValueTests: SpecialValueTests;
}

export interface CircularReferenceTests {
  circularArray: (number | unknown/* circular reference to circularArray */)[];
  nestedCircularArray: (NestedCircularArray | number)[];
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
  emojiPropertyNamesObject: EmojiPropertyNamesObject;
  m_startWithUnderscore: m_startWithUnderscore;
  numericPropertyNames: NumericPropertyNames;
  numericPropertyNamesObject: NumericPropertyNamesObject;
  reservedKeywords: ReservedKeywords;
  reservedKeywordsObject: ReservedKeywordsObject;
  specialCharacterPropertyNames: SpecialCharacterPropertyNames;
  specialCharacterPropertyNamesObject: SpecialCharacterPropertyNamesObject;
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
  '🌙': string;
  '🌟': string;
  '🚀': string;
}

export interface EmojiPropertyNamesObject {
  '👍': InvalidName;
  '🙂': InvalidName2;
  '🚀': InvalidName3;
}

export interface m_startWithUnderscore {
  a: number;
}

export interface NumericPropertyNames {
  '0': string;
  '1': string;
  '2': string;
}

export interface NumericPropertyNamesObject {
  '3': InvalidName4;
  '4': InvalidName5;
  '5': InvalidName6;
  '6543': InvalidName7;
  Other3: Other3;
}

export interface ReservedKeywords {
  class: string;
  foo: string;
  function: string;
  if: string;
  other: number;
  return: string;
  var: string;
}

export interface ReservedKeywordsObject {
  class: Class;
  function: Function;
  if: If;
  return: Return;
  var: Var;
}

export interface SpecialCharacterPropertyNames {
  '#hashtag': string;
  '%percent': string;
  '*asterisk': string;
  '@special': string;
  '^caret': string;
  'space between': string;
}

export interface SpecialCharacterPropertyNamesObject {
  '#hashtag': hashtag;
  '#multiple_ #_': multiple__;
  '%percent': percent;
  '*asterisk': asterisk;
  '@special': special;
  '^caret': caret;
  'dashed-property': Dashedproperty;
  'space between': Spacebetween;
  under_score: Under_score;
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

export interface InvalidName {
  emoji2: string;
  name: string;
}

export interface InvalidName2 {
  emoji1: string;
  name: string;
}

export interface InvalidName3 {
  emoji3: string;
  name: string;
}

export interface InvalidName4 {
  index0: number;
  value: string;
}

export interface InvalidName5 {
  index1: number;
  value: string;
}

export interface InvalidName6 {
  index2: number;
  value: string;
}

export interface InvalidName7 {
  index3: number;
  value: string;
}

export interface Other3 {
  index4: number;
  value: string;
}

export interface Class {
  id1: number;
  value: string;
}

export interface Function {
  id2: number;
  value: string;
}

export interface If {
  id3: number;
  value: string;
}

export interface Return {
  id4: number;
  value: string;
}

export interface Var {
  id5: number;
  value: string;
}

export interface hashtag {
  type2: string;
  value: string;
}

export interface multiple__ {
  type9: string;
  value: string;
}

export interface percent {
  type3: string;
  value: string;
}

export interface asterisk {
  type5: string;
  value: string;
}

export interface special {
  type1: string;
  value: string;
}

export interface caret {
  type4: string;
  value: string;
}

export interface Dashedproperty {
  type7: string;
  value: string;
}

export interface Spacebetween {
  type6: string;
  value: string;
}

export interface Under_score {
  type8: string;
  value: string;
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
