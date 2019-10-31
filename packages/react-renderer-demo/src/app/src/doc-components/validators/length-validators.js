import React from 'react';
import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { layoutMapper, formFieldsMapper } from '@data-driven-forms/pf4-component-mapper';

const schema = {
  title: 'Start typing',
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'length',
    label: 'Length field',
    helperText: 'min 5 characters, max 10',
    validate: [{
      type: validatorTypes.MIN_LENGTH,
      threshold: 5,
    }, {
      type: validatorTypes.MAX_LENGTH,
      threshold: 10,
    }],
  }, {
    component: componentTypes.TEXT_FIELD,
    name: 'exact-length',
    label: 'Exact length field',
    helperText: 'must be 3 characters long',
    validate: [{
      type: validatorTypes.EXACT_LENGTH,
      threshold: 3,
    }],
  }],
};

const LenghtValidators = () => (
  <div className="pf4">
    <FormRenderer
      layoutMapper={ layoutMapper }
      formFieldsMapper={ formFieldsMapper }
      schema={ schema }
      onSubmit={ console.log }
    />
  </div>
);

export default LenghtValidators;

