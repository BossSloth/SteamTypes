import { describe, it } from 'vitest';
import { runComparisonTest } from './shared';
import { genericsCases } from './test-cases';

describe('Comparator - Single debug', () => {
  it('single', () => {
    runComparisonTest(genericsCases['generic interface type in map']);
  });
});
