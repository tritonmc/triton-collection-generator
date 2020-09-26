/* istanbul ignore file */

import fs from 'fs';
import path from 'path';

const getFileContent = (fileName, extension) =>
  fs.readFileSync(path.join(__dirname, extension, 'resources', fileName), {
    encoding: 'utf-8',
  });

export const getOutput = (originalFileName, outputFileName, extension) => [
  { fileName: 'output.json', content: getFileContent(outputFileName, extension) },
  { fileName: `original.${extension}`, content: getFileContent(originalFileName, extension) },
];

// files = {"mockedName": "nameOfActualFile"}
export const getInput = (files, extension) =>
  Object.keys(files).reduce(
    (acc, name) => ({
      ...acc,
      [name]: getFileContent(files[name], extension),
    }),
    {}
  );
