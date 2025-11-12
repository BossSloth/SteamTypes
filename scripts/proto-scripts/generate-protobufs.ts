/* eslint-disable max-lines-per-function */
import chalk from 'chalk';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'fs';
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
  'steam\\steammessages_client_objects.proto',
  'steam\\steammessages_clientsettings.proto',
  'steam\\steammessages_store.steamclient.proto',
  'steam\\contenthubs.proto',
  'steam\\steammessages_storebrowse.steamclient.proto',
  'steam\\enums_productinfo.proto',
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

function normalizeEnumValueName(valueName: string, originalEnumTypeName: string, finalEnumTypeName?: string): string {
  let normalized = valueName;
  if (normalized.startsWith('k_')) {
    normalized = normalized.slice(2);
  }

  // Try to remove the original enum name prefix
  if (normalized.includes(originalEnumTypeName)) {
    normalized = normalized.replace(`${originalEnumTypeName}_`, '').replace(new RegExp(`^${originalEnumTypeName}`), '');
  }

  // Also try to remove the final enum name prefix (if different from original)
  if (finalEnumTypeName !== undefined && finalEnumTypeName !== originalEnumTypeName && normalized.includes(finalEnumTypeName)) {
    normalized = normalized.replace(`${finalEnumTypeName}_`, '').replace(new RegExp(`^${finalEnumTypeName}`), '');
  }

  return normalized;
}

const optionTranslations: Record<string, string> = {
  '(setting_description)': 'Setting description',
  '(setting_name)': 'Setting name',
  '(setting_default_bool)': 'Default',
  '(setting_default_int)': 'Default',
  '(setting_default_uint)': 'Default',
  '(setting_default_float)': 'Default',
  '(setting_default_string)': 'Default',
  '(setting_store)': 'Setting store',
  '(setting_pre_login)': 'Setting pre-login',
  '(setting_readonly)': 'Setting readonly',
  '(setting_profile_mode)': 'Setting profile mode',
  '(setting_clamp_min)': 'Setting clamp min',
  '(setting_clamp_max)': 'Setting clamp max',
};

const blacklistedOptions = new Set(['default']);

function generateFieldComment(field: protobuf.Field): string | undefined {
  const options = field.options;
  if (!options) return undefined;

  const commentParts: string[] = [];

  const rawOptions = field.toJSON().options ?? {};

  // eslint-disable-next-line prefer-const
  for (let [key, value] of Object.entries(rawOptions)) {
    if (blacklistedOptions.has(key)) continue;

    if (key === '(setting_default_string)') {
      value = `"${value}"`;
    }

    const translation = optionTranslations[key] ?? key;
    commentParts.push(`${translation}: ${(value as string | number | boolean).toString().replace(/\t/g, ' ')}`);
  }

  if (commentParts.length === 0) return undefined;

  commentParts.unshift('@Options');

  const commentLines = ['  /**'];
  for (const part of commentParts) {
    commentLines.push(`   * ${part}`);
  }
  commentLines.push('   */');

  return commentLines.join('\n');
}

