import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";
import { FormGroupProps } from "./form-group";

import { CheckboxProps as CarbonCheckboxProps } from 'carbon-components-react';

export interface CheckboxOption extends CarbonCheckboxProps {
  value?: any;
  label: ReactNode;
}

interface InternalCheckboxProps extends CarbonCheckboxProps {
  options?: CheckboxOption[];
}

export type CheckboxProps = InternalCheckboxProps & FormGroupProps &  UseFieldApiComponentConfig;

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
