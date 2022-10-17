import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import Checkbox from '@data-driven-forms/mui-component-mapper/checkbox';

const schema = {
  fields: [
    {
      name: 'custom_email',
      label: 'Use custom email',
      component: componentTypes.CHECKBOX,
    },
    {
      name: 'email',
      label: 'Email',
      component: componentTypes.TEXT_FIELD,
      resolveProps: (_props, _field, formOptions) => (formOptions.getState().values.custom_email ? { isDisabled: false } : { isDisabled: true }),
    },
  ],
};

const componentMapper = {
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.TEXT_FIELD]: TextField,
};

const ResolvePropsSubscription = () => (
  <FormRenderer
    FormTemplate={FormTemplate}
    componentMapper={componentMapper}
    schema={schema}
    onSubmit={console.log}
    subscription={{ values: true }}
  />
);
ResolvePropsSubscription.displayName = 'Resolve props subscription';

export default ResolvePropsSubscription;
