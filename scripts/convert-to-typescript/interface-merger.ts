/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import { updateTypeReferences } from './replace-duplicate-types';
import { Type, UnionType } from './Type';
import { FunctionInfo, InterfaceProperty, TypeScriptInterface } from './types';

const REQUIRED_OVERLAP = 0.65;

/**
 * Determines if two interfaces are similar enough to be merged
 * @param interface1 First interface to compare
 * @param interface2 Second interface to compare
 * @returns True if interfaces should be merged
 */
function shouldMergeInterfaces(
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
 * Merges interfaces within a group that have the same constructor
 * @param interfaces Map of interfaces
 * @param group Array of interface names to check
 * @returns Map of merged interfaces and alias map
 */
function mergeInterfacesWithinGroup(
  interfaces: Map<string, TypeScriptInterface>,
  group: string[],
): { mergedInterfaces: Map<string, TypeScriptInterface>; aliasMap: Map<string, string>; } {
  const mergedInterfaces = new Map<string, TypeScriptInterface>();
  const aliasMap = new Map<string, string>();

  // Group by constructorString
  const constructorGroups = new Map<string, string[]>();
  for (const interfaceName of group) {
    const interfaceObj = interfaces.get(interfaceName);
    if (!interfaceObj) continue;

    const constructorStr = interfaceObj.constructorString ?? '';
    const constructorGroup = constructorGroups.get(constructorStr) ?? [];
    constructorGroup.push(interfaceName);
    constructorGroups.set(constructorStr, constructorGroup);
  }

  // Merge interfaces with same constructor
  for (const constructorGroup of constructorGroups.values()) {
    if (constructorGroup.length === 1) {
      const name = constructorGroup[0];
      const interfaceObj = interfaces.get(name);
      if (interfaceObj) {
        mergedInterfaces.set(name, { ...interfaceObj });
      }
    } else {
      // Merge this sub-group
      const merged = mergeInterfaceGroup(interfaces, constructorGroup);
      mergedInterfaces.set(merged.name, merged);

      // Create aliases for the rest
      for (let i = 1; i < constructorGroup.length; i++) {
        aliasMap.set(constructorGroup[i], merged.name);
      }
    }
  }

  return { mergedInterfaces, aliasMap };
}

/**
 * Finds groups of interfaces that share the same inheritance hierarchy
 * Also handles nested inheritance (parent instances alongside child instances)
 * @param interfaces Map of interfaces to analyze
 * @returns Map of base constructor string to array of interface names
 */
function findInheritanceGroups(interfaces: Map<string, TypeScriptInterface>): Map<string, string[]> {
  const inheritanceGroups = new Map<string, string[]>();
  const constructorToNames = new Map<string, string[]>();

  // Build a map of constructor strings to interface names
  for (const [name, interfaceObj] of interfaces.entries()) {
    const constructorStr = interfaceObj.constructorString ?? '';
    if (constructorStr !== '') {
      const names = constructorToNames.get(constructorStr) ?? [];
      names.push(name);
      constructorToNames.set(constructorStr, names);
    }
  }

  // Find interfaces with extendedConstructorString
  for (const [name, interfaceObj] of interfaces.entries()) {
    const extendedConstructor = interfaceObj.extendedConstructorString ?? '';
    if (extendedConstructor === '') continue;

    const group = inheritanceGroups.get(extendedConstructor) ?? [];
    group.push(name);
    inheritanceGroups.set(extendedConstructor, group);

    // Check if the parent class instances are also in the data
    // (nested inheritance: parent instances alongside child instances)
    const parentInstances = constructorToNames.get(extendedConstructor) ?? [];
    for (const parentName of parentInstances) {
      if (!group.includes(parentName)) {
        group.push(parentName);
      }
    }
  }

  // Only keep groups with more than one interface
  for (const [key, group] of inheritanceGroups.entries()) {
    if (group.length <= 1) {
      inheritanceGroups.delete(key);
    }
  }

  return inheritanceGroups;
}

/**
 * Finds groups of interfaces that should be merged
 * @param interfaces Map of interfaces to analyze
 * @returns Array of interface groups that should be merged
 */
function findInterfaceGroups(interfaces: Map<string, TypeScriptInterface>): string[][] {
  const interfaceArray = Array.from(interfaces.entries());
  const groups: string[][] = [];
  const processedInterfaces = new Set<string>();

  // First pass: find groups of interfaces to merge
  for (let i = 0; i < interfaceArray.length; i++) {
    const [name1, interface1] = interfaceArray[i];

    // Skip if already processed
    if (processedInterfaces.has(name1)) continue;

    const group: string[] = [name1];

    for (let j = 0; j < interfaceArray.length; j++) {
      if (i === j) continue; // Skip self

      const [name2, interface2] = interfaceArray[j];

      // Skip if already processed
      if (processedInterfaces.has(name2)) continue;

      // Check if interfaces should be merged
      if (shouldMergeInterfaces(interface1, interface2)) {
        group.push(name2);
      }
    }

    // Only add groups with more than one interface
    if (group.length > 1) {
      groups.push(group);
      // Mark all interfaces in this group as processed
      for (const name of group) {
        processedInterfaces.add(name);
      }
    }
  }

  // Second pass: add remaining interfaces as individual groups
  for (const [name] of interfaceArray) {
    if (!processedInterfaces.has(name)) {
      groups.push([name]);
    }
  }

  return groups;
}

/**
 * Merges multiple versions of a property into a single property
 * @param propName Property name
 * @param propVersions Array of property versions
 * @returns Merged property
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
    type: types.length === 1 ? types[0] : new UnionType(types),
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
 * @param interfaces Map of all interfaces
 * @param group Array of interface names
 * @returns Map of property name to array of property versions
 */
function findCommonProperties(
  interfaces: Map<string, TypeScriptInterface>,
  group: string[],
): Map<string, InterfaceProperty[]> {
  const firstInterface = interfaces.get(group[0]);
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
    if (!currentInterface) continue;

    const currentPropNames = new Set(currentInterface.properties.map(p => p.name));

    // Remove properties that are not in the current interface
    for (const propName of commonProps.keys()) {
      if (!currentPropNames.has(propName)) {
        commonProps.delete(propName);
      } else {
        // Add the property version from this interface
        const prop = currentInterface.properties.find(p => p.name === propName);
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
 * @param interfaces Map of all interfaces
 * @param group Array of interface names in the inheritance group
 * @returns Array of common properties
 */
function extractBaseProperties(
  interfaces: Map<string, TypeScriptInterface>,
  group: string[],
): InterfaceProperty[] {
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
 * @param baseName Name for the base interface
 * @param baseProperties Properties for the base interface
 * @param order Order number for the interface
 * @returns The base interface
 */
function createBaseInterface(
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
 * @param derivedInterface The derived interface
 * @param baseProperties Properties to remove
 * @returns The interface with base properties removed
 */
function removeBaseProperties(
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
 * @param interfaces Map of all interfaces
 * @param group Array of interface names to merge
 * @returns The merged interface
 */

function mergeInterfaceGroup(
  interfaces: Map<string, TypeScriptInterface>,
  group: string[],
): TypeScriptInterface {
  if (group.length === 0) {
    throw new Error('Cannot merge empty group');
  }

  // Use the first interface as the base
  const baseName = group[0];
  const baseInterface = interfaces.get(baseName);

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
      type: types.length === 1 ? types[0] : new UnionType(types),
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
 * Creates base interface and derived interfaces for an inheritance group
 * @param groupMerged Merged interfaces from the group
 * @param mergedGroupNames Array of merged interface names
 * @param mergedInterfaces Map to add processed interfaces to
 * @param processedInheritance Set to track processed interfaces
 * @param inheritanceGroup Original inheritance group names
 * @param interfaces Original interfaces map to check for parent class
 */
function createBaseAndDerivedInterfaces(
  groupMerged: Map<string, TypeScriptInterface>,
  mergedGroupNames: string[],
  mergedInterfaces: Map<string, TypeScriptInterface>,
  processedInheritance: Set<string>,
  inheritanceGroup: string[],
  interfaces: Map<string, TypeScriptInterface>,
): void {
  const baseProperties = extractBaseProperties(groupMerged, mergedGroupNames);

  if (baseProperties.length === 0) {
    // No common properties - keep interfaces separate
    for (const interfaceName of mergedGroupNames) {
      const interfaceObj = groupMerged.get(interfaceName);
      if (interfaceObj) {
        mergedInterfaces.set(interfaceName, { ...interfaceObj });
        processedInheritance.add(interfaceName);
      }
    }

    for (const originalName of inheritanceGroup) {
      processedInheritance.add(originalName);
    }

    return;
  }

  // Check if any interface is the parent class
  // The parent is the one whose original instances don't have extendedConstructorString
  const firstInterface = groupMerged.get(mergedGroupNames[0]);
  if (!firstInterface) return;

  // Find which merged interface corresponds to the parent class
  // The parent is the one that has at least one original instance without extendedConstructorString
  let parentInterfaceName: string | undefined;
  for (const mergedName of mergedGroupNames) {
    const mergedInterface = groupMerged.get(mergedName);
    if (!mergedInterface) continue;

    // Check if any original instance that contributed to this merged interface
    // is a parent class instance (no extendedConstructorString)
    let hasParentInstance = false;
    for (const originalName of inheritanceGroup) {
      const originalInterface = interfaces.get(originalName);
      if (!originalInterface) continue;

      const constructorsMatch = mergedInterface.constructorString === originalInterface.constructorString;
      const extendedConstructor = originalInterface.extendedConstructorString ?? '';

      // Check if this original contributed to the current merged interface
      if (constructorsMatch) {
        // If it has no extendedConstructorString, it's a parent class instance
        if (extendedConstructor === '') {
          hasParentInstance = true;
          break;
        }
      }
    }

    if (hasParentInstance) {
      parentInterfaceName = mergedName;
      break;
    }
  }

  if (parentInterfaceName !== undefined) {
    // Use the parent interface as the base
    const parentInterface = groupMerged.get(parentInterfaceName);
    if (parentInterface) {
      mergedInterfaces.set(parentInterfaceName, { ...parentInterface });
      processedInheritance.add(parentInterfaceName);
    }

    // Make other interfaces extend the parent
    for (const interfaceName of mergedGroupNames) {
      if (interfaceName === parentInterfaceName) continue;

      const derivedInterface = groupMerged.get(interfaceName);
      if (!derivedInterface) continue;

      const parentProps = parentInterface?.properties ?? [];
      const updatedInterface = removeBaseProperties(derivedInterface, parentProps);
      updatedInterface.extends = parentInterfaceName;

      mergedInterfaces.set(interfaceName, updatedInterface);
      processedInheritance.add(interfaceName);
    }
  } else {
    // No parent interface in group - create a new base interface
    let baseName = firstInterface.name;
    if (firstInterface.nameCounter !== undefined) {
      baseName = baseName.substring(0, baseName.length - String(firstInterface.nameCounter).length);
    }
    const baseInterfaceName = `${baseName}Base`;

    const baseInterface = createBaseInterface(baseInterfaceName, baseProperties, firstInterface.order);
    mergedInterfaces.set(baseInterfaceName, baseInterface);

    for (const interfaceName of mergedGroupNames) {
      const derivedInterface = groupMerged.get(interfaceName);
      if (!derivedInterface) continue;

      const updatedInterface = removeBaseProperties(derivedInterface, baseProperties);
      updatedInterface.extends = baseInterfaceName;

      mergedInterfaces.set(interfaceName, updatedInterface);
      processedInheritance.add(interfaceName);
    }
  }

  for (const originalName of inheritanceGroup) {
    processedInheritance.add(originalName);
  }
}

/**
 * Processes inheritance group by creating base interface and updating derived interfaces
 * @param interfaces Original interfaces map
 * @param inheritanceGroup Array of interface names in the group
 * @param mergedInterfaces Map to add processed interfaces to
 * @param processedInheritance Set to track processed interfaces
 * @param aliasMap Map to track interface aliases
 */
function processInheritanceGroup(
  interfaces: Map<string, TypeScriptInterface>,
  inheritanceGroup: string[],
  mergedInterfaces: Map<string, TypeScriptInterface>,
  processedInheritance: Set<string>,
  aliasMap: Map<string, string>,
): void {
  // First, merge interfaces within the group that have the same constructorString
  const { mergedInterfaces: groupMerged, aliasMap: groupAliases } = mergeInterfacesWithinGroup(
    interfaces,
    inheritanceGroup,
  );

  // Update alias map
  for (const [oldName, newName] of groupAliases) {
    aliasMap.set(oldName, newName);
  }

  // Now work with the merged interfaces from this group
  const mergedGroupNames = Array.from(groupMerged.keys());

  // If all instances merged into a single interface, no need for a base interface
  if (mergedGroupNames.length === 1) {
    const interfaceName = mergedGroupNames[0];
    const interfaceObj = groupMerged.get(interfaceName);
    if (interfaceObj) {
      mergedInterfaces.set(interfaceName, { ...interfaceObj });
      processedInheritance.add(interfaceName);
    }

    // Mark all original interfaces as processed
    for (const originalName of inheritanceGroup) {
      processedInheritance.add(originalName);
    }

    return;
  }

  // Multiple distinct interfaces - check if they should share a base
  createBaseAndDerivedInterfaces(groupMerged, mergedGroupNames, mergedInterfaces, processedInheritance, inheritanceGroup, interfaces);
}

/**
 * Merges similar interfaces in the provided map
 * @param interfaces Map of interfaces to merge
 * @returns Map of merged interfaces
 */
export function mergeInterfaces(interfaces: Map<string, TypeScriptInterface>): Map<string, TypeScriptInterface> {
  const inheritanceGroups = findInheritanceGroups(interfaces);
  const groups = findInterfaceGroups(interfaces);
  const mergedInterfaces = new Map<string, TypeScriptInterface>();
  let aliasMap = new Map<string, string>();
  const processedInheritance = new Set<string>();

  // Handle inheritance groups
  for (const [, inheritanceGroup] of inheritanceGroups) {
    processInheritanceGroup(interfaces, inheritanceGroup, mergedInterfaces, processedInheritance, aliasMap);
  }

  // Process each group
  for (const group of groups) {
    const filteredGroup = group.filter(name => !processedInheritance.has(name));
    if (filteredGroup.length === 0) continue;

    if (filteredGroup.length === 1) {
      const name = filteredGroup[0];
      const interfaceObj = interfaces.get(name);
      if (!interfaceObj) {
        throw new Error(`Interface ${name} not found`);
      }
      mergedInterfaces.set(name, { ...interfaceObj });
    } else {
      const mergedInterface = mergeInterfaceGroup(interfaces, filteredGroup);
      mergedInterfaces.set(mergedInterface.name, mergedInterface);

      for (let i = 1; i < filteredGroup.length; i++) {
        aliasMap.set(filteredGroup[i], mergedInterface.name);
      }
    }
  }

  // Update all type references based on the alias map
  updateTypeReferences(mergedInterfaces, aliasMap);

  // Fix numbering for interfaces with similar names
  aliasMap = fixInterfaceNumbering(mergedInterfaces);

  // Update all references again
  updateTypeReferences(mergedInterfaces, aliasMap);

  return mergedInterfaces;
}

/**
 * Fixes the numbering of interfaces to ensure sequential numbering
 * @param interfaces Map of interfaces to fix numbering for
 */
function fixInterfaceNumbering(interfaces: Map<string, TypeScriptInterface>): Map<string, string> {
  // Group interfaces by their base name (without number)
  const interfaceGroups = new Map<string, string[]>();

  // Extract base names and group interfaces
  for (const name of interfaces.keys()) {
    // Use nameCounter if available, otherwise fall back to regex
    const interfaceObj = interfaces.get(name);
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

      if (!aInterface || !bInterface) {
        throw new Error(`Interface ${a} or ${b} not found`);
      }

      // If both have nameCounter, use that
      if (aInterface.nameCounter !== undefined && bInterface.nameCounter !== undefined) {
        return aInterface.nameCounter - bInterface.nameCounter;
      }

      // If only one has nameCounter, prioritize the one without (base interface)
      if (aInterface.nameCounter === undefined) return -1;
      if (bInterface.nameCounter === undefined) return 1;

      return 0;
    });

    // Rename the rest with sequential numbers
    for (let i = 1; i < group.length; i++) {
      const oldName = group[i];
      const newName = `${baseName}${i + 1}`;
      const interfaceObj = interfaces.get(oldName);

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
