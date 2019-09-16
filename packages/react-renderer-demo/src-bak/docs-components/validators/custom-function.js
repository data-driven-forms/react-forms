import React from 'react';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { layoutMapper, formFieldsMapper } from '@data-driven-forms/pf4-component-mapper';

const schema = {
  title: 'Start typing',
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'custom-validator',
    label: 'Custom validator',
    helperText: 'type name John to fail validation',
    validate: [ value => value === 'John' ? 'John is not alloved' : undefined ],
  }],
};

const CustomValidator = () => (
  <div className="pf4">
    <FormRenderer
      layoutMapper={ layoutMapper }
      formFieldsMapper={ formFieldsMapper }
      schema={ schema }
      onSubmit={ console.log }
    />
  </div>
);

export default CustomValidator;

