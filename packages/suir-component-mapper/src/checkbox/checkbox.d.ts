import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { CheckboxProps as SuirCheckboxProps } from 'semantic-ui-react';
import { ReactNode } from "react";
import { CommonFieldProps } from "../common/common-field-props";

export interface CheckboxOption extends AnyObject {
  label: ReactNode;
  value?: any;
}

interface InternalCheckboxProps extends SuirCheckboxProps {
  options?: CheckboxOption[];
}

export type CheckboxProps = InternalCheckboxProps & CommonFieldProps & UseFieldApiComponentConfig;

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
