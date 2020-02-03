import React, { useState } from 'react';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { layoutMapper, formFieldsMapper } from '@data-driven-forms/pf4-component-mapper';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';

const schema = {
  fields: [{
    component: componentTypes.WIZARD,
    name: 'wizard',
    fields: [
      {
        title: 'Choose your way',
        name: 'step-1',
        stepKey: 1,
        nextStep: {
          when: 'selection',
          stepMapper: {
            'way-1': 'way-1',
            'way-2': 'way-2',
          },
        },
        fields: [
          {
            component: componentTypes.SELECT,
            name: 'selection',
            label: 'Select your way',
            isRequired: true,
            options: [
              { label: 'Please choose your way' },
              { value: 'way-1', label: 'way-1' },
              { value: 'way-2', label: 'way-2' },
            ],
            validate: [{ type: 'required-validator' }],
          },
        ],
      },
      {
        title: 'Way 1',
        stepKey: 'way-1',
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            initializeOnMount: true,
            hideField: true,
            name: 'chosen-way',
            initialValue: 'User chose the first way',
          },
        ],
      },
      {
        title: 'Way 2',
        stepKey: 'way-2',
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            initializeOnMount: true,
            hideField: true,
            name: 'chosen-way',
            initialValue: 'User chose the second way',
          },
        ],
      },
    ]},
  ],
};

const InitializeOnMountWizardExample = () => {
  const [ values, setValues ] = useState({});
  return (
    <div className="pf4">
      <FormRenderer
        layoutMapper={ layoutMapper }
        formFieldsMapper={ formFieldsMapper }
        schema={ schema }
        onSubmit={ console.log }
        onStateUpdate={ ({ values }) => setValues(values) }
        showFormControls={ false }
      />
      <div style={{ marginTop: 16 }}>
        <Title size="md">Form values</Title>
        <pre>
          { JSON.stringify(values, null, 2) }
        </pre>
      </div>
    </div>
  );};

export default InitializeOnMountWizardExample;
