#!/usr/bin/env bun
/* eslint-disable @typescript-eslint/no-floating-promises */
/**
 * Validate Types Script
 *
 * This script connects to the Steam client's SharedJSContext window via Chrome DevTools Protocol
 * and validates TypeScript type definitions against the actual implementation.
 *
 * Usage:
 *   bun validate-types.ts [options]
 */

import ansiRegex from 'ansi-regex';
import chalk from 'chalk';
import ChromeRemoteInterface from 'chrome-remote-interface';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { compareInterfaces } from './compare/interface-checker';
import { Logger } from './logger';
import { InterfaceMap, interfaceMaps } from './maps';

const convertToTsFilePath = path.join(path.resolve(`${__dirname}/../`), 'build', 'scripts', 'convert-to-typescript.js');

let logger: Logger;

let sharedJsClient: ChromeRemoteInterface.Client;

/**
 * Connects to the Steam client and finds the SharedJSContext target
 */
async function getSharedJsContextTarget(): Promise<string> {
  logger.debug(chalk.blue('🔌 Connecting to CEF instance on port 8080...'));

  // Connect to the Chrome DevTools Protocol endpoint
  let client: ChromeRemoteInterface.Client;
  try {
    client = await ChromeRemoteInterface({
      host: '127.0.0.1',
      port: 8080,
    });
  } catch (error) {
    throw new Error(`
${chalk.red('❌ Unable to connect to Steam on port 8080.')}
${chalk.yellow('⚠️  Make sure Steam is running and CEF is enabled.')}`, { cause: error });
  }

  logger.log(chalk.green('✅ Connected to Steam CEF instance'));
  logger.debug(chalk.blue('🔍 Searching for SharedJSContext window...'));

  const { Target } = client;

  // Get all targets (windows/tabs)
  const targets = await Target.getTargets();

  // Find the target with title 'SharedJsContext'
  const sharedJsContextTarget = targets.targetInfos.find(target => target.title === 'SharedJSContext');

  if (!sharedJsContextTarget) {
    await client.close();
    throw new Error(`${chalk.red('❌ Could not find window with title "SharedJSContext".')}\n${chalk.yellow('⚠️  Make sure Steam is running with the correct configuration.')}`);
  }

  logger.debug(chalk.green(`✅ Found SharedJSContext window (ID: ${sharedJsContextTarget.targetId})`));
  client.close();

  return sharedJsContextTarget.targetId;
}

async function injectConvertToTypescriptJs(targetId: string, force = false): Promise<void> {
  logger.debug(chalk.blue(`🔄 Injecting injection script into SharedJSContext window (ID: ${targetId})...`));

  sharedJsClient = await ChromeRemoteInterface({
    host: '127.0.0.1',
    port: 8080,
    target: targetId,
  });

  const hasScript = await sharedJsClient.Runtime.evaluate({
    expression: "typeof window.convertToTypescript !== 'undefined'",
    returnByValue: true,
  });

  const returnValue = hasScript.result.value as boolean;

  if (returnValue && !force) {
    logger.debug(chalk.green('✅ Script already injected'));

    return;
  }

  // Inject the content of inject.js into the context of the target
  const injectResult = await sharedJsClient.Runtime.evaluate({
    expression: fs.readFileSync(convertToTsFilePath, 'utf8'),
  });

  if (injectResult.exceptionDetails) {
    console.error(injectResult);
    throw new Error(`Failed to inject conversion script: ${JSON.stringify(injectResult.exceptionDetails.exception?.description, null, 2)}`);
  }
}

let extractTime = 0;

/**
 * Extracts TypeScript interface from a Steam client object
 */
async function extractInterface(map: InterfaceMap): Promise<string> {
  logger.debug('\n');
  logger.debug(chalk.blue(`🔄 Extracting interface for ${chalk.bold(map.object)} as ${chalk.bold(map.srcName)}...`));

  // Execute the conversion function
  logger.debug(chalk.blue(`🔄 Converting ${chalk.bold(map.object)} to TypeScript interface...`));

  const startTime = Date.now();

  if (map.initFunction !== undefined) {
    const initResponse = await sharedJsClient.Runtime.evaluate({
      expression: map.initFunction,
      returnByValue: true,
      awaitPromise: true,
    });

    if (initResponse.exceptionDetails) {
      throw new Error(`Failed to initialize object: ${JSON.stringify(initResponse.exceptionDetails.exception, null, 2)}`);
    }
  }

  const response = await sharedJsClient.Runtime.evaluate({
    expression: `async function evalConvert() { const result = window.convertToTypescript(${map.object}, '${map.srcName}'); return result; } evalConvert()`,
    returnByValue: true,
    awaitPromise: true,
  });

  if (response.exceptionDetails) {
    throw new Error(`Failed to convert object ${map.object}: ${JSON.stringify(response.exceptionDetails.exception, null, 2)}`);
  }

  const interfaceContent = response.result.value as string;
  logger.debug(chalk.green('✅ Successfully generated TypeScript interface'));

  extractTime += Date.now() - startTime;

  return interfaceContent;
}

// TODO: check when we have more mapped if this improves performance
// async function extractInterfaces(maps: InterfaceMap[]): Promise<string> {
//   const mappedObject = maps.map(map => `${map.srcName}: ${map.object}`);

