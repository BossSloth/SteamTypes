import { compare } from 'natural-orderby';

/**
 * Explanation:
 * This rule enforces that variable declarations inside a `declare global {}` block
 * are sorted alphabetically (natural order), the same way perfectionist sorts interfaces.
 * perfectionist has no rule for ambient `let`/`const`/`var` declarations inside a global
 * augmentation, so this custom rule fills that gap.
 */
const naturalCompare = compare({ order: 'asc', locale: 'en' });

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Enforce variable declarations inside a `declare global {}` block to be sorted alphabetically (natural order).',
      category: 'Stylistic Issues',
    },
    schema: [],
    messages: {
      unsorted: "Global declaration '{{current}}' should come before '{{previous}}'.",
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;

    return {
      TSModuleDeclaration(node) {
        if (node.global !== true && node.id?.name !== 'global') return;
        const body = node.body?.body;
        if (!Array.isArray(body)) return;

        const declarations = body.filter(statement =>
          statement.type === 'VariableDeclaration' && statement.declarations[0]?.id.type === 'Identifier');
        if (declarations.length < 2) return;

        const names = declarations.map(statement => statement.declarations[0].id.name);
        const sorted = [...names].sort(naturalCompare);

        const firstWrongIndex = names.findIndex((name, index) => name !== sorted[index]);
        if (firstWrongIndex === -1) return;

        context.report({
          node: declarations[firstWrongIndex],
          messageId: 'unsorted',
          data: {
            current: sorted[firstWrongIndex],
            previous: sorted[firstWrongIndex === 0 ? 1 : firstWrongIndex - 1],
          },
          fix(fixer) {
            const sortedStatements = [...declarations].sort((a, b) =>
              naturalCompare(a.declarations[0].id.name, b.declarations[0].id.name));

            return declarations.map((statement, index) =>
              fixer.replaceText(statement, sourceCode.getText(sortedStatements[index])));
          },
        });
      },
    };
  },
};
