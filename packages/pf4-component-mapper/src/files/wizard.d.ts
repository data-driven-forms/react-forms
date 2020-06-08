import { ReactNode } from "react";
import { Field, AnyObject, FormOptions } from "@data-driven-forms/react-form-renderer";

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
  substepOf?: string | number;
  title?: ReactNode;
  showTitle?: boolean;
  customTitle?: ReactNode;
  disableForwardJumping?: boolean;
  buttons?: ReactNode | React.ComponentType<WizardButtonsProps>;
}

export interface WizardProps {
  buttonLabels?: WizardButtonLabels;
  buttonsClassName?: string;
  title?: ReactNode;
  description?: ReactNode;
  isCompactNav?: boolean;
  inModal?: boolean;
  setFullWidth?: boolean;
  setFullHeight?: boolean;
  isDynamic?: boolean;
  showTitles?: boolean;
  crossroads?: string[];
  fields: WizardField[];
}

declare const Wizard: React.ComponentType<WizardProps>;

export default Wizard;
