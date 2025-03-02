export interface MixedTypes {
  funcWithParams(a: unknown, b: unknown): unknown;
  simpleFunc(): void;

  booleanProp: boolean;
  nested: Nested;
  nullValue: null;
  numberProp: number;
  stringProp: string;
  undefinedValue: undefined;
}

export interface Nested {
  func(): string;

  prop1: string;
  prop2: number;
}
