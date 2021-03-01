import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { CheckboxProps as PfCheckboxProps } from '@patternfly/react-core';
import { ReactNode } from "react";
import FormGroupProps from "../form-group";

interface CheckboxOptions extends AnyObject {
  label?: ReactNode;
  value?: any;
}

interface InternalCheckboxProps extends PfCheckboxProps {
  isReadOnly?: boolean;
  options?: CheckboxOptions;
}

export type CheckboxProps = InternalCheckboxProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
