import { generateTypeScriptDefinitions } from './orchestrator';
import { generateTypeScriptFromReflection } from './reflection-to-ts';

export function main(): void {
  generateTypeScriptDefinitions();
}

/* v8 ignore start */
if (require.main === module) {
  main();
}
/* v8 ignore stop */

export { generateTypeScriptDefinitions, generateTypeScriptFromReflection };
