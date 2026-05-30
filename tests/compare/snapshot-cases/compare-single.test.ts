import { describe, it } from 'vitest';
import { runComparisonTest, setImportCasesOnly } from './shared';

setImportCasesOnly();
// Debug helper: paste a single case below and run ONLY this file to debug the comparator.
const { genericsCases } = await import('./types/generics.test');

describe('Comparator - Single debug', () => {
  it('single', () => {
    runComparisonTest(genericsCases['generic interface type in map']);
  });
});
