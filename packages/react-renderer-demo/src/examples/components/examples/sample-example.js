import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';

import FormTemplate from '@data-driven-forms/mui-component-mapper/dist/cjs/form-template';

const CustomComponent = (props) => {
  const { input, meta, label, ...rest } = useFieldApi(props);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
      <label style={{ marginBottom: 6 }} htmlFor={input.name}>
        {label}
      </label>
      <input {...input} {...rest} />
      {meta.error && <p>{meta.error}</p>}
    </div>
  );
};

const schema = {
  fields: [
    {
      component: 'custom-component',
      name: 'some-name',
      label: 'Custom component prop',
      validate: [{ type: validatorTypes.REQUIRED, message: 'I am a required field' }]
    }
  ]
};

const SampleExample = () => {
  return (
    <FormRenderer schema={schema} componentMapper={{ 'custom-component': CustomComponent }} FormTemplate={FormTemplate} onSubmit={console.log} />
  );
};

SampleExample.displayName = 'SampleExample';

export default SampleExample;
