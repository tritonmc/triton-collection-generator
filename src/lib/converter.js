import { getFormatManager, json } from './formats';
import { getOutputTypeManager } from './outputType';

class Converter {
  constructor({ prefix, variableRegex, outputType, ignoredKeys, files }) {
    this.prefix = prefix;
    this.variableRegex = variableRegex;
    this.outputType = outputType;
    this.ignoredKeys = ignoredKeys;
    this.files = files;
    this.output = [];
    this.outputOriginal = {};
  }

  convert() {
    this.files.forEach((file) => this.convertFile(file));
  }

  convertFile({ language, content }) {
    Object.entries(content).forEach(([key, value]) => {
      if (typeof value !== 'string' || !value.trim() || this.isIgnoredKey(key)) {
        if (this.outputOriginal[key] === undefined) this.outputOriginal[key] = value;
        return;
      }
      const fullKey = `${this.prefix}${key}`;
      const outputTypeManager = getOutputTypeManager(this.outputType);
      const variables = value.match(this.variableRegex);
      const translations = outputTypeManager.getTranslations({
        text: value,
        key: fullKey,
        variableRegex: this.variableRegex,
        variables,
      });
      translations.forEach((translation) => this.addTranslation(language, translation));
      if (this.outputOriginal[key] === undefined)
        this.outputOriginal[key] = outputTypeManager.convertOriginalMessage(fullKey, variables);
    });
  }

  addTranslation(language, { key, value }) {
    const index = this.output.findIndex((v) => v.key === key);
    if (index === -1) {
      this.output.push({
        key,
        type: 'text',
        languages: {
          [language]: value,
        },
      });
    } else {
      this.output[index].languages[language] = value;
    }
  }

  isIgnoredKey(key) {
    return this.ignoredKeys.some((v) => !!key.match(v));
  }

  getOutput() {
    return this.output;
  }

  getOutputOriginal() {
    return this.outputOriginal;
  }

  getOriginalFormat() {
    return getFormatManager(this.files[0].fileName);
  }
}

const getLanguageName = (fileName) => fileName.split('.').slice(0, -1).join('.');

const mapFiles = (files) => (fileName) => ({
  fileName,
  language: getLanguageName(fileName),
  content: getFormatManager(fileName).fromFileContent(files[fileName]),
});

export const handleConversion = ({ prefix, variableRegex, outputType, ignoredKeys, files }) => {
  const converter = new Converter({
    prefix,
    variableRegex: variableRegex ? new RegExp(variableRegex, 'g') : /.^/g,
    outputType,
    ignoredKeys: ignoredKeys
      .split('\n')
      .filter((value) => !!value)
      .map((value) => new RegExp(`^${value}$`)),
    files: Object.keys(files).map(mapFiles(files)),
  });
  converter.convert();
  const originalFormat = converter.getOriginalFormat();
  return [
    { fileName: 'output.json', content: json.toFileContent(converter.getOutput()) },
    {
      fileName: originalFormat.originalFileName,
      content: originalFormat.toFileContent(converter.getOutputOriginal()),
    },
  ];
};

export default handleConversion;
