import { Project } from 'ts-morph';
import { CircularRefTracker } from './CircularRefTracker';
import { FunctionRegistry } from './FunctionRegistry';
import { ImportRegistry } from './ImportRegistry';
import { InterfaceRepository } from './InterfaceRepository';
import { NameAllocator } from './NameAllocator';

/**
 * Aggregates all the per-conversion state and collaborators. A fresh session is
 * created for every `convertToTypescript` call, giving full isolation between
 * conversions without any shared mutable globals.
 */
export class ConversionSession {
  public readonly imports = new ImportRegistry();
  public readonly interfaceRepository = new InterfaceRepository();
  public readonly names = new NameAllocator();
  public readonly circular = new CircularRefTracker();
  public readonly functions = new FunctionRegistry();

  public readonly ignoredProperties: Set<string>;
  public readonly project: Project;

  constructor(ignoredProperties: string[], project: Project) {
    this.ignoredProperties = new Set(ignoredProperties);
    this.project = project;
  }
}
