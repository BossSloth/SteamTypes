export interface ImportEntry {
  types: Set<string>;
  defaultImport: boolean;
}

/**
 * Tracks the imports that need to be rendered at the top of the generated output.
 */
export class ImportRegistry {
  public readonly imports = new Map<string, ImportEntry>();

  public get size(): number {
    return this.imports.size;
  }

  public add(moduleName: string, type: string, defaultImport = false): void {
    if (!this.imports.has(moduleName)) {
      this.imports.set(moduleName, { types: new Set<string>(), defaultImport });
    }
    this.imports.get(moduleName)?.types.add(type);
  }

  public get(moduleName: string): ImportEntry | undefined {
    return this.imports.get(moduleName);
  }

  public entries(): IterableIterator<[string, ImportEntry]> {
    return this.imports.entries();
  }
}
