import { vi } from 'vitest';
import { ConversionContext, setCtx } from '../../../scripts/proto-scripts/conversion-context';
import {
  applyNameReplacements,
  collectImportsAndReplaceNames,
  generateImportStatements,
  getImportPathForType,
} from '../../../scripts/proto-scripts/imports';

describe('imports', () => {
  describe('getImportPathForType', () => {
    it('returns null when the type is not tracked', () => {
      setCtx(new ConversionContext('foo.proto'));
      expect(getImportPathForType('Unknown')).toBeNull();
    });

    it('throws when no context has been set', async () => {
      // Reset module state so getCtx throws on its uninitialised guard
      vi.resetModules();
      const fresh = await import('../../../scripts/proto-scripts/imports');
      expect(() => fresh.getImportPathForType('X')).toThrow(/ConversionContext not initialised/);
    });

    it('returns null when the source file matches currentProtoFile', () => {
      const ctx = new ConversionContext('foo.proto');
      ctx.typeSourceFiles.set('LocalType', 'pkg/foo.proto');
      setCtx(ctx);
      expect(getImportPathForType('LocalType')).toBeNull();
    });

    it('returns ./<basename> for types defined in another proto file', () => {
      const ctx = new ConversionContext('foo.proto');
      ctx.typeSourceFiles.set('OtherType', 'pkg/bar.proto');
      setCtx(ctx);
      expect(getImportPathForType('OtherType')).toBe('./bar');
    });
  });

  describe('collectImportsAndReplaceNames', () => {
    it('groups multiple types from the same file under one import', () => {
      const ctx = new ConversionContext('foo.proto');
      ctx.typeSourceFiles.set('A', 'pkg/bar.proto');
      ctx.typeSourceFiles.set('B', 'pkg/bar.proto');
      ctx.typeSourceFiles.set('C', 'pkg/baz.proto');
      ctx.referencedTypes.add('A');
      ctx.referencedTypes.add('B');
      ctx.referencedTypes.add('C');
      setCtx(ctx);

      collectImportsAndReplaceNames();

      expect(ctx.importedTypes.get('./bar')).toEqual(new Set(['A', 'B']));
      expect(ctx.importedTypes.get('./baz')).toEqual(new Set(['C']));
    });

    it('uses replaced names when available', () => {
      const ctx = new ConversionContext('foo.proto');
      ctx.typeSourceFiles.set('EFoo', 'pkg/bar.proto');
      ctx.replacedNames.set('EFoo', 'Foo');
      ctx.referencedTypes.add('EFoo');
      setCtx(ctx);

      collectImportsAndReplaceNames();

      expect(ctx.importedTypes.get('./bar')).toEqual(new Set(['Foo']));
    });

    it('skips types with no import path (same-file reference)', () => {
      const ctx = new ConversionContext('foo.proto');
      ctx.typeSourceFiles.set('LocalType', 'pkg/foo.proto');
      ctx.referencedTypes.add('LocalType');
      setCtx(ctx);

      collectImportsAndReplaceNames();

      expect(ctx.importedTypes.size).toBe(0);
    });
  });

  describe('generateImportStatements', () => {
    it('returns an empty array when no imports collected', () => {
      setCtx(new ConversionContext('foo.proto'));
      expect(generateImportStatements()).toEqual([]);
    });

    it('emits sorted statements with sorted type lists', () => {
      const ctx = new ConversionContext('foo.proto');
      ctx.importedTypes.set('./zeta', new Set(['Z', 'A']));
      ctx.importedTypes.set('./alpha', new Set(['B', 'A']));
      setCtx(ctx);

      expect(generateImportStatements()).toEqual([
        "import { A, B } from './alpha';",
        "import { A, Z } from './zeta';",
      ]);
    });
  });

  describe('applyNameReplacements', () => {
    it('replaces enum E-prefix names everywhere', () => {
      const ctx = new ConversionContext('foo.proto');
      ctx.replacedNames.set('EFoo', 'Foo');
      setCtx(ctx);

      const lines = ['export interface X { kind?: EFoo; }', '// EFoo reference EFoo'];
      applyNameReplacements(lines);
      expect(lines).toEqual([
        'export interface X { kind?: Foo; }',
        '// Foo reference Foo',
      ]);
    });

    it('rewrites nested type references but skips enum-value LHS (Foo = 1)', () => {
      const ctx = new ConversionContext('foo.proto');
      ctx.typeNameMap.set('Inner', 'Outer_Inner');
      setCtx(ctx);

      const lines = [
        'foo: Inner;',
        'export enum Inner { Inner = 1 }',
      ];
      applyNameReplacements(lines);
      expect(lines[0]).toBe('foo: Outer_Inner;');
      // The "Inner = 1" enum value LHS must NOT be rewritten (negative lookahead)
      expect(lines[1]).toContain('Inner = 1');
    });
  });
});
