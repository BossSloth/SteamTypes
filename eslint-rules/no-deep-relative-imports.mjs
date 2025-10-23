/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow relative imports with more than allowed parent segments',
    },
    schema: [
      {
        type: 'object',
        properties: {
          maxDepth: { type: 'integer', minimum: 0 },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      tooDeep: 'Relative import depth ({{depth}}) is greater than allowed max ({{max}}).',
    },
  },
  create(context) {
    const options = context.options[0] ?? {};
    const maxDepth = typeof options.maxDepth === 'number' ? options.maxDepth : 1;

    function checkLiteral(node, value) {
      if (typeof value !== 'string') return;
      const depth = (value.match(/\.\.\//g) ?? []).length;
      if (depth > maxDepth) {
        context.report({
          node,
          messageId: 'tooDeep',
          data: { depth: depth.toString(), max: maxDepth.toString() },
        });
      }
    }

    return {
      ImportDeclaration(node) {
        checkLiteral(node.source, node.source.value);
      },
    };
  },
};
