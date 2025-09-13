/* eslint-disable max-classes-per-file */
// export type PrimitiveTypeKind = "string" | "number" | "boolean" | "bigint" | "symbol" | "null" | "undefined";
// export type ObjectTypeKind = ""
// export type TypeKind = PrimitiveTypeKind

export abstract class Type {
  public abstract readonly kind: string;

  public abstract toString(): string;
}

export class PrimitiveType extends Type {
  constructor(public readonly kind: string) {
    super();
  }

  public toString(): string {
    return this.kind;
  }
}

export class UnionType extends Type {
  public readonly kind: string = 'union';
  public readonly types: Type[];

  constructor(types: Type[]) {
    super();
    // Early return for empty or single type arrays
    if (types.length <= 1) {
      this.types = [...types];

      return;
    }

    // Use a Set with a custom equality function based on kind and other properties
    const uniqueTypes: Type[] = [];
    const typeStrings = new Set<string>();

    // Process all types, flattening unions
    const typesToProcess = [...types];
    for (const type of typesToProcess) {
      // If it's a union type, add its types to the processing queue
      if (type instanceof UnionType) {
        typesToProcess.push(...type.types);
        continue;
      }

      // Filter out fully unknown generic types
      if ((type instanceof GenericType || type instanceof ArrayType) && type.isFullyUnknown() && types.length > 1) {
        continue;
      }

      // Use a string representation for quick comparison
      const typeString = type.toString();
      if (!typeStrings.has(typeString)) {
        typeStrings.add(typeString);
        uniqueTypes.push(type);
      }
    }

    // Optimize array types
    this.types = UnionType.optimizeArrayTypes(uniqueTypes);

    // Sort types for consistent output
    this.types.sort((a, b) => a.toString().localeCompare(b.toString()));
  }

  /**
     * Optimizes array types within a union to simplify expressions like:
     *
     * ((A | B)[] | A[] | B[]) to (A | B)[]
     *
     * Only merges array types when a union array type already exists
     * that contains all the element types to be merged like in the example.
     */
  private static optimizeArrayTypes(types: Type[]): Type[] {
    // Early return for simple cases
    if (types.length <= 1) {
      return types;
    }

    // Separate array types from non-array types
    const { arrayTypes, nonArrayTypes } = UnionType.separateArrayTypes(types);

    // If we have fewer than 2 array types, no optimization needed
    if (arrayTypes.length < 2) {
      return types;
    }

    // Find all union array types and create groups based on them
    const arrayGroups = UnionType.createArrayGroups(arrayTypes);

    // If no union array types found, no optimization possible
    if (arrayGroups.size === 0) {
      return types;
    }

    // Process each group to create optimized array types
    const optimizedArrayTypes = UnionType.processArrayGroups(arrayGroups);

    // Combine non-array types with optimized array types
    return [...nonArrayTypes, ...optimizedArrayTypes];
  }

  private static separateArrayTypes(types: Type[]): { arrayTypes: ArrayType[]; nonArrayTypes: Type[]; } {
    const arrayTypes: ArrayType[] = [];
    const nonArrayTypes: Type[] = [];

    for (const type of types) {
      if (type instanceof ArrayType) {
        arrayTypes.push(type);
      } else {
        nonArrayTypes.push(type);
      }
    }

    return { arrayTypes, nonArrayTypes };
  }

