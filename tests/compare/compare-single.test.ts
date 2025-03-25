import { describe, it } from 'vitest';
import { runComparisonTest } from './shared';
import { interfaceCases } from './test-cases';

describe('Comparator - Single debug', () => {
  it('single', () => {
    runComparisonTest(interfaceCases['interface with complex nested generics']);
  });
});
