//import properties from 'properties';

export const fromFileContent = (content) => properties.parse(content);

export const toFileContent = (content) => properties.stringify(content);

export const originalFileName = 'original.properties';
