import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';

const schema = {
  title: 'And condition',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'field-1',
      label: 'Field 1',
      helperText: 'To show field 3 type a cat here...'
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'field-2',
      label: 'Field 1',
      helperText: '...and dog here.'
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'field-3',
      label: 'Field 3',
      initialValue: 'I am shown!',
      isDisabled: true,
      condition: {
        and: [
          { when: 'field-1', is: 'cat' },
          { when: 'field-2', is: 'dog' }
        ]
      }
    }
  ]
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

const AndCondition = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;

export default AndCondition;
