import path from 'path';
import { describe, expect, it } from 'vitest';
import { createProtoRoot } from '../../../scripts/proto-scripts/proto-root';

const TEST_PROTO_DIR = path.join(__dirname, 'test-protos');

describe('createProtoRoot', () => {
  it('preserves absolute paths', () => {
    const root = createProtoRoot(TEST_PROTO_DIR);
    const target = path.join(TEST_PROTO_DIR, 'basic-types.proto');

    expect(root.resolvePath('', target)).toBe(target);
  });

  it('resolves existing imports relative to the importing file', () => {
    const root = createProtoRoot(path.join(TEST_PROTO_DIR, 'fallback'));
    const origin = path.join(TEST_PROTO_DIR, 'cross-file-b.proto');

    expect(root.resolvePath(origin, 'cross-file-a.proto')).toBe(path.join(TEST_PROTO_DIR, 'cross-file-a.proto'));
  });

  it('falls back to protoDir when an import is not beside the importing file', () => {
    const root = createProtoRoot(TEST_PROTO_DIR);
    const origin = path.join(TEST_PROTO_DIR, 'nested', 'consumer.proto');

    expect(root.resolvePath(origin, 'basic-types.proto')).toBe(path.join(TEST_PROTO_DIR, 'basic-types.proto'));
  });
});
