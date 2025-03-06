import { updateTypeReferences } from './replace-duplicate-types';
import { FunctionInfo, InterfaceProperty, TypeScriptInterface } from './types';

/**
 * Determines if two interfaces are similar enough to be merged
 * @param interface1 First interface to compare
 * @param interface2 Second interface to compare
 * @param minCommonProperties Minimum number of common properties required for merging
 * @returns True if interfaces should be merged
 */
export function shouldMergeInterfaces(
  interface1: TypeScriptInterface,
  interface2: TypeScriptInterface,
  minCommonProperties: number = 3
): boolean {
  // Get property names from both interfaces
  const props1 = new Set(interface1.properties.map(p => p.name));
  const props2 = new Set(interface2.properties.map(p => p.name));
  
  // Find common properties
  let commonCount = 0;
  for (const prop of props1) {
    if (props2.has(prop)) {
      commonCount++;
    }
    if (commonCount >= minCommonProperties) return true;
  }
  
  return commonCount >= minCommonProperties;
}

/**
 * Finds groups of interfaces that should be merged
 * @param interfaces Map of interfaces to analyze
 * @param minCommonProperties Minimum number of common properties required for merging
 * @returns Array of interface groups that should be merged
 */
export function findInterfaceGroups(
  interfaces: Map<string, TypeScriptInterface>,
  minCommonProperties: number = 3
): string[][] {
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
      if (shouldMergeInterfaces(interface1, interface2, minCommonProperties)) {
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
 * Merges a group of interfaces into a single interface
 * @param interfaces Map of all interfaces
 * @param group Array of interface names to merge
 * @returns The merged interface
 */
export function mergeInterfaceGroup(
  interfaces: Map<string, TypeScriptInterface>,
  group: string[]
): TypeScriptInterface {
  if (group.length === 0) {
    throw new Error('Cannot merge empty group');
  }
  
  // Use the first interface as the base
  const baseName = group[0];
  const baseInterface = interfaces.get(baseName)!;
  
  // Create a new merged interface
  const mergedInterface: TypeScriptInterface = {
    name: baseName,
    properties: []
  };
  
  // Track all properties across all interfaces
  const allProperties = new Map<string, InterfaceProperty[]>();
  
  // First, collect all properties from all interfaces
  for (const interfaceName of group) {
    const currentInterface = interfaces.get(interfaceName)!;
    
    for (const property of currentInterface.properties) {
      if (!allProperties.has(property.name)) {
        allProperties.set(property.name, []);
      }
      
      allProperties.get(property.name)!.push(property);
    }
  }
  
  // Determine which properties are in the base interface
  const basePropertyNames = new Set(baseInterface.properties.map(p => p.name));
  
  // Now create the merged properties
  for (const [propertyName, propertyVersions] of allProperties.entries()) {
    // Determine if this property should be optional
    const isOptional = !basePropertyNames.has(propertyName) || 
                       propertyVersions.length < group.length;
    
    // Collect all unique types for this property
    const types = new Set<string>();
    let functionInfo: FunctionInfo|undefined = undefined;
    
    for (const property of propertyVersions) {
      types.add(property.type);
      
      // If any version has function info, use it
      if (property.functionInfo) {
        functionInfo = property.functionInfo;
      }
    }
    
    // Create the merged property
    const mergedProperty: InterfaceProperty = {
      name: propertyName,
      type: Array.from(types).join(' | '),
      optional: isOptional,
    };
    
    // Add function info if present
    if (functionInfo) {
      mergedProperty.functionInfo = functionInfo;
    }
    
    mergedInterface.properties.push(mergedProperty);
  }
  
  return mergedInterface;
}

/**
 * Merges similar interfaces in the provided map
 * @param interfaces Map of interfaces to merge
 * @param minCommonProperties Minimum number of common properties required for merging
 * @returns Map of merged interfaces
 */
export function mergeInterfaces(
  interfaces: Map<string, TypeScriptInterface>,
  minCommonProperties: number = 3
): Map<string, TypeScriptInterface> {
  // Find groups of interfaces to merge
  const groups = findInterfaceGroups(interfaces, minCommonProperties);
  
  // Create a new map for the merged interfaces
  const mergedInterfaces = new Map<string, TypeScriptInterface>();
  
  // Create a map of original interface names to their merged equivalents
  const aliasMap = new Map<string, string>();
  
  // Process each group
  for (const group of groups) {
    if (group.length === 1) {
      // If group has only one interface, just copy it
      const name = group[0];
      mergedInterfaces.set(name, { ...interfaces.get(name)! });
    } else {
      // Merge the group
      const mergedInterface = mergeInterfaceGroup(interfaces, group);
      
      // Add the merged interface under its original name
      mergedInterfaces.set(mergedInterface.name, mergedInterface);
      
      // For all other interfaces in the group, create aliases
      for (let i = 1; i < group.length; i++) {
        const aliasName = group[i];
        aliasMap.set(aliasName, mergedInterface.name);
        mergedInterfaces.set(aliasName, mergedInterface); //TODO: this line maybe isn't needed
      }
    }
  }
  
  // Update all type references based on the alias map
  updateTypeReferences(mergedInterfaces, aliasMap);
  
  return mergedInterfaces;
}
