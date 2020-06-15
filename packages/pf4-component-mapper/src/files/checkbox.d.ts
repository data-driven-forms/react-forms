import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { CheckboxProps as PfCheckboxProps, FormGroupProps } from '@patternfly/react-core';
import { ReactNode } from "react";

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
