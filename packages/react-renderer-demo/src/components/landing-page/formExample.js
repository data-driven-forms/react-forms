import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import Checkbox from '@data-driven-forms/mui-component-mapper/checkbox';
import FormSpy from '@data-driven-forms/react-form-renderer/form-spy';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

const PREFIX = 'FormExample';

const classes = {
  formButtons: `${PREFIX}-formButtons`,
};

const Buttons = styled('div')(({ theme }) => ({
  [`&.${classes.formButtons}`]: {
    display: 'flex',
    width: '100%',
    flexFlow: 'row-reverse',
    padding: 8,
  },
}));

const FormTemplate = ({ formFields }) => {
  const formOptions = useFormApi();
  return (
    <form onSubmit={formOptions.handleSubmit}>
      <Grid container spacing={2}>
        {formFields}
        <FormSpy subscription={{ valid: true }}>
          {({ valid }) => (
            <Buttons className={classes.formButtons}>
              <Button disabled={!valid} type="submit" color="primary" variant="contained">
                Show
              </Button>
            </Buttons>
          )}
        </FormSpy>
      </Grid>
    </form>
  );
};

const FormExample = ({ setFormState }) => (
  <FormRenderer
    FormTemplate={FormTemplate}
    onSubmit={(values) => setFormState(values)}
    componentMapper={{
      [componentTypes.TEXT_FIELD]: TextField,
      [componentTypes.CHECKBOX]: Checkbox,
    }}
    schema={{
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'name',
          label: 'Your name',
          isRequired: true,
          validate: [
            {
              type: validatorTypes.REQUIRED,
            },
          ],
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'email',
          label: 'Email',
          isRequired: true,
          validate: [
            {
              type: validatorTypes.REQUIRED,
            },
            {
              type: validatorTypes.PATTERN,
              pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
              message: 'Not valid email',
            },
          ],
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'confirm-email',
          label: 'Confirm email',
          isRequired: true,
          validate: [
            {
              type: 'same-email',
            },
          ],
        },
        {
          component: componentTypes.CHECKBOX,
          name: 'newsletters',
          label: 'I want to receive newsletter',
        },
      ],
    }}
    validatorMapper={{
      'same-email': () => (value, allValues) => value !== allValues.email ? 'Email does not match' : undefined,
    }}
  />
);

export default FormExample;
