import { convertToTypescript } from '../../../scripts/convert-to-typescript';

export function createTest(name: string, testObject: Record<string, unknown>, options?: { expectConsoleErrors?: string[]; expectConsoleWarnings?: string[]; }): void {
  const interfaceName = name.replace(/\s/g, '');

  it(name, async () => {
    const capturedErrors: string[] = [];
    const capturedWarnings: string[] = [];

    const consoleErrorSpy = options?.expectConsoleErrors !== undefined
      ? vi.spyOn(console, 'error').mockImplementation((message: string) => { capturedErrors.push(message); })
      : null;

    const consoleWarnSpy = options?.expectConsoleWarnings !== undefined
      ? vi.spyOn(console, 'warn').mockImplementation((message: string) => { capturedWarnings.push(message); })
      : null;

    const result = convertToTypescript(testObject, interfaceName);

    if (consoleErrorSpy) {
      const errorLog = capturedErrors.join('\n');

      for (const expected of options?.expectConsoleErrors ?? []) {
        expect(errorLog).toContain(expected);
      }
      consoleErrorSpy.mockRestore();
    }

    if (consoleWarnSpy) {
      const warnLog = capturedWarnings.join('\n');

      for (const expected of options?.expectConsoleWarnings ?? []) {
        expect(warnLog).toContain(expected);
      }
      consoleWarnSpy.mockRestore();
    }

    await expect(result).toMatchFileSnapshot(`./__snapshots__/${interfaceName}.ts`);
  });
}
