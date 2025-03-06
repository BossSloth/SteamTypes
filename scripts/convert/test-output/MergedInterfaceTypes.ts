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

export interface ArrayWithArraysOfObjects {
  calculate(a: unknown, b: unknown): unknown;
  format(value: unknown): string;

  category?: string;
  child?: ArrayWithArraysOfObjects;
  children?: Children[] | Children[];
  config?: Config;
  createdAt?: Date;
  data?: Map<string, Set<number>> | Map<string, (Set<string> | Data)>;
  description?: string;
  details?: Details | Details2 | Details3 | Details3;
  email?: string;
  enabled?: boolean;
  extraData?: Set<Map<string, boolean>>;
  id?: number;
  index?: number;
  items?: ObservableSet<number> | ObservableSet<string>;
  mappings?: Map<string, number> | Map<string, Value> | ObservableMap<string, string>;
  matrix?: number[][];
  metadata?: Metadata | Metadata2;
  name: string;
  parent?: ArrayWithArraysOfObjects;
  permissions?: string[];
  priority?: string;
  reason?: string;
  role?: string;
  sets?: Set<number>;
  settings?: Settings;
  statistics?: Statistics;
  status?: string;
  tags?: string[] | number[];
  test1?: boolean;
  type?: string;
  updatedAt?: Date;
  value?: number | string | boolean | Value;
  values?: number[] | string[];
  vector?: number[];
  version?: string;
}

export interface InsufficientCommonProperties {
  prop1: string;
  prop2?: string;
  prop3?: string;
  prop4?: string;
  shared1: boolean;
  shared2: number;
  shared3?: string;
}

export interface Children {
  active?: boolean;
  age: number;
  childId: number;
  name: string;
}

export interface Details3 {
  m_data: undefined;
  name: string;
  other: number;
  test2?: string;
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

export interface Owner {
  email: string;
  id: number;
  name: string;
  role?: string;
}

export interface ArrayTypeMergedInterfaceTests {
  arrayWithArraysOfObjects: ArrayWithArraysOfObjects[];
  arrayWithDifferentItemTypes: ArrayWithArraysOfObjects[];
  arrayWithDifferentLengths: ArrayWithArraysOfObjects[];
  arrayWithNestedArrays: ArrayWithArraysOfObjects[];
}

export interface BasicMergedInterfaceTests {
  arrayWithDifferentTypes: ArrayWithArraysOfObjects[];
  arrayWithExtraProperties: ArrayWithArraysOfObjects[];
  arrayWithNestedObjects: ArrayWithArraysOfObjects[];
}

export interface ClassBasedMergedInterfaceTests {
  differentClassInstances: ArrayWithArraysOfObjects[];
  mergedClassInstances: ArrayWithArraysOfObjects[];
  objectsWithDifferentMethods: ArrayWithArraysOfObjects[];
  objectsWithSymbolProperties: ArrayWithArraysOfObjects[];
}

export interface ComplexMergedInterfaceTests {
  deeplyNestedArray: ArrayWithArraysOfObjects[];
  mapWithMergeableValues: Map<string, (MapWithMergeableValues | MapWithMergeableValues2)>;
  objectWithArrayProperties: ObjectWithArrayProperties;
  setWithMergeableObjects: Set<(SetWithMergeableObjects | SetWithMergeableObjects2)>;
}

export interface EdgeCaseMergedInterfaceTests {
  circularReferences: ArrayWithArraysOfObjects[];
  insufficientCommonProperties: InsufficientCommonProperties[];
  minimalCommonProperties: InsufficientCommonProperties[];
  objectsWithFunctions: ArrayWithArraysOfObjects[];
  unionTypeProperties: ArrayWithArraysOfObjects[];
}

export interface GenericTypeMergedInterfaceTests {
  arrayWithGenericTypes: ArrayWithArraysOfObjects[];
  arrayWithObservableCollections: ArrayWithArraysOfObjects[];
  nestedGenericTypes: ArrayWithArraysOfObjects[];
}

export interface ObjectWithArrayProperties {
  products: Products[];
  users: ArrayWithArraysOfObjects[];
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

export interface Metadata {
  created: Date;
  owner: Owner;
}

export interface Metadata2 {
  created: Date;
  owner: Owner;
}

export interface Statistics {
  likes: number;
  views: number;
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
