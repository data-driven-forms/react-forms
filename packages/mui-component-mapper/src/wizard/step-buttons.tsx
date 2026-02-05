import React from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';

import { selectNext } from '@data-driven-forms/common';
import { FormSpy } from '@data-driven-forms/react-form-renderer';
import type { AnyObject, FormOptions } from '@data-driven-forms/react-form-renderer';
import { Button, Grid } from '@mui/material';
import type { GridProps } from '@mui/material';

const PREFIX = 'WizardStepButtons';

const classes = {
  wizardBody: `${PREFIX}-wizardBody`,
  buttons: `${PREFIX}-buttons`,
  button: `${PREFIX}-button`,
  buttonsContainer: `${PREFIX}-buttonsContainer`,
};

const StyledGrid = styled(Grid)(() => ({
  [`& .${classes.wizardBody}`]: {
    padding: 24,
    margin: 0,
  },

  [`& .${classes.buttons}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  [`& .${classes.button}`]: {
    marginRight: 16,
  },

  [`&.${classes.buttonsContainer}`]: {
    marginTop: 36,
  },
}));

interface FormState {
  values: AnyObject;
  valid: boolean;
  validating: boolean;
  submitting: boolean;
}

interface NextButtonProps {
  nextStep?: any;
  valid: boolean;
  handleNext: (nextStep?: any) => void;
  nextLabel: string;
  getState: () => FormState;
  handleSubmit: () => void;
  submitLabel: string;
  conditionalSubmitFlag?: any;
}

const NextButton: React.FC<NextButtonProps> = ({
  nextStep,
  valid,
  handleNext,
  nextLabel,
  getState,
  handleSubmit,
  submitLabel,
  conditionalSubmitFlag,
}) => {
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

interface ButtonLabels {
  cancel: string;
  submit: string;
  back: string;
  next: string;
}

interface CustomButtonsProps {
  classes: typeof classes;
  [key: string]: any;
}

interface WizardStepButtonsProps {
  buttons?: React.ComponentType<CustomButtonsProps>;
  disableBack: boolean;
  handlePrev: () => void;
  nextStep?: any;
  handleNext: (nextStep?: any) => void;
  buttonLabels: ButtonLabels;
  formOptions: FormOptions;
  ButtonContainerProps?: GridProps;
  conditionalSubmitFlag?: any;
  [key: string]: any;
}

const WizardStepButtons: React.FC<WizardStepButtonsProps> = ({ buttons: Buttons, ...props }) => {
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
    ButtonContainerProps = {},
    conditionalSubmitFlag,
  } = props;

  return (
    <StyledGrid
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
              <Button onClick={() => formOptions.onCancel(formOptions.getState().values)}>{cancel}</Button>
            </Grid>
            <Grid item md={10} xs={10} className={classes.buttons}>
              <Button disabled={disableBack} onClick={() => handlePrev()} className={classes.button}>
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
    </StyledGrid>
  );
};

export default WizardStepButtons;
