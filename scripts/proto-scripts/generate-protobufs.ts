/**
 * Generate TypeScript interfaces from protobuf using protobufjs AST
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path, { join } from 'path';
import protobuf, { NamespaceBase } from 'protobufjs';
import { propertyStringSorter } from '../convert-to-typescript/interface-generation';

// Paths
const ROOT_DIR = path.resolve(`${__dirname}/../../`);
const PROTO_DIR = join(ROOT_DIR, 'scripts', 'Protobufs');
const OUTPUT_DIR = join(ROOT_DIR, 'src', 'types', 'Protobufs', 'steam');

const protobufFiles = [
  'steam\\webuimessages_gamerecording.proto',
  'steam\\webuimessages_gamerecordingfiles.proto',
  'steam\\steammessages_gamerecording_objects.proto',
  'steam\\steammessages_base.proto',
  'steam\\steammessages_player.steamclient.proto',
  'steam\\enums.proto',
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
let typeNameMap = new Map<string, string>(); // Maps original type names to their prefixed names
let existingComments = new Map<string, Map<string, string>>(); // Maps interface/enum names to field comments
let currentProtoFile: string;

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

      // For nested types, construct the full prefixed name
      // by building the parent chain
      const parentChain: string[] = [];
      let current = type.parent;
      while (current !== null && current !== field.root && current instanceof protobuf.Type) {
        parentChain.unshift(current.name);
        current = current.parent;
      }

      tsType = parentChain.length > 0 ? `${parentChain.join('_')}_${type.name}` : type.name;
    }
    referencedTypes.add(tsType);
  }

  // Handle repeated fields
  if (field.repeated) {
    tsType = `${tsType}[]`;
  }

  return tsType;
}

function getImportPathForType(typeName: string): string | null {
  const sourceFile = typeSourceFiles.get(typeName);
  if (sourceFile === undefined) {
    return null;
  }

  // Check if this type is from a different proto file that's being processed
  if (!sourceFile.includes(currentProtoFile)) {
    // Extract the base filename from the source file
    const baseFileName = sourceFile.split('\\').pop()?.replace('.proto', '');
    if (baseFileName !== undefined) {
      return `./${baseFileName}`;
    }
  }

  return null;
}

function generateEnumDefinition(enumType: protobuf.Enum, parentName?: string): string {
  // Generate the enum name with parent prefix if nested
  const baseEnumName = parentName !== undefined && parentName !== '' ? `${parentName}_${enumType.name}` : enumType.name;
  // Get the normalized name (already tracked in mapAllTypesToFiles with E prefix removal)
  const enumName = replacedNames.get(baseEnumName) ?? baseEnumName;

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

function generateInterfaceDefinition(messageType: protobuf.Type, parentName?: string): string {
  const fields = messageType.fieldsArray;

  // Generate the interface name with parent prefix if nested
  const interfaceName = parentName !== undefined && parentName !== '' ? `${parentName}_${messageType.name}` : messageType.name;

  // Track the mapping from original name to prefixed name
  if (parentName !== undefined && parentName !== '') {
    typeNameMap.set(messageType.name, interfaceName);
  }

  const lines: string[] = [];
  lines.push(`export interface ${interfaceName} {`);

  fields.sort(propertySorter);

  // Get existing comments for this interface
  const interfaceComments = existingComments.get(interfaceName);

  // Generate fields
  for (const field of fields) {
    const tsType = convertProtoTypeToTS(field);
    const optional = field.optional || !field.required ? '?' : '';

    // Add existing comment if available
    const comment = interfaceComments?.get(field.name);
    if (comment !== undefined) {
      lines.push(comment);
    }

    lines.push(`  ${field.name}${optional}: ${tsType};`);

    // Add empty line after field if not last field
    if (field !== fields[fields.length - 1]) {
      lines.push('');
    }
  }

  lines.push('}');

  return lines.join('\n');
}

function propertySorter(a: protobuf.Field, b: protobuf.Field): number {
  return propertyStringSorter(a.name, b.name);
}

function mapAllTypesToFiles(ns: protobuf.Namespace, parentName?: string): void {
  for (const messageType of ns.nestedArray.filter((n): n is protobuf.Type => n instanceof protobuf.Type)) {
    const { filename } = messageType;
    // Use prefixed name for nested types to avoid collisions
    const fullName = parentName !== undefined && parentName !== '' ? `${parentName}_${messageType.name}` : messageType.name;
    if (filename !== null) {
      typeSourceFiles.set(fullName, filename);
      // Also store the base name if it's not a nested type
      if (parentName === undefined || parentName === '') {
        typeSourceFiles.set(messageType.name, filename);
      }
    }
    if (messageType.nested !== undefined) {
      mapAllTypesToFiles(messageType, fullName);
    }
  }

  for (const nestedNs of ns.nestedArray.filter((n): n is protobuf.Namespace =>
    n instanceof protobuf.Namespace && !(n instanceof protobuf.Type) && !(n instanceof protobuf.Enum))) {
    mapAllTypesToFiles(nestedNs, parentName);
  }

  for (const enumType of ns.nestedArray.filter((n): n is protobuf.Enum => n instanceof protobuf.Enum)) {
    const { filename } = enumType;
    // Use prefixed name for nested enums to avoid collisions
    const fullEnumName = parentName !== undefined && parentName !== '' ? `${parentName}_${enumType.name}` : enumType.name;
    if (filename !== null) {
      typeSourceFiles.set(fullEnumName, filename);
      // Also store the base name if it's not a nested enum
      if (parentName === undefined || parentName === '') {
        typeSourceFiles.set(enumType.name, filename);
      }
    }
    // Track enum renames (E prefix removal) - use the full name for nested enums
    if (enumType.name.startsWith('E')) {
      const normalizedName = enumType.name.slice(1);
      const fullNormalizedName = parentName !== undefined && parentName !== '' ? `${parentName}_${normalizedName}` : normalizedName;
      replacedNames.set(fullEnumName, fullNormalizedName);
    }
  }
}

function collectImportsAndReplaceNames(): void {
  // Track imported types during generation
  for (const typeName of referencedTypes) {
    const importPath = getImportPathForType(typeName);
    if (importPath !== null) {
      // Check if this type has been renamed (e.g., enum with E prefix removed)
      const finalTypeName = replacedNames.get(typeName) ?? typeName;

      const existingTypes = importedTypes.get(importPath);
      if (existingTypes === undefined) {
        importedTypes.set(importPath, new Set([finalTypeName]));
      } else {
        existingTypes.add(finalTypeName);
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

function processNamespace(ns: protobuf.Namespace, output: string[], parentName?: string): void {
  // Process messages (convert to interfaces)
  for (const messageType of ns.nestedArray.filter((n): n is protobuf.Type => n instanceof protobuf.Type)) {
    // Skip messages that come from imported files (not the current proto file being processed)
    if (messageType.filename !== null && !messageType.filename.includes(currentProtoFile)) {
      continue;
    }

    const interfaceDefinition = generateInterfaceDefinition(messageType, parentName);
    if (interfaceDefinition) {
      output.push(interfaceDefinition);
      output.push(''); // Empty line
    }

    // Process nested types with current message as parent
    if (messageType.nested) {
      const nestedParentName = parentName !== undefined ? `${parentName}_${messageType.name}` : messageType.name;
      processNamespace(messageType, output, nestedParentName);
    }
  }

  // Process nested namespaces
  for (const nestedNs of ns.nestedArray.filter((n): n is protobuf.Namespace =>
    n instanceof protobuf.Namespace && !(n instanceof protobuf.Type) && !(n instanceof protobuf.Enum))) {
    processNamespace(nestedNs, output);
  }

  // Process enums
  for (const enumType of ns.nestedArray.filter((n): n is protobuf.Enum => n instanceof protobuf.Enum)) {
    // Generate the full enum name with parent prefix if nested
    const fullEnumName = parentName !== undefined && parentName !== '' ? `${parentName}_${enumType.name}` : enumType.name;
    // Skip if this enum should be imported from another file
    const importPath = getImportPathForType(fullEnumName);
    if (importPath !== null) {
      continue;
    }

    output.push(generateEnumDefinition(enumType, parentName));
    output.push(''); // Empty line
  }
}

function parseExistingComments(filePath: string): void {
  if (!existsSync(filePath)) {
    return;
  }

  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let currentInterface: string | null = null;
  let currentComment: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect interface/enum declaration
    const interfaceMatch = trimmed.match(/^export\s+(?:interface|enum)\s+(\w+)/);
    if (interfaceMatch !== null) {
      currentInterface = interfaceMatch[1];
      if (!existingComments.has(currentInterface)) {
        existingComments.set(currentInterface, new Map());
      }
      currentComment = [];
      continue;
    }

    // Collect JSDoc comments
    if (trimmed.startsWith('/**') || trimmed.startsWith('*') || trimmed.startsWith('*/')) {
      currentComment.push(line);
      continue;
    }

    // Detect field with preceding comment
    if (currentInterface !== null && currentComment.length > 0) {
      const fieldMatch = trimmed.match(/^(\w+)\??:/);
      if (fieldMatch !== null) {
        const fieldName = fieldMatch[1];
        const interfaceMap = existingComments.get(currentInterface);
        if (interfaceMap !== undefined) {
          interfaceMap.set(fieldName, currentComment.join('\n'));
        }
        currentComment = [];
        continue;
      }
    }

    // Reset comment if we hit a non-comment, non-field line
    if (!trimmed.startsWith('//') && trimmed !== '' && !trimmed.match(/^\w+\??:/)) {
      currentComment = [];
    }
  }
}

