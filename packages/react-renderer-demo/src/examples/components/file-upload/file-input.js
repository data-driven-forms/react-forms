import React, { useState } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import submitFunction from './upload-handler';

const fileSizeValidator = ({ maxSize }) => {
  return (value) => {
    if (value && value.inputFiles[0] && value.inputFiles[0].size > maxSize) {
      /**
       * Human readable message should be generated!
       */
      return `File is too large, maximum allowed size is ${maxSize} bytes. Current file has ${value.inputFiles[0].size} bytes`;
    }
  };
};

const FileUploadComponent = (props) => {
  const { input, meta, label } = useFieldApi(props);
  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <input id={input.name} {...input} />
      {meta.error && (
        <div>
          <span style={{ color: 'red' }}>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  'file-upload': FileUploadComponent
};

const schema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      label: 'Regular test field',
      name: 'regular-field'
    },
    {
      component: 'file-upload',
      label: 'File upload',
      name: 'file-upload-field-name',
      type: 'file',
      validate: [{ type: validatorTypes.REQUIRED }, { type: 'file-size', maxSize: 40000 }]
    }
  ]
};

const validatorMapper = {
  'file-size': fileSizeValidator
};

const FormWithFileUpload = () => {
  const [values, setValues] = useState();
  return (
    <div>
      {values && (
        <div>
          <h1>See that the files gets destroyed in JSON</h1>
          <h2>See console for the stored value</h2>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </div>
      )}
      <FormRenderer
        schema={schema}
        componentMapper={componentMapper}
        FormTemplate={FormTemplate}
        validatorMapper={validatorMapper}
        onSubmit={async (values, formApi) => {
          setValues(values);
          console.log('form values', values);
          console.log('formApi with fileInputs array', formApi);
          const encoded = await submitFunction(values, formApi);
          console.log('encoded image', encoded);
        }}
      />
    </div>
  );
};

export default FormWithFileUpload;
