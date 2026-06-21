import { ImportRegistry } from '../session/ImportRegistry';
import { InterfaceProperty, TypeScriptInterface } from '../types';
import { propertyStringSorter } from '../utils';

/**
 * Renders merged interface definitions and their imports into the final
 * TypeScript output string.
 */
export class CodeGenerator {
  private readonly interfaces: Map<string, TypeScriptInterface>;
  private readonly imports: ImportRegistry;

  constructor(interfaces: Map<string, TypeScriptInterface>, imports: ImportRegistry) {
    this.interfaces = interfaces;
    this.imports = imports;
  }

  public generate(): string {
    let result = '';
    const processedNames = new Set<string>();

    const sortedInterfaces = Array.from(this.interfaces.entries()).sort((a, b) => a[1].order - b[1].order);

    // Then add all other interfaces
    for (const [name, interfaceObj] of sortedInterfaces) {
      // Skip already processed interfaces and the main interface
      /* v8 ignore next -- @preserve */
      if (processedNames.has(name)) {
        continue;
      }

      // Skip duplicate interfaces (those that were merged)
      /* v8 ignore next -- @preserve */
      if (processedNames.has(interfaceObj.name)) {
        continue;
      }

      if (result) result += '\n';
      result += generateInterfaceString(interfaceObj);
      processedNames.add(interfaceObj.name);
    }

    // Add imports
    if (this.imports.size > 0) {
      result = `\n${result}`;
      const sortedImports = Array.from(this.imports.entries()).sort((a, b) => b[0].localeCompare(a[0]));
      for (const [moduleName, { types, defaultImport }] of sortedImports) {
        if (defaultImport) {
          /* v8 ignore next -- @preserve */
          if (types.size > 1) {
            throw new Error('Cannot import multiple types with default import');
          }
          result = `import ${Array.from(types)[0]} from '${moduleName}';\n${result}`;
        } else {
          result = `import { ${Array.from(types).sort().join(', ')} } from '${moduleName}';\n${result}`;
        }
      }
    }

    return result;
  }
}

/**
 * Generates interface definition string from TypeScriptInterface object
 */
function generateInterfaceString(interfaceDefinition: TypeScriptInterface): string {
  let result: string;
  if (interfaceDefinition.extends !== undefined) {
    result = `export interface ${interfaceDefinition.name} extends ${interfaceDefinition.extends} {\n`;
  } else {
    result = `export interface ${interfaceDefinition.name} {\n`;
  }

  // First collect functions and non-functions separately
  const sortedProperties = interfaceDefinition.properties.sort(propertySorter);
  const [functionProperties, nonFunctionProperties] = processProperties(sortedProperties);

  // Add functions first
  if (functionProperties.length > 0) {
    result += `${functionProperties.join('\n\n')}\n`;

    // Add empty line between functions and properties if both exist
    if (nonFunctionProperties.length > 0) {
      result += '\n';
    }
  }

  // Add non-function properties
  if (nonFunctionProperties.length > 0) {
    result += `${nonFunctionProperties.join('\n\n')}\n`;
  }

  result += '}\n';

  return result;
}

function propertySorter(a: InterfaceProperty, b: InterfaceProperty): number {
  return propertyStringSorter(a.name, b.name);
}

/**
 * Processes properties and returns two arrays: one for functions and one for non-functions
 * @returns Tuple of two arrays: [functions, nonFunctions]
 */
function processProperties(sortedProperties: InterfaceProperty[]): [string[], string[]] {
  const functions: string[] = [];
  const nonFunctions: string[] = [];

  for (const property of sortedProperties) {
    if (property.functionInfo) {
      const paramsList = property.functionInfo.params.map((param) => {
        let paramStr = param.name;

        // Add optional marker for optional parameters
        if (param.optional) {
          paramStr += '?';
        }

        paramStr += `: ${param.type}`;

        return paramStr;
      }).join(', ');

      const optionalMarker = property.optional ?? false ? '?' : '';

      if (property.functionInfo.jsDoc) {
        functions.push(`  /**
${property.functionInfo.jsDoc.map(jsDoc => `   * ${jsDoc}`).join('\n')}
   */
  ${property.name}${optionalMarker}(${paramsList}): ${property.functionInfo.returnType};`);
      } else {
        functions.push(`  ${property.name}${optionalMarker}(${paramsList}): ${property.functionInfo.returnType};`);
      }
    } else {
      const optionalMarker = property.optional ?? false ? '?' : '';
      if (property.jsDoc) {
        nonFunctions.push(`  /**
${property.jsDoc.map(jsDoc => `   * ${jsDoc}`).join('\n')}
   */
  ${property.name}${optionalMarker}: ${property.type.toString()};`);
      } else {
        nonFunctions.push(`  ${property.name}${optionalMarker}: ${property.type.toString()};`);
      }
    }
  }

  return [functions, nonFunctions];
}
