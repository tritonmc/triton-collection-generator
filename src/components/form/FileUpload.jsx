import { FormHelperText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// import { DropzoneArea } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import React from 'react';

const PREFIX = 'FileUpload';

const classes = {
  root: `${PREFIX}-root`,
  dropzone: `${PREFIX}-dropzone`,
  chip: `${PREFIX}-chip`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },

  [`& .${classes.dropzone}`]: {
    background: theme.palette.background.default,
    color: theme.palette.getContrastText(theme.palette.background.default),
  },

  [`& .${classes.chip}`]: {
    margin: theme.spacing(1),
  }
}));

const acceptedFiles = ['.properties', '.yml', '.yaml', '.json'];
const dropzoneText = `Drag and drop your files here or click here. File names will be used as language IDs. Accepted formats: ${acceptedFiles.join(
  ', '
)}`;

const FileUpload = ({ setFiles }) => {


  return (
    <Root className={classes.root}>
      <Typography variant='h6'>Input files</Typography>
      {/*<DropzoneArea
        onChange={setFiles}
        dropzoneClass={classes.dropzone}
        acceptedFiles={acceptedFiles}
        filesLimit={50}
        maxFile={10000000} // 10 MB
        dropzoneText={dropzoneText}
        useChipsForPreview
        previewChipProps={{ className: classes.chip }}
      />*/}
      <FormHelperText>The first file in the list above will be the main language.</FormHelperText>
    </Root>
  );
};

FileUpload.propTypes = {
  setFiles: PropTypes.func.isRequired,
};

export default FileUpload;
