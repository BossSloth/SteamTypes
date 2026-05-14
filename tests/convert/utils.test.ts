import { describe, expect, it } from 'vitest';
import '../../scripts/convert-to-typescript';
import { formatInterfaceName, formatPropertyName, getProperties } from '../../scripts/convert-to-typescript/utils';

describe('utils.getProperties', () => {
  it('returns an empty array for null and non-objects', () => {
    expect(getProperties(null)).toEqual([]);
    expect(getProperties(undefined)).toEqual([]);
    expect(getProperties(42)).toEqual([]);
    expect(getProperties('text')).toEqual([]);
  });

  it('returns ["values"] for objects exposing Symbol.toStringTag', () => {
    const obj = {
      [Symbol.toStringTag]: 'Custom',
      extra: 1,
    };
    expect(getProperties(obj)).toEqual(['values']);
  });

  it('walks the prototype chain and returns unique property names', () => {
    const proto = { baseProp: 1 };
    const child = Object.create(proto) as Record<string, unknown>;
    child.childProp = 2;
    const result = getProperties(child);

    expect(result).toContain('baseProp');
    expect(result).toContain('childProp');
  });
});

describe('utils.formatPropertyName', () => {
  it('quotes property names containing special characters', () => {
    expect(formatPropertyName('with-dash')).toBe("'with-dash'");
    expect(formatPropertyName('with space')).toBe("'with space'");
    expect(formatPropertyName('123start')).toBe("'123start'");
  });

  it('leaves plain identifier names untouched', () => {
    expect(formatPropertyName('normal')).toBe('normal');
    expect(formatPropertyName('_underscore')).toBe('_underscore');
  });
});

describe('utils.formatInterfaceName', () => {
  it('strips special characters and leading digits', () => {
    expect(formatInterfaceName('My-Type')).toBe('MyType');
    expect(formatInterfaceName('123Name')).toBe('Name');
  });

  it('falls back to InvalidName when the result is empty', () => {
    expect(formatInterfaceName('123')).toBe('InvalidName');
    expect(formatInterfaceName('--')).toBe('InvalidName');
  });
});
