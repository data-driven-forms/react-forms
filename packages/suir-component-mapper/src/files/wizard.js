import React from 'react';
import PropTypes from 'prop-types';
import Wizard from '@data-driven-forms/common/src/wizard/wizard';
import WizardNav from './wizard/wizard-nav';
import WizardStepButtons from './wizard/step-buttons';

const WizardInternal = ({ currentStep, formOptions, activeStepIndex, prevSteps, handleNext, handlePrev, buttonLabels, stepsInfo, onKeyDown }) => {
  const buttonLabelsFinal = {
    next: 'Continue',
    submit: 'Submit',
    cancel: 'Cancel',
    back: 'Back',
    ...buttonLabels
  };

  return (
    <div onKeyDown={onKeyDown}>
      {stepsInfo && <WizardNav stepsInfo={stepsInfo} activeStepIndex={activeStepIndex} />}
      <div>
        {currentStep.fields.map((item) => formOptions.renderForm([item], formOptions))}
        <WizardStepButtons
          {...currentStep}
          formOptions={formOptions}
          buttonLabels={buttonLabelsFinal}
          handleNext={handleNext}
          handlePrev={handlePrev}
          disableBack={prevSteps.length === 0}
        />
      </div>
    </div>
  );
};

WizardInternal.propTypes = {
  currentStep: PropTypes.object,
  handlePrev: PropTypes.func,
  onKeyDown: PropTypes.func,
  jumpToStep: PropTypes.func,
  setPrevSteps: PropTypes.func,
  handleNext: PropTypes.func,
  activeStepIndex: PropTypes.number,
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func,
    renderForm: PropTypes.func
  }),
  prevSteps: PropTypes.array,
  // ^^ common props
  buttonLabels: PropTypes.object,
  stepsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      label: PropTypes.node,
      StepLabelProps: PropTypes.object,
      StepProps: PropTypes.object
    })
  )
};

const MuiWizard = (props) => <Wizard Wizard={WizardInternal} {...props} />;

export default MuiWizard;
