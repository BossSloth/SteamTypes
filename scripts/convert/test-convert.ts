import { checkbox, select } from '@inquirer/prompts';
import { default as chalk } from 'chalk';
import { Command } from 'commander';
import * as diffLib from 'diff';
import * as fs from 'fs';
import * as path from 'path';
import { convertToTypescript } from './convert-to-ts/';
import { TestSuite, testSuites } from './test-cases';

// Create the CLI program
const program = new Command();

program
  .name('test-convert')
  .description('Test the convertToTypescript function')
  .version('1.0.0');

// #region Run
program
  .command('run')
  .description('Run all test suites')
  .option('-v, --verbose', 'Show detailed output')
  .option('-u, --update', 'Update expected output files', false)
  .argument('[suite]', 'Name of the test suite to run (all if not specified)')
  .action(async (suiteName: string, options: { verbose: boolean; update: boolean } = { verbose: false, update: false }) => {   
    let suitesToRun = suiteName
    ? testSuites.filter(suite => suite.name.toLowerCase() === suiteName.toLowerCase())
    : testSuites;
  
    if (suiteName && suitesToRun.length === 0) {
      suitesToRun = await testSuiteNotFound(suiteName);
    }

    if (suiteName) {
      console.log(chalk.blue.bold(`Running test suites "${suitesToRun.map(s => s.name).join(', ')}"...\n`));
    } else {
      console.log(chalk.blue.bold('Running all test suites...\n'));
    }

    const startTime = performance.now();
    
    const { passCount, failCount } = runTestSuites(suitesToRun, options);

    const elapsed = performance.now() - startTime;
    
    // Print summary
    console.log(chalk.blue.bold('Test Summary:'));
    console.log(`  ⏱️ ${elapsed.toFixed(1)} ms`);
    console.log(chalk.green(`  ✓ ${passCount.toString()} tests passed`));
    if (failCount > 0) {
      console.log(chalk.red(`  ✗ ${failCount.toString()} tests failed`));
    }
  });
// #endregion

/**
 * Runs the specified test suites or all test suites if none specified
 */
function runTestSuites(suitesToRun: TestSuite[], options: { verbose: boolean; update: boolean }): { passCount: number; failCount: number } {
  let passCount = 0;
  let failCount = 0;
  
  const outputDir = path.join(__dirname, 'test-output');

  const sortedSuites = suitesToRun.sort((a, b) => {
    if (a.testFunctions && !b.testFunctions) return 1;
    if (!a.testFunctions && b.testFunctions) return -1;
    return a.name.localeCompare(b.name);
  });
  
  for (const suite of sortedSuites) {
    console.log(chalk.yellow(`Test Suite: ${suite.name}`));
    
    // Convert the test object to TypeScript
    const result = convertToTypescript(suite.testObject, suite.interfaceName);
    
    if (options.verbose) {
      console.log(chalk.gray('\nGenerated TypeScript:'));
      console.log(chalk.gray(result));
    }

    // Process test results based on suite type
    if (suite.testFunctions) {
      const functionTestResult = processFunctionTests(suite, result);
      passCount += functionTestResult.passCount;
      failCount += functionTestResult.failCount;
    } else {
      const fileTestResult = processFileTests(suite, result, outputDir, options.update);
      passCount += fileTestResult.passCount;
      failCount += fileTestResult.failCount;
    }
    
    console.log(''); // Empty line between suites
  }
  
  return { passCount, failCount };
}

/**
 * Processes function-based tests, comparing function signatures
 */
