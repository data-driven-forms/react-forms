import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { CheckboxProps as SuirCheckboxProps, FormFieldProps, HeaderProps } from 'semantic-ui-react';
import { ReactNode } from "react";
import { FormFieldGridProps, HelperTextProps } from "./form-field-grid";
import { CommonFieldProps } from "./common-field-props";

export interface CheckboxOption extends AnyObject {
  label: ReactNode;
  value?: any;
}

export interface CheckboxProps extends SuirCheckboxProps {
  options?: CheckboxOption[];
  /** Sub components customization API */
  FormFieldProps?: FormFieldProps;
  HeaderProps?: HeaderProps;
  OptionsListProps?: React.HTMLProps<HTMLDivElement>;
}

declare const Checkbox: React.ComponentType<CheckboxProps & CommonFieldProps & UseFieldApiComponentConfig>;

export default Checkbox;
