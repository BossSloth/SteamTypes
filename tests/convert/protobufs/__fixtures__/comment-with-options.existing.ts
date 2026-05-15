export interface MessageWithCommentAndOptions {
  /** Another field with comment and options */
  enabled?: boolean;

  /** This field has a regular comment */
  field_with_both?: string;

  options_only?: string;

  /** Field with only comment (no options) */
  simple_field?: number;
}
