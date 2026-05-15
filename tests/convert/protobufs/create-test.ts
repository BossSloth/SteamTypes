import { existsSync } from 'fs';
import path from 'path';
import protobuf from 'protobufjs';
import { generateTypeScriptFromReflection } from '../../../scripts/proto-scripts/generate-protobufs';

const TEST_PROTO_DIR = path.join(__dirname, 'test-protos');
const REAL_PROTO_DIR = path.join(__dirname, '..', '..', '..', 'scripts', 'Protobufs');

function makeRoot(): protobuf.Root {
  const root = new protobuf.Root();
  root.resolvePath = (origin: string, target: string): string => {
    if (path.isAbsolute(target)) {
      return target;
    }
    const relativePath = path.join(path.dirname(origin), target);
    if (existsSync(relativePath)) {
      return relativePath;
    }

    // Fall back to the real Protobufs dir for shared protos like google/protobuf/descriptor.proto
    const realFallback = path.join(REAL_PROTO_DIR, target);
    if (existsSync(realFallback)) {
      return realFallback;
    }

    return path.join(TEST_PROTO_DIR, target);
  };

  return root;
}

function loadTestProtoAndGenerate(protoFileName: string, existingFile?: string): string {
  const protoFilePath = path.join(TEST_PROTO_DIR, protoFileName);

  if (!existsSync(protoFilePath)) {
    throw new Error(`Test proto file not found: ${protoFilePath}`);
  }

  const root = makeRoot();
  root.loadSync(protoFilePath, { keepCase: true });

  return generateTypeScriptFromReflection(root, protoFilePath, existingFile);
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

/**
 * Create a test case where multiple proto files are loaded into one root,
 * and a snapshot is taken for `primaryFile`. The other files only contribute
 * type definitions for cross-file references.
 */
export function createTestPair(name: string, primaryFile: string, otherFiles: string[]): void {
  const interfaceName = name.replace(/\s/g, '');

  it(name, async () => {
    const root = makeRoot();
    for (const f of otherFiles) {
      root.loadSync(path.join(TEST_PROTO_DIR, f), { keepCase: true });
    }
    root.loadSync(path.join(TEST_PROTO_DIR, primaryFile), { keepCase: true });

    const result = generateTypeScriptFromReflection(root, primaryFile);
    await expect(result).toMatchFileSnapshot(`./__snapshots__/${interfaceName}.ts`);
  });
}

/**
 * Create a test case that feeds an existing TS file into the generator so
 * pre-existing JSDoc comments get merged into the regenerated output.
 */
export function createTestWithExisting(name: string, protoFileName: string, existingFileName: string): void {
  const interfaceName = name.replace(/\s/g, '');
  const existingFile = path.join(__dirname, '__fixtures__', existingFileName);

  it(name, async () => {
    const result = loadTestProtoAndGenerate(protoFileName, existingFile);

    await expect(result).toMatchFileSnapshot(`./__snapshots__/${interfaceName}.ts`);
  });
}
