import React, { useContext } from 'react';
import WizardStep from './wizard-step';
import { Steps, Modal } from 'antd';
import Wizard from '@data-driven-forms/common/wizard/wizard';
import { WizardContext } from '@data-driven-forms/react-form-renderer';

const defaultButtonLabels = {
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next',
  submit: 'Submit',
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
  SubmitButtonProps,
  conditionalSubmitFlag,
}) => {
  const { onKeyDown, formOptions, handleNext, handlePrev, prevSteps, currentStep, jumpToStep, activeStepIndex } = useContext(WizardContext);

  return (
    <div onKeyDown={onKeyDown} {...WizardProps}>
      {title && <Modal title={title} onCancel={formOptions.onCancel} {...TitleProps} />}
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
        conditionalSubmitFlag={conditionalSubmitFlag}
      />
    </div>
  );
};

const WizardFinal = ({ buttonLabels, ...props }) => (
  <Wizard Wizard={WizardInternal} buttonLabels={{ ...defaultButtonLabels, ...buttonLabels }} {...props} />
);

export default WizardFinal;
