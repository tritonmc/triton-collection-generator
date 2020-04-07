import { FormHelperText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  dropzone: {
    background: theme.palette.background.default,
    color: theme.palette.getContrastText(theme.palette.background.default),
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

const acceptedFiles = ['.properties', '.yml', '.yaml'];
const dropzoneText = `Drag and drop a file here or click here. Accepted formats: ${acceptedFiles.join(
  ', '
)}`;

const FileUpload = ({ setFiles }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h6'>Input files</Typography>
      <DropzoneArea
        onChange={setFiles}
        dropzoneClass={classes.dropzone}
        acceptedFiles={acceptedFiles}
        filesLimit={50}
        maxFile={10000000} // 10 MB
        dropzoneText={dropzoneText}
        useChipsForPreview
        previewChipProps={{ className: classes.chip }}
      />
      <FormHelperText>The first file in the list above will be the main language.</FormHelperText>
    </div>
  );
};

FileUpload.propTypes = {
  setFiles: PropTypes.func.isRequired,
};

export default FileUpload;
