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

  arrayWithArraysOfObjects: ArrayWithArraysOfObject[];

  arrayWithDifferentItemTypes: ArrayWithDifferentItemType[];

  arrayWithDifferentLengths: ArrayWithDifferentLength[];

  arrayWithNestedArrays: ArrayWithNestedArray[];
}

export interface BasicMergedInterfaceTests {
  arrayWithDifferentTypes: ArrayWithDifferentType[];

  arrayWithExtraProperties: ArrayWithExtraProperty[];

  arrayWithNestedObjects: ArrayWithNestedObject[];
}

export interface ClassBasedMergedInterfaceTests {
  differentClassInstances: (DifferentClassInstance | DifferentClassInstance2)[];

  mergedClassInstances: (MergedClassInstance | MergedClassInstance2)[];

  objectsWithDifferentMethods: ObjectsWithDifferentMethod[];

  objectsWithSymbolProperties: ObjectsWithSymbolProperty[];
}

export interface ComplexMergedInterfaceTests {
  deeplyNestedArray: DeeplyNestedArray[];

  mapWithMergeableValues: Map<string, MapWithMergeableValue>;

  objectWithArrayProperties: ObjectWithArrayProperties;

  setWithMergeableObjects: Set<SetWithMergeableObject>;
}

export interface EdgeCaseMergedInterfaceTests {
  circularReferences: CircularReference[];

  insufficientCommonProperties: (InsufficientCommonProperty | InsufficientCommonProperty2)[];

  minimalCommonProperties: (InsufficientCommonProperty | InsufficientCommonProperty2)[];

  objectsWithFunctions: ObjectsWithFunction[];

  unionTypeProperties: UnionTypeProperty[];
}

export interface GenericTypeMergedInterfaceTests {
  arrayWithGenericTypes: ArrayWithGenericType[];

  arrayWithObservableCollections: ArrayWithObservableCollection[];

  nestedGenericTypes: NestedGenericType[];
}

export interface MultipleClassArray {
  multipleData: (MultipleData | MultipleData2)[];
}

export interface AppInfo {
  developers: (Developer | Developer2)[];
}

export interface ArrayWithArraysOfObject {
  children: Children[];

  createdAt: Date;

  id16: number;

  name: string;

  settings?: Settings;

  status: string;

  type: string;
}

export interface ArrayWithDifferentItemType {
  createdAt: Date;

  id13: number;

  name: string;

  status: string;

  tags: (number[] | string[]);

  type: string;
}

export interface ArrayWithDifferentLength {
  createdAt: Date;

  id14: number;

  name: string;

  status: string;

  type: string;

  values: number[];
}

export interface ArrayWithNestedArray {
  createdAt: Date;

  id15: number;

  matrix: number[][];

  name: string;

  status: string;

  type: string;

  vector?: number[];
}

export interface ArrayWithDifferentType {
  createdAt: Date;

  id2: number;

  name: string;

  status: string;

  value: (boolean | number | string);
}

export interface ArrayWithExtraProperty {
  category: string;

  description?: string;

  id1: number;

  name: string;

  priority: string;

  status: string;
}

export interface ArrayWithNestedObject {
  createdAt: Date;

  details: (Details | Details2);

  id3: number;

  name: string;

  status: string;
}

export interface DifferentClassInstance {
  createdAt: Date;

  email: string;

  id: number;

  name: string;

  status: string;
}

export interface DifferentClassInstance2 {
  createdAt: Date;

  email: string;

  id: number;

  name: string;

  role: string;

  status: string;
}

export interface MergedClassInstance {
  createdAt: Date;

  idex: number;

  index: number;

  name: string;

  status: string;

  test1?: boolean;

  testDetails: TestDetails;
}

export interface MergedClassInstance2 extends MergedClassInstance {
  complexData: ComplexData;
}

export interface ObjectsWithDifferentMethod {
  calculate(x: unknown, y: unknown): unknown;

  createdAt: Date;

  id17: number;

  name: string;

  status: string;

  type: string;
}

export interface ObjectsWithSymbolProperty {
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

export interface MapWithMergeableValue {
  createdAt: Date;

  id7: number;

  name: string;

  reason?: string;

  status: string;

  updatedAt: Date;
}

export interface ObjectWithArrayProperties {
  products: Product[];

  users: User[];
}

export interface SetWithMergeableObject {
  config?: Config;

  createdAt: Date;

  enabled: boolean;

  id6: number;

  name: string;

  type: string;
}

export interface CircularReference {
  child?: CircularReference;

  createdAt: Date;

  id: number;

  name: string;

  parent?: CircularReference;

  status: string;

  type: string;
}

export interface InsufficientCommonProperty {
  prop1: string;

  prop2: string;

  prop3?: string;

  shared1: boolean;

  shared2: number;

  shared3?: string;
}

export interface InsufficientCommonProperty2 {
  prop1: string;

  prop2?: string;

  prop3: string;

  prop4: string;

  shared1: boolean;

  shared2: number;

  shared3?: string;
}

export interface ObjectsWithFunction {
  calculate(a: unknown, b: unknown): unknown;

  format?(value: unknown): string;

  id8: number;

  name: string;

  status: string;

  type: string;

  version: string;
}

export interface UnionTypeProperty {
  createdAt: Date;

  id9: number;

  name: string;

  status: string;

  type: string;

  value: (number | string | Value);
}

export interface ArrayWithGenericType {
  createdAt: Date;

  id10: number;

  mappings: (Map<string, number> | Map<string, Value>);

  name: string;

  sets?: Set<number>;

  status: string;

  type: string;

  values: (number[] | string[]);
}

export interface ArrayWithObservableCollection {
  createdAt: Date;

  id11: number;

  items: (ObservableSet<number> | ObservableSet<string>);

  mappings?: ObservableMap<string, string>;

  name: string;

  status: string;

  type: string;
}

export interface NestedGenericType {
  createdAt: Date;

  data: (Map<string, (Data | Set<string>)> | Map<string, Set<number>>);

  extraData?: Set<Map<string, boolean>>;

  id12: number;

  name: string;

  status: string;

  type: string;
}

export interface MultipleDataBase {
  asyncProcess(): Promise<number>;

  loop(): number[];

  process(): number;

  bAchieved: boolean;

  bHidden: boolean;

  email: string;

  flAchieved: number;

  id: number;

  name: string;
}

export interface MultipleData extends MultipleDataBase {
  rtUnlocked: number;

  strDescription: string;
}

export interface MultipleData2 extends MultipleDataBase {
  bar: boolean;

  foo: string;
}

export interface Developer {
  name: string;
}

export interface Developer2 {
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

export interface ComplexData {
  name: string;

  value: number;
}

export interface Metadata {
  created: Date;

  owner: Owner;
}

export interface Statistics {
  likes: number;

  views: number;
}

export interface Product {
  category: string;

  description: string;

  discount?: number;

  id5: number;

  price: number;

  stock: number;

  title: string;
}

export interface User {
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
