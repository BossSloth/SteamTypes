/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @stylistic/max-statements-per-line */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-underscore-dangle */
/* eslint-disable perfectionist/sort-interfaces */
/* eslint-disable max-classes-per-file */
import { getProtobufClassName, getType, isProtobufClass } from '@Convert/prop-type-detection';
import { InterfaceType, PrimitiveType, Type } from '@Convert/Type';
import { context, initContext } from '@Convert/utils';
import Long from 'long';
import { computed, observable } from 'mobx';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// ---------------------------------------------------------------------------
// Data-provider plumbing
// ---------------------------------------------------------------------------

interface ExpectedImport {
  module: string;
  types: string[];
  defaultImport?: boolean;
}

interface TypeCase {
  /** Human readable test name. */
  name: string;
  /** Lazy factory so each case gets a fresh value (avoids shared-state surprises). */
  makeValue(): unknown;
  /** Path passed to getType. Defaults to 'root.prop'. */
  path?: string;
  /** Pass-through to getType. */
  storeClassName?: boolean;
  /** Optional setup run AFTER initContext but BEFORE getType. */
  setup?(): void;
  /** Optional teardown counterpart to setup. */
  teardown?(): void;
  /** Expected Type.toString() output. */
  expected: string;
  /** Imports we expect getType to have registered on the shared context. */
  expectedImports?: ExpectedImport[];
  /** Interface names we expect to be queued for processing in `interfacesToProcess`. */
  expectedInterfaces?: string[];
  /** When true expect a console.error call (used for missing-path branch). */
  expectConsoleError?: boolean;
  /** When provided, the value should be an instance of the specified constructor. */
  instanceOf?: any;
  /** Pass-through to getType */
  addImports?: boolean;
}

function runCase(caseData: TypeCase): Type {
  caseData.setup?.();
  try {
    return getType(caseData.makeValue(), caseData.path ?? 'root.prop', caseData.storeClassName ?? false, caseData.addImports ?? true);
  } finally {
    caseData.teardown?.();
  }
}

function assertImports(expected: ExpectedImport[]): void {
  if (expected.length === 0) {
    expect(context.imports.size, 'expected no imports').toBe(0);

    return;
  }

  for (const imp of expected) {
    const entry = context.imports.get(imp.module);
    expect(entry, `expected import of module '${imp.module}'`).toBeDefined();
    for (const t of imp.types) {
      expect(entry!.types.has(t), `expected '${t}' in imports for '${imp.module}'`).toBe(true);
    }
    if (imp.defaultImport !== undefined) {
      expect(entry!.defaultImport).toBe(imp.defaultImport);
    }
  }
}

function assertInterfaces(expected: string[]): void {
  if (expected.length === 0) {
    expect(context.interfacesToProcess.size, 'expected no interfaces').toBe(0);

    return;
  }

  for (const name of expected) {
    expect(context.interfacesToProcess.has(name), `expected interface '${name}' queued`).toBe(true);
  }
}

// ---------------------------------------------------------------------------
// Test groups
// ---------------------------------------------------------------------------

const primitiveCases: TypeCase[] = [
  { name: 'null', makeValue: () => null, expected: 'null', instanceOf: PrimitiveType },
  { name: 'undefined', makeValue: () => undefined, expected: 'undefined', instanceOf: PrimitiveType },
  { name: 'string', makeValue: () => 'hello', expected: 'string', instanceOf: PrimitiveType },
  { name: 'number', makeValue: () => 42, expected: 'number', instanceOf: PrimitiveType },
  { name: 'NaN', makeValue: () => Number.NaN, expected: 'number', instanceOf: PrimitiveType },
  { name: 'boolean', makeValue: () => true, expected: 'boolean', instanceOf: PrimitiveType },
  { name: 'bigint', makeValue: () => 10n, expected: 'bigint' },
  { name: 'symbol', makeValue: () => Symbol('s'), expected: 'symbol' },
  { name: 'function (becomes unknown placeholder)', makeValue: () => () => 0, expected: 'unknown' },
];

