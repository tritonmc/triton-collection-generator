import flatten from 'flat';
import yaml from 'js-yaml';
import properties from 'properties';

export const getFileContents = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('abort', () => reject(new Error('file reading was aborted')));
    reader.addEventListener('error', () => reject(new Error('file reading has failed')));
    reader.addEventListener('load', () => resolve(reader.result));
    reader.readAsText(file, 'utf-8');
  });

export const getAllFileContents = async (files) => {
  const result = {};
  await Promise.all(
    files.map(async (file) => {
      result[file.name] = await getFileContents(file);
    })
  );
};

const handlePropertiesContent = (file) => properties.parse(file);

const handleYamlContent = (file) => flatten(yaml.safeLoad(file), { safe: false });

export const handleContent = (type, outputType, { prefix, regex, files, ignoreKeys }) => {
  const output = [];
  const outputOriginal = {};
  Object.keys(files).forEach((fileName) => {
    const languageName = getLanguageName(fileName);
    const object =
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
      const index = output.findIndex((v) => v.key === prefix + key);
      const { text, variables } = replaceVariables(object[key], regex);
      if (index === -1) {
        if (outputType === 'tags') {
          output.push({
            key: `${prefix}${key}`,
            type: 'text',
            languages: {
              [languageName]: text,
            },
          });
          if (!variables) {
            outputOriginal[key] = `[lang]${prefix}${key}[/lang]`;
          } else {
            outputOriginal[key] = `[lang]${prefix}${key}[args]${variables
              .map((v) => `[arg]${v}[/arg]`)
              .join('')}[/args][/lang]`;
          }
        } else if (!variables) {
          output.push({
            key: `${prefix}${key}`,
            type: 'text',
            languages: {
              [languageName]: text,
            },
          });
          outputOriginal[key] = `%triton_${prefix}${key}%`;
        } else {
          [...new Array(variables.length + 1)].forEach((_, i) =>
            output.push({
              key: `${prefix}${key}.${i}`,
              type: 'text',
              languages: {
                [languageName]: text,
              },
            })
          );
          outputOriginal[key] = `${variables
            .map((v, i) => `%triton_${prefix}${key}.${i}%${v}`)
            .join('')}%triton_${prefix}${key}.${variables.length}%`;
        }
      } else {
        output[index].languages[languageName] = text;
      }
    });
  });
  return { output, outputOriginal };
};

const getLanguageName = (fileName) => fileName.split('.').slice(0, -1).join('.');

const replaceVariables = (text, regex) => {
  const variables = text.match(regex);
  let i = 1;
  let result = text;
  if (variables)
    variables.forEach((v) => {
      result = result.replace(v, `%${(i += 1)}`);
    });
  return { text: result, variables };
};

const isIgnoredKey = (key, ignoreKeys) => ignoreKeys.some((v) => !!key.match(v));
