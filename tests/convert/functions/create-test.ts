import dedent from 'dedent';
import { describe, expect, it } from 'vitest';
import { convertToTypescript } from '../../../scripts/convert-to-typescript';
import { TestFunction } from './test-cases/shared';

export function createTest(name: string, testFunctions: Record<string, TestFunction>): void {
  describe(name, () => {
    const testObject = mapFunctionsToTestSuite(testFunctions);
    const result = convertToTypescript(testObject, name);

    Object.entries(testFunctions).forEach(([testName, { expected }]) => {
      it(testName, () => {
        runFunctionTest(testName, expected, result);
      });
    });
  });
}

function runFunctionTest(funcName: string, expected: string, result: string): void {
  const lines = result.split('\n');
  const funcLineIndex = lines.findIndex(line => line.trim().startsWith(funcName));

  if (funcLineIndex === -1) {
    throw new Error(`Function ${funcName} not found in output`);
  }

  // Get the function line
  let line = lines[funcLineIndex];

  // Check for JSDoc comments above the function
  const jsdocLines: string[] = [];
  let i = funcLineIndex - 1;
  // Go backwards from the function line to find JSDoc comments
  while (i >= 0
    && (lines[i].trim().startsWith('*')
      || lines[i].trim().startsWith('/**')
      || lines[i].trim().startsWith('*/')
      || lines[i].trim() === '')) {
    // Only add non-empty lines
    if (lines[i].trim() !== '') {
      jsdocLines.unshift(lines[i]);
    }
    i--;
  }

  // If JSDoc comments were found, prepend them to the function line
  if (jsdocLines.length > 0) {
    line = `${jsdocLines.join('\n')}\n${line}`;
  }

  expect(dedent(line)).toBe(expected);
}

function mapFunctionsToTestSuite(functions: Record<string, TestFunction>): Record<string, Function> {
  return Object.fromEntries(Object.entries(functions).map(([key, { func }]) => [key, func]));
}
