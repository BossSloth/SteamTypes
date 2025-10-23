import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import customRules from './eslint-rules/index.mjs';

export default defineConfig(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  globalIgnores([
    'build/*',
    'dist/*',
    'coverage/*',
    'node_modules/*',
    '**/*.js',
    'scripts/convert/test-output/*',
    'scripts/convert/test-cases/functions/*',
    'scripts/convert/test-cases/properties/*',
  ]),
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.mjs', '*.config.ts', 'eslint-rules/*.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  pluginJs.configs.all,
  // eslint-disable-next-line import/no-named-as-default-member
  ...tseslint.configs.all,
  stylistic.configs.all,
  stylistic.configs['disable-legacy'],
  stylistic.configs.customize({
    indent: 2,
    semi: true,
    quotes: 'single',
    blockSpacing: true,
    commaDangle: 'always-multiline',
  }),
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json', 'src/*/tsconfig.json'],
          noWarnOnMultipleProjects: true,
        },
        node: true,
      },
    },
  },
  {
    plugins: {
      '@stylistic': stylistic,
      perfectionist,
      customRules,
    },

    rules: {
      // #region Formatting preferences
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/member-delimiter-style': ['error', { singleline: { requireLast: true } }],
      '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: ['return', 'function', 'class', 'interface', 'type', 'enum'] },
      ],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      curly: ['error', 'multi-line'],
      'perfectionist/sort-interfaces': ['error', { type: 'natural', groups: ['method', 'property'] }],

      '@stylistic/array-element-newline': 'off',
      '@stylistic/implicit-arrow-linebreak': 'off',
      '@stylistic/lines-around-comment': 'off',
      '@stylistic/multiline-comment-style': 'off',
      '@stylistic/object-property-newline': 'off',
      '@stylistic/brace-style': 'off',
      // #endregion

      // #region Preferences
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      '@typescript-eslint/prefer-literal-enum-member': ['error', { allowBitwiseExpressions: true }],
      'func-style': ['error', 'declaration'],
      'max-lines-per-function': ['error', { max: 50, skipBlankLines: true, skipComments: true }],

      '@typescript-eslint/consistent-type-exports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/init-declarations': 'off',
      '@typescript-eslint/max-params': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/parameter-properties': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/prefer-enum-initializers': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/prefer-regexp-exec': 'off',
      '@typescript-eslint/no-misused-promises': 'off', // disabled for performance reasons
      'capitalized-comments': 'off',
      'max-lines': 'off',
      'max-statements': 'off',
      'new-cap': 'off',
      'no-bitwise': 'off',
      'no-continue': 'off',
      'no-inline-comments': 'off',
      'no-negated-condition': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'no-warning-comments': 'off',
      'one-var': 'off',
      'prefer-named-capture-group': 'off',
      radix: 'off',
      'require-unicode-regexp': 'off',
      'sort-imports': 'off',
      'sort-keys': 'off',
      // #endregion

      // #region Project specific
      '@typescript-eslint/member-ordering': ['error', { interfaces: ['method', 'field'], classes: undefined }],
      'customRules/min-enum-members': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "TSIndexedAccessType[objectType.type='TSThisType']",
          message: "Don't use indexed-access on `this` in types (this['...']). This breaks the comparator.",
        },
      ],

      '@typescript-eslint/no-unsafe-function-type': 'off',
      camelcase: 'off',
      'id-length': 'off',
      'no-console': 'off',
      'customRules/no-deep-relative-imports': ['error', { maxDepth: 1 }],
      // #endregion
    },
  },
  {
    files: ['tests/**/test-cases/**', 'tests/**/__snapshots__/**'],
    rules: {
      '@typescript-eslint/no-unsafe-return': 'off',
      'func-style': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/consistent-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/require-await': 'off',
      'arrow-body-style': 'off',
      'no-underscore-dangle': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'prefer-template': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      'no-sparse-arrays': 'off',
      'object-shorthand': 'off',
      'func-names': 'off',
      'func-name-matching': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-else-return': 'off',
      'max-classes-per-file': 'off',
      '@typescript-eslint/class-methods-use-this': 'off',
      'perfectionist/sort-interfaces': 'off',
      '@stylistic/quote-props': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'import/no-unresolved': 'off',
    },
  },
  {
    files: ['src/types/**', 'src/Globals/**'],
    rules: {
      '@typescript-eslint/method-signature-style': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-shadow': 'off',
      'no-underscore-dangle': 'off',
    },
  },
  {
    files: ['scripts/**'],
    rules: {
      'perfectionist/sort-interfaces': 'off',
    },
  },
  {
    files: ['tests/**'],
    rules: {
      'max-lines-per-function': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    files: ['eslint-rules/**'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['tests/**'],
    rules: {
      'customRules/no-deep-relative-imports': 'off',
    },
  },
);
