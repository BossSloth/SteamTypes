#!/usr/bin/env bun
/**
 * Validate Types Script
 * 
 * This script connects to the Steam client's SharedJSContext window via Chrome DevTools Protocol
 * and validates TypeScript type definitions against the actual implementation.
 * 
 * Usage:
 *   bun validate-types.ts [options]
 */

import ChromeRemoteInterface from 'chrome-remote-interface';
import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import chalk from 'chalk';
import { compareInterfaces } from './interface-checker';
import { interfaceMaps } from './maps';
import { confirm} from '@inquirer/prompts';
import { Logger } from './logger';

const convertToTsFilePath = path.join(process.cwd(), 'build', 'scripts', 'convert-to-ts.js');

let logger: Logger;

/**
 * Connects to the Steam client and finds the SharedJSContext target
 */
async function getSharedJsContextTarget(): Promise<string | undefined> {
    logger.log(chalk.blue('🔌 Connecting to CEF instance on port 8080...'));
        
    // Connect to the Chrome DevTools Protocol endpoint
    let client: ChromeRemoteInterface.Client;
    try {
        client = await ChromeRemoteInterface({
            port: 8080,
        });
    } catch (error) {
        logger.error(chalk.red('❌ Unable to connect to Steam on port 8080.'));
        logger.error(chalk.yellow('⚠️  Make sure Steam is running and CEF is enabled.'));
        logger.error(chalk.gray('Error details:', error));
        return undefined;
    }

    logger.log(chalk.green('✅ Connected to Steam CEF instance'));
    logger.debug(chalk.blue('🔍 Searching for SharedJSContext window...'));

    const { Target } = client;

    // Get all targets (windows/tabs)
    const targets = await Target.getTargets();
    
    // Find the target with title 'SharedJsContext'
    const sharedJsContextTarget = targets.targetInfos.find(target => 
        target.title === 'SharedJSContext'
    );
    
    if (!sharedJsContextTarget) {
        logger.error(chalk.red('❌ Could not find window with title "SharedJSContext"'));
        logger.error(chalk.yellow('⚠️  Make sure Steam is running with the correct configuration'));
        await client.close();
        return undefined;
    }

    logger.debug(chalk.green(`✅ Found SharedJSContext window (ID: ${sharedJsContextTarget.targetId})`));
    client.close();

    return sharedJsContextTarget.targetId;
}

async function injectConvertToTypescriptJs(targetId: string) {
    logger.debug(chalk.blue(`🔄 Injecting injection script into SharedJSContext window (ID: ${targetId})...`));
    
    const client = await ChromeRemoteInterface({
        port: 8080,
        target: targetId,
    });
    
    // Inject the content of inject.js into the context of the target
    await client.Runtime.evaluate({
        expression: fs.readFileSync(convertToTsFilePath, 'utf8'),
    });
    
    client.close();
}

/**
 * Extracts TypeScript interface from a Steam client object
 */
async function extractInterface(
    targetId: string, 
    objectPath: string, 
    interfaceName: string,
): Promise<string> {
    logger.log(chalk.blue(`\n🔄 Extracting interface for ${chalk.bold(objectPath)} as ${chalk.bold(interfaceName)}...`));

    const client = await ChromeRemoteInterface({
        port: 8080,
        target: targetId,
    });
    
    // Extract domains we need
    const { Runtime } = client;
    
    // Enable the Runtime domain
    await Runtime.enable();

    // Execute the conversion function
    logger.debug(chalk.blue(`🔄 Converting ${chalk.bold(objectPath)} to TypeScript interface...`));
    
    const response = await Runtime.evaluate({
        expression: `window.convertToTypescript(${objectPath}, '${interfaceName}')`,
        returnByValue: true,
    });

    if (response.exceptionDetails) {
        await client.close();
        throw new Error(`Failed to convert object: ${JSON.stringify(response.exceptionDetails.exception)}`);
    }
    
    const interfaceContent = response.result.value;
    logger.debug(chalk.green('✅ Successfully generated TypeScript interface'));
    
    // Clean up
    await client.close();
    
    return interfaceContent;
}

type ValidateTypesOptions = {
    single?: string;
    verbose?: boolean;
};

async function run(options: ValidateTypesOptions) {
    const targetId = await getSharedJsContextTarget();
    if (!targetId) {
        process.exit(1);
    }

    await injectConvertToTypescriptJs(targetId);

    let maps = interfaceMaps;

    if (options.single) {
        const map = interfaceMaps.find(map => map.file === options.single);
        if (!map) {
            logger.error(chalk.red(`❌ Invalid object: ${options.single}`));
            process.exit(1);
        }

        maps = [map];
    }
    
    for (const map of maps) {
        const interfaceContent = await extractInterface(
            targetId,
            map.object,
            map.name,
        );

        let result = compareInterfaces(
            `src/types/${map.file}.ts`,
            map.name, interfaceContent,
            options.verbose,
        );

        // if ((result.addedMembers.length > 0 || result.removedMembers.length > 0) && maps.length > 1) {
        //     await confirm({message: `Are you done with "src/types/${map.file}"?`, theme: {prefix: '❓'}});
        // }
    }
}

/**
 * Main function
 */
async function main() {   
    const program = new Command();
    
    program
        .name('validate-types')
        .description('Extract and validate TypeScript interfaces from Steam client objects')
        .version('1.0.0');
    
    program
        .option('-s, --single <object>', 'Extract only one object interface specified by file path in maps.ts')
        .option('-v, --verbose', 'Enable verbose output')
        .action(async (options: ValidateTypesOptions) => {
            logger = new Logger(options);
            // try {
            logger.log(chalk.cyan('\n🔍 Steam Types Validator\n'));
            
            const startTime = performance.now();
            await run(options);
            const endTime = performance.now();
            
            logger.log(chalk.green('\n✅ Operation completed successfully'));
            logger.log(chalk.gray(`\nExecution time: ${((endTime - startTime) / 1000).toFixed(2)} seconds`));
            
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