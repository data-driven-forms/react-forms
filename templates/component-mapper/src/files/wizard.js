import React from 'react';
import PropTypes from 'prop-types';
import WizardCommon from '@data-driven-forms/common/src/wizard/wizard';
import { FormSpy } from '@data-driven-forms/react-form-renderer';
import selectNext from '@data-driven-forms/common/src/wizard/select-next';

const WizardInternal = ({ currentStep, formOptions, activeStepIndex, handleNext, handlePrev, onKeyDown }) => (
  <div onKeyDown={onKeyDown}>
    {currentStep.fields.map((item) => formOptions.renderForm([item], formOptions))}
    <FormSpy>
      {({ valid }) => (
        <div>
          <button onClick={() => handleNext(selectNext(currentStep.nextStep, formOptions.getState))} disabled={!valid}>
            Next
          </button>
          <button onClick={handlePrev} disabled={activeStepIndex === 0}>
            Back
          </button>
        </div>
      )}
    </FormSpy>
  </div>
);

WizardInternal.propTypes = {
  currentStep: PropTypes.object,
  handlePrev: PropTypes.func,
  onKeyDown: PropTypes.func,
  handleNext: PropTypes.func,
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func,
    renderForm: PropTypes.func,
    getState: PropTypes.func
  }),
  activeStepIndex: PropTypes.number
};

const Wizard = (props) => <WizardCommon Wizard={WizardInternal} {...props} />;

export default Wizard;
