import { normalizeEnumValueName } from '../../../scripts/proto-scripts/interface-emitter';

describe('normalizeEnumValueName', () => {
  it('strips k_ prefix and original enum name with underscore', () => {
    expect(normalizeEnumValueName('k_EStatus_Active', 'EStatus')).toBe('Active');
  });

  it('strips k_ prefix when value starts with enum name without underscore', () => {
    expect(normalizeEnumValueName('k_EStatusActive', 'EStatus')).toBe('Active');
  });

  it('handles values without k_ prefix', () => {
    expect(normalizeEnumValueName('STATE_RUNNING', 'EState')).toBe('STATE_RUNNING');
  });

  it('strips finalEnumTypeName when it differs from originalEnumTypeName', () => {
    // EStatus -> renamed to Status: should also strip "Status" prefix variants
    expect(normalizeEnumValueName('k_Status_Idle', 'EStatus', 'Status')).toBe('Idle');
  });

  it('returns value untouched (after k_ strip) when neither name matches', () => {
    expect(normalizeEnumValueName('k_FooBar', 'EOther', 'Other')).toBe('FooBar');
  });

  it('does not double-strip when finalEnumTypeName equals originalEnumTypeName', () => {
    expect(normalizeEnumValueName('k_Foo_Bar', 'Foo', 'Foo')).toBe('Bar');
  });
});
