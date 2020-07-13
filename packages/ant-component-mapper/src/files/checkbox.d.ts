import { AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";
import { FormGroupProps } from "./form-group";

import { CheckboxProps as AndCheckboxProps } from 'antd/es/checkbox/Checkbox';

export interface CheckboxOption extends AnyObject {
  value?: any;
  label: ReactNode;
}

interface InternalCheckboxProps extends AndCheckboxProps {
  options?: CheckboxOption[];
}

export type CheckboxProps = InternalCheckboxProps & FormGroupProps;

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
