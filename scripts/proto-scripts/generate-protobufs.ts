import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path, { join } from 'path';
import protobuf, { NamespaceBase } from 'protobufjs';
import { propertyStringSorter } from '../convert-to-typescript/interface-generation';

const ROOT_DIR = path.resolve(`${__dirname}/../../`);
const PROTO_DIR = join(ROOT_DIR, 'scripts', 'Protobufs');
const OUTPUT_DIR = join(ROOT_DIR, 'src', 'types', 'Protobufs', 'steam');

const PROTOBUF_FILES = [
  'steam\\webuimessages_gamerecording.proto',
  'steam\\webuimessages_gamerecordingfiles.proto',
  'steam\\steammessages_gamerecording_objects.proto',
  'steam\\steammessages_base.proto',
  'steam\\steammessages_player.steamclient.proto',
  'steam\\enums.proto',
  'steam\\steammessages_appoverview.proto',
];

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

class ConversionContext {
  referencedTypes = new Set<string>();
  replacedNames = new Map<string, string>();
  importedTypes = new Map<string, Set<string>>();
  typeSourceFiles = new Map<string, string>();
  typeNameMap = new Map<string, string>();
  existingComments = new Map<string, Map<string, string>>();
  currentProtoFile: string;

  constructor(currentProtoFile: string) {
    this.currentProtoFile = currentProtoFile;
  }
}

let ctx: ConversionContext;

function getMessageTypes(ns: protobuf.Namespace): protobuf.Type[] {
  return ns.nestedArray.filter((n): n is protobuf.Type => n instanceof protobuf.Type);
}

function getEnumTypes(ns: protobuf.Namespace): protobuf.Enum[] {
  return ns.nestedArray.filter((n): n is protobuf.Enum => n instanceof protobuf.Enum);
}

function getNamespaces(ns: protobuf.Namespace): protobuf.Namespace[] {
  return ns.nestedArray.filter((n): n is protobuf.Namespace =>
    n instanceof protobuf.Namespace && !(n instanceof protobuf.Type) && !(n instanceof protobuf.Enum));
}

function buildParentChain(type: NamespaceBase, root: NamespaceBase): string[] {
  const chain: string[] = [];
  let current = type.parent;
  while (current !== null && current !== root && current instanceof protobuf.Type) {
    chain.unshift(current.name);
    current = current.parent;
  }

  return chain;
}

function getFullTypeName(parentName: string | undefined, typeName: string): string {
  return parentName !== undefined ? `${parentName}_${typeName}` : typeName;
}

function convertProtoTypeToTS(field: protobuf.Field): string {
  let tsType = TYPE_MAP[field.type];

  if (!tsType) {
    tsType = field.type.replace(/^\./g, '');

    if (tsType.includes('.')) {
      const names = tsType.split('.');
      let type: NamespaceBase = field.root;
      for (const name of names) {
        type = type.get(name) as NamespaceBase;
      }

      const parentChain = buildParentChain(type, field.root);
      tsType = parentChain.length > 0 ? `${parentChain.join('_')}_${type.name}` : type.name;
    }
    ctx.referencedTypes.add(tsType);
  }

  return field.repeated ? `${tsType}[]` : tsType;
}

function getImportPathForType(typeName: string): string | null {
  const sourceFile = ctx.typeSourceFiles.get(typeName);
  if (sourceFile === undefined || sourceFile.includes(ctx.currentProtoFile)) {
    return null;
  }

  const baseFileName = sourceFile.split('\\').pop()?.replace('.proto', '');

  return baseFileName !== undefined ? `./${baseFileName}` : null;
}

function normalizeEnumValueName(valueName: string, enumTypeName: string): string {
  let normalized = valueName;
  if (normalized.startsWith('k_')) {
    normalized = normalized.slice(2);
  }
  if (normalized.includes(enumTypeName)) {
    normalized = normalized.replace(`${enumTypeName}_`, '').replace(new RegExp(`^${enumTypeName}`), '');
  }

  return normalized;
}

