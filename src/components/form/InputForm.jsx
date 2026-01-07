import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  HelpOutline as HelpOutlineIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import FileUpload from './FileUpload';
import Select from './Select';
import SubmitButton from './SubmitButton';

const PREFIX = 'InputForm';

const classes = {
  root: `${PREFIX}-root`,
  accordion: `${PREFIX}-accordion`,
  accordionHeading: `${PREFIX}-accordionHeading`,
  tooltipText: `${PREFIX}-tooltipText`,
};

const Root = styled('form')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    margin: theme.spacing(3),
  },
  [`& .${classes.accordion}`]: {
    marginTop: 1,
    '&.Mui-expanded': {
      marginTop: -theme.spacing(0.5),
    },
  },
  [`& .${classes.accordionHeading}`]: {
    marginLeft: theme.spacing(1),
  },
  [`& .${classes.tooltipText}`]: {
    fontSize: 16,
    maxWidth: 350,
  },
}));

const handleFieldChange = (setValue) => (event) => setValue(event.target.value);
const handleCheckboxChange = (setChecked) => (event) => setChecked(event.target.checked);

const outputTypeOptions = [
  {
    name: 'Triton Placeholders ([lang] tags)',
    value: 'triton_placeholders',
  },
  {
    name: 'Triton Placeholders (Custom Tags)',
    value: 'triton_placeholders_custom',
  },
  {
    name: 'Placeholder API',
    value: 'papi',
  },
];

const contentFormatOptions = [
  {
    name: 'Legacy formatting (& or §)',
    value: 'legacy',
  },
  {
    name: 'MiniMessage',
    value: 'minimsg',
  },
  {
    name: 'JSON',
    value: 'json',
  },
]

const itemKeyFormatOptions = [
  {
    name: 'Preserve',
    value: 'preserve',
  },
  {
    name: 'All Lowercase',
    value: 'lowercase',
  },
  {
    name: 'All Uppercase',
    value: 'uppercase',
  },
];

const InputForm = () => {

  const [prefix, setPrefix] = useState('');
  const [variableRegex, setVariableRegex] = useState('');
  const [contentFormat, setContentFormat] = useState('legacy');
  const [outputType, setOutputType] = useState('triton_placeholders');
  const [ignoredKeys, setIgnoredKeys] = useState('');
  const [langSyntax, setLangSyntax] = useState('lang');
  const [argSyntax, setArgSyntax] = useState('arg');
  const [argsSyntax, setArgsSyntax] = useState('args');
  const [levelDelimiter, setLevelDelimiter] = useState('.');
  const [itemKeyFormat, setItemKeyFormat] = useState('preserve');
  const [ignoreArrays, setIgnoreArrays] = useState(false);
  const [files, setFiles] = useState([]);

  const isCustomPlaceholders = outputType === 'triton_placeholders_custom';

  return (
    <Root className={classes.root} noValidate autoComplete='off'>
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
        title='Input Content Format'
        options={contentFormatOptions}
        value={contentFormat}
        onChange={handleFieldChange(setContentFormat)}
      />
      <Select
        title='Original Output Type'
        options={outputTypeOptions}
        value={outputType}
        onChange={handleFieldChange(setOutputType)}
      />
      {isCustomPlaceholders && (
        <>
          <TextField
            label='Lang Syntax'
            value={langSyntax}
            onChange={handleFieldChange(setLangSyntax)}
            placeholder='lang'
            helperText={`Custom lang tag you want to use. Start tag [${langSyntax}] and end tags [/${langSyntax}] are added automatically.`}
            margin='normal'
            variant='outlined'
            fullWidth
          />
          <TextField
            label='Args Syntax'
            value={argsSyntax}
            onChange={handleFieldChange(setArgsSyntax)}
            placeholder='args'
            helperText={`Custom args tag you want to use. Start tag [${argsSyntax}] and end tags [/${argsSyntax}] are added automatically.`}
            margin='normal'
            variant='outlined'
            fullWidth
          />
          <TextField
            label='Arg Syntax'
            value={argSyntax}
            onChange={handleFieldChange(setArgSyntax)}
            placeholder='arg'
            helperText={`Custom arg tag you want to use. Start tag [${argSyntax}] and end tags [/${argSyntax}] are added automatically.`}
            margin='normal'
            variant='outlined'
            fullWidth
          />
        </>
      )}
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
      <Accordion className={classes.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id='additional-options'>
          <AddIcon />
          <div>
            <Typography className={classes.accordionHeading}>Additional options</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component='fieldset'>
            <FormGroup>
              <div>
                <Tooltip
                  classes={{ tooltip: classes.tooltipText }}
                  title='An array is a data structure that holds a collection of items. When this
                      option is checked, the converter will preserve any list-like data, ignored arrays data are copied from the main language file.'
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ignoreArrays}
                        onChange={handleCheckboxChange(setIgnoreArrays)}
                      />
                    }
                    label={
                      <>
                        Ignore Arrays
                        <HelpOutlineIcon style={{ marginLeft: 4, fontSize: 15 }} />
                      </>
                    }
                  />
                </Tooltip>
                <FormHelperText>
                  When checked, the converter will keep all list-like data unchanged during
                  conversion, remain consistent with the main language file.
                </FormHelperText>
              </div>
              <div>
                <Select
                  title='Item Key Formatting Style'
                  options={itemKeyFormatOptions}
                  value={itemKeyFormat}
                  onChange={handleFieldChange(setItemKeyFormat)}
                  fullWidth
                  margin='normal'
                  variant='outlined'
                />
                <FormHelperText>
                  Select the style for item keys in the converted output file.
                  <br />
                  Preserve: Keep the key format as is in the original files (e.g., plugin.Messages.Prefix).
                  <br />
                  All Lowercase: Convert all item keys to lowercase (e.g., plugin.messages.prefix).
                  <br />
                  All Uppercase: Convert all item keys to uppercase (e.g., PLUGIN.MESSAGES.PREFIX).
                </FormHelperText>
              </div>
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <FileUpload setFiles={setFiles} />
      <SubmitButton
        prefix={prefix}
        variableRegex={variableRegex}
        contentFormat={contentFormat}
        outputType={outputType}
        langSyntax={langSyntax}
        argsSyntax={argsSyntax}
        argSyntax={argSyntax}
        ignoredKeys={ignoredKeys}
        itemKeyFormat={itemKeyFormat}
        ignoreArrays={ignoreArrays}
        levelDelimiter={levelDelimiter}
        files={files}
      />
    </Root>
  );
};

export default InputForm;
