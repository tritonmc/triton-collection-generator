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

export const handlePropertiesContent = (prefix, regex, files) => {
  var output = [];
  var outputOriginal = {};
  Object.keys(files).forEach((fileName) => {
    var languageName = fileName
      .split('.')
      .slice(0, -1)
      .join('.');
    var object = properties.parse(files[fileName]);
    Object.keys(object).forEach((key) => {
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

const replaceVariables = (text, regex) => {
  var variables = text.match(regex);
  var i = 1;
  if (variables) variables.forEach((v) => (text = text.replace(v, `%${i++}`)));
  return { text, variables };
};

export const handleYamlContent = (prefix, regex, files) => {
  var output = [];
  var outputOriginal = {};
  Object.keys(files).forEach((fileName) => {
    var languageName = fileName
      .split('.')
      .slice(0, -1)
      .join('.');
    var object = flatten(yaml.safeLoad(files[fileName]), { safe: true });
    console.log(object);
    Object.keys(object).forEach((key) => {
      if (typeof object[key] !== 'string') {
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
            .map((v) => v !== "" ? `[arg]${v}[/arg]` : ``)
            .join('')}[/args][/lang]`;
        }
      } else {
        output[index].languages[languageName] = text;
      }
    });
  });
  return { output, outputOriginal };
};
