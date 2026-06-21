/**
 * Tracks objects already being processed so circular references resolve to the
 * interface name they were first registered under.
 */
export class CircularRefTracker {
  private readonly paths = new Map<unknown, string>();

  public register(value: unknown, interfaceName: string): void {
    this.paths.set(value, interfaceName);
  }

  public get(value: unknown): string | undefined {
    return this.paths.get(value);
  }
}
