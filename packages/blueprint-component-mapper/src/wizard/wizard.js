import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import WizardCommon from '@data-driven-forms/common/wizard/wizard';
import { FormSpy, WizardContext } from '@data-driven-forms/react-form-renderer';

import StepButtons from './step-buttons';

const WizardInternal = ({ WizardProps, ...props }) => {
  const { formOptions, currentStep, onKeyDown, ...rest } = useContext(WizardContext);

  return (
    <div onKeyDown={onKeyDown} {...WizardProps}>
      {currentStep.fields.map((item) => formOptions.renderForm([item], formOptions))}
      <FormSpy subscription={{ valid: true, submitting: true, validating: true }}>
        {({ valid, submitting, validating }) => (
          <StepButtons isNextDisabled={!valid || submitting || validating} {...props} {...rest} currentStep={currentStep} formOptions={formOptions} />
        )}
      </FormSpy>
    </div>
  );
};

WizardInternal.propTypes = {
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
