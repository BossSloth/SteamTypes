export interface GetterThrowsTests {
  numericContainer: NumericContainer;
}

export interface NumericContainer {
  123: InvalidName;
}

export interface InvalidName {
  real: number;

  /**
   * @todo property failed to be extracted, please type this
   */
  unstable: unknown;
}
