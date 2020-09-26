export const fromFileContent = (content) => JSON.parse(content);

export const toFileContent = (content) => JSON.stringify(content, null, 2);

export const originalFileName = 'original.json';
