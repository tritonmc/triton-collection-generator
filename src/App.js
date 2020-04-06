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
      let { output, outputOriginal } = handleContent(0, values.output, options);
      fileDownload(JSON.stringify(output, null, 2), 'output.json');
      fileDownload(properties.stringify(outputOriginal), 'original.properties');
    } else if (values.type === 'yaml') {
      let { output, outputOriginal } = handleContent(1, values.output, options);

      fileDownload(JSON.stringify(output, null, 2), 'output.json');
      fileDownload(safeDump(unflatten(outputOriginal, { object: false })), 'original.yml');
    }
    setSubmitting(false);
  }, 400);
};

const App = () => {
  return (
    <div className='App'>
      <h1>Triton Collection Generator</h1>
      <p>
        As you can probably see due to the lack of styling, this is a tool aimed at developers and
        wasn't built with user friendliness in mind.
        <br />
        <span style={{ color: 'red' }}>
          Use at your own risk! The creator of this tool is in no way responsible for any damages.
        </span>
      </p>
      <InputForm onSubmit={onSubmit} />
      <p>Copyright &copy; {new Date().getFullYear()} Diogo Correia (Rexcantor64)</p>
    </div>
  );
};

export default App;
