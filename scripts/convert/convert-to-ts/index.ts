import { Project, ScriptTarget } from 'ts-morph';
import { convertToTypescript } from './converter';

// Initialize the global project
globalThis.tsProject = new Project({
  compilerOptions: {
    target: ScriptTarget.Latest,
    declaration: true,
    emitDeclarationOnly: true,
    noImplicitAny: false,
    lib: ["lib.es5.d.ts", "lib.es2015.d.ts"], // We only load in es2015 here because it is more performant than newer versions and has all features we need to get return types
    strict: true,
  },
  useInMemoryFileSystem: true,
});

// Export the function for use in other modules
export { convertToTypescript };

// For backward compatibility
globalThis.convertToTypescript = convertToTypescript;
