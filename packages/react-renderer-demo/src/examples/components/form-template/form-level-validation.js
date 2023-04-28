/* eslint-disable react/prop-types */
import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import FormSpy from '@data-driven-forms/react-form-renderer/form-spy';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
};

const schema = {
  title: 'List of errors on the top if the form',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'name',
      label: 'Name',
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED,
        },
      ],
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'age',
      label: 'Age',
      type: 'number',
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED,
        },
      ],
    },
  ],
};

const StyledError = styled(ListItemText)(() => ({
  '&.listError': {
    color: red[500], // you can use your theme color if you have theme provider
  },
}));

const FormErrors = () => (
  <FormSpy>
    {({ errors }) => (
      <List>
        {Object.entries(errors).map(([key, error]) =>
          error ? (
            <ListItem button component="li" key={key}>
              <StyledError className={'listError'}>
                {key}: {error}
              </StyledError>
            </ListItem>
          ) : null
        )}
      </List>
    )}
  </FormSpy>
);

const FormTemplate = ({ formFields, schema }) => {
  const { handleSubmit, onReset, onCancel, getState } = useFormApi();
  const { submitting, pristine } = getState();

  return (
    <Grid item xs={12}>
      <form onSubmit={handleSubmit}>
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h2">
              {schema.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormErrors />
          </Grid>
          <Grid container item xs={12} spacing={4}>
            {formFields}
          </Grid>
          <Grid item xs={12}>
            <FormSpy>
              {() => (
                <div>
                  <Button disabled={submitting} style={{ marginRight: 8 }} type="submit" color="primary" variant="contained">
                    Submit
                  </Button>
                  <Button disabled={pristine} style={{ marginRight: 8 }} onClick={onReset} variant="contained">
                    Reset
                  </Button>
                  <Button variant="contained" onClick={onCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </FormSpy>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

const asyncSubmit = (values, api) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log('FormValues', values);
      resolve('Yay');
    }, 1500)
  );

const FormLevelErrors = () => (
  <Grid container spacing={4}>
    <FormRenderer
      FormTemplate={FormTemplate}
      componentMapper={componentMapper}
      schema={schema}
      onSubmit={asyncSubmit}
      onCancel={() => console.log('Cancelling')}
      onReset={() => console.log('Resetting')}
    />
  </Grid>
);

FormLevelErrors.displayName = 'Form level errors';

export default FormLevelErrors;
