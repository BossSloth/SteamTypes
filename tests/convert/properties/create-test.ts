import { convertToTypescript } from '../../../scripts/convert-to-typescript';

export function createTest(name: string, testObject: Record<string, unknown>): void {
  const interfaceName = name.replace(/\s/g, '');

  it(name, async () => {
    const result = convertToTypescript(testObject, interfaceName);

    await expect(result).toMatchFileSnapshot(`./__snapshots__/${interfaceName}.ts`);
  });
}
