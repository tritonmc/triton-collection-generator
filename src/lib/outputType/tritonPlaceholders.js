export const convertOriginalMessage = (key, variables) => {
  if (!variables) return `[lang]${key}[/lang]`;
  return `[lang]${key}[args]${variables.map((v) => `[arg]${v}[/arg]`).join('')}[/args][/lang]`;
};

export const getTranslations = ({ text, key, variables }) => {
  let i = 0;
  let result = text;
  if (variables)
    variables.forEach((v) => {
      result = result.replace(v, `%${(i += 1)}`);
    });
  return [{ key, value: result }];
};

export default convertOriginalMessage;
