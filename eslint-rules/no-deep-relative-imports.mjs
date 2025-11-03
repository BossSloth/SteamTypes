/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow relative imports with more than allowed parent segments (with optional ignore patterns)',
    },
    schema: [
      {
        type: 'object',
        properties: {
          maxDepth: { type: 'integer', minimum: 0 },
          ignorePatterns: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of regex patterns to ignore for relative import depth checking',
          },
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
    const ignorePatterns = Array.isArray(options.ignorePatterns)
      ? options.ignorePatterns.map(pattern => new RegExp(pattern))
      : [];

    /**
     * Check if an import path should be ignored based on ignore patterns
     * @param {string} importPath - The import path to check
     * @returns {boolean} - True if the import should be ignored
     */
    function shouldIgnore(importPath) {
      return ignorePatterns.some(pattern => pattern.test(importPath));
    }

    /**
     * @param {import("estree").Literal} node
     * @param {unknown} value
     */
    function checkLiteral(node, value) {
      if (typeof value !== 'string') return;

      // Skip if the import path matches any ignore pattern
      if (shouldIgnore(value)) return;

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
