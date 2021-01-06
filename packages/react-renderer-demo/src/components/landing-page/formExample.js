import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import Checkbox from '@data-driven-forms/mui-component-mapper/checkbox';
import FormSpy from '@data-driven-forms/react-form-renderer/form-spy';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

const useStyles = makeStyles((theme) => ({
  formButtons: {
    display: 'flex',
    width: '100%',
    flexFlow: 'row-reverse',
    padding: 8
  }
}));

const FormTemplate = ({ formFields }) => {
  const formOptions = useFormApi();
  const classes = useStyles();

  return (
    <form onSubmit={formOptions.handleSubmit}>
      <Grid container spacing={2}>
        {formFields}
        <FormSpy subscription={{ valid: true }}>
          {({ valid }) => (
            <div className={classes.formButtons}>
              <Button disabled={!valid} type="submit" color="primary" variant="contained">
                Show
              </Button>
            </div>
          )}
        </FormSpy>
      </Grid>
    </form>
  );
};

FormTemplate.propTypes = {
  formFields: PropTypes.any
};

const FormExample = ({ setFormState }) => (
  <FormRenderer
    FormTemplate={FormTemplate}
    onSubmit={(values) => setFormState(values)}
    componentMapper={{
      [componentTypes.TEXT_FIELD]: TextField,
      [componentTypes.CHECKBOX]: Checkbox
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
              type: validatorTypes.REQUIRED
            }
          ]
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'email',
          label: 'Email',
          isRequired: true,
          validate: [
            {
              type: validatorTypes.REQUIRED
            },
            {
              type: validatorTypes.PATTERN,
              pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
              message: 'Not valid email'
            }
          ]
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'confirm-email',
          label: 'Confirm email',
          isRequired: true,
          validate: [
            {
              type: 'same-email'
            }
          ]
        },
        {
          component: componentTypes.CHECKBOX,
          name: 'newsletters',
          label: 'I want to receive newsletter'
        }
      ]
    }}
    validatorMapper={{
      'same-email': () => (value, allValues) => (value !== allValues.email ? 'Email does not match' : undefined)
    }}
  />
);

FormExample.propTypes = {
  setFormState: PropTypes.func
};

export default FormExample;
