import { existsSync } from 'fs';
import path from 'path';
import protobuf from 'protobufjs';
import { generateTypeScriptFromReflection } from '../../../scripts/proto-scripts/generate-protobufs';

const TEST_PROTO_DIR = path.join(__dirname, 'test-protos');

function loadTestProtoAndGenerate(protoFileName: string): string {
  const protoFilePath = path.join(TEST_PROTO_DIR, protoFileName);

  if (!existsSync(protoFilePath)) {
    throw new Error(`Test proto file not found: ${protoFilePath}`);
  }

  // Load proto file
  const root = new protobuf.Root();
  root.resolvePath = (origin: string, target: string): string => {
    if (path.isAbsolute(target)) {
      return target;
    }
    const relativePath = path.join(path.dirname(origin), target);
    if (existsSync(relativePath)) {
      return relativePath;
    }

    return path.join(TEST_PROTO_DIR, target);
  };

  root.loadSync(protoFilePath, {
    keepCase: true,
  });

  // Generate TypeScript definitions
  return generateTypeScriptFromReflection(root, []);
}

/**
 * Create a test case for a proto file
 */
export function createTest(name: string, protoFileName: string): void {
  const interfaceName = name.replace(/\s/g, '');

  it(name, async () => {
    const result = loadTestProtoAndGenerate(protoFileName);

    await expect(result).toMatchFileSnapshot(`./__snapshots__/${interfaceName}.ts`);
  });
}
