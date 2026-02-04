import { createContext } from 'react';
import { Field } from '../common-types';
import { FormOptions } from '../renderer-context';

export type NextStep =
  | string
  | ((context: { values: any }) => string)
  | ((context: { values: any }) => Promise<string>)
  | (any & {
      stepMapper: {
        [key: string]: string;
        [key: number]: string;
      };
      when: string[] | string;
    });

export interface WizardContextValue {
  formOptions: FormOptions;
  crossroads: string[];
  currentStep: { fields?: Field[]; name: string; title?: string; nextStep?: NextStep } | undefined;
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
  selectNext: Function;
}

const WizardContext = createContext<WizardContextValue>({} as WizardContextValue);

export default WizardContext;
