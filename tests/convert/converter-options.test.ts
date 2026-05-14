import { afterEach, describe, expect, it, vi } from 'vitest';
import { convertToTypescript } from '../../scripts/convert-to-typescript';

describe('convertToTypescript options', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('profiling: true logs processing and timing information', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    convertToTypescript({ name: 'value' }, 'Profiled', { profiling: true });

    const messages = logSpy.mock.calls.map(call => String(call[0]));
    expect(messages.some(msg => msg.startsWith('Processed'))).toBe(true);
    expect(messages.some(msg => msg.startsWith('Execution time'))).toBe(true);
  });

  it('ignoredProperties marks listed keys as unknown with a TODO note', () => {
    const result = convertToTypescript({ secret: 'hush', visible: 1 }, 'Ignored', { ignoredProperties: ['secret'] });

    expect(result).toContain('secret: unknown;');
    expect(result).toContain('@todo property ignored by configuration');
    expect(result).toContain('visible: number;');
  });
});
