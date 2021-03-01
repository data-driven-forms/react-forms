import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

const schema = {
  fields: [
    {
      name: 'first-name',
      label: 'First name',
      component: componentTypes.TEXT_FIELD,
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED
        }
      ]
    },
    {
      name: 'last-name',
      label: 'Last name',
      component: componentTypes.TEXT_FIELD,
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED
        }
      ]
    },
    {
      name: 'age',
      label: 'Age',
      component: componentTypes.TEXT_FIELD,
      type: 'number'
    }
  ]
};

const FormTemplateCanReset = (props) => <FormTemplate {...props} canReset />;

const GetStartedForm = () => (
  <Grid spacing={4} container>
    <FormRenderer
      componentMapper={componentMapper}
      FormTemplate={FormTemplateCanReset}
      schema={schema}
      onSubmit={console.log}
      onCancel={() => console.log('Cancel action')}
    />
  </Grid>
);

export default GetStartedForm;
