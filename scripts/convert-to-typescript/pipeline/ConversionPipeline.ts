import { InterfaceBuilder } from '@Convert/building/InterfaceBuilder';
import { CodeGenerator } from '../generation/CodeGenerator';
import { InterfaceMerger } from '../merging/InterfaceMerger';
import { ConversionSession } from '../session/ConversionSession';

/**
 * Runs the ordered conversion stages for a session: Build -> Merge -> Generate.
 */
export class ConversionPipeline {
  private readonly session: ConversionSession;

  constructor(session: ConversionSession) {
    this.session = session;
  }

  public run(): { result: string; processedCount: number; } {
    const processedCount = this.build();

    const merged = new InterfaceMerger().merge(this.session.interfaceRepository.definitions);

    const result = new CodeGenerator(merged, this.session.imports).generate();

    return { result, processedCount };
  }

  /**
   * Drains the interface processing queue, building definitions until no new
   * interfaces are discovered.
   */
  private build(): number {
    const builder = new InterfaceBuilder(this.session);
    const queue = this.session.interfaceRepository.queue;

    // We need to iterate in a loop because new interfaces might be added during processing
    let processedCount = 0;

    while (processedCount < queue.size) {
      const entries = Array.from(queue.entries());

      for (let i = processedCount; i < entries.length; i++) {
        const [name, interfaceToProcess] = entries[i];
        builder.createInterfaceDefinition(name, interfaceToProcess);
      }

      processedCount = entries.length;
    }

    return processedCount;
  }
}
