import React from 'react';
import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { layoutMapper, formFieldsMapper } from '@data-driven-forms/pf4-component-mapper';

const schema = {
  title: 'Try submitting empty form',
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'name',
    label: 'Required field',
    isRequired: true,
    validate: [{
      type: validatorTypes.REQUIRED,
    }],
  }],
};

const RequiredValidator = () => (
  <div className="pf4">
    <FormRenderer
      layoutMapper={ layoutMapper }
      formFieldsMapper={ formFieldsMapper }
      schema={ schema }
      onSubmit={ console.log }
    />
  </div>
);

export default RequiredValidator;

