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
import * as cliProgress from 'cli-progress';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { compareInterfaces } from './compare/interface-checker';
import { __dirname } from './dirname';
import { Logger } from './logger';
import { InterfaceMap, interfaceMaps } from './maps';
import { updateGlobals } from './update-globals';

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

const systemInformationFilePath = path.join(path.resolve(`${__dirname}/../`), 'src', 'types', 'system-information.ts');

async function getSystemInformation(): Promise<void> {
  logger.debug(chalk.blue('🔄 Getting system information...'));

  const response = await sharedJsClient.Runtime.evaluate({
    expression: 'SteamClient.System.GetSystemInfo()',
    returnByValue: true,
    awaitPromise: true,
  });

  if (response.exceptionDetails) {
    throw new Error(`Failed to get system information: ${JSON.stringify(response.exceptionDetails.exception?.description, null, 2)}`);
  }

  const value = response.result.value as object;

  // Only keep the properties we need
  const properties = [
    'nSteamVersion',
    'sSteamBuildDate',
    'sSteamAPI',
  ];

  const filteredValue = Object.fromEntries(Object.entries(value).filter(([key]) => properties.includes(key)));

  let systemInformation = JSON.stringify(filteredValue, null, 2);
  logger.debug(chalk.green('✅ Successfully got system information'));

  systemInformation = systemInformation.replace(/"/g, '\'').replace(/'(\w+)':/g, '$1:').replace(/\n}$/gm, ',\n}');
  systemInformation += ';\n';

  fs.writeFileSync(systemInformationFilePath, `export const systemInformation = ${systemInformation}`);
}

let extractTime = 0;

/**
 * Extracts TypeScript interface from a Steam client object
 */
async function extractInterface(map: InterfaceMap): Promise<{ content: string | null; extractTime: number; }> {
  const startTime = Date.now();

  if (map.condition !== undefined) {
    const conditionResponse = await sharedJsClient.Runtime.evaluate({
      expression: map.condition,
      returnByValue: true,
      awaitPromise: true,
    });

    if (conditionResponse.exceptionDetails) {
      throw new Error(`Failed to check condition: ${JSON.stringify(conditionResponse.exceptionDetails.exception, null, 2)}`);
    }

    const value = conditionResponse.result.value as boolean;

    if (!value) {
      logger.debug(chalk.green(`✅ Condition not met for ${chalk.bold(map.objectExpression)}`));

      return { content: null, extractTime: Date.now() - startTime };
    }
  }

  logger.debug('\n');
  logger.debug(chalk.blue(`🔄 Extracting interface for ${chalk.bold(map.objectExpression)} as ${chalk.bold(map.interfaceName)}...`));

  // Execute the conversion function
  logger.debug(chalk.blue(`🔄 Converting ${chalk.bold(map.objectExpression)} to TypeScript interface...`));

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
    expression: `(async () => window.convertToTypescript(${map.objectExpression}, '${map.interfaceName}', {ignoredProperties: [${map.ignoredProperties?.map(p => `'${p}'`).join(', ')}]}))()`,
    returnByValue: true,
    awaitPromise: true,
  });

  if (response.exceptionDetails) {
    throw new Error(`Failed to convert object "${map.objectExpression}": ${JSON.stringify(response.exceptionDetails.exception, null, 2)}`);
  }

  const interfaceContent = response.result.value as string;
  logger.debug(chalk.green('✅ Successfully generated TypeScript interface'));

  const currentExtractTime = Date.now() - startTime;
  extractTime += currentExtractTime;

  return { content: interfaceContent, extractTime: currentExtractTime };
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
  timing?: boolean;
}

let comparisonTime = 0;

