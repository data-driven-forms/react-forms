import React, { useState } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/dist/cjs/form-template';
import TextField from '@data-driven-forms/pf4-component-mapper/dist/cjs/text-field';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import submitFunction from './upload-handler';

const FileUploadComponent = (props) => {
  const { input, label } = useFieldApi(props);
  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <input id={input.name} {...input} />
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
      type: 'file'
    }
  ]
};

const FormWithFileUpload = () => {
  const [values, setValues] = useState();
  return (
    <div className="pf4">
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
