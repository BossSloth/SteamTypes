/**
 * Pure helpers for detecting protobuf classes and deriving their class names.
 */

export function isProtobufClass(value: unknown): boolean {
  if (typeof value !== 'function') return false;

  if (!('toObject' in value && 'fromObject' in value && 'deserializeBinary' in value)) return false;

  const proto = value.prototype as Record<string, unknown> | null;
  if (proto === null) return false;

  return typeof proto === 'object' && 'getClassName' in proto;
}

/**
 * Extracts class name from getClassName method.
 * Assumes format: return "ClassName";
 * This works for Steam's auto-generated protobuf classes.
 */
export function getProtobufClassName(value: Function): string | null {
  const proto = value.prototype as Record<string, unknown>;
  const func = proto.getClassName as Function | undefined;
  if (typeof func !== 'function') return null;
  const match = func.toString().match(/return\s*["']([^"']+)["']/);

  return match?.[1] ?? null;
}

export function findProtobufClassInObject(obj: Record<string, unknown>): { className: string; propertyKey: string; } | null {
  for (const key of Object.keys(obj)) {
    try {
      const value = obj[key];
      if (isProtobufClass(value)) {
        const className = getProtobufClassName(value as Function);
        if (className !== null && className.length > 0) {
          return { className, propertyKey: key };
        }
      }
    } catch {
      continue;
    }
  }

  return null;
}
