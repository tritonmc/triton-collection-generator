import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { handleConversion } from '../../lib/converter';
import { downloadFiles, getAllFileContents } from '../../lib/files';

const SubmitButton = ({
  prefix,
  variableRegex,
  outputType,
  ignoredKeys,
  levelDelimiter,
  files,
}) => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const fileContents = await getAllFileContents(files);
    const result = handleConversion({
      prefix,
      variableRegex,
      outputType,
      ignoredKeys,
      levelDelimiter,
      files: fileContents,
    });
    downloadFiles(result);
  };

  return (
    <Button
      onClick={onSubmit}
      disabled={files.length === 0}
      variant='contained'
      color='primary'
      type='submit'
    >
      Convert
    </Button>
  );
};

SubmitButton.propTypes = {
  prefix: PropTypes.string,
  variableRegex: PropTypes.string,
  outputType: PropTypes.string,
  ignoredKeys: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.any),
};

SubmitButton.defaultProps = {
  prefix: '',
  variableRegex: '',
  outputType: '',
  ignoredKeys: '',
  files: [],
};

export default SubmitButton;
