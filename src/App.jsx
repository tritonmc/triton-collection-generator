import './App.css';

import { unflatten } from 'flat';
import fileDownload from 'js-file-download';
import { safeDump } from 'js-yaml';
import properties from 'properties';
import React from 'react';

import InputForm from './InputForm';
import { getAllFileContents, handleContent } from './utils';

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

const App = () => (
  <div className='App'>
    <h1>Triton Collection Generator</h1>
    <p>
      As you can probably see due to the lack of styling, this is a tool aimed at developers and
      wasn&apos;t built with user friendliness in mind.
      <br />
      <span style={{ color: 'red' }}>
        Use at your own risk! The creator of this tool is in no way responsible for any damages.
      </span>
    </p>
    <InputForm onSubmit={onSubmit} />
    <p>
      Copyright &copy;
      {new Date().getFullYear()} Diogo Correia (Rexcantor64)
    </p>
  </div>
);

export default App;
