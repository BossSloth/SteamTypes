import dedent from 'dedent';
import stripAnsi from 'strip-ansi';
import { Project, SourceFile } from 'ts-morph';
import { describe, expect, it } from 'vitest';
import { compareAndCorrectAllInterfaces } from '../../../scripts/compare/interface-comparator';

export interface ComparatorTest {
  /** whether the diff is expected to be null */
  expectsNoDiff?: boolean;
  /** name of the interface to edit */
  interfaceName: string;
  /** source of truth */
  source: string;
  /** target to edit */
  target: string;
}

const project = new Project({
  compilerOptions: {
    lib: ['ES2015'],
    declaration: true,
    emitDeclarationOnly: true,
  },
  useInMemoryFileSystem: true,
});

let importCasesOnly = false;

/**
 * Call before dynamically importing a `*.test.ts` case file to grab its exported cases
 * without registering/running its `createTest`/`createRenamedTest` suites.
 */
export function setImportCasesOnly(value = true): void {
  importCasesOnly = value;
}

export function createTest(name: string, testCases: Record<string, ComparatorTest>): void {
  if (importCasesOnly) {
    return;
  }

  describe(`Comparator ${name}`, () => {
    Object.entries(testCases).forEach(([testName, testValues]) => {
      it(testName, () => {
        runComparisonTest(testValues);
      });
    });
  });
}

/**
 * Renames every non-root interface declaration in a test case's target by appending a suffix.
 * The root interface (the one being compared) keeps its name so the comparator can find it.
 * Returns null when there are no nested interfaces to rename (nothing meaningful to test).
 */
function renameNestedInterfaces(testCase: ComparatorTest, suffix = 'Renamed'): ComparatorTest | null {
  const file = project.createSourceFile('rename.ts', testCase.target, { overwrite: true });

  const nested = file.getInterfaces().filter(iface => iface.getName() !== testCase.interfaceName);

  if (nested.length === 0) {
    return null;
  }

  nested.forEach((iface) => {
    iface.rename(`${iface.getName()}${suffix}`);
  });

  return {
    ...testCase,
    target: file.getFullText().trimEnd(),
  };
}

/**
 * Generates renamed variants of base cases (renaming their nested interfaces) and runs them.
 * Cases without nested interfaces are skipped.
 */
export function createRenamedTest(name: string, baseCases: Record<string, ComparatorTest>, suffix = 'Renamed'): void {
  if (importCasesOnly) {
    return;
  }

  const renamed: Record<string, ComparatorTest> = {};

  Object.entries(baseCases).forEach(([key, testCase]) => {
    const variant = renameNestedInterfaces(testCase, suffix);

    if (variant !== null) {
      renamed[`${key} - renamed`] = variant;
    }
  });

  createTest(name, renamed);
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
    expect(dedent(stripAnsi(diff))).toMatchSnapshot();
  }
}
