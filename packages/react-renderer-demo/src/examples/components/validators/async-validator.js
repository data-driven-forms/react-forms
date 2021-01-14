import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};
const mockEndpoint = (value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'John') {
        reject({ message: 'John is not allowed' });
      }

      resolve({ message: 'validation sucesfull' });
    }, 2000);
  });

const asyncValidator = (value) =>
  mockEndpoint(value)
    .catch(({ message }) => {
      // error must only throw valid react child eg: string, number, node, etc.
      throw message;
    })
    .then(() => {
      // possible success handler
    });

const schema = {
  title: 'Start typing',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'async-validator',
      label: 'Async validator',
      helperText: 'Type name John to fail validation. Validation will take 2 seconds.',
      validate: [asyncValidator]
    }
  ]
};

const AsyncValidator = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;

export default AsyncValidator;
