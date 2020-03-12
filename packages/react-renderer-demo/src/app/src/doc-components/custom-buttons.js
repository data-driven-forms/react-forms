/* eslint-disable react/prop-types */
import React from 'react';
import FormRenderer, { componentTypes, validatorTypes, useFormApi, FormSpy } from '@data-driven-forms/react-form-renderer';
import { componentMapper } from '@data-driven-forms/pf4-component-mapper';
import { Button } from '@material-ui/core';
import { Form } from '@patternfly/react-core';

const schema = {
  title: 'Combination of PF4 form and MUI buttons',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'name',
      label: 'Name',
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED
        }
      ]
    }
  ]
};

const FormTemplate = ({ formFields, schema }) => {
  const { handleSubmit, onReset, onCancel, getState, reset } = useFormApi();
  const { submitting, valid, pristine } = getState();

  return (
    <Form onSubmit={handleSubmit}>
      {schema.title}
      {formFields}
      <FormSpy>
        {() => (
          <div>
            <Button disabled={submitting || !valid} style={{ marginRight: 8 }} type="submit" color="primary" variant="contained">
              Submit
            </Button>
            <Button disabled={pristine} style={{ marginRight: 8 }} onClick={() => { onReset(); reset(); }} variant="contained">
              Reset
            </Button>
            <Button variant="contained" onClick={onCancel}>Cancel</Button>
          </div>
        )}
      </FormSpy>
    </Form>
  );
};

const asyncSubmit = (values, api) => new Promise((resolve) => setTimeout(() => {
  console.log('FormValues', values);
  resolve('Yay');
}, 1500));

const FormControls = () => (
  <div className="pf4">
    <FormRenderer
      FormTemplate={FormTemplate}
      componentMapper={componentMapper}
      schema={schema}
      onSubmit={asyncSubmit}
      onCancel={() => console.log('Cancelling')}
      onReset={() => console.log('Resetting')}
    />
  </div>
);

export default FormControls;
