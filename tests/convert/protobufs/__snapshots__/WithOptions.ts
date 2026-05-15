export interface Settings {
  /**
   * @Options
   * Default: true
   */
  enabled?: boolean;

  /**
   * @Options
   * Setting description: User-facing label
   * Setting store: ConfigStore
   * Setting pre-login: true
   * Setting profile mode: Default
   */
  label?: string;

  /**
   * @Options
   * Default: 60
   * Setting clamp min: 24
   * Setting clamp max: 120
   * Setting readonly: true
   */
  max_fps?: number;

  only_default?: number;

  /**
   * @Options
   * (custom_unknown_option): opaque-value
   */
  opaque?: string;

  /**
   * @Options
   * Setting name: system\OverlayKey
   * Default: "Shift KEY_TAB"
   */
  overlay_key?: string;

  /**
   * @Options
   * Default: 8080
   */
  port?: number;

  /**
   * @Options
   * Default: 1.5
   */
  scale?: number;
}
