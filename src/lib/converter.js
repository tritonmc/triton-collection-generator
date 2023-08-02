import deepCopyObject from './converterUtils';
import { getFormatManager, json } from './formats';
import { getOutputTypeManager } from './outputType';

class Converter {
  constructor({
    prefix,
    variableRegex,
    outputType,
    langSyntax,
    argSyntax,
    argsSyntax,
    ignoredKeys,
    keyLowercase,
    ignoreArray,
    levelDelimiter,
    files,
  }) {
    this.prefix = prefix;
    this.variableRegex = variableRegex;
    this.outputType = outputType;
    this.langSyntax = langSyntax;
    this.argSyntax = argSyntax;
    this.argsSyntax = argsSyntax;
    this.ignoredKeys = ignoredKeys;
    this.keyLowercase = keyLowercase;
    this.ignoreArray = ignoreArray;
    this.levelDelimiter = levelDelimiter;
    this.files = files;
    this.output = [];
    this.outputOriginal = {};
    this.mainLanguageValues = {}; // Store values from the main language file
  }

  convert() {
    this.files.forEach((file) => this.convertFile(file, this.outputOriginal));
  }

  convertFile({ language, content }, target, fullPath = []) {
    Object.entries(content).forEach(([key, value]) => {
      if (Array.isArray(value) && this.ignoreArray && value !== null) {
        this.handleIgnoreArray(value, key, target);
        return;
      }
      if (typeof value === 'object' && value !== null) {
        if (target[key] === undefined) target[key] = Array.isArray(value) ? [] : {};
        this.convertFile({ language, content: value }, target[key], [...fullPath, key]);
        return;
      }
      const keyFullPath = [...fullPath, key].join(this.levelDelimiter);
      if (typeof value !== 'string' || !value.trim() || this.isIgnoredKey(keyFullPath)) {
        if (target[key] === undefined) target[key] = value;
        return;
      }
      let fullKey = `${this.prefix}${keyFullPath}`;
      if (this.keyLowercase) fullKey = fullKey.toLowerCase();
      const outputTypeManager = getOutputTypeManager(this.outputType);
      const variables = value.match(this.variableRegex);
      const translations = outputTypeManager.getTranslations({
        text: value,
        key: fullKey,
        variableRegex: this.variableRegex,
        variables,
      });
      translations.forEach((translation) => this.addTranslation(language, translation));
      if (target[key] === undefined) {
        target[key] = outputTypeManager.convertOriginalMessage(
          fullKey,
          variables,
          this.langSyntax,
          this.argsSyntax,
          this.argSyntax
        );
      }
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

  // Helper method to handle arrays when ignoreArray is enabled
  handleIgnoreArray(value, key, target) {
    if (!this.mainLanguageValues[key]) {
      // If the main language value for this key is not set yet, store it.
      this.mainLanguageValues[key] = deepCopyObject(value);
    }
    // Use the value from the main language file instead of the random value.
    target[key] = deepCopyObject(this.mainLanguageValues[key]);
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

export const handleConversion = ({
  prefix = '',
  variableRegex,
  outputType = 'triton_placeholders',
  langSyntax = 'lang',
  argsSyntax = 'args',
  argSyntax = 'arg',
  ignoredKeys = '',
  keyLowercase = false,
  ignoreArray = false,
  levelDelimiter = '.',
  files = {},
}) => {
  const converter = new Converter({
    prefix,
    variableRegex: variableRegex ? new RegExp(variableRegex, 'g') : /.^/g,
    outputType,
    langSyntax,
    argsSyntax,
    argSyntax,
    ignoredKeys: ignoredKeys
      .split('\n')
      .filter((value) => !!value)
      .map((value) => new RegExp(`^${value}$`)),
    keyLowercase,
    ignoreArray,
    levelDelimiter,
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
