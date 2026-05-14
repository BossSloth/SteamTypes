import { createTest } from './create-test';
import { advancedPropertyTests, basicPropertyTests, edgeCasePropertyTests, mergedInterfaceTests, objectArraysTests } from './test-cases';
import { converterFlowTests } from './test-cases/converter-flow-test-cases';
import { getterThrowsTests } from './test-cases/getter-throws-test-cases';
import { nativeMethodTests } from './test-cases/native-method-test-cases';
import { specialPropertyTests } from './test-cases/special-property-test-cases';
import { steamRuntimeTypesTests } from './test-cases/steam-runtime-types-test-cases';
import { unionTypeTests } from './test-cases/union-type-test-cases';

createTest('Basic Property Tests', basicPropertyTests);

createTest('Advanced Property Tests', advancedPropertyTests);

createTest('Edge Case Property Tests', edgeCasePropertyTests);

createTest('Merged Interface Tests', mergedInterfaceTests);

createTest('Object Arrays Tests', objectArraysTests);

createTest('Special Property Tests', specialPropertyTests);

createTest('Steam Runtime Types Tests', steamRuntimeTypesTests);

createTest('Union Type Tests', unionTypeTests);

createTest('Getter Throws Tests', getterThrowsTests);

createTest('Converter Flow Tests', converterFlowTests);

createTest('Native Method Tests', nativeMethodTests);
