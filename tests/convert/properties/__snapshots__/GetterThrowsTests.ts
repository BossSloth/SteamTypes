export interface GetterThrowsTests {
  numericContainer: NumericContainer;
}

export interface NumericContainer {
  123: InvalidName;
}

export interface InvalidName {
  real: number;

  unstable: unknown;
}
