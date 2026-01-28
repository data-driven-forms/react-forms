import { createContext } from 'react';
import React from 'react';
import { Field } from '../common-types';
import { FormOptions } from '../renderer-context';

export interface WizardContextValue {
  formOptions: FormOptions;
  crossroads: string[];
  currentStep: { fields: Field[]; name: string; title: string; nextStep?: string };
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

const WizardContext = createContext<WizardContextValue>({} as WizardContextValue);

export default WizardContext;