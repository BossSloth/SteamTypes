/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { SerializedJsonString } from 'shared/helpers';

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function parseJson<T>(json: SerializedJsonString<T>): T {
  return JSON.parse(json) as T;
}

export function stringifyJson<T>(obj: T): SerializedJsonString<T> {
  return JSON.stringify(obj) as SerializedJsonString<T>;
}
