import { Alert } from '@mui/material';
import React from 'react';

const DevelopmentWarning = () => {
  return (
    <Alert severity='warning'>
      This tool is still in the development phase. The developer of this tool is in no way
      responsible for any damages.
      <br />
      With that said, feel free to submit a PR or open an issue on GitHub!
    </Alert>
  );
};

export default DevelopmentWarning;
