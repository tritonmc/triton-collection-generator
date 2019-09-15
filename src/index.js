import fs from 'fs';
import propertiesParser from './properties-parser.js';
import path from 'path';

const INPUT_FOLDER = '../input';
const PREFIX = process.env.PREFIX || '';
var output = [];

fs.readdir(path.join(__dirname, INPUT_FOLDER), (err, files) => {
  if (err) console.error(err);
  files.forEach((file) => {
    console.log(file);
    parseFile(file);
  });
  fs.writeFileSync(
    path.join(__dirname, '..', 'output.json'),
    JSON.stringify(output, null, 2),
    'utf8'
  );
});

const parseFile = (fileName) => {
  if (fileName.endsWith('.properties')) {
    var options = propertiesParser(path.join(__dirname, INPUT_FOLDER, fileName));
    parseObject(fileName.replace('.properties', ''), options);
  }
};

const parseObject = (languageName, object) => {
  Object.keys(object).forEach((key) => {
    var index = output.findIndex((v) => v.key === PREFIX + key);
    if (index === -1) {
      output.push({
        key: PREFIX + key,
        type: 'text',
        languages: {
          [languageName]: object[key],
        },
      });
    } else {
      output[index].languages[languageName] = object[key];
    }
  });
};
