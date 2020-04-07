export const convertOriginalMessage = (key, variables) => {
  if (!variables) return `%triton_${key}%`;
  return `${variables.map((v, i) => `%triton_${key}.${i}%${v}`).join('')}%triton_${key}.${
    variables.length
  }%`;
};

export const getTranslations = ({ text, key, variableRegex }) => {
  const textArray = text.split(variableRegex);
  return textArray.map((section, i) => ({
    key: `${key}.${i}`,
    value: section,
  }));
};

export default convertOriginalMessage;
