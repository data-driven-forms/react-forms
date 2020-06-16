import { ReactNode } from "react";
import { Field, AnyObject, FormOptions } from "@data-driven-forms/react-form-renderer";
import { IButtonProps } from "@blueprintjs/core";

export interface WizardButtonLabels {
  submit?: ReactNode;
  cancel?: ReactNode;
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

export interface WizardButtonsProps {
  ConditionalNext: React.ComponentType;
  SubmitButton: React.ComponentType;
  SimpleNext: React.ComponentType;
  formOptions: FormOptions;
  disableBack?: boolean;
  handlePrev: any;
  nextStep?: string | number;
  FieldProvider?: React.ComponentType;
  handleNext: any;
  buttonsClassname?: string;
  buttonLabels: AnyObject;
  renderNextButton: any;
}

export interface WizardField {
  name: string | number;
  fields: Field[];
  nextStep?: WizardNextStep;
  disableForwardJumping?: boolean;
}

export interface WizardProps {
  buttonLabels?: WizardButtonLabels;
  crossroads?: string[];
  fields: WizardField[];
  ButtonToolbarProps?: React.HTMLProps<HTMLDivElement>;
  DirectionButtonProps?: React.HTMLProps<HTMLDivElement>;
  CancelButtonProps?: IButtonProps;
  BackButtonProps?: IButtonProps;
  NextButtonProps?: IButtonProps;
  SubmitButtonProps?: IButtonProps;
  WizardProps?: React.HTMLProps<HTMLDivElement>;
}

declare const Wizard: React.ComponentType<WizardProps>;

export default Wizard;
