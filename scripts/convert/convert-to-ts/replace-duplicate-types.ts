import { TypeScriptInterface } from './types';

/**
 * Updates type references in all interfaces based on the alias map
 * @param interfaces Map of interfaces to update
 * @param aliasMap Map of original interface names to their merged equivalents
 */
export function updateTypeReferences(
  interfaces: Map<string, TypeScriptInterface>,
  aliasMap: Map<string, string>,
): void {
  // For each interface
  for (const [_, interfaceObj] of interfaces.entries()) {
    // For each property in the interface
    for (const property of interfaceObj.properties) {
      // Update the property type
      property.type = replaceTypeReferences(property.type, aliasMap);

      // Update function parameter types and return type if present
      // if (property.functionInfo) {
      //   property.functionInfo.returnType = replaceTypeReferences(property.functionInfo.returnType, aliasMap);

      //   for (const param of property.functionInfo.params) {
      //     param.type = replaceTypeReferences(param.type, aliasMap);
      //   }
      // }
    }
  }
}

/**
 * Replaces interface references in a type string based on the alias map
 * @param typeStr Type string to update
 * @param aliasMap Map of original interface names to their merged equivalents
 * @returns Updated type string
 */
function replaceTypeReferences(typeStr: string, aliasMap: Map<string, string>): string {
  //TODO: This now mostly works, but there are still some issues with it
  // - array of array don't work same with set of array or any other combination
  // - maps and sets don't work
  let updatedType = typeStr;

  // Handle array types with union types, e.g. (Type1 | Type2)[] -> Type1[]
  const arrayUnionRegex = /\(([^\(\)]+)\)\[\]/g;
  updatedType = updatedType.replace(arrayUnionRegex, (match, unionTypes) => {
    // Split the union types
    const types = unionTypes.split('|').map((t) => t.trim());

    // Check if all types map to the same merged interface
    const mergedTypes = new Set<string>();
    for (const type of types) {
      const mergedType = aliasMap.get(type.match(/\b(.+?)\b/)?.[1]) || type;
      mergedTypes.add(mergedType);
    }

    // If all types map to the same merged interface, use that
    if (mergedTypes.size === 1) {
      return `${Array.from(mergedTypes)[0]}[]`;
    }

    // Otherwise, update each type in the union
    const updatedUnion = types.map((type) => aliasMap.get(type) || type).join(' | ');
    return `(${updatedUnion})[]`;
  });

  // Handle generic types, e.g. Map<string, Type1> -> Map<string, MergedType>
  const genericRegex = /<([^<>]+)>/g;
  updatedType = updatedType.replace(genericRegex, (match, genericParams) => {
    // Split the generic parameters by comma, but only at the top level
    const params: string[] = [];
    let currentParam = '';
    let angleBracketDepth = 0;

    for (let i = 0; i < genericParams.length; i++) {
      const char = genericParams[i];

      if (char === '<') {
        angleBracketDepth++;
        currentParam += char;
      } else if (char === '>') {
        angleBracketDepth--;
        currentParam += char;
      } else if (char === ',' && angleBracketDepth === 0) {
        params.push(currentParam.trim());
        currentParam = '';
      } else {
        currentParam += char;
      }
    }

    if (currentParam.trim()) {
      params.push(currentParam.trim());
    }

    // Update each parameter
    const updatedParams = params.map((param) => replaceTypeReferences(param, aliasMap));

    return `<${updatedParams.join(', ')}>`;
  });

  // Handle union types, e.g. Type1 | Type2 -> MergedType
  if (updatedType.includes(' | ') && !updatedType.includes('[]')) {
    const types = updatedType.split('|').map((t) => t.trim());
    // const types = updatedType.split('|').map((t) => t.trim().match(/\b(.+?)\b/)?.[1]); //TODO: potential fix but sometimes map < goes missing

    // Check if all types map to the same merged interface
    const mergedTypes = new Set<string>();
    for (const type of types) {
      if (type === undefined) continue;
      const mergedType = aliasMap.get(type) || type;
      mergedTypes.add(mergedType);
    }

    // If all types map to the same merged interface, use that
    if (mergedTypes.size === 1) {
      return Array.from(mergedTypes)[0];
    }

    // Otherwise, update each type in the union
    const updatedUnion = types.map((type) => aliasMap.get(type) || type).join(' | ');
    return updatedUnion;
  }

  // Handle simple interface references
  for (const [original, merged] of aliasMap.entries()) {
    // Use word boundary regex to avoid partial matches
    const regex = new RegExp(`\\b${original}\\b`, 'g');
    updatedType = updatedType.replace(regex, merged);
  }

  return updatedType;
}
