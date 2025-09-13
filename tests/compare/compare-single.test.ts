import { describe, it } from 'vitest';
import { runComparisonTest } from './shared';
import { genericsCases, mergedInterfaceCases } from './test-cases';

describe('Comparator - Single debug', () => {
  it('single', () => {
    runComparisonTest(genericsCases['MappedObservable']);
  });
});
