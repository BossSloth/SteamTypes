import minEnumMembers from './min-enum-members.mjs';
import noDeepRelativeImports from './no-deep-relative-imports.mjs';
import sortGlobalDeclarations from './sort-global-declarations.mjs';

export default {
  rules: {
    'min-enum-members': minEnumMembers,
    'no-deep-relative-imports': noDeepRelativeImports,
    'sort-global-declarations': sortGlobalDeclarations,
  },
};
