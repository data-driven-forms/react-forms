import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/dist/cjs/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};
const schema = {
  title: 'Start typing',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'custom-validator',
      label: 'Custom validator',
      helperText: 'type name John to fail validation',
      validate: [(value) => (value === 'John' ? 'John is not alloved' : undefined)]
    }
  ]
};

const CustomValidator = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;

export default CustomValidator;
