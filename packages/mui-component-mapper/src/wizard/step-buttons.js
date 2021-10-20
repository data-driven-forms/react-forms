import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import selectNext from '@data-driven-forms/common/wizard/select-next';
import { FormSpy } from '@data-driven-forms/react-form-renderer';
import { Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const NextButton = ({ nextStep, valid, handleNext, nextLabel, getState, handleSubmit, submitLabel, conditionalSubmitFlag }) => {
  const nextResult = nextStep ? selectNext(nextStep, getState) : nextStep;
  const progressNext = nextResult !== conditionalSubmitFlag && nextStep;
  return (
    <Button
      variant="contained"
      color="primary"
      disabled={!valid || getState().validating || getState().submitting}
      onClick={() => (progressNext ? handleNext(nextResult) : handleSubmit())}
    >
      {progressNext ? nextLabel : submitLabel}
    </Button>
  );
};

NextButton.propTypes = {
  nextStep: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  handleSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.node.isRequired,
  valid: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  nextLabel: PropTypes.node.isRequired,
  getState: PropTypes.func.isRequired,
  conditionalSubmitFlag: PropTypes.string.isRequired,
};

const useStyles = makeStyles(() => ({
  wizardBody: {
    padding: 24,
    margin: 0,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginRight: 16,
  },
  buttonsContainer: {
    marginTop: 36,
  },
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
    ButtonContainerProps,
    conditionalSubmitFlag,
  } = props;

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      {...ButtonContainerProps}
      className={clsx(classes.buttonsContainer, ButtonContainerProps.className)}
    >
      <FormSpy subscription={{ values: true, valid: true, validating: true, submitting: true }}>
        {() => (
          <React.Fragment>
            <Grid item md={2} xs={2}>
              <Button onClick={formOptions.onCancel}>{cancel}</Button>
            </Grid>
            <Grid item md={10} xs={10} className={classes.buttons}>
              <Button disabled={disableBack} onClick={handlePrev} className={classes.button}>
                {back}
              </Button>
              <NextButton
                {...formOptions}
                conditionalSubmitFlag={conditionalSubmitFlag}
                handleNext={handleNext}
                nextStep={nextStep}
                nextLabel={next}
                submitLabel={submit}
              />
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
  conditionalSubmitFlag: PropTypes.string.isRequired,
  nextStep: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      when: PropTypes.string.isRequired,
      stepMapper: PropTypes.object.isRequired,
    }),
    PropTypes.func,
  ]),
  buttonLabels: PropTypes.shape({
    submit: PropTypes.node.isRequired,
    cancel: PropTypes.node.isRequired,
    back: PropTypes.node.isRequired,
    next: PropTypes.node.isRequired,
  }).isRequired,
  buttons: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  formOptions: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }),
};

WizardStepButtons.defaultProps = {
  ButtonContainerProps: {},
};

export default WizardStepButtons;
