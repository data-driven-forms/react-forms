import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import selectNext from '@data-driven-forms/common/wizard/select-next';
import { FormSpy } from '@data-driven-forms/react-form-renderer';
import { Button } from 'semantic-ui-react';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const NextButton = ({ nextStep, valid, handleNext, nextLabel, getState, handleSubmit, submitLabel }) => (
  <Button
    icon={nextStep ? 'right arrow' : undefined}
    color="blue"
    labelPosition={nextStep ? 'right' : undefined}
    content={nextStep ? nextLabel : submitLabel}
    disabled={!valid || getState().validating || getState().submitting}
    onClick={() => (nextStep ? handleNext(selectNext(nextStep, getState)) : handleSubmit())}
    type="button"
  />
);

NextButton.propTypes = {
  nextStep: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  handleSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.node.isRequired,
  valid: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  nextLabel: PropTypes.node.isRequired,
  getState: PropTypes.func.isRequired
};

const WizardStepButtons = ({ buttons: Buttons, ...props }) => {
  const classes = useStyles();
  if (Buttons) {
    return <Buttons {...props} />;
  }

  const {
    disableBack,
    handlePrev,
    nextStep,
    handleNext,
    buttonLabels: { cancel, submit, back, next },
    formOptions
  } = props;

  return (
    <FormSpy subscription={{ valid: true, validating: true, submitting: true }}>
      {() => (
        <div className={classes.root}>
          <Button type="button" onClick={formOptions.onCancel}>
            {cancel}
          </Button>
          <div>
            <Button icon="left arrow" labelPosition="left" content={back} type="button" disabled={disableBack} onClick={handlePrev} />
            <NextButton {...formOptions} handleNext={handleNext} nextStep={nextStep} nextLabel={next} submitLabel={submit} />
          </div>
        </div>
      )}
    </FormSpy>
  );
};

WizardStepButtons.propTypes = {
  disableBack: PropTypes.bool,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  nextStep: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      when: PropTypes.string.isRequired,
      stepMapper: PropTypes.object.isRequired
    }),
    PropTypes.func
  ]),
  buttonLabels: PropTypes.shape({
    submit: PropTypes.node.isRequired,
    cancel: PropTypes.node.isRequired,
    back: PropTypes.node.isRequired,
    next: PropTypes.node.isRequired
  }).isRequired,
  buttons: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  formOptions: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  })
};

export default WizardStepButtons;
