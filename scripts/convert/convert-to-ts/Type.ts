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
        // This is more efficient than using toString() for each comparison
        const uniqueTypes: Type[] = [];
        const typeStrings = new Set<string>();
        
        // Process all types, flattening unions
        const typesToProcess = [...types];
        for (let i = 0; i < typesToProcess.length; i++) {
            const type = typesToProcess[i];
            
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
        
        this.types = uniqueTypes;
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

export type SetName = 'Set' | 'ObservableSet';
export type MapName = 'Map' | 'ObservableMap';
export type GenericTypeName = MapName | SetName;

export class GenericType extends Type {
    public readonly kind: string = 'generic';

    constructor(
        public readonly genericName: GenericTypeName,
        public readonly typeParameters: Type[]
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
export const createSetType = (valueType: Type, setName: SetName = 'Set'): GenericType => {
    return new GenericType(setName, [valueType]);
};

export const createMapType = (keyType: Type, valueType: Type, mapName: MapName = 'Map'): GenericType => {
    return new GenericType(mapName, [keyType, valueType]);
};
