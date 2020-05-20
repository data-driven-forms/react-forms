import React from 'react';
import PropTypes from 'prop-types';
import WizardCommon from '@data-driven-forms/common/src/wizard/wizard';
import { FormSpy } from '@data-driven-forms/react-form-renderer';

import StepButtons from './wizard/step-buttons';

const WizardInternal = ({ currentStep, formOptions, onKeyDown, WizardProps, ...props }) => (
  <div onKeyDown={onKeyDown} {...WizardProps}>
    {currentStep.fields.map((item) => formOptions.renderForm([item], formOptions))}
    <FormSpy subscription={{ valid: true, submitting: true, validating: true }}>
      {({ valid, submitting, validating }) => (
        <StepButtons isNextDisabled={!valid || submitting || validating} {...props} currentStep={currentStep} formOptions={formOptions} />
      )}
    </FormSpy>
  </div>
);

WizardInternal.propTypes = {
  currentStep: PropTypes.object,
  onKeyDown: PropTypes.func,
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func,
    renderForm: PropTypes.func,
    getState: PropTypes.func
  }),
  WizardProps: PropTypes.object
};

const defaultLabels = {
  submit: 'Submit',
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next'
};

const Wizard = ({ buttonLabels, ...props }) => (
  <WizardCommon Wizard={WizardInternal} {...props} buttonLabels={{ ...defaultLabels, ...buttonLabels }} />
);

Wizard.propTypes = {
  buttonLabels: PropTypes.object
};

export default Wizard;
