import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import selectNext from '@data-driven-forms/common/src/wizard/select-next';

const NextButton = ({ nextStep, handleNext, handleSubmit, buttonLabels, getState, valid }) => {
  return (
    <Button
      type="primary"
      htmlType="button"
      onClick={() => (nextStep ? handleNext(selectNext(nextStep, getState)) : handleSubmit())}
      disabled={!valid}
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
  }).isRequired
};

const WizardStepButtons = ({ disableBack, handlePrev, nextStep, formOptions, handleNext, buttonLabels }) => (
  <Fragment>
    {formOptions.onCancel && (
      <Button type="button" variant="contained" color="secondary" onClick={formOptions.onCancel}>
        {buttonLabels.cancel}
      </Button>
    )}
    <Button htmlType="button" disabled={disableBack} onClick={handlePrev}>
      {buttonLabels.back}
    </Button>
    <NextButton {...formOptions} handleNext={handleNext} nextStep={nextStep} buttonLabels={buttonLabels} />
  </Fragment>
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
  }).isRequired
};

export default WizardStepButtons;
