import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';

const schema = {
  title: 'Validator mapper',
  fields: [
    {
      label: 'Password',
      type: 'password',
      component: componentTypes.TEXT_FIELD,
      name: 'password',
      helperText: 'Include upper letter, number and one ? _ :',
      validate: [{ type: 'password' }]
    },
    {
      component: componentTypes.TEXT_FIELD,
      label: 'Password (custom message)',
      type: 'password',
      name: 'password-message',
      helperText: 'Include upper letter, number and one ? _ :',
      validate: [{ type: 'password', message: 'Heslo musí obashovat velké písmeno, číslo a jeden znak z: ? _ :' }]
    }
  ]
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

const validatorMapper = {
  password: ({ message }) => (value) => {
    if (!value) {
      return;
    }

    if (!value.match(/[A-Z]/) || !value.match(/\d/) || !value.match(/\?_:/)) {
      return message || 'Password has to contain upper letter, number and one of ? _ :';
    }
  }
};

const ValidatorMapper = () => (
  <FormRenderer
    FormTemplate={FormTemplate}
    validatorMapper={validatorMapper}
    componentMapper={componentMapper}
    schema={schema}
    onSubmit={console.log}
  />
);

export default ValidatorMapper;