async function processInterfaces(
  maps: InterfaceMap[],
  rootDir: string,
  options: ValidateTypesOptions,
): Promise<{ filePath: string; result: string | null; }[]> {
  const progressBar = new cliProgress.SingleBar({
    format: `${chalk.cyan('Progress')} ${chalk.green('{bar}')} ${chalk.yellow('{percentage}%')} | ${chalk.blue('{value}/{total}')} | ${chalk.blue('{name}')}`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    clearOnComplete: false,
  });

  progressBar.start(maps.length, 0, { name: 'Starting...' });

  const diffs: { filePath: string; result: string | null; }[] = [];
  let completedCount = 0;
  const interfaceTimings: { interfaceName: string; extractTime: number; comparisonTime: number; }[] = [];

  for (const map of maps) {
    progressBar.update(completedCount, { name: map.interfaceName });

    try {
      // eslint-disable-next-line no-await-in-loop
      const { content: interfaceContent, extractTime: currentExtractTime } = await extractInterface(map);

      if (interfaceContent === null) {
        completedCount++;
        continue;
      }

      const filePath = path.join(rootDir, `src/types/${map.file}.ts`);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, interfaceContent);
      }

      let currentComparisonTime = 0;
      try {
        const comparisonStartTime = Date.now();
        const result = compareInterfaces(
          `src/types/${map.file}.ts`,
          map.interfaceName,
          interfaceContent,
          options.verbose,
        );
        currentComparisonTime = Date.now() - comparisonStartTime;
        comparisonTime += currentComparisonTime;

        if (result !== null) {
          diffs.push({
            filePath: map.file.replaceAll('/', '_').replaceAll('\\', '_'),
            result,
          });
        }
      } catch (error) {
        throw new Error(`Failed to validate types for ${map.file}`, { cause: error });
      }

      if (options.timing === true) {
        interfaceTimings.push({
          interfaceName: map.interfaceName,
          extractTime: currentExtractTime,
          comparisonTime: currentComparisonTime,
        });
      }
    } finally {
      completedCount++;
      progressBar.update(completedCount, { name: map.interfaceName });
    }
  }

  progressBar.stop();

  if (options.timing === true && interfaceTimings.length > 0) {
    logger.log(chalk.blue('\n📊 Per-interface Timing:'));
    interfaceTimings
      .sort((a, b) => (b.extractTime + b.comparisonTime) - (a.extractTime + a.comparisonTime))
      .forEach(({ interfaceName, extractTime: interfaceExtractTime, comparisonTime: interfaceComparisonTime }) => {
        const totalTime = interfaceExtractTime + interfaceComparisonTime;
        logger.log(`${chalk.magenta(interfaceName)}: ${chalk.yellow(`Extract: ${interfaceExtractTime}ms`)} | ${chalk.cyan(`Compare: ${interfaceComparisonTime}ms`)} | ${chalk.green(`Total: ${totalTime}ms`)}`);
      });
  }

  return diffs;
}

async function run(options: ValidateTypesOptions, filter?: string): Promise<boolean> {
  const targetId = await getSharedJsContextTarget();

  await injectConvertToTypescriptJs(targetId, options.force);

  await getSystemInformation();

  await updateGlobals(sharedJsClient, logger);

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

  const rootDir = path.resolve(`${__dirname}/../`);

  const results = await processInterfaces(maps, rootDir, options);
  diffs.push(...results);

  if (diffs.length > 0) {
    logger.log('\n');
    logger.log(diffs.map(d => d.result).join('\n\n'));
  }

  logger.log(chalk.blue(`Extract time: ${extractTime} ms`));
  logger.log(chalk.blue(`Comparison time: ${comparisonTime} ms`));

  if (options.diff === false) {
    return diffs.length > 0;
  }

  if (fs.existsSync('diffs')) {
    fs.rmdirSync('diffs', { recursive: true });
  }

  fs.mkdirSync('diffs');

  for (const diff of diffs) {
    if (diff.result !== null) {
      // Write to file
      fs.writeFileSync(`diffs/${diff.filePath}.diff`, diff.result.replace(ansiRegex(), ''), 'utf-8');
    }
  }

  return diffs.length > 0;
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
    .option('-t, --timing', 'Show per-interface timing information', false)
    .argument('[filter]', 'Only validate interfaces that match the file filter. Example: "SteamClient/Apps"')
    .action(async (filter?: string, options: ValidateTypesOptions = { verbose: false, interactive: false, force: false, timing: false }) => {
      logger = new Logger(options);
      // try {
      logger.log(chalk.cyan('\n🔍 Steam Types Validator\n'));

      const startTime = performance.now();

      const result = await run(options, filter);
      sharedJsClient.close();

      const endTime = performance.now();

      if (result) {
        logger.log(chalk.yellow('\n⚠️  Operation completed with new types\n'));
      } else {
        logger.log(chalk.green('\n✅ Operation completed successfully\n'));
      }
      logger.log(chalk.gray(`Memory usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`));
      logger.log(chalk.gray(`Execution time: ${((endTime - startTime) / 1000).toFixed(2)} seconds`));
    });

  await program.parseAsync();
}

main();
