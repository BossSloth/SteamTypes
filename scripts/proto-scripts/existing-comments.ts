import { getCtx } from './conversion-context';

export function parseExistingComments(fileContent: string): void {
  const ctx = getCtx();
  const lines = fileContent.split('\n');
  let currentInterface: string | null = null;
  let currentComment: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    const interfaceMatch = trimmed.match(/^export\s+(?:interface|enum)\s+(\w+)/);
    if (interfaceMatch) {
      // If we have a pending comment, save it before resetting
      if (currentComment.length > 0) {
        currentInterface = interfaceMatch[1];
        if (!ctx.existingComments.has(currentInterface)) {
          ctx.existingComments.set(currentInterface, new Map());
        }
        // Store the interface-level comment with a special key
        const interfaceMap = ctx.existingComments.get(currentInterface);
        interfaceMap?.set('__interface_comment', currentComment.join('\n'));
        currentComment = [];
      } else {
        currentInterface = interfaceMatch[1];
        if (!ctx.existingComments.has(currentInterface)) {
          ctx.existingComments.set(currentInterface, new Map());
        }
        currentComment = [];
      }
      continue;
    }

    if (trimmed.startsWith('/**') || trimmed.startsWith('*') || trimmed.startsWith('*/')) {
      currentComment.push(line);
      continue;
    }

    if (currentInterface !== null && currentComment.length > 0) {
      const fieldMatch = trimmed.match(/^(\w+)\??:/);
      if (fieldMatch) {
        const interfaceMap = ctx.existingComments.get(currentInterface);
        interfaceMap?.set(fieldMatch[1], currentComment.join('\n'));
        currentComment = [];
        continue;
      }
    }

    if (!trimmed.startsWith('//') && trimmed && !trimmed.match(/^\w+\??:/)) {
      currentComment = [];
    }
  }
}
