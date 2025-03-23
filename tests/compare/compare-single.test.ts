import { describe, it } from 'vitest';
import { runComparisonTest } from './shared';
import { simpleCases } from './test-cases';

describe('Comparator - Single debug', () => {
  it('single', () => {
    runComparisonTest(simpleCases['simple set type mismatch']);
  });
});
