/**
 * A JSON string that can be parsed to the referenced type using {@link parseJson} and serialized using {@link stringifyJson}
 * @example
 * ```typescript
 * const json: SerializedJsonString<{foo: string}> = '{"foo": "bar"}';
 * const obj = parseJson(json); // {foo: string}
 * ```
 * @example
 * ```typescript
 * const obj = {foo: 'bar'};
 * const json = stringifyJson(obj); // SerializedJsonString<{foo: string}>
 * const obj2 = parseJson(json); // {foo: string}
 * ```
 */

export type SerializedJsonString<T> = string & Partial<{
  /** @internal doesn't exist in the actual type but is used to store the type in typescript */
  __deserializesTo: T;
}>;
