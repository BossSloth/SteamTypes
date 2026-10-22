import { InterfaceDeclaration, SourceFile } from 'ts-morph';

export interface InterfacePair {
  targetInterface: InterfaceDeclaration;
  sourceInterface: InterfaceDeclaration;
}

/**
 * Per-call comparison state: the FIFO queue of pending pairs and the keys of processed target interfaces.
 * Created once per compareAndCorrectAllInterfaces call. Mutates only its own queue and processed set.
 */
export class ComparisonSession {
  public readonly targetFile: SourceFile;
  /** Target interfaces at session start; the only similarity candidates (forgotten ones are skipped by the matcher). */
  public readonly startingInterfaces: readonly InterfaceDeclaration[];
  private readonly queue: InterfacePair[] = [];
  private readonly processed = new Set<string>();

  public constructor(targetFile: SourceFile) {
    this.targetFile = targetFile;
    this.startingInterfaces = targetFile.getInterfaces();
  }

  public enqueue(targetInterface: InterfaceDeclaration, sourceInterface: InterfaceDeclaration): void {
    this.queue.push({ targetInterface, sourceInterface });
  }

  /**
   * Skips pairs where either side was forgotten, and skips and discards pairs whose target key
   * (computed at dequeue time) was already processed. The returned pair is marked processed.
   */
  public dequeue(): InterfacePair | undefined {
    for (let pair = this.queue.shift(); pair !== undefined; pair = this.queue.shift()) {
      // Check if interface still exists
      if (pair.targetInterface.wasForgotten() || pair.sourceInterface.wasForgotten()) {
        continue;
      }

      const interfaceId = `${pair.targetInterface.getSourceFile().getFilePath()}:${pair.targetInterface.getName()}`;

      // Skip if already processed
      if (this.processed.has(interfaceId)) {
        continue;
      }

      this.processed.add(interfaceId);

      return pair;
    }

    return undefined;
  }
}
