/**
 * Top-level interface JSDoc that should be preserved.
 */
export interface DocumentedThing {
  /**
   * Existing comment for body explains usage.
   */
  body?: string;

  stale?: number;

  /**
   * Existing field comment for title.
   */
  title?: string;
}

/**
 * Existing enum JSDoc preserved across regeneration.
 */
export enum DocumentedKind {
  Unknown = 0,
  Active = 1,
}
