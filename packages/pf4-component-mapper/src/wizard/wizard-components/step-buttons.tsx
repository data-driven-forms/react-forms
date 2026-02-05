import React from 'react';
import { Button, ActionList, ActionListGroup, ActionListItem } from '@patternfly/react-core';
import selectNext from '@data-driven-forms/common/wizard/select-next';
import { FormSpy } from '@data-driven-forms/react-form-renderer';

interface ButtonLabels {
  cancel: string;
  submit: string;
  back: string;
  next: string;
}

interface NextButtonProps {
  nextStep?: any;
  valid?: boolean;
  handleNext: (nextStep?: any) => void;
  nextLabel: string;
  getState: () => any;
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
      variant="primary"
      type="button"
      isDisabled={!valid || getState().validating}
      onClick={() => (progressNext ? handleNext(selectNext(nextStep, getState)) : handleSubmit())}
    >
      {progressNext ? nextLabel : submitLabel}
    </Button>
  );
};

interface WizardStepButtonsProps {
  buttons?: React.ComponentType<any>;
  disableBack?: boolean;
  handlePrev?: () => void;
  nextStep?: any;
  handleNext?: (nextStep?: any) => void;
  buttonsClassName?: string;
  buttonLabels?: ButtonLabels;
  formOptions: any;
  conditionalSubmitFlag?: any;
  [key: string]: any;
}

const WizardStepButtons: React.FC<WizardStepButtonsProps> = ({
  buttons: Buttons,
  disableBack,
  handlePrev,
  nextStep,
  handleNext,
  buttonsClassName,
  buttonLabels: { cancel, submit, back, next },
  formOptions,
  conditionalSubmitFlag,
}) => (
  <footer className={`pf-v6-c-wizard__footer ${buttonsClassName ? buttonsClassName : ''}`}>
    <ActionList>
      {Buttons ? (
        <Buttons
          disableBack={disableBack}
          handlePrev={handlePrev}
          nextStep={nextStep}
          handleNext={handleNext}
          buttonsClassName={buttonsClassName}
          buttonLabels={{ cancel, submit, back, next }}
          renderNextButton={(args: any) => (
            <NextButton {...formOptions} handleNext={handleNext} nextStep={nextStep} nextLabel={next} submitLabel={submit} {...args} />
          )}
          selectNext={selectNext}
        />
      ) : (
        <FormSpy>
          {() => (
            <React.Fragment>
              <ActionListGroup>
                <ActionListItem>
                  <NextButton
                    {...formOptions}
                    conditionalSubmitFlag={conditionalSubmitFlag}
                    handleNext={handleNext}
                    nextStep={nextStep}
                    nextLabel={next}
                    submitLabel={submit}
                  />
                </ActionListItem>
                <ActionListItem>
                  <Button type="button" variant="secondary" isDisabled={disableBack} onClick={handlePrev}>
                    {back}
                  </Button>
                </ActionListItem>
              </ActionListGroup>
              <ActionListGroup>
                <ActionListItem>
                  <Button type="button" variant="link" onClick={formOptions.onCancel}>
                    {cancel}
                  </Button>
                </ActionListItem>
              </ActionListGroup>
            </React.Fragment>
          )}
        </FormSpy>
      )}
    </ActionList>
  </footer>
);

export default WizardStepButtons;
