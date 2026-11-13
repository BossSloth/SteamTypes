export interface GetterThrowsTests {
  numericContainer: Record<number, NumericContainer>;
}

export interface NumericContainer {
  real: number;

  /**
   * @todo property failed to be extracted, please type this
   */
  unstable: unknown;
}
