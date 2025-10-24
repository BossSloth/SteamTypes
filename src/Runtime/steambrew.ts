declare global {
  interface Window {
    MILLENNIUM_API: unknown;
  }
}

export const steambrew: typeof import('@steambrew/client') = window.MILLENNIUM_API as typeof import('@steambrew/client');