function generateTypeScriptFromReflection(root: protobuf.Root, _currentProtoFile: string, existingFilePath?: string): string {
  // Reset global state for each conversion
  referencedTypes = new Set<string>();
  replacedNames = new Map<string, string>();
  importedTypes = new Map<string, Set<string>>();
  typeSourceFiles = new Map<string, string>();
  typeNameMap = new Map<string, string>();
  existingComments = new Map<string, Map<string, string>>();
  currentProtoFile = _currentProtoFile;

  // Parse existing comments if file exists
  if (existingFilePath !== undefined) {
    parseExistingComments(existingFilePath);
  }

  const output: string[] = [];

  // First pass: Map all types to their source files
  mapAllTypesToFiles(root);

  processNamespace(root, output);

  // Collect imports and apply name replacements
  collectImportsAndReplaceNames();

  // Apply name replacements to output (for enum renames only)
  for (const [key, value] of replacedNames) {
    for (let i = 0; i < output.length; i++) {
      output[i] = output[i].replaceAll(key, value);
    }
  }

  // Apply type name mappings for nested types
  for (const [originalName, prefixedName] of typeNameMap) {
    for (let i = 0; i < output.length; i++) {
      // Use word boundaries to avoid partial replacements
      const regex = new RegExp(`\\b${originalName}\\b(?! = )`, 'g');
      output[i] = output[i].replace(regex, prefixedName);
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

      const outputFileName = protoFile.split('\\').pop()?.replace('.proto', '.ts');
      if (outputFileName === undefined) {
        throw new Error(`Failed to generate output file name for ${protoFile}`);
      }
      const outputFilePath = join(OUTPUT_DIR, outputFileName);

      const tsDefinitions = generateTypeScriptFromReflection(
        root,
        protoFile,
        outputFilePath,
      );

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
