import { Field, AnyObject } from '@data-driven-forms/react-form-renderer';

export interface WizardNextStepFunctionArgument {
  values?: AnyObject;
  value?: any;
}

export interface WizardNextStepFunction {
  (formState: WizardNextStepFunctionArgument): string;
}

export interface WizardStepMapper {
  [key: string]: string | number;
}

export interface WizardNextStepMapper {
  when: string;
  stepMapper: WizardStepMapper;
}

export type WizardNextStep = string | WizardNextStepMapper | WizardNextStepFunction;

export interface WizardField {
  name: string | number;
  fields: Field[];
  nextStep?: WizardNextStep;
  disableForwardJumping?: boolean;
}

export interface WizardProps {
  crossroads?: string[];
  fields: WizardField[];
}

declare const Wizard: React.ComponentType<WizardProps>;

export default Wizard;
