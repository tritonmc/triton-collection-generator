import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { handleConversion } from '../../lib/converter';
import { downloadFiles, getAllFileContents } from '../../lib/files';

const SubmitButton = ({
  prefix,
  variableRegex,
  outputType,
  langSyntax,
  argsSyntax,
  argSyntax,
  ignoredKeys,
  itemKeyFormat,
  ignoreArray,
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
      langSyntax,
      argsSyntax,
      argSyntax,
      ignoredKeys,
      itemKeyFormat,
      ignoreArray,
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
  langSyntax: PropTypes.string,
  argsSyntax: PropTypes.string,
  argSyntax: PropTypes.string,
  ignoredKeys: PropTypes.string,
  itemKeyFormat: PropTypes.string,
  ignoreArray: PropTypes.bool,
  files: PropTypes.arrayOf(PropTypes.any),
};

SubmitButton.defaultProps = {
  prefix: '',
  variableRegex: '',
  outputType: '',
  langSyntax: 'lang',
  argsSyntax: 'args',
  argSyntax: 'arg',
  ignoredKeys: '',
  itemKeyFormat: 'default',
  ignoreArray: false,
  files: [],
};

export default SubmitButton;
