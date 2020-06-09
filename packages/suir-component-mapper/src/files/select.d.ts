import { CommonFieldProps } from "./common-field-props";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { StrictDropdownProps } from 'semantic-ui-react';
import { ReactNode } from "react";

export interface SelectOption extends AnyObject {
  label: ReactNode;
  value?: any;
}

export interface SelectProps extends StrictDropdownProps {
  [key: string]: any;
  options?: SelectOption[];
  isSearchable?: boolean;
  isMulti?: boolean;
  isClearable?: boolean;
  noOptionsMessage?: string;
  classNamePrefix?: string;
  hideSelectedOptions?: boolean;
  closeMenuOnSelect?: boolean;
}

declare const Select: React.ComponentType<SelectProps & CommonFieldProps & UseFieldApiComponentConfig>;

export default Select;
