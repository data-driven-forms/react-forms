import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import Checkbox from '@data-driven-forms/mui-component-mapper/checkbox';

const isEnabled = () => (_props, _field, formOptions) => formOptions.getState().values.custom_email ? { isDisabled: false } : { isDisabled: true };

const actionMapper = {
  isEnabled,
};

const schema = {
  fields: [
    {
      name: 'custom_email',
      label: 'Use custom email',
      component: 'checkbox',
    },
    {
      name: 'email',
      label: 'Email',
      component: 'text-field',
      actions: {
        resolveProps: ['isEnabled'],
      },
    },
  ],
};

const componentMapper = {
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.TEXT_FIELD]: TextField,
};

const ResolvePropsDb = () => (
  <FormRenderer
    FormTemplate={FormTemplate}
    componentMapper={componentMapper}
    schema={schema}
    onSubmit={console.log}
    subscription={{ values: true }}
    actionMapper={actionMapper}
  />
);
ResolvePropsDb.displayName = 'Resolve props DB';

export default ResolvePropsDb;
