import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { CheckboxProps as PfCheckboxProps, FormGroupProps } from '@patternfly/react-core';
import { ReactNode } from "react";

interface CheckboxOptions extends AnyObject {
  label?: ReactNode;
  value?: any;
}

interface CheckboxProps extends PfCheckboxProps {
  isReadOnly?: boolean;
  options?: CheckboxOptions;
}

declare const Checkbox: React.ComponentType<CheckboxProps & FormGroupProps & UseFieldApiComponentConfig>;

export default Checkbox;
