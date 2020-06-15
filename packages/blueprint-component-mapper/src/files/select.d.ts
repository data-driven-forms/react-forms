import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ISelectProps } from "@blueprintjs/select";
import { ReactNode } from "react";

export interface SelectOption extends AnyObject {
  value?: any;
  label: ReactNode;
}

interface InternalSelectProps extends ISelectProps<SelectOption> {
  options: SelectOption[];
  placeholder?: ReactNode;
  isSearchable?: boolean;
  noOptionsMessage?: ReactNode;
  isMulti?: boolean;
  disabled?: boolean;
}

export type SelectProps = InternalSelectProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Select: React.ComponentType<SelectProps>;

export default Select;
