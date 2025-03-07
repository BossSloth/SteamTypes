import { TypeScriptInterface } from './types';
import { Type, InterfaceType, ArrayType, GenericType, UnionType } from './Type';

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

    }
  }
}

/**
 * Replaces interface references in a Type object based on the alias map
 * @param type Type object to update
 * @param aliasMap Map of original interface names to their merged equivalents
 * @returns Updated Type object
 */
function replaceTypeReferences(type: Type, aliasMap: Map<string, string>): Type {
  // Handle different types of Type objects
  if (type instanceof InterfaceType) {
    // Check if this interface has an alias
    const interfaceName = type.kind;
    const aliasedName = aliasMap.get(interfaceName);
    
    if (aliasedName) {
      return new InterfaceType(aliasedName);
    }
    
    return type;
  } 
  else if (type instanceof ArrayType) {
    // Recursively update the value type of the array
    const updatedValueType = replaceTypeReferences(type.valueType, aliasMap);
    return new ArrayType(updatedValueType);
  } 
  else if (type instanceof GenericType) {
    // Recursively update each type parameter
    const updatedTypeParams = type.typeParameters.map(param => 
      replaceTypeReferences(param, aliasMap)
    );
    
    return new GenericType(type.genericName, updatedTypeParams);
  } 
  else if (type instanceof UnionType) {
    // Recursively update each type in the union
    const updatedTypes = type.types.map(t => replaceTypeReferences(t, aliasMap));
    
    return new UnionType(updatedTypes);
  }
  
  // For primitive types and other types, return as is
  return type;
}
