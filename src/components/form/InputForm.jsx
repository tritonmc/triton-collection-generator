import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

import FileUpload from './FileUpload';
import Select from './Select';
import SubmitButton from './SubmitButton';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
}));

const handleFieldChange = (setValue) => (event) => setValue(event.target.value);

const outputTypeOptions = [
  {
    name: 'Triton Placeholders ([lang] tags)',
    value: 'triton_placeholders',
  },
  {
    name: 'Placeholder API',
    value: 'papi',
  },
];

const InputForm = () => {
  const classes = useStyles();
  const [prefix, setPrefix] = useState('');
  const [variableRegex, setVariableRegex] = useState('');
  const [outputType, setOutputType] = useState('triton_placeholders');
  const [ignoredKeys, setIgnoredKeys] = useState('');
  const [levelDelimiter, setLevelDelimiter] = useState('.');
  const [files, setFiles] = useState([]);

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        label='Prefix'
        value={prefix}
        onChange={handleFieldChange(setPrefix)}
        placeholder='skywars.'
        fullWidth
        margin='normal'
        variant='outlined'
      />
      <TextField
        label='Variable Regex'
        value={variableRegex}
        onChange={handleFieldChange(setVariableRegex)}
        placeholder='%\w+%'
        helperText='Regex that matches the variables in the original file.'
        fullWidth
        margin='normal'
        variant='outlined'
      />
      <Select
        title='Original Output Type'
        options={outputTypeOptions}
        value={outputType}
        onChange={handleFieldChange(setOutputType)}
      />
      <TextField
        label='Level Delimiter'
        value={levelDelimiter}
        onChange={handleFieldChange(setLevelDelimiter)}
        helperText='(Advanced) The delimiter used when flatting the path for a translation key.'
        fullWidth
        margin='normal'
        variant='outlined'
      />
      <TextField
        multiline
        label='Ignored keys'
        value={ignoredKeys}
        onChange={handleFieldChange(setIgnoredKeys)}
        helperText='One key per line. Uses regex. Delimiters (^ and $) are added automatically.'
        fullWidth
        margin='normal'
        variant='outlined'
      />
      <FileUpload setFiles={setFiles} />
      <SubmitButton
        prefix={prefix}
        variableRegex={variableRegex}
        outputType={outputType}
        ignoredKeys={ignoredKeys}
        levelDelimiter={levelDelimiter}
        files={files}
      />
    </form>
  );
};

export default InputForm;