function processFunctionTests(suite: TestSuite, result: string): { passCount: number; failCount: number } {
  let passCount = 0;
  let failCount = 0;
  let passedAll = true;
  
  const lines = result.split('\n');
  
  // Make sure testFunctions exists before iterating
  if (!suite.testFunctions) {
    return { passCount, failCount };
  }
  
  // eslint-disable-next-line prefer-const
  for (let [funcName, { expected }] of Object.entries(suite.testFunctions)) {
    // Find the line with this function
    const funcLineIndex = lines.findIndex(line => line.trim().startsWith(funcName));
    
    if (funcLineIndex === -1) {
      console.log(chalk.red(`  ✗ Function ${funcName} not found in output`));
      failCount++;
      passedAll = false;
      continue;
    }
    
    // Get the function line
    let line = lines[funcLineIndex].trim();
    
    // Check for JSDoc comments above the function
    const jsdocLines = [];
    let i = funcLineIndex - 1;
    // Go backwards from the function line to find JSDoc comments
    while (i >= 0 && 
          (lines[i].trim().startsWith('*') || 
           lines[i].trim().startsWith('/**') || 
           lines[i].trim().startsWith('*/') || 
           lines[i].trim() === '')) {
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
    
    expected = expected.replace(/^\n/g, '')
    if (line === expected) {
      passCount++;
    } else {
      console.log(`${chalk.red(`  ✗ ${chalk.bold(funcName)}`)}: Expected "${chalk.underline(expected.replace(/\n/g, ''))}" but got "${chalk.underline(line.replace(/\n/g, ''))}"`);
      // Print diff
      printDiff(expected, line);
      
      failCount++;
      passedAll = false;
    }
  }
  
  if (passedAll) {
    console.log(chalk.green(`  ✓ All function return types match expected values`));
  }
  
  return { passCount, failCount };
}

/**
 * Prints a colored diff between expected and actual values
 */
function printDiff(expected: string, actual: string): void {
  const changes = diffLib.diffWordsWithSpace(expected, actual);
  process.stdout.write('    ');
  for (const change of changes) {
    if (change.added) {
      if (!change.value.includes(' ')) {
        process.stdout.write(chalk.green(change.value));
        continue;
      }

      const parts = change.value.split('');
      for (const part of parts) {
        if (part === ' ') {
          process.stdout.write(chalk.bgGreen(part));
        } else {
          process.stdout.write(chalk.green(part));
        }
      }
    } else if (change.removed) {
      if (!change.value.includes(' ')) {
        process.stdout.write(chalk.red(change.value));
        continue;
      }

      const parts = change.value.split('');
      for (const part of parts) {
        if (part === ' ') {
          process.stdout.write(chalk.bgRed(part));
        } else {
          process.stdout.write(chalk.red(part));
        }
      }
    } else {
      process.stdout.write(chalk.gray(change.value));
    }
  }
  process.stdout.write('\n');
}

/**
 * Processes file-based tests, comparing against expected output files
 */
function processFileTests(suite: TestSuite, result: string, outputDir: string, updateFiles: boolean): { passCount: number; failCount: number } {
  let passCount = 0;
  let failCount = 0;
  
  const expectedFilePath = path.join(outputDir, `${suite.interfaceName}.ts`);
  
  if (updateFiles) {
    // Update the expected output file
    fs.writeFileSync(expectedFilePath, result);
    console.log(chalk.blue(`  ✓ Updated expected output file: ${suite.interfaceName}.ts`));
    passCount++;
  } else if (fs.existsSync(expectedFilePath)) {
    // Compare with existing expected output
    const expectedOutput = fs.readFileSync(expectedFilePath, 'utf-8');
    
    // Normalize line endings and whitespace for comparison
    const normalizedResult = result.replace(/\r\n/g, '\n');
    const normalizedExpected = expectedOutput.replace(/\r\n/g, '\n');
    
    if (normalizedResult === normalizedExpected) {
      console.log(chalk.green(`  ✓ Output matches expected file: ${suite.interfaceName}.ts`));
      passCount++;
    } else {
      console.log(chalk.red(`  ✗ Output does not match expected file: ${suite.interfaceName}.ts`));
      failCount++;
    }
  } else {
    // Create the expected output file if it doesn't exist
    fs.writeFileSync(expectedFilePath, result);
    console.log(chalk.blue(`  ✓ Created expected output file: ${suite.interfaceName}.ts`));
    passCount++;
  }
  
  return { passCount, failCount };
}

// #region Generate
program
  .command('generate')
  .description('Generate TypeScript interfaces for a specific test suite')
  .argument('[suite]', 'Name of the test suite to generate')
  .action(async (suiteName?: string) => {
    let suite = testSuites.find(s => s.name.toLowerCase() === suiteName?.toLowerCase());
    
    if (!suite) {
      [suite] = await testSuiteNotFound(suiteName, true);
    }
    
    console.log(chalk.blue.bold(`Generating TypeScript for: ${suite.name}\n`));
    
    const result = convertToTypescript(suite.testObject, suite.interfaceName);
    console.log(result);
  });

// #endregion

// #region Diff
program
  .command('diff')
  .description('Show differences between current output and expected output')
  .argument('[suite]', 'Name of the test suite to diff (all if not specified)')
  .option('-a, --all', 'Show full diff', false)
  .option('-c, --context-lines <lines>', 'Number of context lines in unified diff', '3')
  .action(async (suiteName?: string, options: { all: boolean; contextLines: string } = {all: false, contextLines: '3'}) => {
    const startTime = performance.now();
    const outputDir = `${__dirname}/test-output`;
    
    // Filter test suites if a specific one is requested
    let suitesToDiff: TestSuite[] = testSuites;
    
    if (suiteName !== undefined) {
      // If a valid suite name is provided, filter by that name
      suitesToDiff = testSuites.filter(s => s.name.toLowerCase() === suiteName.toLowerCase());
      
      // If no matching suites found, prompt user to select one
      if (suitesToDiff.length === 0) {
        suitesToDiff = await testSuiteNotFound(suiteName);
      }
    }

    suitesToDiff = suitesToDiff.filter(s => !s.testFunctions);
    
    suitesToDiff = suitesToDiff.sort((a, b) => a.name.localeCompare(b.name));
    
    console.log(chalk.blue.bold('Showing differences between current output and expected output:\n'));
    
    const hasDifferences = diffTestSuites(suitesToDiff, outputDir, options);
    
    if (hasDifferences) {
      console.log(chalk.red.bold('✗ Differences detected in one or more test suites.'));
    } else {
      console.log(chalk.green.bold('✓ All test suite outputs match their expected files.'));
    }
    
    const elapsed = (performance.now() - startTime);
    console.log(`  ⏱️ ${elapsed.toFixed(1)} ms`);
  });

/**
 * Process diffs for all test suites
 * @returns true if any differences were found
 */
function diffTestSuites(
  suitesToDiff: TestSuite[], 
  outputDir: string, 
  options: { all: boolean; contextLines: string }
): boolean {
  let hasDifferences = false;
  
  for (const suite of suitesToDiff) {
    console.log(chalk.yellow(`Test Suite: ${suite.name}`));
    
    // Generate current output
    const result = convertToTypescript(suite.testObject, suite.interfaceName);
    
    // Check if expected output exists
    const expectedFilePath = path.join(outputDir, `${suite.interfaceName}.ts`);
    
    if (!fs.existsSync(expectedFilePath)) {
      console.log(chalk.red(`  ! No expected output file found: ${expectedFilePath}`));
      continue;
    }
    
    // Compare with expected output
    const expectedOutput = fs.readFileSync(expectedFilePath, 'utf-8');
    
    // Normalize line endings and whitespace for comparison
    const normalizedResult = result.replace(/\r\n/g, '\n');
    const normalizedExpected = expectedOutput.replace(/\r\n/g, '\n');

    if (normalizedResult === normalizedExpected) {
      console.log(chalk.green(`  ✓ No differences found`));
    } else {
      console.log(chalk.red(`  ✗ Differences found:`));
      
      // Show the differences
      if (options.all) {
        showFullDiff(normalizedExpected, normalizedResult);
      } else {
        showContextDiff(suite.interfaceName, normalizedExpected, normalizedResult, expectedFilePath, options.contextLines);
      }
      
      hasDifferences = true;
    }
    
    console.log(''); // Empty line between suites
  }
  
  return hasDifferences;
}

/**
 * Show a full diff between expected and actual content
 */
function showFullDiff(expected: string, actual: string): void {
  // Calculate word-by-word diff
  const diffResult = diffLib.diffWords(expected, actual);
  
  console.log(`\n${chalk.gray('─'.repeat(80))}`);
  
  for (const part of diffResult) {
    if (part.added) {
      process.stdout.write(chalk.green(part.value));
    } else if (part.removed) {
      process.stdout.write(chalk.red(part.value));
    } else {
      process.stdout.write(chalk.gray(part.value));
    }
  }
  
  console.log(chalk.gray('─'.repeat(80)));
}

/**
 * Show a context diff with a specified number of context lines
 */
function showContextDiff(
  interfaceName: string, 
  expected: string, 
  actual: string, 
  filePath: string,
  contextLinesStr: string
): void {
  // Generate a unified diff (more compact, shows only changes with context)
  const contextLines = parseInt(contextLinesStr) || 3;
  const patch = diffLib.createPatch(
    `${interfaceName}.ts`,
    expected,
    actual,
    'Expected',
    'Actual',
    { context: contextLines }
  );
  
  // Format and display the patch
  const lines = patch.split('\n').slice(4); // Skip the header lines
  
  console.log(`\n${chalk.gray('─'.repeat(80))}`);
  console.log(chalk.gray(filePath))

  for (const line of lines) {
    if (line.startsWith('+')) {
      console.log(chalk.green(line));
    } else if (line.startsWith('-')) {
      console.log(chalk.red(line));
    } else if (line.startsWith('@')) {
      console.log(chalk.cyan(line));
    } else {
      console.log(chalk.gray(line));
    }
  }
  
  console.log(chalk.gray('─'.repeat(80)));
}
// #endregion

async function testSuiteNotFound(suiteName?: string, single = false): Promise<TestSuite[]> {
  console.log(chalk.red(`Test suite "${suiteName}" not found.`));
  let result: string[];
  if (single) {
    result = [await select({
      message: 'Please select the test suite to run',
      choices: [
        ...testSuites.map(s => s.name),
      ]
    })];
  } else {
    result = await checkbox({
      message: 'Please select the test suite(s) that you want to run',
      choices: [
        ...testSuites.map(s => s.name),
      ]
    });
    if (result.length === 0) {
      return testSuiteNotFound(suiteName);
    }
  }

  // Return an array of TestSuite objects that match the selected names
  return testSuites.filter(s => result.includes(s.name));
}

// Parse command line arguments
program.parse(process.argv);

// If no command is provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
