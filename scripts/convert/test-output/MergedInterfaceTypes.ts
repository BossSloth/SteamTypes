import { ObservableSet } from 'mobx';
import { ObservableMap } from 'mobx';

export interface MergedInterfaceTypes {
  arrayTypeMergedInterfaceTests: ArrayTypeMergedInterfaceTests;
  basicMergedInterfaceTests: BasicMergedInterfaceTests;
  classBasedMergedInterfaceTests: ClassBasedMergedInterfaceTests;
  complexMergedInterfaceTests: ComplexMergedInterfaceTests;
  edgeCaseMergedInterfaceTests: EdgeCaseMergedInterfaceTests;
  genericTypeMergedInterfaceTests: GenericTypeMergedInterfaceTests;
}

export interface ArrayTypeMergedInterfaceTests {
  arrayWithArraysOfObjects: ArrayWithArraysOfObjects[];
  arrayWithDifferentItemTypes: ArrayWithArraysOfObjects[];
  arrayWithDifferentLengths: ArrayWithArraysOfObjects[];
  arrayWithNestedArrays: (ArrayWithArraysOfObjects | ArrayWithNestedArrays2)[];
}

export interface BasicMergedInterfaceTests {
  arrayWithDifferentTypes: ArrayWithDifferentTypes[];
  arrayWithExtraProperties: ArrayWithExtraProperties[];
  arrayWithNestedObjects: ArrayWithDifferentTypes[];
}

export interface ClassBasedMergedInterfaceTests {
  differentClassInstances: (ArrayWithDifferentTypes | DifferentClassInstances2)[];
  mergedClassInstances: MergedClassInstances[];
  objectsWithDifferentMethods: ArrayWithArraysOfObjects[];
  objectsWithSymbolProperties: ArrayWithArraysOfObjects[];
}

export interface ComplexMergedInterfaceTests {
  deeplyNestedArray: DeeplyNestedArray[];
  mapWithMergeableValues: Map<string, (ArrayWithDifferentTypes | DeeplyNestedArray)>;
  objectWithArrayProperties: ObjectWithArrayProperties;
  setWithMergeableObjects: Set<SetWithMergeableObjects>;
}

export interface EdgeCaseMergedInterfaceTests {
  circularReferences: ArrayWithArraysOfObjects[];
  insufficientCommonProperties: (InsufficientCommonProperties | InsufficientCommonProperties2)[];
  minimalCommonProperties: MinimalCommonProperties[];
  objectsWithFunctions: ObjectsWithFunctions[];
  unionTypeProperties: ArrayWithArraysOfObjects[];
}

export interface GenericTypeMergedInterfaceTests {
  arrayWithGenericTypes: ArrayWithGenericTypes[];
  arrayWithObservableCollections: (ArrayWithArraysOfObjects | ArrayWithGenericTypes)[];
  nestedGenericTypes: (ArrayWithArraysOfObjects | NestedGenericTypes2)[];
}

export interface ArrayWithArraysOfObjects {
  calculate(x: unknown, y: unknown): unknown;

  child?: ArrayWithArraysOfObjects;
  children?: Children[];
  createdAt: Date;
  data?: Map<string, Set<number>>;
  id: number;
  items?: ObservableSet<number>;
  matrix?: number[][];
  name: string;
  parent?: ArrayWithArraysOfObjects;
  settings?: Settings;
  status: string;
  tags?: (string[] | number[]);
  type: string;
  value?: (number | string | Value);
  values?: number[];
}

export interface ArrayWithNestedArrays2 {
  createdAt: Date;
  id: number;
  matrix: number[][];
  name: string;
  status: string;
  type: string;
  vector: number[];
}

export interface ArrayWithDifferentTypes {
  createdAt: Date;
  details?: (Details | Details2);
  email?: string;
  id: number;
  name: string;
  status: string;
  updatedAt?: Date;
  value?: (number | string | boolean);
}

export interface ArrayWithExtraProperties {
  category: string;
  description?: string;
  id: number;
  name: string;
  priority: string;
  status: string;
}

export interface DifferentClassInstances2 {
  createdAt: Date;
  email: string;
  id: number;
  name: string;
  permissions?: string[];
  role: string;
  status?: string;
}

export interface MergedClassInstances {
  createdAt: Date;
  details: Details3;
  index: number;
  name: string;
  status: string;
  test1?: boolean;
}

export interface DeeplyNestedArray {
  createdAt: Date;
  id: number;
  metadata?: Metadata;
  name: string;
  reason?: string;
  statistics?: Statistics;
  status: string;
  updatedAt: Date;
}

export interface ObjectWithArrayProperties {
  products: Products[];
  users: DifferentClassInstances2[];
}

export interface SetWithMergeableObjects {
  config?: Config;
  createdAt: Date;
  enabled: boolean;
  id: number;
  name: string;
  type: string;
}

export interface InsufficientCommonProperties {
  prop1: string;
  prop2: string;
  shared1: boolean;
  shared2: number;
}

export interface InsufficientCommonProperties2 {
  prop1: string;
  prop3: string;
  prop4: string;
  shared1: boolean;
  shared2: number;
}

export interface MinimalCommonProperties {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4?: string;
  shared1: boolean;
  shared2: number;
  shared3: string;
}

export interface ObjectsWithFunctions {
  calculate(a: unknown, b: unknown): unknown;
  format(value: unknown): string;

  id: number;
  name: string;
  status: string;
  type: string;
  version: string;
}

export interface ArrayWithGenericTypes {
  createdAt: Date;
  id: number;
  items?: ObservableSet<string>;
  mappings: (Map<string, number> | Map<string, Value> | ObservableMap<string, string>);
  name: string;
  sets?: Set<number>;
  status: string;
  type: string;
  values?: (number[] | string[]);
}

export interface NestedGenericTypes2 {
  createdAt: Date;
  data: Map<string, (Set<string> | Data)>;
  extraData: Set<Map<string, boolean>>;
  id: number;
  name: string;
  status: string;
  type: string;
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
  name: string;
}

export interface Details2 {
  features: string[];
  name: string;
}

export interface Details3 {
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
  id: number;
  price: number;
  stock: number;
  title: string;
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
