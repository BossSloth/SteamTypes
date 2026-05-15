import * as fsModule from 'fs';
import { existsSync, mkdirSync, statSync, writeFileSync } from 'fs';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it, Mock, MockInstance, vi } from 'vitest';
import { generateTypeScriptDefinitions } from '../../../scripts/proto-scripts/orchestrator';

type FsActual = typeof fsModule;

vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal<FsActual>();

  return {
    ...actual,
    mkdirSync: vi.fn(),
    writeFileSync: vi.fn(),
    statSync: vi.fn(() => ({ size: 1234 })),
  };
});

const TEST_PROTO_DIR = path.join(__dirname, 'test-protos');

const mockedMkdirSync = mkdirSync as unknown as Mock;
const mockedWriteFileSync = writeFileSync as unknown as Mock;
const mockedStatSync = statSync as unknown as Mock;

let logSpy: MockInstance<typeof console.log>;
let errSpy: MockInstance<typeof console.error>;

function joinedLog(spy: MockInstance<(...args: unknown[]) => void>): string {
  return spy.mock.calls.map((args: unknown[]) => args.join(' ')).join('\n');
}

beforeEach(() => {
  mockedMkdirSync.mockClear();
  mockedWriteFileSync.mockClear();
  mockedStatSync.mockClear();
  mockedStatSync.mockImplementation(() => ({ size: 1234 }));
  logSpy = vi.spyOn(console, 'log').mockImplementation(() => { /* silenced */ });
  errSpy = vi.spyOn(console, 'error').mockImplementation(() => { /* silenced */ });
});

afterEach(() => {
  logSpy.mockRestore();
  errSpy.mockRestore();
});

describe('generateTypeScriptDefinitions', () => {
  it('creates the output directory when it does not exist', () => {
    const outputDir = path.join(__dirname, '__nonexistent-output-dir__');
    expect(existsSync(outputDir)).toBe(false);

    generateTypeScriptDefinitions({
      protoDir: TEST_PROTO_DIR,
      outputDir,
      files: ['basic-types.proto'],
    });

    expect(mockedMkdirSync).toHaveBeenCalledWith(outputDir, { recursive: true });
    expect(mockedWriteFileSync).toHaveBeenCalledTimes(1);
    expect(mockedWriteFileSync.mock.calls[0][0]).toBe(path.join(outputDir, 'basic-types.ts'));
  });

  it('skips mkdir when the output directory already exists', () => {
    generateTypeScriptDefinitions({
      protoDir: TEST_PROTO_DIR,
      outputDir: TEST_PROTO_DIR,
      files: ['basic-types.proto'],
    });

    expect(mockedMkdirSync).not.toHaveBeenCalled();
    expect(mockedWriteFileSync).toHaveBeenCalledTimes(1);
  });

  it('processes multiple files and prints a progress counter', () => {
    generateTypeScriptDefinitions({
      protoDir: TEST_PROTO_DIR,
      outputDir: TEST_PROTO_DIR,
      files: ['basic-types.proto', 'enums.proto'],
    });

    expect(mockedWriteFileSync).toHaveBeenCalledTimes(2);
    const logged = joinedLog(logSpy);
    expect(logged).toMatch(/\[1\/2\]/);
    expect(logged).toMatch(/\[2\/2\]/);
    expect(logged).toMatch(/basic-types\.ts/);
    expect(logged).toMatch(/enums\.ts/);
  });

  it('rethrows errors after logging and still runs the finally block', () => {
    mockedWriteFileSync.mockImplementationOnce(() => {
      throw new Error('disk full');
    });

    expect(() => {
      generateTypeScriptDefinitions({
        protoDir: TEST_PROTO_DIR,
        outputDir: TEST_PROTO_DIR,
        files: ['basic-types.proto'],
      });
    }).toThrow('disk full');

    const errLogged = joinedLog(errSpy);
    expect(errLogged).toContain('Failed to generate TypeScript definitions');
    expect(errLogged).toContain('disk full');

    const stdLogged = joinedLog(logSpy);
    expect(stdLogged).toMatch(/Completed in/);
  });

  it('emits no console output when silent: true', () => {
    generateTypeScriptDefinitions({
      protoDir: TEST_PROTO_DIR,
      outputDir: TEST_PROTO_DIR,
      files: ['basic-types.proto'],
      silent: true,
    });

    expect(logSpy).not.toHaveBeenCalled();
    expect(errSpy).not.toHaveBeenCalled();
    expect(mockedWriteFileSync).toHaveBeenCalledTimes(1);
  });

  it('also suppresses error output when silent and an error is thrown', () => {
    mockedWriteFileSync.mockImplementationOnce(() => {
      throw new Error('known error');
    });

    expect(() => {
      generateTypeScriptDefinitions({
        protoDir: TEST_PROTO_DIR,
        outputDir: TEST_PROTO_DIR,
        files: ['basic-types.proto'],
        silent: true,
      });
    }).toThrow('known error');

    expect(errSpy).not.toHaveBeenCalled();
  });

  it('uses default config when called with empty files list', () => {
    function call(): void {
      generateTypeScriptDefinitions({ files: [] });
    }
    expect(call).not.toThrow();
    expect(mockedWriteFileSync).not.toHaveBeenCalled();
  });
});

describe('main entrypoint', () => {
  it('main() invokes generateTypeScriptDefinitions with defaults', async () => {
    const mod = await import('../../../scripts/proto-scripts/generate-protobufs');
    expect(typeof mod.main).toBe('function');

    function call(): void {
      mod.main();
    }
    expect(call).not.toThrow();
    expect(mockedWriteFileSync.mock.calls.length).toBeGreaterThan(10);
  });
});
