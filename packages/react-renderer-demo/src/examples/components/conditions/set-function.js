import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

import Checkbox from '@data-driven-forms/mui-component-mapper/checkbox';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';

const schema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'firstname',
      label: 'Firstname',
      description: 'Type Bob to set nickname to Bob',
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'nickname',
      label: 'Nickname',
      condition: {
        when: 'firstname',
        is: 'Bob',
        then: {
          set: (formState) => {
            return { nickname: formState.values.firstname };
          },
        },
        else: { visible: true, set: {} },
      },
    },
  ],
};

const componentMapper = {
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.TEXT_FIELD]: TextField,
};

const SetFunction = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;

export default SetFunction;
