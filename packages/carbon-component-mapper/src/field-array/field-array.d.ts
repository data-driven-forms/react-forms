import { FieldArrayField, UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";
import { ButtonProps, FormGroupProps as CarbonFormGroupProps } from "carbon-components-react";

import { FormGroupProps } from './form-group';

export interface FieldArrayButtonLabels {
  add: ReactNode;
  remove: ReactNode;
}

export interface InternalFieldArrayProps {
  fields: FieldArrayField[];
  defaultItem?: any;
  minItems?: number;
  maxItems?: number;
  noItemsMessage?: ReactNode;
  buttonLabels?: FieldArrayButtonLabels;
  AddContainerProps?: React.HTMLProps<HTMLDivElement>;
  AddButtonProps?: ButtonProps;
  RemoveButtonProps?: ButtonProps;
  ArrayItemProps?: React.HTMLProps<HTMLDivElement>;
  FormGroupProps?: CarbonFormGroupProps;
  WrapperProps?: React.HTMLProps<HTMLDivElement>;
}

export type FieldArrayProps = InternalFieldArrayProps & FormGroupProps & UseFieldApiComponentConfig;

declare const FieldArray: React.ComponentType<FieldArrayProps>;

export default FieldArray;
