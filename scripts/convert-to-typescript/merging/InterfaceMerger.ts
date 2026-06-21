import { TypeScriptInterface } from '../types';
import { InheritanceMergeStrategy } from './InheritanceMergeStrategy';
import { JaccardMergeStrategy } from './JaccardMergeStrategy';
import { fixInterfaceNumbering, MergeState, updateTypeReferences } from './merge-helpers';

/**
 * Coordinates the merge strategies: first collapse inheritance hierarchies, then
 * merge similar interfaces by Jaccard similarity, then normalise type references
 * and numbering.
 */
export class InterfaceMerger {
  // Ordered strategies: inheritance hierarchies first, then Jaccard similarity.
  private readonly strategies = [InheritanceMergeStrategy, JaccardMergeStrategy];

  public merge(interfaces: Map<string, TypeScriptInterface>): Map<string, TypeScriptInterface> {
    const state: MergeState = {
      source: interfaces,
      merged: new Map<string, TypeScriptInterface>(),
      processedInheritance: new Set<string>(),
      aliasMap: new Map<string, string>(),
    };

    for (const Strategy of this.strategies) {
      new Strategy(state).apply();
    }

    // Update all type references based on the alias map
    updateTypeReferences(state.merged, state.aliasMap);

    // Fix numbering for interfaces with similar names
    const renameAliasMap = fixInterfaceNumbering(state.merged);

    // Update all references again
    updateTypeReferences(state.merged, renameAliasMap);

    return state.merged;
  }
}
