import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};
const schema = {
  title: 'Start typing',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'name',
      label: 'name'
    }
  ]
};

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'First name is required';
  }

  if (values.name && values.name === 'John') {
    errors.name = 'John is not alloved';
  }

  return errors;
};

const RecordLevelValidator = () => (
  <FormRenderer validate={validate} FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />
);

export default RecordLevelValidator;
