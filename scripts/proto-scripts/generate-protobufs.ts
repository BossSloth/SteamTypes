/**
 * Generate TypeScript interfaces from protobuf using protobufjs AST
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path, { join } from 'path';
import protobuf, { NamespaceBase } from 'protobufjs';
import { propertyStringSorter } from '../convert-to-typescript/interface-generation';

// Paths
const ROOT_DIR = path.resolve(`${__dirname}/../../`);
const PROTO_DIR = join(ROOT_DIR, 'scripts', 'Protobufs');
const OUTPUT_DIR = join(ROOT_DIR, 'src', 'types', 'Protobufs', 'steam');

const protobufFiles = [
  'steam\\webuimessages_gamerecording.proto',
  'steam\\steammessages_base.proto',
  'steam\\steammessages_player.steamclient.proto',
];

const filteredFilePaths = [
  'steam\\steammessages_base.proto',
  'google\\protobuf',
];

// Type mapping from proto to TypeScript
const TYPE_MAP: Record<string, string> = {
  string: 'string',
  bytes: 'Uint8Array',
  bool: 'boolean',
  int32: 'number',
  int64: 'number',
  uint32: 'number',
  uint64: 'number',
  sint32: 'number',
  sint64: 'number',
  fixed32: 'number',
  fixed64: 'string',
  sfixed32: 'number',
  sfixed64: 'string',
  double: 'number',
  float: 'number',
};

let referencedTypes = new Set<string>();
let replacedNames = new Map<string, string>();
let importedTypes = new Map<string, Set<string>>();
let typeSourceFiles = new Map<string, string>();

function convertProtoTypeToTS(field: protobuf.Field): string {
  let tsType: string;

  // Check if it's a basic type
  if (TYPE_MAP[field.type]) {
    tsType = TYPE_MAP[field.type];
  } else {
    // It's a reference to another message or enum
    tsType = field.type.replace(/^\./g, '');

    const dotMatches = tsType.match(/\./g);
    if (dotMatches && dotMatches.length >= 1) {
      // This is a type reference from another namespace
      const names = tsType.split('.');
      let type: NamespaceBase = field.root;
      for (const name of names) {
        type = type.get(name) as NamespaceBase;
      }

      tsType = type.name;
    }
    referencedTypes.add(tsType);
  }

  // Handle repeated fields
  if (field.repeated) {
    tsType = `${tsType}[]`;
  }

  return tsType;
}

function getImportPathForType(typeName: string, filePathFilters: string[]): string | null {
  const sourceFile = typeSourceFiles.get(typeName);
  if (sourceFile === undefined) {
    return null;
  }

  // Check if this type is from a filtered file (external dependency)
  for (const filterPath of filePathFilters) {
    if (sourceFile.includes(filterPath)) {
      // Extract the base filename from the filter path
      const baseFileName = filterPath.split('\\').pop()?.replace('.proto', '');
      if (baseFileName === undefined) {
        continue;
      }

      return `./${baseFileName}`;
    }
  }

  return null;
}

function generateEnumDefinition(enumType: protobuf.Enum): string {
  let enumName = enumType.name;
  if (enumType.name.startsWith('E')) {
    enumName = enumType.name.slice(1);
    replacedNames.set(enumType.name, enumName);
  }

  const lines: string[] = [];
  lines.push(`export enum ${enumName} {`);

  for (const [name, value] of Object.entries(enumType.values)) {
    let valueName = name;
    if (valueName.startsWith('k_')) {
      valueName = valueName.slice(2);
    }

    if (valueName.includes(enumType.name)) {
      valueName = valueName.replace(`${enumType.name}_`, '');
    }

    lines.push(`  ${valueName} = ${value},`);
  }

  lines.push('}');

  return lines.join('\n');
}

function generateInterfaceDefinition(messageType: protobuf.Type): string {
  const fields = messageType.fieldsArray;

  const lines: string[] = [];
  lines.push(`export interface ${messageType.name} {`);

  fields.sort(propertySorter);

  // Generate fields
  for (const field of fields) {
    const tsType = convertProtoTypeToTS(field);
    const optional = field.optional || !field.required ? '?' : '';
    lines.push(`  ${field.name}${optional}: ${tsType};`);
  }

  lines.push('}');

  return lines.join('\n');
}

function propertySorter(a: protobuf.Field, b: protobuf.Field): number {
  return propertyStringSorter(a.name, b.name);
}

function mapAllTypesToFiles(ns: protobuf.Namespace): void {
  for (const messageType of ns.nestedArray.filter((n): n is protobuf.Type => n instanceof protobuf.Type)) {
    const { filename } = messageType;
    if (filename !== null) {
      typeSourceFiles.set(messageType.name, filename);
    }
    if (messageType.nested !== undefined) {
      mapAllTypesToFiles(messageType);
    }
  }

  for (const nestedNs of ns.nestedArray.filter((n): n is protobuf.Namespace =>
    n instanceof protobuf.Namespace && !(n instanceof protobuf.Type) && !(n instanceof protobuf.Enum))) {
    mapAllTypesToFiles(nestedNs);
  }

  for (const enumType of ns.nestedArray.filter((n): n is protobuf.Enum => n instanceof protobuf.Enum)) {
    const { filename } = enumType;
    if (filename !== null) {
      typeSourceFiles.set(enumType.name, filename);
    }
  }
}

function collectImportsAndReplaceNames(filePathFilters: string[]): void {
  // Track imported types during generation
  for (const typeName of referencedTypes) {
    const importPath = getImportPathForType(typeName, filePathFilters);
    if (importPath !== null) {
      const existingTypes = importedTypes.get(importPath);
      if (existingTypes === undefined) {
        importedTypes.set(importPath, new Set([typeName]));
      } else {
        existingTypes.add(typeName);
      }
    }
  }

  // Apply name replacements
  for (const [key, value] of replacedNames) {
    // Also update imported types
    for (const [, types] of importedTypes) {
      if (types.has(key)) {
        types.delete(key);
        types.add(value);
      }
    }
  }
}

function generateImportStatements(): string[] {
  const importStatements: string[] = [];
  const sortedImports = Array.from(importedTypes.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  for (const [importPath, types] of sortedImports) {
    const sortedTypes = Array.from(types).sort();
    importStatements.push(`import { ${sortedTypes.join(', ')} } from '${importPath}';`);
  }

  return importStatements;
}

function processNamespace(ns: protobuf.Namespace, filePathFilters: string[], output: string[]): void {
  // Process messages (convert to interfaces)
  for (const messageType of ns.nestedArray.filter((n): n is protobuf.Type => n instanceof protobuf.Type)) {
    if (filePathFilters.some(filePath => messageType.filename?.includes(filePath) === true)) {
      continue;
    }
    const interfaceDefinition = generateInterfaceDefinition(messageType);
    if (interfaceDefinition) {
      output.push(interfaceDefinition);
      output.push(''); // Empty line
    }

    // Process nested types
    if (messageType.nested) {
      processNamespace(messageType, filePathFilters, output);
    }
  }

  // Process nested namespaces
  for (const nestedNs of ns.nestedArray.filter((n): n is protobuf.Namespace =>
    n instanceof protobuf.Namespace && !(n instanceof protobuf.Type) && !(n instanceof protobuf.Enum))) {
    processNamespace(nestedNs, filePathFilters, output);
  }

  // Process enums
  for (const enumType of ns.nestedArray.filter((n): n is protobuf.Enum => n instanceof protobuf.Enum)) {
    if (!referencedTypes.has(enumType.name)) {
      continue;
    }

    // Skip if this enum should be imported from another file
    const importPath = getImportPathForType(enumType.name, filePathFilters);
    if (importPath !== null) {
      // Normalize the enum name (remove 'E' prefix if present)
      let normalizedName = enumType.name;
      if (enumType.name.startsWith('E')) {
        normalizedName = enumType.name.slice(1);
      }

      const existingTypes = importedTypes.get(importPath);
      if (existingTypes === undefined) {
        importedTypes.set(importPath, new Set([normalizedName]));
      } else {
        existingTypes.add(normalizedName);
      }
      continue;
    }

    output.push(generateEnumDefinition(enumType));
    output.push(''); // Empty line
  }
}

function generateTypeScriptFromReflection(root: protobuf.Root, filePathFilters: string[]): string {
  // Reset global state for each conversion
  referencedTypes = new Set<string>();
  replacedNames = new Map<string, string>();
  importedTypes = new Map<string, Set<string>>();
  typeSourceFiles = new Map<string, string>();

  const output: string[] = [];

  // First pass: Map all types to their source files
  mapAllTypesToFiles(root);

  processNamespace(root, filePathFilters, output);

  // Collect imports and apply name replacements
  collectImportsAndReplaceNames(filePathFilters);

  // Apply name replacements to output
  for (const [key, value] of replacedNames) {
    for (let i = 0; i < output.length; i++) {
      output[i] = output[i].replaceAll(key, value);
    }
  }

  // Generate import statements
  const importStatements = generateImportStatements();

  if (importStatements.length > 0) {
    return `${importStatements.join('\n')}\n\n${output.join('\n')}`;
  }

  return output.join('\n');
}

function generateTypeScriptDefinitions(): void {
  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    console.log('🔍 Generating TypeScript definitions...');
    // Generate TypeScript definitions
    for (const protoFile of protobufFiles) {
      const protoPath = join(PROTO_DIR, protoFile);

      const root = new protobuf.Root();
      root.resolvePath = (origin: string, target: string): string => {
        if (path.isAbsolute(target)) {
          return target;
        }
        const relativePath = path.join(path.dirname(origin), target);
        if (existsSync(relativePath)) {
          return relativePath;
        }

        return path.join(PROTO_DIR, target);
      };

      root.loadSync(protoPath, {
        keepCase: true,
      });
      const tsDefinitions = generateTypeScriptFromReflection(
        root,
        filteredFilePaths.filter(filePath => filePath !== protoFile),
      );

      const outputFileName = protoFile.split('\\').pop()?.replace('.proto', '.ts');

      if (outputFileName === undefined) {
        throw new Error(`Failed to generate output file name for ${protoFile}`);
      }

      const outputFilePath = join(OUTPUT_DIR, outputFileName);

      // Write to file
      writeFileSync(outputFilePath, tsDefinitions, 'utf-8');
      console.log(`📦 Output: ${outputFilePath}`);
    }

    console.log('✅ TypeScript definitions generated successfully!');
  } catch (error) {
    console.error('❌ Failed to generate TypeScript definitions:', error);
    throw error;
  }
}

/**
 * Main execution
 */
function main(): void {
  generateTypeScriptDefinitions();
}

// Run the example
if (require.main === module) {
  main();
}

export { generateTypeScriptDefinitions, generateTypeScriptFromReflection };
