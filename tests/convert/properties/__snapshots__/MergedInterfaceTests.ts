import { ObservableMap, ObservableSet } from 'mobx';

export interface MergedInterfaceTests {
  arrayTypeMergedInterfaceTests: ArrayTypeMergedInterfaceTests;

  basicMergedInterfaceTests: BasicMergedInterfaceTests;

  classBasedMergedInterfaceTests: ClassBasedMergedInterfaceTests;

  complexMergedInterfaceTests: ComplexMergedInterfaceTests;

  edgeCaseMergedInterfaceTests: EdgeCaseMergedInterfaceTests;

  genericTypeMergedInterfaceTests: GenericTypeMergedInterfaceTests;

  multipleClassArray: MultipleClassArray;
}

export interface ArrayTypeMergedInterfaceTests {
  appInfo: AppInfo[];

  arrayWithArraysOfObjects: ArrayWithArraysOfObjects[];

  arrayWithDifferentItemTypes: ArrayWithDifferentItemTypes[];

  arrayWithDifferentLengths: ArrayWithDifferentLengths[];

  arrayWithNestedArrays: ArrayWithNestedArrays[];
}

export interface BasicMergedInterfaceTests {
  arrayWithDifferentTypes: ArrayWithDifferentTypes[];

  arrayWithExtraProperties: ArrayWithExtraProperties[];

  arrayWithNestedObjects: ArrayWithNestedObjects[];
}

export interface ClassBasedMergedInterfaceTests {
  differentClassInstances: (DifferentClassInstances | DifferentClassInstances2)[];

  mergedClassInstances: MergedClassInstances[];

  objectsWithDifferentMethods: ObjectsWithDifferentMethods[];

  objectsWithSymbolProperties: ObjectsWithSymbolProperties[];
}

export interface ComplexMergedInterfaceTests {
  deeplyNestedArray: DeeplyNestedArray[];

  mapWithMergeableValues: Map<string, MapWithMergeableValues>;

  objectWithArrayProperties: ObjectWithArrayProperties;

  setWithMergeableObjects: Set<SetWithMergeableObjects>;
}

export interface EdgeCaseMergedInterfaceTests {
  circularReferences: CircularReferences[];

  insufficientCommonProperties: (InsufficientCommonProperties | InsufficientCommonProperties2)[];

  minimalCommonProperties: (InsufficientCommonProperties | InsufficientCommonProperties2)[];

  objectsWithFunctions: ObjectsWithFunctions[];

  unionTypeProperties: UnionTypeProperties[];
}

export interface GenericTypeMergedInterfaceTests {
  arrayWithGenericTypes: ArrayWithGenericTypes[];

  arrayWithObservableCollections: ArrayWithObservableCollections[];

  nestedGenericTypes: NestedGenericTypes[];
}

export interface MultipleClassArray {
  multipleData: (MultipleData | MultipleData2)[];
}

export interface AppInfo {
  developers: (Developers | Developers2)[];
}

export interface ArrayWithArraysOfObjects {
  children: Children[];

  createdAt: Date;

  id16: number;

  name: string;

  settings?: Settings;

  status: string;

  type: string;
}

export interface ArrayWithDifferentItemTypes {
  createdAt: Date;

  id13: number;

  name: string;

  status: string;

  tags: (number[] | string[]);

  type: string;
}

export interface ArrayWithDifferentLengths {
  createdAt: Date;

  id14: number;

  name: string;

  status: string;

  type: string;

  values: number[];
}

export interface ArrayWithNestedArrays {
  createdAt: Date;

  id15: number;

  matrix: number[][];

  name: string;

  status: string;

  type: string;

  vector?: number[];
}

export interface ArrayWithDifferentTypes {
  createdAt: Date;

  id2: number;

  name: string;

  status: string;

  value: (boolean | number | string);
}

export interface ArrayWithExtraProperties {
  category: string;

  description?: string;

  id1: number;

  name: string;

  priority: string;

  status: string;
}

export interface ArrayWithNestedObjects {
  createdAt: Date;

  details: (Details | Details2);

  id3: number;

  name: string;

  status: string;
}

export interface DifferentClassInstances {
  createdAt: Date;

  email: string;

  id: number;

  name: string;

  status: string;
}

export interface DifferentClassInstances2 {
  createdAt: Date;

  email: string;

  id: number;

  name: string;

  role: string;

  status: string;
}

export interface MergedClassInstances {
  createdAt: Date;

