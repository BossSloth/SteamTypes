import { NameAllocator } from '../session/NameAllocator';
import { ArrayType, GenericType, InterfaceType, NumberRecordType, Type, UnionType } from '../Type';
import { TypeScriptInterface } from '../types';
import { formatPropertyName } from '../utils';

/**
 * Resolves every {@link NumberRecordType} in the merged interfaces after merging: records whose values all
 * resolved to the same type stay `Record<number, V>`, the rest are turned back into numeric-keyed interfaces.
 * Name allocation is lazy on purpose (a collapsed record must not consume a name/counter).
 */
export function resolveNumberRecords(interfaces: Map<string, TypeScriptInterface>, names: NameAllocator): void {
  for (const interfaceObject of Array.from(interfaces.values())) {
    for (const property of interfaceObject.properties) {
      property.type = resolveType(property.type, interfaces, names);
    }
  }
}

function resolveType(type: Type, interfaces: Map<string, TypeScriptInterface>, names: NameAllocator): Type {
  if (type instanceof NumberRecordType) {
    const resolvedEntries = type.entries.map(
      ([key, entryType]) => [key, resolveType(entryType, interfaces, names)] as [string, Type],
    );
    const record = new NumberRecordType(resolvedEntries, type.source);
    if (!(record.valueType instanceof UnionType)) {
      return record;
    }

    const { interfaceName, nameCounter } = names.allocateForObject(
      record.source.value,
      record.source.path,
      record.source.isCollectionItem,
    );
    interfaces.set(interfaceName, {
      name: interfaceName,
      nameCounter,
      order: record.source.order,
      properties: resolvedEntries.map(([key, entryType]) => ({ name: formatPropertyName(key), type: entryType })),
    });

    return new InterfaceType(interfaceName);
  }

  if (type instanceof ArrayType) {
    return new ArrayType(resolveType(type.valueType, interfaces, names));
  }

  if (type instanceof GenericType) {
    return new GenericType(
      type.genericName,
      type.typeParameters.map((param) => resolveType(param, interfaces, names)),
    );
  }

  if (type instanceof UnionType) {
    return new UnionType(type.types.map((unionMember) => resolveType(unionMember, interfaces, names)));
  }

  return type;
}
