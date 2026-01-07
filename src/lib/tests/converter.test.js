import { handleConversion } from '../converter';
import { findJsonOutput } from './resources';

describe('With JSON input in one language, various contentFormat', () => {
  const inputFiles = {
    "en_GB.json": JSON.stringify({
      "example.key": "Lorem ipsum",
    }),
  };

  const original = {
    "example.key": "[lang]example.key[/lang]",
  };

  it("does not add any tags on legacy format", () => {
    const result = handleConversion({ contentFormat: 'legacy', files: inputFiles });
    const expectedOutput = [
      {
        type: "text",
        key: "example.key",
        languages: {
          en_GB: "Lorem ipsum",
        },
      },
    ];

    expect(findJsonOutput(result, "original.json")).toStrictEqual(original);
    expect(findJsonOutput(result, "output.json")).toStrictEqual(expectedOutput);
  });

  it("adds extra tag on minimessage format", () => {
    const result = handleConversion({ contentFormat: 'minimsg', files: inputFiles });
    const expectedOutput = [
      {
        type: "text",
        key: "example.key",
        languages: {
          en_GB: "[minimsg]Lorem ipsum",
        },
      },
    ];

    expect(findJsonOutput(result, "original.json")).toStrictEqual(original);
    expect(findJsonOutput(result, "output.json")).toStrictEqual(expectedOutput);
  });

  it("adds extra tag on json format", () => {
    const result = handleConversion({ contentFormat: 'json', files: inputFiles });
    const expectedOutput = [
      {
        type: "text",
        key: "example.key",
        languages: {
          en_GB: "[triton_json]Lorem ipsum",
        },
      },
    ];

    expect(findJsonOutput(result, "original.json")).toStrictEqual(original);
    expect(findJsonOutput(result, "output.json")).toStrictEqual(expectedOutput);
  });
});
