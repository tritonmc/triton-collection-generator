import { dump, load } from 'js-yaml';

export const fromFileContent = (content) => load(content);

export const toFileContent = (content) => dump(content);

export const originalFileName = 'original.yml';
