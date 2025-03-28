import { describe, it } from 'vitest';
import { runComparisonTest } from './shared';
import { interfaceRenamedCases } from './test-cases';

describe('Comparator - Single debug', () => {
  it('single', () => {
    runComparisonTest(interfaceRenamedCases['interface with indexed access types']);
  });
});
