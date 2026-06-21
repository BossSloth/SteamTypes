import { defaultProtoProps } from './types';

export const specialCharactersRegex = /[\s\-.@*#%^\p{Extended_Pictographic}/]|^\d+(?=[^\d])/u;
/**
 * Formats a property name to handle special characters
 */
export function formatPropertyName(propName: string): string {
  if (specialCharactersRegex.test(propName)) {
    // If it has spaces, dashes, or dots or other non-alphanumeric characters, wrap it in quotes
    return `'${propName}'`;
  }

  return propName;
}

const singleQuote = "'".charCodeAt(0);
const space = ' '.charCodeAt(0);

export function propertyStringSorter(a: string, b: string): number {
  a = a.toLowerCase();
  b = b.toLowerCase();
  let i = 0;
  let j = 0;
  const lenA = a.length;
  const lenB = b.length;

  while (i < lenA && j < lenB) {
    let charA = a.charCodeAt(i);
    let charB = b.charCodeAt(j);

    // Skip single quotes and spaces
    while (charA === singleQuote || charA === space) charA = a.charCodeAt(++i);
    while (charB === singleQuote || charB === space) charB = b.charCodeAt(++j);

    if (charA !== charB) return charA - charB;

    i++;
    j++;
  }

  return (lenA - i) - (lenB - j);
}

/**
 * Recursively collects all own and inherited property names of an object
 * and returns them as an array, excluding default prototype properties.
 * This also includes all functions
 */
export function getProperties(obj: unknown): string[] {
  if (obj === null || typeof obj !== 'object') return [];
  if (obj[Symbol.toStringTag] !== undefined) return ['values'];

  const properties = new Set<string>();
  let currentObj: object | null = obj;

  do {
    const ownProps = Object.getOwnPropertyNames(currentObj);
    ownProps.forEach((propName) => {
      if (!defaultProtoProps.has(propName)) {
        properties.add(propName);
      }
    });
  } while ((currentObj = Object.getPrototypeOf(currentObj) as object | null) !== null);

  return [...properties];
}
