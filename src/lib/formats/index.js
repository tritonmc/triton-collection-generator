import * as json from './json';
import * as properties from './properties';
import * as yaml from './yaml';

export const getFormatManager = (fileName) => {
  const extension = fileName.split('.').pop();
  switch (extension.toLowerCase()) {
    case 'yml':
    case 'yaml':
      return yaml;

    case 'properties':
      return properties;

    case 'json':
      return json;

    default:
      throw new Error(`Format manager not available for ${extension}`);
  }
};

export { json, properties, yaml };
export default getFormatManager;
