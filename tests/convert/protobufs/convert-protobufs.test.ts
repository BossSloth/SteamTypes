import { createTest, createTestPair, createTestWithExisting } from './create-test';

describe('Protobuf to TypeScript Conversion', () => {
  createTest('Basic Types', 'basic-types.proto');

  createTest('Enums', 'enums.proto');

  createTest('Nested Types', 'nested-types.proto');

  createTest('Complex Structures', 'complex-structures.proto');

  createTest('Enum Naming Conflicts', 'enum-naming-conflicts.proto');

  createTest('With Options', 'with-options.proto');

  createTestWithExisting('Comment With Options', 'comment-with-options.proto', 'comment-with-options.existing.ts');

  createTest('Empty Message', 'empty-message.proto');

  createTest('Required Fields', 'required-fields.proto');

  createTestPair('Cross File A', 'cross-file-a.proto', ['cross-file-b.proto']);

  createTestPair('Cross File B', 'cross-file-b.proto', ['cross-file-a.proto']);

  createTestWithExisting('With Existing Comments', 'with-existing-comments.proto', 'with-existing-comments.existing.ts');
});
