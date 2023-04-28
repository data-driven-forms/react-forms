import React, { useEffect } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormSpy from '@data-driven-forms/react-form-renderer/form-spy';
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

const FieldListenerWrapper = () => <FormSpy subcription={{ values: true }}>{() => <FieldListener />}</FormSpy>;

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
      'field-listener': FieldListenerWrapper,
    }}
    FormTemplate={FormTemplate}
    onSubmit={console.log}
  />
);

ValueListener.displayName = 'Value listener';

export default ValueListener;
