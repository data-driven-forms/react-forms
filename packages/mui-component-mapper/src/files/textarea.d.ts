import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { TextFieldProps, GridProps, InputProps } from "@material-ui/core";
import { ReactNode } from "react";

interface InternalTextareaProps {
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  validateOnMount?: boolean;
  desciption?: ReactNode;
  FormFieldGridProps?: GridProps;
  inputProps?: InputProps;
}

export type TextareaProps = InternalTextareaProps & TextFieldProps & UseFieldApiComponentConfig;

declare const Textarea: React.ComponentType<TextareaProps>;

export default Textarea;