//   const expression = `async function evalConvert() { const result = window.convertToTypescript({${mappedObject.join(',')}}, 'AllObjects'); return result; } evalConvert()`;

//   const response = await sharedJsClient.Runtime.evaluate({
//     expression,
//     returnByValue: true,
//     awaitPromise: true,
//   });

//   if (response.exceptionDetails) {
//     throw new Error(`Failed to extract interfaces: ${JSON.stringify(response.exceptionDetails.exception, null, 2)}`);
//   }

//   const interfaceContents = response.result.value as string;
//   // logger.debug(chalk.green('✅ Successfully extracted TypeScript interfaces'));

//   return interfaceContents;
// }

interface ValidateTypesOptions {
  single?: string;
  verbose: boolean;
  interactive: boolean;
  force: boolean;
  diff?: boolean;
}

// eslint-disable-next-line max-lines-per-function
async function run(options: ValidateTypesOptions, filter?: string): Promise<void> {
  const targetId = await getSharedJsContextTarget();

  await injectConvertToTypescriptJs(targetId, options.force);

  let maps = interfaceMaps;

  if (options.single !== undefined) {
    const map = maps.find(m => m.file === options.single);
    if (!map) {
      logger.error(chalk.red(`❌ Invalid object: ${options.single}`));
      process.exit(1);
    }

    maps = [map];
  }

  const diffs: { filePath: string; result: string | null; }[] = [];

  if (filter !== undefined) {
    maps = maps.filter(map => map.file.toLowerCase().includes(filter.toLowerCase()));
  }
  logger.log(chalk.blue(`Comparing ${maps.length} maps`));

  // const startExtractTime = Date.now();
  // const interfaceContent = await extractInterfaces(maps);
  // extractTime = Date.now() - startExtractTime;

  const rootDir = path.resolve(`${__dirname}/../`);

  // Create an array of promises for parallel execution
  const interfacePromises = maps.map(async (map) => {
    const interfaceContent = await extractInterface(map);

    const filePath = path.join(rootDir, `src/types/${map.file}.ts`);
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      // Create the file
      fs.writeFileSync(filePath, await extractInterface(map));
    }

    // if (options.interactive && (result.addedMembers.length > 0 || result.removedMembers.length > 0) && maps.length > 1) {
    //     await confirm({message: `Are you done with "src/types/${map.file}"?`, theme: {prefix: '❓'}});
    // }

    try {
      return {
        filePath: map.file.replaceAll('/', '_').replaceAll('\\', '_'),
        result: compareInterfaces(
          `src/types/${map.file}.ts`,
          map.srcName,
          interfaceContent,
          options.verbose,
        ),
      };
    } catch (error) {
      throw new Error(`Failed to validate types for ${map.file}`, { cause: error });
    }
  });

  const results = await Promise.all(interfacePromises);

  diffs.push(...results.filter(r => r.result !== null));

  if (diffs.length > 0) {
    logger.log('\n');
    logger.log(diffs.map(d => d.result).join('\n\n'));
  }

  logger.log(chalk.blue(`Extract time: ${extractTime} ms`));

  if (options.diff === false) {
    return;
  }

  fs.rmdirSync('diffs', { recursive: true });

  // Create the diffs directory if it doesn't exist
  if (!fs.existsSync('diffs')) {
    fs.mkdirSync('diffs');
  }

  for (const diff of diffs) {
    if (diff.result !== null) {
      // Write to file
      fs.writeFileSync(`diffs/${diff.filePath}.diff`, diff.result.replace(ansiRegex(), ''), 'utf-8');
    }
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  const program = new Command();

  program
    .name('validate-types')
    .description('Extract and validate TypeScript interfaces from Steam client objects')
    .version('1.0.0');

  program
    .option('-s, --single <object>', 'Extract only one object interface specified by file path in maps.ts')
    .option('-v, --verbose', 'Enable verbose output', false)
    .option('-i, --interactive', 'Enable interactive mode', false)
    .option('-f, --force', 'Force reload the inject script', false)
    .option('-d, --diff', 'Write diffs to file', false)
    .argument('[filter]', 'Only validate interfaces that match the file filter. Example: "SteamClient/Apps"')
    .action(async (filter?: string, options: ValidateTypesOptions = { verbose: false, interactive: false, force: false }) => {
      logger = new Logger(options);
      // try {
      logger.log(chalk.cyan('\n🔍 Steam Types Validator\n'));

      const startTime = performance.now();
      try {
        await run(options, filter);
      } finally {
        sharedJsClient.close();
      }
      const endTime = performance.now();

      logger.log(chalk.green('\n✅ Operation completed successfully\n'));
      logger.log(chalk.gray(`Memory usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`));
      logger.log(chalk.gray(`Execution time: ${((endTime - startTime) / 1000).toFixed(2)} seconds`));

      // } catch (error: any) {
      //     logger.error(chalk.red(`\n❌ Error: ${error.message}`));
      //     if (error.stack && options.verbose) {
      //         logger.error(chalk.gray('\nStack trace:'));
      //         logger.error(chalk.gray(error.stack));
      //     }
      //     process.exit(1);
      // }
    });

  await program.parseAsync();
}

// Run the main function if this script is executed directly
if (require.main === module) {
  main();
}
