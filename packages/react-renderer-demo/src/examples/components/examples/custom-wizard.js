'use client';
import React, { useContext, useState } from 'react';

import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import WizardContext from '@data-driven-forms/react-form-renderer/wizard-context';
import FormSpy from '@data-driven-forms/react-form-renderer/form-spy';

import Wizard from '@data-driven-forms/common/wizard';
import selectNext from '@data-driven-forms/common/wizard/select-next';

import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import Select from '@data-driven-forms/mui-component-mapper/select';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';

const schema = {
  fields: [
    {
      component: 'wizard',
      name: 'custom-wizard',
      fields: [
        {
          name: 'first-step',
          title: 'Select step',
          nextStep: ({ values }) => values['selected-step'],
          fields: [
            {
              component: 'select',
              name: 'selected-step',
              label: 'Select next step',
              isRequired: true,
              validate: [{ type: 'required' }],
              options: [
                { label: 'Step a', value: 'step-a' },
                { label: 'Step b', value: 'step-b' },
              ],
            },
          ],
        },
        {
          name: 'step-a',
          title: 'Step A',
          fields: [
            {
              component: 'text-field',
              name: 'a-value',
              isRequired: true,
              validate: [{ type: 'required' }],
              label: 'A value',
            },
          ],
        },
        {
          name: 'step-b',
          title: 'Step B',
          fields: [
            {
              component: 'text-field',
              name: 'b-value',
              isRequired: true,
              validate: [{ type: 'required' }],
              label: 'B value',
            },
          ],
        },
      ],
    },
  ],
};

const WizardInternal = (props) => {
  const { formOptions, currentStep, handlePrev, onKeyDown, handleNext, activeStepIndex } = useContext(WizardContext);

  return (
    <div onKeyDown={onKeyDown} style={{ width: '100%' }}>
      {currentStep.title}
      {formOptions.renderForm(currentStep.fields)}
      <FormSpy>
        {() => (
          <React.Fragment>
            {currentStep.nextStep && (
              <button
                type="button"
                disabled={!formOptions.getState().valid}
                onClick={() => handleNext(selectNext(currentStep.nextStep, formOptions.getState))}
              >
                Next
              </button>
            )}
            {!currentStep.nextStep && (
              <button type="button" disabled={!formOptions.getState().valid} onClick={() => formOptions.handleSubmit()}>
                Submit
              </button>
            )}
            <button type="button" onClick={handlePrev} disabled={activeStepIndex === 0}>
              Back
            </button>
          </React.Fragment>
        )}
      </FormSpy>
    </div>
  );
};

const WrappedWizard = (props) => <Wizard Wizard={WizardInternal} {...props} />;

const FormTemplateCb = (props) => <FormTemplate {...props} showFormControls={false} />;

const CustomWizard = () => {
  const [values, setValues] = useState();

  return (
    <React.Fragment>
      <FormRenderer
        schema={schema}
        componentMapper={{ 'text-field': TextField, select: Select, wizard: WrappedWizard }}
        FormTemplate={FormTemplateCb}
        onSubmit={(values) => setValues(values)}
      />
      {values && <pre>{JSON.stringify(values, null, 2)}</pre>}
    </React.Fragment>
  );
};

CustomWizard.displayName = 'Custom wizard';

export default CustomWizard;
