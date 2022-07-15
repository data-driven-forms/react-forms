import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers';
import { ReactNode } from "react";
import { GridProps } from "@mui/material";
interface InternalTimePickerProps extends MuiTimePickerProps<unknown, unknown> {
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  description?: ReactNode;
  validateOnMount?: boolean;
  FormFieldGridProps?: GridProps;
}

export type TimePickerProps = InternalTimePickerProps & UseFieldApiComponentConfig;

declare const TimePicker: React.ComponentType<TimePickerProps>;

export default TimePicker;
