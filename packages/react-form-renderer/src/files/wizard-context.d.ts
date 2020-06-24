import { ReactNode } from 'react';
import { FormApi } from 'final-form';
import Field from './field';
import { AnyObject } from './common';

export interface FormOptions extends FormApi {
  registerInputFile?: (name: string) => void;
  unRegisterInputFile?: (name: string) => void;
  onCancel?: (values: object, ...args: any[]) => void;
  onReset?: () => void;
  handleSubmit: () => Promise<AnyObject | undefined> | undefined;
  clearedValue?: any;
  renderForm: (fields: Field[]) => ReactNode[];
}

export interface WizardContextValue {
  formOptions: FormOptions;

}

interface WizardContext {
  value: WizardContextValue;
}

export default WizardContext;
