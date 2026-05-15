import protobuf from 'protobufjs';

const optionTranslations: Record<string, string> = {
  '(setting_description)': 'Setting description',
  '(setting_name)': 'Setting name',
  '(setting_default_bool)': 'Default',
  '(setting_default_int)': 'Default',
  '(setting_default_uint)': 'Default',
  '(setting_default_float)': 'Default',
  '(setting_default_string)': 'Default',
  '(setting_store)': 'Setting store',
  '(setting_pre_login)': 'Setting pre-login',
  '(setting_readonly)': 'Setting readonly',
  '(setting_profile_mode)': 'Setting profile mode',
  '(setting_clamp_min)': 'Setting clamp min',
  '(setting_clamp_max)': 'Setting clamp max',
};

const blacklistedOptions = new Set(['default']);

export function generateFieldComment(field: protobuf.Field): string | undefined {
  const options = field.options;
  if (!options) return undefined;

  const commentParts: string[] = [];

  const rawOptions = field.toJSON().options ?? {};

  // eslint-disable-next-line prefer-const
  for (let [key, value] of Object.entries(rawOptions)) {
    if (blacklistedOptions.has(key)) continue;

    if (key === '(setting_default_string)') {
      value = `"${value}"`;
    }

    const translation = optionTranslations[key] ?? key;
    commentParts.push(`${translation}: ${(value as string | number | boolean).toString().replace(/\t/g, ' ')}`);
  }

  if (commentParts.length === 0) return undefined;

  commentParts.unshift('@Options');

  const commentLines = ['  /**'];
  for (const part of commentParts) {
    commentLines.push(`   * ${part}`);
  }
  commentLines.push('   */');

  return commentLines.join('\n');
}
