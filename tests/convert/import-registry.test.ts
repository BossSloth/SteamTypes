import { ImportRegistry } from '@Convert/session/ImportRegistry';
import { describe, expect, it } from 'vitest';

describe('ImportRegistry.localNames', () => {
  it('returns the alias for aliased imports and the type name otherwise', () => {
    const imports = new ImportRegistry();
    imports.add('react-dom/client', 'Root as ReactRoot');
    imports.add('shared/interfaces', 'Callbacks');
    imports.add('long', 'Long', true);

    expect(imports.localNames()).toEqual(new Set(['ReactRoot', 'Callbacks', 'Long']));
  });
});
