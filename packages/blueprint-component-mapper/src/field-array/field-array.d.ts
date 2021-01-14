import { ReactNode } from "react";
import { FieldArrayField } from "@data-driven-forms/react-form-renderer";
import { IButtonProps, IFormGroupProps } from "@blueprintjs/core";

export interface FieldArrayButtonLabels {
  add: ReactNode;
  remove: ReactNode;
}

export interface FieldArrayProps {
  label?: ReactNode;
  description?: ReactNode;
  fields: FieldArrayField[];
  defaultItem?: any;
  minItems?: number;
  maxItems?: number;
  noItemsMessage?: ReactNode;
  name: string;
  buttonLabels?: FieldArrayButtonLabels;
  AddContainerProps?: React.HTMLProps<HTMLDivElement>;
  AddButtonProps?: IButtonProps;
  RemoveButtonProps?: IButtonProps;
  ArrayItemProps?: React.HTMLProps<HTMLDivElement>;
  FormGroupProps?: IFormGroupProps;
  FieldArrayProps?: React.HTMLProps<HTMLDivElement>;
  validateOnMount?: boolean;
  helperText?: ReactNode;
  isRequired?: boolean;
}

declare const FieldArray: React.ComponentType<FieldArrayProps>;

export default FieldArray;
