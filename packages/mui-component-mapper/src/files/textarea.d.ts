import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { TextFieldProps, GridProps, InputProps } from "@material-ui/core";
import { ReactNode } from "react";

export interface TextareaProps {
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  validateOnMount?: boolean;
  desciption?: ReactNode;
  FormFieldGridProps?: GridProps;
  inputProps?: InputProps;
}

declare const Textarea: React.ComponentType<TextareaProps & TextFieldProps & UseFieldApiComponentConfig>;

export default Textarea;
