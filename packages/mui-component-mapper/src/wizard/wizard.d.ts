import { ReactNode } from "react";
import { StepLabelProps, StepProps, GridProps, StepperProps } from "@mui/material";

export interface WizardButtonLabels {
  next?: ReactNode;
  submit?: ReactNode;
  cancel?: ReactNode;
  back?: ReactNode;
}

export interface WizardStepInfo {
  title?: ReactNode;
  label?: ReactNode;
  StepLabelProps?: StepLabelProps;
  StepProps?: StepProps;
}

export interface WizardProps {
  buttonLabels?: WizardButtonLabels;
  stepsInfo?: WizardStepInfo[];
  ButtonContainerProps?: GridProps;
  StepperProps?: StepperProps;
  WizardBodyProps?: GridProps;
  WizardProps?: GridProps;
}

declare const Wizard: React.ComponentType<WizardProps>;
export default Wizard;
