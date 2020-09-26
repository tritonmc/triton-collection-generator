import { handleConversion } from '../../converter';
import { getOutput, getInput } from '../resources';

describe('With PROPERTIES input in two languages (en_GB & pt_PT)', () => {
  const inputFiles = getInput(
    { 'en_GB.properties': 'en_GB.properties', 'pt_PT.properties': 'pt_PT.properties' },
    'properties'
  );

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
    [
      'converts files with all available options',
      {
        prefix: 'customPrefix.',
        variableRegex: /%\d/,
        outputType: 'triton_placeholders',
        ignoredKeys: 'section2\\.array2\\.\\d',
      },
      7,
    ],
  ])('%s', (_, options, index) => {
    const result = handleConversion({ ...options, files: inputFiles });
    const expectedResult = getOutput(
      `original${index}.properties`,
      `output${index}.json`,
      'properties'
    );

    expect(result).toStrictEqual(expectedResult);
  });
});