function generateEnumDefinition(enumType: protobuf.Enum, parentName?: string): string {
  const baseEnumName = getFullTypeName(parentName, enumType.name);
  const enumName = ctx.replacedNames.get(baseEnumName) ?? baseEnumName;

  const entries = Object.entries(enumType.values).map(([name, value]) => `  ${normalizeEnumValueName(name, enumType.name)} = ${value},`);

  return `export enum ${enumName} {\n${entries.join('\n')}\n}`;
}

function generateInterfaceDefinition(
  messageType: protobuf.Type,
  parentName?: string,
): string {
  const interfaceName = getFullTypeName(parentName, messageType.name);

  if (parentName !== undefined) {
    ctx.typeNameMap.set(messageType.name, interfaceName);
  }

  const fields = messageType.fieldsArray.sort((a, b) => propertyStringSorter(a.name, b.name));
  const interfaceComments = ctx.existingComments.get(interfaceName);

  const fieldLines = fields.flatMap((field, index) => {
    const tsType = convertProtoTypeToTS(field);
    const optional = field.optional || !field.required ? '?' : '';
    const comment = interfaceComments?.get(field.name);

    const lines = comment !== undefined ? [comment] : [];
    lines.push(`  ${field.name}${optional}: ${tsType};`);

    if (index < fields.length - 1) {
      lines.push('');
    }

    return lines;
  });

  if (fieldLines.length === 0) {
    return `export interface ${interfaceName} { }`;
  }

  return `export interface ${interfaceName} {\n${fieldLines.join('\n')}\n}`;
}

function mapTypeToFile(
  typeName: string,
  filename: string | null,
  parentName?: string,
): void {
  if (filename === null) return;

  const fullName = getFullTypeName(parentName, typeName);
  ctx.typeSourceFiles.set(fullName, filename);

  if (parentName === undefined) {
    ctx.typeSourceFiles.set(typeName, filename);
  }
}

function mapAllTypesToFiles(ns: protobuf.Namespace, parentName?: string): void {
  for (const messageType of getMessageTypes(ns)) {
    mapTypeToFile(messageType.name, messageType.filename, parentName);
    if (messageType.nested) {
      mapAllTypesToFiles(messageType, getFullTypeName(parentName, messageType.name));
    }
  }

  for (const nestedNs of getNamespaces(ns)) {
    mapAllTypesToFiles(nestedNs, parentName);
  }

  for (const enumType of getEnumTypes(ns)) {
    mapTypeToFile(enumType.name, enumType.filename, parentName);

    if (enumType.name.startsWith('E')) {
      const normalizedName = enumType.name.slice(1);
      const fullEnumName = getFullTypeName(parentName, enumType.name);
      const fullNormalizedName = getFullTypeName(parentName, normalizedName);
      ctx.replacedNames.set(fullEnumName, fullNormalizedName);
    }
  }
}

function collectImportsAndReplaceNames(): void {
  for (const typeName of ctx.referencedTypes) {
    const importPath = getImportPathForType(typeName);
    if (importPath === null) continue;

    const finalTypeName = ctx.replacedNames.get(typeName) ?? typeName;
    const existingTypes = ctx.importedTypes.get(importPath);

    if (existingTypes) {
      existingTypes.add(finalTypeName);
    } else {
      ctx.importedTypes.set(importPath, new Set([finalTypeName]));
    }
  }
}

function generateImportStatements(): string[] {
  return Array.from(ctx.importedTypes.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([importPath, types]) => {
      const sortedTypes = Array.from(types).sort();

      return `import { ${sortedTypes.join(', ')} } from '${importPath}';`;
    });
}

function shouldSkipType(filename: string | null): boolean {
  return filename !== null && !filename.includes(ctx.currentProtoFile);
}

function processNamespace(ns: protobuf.Namespace, output: string[], parentName?: string): void {
  for (const messageType of getMessageTypes(ns)) {
    if (shouldSkipType(messageType.filename)) continue;

    output.push(generateInterfaceDefinition(messageType, parentName), '');

    if (messageType.nested) {
      const nestedParentName = getFullTypeName(parentName, messageType.name);
      processNamespace(messageType, output, nestedParentName);
    }
  }

  for (const nestedNs of getNamespaces(ns)) {
    processNamespace(nestedNs, output, parentName);
  }

  for (const enumType of getEnumTypes(ns)) {
    const fullEnumName = getFullTypeName(parentName, enumType.name);
    if (getImportPathForType(fullEnumName) !== null) continue;

    output.push(generateEnumDefinition(enumType, parentName), '');
  }
}

