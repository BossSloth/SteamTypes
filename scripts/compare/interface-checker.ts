import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { IndentationText, Project, QuoteKind, SourceFile } from 'ts-morph';
import { __dirname } from '../dirname';
import { Logger } from '../logger';
import { compareAndCorrectAllInterfaces } from './interface-comparator';

const project = new Project({
  compilerOptions: {
    lib: ['ES2015'],
    declaration: true,
    emitDeclarationOnly: true,
  },
  useInMemoryFileSystem: true,
  manipulationSettings: {
    indentationText: IndentationText.TwoSpaces,
    useTrailingCommas: true,
    quoteKind: QuoteKind.Single,
  },
});

// Function to parse TypeScript file and extract interface members
function extractInterfaceMembers(filePath: string): SourceFile {
  const fileContent = fs.readFileSync(`${path.resolve(`${__dirname}/../`)}/${filePath}`, 'utf-8');

  return extractMembersFromString(fileContent);
}

function extractMembersFromString(interfaceString: string): SourceFile {
  return project.createSourceFile(`${Math.random().toString(36).substring(2)}.ts`, interfaceString);
}

// Main function to compare interfaces
async function compareInterfaces(
  filePath: string,
  comparisons: readonly { interfaceName: string; content: string }[],
  verbose = false,
): Promise<string | null> {
  const logger = new Logger({ verbose });

  const interfaceNames = comparisons.map((comparison) => comparison.interfaceName).join(', ');
  logger.debug(chalk.cyan(`🔄 Comparing interfaces for ${chalk.bold(interfaceNames)}...`));

  // Extract members from the actual file
  logger.debug(chalk.blue(`🔍 Extracting members from ${chalk.bold(filePath)} for interface ${chalk.bold(interfaceNames)}...`));
  const targetSourceFile = extractInterfaceMembers(filePath);

  // Extract members from the provided interface strings
  const sourceComparisons = comparisons.map((comparison) => {
    logger.debug(chalk.blue('🔍 Extracting members from provided interface string...'));

    return { interfaceName: comparison.interfaceName, sourceFile: extractMembersFromString(comparison.content) };
  });

  // Compare members and optionally apply changes
  try {
    return await compareAndCorrectAllInterfaces(targetSourceFile, sourceComparisons, filePath);
  } finally {
    project.removeSourceFile(targetSourceFile);
    for (const comparison of sourceComparisons) {
      project.removeSourceFile(comparison.sourceFile);
    }
  }
}

export { compareInterfaces };
