export interface EdgeCases {
  complexFunc(): number;

  circularReference: CircularReference;
  emptyArray: unknown[];
  emptyObject: EmptyObject;
  nestedEmpty: NestedEmpty;
  'property with spaces': string;
  'property-with-dash': string;
  'property.with.dots': string;
}

export interface EmptyObject {
}

export interface NestedEmpty {
  emptyArr: unknown[];
  emptyObj: EmptyObj;
}

export interface CircularReference {
  self: CircularReference;
}

export interface EmptyObj {
}
