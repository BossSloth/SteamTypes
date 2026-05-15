import protobuf from 'protobufjs';
import { generateFieldComment } from '../../../scripts/proto-scripts/field-comments';

interface FakeField {
  toJSON(): { options?: Record<string, unknown>; };
  options: Record<string, unknown> | undefined;
}

function fakeField(options: Record<string, unknown> | undefined): protobuf.Field {
  const f: FakeField = {
    options,
    toJSON: () => ({ options }),
  };

  return f as unknown as protobuf.Field;
}

describe('generateFieldComment', () => {
  it('returns undefined when options is missing', () => {
    expect(generateFieldComment(fakeField(undefined))).toBeUndefined();
  });

  it('returns undefined when only blacklisted "default" option is present', () => {
    expect(generateFieldComment(fakeField({ default: 5 }))).toBeUndefined();
  });

  it('quotes setting_default_string values', () => {
    const result = generateFieldComment(fakeField({ '(setting_default_string)': 'hello' }));
    expect(result).toContain('Default: "hello"');
  });

  it('replaces tabs with spaces in option values', () => {
    const result = generateFieldComment(fakeField({ '(setting_default_string)': 'a\tb' }));
    expect(result).toContain('Default: "a b"');
    expect(result).not.toContain('\t');
  });

  it('falls back to the raw key for unknown options', () => {
    const result = generateFieldComment(fakeField({ '(custom_unknown)': 'value' }));
    expect(result).toContain('(custom_unknown): value');
  });

  it('emits @Options header and bullet lines', () => {
    const result = generateFieldComment(fakeField({ '(setting_name)': 'X' }));
    expect(result).toBe([
      '  /**',
      '   * @Options',
      '   * Setting name: X',
      '   */',
    ].join('\n'));
  });

  it('renders boolean and number values via toString', () => {
    const result = generateFieldComment(fakeField({
      '(setting_default_bool)': true,
      '(setting_default_int)': 42,
    }));
    expect(result).toContain('Default: true');
    expect(result).toContain('Default: 42');
  });

  it('combines multiple translations + skips blacklisted entries', () => {
    const result = generateFieldComment(fakeField({
      default: 0,
      '(setting_name)': 'sys/Foo',
      '(setting_clamp_min)': 1,
      '(setting_clamp_max)': 9,
      '(setting_readonly)': true,
    }));
    expect(result).toContain('Setting name: sys/Foo');
    expect(result).toContain('Setting clamp min: 1');
    expect(result).toContain('Setting clamp max: 9');
    expect(result).toContain('Setting readonly: true');
  });

  it('returns undefined when toJSON yields no options object', () => {
    // truthy options object but toJSON omits it
    const f: FakeField = {
      options: {},
      toJSON: () => ({}),
    };
    expect(generateFieldComment(f as unknown as protobuf.Field)).toBeUndefined();
  });
});
