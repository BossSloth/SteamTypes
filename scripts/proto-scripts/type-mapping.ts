import protobuf, { NamespaceBase } from 'protobufjs';
import { getCtx } from './conversion-context';

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

function buildParentChain(type: NamespaceBase, root: NamespaceBase): string[] {
  const chain: string[] = [];
  let current = type.parent;
  while (current !== null && current !== root && current instanceof protobuf.Type) {
    chain.unshift(current.name);
    current = current.parent;
  }

  return chain;
}

export function getFullTypeName(parentName: string | undefined, typeName: string): string {
  return parentName !== undefined ? `${parentName}_${typeName}` : typeName;
}

export function convertProtoTypeToTS(field: protobuf.Field): string {
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
      tsType = `${parentChain.join('_')}_${type.name}`;
    }
    getCtx().referencedTypes.add(tsType);
  }

  return field.repeated ? `${tsType}[]` : tsType;
}
