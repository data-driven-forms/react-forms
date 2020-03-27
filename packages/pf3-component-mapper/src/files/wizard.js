import React from 'react';
import WizardStep from './wizard/wizard-step';
import PropTypes from 'prop-types';
import { Wizard as PfWizard, Modal, Icon } from 'patternfly-react';
import Wizard, { wizardProps } from '@data-driven-forms/common/src/wizard/wizard';

const defaultButtonLabels = {
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next',
  submit: 'Submit'
};

const WizardInternal = ({ title, buttonLabels, stepsInfo, inModal, onKeyDown, formOptions, handleNext, handlePrev, prevSteps, currentStep }) => {
  const renderSteps = () =>
    stepsInfo.map((step, stepIndex) => (
      <PfWizard.Step
        activeStep={prevSteps.length + 1}
        title={step.title}
        label={`${stepIndex + 1}`}
        step={stepIndex + 1}
        key={stepIndex + 1}
        stepIndex={stepIndex + 1}
      />
    ));

  const fullButtonLabels = {
    ...defaultButtonLabels,
    ...buttonLabels
  };

  return (
    <div onKeyDown={onKeyDown}>
      {title && (
        <Modal.Header>
          {inModal && (
            <button className="close" onClick={formOptions.onCancel} aria-hidden="true" aria-label="Close">
              <Icon type="pf" name="close" />
            </button>
          )}
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      {stepsInfo && <PfWizard.Steps steps={renderSteps()} />}
      <WizardStep
        handleNext={handleNext}
        handlePrev={handlePrev}
        disableBack={prevSteps.length === 0}
        buttonLabels={fullButtonLabels}
        {...currentStep}
        formOptions={formOptions}
      />
    </div>
  );
};

WizardInternal.propTypes = {
  title: PropTypes.string,
  buttonLabels: PropTypes.object,
  stepsInfo: PropTypes.array,
  inModal: PropTypes.bool,
  ...wizardProps
};

WizardInternal.defaultProps = {
  title: undefined,
  stepsInfo: undefined,
  inModal: false
};

const WizardFinal = (props) => <Wizard Wizard={WizardInternal} {...props} />;

export default WizardFinal;
