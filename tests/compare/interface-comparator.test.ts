import { describe, it, vi } from 'vitest';
import { setLogger } from '../../scripts/compare/shared';
import { Logger } from '../../scripts/logger';
import { assertDiff, createTestFiles, runComparison } from './shared';
import { ComparatorTest, simpleCases } from './test-cases';

// Mock chalk to prevent colorization in tests for consistent comparisons
vi.mock('chalk', () => ({
  default: {
    red: (text: string) => text,
    green: (text: string) => text,
    cyan: (text: string) => text,
    gray: (text: string) => text,
  },
}));

describe('Interface Comparator', () => {
  setLogger(new Logger());

  function runComparisonTest(testValues: ComparatorTest) {
    const { targetFile, sourceFile } = createTestFiles(testValues.target, testValues.source);

    const diff = runComparison(targetFile, sourceFile, testValues.interfaceName);

    assertDiff(diff);
  }

  Object.entries(simpleCases).forEach(([name, testValues]) => {
    it(name, () => {
      runComparisonTest(testValues);
    });
  });

  it('single', () => {
    runComparisonTest(simpleCases['simple set type mismatch']);
  });
});
