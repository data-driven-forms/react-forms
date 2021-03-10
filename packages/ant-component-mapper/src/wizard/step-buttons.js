import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import selectNext from '@data-driven-forms/common/wizard/select-next';

const NextButton = ({ nextStep, handleNext, handleSubmit, buttonLabels, getState, valid, NextButtonProps, SubmitButtonProps }) => {
  return (
    <Button
      type="primary"
      htmlType="button"
      onClick={() => (nextStep ? handleNext(selectNext(nextStep, getState)) : handleSubmit())}
      disabled={!valid}
      {...(nextStep ? NextButtonProps : SubmitButtonProps)}
    >
      {nextStep ? buttonLabels.next : buttonLabels.submit}
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
    next: PropTypes.node.isRequired
  }).isRequired,
  NextButtonProps: PropTypes.object,
  SubmitButtonProps: PropTypes.object
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
  SubmitButtonProps
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
    />
  </div>
);

WizardStepButtons.propTypes = {
  disableBack: PropTypes.bool,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  nextStep: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      when: PropTypes.string.isRequired,
      stepMapper: PropTypes.object.isRequired
    })
  ]),
  buttonLabels: PropTypes.object.isRequired,
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func.isRequired
  }).isRequired,
  ButtonProps: PropTypes.object,
  NextButtonProps: PropTypes.object,
  BackButtonProps: PropTypes.object,
  CancelButtonProps: PropTypes.object,
  SubmitButtonProps: PropTypes.object
};

export default WizardStepButtons;
