/**
 * Update Globals Module
 *
 * This module updates the global type definitions by comparing actual window properties
 * with declared ones. It's designed to be called from validate-types.ts.
 */

import chalk from 'chalk';
import type ChromeRemoteInterface from 'chrome-remote-interface';
import fs from 'node:fs';
import path from 'node:path';
import { __dirname } from './dirname';
import type { Logger } from './logger';

const defaultChromeWindowFilePath = path.join(__dirname, 'defaultChromeWindow.js');
const globalsFilePath = path.join(path.resolve(`${__dirname}/../`), 'src', 'Globals', 'index.ts');

interface WindowDiffResult {
  onlyInObj1: string[]; // Properties in actual window but not in our lists
  onlyInObj2: string[]; // Properties in our lists but not in actual window
}

function sortLowercase(a: string, b: string): number {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

/**
 * Injects the defaultChromeWindow.js script and gets the actual window properties from Steam
 */
async function getWindowProperties(
  sharedJsClient: ChromeRemoteInterface.Client,
  logger: Logger,
): Promise<{ steamProperties: string[]; unwantedProperties: string[]; }> {
  logger.debug(chalk.blue('🔄 Injecting defaultChromeWindow.js script...'));

  // Inject the defaultChromeWindow.js script
  const response = await sharedJsClient.Runtime.evaluate({
    expression: fs.readFileSync(defaultChromeWindowFilePath, 'utf8'),
    returnByValue: true,
  });

  if (response.exceptionDetails) {
    throw new Error(`Failed to get window diff: ${JSON.stringify(response.exceptionDetails.exception?.description, null, 2)}`);
  }

  logger.debug(chalk.green('✅ Successfully injected window diff script'));

  const diff = response.result.value as WindowDiffResult;

  logger.debug(chalk.green(`✅ Found ${diff.onlyInObj1.length} properties in Steam window`));

  return {
    steamProperties: diff.onlyInObj1.sort(sortLowercase),
    unwantedProperties: diff.onlyInObj2.sort(sortLowercase),
  };
}

/**
 * Extracts property names from the globals file
 */
function extractDeclaredProperties(fileContent: string): Map<string, string> {
  const properties = new Map<string, string>();

  const matches = fileContent.matchAll(/let\s+(\w+): (\w+)/g);

  for (const match of matches) {
    properties.set(match[1], match[2]);
  }

  // Sort by property name
  const sortedProperties = new Map([...properties.entries()].sort((a, b) => sortLowercase(a[0], b[0])));

  return sortedProperties;
}

function updateGlobalsFile(
  steamProperties: string[],
  currentFileContent: string,
): string {
  const declared = extractDeclaredProperties(currentFileContent);

  let globalContent = '';
  let windowContent = '';

  for (const steamProp of steamProperties) {
    const declaredType = declared.get(steamProp) ?? 'unknown';
    globalContent += `  let ${steamProp}: ${declaredType};`;
    windowContent += `    ${steamProp}: ${declaredType};`;

    if (steamProperties[steamProperties.length - 1] !== steamProp) {
      globalContent += '\n';
      windowContent += '\n';
    }
  }

  let updatedContent = currentFileContent;

  updatedContent = updatedContent.replace(/declare global\s*[\s\S]+\n\s*}\n}/, `declare global {\n${globalContent}\n\n  interface Window {\n${windowContent}\n  }\n}`);

  return updatedContent;
}

/**
 * Main function to update globals - called from validate-types.ts
 */
export async function updateGlobals(
  sharedJsClient: ChromeRemoteInterface.Client,
  logger: Logger,
): Promise<void> {
  const startTime = performance.now();
  logger.log(chalk.blue('\n🔄 Updating Globals File...\n'));

  // Get actual window properties from Steam
  const { steamProperties } = await getWindowProperties(sharedJsClient, logger);

  // Read current globals file
  const currentFileContent = fs.readFileSync(globalsFilePath, 'utf8');

  // Update the file
  const updatedContent = updateGlobalsFile(steamProperties, currentFileContent);

  // Write back to file
  if (updatedContent !== currentFileContent) {
    fs.writeFileSync(globalsFilePath, updatedContent, 'utf8');
    logger.debug(chalk.green(`\n✅ Successfully updated ${globalsFilePath}`));
  } else {
    logger.debug(chalk.green('\n✅ File is already up to date!'));
  }

  const endTime = performance.now();
  logger.debug(chalk.green(`\nTook ${endTime - startTime} ms to update globals file`));
}
