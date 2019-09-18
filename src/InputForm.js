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

const InputForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ prefix: '', type: 'properties', regex: '', files: [] }}
    validate={() => ({})}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, values, setFieldValue }) => (
      <Form>
        <label>Prefix: </label>
        <Field type='text' name='prefix' />
        <br />
        <label>File type: </label>
        <Field component='select' name='type'>
          <option value='properties'>Properties</option>
          <option value='yaml'>YAML</option>
        </Field>
        <br />
        <label>Variable Regex: </label>
        <Field type='text' name='regex' />
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
          <h4>Files</h4>
          <ul>
            {values.files.map((file) => (
              <li key={file.path}>
                {file.path} - {file.size} bytes
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

export default InputForm;

/*import React from 'react';
import { Formik } from 'formik';
import Dropzone from 'react-dropzone';

import Thumb from './Thumb';

const dropzoneStyle = {
  width: '90%',
  height: 'auto',
  borderWidth: 2,
  borderColor: 'rgb(102, 102, 102)',
  borderStyle: 'dashed',
  borderRadius: 5,
};

const App = () => (
  <div className='container'>
    <Formik
      initialValues={{
        files: [],
      }}
      onSubmit={(values) => {
        alert(
          JSON.stringify(
            {
              files: values.files.map((file) => ({
                fileName: file.name,
                type: file.type,
                size: `${file.size} bytes`,
              })),
            },
            null,
            2
          )
        );
      }}
      render={({ values, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Multiple files</label>
            <Dropzone
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
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      )}
    />
  </div>
);

export default App;*/
