export interface ComparatorTest {
  /** whether the diff is expected to be null */
  expectsNoDiff?: boolean;
  /** name of the interface to edit */
  interfaceName: string;
  /** source of truth */
  source: string;
  /** target to edit */
  target: string;
}
export * from './extended-interface-test-cases';
export * from './generics-test-cases';
export * from './interface-test-cases';
export * from './interface-test-cases-renamed';
export * from './merged-interface-test-cases';
export * from './methods-return-types-cases';
export * from './methods-test-cases';
export * from './property-change-test-cases';
export * from './property-change-test-cases-renamed';
export * from './simple-interface-test-cases';
export * from './simple-test-cases';
// Export all test cases for convenience
