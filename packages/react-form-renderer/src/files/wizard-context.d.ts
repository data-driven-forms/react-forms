import { FormOptions } from './renderer-context';

export interface WizardContextValue {
  formOptions: FormOptions;
  crossroads: string[];
  currentStep: string;
  handlePrev: Function;
  onKeyDown: Function;
  jumpToStep: Function;
  setPrevSteps: Function;
  handleNext: Function;
  navSchema: Object;
  activeStepIndex: number;
  maxStepIndex: number;
  isDynamic: boolean;
  prevSteps: string[];
}

interface WizardContext {
  value: WizardContextValue;
}

export default WizardContext;
