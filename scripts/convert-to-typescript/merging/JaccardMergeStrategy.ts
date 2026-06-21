import { TypeScriptInterface } from '../types';
import { MergeState, mergeInterfaceGroup, shouldMergeInterfaces } from './merge-helpers';

/**
 * Merges interfaces whose property sets overlap beyond the required Jaccard
 * similarity threshold. Skips interfaces already handled by inheritance merging.
 */
export class JaccardMergeStrategy {
  private readonly state: MergeState;

  constructor(state: MergeState) {
    this.state = state;
  }

  public apply(): void {
    const { source, merged, processedInheritance, aliasMap } = this.state;
    const groups = findInterfaceGroups(source);

    for (const group of groups) {
      const filteredGroup = group.filter(name => !processedInheritance.has(name));
      if (filteredGroup.length === 0) continue;

      if (filteredGroup.length === 1) {
        const name = filteredGroup[0];
        const interfaceObj = source.get(name);
        /* v8 ignore next -- @preserve */
        if (!interfaceObj) {
          throw new Error(`Interface ${name} not found`);
        }
        merged.set(name, { ...interfaceObj });
      } else {
        const mergedInterface = mergeInterfaceGroup(source, filteredGroup);
        merged.set(mergedInterface.name, mergedInterface);

        for (let i = 1; i < filteredGroup.length; i++) {
          aliasMap.set(filteredGroup[i], mergedInterface.name);
        }
      }
    }
  }
}

/**
 * Finds groups of interfaces that should be merged
 */
function findInterfaceGroups(interfaces: Map<string, TypeScriptInterface>): string[][] {
  const interfaceArray = Array.from(interfaces.entries());
  const groups: string[][] = [];
  const processedInterfaces = new Set<string>();

  // First pass: find groups of interfaces to merge
  for (let i = 0; i < interfaceArray.length; i++) {
    const [name1, interface1] = interfaceArray[i];

    // Skip if already processed
    if (processedInterfaces.has(name1)) continue;

    const group: string[] = [name1];

    for (let j = 0; j < interfaceArray.length; j++) {
      if (i === j) continue; // Skip self

      const [name2, interface2] = interfaceArray[j];

      // Skip if already processed
      if (processedInterfaces.has(name2)) continue;

      // Check if interfaces should be merged
      if (shouldMergeInterfaces(interface1, interface2)) {
        group.push(name2);
      }
    }

    // Only add groups with more than one interface
    if (group.length > 1) {
      groups.push(group);
      // Mark all interfaces in this group as processed
      for (const name of group) {
        processedInterfaces.add(name);
      }
    }
  }

  // Second pass: add remaining interfaces as individual groups
  for (const [name] of interfaceArray) {
    if (!processedInterfaces.has(name)) {
      groups.push([name]);
    }
  }

  return groups;
}
