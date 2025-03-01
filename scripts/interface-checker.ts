#!/usr/bin/env bun
/**
 * Interface Checker Script
 * 
 * This script compares an interface definition with its actual implementation
 * to identify added or removed functions/properties.
 * 
 * Usage:
 *   bun interface-checker.ts --file <interface-file> --name <interface-name> --compare <interface-string-file>
 * 
 * Example:
 *   bun interface-checker.ts --file src/SteamClient/App.ts --name Apps --compare extracted/Apps.ts
 */

import fs from 'fs';
import ts from 'typescript';
import { Command } from 'commander';
import chalk from 'chalk';
import { Logger } from './logger';

let logger: Logger;

// Function to parse TypeScript file and extract interface members
function extractInterfaceMembers(filePath: string, interfaceName: string): string[] {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return extractMembersFromString(fileContent, interfaceName);
}

function extractMembersFromString(interfaceString: string, interfaceName: string): string[] {
  const sourceFile = ts.createSourceFile(
    '',
    interfaceString,
    ts.ScriptTarget.Latest,
    true
  );

  const members: string[] = [];

  function visit(node: ts.Node) {
    if (
      ts.isInterfaceDeclaration(node) &&
      node.name.text === interfaceName
    ) {
      node.members.forEach((member) => {
        if (ts.isPropertySignature(member) || ts.isMethodSignature(member)) {
          if (member.name && ts.isIdentifier(member.name)) {
            members.push(member.name.text);
          }
        }
      });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  
  if (members.length === 0) {
    logger.error(chalk.yellow(`⚠️  Warning: No members found for interface ${chalk.bold(interfaceName)}`));
  } else {
    logger.debug(chalk.green(`✅ Found ${chalk.bold(members.length)} members in the interface`));
  }
  
  return members;
}

// Main function to compare interfaces
function compareInterfaces(
  filePath: string, 
  interfaceName: string, 
  providedInterfaceString: string,
  verbose: boolean = false,
): { addedMembers: string[]; removedMembers: string[] } {
  logger = new Logger({verbose});

  logger.debug(chalk.cyan(`\n🔄 Comparing interfaces for ${chalk.bold(interfaceName)}...\n`));
  
  // Extract members from the actual file
  logger.log(chalk.blue(`🔍 Extracting members from ${chalk.bold(filePath)} for interface ${chalk.bold(interfaceName)}...`));
  const srcFileMembers = extractInterfaceMembers(filePath, interfaceName);
  
  // Extract members from the provided interface string
  logger.debug(chalk.blue(`🔍 Extracting members from provided interface string...`));
  const steamObjectMembers = extractMembersFromString(providedInterfaceString, interfaceName);

  // Find added members (in actual but not in provided)
  const addedMembers = steamObjectMembers.filter(
    (member) => !srcFileMembers.includes(member)
  );

  // Find removed members (in provided but not in actual)
  const removedMembers = srcFileMembers.filter(
    (member) => !steamObjectMembers.includes(member)
  );

  // Print results
  logger.log(chalk.cyan(`\n=== ${chalk.bold('Interface Comparison Results')} ===\n`));
  
  logger.log(`📊 ${chalk.bold('Statistics:')}`);
  logger.log(`  • Total members in ${filePath} file: ${chalk.bold(srcFileMembers.length)}`);
  logger.log(`  • Total members in steam object: ${chalk.bold(steamObjectMembers.length)}`);
  logger.log(`  • Added members: ${chalk.bold(addedMembers.length)}`);
  logger.log(`  • Removed members: ${chalk.bold(removedMembers.length)}\n`);

  if (addedMembers.length > 0) {
    logger.log(chalk.green(`➕ ${chalk.bold('Members added')} in steam object but missing in src file:`));
    addedMembers.forEach((member) => logger.log(`  • ${chalk.green(member)}`));
    logger.log('');
  } else {
    logger.log(`➕ No members added in the steam object.\n`);
  }

  if (removedMembers.length > 0) {
    logger.log(chalk.red(`➖ ${chalk.bold('Members removed')} from steam object but present in src file:`));
    removedMembers.forEach((member) => logger.log(`  • ${chalk.red(member)}`));
    logger.log('');
  } else {
    logger.log(`➖ No members removed from the steam object.\n`);
  }

  if (addedMembers.length === 0 && removedMembers.length === 0) {
    logger.log(chalk.green(`✅ ${chalk.bold('SUCCESS:')} The interfaces match perfectly!`));
  } else {
    logger.log(chalk.yellow(`⚠️  ${chalk.bold('ATTENTION:')} The interfaces have differences that need to be addressed.`));
  }

  return {
    addedMembers,
    removedMembers,
  };
}

// Command-line interface using Commander
function main() {
  const program = new Command();
  
  program
    .name('interface-checker')
    .description('Compare TypeScript interface definitions with their implementations')
    .version('1.0.0');
  
  program
    .requiredOption('-f, --file <path>', 'Path to the TypeScript interface file')
    .requiredOption('-n, --name <name>', 'Name of the interface to check')
    .requiredOption('-c, --compare <path>', 'Path to the file containing the interface string to compare against')
    .option('-v, --verbose', 'Enable verbose output')
    .action((options) => {
      logger = new Logger(options);
      try {
        logger.log(chalk.cyan('\n🔍 Interface Checker Tool\n'));
        
        if (!fs.existsSync(options.file)) {
          logger.error(chalk.red(`❌ Error: Interface file not found: ${options.file}`));
          process.exit(1);
        }
        
        if (!fs.existsSync(options.compare)) {
          logger.error(chalk.red(`❌ Error: Compare file not found: ${options.compare}`));
          process.exit(1);
        }
        
        const interfaceString = fs.readFileSync(options.compare, 'utf-8');
        compareInterfaces(options.file, options.name, interfaceString, options.verbose);
      } catch (error) {
        logger.error(chalk.red(`\n❌ Error: ${error.message}`));
        process.exit(1);
      }
    });
  
  program.parse();
}

// Check if this script is being run directly
if (require.main === module) {
  main();
}

export { compareInterfaces, extractInterfaceMembers, extractMembersFromString };
