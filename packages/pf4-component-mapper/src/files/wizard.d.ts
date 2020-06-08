import { ReactNode } from "react";
import { Field } from "@data-driven-forms/react-form-renderer";

export interface WizardButtonLabels {
  submit?: ReactNode;
  cancel?: ReactNode;
  back?: ReactNode;
  next?: ReactNode;
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
  fields: Field[];
}

declare const Wizard: React.ComponentType<WizardProps>;

export default Wizard;
