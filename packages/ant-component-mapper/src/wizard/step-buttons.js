import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import selectNext from '@data-driven-forms/common/wizard/select-next';

const NextButton = ({ nextStep, handleNext, handleSubmit, buttonLabels, getState, NextButtonProps, SubmitButtonProps, conditionalSubmitFlag }) => {
  const nextResult = nextStep ? selectNext(nextStep, getState) : nextStep;
  const progressNext = nextResult !== conditionalSubmitFlag && nextStep;
  const { valid } = getState();
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

NextButton.propTypes = {
  nextStep: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  buttonLabels: PropTypes.shape({
    submit: PropTypes.node.isRequired,
    cancel: PropTypes.node.isRequired,
    back: PropTypes.node.isRequired,
    next: PropTypes.node.isRequired,
  }).isRequired,
  NextButtonProps: PropTypes.object,
  SubmitButtonProps: PropTypes.object,
  conditionalSubmitFlag: PropTypes.string.isRequired,
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

WizardStepButtons.propTypes = {
  disableBack: PropTypes.bool,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  conditionalSubmitFlag: PropTypes.string.isRequired,
  nextStep: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      when: PropTypes.string.isRequired,
      stepMapper: PropTypes.object.isRequired,
    }),
  ]),
  buttonLabels: PropTypes.object.isRequired,
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func.isRequired,
  }).isRequired,
  ButtonProps: PropTypes.object,
  NextButtonProps: PropTypes.object,
  BackButtonProps: PropTypes.object,
  CancelButtonProps: PropTypes.object,
  SubmitButtonProps: PropTypes.object,
};

export default WizardStepButtons;
