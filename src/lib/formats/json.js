import flatten, { unflatten } from 'flat';

export const fromFileContent = (content) => flatten(JSON.parse(content), { safe: false });

export const toFileContent = (content) =>
  JSON.stringify(unflatten(content, { object: false }), null, 2);

export const originalFileName = 'original.json';
