import { describe, it } from 'vitest';
import { runComparisonTest } from './shared';
import { mergedInterfaceCases } from './test-cases';

describe('Comparator - Single debug', () => {
  it('single', () => {
    runComparisonTest(mergedInterfaceCases['basic merge']);
  });
});
