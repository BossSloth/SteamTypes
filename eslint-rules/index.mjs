import { importX } from 'eslint-plugin-import-x';
import { jsdoc } from 'eslint-plugin-jsdoc';
import tseslint from 'typescript-eslint';
import minEnumMembers from './min-enum-members.mjs';
import noDeepRelativeImports from './no-deep-relative-imports.mjs';
import noThisIndexedAccess from './no-this-indexed-access.mjs';
import sortGlobalDeclarations from './sort-global-declarations.mjs';

const noUndefinedTypes = jsdoc({}).plugins.jsdoc.rules['no-undefined-types'];

// oxlint-disable-next-line import/no-anonymous-default-export
export default {
  rules: {
    'member-ordering': tseslint.plugin.rules['member-ordering'],
    'min-enum-members': minEnumMembers,
    'no-deep-relative-imports': noDeepRelativeImports,
    'no-extraneous-dependencies': importX.rules['no-extraneous-dependencies'],
    'no-this-indexed-access': noThisIndexedAccess,
    'no-undefined-types': {
      ...noUndefinedTypes,
      /** @param {import('eslint').Rule.RuleContext} context */
      create(context) {
        // Oxc does not resolve dotted JSDoc links to their imported root variable.
        for (const comment of context.sourceCode.getAllComments()) {
          if (comment.type !== 'Block' || !comment.value.startsWith('*')) continue;

          for (const match of comment.value.matchAll(/\{@link(?:code|plain)?\s+([\w$]+)/gu)) {
            context.sourceCode.markVariableAsUsed(match[1]);
          }
        }

        return noUndefinedTypes.create(context);
      },
    },
    'no-unused-vars': tseslint.plugin.rules['no-unused-vars'],
    'sort-global-declarations': sortGlobalDeclarations,
  },
};
