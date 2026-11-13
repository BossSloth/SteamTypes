import { findProtobufClassInObject } from '../detection/protobuf-helpers';
import { specialCharactersRegex } from '../utils';

export interface AllocatedName {
  interfaceName: string;
  nameCounter: number | undefined;
  protobufClassName?: string;
}

/**
 * Allocates unique interface names for discovered objects, keeping a per-name
 * counter so repeated names get incrementing suffixes. Also derives names from
 * embedded protobuf classes when the path segment would be invalid.
 */
export class NameAllocator {
  public readonly counter = new Map<string, number>();
  public readonly INVALID_NAME = 'InvalidName';

  public allocateForObject(value: Record<string, unknown>, path: string, isCollectionItem = false): AllocatedName {
    const segments = path.split('.');
    // split will always have one segment so at(-1) is safe
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lastPathSegment = segments.at(-1)!;

    // When the key would produce InvalidName (e.g. numeric keys), try deriving name from protobuf class
    const candidateName =
      lastPathSegment.charAt(1) === '_'
        ? lastPathSegment //
        : lastPathSegment.charAt(0).toUpperCase() + lastPathSegment.slice(1);
    const wouldBeInvalid = this.formatInterfaceName(candidateName) === this.INVALID_NAME;

    if (wouldBeInvalid) {
      const protoInfo = findProtobufClassInObject(value);
      if (protoInfo) {
        const parentName = segments.at(-2) ?? '';
        const singularParent = singularize(parentName);
        const derivedName = `${protoInfo.className}${singularParent.charAt(0).toUpperCase() + singularParent.slice(1)}`;
        const [interfaceName, nameCounter] = this.next(derivedName);

        return { interfaceName, nameCounter, protobufClassName: protoInfo.className };
      }
    }

    // Number record values are detected with their key appended, so name them after the record property instead
    const namingSegment = isCollectionItem && wouldBeInvalid ? (segments.at(-2) ?? lastPathSegment) : lastPathSegment;
    const [interfaceName, nameCounter] = this.allocateFromPathSegment(namingSegment, isCollectionItem);

    return { interfaceName, nameCounter };
  }

  public formatInterfaceName(interfaceName: string): string {
    let trimmed = interfaceName.replaceAll(new RegExp(specialCharactersRegex.source, 'gu'), '');
    // Recursively remove leading numbers
    while (trimmed.match(/^\d/)) {
      trimmed = trimmed.replace(/^\d/g, '');
    }
    if (trimmed.length === 0) {
      return this.INVALID_NAME;
    }

    return trimmed;
  }

  // Generate a unique interface name for nested objects
  private allocateFromPathSegment(pathSegment: string, singular: boolean): [string, number | undefined] {
    if (pathSegment.startsWith('m_')) {
      pathSegment = pathSegment.slice(2);
    }

    let capitalizedName: string;
    if (pathSegment.charAt(1) === '_') {
      capitalizedName = pathSegment;
    } else {
      capitalizedName = pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);
    }

    let formattedName = this.formatInterfaceName(capitalizedName);
    if (singular && formattedName !== this.INVALID_NAME) {
      formattedName = singularize(formattedName);
    }

    return this.next(formattedName);
  }

  private next(baseName: string): [string, number | undefined] {
    let counter = this.counter.get(baseName) ?? 0;
    counter++;
    this.counter.set(baseName, counter);
    if (counter === 1) {
      return [baseName, undefined];
    }

    return [`${baseName}${counter}`, counter];
  }
}

function singularize(word: string): string {
  if (word.length <= 2 || /(?:ss|us|is)$/.test(word)) return word;
  if (word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (/(?:ss|sh|ch|x|z)es$/.test(word)) return word.slice(0, -2);
  if (word.endsWith('s')) return word.slice(0, -1);

  return word;
}
