import { ArrayType, GenericType, InterfaceType, Type, UnionType } from '../Type';
import { FunctionInfo, InterfaceProperty, TypeScriptInterface } from '../types';

const REQUIRED_OVERLAP = 0.65;

/**
 * Shared mutable state threaded through the merge strategies.
 */
export interface MergeState {
  source: Map<string, TypeScriptInterface>;
  merged: Map<string, TypeScriptInterface>;
  processedInheritance: Set<string>;
  aliasMap: Map<string, string>;
}

/**
 * Determines if two interfaces are similar enough to be merged
 */
export function shouldMergeInterfaces(
  interface1: TypeScriptInterface,
  interface2: TypeScriptInterface,
): boolean {
  // Don't merge interfaces that have inheritance relationships
  // These will be handled separately to preserve the inheritance hierarchy
  if ((interface1.extendedConstructorString ?? '') !== '' || (interface2.extendedConstructorString ?? '') !== '') {
    return false;
  }

  if (interface1.constructorString !== interface2.constructorString) {
    return false;
  }

  // Don't merge interfaces derived from different protobuf classes
  if (interface1.protobufClassName !== interface2.protobufClassName) {
    return false;
  }

  // Don't merge interfaces if they have a property named proto, this is a special case
  if (interface1.properties.some(p => p.name === 'proto') || interface2.properties.some(p => p.name === 'proto')) {
    return false;
  }

  // Get property names from both interfaces
  const props1 = interface1.properties.map(p => p.name);
  const props2 = interface2.properties.map(p => p.name);

  // Calculate Jaccard similarity: intersection / union
  const intersection = props1.filter(prop => props2.includes(prop)).length;
  const union = props1.length + props2.length - intersection;

  // No properties in either interface
  if (union === 0) return true;

  // Calculate similarity score
  const similarityScore = intersection / union;

  // Return true if similarity score is greater than or equal to required overlap
  return similarityScore >= REQUIRED_OVERLAP;
}

/**
 * Merges multiple versions of a property into a single property
 */
function mergePropertyVersions(propName: string, propVersions: InterfaceProperty[]): InterfaceProperty {
  const types: Type[] = propVersions.map(p => p.type);
  let functionInfo: FunctionInfo | undefined;
  const jsDoc = new Set<string>();

  for (const property of propVersions) {
    if (property.functionInfo) {
      functionInfo = property.functionInfo;
    }
    if (property.jsDoc) {
      property.jsDoc.forEach(jsDocLine => jsDoc.add(jsDocLine));
    }
  }

  const mergedProperty: InterfaceProperty = {
    name: propName,
    type: UnionType.create(types),
    optional: propVersions.some(p => p.optional === true),
  };

  if (functionInfo) {
    mergedProperty.functionInfo = functionInfo;
  }

  if (jsDoc.size > 0) {
    mergedProperty.jsDoc = Array.from(jsDoc);
  }

  return mergedProperty;
}

/**
 * Finds common properties across all interfaces in a group
 */
function findCommonProperties(
  interfaces: Map<string, TypeScriptInterface>,
  group: string[],
): Map<string, InterfaceProperty[]> {
  const firstInterface = interfaces.get(group[0]);
  /* v8 ignore next -- @preserve */
  if (!firstInterface) {
    return new Map();
  }

  const firstProps = new Map(firstInterface.properties.map(p => [p.name, p]));
  const commonProps = new Map<string, InterfaceProperty[]>();

  // Initialize with properties from the first interface
  for (const [propName, prop] of firstProps) {
    commonProps.set(propName, [prop]);
  }

  // Check which properties are common across all interfaces
  for (let i = 1; i < group.length; i++) {
    const currentInterface = interfaces.get(group[i]);
    /* v8 ignore next -- @preserve */
    if (!currentInterface) continue;

    const currentPropNames = new Set(currentInterface.properties.map(p => p.name));

    // Remove properties that are not in the current interface
    for (const propName of commonProps.keys()) {
      if (!currentPropNames.has(propName)) {
        commonProps.delete(propName);
      } else {
        // Add the property version from this interface
        const prop = currentInterface.properties.find(p => p.name === propName);
        /* v8 ignore else -- @preserve */
        if (prop) {
          commonProps.get(propName)?.push(prop);
        }
      }
    }
  }

  return commonProps;
}

