import { Field, Form, Formik } from 'formik';
import React from 'react';
import Dropzone from 'react-dropzone';

const dropzoneStyle = {
  width: '100%',
  height: 'auto',
  borderWidth: 2,
  borderColor: 'rgb(102, 102, 102)',
  borderStyle: 'dashed',
  borderRadius: 5,
  boxSizing: 'border-box',
};

class InputForm extends React.Component {
  render() {
    return (
    <Formik
        initialValues={{ prefix: '', type: 'properties', regex: '', files: [] }}
        validate={() => ({})}
        onSubmit={this.props.onSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <label>Prefix: </label>
            <Field type='text' name='prefix' placeholder='skywars.'/>
            <br/>
            <label>File type: </label>
            <Field component='select' name='type'>
              <option value='properties'>Properties</option>
              <option value='yaml'>YAML</option>
            </Field>
            <br/>
            <label>
              {`Variable Regex (`}
              <a href='https://regexr.com/' target='_blank' rel='noopener noreferrer'>
                help
              </a>
              {`): `}
            </label>
            <Field type='text' name='regex' placeholder='%\w+%'/>
            <br/>
            <label>Output keys type: </label>
            <Field component='select' name='output'>
              <option value='tags'>[lang] tags</option>
              <option value='placeholder'>placeholders</option>
            </Field>
            <br/>
            <label>Ignore keys (add a line for each key): </label>
            <br/>
            <Field as='textarea' name='ignoreKeys' rows={6} cols={50}/>
            <div>
              <label>Input files</label>
              <Dropzone
                multiple
                onDrop={(acceptedFiles) => {
                  if (acceptedFiles.length === 0) {
                    return;
                  }
                  setFieldValue('files', values.files.concat(acceptedFiles));
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section style={dropzoneStyle}>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <h4>Files <button onClick={e => {e.preventDefault(); values.files = []; this.setState({});}}>Clear</button></h4>
              <ul>
                {values.files.map((file, i) => (
                  <li key={file.path}>
                    {file.path} - {file.size} bytes <button onClick={e => {
                    e.preventDefault();
                    const newFiles = [...values.files.slice(0, i), ...values.files.slice(i + 1)];
                    this.setState({});
                    values.files = newFiles;
                  }}>
                    X</button>
                  </li>
                ))}
              </ul>
            </div>
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default InputForm;
