import { createTest } from './create-test';
import { advancedPropertyTests, basicPropertyTests, edgeCasePropertyTests, mergedInterfaceTests, objectArraysTests } from './test-cases';

createTest('Basic Property Tests', basicPropertyTests);

createTest('Advanced Property Tests', advancedPropertyTests);

createTest('Edge Case Property Tests', edgeCasePropertyTests);

createTest('Merged Interface Tests', mergedInterfaceTests);

createTest('Object Arrays Tests', objectArraysTests);
