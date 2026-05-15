import path from 'path';
import { getCtx } from './conversion-context';

export function getImportPathForType(typeName: string): string | null {
  const ctx = getCtx();
  const sourceFile = ctx.typeSourceFiles.get(typeName);
  if (sourceFile === undefined || sourceFile.includes(ctx.currentProtoFile)) {
    return null;
  }

  const baseFileName = path.basename(sourceFile).replace('.proto', '');

  return `./${baseFileName}`;
}

export function collectImportsAndReplaceNames(): void {
  const ctx = getCtx();
  for (const typeName of ctx.referencedTypes) {
    const importPath = getImportPathForType(typeName);
    if (importPath === null) continue;

    const finalTypeName = ctx.replacedNames.get(typeName) ?? typeName;
    const existingTypes = ctx.importedTypes.get(importPath);

    if (existingTypes) {
      existingTypes.add(finalTypeName);
    } else {
      ctx.importedTypes.set(importPath, new Set([finalTypeName]));
    }
  }
}

export function generateImportStatements(): string[] {
  const ctx = getCtx();

  return Array.from(ctx.importedTypes.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([importPath, types]) => {
      const sortedTypes = Array.from(types).sort();

      return `import { ${sortedTypes.join(', ')} } from '${importPath}';`;
    });
}

export function applyNameReplacements(output: string[]): void {
  const ctx = getCtx();
  for (const [oldName, newName] of ctx.replacedNames) {
    for (let i = 0; i < output.length; i++) {
      output[i] = output[i].replaceAll(oldName, newName);
    }
  }

  for (const [originalName, prefixedName] of ctx.typeNameMap) {
    const regex = new RegExp(`\\b${originalName}\\b(?! = )`, 'g');
    for (let i = 0; i < output.length; i++) {
      output[i] = output[i].replace(regex, prefixedName);
    }
  }
}
