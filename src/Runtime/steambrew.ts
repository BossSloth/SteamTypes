/* eslint-disable @typescript-eslint/consistent-type-imports */
declare global {
  interface Window {
    MILLENNIUM_API: unknown;
  }
}

export const steambrew: typeof import('@steambrew/client') = window.MILLENNIUM_API as typeof import('@steambrew/client');

if (typeof steambrew.findModuleExport === 'undefined') {
  // Mock the findModuleExport function
  // @ts-expect-error override readonly
  steambrew.findModuleExport = (): null => null;
}
