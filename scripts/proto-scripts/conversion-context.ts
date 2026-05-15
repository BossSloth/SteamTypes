export class ConversionContext {
  referencedTypes = new Set<string>();
  replacedNames = new Map<string, string>();
  importedTypes = new Map<string, Set<string>>();
  typeSourceFiles = new Map<string, string>();
  typeNameMap = new Map<string, string>();
  existingComments = new Map<string, Map<string, string>>();
  currentProtoFile: string;

  constructor(currentProtoFile: string) {
    this.currentProtoFile = currentProtoFile;
  }
}

let currentCtx: ConversionContext | undefined;

export function setCtx(ctx: ConversionContext): void {
  currentCtx = ctx;
}

export function getCtx(): ConversionContext {
  if (currentCtx === undefined) {
    throw new Error('ConversionContext not initialised; call setCtx() first');
  }

  return currentCtx;
}
