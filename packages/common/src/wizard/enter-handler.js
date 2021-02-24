import selectNext from './select-next';

const enterHandler = (e, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit) => {
  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
    const isNotButton = e.target.type !== 'button';

    if (isNotButton) {
      e.preventDefault();

      const schemaNextStep = findCurrentStep(activeStep).nextStep;
      const hasCustomButtons = findCurrentStep(activeStep).buttons;

      let nextStep;
      if (schemaNextStep) {
        nextStep = selectNext(schemaNextStep, formOptions.getState);
      }

      const canContinue = formOptions.valid && !formOptions.getState().validating;

      if (canContinue && nextStep && !hasCustomButtons) {
        handleNext(nextStep, formOptions.getRegisteredFields);
      } else if (canContinue && !schemaNextStep && !hasCustomButtons) {
        handleSubmit();
      }
    }
  }
};

export default enterHandler;
