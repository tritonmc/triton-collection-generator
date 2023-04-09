import * as placeholderApi from './placeholderApi';
import * as tritonPlaceholders from './tritonPlaceholders';

export const getOutputTypeManager = (outputType) => {
  if (outputType === 'triton_placeholders') return tritonPlaceholders;
  if (outputType === 'triton_placeholders_custom') return tritonPlaceholders;
  if (outputType === 'papi') return placeholderApi;
  throw new Error(`Output type manager not available for ${outputType}`);
};

export default getOutputTypeManager;
