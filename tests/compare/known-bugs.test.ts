import stripAnsi from 'strip-ansi';
import { Project, SourceFile } from 'ts-morph';
import { describe, expect, it } from 'vitest';
import { compareAndCorrectAllInterfaces } from '../../scripts/compare/interface-comparator';

/**
 * Runs the comparator on in-memory files. Each bug pins the correct behavior, so its
 * `it.fails` passes while the bug is present and must be flipped to `it` when fixed.
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

describe('known bugs', () => {
  it.fails('B3: agreeing sources do not mutate the source and the widest type becomes the base', () => {
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

  it.fails('B3: disagreeing sources push the member down to each derived interface', () => {
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

  it.fails('B4: every changed interface is sorted and an emptied synthetic base is removed', () => {
    const { targetFile } = compare(
      `export interface A extends Base {
  x: string;
  y: number;
}
/** @exported */
export interface B extends Base {
  x: string;
  y: number;
}
interface Base {
  p: number;
}`,
      `export interface A {
  p: string;
  x: string;
  y: number;
}
export interface B {
  p: number;
  x: string;
  y: number;
}`,
      'A',
    );

    expect(targetFile.getInterface('A')?.getProperties().map((prop) => prop.getName())).toEqual(['p', 'x', 'y']);
    expect(targetFile.getInterface('B')?.getProperties().map((prop) => prop.getName())).toEqual(['p', 'x', 'y']);
    expect(targetFile.getInterface('Base')).toBeUndefined();
    expect(targetFile.getInterface('A')?.getExtends()).toHaveLength(0);
    expect(targetFile.getInterface('B')?.getExtends()).toHaveLength(0);
  });
});
