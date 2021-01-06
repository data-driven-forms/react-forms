/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react';
import { FormRenderer, componentTypes, useFormApi, useFieldApi, FieldArray } from '@data-driven-forms/react-form-renderer';

const wrapperStyles = {
  padding: 16,
  borderRadius: 4,
  fontFamily: 'Roboto'
};

const getBackgroundColor = (variant) =>
  ({
    primary: 'RebeccaPurple',
    add: 'LimeGreen',
    remove: '#FF4136'
  }[variant] || '#888');

const getButtonStyle = (variant) => ({
  color: 'White',
  backgroundColor: getBackgroundColor(variant),
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

const TextField = (props) => {
  const {
    input,
    meta: { touched, error },
    label,
    isRequired,
    ...rest
  } = useFieldApi(props);
  return (
    <div className={`ddorg__demo-formGroup ${isRequired ? 'required' : ''} ${error ? 'error' : ''}`}>
      <label htmlFor={input.name}>{label}</label>
      <br />
      <input id={input.name} {...input} {...rest} />
      {touched && error && <p className="error-text">{error}</p>}
      <br />
    </div>
  );
};

const ArrayItem = ({ fields, fieldIndex, name, remove }) => {
  const { renderForm } = useFormApi();
  const editedFields = fields.map((field) => ({ ...field, name: `${name}.${field.name}` }));

  return (
    <React.Fragment>
      {renderForm(editedFields)}
      <br />
      <Button onClick={() => remove(fieldIndex)} label="Remove" type="button" variant="remove" />
      <br />
      <br />
      <br />
    </React.Fragment>
  );
};

const FieldArrayCustom = (props) => {
  const { fieldKey, arrayValidator, title, description, fields, itemDefault, meta, ...rest } = useFieldApi(props);
  const { dirty, submitFailed, error } = meta;
  const isError = (dirty || submitFailed) && error && typeof error === 'string';

  return (
    <FieldArray key={fieldKey} name={rest.input.name} validate={arrayValidator}>
      {(cosi) => (
        <Fragment>
          {title && <h3>{title}</h3>}
          {description && <p>{description}</p>}
          {cosi.fields.map((name, index) => (
            <ArrayItem
              key={`${name || fieldKey}-${index}`}
              fields={fields}
              name={name}
              fieldKey={fieldKey}
              fieldIndex={index}
              remove={cosi.fields.remove}
            />
          ))}
          {isError && error}
          <br />
          <Button type="button" variant="add" onClick={() => cosi.fields.push(itemDefault)} label="Add +" />
          <br />
          <br />
        </Fragment>
      )}
    </FieldArray>
  );
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.FIELD_ARRAY]: FieldArrayCustom
};

const FormTemplate = ({ formFields }) => {
  const { handleSubmit, valid } = useFormApi();

  return (
    <form onSubmit={handleSubmit} style={wrapperStyles}>
      {formFields}
      <Button type="submit" label="Submit" variant="primary" disabled={!valid} />
    </form>
  );
};

const FieldArrayProvider = () => {
  const [values, setValues] = useState(undefined);

  const schema = {
    fields: [
      {
        component: componentTypes.FIELD_ARRAY,
        name: 'nice_people',
        fieldKey: 'field_array',
        title: 'Nice people',
        description: 'This allow you to add nice people to the list dynamically',
        itemDefault: { name: 'enter a name', lastName: 'enter a last name' },
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'name',
            label: 'Name'
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'lastName',
            label: 'Last Name'
          }
        ]
      }
    ]
  };

  const onSubmit = (values) => console.log(values);

  return (
    <React.Fragment>
      <FormRenderer
        componentMapper={componentMapper}
        FormTemplate={FormTemplate}
        schema={schema}
        onSubmit={onSubmit}
        debug={({ values }) => setValues(values)}
      />
      <div style={{ marginTop: 16 }}>
        <h3>Form values</h3>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </React.Fragment>
  );
};

FieldArrayProvider.displayName = 'FieldArrayProvider';

export default FieldArrayProvider;
