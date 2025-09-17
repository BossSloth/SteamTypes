import { ComputedValue } from 'mobx/dist/internal';
import { Root as ReactRoot } from 'react-dom/client';

export interface EdgeCasePropertyTests {
  arrayTypeOptimizationTests: ArrayTypeOptimizationTests;

  boundClassTest: BoundClassTest;

  circularReferenceTests: CircularReferenceTests;

  interfaceWithEnumTest: InterfaceWithEnumTest;

  mixedComplexEdgeCases: MixedComplexEdgeCases;

  propertyNameEdgeCases: PropertyNameEdgeCases;

  prototypeInheritanceTests: PrototypeInheritanceTests;

  specialValueTests: SpecialValueTests;
}

export interface ArrayTypeOptimizationTests {
  mergeableArrays: (number | string)[][];

  nestedArrays: ((boolean | NestedArrays2)[] | (NestedArrays | NestedArrays2)[] | (number | string)[])[];

  unmergableArrays: (number[] | string[])[];
}

export interface BoundClassTest {
  boundClass: BoundClass;
}

export interface CircularReferenceTests {
  nestedCircularReference: NestedCircularReference;

  simpleCircularReference: SimpleCircularReference;
}

export interface InterfaceWithEnumTest {
  dataObjects: DataObjects[];
}

export interface MixedComplexEdgeCases {
  complexMixedObject: ComplexMixedObject;

  deeplyNestedMixedObject: DeeplyNestedMixedObject;

  objectWithUndefined: ObjectWithUndefined;
}

export interface PropertyNameEdgeCases {
  emojiPropertyNames: EmojiPropertyNames;

  emojiPropertyNamesObject: EmojiPropertyNamesObject;

  m_startWithUnderscore: StartWithUnderscore;

  numericPropertyNames: NumericPropertyNames;

  numericPropertyNamesObject: NumericPropertyNamesObject;

  reservedKeywords: ReservedKeywords;

  reservedKeywordsObject: ReservedKeywords;

  specialCharacterPropertyNames: SpecialCharacterPropertyNames;

  specialCharacterPropertyNamesObject: SpecialCharacterPropertyNames;
}

export interface PrototypeInheritanceTests {
  multiLevelInheritance: MultiLevelInheritance;

  simpleInheritance: SimpleInheritance;
}

export interface SpecialValueTests {
  computedValue: ComputedValue<number>;

  emptyString: string;

  epsilonNumber: number;

  htmlElement: HtmlElement;

  maxNumber: number;

  minNumber: number;

  mutationObserver: MutationObserver;

  objectWithOnlyToString: object;

  objectWithOnlyValueOf: object;

  objectWithToStringAndOther: ObjectWithToStringAndOther;

  reactRoot: ReactRoot;

  styleSheet: CSSStyleSheet;

  whitespaceString: string;

  windowObject: WindowObject;
}

export interface NestedArrays {
  b: number;
}

export interface NestedArrays2 {
  c: number;
}

export interface BoundClass {
  asyncFunction(a: unknown, b: unknown): Promise<string>;

  foo(): string;

  method(): string;

  withParams(a: unknown, b: unknown): string;

  property: number;
}

export interface NestedCircularReference {
  level5: Level5;
}

export interface SimpleCircularReference {
  name: string;

  self: SimpleCircularReference;
}

export interface DataObjects {
  /**
   * This value is an enum
   * @currentValue 1
   * @currentValue 2
   */
  eType: number;

  extra?: boolean;

  name: string;

  permissions: string[];

  role: string;

  status: string;

  type: string;
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

export interface StartWithUnderscore {
  a: number;
}

export interface NumericPropertyNames {
  '0Other': string;

  1: string;

  '2Other': string;
}

export interface NumericPropertyNamesObject {
  3: InvalidName4;

  4: InvalidName5;

  '5Other': Other;

  '6543Other': Other2;

  Other3: Other3;
}

export interface ReservedKeywords {
  class: (Class | string);

  foo?: string;

  function: (Function | string);

  if: (If | string);

  other?: number;

  return: (Return | string);

  var: (string | Var);
}

export interface SpecialCharacterPropertyNames {
  '#hashtag': (hashtag | string);

  '#multiple_ #_'?: multiple__;

  '%percent': (percent | string);

  '*asterisk': (asterisk | string);

  '@special': (special | string);

  '^caret': (caret | string);

  'dashed-property'?: Dashedproperty;

  'space between': (Spacebetween | string);

  under_score?: Under_score;
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

export interface HtmlElement {
  m_element: HTMLDivElement;
}

export interface ObjectWithToStringAndOther {
  fooOther: string;
}

export interface WindowObject {
  fooValue: string;

  m_popup: Window;
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

export interface Other {
  index2: number;

  value: string;
}

export interface Other2 {
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
