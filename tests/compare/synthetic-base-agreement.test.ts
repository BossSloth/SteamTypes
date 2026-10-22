import stripAnsi from 'strip-ansi';
import { Project, SourceFile } from 'ts-morph';
import { describe, expect, it } from 'vitest';
import { compareAndCorrectAllInterfaces } from '../../scripts/compare/interface-comparator';

/**
 * AST-level checks for synthetic base agreement, where the source must not be mutated and the
 * target's type text is asserted directly. Snapshot cases cover the rendered diffs.
 */
function compare(
  targetContent: string,
  sourceContent: string,
  interfaceName: string,
): { diff: string; targetFile: SourceFile; sourceFile: SourceFile } {
  const project = new Project({
    compilerOptions: {
      lib: ['ES2015'],
      declaration: true,
      emitDeclarationOnly: true,
    },
    useInMemoryFileSystem: true,
  });
  const targetFile = project.createSourceFile('target.ts', `${targetContent}\n`);
  const sourceFile = project.createSourceFile('source.ts', `${sourceContent}\n`);
  const diff = compareAndCorrectAllInterfaces(targetFile, sourceFile, interfaceName, 'target.ts');

  return { diff: stripAnsi(diff ?? ''), targetFile, sourceFile };
}

describe('synthetic base agreement', () => {
  it('agreeing sources do not mutate the source and the widest type becomes the base', () => {
    const { targetFile, sourceFile } = compare(
      `export interface A extends Base {}
/** @exported */
export interface B extends Base {}
interface Base {
  p: number;
}`,
      `export interface A {
  p: string;
}
export interface B {
  p: string | null;
}`,
      'A',
    );

    expect(targetFile.getInterface('Base')?.getProperty('p')?.getTypeNode()?.getText()).toBe('string | null');
    expect(sourceFile.getInterface('A')?.getProperty('p')?.getTypeNode()?.getText()).toBe('string');
  });

  it('disagreeing sources push the member down to each derived interface', () => {
    const { targetFile } = compare(
      `export interface A extends Base {}
/** @exported */
export interface B extends Base {}
interface Base {
  p: number;
}`,
      `export interface A {
  p: string;
}
export interface B {
  p: number | null;
}`,
      'A',
    );

    expect(targetFile.getInterface('A')?.getProperty('p')?.getTypeNode()?.getText()).toBe('string');
    expect(targetFile.getInterface('B')?.getProperty('p')?.getTypeNode()?.getText()).toBe('number | null');
    expect(targetFile.getInterface('Base')?.getProperty('p')).toBeUndefined();
  });
});
