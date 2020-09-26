import { safeDump, safeLoad } from 'js-yaml';

export const fromFileContent = (content) => safeLoad(content);

export const toFileContent = (content) => safeDump(content);

export const originalFileName = 'original.yml';
