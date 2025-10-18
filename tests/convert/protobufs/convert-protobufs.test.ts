import { createTest } from './create-test';

describe('Protobuf to TypeScript Conversion', () => {
  createTest('Basic Types', 'basic-types.proto');

  createTest('Enums', 'enums.proto');

  createTest('Nested Types', 'nested-types.proto');

  createTest('Complex Structures', 'complex-structures.proto');
});
