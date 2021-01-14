import { Field, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";
import { ButtonProps, ProgressIndicatorProps, ProgressStepProps } from "carbon-components-react";

export interface WizardButtonLabels {
  submit?: ReactNode;
  back?: ReactNode;
  next?: ReactNode;
}

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

export interface WizardNavItem extends ProgressStepProps {
  title: ReactNode;
}

export interface WizardProps {
  crossroads?: string[];
  fields: WizardField[];
  buttonLabels?: WizardButtonLabels;
  BackButtonProps?: ButtonProps;
  NextButtonProps?: ButtonProps;
  SubmitButtonProps?: ButtonProps;
  ButtonSetProps?: React.HTMLProps<HTMLDivElement>;
  ProgressIndicatorProps?: ProgressIndicatorProps;
  vertical?: boolean;
  stepsInfo?: WizardNavItem[];
  WizardBodyProps?: React.HTMLProps<HTMLDivElement>;
}

declare const Wizard: React.ComponentType<WizardProps>;

export default Wizard;
