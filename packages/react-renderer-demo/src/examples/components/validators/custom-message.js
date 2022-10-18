import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
};
const schema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'custom-validator',
      validate: [{ type: validatorTypes.REQUIRED, message: 'This field is required' }],
      validateOnMount: true,
    },
  ],
};

const CustomMessage = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;
CustomMessage.displayName = 'Custom message';

export default CustomMessage;
