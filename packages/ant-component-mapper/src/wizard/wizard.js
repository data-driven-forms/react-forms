import React, { useContext } from 'react';
import WizardStep from './wizard-step';
import PropTypes from 'prop-types';
import { Steps, Modal } from 'antd';
import Wizard from '@data-driven-forms/common/wizard/wizard';
import { WizardContext } from '@data-driven-forms/react-form-renderer';

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
  WizardProps,
  TitleProps,
  StepProps,
  WizardStepProps,
  ButtonProps,
  NextButtonProps,
  BackButtonProps,
  CancelButtonProps,
  SubmitButtonProps
}) => {
  const { onKeyDown, formOptions, handleNext, handlePrev, prevSteps, currentStep, jumpToStep, activeStepIndex } = useContext(WizardContext);

  return (
    <div onKeyDown={onKeyDown} {...WizardProps}>
      {title && <Modal title={title} onCancel={formOptions.onCanel} {...TitleProps} />}
      {stepsInfo && (
        <Steps onChange={jumpToStep} current={activeStepIndex} {...StepProps}>
          {stepsInfo.map((step, stepIndex) => (
            <Step disabled={activeStepIndex < stepIndex} step={stepIndex} key={stepIndex} {...step} />
          ))}
        </Steps>
      )}
      <WizardStep
        handleNext={handleNext}
        handlePrev={handlePrev}
        disableBack={prevSteps.length === 0}
        buttonLabels={buttonLabels}
        {...currentStep}
        formOptions={formOptions}
        WizardStepProps={WizardStepProps}
        ButtonProps={ButtonProps}
        NextButtonProps={NextButtonProps}
        BackButtonProps={BackButtonProps}
        CancelButtonProps={CancelButtonProps}
        SubmitButtonProps={SubmitButtonProps}
      />
    </div>
  );
};

WizardInternal.propTypes = {
  title: PropTypes.string,
  buttonLabels: PropTypes.object,
  stepsInfo: PropTypes.array,
  WizardProps: PropTypes.object,
  TitleProps: PropTypes.object,
  StepProps: PropTypes.object,
  WizardStepProps: PropTypes.object,
  ButtonProps: PropTypes.object,
  NextButtonProps: PropTypes.object,
  BackButtonProps: PropTypes.object,
  CancelButtonProps: PropTypes.object,
  SubmitButtonProps: PropTypes.object
};

const WizardFinal = ({ buttonLabels, ...props }) => (
  <Wizard Wizard={WizardInternal} buttonLabels={{ ...defaultButtonLabels, ...buttonLabels }} {...props} />
);

WizardFinal.propTypes = {
  buttonLabels: PropTypes.object
};

export default WizardFinal;
