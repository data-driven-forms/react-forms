import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import FormGroupProps from "./form-group";
import { ReactNode } from "react";

export interface RadioOption extends AnyObject {
  label: ReactNode;
  value?: any;
}

interface InternalRadioProps {
  name: string;
  options: RadioOption[];
  isReadOnly?: boolean;
  isDisabled?: boolean;
}

export type RadioProps = InternalRadioProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
