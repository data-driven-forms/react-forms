/* eslint react/prop-types: "off" */
import React, { useState } from 'react';
import FormRender, { componentTypes, useFieldApi, useFormApi } from '@data-driven-forms/react-form-renderer';

import './form-fields-mapper-docs.css';

const getButtonStyle = (variant) => ({
  color: 'White',
  backgroundColor: variant === 'primary' ? 'RebeccaPurple' : '#888',
  padding: '8px 16px',
  borderRadius: 4,
  cursor: 'pointer',
  border: 'none',
  marginRight: 4
});

const Button = ({ children, label, variant, ...props }) => (
  <button style={getButtonStyle(variant)} {...props}>
    {label}
  </button>
);

const FormTemplate = ({ formFields }) => {
  const { handleSubmit, onCancel } = useFormApi();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      {formFields}
      <Button type="submit" variant="primary" label="Submit" />
      <Button type="button" label="cancel" onClick={onCancel} />
    </form>
  );
};

const TextField = (props) => {
  const {
    customProp,
    label,
    input,
    isRequired,
    meta: { error, touched },
    FieldArrayProvider,
    dataType,
    ...rest
  } = useFieldApi(props);
  return (
    <div className={`ddorg__demo-formGroup ${isRequired ? 'required' : ''} ${error ? 'error' : ''}`}>
      <label htmlFor={input.name}>{label}</label>
      <input id={input.name} {...input} {...rest} />
      {touched && error && <p className="error-text">{error}</p>}
      {customProp && <p>This is a custom prop and has nothing to do with form schema</p>}
    </div>
  );
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  'custom-component-type': TextField
};

const ComponentMapper = () => {
  const [values, setValues] = useState({});
  const schema = {
    fields: [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'first-name',
        label: 'First name',
        isRequired: true,
        validate: [(value) => (!value || value.lenght === 0 ? 'Required' : undefined)],
        customProp: true
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'last-name',
        label: 'Last name',
        isRequired: true,
        validate: [(value) => (!value || value.lenght === 0 ? 'Required' : undefined)]
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'age',
        label: 'Your age',
        type: 'number'
      },
      {
        component: 'custom-component-type',
        name: 'password',
        label: 'Your password',
        type: 'password'
      }
    ],
    title: 'Custom form fields mapper and layout mapper',
    description: 'If you want to see the source code, please expand the code example.'
  };
  return (
    <div>
      <FormRender
        componentMapper={componentMapper}
        FormTemplate={FormTemplate}
        schema={schema}
        onSubmit={(values) => setValues(values)}
        onCancel={() => console.log('cancel action')}
      />
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

export default ComponentMapper;
