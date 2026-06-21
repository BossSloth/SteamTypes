/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import { TypeScriptInterface } from '../types';
import { createBaseInterface, extractBaseProperties, mergeInterfaceGroup, MergeState, removeBaseProperties } from './merge-helpers';

/**
 * Merges interfaces that share an inheritance hierarchy, extracting a base
 * interface for their common properties where appropriate.
 */
export class InheritanceMergeStrategy {
  private readonly state: MergeState;

  constructor(state: MergeState) {
    this.state = state;
  }

  public apply(): void {
    const inheritanceGroups = findInheritanceGroups(this.state.source);

    for (const [, inheritanceGroup] of inheritanceGroups) {
      processInheritanceGroup(this.state.source, inheritanceGroup, this.state.merged, this.state.processedInheritance, this.state.aliasMap);
    }
  }
}

/**
 * Finds groups of interfaces that share the same inheritance hierarchy
 * Also handles nested inheritance (parent instances alongside child instances)
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
 * Merges interfaces within a group that have the same constructor
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
    /* v8 ignore next -- @preserve */
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
      /* v8 ignore next -- @preserve */
      if (!interfaceObj) continue;
      mergedInterfaces.set(name, { ...interfaceObj });
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
 * Creates base interface and derived interfaces for an inheritance group
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
      /* v8 ignore else -- @preserve */
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
  /* v8 ignore next -- @preserve */
  if (!firstInterface) return;

  // Find which merged interface corresponds to the parent class
  // The parent is the one that has at least one original instance without extendedConstructorString
  let parentInterfaceName: string | undefined;
  for (const mergedName of mergedGroupNames) {
    const mergedInterface = groupMerged.get(mergedName);
    /* v8 ignore next -- @preserve */
    if (!mergedInterface) continue;

    // Check if any original instance that contributed to this merged interface
    // is a parent class instance (no extendedConstructorString)
    let hasParentInstance = false;
    for (const originalName of inheritanceGroup) {
      const originalInterface = interfaces.get(originalName);
      /* v8 ignore next -- @preserve */
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
    /* v8 ignore next -- @preserve */
    if (!parentInterface) {
      return;
    }
    mergedInterfaces.set(parentInterfaceName, { ...parentInterface });
    processedInheritance.add(parentInterfaceName);

    // Make other interfaces extend the parent
    for (const interfaceName of mergedGroupNames) {
      if (interfaceName === parentInterfaceName) continue;

      const derivedInterface = groupMerged.get(interfaceName);
      /* v8 ignore next -- @preserve */
      if (!derivedInterface) continue;

      const parentProps = parentInterface.properties;
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
      /* v8 ignore next -- @preserve */
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
    /* v8 ignore next -- @preserve */
    if (!interfaceObj) {
      return;
    }
    mergedInterfaces.set(interfaceName, { ...interfaceObj });
    processedInheritance.add(interfaceName);

    // Mark all original interfaces as processed
    for (const originalName of inheritanceGroup) {
      processedInheritance.add(originalName);
    }

    return;
  }

  // Multiple distinct interfaces - check if they should share a base
  createBaseAndDerivedInterfaces(groupMerged, mergedGroupNames, mergedInterfaces, processedInheritance, inheritanceGroup, interfaces);
}
