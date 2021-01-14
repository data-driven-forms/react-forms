import { ReactNode } from "react";
import { Field, AnyObject } from "@data-driven-forms/react-form-renderer";

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

export interface SelectNextFunction {
  (nextStep: WizardNextStep, getState: Function): string;
}

export interface HandleNextFunction {
  (nextStep: string): void;
}

export interface WizardButtonsProps {
  disableBack?: boolean;
  handlePrev: Function;
  nextStep?: WizardNextStep;
  handleNext: HandleNextFunction;
  buttonsClassname?: string;
  buttonLabels: WizardButtonLabels;
  renderNextButton: Function;
  selectNext: SelectNextFunction;
}

export interface SubstepOfObject {
  name: string;
  title?: ReactNode;
}

export interface StepTemplateProps {
  title?: ReactNode;
  formFields: ReactNode;
  showTitles?: boolean;
  showTitle?: boolean;
  customTitle?: ReactNode;
  fields: Field[];
}

export interface WizardField {
  name: string | number;
  fields: Field[];
  nextStep?: WizardNextStep;
  substepOf?: string | number | SubstepOfObject;
  title?: ReactNode;
  showTitle?: boolean;
  customTitle?: ReactNode;
  disableForwardJumping?: boolean;
  buttons?: ReactNode | React.ComponentType<WizardButtonsProps>;
  StepTemplate?: React.ComponentType<StepTemplateProps>;
  hasNoBodyPadding?: boolean;
}

export interface WizardProps {
  buttonLabels?: WizardButtonLabels;
  buttonsClassName?: string;
  title?: ReactNode;
  description?: ReactNode;
  inModal?: boolean;
  isDynamic?: boolean;
  showTitles?: boolean;
  crossroads?: string[];
  fields: WizardField[];
  hideClose?: boolean;
  titleId?: string;
  descriptionId?: string;
  closeButtonAriaLabel?: string;
  hasNoBodyPadding?: boolean;
  navAriaLabel?: string;
  StepTemplate?: React.ComponentType<StepTemplateProps>;
}

declare const Wizard: React.ComponentType<WizardProps>;

export default Wizard;
