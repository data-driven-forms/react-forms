import React from 'react';
import WizardStep from './wizard/wizard-step';
import PropTypes from 'prop-types';
import { Steps, Modal } from 'antd';
import Wizard, { wizardProps } from '@data-driven-forms/common/src/wizard/wizard';

const defaultButtonLabels = {
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next',
  submit: 'Submit'
};

const { Step } = Steps;

const WizardInternal = ({
  title,
  buttonLabels,
  stepsInfo,
  inModal,
  onKeyDown,
  formOptions,
  handleNext,
  handlePrev,
  prevSteps,
  currentStep,
  jumpToStep,
  activeStepIndex
}) => {
  const renderSteps = () =>
    stepsInfo.map((step, stepIndex) => <Step title={step.title} disabled={activeStepIndex < stepIndex} step={stepIndex} key={stepIndex} />);

  const fullButtonLabels = {
    ...defaultButtonLabels,
    ...buttonLabels
  };
  return (
    <div onKeyDown={onKeyDown}>
      {title && <Modal title={title} onCancel={formOptions.onCanel}></Modal>}
      {stepsInfo && (
        <Steps onChange={jumpToStep} current={activeStepIndex}>
          {renderSteps()}
        </Steps>
      )}
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

const WizardFinal = (props) => {
  return <Wizard Wizard={WizardInternal} {...props} />;
};

export default WizardFinal;