/**
 * Extracts common properties from a group of interfaces (base class properties)
 */
export function extractBaseProperties(
  interfaces: Map<string, TypeScriptInterface>,
  group: string[],
): InterfaceProperty[] {
  /* v8 ignore next -- @preserve */
  if (group.length === 0) {
    return [];
  }

  const commonProps = findCommonProperties(interfaces, group);

  // Merge the common properties
  const baseProperties: InterfaceProperty[] = [];
  for (const [propName, propVersions] of commonProps.entries()) {
    baseProperties.push(mergePropertyVersions(propName, propVersions));
  }

  return baseProperties;
}

/**
 * Creates a base interface for an inheritance group
 */
export function createBaseInterface(
  baseName: string,
  baseProperties: InterfaceProperty[],
  order: number,
): TypeScriptInterface {
  return {
    name: baseName,
    properties: baseProperties,
    order,
  };
}

/**
 * Removes base properties from a derived interface
 */
export function removeBaseProperties(
  derivedInterface: TypeScriptInterface,
  baseProperties: InterfaceProperty[],
): TypeScriptInterface {
  const basePropertyNames = new Set(baseProperties.map(p => p.name));
  const filteredProperties = derivedInterface.properties.filter(p => !basePropertyNames.has(p.name));

  return {
    ...derivedInterface,
    properties: filteredProperties,
  };
}

/**
 * Merges a group of interfaces into a single interface
 */
export function mergeInterfaceGroup(
  interfaces: Map<string, TypeScriptInterface>,
  group: string[],
): TypeScriptInterface {
  /* v8 ignore next -- @preserve */
  if (group.length === 0) {
    throw new Error('Cannot merge empty group');
  }

  // Use the first interface as the base
  const baseName = group[0];
  const baseInterface = interfaces.get(baseName);

  /* v8 ignore next -- @preserve */
  if (!baseInterface) {
    throw new Error(`Base interface ${baseName} not found`);
  }

  // Create a new merged interface
  const mergedInterface: TypeScriptInterface = {
    name: baseName,
    properties: [],
    order: baseInterface.order,
    extends: baseInterface.extends,
    nameCounter: baseInterface.nameCounter,
    constructorString: baseInterface.constructorString,
    extendedConstructorString: baseInterface.extendedConstructorString,
  };

  // Track all properties across all interfaces
  const allProperties = new Map<string, InterfaceProperty[]>();

  // First, collect all properties from all interfaces
  for (const interfaceName of group) {
    const currentInterface = interfaces.get(interfaceName);

    /* v8 ignore next -- @preserve */
    if (!currentInterface) {
      throw new Error(`Interface ${interfaceName} not found`);
    }

    for (const property of currentInterface.properties) {
      const existingProperties = allProperties.get(property.name);
      if (existingProperties) {
        existingProperties.push(property);
      } else {
        allProperties.set(property.name, [property]);
      }
    }
  }

  // Determine which properties are in the base interface
  const basePropertyNames = new Set(baseInterface.properties.map(p => p.name));

  // Now create the merged properties
  for (const [propertyName, propertyVersions] of allProperties.entries()) {
    // Determine if this property should be optional
    let isOptional = !basePropertyNames.has(propertyName)
      || propertyVersions.length < group.length;

    // Collect all types for this property
    let types: Type[] = [];
    let functionInfo: FunctionInfo | undefined;
    const jsDoc = new Set<string>();

    for (const property of propertyVersions) {
      types.push(property.type);

      // If any version has function info, use it
      if (property.functionInfo) {
        functionInfo = property.functionInfo;
      }
      if (property.jsDoc) {
        property.jsDoc.forEach(jsDocLine => jsDoc.add(jsDocLine));
      }
    }

    // If undefined is present, make the property optional and remove undefined from the types
    if (types.find(t => t.kind === 'undefined')) {
      isOptional = true;
      types = types.filter(t => t.kind !== 'undefined');
    }

    // Create the merged property with a union type if needed
    const mergedProperty: InterfaceProperty = {
      name: propertyName,
      type: UnionType.create(types),
      optional: isOptional,
    };

    // Add function info if present
    if (functionInfo) {
      mergedProperty.functionInfo = functionInfo;
    }

    // Add jsDoc if present
    if (jsDoc.size > 0) {
      mergedProperty.jsDoc = Array.from(jsDoc);
    }

    mergedInterface.properties.push(mergedProperty);
  }

  return mergedInterface;
}

