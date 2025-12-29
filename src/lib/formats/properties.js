import { getProperties } from 'properties-file';
import { escapeKey, escapeValue } from 'properties-file/escape';

export const fromFileContent = (content) => getProperties(content);

export const toFileContent = (content) => {
  return Object.entries(content)
    .map(([key, value]) => `${escapeKey(key)} = ${escapeValue(value)}\n`)
    .join("");
}

export const originalFileName = 'original.properties';
