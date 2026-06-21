/**
 * Collects the functions discovered per interface so their signatures can be
 * extracted in one batched ts-morph pass.
 */
export class FunctionRegistry {
  /**
   * Key: interface name, Value: Map of function name to function
   */
  private readonly functions = new Map<string, Map<string, Function>>();

  public add(interfaceName: string, functionName: string, func: Function): void {
    if (!this.functions.has(interfaceName)) {
      this.functions.set(interfaceName, new Map());
    }
    this.functions.get(interfaceName)?.set(functionName, func);
  }

  public get(interfaceName: string): Map<string, Function> | undefined {
    return this.functions.get(interfaceName);
  }
}
