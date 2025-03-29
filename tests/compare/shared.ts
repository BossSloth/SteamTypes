import dedent from 'dedent';
import { Project, SourceFile } from 'ts-morph';
import { describe, expect, it } from 'vitest';
import { compareAndCorrectAllInterfaces } from '../../scripts/compare/interface-comparator';
import { ComparatorTest } from './test-cases';

const project = new Project({
  compilerOptions: {
    lib: ['ES2015'],
    declaration: true,
    emitDeclarationOnly: true,
  },
  useInMemoryFileSystem: true,
});

export function createTest(name: string, testCases: Record<string, ComparatorTest>): void {
  describe(`Comparator ${name}`, () => {
    Object.entries(testCases).forEach(([testName, testValues]) => {
      it(testName, () => {
        runComparisonTest(testValues);
      });
    });
  });
}

export function runComparisonTest(testValues: ComparatorTest): void {
  const { targetFile, sourceFile } = createTestFiles(testValues.target, testValues.source);

  const diff = runComparison(targetFile, sourceFile, testValues.interfaceName);

  if (testValues.expectsNoDiff ?? false) {
    expect(diff).toBeNull();
  } else {
    assertDiff(diff);
  }
}

/**
 * Creates source files with the given content for testing
 * @param targetContent Content for the target file
 * @param sourceContent Content for the source file
 * @returns Object containing the created source files
 */
function createTestFiles(targetContent: string, sourceContent: string): { targetFile: SourceFile; sourceFile: SourceFile; } {
  targetContent = `${targetContent}\n`;
  sourceContent = `${sourceContent}\n`;

  const targetFile = project.createSourceFile('target.ts', targetContent, { overwrite: true });
  const sourceFile = project.createSourceFile('source.ts', sourceContent, { overwrite: true });

  return { targetFile, sourceFile };
}

/**
 * Runs the interface comparison and returns the diff
 * @param targetFile Target source file
 * @param sourceFile Source source file
 * @param interfaceName Name of the interface to compare
 * @returns The diff result
 */
function runComparison(targetFile: SourceFile, sourceFile: SourceFile, interfaceName: string): string | null {
  return compareAndCorrectAllInterfaces(targetFile, sourceFile, interfaceName, 'target.ts');
}

/**
 * Asserts that the diff contains the expected changes
 * @param diff The diff result
 */
function assertDiff(diff: string | null): void {
  expect(diff, 'Diff should not be null').not.toBeNull();

  if (diff !== null) {
    expect(dedent(diff)).toMatchSnapshot();
  }
}
