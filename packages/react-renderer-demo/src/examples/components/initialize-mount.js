import React, { useState } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import Select from '@data-driven-forms/mui-component-mapper/select';
import Wizard from '@data-driven-forms/mui-component-mapper/wizard';
import Typography from '@material-ui/core/Typography';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.WIZARD]: Wizard,
  [componentTypes.SELECT]: Select,
  Summary: () => {
    const { getState } = useFormApi();

    return (
      <Typography component="h5" variant="h5">
        {getState().values['chosen-way']}
      </Typography>
    );
  }
};

const schema = {
  fields: [
    {
      component: componentTypes.WIZARD,
      name: 'wizard',
      crossroads: ['selection'],
      fields: [
        {
          title: 'Choose your way',
          name: 'step-1',
          nextStep: {
            when: 'selection',
            stepMapper: {
              'way-1': 'way-1',
              'way-2': 'way-2'
            }
          },
          fields: [
            {
              component: componentTypes.SELECT,
              name: 'selection',
              label: 'Select your way',
              isRequired: true,
              options: [{ label: 'Please choose your way' }, { value: 'way-1', label: 'way-1' }, { value: 'way-2', label: 'way-2' }],
              validate: [{ type: 'required' }]
            }
          ]
        },
        {
          title: 'Way 1',
          name: 'way-1',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              initializeOnMount: true,
              hideField: true,
              name: 'chosen-way',
              initialValue: 'User chose the first way'
            },
            {
              component: 'Summary',
              name: 'summary'
            }
          ]
        },
        {
          title: 'Way 2',
          name: 'way-2',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              initializeOnMount: true,
              hideField: true,
              name: 'chosen-way',
              initialValue: 'User chose the second way'
            },
            {
              component: 'Summary',
              name: 'summary'
            }
          ]
        }
      ]
    }
  ]
};

const FormTemplateWrapper = (props) => <FormTemplate {...props} showFormControls={false} />;

const InitializeOnMountWizardExample = () => {
  const [values, setValues] = useState({});
  return (
    <div>
      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <Typography component="h3" variant="h5">
          Form values
        </Typography>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
      <FormRenderer
        FormTemplate={FormTemplateWrapper}
        componentMapper={componentMapper}
        schema={schema}
        onSubmit={console.log}
        debug={({ values }) => setValues(values)}
      />
    </div>
  );
};

export default InitializeOnMountWizardExample;
