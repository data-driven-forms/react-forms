/* eslint-disable react/prop-types */
import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';
import useFormApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-form-api';
import FormSpy from '@data-driven-forms/react-form-renderer/dist/cjs/form-spy';
import TextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';
import Button from '@material-ui/core/Button';
import { Form } from '@patternfly/react-core/dist/js/components/Form/Form';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

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
  const { handleSubmit, onReset, onCancel, getState } = useFormApi();
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
            <Button disabled={pristine} style={{ marginRight: 8 }} onClick={onReset} variant="contained">
              Reset
            </Button>
            <Button variant="contained" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        )}
      </FormSpy>
    </Form>
  );
};

const asyncSubmit = (values, api) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log('FormValues', values);
      resolve('Yay');
    }, 1500)
  );

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
