import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";
import { ICheckboxProps } from '@blueprintjs/core';
import { FormGroupProps } from "./form-group";

export interface CheckboxOption extends AnyObject {
  value?: any;
  label: ReactNode;
}

export interface CheckboxProps extends ICheckboxProps {
  options?: CheckboxOption[];
}

declare const Checkbox: React.ComponentType<CheckboxProps & FormGroupProps &  UseFieldApiComponentConfig>;

export default Checkbox;
