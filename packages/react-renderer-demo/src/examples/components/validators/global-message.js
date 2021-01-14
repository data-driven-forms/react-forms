import React from 'react';

import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import Validators from '@data-driven-forms/react-form-renderer/validators';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

Validators.messages = {
  ...Validators.messages,
  required: 'Required'
};

const schema = {
  title: 'Try submitting empty form',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'name',
      label: 'Name',
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED
        }
      ]
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'age',
      label: 'Age',
      tyope: 'number',
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED,
          message: 'Local validator message override'
        }
      ]
    }
  ]
};

const OverridingMessage = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;

export default OverridingMessage;
