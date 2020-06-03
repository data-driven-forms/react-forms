import { UseFieldApiConfig } from "@data-driven-forms/react-form-renderer";
import { TextFieldProps as MuiTextFieldProps, GridProps } from '@material-ui/core';
import { ReactNode } from "react";

export interface TextFieldProps {
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  description?: ReactNode;
  validateOnMount?: boolean;
  FormFieldGridProps?: GridProps;
}

declare const TextField: React.ComponentType<TextFieldProps & MuiTextFieldProps & UseFieldApiConfig>;

export default TextField;
