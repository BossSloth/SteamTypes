import { InterfaceToProcess, TypeScriptInterface } from '../types';

/**
 * Holds the interfaces discovered during a conversion: the queue of objects still
 * to be turned into interface definitions, the finished definitions, and the
 * monotonic order counter used to preserve discovery order in the output.
 */
export class InterfaceRepository {
  /**
   * Key: interface name, Value: object interface is based on
   */
  public readonly queue = new Map<string, InterfaceToProcess>();
  /**
   * Key: interface name, Value: interface definition
   */
  public readonly definitions = new Map<string, TypeScriptInterface>();

  private orderCounter = 0;

  public nextOrder(): number {
    return this.orderCounter++;
  }
}
