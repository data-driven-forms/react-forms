import React from 'react';
import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { layoutMapper, formFieldsMapper } from '@data-driven-forms/pf4-component-mapper';

const schema = {
  title: 'Start typing',
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'number-size',
    label: 'Number value validator',
    helperText: 'Value of the number must be between 1.36 and 33.3',
    type: 'number',
    validate: [{
      type: validatorTypes.MIN_NUMBER_VALUE,
      includeThreshold: true,
      value: 1.36,
    }, {
      type: validatorTypes.MAX_NUMBER_VALUE,
      includeThreshold: false,
      value: 33.3,
    }],
  }],
};

const NumberValueValidators = () => (
  <div className="pf4">
    <FormRenderer
      layoutMapper={ layoutMapper }
      formFieldsMapper={ formFieldsMapper }
      schema={ schema }
      onSubmit={ console.log }
    />
  </div>
);

export default NumberValueValidators;

