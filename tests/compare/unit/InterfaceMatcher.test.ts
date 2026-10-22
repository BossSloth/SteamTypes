import { Project, SourceFile } from 'ts-morph';
import { describe, expect, it } from 'vitest';
import { InterfaceMatcher, REQUIRED_OVERLAP } from '../../../scripts/compare/matching/InterfaceMatcher';
import { ComparisonSession } from '../../../scripts/compare/session/ComparisonSession';

function createFiles(targetContent: string, sourceContent: string): { targetFile: SourceFile; sourceFile: SourceFile } {
  const project = new Project({ useInMemoryFileSystem: true });

  return {
    targetFile: project.createSourceFile('target.ts', targetContent),
    sourceFile: project.createSourceFile('source.ts', sourceContent),
  };
}

function propertyList(names: string[]): string {
  return names.map((name) => `${name}: string;`).join(' ');
}

function namesFrom(prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, index) => `${prefix}${index + 1}`);
}

describe('InterfaceMatcher', () => {
  it('prefers a @compareOriginalName match over a higher name overlap', () => {
    const { targetFile, sourceFile } = createFiles(
      `/** @compareOriginalName Source */
export interface Renamed { x: string; y: string; z: string }
export interface Similar { a: string }`,
      'export interface Source { a: string }',
    );
    const matcher = new InterfaceMatcher(new ComparisonSession(targetFile));

    expect(matcher.findSimilarInterface(sourceFile.getInterfaceOrThrow('Source'))?.getName()).toBe('Renamed');
  });

  it('matches at exactly REQUIRED_OVERLAP', () => {
    const targetNames = namesFrom('p', 20);
    const { targetFile, sourceFile } = createFiles(
      `export interface Target { ${propertyList(targetNames)} }`,
      `export interface Source { ${propertyList(targetNames.slice(0, 13))} }`,
    );
    const matcher = new InterfaceMatcher(new ComparisonSession(targetFile));

    expect(13 / 20).toBe(REQUIRED_OVERLAP);
    expect(matcher.findSimilarInterface(sourceFile.getInterfaceOrThrow('Source'))?.getName()).toBe('Target');
  });

  it('rejects an overlap just below REQUIRED_OVERLAP', () => {
    const targetNames = namesFrom('p', 20);
    const { targetFile, sourceFile } = createFiles(
      `export interface Target { ${propertyList(targetNames)} }`,
      `export interface Source { ${propertyList(targetNames.slice(0, 12))} }`,
    );
    const matcher = new InterfaceMatcher(new ComparisonSession(targetFile));

    expect(matcher.findSimilarInterface(sourceFile.getInterfaceOrThrow('Source'))).toBeUndefined();
  });

  it('keeps the first best match in file order on a tie', () => {
    const { targetFile, sourceFile } = createFiles(
      `export interface First { a: string; b: string }
export interface Second { a: string; b: string }`,
      'export interface Source { a: string; b: string }',
    );
    const matcher = new InterfaceMatcher(new ComparisonSession(targetFile));

    expect(matcher.findSimilarInterface(sourceFile.getInterfaceOrThrow('Source'))?.getName()).toBe('First');
  });

  it('excludes a candidate that was forgotten after session start', () => {
    const { targetFile, sourceFile } = createFiles(
      `export interface First { a: string }
export interface Second { a: string }`,
      'export interface Source { a: string }',
    );
    const matcher = new InterfaceMatcher(new ComparisonSession(targetFile));
    targetFile.getInterfaceOrThrow('First').remove();

    expect(matcher.findSimilarInterface(sourceFile.getInterfaceOrThrow('Source'))?.getName()).toBe('Second');
  });

  it('does not treat an interface added after session start as a candidate', () => {
    const { targetFile, sourceFile } = createFiles(
      'export interface Existing { z: string }',
      'export interface Source { a: string }',
    );
    const matcher = new InterfaceMatcher(new ComparisonSession(targetFile));
    targetFile.addInterface({ name: 'Added', properties: [{ name: 'a', type: 'string' }] });

    expect(matcher.findSimilarInterface(sourceFile.getInterfaceOrThrow('Source'))).toBeUndefined();
  });

  it('pins the overload quirk where a score can exceed 1', () => {
    const { targetFile, sourceFile } = createFiles(
      `export interface Plain { f(): void; g(): void }
export interface Overloaded { f(): void }`,
      'export interface Source { f(a: string): void; f(a: number): void }',
    );
    const matcher = new InterfaceMatcher(new ComparisonSession(targetFile));

    expect(matcher.findSimilarInterface(sourceFile.getInterfaceOrThrow('Source'))?.getName()).toBe('Overloaded');
  });

  it('resolves a base name that exists in the target by name', () => {
    const { targetFile, sourceFile } = createFiles(
      'export interface Base { b: string }',
      'export interface Base { a: string }\nexport interface Child extends Base {}',
    );
    const matcher = new InterfaceMatcher(new ComparisonSession(targetFile));
    const resolved = matcher.resolveBaseName(sourceFile.getInterfaceOrThrow('Child').getExtends()[0], sourceFile);

    expect(resolved.targetName).toBe('Base');
    expect(resolved.targetBase?.getName()).toBe('Base');
    expect(resolved.sourceBase?.getName()).toBe('Base');
    expect(resolved.matchedBySimilarity).toBe(false);
  });

  it('resolves a base name through a similar target interface', () => {
    const { targetFile, sourceFile } = createFiles(
      '/** @compareOriginalName Base */\nexport interface Renamed { a: string }',
      'export interface Base { a: string }\nexport interface Child extends Base {}',
    );
    const matcher = new InterfaceMatcher(new ComparisonSession(targetFile));
    const resolved = matcher.resolveBaseName(sourceFile.getInterfaceOrThrow('Child').getExtends()[0], sourceFile);

    expect(resolved.targetName).toBe('Renamed');
    expect(resolved.targetBase?.getName()).toBe('Renamed');
    expect(resolved.sourceBase?.getName()).toBe('Base');
    expect(resolved.matchedBySimilarity).toBe(true);
  });

  it('keeps the source base name when no target interface matches', () => {
    const { targetFile, sourceFile } = createFiles(
      'export interface Other { c: string }',
      'export interface Base { a: string }\nexport interface Child extends Base {}',
    );
    const matcher = new InterfaceMatcher(new ComparisonSession(targetFile));
    const resolved = matcher.resolveBaseName(sourceFile.getInterfaceOrThrow('Child').getExtends()[0], sourceFile);

    expect(resolved.targetName).toBe('Base');
    expect(resolved.targetBase).toBeUndefined();
    expect(resolved.matchedBySimilarity).toBe(false);
  });

  it('keeps the base name when the source base is not declared in the source file', () => {
    const { targetFile, sourceFile } = createFiles(
      'export interface Other { c: string }',
      "import { Imported } from 'somewhere';\nexport interface Child extends Imported {}",
    );
    const matcher = new InterfaceMatcher(new ComparisonSession(targetFile));
    const resolved = matcher.resolveBaseName(sourceFile.getInterfaceOrThrow('Child').getExtends()[0], sourceFile);

    expect(resolved.targetName).toBe('Imported');
    expect(resolved.sourceBase).toBeUndefined();
    expect(resolved.matchedBySimilarity).toBe(false);
  });
});
