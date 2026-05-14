import { describe, expect, it } from 'vitest';
import { ArrayType, GenericType, PrimitiveType, Type, UnionType } from '../../scripts/convert-to-typescript/Type';

describe('Type classes', () => {
  it('GenericType without type parameters renders just the generic name', () => {
    expect(new GenericType('Set', []).toString()).toBe('Set');
  });

  it('GenericType with parameters renders the full generic signature', () => {
    expect(new GenericType('Set', [new PrimitiveType('number')]).toString()).toBe('Set<number>');
  });

  it('GenericType.isFullyUnknown is true when every parameter is unknown', () => {
    expect(new GenericType('Set', [new PrimitiveType('unknown')]).isFullyUnknown()).toBe(true);
    expect(new GenericType('Set', [new PrimitiveType('number')]).isFullyUnknown()).toBe(false);
  });

  it('ArrayType.isFullyUnknown mirrors its element type', () => {
    expect(new ArrayType(new PrimitiveType('unknown')).isFullyUnknown()).toBe(true);
    expect(new ArrayType(new PrimitiveType('number')).isFullyUnknown()).toBe(false);
  });

  it('UnionType with a single member collapses to that member', () => {
    const union = new UnionType([new PrimitiveType('string')]);
    expect(union.toString()).toBe('string');
  });

  it('UnionType with no members renders as never', () => {
    expect(new UnionType([]).toString()).toBe('never');
  });

  it('UnionType flattens nested unions and dedupes equal members', () => {
    const inner = new UnionType([new PrimitiveType('number'), new PrimitiveType('string')]);
    const union = new UnionType([inner, new PrimitiveType('number')]);
    expect(union.toString()).toBe('(number | string)');
  });

  describe('UnionType.createUnionElementType (private)', () => {
    const createUnionElementType = (
      UnionType as unknown as { createUnionElementType(arrayTypes: ArrayType[]): Type; }
    ).createUnionElementType.bind(UnionType);

    it('dedupes overlapping element types across multiple union-array inputs', () => {
      const result = createUnionElementType([
        new ArrayType(new UnionType([new PrimitiveType('A'), new PrimitiveType('B')])),
        new ArrayType(new UnionType([new PrimitiveType('A'), new PrimitiveType('C')])),
      ]);

      expect(result).toBeInstanceOf(UnionType);
      expect(result.toString()).toBe('(A | B | C)');
    });

    it('returns the lone element type directly when only one unique element remains', () => {
      const result = createUnionElementType([
        new ArrayType(new UnionType([new PrimitiveType('A')])),
        new ArrayType(new PrimitiveType('A')),
      ]);

      expect(result).toBeInstanceOf(PrimitiveType);
      expect(result.toString()).toBe('A');
    });
  });
});
