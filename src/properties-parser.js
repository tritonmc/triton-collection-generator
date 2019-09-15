import properties from 'properties';
import fs from 'fs';

const parse = (path) => {
  var content = fs.readFileSync(path, 'utf8');
  var obj = properties.parse(content);
  return obj;
};

export default parse;