  idex: number;

  index: number;

  name: string;

  status: string;

  test1?: boolean;

  testDetails: TestDetails;
}

export interface ObjectsWithDifferentMethods {
  calculate(x: unknown, y: unknown): unknown;

  createdAt: Date;

  id17: number;

  name: string;

  status: string;

  type: string;
}

export interface ObjectsWithSymbolProperties {
  createdAt: Date;

  id18: number;

  name: string;

  status: string;

  type: string;
}

export interface DeeplyNestedArray {
  createdAt: Date;

  id4: number;

  metadata: Metadata;

  name: string;

  statistics?: Statistics;

  status: string;

  updatedAt: Date;
}

export interface MapWithMergeableValues {
  createdAt: Date;

  id7: number;

  name: string;

  reason?: string;

  status: string;

  updatedAt: Date;
}

export interface ObjectWithArrayProperties {
  products: Products[];

  users: Users[];
}

export interface SetWithMergeableObjects {
  config?: Config;

  createdAt: Date;

  enabled: boolean;

  id6: number;

  name: string;

  type: string;
}

export interface CircularReferences {
  child?: CircularReferences;

  createdAt: Date;

  id: number;

  name: string;

  parent?: CircularReferences;

  status: string;

  type: string;
}

export interface InsufficientCommonProperties {
  prop1: string;

  prop2: string;

  prop3?: string;

  shared1: boolean;

  shared2: number;

  shared3?: string;
}

export interface InsufficientCommonProperties2 {
  prop1: string;

  prop2?: string;

  prop3: string;

  prop4: string;

  shared1: boolean;

  shared2: number;

  shared3?: string;
}

export interface ObjectsWithFunctions {
  calculate(a: unknown, b: unknown): unknown;

  format?(value: unknown): string;

  id8: number;

  name: string;

  status: string;

  type: string;

  version: string;
}

export interface UnionTypeProperties {
  createdAt: Date;

  id9: number;

  name: string;

  status: string;

  type: string;

  value: (number | string | Value);
}

export interface ArrayWithGenericTypes {
  createdAt: Date;

  id10: number;

  mappings: (Map<string, number> | Map<string, Value>);

  name: string;

  sets?: Set<number>;

  status: string;

  type: string;

  values: (number[] | string[]);
}

export interface ArrayWithObservableCollections {
  createdAt: Date;

  id11: number;

  items: (ObservableSet<number> | ObservableSet<string>);

  mappings?: ObservableMap<string, string>;

  name: string;

  status: string;

  type: string;
}

export interface NestedGenericTypes {
  createdAt: Date;

  data: (Map<string, (Data | Set<string>)> | Map<string, Set<number>>);

  extraData?: Set<Map<string, boolean>>;

  id12: number;

  name: string;

  status: string;

  type: string;
}

export interface MultipleData {
  asyncProcess(): Promise<number>;

  loop(): number[];

  process(): number;

  bAchieved: boolean;

  bHidden: boolean;

  email: string;

  flAchieved: number;

  id: number;

  name: string;

  rtUnlocked: number;

  strDescription: string;
}

export interface MultipleData2 {
  asyncProcess(): Promise<number>;

  loop(): number[];

  process(): number;

  bAchieved: boolean;

  bar: boolean;

  bHidden: boolean;

  email: string;

  flAchieved: number;

  foo: string;

  id: number;

  name: string;
}

export interface Developers {
  name: string;
}

export interface Developers2 {
  creator_clan_account_id: number;

  name: string;
}

export interface Children {
  active?: boolean;

  age: number;

  childId: number;

  name: string;
}

export interface Settings {
  darkMode: boolean;
}

export interface Details {
  names: string;
}

export interface Details2 {
  features: string[];

  names: string;
}

export interface TestDetails {
  m_data?: never;

  name: string;

  other: number;

  test2?: string;
}

export interface Metadata {
  created: Date;

  owner: Owner;
}

export interface Statistics {
  likes: number;

  views: number;
}

export interface Products {
  category: string;

  description: string;

  discount?: number;

  id5: number;

  price: number;

  stock: number;

  title: string;
}

export interface Users {
  createdAt: Date;

  email: string;

  id5: number;

  name: string;

  permissions?: string[];

  role: string;
}

export interface Config {
  timeout: number;
}

export interface Value {
  nested: boolean;
}

export interface Data {
  created: Date;
}

export interface Owner {
  email: string;

  id: number;

  name: string;

  role?: string;
}
