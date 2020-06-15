import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { TimePickerProps as MuiTimePickerProps } from 'material-ui-pickers';
import { ReactNode } from "react";
import { MuiPickersUtilsProviderProps } from "material-ui-pickers/MuiPickersUtilsProvider";
import { GridProps } from "@material-ui/core";
interface InternalTimePickerProps extends MuiTimePickerProps {
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  description?: ReactNode;
  validateOnMount?: boolean;
  locale?: string;
  MuiPickersUtilsProviderProps?: MuiPickersUtilsProviderProps;
  FormFieldGridProps?: GridProps;
}

export type TimePickerProps = InternalTimePickerProps & UseFieldApiComponentConfig;

declare const TimePicker: React.ComponentType<TimePickerProps>;

export default TimePicker;
