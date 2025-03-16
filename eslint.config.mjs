import pluginJs from '@eslint/js';
import { globalIgnores } from "eslint/config";
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  globalIgnores(['build/*', 'dist/*', '**/*.js', 'scripts/convert/test-output/*', 'scripts/convert/test-cases/functions/*', 'scripts/convert/test-cases/properties/*']),
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

  pluginJs.configs.all,
  ...tseslint.configs.all,
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
      'curly': ['error', 'multi-line'],
      // '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@typescript-eslint/member-ordering': 'off', //TODO: put this on later to put functions first then properties

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
      '@typescript-eslint/init-declarations': 'off',
      'sort-keys': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'max-lines': 'off',
      'no-warning-comments': 'off',
      'no-ternary': 'off',
      'no-continue': 'off',
      'no-console': 'off',
      'radix': 'off',
      '@typescript-eslint/max-params': 'off',
      '@typescript-eslint/prefer-enum-initializers': 'off',
      '@typescript-eslint/consistent-type-exports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      'require-unicode-regexp': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      'no-undefined': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      'no-param-reassign': 'off',
      'no-negated-condition': 'off',
      'max-classes-per-file': 'off',
      '@typescript-eslint/parameter-properties': 'off',
      'prefer-named-capture-group': 'off',
    },
  },
  {
    files: ['src/types/**', 'src/Globals/**'],
    rules: {
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-shadow': 'off',
      // '@stylistic/padding-line-between-statements': [
      //   'error',
      //   { blankLine: 'always', prev: '*', next: 'function' },
      // ],    
    }
  }
);
