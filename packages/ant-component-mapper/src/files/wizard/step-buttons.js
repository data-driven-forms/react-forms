import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import Button from '../button';
import { Button } from 'antd';

import { useFieldApi, useFormApi } from '@data-driven-forms/react-form-renderer';

// import './button.scss';

const SimpleNext = ({ next, handleNext, submit, buttonLabels, disabled }) => {
  const { valid } = useFormApi();

  return (
    <Button type="primary" htmlType="button" onClick={() => (valid ? handleNext(next) : submit())} disabled={disabled}>
      {buttonLabels.next}
      {/* <Icon type="fa" name="angle-right" /> */}
    </Button>
  );
};

SimpleNext.propTypes = {
  next: PropTypes.string,
  handleNext: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  buttonLabels: PropTypes.object.isRequired,
  disabled: PropTypes.bool
};

const ConditionalNext = ({ nextStep, ...rest }) => {
  const {
    input: { value }
  } = useFieldApi({ name: nextStep.when, subscription: { value: true } });

  const next = nextStep.stepMapper[value];

  return <SimpleNext next={next} {...rest} disabled={!next} />;
};

ConditionalNext.propTypes = {
  nextStep: PropTypes.shape({
    when: PropTypes.string.isRequired,
    stepMapper: PropTypes.object.isRequired
  }).isRequired
};

const submitButton = (handleSubmit, submitText) => (
  <Button htmlType="button" type="primary" onClick={handleSubmit}>
    {submitText}
  </Button>
);

const renderNextButton = ({ nextStep, handleSubmit, buttonLabels, ...rest }) =>
  !nextStep ? (
    submitButton(handleSubmit, buttonLabels.submit)
  ) : typeof nextStep === 'object' ? (
    <ConditionalNext nextStep={nextStep} buttonLabels={buttonLabels} {...rest} />
  ) : (
    <SimpleNext next={nextStep} buttonLabels={buttonLabels} {...rest} />
  );

const WizardStepButtons = ({ disableBack, handlePrev, nextStep, formOptions, handleNext, buttonLabels }) => (
  <Fragment>
    {formOptions.onCancel && (
      <Button
        className="ddorg__pf3-component-mapper__wizard__buttons"
        type="button"
        variant="contained"
        color="secondary"
        onClick={formOptions.onCancel}
      >
        {buttonLabels.cancel}
      </Button>
    )}
    <Button htmlType="button" disabled={disableBack} onClick={handlePrev}>
      {buttonLabels.back}
    </Button>
    {renderNextButton({
      ...formOptions,
      handleNext,
      nextStep,
      buttonLabels
    })}
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
