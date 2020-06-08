import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import FormGroupProps from "./form-group";
import { ReactNode } from "react";

export interface RadioOption extends AnyObject {
  label: ReactNode;
  value?: any;
}

export interface RadioProps {
  name: string;
  options: RadioOption[];
  isReadOnly?: boolean;
  isDisabled?: boolean;
}

declare const Radio: React.ComponentType<RadioProps & FormGroupProps & UseFieldApiComponentConfig>;

export default Radio;
