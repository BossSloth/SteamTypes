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

const PROTO_FILE = join(PROTO_DIR, 'steam', 'webuimessages_gamerecording.proto');
const OUTPUT_TS = join(OUTPUT_DIR, 'webuimessages_gamerecording.d.ts');

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
  fixed64: 'number',
  sfixed32: 'number',
  sfixed64: 'number',
  double: 'number',
  float: 'number',
};

let referencedTypes = new Set<string>();
let replacedNames = new Map<string, string>();

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

  if (fields.length === 0) {
    return '';
  }

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

function generateTypeScriptFromReflection(root: protobuf.Root, filePathFilters: string[]): string {
  // Reset global state for each conversion
  referencedTypes = new Set<string>();
  replacedNames = new Map<string, string>();

  const output: string[] = [];

  function processNamespace(ns: protobuf.Namespace): void {
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
        processNamespace(messageType);
      }
    }

    // Process nested namespaces
    for (const nestedNs of ns.nestedArray.filter((n): n is protobuf.Namespace =>
      n instanceof protobuf.Namespace && !(n instanceof protobuf.Type) && !(n instanceof protobuf.Enum))) {
      processNamespace(nestedNs);
    }

    // Process enums
    for (const enumType of ns.nestedArray.filter((n): n is protobuf.Enum => n instanceof protobuf.Enum)) {
      if (!referencedTypes.has(enumType.name)) {
        continue;
      }

      output.push(generateEnumDefinition(enumType));
      output.push(''); // Empty line
    }
  }

  processNamespace(root);

  for (const [key, value] of replacedNames) {
    for (let i = 0; i < output.length; i++) {
      output[i] = output[i].replaceAll(key, value);
    }
  }

  return output.join('\n');
}

function generateTypeScriptDefinitions(): void {
  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    // Load proto file
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

    root.loadSync(PROTO_FILE, {
      keepCase: true,
    });

    console.log('🔍 Generating TypeScript definitions...');

    // Generate TypeScript definitions
    const tsDefinitions = generateTypeScriptFromReflection(root, filteredFilePaths);

    // Write to file
    writeFileSync(OUTPUT_TS, tsDefinitions, 'utf-8');

    console.log('✅ TypeScript definitions generated successfully!');
    console.log(`📦 Output: ${OUTPUT_TS}`);
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
