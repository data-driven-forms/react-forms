import React, { useContext } from 'react';
import WizardCommon from '@data-driven-forms/common/wizard/wizard';
import { FormSpy, WizardContext } from '@data-driven-forms/react-form-renderer';

const WizardInternal = () => {
  const {
    formOptions,
    currentStep,
    handlePrev,
    onKeyDown,
    handleNext,
    activeStepIndex,
    selectNext
  } = useContext(WizardContext);

  return (
    <div onKeyDown={onKeyDown}>
      {currentStep.fields.map((item) => formOptions.renderForm([item], formOptions))}
      <FormSpy>
        {({ valid }) => (
          <div>
            <button onClick={() => handleNext(selectNext(currentStep.nextStep, formOptions.getState))} disabled={!valid}>
              Next
            </button>
            <button onClick={handlePrev} disabled={activeStepIndex === 0}>
              Back
            </button>
          </div>
        )}
      </FormSpy>
    </div>
  );
};

const Wizard = (props) => <WizardCommon Wizard={WizardInternal} {...props} />;

export default Wizard;
