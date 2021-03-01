import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import selectNext from '@data-driven-forms/common/wizard/select-next';
import { FormSpy } from '@data-driven-forms/react-form-renderer';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const NextButton = ({ nextStep, valid, handleNext, nextLabel, getState, handleSubmit, submitLabel }) => (
  <Button
    variant="contained"
    color="primary"
    disabled={!valid || getState().validating || getState().submitting}
    onClick={() => (nextStep ? handleNext(selectNext(nextStep, getState)) : handleSubmit())}
  >
    {nextStep ? nextLabel : submitLabel}
  </Button>
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

const useStyles = makeStyles(() => ({
  wizardBody: {
    padding: 24,
    margin: 0
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginRight: 16
  },
  buttonsContainer: {
    marginTop: 36
  }
}));

const WizardStepButtons = ({ buttons: Buttons, ...props }) => {
  const classes = useStyles();

  if (Buttons) {
    return <Buttons classes={classes} {...props} />;
  }

  const {
    disableBack,
    handlePrev,
    nextStep,
    handleNext,
    buttonLabels: { cancel, submit, back, next },
    formOptions,
    ButtonContainerProps
  } = props;

  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      {...ButtonContainerProps}
      className={clsx(classes.buttonsContainer, ButtonContainerProps.className)}
    >
      <FormSpy subscription={{ valid: true, validating: true, submitting: true }}>
        {() => (
          <React.Fragment>
            <Grid item md={2} xs={2}>
              <Button onClick={formOptions.onCancel}>{cancel}</Button>
            </Grid>
            <Grid item md={10} xs={10} className={classes.buttons}>
              <Button disabled={disableBack} onClick={handlePrev} className={classes.button}>
                {back}
              </Button>
              <NextButton {...formOptions} handleNext={handleNext} nextStep={nextStep} nextLabel={next} submitLabel={submit} />
            </Grid>
          </React.Fragment>
        )}
      </FormSpy>
    </Grid>
  );
};

WizardStepButtons.propTypes = {
  ButtonContainerProps: PropTypes.object,
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

WizardStepButtons.defaultProps = {
  ButtonContainerProps: {}
};

export default WizardStepButtons;
