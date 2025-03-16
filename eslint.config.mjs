import pluginJs from '@eslint/js';
import { globalIgnores } from "eslint/config";
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  globalIgnores(['build/*', 'dist/*']),
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.mjs']
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  pluginJs.configs.recommended,
  // ...tseslint.configs.all,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  // stylistic.configs.all,
  // stylistic.configs['disable-legacy'],
  // stylistic.configs.customize({
  //   indent: 2,
  //   semi: true,
  //   quotes: 'single',
  //   braceStyle: '1tbs',
  // }),
  {
    rules: {
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/prefer-literal-enum-member': ['error', { allowBitwiseExpressions: true }],
      'func-style': ['error', 'declaration'],
      'max-lines-per-function': ['error', { max: 100 }],
      // '@stylistic/function-call-argument-newline': ['error', 'consistent'],

      '@typescript-eslint/prefer-regexp-exec': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/method-signature-style': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      'no-inline-comments': 'off',
      'no-bitwise': 'off',
      'one-var': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      'no-magic-numbers': 'off',
      'camelcase': 'off',
      'no-underscore-dangle': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'max-statements': 'off',
      'id-length': 'off',
      'sort-imports': 'off',
      'capitalized-comments': 'off',
      'no-plusplus': 'off',
      'init-declarations': 'off',
      'sort-keys': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    files: ['scripts/convert/test-output/*', 'scripts/convert/test-cases/functions/*', 'scripts/convert/test-cases/properties/*'],
    rules: {
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'no-sparse-arrays': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'func-style': 'off',
    },
  },
  {
    files: ['src/types/**'],
    rules: {
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      // '@stylistic/padding-line-between-statements': [
      //   'error',
      //   { blankLine: 'always', prev: '*', next: 'function' },
      // ],    
    }
  }
);
