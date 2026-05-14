export interface NativeMethodTests {
  host: Host;

  secondHost: Host;
}

export interface Host {
  greet(name: unknown): string;

  /**
   * @native
   */
  m_fnBound?(): unknown;

  /**
   * @native
   */
  notOnClass(): unknown;
}
