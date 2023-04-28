import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

import Grid from '@mui/material/Grid';

const TwoColumns = ({ fields }) => {
  const { renderForm } = useFormApi();

  return (
    <Grid container spacing={3}>
      {fields.map((field) => (
        <Grid key={field.name} item xs={6}>
          {renderForm([field])}
        </Grid>
      ))}
    </Grid>
  );
};

const schema = {
  fields: [
    {
      name: 'layout',
      component: 'two-columns',
      fields: [
        {
          name: 'first-name',
          label: 'First name',
          component: componentTypes.TEXT_FIELD,
        },
        {
          name: 'last-name',
          label: 'Last name',
          component: componentTypes.TEXT_FIELD,
        },
        {
          name: 'address-1',
          label: 'Address 1',
          component: componentTypes.TEXT_FIELD,
        },
        {
          name: 'address-2',
          label: 'Address 2',
          component: componentTypes.TEXT_FIELD,
        },
      ],
    },
  ],
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  'two-columns': TwoColumns,
};

const CustomLayoutComponent = () => (
  <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />
);
CustomLayoutComponent.displayName = 'Custom layout component';

export default CustomLayoutComponent;