const primitiveObjectCases: TypeCase[] = [
  {
    name: 'Long',
    makeValue: () => Long.fromValue(1),
    expected: 'Long',
    expectedImports: [{ module: 'long', types: ['Long'], defaultImport: true }],
  },
  { name: 'Date', makeValue: () => new Date(), expected: 'Date' },
  { name: 'RegExp', makeValue: () => /abc/, expected: 'RegExp' },
  { name: 'Error', makeValue: () => new Error('e'), expected: 'Error' },
  { name: 'TypeError (subclass keeps its constructor name)', makeValue: () => new TypeError('t'), expected: 'TypeError' },
  { name: 'Promise', makeValue: async () => Promise.resolve(), expected: 'Promise<unknown>' },
  { name: 'ArrayBuffer', makeValue: () => new ArrayBuffer(4), expected: 'ArrayBuffer' },
  { name: 'DataView', makeValue: () => new DataView(new ArrayBuffer(4)), expected: 'DataView' },
  { name: 'WeakMap', makeValue: () => new WeakMap(), expected: 'WeakMap<object, unknown>' },
  { name: 'WeakSet', makeValue: () => new WeakSet(), expected: 'WeakSet<object>' },
  { name: 'Int8Array', makeValue: () => new Int8Array(1), expected: 'Int8Array' },
  { name: 'Uint8Array', makeValue: () => new Uint8Array(1), expected: 'Uint8Array' },
  { name: 'Uint8ClampedArray', makeValue: () => new Uint8ClampedArray(1), expected: 'Uint8ClampedArray' },
  { name: 'Int16Array', makeValue: () => new Int16Array(1), expected: 'Int16Array' },
  { name: 'Uint16Array', makeValue: () => new Uint16Array(1), expected: 'Uint16Array' },
  { name: 'Int32Array', makeValue: () => new Int32Array(1), expected: 'Int32Array' },
  { name: 'Uint32Array', makeValue: () => new Uint32Array(1), expected: 'Uint32Array' },
  { name: 'Float32Array', makeValue: () => new Float32Array(1), expected: 'Float32Array' },
  { name: 'Float64Array', makeValue: () => new Float64Array(1), expected: 'Float64Array' },
  {
    name: 'Window-like (self-referential window prop)',
    makeValue: () => {
      const w: Record<string, unknown> = {};
      w.window = w;

      return w;
    },
    expected: 'Window',
  },
  {
    name: 'HTMLElement-like (nodeType === 1)',
    makeValue: () => {
      class HTMLDivElement { public nodeType = 1; }

      return new HTMLDivElement();
    },
    expected: 'HTMLDivElement',
  },
  {
    name: 'CSSStyleSheet-like',
    makeValue: () => ({ cssRules: [], type: 'text/css' }),
    expected: 'CSSStyleSheet',
  },
  {
    name: 'mobx ComputedValue<number>',
    makeValue: () => computed(() => 42),
    expected: 'ComputedValue<number>',
    expectedImports: [{ module: 'mobx/dist/internal', types: ['ComputedValue'] }],
  },
  {
    name: 'mobx ComputedValue<string>',
    makeValue: () => computed(() => 'hi'),
    expected: 'ComputedValue<string>',
    expectedImports: [{ module: 'mobx/dist/internal', types: ['ComputedValue'] }],
  },
  {
    name: 'MutationObserver-like',
    makeValue: () => ({ disconnect() {}, observe() {} }),
    expected: 'MutationObserver',
  },
  {
    name: 'React Root-like',
    makeValue: () => ({ render() {}, unmount() {}, _internalRoot: {} }),
    expected: 'ReactRoot',
    expectedImports: [{ module: 'react-dom/client', types: ['Root as ReactRoot'] }],
  },
  {
    name: 'Simple protobuf message',
    makeValue: () => ({
      toObject() { return {}; },
      serializeBinary() { return new Uint8Array(); },
      serializeBase64String() { return ''; },
      getClassName() { return 'CMsgFoo'; },
    }),
    expected: 'ProtobufInterface<CMsgFoo>',
    expectedImports: [{ module: 'shared/protobuf', types: ['ProtobufInterface'] }],
  },
  {
    name: 'TanStack QueryObserver-like',
    makeValue: () => ({
      createResult() {},
      getCurrentResult() {},
      subscribe() {},
    }),
    expected: 'QueryObserver',
    expectedImports: [{ module: '@tanstack/query-core', types: ['QueryObserver'] }],
  },
  {
    name: 'SteamID-like',
    makeValue: () => ({ m_ulSteamID: 0n, ConvertTo64BitString() { return '0'; } }),
    expected: 'SteamID',
    expectedImports: [{ module: 'shared/steamid', types: ['SteamID'] }],
  },
  {
    name: 'ConnectionManager (window.cm)',
    makeValue: () => globalThis.__cm,
    setup: () => {
      const cm = { foo: 'bar' };
      globalThis.__cm = cm;
      (globalThis as any).window = { cm };
    },
    teardown: () => {
      delete globalThis.__cm;
      delete (globalThis as any).window;
    },
    expected: 'ConnectionManager',
    expectedImports: [{ module: 'Global/managers/ConnectionManager', types: ['ConnectionManager'] }],
  },
];

