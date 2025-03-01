export interface NestedTypes {
  level1: Level1;
  sibling: Sibling;
}

export interface Level1 {
  level2: Level2;
  sibling: Sibling2;
}

export interface Sibling {
  otherProp: string;
}

export interface Level2 {
  level3: Level3;
}

export interface Sibling2 {
  prop: string;
}

export interface Level3 {
  func(): string;

  prop: string;
}
