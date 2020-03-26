import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBackIcon from '@material-ui/icons/NavigateBefore';
import Send from '@material-ui/icons/Send';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const SimpleNext = ({ next, valid, handleNext, submit, buttonLabels }) => (
  <Button variant="contained" type="button" color="primary" onClick={() => (valid ? handleNext(next) : submit())}>
    {buttonLabels.next}
    <NavigateNextIcon />
  </Button>
);

SimpleNext.propTypes = {
  next: PropTypes.string,
  valid: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  buttonLabels: PropTypes.shape({
    next: PropTypes.node
  })
};

const ConditionalNext = ({ nextStep, ...rest }) => {
  const {
    input: { value }
  } = useFieldApi({ name: nextStep.when, subscription: { value: true } });
  return <SimpleNext next={nextStep.stepMapper[value]} {...rest} />;
};

ConditionalNext.propTypes = {
  nextStep: PropTypes.shape({
    when: PropTypes.string.isRequired,
    stepMapper: PropTypes.object.isRequired
  }).isRequired
};

const submitButton = (handleSubmit, label) => (
  <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
    {label} <Send />
  </Button>
);

const renderNextButton = ({ nextStep, handleSubmit, ...rest }) =>
  !nextStep ? (
    submitButton(handleSubmit, rest.buttonLabels.submit)
  ) : typeof nextStep === 'object' ? (
    <ConditionalNext nextStep={nextStep} {...rest} />
  ) : (
    <SimpleNext next={nextStep} {...rest} />
  );

const WizardStepButtons = ({ formOptions, disableBack, handlePrev, nextStep, handleNext, buttonLabels }) => (
  <div>
    {formOptions.onCancel && (
      <Button type="button" variant="contained" color="secondary" onClick={formOptions.onCancel}>
        {buttonLabels.cancel}
      </Button>
    )}

    <Button type="button" variant="contained" disabled={disableBack} onClick={handlePrev}>
      <NavigateBackIcon />
      {buttonLabels.back}
    </Button>
    {renderNextButton({
      ...formOptions,
      handleNext,
      nextStep,
      buttonLabels
    })}
  </div>
);

WizardStepButtons.propTypes = {
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired
  }).isRequired,
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
  buttonLabels: PropTypes.shape({
    submit: PropTypes.node,
    cancel: PropTypes.node,
    back: PropTypes.node,
    next: PropTypes.node
  })
};

export default WizardStepButtons;
