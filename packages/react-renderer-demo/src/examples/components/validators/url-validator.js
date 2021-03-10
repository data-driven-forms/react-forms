import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
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
      name: 'default-config',
      label: 'Default validator',
      helperText: 'type some address like: https://data-driven-forms.org/',
      validate: [
        {
          type: validatorTypes.URL
        }
      ]
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'protocol-config',
      label: 'Custom protocol',
      helperText: 'type some address with custom ddf protocol like: ddf://data-driven-forms.org/',
      validate: [
        {
          type: validatorTypes.URL,
          protocol: 'ddf'
        }
      ]
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'without-config',
      label: 'Without protocol',
      helperText: 'type some address with like: data-driven-forms.org/',
      validate: [
        {
          type: validatorTypes.URL,
          protocolIdentifier: false
        }
      ]
    }
  ]
};

const UrlValidators = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;

export default UrlValidators;
