import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';

interface StripTarget {
  file: string;
  stripGlobalBlocks?: boolean;
  removeLines?: RegExp[];
}

/**
 * Declarations to remove from @steambrew/client so steam-types' stricter
 * global types win. Mirrors the previous bun patch.
 */
const TARGETS: StripTarget[] = [
  { file: 'build/globals/SteamClient.d.ts', stripGlobalBlocks: true },
  { file: 'build/globals/stores.d.ts', stripGlobalBlocks: true },
  {
    file: 'build/hooks/toaster-hook.d.ts',
    removeLines: [/^[ \t]*settingsStore: any;[ \t]*\r?\n/m, /^[ \t]*NotificationStore: any;[ \t]*\r?\n/m],
  },
  { file: 'build/utils/index.d.ts', stripGlobalBlocks: true },
];

function findMatchingBrace(content: string, openIndex: number): number {
  let depth = 0;
  for (let i = openIndex; i < content.length; i++) {
    const char = content[i];
    if (char === '{') {
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0) {
        return i;
      }
    }
  }

  return -1;
}

function stripGlobalBlocks(content: string): string {
  let result = content;
  let index = result.indexOf('declare global');
  while (index !== -1) {
    const open = result.indexOf('{', index);
    const close = open === -1 ? -1 : findMatchingBrace(result, open);
    if (close === -1) {
      break;
    }
    result = result.slice(0, index) + result.slice(close + 1);
    index = result.indexOf('declare global', index);
  }

  return result;
}

function removeLines(content: string, matchers: RegExp[]): string {
  return matchers.reduce((acc, matcher) => acc.replace(matcher, ''), content);
}

function processTarget(buildRoot: string, target: StripTarget): boolean {
  const filePath = path.join(buildRoot, target.file);
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;
  if (target.stripGlobalBlocks === true) {
    updated = stripGlobalBlocks(updated);
  }
  if (target.removeLines !== undefined) {
    updated = removeLines(updated, target.removeLines);
  }
  if (updated === original) {
    return false;
  }

  fs.writeFileSync(filePath, updated);
  console.log(`  stripped Steam globals from ${target.file}`);

  return true;
}

function findPackageRoot(): string | null {
  const requireFrom = createRequire(import.meta.url);
  try {
    return path.dirname(requireFrom.resolve('@steambrew/client/package.json'));
  } catch {
    return null;
  }
}

function main(): void {
  const packageRoot = findPackageRoot();
  if (packageRoot === null) {
    console.log('strip-steambrew-globals: @steambrew/client not found, skipping');

    return;
  }

  const changed = TARGETS.map(target => processTarget(packageRoot, target)).filter(Boolean);
  if (changed.length === 0) {
    console.log('strip-steambrew-globals: nothing to strip (already clean)');

    return;
  }

  console.log(`strip-steambrew-globals: cleaned ${changed.length} file(s)`);
}

main();
