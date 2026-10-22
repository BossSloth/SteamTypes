/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow indexed-access types on this because they break the comparator.',
    },
    schema: [],
    messages: {
      indexedThis: "Don't use indexed-access on `this` in types (this['...']). This breaks the comparator.",
    },
  },
  create(context) {
    return {
      TSIndexedAccessType(node) {
        if (node.objectType.type !== 'TSThisType') return;

        context.report({ node, messageId: 'indexedThis' });
      },
    };
  },
};
