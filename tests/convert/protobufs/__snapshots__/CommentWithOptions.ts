export interface MessageWithCommentAndOptions {
  /**
   * Another field with comment and options
   *
   * @Options
   * Default: true
   */
  enabled?: boolean;

  /**
   * This field has a regular comment
   *
   * @Options
   * Setting description: Field description from options
   * Setting name: field_name
   */
  field_with_both?: string;

  /**
   * @Options
   * Setting description: Only options
   */
  options_only?: string;

  /** Field with only comment (no options) */
  simple_field?: number;
}
