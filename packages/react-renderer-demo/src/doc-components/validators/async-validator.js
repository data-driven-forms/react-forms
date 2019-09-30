import React from 'react';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { layoutMapper, formFieldsMapper } from '@data-driven-forms/pf4-component-mapper';

const mockEndpoint = value => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (value === 'John') {
      reject({ message: 'John is not allowed' });
    }

    resolve({ message: 'validation sucesfull' });
  }, 2000);
});

const asyncValidator = value => mockEndpoint(value).then(response => {
  //do something with response but do not return any value!
}).catch(error => {
  return error.message;
});

const schema = {
  title: 'Start typing',
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'async-validator',
    label: 'Async validator',
    helperText: 'Type name John to fail validation. Validation will take 2 seconds.',
    validate: [ asyncValidator ],
  }],
};

const AsyncValidator = () => (
  <div className="pf4">
    <FormRenderer
      layoutMapper={ layoutMapper }
      formFieldsMapper={ formFieldsMapper }
      schema={ schema }
      onSubmit={ console.log }
    />
  </div>
);

export default AsyncValidator;
