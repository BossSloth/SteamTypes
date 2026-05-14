/**
 * This file contains global utility functions that are available in the Steam SharedJs window context.
 * This file is also excluded from coverage.
 */

import { convertToTypescript } from './converter';
import { getProperties } from './utils';

globalThis.checkConversionTime = function checkConversionTime(obj: Record<string, unknown>): void {
  const properties = getProperties(obj);
  const times: { property: string; time: number; }[] = [];
  for (const property of properties) {
    const start = performance.now();
    convertToTypescript({ [property]: obj[property] }, 'Test');
    const end = performance.now();
    const time = end - start;
    if (time > 1) {
      times.push({ property, time });
    }
  }
  console.log(times.sort((a, b) => b.time - a.time).map(item => `${item.property}: ${item.time}ms`).join('\n'));
  console.log('Total properties:', properties.length);
  console.log('Total time:', times.reduce((acc, curr) => acc + curr.time, 0));
};
