import properties from 'properties';
import yaml from 'js-yaml';
import flatten from 'flat';

export const getFileContents = (file) =>
  new Promise((resolve, error) => {
    const reader = new FileReader();

    reader.onabort = () => error('file reading was aborted');
    reader.onerror = () => error('file reading has failed');
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file, 'utf-8');
  });

export const getAllFileContents = (files) =>
  new Promise(async (resolve) => {
    const result = {};
    await Promise.all(files.map(async (file) => (result[file.name] = await getFileContents(file))));
    resolve(result);
  });

const handlePropertiesContent = (file) => {
  return properties.parse(file);
};

const handleYamlContent = (file) => {
  return flatten(yaml.safeLoad(file), { safe: false });
};

export const handleContent = (type, { prefix, regex, files, ignoreKeys }) => {
  var output = [];
  var outputOriginal = {};
  Object.keys(files).forEach((fileName) => {
    const languageName = getLanguageName(fileName);
    var object =
      type === 0
        ? handlePropertiesContent(files[fileName])
        : type === 1
        ? handleYamlContent(files[fileName])
        : {};
    Object.keys(object).forEach((key) => {
      if (typeof object[key] !== 'string' || !object[key].trim() || isIgnoredKey(key, ignoreKeys)) {
        outputOriginal[key] = object[key];
        return;
      }
      var index = output.findIndex((v) => v.key === prefix + key);
      var { text, variables } = replaceVariables(object[key], regex);
      if (index === -1) {
        output.push({
          key: prefix + key,
          type: 'text',
          languages: {
            [languageName]: text,
          },
        });
        if (!variables) {
          outputOriginal[key] = `[lang]${prefix + key}[/lang]`;
        } else {
          outputOriginal[key] = `[lang]${prefix + key}[args]${variables
            .map((v) => `[arg]${v}[/arg]`)
            .join('')}[/args][/lang]`;
        }
      } else {
        output[index].languages[languageName] = text;
      }
    });
  });
  return { output, outputOriginal };
};

const getLanguageName = (fileName) =>
  fileName
    .split('.')
    .slice(0, -1)
    .join('.');

const replaceVariables = (text, regex) => {
  var variables = text.match(regex);
  var i = 1;
  if (variables) variables.forEach((v) => (text = text.replace(v, `%${i++}`)));
  return { text, variables };
};

const isIgnoredKey = (key, ignoreKeys) => ignoreKeys.some((v) => !!key.match(v));