function parseExistingComments(filePath: string): void {
  if (!existsSync(filePath)) return;

  const lines = readFileSync(filePath, 'utf-8').split('\n');
  let currentInterface: string | null = null;
  let currentComment: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    const interfaceMatch = trimmed.match(/^export\s+(?:interface|enum)\s+(\w+)/);
    if (interfaceMatch) {
      currentInterface = interfaceMatch[1];
      if (!ctx.existingComments.has(currentInterface)) {
        ctx.existingComments.set(currentInterface, new Map());
      }
      currentComment = [];
      continue;
    }

    if (trimmed.startsWith('/**') || trimmed.startsWith('*') || trimmed.startsWith('*/')) {
      currentComment.push(line);
      continue;
    }

    if (currentInterface !== null && currentComment.length > 0) {
      const fieldMatch = trimmed.match(/^(\w+)\??:/);
      if (fieldMatch) {
        const interfaceMap = ctx.existingComments.get(currentInterface);
        interfaceMap?.set(fieldMatch[1], currentComment.join('\n'));
        currentComment = [];
        continue;
      }
    }

    if (!trimmed.startsWith('//') && trimmed && !trimmed.match(/^\w+\??:/)) {
      currentComment = [];
    }
  }
}

function applyNameReplacements(output: string[]): void {
  for (const [oldName, newName] of ctx.replacedNames) {
    for (let i = 0; i < output.length; i++) {
      output[i] = output[i].replaceAll(oldName, newName);
    }
  }

  for (const [originalName, prefixedName] of ctx.typeNameMap) {
    const regex = new RegExp(`\\b${originalName}\\b(?! = )`, 'g');
    for (let i = 0; i < output.length; i++) {
      output[i] = output[i].replace(regex, prefixedName);
    }
  }
}

function generateTypeScriptFromReflection(
  root: protobuf.Root,
  currentProtoFile: string,
  existingFilePath?: string,
): string {
  ctx = new ConversionContext(currentProtoFile);

  if (existingFilePath !== undefined) {
    parseExistingComments(existingFilePath);
  }

  const output: string[] = [];

  mapAllTypesToFiles(root);
  processNamespace(root, output);
  collectImportsAndReplaceNames();
  applyNameReplacements(output);

  const importStatements = generateImportStatements();

  if (importStatements.length > 0) {
    return `${importStatements.join('\n')}\n\n${output.join('\n')}`;
  }

  return output.join('\n');
}

function createProtoRoot(): protobuf.Root {
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

  return root;
}

function generateTypeScriptDefinitions(): void {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    console.log('🔍 Generating TypeScript definitions...');

    for (const protoFile of PROTOBUF_FILES) {
      const protoPath = join(PROTO_DIR, protoFile);
      const root = createProtoRoot();

      root.loadSync(protoPath, { keepCase: true });

      const outputFileName = protoFile.split('\\').pop()?.replace('.proto', '.ts');
      if (outputFileName === undefined) {
        throw new Error(`Failed to generate output file name for ${protoFile}`);
      }

      const outputFilePath = join(OUTPUT_DIR, outputFileName);
      const tsDefinitions = generateTypeScriptFromReflection(root, protoFile, outputFilePath);

      writeFileSync(outputFilePath, tsDefinitions, 'utf-8');
      console.log(`📦 Output: ${outputFilePath}`);
    }

    console.log('✅ TypeScript definitions generated successfully!');
  } catch (error) {
    console.error('❌ Failed to generate TypeScript definitions:', error);
    throw error;
  }
}

function main(): void {
  generateTypeScriptDefinitions();
}

if (require.main === module) {
  main();
}

export { generateTypeScriptDefinitions, generateTypeScriptFromReflection };
