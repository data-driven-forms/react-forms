import selectNext, { NextStep } from './select-next';
import { AnyObject } from '@data-driven-forms/react-form-renderer';

interface FormOptions {
  valid: boolean;
  getState: () => AnyObject & { validating: boolean; values: AnyObject };
  getRegisteredFields: () => AnyObject;
}

interface Step {
  nextStep?: NextStep;
  buttons?: unknown;
}

type HandleNext = (nextStep: string, getRegisteredFields: () => AnyObject) => void;
type HandleSubmit = () => void;
type FindCurrentStep = (activeStep: string) => Step;

const enterHandler = (
  e: KeyboardEvent,
  formOptions: FormOptions,
  activeStep: string,
  findCurrentStep: FindCurrentStep,
  handleNext: HandleNext,
  handleSubmit: HandleSubmit
): void => {
  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
    const target = e.target as HTMLElement;
    const isNotButton = target && 'type' in target && target.type !== 'button';

    if (isNotButton) {
      e.preventDefault();

      const currentStep = findCurrentStep(activeStep);
      const schemaNextStep = currentStep.nextStep;
      const hasCustomButtons = currentStep.buttons;

      let nextStep;
      if (schemaNextStep) {
        const result = selectNext(schemaNextStep, formOptions.getState);
        nextStep = typeof result === 'string' ? result : undefined;
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
