import { RuleTester } from 'oxlint/plugins-dev';
import { describe, expect, it, vi } from 'vitest';

type TestRule = Extract<Parameters<RuleTester['run']>[1], { create: unknown }>;

const { default: plugin } = (await import(new URL('../../eslint-rules/index.mjs', import.meta.url).href)) as {
  default: { rules: Record<string, TestRule> };
};

RuleTester.describe = describe;
RuleTester.it = it;

const tester = new RuleTester({
  languageOptions: {
    parserOptions: { lang: 'ts' },
  },
});

tester.run('min-enum-members', plugin.rules['min-enum-members'], {
  valid: ['enum Example { First, Second }', 'const enum Example { First, Second }'],
  invalid: [
    { code: 'enum Example {}', errors: [{ messageId: 'tooFewMembers' }] },
    { code: 'enum Example { Only }', errors: [{ messageId: 'tooFewMembers' }] },
  ],
});

tester.run('no-this-indexed-access', plugin.rules['no-this-indexed-access'], {
  valid: [
    'interface Example { value: string; }',
    'interface Example { GetSelf(): this; }',
    "interface Example { value: string; GetValue(): Example['value']; }",
    "class Example { value = ''; GetValue() { return this['value']; } }",
  ],
  invalid: [
    {
      code: "interface Example { value: string; GetValue(): this['value']; }",
      errors: [{ messageId: 'indexedThis' }],
    },
    {
      code: 'interface Example { value: string; GetValue(): this[keyof this]; }',
      errors: [{ messageId: 'indexedThis' }],
    },
    {
      code: "interface Example { value: { nested: string }; GetValue(): this['value']['nested']; }",
      errors: [{ messageId: 'indexedThis' }],
    },
  ],
});

tester.run('no-deep-relative-imports', plugin.rules['no-deep-relative-imports'], {
  valid: [
    "import value from 'package';",
    "import value from './local';",
    "import value from '../parent';",
    {
      code: "import value from '../../shared';",
      options: [{ maxDepth: 2 }],
    },
    {
      code: "import value from './local';",
      options: [{ maxDepth: 0 }],
    },
    {
      code: "import value from '../../../generated/types';",
      options: [{ ignorePatterns: ['generated/'] }],
    },
    {
      code: "import value from '../parent';",
      options: [{ ignorePatterns: ['generated/'] }],
    },
  ],
  invalid: [
    {
      code: "import value from '../../shared';",
      errors: [{ messageId: 'tooDeep', data: { depth: '2', max: '1' } }],
    },
    {
      code: "import type { Value } from '../types';",
      options: [{ maxDepth: 0 }],
      errors: [{ messageId: 'tooDeep', data: { depth: '1', max: '0' } }],
    },
    {
      code: "import value from '../../../shared';",
      options: [{ maxDepth: 2, ignorePatterns: ['generated/'] }],
      errors: [{ messageId: 'tooDeep', data: { depth: '3', max: '2' } }],
    },
  ],
});

tester.run('sort-global-declarations', plugin.rules['sort-global-declarations'], {
  valid: [
    'namespace Local { let zebra: number; let alpha: number; }',
    "declare module 'external' {}",
    'declare global {}',
    'declare global { interface Example {} }',
    'declare global { let only: number; }',
    'declare global { let alpha: number; let beta: number; }',
    'declare global { let item2: number; let item10: number; }',
    'declare namespace global.Inner {}',
    'declare global { const { value }: { value: number }; }',
  ],
  invalid: [
    {
      code: 'declare global { let zebra: number; let alpha: number; }',
      output: 'declare global { let alpha: number; let zebra: number; }',
      errors: [{ messageId: 'unsorted', data: { current: 'alpha', previous: 'zebra' } }],
    },
    {
      code: 'declare global { let alpha: number; let zebra: number; let beta: number; }',
      output: 'declare global { let alpha: number; let beta: number; let zebra: number; }',
      errors: [{ messageId: 'unsorted', data: { current: 'beta', previous: 'alpha' } }],
    },
    {
      code: 'declare namespace global { let item10: number; let item2: number; }',
      output: 'declare namespace global { let item2: number; let item10: number; }',
      errors: [{ messageId: 'unsorted' }],
    },
    {
      code: 'declare global { let zebra: number; interface Example {} const alpha: string; }',
      output: 'declare global { const alpha: string; interface Example {} let zebra: number; }',
      errors: [{ messageId: 'unsorted' }],
    },
  ],
});

it('ignores non-string import source values', () => {
  const report = vi.fn();
  const context = { options: [], report } as unknown as Parameters<TestRule['create']>[0];
  const listeners = plugin.rules['no-deep-relative-imports'].create(context) as {
    ImportDeclaration(node: { source: { value: unknown } }): void;
  };

  listeners.ImportDeclaration({ source: { value: null } });

  expect(report).not.toHaveBeenCalled();
});

it('ignores module declarations without a name or block body', () => {
  const report = vi.fn();
  const context = { sourceCode: {}, report } as unknown as Parameters<TestRule['create']>[0];
  const listeners = plugin.rules['sort-global-declarations'].create(context) as {
    TSModuleDeclaration(node: { global: boolean }): void;
  };

  listeners.TSModuleDeclaration({ global: false });
  listeners.TSModuleDeclaration({ global: true });

  expect(report).not.toHaveBeenCalled();
});

tester.run(
  'jsdoc-unused-imports',
  {
    ...plugin.rules['no-unused-vars'],
    create(context) {
      plugin.rules['no-undefined-types'].create(context);

      return plugin.rules['no-unused-vars'].create(context);
    },
  },
  {
    valid: [
      "import { Used } from './types'; /** {@link Used.member} */ export interface Example {}",
      "import { Used } from './types'; /** {@linkcode Used.member} */ export interface Example {}",
      "import { Used } from './types'; /** {@linkplain Used.member} */ export interface Example {}",
    ],
    invalid: [
      {
        code: "import { Unused } from './types'; export interface Example {}",
        errors: [{ messageId: 'unusedVar' }],
      },
      {
        code: "import { Unused } from './types'; /* {@link Unused.member} */ export interface Example {}",
        errors: [{ messageId: 'unusedVar' }],
      },
    ],
  },
);
