import React from 'react';
import './App.css';
import InputForm from './InputForm';
import { getAllFileContents, handleContent } from './utils';
import fileDownload from 'js-file-download';
import properties from 'properties';
import { unflatten } from 'flat';
import { safeDump } from 'js-yaml';

const onSubmit = (values, { setSubmitting }) => {
  setTimeout(async () => {
    const regex = new RegExp(values.regex, 'g');
    let ignoreKeys = [];
    if (!!values.ignoreKeys) ignoreKeys = values.ignoreKeys.split('\n').map((v) => new RegExp(v));
    const files = await getAllFileContents(values.files);
    const options = {
      prefix: values.prefix,
      regex,
      files,
      ignoreKeys,
    };
    if (values.type === 'properties') {
      let { output, outputOriginal } = handleContent(0, options);
      fileDownload(JSON.stringify(output, null, 2), 'output.json');
      fileDownload(properties.stringify(outputOriginal), 'original.properties');
    } else if (values.type === 'yaml') {
      let { output, outputOriginal } = handleContent(1, options);

      fileDownload(JSON.stringify(output, null, 2), 'output.json');
      fileDownload(safeDump(unflatten(outputOriginal, { object: false })), 'original.yml');
    }
    setSubmitting(false);
  }, 400);
};

const App = () => {
  return (
    <div className='App'>
      <InputForm onSubmit={onSubmit} />
    </div>
  );
};

export default App;
