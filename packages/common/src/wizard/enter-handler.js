import selectNext from './select-next';

const enterHandler = (e, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit) => {
  if (e.key === 'Enter'){
    const isNotButton = e.target.type !== 'button';

    if (isNotButton) {
      e.preventDefault();

      const schemaNextStep = findCurrentStep(activeStep).nextStep;
      const hasCustomButtons = findCurrentStep(activeStep).buttons;

      let nextStep;
      if (schemaNextStep) {
        nextStep = selectNext(schemaNextStep, formOptions.getState);
      }

      if (formOptions.valid && nextStep && !hasCustomButtons) {
        handleNext(nextStep, formOptions.getRegisteredFields);
      } else if (formOptions.valid && !schemaNextStep && !hasCustomButtons) {
        handleSubmit();
      }
    }
  }
};

export default enterHandler;
