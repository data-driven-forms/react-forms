import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { TextFieldProps as MuiTextFieldProps, GridProps } from '@material-ui/core';
import { ReactNode } from "react";

interface InternalTextFieldProps {
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  description?: ReactNode;
  validateOnMount?: boolean;
  FormFieldGridProps?: GridProps;
}

export type TextFieldProps = InternalTextFieldProps & MuiTextFieldProps & UseFieldApiComponentConfig;

declare const TextField: React.ComponentType<TextFieldProps>;

export default TextField;
