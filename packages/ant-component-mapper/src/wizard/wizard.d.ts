import { Field, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ButtonProps } from "antd/lib/button";
import { StepProps } from "antd/lib/steps";
import { ModalProps } from "antd/lib/modal";
import { ReactNode } from "react";

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

export interface WizardButtonLabels {
  next?: ReactNode;
  submit?: ReactNode;
  cancel?: ReactNode;
  back?: ReactNode;
}

export interface WizardProps {
  crossroads?: string[];
  fields: WizardField[];
  stepsInfo?: StepProps[];
  WizardProps?: React.HTMLAttributes<HTMLDivElement>;
  TitleProps?: ModalProps;
  StepProps?: StepProps;
  WizardStepProps?: React.HTMLAttributes<HTMLDivElement>;
  ButtonProps?: ButtonProps;
  NextButtonProps?: ButtonProps;
  BackButtonProps?: ButtonProps;
  CancelButtonProps?:ButtonProps;
  SubmitButtonProps?: ButtonProps;
  buttonLabels?: WizardButtonLabels;
}

declare const Wizard: React.ComponentType<WizardProps>;

export default Wizard;
