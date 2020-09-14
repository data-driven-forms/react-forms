import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";

import { SelectItemProps, SelectProps as CarbonSelectProps } from 'carbon-components-react';

export interface SelectOption extends SelectItemProps {
  value: any;
  label: string | undefined;
}

interface InternalSelectProps extends CarbonSelectProps {
  options: SelectOption[];
  isDisabled?: boolean;
}

export type SelectProps = InternalSelectProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Select: React.ComponentType<SelectProps>;

export default Select;
