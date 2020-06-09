import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { IDatePickerProps } from '@blueprintjs/datetime';
import { IPopoverProps, IButtonProps } from "@blueprintjs/core";

export interface DatePickerValueRenderer {
  (value?: string | Date): string;
}

export interface DatePickerProps extends IDatePickerProps {
  disabled?: boolean;
  valueRenderer?: DatePickerValueRenderer;
  PopoverProps?: IPopoverProps;
  ButtonProps: IButtonProps;
}

declare const DatePicker: React.ComponentType<DatePickerProps & FormGroupProps & UseFieldApiComponentConfig>

export default DatePicker;
