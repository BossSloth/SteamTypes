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

  public allocateForObject(value: Record<string, unknown>, path: string): AllocatedName {
    // split will always have one segment so pop() is safe
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lastPathSegment = path.split('.').pop()!;

    // When the key would produce InvalidName (e.g. numeric keys), try deriving name from protobuf class
    const candidateName = lastPathSegment.charAt(1) === '_'
      ? lastPathSegment
      : lastPathSegment.charAt(0).toUpperCase() + lastPathSegment.slice(1);
    const wouldBeInvalid = this.formatInterfaceName(candidateName) === this.INVALID_NAME;

    if (wouldBeInvalid) {
      const protoInfo = findProtobufClassInObject(value);
      if (protoInfo) {
        const parentName = path.split('.').at(-2) ?? '';
        const singularParent = parentName.endsWith('s') ? parentName.slice(0, -1) : parentName;
        const derivedName = `${protoInfo.className}${singularParent}`;
        const [interfaceName, nameCounter] = this.next(derivedName);

        return { interfaceName, nameCounter, protobufClassName: protoInfo.className };
      }
    }

    const [interfaceName, nameCounter] = this.allocateFromPathSegment(lastPathSegment);

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
  private allocateFromPathSegment(pathSegment: string): [string, number | undefined] {
    if (pathSegment.startsWith('m_')) {
      pathSegment = pathSegment.slice(2);
    }

    let capitalizedName: string;
    if (pathSegment.charAt(1) === '_') {
      capitalizedName = pathSegment;
    } else {
      capitalizedName = pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);
    }

    const formattedName = this.formatInterfaceName(capitalizedName);

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
