/**
 * Explanation:
 * This rule enforces that TypeScript enums have at least two members.
 * This is to prevent enums from being optimized away by bun making them unable to be compared as an enum.
 */
/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce TypeScript enums to have at least two members.',
      category: 'Best Practices',
    },
    schema: [],
    messages: {
      tooFewMembers: "Enum '{{enumName}}' must have at least two members. Found {{memberCount}}.\nThis can cause issues with the comparison script due to it being optimized away.",
    },
  },
  create(context) {
    return {
      TSEnumDeclaration(node) {
        const memberCount = node.members.length;
        if (memberCount < 2) {
          context.report({
            node: node.id,
            messageId: 'tooFewMembers',
            data: {
              enumName: node.id.name,
              memberCount,
            },
          });
        }
      },
    };
  },
};