const iterableCases: TypeCase[] = [
  {
    name: 'empty array -> unknown[]',
    makeValue: () => [],
    expected: 'unknown[]',
  },
  {
    name: 'homogeneous number array',
    makeValue: () => [1, 2, 3],
    expected: 'number[]',
  },
  {
    name: 'heterogeneous array becomes union[]',
    makeValue: () => [1, 'a', true],
    expected: '(boolean | number | string)[]',
  },
  {
    name: 'Set<number>',
    makeValue: () => new Set([1, 2]),
    expected: 'Set<number>',
  },
  {
    name: 'empty Set -> Set<unknown>',
    makeValue: () => new Set(),
    expected: 'Set<unknown>',
  },
  {
    name: 'Set<object>',
    makeValue: () => new Set([{ a: 1 }]),
    expected: 'Set<FooObject>',
    expectedInterfaces: ['FooObject'],
    path: 'root.FooObject',
  },
  {
    name: 'Map<string, number>',
    makeValue: () => new Map([['a', 1]]),
    expected: 'Map<string, number>',
  },
  {
    name: 'Map<string, object>Map<string, object>',
    makeValue: () => new Map([['a', { a: 1 }]]),
    expected: 'Map<string, FooObject>',
    expectedInterfaces: ['FooObject'],
    path: 'root.FooObject',
  },
  {
    name: 'mobx ObservableSet<number>',
    makeValue: () => observable.set<number>([1, 2]),
    expected: 'ObservableSet<number>',
    expectedImports: [{ module: 'mobx', types: ['ObservableSet'] }],
  },
  {
    name: 'mobx ObservableSet<object>',
    makeValue: () => observable.set([{ a: 1 }]),
    expected: 'ObservableSet<FooObject>',
    expectedImports: [{ module: 'mobx', types: ['ObservableSet'] }],
    path: 'root.FooObject',
    expectedInterfaces: ['FooObject'],
  },
  {
    name: 'mobx ObservableMap<string, number>',
    makeValue: () => observable.map<string, number>([['a', 1]]),
    expected: 'ObservableMap<string, number>',
    expectedImports: [{ module: 'mobx', types: ['ObservableMap'] }],
  },
  {
    name: 'dedupes identical element types in mixed arrays',
    makeValue: () => [1, 2, 'x', 'y', true],
    expected: '(boolean | number | string)[]',
  },
  {
    name: 'nested arrays produce nested array types',
    makeValue: () => [[1, 2], [3, 4]],
    expected: 'number[][]',
  },
];

