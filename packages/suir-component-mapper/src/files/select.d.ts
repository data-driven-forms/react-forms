import { CommonFieldProps } from "./common-field-props";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { StrictDropdownProps } from 'semantic-ui-react';
import { ReactNode } from "react";

export interface SelectOption extends AnyObject {
  label: ReactNode;
  value?: any;
}

interface InternalSelectProps extends StrictDropdownProps {
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

export type SelectProps = InternalSelectProps & CommonFieldProps & UseFieldApiComponentConfig;

declare const Select: React.ComponentType<SelectProps>;

export default Select;
