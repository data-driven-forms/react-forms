import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';

const schema = {
  fields: [
    {
      name: 'first-name',
      label: 'First name',
      component: componentTypes.TEXT_FIELD,
      FormFieldGridProps: { xs: 6 },
    },
    {
      name: 'last-name',
      label: 'Last name',
      component: componentTypes.TEXT_FIELD,
      FormFieldGridProps: { xs: 6 },
    },
  ],
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
};

const OneRowLayout = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;
OneRowLayout.displayName = 'One row layout';

export default OneRowLayout;
