import protobuf from 'protobufjs';
import { propertyStringSorter } from '../convert-to-typescript/interface-generation';
import { getCtx } from './conversion-context';
import { generateFieldComment } from './field-comments';
import { convertProtoTypeToTS, getFullTypeName } from './type-mapping';

function extractJsDocBody(comment: string): string[] {
  const lines = comment.split('\n');
  if (lines.length === 1) {
    const match = lines[0].match(/\/\*\*\s*(.*?)\s*\*\//);

    /* v8 ignore else -- @preserve */
    if (match?.[1] !== undefined && match[1] !== '') {
      return [`   * ${match[1]}`];
    }
  }

  // Multi-line: drop the opening /** and closing */ lines
  return lines.slice(1, -1);
}

function mergeJsDocComments(existing: string, fieldOptions: string): string {
  const existingBody = extractJsDocBody(existing);
  const optionsBody = extractJsDocBody(fieldOptions);

  return ['  /**', ...existingBody, '   *', ...optionsBody, '   */'].join('\n');
}

export function normalizeEnumValueName(valueName: string, originalEnumTypeName: string, finalEnumTypeName?: string): string {
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

export function generateEnumDefinition(enumType: protobuf.Enum, parentName?: string): string {
  const ctx = getCtx();
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

export function generateInterfaceDefinition(
  messageType: protobuf.Type,
  parentName?: string,
): string {
  const ctx = getCtx();
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
        comment = mergeJsDocComments(comment, fieldOptions);
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
