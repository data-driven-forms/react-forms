/* eslint react/prop-types: "off" */
import React, { useState } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 16
};

const inputStyles = {
  width: '100%',
  padding: '12px 20px',
  margin: '8px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: 4,
  boxSizing: 'border-box'
};

const paragraphStyle = {
  marginTop: 0,
  marginBottom: 4
};

const requiredStyle = {
  color: 'red',
  marginLeft: 2
};

const errorStyle = {
  color: 'orangered'
};

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
    <div
      style={{
        ...formGroupStyle,
        ...(isRequired && requiredStyle),
        ...(error && touched && errorStyle)
      }}
    >
      <label style={{ color: 'initial' }} htmlFor={input.name}>
        {isRequired && <span style={errorStyle}>*&nbsp;</span>}
        {label}
      </label>
      <input style={inputStyles} id={input.name} {...input} {...rest} />
      {touched && error && <p style={paragraphStyle}>{error}</p>}
      {customProp && <p style={{ color: 'initial' }}>This is a custom prop and has nothing to do with form schema</p>}
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
    ]
  };
  return (
    <div>
      <FormRenderer
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
