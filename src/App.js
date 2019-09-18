import React from 'react';
import './App.css';
import InputForm from './InputForm';
import { getAllFileContents, handlePropertiesContent, handleYamlContent } from './utils';
import fileDownload from 'js-file-download';
import properties from 'properties';
import { unflatten } from 'flat';
import { safeDump } from 'js-yaml';

const onSubmit = (values, { setSubmitting }) => {
  setTimeout(async () => {
    var regex = new RegExp(values.regex, 'g');
    var files = await getAllFileContents(values.files);
    if (values.type === 'properties') {
      let { output, outputOriginal } = handlePropertiesContent(values.prefix, regex, files);
      fileDownload(JSON.stringify(output, null, 2), 'output.json');
      fileDownload(properties.stringify(outputOriginal), 'original.properties');
    } else if (values.type === 'yaml') {
      let { output, outputOriginal } = handleYamlContent(values.prefix, regex, files);

      fileDownload(JSON.stringify(output, null, 2), 'output.json');
      fileDownload(safeDump(unflatten(outputOriginal, { object: true })), 'original.yml');
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
