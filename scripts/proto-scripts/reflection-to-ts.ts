import { existsSync, readFileSync } from 'fs';
import protobuf from 'protobufjs';
import { ConversionContext, setCtx } from './conversion-context';
import { parseExistingComments } from './existing-comments';
import { applyNameReplacements, collectImportsAndReplaceNames, generateImportStatements } from './imports';
import { mapAllTypesToFiles, processNamespace } from './namespace-walk';

export function generateTypeScriptFromReflection(
  root: protobuf.Root,
  currentProtoFile: string,
  existingFilePath?: string,
): string {
  setCtx(new ConversionContext(currentProtoFile));

  if (existingFilePath !== undefined && existsSync(existingFilePath)) {
    parseExistingComments(readFileSync(existingFilePath, 'utf-8'));
  }

  const output: string[] = [];

  mapAllTypesToFiles(root);
  processNamespace(root, output);
  collectImportsAndReplaceNames();
  applyNameReplacements(output);

  const importStatements = generateImportStatements();

  if (importStatements.length > 0) {
    return `${importStatements.join('\n')}\n\n${output.join('\n')}`;
  }

  return output.join('\n');
}