/**
 * Fixes the numbering of interfaces to ensure sequential numbering
 */
export function fixInterfaceNumbering(interfaces: Map<string, TypeScriptInterface>): Map<string, string> {
  // Group interfaces by their base name (without number)
  const interfaceGroups = new Map<string, string[]>();

  // Extract base names and group interfaces
  for (const name of interfaces.keys()) {
    // Use nameCounter if available, otherwise fall back to regex
    const interfaceObj = interfaces.get(name);
    /* v8 ignore next -- @preserve */
    if (!interfaceObj) {
      throw new Error(`Interface ${name} not found`);
    }

    let baseName = name;

    if (interfaceObj.nameCounter !== undefined) {
      // If nameCounter is available, use it to determine the base name
      baseName = name.substring(0, name.length - String(interfaceObj.nameCounter).length);
    }

    const group = interfaceGroups.get(baseName) ?? [];
    interfaceGroups.set(baseName, [...group, name]);
  }

  const aliasMap = new Map<string, string>();

  // Process each group with more than one interface
  for (const [baseName, group] of interfaceGroups.entries()) {
    if (group.length <= 1) continue;

    // Sort interfaces by their nameCounter
    group.sort((a, b) => {
      const aInterface = interfaces.get(a);
      const bInterface = interfaces.get(b);

      /* v8 ignore next -- @preserve */
      if (!aInterface || !bInterface) {
        throw new Error(`Interface ${a} or ${b} not found`);
      }

      // If both have nameCounter, use that
      if (aInterface.nameCounter !== undefined && bInterface.nameCounter !== undefined) {
        return aInterface.nameCounter - bInterface.nameCounter;
      }

      // If only one has nameCounter, prioritize the one without (base interface)
      if (aInterface.nameCounter === undefined) return -1;

      /* v8 ignore next -- @preserve */
      if (bInterface.nameCounter !== undefined) {
        return 0;
      }

      return 1;
    });

    // Rename the rest with sequential numbers
    for (let i = 1; i < group.length; i++) {
      const oldName = group[i];
      const newName = `${baseName}${i + 1}`;
      const interfaceObj = interfaces.get(oldName);

      /* v8 ignore next -- @preserve */
      if (!interfaceObj) {
        throw new Error(`Interface ${oldName} not found`);
      }

      if (oldName !== newName) {
        interfaces.delete(oldName);
        interfaceObj.name = newName;
        interfaceObj.nameCounter = i + 1; // Update nameCounter to match the new name
        interfaces.set(newName, interfaceObj);
        aliasMap.set(oldName, newName);
      }
    }
  }

  return aliasMap;
}

/**
 * Updates type references in all interfaces based on the alias map
 */
export function updateTypeReferences(
  interfaces: Map<string, TypeScriptInterface>,
  aliasMap: Map<string, string>,
): void {
  // For each interface
  for (const [, interfaceObj] of interfaces.entries()) {
    // For each property in the interface
    for (const property of interfaceObj.properties) {
      // Update the property type
      property.type = replaceTypeReferences(property.type, aliasMap);
    }
  }
}

/**
 * Replaces interface references in a Type object based on the alias map
 */
function replaceTypeReferences(type: Type, aliasMap: Map<string, string>): Type {
  // Handle different types of Type objects
  if (type instanceof InterfaceType) {
    // Check if this interface has an alias
    const interfaceName = type.kind;
    const aliasedName = aliasMap.get(interfaceName);

    if (aliasedName !== undefined) {
      return new InterfaceType(aliasedName);
    }

    return type;
  } else if (type instanceof ArrayType) {
    // Recursively update the value type of the array
    const updatedValueType = replaceTypeReferences(type.valueType, aliasMap);

    return new ArrayType(updatedValueType);
  } else if (type instanceof GenericType) {
    // Recursively update each type parameter
    const updatedTypeParams = type.typeParameters.map(param => replaceTypeReferences(param, aliasMap));

    return new GenericType(type.genericName, updatedTypeParams);
  } else if (type instanceof UnionType) {
    // Recursively update each type in the union
    const updatedTypes = type.types.map(t => replaceTypeReferences(t, aliasMap));

    return new UnionType(updatedTypes);
  }

  // For primitive types and other types, return as is
  return type;
}
