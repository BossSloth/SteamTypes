import chalk from 'chalk';
import fs from 'fs';
import { IndentationText, Project, QuoteKind, SourceFile } from 'ts-morph';
import { Logger } from '../logger';
import { compareAndCorrectAllInterfaces } from './interface-comparator';
import { logger, setLogger } from './shared';

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
  }
});

// Function to parse TypeScript file and extract interface members
function extractInterfaceMembers(filePath: string): SourceFile {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return extractMembersFromString(fileContent);
}

function extractMembersFromString(interfaceString: string): SourceFile  {
  return project.createSourceFile(Math.random().toString(36).substring(2) + '.ts', interfaceString);
}

// Main function to compare interfaces
function compareInterfaces(
  filePath: string, 
  interfaceName: string,
  providedInterfaceString: string,
  verbose = false,
): string|null {
  setLogger(new Logger({verbose}));

  logger.debug(chalk.cyan(`🔄 Comparing interfaces for ${chalk.bold(interfaceName)}...`));
  
  // Extract members from the actual file
  logger.log(chalk.blue(`🔍 Extracting members from ${chalk.bold(filePath)} for interface ${chalk.bold(interfaceName)}...`));
  const targetSourceFile = extractInterfaceMembers(filePath);
  
  // Extract members from the provided interface string
  logger.debug(chalk.blue(`🔍 Extracting members from provided interface string...`));
  const sourceSourceFile = extractMembersFromString(providedInterfaceString);

  // Compare members and optionally apply changes
  // const result = editInterfaceToMatch(srcFileInfo.interfaceDeclaration, steamObjectInfo.interfaceDeclaration, srcFileInfo.sourceFile, filePath);
  const diff = compareAndCorrectAllInterfaces(targetSourceFile, sourceSourceFile, interfaceName, filePath)

  // Cleanup
  project.removeSourceFile(targetSourceFile);
  project.removeSourceFile(sourceSourceFile);

  return diff;
}

export { compareInterfaces };
