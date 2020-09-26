import { handleConversion } from '../../converter';
import { getOutput, getInput } from '../resources';

describe('With YAML input in two languages (en_GB & pt_PT)', () => {
  const inputFiles = getInput({ 'en_GB.yml': 'en_GB.yml', 'pt_PT.yml': 'pt_PT.yml' }, 'yml');

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
  ])('%s', (_, options, index) => {
    const result = handleConversion({ ...options, files: inputFiles });
    const expectedResult = getOutput(`original${index}.yml`, `output${index}.json`, 'yml');

    expect(result).toStrictEqual(expectedResult);
  });
});
