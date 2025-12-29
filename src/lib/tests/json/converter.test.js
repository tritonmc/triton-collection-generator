import { handleConversion } from '../../converter';
import { getOutput, getInput } from '../resources';

describe('With JSON input in two languages (en_GB & pt_PT)', () => {
  const inputFiles = getInput({ 'en_GB.json': 'en_GB.json', 'pt_PT.json': 'pt_PT.json' }, 'json');

  it.each([
    ['converts files with default options', {}, 1],
    ['converts files with a custom prefix', { prefix: 'customPrefix.' }, 2],
    ['converts files with variables', { variableRegex: /%\d/ }, 3],
    ['converts files with PlaceholderAPI output, without variables', { outputType: 'papi' }, 4],
    [
      'converts files with PlaceholderAPI output, with variables',
      { outputType: 'papi', variableRegex: /%\d/ },
      5,
    ],
    ['converts files with ignored keys', { ignoredKeys: 'section2\\.array2\\.\\d' }, 6],
    ['converts files with custom level delimiter', { levelDelimiter: '_' }, 7],
    [
      'converts files with all available options',
      {
        prefix: 'customPrefix_',
        variableRegex: /%\d/,
        outputType: 'triton_placeholders',
        ignoredKeys: 'section2_array2_\\d',
        levelDelimiter: '_',
      },
      8,
    ],
    ['converts files while ignoring arrays', { ignoreArrays: true }, 9],
    ['converts files and transforms keys to uppercase', { itemKeyFormat: 'uppercase' }, 10],
    ['converts files and transforms keys to lowercase', { itemKeyFormat: 'lowercase' }, 11],
  ])('%s', (_, options, index) => {
    const result = handleConversion({ ...options, files: inputFiles });
    const expectedResult = getOutput(`original${index}.json`, `output${index}.json`, 'json');

    expect(result).toStrictEqual(expectedResult);
  });
});