const interfaceGenerationCases: TypeCase[] = [
  {
    name: 'plain object -> InterfaceType derived from last path segment',
    makeValue: () => ({ a: 1 }),
    path: 'root.user',
    expected: 'User',
    expectedInterfaces: ['User'],
  },
  {
    name: 'm_ prefix is stripped and capitalised',
    makeValue: () => ({ a: 1 }),
    path: 'root.m_settings',
    expected: 'Settings',
    expectedInterfaces: ['Settings'],
  },
  {
    name: 'name starting with `_` keeps its leading underscore casing',
    makeValue: () => ({ a: 1 }),
    path: 'root.a_field',
    expected: 'a_field',
    expectedInterfaces: ['a_field'],
  },
  {
    name: 'numeric path segment -> InvalidName (no protobuf class available)',
    makeValue: () => ({ a: 1 }),
    path: 'root.items.0',
    expected: 'InvalidName',
    expectedInterfaces: ['InvalidName'],
  },
  {
    name: 'object with only default proto props -> primitive `object`',
    makeValue: () => Object.create({}),
    expected: 'object',
  },
  {
    // eslint-disable-next-line no-template-curly-in-string
    name: 'numeric path with embedded protobuf class derives `${ClassName}${SingularParent}`',
    makeValue: () => {
      function MsgFoo(this: unknown) {}
      (MsgFoo as unknown as Record<string, unknown>).toObject = () => ({});
      (MsgFoo as unknown as Record<string, unknown>).fromObject = () => ({});
      (MsgFoo as unknown as Record<string, unknown>).deserializeBinary = () => ({});
      (MsgFoo.prototype as Record<string, unknown>).getClassName = function () { return 'MsgFoo'; };

      return { msgClass: MsgFoo };
    },
    path: 'root.things.0',
    // singular parent of "things" is "thing"
    expected: 'MsgFoothing',
    expectedInterfaces: ['MsgFoothing'],
  },
  {
    name: 'numeric path with embedded protobuf class without parent',
    makeValue: () => {
      function MsgFoo(this: unknown) {}
      (MsgFoo as unknown as Record<string, unknown>).toObject = () => ({});
      (MsgFoo as unknown as Record<string, unknown>).fromObject = () => ({});
      (MsgFoo as unknown as Record<string, unknown>).deserializeBinary = () => ({});
      (MsgFoo.prototype as Record<string, unknown>).getClassName = function () { return 'MsgFoo'; };

      return { msgClass: MsgFoo };
    },
    path: '0',
    expected: 'MsgFoo',
    expectedInterfaces: ['MsgFoo'],
  },
  {
    name: 'numeric path with embedded protobuf class without parent with existing name',
    makeValue: () => {
      function MsgFoo(this: unknown) {}
      (MsgFoo as unknown as Record<string, unknown>).toObject = () => ({});
      (MsgFoo as unknown as Record<string, unknown>).fromObject = () => ({});
      (MsgFoo as unknown as Record<string, unknown>).deserializeBinary = () => ({});
      (MsgFoo.prototype as Record<string, unknown>).getClassName = function () { return 'MsgFoo'; };

      return { msgClass: MsgFoo };
    },
    path: '0',
    expected: 'MsgFoo2',
    expectedInterfaces: ['MsgFoo2'],
    setup: () => {
      context.interfaceNameCounter.set('MsgFoo', 1);
    },
  },
  {
    name: 'numeric path with embedded protobuf class with empty class name',
    makeValue: () => {
      function MsgFoo(this: unknown) {}
      (MsgFoo as unknown as Record<string, unknown>).toObject = () => ({});
      (MsgFoo as unknown as Record<string, unknown>).fromObject = () => ({});
      (MsgFoo as unknown as Record<string, unknown>).deserializeBinary = () => ({});
      (MsgFoo.prototype as Record<string, unknown>).getClassName = function () { return ''; };

      return { msgClass: MsgFoo };
    },
    path: 'root.things.0',
    expected: 'InvalidName',
    expectedInterfaces: ['InvalidName'],
  },
  {
    name: 'missing path -> unknown + console.error',
    makeValue: () => ({ a: 1 }),
    path: '',
    expected: 'unknown',
    expectConsoleError: true,
  },
  {
    name: 'storeClassName=true captures class constructor string',
    makeValue: () => {
      class Foo { public a = 1; }

      return new Foo();
    },
    path: 'root.foo',
    storeClassName: true,
    expected: 'Foo',
    expectedInterfaces: ['Foo'],
  },
];

