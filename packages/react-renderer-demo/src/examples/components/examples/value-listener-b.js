import React, { useEffect } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';

const FieldListener = () => {
  const { getState, change } = useFormApi();

  const { original } = getState().values;

  useEffect(() => {
    if (original) {
      change('updated', `${original} ${new Date().toGMTString()}`);
    }
  }, [original]);

  return null;
};

const schema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'original',
      label: 'Change me',
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'updated',
      label: 'Updated value',
      isReadOnly: true,
    },
    {
      component: 'field-listener',
      name: 'listener',
      hideField: true,
    },
  ],
};

const ValueListener = () => (
  <FormRenderer
    schema={schema}
    componentMapper={{
      [componentTypes.TEXT_FIELD]: TextField,
      'field-listener': FieldListener,
    }}
    FormTemplate={FormTemplate}
    onSubmit={console.log}
    subscription={{ values: true }}
  />
);

ValueListener.displayName = 'Value listener';

export default ValueListener;
