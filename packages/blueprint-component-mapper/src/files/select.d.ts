import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ISelectProps } from "@blueprintjs/select";
import { ReactNode } from "react";

export interface SelectOption extends AnyObject {
  value?: any;
  label: ReactNode;
}

export interface SelectProps extends ISelectProps<SelectOption> {
  options: SelectOption[];
  placeholder?: ReactNode;
  isSearchable?: boolean;
  noOptionsMessage?: ReactNode;
  isMulti?: boolean;
  disabled?: boolean;
}

declare const Select: React.ComponentType<SelectProps & FormGroupProps & UseFieldApiComponentConfig>;

export default Select;
