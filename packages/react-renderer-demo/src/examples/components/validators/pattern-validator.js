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
      name: 'regexp-pattern',
      label: 'Regepx',
      helperText: 'Value must be equal to Foo',
      validate: [
        {
          type: validatorTypes.PATTERN,
          pattern: /^Foo$/i
        }
      ]
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'string-pattern',
      label: 'String pattern',
      helperText: 'Value must be equal to Foo',
      validate: [
        {
          type: validatorTypes.PATTERN,
          pattern: '^Foo$',
          flags: 'i'
        }
      ]
    }
  ]
};

const PatternValidators = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;

export default PatternValidators;