const observableValueCases: TypeCase[] = [
  {
    name: 'Steam ObservableValue<number>',
    makeValue: () => ({
      Set() {},
      Subscribe() {},
      m_currentValue: 7,
      SubscriberCount: 0,
      Value: 7,
    }),
    expected: 'ObservableValue<number>',
    expectedImports: [{ module: 'shared', types: ['ObservableValue'] }],
  },
  {
    name: 'Steam ObservableValue<string>',
    makeValue: () => ({
      Set() {},
      Subscribe() {},
      m_currentValue: 'x',
      SubscriberCount: 0,
      Value: 'x',
    }),
    expected: 'ObservableValue<string>',
    expectedImports: [{ module: 'shared', types: ['ObservableValue'] }],
  },
];

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

describe('getType (prop-type-detection)', () => {
  beforeEach(() => {
    initContext('Root');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe.each([
    ['primitives', primitiveCases],
    ['primitive object types', primitiveObjectCases],
    ['iterables', iterableCases],
    ['interface generation', interfaceGenerationCases],
    ['ObservableValue', observableValueCases],
  ] as const)('%s', (_group, cases) => {
    it.each(cases.flatMap((c) => {
      const base = [c.name, c] as const;
      // Every case with imports should also be tested without imports
      if (c.expectedImports && c.expectedImports.length > 0) {
        return [base, [`${c.name} (without import)`, { ...c, addImports: false, expectedImports: [] }]];
      }

      return [base];
    }))('%s', (_n, caseData) => {
      const errorSpy = caseData.expectConsoleError === true
        ? vi.spyOn(console, 'error').mockImplementation(() => undefined)
        : null;

      const result = runCase(caseData);

      expect(result.toString()).toBe(caseData.expected);
      assertImports(caseData.expectedImports ?? []);
      assertInterfaces(caseData.expectedInterfaces ?? []);
      if (caseData.instanceOf !== undefined) {
        expect(result).toBeInstanceOf(caseData.instanceOf);
      }

      if (errorSpy) {
        expect(errorSpy).toHaveBeenCalled();
      }
    });
  });

  // -------------------------------------------------------------------------
  // Behaviours that need bespoke setup beyond the data-provider shape
  // -------------------------------------------------------------------------

  describe('circular references', () => {
    it('returns an InterfaceType pointing at the already-registered name', () => {
      const obj: Record<string, unknown> = { a: 1 };
      context.processedObjectPaths.set(obj, 'Existing');

      const result = getType(obj, 'root.whatever');

      expect(result).toBeInstanceOf(InterfaceType);
      expect(result.toString()).toBe('Existing');
    });
  });

  describe('interface name counter', () => {
    it('appends an incrementing suffix when the same interface name is seen multiple times', () => {
      const first = getType({ a: 1 }, 'root.item');
      const second = getType({ b: 2 }, 'root.item');
      const third = getType({ c: 3 }, 'root.item');

      expect(first.toString()).toBe('Item');
      expect(second.toString()).toBe('Item2');
      expect(third.toString()).toBe('Item3');
      expect(context.interfaceNameCounter.get('Item')).toBe(3);
    });
  });

  describe('function type', () => {
    it('returns the unknown placeholder regardless of arity', () => {
      expect(getType(() => 0, 'root.fn').toString()).toBe('unknown');
      expect(getType((_a: number, _b: string) => 0, 'root.fn').toString()).toBe('unknown');
    });
  });

  describe('protobuf class helpers', () => {
    it('returns false when a protobuf-like function has a null prototype', () => {
      function MsgFoo(this: unknown) {}
      (MsgFoo as unknown as Record<string, unknown>).toObject = () => ({});
      (MsgFoo as unknown as Record<string, unknown>).fromObject = () => ({});
      (MsgFoo as unknown as Record<string, unknown>).deserializeBinary = () => ({});
      (MsgFoo as unknown as Record<string, unknown>).prototype = null;

      expect(isProtobufClass(MsgFoo)).toBe(false);
    });

    it('returns null when getClassName is not a function', () => {
      function MsgFoo(this: unknown) {}
      (MsgFoo.prototype as Record<string, unknown>).getClassName = 'MsgFoo';

      expect(getProtobufClassName(MsgFoo)).toBeNull();
    });
  });
});
