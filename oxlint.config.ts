import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['typescript', 'import'],
  jsPlugins: [
    '@stylistic/eslint-plugin',
    'eslint-plugin-perfectionist',
    { name: 'customRules', specifier: './eslint-rules/index.mjs' },
  ],
  ignorePatterns: ['build/**', 'dist/**', 'coverage/**', 'node_modules/**', '**/*.js'],
  options: {
    typeAware: true,
  },
  env: {
    node: true,
  },
  settings: {
    'import-x/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json'],
        noWarnOnMultipleProjects: true,
      },
    },
  },
  categories: {
    correctness: 'error',
    suspicious: 'error',
    pedantic: 'error',
    perf: 'error',
    style: 'error',
    restriction: 'error',
    nursery: 'error',
  },
  rules: {
    ...stylistic.configs.all.rules,
    ...stylistic.configs.customize({
      indent: 2,
      semi: true,
      quotes: 'single',
      blockSpacing: true,
      commaDangle: 'always-multiline',
      arrowParens: true,
    }).rules,

    // #region Formatting preferences
    '@stylistic/function-call-argument-newline': ['error', 'consistent'],
    '@stylistic/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: ['return', 'function', 'class', 'interface', 'type', 'enum'] },
    ],
    '@stylistic/quote-props': ['error', 'as-needed'],
    '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
    curly: ['error', 'multi-line'],
    'perfectionist/sort-interfaces': ['error', { type: 'natural', groups: ['method', 'property'] }],
    'perfectionist/sort-imports': ['error', { type: 'natural', newlinesBetween: 0 }],

    // Some of these are already handled by oxfmt
    '@stylistic/array-element-newline': 'off',
    '@stylistic/implicit-arrow-linebreak': 'off',
    '@stylistic/lines-around-comment': 'off',
    '@stylistic/multiline-comment-style': 'off',
    '@stylistic/object-property-newline': 'off',
    '@stylistic/brace-style': 'off',
    '@stylistic/function-paren-newline': 'off',
    '@stylistic/arrow-parens': 'off',
    '@stylistic/indent': 'off',
    '@stylistic/wrap-regex': 'off',
    '@stylistic/operator-linebreak': ['error', 'before', { overrides: { '=': 'after' } }],
    '@stylistic/multiline-ternary': 'off',
    '@stylistic/template-tag-spacing': 'off',
    '@stylistic/indent-binary-ops': 'off',
    '@stylistic/semi-spacing': 'off',
    '@stylistic/newline-per-chained-call': 'off',
    // #endregion

    // #region Preferences
    'typescript/method-signature-style': ['error', 'method'],
    'typescript/prefer-literal-enum-member': ['error', { allowBitwiseExpressions: true }],
    'func-style': ['error', 'declaration'],
    'max-lines-per-function': ['error', { max: 75, skipBlankLines: true, skipComments: true }],

    'typescript/consistent-type-exports': 'off',
    'typescript/explicit-member-accessibility': 'off',
    'init-declarations': 'off',
    'typescript/max-params': 'off',
    'no-magic-numbers': 'off',
    'typescript/no-unsafe-type-assertion': 'off',
    'typescript/no-use-before-define': 'off',
    'typescript/parameter-properties': 'off',
    'prefer-destructuring': 'off',
    'typescript/prefer-enum-initializers': 'off',
    'typescript/prefer-readonly-parameter-types': 'off',
    'typescript/prefer-regexp-exec': 'off',
    'typescript/no-misused-promises': 'off', // disabled for performance reasons
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
    'typescript/strict-void-return': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    // #endregion

    // #region Project specific
    'customRules/member-ordering': ['error', { interfaces: ['method', 'field'] }],
    'customRules/min-enum-members': 'error',
    'customRules/sort-global-declarations': 'error',
    'customRules/no-this-indexed-access': 'error',

    'typescript/no-unsafe-function-type': 'off',
    'id-length': 'off',
    'no-console': 'off',
    'customRules/no-deep-relative-imports': ['error', { maxDepth: 1 }],
    'no-restricted-imports': ['error', '@steambrew/client'],
    'customRules/no-undefined-types': ['error', { disableReporting: true }],
    'typescript/consistent-type-imports': 'off',
    'import/no-named-as-default-member': 'off',
    // #endregion

    // #region TypeScript compatibility
    'require-await': 'off',
    'typescript/ban-types': 'off',
    'typescript/no-empty-interface': 'off',
    // #endregion

    // #region Imports
    'import/prefer-default-export': 'off',
    'import/no-nodejs-modules': 'off',
    'import/group-exports': 'off',
    'import/max-dependencies': 'off',
    'import/no-namespace': 'off',
    'import/no-named-export': 'off',
    'import/exports-last': 'off',
    'import/no-default-export': 'off',
    'import/no-anonymous-default-export': 'off',
    'import/no-relative-parent-imports': 'off',
    'import/unambiguous': 'off',
    'import/no-cycle': 'warn',
    'import/no-mutable-exports': 'off',

    // 'import/group-exports': 'off',
    // 'import/no-unassigned-import': 'off',
    // #endregion
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx,mts,cts}'],
      rules: {
        // These checks are handled by the TypeScript compiler.
        'constructor-super': 'off',
        'getter-return': 'off',
        'no-class-assign': 'off',
        'no-const-assign': 'off',
        'no-dupe-keys': 'off',
        'no-func-assign': 'off',
        'no-import-assign': 'off',
        'no-new-native-nonconstructor': 'off',
        'no-obj-calls': 'off',
        'no-setter-return': 'off',
        'no-this-before-super': 'off',
        'no-undef': 'off',
        'no-unreachable': 'off',
        'no-unsafe-negation': 'off',
        'no-with': 'off',
      },
    },
    {
      // This is an injected script, not an ES module.
      files: ['scripts/convert-to-typescript/fill-app-data.ts'],
      rules: {
        'no-implicit-globals': 'off',
      },
    },
    {
      files: ['tests/**/test-cases/**', 'tests/**/__snapshots__/**'],
      rules: {
        'typescript/no-unsafe-return': 'off',
        'func-style': 'off',
        'no-unused-vars': 'off',
        'typescript/no-unsafe-assignment': 'off',
        'typescript/strict-boolean-expressions': 'off',
        'consistent-return': 'off',
        'typescript/no-unsafe-call': 'off',
        'typescript/require-await': 'off',
        'arrow-body-style': 'off',
        'no-underscore-dangle': 'off',
        'typescript/no-explicit-any': 'off',
        'typescript/no-unsafe-member-access': 'off',
        'prefer-template': 'off',
        'typescript/no-unsafe-argument': 'off',
        'no-sparse-arrays': 'off',
        'object-shorthand': 'off',
        'func-names': 'off',
        'func-name-matching': 'off',
        'typescript/no-unnecessary-condition': 'off',
        'typescript/no-redundant-type-constituents': 'off',
        'typescript/explicit-module-boundary-types': 'off',
        'no-else-return': 'off',
        'max-classes-per-file': 'off',
        'class-methods-use-this': 'off',
        'perfectionist/sort-interfaces': 'off',
        '@stylistic/quote-props': 'off',
        'typescript/no-empty-object-type': 'off',
      },
    },
    {
      files: ['src/**'],
      rules: {
        // Native rules cannot see variable usage marked by JS plugins.
        'no-unused-vars': 'off',
        'customRules/no-unused-vars': 'error',
        // Published imports must use runtime dependencies/peerDependencies, including type imports.
        'customRules/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: false,
            optionalDependencies: false,
            peerDependencies: true,
            includeTypes: true,
          },
        ],
      },
    },
    {
      files: ['src/types/**', 'src/Globals/**'],
      rules: {
        'typescript/method-signature-style': 'off',
        'typescript/no-empty-object-type': 'off',
        'typescript/no-redundant-type-constituents': 'off',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'import/no-cycle': 'off',
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
        'typescript/explicit-function-return-type': 'off',
        'customRules/no-deep-relative-imports': 'off',
        'import/no-relative-parent-imports': 'off',
      },
    },
    {
      files: ['eslint-rules/**'],
      rules: {
        'typescript/explicit-function-return-type': 'off',
        'typescript/no-unsafe-assignment': 'off',
        'typescript/no-unsafe-call': 'off',
        'typescript/no-unsafe-member-access': 'off',
        'typescript/no-unsafe-return': 'off',
        'typescript/no-unsafe-argument': 'off',
        'typescript/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['src/types/Protobufs/**'],
      rules: {
        'customRules/min-enum-members': 'off',
        'perfectionist/sort-interfaces': 'off',
        'customRules/no-undefined-types': 'off',
      },
    },
  ],
});
