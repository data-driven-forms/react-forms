import React from 'react';
import { Button } from 'antd';
import selectNext from '@data-driven-forms/common/wizard/select-next';

const NextButton = ({
  nextStep,
  handleNext,
  handleSubmit,
  buttonLabels,
  getState,
  valid,
  NextButtonProps,
  SubmitButtonProps,
  conditionalSubmitFlag,
}) => {
  const nextResult = nextStep ? selectNext(nextStep, getState) : nextStep;
  const progressNext = nextResult !== conditionalSubmitFlag && nextStep;
  return (
    <Button
      type="primary"
      htmlType="button"
      onClick={() => (progressNext ? handleNext(nextResult) : handleSubmit())}
      disabled={!valid}
      {...(progressNext ? NextButtonProps : SubmitButtonProps)}
    >
      {progressNext ? buttonLabels.next : buttonLabels.submit}
    </Button>
  );
};

const WizardStepButtons = ({
  disableBack,
  handlePrev,
  nextStep,
  formOptions,
  handleNext,
  buttonLabels,
  ButtonProps,
  NextButtonProps,
  CancelButtonProps,
  BackButtonProps,
  SubmitButtonProps,
  conditionalSubmitFlag,
}) => (
  <div {...ButtonProps}>
    {formOptions.onCancel && (
      <Button type="button" variant="contained" color="secondary" onClick={formOptions.onCancel} {...CancelButtonProps}>
        {buttonLabels.cancel}
      </Button>
    )}
    <Button htmlType="button" disabled={disableBack} onClick={handlePrev} {...BackButtonProps}>
      {buttonLabels.back}
    </Button>
    <NextButton
      {...formOptions}
      handleNext={handleNext}
      nextStep={nextStep}
      buttonLabels={buttonLabels}
      NextButtonProps={NextButtonProps}
      SubmitButtonProps={SubmitButtonProps}
      conditionalSubmitFlag={conditionalSubmitFlag}
    />
  </div>
);

export default WizardStepButtons;
