import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { TimePickerProps as MuiTimePickerProps } from 'material-ui-pickers';
import { ReactNode } from "react";
import { MuiPickersUtilsProviderProps } from "material-ui-pickers/MuiPickersUtilsProvider";
import { GridProps } from "@material-ui/core";
export interface TimePickerProps extends MuiTimePickerProps {
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  description?: ReactNode;
  validateOnMount?: boolean;
  locale?: string;
  MuiPickersUtilsProviderProps?: MuiPickersUtilsProviderProps;
  FormFieldGridProps?: GridProps;
}

declare const TimePicker: React.ComponentType<TimePickerProps & UseFieldApiComponentConfig>;

export default TimePicker;
