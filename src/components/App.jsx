import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { unflatten } from 'flat';
import fileDownload from 'js-file-download';
import { safeDump } from 'js-yaml';
import properties from 'properties';
import React from 'react';

import { getAllFileContents, handleContent } from '../lib/converter';
import DevelopmentWarning from './boilerplate/DevelopmentWarning';
import Footer from './boilerplate/Footer';
import Navbar from './boilerplate/Navbar';
import InputForm from './InputForm';

const onSubmit = (values, { setSubmitting }) => {
  setTimeout(async () => {
    const regex = new RegExp(values.regex, 'g');
    let ignoreKeys = [];
    if (values.ignoreKeys) ignoreKeys = values.ignoreKeys.split('\n').map((v) => new RegExp(v));
    const files = await getAllFileContents(values.files);
    const options = {
      prefix: values.prefix,
      regex,
      files,
      ignoreKeys,
    };
    if (values.type === 'properties') {
      const { output, outputOriginal } = handleContent(0, values.output, options);
      fileDownload(JSON.stringify(output, null, 2), 'output.json');
      fileDownload(properties.stringify(outputOriginal), 'original.properties');
    } else if (values.type === 'yaml') {
      const { output, outputOriginal } = handleContent(1, values.output, options);

      fileDownload(JSON.stringify(output, null, 2), 'output.json');
      fileDownload(safeDump(unflatten(outputOriginal, { object: false })), 'original.yml');
    }
    setSubmitting(false);
  }, 400);
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Container fixed className={classes.container}>
        <DevelopmentWarning />
        <InputForm onSubmit={onSubmit} />
        <Footer />
      </Container>
    </div>
  );
};

export default App;
