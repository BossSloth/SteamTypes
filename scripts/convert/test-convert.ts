#!/usr/bin/env node
import { Command } from 'commander';
// Import chalk as an ES module
import { default as chalk } from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { convertToTypescript } from './convert-to-ts';
import * as diffLib from 'diff';
import { checkbox } from '@inquirer/prompts';
import { testFunctions, TestSuite, testSuites } from './test-cases';

// #endregion

async function testSuiteNotFound(suiteName: string): Promise<TestSuite[]> {
  console.log(chalk.red(`Test suite "${suiteName}" not found.`));
  // console.log(chalk.yellow('Available test suites:'));
  // testSuites.forEach(s => console.log(`  - ${s.name}`));
  const result = await checkbox({
    message: 'Please select the test suite to run',
    choices: [
      ...testSuites.map(s => s.name),
    ]
  }) as string[];

  if (result.length === 0) {
    return testSuiteNotFound(suiteName);
  }

  // Return an array of TestSuite objects that match the selected names
  return testSuites.filter(s => result.includes(s.name));
}

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
  .action(async (suiteName, options) => {    
    let passCount = 0;
    let failCount = 0;
    
    // Create test-output directory if it doesn't exist
    const outputDir = path.join(__dirname, 'test-output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

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
    
    for (const suite of suitesToRun) {
      console.log(chalk.yellow(`Test Suite: ${suite.name}`));
      
      // Convert the test object to TypeScript
      const result = convertToTypescript(suite.testObject, suite.interfaceName);
      
      if (options.verbose) {
        console.log(chalk.gray('\nGenerated TypeScript:'));
        console.log(chalk.gray(result));
      }

      // Check function return types if this is the function test suite
      // #region Test Functions
      if (suite.name === 'Function Return Types') {
        const lines = result.split('\n');
        let passedAll = true;
        
        for (const [funcName, { expected }] of Object.entries(testFunctions)) {
          // Find the line with this function
          const funcLine = lines.find(line => line.trim().startsWith(funcName));
          
          if (!funcLine) {
            console.log(chalk.red(`  ✗ Function ${funcName} not found in output`));
            failCount++;
            passedAll = false;
            continue;
          }
          
          const line = funcLine.trim();
          
          if (line === expected) {
            if (options.verbose) {
              console.log(chalk.green(`  ✓ ${funcName}() => ${line}`));
            }
            passCount++;
          } else {
            console.log(chalk.red(`  ✗ ${chalk.bold(funcName)}`) +  `: Expected "${chalk.underline(expected)}" but got "${chalk.underline(line)}"`);
            // Print diff
            const diff = diffLib.diffWords(expected, line);
            process.stdout.write('    ');
            for (const part of diff) {
              if (part.added) {
                process.stdout.write(chalk.green(part.value));
              } else if (part.removed) {
                process.stdout.write(chalk.red(part.value));
              } else {
                process.stdout.write(chalk.gray(part.value));
              }
            }
            
            failCount++;
            passedAll = false;
          }
        }
        
        if (passedAll) {
          console.log(chalk.green(`  ✓ All function return types match expected values`));
        }
      }
      // #endregion
      else {
        // Compare with expected output file
        const expectedFilePath = path.join(outputDir, `${suite.interfaceName}.ts`);
        
        if (options.update) {
          // Update the expected output file
          fs.writeFileSync(expectedFilePath, result);
          console.log(chalk.blue(`  ✓ Updated expected output file: ${suite.interfaceName}.ts`));
          passCount++;
        } else if (fs.existsSync(expectedFilePath)) {
          // Compare with existing expected output
          const expectedOutput = fs.readFileSync(expectedFilePath, 'utf-8');
          
          // Normalize line endings and whitespace for comparison
          const normalizedResult = result.replace(/\r\n/g, '\n').trim();
          const normalizedExpected = expectedOutput.replace(/\r\n/g, '\n').trim();
          
          if (normalizedResult === normalizedExpected) {
            console.log(chalk.green(`  ✓ Output matches expected file: ${suite.interfaceName}.ts`));
            passCount++;
          } else {
            console.log(chalk.red(`  ✗ Output does not match expected file: ${suite.interfaceName}.ts`));
            
            if (options.verbose) {
              console.log(chalk.red('\nDifferences:'));
              console.log(chalk.red('Expected:'));
              console.log(chalk.gray(normalizedExpected));
              console.log(chalk.red('Actual:'));
              console.log(chalk.gray(normalizedResult));
            }
            
            failCount++;
          }
        } else {
          // Create the expected output file if it doesn't exist
          fs.writeFileSync(expectedFilePath, result);
          console.log(chalk.blue(`  ✓ Created expected output file: ${suite.interfaceName}.ts`));
          passCount++;
        }
      }
      
      console.log(''); // Empty line between suites
    }
    
    // Print summary
    console.log(chalk.blue.bold('Test Summary:'));
    console.log(chalk.green(`  ✓ ${passCount} tests passed`));
    if (failCount > 0) {
      console.log(chalk.red(`  ✗ ${failCount} tests failed`));
    }
  });
// #endregion

// #region Generate
program
  .command('generate')
  .description('Generate TypeScript interfaces for a specific test suite')
  .argument('<suite>', 'Name of the test suite to generate')
  .action((suiteName) => {
    const suite = testSuites.find(s => s.name.toLowerCase() === suiteName.toLowerCase());
    
    if (!suite) {
      console.log(chalk.red(`Test suite "${suiteName}" not found.`));
      console.log(chalk.yellow('Available test suites:'));
      testSuites.forEach(s => console.log(`  - ${s.name}`));
      return;
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
  .action(async (suiteName, options) => {
    const outputDir = __dirname + '/test-output';
    
    // Check if output directory exists
    if (!fs.existsSync(outputDir)) {
      console.log(chalk.red(`Output directory does not exist: ${outputDir}`));
      return;
    }
    
    // Filter test suites if a specific one is requested
    let suitesToDiff = suiteName 
      ? testSuites.filter(s => s.name.toLowerCase() === suiteName.toLowerCase())
      : testSuites.filter(s => s.name !== 'Function Return Types');
    
    if (suiteName && suitesToDiff.length === 0) {
      suitesToDiff = await testSuiteNotFound(suiteName);
    }
    
    console.log(chalk.blue.bold('Showing differences between current output and expected output:\n'));
    
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
      const normalizedResult = result.replace(/\r\n/g, '\n').trim();
      const normalizedExpected = expectedOutput.replace(/\r\n/g, '\n').trim();
      
      if (normalizedResult === normalizedExpected) {
        console.log(chalk.green(`  ✓ No differences found`));
      } else {
        console.log(chalk.red(`  ✗ Differences found:`));
        
        // Show the differences using the diff package
        if (options.all) {
          // Split the content into lines for line-by-line diff
          const resultLines = normalizedResult.split('\n');
          const expectedLines = normalizedExpected.split('\n');
          
          // Calculate line-by-line diff
          const diffResult = diffLib.diffWords(normalizedExpected, normalizedResult);
          
          console.log('\n' + chalk.gray('─'.repeat(80)));
          
          // Display the diff with line numbers
          let expectedLineNum = 0;
          let actualLineNum = 0;
          
          for (const part of diffResult) {
            const lines = part.value.split('\n').filter(line => line.length > 0);
            
            if (part.added) {
              process.stdout.write(chalk.green(part.value));
            } else if (part.removed) {
              process.stdout.write(chalk.red(part.value));
            } else {
              process.stdout.write(chalk.gray(part.value));
            }
          }
          
          console.log(chalk.gray('─'.repeat(80)));
        } else {
          // Generate a unified diff (more compact, shows only changes with context)
          const contextLines = parseInt(options.contextLines) || 3;
          const patch = diffLib.createPatch(
            `${suite.interfaceName}.ts`,
            normalizedExpected,
            normalizedResult,
            'Expected',
            'Actual',
            { context: contextLines }
          );
          
          // Format and display the patch
          const lines = patch.split('\n').slice(4); // Skip the header lines
          
          console.log('\n' + chalk.gray('─'.repeat(80)));
          console.log(chalk.gray(expectedFilePath))

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
        
        hasDifferences = true;
      }
      
      console.log(''); // Empty line between suites
    }
    
    if (!hasDifferences) {
      console.log(chalk.green.bold('All outputs match expected files.'));
    }
  });
// #endregion

// Parse command line arguments
program.parse(process.argv);

// If no command is provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