  private static createArrayGroups(arrayTypes: ArrayType[]): Map<string, ArrayType[]> {
    const arrayGroups = new Map<string, ArrayType[]>();

    // First pass: identify all union array types
    for (const arrayType of arrayTypes) {
      if (arrayType.valueType instanceof UnionType) {
        const key = arrayType.valueType.toString();

        const group = arrayGroups.get(key) ?? [];
        group.push(arrayType);
        arrayGroups.set(key, group);
      }
    }

    const validGroups = [...arrayGroups.values()].filter(group => group.length > 0 && group[0].valueType instanceof UnionType);

    // Second pass: assign simple array types to appropriate groups
    for (const arrayType of arrayTypes) {
      if (arrayType.valueType instanceof UnionType) {
        continue;
      }

      const elementTypeString = arrayType.valueType.toString();
      let assigned = false;

      // Try to find a group where this element type is part of the union
      for (const group of validGroups) {
        const firstGroupType = group[0].valueType as UnionType;
        const unionElementStrings = firstGroupType.types.map(t => t.toString());

        // If this element type is in the union, add it to the group
        if (unionElementStrings.includes(elementTypeString)) {
          group.push(arrayType);
          assigned = true;
          break;
        }
      }

      // If not assigned to any existing group, create a new group
      if (!assigned) {
        const key = elementTypeString;
        const group = arrayGroups.get(key) ?? [];
        group.push(arrayType);
        arrayGroups.set(key, group);
      }
    }

    return arrayGroups;
  }

  private static processArrayGroups(arrayGroups: Map<string, ArrayType[]>): ArrayType[] {
    const optimizedArrayTypes: ArrayType[] = [];

    for (const group of arrayGroups.values()) {
      if (group.length <= 1) {
        // Single array type in group, keep as is
        optimizedArrayTypes.push(group[0]);
      } else {
        // Create optimized array type with union of all element types
        const unionElementType = UnionType.createUnionElementType(group);
        optimizedArrayTypes.push(new ArrayType(unionElementType));
      }
    }

    return optimizedArrayTypes;
  }

  private static createUnionElementType(arrayTypes: ArrayType[]): Type {
    const uniqueElementTypes: Type[] = [];
    const seenTypeStrings = new Set<string>();

    // Collect all unique element types from the group
    for (const arrayType of arrayTypes) {
      if (arrayType.valueType instanceof UnionType) {
        // Extract component types from union
        for (const elementType of arrayType.valueType.types) {
          const typeString = elementType.toString();
          if (!seenTypeStrings.has(typeString)) {
            seenTypeStrings.add(typeString);
            uniqueElementTypes.push(elementType);
          }
        }
      } else {
        // Handle non-union element types
        const typeString = arrayType.valueType.toString();
        if (!seenTypeStrings.has(typeString)) {
          seenTypeStrings.add(typeString);
          uniqueElementTypes.push(arrayType.valueType);
        }
      }
    }

    return uniqueElementTypes.length === 1
      ? uniqueElementTypes[0]
      : new UnionType(uniqueElementTypes);
  }

  public toString(): string {
    if (this.types.length === 0) {
      return 'never'; // Empty union is 'never' type in TypeScript
    }

    if (this.types.length === 1) {
      return this.types[0].toString();
    }

    return `(${this.types.map(t => t.toString()).join(' | ')})`;
  }
}

export class InterfaceType extends PrimitiveType {}

export class ArrayType extends Type {
  public readonly kind: string = 'array';

  constructor(public readonly valueType: Type) {
    super();
  }

  public toString(): string {
    return `${this.valueType.toString()}[]`;
  }

  public isFullyUnknown(): boolean {
    return this.valueType.kind === 'unknown';
  }
}

type SetName = 'Set' | 'ObservableSet';

type MapName = 'Map' | 'ObservableMap';

export type GenericTypeName = MapName | SetName | 'ObservableValue';

export class GenericType extends Type {
  public readonly kind: string = 'generic';

  constructor(
    public readonly genericName: GenericTypeName,
    public readonly typeParameters: Type[],
  ) {
    super();
  }

  public toString(): string {
    if (this.typeParameters.length === 0) {
      return this.genericName;
    }

    const typeParamsString = this.typeParameters.map(t => t.toString()).join(', ');

    return `${this.genericName}<${typeParamsString}>`;
  }

  public isFullyUnknown(): boolean {
    return this.typeParameters.every(t => t.kind === 'unknown');
  }
}

// Convenience factory methods for common generic types
export function createSetType(valueType: Type, setName: SetName = 'Set'): GenericType {
  return new GenericType(setName, [valueType]);
}

export function createMapType(keyType: Type, valueType: Type, mapName: MapName = 'Map'): GenericType {
  return new GenericType(mapName, [keyType, valueType]);
}
