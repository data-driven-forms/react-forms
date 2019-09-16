import React from 'react';
import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { layoutMapper, formFieldsMapper } from '@data-driven-forms/pf4-component-mapper';
import { Button } from '@material-ui/core';

const schema = {
  title: 'Combination of PF4 form and MUI buttons',
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'name',
    label: 'Name',
    isRequired: true,
    validate: [{
      type: validatorTypes.REQUIRED,
    }],
  }],
};

const FormButtons = ({ submitting, pristine, valid,  form: { submit, reset }}) => {
  return (
    <div>
      <Button disabled={ submitting || !valid } style={{ marginRight: 8 }} onClick={ submit } color="primary" variant="contained">Submit</Button>
      <Button disabled={ pristine } style={{ marginRight: 8 }} onClick={ reset } variant="contained">Reset</Button>
      <Button variant="contained">Cancel</Button>
    </div>
  );
};

const asyncSubmit = (values, api) => new Promise(resolve => setTimeout(() => resolve('Yay'), 1500));

const FormControls = () => (
  <div className="pf4">
    <FormRenderer
      layoutMapper={ layoutMapper }
      formFieldsMapper={ formFieldsMapper }
      schema={ schema }
      onSubmit={ asyncSubmit }
      renderFormButtons={ FormButtons }
    />
  </div>
);

export default FormControls;
