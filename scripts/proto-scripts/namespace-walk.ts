import protobuf from 'protobufjs';
import { getCtx } from './conversion-context';
import { getImportPathForType } from './imports';
import { generateEnumDefinition, generateInterfaceDefinition } from './interface-emitter';
import { getFullTypeName } from './type-mapping';

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

function shouldSkipType(filename: string | null): boolean {
  return filename !== null && !filename.includes(getCtx().currentProtoFile);
}

function mapTypeToFile(
  typeName: string,
  filename: string | null,
  parentName?: string,
): void {
  /* v8 ignore next -- @preserve */
  if (filename === null) return;

  const ctx = getCtx();
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

export function mapAllTypesToFiles(ns: protobuf.Namespace, parentName?: string): void {
  const ctx = getCtx();
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

export function processNamespace(ns: protobuf.Namespace, output: string[], parentName?: string): void {
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
