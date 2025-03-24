import { createTest } from './create-test';
import { advancedTestFunctions, complexObjectTestFunctions, dataStructureTestFunctions, returnTypesTestFunctions } from './test-cases';

createTest('Simple Functions', returnTypesTestFunctions);

createTest('Advanced Functions', advancedTestFunctions);

createTest('Complex Object Functions', complexObjectTestFunctions);

createTest('Data Structure Functions', dataStructureTestFunctions);