function generateEnumDefinition(enumType: protobuf.Enum, parentName?: string): string {
  const baseEnumName = getFullTypeName(parentName, enumType.name);
  const enumName = ctx.replacedNames.get(baseEnumName) ?? baseEnumName;

  const entries = Object.entries(enumType.values).map(([name, value]) =>
    `  ${normalizeEnumValueName(name, enumType.name, enumName)} = ${value},`);

  const enumComments = ctx.existingComments.get(enumName);
  const enumComment = enumComments?.get('__interface_comment');
  const result: string[] = [];

  if (enumComment !== undefined) {
    result.push(enumComment);
  }

  result.push(`export enum ${enumName} {\n${entries.join('\n')}\n}`);

  return result.join('\n');
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

  // Start with interface-level comment if it exists
  const interfaceComment = interfaceComments?.get('__interface_comment');
  const result: string[] = [];

  if (interfaceComment !== undefined) {
    result.push(interfaceComment);
  }

  const fieldLines = fields.flatMap((field, index) => {
    const tsType = convertProtoTypeToTS(field);
    const optional = field.optional || !field.required ? '?' : '';

    let comment = interfaceComments?.get(field.name);
    if (comment?.includes('@Options') === true) {
      comment = undefined;
    }

    const fieldOptions = generateFieldComment(field);
    if (fieldOptions !== undefined) {
      if (comment === undefined) {
        comment = fieldOptions;
      } else {
        comment += `\n${fieldOptions}`;
      }
    }

    const lines = comment !== undefined ? [comment] : [];
    lines.push(`  ${field.name}${optional}: ${tsType};`);

    if (index < fields.length - 1) {
      lines.push('');
    }

    return lines;
  });

  if (fieldLines.length === 0) {
    result.push(`export interface ${interfaceName} { }`);

    return result.join('\n');
  }

  result.push(`export interface ${interfaceName} {\n${fieldLines.join('\n')}\n}`);

  return result.join('\n');
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

function collectInterfaceNames(ns: protobuf.Namespace, parentName?: string): Set<string> {
  const interfaceNames = new Set<string>();

  for (const messageType of getMessageTypes(ns)) {
    if (shouldSkipType(messageType.filename)) continue;

    const interfaceName = getFullTypeName(parentName, messageType.name);
    interfaceNames.add(interfaceName);

    if (messageType.nested) {
      const nestedParentName = getFullTypeName(parentName, messageType.name);
      const nestedNames = collectInterfaceNames(messageType, nestedParentName);
      nestedNames.forEach(name => interfaceNames.add(name));
    }
  }

  for (const nestedNs of getNamespaces(ns)) {
    const nestedNames = collectInterfaceNames(nestedNs, parentName);
    nestedNames.forEach(name => interfaceNames.add(name));
  }

  return interfaceNames;
}

function mapAllTypesToFiles(ns: protobuf.Namespace, parentName?: string): void {
  // First collect all interface names to check for conflicts
  const interfaceNames = collectInterfaceNames(ns, parentName);

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

      // Only remove the "E" prefix if there isn't already an interface with the same name
      if (!interfaceNames.has(fullNormalizedName)) {
        ctx.replacedNames.set(fullEnumName, fullNormalizedName);
      }
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
      // If we have a pending comment, save it before resetting
      if (currentComment.length > 0) {
        currentInterface = interfaceMatch[1];
        if (!ctx.existingComments.has(currentInterface)) {
          ctx.existingComments.set(currentInterface, new Map());
        }
        // Store the interface-level comment with a special key
        const interfaceMap = ctx.existingComments.get(currentInterface);
        interfaceMap?.set('__interface_comment', currentComment.join('\n'));
        currentComment = [];
      } else {
        currentInterface = interfaceMatch[1];
        if (!ctx.existingComments.has(currentInterface)) {
          ctx.existingComments.set(currentInterface, new Map());
        }
        currentComment = [];
      }
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
  // Display a nice header
  console.log('');
  console.log(chalk.magenta.bold('╔══════════════════════════════════════════════════════╗'));
  console.log(chalk.magenta.bold('║            Steam Types Protobuf Generator            ║'));
  console.log(chalk.magenta.bold('╚══════════════════════════════════════════════════════╝'));
  console.log('');

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(chalk.cyan(`📁 Created output directory: ${OUTPUT_DIR}`));
    console.log('');
  }

  const startTime = performance.now();

  try {
    console.log(chalk.blue.bold('🔍 Generating TypeScript definitions...'));
    console.log(chalk.gray(`Processing ${PROTOBUF_FILES.length} protobuf files...`));
    console.log('');

    let processedCount = 0;
    let totalSizeKB = 0;
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

      // Get file size for display
      const stats = statSync(outputFilePath);
      const fileSizeKB = stats.size / 1024;
      totalSizeKB += fileSizeKB;

      processedCount++;
      const progress = chalk.yellow(`[${processedCount}/${PROTOBUF_FILES.length}]`);
      console.log(chalk.green(`📦 ${progress} Generated: ${chalk.white(outputFileName)} ${chalk.gray(`(${fileSizeKB.toFixed(1)} KB)`)}`));
    }

    console.log('');
    console.log(chalk.green.bold('✅ TypeScript definitions generated successfully!'));
    console.log(chalk.gray(`📊 Processed ${processedCount} files in ${chalk.cyan(path.basename(OUTPUT_DIR))} directory`));
    console.log(chalk.gray(`📏 Total output size: ${chalk.yellow(totalSizeKB.toFixed(1))} KB`));
  } catch (error) {
    console.error('');
    console.error(chalk.red.bold('❌ Failed to generate TypeScript definitions:'));
    console.error(chalk.red(`   ${error as Error}`));
    throw error;
  } finally {
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    console.log(chalk.cyan(`⏱️  Completed in ${duration}ms`));
    console.log('');
  }
}

function main(): void {
  generateTypeScriptDefinitions();
}

if (require.main === module) {
  main();
}

export { generateTypeScriptDefinitions, generateTypeScriptFromReflection };
