import flatten, { unflatten } from 'flat';
import { safeDump, safeLoad } from 'js-yaml';

export const fromFileContent = (content) => flatten(safeLoad(content), { safe: false });

export const toFileContent = (content) => safeDump(unflatten(content, { object: false }));

export const originalFileName = 'original.yml';
