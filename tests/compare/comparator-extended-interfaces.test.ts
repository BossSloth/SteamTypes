import { createTest } from './shared';
import { ComparatorTest } from './test-cases';
import { extendedInterfaceCases } from './test-cases/extended-interface-test-cases';

createTest('Extended Interface Cases', extendedInterfaceCases);

const unionExtendedInterfaceCases: Record<string, ComparatorTest> = {};
// Add forEach test to all existing cases
Object.keys(extendedInterfaceCases).forEach((key) => {
  const testCase = extendedInterfaceCases[key];
  const newKey = `${key} - union`;

  // Create modified versions that has a union type
  const modifiedTarget = testCase.target.replace(
    'admin: Admin;\n\n  user: User;',
    'user: User | Admin;',
  );

  const modifiedSource = testCase.source.replace(
    'user: User;\n  admin: Admin;',
    'user: User | Admin;',
  );

  unionExtendedInterfaceCases[newKey] = {
    ...testCase,
    target: modifiedTarget,
    source: modifiedSource,
  };
});

createTest('Extended Interface Cases', unionExtendedInterfaceCases);
