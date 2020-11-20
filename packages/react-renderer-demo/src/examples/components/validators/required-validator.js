import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/dist/cjs/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

const schema = {
  title: 'Try submitting empty form',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'name',
      label: 'Required field',
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED
        }
      ]
    }
  ]
};

const RequiredValidator = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;

export default RequiredValidator;
